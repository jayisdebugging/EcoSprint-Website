import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: env.accessTokenTtl }
  )
}

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { sub: user.id },
    env.jwtRefreshSecret,
    { expiresIn: env.refreshTokenTtl }
  )
}

export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtSecret)
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret)
}