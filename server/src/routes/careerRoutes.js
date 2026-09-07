import { Router } from 'express'
import {
  getJobs,
  getJobById,
  getCompanies,
  getCareerDashboard,
  getSavedJobs,
  saveJob,
  unsaveJob
} from '../controllers/careerController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Public routes
router.get('/jobs', getJobs)
router.get('/jobs/:id', getJobById)
router.get('/companies', getCompanies)

// Authenticated routes
router.get('/dashboard', authenticate, getCareerDashboard)
router.get('/me/saved-jobs', authenticate, getSavedJobs)
router.post('/jobs/:id/save', authenticate, saveJob)
router.post('/jobs/:id/unsave', authenticate, unsaveJob)

export default router