import React, { useState } from 'react'
import { cn } from '../../utils/cn'

export const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  className
}) => {
  const [imageError, setImageError] = useState(false)

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-medium',
    lg: 'w-12 h-12 text-base font-medium',
    xl: 'w-16 h-16 text-lg font-semibold'
  }

  const statusSizes = {
    xs: 'w-1.5 h-1.5 bottom-0 right-0',
    sm: 'w-2 h-2 bottom-0 right-0',
    md: 'w-2.5 h-2.5 bottom-0 right-0',
    lg: 'w-3 h-3 bottom-0.5 right-0.5',
    xl: 'w-3.5 h-3.5 bottom-1 right-1'
  }

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    offline: 'bg-charcoal-400'
  }

  const getInitials = (str) => {
    if (!str) return 'ES'
    const parts = str.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return parts[0].slice(0, 2).toUpperCase()
  }

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center select-none border border-charcoal-200/80 dark:border-charcoal-700',
          'bg-sand-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-sand-100',
          sizes[size],
          className
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute rounded-full ring-2 ring-white dark:ring-charcoal-900',
            statusColors[status] || 'bg-charcoal-400',
            statusSizes[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  )
}

export default Avatar
