import { env } from '../config/env.js'
import prisma from '../config/database.js'
import { ApiError } from '../utils/ApiError.js'

/**
 * LinkedIn Integration Service
 *
 * IMPORTANT HONESTY POLICY:
 * - When LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET are configured,
 *   this service performs genuine OAuth 2.0 authorization code flow with LinkedIn.
 * - When they are NOT configured, the service explicitly reports
 *   NOT_CONNECTED / NOT_SUPPORTED status and NEVER fabricates a real sync.
 * - We never ask for a LinkedIn password. We only use OAuth.
 */

export const linkedinConfigured = () => {
  return Boolean(env.linkedinClientId && env.linkedinClientSecret)
}

// Build the OAuth authorization URL
export const buildAuthUrl = (userId) => {
  if (!linkedinConfigured()) {
    throw new ApiError(400, 'LinkedIn API is not configured. Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET to enable OAuth.')
  }

  const state = Buffer.from(JSON.stringify({ userId })).toString('base64url')
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.linkedinClientId,
    redirect_uri: env.linkedinRedirectUri,
    state,
    scope: 'openid profile email r_liteprofile r_emailaddress'
  })

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
}

// Exchange OAuth authorization code for access token
export const exchangeCodeForToken = async (code, state) => {
  if (!linkedinConfigured()) {
    throw new ApiError(400, 'LinkedIn API is not configured. Cannot exchange OAuth code.')
  }

  const decoded = JSON.parse(Buffer.from(state, 'base64url').toString())

  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: env.linkedinRedirectUri,
      client_id: env.linkedinClientId,
      client_secret: env.linkedinClientSecret
    })
  })

  if (!tokenRes.ok) {
    const body = await tokenRes.text()
    throw new ApiError(401, 'LinkedIn token exchange failed: ' + body)
  }

  const tokenData = await tokenRes.json()

  // Fetch basic profile information
  const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'X-Restli-Protocol-Version': '2.0.0'
    }
  })

  let profileUrl = null
  let linkedinUserId = null
  if (profileRes.ok) {
    const profileData = await profileRes.json()
    linkedinUserId = profileData.sub || null
    profileUrl = profileData.picture
      ? `https://www.linkedin.com/in/${profileData.preferred_username || profileData.sub || ''}`
      : null
  }

  return {
    accessToken: tokenData.access_token,
    refreshToken: tokenData.refresh_token || null,
    expiresAt: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
    linkedinUserId,
    profileUrl
  }
}

// Attempt to sync credential to LinkedIn (only when real OAuth works)
export const syncCredentialToLinkedin = async (userId, credential) => {
  const connection = await prisma.linkedinConnection.findUnique({ where: { userId } })

  if (!connection || !connection.accessToken) {
    return {
      status: 'NOT_CONNECTED',
      message: 'LinkedIn is not connected for this user'
    }
  }

  if (connection.syncStatus === 'PENDING') {
    return { status: 'PENDING', message: 'Synchronization already in progress' }
  }

  // Mark as pending while we attempt
  await prisma.linkedinConnection.update({
    where: { id: connection.id },
    data: { syncStatus: 'PENDING' }
  })

  try {
    // Only attempt real sync if we have a valid access token
    if (!connection.accessToken) {
      throw new Error('No LinkedIn access token available')
    }

    // LinkedIn's current API limitations: posting to a member's profile feed
    // requires the w_member_social scope which requires special approval.
    // If the token does not include that scope, publishing will fail.
    const postRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${connection.accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: `urn:li:person:${connection.linkedinUserId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: `I earned the ${credential.title} on EcoSprint! Credential: ${credential.credentialId}`
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
      })
    })

    if (!postRes.ok) {
      const body = await postRes.text()
      // LinkedIn often returns 403 for missing w_member_social permission
      await prisma.linkedinConnection.update({
        where: { id: connection.id },
        data: { syncStatus: 'NOT_SUPPORTED' }
      })
      return {
        status: 'NOT_SUPPORTED',
        message: 'LinkedIn API permissions do not support automatic credential publishing. Use the manual Share flow instead.',
        detail: body
      }
    }

    const postData = await postRes.json()

    await prisma.linkedinConnection.update({
      where: { id: connection.id },
      data: { syncStatus: 'SUCCESS' }
    })

    return {
      status: 'SUCCESS',
      message: 'Credential synchronized to LinkedIn',
      postUrn: postData.id
    }
  } catch (err) {
    const status = err.message && err.message.includes('NOT_SUPPORTED') ? 'NOT_SUPPORTED' : 'FAILED'
    await prisma.linkedinConnection.update({
      where: { id: connection.id },
      data: { syncStatus: status }
    })
    return {
      status,
      message: status === 'NOT_SUPPORTED'
        ? 'LinkedIn API permissions do not support automatic credential publishing.'
        : 'LinkedIn synchronization failed',
      error: err.message
    }
  }
}