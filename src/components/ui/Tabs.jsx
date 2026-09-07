import React from 'react'
import { cn } from '../../utils/cn'

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'underline', // 'underline' | 'pill'
  className
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center space-x-1 overflow-x-auto no-scrollbar',
        variant === 'underline' && 'border-b border-charcoal-200 dark:border-charcoal-800',
        variant === 'pill' && 'bg-sand-100 dark:bg-charcoal-800/80 p-1 rounded-lg border border-charcoal-200/60 dark:border-charcoal-700/60 inline-flex',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(tab.id)}
            className={cn(
              'px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 rounded-md',
              variant === 'underline' && [
                'border-b-2 -mb-px rounded-b-none px-4 py-2.5',
                isActive
                  ? 'border-forest-700 dark:border-forest-500 text-forest-900 dark:text-forest-400 bg-transparent'
                  : 'border-transparent text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-800 dark:hover:text-charcoal-200 hover:border-charcoal-300 dark:hover:border-charcoal-700'
              ],
              variant === 'pill' && [
                isActive
                  ? 'bg-white dark:bg-charcoal-900 text-forest-900 dark:text-forest-200 shadow-subtle ring-1 ring-forest-200 dark:ring-forest-800'
                  : 'text-charcoal-600 dark:text-charcoal-400 hover:text-forest-900 dark:hover:text-forest-200 hover:bg-forest-50/60 dark:hover:bg-charcoal-700/50'
              ]
            )}
          >
            <span className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                    isActive
                      ? 'bg-forest-100 text-forest-800 dark:bg-forest-900/60 dark:text-forest-300'
                      : 'bg-charcoal-200 text-charcoal-700 dark:bg-charcoal-700 dark:text-charcoal-300'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
