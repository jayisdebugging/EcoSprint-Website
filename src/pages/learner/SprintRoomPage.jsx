import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Compass,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Clock,
  Calendar,
  Award,
  ArrowRight,
  ArrowLeft,
  Video,
  BookOpen,
  FlaskConical,
  FileCheck,
  Download,
  Upload,
  MessageSquare,
  Check,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { Avatar } from '../../components/ui/Avatar'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'
import { SPRINTS } from '../../data/sprints'
import { MENTORS } from '../../data/mentors'
import { enrichCurriculum } from '../../data/lessonContent'

export const SprintRoomPage = () => {
  const { id } = useParams()
  const { addToast } = useToast()
  const { sprintProgress, markLessonComplete, saveQuizResult, quizResults } = useApp()

  const sprintId = id || 'sprint-carbon-accounting'
  const sprint = SPRINTS.find((s) => s.id === sprintId) || SPRINTS[0]
  const mentor = MENTORS.find((m) => m.id === sprint.mentorId) || MENTORS[0]

  // Flatten all lessons (enriched with notes, quiz and verified learning
  // resources stored as data) for easy navigation
  const allLessons = enrichCurriculum(sprint.curriculum).flatMap((w) =>
    (w.lessons || []).map((l) => ({ ...l, weekNum: w.week, weekTitle: w.title }))
  )

  // Current selected lesson
  const savedCurrentId = sprintProgress[sprintId]?.currentLessonId || allLessons[0]?.id || null
  const [currentLessonId, setCurrentLessonId] = useState(savedCurrentId)
  const currentLesson = allLessons.find((l) => l.id === currentLessonId) || allLessons[0]

  // Mobile layout active tab: 'curriculum' | 'lesson' | 'companion'
  const [mobileTab, setMobileTab] = useState('lesson')

  // Scratchpad notes
  const [notes, setNotes] = useState('Scope 3 Category 1: prioritize supplier primary data for top 10 suppliers by spend.')

  // In-app knowledge check state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(null)

  useEffect(() => {
    setQuizAnswers({})
    setQuizSubmitted(null)
  }, [currentLessonId])

  const quiz = currentLesson.quiz
  const priorQuizResult = quizResults[currentLesson.id]

  const handleSelectQuizAnswer = (qIndex, optIndex) =>
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))

  const handleSubmitQuiz = () => {
    if (!quiz) return
    const total = quiz.questions.length
    const score = quiz.questions.reduce(
      (acc, q, i) => acc + (quizAnswers[i] === q.answer ? 1 : 0),
      0
    )
    const passed = score / total >= (quiz.passingScore || 70) / 100
    setQuizSubmitted({ score, total, passed })
    saveQuizResult(sprintId, currentLesson.id, {
      quizLabel: quiz.title,
      score,
      total,
      passed,
      answers: quizAnswers
    })
    addToast({
      title: passed ? 'Quiz passed' : 'Quiz complete',
      message: `${score}/${total} — pass mark is ${quiz.passingScore || 70}%.`,
      type: passed ? 'success' : 'warning'
    })
  }

  // Current tasks checklist for the sprint
  const [tasks, setTasks] = useState([
    { id: 't1', text: 'Define equity share vs operational control boundaries', done: true },
    { id: 't2', text: 'Convert raw stationary gas meter receipts into MWh', done: true },
    { id: 't3', text: 'Extract location-based grid emission factors from eGRID', done: true },
    { id: 't4', text: 'Calculate Scope 3 Category 1 spend-based proxy emissions', done: true },
    { id: 't5', text: 'Draft supplier primary carbon data request template', done: false },
    { id: 't6', text: 'Assemble ISAE 3000 assurance workpaper bundle', done: false }
  ])

  const completedLessonIds = sprintProgress[sprintId]?.completedLessons || []
  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id)

  const activeWeek =
    completedLessonIds.length === 0
      ? 'Not started'
      : `Week ${allLessons[Math.min(completedLessonIds.length - 1, allLessons.length - 1)]?.weekNum || 1} Active`

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    )
  }

  const handleToggleComplete = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id)
    const nextLesson = allLessons[currentIndex + 1]

    markLessonComplete(sprintId, currentLesson.id, nextLesson?.id, allLessons.length)

    addToast({
      title: isCurrentCompleted ? 'Marked Incomplete' : 'Lesson Completed!',
      message: `Updated progress for "${currentLesson.title}".`,
      type: 'success'
    })
  }

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id)
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id)
    } else {
      addToast({
        title: 'End of Sprint Curriculum',
        message: 'You have navigated to the final module of this sprint.',
        type: 'info'
      })
    }
  }

  const handlePrevLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id)
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id)
    }
  }

  const progressPercentage = Math.round((completedLessonIds.length / allLessons.length) * 100)

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />
      case 'lab': return <FlaskConical className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />
      case 'reading': return <BookOpen className="w-3.5 h-3.5 text-charcoal-500 dark:text-charcoal-400" />
      case 'project': return <FileCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
      case 'assessment': return <Award className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />
      default: return <BookOpen className="w-3.5 h-3.5 text-charcoal-500 dark:text-charcoal-400" />
    }
  }

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-12 transition-colors duration-200">
      {/* Top Breadcrumb & Cohort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-charcoal-900 p-4 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle">
        <Breadcrumb
          items={[
            { label: 'My Sprints', to: '/my-sprints' },
            { label: sprint.title, to: `/sprints/${sprint.id}` },
            { label: `Week ${currentLesson.weekNum || 2}: ${currentLesson.title}` }
          ]}
        />
        <div className="flex items-center gap-2">
          <Badge variant="forest" size="sm" dot>
            Cohort Active
          </Badge>
          <span className="text-xs font-mono font-bold text-forest-800 dark:text-forest-300 bg-forest-50 dark:bg-forest-950/60 px-2 py-0.5 rounded border border-forest-200 dark:border-forest-800/80">
            {progressPercentage}% Complete
          </span>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-charcoal-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 rounded-lg p-1">
        <button
          onClick={() => setMobileTab('curriculum')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
            mobileTab === 'curriculum' ? 'bg-forest-800 dark:bg-forest-700 text-white shadow-xs' : 'text-charcoal-600 dark:text-charcoal-400'
          }`}
        >
          Curriculum ({allLessons.length})
        </button>
        <button
          onClick={() => setMobileTab('lesson')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
            mobileTab === 'lesson' ? 'bg-forest-800 dark:bg-forest-700 text-white shadow-xs' : 'text-charcoal-600 dark:text-charcoal-400'
          }`}
        >
          Active Lesson
        </button>
        <button
          onClick={() => setMobileTab('companion')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors ${
            mobileTab === 'companion' ? 'bg-forest-800 dark:bg-forest-700 text-white shadow-xs' : 'text-charcoal-600 dark:text-charcoal-400'
          }`}
        >
          Tasks & Mentor
        </button>
      </div>

      {/* 3-COLUMN COCKPIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: CURRICULUM (3 COLS) */}
        {/* ============================================================ */}
        <div className={`lg:col-span-3 space-y-4 ${mobileTab !== 'curriculum' ? 'hidden lg:block' : 'block'}`}>
          <Card className="bg-white dark:bg-charcoal-900 p-4 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100">
                Sprint Curriculum
              </h3>
              <span className="text-[11px] text-charcoal-500 dark:text-charcoal-400 font-mono">
                {completedLessonIds.length}/{allLessons.length} done
              </span>
            </div>

            <div className="space-y-4">
              {sprint.curriculum.map((week) => (
                <div key={week.week} className="space-y-1.5">
                  <div className="flex items-center justify-between px-2 py-1 bg-sand-50 dark:bg-charcoal-800/60 rounded border border-charcoal-200/50 dark:border-charcoal-700">
                    <span className="text-[11px] font-bold text-charcoal-900 dark:text-charcoal-100">
                      Week {week.week}: {week.title.split(':')[0]}
                    </span>
                    <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-mono">
                      {(week.lessons || []).length} items
                    </span>
                  </div>

                  <div className="space-y-1 pl-1">
                    {(week.lessons || []).map((lesson) => {
                      const isSelected = lesson.id === currentLesson.id
                      const isCompleted = completedLessonIds.includes(lesson.id)
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => {
                            setCurrentLessonId(lesson.id)
                            setMobileTab('lesson')
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-forest-50 dark:bg-forest-950/40 border border-forest-300 dark:border-forest-700 text-forest-950 dark:text-forest-200 font-bold shadow-xs'
                              : 'hover:bg-sand-50 dark:hover:bg-charcoal-800 border border-transparent text-charcoal-700 dark:text-charcoal-300'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-charcoal-300 dark:text-charcoal-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-xs leading-snug">{lesson.title}</p>
                            <div className="flex items-center gap-1.5 text-[10px] text-charcoal-400 dark:text-charcoal-500 mt-0.5">
                              {getLessonIcon(lesson.type)}
                              <span className="capitalize">{lesson.type}</span>
                              <span>•</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ============================================================ */}
        {/* CENTER COLUMN: ACTIVE LESSON WORKSPACE (6 COLS) */}
        {/* ============================================================ */}
        <div className={`lg:col-span-6 space-y-6 ${mobileTab !== 'lesson' ? 'hidden lg:block' : 'block'}`}>
          <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-6 border border-charcoal-200 dark:border-charcoal-800 shadow-card">
            {/* Lesson Meta Header */}
            <div className="space-y-2 border-b border-charcoal-100 dark:border-charcoal-800 pb-4">
              <div className="flex items-center justify-between">
                <Badge variant="forest" size="sm">
                  Week {currentLesson.weekNum || 2} • {currentLesson.type.toUpperCase()}
                </Badge>
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-500" /> {currentLesson.duration}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight leading-snug">
                {currentLesson.title}
              </h2>

              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                {currentLesson.description}
              </p>
            </div>

            {/* LESSON RESOURCES — real YouTube video + external reading (data-driven URLs) */}
            {(currentLesson.videoUrl || currentLesson.readingUrl) && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100">
                    Lesson Resources
                  </h3>
                  <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-mono">
                    Opens in a new tab
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentLesson.videoUrl && (
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={Play}
                      className="w-full justify-center"
                      onClick={() => window.open(currentLesson.videoUrl, '_blank', 'noopener,noreferrer')}
                    >
                      Watch Lesson
                    </Button>
                  )}
                  {currentLesson.readingUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={BookOpen}
                      className="w-full justify-center"
                      onClick={() => window.open(currentLesson.readingUrl, '_blank', 'noopener,noreferrer')}
                    >
                      Read Notes
                    </Button>
                  )}
                </div>
                {(currentLesson.videoTitle || currentLesson.readingTitle) && (
                  <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                    {[currentLesson.videoTitle, currentLesson.readingTitle].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            )}

            {/* LAB PREVIEW SHORTCUT (If type is lab) */}
            {currentLesson.type === 'lab' && (
              <div className="p-5 rounded-xl bg-sand-50 dark:bg-charcoal-950/70 border border-charcoal-200 dark:border-charcoal-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-forest-700 dark:text-forest-400" />
                    <h4 className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100">Interactive Simulation Sandbox</h4>
                  </div>
                  <Badge variant="forest" size="sm">Browser Execution</Badge>
                </div>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                  This lesson requires entering live facility activity data into the simulation engine to compute dual location/market-based emissions factors.
                </p>
                <Link to="/skill-labs">
                  <Button variant="primary" size="sm" leftIcon={FlaskConical}>
                    Open Dedicated Skill Lab Sandbox
                  </Button>
                </Link>
              </div>
            )}

            {/* KEY TAKEAWAYS */}
            {currentLesson.takeaways && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100">Key Conceptual Takeaways</h3>
                <div className="space-y-2">
                  {currentLesson.takeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-700 dark:text-charcoal-300">
                      <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRACTICAL TASK BRIEF */}
            {currentLesson.task && (
              <div className="p-4 rounded-xl bg-forest-50/50 dark:bg-forest-950/30 border border-forest-200 dark:border-forest-800/80 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 block">
                  Practical Exercise
                </span>
                <p className="font-semibold text-charcoal-900 dark:text-charcoal-100">{currentLesson.task}</p>
                <p className="text-charcoal-600 dark:text-charcoal-400">
                  Save your calculations to your local workpaper workbook before submitting for milestone credit.
                </p>
              </div>
            )}

            {/* IN-APP KNOWLEDGE CHECK (stays inside EcoSprint; results saved to Supabase) */}
            {quiz && (
              <div className="p-5 rounded-xl bg-sand-50/70 dark:bg-charcoal-950/50 border border-charcoal-200 dark:border-charcoal-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                    <h4 className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100">Knowledge Check</h4>
                  </div>
                  <Badge variant="forest" size="sm">
                    Pass mark {quiz.passingScore || 70}%
                  </Badge>
                </div>

                {priorQuizResult && !quizSubmitted && (
                  <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                    Last attempt: {priorQuizResult.score}/{priorQuizResult.total} — {priorQuizResult.passed ? 'Passed' : 'Not passed'}
                  </p>
                )}

                {quizSubmitted ? (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-lg text-xs font-semibold ${quizSubmitted.passed ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'}`}>
                      {quizSubmitted.score}/{quizSubmitted.total} — {quizSubmitted.passed ? 'Passed' : 'Not passed'}
                    </div>

                    <div className="space-y-3">
                      {quiz.questions.map((q, qi) => (
                        <div key={q.id} className="space-y-1.5">
                          <p className="text-xs font-semibold text-charcoal-900 dark:text-charcoal-100">{qi + 1}. {q.prompt}</p>
                          <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                            Correct answer: {q.options[q.answer]}
                          </p>
                          <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300 italic">{q.explanation}</p>
                        </div>
                      ))}
                    </div>

                    <button type="button" onClick={() => { setQuizSubmitted(null); setQuizAnswers({}) }} className="text-[11px] font-bold text-forest-700 dark:text-forest-400 hover:underline">
                      Retake quiz
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quiz.questions.map((q, qi) => (
                      <div key={q.id} className="space-y-2">
                        <p className="text-xs font-semibold text-charcoal-900 dark:text-charcoal-100">{qi + 1}. {q.prompt}</p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {q.options.map((opt, oi) => (
                            <button
                              key={oi}
                              type="button"
                              onClick={() => handleSelectQuizAnswer(qi, oi)}
                              className={`text-left text-xs p-2.5 rounded-lg border transition-colors ${
                                quizAnswers[qi] === oi
                                  ? 'border-forest-700 dark:border-forest-500 bg-forest-50 dark:bg-forest-950/60 text-forest-950 dark:text-forest-200 font-bold'
                                  : 'border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-sand-50 dark:hover:bg-charcoal-800'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <Button variant="primary" size="sm" onClick={handleSubmitQuiz} disabled={!quiz.questions.every((_, i) => quizAnswers[i] !== undefined)}>
                      Submit Quiz
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* DOWNLOADABLE RESOURCES */}
            <div className="space-y-2 pt-2 border-t border-charcoal-100 dark:border-charcoal-800">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400 block">
                Lesson Workpapers & Starter Files
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Download Started', message: 'GHG_DEFRA_Worksheet.xlsx downloaded.', type: 'info' })}
                  className="p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/50 dark:bg-charcoal-800/60 hover:bg-sand-100 dark:hover:bg-charcoal-700 flex items-center justify-between text-left transition-colors"
                >
                  <span className="font-semibold text-charcoal-800 dark:text-charcoal-200 truncate">GHG_DEFRA_Worksheet.xlsx</span>
                  <Download className="w-3.5 h-3.5 text-charcoal-500 dark:text-charcoal-400 shrink-0 ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Download Started', message: 'ISAE_3000_Notes.pdf downloaded.', type: 'info' })}
                  className="p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/50 dark:bg-charcoal-800/60 hover:bg-sand-100 dark:hover:bg-charcoal-700 flex items-center justify-between text-left transition-colors"
                >
                  <span className="font-semibold text-charcoal-800 dark:text-charcoal-200 truncate">ISAE_3000_Notes.pdf</span>
                  <Download className="w-3.5 h-3.5 text-charcoal-500 dark:text-charcoal-400 shrink-0 ml-2" />
                </button>
              </div>
            </div>

            {/* ACTION BAR: COMPLETE & NEXT */}
            <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                leftIcon={ArrowLeft}
                onClick={handlePrevLesson}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  variant={isCurrentCompleted ? 'secondary' : 'outline'}
                  size="sm"
                  leftIcon={isCurrentCompleted ? Check : Circle}
                  onClick={handleToggleComplete}
                >
                  {isCurrentCompleted ? 'Completed' : 'Mark Complete'}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={ArrowRight}
                  onClick={handleNextLesson}
                >
                  Next Lesson
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: SPRINT COMPANION RAIL (3 COLS) */}
        {/* ============================================================ */}
        <div className={`lg:col-span-3 space-y-5 ${mobileTab !== 'companion' ? 'hidden lg:block' : 'block'}`}>
          {/* SPRINT PROGRESS GAUGE */}
          <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
            <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100">
                Sprint Progression
              </h3>
              <span className="text-xs font-bold text-forest-700 dark:text-forest-400">{progressPercentage}%</span>
            </div>

            <ProgressBar value={progressPercentage} size="md" />

            <div className="flex justify-between text-[11px] text-charcoal-500 dark:text-charcoal-400 pt-1">
              <span>{completedLessonIds.length} of {allLessons.length} lessons done</span>
              <span className="font-semibold text-charcoal-700 dark:text-charcoal-300">{activeWeek}</span>
            </div>
          </Card>

          {/* TASKS CHECKLIST */}
          <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-3 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
            <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100">
                Milestone Tasks
              </h3>
              <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-mono">
                {tasks.filter((t) => t.done).length}/{tasks.length}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {tasks.map((task) => (
                <label key={task.id} className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="mt-0.5 rounded border-charcoal-300 dark:border-charcoal-700 text-forest-700 dark:text-forest-500 focus:ring-forest-600 bg-white dark:bg-charcoal-800"
                  />
                  <span className={`leading-relaxed ${task.done ? 'line-through text-charcoal-400 dark:text-charcoal-500' : 'text-charcoal-700 dark:text-charcoal-300 font-medium'}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {/* LEAD MENTOR & LIVE SESSION CARD */}
          <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-3 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 block">
              Lead Practitioner
            </span>
            <div className="flex items-center gap-3">
              <Avatar src={mentor.avatar} name={mentor.name} size="md" status="online" />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-charcoal-900 dark:text-charcoal-100 truncate">{mentor.name}</h4>
                <p className="text-[11px] text-forest-700 dark:text-forest-400 truncate">{mentor.role}</p>
              </div>
            </div>

            <div className="p-3 bg-sand-50 dark:bg-charcoal-950/70 rounded-lg border border-charcoal-200/60 dark:border-charcoal-800 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-forest-700 dark:text-forest-400 block">Live Critique Session</span>
              <p className="font-semibold text-charcoal-900 dark:text-charcoal-100">Thursday • 16:00 UTC</p>
              <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">Dr. Vogel reviews 3 student Scope 3 workpapers.</p>
            </div>

            <Button
              variant="outline"
              size="xs"
              className="w-full justify-center"
              leftIcon={MessageSquare}
              onClick={() => addToast({ title: 'Live Room Queued', message: 'Office hours link will activate 10 mins before start.', type: 'info' })}
            >
              Join Office Hours
            </Button>
          </Card>

          {/* SPRINT NOTES SCRATCHPAD */}
          <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-2 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-100 block">
              Quick Notes Scratchpad
            </span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot down notes during video masterclasses..."
              className="w-full text-xs p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30 text-charcoal-800 dark:text-charcoal-200 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => addToast({ title: 'Notes Saved', message: 'Your notes have been saved to local workspace.', type: 'success' })}
                className="text-[11px] font-semibold text-forest-700 dark:text-forest-400 hover:underline"
              >
                Save Notes
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SprintRoomPage
