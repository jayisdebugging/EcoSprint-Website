/**
 * Centralized mock data: Jobs & Career Network
 * Fictional sustainability opportunities and employer profiles.
 */

export const JOBS = [
  {
    id: 'job-carbon-analyst',
    title: 'Senior Carbon Accounting Analyst',
    company: 'Verdant Dynamics',
    companyDescription: 'A fictional clean mobility and battery technology producer engineering low-carbon battery cell architectures.',
    location: 'Bengaluru, India',
    locationType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Mid-Senior',
    salary: '₹18,50,000 – ₹24,00,000 / yr',
    postedDaysAgo: 2,
    department: 'Corporate Decarbonization',
    description: 'Lead Scope 1-3 greenhouse gas emissions accounting across complex battery component manufacturing. You will coordinate with raw material suppliers to build primary carbon data models and prepare ISAE 3000 audit workpapers.',
    responsibilities: [
      'Perform monthly Scope 1 and Scope 2 emissions reconciliations across 4 European manufacturing sites',
      'Lead supplier engagement for Scope 3 Category 1 (Purchased Goods) to transition from spend-based estimates to supplier PCFs',
      'Maintain corporate carbon inventory models and liaise directly with third-party verification auditors',
      'Collaborate with procurement teams to integrate internal shadow carbon pricing into raw material tenders'
    ],
    requirements: [
      'Demonstrated experience with GHG Protocol Corporate Standard and Scope 3 Guidance',
      'Proficiency in life cycle assessment (LCA) principles or carbon modeling in Excel / Python',
      'Hands-on experience preparing audit-ready workpapers for limited assurance',
      'Strong cross-functional stakeholder communication'
    ],
    requiredSkills: ['GHG Protocol', 'Scope 1-3 Boundary Setting', 'Carbon Audit Workpapers', 'Emission Factor Calculation'],
    matchedSkills: ['GHG Protocol', 'Scope 1-3 Boundary Setting', 'Carbon Audit Workpapers'],
    matchPercentage: 94,
    hiringManager: 'Henrik Vang (Director of Decarbonization)',
    featured: true
  },
  {
    id: 'job-esg-controller',
    title: 'ESG Reporting Controller (CSRD Lead)',
    company: 'Apex BioPackaging SE',
    companyDescription: 'A fictional circular consumer packaging enterprise transitioning multinational FMCG brands away from single-use plastics.',
    location: 'Mumbai, India',
    locationType: 'Remote-friendly',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salary: '₹22,00,000 – ₹28,00,000 / yr',
    postedDaysAgo: 4,
    department: 'Finance & Regulatory Compliance',
    description: 'Direct the Double Materiality Assessment and ESRS reporting data pipelines under the EU CSRD. You will bridge sustainability data systems with enterprise financial controls.',
    responsibilities: [
      'Orchestrate the annual double materiality assessment with internal stakeholders and external advisory panels',
      'Manage datapoint disclosure mapping across ESRS E1 (Climate) through ESRS E5 (Circular Economy)',
      'Calculate EU Taxonomy KPIs including CapEx, OpEx, and Turnover green eligibility and alignment',
      'Establish internal controls over sustainability reporting (ICSR) for statutory auditor verification'
    ],
    requirements: [
      'In-depth knowledge of ESRS standards, GRI, and EU Taxonomy regulation',
      'Background in corporate finance, audit, or enterprise sustainability compliance',
      'Experience managing external assurance audits (Big 4 or accredited verifiers)'
    ],
    requiredSkills: ['Double Materiality Assessment', 'ESRS E1 to E5 Deep Dive', 'EU Taxonomy Alignment', 'CSRD Assurance Filings'],
    matchedSkills: ['Double Materiality Assessment', 'ESRS E1 to E5 Deep Dive'],
    matchPercentage: 88,
    hiringManager: 'Maria Becker (VP Sustainability Finance)',
    featured: true
  },
  {
    id: 'job-circular-engineer',
    title: 'Circular Materials & LCA Engineer',
    company: 'PureLoop Materials Inc.',
    companyDescription: 'A fictional materials science startup engineering high-performance bio-composites and closed-loop consumer hardware.',
    location: 'Pune, India',
    locationType: 'On-site',
    type: 'Full-time',
    experienceLevel: 'Mid-Level',
    salary: '₹15,00,000 – ₹19,50,000 / yr',
    postedDaysAgo: 5,
    department: 'Product Innovation',
    description: 'Design closed-loop recycling systems and run ISO 14044-compliant comparative LCAs on novel bio-based polymers and modular hardware.',
    responsibilities: [
      'Execute cradle-to-grave comparative Life Cycle Assessments in OpenLCA / SimaPro',
      'Partner with mechanical engineers to implement Design for Recyclability (DfR) and modular fastener standards',
      'Establish take-back logistics workflows and calculate refurbishment yields for subscription products',
      'Author environmental product declarations (EPDs) and verify third-party certifications'
    ],
    requirements: [
      'Mastery of ISO 14040/44 LCA methodologies and background inventories (Ecoinvent)',
      'Familiarity with disassembly architectures and mono-material engineering',
      'Passion for zero-waste systems and industrial circular economy transition'
    ],
    requiredSkills: ['ISO 14040/44 Life Cycle Assessment', 'Design for Recyclability (DfR)', 'Circular Business Models', 'OpenLCA'],
    matchedSkills: ['ISO 14040/44 Life Cycle Assessment', 'Design for Recyclability (DfR)'],
    matchPercentage: 92,
    hiringManager: 'Lukas Meier (Head of Circularity)',
    featured: true
  },
  {
    id: 'job-ppa-manager',
    title: 'Renewable PPA & Clean Energy Manager',
    company: 'TerraGrid Data Centers',
    companyDescription: 'A fictional infrastructure operator powering high-performance computing facilities with 100% renewable energy.',
    location: 'Hyderabad, India',
    locationType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salary: '₹20,00,000 – ₹26,00,000 / yr',
    postedDaysAgo: 7,
    department: 'Energy Infrastructure',
    description: 'Originate and negotiate physical and virtual Power Purchase Agreements (PPAs) to achieve hourly 24/7 carbon-free energy matching across enterprise data center assets.',
    responsibilities: [
      'Evaluate prospective utility-scale solar and wind PPA contract structures across European wholesale power markets',
      'Model 15-minute generation profiles against facility load duration curves to eliminate basis risk',
      'Manage guarantees of origin (GOs) and hourly energy attribute certificate accounting',
      'Coordinate behind-the-meter battery energy storage (BESS) dispatch for peak demand curtailment'
    ],
    requirements: [
      'Deep understanding of corporate PPA structuring, contracts for difference, and merchant risk',
      'Quantitative financial modeling capabilities in power markets',
      'Knowledge of Scope 2 market-based accounting rules'
    ],
    requiredSkills: ['PPA Financial Modeling', 'BESS Peak Shaving Economics', 'Scope 2 Zero-Carbon Contracts'],
    matchedSkills: ['Scope 2 Zero-Carbon Contracts'],
    matchPercentage: 78,
    hiringManager: 'Sarah Jenkins (Director of Renewable Procurement)',
    featured: false
  },
  {
    id: 'job-scope3-lead',
    title: 'Sustainable Procurement Lead (Scope 3)',
    company: 'Helio Logistics Global',
    companyDescription: 'A fictional international multimodal freight and freight-forwarding company optimizing supply chain decarbonization.',
    location: 'Delhi NCR, India',
    locationType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Mid-Senior',
    salary: '₹17,00,000 – ₹22,50,000 / yr',
    postedDaysAgo: 8,
    department: 'Global Sourcing & ESG',
    description: 'Engage top Tier-1 to Tier-3 transport subcontractors and fleet partners to collect verified primary carbon data and execute contractual decarbonization covenants.',
    responsibilities: [
      'Deploy supplier carbon cascades across 300+ freight and equipment vendors',
      'Audit supplier-submitted primary emissions factors and allocation methodologies',
      'Incorporate green procurement scorecards into quarterly vendor business reviews (QBRs)',
      'Track joint capex electrification investments and verify fleet transition progress'
    ],
    requirements: [
      'Track record in procurement sustainability or Scope 3 supplier engagement',
      'Familiarity with SBTi supplier engagement targets and CDP supply chain workflows',
      'Skilled negotiator with contract clause structuring experience'
    ],
    requiredSkills: ['Supplier Primary Data Collection', 'SBTi Supplier Engagement Targets', 'Green Procurement Scorecards'],
    matchedSkills: ['Supplier Primary Data Collection', 'Green Procurement Scorecards'],
    matchPercentage: 86,
    hiringManager: 'James Thornton (Head of Sourcing)',
    featured: false
  }
]
