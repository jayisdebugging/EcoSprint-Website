import React from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  ShieldCheck,
  ArrowRight,
  Cpu
} from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export const AboutPage = () => {
  return (
    <div className="py-12 sm:py-16 space-y-20 transition-colors duration-200">
      {/* 1. MISSION & HEADER */}
      <section>
        <Container size="default">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-950/60 px-3 py-1 rounded-full border border-forest-200 dark:border-forest-800/80">
              Our Mission
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight leading-[1.15]">
              Accelerating the green transition by creating job-ready climate practitioners.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 leading-relaxed pt-2">
              The world does not lack sustainability targets; it lacks the skilled professionals capable of measuring, auditing, and executing them. EcoSprint was founded to replace slow, academic certifications with fast, auditable cohort sprints.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. WHY ECOSPRINT EXISTS & THE SUSTAINABILITY SKILLS GAP */}
      <section className="bg-sand-100/50 dark:bg-charcoal-900/50 py-16 border-y border-charcoal-200/80 dark:border-charcoal-800">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400">
                The Climate Skills Gap
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-charcoal-50 tracking-tight">
                Mandates have arrived. The workforce hasn't.
              </h2>
              <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                With the European Corporate Sustainability Reporting Directive (CSRD), SEC climate disclosures, and global supply chain Scope 3 requirements taking effect, over 50,000 enterprises need certified sustainability capability immediately.
              </p>
              <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                Traditional education programs take 1–2 years to update their textbooks. Online learning platforms offer passive video lectures with multiple-choice quizzes that produce no verifiable work proof. EcoSprint bridges this gap.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-2 border-charcoal-200 dark:border-charcoal-800">
                <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">82%</span>
                <p className="text-xs font-bold text-charcoal-900 dark:text-charcoal-100">Of Enterprises</p>
                <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">Report difficulty recruiting qualified carbon accountants and ESG controllers.</p>
              </Card>

              <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-2 border-charcoal-200 dark:border-charcoal-800">
                <span className="text-2xl font-extrabold text-forest-700 dark:text-forest-400">4.8 Weeks</span>
                <p className="text-xs font-bold text-charcoal-900 dark:text-charcoal-100">Average Placement</p>
                <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">From sprint capstone graduation to candidate interviews in our Career Network.</p>
              </Card>

              <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-2 border-charcoal-200 dark:border-charcoal-800">
                <span className="text-2xl font-extrabold text-charcoal-900 dark:text-charcoal-100">94.2%</span>
                <p className="text-xs font-bold text-charcoal-900 dark:text-charcoal-100">Completion Rate</p>
                <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">Compared to the 8–12% industry average for passive asynchronous courses.</p>
              </Card>

              <Card className="bg-white dark:bg-charcoal-900 p-5 space-y-2 border-charcoal-200 dark:border-charcoal-800">
                <span className="text-2xl font-extrabold text-forest-700 dark:text-forest-400">100%</span>
                <p className="text-xs font-bold text-charcoal-900 dark:text-charcoal-100">Audit Deliverable</p>
                <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">Every graduate completes an auditable workpaper or comparative LCA dossier.</p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. THE ECOSPRINT APPROACH & LEARNING PHILOSOPHY */}
      <section>
        <Container size="default">
          <SectionHeading
            tag="Learning Philosophy"
            title="How Practical Learning Outperforms Passive Theory"
            description="Our agile educational model is engineered for working professionals and career pivoters who need verified skills fast."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border-charcoal-200 dark:border-charcoal-800">
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-950 dark:text-charcoal-100">1. Sprint Cadence (2–4 Weeks)</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Short, high-intensity sprints with 6–8 hours weekly commitment allow professionals to upskill without pausing their full-time careers.
              </p>
            </Card>

            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border-charcoal-200 dark:border-charcoal-800">
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-950 dark:text-charcoal-100">2. Interactive Simulation Labs</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Calculators and sandboxes replicate enterprise ERP and auditor spreadsheets so learners solve dirty, unstructured data problems.
              </p>
            </Card>

            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border-charcoal-200 dark:border-charcoal-800">
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-950 dark:text-charcoal-100">3. Auditor-Grade Rubrics</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Capstone evaluations follow ISAE 3000 assurance standards. When an EcoSprint graduate receives a certificate, employers know it was earned.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 5. OUR VISION & CTA */}
      <section>
        <Container size="default">
          <div className="p-8 sm:p-12 rounded-2xl bg-charcoal-950 border border-charcoal-800 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-modal">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-400">Our Vision</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Empowering 100,000 climate practitioners by 2030.
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed">
                Join our next cohort and become part of the agile workforce turning global climate commitments into measurable, verified results.
              </p>
            </div>
            <Link to="/sprints">
              <Button variant="secondary" size="lg" rightIcon={ArrowRight} className="shrink-0">
                Explore Sprints
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default AboutPage
