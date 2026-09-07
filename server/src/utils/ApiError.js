export class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export const notFound = (req, res, next) => {
  next(new ApiError(404, 'Route not found: ' + req.method + ' ' + req.originalUrl))
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  let details = err.details

  if (err.code === 'P2002') {
    statusCode = 409
    message = 'A record with this value already exists'
    details = err.meta && err.meta.target
  }
  if (err.code === 'P2025') {
    statusCode = 404
    message = 'Record not found'
  }

  if (statusCode >= 500) {
    console.error('Server Error:', err)
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    details,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}