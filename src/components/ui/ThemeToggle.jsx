import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { cn } from '../../utils/cn'

export const ThemeToggle = ({ className, showLabel = false, size = 'md' }) => {
  const { theme, toggleTheme } = useApp()
  const isDark = theme === 'dark'

  const sizeClasses = {
    sm: 'p-1.5 rounded-lg text-xs',
    md: 'p-2 rounded-lg text-sm',
    lg: 'px-3 py-2 rounded-lg text-sm'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5'
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center gap-2 font-medium transition-all duration-200 select-none',
        'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/50',
        'bg-sand-100/70 hover:bg-sand-200/90 text-charcoal-700 hover:text-forest-900 border-forest-200/70 shadow-subtle',
        'dark:bg-charcoal-800 dark:hover:bg-charcoal-700 dark:text-charcoal-200 dark:border-forest-900',
        sizeClasses[size],
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className={cn(iconSizes[size], 'text-amber-400 transform transition-transform duration-300 rotate-0 hover:rotate-45')} />
        ) : (
          <Moon className={cn(iconSizes[size], 'text-charcoal-600 transform transition-transform duration-300 -rotate-12 hover:rotate-0')} />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-charcoal-700 dark:text-charcoal-300">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  )
}

export default ThemeToggle
