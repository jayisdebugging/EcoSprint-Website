import { Router } from 'express'
import {
  getMySprints,
  getMySprintById,
  getSprintProgress
} from '../controllers/sprintController.js'
import {
  getMyProfile,
  updateMyProfile,
  getMyAchievements,
  getMyDashboard,
  getSavedSprints,
  toggleSavedSprint
} from '../controllers/userController.js'
import { getMyCredentials } from '../controllers/credentialController.js'
import { getMyProjects } from '../controllers/projectController.js'
import { authenticate } from '../middleware/auth.js'
import { updateProfileSchema, validate } from '../validations/index.js'

const router = Router()

router.use(authenticate)

// Sprints
router.get('/sprints', getMySprints)
router.get('/sprints/:id', getMySprintById)
router.get('/sprints/:id/progress', getSprintProgress)

// Profile
router.get('/profile', getMyProfile)
router.patch('/profile', validate(updateProfileSchema), updateMyProfile)

// Achievements & dashboard
router.get('/achievements', getMyAchievements)
router.get('/dashboard', getMyDashboard)

// Credentials
router.get('/credentials', getMyCredentials)

// Projects
router.get('/projects', getMyProjects)

// Saved sprints
router.get('/saved-sprints', getSavedSprints)
router.post('/saved-sprints/:id', toggleSavedSprint)

export default router