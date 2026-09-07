import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingState } from '../ui/LoadingState'
import { useApp } from '../../context/AppContext'
import { homeForRole, isTeacherRole } from '../../utils/roles'

export const ProtectedRoute = () => {
  const { user, authLoading } = useApp()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-charcoal-950">
        <LoadingState message="Checking your session..." />
      </div>
    )
  }

  if (!user) {
    const redirect = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />
  }

  return <Outlet />
}

export const GuestRoute = () => {
  const { user, authLoading } = useApp()

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingState message="Loading..." />
      </div>
    )
  }

  if (user) {
    return <Navigate to={homeForRole(user.role)} replace />
  }

  return <Outlet />
}

/**
 * Role gate used to guard role-specific portals. The role value originates
 * from the RLS-protected `profiles` row (set server-side at signup or by an
 * administrator), never from a client-control. Unauthorized users are routed
 * back to their own home dashboard.
 */
export const RoleRoute = ({ roles = [] }) => {
  const { user, authLoading } = useApp()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-charcoal-950">
        <LoadingState message="Checking your session..." />
      </div>
    )
  }

  if (!user) {
    const redirect = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={homeForRole(user.role)} replace />
  }

  return <Outlet />
}

/**
 * Learner-area gate. Teachers/mentors are routed to their own portal instead
 * of the learner workspace — applied at the route level so manually-typed
 * learner URLs can never render the learner experience for mentoring roles.
 */
export const LearnerOnlyRoute = () => {
  const { user, authLoading } = useApp()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-charcoal-950">
        <LoadingState message="Checking your session..." />
      </div>
    )
  }

  if (!user) {
    const redirect = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />
  }

  if (isTeacherRole(user.role)) {
    return <Navigate to="/mentor/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
