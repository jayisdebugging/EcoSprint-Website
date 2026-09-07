import React from 'react'
import { cn } from '../../utils/cn'

export const Input = React.forwardRef(({
  id,
  label,
  helperText,
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  rightElement,
  className,
  wrapperClassName,
  type = 'text',
  required = false,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={cn('w-full space-y-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
          {label} {required && <span className="text-rose-600 dark:text-rose-400">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3 pointer-events-none text-charcoal-400 dark:text-charcoal-500">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          className={cn(
            'w-full rounded-md border bg-white dark:bg-charcoal-800 px-3.5 py-2 text-sm text-charcoal-900 dark:text-charcoal-100 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-forest-600/30 dark:focus:ring-forest-500/40 focus:border-forest-600 dark:focus:border-forest-500',
            LeftIcon && 'pl-9',
            (RightIcon || rightElement) && 'pr-10',
            error
              ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200'
              : 'border-charcoal-200 dark:border-charcoal-700 hover:border-forest-400 dark:hover:border-forest-600',
            className
          )}
          {...props}
        />
        {rightElement ? (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        ) : RightIcon ? (
          <div className="absolute right-3 pointer-events-none text-charcoal-400 dark:text-charcoal-500">
            <RightIcon className="w-4 h-4" />
          </div>
        ) : null}
      </div>
      {error && (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-charcoal-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
