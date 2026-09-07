import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Globe, Check } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { useToast } from '../ui/Toast'

export const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { addToast } = useToast()

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email) return
    setIsSubscribed(true)
    addToast({
      title: 'Subscribed to EcoSprint Climate Brief',
      message: 'You will receive monthly cohort announcements and industry case studies.',
      type: 'success'
    })
    setEmail('')
  }

  return (
    <footer className="bg-white dark:bg-charcoal-900 border-t border-charcoal-200/80 dark:border-charcoal-800 text-charcoal-700 dark:text-charcoal-300 transition-colors duration-200">
      <Container size="default" className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src="/ecosprint-tree.png"
                alt=""
                width={32}
                height={33}
                className="w-auto h-8 object-contain animate-fade-in"
                decoding="async"
                draggable={false}
              />
              <span className="text-lg font-bold tracking-tight text-charcoal-950 dark:text-charcoal-50">
                EcoSprint
              </span>
            </Link>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed max-w-sm">
              The Next-Gen Sustainability Upskilling Platform. Agile 2–4 week cohort-based Sprints
              turning climate theory into verifiable corporate decarbonization projects.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-charcoal-500 dark:text-charcoal-400">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                ISO 14064 & GHG Aligned
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Globe className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                Low-Carbon Hosted
              </span>
            </div>
          </div>

          {/* Column 1: Sprints */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100">
              Skill Tracks
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-600 dark:text-charcoal-400">
              <li>
                <Link to="/sprints?track=Carbon%20Accounting" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  Carbon Accounting
                </Link>
              </li>
              <li>
                <Link to="/sprints?track=Circular%20Economy" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  Circular Economy & LCA
                </Link>
              </li>
              <li>
                <Link to="/sprints?track=ESG%20%26%20Compliance" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  CSRD & ESG Compliance
                </Link>
              </li>
              <li>
                <Link to="/sprints?track=Clean%20Energy" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  Renewable Microgrids
                </Link>
              </li>
              <li>
                <Link to="/sprints" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  All Cohorts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-600 dark:text-charcoal-400">
              <li>
                <Link to="/mentors" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  Practitioner Mentors
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  Career Network
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  For Enterprise Teams
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  Tuition & Tiers
                </Link>
              </li>
              <li>
                <Link to="/credentials" className="hover:text-forest-800 dark:hover:text-forest-300 transition-colors">
                  Verify Credentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100">
              Stay Informed
            </h4>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
              Receive cohort announcements and real-world sustainability case briefs.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full text-xs px-3 py-2 rounded-md border border-charcoal-200 dark:border-charcoal-700 bg-sand-50 dark:bg-charcoal-800 text-charcoal-900 dark:text-charcoal-100 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-600"
              />
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-full text-xs justify-center"
                rightIcon={isSubscribed ? Check : ArrowRight}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-200/80 dark:border-charcoal-800 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400 gap-4">
          <p>© {new Date().getFullYear()} EcoSprint Technologies Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-charcoal-800 dark:hover:text-charcoal-200 transition-colors">About Us</Link>
            <span className="hover:text-charcoal-800 dark:hover:text-charcoal-200 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-charcoal-800 dark:hover:text-charcoal-200 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-charcoal-800 dark:hover:text-charcoal-200 cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
