import React, { useState, useMemo } from 'react'
import { Search, Users, X, Filter } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { MentorCard } from '../../components/cards/MentorCard'
import { MENTORS } from '../../data/mentors'

export const MentorsPage = () => {
  const [search, setSearch] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState('All')

  const expertiseDomains = [
    'All',
    'Carbon Accounting',
    'Circular Economy',
    'ESG & Compliance',
    'Supply Chain',
    'Clean Energy',
    'Climate Risk'
  ]

  const filteredMentors = useMemo(() => {
    return MENTORS.filter((m) => {
      if (selectedExpertise !== 'All' && m.domain !== selectedExpertise) {
        return false
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchName = m.name.toLowerCase().includes(q)
        const matchRole = m.role.toLowerCase().includes(q)
        const matchBio = m.bio.toLowerCase().includes(q)
        const matchExp = (m.expertise || '').toLowerCase().includes(q)
        if (!matchName && !matchRole && !matchBio && !matchExp) return false
      }
      return true
    })
  }, [search, selectedExpertise])

  return (
    <div className="py-12 space-y-10 transition-colors duration-200">
      <Container size="default">
        <SectionHeading
          tag="Pillar 2: Mentorship"
          title="Learn Directly from Experienced Climate Practitioners"
          description="Practitioner profiles representing seasoned CSOs, carbon accountants, and clean tech founders who guide our cohort fellows."
        />

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-charcoal-900 p-5 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle space-y-4">
          <div className="max-w-md">
            <Input
              placeholder="Search mentors by name, role, or climate topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={Search}
            />
          </div>

          <div className="pt-2 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {expertiseDomains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedExpertise(domain)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedExpertise === domain
                    ? 'bg-forest-800 dark:bg-forest-700 text-white border-forest-800 dark:border-forest-600 font-semibold'
                    : 'bg-sand-50 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 border-charcoal-200/70 dark:border-charcoal-700 hover:bg-sand-100 dark:hover:bg-charcoal-700 hover:text-charcoal-900 dark:hover:text-charcoal-100'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Clear */}
        <div className="flex items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400">
          <span>
            Showing <strong className="text-charcoal-900 dark:text-charcoal-100">{filteredMentors.length}</strong> mentors
          </span>
          {(search || selectedExpertise !== 'All') && (
            <button
              onClick={() => {
                setSearch('')
                setSelectedExpertise('All')
              }}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          )}
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Mentors Found"
            description="Try selecting a different domain or clearing your search term."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch('')
                  setSelectedExpertise('All')
                }}
              >
                Reset Search
              </Button>
            }
          />
        )}
      </Container>
    </div>
  )
}

export default MentorsPage
