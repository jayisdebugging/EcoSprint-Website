import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

// GET /api/company/dashboard - Company dashboard (COMPANY only)
export const getCompanyDashboard = asyncHandler(async (req, res) => {
  const company = await prisma.company.findUnique({
    where: { userId: req.user.id }
  })
  if (!company) throw new ApiError(404, 'Company profile not found')

  // Employees enrolled in sprints
  const employees = await prisma.user.findMany({
    where: {
      role: 'LEARNER',
      company: company.name || undefined
    },
    include: {
      enrollments: { include: { sprint: true } }
    }
  })

  // All credentials issued to company employees
  const credentials = await prisma.credential.findMany({})

  // Completed enrollments
  const completedEnrollments = await prisma.enrollment.findMany({
    where: { status: 'COMPLETED' },
    include: { user: true, sprint: true }
  })

  const activeEnrollments = await prisma.enrollment.findMany({
    where: { status: 'ACTIVE' },
    include: { user: true, sprint: true }
  })

  const totalEnrollments = await prisma.enrollment.count()

  const completionRate = totalEnrollments > 0
    ? Math.round((completedEnrollments.length / totalEnrollments) * 100)
    : 0

  res.json({
    success: true,
    dashboard: {
      company,
      employeesEnrolled: employees.length,
      seatAllocation: company.seatAllocation,
      activeLearners: activeEnrollments.length,
      completionRate,
      skillsDeveloped: credentials.length,
      employees: employees.map((e) => ({
        name: e.name,
        role: e.profile?.headline || e.email,
        sprints: e.enrollments.map((en) => ({
          title: en.sprint.title,
          progress: en.progress,
          status: en.status
        }))
      })),
      upcomingCohorts: await prisma.sprint.findMany({
        where: { status: { in: ['ADMISSIONS_OPEN', 'UPCOMING'] } },
        select: { id: true, title: true, cohortStartDate: true, enrolledCount: true }
      })
    }
  })
})

// GET /api/company/talent - Talent discovery (COMPANY only)
export const getCompanyTalent = asyncHandler(async (req, res) => {
  const { search } = req.query

  const learners = await prisma.user.findMany({
    where: {
      role: 'LEARNER',
      profile: { is: {} }
    },
    include: {
      profile: true,
      credentials: true,
      projectSubmissions: { include: { project: true }, where: { status: 'APPROVED' } }
    },
    take: 50
  })

  let result = learners.map((learner) => {
    const skills = learner.profile?.skills || []
    const matchScore = Math.min(100, 60 + skills.length * 3 + learner.credentials.length * 8)
    return {
      id: learner.id,
      name: learner.name,
      role: learner.profile?.headline || 'Sustainability Professional',
      avatar: learner.avatar,
      matchScore,
      skills,
      sprintsCompleted: learner.credentials.map((c) => c.sprintTitle),
      credentials: learner.credentials.map((c) => c.credentialId),
      projectHighlight: learner.projectSubmissions[0]?.project.title
    }
  })

  if (search) {
    const q = search.toLowerCase()
    result = result.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      c.skills.some((s) => s.toLowerCase().includes(q))
    )
  }

  res.json({ success: true, talent: result })
})

// GET /api/company/employees - Employee progress (COMPANY only)
export const getCompanyEmployees = asyncHandler(async (req, res) => {
  const company = await prisma.company.findUnique({ where: { userId: req.user.id } })
  if (!company) throw new ApiError(404, 'Company profile not found')

  const employees = await prisma.user.findMany({
    where: { role: 'LEARNER' },
    include: {
      enrollments: {
        include: {
          sprint: { select: { id: true, title: true } }
        }
      },
      credentials: true
    }
  })

  res.json({
    success: true,
    employees: employees.map((e) => ({
      id: e.id,
      name: e.name,
      email: e.email,
      role: e.profile?.headline || 'Learner',
      tracks: e.enrollments.map((en) => ({
        title: en.sprint.title,
        progress: en.progress,
        status: en.status
      })),
      credentials: e.credentials.length,
      lastActive: e.lastLoginAt
    }))
  })
})