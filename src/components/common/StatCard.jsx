import React from 'react'
import { Card } from '../ui/Card'
import { cn } from '../../utils/cn'

export const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  className
}) => {
  return (
    <Card className={cn('p-5 bg-white dark:bg-charcoal-900 flex flex-col justify-between border border-charcoal-200/80 dark:border-charcoal-800', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-sand-100 dark:bg-charcoal-800 flex items-center justify-center text-charcoal-700 dark:text-charcoal-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-2xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight font-sans">
          {value}
        </p>
        {(subtitle || trend) && (
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <span className="font-semibold text-forest-700 dark:text-forest-400">
                {trend}
              </span>
            )}
            {subtitle && (
              <span className="text-charcoal-500 dark:text-charcoal-400">
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatCard
