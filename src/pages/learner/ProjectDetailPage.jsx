import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Upload,
  ArrowRight,
  FileCheck,
  Download,
  AlertCircle,
  FileSpreadsheet,
  Check,
  Star,
  MessageSquare
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'

export const ProjectDetailPage = () => {
  const { id } = useParams()
  const { projectsList, submitProject } = useApp()
  const { addToast } = useToast()

  const project = projectsList.find((p) => p.id === id) || projectsList[0]

  // File upload state simulation
  const [selectedFile, setSelectedFile] = useState(null)
  const [submissionNotes, setSubmissionNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSimulateFilePick = () => {
    setSelectedFile({
      name: `${project.title.replace(/\s+/g, '_').slice(0, 24)}_Final_Workpaper.xlsx`,
      size: '2.8 MB',
      updatedAt: 'Just now'
    })
    addToast({
      title: 'File Staged for Upload',
      message: 'Workbook staged. Enter submission notes and click Submit.',
      type: 'info'
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      submitProject(project.id, {
        fileName: selectedFile?.name || 'Audit_Workpaper_Final.xlsx',
        notes: submissionNotes,
        submittedAt: new Date().toISOString().split('T')[0]
      })
      addToast({
        title: 'Capstone Successfully Submitted!',
        message: 'Your project has been queued for Dr. Clara Vogel’s audit evaluation.',
        type: 'success'
      })
    }, 600)
  }

  const isSubmitted = project.status === 'Submitted'
  const isCompleted = project.status === 'Completed'

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      <Breadcrumb
        items={[
          { label: 'Projects', to: '/projects' },
          { label: project.sprintTitle, to: `/sprints/${project.sprintId}` },
          { label: project.title }
        ]}
      />

      {/* Header Banner */}
      <div className="bg-white dark:bg-charcoal-900 p-6 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge
            variant={isCompleted ? 'sage' : isSubmitted ? 'info' : 'forest'}
            size="sm"
            dot
          >
            {isCompleted ? 'Completed' : isSubmitted ? 'Submitted & Under Review' : 'In Progress'}
          </Badge>
          <span className="text-xs text-charcoal-500 dark:text-charcoal-400">
            Sprint: <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">{project.sprintTitle}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
          <strong className="text-charcoal-800 dark:text-charcoal-50">Client Scenario:</strong> {project.clientScenario}
        </p>

        <div className="pt-2">
          <ProgressBar
            value={project.progress}
            label="Milestone Completion"
            showValue
            size="md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main 8-column brief & instructions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Learning Objectives */}
          <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
            <h2 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Learning Objectives</h2>
            <div className="space-y-2">
              {(project.learningObjectives || []).map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal-700 dark:text-charcoal-300">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Project Requirements Checklist */}
          <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
            <h2 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Deliverable Requirements</h2>
            <div className="space-y-2">
              {(project.requirements || project.deliverables || []).map((req, i) => (
                <div key={i} className="p-3 rounded-lg bg-sand-50/80 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700 text-xs font-medium text-charcoal-800 dark:text-charcoal-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-forest-100 dark:bg-forest-900/60 text-forest-800 dark:text-forest-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Starter Resources & Workpapers */}
          <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
            <h2 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Project Resources & Datasets</h2>
            <div className="space-y-2">
              {(project.resources || []).map((res, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-sand-50/60 dark:bg-charcoal-800/60 border border-charcoal-200 dark:border-charcoal-700 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileSpreadsheet className="w-4 h-4 text-forest-700 dark:text-forest-400 shrink-0" />
                    <span className="font-semibold text-charcoal-900 dark:text-charcoal-50 truncate">{res.name}</span>
                    <span className="text-[11px] text-charcoal-400 font-mono">({res.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToast({ title: 'Download Initialized', message: `Downloading ${res.name}`, type: 'info' })}
                    className="text-forest-800 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-300 font-semibold inline-flex items-center gap-1 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Auditor Feedback (If submitted or completed) */}
          {(isSubmitted || isCompleted) && project.auditorFeedback && (
            <Card className="bg-forest-50/40 dark:bg-forest-950/30 border border-forest-300 dark:border-forest-800 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <h3 className="text-sm font-bold text-charcoal-900 dark:text-charcoal-50">
                    Auditor Evaluation: {project.rubricScore}%
                  </h3>
                </div>
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400 font-medium">
                  Reviewed by {project.auditorFeedback.auditor}
                </span>
              </div>

              <div className="text-xs text-charcoal-700 dark:text-charcoal-300 space-y-2 leading-relaxed">
                <p><strong>Strengths:</strong> {project.auditorFeedback.strengths}</p>
                <p><strong>Opportunities:</strong> {project.auditorFeedback.improvementAreas}</p>
              </div>
            </Card>
          )}
        </div>

        {/* Right 4-column submission rail */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-5 border border-charcoal-200 dark:border-charcoal-800 shadow-card">
            <h3 className="text-sm font-bold text-charcoal-900 dark:text-charcoal-50 border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
              Submission Status
            </h3>

            <div className="space-y-2 text-xs text-charcoal-600 dark:text-charcoal-400">
              <div className="flex justify-between py-1 border-b border-charcoal-100 dark:border-charcoal-800">
                <span>Estimated Hours:</span>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50">{project.estimatedHours}h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-charcoal-100 dark:border-charcoal-800">
                <span>Deadline:</span>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50">{project.dueDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-charcoal-100 dark:border-charcoal-800">
                <span>Current Status:</span>
                <span className="font-bold text-forest-800 dark:text-forest-400">{project.status}</span>
              </div>
              {project.rubricScore && (
                <div className="flex justify-between py-1 border-b border-charcoal-100 dark:border-charcoal-800">
                  <span>Score:</span>
                  <span className="font-bold text-forest-800 dark:text-forest-400">{project.rubricScore}%</span>
                </div>
              )}
            </div>

            {/* Submission Form UI */}
            {isSubmitted || isCompleted ? (
              <div className="p-4 rounded-lg bg-sand-50 dark:bg-charcoal-800/60 border border-charcoal-200 dark:border-charcoal-700 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center mx-auto">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-charcoal-900 dark:text-charcoal-50">Capstone Submitted</p>
                <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                  Logged on {project.submittedAt || 'Today'}. Review in progress.
                </p>
                <Button
                  variant="outline"
                  size="xs"
                  className="w-full justify-center mt-2"
                  onClick={() => addToast({ title: 'Workpaper Download', message: 'Downloading your submitted version.', type: 'info' })}
                >
                  Download Submitted File
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
                    Upload Final Workpaper
                  </label>

                  <div
                    onClick={handleSimulateFilePick}
                    className="p-5 border-2 border-dashed border-charcoal-300 dark:border-charcoal-700 rounded-lg text-center hover:border-forest-700 dark:hover:border-forest-500 transition-colors cursor-pointer bg-sand-50/60 dark:bg-charcoal-800/60"
                  >
                    <Upload className="w-6 h-6 text-charcoal-400 mx-auto mb-1.5" />
                    {selectedFile ? (
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-forest-800 dark:text-forest-400 truncate">{selectedFile.name}</p>
                        <p className="text-[10px] text-charcoal-400 font-mono">{selectedFile.size}</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-charcoal-800 dark:text-charcoal-200">Click to choose workbook</p>
                        <p className="text-[10px] text-charcoal-400 mt-0.5">XLSX, CSV, PDF up to 25MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
                    Auditor Notes / Methodology Memo
                  </label>
                  <textarea
                    rows={3}
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    placeholder="Briefly state your boundary consolidation method..."
                    className="w-full text-xs p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30 text-charcoal-800 dark:text-charcoal-100 placeholder-charcoal-400 dark:placeholder-charcoal-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  className="w-full justify-center text-xs"
                  rightIcon={ArrowRight}
                >
                  Submit for Auditor Review
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
