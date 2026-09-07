import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

// GET /api/mentors - Public mentor directory
export const getMentors = asyncHandler(async (req, res) => {
  const mentors = await prisma.mentorProfile.findMany({
    orderBy: { rating: 'desc' }
  })
  res.json({ success: true, mentors })
})

// GET /api/mentors/:id
export const getMentorById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const mentor = await prisma.mentorProfile.findFirst({
    where: { OR: [{ id }, { name: { contains: id, mode: 'insensitive' } }] }
  })
  if (!mentor) throw new ApiError(404, 'Mentor not found')
  res.json({ success: true, mentor })
})

// GET /api/mentor/sessions - Mentor's scheduled sessions (MENTOR only)
export const getMentorSessions = asyncHandler(async (req, res) => {
  const mentorProfile = await prisma.mentorProfile.findFirst({
    where: { userId: req.user.id }
  })
  if (!mentorProfile) throw new ApiError(404, 'Mentor profile not found')

  const sessions = await prisma.mentorSession.findMany({
    where: { mentorUserId: req.user.id },
    orderBy: { date: 'asc' }
  })
  res.json({ success: true, sessions, mentorProfile })
})

// GET /api/mentor/dashboard - Mentor dashboard overview (MENTOR only)
export const getMentorDashboard = asyncHandler(async (req, res) => {
  const mentorProfile = await prisma.mentorProfile.findFirst({
    where: { userId: req.user.id }
  })
  if (!mentorProfile) throw new ApiError(404, 'Mentor profile not found')

  // Learners in sprints this mentor teaches
  const sprintIds = mentorProfile.sprintIds
  const enrollments = await prisma.enrollment.findMany({
    where: { sprintId: { in: sprintIds } },
    include: { user: { select: { id: true, name: true, avatar: true } }, sprint: { select: { id: true, title: true } } }
  })

  // Submissions awaiting review for this mentor's sprints
  const submissions = await prisma.projectSubmission.findMany({
    where: {
      status: 'PENDING',
      project: { sprintId: { in: sprintIds } }
    },
    include: {
      project: true,
      user: { select: { id: true, name: true } }
    }
  })

  const sessions = await prisma.mentorSession.findMany({
    where: { mentorUserId: req.user.id },
    orderBy: { date: 'asc' },
    take: 5
  })

  res.json({
    success: true,
    dashboard: {
      mentorProfile,
      learners: enrollments.map((e) => ({
        name: e.user.name,
        avatar: e.user.avatar,
        sprint: e.sprint.title,
        progress: e.progress,
        status: e.status
      })),
      reviewQueue: submissions,
      upcomingSessions: sessions
    }
  })
})

// POST /api/mentor/submissions/:id/review - Review project submission (MENTOR only)
export const reviewSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { rating, strengths, improvementAreas, feedback } = req.body

  const submission = await prisma.projectSubmission.findUnique({
    where: { id },
    include: { project: true, user: true }
  })
  if (!submission) throw new ApiError(404, 'Submission not found')

  const mentorProfile = await prisma.mentorProfile.findFirst({
    where: { userId: req.user.id }
  })
  if (!mentorProfile) throw new ApiError(403, 'Only mentors can review submissions')

  // Create review
  await prisma.projectReview.create({
    data: {
      projectId: submission.projectId,
      submissionId: submission.id,
      reviewerId: req.user.id,
      rating: rating || 90,
      strengths: strengths || null,
      improvementAreas: improvementAreas || null,
      feedback: feedback || null
    }
  })

  await prisma.$transaction([
    prisma.projectSubmission.update({
      where: { id: submission.id },
      data: { status: 'APPROVED', reviewedAt: new Date() }
    }),
    prisma.project.update({
      where: { id: submission.projectId },
      data: { status: 'COMPLETED', progress: 100, rubricScore: rating || 90 }
    }),
    prisma.notification.create({
      data: {
        userId: submission.userId,
        type: 'PROJECT',
        title: 'Project reviewed',
        message: 'Your project "' + submission.project.title + '" was reviewed with a score of ' + (rating || 90) + '%'
      }
    })
  ])

  res.json({ success: true, reviewed: true })
})