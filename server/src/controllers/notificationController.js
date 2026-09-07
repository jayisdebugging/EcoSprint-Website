import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

// GET /api/notifications
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50
  })
  const unreadCount = await prisma.notification.count({
    where: { userId: req.user.id, read: false }
  })
  res.json({ success: true, notifications, unreadCount })
})

// POST /api/notifications/:id/read
export const markNotificationRead = asyncHandler(async (req, res) => {
  const { id } = req.params
  const notification = await prisma.notification.findUnique({ where: { id } })
  if (!notification) throw new ApiError(404, 'Notification not found')
  if (notification.userId !== req.user.id) throw new ApiError(403, 'Not authorized')

  await prisma.notification.update({
    where: { id },
    data: { read: true }
  })

  res.json({ success: true, read: true })
})

// POST /api/notifications/read-all
export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, read: false },
    data: { read: true }
  })
  res.json({ success: true })
})