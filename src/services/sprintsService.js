import { SPRINTS } from '../data/sprints'

/**
 * Service to fetch sustainability sprints.
 * Returns Promises to simulate network/API responses.
 */
export const getSprints = async (filters = {}) => {
  // Simulate minimal async delay for realism
  await new Promise((resolve) => setTimeout(resolve, 50))

  let results = [...SPRINTS]

  if (filters.track && filters.track !== 'All') {
    results = results.filter((sprint) => sprint.track.toLowerCase() === filters.track.toLowerCase())
  }

  if (filters.level && filters.level !== 'All') {
    results = results.filter((sprint) => sprint.level.toLowerCase() === filters.level.toLowerCase())
  }

  if (filters.search) {
    const term = filters.search.toLowerCase()
    results = results.filter(
      (sprint) =>
        sprint.title.toLowerCase().includes(term) ||
        sprint.tagline.toLowerCase().includes(term) ||
        sprint.skills.some((skill) => skill.toLowerCase().includes(term))
    )
  }

  return results
}

export const getSprintById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const sprint = SPRINTS.find((s) => s.id === id || s.slug === id)
  if (!sprint) {
    throw new Error(`Sprint with ID ${id} not found`)
  }
  return sprint
}

export const getFeaturedSprints = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return SPRINTS.filter((s) => s.featured)
}
