/**
 * Centralized mock data: Users & Profiles
 */

export const CURRENT_USER = {
  id: 'user-elena-rostova',
  name: 'Elena Rostova',
  email: 'elena.rostova@ecolearner.org',
  role: 'Learner & ESG Specialist',
  headline: 'Sustainability Analyst transitioning to Senior ESG Strategy & CSRD Auditing',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  cohortName: 'Cohort Autumn-2026',
  completedSprintsCount: 2,
  activeSprintsCount: 1,
  credentialsCount: 3,
  hoursLearned: 78,
  activeSprintId: 'sprint-carbon-accounting',
  currentSprintProgress: 75,
  skillsAcquired: [
    'GHG Protocol',
    'CSRD & ESRS Standards',
    'Double Materiality Assessment',
    'ISO 14040 LCA',
    'Scope 3 Upstream Modeling',
    'EU Taxonomy CapEx Alignment'
  ],
  company: 'Nordic Transition Group',
  location: 'Stockholm, Sweden',
  bio: 'Environmental economist with 4 years in renewable energy project finance. Currently completing the EcoSprint Corporate Carbon Accounting track to lead internal audit prep.',
  preferences: {
    emailNotifications: true,
    mentorAlerts: true,
    weeklyDigest: true,
    peerDiscussion: true,
    darkMode: false
  }
}

export const PLATFORM_STATS = {
  activeLearners: '3,450+',
  averageSprintCompletion: '94.2%',
  verifiedHires: '680+',
  practitionerMentors: '48',
  hiringPartnerCompanies: '120+',
  averageWeeksToPlacement: '4.8 weeks'
}
