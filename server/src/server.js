import app from './app.js'
import { env } from './config/env.js'
import prisma from './config/database.js'

const start = async () => {
  try {
    await prisma.$connect()
  } catch (err) {
    console.error('EcoSprint database is not configured or cannot be reached.')
    console.error('From /server run: npx prisma db push && npm run prisma:seed')
    console.error(err.message)
    process.exit(1)
  }

  app.listen(env.port, () => {
    console.log(`EcoSprint API listening on http://localhost:${env.port}`)
  })
}

start()
