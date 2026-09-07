import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Calendar, Bookmark, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'
import { useApp } from '../../context/AppContext'
import { useToast } from '../ui/Toast'

export const SprintCard = ({ sprint, showProgress = false, progressValue = 0 }) => {
  const { isSprintSaved, toggleSaveSprint, isEnrolled } = useApp()
  const { addToast } = useToast()
  const saved = isSprintSaved(sprint.id)
  const enrolled = isEnrolled(sprint.id)

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaveSprint(sprint.id)
    addToast({
      title: saved ? 'Sprint Removed' : 'Sprint Saved',
      message: saved ? `Removed "${sprint.title}" from your saved sprints.` : `Saved "${sprint.title}" for later.`,
      type: 'info'
    })
  }

  return (
    <Card hoverable className="bg-white dark:bg-charcoal-900 flex flex-col justify-between group relative border border-charcoal-200/80 dark:border-charcoal-800">
      <div className="space-y-3.5">
        {/* Top Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="forest" size="sm">
              {sprint.track}
            </Badge>
            <Badge variant="neutral" size="sm">
              {sprint.level}
            </Badge>
            {enrolled && (
              <Badge variant="sage" size="sm" dot>
                Enrolled
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={handleBookmark}
            className={`p-1.5 rounded-md transition-colors ${
              saved
                ? 'text-forest-700 dark:text-forest-300 bg-forest-50 dark:bg-forest-950/60'
                : 'text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200 hover:bg-sand-100 dark:hover:bg-charcoal-800'
            }`}
            aria-label={saved ? 'Remove bookmark' : 'Bookmark sprint'}
            title={saved ? 'Remove from saved' : 'Save sprint'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-forest-700 dark:fill-forest-400' : ''}`} />
          </button>
        </div>

        {/* Title & Tagline */}
        <div>
          <Link to={`/sprints/${sprint.id}`} className="block focus-visible:outline-none">
            <h3 className="text-base sm:text-lg font-bold text-charcoal-900 dark:text-charcoal-50 leading-snug group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors">
              {sprint.title}
            </h3>
          </Link>
          <p className="text-xs text-charcoal-600 dark:text-charcoal-400 mt-1.5 line-clamp-2 leading-relaxed">
            {sprint.tagline}
          </p>
        </div>

        {/* Optional Progress Bar if enrolled or instructed */}
        {(showProgress || (enrolled && progressValue > 0)) && (
          <div className="pt-1">
            <ProgressBar value={progressValue || 68} label="Sprint Progress" showValue size="sm" />
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-charcoal-500 dark:text-charcoal-400 border-t border-charcoal-100 dark:border-charcoal-800">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-charcoal-400" />
            {sprint.durationWeeks} Weeks ({sprint.hoursPerWeek}h/wk)
          </span>
          <span className="flex items-center gap-1.5 justify-end">
            <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
            Starts {sprint.cohortStartDate}
          </span>
        </div>

        {/* Mentor note */}
        {sprint.mentorName && (
          <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
            Lead Mentor: <span className="font-semibold text-charcoal-700 dark:text-charcoal-300">{sprint.mentorName}</span>
          </p>
        )}

        {/* Skills preview */}
        <div className="flex flex-wrap gap-1 pt-1">
          {sprint.skills.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="text-[11px] bg-sand-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 px-2 py-0.5 rounded border border-charcoal-200/60 dark:border-charcoal-700"
            >
              {skill}
            </span>
          ))}
          {sprint.skills.length > 3 && (
            <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 py-0.5 self-center">
              +{sprint.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="pt-4 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider block">Tuition</span>
          <span className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 font-sans">
            ₹{Number(sprint.price || 2499).toLocaleString('en-IN')}
          </span>
        </div>

        {enrolled ? (
          <Link to={`/sprint-room/${sprint.id}`}>
            <Button variant="secondary" size="sm" rightIcon={ArrowRight}>
              Sprint Room
            </Button>
          </Link>
        ) : (
          <Link to={`/sprints/${sprint.id}`}>
            <Button variant="primary" size="sm" rightIcon={ArrowRight}>
              View Sprint
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

export default SprintCard
