import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import { notFound, errorHandler } from './utils/ApiError.js'

// Routes
import healthRoutes from './routes/healthRoutes.js'
import authRoutes from './routes/authRoutes.js'
import sprintRoutes from './routes/sprintRoutes.js'
import meRoutes from './routes/meRoutes.js'
import lessonRoutes from './routes/lessonRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import credentialRoutes from './routes/credentialRoutes.js'
import careerRoutes from './routes/careerRoutes.js'
import mentorRoutes from './routes/mentorRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import linkedinRoutes from './routes/linkedinRoutes.js'
import { verifyCredential } from './controllers/credentialController.js'
import { Router } from 'express'

const app = express()

// Security headers
app.use(helmet())

// CORS
app.use(cors({
  origin: env.clientUrl,
  credentials: true
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Rate limiting on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' }
})

// API Routes
app.use('/api/health', healthRoutes)
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/sprints', sprintRoutes)
app.use('/api/me', meRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/credentials', credentialRoutes)
app.use('/api/careers', careerRoutes)
app.use('/api/mentors', mentorRoutes)
app.use('/api/mentor', mentorRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/linkedin', linkedinRoutes)

// Public verify route
const verifyRouter = Router()
verifyRouter.get('/:id', verifyCredential)
app.use('/api/verify', verifyRouter)

// 404 handler
app.use(notFound)

// Central error handler
app.use(errorHandler)

export default app