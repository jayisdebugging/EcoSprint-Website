import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, Bookmark, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { SprintCard } from '../../components/cards/SprintCard'
import { SPRINTS } from '../../data/sprints'
import { useApp } from '../../context/AppContext'

export const SprintsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { savedSprintIds } = useApp()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [difficulty, setDifficulty] = useState('All')
  const [duration, setDuration] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All') // 'All' | 'Featured' | 'Popular' | 'Upcoming'

  const categories = [
    'All',
    'Carbon',
    'Circular Economy',
    'ESG',
    'Climate',
    'Supply Chain',
    'Sustainability Strategy'
  ]

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const durations = [
    { label: 'All Durations', value: 'All' },
    { label: '2 Weeks (Fast Track)', value: '2' },
    { label: '3 Weeks (Standard)', value: '3' },
    { label: '4 Weeks (Comprehensive)', value: '4' }
  ]

  const sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Duration: Short to Long', value: 'duration-asc' },
    { label: 'Duration: Long to Short', value: 'duration-desc' }
  ]

  const filteredSprints = useMemo(() => {
    return SPRINTS.filter((sprint) => {
      // Saved filter
      if (showSavedOnly && !savedSprintIds.includes(sprint.id)) {
        return false
      }

      // Status pill filter (Featured / Popular / Upcoming)
      if (statusFilter === 'Featured' && !sprint.featured) return false
      if (statusFilter === 'Popular' && !sprint.popular) return false
      if (statusFilter === 'Upcoming' && sprint.status !== 'Upcoming') return false

      // Category filter
      if (category !== 'All' && sprint.category !== category) {
        return false
      }

      // Difficulty filter
      if (difficulty !== 'All' && sprint.level !== difficulty) {
        return false
      }

      // Duration filter
      if (duration !== 'All' && String(sprint.durationWeeks) !== duration) {
        return false
      }

      // Search term
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchTitle = sprint.title.toLowerCase().includes(q)
        const matchDesc = sprint.description.toLowerCase().includes(q)
        const matchTagline = sprint.tagline.toLowerCase().includes(q)
        const matchSkills = sprint.skills.some((s) => s.toLowerCase().includes(q))
        const matchMentor = (sprint.mentorName || '').toLowerCase().includes(q)
        if (!matchTitle && !matchDesc && !matchTagline && !matchSkills && !matchMentor) {
          return false
        }
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0)
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sortBy === 'duration-asc') return a.durationWeeks - b.durationWeeks
      if (sortBy === 'duration-desc') return b.durationWeeks - a.durationWeeks
      return 0
    })
  }, [search, category, difficulty, duration, sortBy, showSavedOnly, statusFilter, savedSprintIds])

  const handleCategorySelect = (cat) => {
    setCategory(cat)
    if (cat === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams)
  }

  const resetAllFilters = () => {
    setSearch('')
    setCategory('All')
    setDifficulty('All')
    setDuration('All')
    setSortBy('popular')
    setShowSavedOnly(false)
    setStatusFilter('All')
    searchParams.delete('category')
    setSearchParams(searchParams)
  }

  return (
    <div className="py-12 space-y-10 transition-colors duration-200">
      <Container size="default">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-950/60 px-2.5 py-1 rounded-full border border-forest-200 dark:border-forest-800/80">
              Curriculum Marketplace
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight mt-3">
              Cohort-Based Sustainability Sprints
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 mt-1 max-w-2xl leading-relaxed">
              Find intensive 2–4 week programs engineered around real audit deliverables, hands-on simulation sandboxes, and active mentor critiques.
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
              <span>Saved Sprints ({savedSprintIds.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white dark:bg-charcoal-900 p-5 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="md:col-span-2">
              <Input
                placeholder="Search by title, skill, standard (e.g., Scope 3, CSRD)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={Search}
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                options={difficulties.map((d) => ({ label: d === 'All' ? 'All Difficulties' : d, value: d }))}
                placeholder=""
              />
            </div>

            {/* Duration Filter */}
            <div>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                options={durations}
                placeholder=""
              />
            </div>
          </div>

          {/* Sub Row: Categories, Status Filters & Sort */}
          <div className="pt-2 border-t border-charcoal-100 dark:border-charcoal-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                    category === cat
                      ? 'bg-forest-800 dark:bg-forest-700 text-white border-forest-800 dark:border-forest-600 font-semibold'
                      : 'bg-sand-50 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 border-charcoal-200/70 dark:border-charcoal-700 hover:bg-sand-100 dark:hover:bg-charcoal-700 hover:text-charcoal-900 dark:hover:text-charcoal-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Pills & Sort Dropdown */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1">
                {['All', 'Featured', 'Popular', 'Upcoming'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                      statusFilter === status
                        ? 'bg-charcoal-900 dark:bg-charcoal-100 text-white dark:text-charcoal-900'
                        : 'text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="w-44">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={sortOptions}
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filters Display */}
        <div className="flex items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400">
          <span>
            Showing <strong className="text-charcoal-900 dark:text-charcoal-100">{filteredSprints.length}</strong> {filteredSprints.length === 1 ? 'sprint' : 'sprints'}
          </span>
          {(search || category !== 'All' || difficulty !== 'All' || duration !== 'All' || showSavedOnly || statusFilter !== 'All') && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear active filters
            </button>
          )}
        </div>

        {/* Sprints Grid */}
        {filteredSprints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSprints.map((sprint) => (
              <SprintCard key={sprint.id} sprint={sprint} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={showSavedOnly ? 'No Saved Sprints' : 'No Sprints Found'}
            description={
              showSavedOnly
                ? 'You have not bookmarked any sprints yet. Click the bookmark icon on any sprint card to save it here.'
                : 'No sprint matches your current combination of category, difficulty, duration, and search keywords.'
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

export default SprintsPage
