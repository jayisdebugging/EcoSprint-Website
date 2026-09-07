import { Router } from 'express'
import {
  getCompanyDashboard,
  getCompanyTalent,
  getCompanyEmployees
} from '../controllers/companyController.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = Router()

// Company-only routes
router.get('/dashboard', authenticate, authorize('COMPANY'), getCompanyDashboard)
router.get('/talent', authenticate, authorize('COMPANY'), getCompanyTalent)
router.get('/employees', authenticate, authorize('COMPANY'), getCompanyEmployees)

export default router