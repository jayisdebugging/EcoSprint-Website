import { Router } from 'express'
import { register, login, logout, getMe, refresh, changePassword } from '../controllers/authController.js'
import { authenticate, optionalAuthenticate } from '../middleware/auth.js'
import { registerSchema, loginSchema, changePasswordSchema, validate } from '../validations/index.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', optionalAuthenticate, logout)
router.get('/me', authenticate, getMe)
router.post('/refresh', refresh)
router.post('/change-password', authenticate, validate(changePasswordSchema), changePassword)

export default router