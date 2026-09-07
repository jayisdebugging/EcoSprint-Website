import { Router } from 'express'
import { getMentors, getMentorById } from '../controllers/mentorController.js'

const router = Router()

// Public mentor directory
router.get('/', getMentors)
router.get('/:id', getMentorById)

export default router