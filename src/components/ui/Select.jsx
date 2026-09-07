import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export const Select = React.forwardRef(({
  id,
  label,
  options = [],
  placeholder = 'Select an option',
  helperText,
  error,
  className,
  wrapperClassName,
  required = false,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={cn('w-full space-y-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
          {label} {required && <span className="text-rose-600 dark:text-rose-400">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={cn(
            'w-full appearance-none rounded-md border bg-white dark:bg-charcoal-800 px-3.5 py-2 pr-9 text-sm text-charcoal-900 dark:text-charcoal-100',
            'transition-colors duration-150 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-forest-600/30 dark:focus:ring-forest-500/40 focus:border-forest-600 dark:focus:border-forest-500',
            error
              ? 'border-rose-300 dark:border-rose-700 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 dark:text-rose-200'
              : 'border-charcoal-200 dark:border-charcoal-700 hover:border-forest-400 dark:hover:border-forest-600',
            className
          )}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt
            const labelText = typeof opt === 'object' ? opt.label : opt
            return (
              <option key={val} value={val}>
                {labelText}
              </option>
            )
          })}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500">
          <ChevronDown className="w-4 h-4" />
        </div>
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

Select.displayName = 'Select'
export default Select
