import { supabase, SUPABASE_CONFIGURED, SUPABASE_CONFIG_MESSAGE } from '../lib/supabase'

/**
 * Supabase data layer for learner workspace state.
 *
 * Only ever uses the public anon key. Every table is protected by RLS
 * (user_id = auth.uid()) so each query is naturally scoped to the signed-in
 * user. Static catalogs (sprints, lessons, mentors, jobs, project templates)
 * stay in the frontend codebase; only user-owned rows live in Supabase.
 */

const mapNotificationRow = (row) => ({
  id: row.id,
  type: row.type,
  title: row.title,
  message: row.message,
  icon: row.icon || null,
  read: row.read,
  createdAt: row.created_at
})

const notConfigured = () => ({ ok: false, error: SUPABASE_CONFIG_MESSAGE })

const getUserId = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user?.id || null
}

const dbError = (error, fallback) => {
  if (!error) return null
  console.warn('[EcoSprint] Supabase error:', error.message)
  return error.message || fallback
}

// ---------------------------------------------------------------- mappers

const mapProjectRow = (row) => ({
  id: row.id,
  title: row.title,
  sprintId: row.sprint_id,
  sprintTitle: row.sprint_title,
  difficulty: row.difficulty,
  estimatedHours: row.estimated_hours,
  status: row.status,
  progress: row.progress,
  rubricScore: row.rubric_score,
  dueDate: row.due_date,
  clientScenario: row.client_scenario,
  learningObjectives: row.learning_objectives,
  requirements: row.requirements,
  resources: row.resources,
  deliverables: row.deliverables,
  skillsDemonstrated: row.skills_demonstrated,
  auditorFeedback: row.auditor_feedback,
  submittedAt: row.submitted_at,
  submissionData: row.submission_data,
  createdAt: row.created_at
})

const projectToRow = (p, userId) => ({
  user_id: userId,
  sprint_id: p.sprintId || null,
  sprint_title: p.sprintTitle || null,
  title: p.title,
  client_scenario: p.clientScenario ?? null,
  learning_objectives: p.learningObjectives ?? null,
  requirements: p.requirements ?? null,
  resources: p.resources ?? null,
  deliverables: p.deliverables ?? null,
  skills_demonstrated: p.skillsDemonstrated ?? null,
  estimated_hours: p.estimatedHours ?? null,
  difficulty: p.difficulty ?? null,
  due_date: p.dueDate ?? null,
  status: p.status || 'In Progress',
  progress: p.progress ?? 0,
  rubric_score: p.rubricScore ?? null,
  auditor_feedback: p.auditorFeedback ?? null,
  submitted_at: p.submittedAt ?? null,
  submission_data: p.submissionData ?? null
})

const mapCredentialRow = (row) => ({
  id: row.id,
  credentialId: row.credential_id,
  verificationHash: row.verification_hash,
  title: row.title,
  recipientName: row.recipient_name,
  issuedDate: row.issued_date,
  status: row.status,
  sprintId: row.sprint_id,
  sprintTitle: row.sprint_title,
  grade: row.grade,
  skills: row.skills || [],
  issuingMentor: row.issuing_mentor,
  credentialType: row.credential_type,
  expiryDate: row.expiry_date,
  description: row.description,
  linkedinSyncStatus: row.linkedin_sync_status,
  createdAt: row.created_at
})

const credentialToRow = (c, userId) => ({
  user_id: userId,
  credential_id: c.credentialId,
  verification_hash: c.verificationHash || null,
  title: c.title,
  recipient_name: c.recipientName || null,
  issued_date: c.issuedDate || null,
  status: c.status || 'Verified',
  sprint_id: c.sprintId || null,
  sprint_title: c.sprintTitle || null,
  grade: c.grade || null,
  skills: c.skills || [],
  issuing_mentor: c.issuingMentor || null,
  credential_type: c.credentialType || 'Sprint Completion',
  expiry_date: c.expiryDate || null,
  description: c.description || null,
  linkedin_sync_status: c.linkedinSyncStatus || 'Not Linked'
})

// ---------------------------------------------------------------- loading

/**
 * Load everything the learner app needs for the signed-in user.
 */
export async function loadUserWorkspace() {
  if (!SUPABASE_CONFIGURED) return { ok: false, error: SUPABASE_CONFIG_MESSAGE }

  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const [
    savedSprints,
    savedJobs,
    enrollments,
    lessonProgress,
    projects,
    credentials,
    quizResults,
    notifications,
    profile
  ] = await Promise.all([
    supabase.from('saved_sprints').select('sprint_id').eq('user_id', userId),
    supabase.from('saved_jobs').select('job_id').eq('user_id', userId),
    supabase.from('enrollments').select('*').eq('user_id', userId),
    supabase.from('lesson_progress').select('*').eq('user_id', userId),
    supabase.from('projects').select('*').eq('user_id', userId),
    supabase.from('credentials').select('*').eq('user_id', userId),
    supabase.from('quiz_results').select('*').eq('user_id', userId),
    supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(40),
    supabase.from('profiles').select('preferences').eq('id', userId).maybeSingle()
  ])

  const sprintProgress = {}
  if (!enrollments.error) {
    for (const e of enrollments.data || []) {
      sprintProgress[e.sprint_id] = {
        enrolled: true,
        progress: e.progress || 0,
        completedLessons: [],
        currentLessonId: e.current_lesson_id || null,
        enrollmentDate: e.enrolled_at ? e.enrolled_at.slice(0, 10) : undefined,
        completedAt: e.completed_at ? e.completed_at.slice(0, 10) : undefined
      }
    }
  }
  if (!lessonProgress.error) {
    for (const lp of lessonProgress.data || []) {
      const entry = sprintProgress[lp.sprint_id]
      if (entry && lp.completed) entry.completedLessons.push(lp.lesson_id)
    }
  }

  const quizLookup = {}
  if (!quizResults.error) {
    for (const q of quizResults.data || []) {
      const key = q.lesson_id || q.quiz_label || q.id
      quizLookup[key] = {
        score: q.score,
        total: q.total,
        passed: q.passed,
        answers: q.answers,
        sprintId: q.sprint_id,
        submittedAt: q.submitted_at
      }
    }
  }

  return {
    ok: true,
    data: {
      savedSprintIds: (savedSprints.error ? [] : savedSprints.data || []).map((r) => r.sprint_id),
      savedJobIds: (savedJobs.error ? [] : savedJobs.data || []).map((r) => r.job_id),
      sprintProgress,
      projectsList: (projects.error ? [] : projects.data || []).map(mapProjectRow),
      credentialsList: (credentials.error ? [] : credentials.data || []).map(mapCredentialRow),
      quizResults: quizLookup,
      notifications: (notifications.error ? [] : notifications.data || []).map(mapNotificationRow),
      preferences:
        (profile.data?.preferences) ||
        (profile.error ? null : null) || {
          emailDigest: true,
          mentorReminders: true,
          careerAlerts: true,
          peerActivity: false
        }
    }
  }
}

// ---------------------------------------------------------------- saved items

export async function setSprintSaved(sprintId, saved) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  if (saved) {
    const { error } = await supabase
      .from('saved_sprints')
      .upsert({ user_id: userId, sprint_id: sprintId }, { onConflict: 'user_id,sprint_id' })
    return { ok: !error, error: dbError(error, 'Could not save sprint') }
  }
  const { error } = await supabase
    .from('saved_sprints')
    .delete()
    .eq('user_id', userId)
    .eq('sprint_id', sprintId)
  return { ok: !error, error: dbError(error, 'Could not unsave sprint') }
}

export async function setJobSaved(jobId, saved) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  if (saved) {
    const { error } = await supabase
      .from('saved_jobs')
      .upsert({ user_id: userId, job_id: jobId }, { onConflict: 'user_id,job_id' })
    return { ok: !error, error: dbError(error, 'Could not save job') }
  }
  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .eq('user_id', userId)
    .eq('job_id', jobId)
  return { ok: !error, error: dbError(error, 'Could not unsave job') }
}

// ---------------------------------------------------------------- enrollment

export async function enrollUser(sprintId, firstLessonId) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const now = new Date().toISOString()
  const { data: existing } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('sprint_id', sprintId)
    .maybeSingle()

  if (!existing) {
    const { error } = await supabase.from('enrollments').insert({
      user_id: userId,
      sprint_id: sprintId,
      status: 'active',
      progress: 0,
      current_lesson_id: firstLessonId || null,
      enrolled_at: now,
      created_at: now,
      updated_at: now
    })
    if (error) return { ok: false, error: dbError(error, 'Could not enroll') }
  }
  return { ok: true }
}

export async function createProject(userId, capstone) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const { data, error } = await supabase
    .from('projects')
    .insert(projectToRow(capstone, userId))
    .select('*')
    .single()
  if (error) return { ok: false, error: dbError(error, 'Could not create project') }
  return { ok: true, data: mapProjectRow(data) }
}

// ---------------------------------------------------------------- progress

export async function completeLesson({ sprintId, lessonId, nextLessonId, progress }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const now = new Date().toISOString()
  await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: userId,
        sprint_id: sprintId,
        lesson_id: lessonId,
        completed: true,
        completed_at: now
      },
      { onConflict: 'user_id,lesson_id' }
    )

  const patch = {
    progress,
    updated_at: now
  }
  if (nextLessonId) patch.current_lesson_id = nextLessonId
  if (progress >= 100) patch.completed_at = now

  const { error } = await supabase
    .from('enrollments')
    .update(patch)
    .eq('user_id', userId)
    .eq('sprint_id', sprintId)
  if (error) return { ok: false, error: dbError(error, 'Could not save progress') }
  return { ok: true }
}

// ---------------------------------------------------------------- projects

export async function submitProjectRow(projectId, submission) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const now = new Date().toISOString()
  const { data: project } = await supabase
    .from('projects')
    .select('sprint_id')
    .eq('id', projectId)
    .single()

  const { error: updateError } = await supabase
    .from('projects')
    .update({ status: 'Submitted', progress: 100, submitted_at: now, submission_data: submission, updated_at: now })
    .eq('id', projectId)
    .eq('user_id', userId)
  if (updateError) return { ok: false, error: dbError(updateError, 'Could not submit project') }

  const { error: submissionError } = await supabase.from('project_submissions').insert({
    user_id: userId,
    project_id: projectId,
    sprint_id: project?.sprint_id || null,
    submission_data: submission,
    status: 'Submitted',
    submitted_at: now
  })
  if (submissionError) {
    console.warn('[EcoSprint] Submission record failed:', submissionError.message)
  }
  return { ok: true }
}

// ---------------------------------------------------------------- credentials

export async function issueCredential(credential) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const { data, error } = await supabase
    .from('credentials')
    .insert(credentialToRow(credential, userId))
    .select('*')
    .single()
  if (error) return { ok: false, error: dbError(error, 'Could not issue credential') }
  return { ok: true, data: mapCredentialRow(data) }
}

/**
 * Public credential verification. The lookup works by credentialId,
 * verificationHash, or the UUID of the row itself.
 */
const CREDENTIAL_UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function getCredentialByLookup(lookup) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const term = String(lookup || '').trim()
  if (!term) return { ok: false, error: 'No credential ID provided.' }

  // Look up the text columns first. Credentials are shared as a human-readable
  // credential_id / verification_hash — mixing the uuid `id` column into the
  // same PostgREST .or() filter makes every non-UUID lookup fail with
  // `invalid input syntax for type uuid`.
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .or(`credential_id.eq.${term},verification_hash.eq.${term}`)
    .limit(1)
  if (error) return { ok: false, error: dbError(error, 'Verification service unavailable') }
  const row = data && data.length ? data[0] : null

  if (!row && CREDENTIAL_UUID_RE.test(term)) {
    const { data: byId, error: idError } = await supabase
      .from('credentials')
      .select('*')
      .eq('id', term)
      .limit(1)
    if (idError) return { ok: false, error: dbError(idError, 'Verification service unavailable') }
    const idRow = byId && byId.length ? byId[0] : null
    if (idRow) return { ok: true, data: mapCredentialRow(idRow) }
  }

  return { ok: Boolean(row), data: row ? mapCredentialRow(row) : null }
}

// ---------------------------------------------------------------- quiz

export async function saveQuizResult({ sprintId, lessonId, quizLabel, score, total, passed, answers }) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const { error } = await supabase.from('quiz_results').insert({
    user_id: userId,
    sprint_id: sprintId || null,
    lesson_id: lessonId || null,
    quiz_label: quizLabel || null,
    score: score || 0,
    total: total || 0,
    passed: Boolean(passed),
    answers: answers || null,
    submitted_at: new Date().toISOString()
  })
  return { ok: !error, error: dbError(error, 'Could not save quiz result') }
}

// ---------------------------------------------------------------- notifications

export async function pushNotificationRow(item) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type: item.type || 'info',
      title: item.title || 'Update',
      message: item.message || null,
      icon: item.icon || null,
      read: false,
      created_at: new Date().toISOString()
    })
    .select('*')
    .single()
  if (error) return { ok: false, error: dbError(error, 'Could not save notification') }
  return { ok: true, data: mapNotificationRow(data) }
}

export async function markNotificationReadRow(id) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const { error } = await supabase.from('notifications').update({ read: true }).eq('id', id)
  return { ok: !error, error: dbError(error, 'Could not update notification') }
}

// ---------------------------------------------------------------- preferences

export async function savePreferences(preferences) {
  if (!SUPABASE_CONFIGURED) return notConfigured()
  const userId = await getUserId()
  if (!userId) return { ok: false, error: 'You must be signed in.' }

  const { error } = await supabase
    .from('profiles')
    .update({ preferences, updated_at: new Date().toISOString() })
    .eq('id', userId)
  return { ok: !error, error: dbError(error, 'Could not save preferences') }
}