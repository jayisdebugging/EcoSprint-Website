import React from 'react'
import { Link } from 'react-router-dom'
import { FolderGit2, CheckCircle2, Clock, ArrowRight, Award } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'

export const ProjectCard = ({ project }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="sage" size="sm" dot>Completed</Badge>
      case 'Submitted':
        return <Badge variant="info" size="sm" dot>Under Review</Badge>
      case 'In Progress':
        return <Badge variant="forest" size="sm" dot>In Progress</Badge>
      default:
        return <Badge variant="neutral" size="sm">Upcoming</Badge>
    }
  }

  return (
    <Card hoverable className="bg-white dark:bg-charcoal-900 border border-charcoal-200/80 dark:border-charcoal-800 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {getStatusBadge(project.status)}
          {project.rubricScore && (
            <span className="text-xs font-bold text-forest-800 dark:text-forest-400">
              Grade: {project.rubricScore}%
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1 line-clamp-1">
            {project.sprintTitle}
          </p>
        </div>

        <div className="space-y-1.5">
          <ProgressBar
            value={project.progress || (project.status === 'Completed' ? 100 : project.status === 'Submitted' ? 95 : 50)}
            label="Deliverable Completion"
            showValue
            size="sm"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {project.skillsDemonstrated.slice(0, 3).map((s, i) => (
            <span key={i} className="text-[10px] bg-sand-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200/60 dark:border-charcoal-700 px-2 py-0.5 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
        <span className="text-xs text-charcoal-500 dark:text-charcoal-400">
          Due: {project.dueDate}
        </span>
        <Link to={`/projects/${project.id}`}>
          <Button variant="outline" size="xs" rightIcon={ArrowRight}>
            Project Brief & Files
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default ProjectCard
