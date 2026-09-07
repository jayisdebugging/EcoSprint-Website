import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { AppProvider } from './context/AppContext'

// Layouts
import { PublicLayout } from './components/layout/PublicLayout'
import { AppLayout } from './components/layout/AppLayout'
import { GuestRoute, ProtectedRoute, RoleRoute, LearnerOnlyRoute } from './components/auth/ProtectedRoute'

// Public Pages
import { HomePage } from './pages/public/HomePage'
import { AboutPage } from './pages/public/AboutPage'
import { SprintsPage } from './pages/public/SprintsPage'
import { SprintDetailPage } from './pages/public/SprintDetailPage'
import { MentorsPage } from './pages/public/MentorsPage'
import { CareersPage } from './pages/public/CareersPage'
import { CompaniesPage } from './pages/public/CompaniesPage'
import { PricingPage } from './pages/public/PricingPage'
import { LoginPage } from './pages/public/LoginPage'
import { RegisterPage } from './pages/public/RegisterPage'
import { VerifyOtpPage } from './pages/public/VerifyOtpPage'
import { VerifyCredentialPage } from './pages/public/VerifyCredentialPage'

// Learner Application Pages
import { DashboardPage } from './pages/learner/DashboardPage'
import { MySprintsPage } from './pages/learner/MySprintsPage'
import { SprintRoomPage } from './pages/learner/SprintRoomPage'
import { SkillLabsPage } from './pages/learner/SkillLabsPage'
import { ProjectsPage } from './pages/learner/ProjectsPage'
import { ProjectDetailPage } from './pages/learner/ProjectDetailPage'
import { CredentialsPage } from './pages/learner/CredentialsPage'
import { CareersDashboardPage } from './pages/learner/CareersDashboardPage'
import { ProfilePage } from './pages/learner/ProfilePage'
import { SettingsPage } from './pages/learner/SettingsPage'

// Role Portals
import { MentorDashboardPage } from './pages/mentor/MentorDashboardPage'
import { CompanyDashboardPage } from './pages/company/CompanyDashboardPage'

// Not Found
import { EmptyState } from './components/ui/EmptyState'
import { Button } from './components/ui/Button'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <EmptyState
        title="Page Not Found"
        description="The requested EcoSprint page could not be located. It might have been moved or updated."
        action={
          <Link to="/">
            <Button variant="primary" size="sm">
              Return to Homepage
            </Button>
          </Link>
        }
      />
    </div>
  )
}

export function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sprints" element={<SprintsPage />} />
            <Route path="/sprints/:id" element={<SprintDetailPage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-otp" element={<VerifyOtpPage />} />
            </Route>
            <Route path="/verify/:id" element={<VerifyCredentialPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Authenticated Learner Application Routes */}
          <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* Learner workspace — mentors/teachers are redirected to their own portal */}
            <Route element={<LearnerOnlyRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/my-sprints" element={<MySprintsPage />} />
              <Route path="/sprint-room/:id" element={<SprintRoomPage />} />
              <Route path="/skill-labs" element={<SkillLabsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/credentials" element={<CredentialsPage />} />
              <Route path="/careers-dashboard" element={<CareersDashboardPage />} />
            </Route>
            {/* Shared account sections — available to every signed-in role */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Role Portals — access is gated by the Supabase-backed profile role */}
            <Route element={<RoleRoute roles={['teacher', 'mentor']} />}>
              <Route path="/mentor/dashboard" element={<MentorDashboardPage />} />
            </Route>
            <Route path="/company/dashboard" element={<CompanyDashboardPage />} />
          </Route>
          </Route>
        </Routes>
      </AppProvider>
    </ToastProvider>
  )
}

export default App
