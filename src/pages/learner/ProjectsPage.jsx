import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderGit2, CheckCircle2, Clock, ArrowRight, Award, Upload } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Tabs } from '../../components/ui/Tabs'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { ProjectCard } from '../../components/cards/ProjectCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { useApp } from '../../context/AppContext'

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const { projectsList } = useApp()

  const inProgressProjects = projectsList.filter((p) => p.status === 'In Progress')
  const submittedProjects = projectsList.filter((p) => p.status === 'Submitted')
  const completedProjects = projectsList.filter((p) => p.status === 'Completed')

  let displayedProjects = projectsList
  if (activeTab === 'in-progress') displayedProjects = inProgressProjects
  else if (activeTab === 'submitted') displayedProjects = submittedProjects
  else if (activeTab === 'completed') displayedProjects = completedProjects

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">Capstone Projects & Dossiers</h1>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
            Build and submit auditable sustainability workpapers reviewed by verified practitioners.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'all', label: 'All Projects', count: projectsList.length },
          { id: 'in-progress', label: 'In Progress', count: inProgressProjects.length },
          { id: 'submitted', label: 'Under Review', count: submittedProjects.length },
          { id: 'completed', label: 'Completed', count: completedProjects.length },
        ]}
      />

      {displayedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Projects in this State"
          description="You currently have no project capstones matching this status tab."
          action={
            <Button variant="outline" size="sm" onClick={() => setActiveTab('all')}>
              View All Projects
            </Button>
          }
        />
      )}
    </div>
  )
}

export default ProjectsPage
