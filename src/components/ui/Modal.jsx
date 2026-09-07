import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-lg',
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          'relative w-full bg-white dark:bg-charcoal-900 rounded-xl shadow-modal border border-charcoal-200/80 dark:border-charcoal-800',
          'overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-150',
          maxWidth,
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-charcoal-100 dark:border-charcoal-800">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-charcoal-900 dark:text-charcoal-50 tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors focus-visible:ring-2 focus-visible:ring-charcoal-500"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-charcoal-800 dark:text-charcoal-200">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 bg-sand-50 dark:bg-charcoal-950 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
