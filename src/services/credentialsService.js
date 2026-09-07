import { CREDENTIALS } from '../data/credentials'

export const getCredentials = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [...CREDENTIALS]
}

export const getCredentialById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const cred = CREDENTIALS.find((c) => c.id === id || c.credentialId === id)
  if (!cred) {
    throw new Error(`Credential with ID ${id} not found`)
  }
  return cred
}
