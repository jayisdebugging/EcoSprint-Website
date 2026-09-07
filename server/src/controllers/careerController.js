import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

// GET /api/careers/jobs
export const getJobs = asyncHandler(async (req, res) => {
  const { search, type } = req.query
  const where = { isActive: true }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }
  if (type && type !== 'All' && type !== 'all') {
    where.type = type.toUpperCase()
  }

  const jobs = await prisma.job.findMany({ where, orderBy: [{ featured: 'desc' }, { postedDaysAgo: 'asc' }] })
  res.json({ success: true, jobs })
})

// GET /api/careers/jobs/:id
export const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const job = await prisma.job.findUnique({ where: { id } })
  if (!job) throw new ApiError(404, 'Job not found')
  res.json({ success: true, job })
})

// GET /api/careers/companies
export const getCompanies = asyncHandler(async (req, res) => {
  const companies = await prisma.company.findMany({
    include: { jobs: { where: { isActive: true }, select: { id: true, title: true } } }
  })
  res.json({ success: true, companies })
})

// GET /api/careers/dashboard
export const getCareerDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, credentials: true, projectSubmissions: true }
  })

  if (!user) throw new ApiError(404, 'User not found')

  const profile = user.profile
  const skills = profile?.skills || []
  const allJobs = await prisma.job.findMany({ where: { isActive: true } })

  // Compute match percentage based on skill overlap
  const jobs = allJobs.map((job) => {
    const matchedSkills = (job.requiredSkills || []).filter((s) =>
      skills.some((skill) => skill.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(skill.toLowerCase()))
    )
    const matchPercentage = job.requiredSkills && job.requiredSkills.length > 0
      ? Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
      : 0
    return { ...job, matchPercentage }
  })

  const completedSprints = await prisma.enrollment.count({ where: { userId, status: 'COMPLETED' } })
  const profileCompletion = Math.min(100, 50 + skills.length * 5 + user.credentials.length * 5)

  const savedJobs = await prisma.savedJob.findMany({
    where: { userId },
    include: { job: true }
  })

  const companies = await prisma.company.findMany({ include: { jobs: true } })

  res.json({
    success: true,
    dashboard: {
      profileCompletion,
      skillReadiness: Math.min(100, Math.round((skills.length / 12) * 100)),
      recommendedJobs: jobs.sort((a, b) => b.matchPercentage - a.matchPercentage),
      savedJobs: savedJobs.map((s) => s.job),
      companies,
      completedSprints,
      credentials: user.credentials,
      portfolioProjects: user.projectSubmissions.length
    }
  })
})

// GET /api/careers/me/saved-jobs
export const getSavedJobs = asyncHandler(async (req, res) => {
  const saved = await prisma.savedJob.findMany({
    where: { userId: req.user.id },
    include: { job: true }
  })
  res.json({ success: true, jobs: saved.map((s) => s.job) })
})

// POST /api/careers/jobs/:id/save
export const saveJob = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const job = await prisma.job.findUnique({ where: { id } })
  if (!job) throw new ApiError(404, 'Job not found')

  const existing = await prisma.savedJob.findUnique({
    where: { userId_jobId: { userId, jobId: id } }
  })

  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } })
    return res.json({ success: true, saved: false })
  }

  await prisma.savedJob.create({ data: { userId, jobId: id } })
  res.status(201).json({ success: true, saved: true })
})

// POST /api/careers/jobs/:id/unsave
export const unsaveJob = asyncHandler(async (req, res) => {
  const { id } = req.params
  const existing = await prisma.savedJob.findUnique({
    where: { userId_jobId: { userId: req.user.id, jobId: id } }
  })
  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } })
  }
  res.json({ success: true, saved: false })
})