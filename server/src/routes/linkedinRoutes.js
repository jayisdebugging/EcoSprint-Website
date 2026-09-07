import { Router } from 'express'
import {
  getLinkedinStatus,
  getLinkedinAuthUrl,
  linkedinCallback,
  disconnectLinkedin,
  syncCredential
} from '../controllers/linkedinController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Public OAuth callback
router.get('/callback', linkedinCallback)

// Authenticated routes
router.get('/status', authenticate, getLinkedinStatus)
router.get('/auth-url', authenticate, getLinkedinAuthUrl)
router.post('/disconnect', authenticate, disconnectLinkedin)
router.post('/sync-credential/:credentialId', authenticate, syncCredential)

export default router