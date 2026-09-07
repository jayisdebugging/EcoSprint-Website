import React from 'react'
import { cn } from '../../utils/cn'

export const SectionHeading = ({
  tag,
  title,
  description,
  align = 'left',
  action,
  className,
  titleClassName
}) => {
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'mb-8 sm:mb-12',
        isCentered ? 'text-center mx-auto max-w-2xl' : 'flex flex-col md:flex-row md:items-end justify-between gap-4',
        className
      )}
    >
      <div className={cn(isCentered && 'mx-auto')}>
        {tag && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sand-50 dark:text-charcoal-950 bg-charcoal-900 dark:bg-sand-50 px-2.5 py-1 rounded-full mb-3">
            {tag}
          </span>
        )}
        <h2
          className={cn(
            'text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight leading-tight',
            titleClassName
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-2.5 text-sm sm:text-base text-charcoal-600 dark:text-charcoal-400 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && !isCentered && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}

export default SectionHeading
