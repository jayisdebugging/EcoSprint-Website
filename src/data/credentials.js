/**
 * Centralized mock data: Credentials
 * Industry-recognized digital credentials and verifiable skill badges.
 */

export const CREDENTIALS = [
  {
    id: 'cred-csrd-practitioner',
    title: 'Certified CSRD & Double Materiality Practitioner',
    recipientName: 'Alex Rivera',
    issuedDate: '2026-09-18',
    credentialId: 'ECO-CSRD-2026-00124',
    verificationHash: '0x7e8b9f4a2c1d0092bf3d71201ac9e554b3914a29ef10c',
    status: 'Verified',
    sprintId: 'sprint-esg-csrd',
    sprintTitle: 'ESG Reporting & CSRD Compliance for Enterprise',
    grade: 'Exemplary (96%)',
    skills: [
      'Double Materiality Assessment',
      'ESRS E1 to E5 Standards',
      'EU Taxonomy CapEx Alignment',
      'Limited Assurance Readiness'
    ],
    issuingMentor: 'Ananya Sen (Apex Advisory)',
    credentialType: 'Professional Cohort Certificate',
    expiryDate: 'Perpetual',
    description: 'Conferred upon successful completion of the 3-week intensive sprint and submission of a reviewed enterprise double materiality and ESRS disclosure dossier.'
  },
  {
    id: 'cred-supply-chain-specialist',
    title: 'Sustainable Supply Chains & Scope 3 Specialist',
    recipientName: 'Alex Rivera',
    issuedDate: '2026-07-25',
    credentialId: 'ECO-SC-2026-00089',
    verificationHash: '0x4a12bd983c07fef8a31e843b09224190c42177b819a0',
    status: 'Verified',
    sprintId: 'sprint-sustainable-supply-chains',
    sprintTitle: 'Sustainable Supply Chains & Scope 3 Decarbonization',
    grade: 'Honors (91%)',
    skills: [
      'Supplier Primary Data Collection',
      'SBTi Supplier Engagement Targets',
      'Green Procurement Scorecards',
      'Scope 3 Upstream Modeling'
    ],
    issuingMentor: 'Sophie Dubois (Horizon Global)',
    credentialType: 'Professional Cohort Certificate',
    expiryDate: 'Perpetual',
    description: 'Demonstrated competency in deploying supplier carbon cascades, analyzing spend-based EEIO data, and drafting contractual green clauses.'
  },
  {
    id: 'cred-circular-foundation',
    title: 'Cradle-to-Cradle & Circular Design Specialist',
    recipientName: 'Alex Rivera',
    issuedDate: '2026-05-14',
    credentialId: 'ECO-CIRC-2026-00042',
    verificationHash: '0x3c990a1f28be00938b812f86ac33190e2190bb1092a4',
    status: 'Verified',
    sprintId: 'sprint-circular-design',
    sprintTitle: 'Circular Product Design & LCA Modelling',
    grade: 'Passed (92%)',
    skills: [
      'ISO 14040/44 Life Cycle Assessment',
      'Design for Recyclability (DfR)',
      'Circular Business Models',
      'OpenLCA Inventory Modeling'
    ],
    issuingMentor: 'Marcus Lind (LoopTech Solutions)',
    credentialType: 'Professional Cohort Certificate',
    expiryDate: 'Perpetual',
    description: 'Validated ability to execute cradle-to-grave comparative LCAs, build mechanical disassembly diagrams, and model closed-loop take-back economics.'
  }
]
