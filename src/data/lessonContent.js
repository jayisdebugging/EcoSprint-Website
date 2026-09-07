/**
 * Structured educational content merged onto catalog lessons by id.
 * Used by the Sprint Room UI and by the API seed.
 */

import { LESSON_LEARNING_RESOURCES } from './learningResources.js'

const quiz = (title, questions) => ({
  title,
  passingScore: 70,
  questions
})

export const LESSON_CONTENT = {
  'ca-w1-l0': {
    notes: `Greenhouse gases (GHGs) trap infrared radiation in the atmosphere. The Kyoto basket used in corporate inventories is carbon dioxide (CO2), methane (CH4), nitrous oxide (N2O), hydrofluorocarbons (HFCs), perfluorocarbons (PFCs), sulphur hexafluoride (SF6), and nitrogen trifluoride (NF3).

Each gas is converted to carbon dioxide equivalent (CO2e) using Global Warming Potentials (GWPs). Corporate inventories typically use IPCC AR5 or AR6 100-year GWPs so that 1 tCH4 is not compared 1:1 with 1 tCO2.

A corporate GHG inventory answers four questions:
1. Who is inside the organizational boundary?
2. Which emission sources exist (stationary combustion, purchased electricity, purchased goods, etc.)?
3. What activity data do we have (kWh, litres of diesel, $ spend)?
4. Which emission factor converts activity into tCO2e?

The GHG Protocol Corporate Standard is the global accounting rulebook. ISO 14064-1 is the related management-system standard. Assurance is commonly performed under ISAE 3000 or ISO 14064-3.`,
    practicalExample: `Worked example â€” methane vs CO2: A landfill emits 12 tCH4 in a year. Using AR5 GWP100 of 28, that is 12 Ã— 28 = 336 tCO2e. Reporting only â€œ12 tonnes of gasâ€ would understate climate impact by an order of magnitude.`,
    resources: [
      { name: 'GHG Protocol Corporate Standard (overview notes)', type: 'Reading' },
      { name: 'IPCC GWP table (AR5/AR6 comparison)', type: 'Reference' }
    ]
  },
  'ca-w1-l1': {
    notes: `Organizational boundaries decide which legal entities you count. Three consolidation approaches exist:

â€¢ Equity share: report a percentage of emissions equal to your ownership percentage.
â€¢ Financial control: 100% of entities you control financially (typical for listed groups).
â€¢ Operational control: 100% of entities whose operating policies you dictate (common for operators of leased assets).

Leased buildings and vehicles are a frequent error. Under operational control, a company that operates a leased warehouse usually reports its energy as Scope 1/2 of the lessee, not the landlord. Under a financial-control approach the answer can differ if the lease is classified as operating vs finance.

Joint ventures require a written boundary memo. If you own 40% with no operational control, equity share reports 40%; operational control reports 0% for you and 100% for the operator.`,
    practicalExample: `Holding Co owns 100% of FleetCo, 51% of Warehouse JV (and appoints the plant manager), and 30% of a silent solar SPV. Operational control: 100% FleetCo + 100% Warehouse JV + 0% SPV. Equity share: 100% + 51% + 30%. Pick one method and apply it consistently across the group.`
  },
  'ca-w1-l2': {
    notes: `Scope 1 is direct combustion and process emissions you own or control.

Stationary combustion: natural gas, fuel oil, biomass boilers. Convert physical units to energy, then apply a factor:
  tCO2e = fuel quantity Ã— net calorific value Ã— emission factor
  or, when the factor is already in kgCO2e per litre: litres Ã— factor / 1000.

Mobile combustion: diesel and petrol fleet. Keep litre receipts, not kilometres, when possible. Distance-based factors (kgCO2e/km) are a fallback when fuel cards are missing.

Fugitive emissions: refrigerant leaks (HFCs). Use the simplified mass-balance: opening stock + purchases âˆ’ closing stock âˆ’ recovered = charge released.

Document the factor source (DEFRA, EPA, IPCC), year, and whether it is CO2 only or CO2e (including CH4 and N2O from combustion).`,
    practicalExample: `Fleet diesel: 48,000 litres Ã— 2.512 kgCO2e/litre (DEFRA 2025 WTW example) = 120,576 kg = 120.6 tCO2e. Record the factor ID and whether well-to-tank is in Scope 3 Category 3 instead of Scope 1.`
  },
  'ca-w1-l3': {
    notes: `Scope 2 is purchased electricity, heat, steam, and cooling.

Location-based: grid average factor for the region (IEA, eGRID, national residual mix). It shows physical grid intensity.

Market-based: contractual instruments â€” supplier-specific tariffs, unbundled EACs/RECs/GOs, or residual mix when you have no contracts.

GHG Protocol Scope 2 Guidance requires dual reporting. You cannot hide a coal-heavy location-based total behind a REC purchase without also showing location-based.

Quality criteria for market-based claims: vintage matching, geography matching, exclusive claims, and no double counting in residual mix.`,
    practicalExample: `Data centre uses 2,500 MWh. Location-based Ireland ~0.29 tCO2e/MWh â†’ 725 tCO2e. Market-based with 100% Guarantees of Origin (near-zero residual for the contracted volume) â†’ ~0 tCO2e market-based, but location-based remains 725 tCO2e in the dual table.`
  },
  'ca-w1-quiz': {
    notes: `This knowledge check covers GHG gases, organizational boundaries, and Scope 1 vs 2. You need 70% to mark the module complete in the presentation flow. Explanations appear after you submit.`,
    quiz: quiz('Week 1 â€” GHG basics, boundaries, and Scopes 1â€“2', [
      {
        id: 'caq1',
        prompt: 'Which statement best describes CO2e?',
        options: [
          'Only carbon dioxide counted in metric tonnes',
          'A common unit that converts other GHGs using GWPs',
          'A market price of carbon allowances',
          'Electricity purchased from the grid'
        ],
        answer: 1,
        explanation: 'CO2e uses Global Warming Potentials so methane, N2O and F-gases can be summed with CO2.'
      },
      {
        id: 'caq2',
        prompt: 'A company operates a leased warehouse and pays the gas bill. Under operational control, the gas is typically:',
        options: [
          'Scope 3 of the tenant',
          'Scope 1 of the tenant',
          'Never reported',
          'Only the landlordâ€™s Scope 1'
        ],
        answer: 1,
        explanation: 'Operational control usually places fuel the operator combusts in the operatorâ€™s Scope 1.'
      },
      {
        id: 'caq3',
        prompt: 'Scope 2 dual reporting means you must report:',
        options: [
          'Only market-based if you bought RECs',
          'Location-based and market-based electricity totals',
          'Scope 1 twice',
          'Only location-based in Europe'
        ],
        answer: 1,
        explanation: 'The Scope 2 Guidance requires both location-based and market-based methods.'
      },
      {
        id: 'caq4',
        prompt: 'Diesel burned in company-owned delivery vans is:',
        options: [
          'Scope 3 Category 4',
          'Scope 2',
          'Scope 1 mobile combustion',
          'Outside the inventory'
        ],
        answer: 2,
        explanation: 'Fuel combusted in assets you own or control is Scope 1.'
      }
    ])
  },
  'ca-w2-l1': {
    notes: `Scope 3 Category 1 (purchased goods and services) is usually the largest corporate number.

Spend-based method: map general-ledger accounts to environmentally extended input-output (EEIO) factors (kgCO2e per $ or â‚¹ of spend in a sector). Fast, high uncertainty.

Average-data method: physical quantities Ã— industry-average factors (kg steel Ã— tCO2e/t steel).

Supplier-specific: product carbon footprints (PCFs) from vendors with allocation documentation.

Best practice: spend-based for the long tail; hybrid or primary data for the top ~20% of spend that often drives ~80% of Category 1 emissions.`,
    practicalExample: `â‚¹4.2 crore of cloud hosting spend Ã— EEIO factor 0.18 kgCO2e/â‚¹ (illustrative) = 756 tCO2e. After collecting a supplier PCF of 410 tCO2e for the same services, replace the EEIO line and document the restatement.`
  },
  'ca-w2-l2': {
    notes: `Category 4 (upstream transport) and Category 9 (downstream transport) use tonne-kilometres Ã— mode factors (road, sea, air, rail).

Category 6 (business travel): distance Ã— cabin class Ã— radiative-forcing multiplier for aviation when your policy includes it. State the policy.

Category 7 (commuting): survey a sample, then extrapolate. Hybrid/WFH days materially change the total.

Well-to-tank (WTT) fuel-cycle emissions for purchased fuels sit in Category 3, not in Scope 1.`,
    practicalExample: `1,200 long-haul economy flights averaging 6,800 km. DEFRA factor ~0.15 kgCO2e/pkm (illustrative, with RF) â†’ 1,200 Ã— 6,800 Ã— 0.15 / 1000 = 1,224 tCO2e.`
  },
  'ca-w2-l3': {
    notes: `Primary data quality beats EEIO once suppliers can allocate plant emissions to your SKUs.

Ask for: reporting year, organizational vs product boundary, allocation method (physical, economic, energy), third-party assurance, and whether biogenic CO2 is separated.

Reject PCFs that cannot explain allocation. A plant that makes 40 products cannot give you â€œour total Scope 1 divided by 40â€ without mass or revenue keys.`
  },
  'ca-w2-lab': {
    notes: `Lab brief â€” Meridian Cloud sample year:
â€¢ Natural gas 1.8 GWh (building heat)
â€¢ Fleet diesel 48,000 L
â€¢ Purchased electricity 2,500 MWh (Ireland)
â€¢ Air travel 1,200 long-haul economy segments
â€¢ Cloud/SaaS spend mapped to EEIO

Build a three-row Scope 1, dual Scope 2, and two Scope 3 lines. Show formulae, factor sources, and a 5% materiality comment.`,
    practicalExample: `Scope 1 gas: 1.8 GWh Ã— 3.6 = 6,480 GJ. Using ~56.1 tCO2e/TJ (illustrative natural gas) â†’ 6.48 TJ Ã— 56.1 â‰ˆ 364 tCO2e. Add fleet 120.6 tCO2e. Dual Scope 2 as in Week 1. Scope 3 travel + SaaS as above.`
  },
  'ca-w3-l1': {
    notes: `ISAE 3000 limited assurance looks for: complete boundary, consistent methods, traceable activity data, named factors, uncertainty discussion, and a change log.

Materiality is often 5% of the inventory total, but qualitative issues (missing a whole factory) can fail assurance even if the tonnes are small.

Pedigree scores (reliability, completeness, temporal/geographic/technological correlation) belong next to each line, not in a slide footnote.`
  },
  'ca-w3-l2': {
    notes: `Capstone â€” assemble the Meridian Cloud carbon balance sheet:
1. Boundary memo (operational control, entities in/out)
2. Scope 1 stationary + mobile + refrigerants
3. Scope 2 dual table
4. Scope 3 Categories 1, 3, 6 (minimum)
5. Executive 5-slide pack: total tCO2e, hotspots, three abatement actions with order-of-magnitude reductions
6. Assurance checklist signed by you as preparer`
  },
  'ca-w3-l3': {
    notes: `Defend three decisions: consolidation method, market-based instruments, and the largest Scope 3 estimate. A good defence cites the Protocol clause, shows the alternative you rejected, and states residual uncertainty.`,
    quiz: quiz('Sprint assessment â€” carbon accounting judgement', [
      {
        id: 'caq5',
        prompt: 'If a REC is purchased for a US plant but generation is in another grid with no residual-mix adjustment, the main risk is:',
        options: [
          'Scope 1 double counting',
          'A weak market-based claim / geographic matching failure',
          'CH4 GWP being too low',
          'ISAE 3000 forbidding RECs always'
        ],
        answer: 1,
        explanation: 'Market-based quality criteria include geographic and residual-mix consistency.'
      },
      {
        id: 'caq6',
        prompt: 'Spend-based Category 1 is most appropriate when:',
        options: [
          'You have certified PCFs for every SKU',
          'You need a complete screening total and will refine top vendors',
          'You only sell electricity',
          'You have no general ledger'
        ],
        answer: 1,
        explanation: 'EEIO is a screening method; hybridize the hotspots.'
      },
      {
        id: 'caq7',
        prompt: 'Limited assurance typically requires:',
        options: [
          'Zero uncertainty',
          'An audit trail from activity data to tCO2e',
          'Only a marketing PDF',
          'Exclusion of Scope 3 always'
        ],
        answer: 1,
        explanation: 'Traceability and method consistency matter more than false precision.'
      }
    ])
  },

  'cd-w1-l1': {
    notes: `Circular economy replaces take-make-waste with design-out-waste, keep-products-in-use, and regenerate natural systems (Ellen MacArthur Foundation).

LCA (ISO 14040/44) is how you prove a redesign is better, not just greener-looking. Cradle-to-gate stops at the factory gate; cradle-to-grave includes use and end-of-life; cradle-to-cradle credits a next-life system if the allocation rules are explicit.

A functional unit (e.g. â€œ1,000 hair-washes deliveredâ€) lets you compare a multi-layer pouch with a refill bottle on equal service, not equal grams of plastic.`
  },
  'cd-w1-l2': {
    notes: `Functional unit pitfalls: mixing â€œper kg packagingâ€ with â€œper useâ€. If a refill bottle lasts 10 cycles, the FU should be service delivered, then allocate production burdens across cycles with a realistic return rate (not 100% unless you have data).`,
    practicalExample: `Baseline: 1,000 single-use 250 ml pouches. Alternative: 100 durable bottles Ã— 10 fills at 70% return. Model 300 â€œmissingâ€ returns as new bottles. Compare GWP per 1,000 washes.`
  },
  'cd-w1-l3': {
    notes: `Ecoinvent (and similar) processes must match geography and technology. Using â€œglobal average injection mouldingâ€ for a solar-powered Indian plant, or 2010 grid electricity for a 2025 factory, is a documented limitation â€” not a silent choice.`
  },
  'cd-w1-quiz': {
    quiz: quiz('Week 1 â€” LCA scoping', [
      {
        id: 'cdq1',
        prompt: 'A functional unit should primarily describe:',
        options: [
          'The brand colour palette',
          'The service or function being compared',
          'Only factory floor area',
          'Employee headcount'
        ],
        answer: 1,
        explanation: 'ISO 14040 comparisons rest on equivalent function.'
      },
      {
        id: 'cdq2',
        prompt: 'Cradle-to-gate inventories exclude:',
        options: [
          'Raw material extraction',
          'Use phase and end-of-life unless added',
          'Electricity at the plant',
          'Polymer pellets'
        ],
        answer: 1,
        explanation: 'Gate is the factory; use and disposal need cradle-to-grave (or a declared use scenario).'
      }
    ])
  },
  'cd-w2-l1': {
    notes: `Midpoint indicators (ReCiPe, CML): climate change, acidification, eutrophication, fossil depletion. Endpoint indicators roll these into damage to human health, ecosystems, and resources â€” more communicative, more uncertain.

Do not â€œoffsetâ€ a worse eutrophication score with a better GWP inside a single weighted score unless the weighting is transparent and not used as the only decision metric.`
  },
  'cd-w2-l2': {
    notes: `Lab: virgin ABS housing vs 100% PCR polycarbonate. Include recycling credit only under an explicit end-of-life formula (cut-off vs 50/50 vs circular footprint formula). State which you used.`,
    practicalExample: `If PCR polycarbonate still needs 30% virgin due to food-contact rules, the inventory is a mix â€” never label it 100% recycled in the LCA if the BOM says otherwise.`
  },
  'cd-w3-l1': {
    notes: `Design for disassembly: snap-fits over glued multi-materials, mono-material skins, standardised fasteners, no metal inserts in plastic if they poison the recycle stream. Ultrasonic welds can be circular if the polymer pair is compatible.`
  },
  'cd-w3-l2': {
    notes: `Disassembly time index: number of steps Ã— tool changes Ã— accessibility. Recycling lines pay for seconds. A 40-second teardown that yields clean PET flakes beats a â€œrecyclable in theoryâ€ bonded laminate.`,
    practicalExample: `Score a shampoo pump: metal spring in PP body often fails PET flake specs. Redesign to mono-PP or easily separable spring.`
  },
  'cd-w4-l1': {
    notes: `Product-as-a-service needs reverse logistics: collection points, quality grades (resale / remanufacture / recycle), and a deposit that actually returns product. Model yield loss; 100% closed loop is a scenario, not a default.`
  },
  'cd-w4-l2': {
    notes: `Capstone dossier: goal & scope, inventory tables, impact results, sensitivity (grid mix, return rate), disassembly map, and a circular business one-pager.`
  },
  'cd-w4-l3': {
    quiz: quiz('Circular economy sprint check', [
      {
        id: 'cdq3',
        prompt: 'Why is a 100% return-rate assumption dangerous in a refill LCA?',
        options: [
          'ISO forbids refills',
          'It understates replacement production if real returns are lower',
          'Electricity factors cannot be used',
          'GWPs do not apply to plastics'
        ],
        answer: 1,
        explanation: 'Lost returns require new bottles; sensitivity on return rate is mandatory.'
      }
    ])
  },

  'esg-w1-l1': {
    notes: `CSRD / ESRS double materiality has two axes:
â€¢ Impact materiality: scale, scope, irremediability of impacts on people and environment (inside-out).
â€¢ Financial materiality: risks and opportunities that affect cash flow, access to finance, or cost of capital (outside-in).

A topic can be material on either axis. Climate is often both. A local water impact can be impact-material even if not yet priced.`
  },
  'esg-w1-l2': {
    notes: `Lab: score 8 ESRS topics for a mid-market manufacturer (climate, pollution, water, biodiversity, circularity, own workforce, value-chain workers, consumers). Use a 1â€“5 scale, document evidence (incidents, regulation, customer RFPs), plot the matrix, and write a 1-page threshold memo.`,
    practicalExample: `Customer RFPs requiring SBTi + a â‚¬80/t internal carbon price can push climate into financial materiality even before a carbon tax lands.`
  },
  'esg-w1-quiz': {
    quiz: quiz('Double materiality', [
      {
        id: 'esgq1',
        prompt: 'Under ESRS, a topic is material if it is material on:',
        options: [
          'Only the financial axis',
          'Impact axis, financial axis, or both',
          'Only if investors vote',
          'Only Scope 1 tonnes'
        ],
        answer: 1,
        explanation: 'Double materiality is either/or, not only financial.'
      }
    ])
  },
  'esg-w2-l1': {
    notes: `ESRS E1 datapoints include transition plans, GHG inventories (GHG Protocol aligned), targets, energy mix, and internal carbon prices. Phase-ins exist for some companies â€” still map the full list so the data architecture is not rebuilt twice.`
  },
  'esg-w2-l2': {
    notes: `EU Taxonomy: substantial contribution + Do No Significant Harm (DNSH) + minimum social safeguards. KPIs are Turnover, CapEx, OpEx aligned %. A solar rooftop can be aligned CapEx while the companyâ€™s core product turnover remains unaligned â€” that is a valid, honest split.`,
    practicalExample: `â‚¹12 crore solar CapEx that meets TSC vs â‚¹200 crore total CapEx â†’ 6% CapEx alignment if DNSH and safeguards pass.`
  },
  'esg-w3-l1': {
    notes: `Digital tagging (ESEF/XBRL) and Internal Control over Sustainability Reporting (ICSR) mean the same discipline as financial reporting: owners, evidence, change control. Limited assurance will test process, not just the PDF.`
  },
  'esg-w3-l2': {
    notes: `Capstone: DMA matrix, E1 inventory crosswalk, Taxonomy KPI table, and a control narrative (who signs activity data).`
  },
  'esg-w3-quiz': {
    quiz: quiz('ESG / CSRD close-out', [
      {
        id: 'esgq2',
        prompt: 'Taxonomy alignment requires more than a green-looking project because:',
        options: [
          'Only SMEs can align',
          'DNSH and safeguards can fail even if climate contribution is real',
          'GWP is illegal in the EU',
          'Scope 3 is banned'
        ],
        answer: 1,
        explanation: 'Substantial contribution is necessary but not sufficient.'
      }
    ])
  },

  'sc-w1-l1': {
    notes: `Most enterprise climate impact sits in purchased goods and logistics (Scope 3). Pareto the vendor list: 20% of suppliers often explain most Category 1 emissions. Segment by spend, EEIO intensity, and geography (grid and water stress).`
  },
  'sc-w1-l2': {
    notes: `Lab: take 30 vendors, map NAICS/HS to EEIO, rank tCO2e, flag those in coal-heavy grids. Those flags become Year-1 engagement targets â€” not a boycott list.`,
    practicalExample: `A low-spend specialty chemical can outrank a high-spend professional-services firm on emissions intensity.`
  },
  'sc-w1-quiz': {
    quiz: quiz('Supply-chain heatmap', [
      {
        id: 'scq1',
        prompt: 'Why can a small-spend supplier dominate a heatmap?',
        options: [
          'Because finance always rounds it away',
          'High physical intensity (steel, chemicals, freight) vs services spend',
          'Scope 2 RECs apply to vendors automatically',
          'ISAE forbids EEIO'
        ],
        answer: 1,
        explanation: 'Intensity Ã— volume, not spend alone.'
      }
    ])
  },
  'sc-w2-l1': {
    notes: `CDP Supply Chain and similar questionnaires collect primary data. Define quality gates: year, boundary, allocation, assurance. Partial data still beats EEIO if documented.`
  },
  'sc-w2-l2': {
    notes: `Allocation red flags: â€œwe divided plant emissions by number of customersâ€; missing Scope 2; biogenic carbon mixed into fossil totals.`
  },
  'sc-w3-l1': {
    notes: `The Chancery Lane Project and similar clause libraries put carbon into contracts: reporting duties, audit rights, SBTi-aligned reduction schedules, and remedies that are commercially realistic (scorecards and volume allocation, not only termination).`
  },
  'sc-w3-l2': {
    notes: `RFP scorecard: 60% commercial, 25% carbon data quality + trajectory, 15% social due diligence â€” or whatever policy the board approved. Publish the weights so procurement cannot silently drop climate.`
  },
  'sc-w4-l1': {
    notes: `Joint decarbonization: on-site renewables, shared PPAs, process efficiency. Shared-savings models only work with metered baselines.`
  },
  'sc-w4-l2': {
    notes: `Capstone: 24-month mobilization plan for top 15 vendors â€” data ask, contract clause, two capex collaborations, and a KPI dashboard (coverage % of spend with primary data, and tCO2e vs baseline).`
  },

  'cr-w1-l1': {
    notes: `Physical risk uses climate scenarios (IPCC SSPs): from lower-warming SSP1-2.6 to high-warming SSP5-8.5. Hazards: flood, heat, drought, wind, sea-level rise. Exposure is where assets sit; vulnerability is how badly they fail (e.g. ground-floor servers).`
  },
  'cr-w1-l2': {
    notes: `Lab: place 8 factories on a flood-depth overlay (even a simple 100-year vs 500-year narrative). Flag sites with >0.5 m inundation in a 2050 SSP2-4.5 storyline. That is a board-level list, not a GIS trophy.`,
    practicalExample: `A 0.3% annual-exceedance flood that becomes 1.2% by 2050 is a fourfold frequency change â€” insurance and capex timing change even if the building looks the same today.`
  },
  'cr-w1-quiz': {
    quiz: quiz('Physical risk', [
      {
        id: 'crq1',
        prompt: 'Exposure without vulnerability means:',
        options: [
          'The asset is in a hazard zone but may still be resilient (elevation, defences)',
          'The company has no factories',
          'Scope 1 is zero',
          'TCFD does not apply'
        ],
        answer: 0,
        explanation: 'Risk â‰ˆ hazard Ã— exposure Ã— vulnerability.'
      }
    ])
  },
  'cr-w2-l1': {
    notes: `Transition risk: policy (carbon prices, CBAM), technology (stranded assets), market (demand shift), reputation. NGFS scenarios (orderly, disorderly, hot house) give internally consistent carbon-price and energy-mix paths.`
  },
  'cr-w2-l2': {
    notes: `Lab: stress EBITDA at â‚¹9,000 / â‚¹15,000 / â‚¹22,500 per tCO2e on unablated Scope 1+2. Show which plants go cash-negative. Pair with an abatement wedge (efficiency, fuel switch, PPA).`
  },
  'cr-w3-l1': {
    notes: `IFRS S2 / TCFD pillars: governance, strategy, risk management, metrics & targets. Boards need process (who owns scenario analysis) as much as a single CVaR number.`
  },
  'cr-w3-l2': {
    notes: `Capstone: physical shortlist, transition P&L stress, governance paragraph, and two metrics (e.g. % of book value in high flood hazard; unablated tCO2e Ã— shadow price).`
  },
  'cr-w3-quiz': {
    quiz: quiz('Climate risk close-out', [
      {
        id: 'crq2',
        prompt: 'A disorderly NGFS transition typically implies:',
        options: [
          'No carbon price ever',
          'Late, sharp policy tightening and higher short-term price volatility',
          'Only physical flood risk',
          'RECs equal zero transition risk'
        ],
        answer: 1,
        explanation: 'Disorderly paths delay action then reprice carbon abruptly.'
      }
    ])
  }
}

export function withLessonContent(lesson) {
  if (!lesson) return lesson
  const extra = LESSON_CONTENT[lesson.id] || {}
  const lr = LESSON_LEARNING_RESOURCES[lesson.id] || {}
  return {
    ...lesson,
    ...extra,
    takeaways: extra.takeaways || lesson.takeaways,
    task: extra.task || lesson.task,
    quiz: extra.quiz || lesson.quiz,
    notes: extra.notes || lesson.notes,
    practicalExample: extra.practicalExample || lesson.practicalExample,
    resources: extra.resources || lesson.resources,
    videoUrl: lr.videoUrl || extra.videoUrl || lesson.videoUrl,
    readingUrl: lr.readingUrl || extra.readingUrl || lesson.readingUrl,
    videoTitle: lr.videoTitle || extra.videoTitle || lesson.videoTitle,
    readingTitle: lr.readingTitle || extra.readingTitle || lesson.readingTitle
  }
}

export function enrichCurriculum(curriculum = []) {
  return curriculum.map((week) => ({
    ...week,
    lessons: (week.lessons || []).map(withLessonContent)
  }))
}
