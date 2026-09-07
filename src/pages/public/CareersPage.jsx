import React, { useState, useMemo } from 'react'
import { Search, Briefcase, Bookmark, X, MapPin, Building2, Filter } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { JobCard } from '../../components/cards/JobCard'
import { JOBS } from '../../data/jobs'
import { useApp } from '../../context/AppContext'

export const CareersPage = () => {
  const { savedJobIds } = useApp()

  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All')
  const [jobType, setJobType] = useState('All')
  const [experience, setExperience] = useState('All')
  const [showSavedOnly, setShowSavedOnly] = useState(false)

  const departments = [
    'All',
    'Corporate Decarbonization',
    'Finance & Regulatory Compliance',
    'Product Innovation',
    'Energy Infrastructure',
    'Global Sourcing & ESG'
  ]

  const jobTypes = ['All', 'Full-time', 'Contract', 'Hybrid', 'On-site', 'Remote-friendly']
  const experienceLevels = ['All', 'Mid-Level', 'Mid-Senior', 'Senior']

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      // Saved toggle
      if (showSavedOnly && !savedJobIds.includes(job.id)) return false

      // Department filter
      if (department !== 'All' && job.department !== department) return false

      // Job type filter
      if (jobType !== 'All') {
        if (job.type !== jobType && job.locationType !== jobType) return false
      }

      // Experience filter
      if (experience !== 'All' && job.experienceLevel !== experience) return false

      // Search term
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchTitle = job.title.toLowerCase().includes(q)
        const matchCompany = job.company.toLowerCase().includes(q)
        const matchLoc = job.location.toLowerCase().includes(q)
        const matchSkills = job.requiredSkills.some((s) => s.toLowerCase().includes(q))
        if (!matchTitle && !matchCompany && !matchLoc && !matchSkills) return false
      }

      return true
    })
  }, [search, department, jobType, experience, showSavedOnly, savedJobIds])

  const resetAllFilters = () => {
    setSearch('')
    setDepartment('All')
    setJobType('All')
    setExperience('All')
    setShowSavedOnly(false)
  }

  return (
    <div className="py-12 space-y-10 transition-colors duration-200">
      <Container size="default">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-950/60 px-2.5 py-1 rounded-full border border-forest-200 dark:border-forest-800/80">
              Pillar 3: Career Network
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight mt-3">
              Sustainability Talent Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 mt-1 max-w-2xl leading-relaxed">
              Explore job openings at hiring partners seeking verified green skills and project-backed portfolios.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                showSavedOnly
                  ? 'bg-forest-800 dark:bg-forest-700 text-white border-forest-800 dark:border-forest-600'
                  : 'bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200 border-charcoal-200 dark:border-charcoal-700 hover:bg-sand-100 dark:hover:bg-charcoal-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
              <span>Saved Roles ({savedJobIds.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white dark:bg-charcoal-900 p-5 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="sm:col-span-2 lg:col-span-1">
              <Input
                placeholder="Search roles, skills, or companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={Search}
              />
            </div>

            <div>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={departments.map((d) => ({ label: d === 'All' ? 'All Focus Areas' : d, value: d }))}
                placeholder=""
              />
            </div>

            <div>
              <Select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                options={jobTypes.map((t) => ({ label: t === 'All' ? 'All Work Types' : t, value: t }))}
                placeholder=""
              />
            </div>

            <div>
              <Select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                options={experienceLevels.map((l) => ({ label: l === 'All' ? 'All Seniority Levels' : l, value: l }))}
                placeholder=""
              />
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filter Bar */}
        <div className="flex items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400">
          <span>
            Showing <strong className="text-charcoal-900 dark:text-charcoal-100">{filteredJobs.length}</strong> opportunities
          </span>
          {(search || department !== 'All' || jobType !== 'All' || experience !== 'All' || showSavedOnly) && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear active filters
            </button>
          )}
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} showMatch />
            ))}
          </div>
        ) : (
          <EmptyState
            title={showSavedOnly ? 'No Saved Roles' : 'No Positions Found'}
            description={
              showSavedOnly
                ? 'You have not saved any job opportunities yet. Click the bookmark icon on any job card to save it.'
                : 'No role matches your current search keywords and filter criteria.'
            }
            action={
              <Button variant="primary" size="sm" onClick={resetAllFilters}>
                Reset All Filters
              </Button>
            }
          />
        )}
      </Container>
    </div>
  )
}

export default CareersPage
