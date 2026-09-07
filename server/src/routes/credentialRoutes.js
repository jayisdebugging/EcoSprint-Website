import { Router } from 'express'
import { getMyCredentials, getCredentialById } from '../controllers/credentialController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.get('/me/credentials', authenticate, getMyCredentials)
router.get('/:id', getCredentialById)

export default router