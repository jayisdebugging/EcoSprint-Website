import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Compass,
  FlaskConical,
  FolderGit2,
  Award,
  Briefcase,
  Users,
  User,
  Settings,
  ExternalLink,
  Building2,
  Sparkles
} from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { useApp } from '../../context/AppContext'
import { isTeacherRole } from '../../utils/roles'
import { cn } from '../../utils/cn'

export const Sidebar = ({ onClose }) => {
  const location = useLocation()
  const { user, sprintProgress, credentialsList } = useApp()

  const activeCount = Object.values(sprintProgress || {}).filter((s) => s.enrolled && (s.progress || 0) < 100).length
  const credsCount = credentialsList?.length || 0
  const isTeacher = isTeacherRole(user?.role)

  const mentorMainNavItems = [
    { label: 'Mentors', to: '/mentors', icon: Users },
  ]

  const learnerMainNavItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'My Sprints', to: '/my-sprints', icon: Compass, badge: activeCount > 0 ? `${activeCount} Active` : undefined },
    { label: 'Skill Labs', to: '/skill-labs', icon: FlaskConical },
    { label: 'Projects', to: '/projects', icon: FolderGit2 },
    { label: 'Credentials', to: '/credentials', icon: Award, badge: credsCount ? `${credsCount}` : undefined },
    { label: 'Career Network', to: '/careers-dashboard', icon: Briefcase },
    { label: 'Mentors', to: '/mentors', icon: Users },
  ]

  const mainNavItems = isTeacher ? mentorMainNavItems : learnerMainNavItems

  const mentorPortals = [
    { label: 'Mentor Portal', to: '/mentor/dashboard', icon: Sparkles },
    { label: 'Company Portal', to: '/company/dashboard', icon: Building2 },
  ]

  const learnerPortals = [
    { label: 'Company Portal', to: '/company/dashboard', icon: Building2 },
  ]

  const rolePortals = isTeacher ? mentorPortals : learnerPortals

  const bottomNavItems = [
    { label: 'Profile', to: '/profile', icon: User },
    { label: 'Settings', to: '/settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 bg-white dark:bg-charcoal-900 border-r border-charcoal-200/80 dark:border-charcoal-800 flex flex-col h-full select-none transition-colors duration-200">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-charcoal-100 dark:border-charcoal-800">
        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2">
          <img
            src="/ecosprint-tree.png"
            alt=""
            width={28}
            height={29}
            className="w-auto h-7 object-contain animate-fade-in"
            decoding="async"
            draggable={false}
          />
          <span className="text-base font-bold tracking-tight text-charcoal-950 dark:text-charcoal-50">
            EcoSprint
          </span>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Core Learning Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 mb-2">
            Learning Hub
          </p>
          {mainNavItems.map((item) => {
            const active = isActive(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors group',
                  active
                    ? 'bg-forest-50 dark:bg-forest-950/60 text-forest-900 dark:text-forest-200 font-semibold'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-950 dark:hover:text-charcoal-50 hover:bg-sand-100 dark:hover:bg-charcoal-800'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      active ? 'text-forest-700 dark:text-forest-400' : 'text-charcoal-400 dark:text-charcoal-500 group-hover:text-charcoal-700 dark:group-hover:text-charcoal-300'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                      active
                        ? 'bg-forest-200 dark:bg-forest-900/80 text-forest-900 dark:text-forest-200'
                        : 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Portals Switcher */}
        <div className="space-y-1 pt-2 border-t border-charcoal-100 dark:border-charcoal-800">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 mb-2">
            Portals
          </p>
          {rolePortals.map((item) => {
            const active = isActive(item.to)
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors group',
                  active
                    ? 'bg-sand-200 dark:bg-charcoal-800 text-charcoal-900 dark:text-charcoal-100 font-semibold'
                    : 'text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-800 dark:hover:text-charcoal-200 hover:bg-sand-100 dark:hover:bg-charcoal-800'
                )}
              >
                <Icon className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-500 group-hover:text-charcoal-600 dark:group-hover:text-charcoal-300" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Bottom User Area */}
      <div className="p-3 border-t border-charcoal-100 dark:border-charcoal-800 bg-sand-50/70 dark:bg-charcoal-950/70 space-y-1">
        {bottomNavItems.map((item) => {
          const active = isActive(item.to)
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                active
                  ? 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-300 font-semibold shadow-subtle'
                  : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-50 hover:bg-sand-100 dark:hover:bg-charcoal-800'
              )}
            >
              <Icon className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-500" />
              <span>{item.label}</span>
            </Link>
          )
        })}

        <Link
          to="/"
          className="flex items-center justify-between px-3 py-1.5 text-xs text-charcoal-500 dark:text-charcoal-400 hover:text-forest-800 dark:hover:text-forest-300 transition-colors"
        >
          <span>Exit to Website</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* User Card */}
        <div className="pt-2 mt-2 border-t border-charcoal-200/60 dark:border-charcoal-800 flex items-center gap-2.5 px-2">
          <Avatar
            src={user?.avatar}
            name={user?.name || 'Learner'}
            size="sm"
            status="online"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-charcoal-900 dark:text-charcoal-100 truncate">
              {user?.name || 'Learner'}
            </p>
            <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400 truncate">
              {user?.role === 'learner' ? (user?.cohortName || 'EcoSprint Learner') : `${user?.role?.toUpperCase()} Mode`}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
