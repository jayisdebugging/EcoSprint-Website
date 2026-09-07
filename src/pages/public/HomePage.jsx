import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Users2,
  Briefcase,
  Sparkles,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Flame,
  Layers,
  Check,
  X,
  FileCheck,
  Building,
  Target,
  BarChart3,
  Calculator,
  Compass
} from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { Reveal } from '../../components/ui/Reveal'
import { SprintCard } from '../../components/cards/SprintCard'
import { MentorCard } from '../../components/cards/MentorCard'
import { getFeaturedSprints } from '../../services/sprintsService'
import { getMentors } from '../../services/mentorsService'

export const HomePage = () => {
  const [featuredSprints, setFeaturedSprints] = useState([])
  const [mentors, setMentors] = useState([])
  const [cockpitTab, setCockpitTab] = useState('simulation') // 'simulation' | 'milestones' | 'audit'
  const [carbonFactor, setCarbonFactor] = useState(2.45)

  useEffect(() => {
    getFeaturedSprints().then(setFeaturedSprints)
    getMentors().then((data) => setMentors(data.slice(0, 3)))
  }, [])

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 text-charcoal-900 dark:text-charcoal-100 transition-colors duration-200">
      {/* SECTION 1: HERO */}
      <section className="relative pt-14 pb-16 md:pt-24 md:pb-28 overflow-hidden border-b border-charcoal-200/80 dark:border-charcoal-800">
        <Container size="default">
          <div className="max-w-4xl mx-auto text-center space-y-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900 dark:bg-sand-50 text-sand-50 dark:text-charcoal-950 text-xs font-semibold tracking-wide animate-fade-up" style={{ animationDelay: '40ms' }}>
              <span className="w-2 h-2 rounded-full bg-sand-50 dark:bg-charcoal-900 animate-pulse" />
              <span>Cohort Applications Open for Q3 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight leading-[1.05] animate-fade-up" style={{ animationDelay: '120ms' }}>
              The Next-Gen <br className="hidden sm:inline" />
              <span className="text-charcoal-900 dark:text-charcoal-100 underline decoration-charcoal-300 dark:decoration-charcoal-700 underline-offset-8 decoration-[3px]">Sustainability Upskilling</span> Platform.
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-2xl mx-auto font-normal tracking-tight-institutional animate-fade-up" style={{ animationDelay: '200ms' }}>
              Skip generic year-long theory. Master carbon accounting, CSRD compliance, and circular design through focused 2–4 week sprints with live practitioner mentorship.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: '280ms' }}>
              <Link to="/sprints" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" rightIcon={ArrowRight} className="w-full sm:w-auto shadow-subtle hover:shadow-card">
                  Explore Sprints
                </Button>
              </Link>
              <Link to="/companies" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/80 dark:bg-charcoal-900/80">
                  For Enterprise Teams
                </Button>
              </Link>
            </div>

            {/* Interactive Pathway Cockpit Visual */}
            <div className="pt-8 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '360ms' }}>
              <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-modal overflow-hidden text-left transition-colors">
                {/* Cockpit Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 px-4 py-3 bg-sand-50/60 dark:bg-charcoal-950/70 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 dark:bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                    <span className="text-xs text-charcoal-500 dark:text-charcoal-400 font-mono ml-2 hidden sm:inline">
                      ecosprint.app/sprint-room/carbon-accounting
                    </span>
                  </div>

                  {/* Cockpit Interactive Tabs */}
                  <div className="flex items-center gap-1 bg-white dark:bg-charcoal-800 p-1 rounded-lg border border-charcoal-200 dark:border-charcoal-700">
                    <button
                      type="button"
                      onClick={() => setCockpitTab('simulation')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        cockpitTab === 'simulation'
                          ? 'bg-forest-800 dark:bg-forest-700 text-white shadow-xs'
                          : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-100'
                      }`}
                    >
                      Simulation Lab
                    </button>
                    <button
                      type="button"
                      onClick={() => setCockpitTab('milestones')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        cockpitTab === 'milestones'
                          ? 'bg-forest-800 dark:bg-forest-700 text-white shadow-xs'
                          : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-100'
                      }`}
                    >
                      Sprint Room
                    </button>
                    <button
                      type="button"
                      onClick={() => setCockpitTab('audit')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        cockpitTab === 'audit'
                          ? 'bg-forest-800 dark:bg-forest-700 text-white shadow-xs'
                          : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-charcoal-100'
                      }`}
                    >
                      Verified Proof
                    </button>
                  </div>
                </div>

                {/* Cockpit Body based on Tab */}
                <div className="p-5 sm:p-6">
                  {cockpitTab === 'simulation' && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400">
                            Interactive Sandbox Preview
                          </span>
                          <h4 className="text-sm font-bold text-charcoal-950 dark:text-charcoal-100">
                            Scope 1 Fleet Emissions Simulator (DEFRA 2026 Standard)
                          </h4>
                        </div>
                        <Badge variant="forest" size="sm" dot>
                          Auditor Sandbox Active
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950 border border-charcoal-200/80 dark:border-charcoal-800 space-y-2">
                          <label className="text-[11px] font-semibold text-charcoal-700 dark:text-charcoal-300 block">
                            Diesel Consumption: 580,000 Liters
                          </label>
                          <input
                            type="range"
                            min="1.8"
                            max="3.2"
                            step="0.05"
                            value={carbonFactor}
                            onChange={(e) => setCarbonFactor(parseFloat(e.target.value))}
                            className="w-full accent-forest-700"
                          />
                          <div className="flex justify-between text-[10px] text-charcoal-500 dark:text-charcoal-400 font-mono">
                            <span>Factor: {carbonFactor.toFixed(2)} kg CO2e/L</span>
                            <span>DEFRA FY26</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950 border border-charcoal-200/80 dark:border-charcoal-800 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-charcoal-500 dark:text-charcoal-400">
                            Calculated Footprint
                          </span>
                          <p className="text-xl font-mono font-extrabold text-forest-800 dark:text-forest-300">
                            {(580000 * carbonFactor / 1000).toLocaleString('en-IN', { maximumFractionDigits: 1 })} tCO2e
                          </p>
                          <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400">
                            Confidence score: 98.4% (Tier 2 Primary)
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950 border border-charcoal-200/80 dark:border-charcoal-800 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-charcoal-500 dark:text-charcoal-400">
                            Practitioner Feedback
                          </span>
                          <p className="text-xs font-semibold text-charcoal-800 dark:text-charcoal-200">
                            Dr. Clara Vogel (Veridis)
                          </p>
                          <p className="text-[11px] text-charcoal-600 dark:text-charcoal-400 italic">
                            "Workpaper formula matches GHG Protocol Chapter 6 guidelines."
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {cockpitTab === 'milestones' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400">
                            3-Week Sprint Roadmap
                          </span>
                          <h4 className="text-sm font-bold text-charcoal-950 dark:text-charcoal-100">
                            Corporate Carbon Accounting & GHG Protocol Mastery
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-semibold text-forest-700 dark:text-forest-400">
                          Week 2 of 3 (75% Complete)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg border border-forest-300 dark:border-forest-700/60 bg-forest-50/50 dark:bg-forest-950/30 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-forest-800 dark:text-forest-300 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Week 1: Scope 1 & 2</span>
                          </div>
                          <p className="text-[11px] text-charcoal-600 dark:text-charcoal-400">
                            Organizational boundaries & market-based calculations.
                          </p>
                          <Badge variant="forest" size="sm">Graded 96/100</Badge>
                        </div>

                        <div className="p-3 rounded-lg border border-forest-600 dark:border-forest-500 bg-white dark:bg-charcoal-800 shadow-xs space-y-1.5 ring-1 ring-forest-500">
                          <div className="flex items-center gap-1.5 text-forest-700 dark:text-forest-300 text-xs font-bold">
                            <Clock className="w-3.5 h-3.5 animate-spin" />
                            <span>Week 2: Scope 3 Value Chain</span>
                          </div>
                          <p className="text-[11px] text-charcoal-600 dark:text-charcoal-400">
                            Screening 15 categories & supplier data gathering.
                          </p>
                          <Badge variant="warning" size="sm">In Progress</Badge>
                        </div>

                        <div className="p-3 rounded-lg border border-charcoal-200 dark:border-charcoal-800 bg-sand-50/50 dark:bg-charcoal-950/50 space-y-1.5 opacity-75">
                          <div className="flex items-center gap-1.5 text-charcoal-500 dark:text-charcoal-400 text-xs font-bold">
                            <Award className="w-3.5 h-3.5" />
                            <span>Week 3: Capstone & Assurance</span>
                          </div>
                          <p className="text-[11px] text-charcoal-500 dark:text-charcoal-500">
                            Executive presentation & mock auditor defense.
                          </p>
                          <span className="text-[10px] text-charcoal-400">Unlocks on Friday</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {cockpitTab === 'audit' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400">
                          Digital Credential Proof
                        </span>
                        <Badge variant="forest" size="sm">
                          <ShieldCheck className="w-3 h-3 mr-1" /> Cryptographically Signed
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-sand-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-charcoal-950 dark:text-charcoal-100">
                            EcoSprint Certified Fellow: Northwind Fellowship Sample
                          </p>
                          <p className="text-charcoal-600 dark:text-charcoal-400 text-[11px]">
                            Track: Corporate GHG Protocol & Scope 3 Accounting • ID: #ECO-2026-8821
                          </p>
                        </div>
                        <Link to="/verify">
                          <Button variant="outline" size="sm">
                            Inspect Verification
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: TRUST METRICS & EMPLOYER PARTNERS */}
      <section className="-mt-14 sm:-mt-20">
        <Container size="default">
          <div className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-card text-center space-y-6">
            <p className="text-xs uppercase tracking-wider font-bold text-charcoal-500 dark:text-charcoal-400">
              Trusted by professionals transitioning across corporate sustainability, clean energy, and ESG finance
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-1">
              <div className="space-y-0.5 border-r border-charcoal-100 dark:border-charcoal-800 last:border-0">
                <p className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-charcoal-100 tracking-tight">
                  3,450+
                </p>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Fellows Upskilled</p>
              </div>
              <div className="space-y-0.5 border-r border-charcoal-100 dark:border-charcoal-800 last:border-0">
                <p className="text-2xl sm:text-3xl font-extrabold text-forest-700 dark:text-forest-400 tracking-tight">
                  94.2%
                </p>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Cohort Completion Rate</p>
              </div>
              <div className="space-y-0.5 border-r border-charcoal-100 dark:border-charcoal-800 last:border-0">
                <p className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-charcoal-100 tracking-tight">
                  48
                </p>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Practitioner Mentors</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl sm:text-3xl font-extrabold text-forest-700 dark:text-forest-400 tracking-tight">
                  120+
                </p>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Hiring Partners</p>
              </div>
            </div>

            {/* Employer Logo Banner */}
            <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800">
              <span className="text-[11px] font-semibold text-charcoal-400 dark:text-charcoal-500 block mb-3">
                Fellows Hired by Leading Climate & ESG Teams
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-charcoal-600 dark:text-charcoal-400 font-semibold text-xs tracking-wider uppercase">
                <span className="hover:text-forest-700 dark:hover:text-forest-400 transition-colors">Veridis Climate</span>
                <span className="hover:text-forest-700 dark:hover:text-forest-400 transition-colors">Nordic Transition</span>
                <span className="hover:text-forest-700 dark:hover:text-forest-400 transition-colors">CleanGrid Global</span>
                <span className="hover:text-forest-700 dark:hover:text-forest-400 transition-colors">Alpine Decarb</span>
                <span className="hover:text-forest-700 dark:hover:text-forest-400 transition-colors">TerraScale Labs</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: EDITORIAL PROBLEM COMPARISON */}
      <section>
        <Container size="default">
          <SectionHeading
            tag="The Paradigm Shift"
            title="The Traditional Upskilling Paradox"
            description="The market needs professionals who can audit emissions, execute LCAs, and formulate double materiality matrices today—not passive video watchers."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* The Old Way */}
            <Card className="p-6 sm:p-8 space-y-4 bg-white dark:bg-charcoal-900 border-charcoal-200 dark:border-charcoal-800">
              <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Legacy Online Learning
                </span>
                <span className="text-xs text-charcoal-400">12% Completion Rate</span>
              </div>
              <ul className="space-y-3.5 text-xs text-charcoal-600 dark:text-charcoal-400">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>12–18 month abstract programs</strong> that lag behind changing regulations like CSRD & SEC rules.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Passive video lectures</strong> with multiple-choice quizzes that prove memorization, not execution.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>No tangible deliverables</strong> to show corporate recruiters or hiring managers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Zero feedback</strong> from experienced chief sustainability officers or auditors.</span>
                </li>
              </ul>
            </Card>

            {/* The EcoSprint Way */}
            <Card className="p-6 sm:p-8 space-y-4 bg-forest-50/40 dark:bg-forest-950/20 border-forest-200 dark:border-forest-800/80 ring-1 ring-forest-500/30">
              <div className="flex items-center justify-between border-b border-forest-200 dark:border-forest-800/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800 dark:text-forest-300">
                  The EcoSprint Method
                </span>
                <span className="text-xs font-bold text-forest-700 dark:text-forest-400">94.2% Completion Rate</span>
              </div>
              <ul className="space-y-3.5 text-xs text-charcoal-800 dark:text-charcoal-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-forest-600 dark:text-forest-400 shrink-0 mt-0.5" />
                  <span><strong>Focused 2–4 week cohort sprints</strong> calibrated to current operational standards.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-forest-600 dark:text-forest-400 shrink-0 mt-0.5" />
                  <span><strong>Browser simulation sandboxes</strong> using real raw activity data, DEFRA emission factors, and LCA formulas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-forest-600 dark:text-forest-400 shrink-0 mt-0.5" />
                  <span><strong>Auditable capstone project</strong> in an exportable, investor-grade workpaper format.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-forest-600 dark:text-forest-400 shrink-0 mt-0.5" />
                  <span><strong>1-on-1 critique & office hours</strong> with seasoned CSOs and big-four assurance leads.</span>
                </li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* SECTION 4: 5-STEP JOURNEY */}
      <section className="bg-sand-100/50 dark:bg-charcoal-900/50 py-16 border-y border-charcoal-200/80 dark:border-charcoal-800">
        <Container size="default">
          <SectionHeading
            tag="The Sprint Arc"
            title="The EcoSprint 5-Step Learning Arc"
            description="How every cohort fellow progresses from standard fundamentals to auditable competency in 2–4 weeks."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {[
              { step: '01', title: 'LEARN', desc: 'Targeted briefings on specific regulations & standards (GHG Protocol, CSRD, ISO 14040).' },
              { step: '02', title: 'PRACTICE', desc: 'Real-time simulation labs with raw activity data, emission factors, and sandbox inputs.' },
              { step: '03', title: 'BUILD', desc: 'Assemble an auditable, real-world capstone project for a realistic enterprise scenario.' },
              { step: '04', title: 'GET VERIFIED', desc: 'Live critique from practitioners and cryptographically verifiable digital credentials.' },
              { step: '05', title: 'GROW', desc: 'Direct matching with sustainability teams and hiring partners through our Career Network.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-charcoal-900 p-5 rounded-xl border border-charcoal-200/90 dark:border-charcoal-800 shadow-subtle space-y-2 relative hover:border-forest-500 dark:hover:border-forest-500 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-forest-700 dark:text-forest-400">
                    {item.step}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 dark:bg-forest-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-sm font-extrabold text-charcoal-950 dark:text-charcoal-100 tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5: THREE CORE PILLARS */}
      <section>
        <Container size="default">
          <SectionHeading
            tag="Platform Architecture"
            title="The Three Pillars of EcoSprint"
            description="Everything in EcoSprint is engineered around practical capability, mentor assurance, and career placement."
          />

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border-charcoal-200 dark:border-charcoal-800" hoverable>
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-950 dark:text-charcoal-100">1. Interactive Skill Labs</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Browser simulation sandboxes for carbon footprint modeling, circular packaging redesigns, and double materiality threshold scoring.
              </p>
              <Link to="/skill-labs" className="inline-flex items-center text-xs font-bold text-forest-700 dark:text-forest-400 hover:text-forest-800 gap-1 pt-2">
                Launch simulation labs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border-charcoal-200 dark:border-charcoal-800" hoverable>
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-950 dark:text-charcoal-100">2. Practitioner Mentorship</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                Weekly live critiques with seasoned Chief Sustainability Officers, big-four assurance directors, and climate tech founders.
              </p>
              <Link to="/mentors" className="inline-flex items-center text-xs font-bold text-forest-700 dark:text-forest-400 hover:text-forest-800 gap-1 pt-2">
                Meet practitioner mentors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border-charcoal-200 dark:border-charcoal-800" hoverable>
              <div className="w-10 h-10 rounded-lg bg-forest-50 dark:bg-forest-950 flex items-center justify-center text-forest-700 dark:text-forest-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-950 dark:text-charcoal-100">3. Verified Career Network</h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                A verified talent pipeline connecting high-performing cohort fellows directly with corporate sustainability teams and clean tech employers.
              </p>
              <Link to="/careers" className="inline-flex items-center text-xs font-bold text-forest-700 dark:text-forest-400 hover:text-forest-800 gap-1 pt-2">
                View open opportunities <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* SECTION 6: FEATURED SPRINTS */}
      <section className="bg-sand-100/50 dark:bg-charcoal-900/50 py-16 border-y border-charcoal-200/80 dark:border-charcoal-800">
        <Container size="default">
          <SectionHeading
            tag="Curriculum"
            title="Featured Sustainability Sprints"
            description="Focused 2–4 week cohort programs engineered for auditable climate capability."
            action={
              <Link to="/sprints">
                <Button variant="outline" size="sm" rightIcon={ArrowRight}>
                  View All Sprints
                </Button>
              </Link>
            }
          />

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSprints.slice(0, 3).map((sprint) => (
              <SprintCard key={sprint.id} sprint={sprint} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* SECTION 7: MENTORS SECTION */}
      <section>
        <Container size="default">
          <SectionHeading
            tag="Active Practitioners"
            title="Learn Directly from Climate Leaders"
            description="Our mentors are practicing CSOs, carbon accountants, and clean energy founders who solve these challenges every day."
            action={
              <Link to="/mentors">
                <Button variant="outline" size="sm" rightIcon={ArrowRight}>
                  All Mentors
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 8: ENTERPRISE TEAM UBLSKILLING */}
      <section className="bg-sand-100/50 dark:bg-charcoal-900/50 py-16 border-y border-charcoal-200/80 dark:border-charcoal-800">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400">
                For Enterprise Organizations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight">
                Rapid Workforce Upskilling for CSRD & Net-Zero Mandates
              </h2>
              <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                Upskill finance controllers, procurement teams, and operations leads with standardized corporate cohorts. Teams complete real, audited carbon balance sheets and materiality matrices.
              </p>
              <ul className="space-y-2.5 pt-1 text-xs text-charcoal-700 dark:text-charcoal-300">
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 shrink-0" /> Private branded cohort rooms with customized company case data
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 shrink-0" /> Real-time executive skills readiness analytics
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 shrink-0" /> Pre-audit ISAE 3000 assurance preparation
                </li>
              </ul>
              <div className="pt-3">
                <Link to="/companies">
                  <Button variant="primary" size="md" rightIcon={ArrowRight}>
                    Learn About Team Cohorts
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 shadow-card border-charcoal-200 dark:border-charcoal-800">
              <h3 className="text-sm font-bold text-charcoal-950 dark:text-charcoal-100 border-b border-charcoal-100 dark:border-charcoal-800 pb-2 flex items-center justify-between">
                <span>Enterprise Readiness Benchmark</span>
                <Badge variant="forest" size="sm">Nordic Transition Group</Badge>
              </h3>
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                    <span>Corporate Carbon Accounting (Finance)</span>
                    <span className="text-forest-700 dark:text-forest-400 font-mono">85% Complete</span>
                  </div>
                  <div className="w-full bg-sand-200 dark:bg-charcoal-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-forest-600 dark:bg-forest-500 h-full w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                    <span>Scope 3 Supply Chain (Procurement)</span>
                    <span className="text-forest-700 dark:text-forest-400 font-mono">60% Complete</span>
                  </div>
                  <div className="w-full bg-sand-200 dark:bg-charcoal-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-forest-600 dark:bg-forest-500 h-full w-[60%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                    <span>Circular Product Design (R&D)</span>
                    <span className="text-forest-700 dark:text-forest-400 font-mono">90% Complete</span>
                  </div>
                  <div className="w-full bg-sand-200 dark:bg-charcoal-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-forest-600 dark:bg-forest-500 h-full w-[90%]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section>
        <Container size="default">
          <div className="rounded-2xl bg-charcoal-950 border border-charcoal-800 text-white p-8 sm:p-14 text-center space-y-5 relative overflow-hidden shadow-modal">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to build verifiable sustainability skills?
            </h2>
            <p className="text-sm sm:text-base text-charcoal-300 max-w-xl mx-auto leading-relaxed">
              Join the next cohort. Learn with active climate practitioners, execute real capstones, and get verified.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/sprints" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" rightIcon={ArrowRight} className="w-full sm:w-auto">
                  Browse Active Sprints
                </Button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent text-white border-charcoal-700 hover:bg-charcoal-900">
                  Apply for Admission
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HomePage

