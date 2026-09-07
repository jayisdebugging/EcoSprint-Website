import { JOBS } from '../data/jobs'

export const getJobs = async (filter = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  let results = [...JOBS]

  if (filter.search) {
    const term = filter.search.toLowerCase()
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(term) ||
        j.company.toLowerCase().includes(term) ||
        j.requiredSkills.some((s) => s.toLowerCase().includes(term))
    )
  }

  if (filter.type && filter.type !== 'All') {
    results = results.filter((j) => j.type.toLowerCase() === filter.type.toLowerCase())
  }

  return results
}

export const getJobById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const job = JOBS.find((j) => j.id === id)
  if (!job) {
    throw new Error(`Job with ID ${id} not found`)
  }
  return job
}
