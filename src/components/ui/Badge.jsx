import React from 'react'
import { cn } from '../../utils/cn'

export const Badge = ({
  children,
  variant = 'forest',
  size = 'md',
  dot = false,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide transition-colors'

  const variants = {
    forest: 'bg-forest-800 text-sand-50 border border-forest-800 dark:bg-forest-500 dark:text-forest-950 dark:border-forest-400',
    sage: 'bg-forest-50 text-forest-900 border border-forest-200 dark:bg-forest-950/60 dark:text-forest-200 dark:border-forest-900',
    neutral: 'bg-charcoal-100 text-charcoal-700 border border-charcoal-200 dark:bg-charcoal-800 dark:text-charcoal-300 dark:border-charcoal-700',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/80',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/80',
    info: 'bg-sky-50 text-sky-800 border border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/80',
    outline: 'bg-transparent text-charcoal-700 border border-charcoal-300 dark:text-charcoal-300 dark:border-charcoal-700',
    dark: 'bg-charcoal-900 text-sand-50 border border-charcoal-800 dark:bg-charcoal-800 dark:text-charcoal-200 dark:border-charcoal-700'
  }

  const dotColors = {
    forest: 'bg-forest-500 dark:bg-forest-400',
    sage: 'bg-forest-500',
    neutral: 'bg-charcoal-400',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    outline: 'bg-charcoal-500',
    dark: 'bg-sand-50'
  }

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  )
}

export default Badge
