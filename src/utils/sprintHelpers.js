import { SPRINTS } from '../data/sprints'
import { PROJECTS } from '../data/projects'
import { withLessonContent } from '../data/lessonContent'

export const flattenLessons = (sprint) =>
  (sprint?.curriculum || []).flatMap((week) =>
    (week.lessons || []).map((lesson) => ({
      ...withLessonContent(lesson),
      weekNum: week.week,
      weekTitle: week.title
    }))
  )

export const getSprintById = (id) =>
  SPRINTS.find((s) => s.id === id || s.slug === id) || null

export const getFirstLessonId = (sprintId) => {
  const sprint = getSprintById(sprintId)
  return sprint?.curriculum?.[0]?.lessons?.[0]?.id || null
}

export const getLessonCount = (sprintId) => {
  const sprint = getSprintById(sprintId)
  return flattenLessons(sprint).length
}

export const sprintCode = (sprintId) => {
  const map = {
    'sprint-carbon-accounting': 'CA',
    'sprint-circular-design': 'CIRC',
    'sprint-esg-csrd': 'ESG',
    'sprint-sustainable-supply-chains': 'SC',
    'sprint-climate-risk': 'CR'
  }
  return map[sprintId] || 'SPR'
}

export const createCredentialId = (sprintId) => {
  const year = new Date().getFullYear()
  const n = String(Math.floor(10000 + Math.random() * 90000))
  return `ECO-${sprintCode(sprintId)}-${year}-${n}`
}

export const cloneCapstoneForUser = (sprintId, userId) => {
  const template = PROJECTS.find((p) => p.sprintId === sprintId)
  if (!template) return null
  return {
    ...template,
    id: `${template.id}-${userId}`,
    status: 'In Progress',
    progress: 0,
    rubricScore: null,
    submittedAt: null,
    submissionData: null,
    auditorFeedback: null
  }
}

export const currentWeekLabel = (sprint, completedCount) => {
  const lessons = flattenLessons(sprint)
  if (!lessons.length) return 'Not started'
  const totalWeeks = sprint.curriculum?.length || 1
  const idx = Math.min(completedCount, lessons.length - 1)
  const week = lessons[idx]?.weekNum || 1
  return `Week ${week} of ${totalWeeks}`
}
