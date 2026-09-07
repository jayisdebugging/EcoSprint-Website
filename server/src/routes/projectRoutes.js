import { Router } from 'express'
import { getProjects, getProjectById, submitProject, getMyProjects } from '../controllers/projectController.js'
import { authenticate } from '../middleware/auth.js'
import { submitProjectSchema, validate } from '../validations/index.js'

const router = Router()

router.get('/', getProjects)
router.get('/:id', getProjectById)
router.post('/:id/submit', authenticate, validate(submitProjectSchema), submitProject)

export default router