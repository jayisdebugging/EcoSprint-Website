import { SPRINTS } from '../data/sprints'
import { MENTORS } from '../data/mentors'
import { JOBS } from '../data/jobs'
import { PROJECTS } from '../data/projects'
import { CREDENTIALS } from '../data/credentials'
import { CURRENT_USER } from '../data/users'

/**
 * EcoSprint Service Abstraction Layer
 * 
 * Provides mock asynchronous and synchronous APIs for data operations.
 * When the backend is introduced in the next phase, these methods can be
 * transitioned to Axios/Fetch endpoints without refactoring component business logic.
 */

// Sprints
export const getSprints = async (filter = {}) => {
  return new Promise((resolve) => {
    let result = [...SPRINTS]
    if (filter.category && filter.category !== 'all') {
      result = result.filter(s => s.category?.toLowerCase() === filter.category.toLowerCase())
    }
    if (filter.difficulty && filter.difficulty !== 'all') {
      result = result.filter(s => s.difficulty?.toLowerCase() === filter.difficulty.toLowerCase())
    }
    if (filter.query) {
      const q = filter.query.toLowerCase()
      result = result.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    }
    resolve(result)
  })
}

export const getSprintById = async (id) => {
  return new Promise((resolve) => {
    const sprint = SPRINTS.find(s => s.id === id) || null
    resolve(sprint)
  })
}

export const enrollInSprint = async (sprintId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, sprintId, enrolledAt: new Date().toISOString() })
    }, 300)
  })
}

// Mentors
export const getMentors = async (domain = 'all') => {
  return new Promise((resolve) => {
    if (!domain || domain === 'all') {
      resolve([...MENTORS])
    } else {
      resolve(MENTORS.filter(m => m.domain?.toLowerCase() === domain.toLowerCase()))
    }
  })
}

export const getMentorById = async (id) => {
  return new Promise((resolve) => {
    const mentor = MENTORS.find(m => m.id === id) || null
    resolve(mentor)
  })
}

// Jobs & Careers
export const getJobs = async (filter = {}) => {
  return new Promise((resolve) => {
    let result = [...JOBS]
    if (filter.department && filter.department !== 'all') {
      result = result.filter(j => j.department?.toLowerCase() === filter.department.toLowerCase())
    }
    if (filter.query) {
      const q = filter.query.toLowerCase()
      result = result.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q))
    }
    resolve(result)
  })
}

// Projects
export const getProjects = async () => {
  return new Promise((resolve) => {
    resolve([...PROJECTS])
  })
}

export const getProjectById = async (id) => {
  return new Promise((resolve) => {
    const project = PROJECTS.find(p => p.id === id) || null
    resolve(project)
  })
}

export const submitProject = async (projectId, submissionData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        projectId,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        ...submissionData
      })
    }, 400)
  })
}

// Credentials
export const getCredentials = async () => {
  return new Promise((resolve) => {
    resolve([...CREDENTIALS])
  })
}

export const getCredentialById = async (id) => {
  return new Promise((resolve) => {
    const cred = CREDENTIALS.find(c => c.id === id || c.credentialId === id) || null
    resolve(cred)
  })
}

export const verifyCredential = async (hashOrId) => {
  return new Promise((resolve) => {
    const cred = CREDENTIALS.find(
      c => c.id === hashOrId || c.credentialId === hashOrId || c.verificationHash === hashOrId
    )
    if (cred) {
      resolve({ verified: true, credential: cred })
    } else {
      resolve({ verified: false, error: 'Credential record not found on verification ledger' })
    }
  })
}

// User & Dashboard
export const getCurrentUser = async () => {
  return new Promise((resolve) => {
    resolve({ ...CURRENT_USER })
  })
}

export const getDashboardSummary = async () => {
  return new Promise((resolve) => {
    resolve({
      activeSprint: SPRINTS[0],
      progress: 68,
      completedProjectsCount: 1,
      credentialsEarnedCount: 3,
      upcomingMilestones: [
        { id: 1, title: 'Scope 3 Category 1-4 Draft Submission', due: 'Tomorrow, 5:00 PM', type: 'project' },
        { id: 2, title: 'Cohort Q&A with Dr. Clara Chen', due: 'Thursday, 3:00 PM UTC', type: 'mentor' },
        { id: 3, title: 'Week 2 Knowledge Check Assessment', due: 'Friday, 11:59 PM', type: 'assessment' }
      ]
    })
  })
}
