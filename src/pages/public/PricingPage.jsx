import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, X, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

export const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('cohort') // 'cohort' | 'annual'
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSelectPlan = (planName) => {
    addToast({
      title: `${planName} Selected`,
      message: 'Redirecting to sprint selection and admissions application.',
      type: 'success'
    })
    navigate('/sprints')
  }

  const comparisonFeatures = [
    { name: 'Cohort Duration', individual: '2–4 Weeks', allAccess: 'Full Year Access', enterprise: 'Custom Cadence' },
    { name: 'Sprints Included', individual: '1 Sprint', allAccess: 'Any 3 Sprints', enterprise: 'Unlimited Team Seats' },
    { name: 'Interactive Skill Labs', individual: true, allAccess: true, enterprise: true },
    { name: 'Weekly Live Practitioner Critiques', individual: true, allAccess: true, enterprise: true },
    { name: 'Auditor ISAE 3000 Workpaper Reviews', individual: true, allAccess: true, enterprise: true },
    { name: 'Verifiable Digital Credentials', individual: true, allAccess: true, enterprise: true },
    { name: 'Career Network Direct Referrals', individual: true, allAccess: true, enterprise: 'Talent Sourcing Access' },
    { name: '1-on-1 Dedicated Mentor Office Hours', individual: false, allAccess: true, enterprise: true },
    { name: 'Private Branded Cohort Room', individual: false, allAccess: false, enterprise: true },
    { name: 'Custom Company Case Studies', individual: false, allAccess: false, enterprise: true },
    { name: 'Enterprise Skills Readiness Analytics', individual: false, allAccess: false, enterprise: true },
  ]

  return (
    <div className="py-12 sm:py-16 space-y-20">
      <Container size="default">
        <SectionHeading
          tag="Tuition & Investment"
          title="Simple, Transparent Pricing for Job-Ready Green Skills"
          description="Most fellows are fully sponsored through employer corporate L&D budgets. Flexible payment plans and enterprise volume pricing available."
          align="center"
        />

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-2">
          {/* Plan 1: Individual Sprint */}
          <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 flex flex-col justify-between border border-charcoal-200/80 dark:border-charcoal-800">
            <div className="space-y-4">
              <Badge variant="neutral" size="sm">Single Track</Badge>
              <h3 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">Individual Sprint</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-charcoal-950 dark:text-charcoal-50 font-sans">₹2,499</span>
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">/ sprint</span>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Ideal for practitioners targeting a single technical skill like Scope 1-3 auditing or CSRD compliance.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-charcoal-100 dark:border-charcoal-800 text-xs text-charcoal-700 dark:text-charcoal-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Full 2-4 week cohort access</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> All interactive simulation sandboxes</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Weekly practitioner group critiques</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> 1 Reviewed capstone project</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Verifiable digital credential</li>
              </ul>
            </div>
            <div className="pt-6">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
                onClick={() => handleSelectPlan('Individual Sprint')}
              >
                Select Individual Sprint
              </Button>
            </div>
          </Card>

          {/* Plan 2: All Access (Popular) */}
          <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 border-2 border-forest-600 dark:border-forest-500 relative flex flex-col justify-between shadow-card-hover">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="forest" size="sm" className="shadow-subtle">
                Most Popular
              </Badge>
            </div>
            <div className="space-y-4">
              <Badge variant="forest" size="sm">Career Pivot Track</Badge>
              <h3 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">All Access</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-charcoal-950 dark:text-charcoal-50 font-sans">₹7,999</span>
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">/ year</span>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                For career switchers moving into corporate sustainability leadership or ESG auditing roles.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-charcoal-100 dark:border-charcoal-800 text-xs text-charcoal-700 dark:text-charcoal-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> All cohort Sprints across all tracks</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Priority 1-on-1 mentor office hours</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Unlimited verifiable digital credentials</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Capstone portfolio presentation review</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Direct hiring partner intro network</li>
              </ul>
            </div>
            <div className="pt-6">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                rightIcon={ArrowRight}
                onClick={() => handleSelectPlan('All Access')}
              >
                Enroll in All Access
              </Button>
            </div>
          </Card>

          {/* Plan 3: Enterprise */}
          <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 flex flex-col justify-between border border-charcoal-200/80 dark:border-charcoal-800">
            <div className="space-y-4">
              <Badge variant="neutral" size="sm">Corporate Teams</Badge>
              <h3 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">Enterprise</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-charcoal-950 dark:text-charcoal-50 font-sans">₹1,499</span>
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">/ employee / month</span>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Custom cohorts aligned to internal ESG transition plans, supplier networks, and corporate reporting deadlines.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-charcoal-100 dark:border-charcoal-800 text-xs text-charcoal-700 dark:text-charcoal-300">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Private branded cohort room</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Customized company case studies</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Skills analytics executive dashboard</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Dedicated enterprise success lead</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 shrink-0" /> Volume billing & customized invoicing</li>
              </ul>
            </div>
            <div className="pt-6">
              <Link to="/companies" className="block">
                <Button variant="outline" size="md" className="w-full justify-center">
                  Talk to Enterprise Sales
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* DETAILED COMPARISON TABLE */}
        <div className="max-w-5xl mx-auto pt-10 space-y-6">
          <h3 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50 text-center">
            Comprehensive Plan Comparison
          </h3>

          <div className="bg-white dark:bg-charcoal-900 rounded-xl border border-charcoal-200/80 dark:border-charcoal-800 overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-sand-50 dark:bg-charcoal-800 border-b border-charcoal-200/80 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-200 uppercase font-semibold">
                  <tr>
                    <th className="p-4">Feature</th>
                    <th className="p-4 text-center">Individual Sprint</th>
                    <th className="p-4 text-center text-forest-900 dark:text-forest-300 bg-forest-50/50 dark:bg-forest-950/40">All Access</th>
                    <th className="p-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-charcoal-700 dark:text-charcoal-300">
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-sand-50/40 dark:hover:bg-charcoal-800/40 transition-colors">
                      <td className="p-4 font-semibold text-charcoal-900 dark:text-charcoal-100">{row.name}</td>
                      <td className="p-4 text-center">
                        {typeof row.individual === 'boolean' ? (
                          row.individual ? <Check className="w-4 h-4 text-forest-700 dark:text-forest-400 mx-auto" /> : <X className="w-4 h-4 text-charcoal-300 dark:text-charcoal-600 mx-auto" />
                        ) : (
                          <span>{row.individual}</span>
                        )}
                      </td>
                      <td className="p-4 text-center bg-forest-50/30 dark:bg-forest-950/20 font-medium">
                        {typeof row.allAccess === 'boolean' ? (
                          row.allAccess ? <Check className="w-4 h-4 text-forest-700 dark:text-forest-400 mx-auto" /> : <X className="w-4 h-4 text-charcoal-300 dark:text-charcoal-600 mx-auto" />
                        ) : (
                          <span className="text-forest-900 dark:text-forest-300 font-bold">{row.allAccess}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="w-4 h-4 text-forest-700 dark:text-forest-400 mx-auto" /> : <X className="w-4 h-4 text-charcoal-300 dark:text-charcoal-600 mx-auto" />
                        ) : (
                          <span>{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PricingPage
