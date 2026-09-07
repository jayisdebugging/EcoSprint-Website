import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

// GET /api/projects
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      submissions: {
        where: { userId: req.user ? req.user.id : undefined },
        select: { id: true, status: true, submittedAt: true, reviewedAt: true }
      }
    }
  })
  res.json({ success: true, projects })
})

// GET /api/me/projects
export const getMyProjects = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      submissions: {
        where: { userId },
        select: { id: true, status: true, submittedAt: true, reviewedAt: true, notes: true, fileName: true }
      },
      reviews: true
    }
  })
  res.json({ success: true, projects })
})

// GET /api/projects/:id
export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      submissions: true,
      reviews: true
    }
  })
  if (!project) throw new ApiError(404, 'Project not found')
  res.json({ success: true, project })
})

// POST /api/projects/:id/submit
export const submitProject = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  const { submissionText, fileName, notes } = req.body

  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) throw new ApiError(404, 'Project not found')

  const existing = await prisma.projectSubmission.findUnique({
    where: { projectId_userId: { projectId: id, userId } }
  })

  const submissionData = {
    submissionText: submissionText || '',
    fileName: fileName || null,
    notes: notes || '',
    status: 'PENDING',
    submittedAt: new Date()
  }

  if (existing) {
    await prisma.projectSubmission.update({
      where: { id: existing.id },
      data: submissionData
    })
  } else {
    await prisma.projectSubmission.create({
      data: { projectId: id, userId, ...submissionData }
    })
  }

  await prisma.project.update({
    where: { id },
    data: { status: 'SUBMITTED', progress: 100 }
  })

  // Activity + notification
  await prisma.$transaction([
    prisma.activity.create({
      data: {
        userId,
        type: 'PROJECT_SUBMITTED',
        title: 'Project submitted',
        description: 'Submitted ' + project.title
      }
    }),
    prisma.notification.create({
      data: {
        userId,
        type: 'PROJECT',
        title: 'Project submitted',
        message: 'Your project "' + project.title + '" has been submitted for review'
      }
    })
  ])

  res.status(201).json({
    success: true,
    projectId: id,
    status: 'submitted',
    submittedAt: new Date().toISOString()
  })
})