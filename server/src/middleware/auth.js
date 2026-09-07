import { verifyAccessToken } from '../utils/tokens.js'
import { ApiError } from '../utils/ApiError.js'
import prisma from '../config/database.js'

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ApiError(401, 'Authentication required'))
    }

    const token = authHeader.split(' ')[1]
    let decoded
    try {
      decoded = verifyAccessToken(token)
    } catch (err) {
      return next(new ApiError(401, 'Invalid or expired token'))
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      include: { profile: true }
    })

    if (!user) {
      return next(new ApiError(401, 'User no longer exists'))
    }

    if (!user.isActive) {
      return next(new ApiError(403, 'Account has been deactivated'))
    }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export const optionalAuthenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next()
  }
  return authenticate(req, res, next)
}

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'))
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission to perform this action'))
    }
    next()
  }
}