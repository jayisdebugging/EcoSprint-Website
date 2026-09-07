import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

// GET /api/me/profile - User profile with achievements
export const getMyProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      credentials: { orderBy: { issuedDate: 'desc' } },
      enrollments: { include: { sprint: true } },
      projectSubmissions: { include: { project: true } },
      activity: { orderBy: { createdAt: 'desc' }, take: 20 }
    }
  })

  if (!user) throw new ApiError(404, 'User not found')

  const completedSprints = user.enrollments.filter((e) => e.status === 'COMPLETED')
  const completedProjects = user.projectSubmissions.filter((s) => s.status === 'APPROVED')

  res.json({
    success: true,
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profile: user.profile,
      credentials: user.credentials,
      completedSprints: completedSprints.map((e) => ({
        ...e.sprint,
        completedAt: e.completedAt,
        grade: e.progress >= 100 ? 'Passed' : 'In Progress'
      })),
      activeSprint: user.enrollments.find((e) => e.status === 'ACTIVE'),
      projects: user.projectSubmissions,
      completedProjects,
      activity: user.activity
    }
  })
})

// PATCH /api/me/profile - Update profile
export const updateMyProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { name, headline, bio, location, company, skills, interests, preferences } = req.body

  const updateData = {}
  if (name) updateData.name = name

  const profileData = {}
  if (headline !== undefined) profileData.headline = headline
  if (bio !== undefined) profileData.bio = bio
  if (location !== undefined) profileData.location = location
  if (company !== undefined) profileData.company = company
  if (skills !== undefined) profileData.skills = skills
  if (interests !== undefined) profileData.interests = interests
  if (preferences !== undefined) profileData.preferences = preferences

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(Object.keys(updateData).length > 0 ? updateData : {}),
      profile: {
        upsert: {
          create: { ...profileData },
          update: { ...profileData }
        }
      }
    },
    include: { profile: true }
  })

  const { passwordHash, refreshToken, refreshTokenExpiresAt, ...safe } = user
  res.json({ success: true, user: safe })
})

// GET /api/me/achievements - Achievements
export const getMyAchievements = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const [credentials, completedEnrollments, projects, activity] = await Promise.all([
    prisma.credential.findMany({ where: { userId } }),
    prisma.enrollment.findMany({ where: { userId, status: 'COMPLETED' }, include: { sprint: true } }),
    prisma.projectSubmission.findMany({ where: { userId, status: 'APPROVED' }, include: { project: true } }),
    prisma.activity.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 10 })
  ])

  res.json({
    success: true,
    achievements: {
      completedSprints: completedEnrollments,
      credentials,
      projects,
      activity
    }
  })
})

// GET /api/me/dashboard - Learner dashboard summary
export const getMyDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const [enrollments, credentials, projects, activity] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId },
      include: { sprint: true },
      orderBy: { enrolledAt: 'desc' }
    }),
    prisma.credential.findMany({ where: { userId } }),
    prisma.projectSubmission.findMany({ where: { userId }, include: { project: true } }),
    prisma.activity.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 10 })
  ])

  const activeSprint = enrollments.find((e) => e.status === 'ACTIVE')
  const completedSprints = enrollments.filter((e) => e.status === 'COMPLETED')

  res.json({
    success: true,
    dashboard: {
      activeSprint: activeSprint ? { ...activeSprint.sprint, progress: activeSprint.progress } : null,
      activeSprintsCount: enrollments.filter((e) => e.status === 'ACTIVE').length,
      completedSprintsCount: completedSprints.length,
      credentialsCount: credentials.length,
      projectsCount: projects.length,
      totalProgress: activeSprint ? activeSprint.progress : 0,
      recentActivity: activity,
      completedSprints: completedSprints.map((e) => ({
        id: e.sprint.id,
        title: e.sprint.title,
        completedAt: e.completedAt
      }))
    }
  })
})

// GET /api/me/saved-sprints
export const getSavedSprints = asyncHandler(async (req, res) => {
  const saved = await prisma.savedSprint.findMany({
    where: { userId: req.user.id },
    include: { sprint: true }
  })
  const sprints = saved.map((s) => s.sprint)
  res.json({ success: true, sprintIds: saved.map((s) => s.sprintId), sprints })
})

// POST /api/me/saved-sprints/:id
export const toggleSavedSprint = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const sprint = await prisma.sprint.findFirst({ where: { OR: [{ id }, { slug: id }] } })
  if (!sprint) throw new ApiError(404, 'Sprint not found')

  const existing = await prisma.savedSprint.findUnique({
    where: { userId_sprintId: { userId, sprintId: sprint.id } }
  })

  if (existing) {
    await prisma.savedSprint.delete({ where: { id: existing.id } })
    return res.json({ success: true, saved: false })
  }

  await prisma.savedSprint.create({ data: { userId, sprintId: sprint.id } })
  res.json({ success: true, saved: true })
})