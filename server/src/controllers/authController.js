import prisma from '../config/database.js'
import bcrypt from 'bcryptjs'
import { ApiError } from '../utils/ApiError.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/tokens.js'
import { env } from '../config/env.js'
import { asyncHandler } from '../utils/ApiError.js'

const publicUser = (user) => {
  const { passwordHash, refreshToken, refreshTokenExpiresAt, ...safe } = user
  return safe
}

const setRefreshCookie = (res, token) => {
  res.cookie('ecosprint_refresh', token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth'
  })
}

const issueSession = async (res, user) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken,
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  })

  setRefreshCookie(res, refreshToken)
  return accessToken
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, interests } = req.body
  const normalizedEmail = String(email).trim().toLowerCase()

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } })
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash,
      role: role || 'LEARNER',
      profile: {
        create: {
          interests: interests || []
        }
      }
    },
    include: { profile: true }
  })

  const accessToken = await issueSession(res, user)

  res.status(201).json({
    success: true,
    user: publicUser(user),
    accessToken
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const normalizedEmail = String(email).trim().toLowerCase()

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    include: { profile: true }
  })

  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    throw new ApiError(401, 'Invalid email or password')
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() }
  })

  const accessToken = await issueSession(res, user)

  res.json({
    success: true,
    user: publicUser(user),
    accessToken
  })
})

export const logout = asyncHandler(async (req, res) => {
  const cookieToken = req.cookies?.ecosprint_refresh
  if (req.user) {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { refreshToken: null, refreshTokenExpiresAt: null }
    })
  } else if (cookieToken) {
    try {
      const decoded = verifyRefreshToken(cookieToken)
      await prisma.user.update({
        where: { id: decoded.sub },
        data: { refreshToken: null, refreshTokenExpiresAt: null }
      })
    } catch {
      // Cookie already invalid — still clear it
    }
  }
  res.clearCookie('ecosprint_refresh', { path: '/api/auth' })
  res.json({ success: true })
})

export const getMe = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { profile: true }
  })
  res.json({ success: true, user: publicUser(user) })
})

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const user = await prisma.user.findUnique({ where: { id: req.user.id } })
  if (!user) throw new ApiError(404, 'User not found')

  const valid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!valid) {
    throw new ApiError(400, 'Current password is incorrect')
  }

  const passwordHash = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash }
  })

  res.json({ success: true })
})

export const refresh = asyncHandler(async (req, res) => {
  const token = req.body?.refreshToken || req.cookies?.ecosprint_refresh

  if (!token) {
    throw new ApiError(401, 'Refresh token is required')
  }

  let decoded
  try {
    decoded = verifyRefreshToken(token)
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired refresh token')
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.sub },
    include: { profile: true }
  })
  if (!user || !user.refreshToken || user.refreshToken !== token) {
    throw new ApiError(401, 'Invalid refresh token')
  }

  if (user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date()) {
    throw new ApiError(401, 'Refresh token has expired')
  }

  const accessToken = await issueSession(res, user)

  res.json({
    success: true,
    user: publicUser(user),
    accessToken
  })
})