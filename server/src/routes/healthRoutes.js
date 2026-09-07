import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'EcoSprint API',
    timestamp: new Date().toISOString()
  })
})

export default router