import { CURRENT_USER, PLATFORM_STATS } from '../data/users'

export const getCurrentUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return { ...CURRENT_USER }
}

export const getPlatformStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return { ...PLATFORM_STATS }
}

export const updateUserProfile = async (updates) => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  Object.assign(CURRENT_USER, updates)
  return { ...CURRENT_USER }
}
