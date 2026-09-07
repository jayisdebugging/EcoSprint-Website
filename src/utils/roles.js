export const ROLE_LEARNER = 'learner'
export const ROLE_TEACHER = 'teacher'
export const ROLE_MENTOR = 'mentor'
export const ROLE_COMPANY = 'company'

export const SIGNUP_ROLES = [ROLE_LEARNER, ROLE_TEACHER]

export const isTeacherRole = (role) => role === ROLE_TEACHER || role === ROLE_MENTOR

export const homeForRole = (role) => {
  if (role === ROLE_TEACHER || role === ROLE_MENTOR) return '/mentor/dashboard'
  if (role === ROLE_COMPANY) return '/company/dashboard'
  return '/dashboard'
}