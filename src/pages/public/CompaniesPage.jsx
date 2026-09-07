import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Search,
  FileCheck,
  Send
} from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { useToast } from '../../components/ui/Toast'

export const CompaniesPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [teamSize, setTeamSize] = useState('10-25')
  const [focusArea, setFocusArea] = useState('Corporate Carbon Accounting')
  const { addToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    addToast({
      title: 'Enterprise Inquiry Received',
      message: `Thank you, ${companyName || 'partner'}. An EcoSprint enterprise advisor will contact you within 24 hours.`,
      type: 'success'
    })
    setModalOpen(false)
  }

  return (
    <div className="py-12 sm:py-16 space-y-24 transition-colors duration-200">
      {/* 1. HERO */}
      <section>
        <Container size="default">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-950/60 px-3 py-1 rounded-full border border-forest-200 dark:border-forest-800/80">
              Enterprise Upskilling & Talent Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight leading-[1.15]">
              Build in-house sustainability capability at sprint speed.
            </h1>
            <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              Equip cross-functional finance, procurement, and operations teams to calculate Scope 1–3 emissions, meet CSRD reporting deadlines, and audit supplier footprints without costly external consultants.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => setModalOpen(true)}
                className="shadow-subtle hover:shadow-card"
              >
                Talk to EcoSprint
              </Button>
              <Link to="/company/dashboard">
                <Button variant="outline" size="lg" className="bg-white/80 dark:bg-charcoal-800">
                  Preview Enterprise Portal
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CORE VALUE PROPOSITIONS */}
      <section className="bg-sand-100/50 dark:bg-charcoal-900/50 py-16 border-y border-charcoal-200/80 dark:border-charcoal-800">
        <Container size="default">
          <SectionHeading
            tag="Corporate Solutions"
            title="Everything Enterprise Sustainability Leads Need"
            description="From standardized skill tracks to real-time capability analytics."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border-charcoal-200 dark:border-charcoal-800">
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-950 dark:text-charcoal-100">Standardized Skill Tracks</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Consistent methodologies across GHG Protocol, ESRS/CSRD, and ISO 14040 ensuring your teams speak the exact same technical compliance language.
              </p>
            </Card>

            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border-charcoal-200 dark:border-charcoal-800">
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-950 dark:text-charcoal-100">Cohort Management</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Run private company cohorts with custom case studies using your organization's own anonymized utility and supplier spend datasets.
              </p>
            </Card>

            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border-charcoal-200 dark:border-charcoal-800">
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-950 dark:text-charcoal-100">Skills Analytics</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Executive dashboards showing employee milestone progression, rubric grades, and verified competency coverage across business units.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. HOW ECOSPRINT WORKS FOR TEAMS (5 STEPS) */}
      <section>
        <Container size="default">
          <SectionHeading
            tag="The Enterprise Process"
            title="How EcoSprint Works for Teams"
            description="A repeatable 5-step framework to transition your workforce into certified sustainability practitioners."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {[
              { num: '1', title: 'Define Skill Needs', desc: 'Identify target regulatory gaps (CSRD, Scope 3, LCA) and baseline team competencies.' },
              { num: '2', title: 'Enroll Employees', desc: 'Assign seats across finance, procurement, and engineering into specialized 2–4 week cohorts.' },
              { num: '3', title: 'Track Progress', desc: 'Monitor weekly attendance, simulation lab completion, and mentor review feedback in real time.' },
              { num: '4', title: 'Measure Skills', desc: 'Review audit-ready deliverables, ISAE 3000 workpapers, and verified credential conferrals.' },
              { num: '5', title: 'Discover Talent', desc: 'Access pre-vetted external sprint graduates to fill critical internal sustainability vacancies.' },
            ].map((step, i) => (
              <div key={i} className="p-5 rounded-xl bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle space-y-2 text-center">
                <div className="w-8 h-8 rounded-full bg-forest-800 dark:bg-forest-700 text-white font-bold text-xs flex items-center justify-center mx-auto">
                  {step.num}
                </div>
                <h4 className="text-xs font-bold text-charcoal-950 dark:text-charcoal-100">{step.title}</h4>
                <p className="text-[11px] text-charcoal-600 dark:text-charcoal-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ENTERPRISE DASHBOARD PREVIEW */}
      <section className="bg-sand-100/50 dark:bg-charcoal-900/50 py-16 border-y border-charcoal-200/80 dark:border-charcoal-800">
        <Container size="default">
          <SectionHeading
            tag="Enterprise Control"
            title="A Powerful Dashboard for CSOs and L&D Directors"
            description="Track department completion, skill benchmarks, and talent pipelines in one clean interface."
          />

          <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-modal overflow-hidden p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-100 dark:border-charcoal-800 pb-4">
              <div>
                <span className="text-xs font-bold text-forest-700 dark:text-forest-400 uppercase">Enterprise Client Portal Preview</span>
                <h3 className="text-lg font-bold text-charcoal-950 dark:text-charcoal-50 mt-0.5">Nordic Transition Group — Enterprise Account</h3>
              </div>
              <Badge variant="sage" size="md">25 Corporate Seats Allocated</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-sand-50 dark:bg-charcoal-950/70 rounded-lg border border-charcoal-200/70 dark:border-charcoal-800">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">Enrolled Staff</span>
                <p className="text-2xl font-bold text-charcoal-950 dark:text-charcoal-100 mt-1">18 Fellows</p>
                <span className="text-[10px] text-forest-700 dark:text-forest-400">7 seats available</span>
              </div>
              <div className="p-4 bg-sand-50 dark:bg-charcoal-950/70 rounded-lg border border-charcoal-200/70 dark:border-charcoal-800">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">CSRD Readiness</span>
                <p className="text-2xl font-bold text-forest-700 dark:text-forest-400 mt-1">82%</p>
                <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400">Target: 90% by Q4</span>
              </div>
              <div className="p-4 bg-sand-50 dark:bg-charcoal-950/70 rounded-lg border border-charcoal-200/70 dark:border-charcoal-800">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">Capstones Reviewed</span>
                <p className="text-2xl font-bold text-charcoal-950 dark:text-charcoal-100 mt-1">14 Dossiers</p>
                <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400">Average score: 92%</span>
              </div>
              <div className="p-4 bg-sand-50 dark:bg-charcoal-950/70 rounded-lg border border-charcoal-200/70 dark:border-charcoal-800">
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">Estimated Cost Saving</span>
                <p className="text-2xl font-bold text-charcoal-950 dark:text-charcoal-100 mt-1">₹1,25,00,000</p>
                <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400">In consulting hours</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link to="/company/dashboard">
                <Button variant="outline" size="sm" rightIcon={ArrowRight}>
                  Explore Full Interactive Enterprise Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. FINAL CTA */}
      <section>
        <Container size="default">
          <div className="p-8 sm:p-12 rounded-2xl bg-charcoal-950 border border-charcoal-800 text-white text-center space-y-4 shadow-modal">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to scale your sustainability capability?
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-300 max-w-lg mx-auto leading-relaxed">
              Schedule a consultation with our enterprise solution directors to discuss custom cohort sizing and corporate pricing tiers.
            </p>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => setModalOpen(true)}
              >
                Talk to EcoSprint
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* "Talk to EcoSprint" Interactive Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule an Enterprise Consultation"
        description="Discuss custom cohort dates, syllabus adaptation, and volume seats."
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <Input
            label="Organization Name"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Acme Industrial Group"
          />

          <Input
            label="Corporate Work Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sustainability@company.com"
          />

          <Select
            label="Target Team Sizing"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            options={[
              { label: '5 – 10 Team Members', value: '5-10' },
              { label: '10 – 25 Team Members', value: '10-25' },
              { label: '25 – 50 Team Members', value: '25-50' },
              { label: '50+ Enterprise Wide', value: '50+' }
            ]}
          />

          <Select
            label="Primary Upskilling Focus"
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            options={[
              { label: 'Corporate Carbon Accounting (Scope 1-3)', value: 'Corporate Carbon Accounting' },
              { label: 'ESG Reporting & CSRD Compliance', value: 'ESG Reporting & CSRD Compliance' },
              { label: 'Circular Product Design & LCA', value: 'Circular Product Design & LCA' },
              { label: 'Sustainable Supply Chains', value: 'Sustainable Supply Chains' }
            ]}
          />

          <div className="pt-3 border-t border-charcoal-100 dark:border-charcoal-800 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" rightIcon={Send}>
              Submit Inquiry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CompaniesPage
