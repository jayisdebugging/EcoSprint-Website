import React, { useState } from 'react'
import {
  Building2,
  Users,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Search,
  Award,
  CheckCircle2,
  Calendar,
  Filter,
  UserCheck
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Avatar } from '../../components/ui/Avatar'
import { StatCard } from '../../components/common/StatCard'
import { useToast } from '../../components/ui/Toast'

export const CompanyDashboardPage = () => {
  const { addToast } = useToast()
  const [talentSearch, setTalentSearch] = useState('')

  const employees = [
    { name: 'Karin Larsson', role: 'Finance Controller', track: 'Carbon Accounting', progress: 85, score: 95, status: 'On Track' },
    { name: 'Nils Berg', role: 'Procurement Manager', track: 'Supply Chain Scope 3', progress: 60, score: 90, status: 'On Track' },
    { name: 'Astrid Lind', role: 'Packaging Designer', track: 'Circular Product Design', progress: 90, score: 94, status: 'Complete' },
    { name: 'Erik Vang', role: 'Operations Director', track: 'CSRD & Double Materiality', progress: 70, score: 88, status: 'On Track' },
    { name: 'Johan Ek', role: 'Facilities Lead', track: 'Renewable Microgrids', progress: 45, score: 82, status: 'Needs Review' }
  ]

  const candidates = [
    {
      name: 'Alex Rivera',
      role: 'Sustainability Analyst & ESG Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      matchScore: 96,
      skills: ['GHG Protocol', 'Scope 1-3 Boundary Setting', 'Double Materiality', 'ISAE 3000 Workpapers'],
      sprintsCompleted: ['Corporate Carbon Accounting', 'CSRD Compliance', 'Sustainable Supply Chains'],
      credentials: ['ECO-CSRD-2026-00124', 'ECO-SC-2026-00089'],
      projectHighlight: 'Enterprise Scope 1-3 Carbon Inventory & Audit Model (Grade: 94%)'
    },
    {
      name: 'Freja Holm',
      role: 'Circular Economy Product Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      matchScore: 92,
      skills: ['ISO 14040 LCA', 'OpenLCA', 'Design for Disassembly', 'Ecoinvent Inventory'],
      sprintsCompleted: ['Circular Product Design & LCA Modelling'],
      credentials: ['ECO-CIRC-2026-00042'],
      projectHighlight: 'Comparative LCA on Bio-composite Packaging (Grade: 96%)'
    },
    {
      name: 'Lars Olofsson',
      role: 'Clean Energy & Microgrid Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      matchScore: 88,
      skills: ['PPA Financial Modeling', 'BESS Peak Shaving', 'HOMER Energy Simulation'],
      sprintsCompleted: ['Industrial Decarbonization & Renewable Microgrids'],
      credentials: ['ECO-MICRO-2026-00115'],
      projectHighlight: 'Manufacturing Plant Microgrid Sizing & PPA Offtake Plan (Grade: 92%)'
    }
  ]

  const filteredCandidates = candidates.filter((c) => {
    if (!talentSearch.trim()) return true
    const q = talentSearch.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q))
    )
  })

  const handleContactCandidate = (candidateName) => {
    addToast({
      title: 'Interview Inquiry Sent',
      message: `An introduction request was dispatched to ${candidateName} via the Career Network.`,
      type: 'success'
    })
  }

  return (
    <div className="space-y-8 max-w-7xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-charcoal-900 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">Enterprise Upskilling Portal</h1>
            <Badge variant="forest" size="sm">Nordic Transition Group</Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
            Corporate sustainability workforce readiness, employee cohort progress, and talent pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => addToast({ title: 'Seats Allocated', message: 'Allocated 5 additional sprint seats for Q4.', type: 'success' })}
          >
            Allocate Seats (+5)
          </Button>
        </div>
      </div>

      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Employees Enrolled"
          value="18 / 25"
          subtitle="7 seats available"
        />
        <StatCard
          icon={UserCheck}
          title="Active Learners"
          value="14 Fellows"
          subtitle="Autumn-2026 Cohort"
          trend="82% on schedule"
        />
        <StatCard
          icon={TrendingUp}
          title="Completion Rate"
          value="94.6%"
          subtitle="+12% vs last cohort"
          trend="Auditor verified"
        />
        <StatCard
          icon={Award}
          title="Skills Developed"
          value="34 Badges"
          subtitle="Verified on Ledger"
        />
      </div>

      {/* SKILLS ANALYTICS & UPCOMING COHORTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Analytics */}
        <Card className="lg:col-span-2 bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
            <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">
              Department Sustainability Capability Index
            </h3>
            <span className="text-xs font-bold text-forest-800 dark:text-forest-400">CSRD Target: 90%</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                <span>Finance & Accounting (Carbon Accounting & Scope 1-3)</span>
                <span className="text-forest-800 dark:text-forest-400">85% Ready</span>
              </div>
              <ProgressBar value={85} size="md" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                <span>Procurement & Logistics (Scope 3 Supply Chain)</span>
                <span className="text-amber-700 dark:text-amber-400">60% Ready</span>
              </div>
              <ProgressBar value={60} size="md" variant="amber" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                <span>Product Innovation & R&D (Circular Design & LCA)</span>
                <span className="text-forest-800 dark:text-forest-400">90% Ready</span>
              </div>
              <ProgressBar value={90} size="md" />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                <span>Legal & Compliance (CSRD & EU Taxonomy)</span>
                <span className="text-forest-800 dark:text-forest-400">75% Ready</span>
              </div>
              <ProgressBar value={75} size="md" />
            </div>
          </div>
        </Card>

        {/* Upcoming Cohorts */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
            Upcoming Corporate Cohorts
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-sand-50 dark:bg-charcoal-800/60 rounded-lg border border-charcoal-200 dark:border-charcoal-700 space-y-1">
              <span className="text-[10px] font-bold uppercase text-forest-800 dark:text-forest-400">Starting Nov 16</span>
              <p className="font-bold text-charcoal-900 dark:text-charcoal-50">Supply Chain Decarbonization</p>
              <p className="text-charcoal-500 dark:text-charcoal-400">6 team members enrolled</p>
            </div>

            <div className="p-3.5 bg-sand-50 dark:bg-charcoal-800/60 rounded-lg border border-charcoal-200 dark:border-charcoal-700 space-y-1">
              <span className="text-[10px] font-bold uppercase text-forest-800 dark:text-forest-400">Starting Dec 07</span>
              <p className="font-bold text-charcoal-900 dark:text-charcoal-50">Renewable Energy Microgrids</p>
              <p className="text-charcoal-500 dark:text-charcoal-400">4 team members enrolled</p>
            </div>
          </div>
        </Card>
      </div>

      {/* EMPLOYEE PROGRESS TABLE */}
      <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
        <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">
            Enrolled Employees Progression
          </h3>
          <span className="text-xs text-charcoal-500 dark:text-charcoal-400">{employees.length} Active Fellows</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="border-b border-charcoal-200 dark:border-charcoal-800 text-charcoal-500 dark:text-charcoal-400 uppercase font-semibold">
              <tr>
                <th className="py-2.5">Employee</th>
                <th className="py-2.5">Sprint Track</th>
                <th className="py-2.5">Progress</th>
                <th className="py-2.5">Auditor Score</th>
                <th className="py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-charcoal-700 dark:text-charcoal-300">
              {employees.map((emp, i) => (
                <tr key={i} className="hover:bg-sand-50/50 dark:hover:bg-charcoal-800/50">
                  <td className="py-3 font-semibold text-charcoal-900 dark:text-charcoal-50">
                    <div>{emp.name}</div>
                    <div className="text-[10px] text-charcoal-400 font-normal">{emp.role}</div>
                  </td>
                  <td className="py-3">{emp.track}</td>
                  <td className="py-3 w-36">
                    <div className="space-y-1">
                      <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 font-mono">{emp.progress}%</span>
                      <ProgressBar value={emp.progress} size="sm" />
                    </div>
                  </td>
                  <td className="py-3 font-bold text-forest-800 dark:text-forest-400">{emp.score}%</td>
                  <td className="py-3 text-right">
                    <Badge variant={emp.status === 'Complete' ? 'sage' : emp.status === 'Needs Review' ? 'warning' : 'forest'} size="sm">
                      {emp.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FIND SUSTAINABILITY TALENT (CANDIDATE CARDS) */}
      <div className="space-y-4 pt-4 border-t border-charcoal-200 dark:border-charcoal-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">Find Sustainability Talent</h2>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
              Pre-vetted sprint graduates with verified capstones and demonstrable skills.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <Input
              placeholder="Search talent by skill or role..."
              value={talentSearch}
              onChange={(e) => setTalentSearch(e.target.value)}
              leftIcon={Search}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCandidates.map((cand, idx) => (
            <Card key={idx} className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <Avatar src={cand.avatar} name={cand.name} size="lg" status="online" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 truncate">{cand.name}</h3>
                    <p className="text-xs font-semibold text-forest-800 dark:text-forest-400 line-clamp-1">{cand.role}</p>
                    <Badge variant="forest" size="sm" className="mt-1">
                      {cand.matchScore}% Capability Match
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-charcoal-800 dark:text-charcoal-200 block">Verified Capstone Dossier</span>
                  <p className="text-charcoal-600 dark:text-charcoal-300 bg-sand-50 dark:bg-charcoal-800/60 p-2.5 rounded border border-charcoal-200/60 dark:border-charcoal-700 leading-relaxed text-[11px]">
                    {cand.projectHighlight}
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-charcoal-800 dark:text-charcoal-200 block">Skills Mastered</span>
                  <div className="flex flex-wrap gap-1">
                    {cand.skills.map((s, i) => (
                      <span key={i} className="text-[10px] bg-sand-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200/60 dark:border-charcoal-700 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
                <span className="text-[11px] text-charcoal-500 dark:text-charcoal-400 font-mono">
                  {cand.credentials.length} verified credentials
                </span>
                <Button variant="primary" size="xs" onClick={() => handleContactCandidate(cand.name)}>
                  Request Candidate Intro
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboardPage
