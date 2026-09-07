import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

const sprintSelect = {
  id: true, slug: true, title: true, tagline: true, track: true, category: true,
  level: true, durationWeeks: true, hoursPerWeek: true, cohortStartDate: true,
  cohortSize: true, enrolledCount: true, price: true, mentorId: true,
  mentorName: true, mentorRole: true, rating: true, reviewCount: true,
  featured: true, popular: true, status: true, statusLabel: true, skills: true,
  labsCount: true, description: true, learningOutcomes: true, coverImage: true
}

// GET /api/sprints
export const getSprints = asyncHandler(async (req, res) => {
  const { search, category, level, duration, sortBy, status } = req.query
  const where = {}

  if (category && category !== 'All' && category !== 'all') where.category = category
  if (level && level !== 'All' && level !== 'all') where.level = level
  if (status && status !== 'All' && status !== 'all') {
    if (status === 'Featured') where.featured = true
    else if (status === 'Popular') where.popular = true
    else if (status === 'Upcoming') where.statusLabel = 'Upcoming'
  }
  if (duration && duration !== 'All' && duration !== 'all') where.durationWeeks = parseInt(duration, 10)
  if (search) {
    const q = search.toLowerCase()
    where.OR = [
      { title: { contains: search } },
      { tagline: { contains: search } },
      { description: { contains: search } },
      { mentorName: { contains: search } }
    ]
  }

  let orderBy = {}
  if (sortBy === 'rating') orderBy = { rating: 'desc' }
  else if (sortBy === 'duration-asc') orderBy = { durationWeeks: 'asc' }
  else if (sortBy === 'duration-desc') orderBy = { durationWeeks: 'desc' }
  else orderBy = { reviewCount: 'desc' }

  const sprints = await prisma.sprint.findMany({ where, orderBy, select: sprintSelect })
  res.json({ success: true, sprints })
})

// GET /api/sprints/featured
export const getFeaturedSprints = asyncHandler(async (req, res) => {
  const sprints = await prisma.sprint.findMany({
    where: { featured: true },
    select: sprintSelect
  })
  res.json({ success: true, sprints })
})

// GET /api/sprints/:id
export const getSprintById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const sprint = await prisma.sprint.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { modules: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } } }
  })
  if (!sprint) throw new ApiError(404, 'Sprint not found')
  res.json({ success: true, sprint })
})

// GET /api/sprints/:id/curriculum
export const getSprintCurriculum = asyncHandler(async (req, res) => {
  const { id } = req.params
  const sprint = await prisma.sprint.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { modules: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } } }
  })
  if (!sprint) throw new ApiError(404, 'Sprint not found')

  const curriculum = sprint.modules.map((m) => ({
    week: m.week,
    title: m.title,
    description: m.description,
    lessons: m.lessons
  }))

  const allLessons = sprint.modules.flatMap((m) => m.lessons)

  res.json({ success: true, curriculum, totalLessons: allLessons.length })
})

// POST /api/sprints/:id/enroll
export const enrollInSprint = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const sprint = await prisma.sprint.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { modules: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } } }
  })

  if (!sprint) throw new ApiError(404, 'Sprint not found')

  const existing = await prisma.enrollment.findUnique({
    where: { userId_sprintId: { userId, sprintId: sprint.id } }
  })

  if (existing) {
    return res.json({ success: true, enrolled: true, alreadyEnrolled: true })
  }

  const firstModule = sprint.modules[0]
  const firstLesson = firstModule && firstModule.lessons[0] ? firstModule.lessons[0].id : null

  await prisma.$transaction([
    prisma.enrollment.create({
      data: { userId, sprintId: sprint.id, currentLessonId: firstLesson }
    }),
    prisma.sprint.update({
      where: { id: sprint.id },
      data: { enrolledCount: { increment: 1 } }
    }),
    prisma.notification.create({
      data: {
        userId,
        type: 'ENROLLMENT',
        title: 'Sprint enrollment confirmed',
        message: 'You have been enrolled in ' + sprint.title
      }
    }),
    prisma.activity.create({
      data: {
        userId,
        type: 'ENROLLED',
        title: 'Enrolled in Sprint',
        description: 'Enrolled in ' + sprint.title
      }
    })
  ])

  res.status(201).json({ success: true, enrolled: true })
})

// GET /api/me/sprints
export const getMySprints = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: { sprint: { select: sprintSelect } },
    orderBy: { enrolledAt: 'desc' }
  })

  const sprints = enrollments.map((e) => ({
    ...e.sprint,
    enrollment: {
      id: e.id,
      status: e.status,
      progress: e.progress,
      currentLessonId: e.currentLessonId,
      enrolledAt: e.enrolledAt,
      completedAt: e.completedAt
    }
  }))

  res.json({ success: true, sprints })
})

// GET /api/me/sprints/:id
export const getMySprintById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const sprint = await prisma.sprint.findFirst({
    where: { OR: [{ id }, { slug: id }] }
  })
  if (!sprint) throw new ApiError(404, 'Sprint not found')

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_sprintId: { userId, sprintId: sprint.id } }
  })
  if (!enrollment) throw new ApiError(404, 'You are not enrolled in this sprint')

  const completedLessons = await prisma.lessonProgress.findMany({
    where: { userId, sprintId: sprint.id, completed: true },
    select: { lessonId: true, completedAt: true }
  })

  const modules = await prisma.sprintModule.findMany({
    where: { sprintId: sprint.id },
    orderBy: { order: 'asc' },
    include: { lessons: { orderBy: { order: 'asc' } } }
  })

  res.json({ success: true, sprint, enrollment, completedLessons, modules })
})

// GET /api/me/sprints/:id/progress
export const getSprintProgress = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const sprint = await prisma.sprint.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: { modules: { include: { lessons: true } } }
  })
  if (!sprint) throw new ApiError(404, 'Sprint not found')

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_sprintId: { userId, sprintId: sprint.id } }
  })
  if (!enrollment) throw new ApiError(404, 'You are not enrolled in this sprint')

  const allLessons = sprint.modules.flatMap((m) => m.lessons)
  const completedLessons = await prisma.lessonProgress.findMany({
    where: { userId, sprintId: sprint.id, completed: true }
  })

  const total = allLessons.length
  const completed = completedLessons.length
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  if (progress !== enrollment.progress) {
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { progress }
    })
  }

  res.json({
    success: true,
    progress,
    completedCount: completed,
    totalCount: total,
    isComplete: progress >= 100,
    completedLessonIds: completedLessons.map((l) => l.lessonId)
  })
})
