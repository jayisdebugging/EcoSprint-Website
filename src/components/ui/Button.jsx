import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 ease-spec active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 dark:focus-visible:ring-forest-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 dark:focus-visible:ring-offset-charcoal-950 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md'

  const variants = {
    primary: 'bg-forest-800 text-sand-50 hover:bg-forest-900 hover:shadow-card active:bg-forest-950 dark:bg-sand-50 dark:text-charcoal-950 dark:hover:bg-white dark:shadow-none',
    secondary: 'bg-sand-100 text-charcoal-800 border border-charcoal-200 hover:bg-sand-200 hover:border-forest-300 active:bg-sand-300 dark:bg-charcoal-800 dark:text-sand-50 dark:border-charcoal-700 dark:hover:bg-charcoal-700 dark:hover:border-forest-700',
    outline: 'bg-white text-charcoal-900 border border-charcoal-300 hover:bg-forest-50 hover:border-forest-600 active:bg-forest-100 shadow-subtle dark:bg-transparent dark:text-sand-50 dark:border-charcoal-600 dark:hover:bg-charcoal-800 dark:hover:border-forest-500 dark:hover:text-forest-200',
    ghost: 'text-charcoal-700 hover:bg-forest-50 hover:text-forest-900 active:bg-forest-100 dark:text-charcoal-300 dark:hover:bg-charcoal-800 dark:hover:text-forest-200',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-subtle dark:bg-rose-600 dark:hover:bg-rose-500',
    subtle: 'bg-sand-100 text-charcoal-800 hover:bg-sand-200 active:bg-sand-300 dark:bg-charcoal-800 dark:text-charcoal-200 dark:hover:bg-charcoal-700 dark:hover:text-forest-200'
  }

  const sizes = {
    xs: 'text-xs px-2.5 py-1 gap-1.5 h-7',
    sm: 'text-xs font-semibold px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-11',
    xl: 'text-base font-semibold px-6 py-3 gap-3 h-12'
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        LeftIcon && <LeftIcon className={cn("shrink-0", size === 'xs' || size === 'sm' ? "w-3.5 h-3.5" : "w-4 h-4")} />
      )}
      <span>{children}</span>
      {!isLoading && RightIcon && (
        <RightIcon className={cn("shrink-0", size === 'xs' || size === 'sm' ? "w-3.5 h-3.5" : "w-4 h-4")} />
      )}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
