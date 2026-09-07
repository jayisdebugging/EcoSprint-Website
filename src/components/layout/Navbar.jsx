import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight, LayoutDashboard, UserCheck, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useApp } from '../../context/AppContext'
import { cn } from '../../utils/cn'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useApp()

  const isLoggedIn = Boolean(user)

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    navigate('/')
  }

  const navLinks = [
    { label: 'Sprints', to: '/sprints' },
    { label: 'Mentors', to: '/mentors' },
    { label: 'Careers', to: '/careers' },
    { label: 'Companies', to: '/companies' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'About', to: '/about' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-forest-200/70 dark:border-forest-900 transition-colors duration-200">
      <Container size="default">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none animate-fade-in"
          >
            <img
              src="/ecosprint-tree.png"
              alt=""
              width={31}
              height={32}
              className="w-auto h-8 sm:h-9 object-contain animate-fade-in"
              decoding="async"
              draggable={false}
            />
            <span className="text-lg font-bold tracking-tight text-charcoal-950 dark:text-charcoal-50 select-none">
              EcoSprint
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                  isActive(link.to)
                    ? 'text-forest-800 dark:text-forest-300 bg-forest-50/80 dark:bg-forest-950/50 font-semibold'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-charcoal-50 hover:bg-sand-100/60 dark:hover:bg-charcoal-800/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-2.5">
            <ThemeToggle size="sm" />

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-xs font-semibold text-charcoal-700 dark:text-charcoal-200 hover:text-forest-700 dark:hover:text-forest-400"
                >
                  <UserCheck className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">{user?.name?.split(' ')[0] || 'Learner'}</span>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={LayoutDashboard}
                    className="text-xs font-semibold"
                  >
                    Workspace
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={LogOut}
                  onClick={handleLogout}
                  className="text-xs font-semibold"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-xs font-semibold">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="text-xs font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <Link to="/sprints">
              <Button
                variant="primary"
                size="sm"
                rightIcon={ArrowRight}
                className="text-xs font-semibold"
              >
                Explore Sprints
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle size="sm" />

            <Link to="/dashboard">
              <Button variant="outline" size="xs" leftIcon={LayoutDashboard}>
                App
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-charcoal-50 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 focus-visible:ring-2 focus-visible:ring-forest-600"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-forest-200/70 dark:border-forest-900 py-4 px-2 space-y-2 bg-white/95 dark:bg-charcoal-950/95 animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                    isActive(link.to)
                      ? 'bg-forest-50 dark:bg-forest-950/50 text-forest-800 dark:text-forest-300 font-semibold'
                      : 'text-charcoal-700 dark:text-charcoal-300 hover:bg-sand-100 dark:hover:bg-charcoal-800'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="md" className="w-full justify-center" leftIcon={UserCheck}>
                      {user?.name || 'My Profile'}
                    </Button>
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="subtle" size="md" className="w-full justify-center" leftIcon={LayoutDashboard}>
                      Workspace
                    </Button>
                  </Link>
                  <Button variant="ghost" size="md" className="w-full justify-center" leftIcon={LogOut} onClick={handleLogout}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="md" className="w-full justify-center">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" size="md" className="w-full justify-center">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              <Link to="/sprints" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center" rightIcon={ArrowRight}>
                  Explore Sprints
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Navbar
