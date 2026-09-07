import prisma from '../src/config/database.js'
import { SPRINTS } from '../../src/data/sprints.js'
import { withLessonContent } from '../../src/data/lessonContent.js'
import { PROJECTS } from '../../src/data/projects.js'

const lessonType = (type) => {
  const map = {
    video: 'VIDEO',
    lab: 'LAB',
    reading: 'READING',
    project: 'PROJECT',
    assessment: 'ASSESSMENT'
  }
  return map[String(type || '').toLowerCase()] || 'READING'
}

const sprintStatus = (label) => {
  const s = String(label || '').toLowerCase()
  if (s.includes('upcoming')) return 'UPCOMING'
  if (s.includes('progress')) return 'IN_PROGRESS'
  if (s.includes('completed')) return 'COMPLETED'
  if (s.includes('archiv')) return 'ARCHIVED'
  return 'ADMISSIONS_OPEN'
}

async function seed() {
  console.log('Seeding EcoSprint catalog (no demo user accounts)...')

  await prisma.sprint.deleteMany()
  await prisma.project.deleteMany()

  for (const sprint of SPRINTS) {
    const created = await prisma.sprint.create({
      data: {
        id: sprint.id,
        slug: sprint.slug,
        title: sprint.title,
        tagline: sprint.tagline,
        track: sprint.track,
        category: sprint.category,
        level: sprint.level,
        durationWeeks: sprint.durationWeeks,
        hoursPerWeek: sprint.hoursPerWeek,
        cohortStartDate: sprint.cohortStartDate ? new Date(sprint.cohortStartDate) : null,
        cohortSize: sprint.cohortSize || 20,
        enrolledCount: 0,
        price: sprint.price || 2499,
        mentorId: sprint.mentorId || null,
        mentorName: sprint.mentorName || null,
        mentorRole: sprint.mentorRole || null,
        rating: sprint.rating || 0,
        reviewCount: sprint.reviewCount || 0,
        featured: Boolean(sprint.featured),
        popular: Boolean(sprint.popular),
        status: sprintStatus(sprint.status),
        statusLabel: sprint.status || 'Admissions Open',
        skills: sprint.skills || [],
        labsCount: sprint.labsCount || 0,
        description: sprint.description,
        learningOutcomes: sprint.learningOutcomes || []
      }
    })

    for (const [weekIndex, week] of (sprint.curriculum || []).entries()) {
      const module = await prisma.sprintModule.create({
        data: {
          sprintId: created.id,
          week: week.week,
          title: week.title,
          description: week.description || null,
          order: weekIndex
        }
      })

      for (const [lessonIndex, raw] of (week.lessons || []).entries()) {
        const lesson = withLessonContent(raw)
        await prisma.lesson.create({
          data: {
            id: lesson.id,
            moduleId: module.id,
            title: lesson.title,
            type: lessonType(lesson.type),
            duration: lesson.duration || null,
            description: lesson.description || null,
            order: lessonIndex,
            videoPlaceholder: lesson.videoPlaceholder || null,
            videoUrl: lesson.videoUrl || null,
            notes: lesson.notes || null,
            practicalExample: lesson.practicalExample || null,
            quiz: lesson.quiz || undefined,
            resources: lesson.resources || undefined,
            takeaways: lesson.takeaways || [],
            task: lesson.task || null
          }
        })
      }
    }
  }

  for (const project of PROJECTS) {
    const sprint = await prisma.sprint.findUnique({ where: { id: project.sprintId } })
    if (!sprint) continue
    await prisma.project.create({
      data: {
        id: project.id,
        title: project.title,
        sprintId: project.sprintId,
        sprintTitle: project.sprintTitle,
        difficulty: project.difficulty || 'Intermediate',
        estimatedHours: project.estimatedHours || 20,
        status: 'NOT_STARTED',
        progress: 0,
        dueDate: project.dueDate ? new Date(project.dueDate) : null,
        clientScenario: project.clientScenario || null,
        learningObjectives: project.learningObjectives || [],
        requirements: project.requirements || [],
        resources: project.resources || [],
        deliverables: project.deliverables || [],
        skillsDemonstrated: project.skillsDemonstrated || []
      }
    })
  }

  console.log(`Seeded ${SPRINTS.length} sprints and linked capstone templates.`)
}

seed()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
