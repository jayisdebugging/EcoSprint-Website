/**
 * Centralized mock data: Projects
 * Real-world capstone briefs and hands-on deliverables.
 */

export const PROJECTS = [
  {
    id: 'proj-scope123-audit',
    title: 'Enterprise Scope 1-3 Carbon Inventory & Audit Model',
    sprintId: 'sprint-carbon-accounting',
    sprintTitle: 'Corporate Carbon Accounting & GHG Protocol',
    difficulty: 'Intermediate',
    estimatedHours: 20,
    status: 'In Progress',
    progress: 75,
    rubricScore: 94,
    dueDate: '2026-10-28',
    clientScenario: 'Meridian Cloud Logistics (Mid-market SaaS & Fleet operation with 1,200 employees across Europe and North America)',
    learningObjectives: [
      'Structure a multi-facility organizational consolidation boundary under the GHG Protocol',
      'Compute direct stationary and mobile fleet emissions using DEFRA and IPCC conversion factors',
      'Model dual location-based and market-based Scope 2 figures across regional electricity grids',
      'Perform spend-based and hybrid supplier calculations for Scope 3 Categories 1, 4, and 6',
      'Assemble an audit-ready ISAE 3000 assurance workpaper bundle with complete formula traceability'
    ],
    requirements: [
      'Document boundary classification rationale (Equity share vs Operational control)',
      'Include clear formula lineage from raw utility bills to final tCO2e summaries',
      'Apply appropriate uncertainty ranges and data quality pedigree scores (1 to 5)',
      'Include executive summary slide deck (5 slides) outlining top 3 reduction opportunities'
    ],
    resources: [
      { name: 'Meridian_Raw_Utility_Data_2025.xlsx', size: '2.4 MB', type: 'Spreadsheet' },
      { name: 'DEFRA_GHG_Conversion_Factors_2025.pdf', size: '1.1 MB', type: 'Reference Doc' },
      { name: 'ISAE_3000_Carbon_Audit_Workpaper_Template.xlsx', size: '850 KB', type: 'Starter Template' }
    ],
    deliverables: [
      'Operational boundary classification memo & facility list',
      'Scope 1 fleet combustion calculation with DEFRA factors',
      'Scope 2 market vs. location-based dual report with REC certificates',
      'Scope 3 Category 1 (SaaS servers) and Category 6 (Travel) model',
      'Audit readiness assurance pack (ISAE 3000 formatted)'
    ],
    skillsDemonstrated: [
      'GHG Protocol Corporate Standard',
      'Scope 1-3 Boundary Setting',
      'Emission Factor Calculation',
      'Carbon Audit Workpapers'
    ],
    auditorFeedback: {
      auditor: 'Dr. Clara Vogel',
      reviewDate: '2026-10-22',
      rating: 94,
      strengths: 'Excellent boundary documentation and transparent treatment of leased vehicle fleet fuel cards.',
      improvementAreas: 'Double-check residual mix emissions factor citation on German facility Scope 2 calculations.'
    }
  },
  {
    id: 'proj-lca-packaging',
    title: 'Cradle-to-Cradle Packaging Redesign & Comparative LCA',
    sprintId: 'sprint-circular-design',
    sprintTitle: 'Circular Product Design & LCA Modelling',
    difficulty: 'Advanced',
    estimatedHours: 25,
    status: 'Upcoming',
    progress: 0,
    rubricScore: null,
    dueDate: '2026-11-20',
    clientScenario: 'Nordic Personal Care Brands (Elimination of multi-laminate PET/Aluminium pouches for shampoo products)',
    learningObjectives: [
      'Define functional units and system boundaries compliant with ISO 14040/44 standards',
      'Construct a complete Life Cycle Inventory (LCI) in OpenLCA using Ecoinvent data',
      'Quantify Global Warming Potential (GWP), acidification, and freshwater eutrophication',
      'Design a mono-material refill architecture with mechanical disassembly guidelines',
      'Formulate a circular business model based on a closed-loop deposit return system'
    ],
    requirements: [
      'Comparative LCA between baseline multi-layer pouch and proposed mono-material refill',
      'Bill of Materials (BOM) detailing polymer grades and additive chemistry',
      'Disassembly sequence diagram requiring zero specialized cutting tools',
      'Cost-benefit payback model for customer return incentives'
    ],
    resources: [
      { name: 'NordicCare_Packaging_BOM_Baseline.csv', size: '420 KB', type: 'Data Sheet' },
      { name: 'ISO_14044_LCA_Report_Template.docx', size: '1.2 MB', type: 'Starter Template' }
    ],
    deliverables: [
      'System boundary definition & functional unit definition (1,000 units dispensed)',
      'Life Cycle Inventory (LCI) data sheet in OpenLCA',
      'GWP, acidification, and freshwater eutrophication comparison charts',
      'Design for Recyclability (DfR) mechanical disassembly diagram',
      'Circular business model proposal (Deposit Return System)'
    ],
    skillsDemonstrated: [
      'ISO 14040/44 Life Cycle Assessment',
      'Design for Recyclability (DfR)',
      'Disassembly & Material Bill of Materials',
      'Circular Business Models'
    ]
  },
  {
    id: 'proj-csrd-materiality',
    title: 'CSRD Double Materiality Assessment & ESRS Disclosure Matrix',
    sprintId: 'sprint-esg-csrd',
    sprintTitle: 'ESG Reporting & CSRD Compliance for Enterprise',
    difficulty: 'Intermediate',
    estimatedHours: 18,
    status: 'Completed',
    progress: 100,
    rubricScore: 96,
    dueDate: '2026-09-15',
    clientScenario: 'Helios Advanced Materials SE (Enterprise manufacturer with ₹2,250 Crore turnover subject to CSRD Wave 1)',
    learningObjectives: [
      'Conduct a compliant Double Materiality Assessment identifying both impact and financial materiality',
      'Map identified material impacts to ESRS topical standards (E1 to E5, S1 to S4, G1)',
      'Score corporate CapEx and OpEx against EU Taxonomy technical screening criteria',
      'Structure internal controls over sustainability reporting (ICSR) for limited assurance audit'
    ],
    requirements: [
      'Complete stakeholder prioritization matrix with quantitative scoring',
      'Double materiality heatmap with clear materiality thresholds defined',
      'Draft disclosures for mandatory ESRS E1 datapoints including gross Scope 1-3 targets',
      'EU Taxonomy alignment model with CapEx plan documentation'
    ],
    resources: [
      { name: 'Helios_SE_Stakeholder_Survey_Data.xlsx', size: '1.8 MB', type: 'Survey Data' },
      { name: 'EFRAG_Double_Materiality_Guidelines.pdf', size: '2.1 MB', type: 'Guidance' }
    ],
    deliverables: [
      'Stakeholder engagement heat map & priority rankings',
      'Impact Materiality score matrix (Scale, Scope, Irremediability)',
      'Financial Materiality score matrix (Risks, Opportunities, Financial impact)',
      'ESRS E1 (Climate change) mandatory datapoints draft',
      'EU Taxonomy CapEx eligibility calculation workbook'
    ],
    skillsDemonstrated: [
      'Double Materiality Assessment',
      'ESRS E1 to E5 Deep Dive',
      'EU Taxonomy Alignment',
      'CSRD Assurance Filings'
    ],
    auditorFeedback: {
      auditor: 'Ananya Sen',
      reviewDate: '2026-09-18',
      rating: 96,
      strengths: 'Outstanding stakeholder threshold methodology and clear linkage between ESRS E1 transition risks and EU Taxonomy CapEx plans.',
      improvementAreas: 'Consider expanding supply chain human rights assessment under ESRS S2.'
    }
  },
  {
    id: 'proj-supply-chain-roadmap',
    title: 'Tier-1 Supplier Decarbonization Roadmap & Carbon Clauses',
    sprintId: 'sprint-sustainable-supply-chains',
    sprintTitle: 'Sustainable Supply Chains & Scope 3 Decarbonization',
    difficulty: 'Advanced',
    estimatedHours: 22,
    status: 'Completed',
    progress: 100,
    rubricScore: 91,
    dueDate: '2026-07-20',
    clientScenario: 'Apex Consumer Goods Group (350 contract manufacturers across Southeast Asia and Eastern Europe)',
    learningObjectives: [
      'Analyze general ledger spend with EEIO factors to prioritize high-emitting vendors',
      'Draft standardized supplier carbon disclosure requirements and verification checks',
      'Author contractual green clauses and shared-savings decarbonization incentives'
    ],
    requirements: [
      'Pareto 80/20 critical supplier identification matrix',
      'Standardized carbon questionnaire compliant with CDP Supply Chain',
      'Master Services Agreement (MSA) green clause addendum'
    ],
    resources: [
      { name: 'Spend_Data_Classification_Template.xlsx', size: '1.4 MB', type: 'Data Sheet' }
    ],
    deliverables: [
      'Supply chain carbon risk heatmap',
      'Supplier engagement playbook & tiering matrix',
      'Draft green contractual clauses addendum'
    ],
    skillsDemonstrated: [
      'Supplier Primary Data Collection',
      'SBTi Supplier Engagement Targets',
      'Green Procurement Scorecards'
    ]
  }
]
