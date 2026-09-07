import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, CheckCircle2, Award, ArrowRight, Bookmark } from 'lucide-react'
import { Tabs } from '../../components/ui/Tabs'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { SprintCard } from '../../components/cards/SprintCard'
import { useApp } from '../../context/AppContext'
import { SPRINTS } from '../../data/sprints'

export const MySprintsPage = () => {
  const [activeTab, setActiveTab] = useState('active')
  const { savedSprintIds, toggleSaveSprint, sprintProgress, credentialsList } = useApp()

  const enrolledEntries = Object.entries(sprintProgress || {}).filter(([, s]) => s.enrolled)

  const activeSprints = enrolledEntries
    .filter(([, s]) => (s.progress || 0) < 100)
    .map(([sprintId, state]) => ({ sprint: SPRINTS.find((s) => s.id === sprintId) || null, progress: state.progress || 0 }))
    .filter((x) => x.sprint)

  const completedSprints = (credentialsList || []).map((c) => ({
    id: c.sprintId || c.credentialId,
    title: c.sprintTitle || c.title,
    track: 'Completed Sprint',
    completedDate: c.issuedDate || '—',
    score: 'Verified',
    mentor: c.issuingMentor || 'EcoSprint Faculty',
    hours: '—',
    credentialId: c.credentialId
  }))

  const savedSprints = SPRINTS.filter((s) => savedSprintIds.includes(s.id))

  const activeTabCount = activeSprints.length
  const completedTabCount = completedSprints.length

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">My Sprints</h1>
        <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
          Manage your active cohort progression, review completed capstone dossiers, and browse saved sprints.
        </p>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'active', label: `Active Sprints (${activeTabCount})`, count: activeTabCount },
          { id: 'completed', label: `Completed (${completedTabCount})`, count: completedTabCount },
          { id: 'saved', label: `Saved (${savedSprints.length})`, count: savedSprints.length },
        ]}
      />

      {/* ACTIVE SPRINT TAB */}
      {activeTab === 'active' && (
        <div>
          {activeSprints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSprints.map(({ sprint, progress }) => (
                <SprintCard
                  key={sprint.id}
                  sprint={sprint}
                  showProgress={progress > 0}
                  progressValue={progress}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Compass}
              title="No Active Sprints"
              description="Enroll in a sprint from the catalog to start building verifiable green skills."
              action={
                <Link to="/sprints">
                  <Button variant="primary" size="sm" rightIcon={ArrowRight}>
                    Explore Sprint Catalog
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      )}

      {/* COMPLETED SPRINTS TAB */}
      {activeTab === 'completed' && (
        <div>
          {completedSprints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedSprints.map((s) => (
                <div
                  key={s.id}
                  className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 rounded-xl shadow-subtle flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="sage" size="sm" dot>
                        Completed • {s.score}
                      </Badge>
                      <span className="text-xs text-charcoal-500 dark:text-charcoal-400 font-medium">{s.completedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 leading-snug">
                      {s.title}
                    </h3>

                    <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
                      Auditor: {s.mentor}
                    </p>

                    <div className="p-2.5 rounded bg-sand-50 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700 font-mono text-[11px] text-charcoal-600 dark:text-charcoal-300">
                      Credential: {s.credentialId}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
                    <Link to="/credentials">
                      <Button variant="outline" size="xs" leftIcon={Award}>
                        View Certificate
                      </Button>
                    </Link>
                    <Link to="/projects">
                      <Button variant="outline" size="xs">
                        Review Capstone Dossier
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CheckCircle2}
              title="No Completed Sprints"
              description="Finish all lessons and submit your capstone project to earn a verifiable credential."
            />
          )}
        </div>
      )}

      {/* SAVED SPRINTS TAB */}
      {activeTab === 'saved' && (
        <div>
          {savedSprints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSprints.map((sprint) => (
                <SprintCard key={sprint.id} sprint={sprint} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Bookmark}
              title="No Saved Sprints"
              description="You have not saved any sprints to your wishlist. Explore our catalog and bookmark sprints to track them here."
              action={
                <Link to="/sprints">
                  <Button variant="primary" size="sm" rightIcon={ArrowRight}>
                    Explore Sprints Catalog
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      )}
    </div>
  )
}

export default MySprintsPage