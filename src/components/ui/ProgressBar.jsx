import React from 'react'
import { cn } from '../../utils/cn'

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  variant = 'forest',
  className
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100)

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }

  const variants = {
    forest: 'bg-forest-500',
    sage: 'bg-forest-400',
    neutral: 'bg-charcoal-600 dark:bg-charcoal-400',
    amber: 'bg-amber-500'
  }

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-medium text-charcoal-700 dark:text-charcoal-300">
          {label && <span>{label}</span>}
          {showValue && <span className="text-charcoal-500 dark:text-charcoal-400 tabular-nums font-mono">{percentage}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-sand-200/90 dark:bg-charcoal-800 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('h-full transition-all duration-700 ease-out rounded-full', variants[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

export default ProgressBar
