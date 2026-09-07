/**
 * Client-side hashing for the local (offline) auth fallback only.
 * Passwords are never stored in plaintext. Production auth uses bcrypt on the API.
 */

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

export const randomId = (prefix = 'usr') => {
  const bytes = crypto.getRandomValues(new Uint8Array(8))
  return `${prefix}_${toHex(bytes)}`
}

export const randomSalt = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return toHex(bytes)
}

export const hashPassword = async (password, salt) => {
  const encoded = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return toHex(digest)
}

export const verifyPassword = async (password, salt, expectedHash) => {
  const actual = await hashPassword(password, salt)
  return actual === expectedHash
}
