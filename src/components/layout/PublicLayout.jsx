import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-sand-50 dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-100 selection:bg-forest-100 dark:selection:bg-forest-900 selection:text-forest-900 dark:selection:text-forest-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
