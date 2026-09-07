/**
 * Centralized mock data: Sprints
 * Realistic cohort-based sustainability curriculum data with full lesson plans.
 */

export const SPRINTS = [
  {
    id: 'sprint-carbon-accounting',
    title: 'Corporate Carbon Accounting & GHG Protocol',
    slug: 'corporate-carbon-accounting-ghg-protocol',
    tagline: 'Master Scope 1, 2, and 3 footprint calculation with enterprise auditing rigor.',
    track: 'Carbon Accounting',
    category: 'Carbon',
    level: 'Intermediate',
    durationWeeks: 3,
    hoursPerWeek: 8,
    cohortStartDate: '2026-10-12',
    cohortSize: 24,
    enrolledCount: 19,
    price: 2499,
    mentorId: 'mentor-clara-vogel',
    mentorName: 'Dr. Clara Vogel',
    mentorRole: 'Managing Partner, Veridis Climate Capital',
    rating: 4.9,
    reviewCount: 48,
    featured: true,
    popular: true,
    status: 'Admissions Open',
    skills: [
      'GHG Protocol Corporate Standard',
      'Scope 1-3 Boundary Setting',
      'Emission Factor Calculation',
      'PCAF Financial Carbon Metrics',
      'Carbon Audit Workpapers'
    ],
    labsCount: 4,
    description: 'A 3-week rigorous sprint designed for corporate sustainability analysts, carbon accountants, and ESG controllers. You will calculate corporate greenhouse gas emissions across real-world organizational boundaries, utilize IPCC and DEFRA emission factors, and build a verified audit-ready carbon balance sheet.',
    learningOutcomes: [
      'Establish operational vs. financial organizational boundaries under the GHG Protocol',
      'Calculate stationary and mobile Scope 1 emissions using primary activity fuel bills',
      'Model location-based and market-based Scope 2 emissions with contractual instruments and RECs',
      'Perform spend-based and supplier-specific Scope 3 calculations across 15 standard categories',
      'Assemble third-party assurance workpapers compliant with ISAE 3000 standards'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Organizational Boundaries & Scope 1 & 2 Emissions',
        description: 'Establish organizational consolidation methods and calculate operational direct emissions.',
        lessons: [
          {
            id: 'ca-w1-l0',
            title: 'GHG Basics: Gases, CO2e, and Why Inventories Exist',
            type: 'video',
            duration: '18 mins',
            description: 'Build the language of corporate carbon: Kyoto gases, GWP, activity data × emission factors, and how the GHG Protocol sits next to ISO 14064.',
            videoPlaceholder: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
            takeaways: [
              'CO2e converts methane, N2O and F-gases into a common climate unit',
              'Inventories need a boundary, activity data, and a cited emission factor',
              'The Corporate Standard is the accounting rulebook; assurance is a separate engagement'
            ],
            task: 'List every GHG source you can see in a typical office + delivery fleet in 10 minutes, then tag each as likely Scope 1, 2, or 3.'
          },
          {
            id: 'ca-w1-l1',
            title: 'GHG Protocol Scoping: Operational vs Financial Control',
            type: 'video',
            duration: '22 mins',
            description: 'Learn how multinational corporations establish boundaries between equity share and operational control methods.',
            videoPlaceholder: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
            takeaways: [
              'Equity Share vs. Control Approach (Financial & Operational)',
              'Treatment of subsidiaries, joint ventures, and leased assets',
              'Consolidated carbon balance sheet boundary rules'
            ],
            task: 'Draft a 1-page boundary memo for a mid-market holding company with 3 subsidiaries.'
          },
          {
            id: 'ca-w1-l2',
            title: 'Stationary & Mobile Combustion Calculation',
            type: 'lab',
            duration: '35 mins',
            description: 'Extract diesel, petrol, and natural gas activity data and apply DEFRA emission factors.',
            takeaways: [
              'Activity data units: Litres, kWh, and Therms conversion',
              'Applying lower vs higher heating value emission factors',
              'Documenting calculation methodologies for auditor scrutiny'
            ],
            task: 'Launch the Scope 1 calculation sandbox and compute fleet emissions from raw fuel receipts.'
          },
          {
            id: 'ca-w1-l3',
            title: 'Scope 2 Dual Reporting: Location vs Market Based',
            type: 'reading',
            duration: '18 mins',
            description: 'Navigate the Scope 2 Guidance rules for Energy Attribute Certificates (EACs), GOs, and grid averages.',
            takeaways: [
              'Grid emission factors (eGrid, IEA sub-national factors)',
              'Residual mix vs. supplier-specific emissions factors',
              'Market-based accounting criteria checklist'
            ],
            task: 'Compare location-based vs market-based footprints for data center facilities across 3 regional grids.'
          },
          {
            id: 'ca-w1-quiz',
            title: 'Week 1 Knowledge Check: Scopes, Boundaries, and CO2e',
            type: 'assessment',
            duration: '15 mins',
            description: 'Four scored questions on GHG basics, operational control, dual Scope 2 reporting, and mobile combustion.',
            takeaways: [
              'You should be able to classify a source as Scope 1 or 2 without notes',
              'Dual reporting is not optional marketing'
            ],
            task: 'Submit the quiz. 70% is the pass mark for this module checkpoint.'
          }
        ]
      },
      {
        week: 2,
        title: 'Scope 3 Upstream & Downstream Footprinting',
        description: 'Audit supply chain data across purchased goods, freight, and business travel.',
        lessons: [
          {
            id: 'ca-w2-l1',
            title: 'Scope 3 Category 1: Spend-Based EEIO Modeling',
            type: 'reading',
            duration: '25 mins',
            description: 'Map general ledger procurement spend categories to environmentally extended input-output factors.',
            takeaways: [
              'Use-case constraints for spend-based estimation',
              'Deflating current currency spend to baseline economic years',
              'Transitioning top 20% suppliers to hybrid primary data'
            ],
            task: 'Classify 50 vendor procurement lines into proper Scope 3 categories.'
          },
          {
            id: 'ca-w2-l2',
            title: 'Business Travel, Freight & Commuting Models',
            type: 'lab',
            duration: '40 mins',
            description: 'Compute Scope 3 Category 6 and Category 7 emissions using distance and radiative forcing factors.',
            takeaways: [
              'Well-to-Wheel (WTW) vs Tank-to-Wheel emissions',
              'Applying flight class radiative forcing multipliers',
              'Employee hybrid commuting survey extrapolation'
            ],
            task: 'Calculate the corporate business travel emissions for 1,200 annual global flights.'
          },
          {
            id: 'ca-w2-l3',
            title: 'Supplier Primary Data Gathering & PCFs',
            type: 'video',
            duration: '30 mins',
            description: 'Deploy supplier carbon cascades, CDP supply chain workflows, and collect Product Carbon Footprints.',
            videoPlaceholder: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
            takeaways: [
              'Requesting certified Cradle-to-Gate supplier PCFs',
              'Validating third-party assurance declarations',
              'Allocation methods for shared supplier manufacturing lines'
            ],
            task: 'Design an automated supplier carbon disclosure scorecard for Tier-1 suppliers.'
          },
          {
            id: 'ca-w2-lab',
            title: 'Skill Lab: Build a Mini Inventory from Raw Activity Data',
            type: 'lab',
            duration: '45 mins',
            description: 'Use Meridian Cloud’s sample fuel, electricity, travel, and SaaS spend to produce Scope 1, dual Scope 2, and two Scope 3 lines with cited factors.',
            takeaways: [
              'Formula lineage matters more than a single headline tonne figure',
              'Separate well-to-tank from tank-to-wheel when the factor set requires it'
            ],
            task: 'Complete the calculation table in the lesson lab panel, then open Skill Labs for the longer sandbox.'
          }
        ]
      },
      {
        week: 3,
        title: 'Audit Workpapers, Assurance & Executive Delivery',
        description: 'Build ISAE 3000 assurance-ready workpapers and present to investment committees.',
        lessons: [
          {
            id: 'ca-w3-l1',
            title: 'ISAE 3000 Limited Assurance Preparation',
            type: 'reading',
            duration: '20 mins',
            description: 'What external auditors look for: audit trail traceability, uncertainty indices, and change logs.',
            takeaways: [
              'Materiality thresholds for carbon audits (typically 5%)',
              'Data quality pedigree scoring (Weidema matrix)',
              'Common red flags that delay auditor sign-off'
            ],
            task: 'Audit a sample carbon model for formula errors and undocumented factor assumptions.'
          },
          {
            id: 'ca-w3-l2',
            title: 'Capstone: Complete Enterprise Carbon Balance Sheet',
            type: 'project',
            duration: '120 mins',
            description: 'Finalize your end-to-end greenhouse gas inventory workbook for Meridian Cloud Logistics.',
            takeaways: [
              'Consolidated emissions summary table (Scope 1, 2, 3)',
              'Methodology notes and restatement policy clauses',
              'Audit readiness sign-off sheet'
            ],
            task: 'Submit your completed audit-ready workbook for live mentor review.'
          },
          {
            id: 'ca-w3-l3',
            title: 'Live Cohort Jury Review & Presentation',
            type: 'assessment',
            duration: '60 mins',
            description: 'Present your findings to Dr. Clara Vogel and defend your organizational boundary decisions.',
            takeaways: [
              'Executive delivery of carbon liability metrics',
              'Target reduction pathways (SBTi alignment)',
              'Final credential issuance evaluation'
            ],
            task: 'Participate in the live office hour critique and complete the peer review.'
          }
        ]
      }
    ]
  },
  {
    id: 'sprint-circular-design',
    title: 'Circular Product Design & LCA Modelling',
    slug: 'circular-product-design-lca-modelling',
    tagline: 'Engineer zero-waste products and run cradle-to-cradle Life Cycle Assessments.',
    track: 'Circular Economy',
    category: 'Circular Economy',
    level: 'Beginner',
    durationWeeks: 4,
    hoursPerWeek: 10,
    cohortStartDate: '2026-10-26',
    cohortSize: 20,
    enrolledCount: 16,
    price: 2499,
    mentorId: 'mentor-marcus-lind',
    mentorName: 'Marcus Lind',
    mentorRole: 'CSO & Co-Founder, LoopTech (Ex-Polestar)',
    rating: 4.95,
    reviewCount: 37,
    featured: true,
    popular: true,
    status: 'Admissions Open',
    skills: [
      'ISO 14040/44 Life Cycle Assessment',
      'OpenLCA / SimaPro Workflows',
      'Disassembly & Material Bill of Materials',
      'Design for Recyclability (DfR)',
      'Circular Business Models'
    ],
    labsCount: 5,
    description: 'Move beyond linear extract-use-dump systems. In this 4-week sprint, industrial designers and engineers model environmental impacts across complete lifecycles, replace high-impact polymers with bio-composites, and design take-back loops for consumer hardware.',
    learningOutcomes: [
      'Define functional units and system boundaries compliant with ISO 14040 standards',
      'Conduct comparative Life Cycle Assessments using OpenLCA and Ecoinvent inventories',
      'Design mechanical disassembly architectures requiring no specialized tooling',
      'Structure reverse logistics loops and Product-as-a-Service financial models',
      'Build cradle-to-cradle material passports for circular supply chains'
    ],
    curriculum: [
      {
        week: 1,
        title: 'LCA Scoping, Functional Units & System Boundaries',
        description: 'Set up ISO 14040 study parameters and benchmark existing product baselines.',
        lessons: [
          { id: 'cd-w1-l1', title: 'Cradle-to-Gate vs. Cradle-to-Grave Architecture', type: 'video', duration: '25 mins', description: 'Understanding boundary scoping and allocation.' },
          { id: 'cd-w1-l2', title: 'Functional Unit Definition Lab', type: 'lab', duration: '40 mins', description: 'Define the functional unit for 1,000 product cycles.' },
          { id: 'cd-w1-l3', title: 'Ecoinvent Inventory Mapping', type: 'reading', duration: '20 mins', description: 'Selecting appropriate background dataset matches.' },
          { id: 'cd-w1-quiz', title: 'Week 1 Quiz: Functional Units and Boundaries', type: 'assessment', duration: '12 mins', description: 'Check ISO 14040 scoping rules before you build an inventory.' }
        ]
      },
      {
        week: 2,
        title: 'Life Cycle Inventory & Impact Modeling',
        description: 'Quantify global warming potential, acidification, and abiotic depletion.',
        lessons: [
          { id: 'cd-w2-l1', title: 'ReCiPe vs CML Impact Characterization', type: 'reading', duration: '25 mins', description: 'Midpoint versus endpoint environmental trade-offs.' },
          { id: 'cd-w2-l2', title: 'Comparative Polymer LCA Sandbox', type: 'lab', duration: '50 mins', description: 'Virgin ABS vs 100% PCR Polycarbonate simulation.' }
        ]
      },
      {
        week: 3,
        title: 'Design for Disassembly & Circular Materials',
        description: 'Engineer modular fastener architectures and eliminate hazardous additives.',
        lessons: [
          { id: 'cd-w3-l1', title: 'Modular Architecture & Fastener Guidelines', type: 'video', duration: '30 mins', description: 'Snap-fits, mono-materials, and ultrasonic weld removal.' },
          { id: 'cd-w3-l2', title: 'Disassembly Time Indexing', type: 'lab', duration: '35 mins', description: 'Calculate disassembly times under standard recycling line conditions.' }
        ]
      },
      {
        week: 4,
        title: 'Reverse Logistics & Capstone Showcase',
        description: 'Design take-back schemes, residual asset recovery, and pitch to jury.',
        lessons: [
          { id: 'cd-w4-l1', title: 'Product-as-a-Service Reverse Logistics', type: 'reading', duration: '20 mins', description: 'Structuring deposit-return systems and refurbishment yields.' },
          { id: 'cd-w4-l2', title: 'Final Capstone Project Submission', type: 'project', duration: '120 mins', description: 'Submit comparative LCA and mechanical disassembly dossier.' },
          { id: 'cd-w4-l3', title: 'Cohort Defense & Certification', type: 'assessment', duration: '45 mins', description: 'Live project defense with Marcus Lind, plus a short circular-economy judgement quiz.' }
        ]
      }
    ]
  },
  {
    id: 'sprint-esg-csrd',
    title: 'ESG Reporting & CSRD Compliance for Enterprise',
    slug: 'esg-reporting-csrd-compliance-enterprise',
    tagline: 'Navigate the European Corporate Sustainability Due Diligence and ESRS standards.',
    track: 'ESG & Compliance',
    category: 'ESG',
    level: 'Intermediate',
    durationWeeks: 3,
    hoursPerWeek: 7,
    cohortStartDate: '2026-11-02',
    cohortSize: 28,
    enrolledCount: 22,
    price: 2999,
    mentorId: 'mentor-ananya-sen',
    mentorName: 'Ananya Sen',
    mentorRole: 'Global Head of ESG Reporting, Apex Group',
    rating: 4.88,
    reviewCount: 56,
    featured: true,
    popular: true,
    status: 'Admissions Open',
    skills: [
      'Double Materiality Assessment',
      'ESRS E1 to E5 Deep Dive',
      'EU Taxonomy Alignment (CAPEX/OPEX)',
      'Data Governance Architecture',
      'CSRD Assurance Filings'
    ],
    labsCount: 3,
    description: 'Learn the exact mechanisms enterprise compliance directors use to report under EU CSRD, GRI, and ISSB. Formulate double materiality matrices and map disclosures directly to verifiable data pipelines.',
    learningOutcomes: [
      'Conduct a compliant Double Materiality Assessment mapping impact and financial risk',
      'Interpret mandatory ESRS datapoints across Climate (E1) and Circular Economy (E5)',
      'Score corporate CAPEX and OPEX against EU Taxonomy technical screening criteria',
      'Establish internal controls over sustainability reporting (ICSR) for limited assurance'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Double Materiality Assessment in Practice',
        description: 'Impact materiality vs financial materiality identification.',
        lessons: [
          { id: 'esg-w1-l1', title: 'Threshold Formulation & Stakeholder Scoring', type: 'video', duration: '28 mins', description: 'Scale, scope, and irremediability scoring.' },
          { id: 'esg-w1-l2', title: 'Double Materiality Interactive Matrix', type: 'lab', duration: '45 mins', description: 'Live scoring tool sandbox.' },
          { id: 'esg-w1-quiz', title: 'Week 1 Quiz: Impact vs Financial Materiality', type: 'assessment', duration: '10 mins', description: 'Confirm how ESRS treats topics that are material on only one axis.' }
        ]
      },
      {
        week: 2,
        title: 'ESRS Standards & EU Taxonomy Scoring',
        description: 'Deep dive into ESRS E1 datapoints and DNSH screening.',
        lessons: [
          { id: 'esg-w2-l1', title: 'ESRS E1 Mandatory Datapoints & Phase-ins', type: 'reading', duration: '25 mins', description: 'Transition plans and internal carbon prices.' },
          { id: 'esg-w2-l2', title: 'EU Taxonomy KPI Alignment Lab', type: 'lab', duration: '40 mins', description: 'Screening turnover, CapEx, and OpEx against the green taxonomy.' }
        ]
      },
      {
        week: 3,
        title: 'Data Governance, XBRL & Audit Readiness',
        description: 'Digital reporting and auditor sign-off preparations.',
        lessons: [
          { id: 'esg-w3-l1', title: 'Digital XBRL Tagging & ICSR Controls', type: 'reading', duration: '20 mins', description: 'ESEF digital reporting architecture.' },
          { id: 'esg-w3-l2', title: 'Capstone: CSRD Reporting Dossier', type: 'project', duration: '90 mins', description: 'Final double materiality and ESRS disclosure pack.' },
          { id: 'esg-w3-quiz', title: 'Sprint Assessment: Taxonomy and Controls', type: 'assessment', duration: '12 mins', description: 'DNSH, safeguards, and why a green project can still fail alignment.' }
        ]
      }
    ]
  },
  {
    id: 'sprint-sustainable-supply-chains',
    title: 'Sustainable Supply Chains & Scope 3 Decarbonization',
    slug: 'sustainable-supply-chains-scope-3',
    tagline: 'Mobilize Tier-1 to Tier-N vendors, audit supplier data, and implement SBTi targets.',
    track: 'Supply Chain',
    category: 'Supply Chain',
    level: 'Advanced',
    durationWeeks: 4,
    hoursPerWeek: 8,
    cohortStartDate: '2026-11-16',
    cohortSize: 25,
    enrolledCount: 18,
    price: 3499,
    mentorId: 'mentor-sophie-dubois',
    mentorName: 'Sophie Dubois',
    mentorRole: 'Director of Sustainable Procurement, L’Horizon Bio',
    rating: 4.85,
    reviewCount: 31,
    featured: true,
    popular: false,
    status: 'Upcoming',
    skills: [
      'Supplier Primary Data Collection',
      'Supplier Carbon Cascades',
      'SBTi Supplier Engagement Targets',
      'Green Procurement Scorecards',
      'Incentive Contracts & Penalties'
    ],
    labsCount: 4,
    description: 'Over 80% of enterprise emissions originate in the supply chain. Learn to deploy supplier decarbonization programs, audit primary supplier emissions, and track actual emission reductions across global vendor networks.',
    learningOutcomes: [
      'Profile supply chains using EEIO spend heatmaps to target high-impact suppliers',
      'Onboard vendors to standardized carbon disclosure portals with minimal friction',
      'Integrate internal shadow carbon prices into RFPs and vendor master agreements',
      'Structure joint decarbonization capex programs with strategic tier-1 partners'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Supply Base Heatmapping & Spend Profiling',
        description: 'Pareto 80/20 critical supplier identification and geography risk.',
        lessons: [
          { id: 'sc-w1-l1', title: 'EEIO Spend Profiling & Supplier Segmentation', type: 'video', duration: '25 mins', description: 'Segmenting spend data.' },
          { id: 'sc-w1-l2', title: 'Supply Chain Risk Heatmap Lab', type: 'lab', duration: '35 mins', description: 'Mapping supplier grid carbon intensities.' },
          { id: 'sc-w1-quiz', title: 'Week 1 Quiz: Intensity vs Spend', type: 'assessment', duration: '10 mins', description: 'Why a small purchase can dominate Category 1 emissions.' }
        ]
      },
      {
        week: 2,
        title: 'Supplier Primary Data & Carbon Invoicing',
        description: 'Moving from secondary spend proxies to certified supplier primary data.',
        lessons: [
          { id: 'sc-w2-l1', title: 'CDP Supply Chain & Primary Data Workflows', type: 'reading', duration: '25 mins', description: 'Primary data quality protocols.' },
          { id: 'sc-w2-l2', title: 'Auditing Supplier Allocation Models', type: 'lab', duration: '40 mins', description: 'Detecting flawed product carbon allocations.' }
        ]
      },
      {
        week: 3,
        title: 'Contractual Green Clauses & Incentive Design',
        description: 'Embedding decarbonization covenants into standard procurement agreements.',
        lessons: [
          { id: 'sc-w3-l1', title: 'The Chancery Lane Project Green Clauses', type: 'reading', duration: '20 mins', description: 'Contractual carbon covenants.' },
          { id: 'sc-w3-l2', title: 'Procurement RFP Scorecard Construction', type: 'lab', duration: '45 mins', description: 'Building weighted green scoring algorithms.' }
        ]
      },
      {
        week: 4,
        title: 'Joint Decarbonization Capex & Capstone',
        description: 'Co-funding onsite renewables, energy audits, and program delivery.',
        lessons: [
          { id: 'sc-w4-l1', title: 'Shared Savings & Green PPA Procurement', type: 'video', duration: '30 mins', description: 'Multi-vendor buyer clubs.' },
          { id: 'sc-w4-l2', title: 'Capstone: Tier-1 Decarbonization Master Plan', type: 'project', duration: '110 mins', description: 'Complete supplier mobilization roadmap.' }
        ]
      }
    ]
  },
  {
    id: 'sprint-climate-risk',
    title: 'Climate Risk Fundamentals & TCFD Scenario Analysis',
    slug: 'climate-risk-fundamentals-tcfd-scenario-analysis',
    tagline: 'Quantify physical and transition climate risks under IPCC and NGFS scenarios.',
    track: 'Climate Risk',
    category: 'Climate',
    level: 'Intermediate',
    durationWeeks: 3,
    hoursPerWeek: 8,
    cohortStartDate: '2026-11-23',
    cohortSize: 22,
    enrolledCount: 14,
    price: 2499,
    mentorId: 'mentor-david-chen',
    mentorName: 'David Chen',
    mentorRole: 'CEO, CarbonTrace Analytics (Ex-BloombergNEF)',
    rating: 4.92,
    reviewCount: 26,
    featured: false,
    popular: false,
    status: 'Upcoming',
    skills: [
      'TCFD / IFRS S2 Disclosures',
      'NGFS Climate Scenario Modeling (1.5°C vs 3°C)',
      'Physical Asset Flood & Wildfire Scoring',
      'Transition Carbon Price Stress Testing',
      'Value-at-Risk (VaR) Financial Modeling'
    ],
    labsCount: 3,
    description: 'Help chief risk officers and financial analysts stress-test corporate balance sheets against severe physical perils and rapid carbon tax transitions using open-source climate scenario models.',
    learningOutcomes: [
      'Model physical risks (floods, extreme heat, sea level rise) for physical property portfolios',
      'Stress test cash flows against ₹9,000-₹22,500/tCO2 transition carbon prices',
      'Structure compliant TCFD and ISSB IFRS S2 governance and risk disclosures',
      'Calculate Climate Value-at-Risk (CVaR) for commercial investment assets'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Physical Risk Modeling & Geospatial Hazards',
        description: 'IPCC SSP scenarios and asset vulnerability assessments.',
        lessons: [
          { id: 'cr-w1-l1', title: 'Physical Risk Scenarios: SSP1-2.6 to SSP5-8.5', type: 'video', duration: '24 mins', description: 'Geospatial hazard mapping basics.' },
          { id: 'cr-w1-l2', title: 'Asset Exposure & Vulnerability Sandbox', type: 'lab', duration: '40 mins', description: 'Overlaying factory locations on flood maps.' },
          { id: 'cr-w1-quiz', title: 'Week 1 Quiz: Hazard, Exposure, Vulnerability', type: 'assessment', duration: '10 mins', description: 'Separate where an asset sits from how badly it fails.' }
        ]
      },
      {
        week: 2,
        title: 'Transition Risk & Carbon Price Stress Testing',
        description: 'NGFS orderly vs disorderly transition scenarios.',
        lessons: [
          { id: 'cr-w2-l1', title: 'NGFS Scenario Economics & Carbon Pricing', type: 'reading', duration: '22 mins', description: 'Evaluating margin compression under EU ETS expansion.' },
          { id: 'cr-w2-l2', title: 'Cash Flow Sensitivity Analysis Lab', type: 'lab', duration: '45 mins', description: 'Stress-testing operating income across 3 transition speeds.' }
        ]
      },
      {
        week: 3,
        title: 'Climate Value-at-Risk & Capstone Briefing',
        description: 'Financial materiality disclosures and board risk committee reports.',
        lessons: [
          { id: 'cr-w3-l1', title: 'IFRS S2 Governance Disclosures', type: 'reading', duration: '20 mins', description: 'Aligning risk metrics with statutory filings.' },
          { id: 'cr-w3-l2', title: 'Capstone: Corporate Climate Risk Assessment Dossier', type: 'project', duration: '90 mins', description: 'Comprehensive physical & transition vulnerability report.' },
          { id: 'cr-w3-quiz', title: 'Sprint Assessment: NGFS and IFRS S2', type: 'assessment', duration: '12 mins', description: 'Orderly vs disorderly transition and what boards must disclose.' }
        ]
      }
    ]
  },
  {
    id: 'sprint-renewable-microgrids',
    title: 'Industrial Decarbonization & Renewable Microgrids',
    slug: 'industrial-decarbonization-renewable-microgrids',
    tagline: 'Model onsite solar, battery storage (BESS), and corporate Power Purchase Agreements (PPAs).',
    track: 'Clean Energy',
    category: 'Climate',
    level: 'Intermediate',
    durationWeeks: 4,
    hoursPerWeek: 9,
    cohortStartDate: '2026-12-07',
    cohortSize: 20,
    enrolledCount: 12,
    price: 3299,
    mentorId: 'mentor-tariq-mansour',
    mentorName: 'Tariq Mansour, PhD',
    mentorRole: 'VP of Energy Infrastructure, Terragrid Solutions',
    rating: 4.93,
    reviewCount: 29,
    featured: false,
    popular: false,
    status: 'Upcoming',
    skills: [
      'PPA Financial Modeling',
      'HOMER Energy Simulation',
      'BESS Peak Shaving Economics',
      'Grid Interconnection Protocols',
      'Scope 2 Zero-Carbon Contracts'
    ],
    labsCount: 4,
    description: 'For facilities heads, energy procurement managers, and engineers aiming to eliminate factory emissions through behind-the-meter generation, load shifting, and virtual PPAs.',
    learningOutcomes: [
      'Model 15-minute interval power demand to identify peak demand shaving opportunities',
      'Size behind-the-meter Solar PV and BESS battery storage for industrial reliability',
      'Structure physical and virtual Power Purchase Agreements (vPPAs) to mitigate basis risk'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Load Profiling & Energy Efficiency Baseline',
        description: '15-minute demand analysis and waste heat recovery.',
        lessons: [
          { id: 'rm-w1-l1', title: 'Industrial Load Duration Curve Modeling', type: 'video', duration: '22 mins', description: 'Understanding demand charges.' },
          { id: 'rm-w1-l2', title: 'Energy Efficiency Auditing Lab', type: 'lab', duration: '35 mins', description: 'Evaluating motor and HVAC efficiency upgrades.' }
        ]
      },
      {
        week: 2,
        title: 'On-site Solar & BESS Dispatch Optimization',
        description: 'Solar irradiance and battery cycle life.',
        lessons: [
          { id: 'rm-w2-l1', title: 'Battery Storage (BESS) Degradation & Sizing', type: 'reading', duration: '25 mins', description: 'Peak shaving dispatch strategies.' }
        ]
      },
      {
        week: 3,
        title: 'Corporate Power Purchase Agreements (PPAs)',
        description: 'Contracts for Difference, guarantees of origin, and basis risk.',
        lessons: [
          { id: 'rm-w3-l1', title: 'Virtual vs Physical PPA Term Sheets', type: 'reading', duration: '30 mins', description: 'Financial risk hedging.' }
        ]
      },
      {
        week: 4,
        title: 'Microgrid Interconnection & Capstone Showcase',
        description: 'Final investment presentation for factory microgrid.',
        lessons: [
          { id: 'rm-w4-l1', title: 'Capstone: Industrial Microgrid Investment Memo', type: 'project', duration: '100 mins', description: 'Complete financial & carbon payback model.' }
        ]
      }
    ]
  },
  {
    id: 'sprint-climate-fintech',
    title: 'Climate FinTech & Green Bond Structuring',
    slug: 'climate-fintech-green-bond-structuring',
    tagline: 'Structure green bonds, sustainability-linked loans, and navigate carbon markets.',
    track: 'Sustainable Finance',
    category: 'Sustainability Strategy',
    level: 'Advanced',
    durationWeeks: 2,
    hoursPerWeek: 8,
    cohortStartDate: '2027-01-11',
    cohortSize: 22,
    enrolledCount: 15,
    price: 2999,
    mentorId: 'mentor-clara-vogel',
    mentorName: 'Dr. Clara Vogel',
    mentorRole: 'Managing Partner, Veridis Climate Capital',
    rating: 4.89,
    reviewCount: 22,
    featured: false,
    popular: false,
    status: 'Upcoming',
    skills: [
      'ICMA Green Bond Principles',
      'Sustainability-Linked Loan (SLL) KPIs',
      'Second-Party Opinion (SPO) Frameworks',
      'Voluntary Carbon Market Integrity (VCMI)',
      'Climate Risk Stress Testing (TCFD)'
    ],
    labsCount: 3,
    description: 'A 2-week intensive for investment analysts, treasury leads, and climate fintech product managers structuring compliant transition instruments and verifying fund flows.',
    learningOutcomes: [
      'Design ICMA-compliant Green Bond Frameworks with defined eligible green categories',
      'Calibrate Sustainability-Linked Loan margin step-up mechanics to SBTi targets',
      'Evaluate carbon credit integrity under the Core Carbon Principles (ICVCM)'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Use-of-Proceeds Bonds vs. KPI-Linked Debt',
        description: 'Green bond framework design and eligible project categories.',
        lessons: [
          { id: 'cf-w1-l1', title: 'ICMA Green Bond Principles Deep Dive', type: 'video', duration: '28 mins', description: 'Eligible categories and tracking proceeds.' },
          { id: 'cf-w1-l2', title: 'Structuring Step-up Coupon Mechanics', type: 'lab', duration: '40 mins', description: 'Financial modeling of coupon ratchets.' }
        ]
      },
      {
        week: 2,
        title: 'Carbon Credits, Integrity Ratings & Assurance',
        description: 'Article 6 mechanics, removal vs avoidance, and final bond prospectus.',
        lessons: [
          { id: 'cf-w2-l1', title: 'High-Permanence CDR vs Avoidance Credits', type: 'reading', duration: '25 mins', description: 'VCMI integrity code guidelines.' },
          { id: 'cf-w2-l2', title: 'Capstone: Green Bond Framework & Term Sheet', type: 'project', duration: '90 mins', description: 'Complete framework ready for SPO auditor evaluation.' }
        ]
      }
    ]
  }
]
