import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'
import { buildAuthUrl, exchangeCodeForToken, linkedinConfigured } from '../services/linkedinService.js'

// GET /api/linkedin/status - Current connection status
export const getLinkedinStatus = asyncHandler(async (req, res) => {
  const connection = await prisma.linkedinConnection.findUnique({
    where: { userId: req.user.id }
  })

  if (!connection) {
    return res.json({
      success: true,
      status: 'NOT_CONNECTED',
      connected: false,
      configured: linkedinConfigured(),
      profileUrl: null
    })
  }

  res.json({
    success: true,
    status: connection.syncStatus,
    connected: Boolean(connection.accessToken),
    configured: linkedinConfigured(),
    profileUrl: connection.profileUrl,
    connectedAt: connection.connectedAt,
    syncStatus: connection.syncStatus
  })
})

// GET /api/linkedin/auth-url - Build OAuth URL
export const getLinkedinAuthUrl = asyncHandler(async (req, res) => {
  if (!linkedinConfigured()) {
    throw new ApiError(400, 'LinkedIn API is not configured. Add LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET to .env to enable OAuth connection.')
  }

  const url = buildAuthUrl(req.user.id)
  res.json({ success: true, url })
})

// GET /api/linkedin/callback - OAuth callback
export const linkedinCallback = asyncHandler(async (req, res) => {
  const { code, state, error } = req.query

  if (error) {
    return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/settings?linkedin=error`)
  }

  if (!code || !state) {
    return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/settings?linkedin=error`)
  }

  try {
    const decoded = JSON.parse(Buffer.from(state, 'base64url').toString())
    const userId = decoded.userId

    const tokenData = await exchangeCodeForToken(code, state)

    // Upsert the LinkedIn connection
    await prisma.linkedinConnection.upsert({
      where: { userId },
      update: {
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
        tokenExpiresAt: tokenData.expiresAt,
        linkedinUserId: tokenData.linkedinUserId,
        profileUrl: tokenData.profileUrl,
        connectedAt: new Date(),
        syncStatus: 'NOT_CONNECTED'
      },
      create: {
        userId,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
        tokenExpiresAt: tokenData.expiresAt,
        linkedinUserId: tokenData.linkedinUserId,
        profileUrl: tokenData.profileUrl,
        connectedAt: new Date(),
        syncStatus: 'NOT_CONNECTED'
      }
    })

    // Activity
    await prisma.activity.create({
      data: {
        userId,
        type: 'LINKEDIN_CONNECTED',
        title: 'LinkedIn connected',
        description: 'Your LinkedIn profile is now connected to your EcoSprint account'
      }
    })

    await prisma.notification.create({
      data: {
        userId,
        type: 'LINKEDIN',
        title: 'LinkedIn connected',
        message: 'Your LinkedIn account has been successfully connected to EcoSprint'
      }
    })

    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/settings?linkedin=success`)
  } catch (err) {
    console.error('LinkedIn callback error:', err)
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/settings?linkedin=error`)
  }
})

// POST /api/linkedin/disconnect
export const disconnectLinkedin = asyncHandler(async (req, res) => {
  const connection = await prisma.linkedinConnection.findUnique({
    where: { userId: req.user.id }
  })

  if (connection) {
    await prisma.linkedinConnection.delete({ where: { id: connection.id } })
  }

  res.json({ success: true, connected: false })
})

// POST /api/linkedin/sync-credential/:credentialId
export const syncCredential = asyncHandler(async (req, res) => {
  const { credentialId } = req.params
  const userId = req.user.id

  const credential = await prisma.credential.findFirst({
    where: { id: credentialId, userId }
  })

  if (!credential) {
    throw new ApiError(404, 'Credential not found')
  }

  const connection = await prisma.linkedinConnection.findUnique({ where: { userId } })
  if (!connection || !connection.accessToken) {
    return res.json({
      success: true,
      status: 'NOT_CONNECTED',
      message: 'Connect LinkedIn first to enable synchronization'
    })
  }

  // Since real sync requires LinkedIn's approved w_member_social scope,
  // we check if we can genuinely perform the operation.
  const { syncCredentialToLinkedin } = await import('../services/linkedinService.js')
  const result = await syncCredentialToLinkedin(userId, credential)

  await prisma.credential.update({
    where: { id: credential.id },
    data: { linkedinSyncStatus: result.status }
  })

  res.json({ success: true, ...result })
})