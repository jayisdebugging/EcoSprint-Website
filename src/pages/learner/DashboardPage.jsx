import React from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  ArrowRight,
  FlaskConical,
  MessageSquare,
  Sparkles,
  AlertCircle,
  FileText,
  TrendingUp,
  Bookmark,
  Flag
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { EmptyState } from '../../components/ui/EmptyState'
import { StatCard } from '../../components/common/StatCard'
import { SprintCard } from '../../components/cards/SprintCard'
import { useApp } from '../../context/AppContext'
import { SPRINTS } from '../../data/sprints'
import { currentWeekLabel, flattenLessons } from '../../utils/sprintHelpers'

const iconForType = (type) => {
  if (type === 'PROJECT') return FileText
  if (type === 'CREDENTIAL') return Award
  if (type === 'ENROLLMENT') return Compass
  if (type === 'QUIZ' || type === 'MILESTONE') return CheckCircle2
  if (type === 'LIVE') return MessageSquare
  return Sparkles
}

const timeAgo = (iso) => {
  if (!iso) return ''
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000))
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short' })
}

export const DashboardPage = () => {
  const { user, sprintProgress, credentialsList, projectsList, notifications } = useApp()

  const enrolledEntries = Object.entries(sprintProgress || {}).filter(([, s]) => s.enrolled)
  const activeEntry = enrolledEntries.find(([, s]) => (s.progress || 0) < 100) || enrolledEntries[0]
  const activeSprintId = activeEntry?.[0] || null
  const activeSprint = SPRINTS.find((s) => s.id === activeSprintId) || null

  const currentProgress = activeEntry?.[1]?.progress || 0
  const completedCount = activeEntry?.[1]?.completedLessons?.length || 0
  const activeAllLessons = activeSprint ? flattenLessons(activeSprint) : []
  const nextLesson = activeAllLessons[Math.min(completedCount, activeAllLessons.length - 1)]
  const weekLabel = activeSprint ? currentWeekLabel(activeSprint, completedCount) : '—'

  const activeCount = enrolledEntries.filter(([, s]) => (s.progress || 0) < 100).length
  const projectPending = projectsList.filter((p) => p.status !== 'Submitted' && p.status !== 'Completed')
  const nextDeadline = projectPending[0]
  const completedProjects = projectsList.filter((p) => p.status === 'Completed')

  const recommendedSprints = SPRINTS.filter((s) => s.id !== activeSprintId && !enrolledEntries.some(([id]) => id === s.id)).slice(0, 2)

  const recentActivities = (notifications || []).slice(0, 4).map((n) => ({
    text: n.message || n.title,
    time: timeAgo(n.createdAt),
    icon: iconForType(n.type),
    iconColor: 'text-forest-700 dark:text-forest-400'
  }))

  const achievements = (credentialsList || []).map((c) => ({
    title: c.sprintTitle || c.title,
    desc: c.description || 'Verified credential earned for completing a sprint capstone.',
    date: c.issuedDate,
    credentialId: c.credentialId
  }))

  return (
    <div className="space-y-8 max-w-7xl transition-colors duration-200">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-charcoal-900 p-6 sm:p-8 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight">
              Good morning, {user?.name?.split(' ')[0] || 'Learner'}.
            </h1>
            <Badge variant="forest" size="sm" dot>
              Learner Workspace
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300">
            {activeSprint
              ? `You are ${currentProgress}% through ${activeSprint.title}. Keep the momentum going.`
              : 'Enroll in a sprint to start building verifiable green skills.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeSprint ? (
            <Link to={`/sprint-room/${activeSprint.id}`}>
              <Button variant="primary" size="md" rightIcon={ArrowRight} className="shadow-subtle hover:shadow-card">
                Continue Sprint
              </Button>
            </Link>
          ) : (
            <Link to="/sprints">
              <Button variant="primary" size="md" rightIcon={ArrowRight} className="shadow-subtle hover:shadow-card">
                Explore Sprints
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* 2. OVERVIEW STAT METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Compass}
          title="Active Sprints"
          value={`${activeCount} In Progress`}
          subtitle={activeSprint?.track || 'Enroll to begin'}
        />
        <StatCard
          icon={TrendingUp}
          title="Sprint Progress"
          value={`${currentProgress}%`}
          subtitle={weekLabel}
        />
        <StatCard
          icon={FileText}
          title="Projects"
          value={`${projectsList?.length || 0} Capstone${projectsList?.length === 1 ? '' : 's'}`}
          subtitle={`${completedProjects.length} Completed • ${projectPending.length} Active`}
        />
        <StatCard
          icon={Award}
          title="Credentials"
          value={`${credentialsList?.length || 0} Earned`}
          subtitle="Verified Credential"
        />
      </div>

      {/* 3. CURRENT SPRINT & UPCOMING SESSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CURRENT SPRINT HIGHLIGHT */}
        <Card className="lg:col-span-2 bg-white dark:bg-charcoal-900 p-6 space-y-6 shadow-subtle border border-charcoal-200 dark:border-charcoal-800">
          {activeSprint ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-950/60 px-2.5 py-0.5 rounded border border-forest-200 dark:border-forest-800/80 inline-block mb-1">
                    Current Sprint
                  </span>
                  <h2 className="text-xl font-bold text-charcoal-950 dark:text-charcoal-50">
                    {activeSprint.title}
                  </h2>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    {weekLabel} • Mentor: {activeSprint.mentorName || 'EcoSprint Faculty'}
                  </p>
                </div>

                <Link to={`/sprint-room/${activeSprint.id}`}>
                  <Button variant="primary" size="sm" rightIcon={ArrowRight}>
                    Continue Sprint
                  </Button>
                </Link>
              </div>

              <div className="space-y-2">
                <ProgressBar
                  value={currentProgress}
                  label="Overall Sprint Milestones"
                  showValue
                  size="md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950/70 border border-charcoal-200/70 dark:border-charcoal-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-charcoal-400 dark:text-charcoal-500">Next Up Lesson</span>
                  <p className="font-semibold text-charcoal-900 dark:text-charcoal-100">{nextLesson?.title || 'Begin the first lesson'}</p>
                  <span className="text-forest-700 dark:text-forest-400 font-bold block text-[11px]">
                    {activeAllLessons.length} lessons • {completedCount} done
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-forest-50/50 dark:bg-forest-950/30 border border-forest-300 dark:border-forest-700/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-forest-700 dark:text-forest-400">Capstone Project</span>
                  <p className="font-semibold text-charcoal-900 dark:text-charcoal-100">{nextDeadline?.title || activeSprint.title}</p>
                  <span className="text-forest-700 dark:text-forest-400 font-bold block text-[11px]">
                    {nextDeadline && nextDeadline.status !== 'Submitted' ? `Deadline ${nextDeadline.dueDate || '—'}` : projectsList.some((p) => p.sprintId === activeSprint.id) ? 'Submitted ✓' : 'Unlocks as you progress'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950/70 border border-charcoal-200/70 dark:border-charcoal-800 space-y-1 opacity-80">
                  <span className="text-[10px] font-bold uppercase text-charcoal-400 dark:text-charcoal-500">Credential</span>
                  <p className="font-semibold text-charcoal-900 dark:text-charcoal-100">Verified Sprint Certificate</p>
                  <span className="text-charcoal-500 dark:text-charcoal-400 block text-[11px]">
                    {credentialsList.some((c) => c.sprintId === activeSprint.id) ? 'Earned ✓' : `Earned at 100% + submission`}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-950/60 px-2.5 py-0.5 rounded border border-forest-200 dark:border-forest-800/80 inline-block mb-1">
                  Current Sprint
                </span>
                <h2 className="text-xl font-bold text-charcoal-950 dark:text-charcoal-50">No active sprint yet</h2>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                  Pick a sprint to begin your cohort. Your progress, labs, and capstone project appear here once you enroll.
                </p>
              </div>
              <EmptyState
                title="Ready when you are"
                description="Browse the catalog and enroll in the track that matches your goals."
                action={
                  <Link to="/sprints">
                    <Button variant="primary" size="sm" rightIcon={ArrowRight}>
                      Explore Sprint Catalog
                    </Button>
                  </Link>
                }
              />
            </div>
          )}
        </Card>

        {/* UPCOMING DEADLINES & SESSIONS */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 shadow-subtle border border-charcoal-200 dark:border-charcoal-800">
          <h3 className="text-sm font-bold text-charcoal-950 dark:text-charcoal-100 border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
            Upcoming Milestones
          </h3>

          <div className="space-y-3 text-xs">
            {projectPending.slice(0, 2).map((proj) => (
              <div key={proj.id} className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950/70 border border-charcoal-200/80 dark:border-charcoal-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Project Deadline
                </span>
                <p className="font-bold text-charcoal-900 dark:text-charcoal-100">{proj.title}</p>
                <p className="text-charcoal-500 dark:text-charcoal-400 text-[11px]">Due {proj.dueDate || 'Open-ended'}</p>
              </div>
            ))}

            {activeSprint ? (
              <div className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950/70 border border-charcoal-200/80 dark:border-charcoal-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-charcoal-600 dark:text-charcoal-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Next In-Sprint
                </span>
                <p className="font-bold text-charcoal-900 dark:text-charcoal-100">
                  {completedCount < activeAllLessons.length
                    ? nextLesson?.title || 'More lessons ahead'
                    : projectPending.some((p) => p.sprintId === activeSprint.id)
                    ? 'Submit your capstone project'
                    : 'Final assessment unlocked'}
                </p>
                <p className="text-charcoal-500 dark:text-charcoal-400 text-[11px]">{weekLabel}</p>
              </div>
            ) : null}

            {!projectPending.length && activeSprint && (
              <div className="p-3 rounded-lg bg-forest-50/60 dark:bg-forest-950/30 border border-forest-200 dark:border-forest-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-forest-700 dark:text-forest-400 flex items-center gap-1">
                  <Award className="w-3 h-3" /> All caught up
                </span>
                <p className="font-bold text-charcoal-900 dark:text-charcoal-100">No pending project submissions</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* 4. RECENT ACTIVITY & ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800">
          <h3 className="text-sm font-bold text-charcoal-950 dark:text-charcoal-100 border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
            Recent Cohort Activity
          </h3>
          {recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((act, i) => {
                const Icon = act.icon
                return (
                  <div key={i} className="flex items-start gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-sand-100 dark:bg-charcoal-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className={`w-3.5 h-3.5 ${act.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-charcoal-800 dark:text-charcoal-200 font-medium">{act.text}</p>
                      <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500">{act.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <EmptyState
              title="No activity yet"
              description="Enroll in a sprint and your enrollment, lesson, and milestone activity will appear here."
            />
          )}
        </Card>

        {/* Achievements */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800">
          <h3 className="text-sm font-bold text-charcoal-950 dark:text-charcoal-100 border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
            Verified Achievements
          </h3>
          {achievements.length > 0 ? (
            <div className="space-y-3">
              {achievements.map((ach, i) => (
                <div key={i} className="p-3 rounded-lg bg-sand-50/70 dark:bg-charcoal-950/70 border border-charcoal-200/60 dark:border-charcoal-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-forest-50 dark:bg-forest-950/60 border border-forest-200 dark:border-forest-800/80 flex items-center justify-center text-forest-700 dark:text-forest-400 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal-900 dark:text-charcoal-100">{ach.title}</h4>
                      <p className="text-charcoal-500 dark:text-charcoal-400 text-[11px]">{ach.credentialId}</p>
                    </div>
                  </div>
                  <Badge variant="sage" size="sm">
                    {ach.date || 'Earned'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No credentials yet"
              description="Complete a sprint (all lessons + capstone submission) to earn a verifiable EcoSprint credential."
            />
          )}
        </Card>
      </div>

      {/* 5. RECOMMENDED NEXT SPRINTS */}
      {recommendedSprints.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-charcoal-950 dark:text-charcoal-100">Recommended Next Sprints</h2>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Continue building your sustainability skill stack.</p>
            </div>
            <Link to="/sprints">
              <Button variant="outline" size="sm" rightIcon={ArrowRight}>
                Catalog
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedSprints.map((sprint) => (
              <SprintCard key={sprint.id} sprint={sprint} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage