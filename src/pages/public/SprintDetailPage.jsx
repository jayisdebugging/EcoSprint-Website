import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  FlaskConical,
  Video,
  FileCheck,
  Bookmark,
  Check
} from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Avatar'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'
import { SPRINTS } from '../../data/sprints'
import { MENTORS } from '../../data/mentors'

export const SprintDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { isEnrolled, enrollInSprint, isSprintSaved, toggleSaveSprint } = useApp()

  const [sprint, setSprint] = useState(null)
  const [mentor, setMentor] = useState(null)
  const [justEnrolled, setJustEnrolled] = useState(false)

  useEffect(() => {
    const found = SPRINTS.find((s) => s.id === id || s.slug === id) || SPRINTS[0]
    setSprint(found)
    const m = MENTORS.find((item) => item.id === found.mentorId) || MENTORS[0]
    setMentor(m)
    setJustEnrolled(false)
  }, [id])

  if (!sprint) {
    return <div className="py-20 text-center text-sm text-charcoal-500">Loading sprint curriculum...</div>
  }

  const enrolled = isEnrolled(sprint.id) || justEnrolled
  const saved = isSprintSaved(sprint.id)

  const handleEnroll = async () => {
    const result = await enrollInSprint(sprint.id)
    if (!result.ok) {
      if (result.error === 'Authentication required' || String(result.error).toLowerCase().includes('signed in')) {
        addToast({
          title: 'Sign in required',
          message: 'Log in or create a learner account to enroll in this sprint.',
          type: 'info'
        })
        navigate(`/login?redirect=${encodeURIComponent(`/sprints/${sprint.id}`)}`)
        return
      }
      addToast({
        title: 'Enrollment failed',
        message: result.error || 'Please try again.',
        type: 'error'
      })
      return
    }
    setJustEnrolled(true)
    addToast({
      title: 'Enrollment Successful!',
      message: `You are now enrolled in ${sprint.title} (Cohort Open).`,
      type: 'success'
    })
  }

  return (
    <div className="py-8 sm:py-12 space-y-10">
      <Container size="default">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Sprints', to: '/sprints' },
            { label: sprint.track, to: `/sprints?category=${encodeURIComponent(sprint.category || 'All')}` },
            { label: sprint.title }
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main 2-column curriculum details */}
          <div className="lg:col-span-2 space-y-10">
            {/* HERO INFO */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="forest" size="md">
                  {sprint.track}
                </Badge>
                <Badge variant="neutral" size="md">
                  {sprint.level}
                </Badge>
                {enrolled ? (
                  <Badge variant="sage" size="md" dot>
                    Enrolled Fellow
                  </Badge>
                ) : (
                  <Badge variant="outline" size="md">
                    {sprint.status || 'Admissions Open'}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight leading-[1.15]">
                {sprint.title}
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-normal">
                {sprint.description}
              </p>
            </div>

            {/* QUICK METRICS STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle">
              <div className="space-y-1">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400 block">Duration</span>
                <span className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-forest-700 dark:text-forest-400" /> {sprint.durationWeeks} Weeks
                </span>
              </div>
              <div className="space-y-1 border-l border-charcoal-100 dark:border-charcoal-800 pl-4">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400 block">Weekly Effort</span>
                <span className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100">
                  {sprint.hoursPerWeek} Hours / wk
                </span>
              </div>
              <div className="space-y-1 border-l border-charcoal-100 dark:border-charcoal-800 pl-4">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400 block">Cohort Size</span>
                <span className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-forest-700 dark:text-forest-400" /> Max {sprint.cohortSize}
                </span>
              </div>
              <div className="space-y-1 border-l border-charcoal-100 dark:border-charcoal-800 pl-4">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400 block">Starts</span>
                <span className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-forest-700 dark:text-forest-400" /> {sprint.cohortStartDate}
                </span>
              </div>
            </div>

            {/* LEARNING OUTCOMES */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">Learning Outcomes</h2>
              <div className="space-y-2.5">
                {(sprint.learningOutcomes || []).map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-white dark:bg-charcoal-900 border border-charcoal-200/80 dark:border-charcoal-800">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-200 leading-relaxed font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SKILLS YOU WILL BUILD */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">Verified Skills You Will Build</h2>
              <div className="flex flex-wrap gap-2">
                {sprint.skills.map((skill, i) => (
                  <Badge key={i} variant="sage" size="md" dot>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* WEEKLY CURRICULUM BREAKDOWN */}
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">Sprint Curriculum & Weekly Breakdown</h2>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                  Each week combines on-demand briefings, interactive simulation labs, mentor critiques, and project deliverables.
                </p>
              </div>

              <div className="space-y-4">
                {sprint.curriculum.map((weekItem, idx) => (
                  <Card key={idx} className="bg-white border border-charcoal-200 shadow-subtle p-5 space-y-3">
                    <div className="flex items-start gap-3.5">
                      <span className="w-9 h-9 rounded-lg bg-forest-800 dark:bg-charcoal-800 text-white dark:text-sand-50 font-bold text-xs flex items-center justify-center shrink-0">
                        W{weekItem.week || idx + 1}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">
                            {weekItem.title}
                          </h3>
                          <span className="text-xs font-mono text-charcoal-400 dark:text-charcoal-500">
                            {(weekItem.lessons || []).length} lessons
                          </span>
                        </div>
                        {weekItem.description && (
                          <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                            {weekItem.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Lesson breakdown list */}
                    {weekItem.lessons && (
                      <div className="pt-2 border-t border-charcoal-100 dark:border-charcoal-800 space-y-2">
                        {weekItem.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between p-2.5 rounded-md bg-sand-50/70 dark:bg-charcoal-800/70 border border-charcoal-200/50 dark:border-charcoal-700/50 text-xs">
                            <div className="flex items-center gap-2.5">
                              {lesson.type === 'video' && <Video className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />}
                              {lesson.type === 'lab' && <FlaskConical className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />}
                              {lesson.type === 'reading' && <BookOpen className="w-3.5 h-3.5 text-charcoal-500 dark:text-charcoal-400" />}
                              {lesson.type === 'project' && <FileCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                              {lesson.type === 'assessment' && <Award className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />}
                              <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">{lesson.title}</span>
                            </div>
                            <span className="text-[11px] text-charcoal-400 dark:text-charcoal-500 font-mono shrink-0 ml-2">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* CREDENTIALS & AUDIT INFO */}
            <Card className="bg-sand-50/80 dark:bg-charcoal-900/60 border border-charcoal-200 dark:border-charcoal-800 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-forest-800 dark:bg-charcoal-800 text-white flex items-center justify-center">
                  <Award className="w-5 h-5 text-forest-300 dark:text-sand-50" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Verifiable EcoSprint Credential</h3>
                  <p className="text-xs text-charcoal-600 dark:text-charcoal-300">Issued upon successful completion and auditor review of your capstone deliverable.</p>
                </div>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                Graduates receive an immutable cryptographic credential verified on public ledgers and recognized by top sustainability employers.
              </p>
            </Card>

            {/* LEAD MENTOR CARD */}
            {mentor && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-charcoal-900 dark:text-charcoal-50">Practitioner Mentorship</h2>
                <Card className="bg-white dark:bg-charcoal-900 p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar src={mentor.avatar} name={mentor.name} size="lg" status="online" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">{mentor.name}</h3>
                        <Badge variant="sage" size="sm">Lead Mentor</Badge>
                      </div>
                      <p className="text-xs font-semibold text-forest-800 dark:text-forest-400">{mentor.role}</p>
                      <p className="text-xs text-charcoal-600 dark:text-charcoal-300 pt-1 leading-relaxed">{mentor.bio}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: ENROLLMENT ACTION */}
          <div className="space-y-6">
            <Card className="sticky top-24 bg-white dark:bg-charcoal-900 border border-charcoal-200/80 dark:border-charcoal-800 shadow-card p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider block">Tuition</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-charcoal-950 dark:text-charcoal-50 font-sans">
                      ₹{Number(sprint.price || 2499).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-charcoal-500 dark:text-charcoal-400">one-time cohort fee</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSaveSprint(sprint.id)}
                  className={`p-2 rounded-md transition-colors ${
                    saved
                      ? 'text-forest-700 dark:text-forest-300 bg-forest-50 dark:bg-forest-950/60'
                      : 'text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200 hover:bg-sand-100 dark:hover:bg-charcoal-800'
                  }`}
                  title={saved ? 'Remove bookmark' : 'Save sprint'}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-forest-700 dark:fill-forest-400' : ''}`} />
                </button>
              </div>

              {/* Status or Success Box */}
              {enrolled ? (
                <div className="p-4 rounded-lg bg-forest-50 dark:bg-forest-950/60 border border-forest-300 dark:border-forest-800 text-center space-y-3 animate-in fade-in">
                  <div className="w-8 h-8 rounded-full bg-forest-800 dark:bg-forest-700 text-white flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-950 dark:text-forest-200">You Are Enrolled!</h4>
                    <p className="text-xs text-forest-800 dark:text-forest-300 mt-0.5">Welcome to the active cohort.</p>
                  </div>
                  <Link to={`/sprint-room/${sprint.id}`} className="block">
                    <Button variant="primary" size="md" rightIcon={ArrowRight} className="w-full justify-center">
                      Go to Sprint Room
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2 text-xs text-charcoal-600 dark:text-charcoal-400">
                    <div className="flex items-center justify-between py-1.5 border-b border-charcoal-100 dark:border-charcoal-800">
                      <span>Seats Remaining</span>
                      <span className="font-bold text-charcoal-900 dark:text-charcoal-100">{sprint.cohortSize - sprint.enrolledCount} spots left</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-charcoal-100 dark:border-charcoal-800">
                      <span>Simulation Labs</span>
                      <span className="font-bold text-charcoal-900 dark:text-charcoal-100">{sprint.labsCount} Interactive Labs</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-charcoal-100 dark:border-charcoal-800">
                      <span>Credential</span>
                      <span className="font-bold text-forest-800 dark:text-forest-400">Verifiable Certificate</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    onClick={handleEnroll}
                    rightIcon={ArrowRight}
                  >
                    Enroll in Cohort
                  </Button>
                </div>
              )}

              <div className="pt-2 border-t border-charcoal-100 dark:border-charcoal-800 text-center text-xs text-charcoal-500 dark:text-charcoal-400">
                <Link to="/companies" className="hover:text-forest-800 dark:hover:text-forest-400 transition-colors">
                  Sponsoring a corporate team? Request B2B pricing →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SprintDetailPage
