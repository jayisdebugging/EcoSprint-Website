import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '../../utils/cn'

const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ title, message, type = 'success', duration = 4000 }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5)
    setToasts((prev) => [...prev, { id, title, message, type }])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-forest-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />
  }

  const borderAccents = {
    success: 'border-l-4 border-l-forest-600',
    warning: 'border-l-4 border-l-amber-500',
    error: 'border-l-4 border-l-rose-500',
    info: 'border-l-4 border-l-sky-500'
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Notification Viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 rounded-lg shadow-dropdown',
              'transition-all duration-200 animate-in slide-in-from-bottom-2 fade-in',
              borderAccents[toast.type] || borderAccents.info
            )}
            role="alert"
          >
            {icons[toast.type] || icons.info}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-xs font-semibold text-charcoal-900 dark:text-charcoal-50 tracking-tight">
                  {toast.title}
                </h4>
              )}
              {toast.message && (
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200 p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
