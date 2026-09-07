import { Router } from 'express'
import {
  getMentorSessions,
  getMentorDashboard,
  reviewSubmission
} from '../controllers/mentorController.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { reviewSchema, validate } from '../validations/index.js'

const router = Router()

// All routes here require MENTOR role
router.use(authenticate, authorize('MENTOR'))

router.get('/sessions', getMentorSessions)
router.get('/dashboard', getMentorDashboard)
router.post('/submissions/:id/review', validate(reviewSchema), reviewSubmission)

export default router