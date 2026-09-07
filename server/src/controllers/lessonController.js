import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'
import crypto from 'crypto'

const generateCredentialId = (sprintId, count) => {
  const prefix = sprintId.includes('carbon') ? 'CA'
    : sprintId.includes('circular') ? 'CIRC'
    : sprintId.includes('esg') ? 'CSRD'
    : sprintId.includes('supply') ? 'SC'
    : sprintId.includes('climate-risk') ? 'CR'
    : sprintId.includes('microgrid') ? 'MICRO'
    : 'EV'
  return `ECO-${prefix}-2026-${String(count).padStart(5, '0')}`
}

const verifySprintCompletion = async (userId, sprintId) => {
  const sprint = await prisma.sprint.findUnique({
    where: { id: sprintId },
    include: { modules: { include: { lessons: true } } }
  })
  if (!sprint) return { complete: false }

  const allLessons = sprint.modules.flatMap((m) => m.lessons)
  const completed = await prisma.lessonProgress.count({
    where: { userId, sprintId, completed: true }
  })

  const complete = allLessons.length > 0 && completed >= allLessons.length
  return { complete, total: allLessons.length, completed }
}

// POST /api/lessons/:id/complete
export const completeLesson = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { module: { include: { sprint: true } } }
  })
  if (!lesson) throw new ApiError(404, 'Lesson not found')

  const sprintId = lesson.module.sprintId
  const existing = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId: id } }
  })

  // Calculate next lesson id
  const moduleLessons = await prisma.lesson.findMany({
    where: { moduleId: lesson.moduleId },
    orderBy: { order: 'asc' }
  })
  const currentIndex = moduleLessons.findIndex((l) => l.id === id)
  let nextLessonId = moduleLessons[currentIndex + 1]?.id || null

  if (!nextLessonId) {
    // Find next module's first lesson
    const nextModule = await prisma.sprintModule.findFirst({
      where: { sprintId, order: { gt: lesson.module.order } },
      orderBy: { order: 'asc' },
      include: { lessons: { orderBy: { order: 'asc' } } }
    })
    if (nextModule && nextModule.lessons[0]) {
      nextLessonId = nextModule.lessons[0].id
    }
  }

  if (existing) {
    await prisma.lessonProgress.update({
      where: { id: existing.id },
      data: { completed: true, completedAt: new Date() }
    })
  } else {
    await prisma.lessonProgress.create({
      data: { userId, lessonId: id, sprintId, completed: true, completedAt: new Date() }
    })
  }

  // Calculate fresh progress
  const { complete, total, completed } = await verifySprintCompletion(userId, sprintId)
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_sprintId: { userId, sprintId } }
  })

  if (enrollment) {
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progress,
        currentLessonId: nextLessonId,
        status: complete ? 'COMPLETED' : 'ACTIVE',
        completedAt: complete ? new Date() : null
      }
    })
  }

  // Activity + notification
  await prisma.$transaction([
    prisma.activity.create({
      data: {
        userId,
        type: 'LESSON_COMPLETED',
        title: 'Lesson completed',
        description: 'Completed ' + lesson.title
      }
    }),
    prisma.notification.create({
      data: {
        userId,
        type: 'LESSON',
        title: 'Lesson completed',
        message: 'You completed ' + lesson.title
      }
    })
  ])

  // Auto-credential on sprint completion (backend verifies)
  if (complete) {
    const existingCred = await prisma.credential.findFirst({
      where: { userId, sprintId }
    })
    if (!existingCred) {
      const sprint = lesson.module.sprint
      const credCount = await prisma.credential.count()
      const credentialId = generateCredentialId(sprintId, credCount + 124)
      const verificationHash = '0x' + crypto.randomBytes(16).toString('hex')

      await prisma.$transaction([
        prisma.credential.create({
          data: {
            credentialId,
            verificationHash,
            title: sprint.title + ' — Verified Completion',
            recipientName: req.user.name,
            userId,
            sprintId,
            sprintTitle: sprint.title,
            grade: 'Passed (100%)',
            skills: sprint.skills,
            issuingMentor: sprint.mentorName || 'EcoSprint Practitioner Panel',
            description: 'Conferred upon verified completion of all sprint modules, lessons, and capstone requirements.',
            linkedinSyncStatus: 'NOT_CONNECTED'
          }
        }),
        prisma.activity.create({
          data: {
            userId,
            type: 'SPRINT_COMPLETED',
            title: 'Sprint completed!',
            description: 'You have successfully completed ' + sprint.title
          }
        }),
        prisma.activity.create({
          data: {
            userId,
            type: 'CREDENTIAL_EARNED',
            title: 'Credential earned',
            description: 'Credential ' + credentialId + ' issued'
          }
        }),
        prisma.notification.create({
          data: {
            userId,
            type: 'CREDENTIAL',
            title: 'Credential earned!',
            message: 'You earned ' + credentialId + ' for completing ' + sprint.title
          }
        })
      ])

      // Update profile skills + completed sprints
      const profile = await prisma.profile.findUnique({ where: { userId } })
      if (profile) {
        const updatedSkills = [...new Set([...(profile.skills || []), ...sprint.skills])]
        const updatedSprintIds = [...new Set([...(profile.completedSprintIds || []), sprintId])]
        await prisma.profile.update({
          where: { userId },
          data: { skills: updatedSkills, completedSprintIds: updatedSprintIds }
        })
      }

      return res.json({
        success: true,
        progress,
        isComplete: true,
        credentialIssued: true,
        credentialId,
        nextLessonId
      })
    }
  }

  res.json({
    success: true,
    progress,
    isComplete: complete,
    credentialIssued: false,
    nextLessonId
  })
})