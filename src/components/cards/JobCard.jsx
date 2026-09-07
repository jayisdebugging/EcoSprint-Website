import React, { useState } from 'react'
import { Building2, MapPin, Briefcase, Bookmark, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { useApp } from '../../context/AppContext'
import { useToast } from '../ui/Toast'

export const JobCard = ({ job, showMatch = false }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { isJobSaved, toggleSaveJob } = useApp()
  const { addToast } = useToast()
  const saved = isJobSaved(job.id)

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaveJob(job.id)
    addToast({
      title: saved ? 'Job Removed' : 'Job Saved',
      message: saved ? `Removed ${job.title} from saved roles.` : `Saved ${job.title} at ${job.company}.`,
      type: 'info'
    })
  }

  const handleApply = () => {
    addToast({
      title: 'Application Dispatched',
      message: `Your verified EcoSprint portfolio was submitted to ${job.company}.`,
      type: 'success'
    })
    setModalOpen(false)
  }

  return (
    <>
      <Card hoverable className="bg-white dark:bg-charcoal-900 border border-charcoal-200/80 dark:border-charcoal-800 group" onClick={() => setModalOpen(true)}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-sand-100 dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-charcoal-300 dark:group-hover:border-charcoal-600">
              <Building2 className="w-6 h-6 text-charcoal-600 dark:text-charcoal-300" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors">
                  {job.title}
                </h3>
                {job.featured && <Badge variant="forest" size="sm">Hiring Partner</Badge>}
                {showMatch && job.matchPercentage && (
                  <Badge variant="sage" size="sm">
                    {job.matchPercentage}% Skill Match
                  </Badge>
                )}
              </div>

              <p className="text-xs font-semibold text-charcoal-700 dark:text-charcoal-300">
                {job.company} • {job.department}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500 dark:text-charcoal-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-500" /> {job.location} ({job.locationType || 'Hybrid'})
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-500" /> {job.type}
                </span>
                <span className="font-semibold text-forest-700 dark:text-forest-400 font-sans">
                  {job.salary}
                </span>
                <span className="text-charcoal-400 dark:text-charcoal-500">
                  Posted {job.postedDaysAgo}d ago
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-charcoal-100 dark:border-charcoal-800 justify-between md:justify-end">
            <div className="hidden lg:flex flex-wrap gap-1 max-w-xs justify-end">
              {job.requiredSkills.slice(0, 3).map((skill, i) => (
                <span key={i} className="text-[10px] bg-sand-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300 px-2 py-0.5 rounded border border-charcoal-200/60 dark:border-charcoal-700">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBookmark}
                className={`p-2 rounded-md transition-colors ${
                  saved
                    ? 'text-forest-700 dark:text-forest-300 bg-forest-50 dark:bg-forest-950/60'
                    : 'text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200 hover:bg-sand-100 dark:hover:bg-charcoal-800'
                }`}
                aria-label={saved ? 'Remove saved job' : 'Save job'}
                title={saved ? 'Remove saved job' : 'Save job'}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-forest-700 dark:fill-forest-400' : ''}`} />
              </button>

              <Button
                variant="primary"
                size="sm"
                rightIcon={ArrowRight}
                onClick={(e) => {
                  e.stopPropagation()
                  setModalOpen(true)
                }}
              >
                View Role
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Job Detail Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={job.title}
        description={`${job.company} • ${job.location} • ${job.salary}`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs">
          {/* Company blurb */}
          {job.companyDescription && (
            <div className="p-3 bg-sand-50 dark:bg-charcoal-800 rounded-lg border border-charcoal-200/60 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300">
              <span className="font-semibold text-charcoal-900 dark:text-charcoal-100 block mb-0.5">About {job.company}</span>
              <p>{job.companyDescription}</p>
            </div>
          )}

          <div className="space-y-1">
            <h4 className="font-bold text-charcoal-900 dark:text-charcoal-100 text-sm">Role Overview</h4>
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">{job.description}</p>
          </div>

          {job.responsibilities && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-charcoal-900 dark:text-charcoal-100 text-sm">Key Responsibilities</h4>
              <ul className="space-y-1 text-charcoal-600 dark:text-charcoal-300 list-disc list-inside">
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-charcoal-900 dark:text-charcoal-100 text-sm">Required Qualifications</h4>
              <ul className="space-y-1 text-charcoal-600 dark:text-charcoal-300 list-disc list-inside">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-1.5">
            <h4 className="font-bold text-charcoal-900 dark:text-charcoal-100 text-sm">Verified Skills Expected</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills.map((s, i) => (
                <Badge key={i} variant="forest" size="sm">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
            <span className="text-charcoal-500 dark:text-charcoal-400">
              Hiring Lead: <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">{job.hiringManager}</span>
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" size="sm" rightIcon={ArrowRight} onClick={handleApply}>
                Submit Application via Cohort
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default JobCard
