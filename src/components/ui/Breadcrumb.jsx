import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '../../utils/cn'

export const Breadcrumb = ({ items = [], showHome = true, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-charcoal-500 dark:text-charcoal-400', className)}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-charcoal-500 dark:text-charcoal-400 hover:text-forest-700 dark:hover:text-forest-400 transition-colors"
              aria-label="Home"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
        )}
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="inline-flex items-center">
              {(showHome || index > 0) && (
                <ChevronRight className="w-3.5 h-3.5 mx-1 text-charcoal-300 dark:text-charcoal-600 shrink-0" />
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="hover:text-forest-700 dark:hover:text-forest-400 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast ? 'text-charcoal-900 dark:text-charcoal-100 font-semibold truncate max-w-[200px] sm:max-w-none' : 'text-charcoal-500 dark:text-charcoal-400'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
