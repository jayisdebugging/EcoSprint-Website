import { MENTORS } from '../data/mentors'

export const getMentors = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return [...MENTORS]
}

export const getMentorById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const mentor = MENTORS.find((m) => m.id === id)
  if (!mentor) {
    throw new Error(`Mentor with ID ${id} not found`)
  }
  return mentor
}
