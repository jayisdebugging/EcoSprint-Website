import React from 'react'
import { cn } from '../../utils/cn'

export const Card = ({
  children,
  className,
  hoverable = false,
  bordered = true,
  padding = 'default', // 'none' | 'sm' | 'default' | 'lg'
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }

  return (
    <div
      className={cn(
        'bg-white dark:bg-charcoal-900 rounded-lg transition-all duration-200 shadow-card text-charcoal-900 dark:text-charcoal-100',
        bordered && 'border border-charcoal-200/80 dark:border-charcoal-800',
        hoverable && 'hover:shadow-card-hover hover:border-forest-300 dark:hover:border-forest-800 hover:-translate-y-0.5 cursor-pointer',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className, as: Component = 'h3', ...props }) => (
  <Component className={cn('text-lg font-semibold text-charcoal-900 dark:text-charcoal-50 tracking-tight leading-snug', className)} {...props}>
    {children}
  </Component>
)

export const CardDescription = ({ children, className, ...props }) => (
  <p className={cn('text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed', className)} {...props}>
    {children}
  </p>
)

export const CardContent = ({ children, className, ...props }) => (
  <div className={cn('space-y-4', className)} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('pt-4 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between', className)} {...props}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
