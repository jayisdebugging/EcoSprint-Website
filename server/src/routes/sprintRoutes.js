import { Router } from 'express'
import {
  getSprints,
  getFeaturedSprints,
  getSprintById,
  enrollInSprint,
  getMySprints,
  getMySprintById,
  getSprintProgress,
  getSprintCurriculum
} from '../controllers/sprintController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Public routes
router.get('/', getSprints)
router.get('/featured', getFeaturedSprints)
router.get('/:id/curriculum', getSprintCurriculum)
router.get('/:id', getSprintById)

// Authenticated routes
router.post('/:id/enroll', authenticate, enrollInSprint)

export default router