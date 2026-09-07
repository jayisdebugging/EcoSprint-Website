import React, { useState } from 'react'
import { MapPin, Star, MessageSquare, Clock, BookOpen, ExternalLink } from 'lucide-react'
import { Card } from '../ui/Card'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { useToast } from '../ui/Toast'

export const MentorCard = ({ mentor }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addToast } = useToast()

  const handleMessage = () => {
    addToast({
      title: 'Mentor Office Hours',
      message: `Your inquiry was queued for ${mentor.name}. They usually respond within 24 hours.`,
      type: 'success'
    })
    setModalOpen(false)
  }

  return (
    <>
      <Card className="bg-white dark:bg-charcoal-900 border border-charcoal-200/80 dark:border-charcoal-800 flex flex-col justify-between" hoverable onClick={() => setModalOpen(true)}>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar src={mentor.avatar} name={mentor.name} size="lg" status="online" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 truncate">
                {mentor.name}
              </h3>
              <p className="text-xs font-medium text-forest-800 dark:text-forest-400 line-clamp-1">
                {mentor.role}
              </p>
              <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                {mentor.experienceYears} years experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="sage" size="sm">
              {mentor.expertise || mentor.domain}
            </Badge>
          </div>

          <p className="text-xs text-charcoal-600 dark:text-charcoal-300 line-clamp-3 leading-relaxed">
            {mentor.bio}
          </p>

          <div className="pt-2 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400" /> {mentor.location}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {mentor.rating} ({mentor.cohortsMentored} cohorts)
            </span>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between">
          <span className="text-xs text-forest-700 dark:text-forest-400 font-medium">
            {mentor.officeHoursAvailable ? 'Office Hours Available' : 'Upcoming Cohort'}
          </span>
          <Button
            variant="outline"
            size="xs"
            onClick={(e) => {
              e.stopPropagation()
              setModalOpen(true)
            }}
          >
            View Profile
          </Button>
        </div>
      </Card>

      {/* Mentor Detail Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mentor.name}
        description={mentor.role}
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar src={mentor.avatar} name={mentor.name} size="xl" status="online" />
            <div>
              <h4 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">{mentor.name}</h4>
              <p className="text-xs text-forest-800 dark:text-forest-400 font-medium">{mentor.role}</p>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{mentor.location} • {mentor.experienceYears} yrs experience</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-charcoal-700 dark:text-charcoal-300 leading-relaxed bg-sand-50 dark:bg-charcoal-800/80 p-3 rounded-lg border border-charcoal-200/60 dark:border-charcoal-700">
            <span className="font-semibold text-charcoal-900 dark:text-charcoal-50 block">Practitioner Bio</span>
            <p>{mentor.bio}</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-charcoal-600 dark:text-charcoal-400 block">Related Cohort Sprints</span>
            <div className="space-y-1 text-xs">
              {(mentor.sprintTitles || []).map((st, i) => (
                <div key={i} className="flex items-center gap-2 text-charcoal-700 dark:text-charcoal-300">
                  <BookOpen className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-forest-50/60 dark:bg-forest-950/40 rounded-lg border border-forest-200/70 dark:border-forest-800/60 text-xs text-forest-900 dark:text-forest-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-forest-700" />
              Next Session: {mentor.upcomingSession || 'Thursday, 16:00 UTC'}
            </span>
            <span className="font-bold text-[10px] uppercase tracking-wider bg-forest-200/60 px-2 py-0.5 rounded">Live</span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" leftIcon={MessageSquare} onClick={handleMessage}>
              Request Office Hours
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MentorCard
