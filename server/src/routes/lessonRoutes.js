import { Router } from 'express'
import { completeLesson } from '../controllers/lessonController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.post('/:id/complete', authenticate, completeLesson)

export default router