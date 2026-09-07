import { PROJECTS } from '../data/projects'

export const getProjects = async (filterStatus = 'All') => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  if (filterStatus === 'All') return [...PROJECTS]
  return PROJECTS.filter((p) => p.status.toLowerCase() === filterStatus.toLowerCase())
}

export const getProjectById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const project = PROJECTS.find((p) => p.id === id)
  if (!project) {
    throw new Error(`Project with ID ${id} not found`)
  }
  return project
}
