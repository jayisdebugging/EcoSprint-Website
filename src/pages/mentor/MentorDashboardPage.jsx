import React, { useState } from 'react'
import {
  Sparkles,
  Users,
  FileCheck,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Star,
  MessageSquare,
  Search,
  Check,
  Award
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Avatar } from '../../components/ui/Avatar'
import { Modal } from '../../components/ui/Modal'
import { StatCard } from '../../components/common/StatCard'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'

export const MentorDashboardPage = () => {
  const { addToast } = useToast()
  const { user } = useApp()

  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [activeReviewItem, setActiveReviewItem] = useState(null)
  const [grade, setGrade] = useState(94)
  const [feedback, setFeedback] = useState('Excellent boundary documentation and transparent activity data conversions.')

  const [reviewQueue, setReviewQueue] = useState([
    {
      id: 'sub-1',
      studentName: 'Elena Rostova',
      studentRole: 'Sustainability Analyst',
      sprintTitle: 'Corporate Carbon Accounting & GHG Protocol',
      deliverable: 'Scope 3 Category 1 Calculation Model & Vendor Waterfall',
      submittedAt: '3 hours ago',
      currentScore: null
    },
    {
      id: 'sub-2',
      studentName: 'Tobias Meyer',
      studentRole: 'Product Engineer',
      sprintTitle: 'Circular Product Design & LCA Modelling',
      deliverable: 'Cradle-to-Gate Packaging Disassembly Architecture',
      submittedAt: '1 day ago',
      currentScore: null
    },
    {
      id: 'sub-3',
      studentName: 'Marcus Vance',
      studentRole: 'ESG Controller',
      sprintTitle: 'ESG Reporting & CSRD Compliance',
      deliverable: 'Double Materiality Threshold Scoring Matrix',
      submittedAt: '2 days ago',
      currentScore: null
    }
  ])

  const learners = [
    { name: 'Alex Rivera', role: 'ESG Specialist', sprint: 'Carbon Accounting', progress: 68, status: 'On Track' },
    { name: 'Elena Rostova', role: 'Sustainability Analyst', sprint: 'Carbon Accounting', progress: 75, status: 'Awaiting Review' },
    { name: 'Tobias Meyer', role: 'Product Engineer', sprint: 'Circular Design', progress: 50, status: 'On Track' },
    { name: 'Sophia Chen', role: 'Supply Chain Lead', sprint: 'Scope 3 Decarbonization', progress: 90, status: 'Completed' },
    { name: 'Lukas Meier', role: 'Energy Manager', sprint: 'Renewable Microgrids', progress: 40, status: 'Behind' }
  ]

  const upcomingSessions = [
    {
      title: 'Scope 3 Workpaper Assurance Live Review',
      cohort: 'Cohort Autumn-2026',
      date: 'Thursday, Oct 24 • 16:00 UTC',
      attendees: 24,
      link: 'https://meet.ecosprint.app/live-audit-review'
    },
    {
      title: 'Double Materiality Thresholds Q&A',
      cohort: 'Cohort Autumn-2026',
      date: 'Tuesday, Oct 29 • 15:00 UTC',
      attendees: 28,
      link: 'https://meet.ecosprint.app/live-audit-review'
    }
  ]

  const handleOpenReview = (item) => {
    setActiveReviewItem(item)
    setGrade(94)
    setFeedback('Excellent methodology memo and clean DEFRA conversion formula lineage.')
    setReviewModalOpen(true)
  }

  const handleSaveEvaluation = () => {
    setReviewQueue((prev) => prev.filter((i) => i.id !== activeReviewItem.id))
    addToast({
      title: 'Evaluation Approved & Logged',
      message: `Grade ${grade}% and auditor notes dispatched to ${activeReviewItem.studentName}.`,
      type: 'success'
    })
    setReviewModalOpen(false)
  }

  return (
    <div className="space-y-8 max-w-7xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-charcoal-900 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">Mentor Practitioner Portal</h1>
            <Badge variant="sage" size="sm">{user?.name || 'Mentor'}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400">
            Review fellow workpapers, facilitate weekly live critiques, and evaluate audit assurance readiness.
          </p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Active Fellows"
          value="24 Fellows"
          subtitle="Autumn-2026 Cohort"
        />
        <StatCard
          icon={FileCheck}
          title="Review Queue"
          value={`${reviewQueue.length} Workpapers`}
          subtitle="Awaiting Evaluation"
          trend="Action required"
        />
        <StatCard
          icon={Calendar}
          title="Next Session"
          value="Thursday"
          subtitle="16:00 UTC (1 hour)"
        />
        <StatCard
          icon={Award}
          title="Avg Capstone Grade"
          value="93.4%"
          subtitle="ISAE 3000 Rubric"
          trend="Top quartile"
        />
      </div>

      {/* Review Queue Cards */}
      <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
        <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
          <h2 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">
            Fellow Workpapers Awaiting Auditor Review ({reviewQueue.length})
          </h2>
        </div>

        {reviewQueue.length > 0 ? (
          <div className="space-y-3">
            {reviewQueue.map((item) => (
              <div key={item.id} className="p-4 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/70 dark:border-charcoal-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal-900 dark:text-charcoal-50 text-sm">{item.studentName}</span>
                    <span className="text-xs text-charcoal-500 dark:text-charcoal-400">({item.studentRole})</span>
                    <Badge variant="forest" size="sm">{item.submittedAt}</Badge>
                  </div>
                  <p className="text-xs font-semibold text-forest-800 dark:text-forest-400">{item.deliverable}</p>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{item.sprintTitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="primary" size="sm" onClick={() => handleOpenReview(item)}>
                    Review & Grade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 py-4 text-center">
            ✓ Your review queue is empty. All submitted workpapers have been evaluated!
          </p>
        )}
      </Card>

      {/* 2-Column: Active Cohort Fellows Table & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learners table (2 cols) */}
        <Card className="lg:col-span-2 bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
            <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">
              Active Cohort Fellows Progress
            </h3>
            <span className="text-xs text-charcoal-500 dark:text-charcoal-400 font-mono">Autumn-2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="border-b border-charcoal-200 dark:border-charcoal-800 text-charcoal-500 dark:text-charcoal-400 font-semibold uppercase">
                <tr>
                  <th className="py-2.5">Fellow</th>
                  <th className="py-2.5">Sprint Track</th>
                  <th className="py-2.5">Milestone Completion</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 dark:divide-charcoal-800 text-charcoal-700 dark:text-charcoal-300">
                {learners.map((lrn, i) => (
                  <tr key={i} className="hover:bg-sand-50/50 dark:hover:bg-charcoal-800/50">
                    <td className="py-3 font-semibold text-charcoal-900 dark:text-charcoal-50">
                      <div>{lrn.name}</div>
                      <div className="text-[10px] text-charcoal-400 font-normal">{lrn.role}</div>
                    </td>
                    <td className="py-3">{lrn.sprint}</td>
                    <td className="py-3 w-40">
                      <div className="space-y-1">
                        <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 font-mono">{lrn.progress}%</span>
                        <ProgressBar value={lrn.progress} size="sm" />
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <Badge
                        variant={lrn.status === 'Completed' ? 'sage' : lrn.status === 'Behind' ? 'warning' : 'forest'}
                        size="sm"
                      >
                        {lrn.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Upcoming Sessions (1 col) */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
            Scheduled Office Hours
          </h3>

          <div className="space-y-3">
            {upcomingSessions.map((session, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-sand-50 dark:bg-charcoal-800/60 border border-charcoal-200/80 dark:border-charcoal-700 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-forest-800 dark:text-forest-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {session.cohort}
                </span>
                <p className="font-bold text-charcoal-900 dark:text-charcoal-50">{session.title}</p>
                <p className="text-charcoal-500 dark:text-charcoal-400 text-[11px]">{session.date}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-charcoal-500 dark:text-charcoal-400">{session.attendees} Attending</span>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => addToast({ title: 'Room Link Copied', message: 'Meeting room link ready.', type: 'info' })}
                  >
                    Launch Meeting
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Review & Grade Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={activeReviewItem ? `Evaluate: ${activeReviewItem.studentName}` : 'Evaluation'}
        description={activeReviewItem?.deliverable}
        maxWidth="max-w-lg"
      >
        {activeReviewItem && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-sand-50 dark:bg-charcoal-800/60 rounded-lg border border-charcoal-200/70 dark:border-charcoal-700 space-y-1">
              <span className="text-charcoal-500 dark:text-charcoal-400 block">Deliverable Brief:</span>
              <p className="font-semibold text-charcoal-900 dark:text-charcoal-50">{activeReviewItem.deliverable}</p>
              <p className="text-charcoal-500 dark:text-charcoal-400 text-[11px]">Sprint: {activeReviewItem.sprintTitle}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-charcoal-900 dark:text-charcoal-50">
                <span>Auditor Score:</span>
                <span className="text-forest-800 dark:text-forest-400 font-mono text-sm">{grade}% (ISAE 3000 Standard)</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full accent-forest-700 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-charcoal-900 dark:text-charcoal-50">
                Auditor Constructive Feedback Notes
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30 text-charcoal-800 dark:text-charcoal-100 placeholder-charcoal-400 resize-none"
              />
            </div>

            <div className="pt-3 border-t border-charcoal-100 dark:border-charcoal-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setReviewModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" leftIcon={Check} onClick={handleSaveEvaluation}>
                Approve & Dispatch Grade
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MentorDashboardPage
