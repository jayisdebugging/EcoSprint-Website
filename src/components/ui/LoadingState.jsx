import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export const LoadingState = ({
  message = 'Loading data...',
  type = 'spinner', // 'spinner' | 'skeleton'
  count = 3,
  className
}) => {
  if (type === 'skeleton') {
    return (
      <div className={cn('space-y-4 w-full animate-pulse', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white border border-charcoal-200/80 rounded-lg p-5 space-y-3">
            <div className="h-4 bg-sand-200 rounded w-1/3" />
            <div className="h-3 bg-sand-100 rounded w-4/5" />
            <div className="h-3 bg-sand-100 rounded w-2/5" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center', className)}>
      <Loader2 className="w-8 h-8 text-forest-700 animate-spin mb-3" />
      <p className="text-sm text-charcoal-600 font-medium">{message}</p>
    </div>
  )
}

export default LoadingState
