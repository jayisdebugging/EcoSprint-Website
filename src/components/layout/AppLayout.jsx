import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-sand-50 dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-100 selection:bg-forest-100 dark:selection:bg-forest-900 selection:text-forest-900 dark:selection:text-forest-100 transition-colors duration-200">
      {/* Desktop Sticky Left Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer (Accessible off-canvas) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-charcoal-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-64 max-w-[80vw] bg-white dark:bg-charcoal-900 h-full z-10 animate-in slide-in-from-left duration-200">
            <Sidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
