import { supabase, SUPABASE_CONFIGURED, SUPABASE_CONFIG_MESSAGE } from '../lib/supabase'

/**
 * Supabase-only auth service.
 *
 * Keeps the same public function names that the rest of the app already uses
 * (registerAccount, loginAccount, logoutAccount, restoreAuthenticatedSession,
 * changeAccountPassword, updateStoredUser) but backed entirely by Supabase Auth
 * + the `profiles` table (RLS protected). No local JWT/localStorage session
 * hand-rolling — Supabase persists the session for us.
 */

const notConfigured = () => ({ ok: false, error: SUPABASE_CONFIG_MESSAGE })
const notConfiguredData = () => ({ error: SUPABASE_CONFIG_MESSAGE })

const normalizeRole = (role) => {
  if (!role) return 'learner'
  const value = String(role).toLowerCase()
  if (
    value === 'learner' ||
    value === 'teacher' ||
    value === 'mentor' ||
    value === 'company'
  ) {
    return value
  }
  return 'learner'
}

export const toPublicUser = (authUser, profile) => ({
  id: authUser.id,
  name: profile?.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Learner',
  email: authUser.email,
  role: normalizeRole(profile?.role || authUser.user_metadata?.role),
  avatar: profile?.avatar_url || authUser.user_metadata?.avatar_url || null,
  headline: profile?.headline || '',
  bio: profile?.bio || '',
  location: profile?.location || '',
  company: profile?.company || '',
  interests: profile?.interests || [],
  skillsAcquired: profile?.skills || [],
  cohortName: profile?.cohort_name || 'EcoSprint Learner',
  isLoggedIn: true,
  linkedin: { connected: false, profileUrl: '', syncStatus: 'NOT_CONNECTED' }
})

const defaultProfilePayload = (authUser, name, interests = [], role = 'learner') => ({
  email: authUser.email,
  full_name: name,
  role: normalizeRole(role),
  avatar_url: '',
  headline: '',
  bio: '',
  location: '',
  company: '',
  skills: [],
  interests,
  preferences: {
    emailDigest: true,
    mentorReminders: true,
    careerAlerts: true,
    peerActivity: false
  }
})

/**
 * Fetch the profile row for the auth user. If it is missing (e.g. the user
 * was created before the profiles trigger/table existed) create a sensible
 * default row so the app never chokes on a missing profile.
 */
export async function ensureUserProfile(authUser) {
  if (!authUser?.id || !SUPABASE_CONFIGURED) return null

  const { data: existing, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .maybeSingle()

  if (error) {
    // Table likely missing / setup incomplete.
    console.warn('[EcoSprint] Could not read profile:', error.message)
    return null
  }

  if (existing) {
    // The schema's handle_new_user trigger creates the profile row without
    // interests. Backfill them from the registration metadata when the profile
    // has none — without clobbering interests the learner edits later.
    const metaInterests = authUser.user_metadata?.interests
    if (Array.isArray(metaInterests) && metaInterests.length && !existing.interests?.length) {
      const { error: updError } = await supabase
        .from('profiles')
        .update({ interests: metaInterests })
        .eq('id', authUser.id)
      if (!updError) existing.interests = metaInterests
    }
    return existing
  }

  const fallbackName = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Learner'
  const fallbackRole = authUser.user_metadata?.role || 'learner'
  const { data: created, error: insertError } = await supabase
    .from('profiles')
    .upsert({
      id: authUser.id,
      ...defaultProfilePayload(authUser, fallbackName, authUser.user_metadata?.interests || [], fallbackRole)
    })
    .select('*')
    .single()

  if (insertError) {
    console.warn('[EcoSprint] Could not create profile row:', insertError.message)
    return null
  }
  return created
}

export async function registerAccount({ name, email, password, interests = [], role = 'learner' }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  // Public signup is restricted to learner | teacher. Admin/company are never
  // accepted through the registration endpoint — anything else becomes learner.
  const signupRole = role === 'teacher' ? 'teacher' : 'learner'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, role: signupRole, interests }
    }
  })

  if (error) {
    const errorMessage = error.message || 'Unable to create account'
    // Supabase returns 422 for weak passwords etc. Keep it human.
    if (errorMessage.toLowerCase().includes('already registered')) {
      return { ok: false, error: 'An account with this email already exists. Try signing in instead.' }
    }
    return { ok: false, error: errorMessage }
  }

  if (!data?.user) {
    return { ok: false, error: 'Unable to create account. Please try again.' }
  }

  // Email confirmation enabled -> no session yet. Forward the user to the
  // 6-digit OTP screen so they can verify with the code emailed by Supabase.
  if (!data.session) {
    return {
      ok: false,
      needsConfirmation: true,
      needsOtp: true,
      email,
      error:
        'Account created. Enter the 6-digit code we emailed you to activate it.'
    }
  }

  const profile = await ensureUserProfile(data.user)
  return { ok: true, user: toPublicUser(data.user, profile), source: 'supabase' }
}

const friendlyOtpError = (error) => {
  const message = error?.message || ''
  const lower = message.toLowerCase()
  if (lower.includes('invalid') || lower.includes('expired') || lower.includes('expire')) {
    return 'That code is invalid or has expired. Check the latest email and try again, or request a new code.'
  }
  if (lower.includes('rate limit') || lower.includes('too many')) {
    return 'Too many attempts. Wait a minute, then request a new code.'
  }
  if (lower.includes('email not confirmed')) {
    return 'Email not verified yet. Check your inbox for the code from EcoSprint.'
  }
  return message || 'Unable to verify that code. Please try again.'
}

/**
 * Verify the 6-digit code Supabase emailed after sign-up (Confirm signup
 * template, rendered via {{ .Token }}). Works with the password-based
 * signUp() call — GoTrue returns a session on success.
 */
export async function verifySignupOtp({ email, token }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: String(token).trim(),
    type: 'signup'
  })
  if (error) return { ok: false, error: friendlyOtpError(error) }

  const authUser = data?.user || data?.session?.user
  if (!data?.session || !authUser) {
    return { ok: false, error: 'Verification did not produce a session. Please try again.' }
  }

  const profile = await ensureUserProfile(authUser)
  return { ok: true, user: toPublicUser(authUser, profile), source: 'supabase' }
}

/**
 * Re-send the sign-up confirmation OTP. Registration metadata (full_name,
 * role, interests) was already captured by Supabase at signUp time, so no
 * password is needed here.
 */
export async function resendSignupOtp({ email }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  const { error } = await supabase.auth.resend({ type: 'signup', email })
  if (error) return { ok: false, error: friendlyOtpError(error) }
  return { ok: true }
}

/**
 * Passwordless login: email a 6-digit code to an EXISTING account only.
 * shouldCreateUser: false guarantees no silent account is created.
 */
export async function sendOtpLogin({ email }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false }
  })
  if (error) {
    const message = error.message || ''
    if (
      message.toLowerCase().includes('user not found') ||
      message.toLowerCase().includes('user_not_found') ||
      // GoTrue signals "no such user" via otp_disabled when shouldCreateUser
      // is false ("Signups not allowed for otp").
      message.toLowerCase().includes('otp_disabled') ||
      message.toLowerCase().includes('signups not allowed')
    ) {
      return { ok: false, error: 'No account found for this email. Create an account first.' }
    }
    if (message.toLowerCase().includes('rate limit') || message.toLowerCase().includes('too many')) {
      return { ok: false, error: 'Please wait a moment before requesting another code.' }
    }
    return { ok: false, error: friendlyOtpError(error) }
  }
  return { ok: true }
}

/**
 * Verify the OTP emailed by signInWithOtp() (Magic Link template with
 * {{ .Token }}). Returns a session that signs the user in without a password.
 */
export async function verifyOtpLogin({ email, token }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: String(token).trim(),
    type: 'email'
  })
  if (error) return { ok: false, error: friendlyOtpError(error) }

  const authUser = data?.user || data?.session?.user
  if (!data?.session || !authUser) {
    return { ok: false, error: 'Verification did not produce a session. Please try again.' }
  }

  const profile = await ensureUserProfile(authUser)
  return { ok: true, user: toPublicUser(authUser, profile), source: 'supabase' }
}

export async function loginAccount({ email, password }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const message = error.message || ''
    if (message.toLowerCase().includes('email not confirmed')) {
      return {
        ok: false,
        error: 'Please confirm your email address first (check your inbox), then sign in again.'
      }
    }
    if (message.toLowerCase().includes('invalid login credentials')) {
      return { ok: false, error: 'Incorrect email or password.' }
    }
    return { ok: false, error: message }
  }

  if (!data?.user) return { ok: false, error: 'Unable to sign in. Please try again.' }

  const profile = await ensureUserProfile(data.user)
  return { ok: true, user: toPublicUser(data.user, profile), source: 'supabase' }
}

export async function logoutAccount() {
  if (!SUPABASE_CONFIGURED) return
  await supabase.auth.signOut()
}

export async function restoreAuthenticatedSession() {
  if (!SUPABASE_CONFIGURED) return null
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session?.user) return null
  const profile = await ensureUserProfile(session.user)
  return { user: toPublicUser(session.user, profile), source: 'supabase' }
}

export async function changeAccountPassword({ currentPassword, newPassword }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'You must be signed in.' }

  // Re-authenticate with the current password so we can validate it.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword
  })
  if (signInError) {
    return { ok: false, error: 'Your current password is incorrect.' }
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { ok: false, error: error.message || 'Unable to update password' }
  return { ok: true }
}

export async function updateStoredUser(updates) {
  if (!SUPABASE_CONFIGURED) return null

  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) return null

  const fieldMap = {
    name: 'full_name',
    headline: 'headline',
    bio: 'bio',
    location: 'location',
    company: 'company',
    skillsAcquired: 'skills',
    interests: 'interests',
    preferences: 'preferences',
    cohortName: 'cohort_name'
  }

  const patch = {}
  for (const [frontendKey, column] of Object.entries(fieldMap)) {
    if (updates[frontendKey] !== undefined) patch[column] = updates[frontendKey]
  }

  if (Object.keys(patch).length === 0) return null

  const { error } = await supabase
    .from('profiles')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  if (error) {
    console.warn('[EcoSprint] Profile update failed:', error.message)
    return null
  }

  const profile = await ensureUserProfile(user)
  return profile ? toPublicUser(user, profile) : null
}

// Kept for backward compatibility with any callers; works via Supabase session.
export const clearSession = async () => {
  if (SUPABASE_CONFIGURED) await supabase.auth.signOut()
}

const friendlyDeleteError = (error) => {
  const message = error?.message || ''
  if (message.includes('schema cache') || message.includes('Could not find the function')) {
    return (
      'Account deletion is not fully set up on the database yet. ' +
      'Please run the delete_my_account SQL (see project docs) or contact support.'
    )
  }
  if (message.toLowerCase().includes('jwt') || message.toLowerCase().includes('authenticate')) {
    return 'You must be signed in to delete your account.'
  }
  return message || 'Unable to delete your account right now. Please try again.'
}

/**
 * Permanently delete the signed-in Supabase Auth user.
 *
 * The actual `auth.users` delete happens SERVER-SIDE in a SECURITY DEFINER
 * function (`public.delete_my_account`) which verifies the caller's JWT via
 * `auth.uid()` — the frontend never sends another user's id and never holds
 * a service_role key. Deleting the auth.users row cascades to profiles,
 * enrollments, lesson_progress, quiz_results, projects, submissions, saved
 * sprints/jobs, notifications and credentials via ON DELETE CASCADE.
 */
export async function deleteAccount() {
  if (!SUPABASE_CONFIGURED) return notConfigured()

  const { error } = await supabase.rpc('delete_my_account')
  if (error) return { ok: false, error: friendlyDeleteError(error) }

  // Session is now invalid server-side. Clear local storage + notify Supabase.
  try {
    await supabase.auth.signOut()
  } catch {
    // The user no longer exists server-side; local session is cleared below.
  }
  try {
    await clearSession()
  } catch {
    // No-op — local storage cleared by signOut above.
  }
  return { ok: true }
}

export const getAccessToken = async () => {
  if (!SUPABASE_CONFIGURED) return null
  const {
    data: { session }
  } = await supabase.auth.getSession()
  return session?.access_token || null
}

// Legacy stub — no custom REST API exists anymore. Any leftover callers get a
// clear message instead of silently failing.
export async function apiRequestWithRefresh() {
  return {
    ok: false,
    status: 501,
    data: { error: 'The legacy EcoSprint API has been replaced by Supabase.' },
    unreachable: true
  }
}