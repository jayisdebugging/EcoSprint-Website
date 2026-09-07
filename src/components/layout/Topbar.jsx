import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Bell, Search, Sparkles } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useApp } from '../../context/AppContext'

export const Topbar = ({ onOpenMobileMenu }) => {
  const location = useLocation()
  const { user } = useApp()

  // Format breadcrumb title based on path
  const getContextTitle = () => {
    const path = location.pathname
    if (path === '/dashboard') return 'Learner Dashboard'
    if (path === '/my-sprints') return 'My Sprints'
    if (path.startsWith('/sprint-room')) return 'Cohort Sprint Room'
    if (path === '/skill-labs') return 'Interactive Skill Labs'
    if (path === '/projects') return 'Hands-on Projects'
    if (path.startsWith('/projects/')) return 'Project Workspace'
    if (path === '/credentials') return 'Verifiable Credentials'
    if (path === '/careers-dashboard') return 'Career Network'
    if (path === '/profile') return 'Learner Profile'
    if (path === '/settings') return 'Settings'
    if (path === '/mentor/dashboard') return 'Mentor Portal'
    if (path === '/company/dashboard') return 'Enterprise Portal'
    return 'EcoSprint'
  }

  return (
    <header className="h-16 bg-white dark:bg-charcoal-900 border-b border-forest-200/70 dark:border-forest-900 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-md text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-charcoal-50 hover:bg-sand-100 dark:hover:bg-charcoal-800 focus-visible:ring-2 focus-visible:ring-charcoal-500"
          aria-label="Open application sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-base sm:text-lg font-semibold text-charcoal-900 dark:text-charcoal-50 tracking-tight">
            {getContextTitle()}
          </h1>
          <Badge variant="sage" size="sm" className="hidden sm:inline-flex">
            Cohort Active
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Search simulated trigger */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 text-xs text-charcoal-400 dark:text-charcoal-500 bg-sand-50/50 dark:bg-charcoal-800/50 hover:border-charcoal-300 dark:hover:border-charcoal-600 cursor-pointer">
          <Search className="w-3.5 h-3.5" />
          <span>Quick search modules...</span>
          <kbd className="text-[10px] font-mono bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 px-1.5 py-0.5 rounded text-charcoal-500 dark:text-charcoal-400">
            ⌘K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle size="sm" />

        {/* Notifications Button */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-800 dark:hover:text-charcoal-200 hover:bg-sand-100 dark:hover:bg-charcoal-800 transition-colors focus-visible:ring-2 focus-visible:ring-charcoal-500"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-charcoal-700 dark:bg-sand-50 ring-2 ring-white dark:ring-charcoal-900" />
        </button>

        {/* User Avatar Link */}
        <Link to="/profile" className="flex items-center gap-2 group">
          <Avatar
            src={user?.avatar}
            name={user?.name || 'Learner'}
            size="sm"
            className="ring-1 ring-charcoal-200 dark:ring-charcoal-700 group-hover:ring-charcoal-400 dark:group-hover:ring-charcoal-500 transition-all"
          />
        </Link>
      </div>
    </header>
  )
}

export default Topbar
