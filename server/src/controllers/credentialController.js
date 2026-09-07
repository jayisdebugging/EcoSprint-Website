import prisma from '../config/database.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

// GET /api/me/credentials
export const getMyCredentials = asyncHandler(async (req, res) => {
  const credentials = await prisma.credential.findMany({
    where: { userId: req.user.id },
    orderBy: { issuedDate: 'desc' }
  })
  res.json({ success: true, credentials })
})

// GET /api/credentials/:id
export const getCredentialById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const credential = await prisma.credential.findFirst({
    where: { OR: [{ id }, { credentialId: id }, { verificationHash: id }] }
  })
  if (!credential) throw new ApiError(404, 'Credential not found')
  res.json({ success: true, credential })
})

// GET /api/verify/:id - Public verification
export const verifyCredential = asyncHandler(async (req, res) => {
  const { id } = req.params
  const credential = await prisma.credential.findFirst({
    where: { OR: [{ id }, { credentialId: id }, { verificationHash: id }] }
  })

  if (!credential) {
    return res.json({ verified: false, error: 'Credential record not found on verification ledger' })
  }

  res.json({
    verified: true,
    credential: {
      id: credential.id,
      credentialId: credential.credentialId,
      verificationHash: credential.verificationHash,
      title: credential.title,
      recipientName: credential.recipientName,
      issuedDate: credential.issuedDate,
      status: credential.status,
      sprintTitle: credential.sprintTitle,
      grade: credential.grade,
      skills: credential.skills,
      issuingMentor: credential.issuingMentor,
      credentialType: credential.credentialType,
      expiryDate: credential.expiryDate,
      description: credential.description
    }
  })
})