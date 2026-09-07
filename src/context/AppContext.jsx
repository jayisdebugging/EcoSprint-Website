import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { PROJECTS } from '../data/projects'
import { SPRINTS } from '../data/sprints'
import {
  changeAccountPassword,
  deleteAccount,
  loginAccount,
  logoutAccount,
  registerAccount,
  resendSignupOtp,
  restoreAuthenticatedSession,
  sendOtpLogin,
  updateStoredUser,
  verifyOtpLogin,
  verifySignupOtp
} from '../services/authService'
import {
  completeLesson,
  createProject,
  enrollUser,
  issueCredential,
  loadUserWorkspace,
  markNotificationReadRow,
  pushNotificationRow,
  savePreferences,
  saveQuizResult,
  setJobSaved,
  setSprintSaved,
  submitProjectRow
} from '../services/supabaseService'
import { cloneCapstoneForUser, createCredentialId, getFirstLessonId, getLessonCount, getSprintById } from '../utils/sprintHelpers'

const AppContext = createContext(null)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

const THEME_KEY = 'ecosprint_theme_preference'
const LEGACY_THEME_KEY = 'ecosprint_theme'

const defaultPreferences = () => ({
  emailDigest: true,
  mentorReminders: true,
  careerAlerts: true,
  peerActivity: false
})

const emptyWorkspace = () => ({
  savedSprintIds: [],
  savedJobIds: [],
  sprintProgress: {},
  projectsList: [],
  credentialsList: [],
  quizResults: {},
  notifications: [],
  linkedin: { connected: false, profileUrl: '', syncStatus: 'NOT_CONNECTED' },
  preferences: defaultPreferences()
})

const applyThemeClass = (resolved) => {
  if (resolved === 'dark') document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

const resolveTheme = (preference) => {
  if (preference === 'dark' || preference === 'light') return preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export const AppProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY)
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved
    return 'system'
  })
  const [theme, setTheme] = useState(() => resolveTheme(localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY) || 'system'))

  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [authSource, setAuthSource] = useState(null)

  const [savedSprintIds, setSavedSprintIds] = useState([])
  const [savedJobIds, setSavedJobIds] = useState([])
  const [sprintProgress, setSprintProgress] = useState({})
  const [projectsList, setProjectsList] = useState([])
  const [credentialsList, setCredentialsList] = useState([])
  const [quizResults, setQuizResults] = useState({})
  const [notifications, setNotifications] = useState([])
  const [linkedin, setLinkedin] = useState({ connected: false, profileUrl: '', syncStatus: 'NOT_CONNECTED' })
  const [preferences, setPreferencesState] = useState(defaultPreferences())

  // Refs mirror the latest state so async flows (credential issuance detected
  // inside progress/project updates) read current values without stale closures.
  const userRef = useRef(null)
  const sprintProgressRef = useRef({})
  const projectsRef = useRef([])
  const credentialsRef = useRef([])
  userRef.current = user
  sprintProgressRef.current = sprintProgress
  projectsRef.current = projectsList
  credentialsRef.current = credentialsList

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themePreference)
    const resolved = resolveTheme(themePreference)
    setTheme(resolved)
    applyThemeClass(resolved)

    if (themePreference !== 'system') return undefined
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const next = resolveTheme('system')
      setTheme(next)
      applyThemeClass(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [themePreference])

  const hydrateWorkspace = (data) => {
    setSavedSprintIds(data.savedSprintIds || [])
    setSavedJobIds(data.savedJobIds || [])
    setSprintProgress(data.sprintProgress || {})
    setProjectsList(data.projectsList || [])
    setCredentialsList(data.credentialsList || [])
    setQuizResults(data.quizResults || {})
    setNotifications(data.notifications || [])
    setLinkedin((prev) => ({ ...emptyWorkspace().linkedin, ...prev }))
    setPreferencesState({ ...defaultPreferences(), ...(data.preferences || {}) })
  }

  const resetWorkspace = () => {
    const ws = emptyWorkspace()
    setSavedSprintIds(ws.savedSprintIds)
    setSavedJobIds(ws.savedJobIds)
    setSprintProgress(ws.sprintProgress)
    setProjectsList(ws.projectsList)
    setCredentialsList(ws.credentialsList)
    setQuizResults(ws.quizResults)
    setNotifications(ws.notifications)
    setLinkedin(ws.linkedin)
    setPreferencesState(ws.preferences)
  }

  const applySessionResult = async (session) => {
    setUser(session.user)
    setAuthSource(session.source)
    const ws = await loadUserWorkspace()
    if (ws.ok) hydrateWorkspace(ws.data)
    else resetWorkspace()
  }

  useEffect(() => {
    let cancelled = false
    const boot = async () => {
      const session = await restoreAuthenticatedSession()
      if (cancelled) return
      if (session?.user) {
        await applySessionResult(session)
      } else {
        setUser(null)
        resetWorkspace()
      }
      setAuthLoading(false)
    }
    boot()

    return () => {
      cancelled = true
    }
  }, [])

  // React to session changes from Supabase (sign-out from another tab, token
  // refresh, email-confirmation redirect, initial load from URL) so the UI
  // never stays out of sync with reality.
  useEffect(() => {
    if (!supabase) return undefined
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setAuthSource(null)
        resetWorkspace()
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const pushNotification = async (item) => {
    const tempId = `ntf_${Date.now()}`
    const optimistic = {
      id: tempId,
      type: item.type || 'info',
      title: item.title || 'Update',
      message: item.message || null,
      icon: item.icon || null,
      read: false,
      createdAt: new Date().toISOString()
    }
    setNotifications((prev) => [optimistic, ...prev].slice(0, 40))
    const result = await pushNotificationRow(item)
    if (result.ok && result.data) {
      setNotifications((prev) => prev.map((n) => (n.id === tempId ? result.data : n)))
    } else if (result.error) {
      console.warn('[EcoSprint] Notification not persisted:', result.error)
    }
    return result
  }

  const mergeSkillsIntoUser = (sprint) => {
    const current = userRef.current
    if (!current) return
    const merged = Array.from(new Set([...(current.skillsAcquired || []), ...(sprint.skills || [])]))
    setUser((prev) => (prev ? { ...prev, skillsAcquired: merged } : prev))
    updateStoredUser({ skillsAcquired: merged })
  }

  /**
   * If every lesson is complete AND the capstone project is submitted, issue a
   * credential for the sprint. Pure check — the issued credential is persisted
   * to Supabase and prepended to the local list.
   */
  const maybeIssueCredential = async (sprintId) => {
    const learner = userRef.current
    if (!learner) return
    const creds = credentialsRef.current
    if (creds.some((c) => c.sprintId === sprintId)) return

    const sprint = getSprintById(sprintId)
    if (!sprint) return
    const total = getLessonCount(sprintId)
    const completed = sprintProgressRef.current[sprintId]?.completedLessons?.length || 0
    if (!total || completed < total) return

    const project = projectsRef.current.find((p) => p.sprintId === sprintId)
    const projectDone = !project || project.status === 'Submitted' || project.status === 'Completed'
    if (!projectDone) return

    const issued = {
      id: `cred-${sprintId}-${learner.id}`,
      title: `EcoSprint Verified Credential — ${sprint.title}`,
      recipientName: learner.name,
      issuedDate: new Date().toISOString().split('T')[0],
      credentialId: createCredentialId(sprintId),
      verificationHash: `eco-${sprintId}-${learner.id}-${Date.now().toString(36)}`,
      status: 'Verified',
      sprintId,
      sprintTitle: sprint.title,
      grade: 'Completed',
      skills: sprint.skills || [],
      issuingMentor: sprint.mentorName || 'EcoSprint Faculty',
      credentialType: 'Professional Cohort Certificate',
      expiryDate: 'Perpetual',
      description: `Awarded to ${learner.name} for completing ${sprint.title}, including required lessons, assessments, and capstone work.`,
      linkedinSyncStatus: 'NOT_CONNECTED'
    }

    const persisted = await issueCredential(issued)
    const row = persisted.ok && persisted.data ? persisted.data : issued

    setCredentialsList((prev) => {
      if (prev.some((c) => c.sprintId === sprintId)) return prev
      return [row, ...prev]
    })
    mergeSkillsIntoUser(sprint)
    pushNotification({
      type: 'CREDENTIAL',
      title: 'Credential issued',
      message: `Your EcoSprint credential for ${sprint.title} is now on your profile.`
    })
  }

  const login = async (email, password, options = {}) => {
    const result = await loginAccount({ email, password })
    if (!result.ok) return result
    await applySessionResult(result)
    return result
  }

  const register = async ({ name, email, password, interests = [], role = 'learner' }) => {
    const result = await registerAccount({ name, email, password, interests, role })
    if (!result.ok || result.needsConfirmation) return result
    await applySessionResult(result)
    return result
  }

  /**
   * Verify a 6-digit OTP (mode 'signup' from registration confirmation,
   * mode 'login' from passwordless sign-in) and sign the user in.
   */
  const verifyOtp = async ({ mode, email, token }) => {
    const result =
      mode === 'login'
        ? await verifyOtpLogin({ email, token })
        : await verifySignupOtp({ email, token })
    if (!result.ok) return result
    await applySessionResult(result)
    return result
  }

  /** Re-send an OTP: signup confirmations or passwordless login codes. */
  const resendOtp = async ({ mode, email }) => {
    return mode === 'login' ? sendOtpLogin({ email }) : resendSignupOtp({ email })
  }

  const logout = async () => {
    await logoutAccount()
    setUser(null)
    setAuthSource(null)
    resetWorkspace()
  }

  const updateUser = (updates) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...updates }
      updateStoredUser(updates)
      return next
    })
  }

  const changePassword = async (currentPassword, newPassword) => {
    if (!user) return { ok: false, error: 'You must be signed in' }
    return changeAccountPassword({ currentPassword, newPassword })
  }

  /**
   * Permanently delete the current account. The auth user is removed
   * server-side by SU 'delete_my_account' (see authService); on success we
   * clear every cached slice of app state so the UI is fully signed out.
   */
  const removeAccount = async () => {
    const result = await deleteAccount()
    if (!result.ok) return result
    setUser(null)
    setAuthSource(null)
    resetWorkspace()
    return result
  }

  const toggleTheme = () => {
    setThemePreference((prev) => {
      const resolved = resolveTheme(prev)
      return resolved === 'dark' ? 'light' : 'dark'
    })
  }

  const toggleSaveSprint = (sprintId) => {
    setSavedSprintIds((prev) => {
      const next = prev.includes(sprintId) ? prev.filter((id) => id !== sprintId) : [...prev, sprintId]
      setSprintSaved(sprintId, next.includes(sprintId)).catch((e) =>
        console.warn('[EcoSprint] Could not sync saved sprint:', e)
      )
      return next
    })
  }

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      const next = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
      setJobSaved(jobId, next.includes(jobId)).catch((e) =>
        console.warn('[EcoSprint] Could not sync saved job:', e)
      )
      return next
    })
  }

  const enrollInSprint = async (sprintId) => {
    if (!userRef.current) return { ok: false, error: 'Authentication required' }
    if (sprintProgressRef.current[sprintId]?.enrolled) return { ok: true }

    const firstLesson = getFirstLessonId(sprintId)
    const result = await enrollUser(sprintId, firstLesson)
    if (!result.ok) return result

    // Clone the capstone template into the learner's own project workbook.
    const capstone = cloneCapstoneForUser(sprintId, userRef.current.id)
    if (capstone && !projectsRef.current.some((p) => p.sprintId === sprintId)) {
      const proj = await createProject(userRef.current.id, capstone)
      if (proj.ok && proj.data) {
        setProjectsList((prev) => (prev.some((p) => p.sprintId === sprintId) ? prev : [...prev, proj.data]))
      } else {
        console.warn('[EcoSprint] Capstone project not created:', proj.error)
      }
    }

    const next = {
      ...sprintProgressRef.current,
      [sprintId]: {
        enrolled: true,
        progress: 0,
        completedLessons: [],
        currentLessonId: firstLesson,
        enrollmentDate: new Date().toISOString().split('T')[0]
      }
    }
    setSprintProgress(next)
    sprintProgressRef.current = next

    const sprint = getSprintById(sprintId)
    pushNotification({
      type: 'ENROLLMENT',
      title: 'Enrollment recorded',
      message: `You are enrolled in ${sprint?.title || 'this Sprint'}.`
    })
    return { ok: true }
  }

  const markLessonComplete = async (sprintId, lessonId, nextLessonId, totalLessons = 10) => {
    if (!userRef.current) return
    const current = sprintProgressRef.current[sprintId] || { enrolled: true, completedLessons: [], progress: 0 }
    const already = current.completedLessons.includes(lessonId)

    let newCompleted
    if (already) {
      newCompleted = current.completedLessons.filter((l) => l !== lessonId)
    } else {
      newCompleted = [...current.completedLessons, lessonId]
    }

    const total = getLessonCount(sprintId) || totalLessons || 1
    const newProgress = Math.min(100, Math.round((newCompleted.length / total) * 100))
    const next = {
      ...sprintProgressRef.current,
      [sprintId]: {
        ...current,
        enrolled: true,
        completedLessons: newCompleted,
        currentLessonId: nextLessonId || current.currentLessonId || lessonId,
        progress: newProgress,
        completedAt:
          newProgress === 100 && !current.completedAt
            ? new Date().toISOString().split('T')[0]
            : current.completedAt
      }
    }
    setSprintProgress(next)
    sprintProgressRef.current = next

    completeLesson({
      sprintId,
      lessonId,
      nextLessonId: nextLessonId || current.currentLessonId || lessonId,
      progress: newProgress
    }).catch((e) => console.warn('[EcoSprint] Progress not persisted:', e))

    await maybeIssueCredential(sprintId)
  }

  const submitProject = async (projectId, submission) => {
    const result = await submitProjectRow(projectId, submission)
    if (!result.ok) return result

    const next = projectsRef.current.map((proj) => {
      if (proj.id !== projectId) return proj
      return {
        ...proj,
        status: 'Submitted',
        progress: 100,
        submittedAt: new Date().toISOString().split('T')[0],
        submissionData: submission
      }
    })
    setProjectsList(next)
    projectsRef.current = next

    const project = next.find((p) => p.id === projectId)
    if (project?.sprintId) {
      await maybeIssueCredential(project.sprintId)
    }
    pushNotification({
      type: 'PROJECT',
      title: 'Capstone submitted',
      message: 'Your project brief has been saved in this workspace.'
    })
    return { ok: true }
  }

  const addCredential = (credential) => {
    issueCredential(credential).then((persisted) => {
      setCredentialsList((prev) => [persisted.ok && persisted.data ? persisted.data : credential, ...prev])
    })
  }

  const saveQuizResultToState = (sprintId, lessonId, result) => {
    setQuizResults((prev) => ({
      ...prev,
      [lessonId]: { ...result, sprintId, submittedAt: new Date().toISOString() }
    }))
    saveQuizResult({
      sprintId,
      lessonId,
      quizLabel: result.quizLabel,
      score: result.score,
      total: result.total,
      passed: result.passed,
      answers: result.answers
    }).catch((e) => console.warn('[EcoSprint] Quiz result not saved:', e))
  }

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    markNotificationReadRow(id).catch((e) => console.warn('[EcoSprint] Notification not updated:', e))
  }

  const connectLinkedInPlaceholder = () => {
    setLinkedin({
      connected: false,
      profileUrl: '',
      syncStatus: 'NOT_SUPPORTED'
    })
    return {
      ok: false,
      pending: true,
      message: 'LinkedIn OAuth is not connected in this environment yet.'
    }
  }

  const setPreferences = (next) => {
    const merged = { ...defaultPreferences(), ...next }
    setPreferencesState(merged)
    savePreferences(merged).catch((e) => console.warn('[EcoSprint] Preferences not saved:', e))
  }

  const value = useMemo(
    () => ({
      theme,
      themePreference,
      setThemePreference,
      toggleTheme,
      authLoading,
      user,
      isAuthenticated: Boolean(user),
      authSource,
      login,
      logout,
      register,
      verifyOtp,
      resendOtp,
      updateUser,
      changePassword,
      deleteAccount: removeAccount,
      savedSprintIds,
      toggleSaveSprint,
      isSprintSaved: (id) => savedSprintIds.includes(id),
      savedJobIds,
      toggleSaveJob,
      isJobSaved: (id) => savedJobIds.includes(id),
      sprintProgress,
      enrollInSprint,
      markLessonComplete,
      isEnrolled: (sprintId) => Boolean(sprintProgress[sprintId]?.enrolled),
      projectsList,
      submitProject,
      credentialsList,
      addCredential,
      quizResults,
      saveQuizResult: saveQuizResultToState,
      notifications,
      markNotificationRead,
      linkedin,
      connectLinkedInPlaceholder,
      preferences,
      setPreferences,
      catalogSprints: SPRINTS,
      catalogProjects: PROJECTS
    }),
    [
      theme,
      themePreference,
      authLoading,
      user,
      authSource,
      savedSprintIds,
      savedJobIds,
      sprintProgress,
      projectsList,
      credentialsList,
      quizResults,
      notifications,
      linkedin,
      preferences
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider