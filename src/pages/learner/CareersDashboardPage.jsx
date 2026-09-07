import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Bookmark,
  Award,
  Lightbulb,
  ExternalLink
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { JobCard } from '../../components/cards/JobCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { useApp } from '../../context/AppContext'
import { JOBS } from '../../data/jobs'

export const CareersDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('recommended')
  const { savedJobIds } = useApp()

  const savedJobs = JOBS.filter((j) => savedJobIds.includes(j.id))
  const recommendedJobs = JOBS

  const companies = [
    { name: 'Verdant Dynamics', sector: 'Clean Mobility & Batteries', location: 'Stockholm, Sweden', openRoles: 2 },
    { name: 'Apex BioPackaging', sector: 'Circular Packaging', location: 'Frankfurt, Germany', openRoles: 1 },
    { name: 'PureLoop Materials', sector: 'Materials Innovation', location: 'Zurich, Switzerland', openRoles: 1 },
    { name: 'TerraGrid Systems', sector: 'Renewable Infrastructure', location: 'Amsterdam, Netherlands', openRoles: 1 }
  ]

  return (
    <div className="space-y-8 max-w-6xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">Personalized Career Network</h1>
            <Badge variant="forest" size="sm">Verified Talent</Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
            Exclusive sustainability positions matched directly to your earned credentials and capstone workpapers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/careers">
            <Button variant="outline" size="sm" rightIcon={ExternalLink}>
              Public Job Board
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Completion & Skill Readiness Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
              Talent Profile Completion
            </span>
            <span className="text-xs font-bold text-forest-800 dark:text-forest-400">85%</span>
          </div>

          <ProgressBar value={85} size="md" />

          <div className="pt-2 text-xs text-charcoal-600 dark:text-charcoal-300 space-y-1">
            <p className="flex items-center gap-1.5 text-forest-800 dark:text-forest-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3 Verifiable Credentials Linked
            </p>
            <p className="flex items-center gap-1.5 text-forest-800 dark:text-forest-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> ISAE 3000 Carbon Model Capstone Attached
            </p>
            <p className="text-charcoal-500 dark:text-charcoal-400 pt-1">
              Tip: Add your target salary preference in Settings to unlock 100% profile strength.
            </p>
          </div>
        </Card>

        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
              Technical Skill Readiness
            </span>
            <span className="text-xs font-bold text-forest-800 dark:text-forest-400">92% Match</span>
          </div>

          <ProgressBar value={92} size="md" />

          <div className="pt-2 text-xs text-charcoal-600 dark:text-charcoal-300 space-y-1">
            <p className="font-semibold text-charcoal-900 dark:text-charcoal-50">
              Top Match: Senior Carbon Accounting & ESG Analyst roles
            </p>
            <p className="text-charcoal-500 dark:text-charcoal-400 text-[11px]">
              Based on verified competencies in GHG Protocol Corporate Standard, Scope 3 EEIO, and Double Materiality.
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs: Recommended vs Saved vs Hiring Companies */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-charcoal-200 dark:border-charcoal-800 pb-2">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'recommended'
                ? 'bg-forest-800 text-white'
                : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-50'
            }`}
          >
            Recommended Opportunities ({recommendedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'saved'
                ? 'bg-forest-800 text-white'
                : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-50'
            }`}
          >
            Saved Roles ({savedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
              activeTab === 'companies'
                ? 'bg-forest-800 text-white'
                : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-50'
            }`}
          >
            Hiring Partners ({companies.length})
          </button>
        </div>

        {/* Tab 1: Recommended */}
        {activeTab === 'recommended' && (
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <JobCard key={job.id} job={job} showMatch />
            ))}
          </div>
        )}

        {/* Tab 2: Saved */}
        {activeTab === 'saved' && (
          <div>
            {savedJobs.length > 0 ? (
              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <JobCard key={job.id} job={job} showMatch />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Saved Positions"
                description="Click the bookmark button on any job card to track opportunities here."
                action={
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('recommended')}>
                    View Recommended Roles
                  </Button>
                }
              />
            )}
          </div>
        )}

        {/* Tab 3: Companies */}
        {activeTab === 'companies' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companies.map((c, i) => (
              <Card key={i} className="bg-white dark:bg-charcoal-900 p-5 space-y-2 border border-charcoal-200 dark:border-charcoal-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">{c.name}</h4>
                  <Badge variant="sage" size="sm">{c.openRoles} Active Roles</Badge>
                </div>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 font-medium">{c.sector}</p>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{c.location}</p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Career Insights & Disclaimer Notice */}
      <Card className="bg-sand-50/80 dark:bg-charcoal-900 p-5 rounded-xl border border-charcoal-200 dark:border-charcoal-800 space-y-2 text-xs">
        <h4 className="font-bold text-charcoal-900 dark:text-charcoal-50 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-forest-700 dark:text-forest-400" /> Career Network Transparency Notice
        </h4>
        <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
          EcoSprint provides direct candidate referrals and portfolio verification to hiring partners based on demonstrated capstone evaluations. We do not guarantee employment or wage rates; final hiring determinations are made solely by partner organizations.
        </p>
      </Card>
    </div>
  )
}

export default CareersDashboardPage
