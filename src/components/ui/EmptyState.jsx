import React from 'react'
import { FolderOpen } from 'lucide-react'
import { cn } from '../../utils/cn'

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are no records to display at this time.',
  action,
  secondaryAction,
  className
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12',
        'bg-white dark:bg-charcoal-900 rounded-xl border border-dashed border-charcoal-200/90 dark:border-charcoal-800',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-sand-100 dark:bg-charcoal-800 flex items-center justify-center text-charcoal-500 dark:text-charcoal-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-charcoal-900 dark:text-charcoal-50 tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-charcoal-600 dark:text-charcoal-400 max-w-sm mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}

export default EmptyState
