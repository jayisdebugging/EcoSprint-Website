import { z } from 'zod'

// Auth validations
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  role: z.enum(['LEARNER', 'MENTOR', 'COMPANY']).default('LEARNER'),
  interests: z.array(z.string()).optional().default([])
})

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1).optional()
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters').max(100)
})

// Profile validations
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  headline: z.string().max(200).optional(),
  bio: z.string().max(2000).optional(),
  location: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  preferences: z.record(z.any()).optional()
})

// Sprint validations
export const sprintFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  duration: z.string().optional(),
  sortBy: z.string().optional(),
  status: z.string().optional(),
  featured: z.string().optional()
})

// Project validations
export const submitProjectSchema = z.object({
  submissionText: z.string().max(5000).optional(),
  fileName: z.string().max(255).optional(),
  notes: z.string().max(2000).optional()
})

// Mentor validations
export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(100),
  strengths: z.string().max(2000).optional(),
  improvementAreas: z.string().max(2000).optional(),
  feedback: z.string().max(2000).optional()
})

export const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: result.error.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message
        }))
      })
    }
    req.body = result.data
    next()
  } catch (err) {
    next(err)
  }
}