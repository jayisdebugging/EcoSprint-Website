import React, { useState, useMemo } from 'react'
import {
  FlaskConical,
  Zap,
  RotateCcw,
  BarChart3,
  Sliders,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Layers
} from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Tabs } from '../../components/ui/Tabs'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { useToast } from '../../components/ui/Toast'

export const SkillLabsPage = () => {
  const [activeLab, setActiveLab] = useState('carbon')
  const { addToast } = useToast()

  // ==========================================
  // LAB 1: CARBON FOOTPRINT LAB STATE
  // ==========================================
  const [electricityKWh, setElectricityKWh] = useState(48000)
  const [transportKm, setTransportKm] = useState(25000)
  const [fuelGasM3, setFuelGasM3] = useState(12000)
  const [wasteKg, setWasteKg] = useState(8500)
  const [gridRegion, setGridRegion] = useState('eu-average')

  const gridFactors = {
    'eu-average': 0.00025, // 250g CO2/kWh
    'us-average': 0.00038, // 380g CO2/kWh
    'nordic-clean': 0.00004 // 40g CO2/kWh
  }

  const carbonCalc = useMemo(() => {
    const electricityEmissions = (electricityKWh * (gridFactors[gridRegion] || 0.00025))
    const transportEmissions = (transportKm * 0.000171) // ~171g/km average fleet
    const fuelEmissions = (fuelGasM3 * 0.00202) // ~2.02 kg CO2e/m3 natural gas
    const wasteEmissions = (wasteKg * 0.00048) // landfill proxy

    const total = electricityEmissions + transportEmissions + fuelEmissions + wasteEmissions
    const totalSafe = total > 0 ? total : 0.001

    return {
      electricity: Number(electricityEmissions.toFixed(1)),
      transport: Number(transportEmissions.toFixed(1)),
      fuel: Number(fuelEmissions.toFixed(1)),
      waste: Number(wasteEmissions.toFixed(1)),
      total: Number(total.toFixed(1)),
      electricityPct: Math.round((electricityEmissions / totalSafe) * 100),
      transportPct: Math.round((transportEmissions / totalSafe) * 100),
      fuelPct: Math.round((fuelEmissions / totalSafe) * 100),
      wastePct: Math.round((wasteEmissions / totalSafe) * 100)
    }
  }, [electricityKWh, transportKm, fuelGasM3, wasteKg, gridRegion])

  // ==========================================
  // LAB 2: CIRCULAR ECONOMY LAB STATE
  // ==========================================
  const [materialChoice, setMaterialChoice] = useState('bio-composite')
  const [manufacturingChoice, setManufacturingChoice] = useState('renewable')
  const [usageChoice, setUsageChoice] = useState('subscription')
  const [eolChoice, setEolChoice] = useState('closed-loop')

  const circularityScore = useMemo(() => {
    const matScores = { 'virgin-plastic': 15, 'recycled-alu': 60, 'bio-composite': 95 }
    const mfgScores = { 'standard': 15, 'clean-electric': 55, 'renewable': 90 }
    const useScores = { 'single-use': 10, 'repairable': 65, 'subscription': 95 }
    const eolScores = { 'landfill': 5, 'downcycle': 45, 'closed-loop': 95 }

    const raw = (matScores[materialChoice] + mfgScores[manufacturingChoice] + useScores[usageChoice] + eolScores[eolChoice]) / 4
    return Math.round(raw)
  }, [materialChoice, manufacturingChoice, usageChoice, eolChoice])

  // ==========================================
  // LAB 3: ESG METRICS LAB STATE
  // ==========================================
  const [renewableTarget, setRenewableTarget] = useState(70)
  const [scopeReduction, setScopeReduction] = useState(45)
  const [genderDiversity, setGenderDiversity] = useState(42)
  const [trainingHours, setTrainingHours] = useState(36)
  const [boardIndependence, setBoardIndependence] = useState(80)
  const [hasEsgCompensation, setHasEsgCompensation] = useState(true)

  const esgScore = useMemo(() => {
    // Environmental weight 40%, Social 30%, Governance 30%
    const envScore = ((renewableTarget / 100) * 50) + ((scopeReduction / 60) * 50)
    const socScore = ((genderDiversity / 50) * 50) + ((trainingHours / 40) * 50)
    const govScore = ((boardIndependence / 100) * 60) + (hasEsgCompensation ? 40 : 10)

    const aggregate = Math.min(100, Math.round((envScore * 0.4) + (socScore * 0.3) + (govScore * 0.3)))

    let grade = 'BBB'
    if (aggregate >= 90) grade = 'AAA (Industry Leader)'
    else if (aggregate >= 80) grade = 'AA (High Performer)'
    else if (aggregate >= 70) grade = 'A (Good Alignment)'
    else if (aggregate >= 60) grade = 'BBB (Average)'
    else grade = 'BB (Action Required)'

    return { score: aggregate, grade }
  }, [renewableTarget, scopeReduction, genderDiversity, trainingHours, boardIndependence, hasEsgCompensation])

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">Interactive Skill Labs</h1>
          <Badge variant="forest" size="sm">Practical Sandboxes</Badge>
        </div>
        <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
          Perform live simulations, model material tradeoffs, and compute compliance metrics in real-world sandbox environments.
        </p>
      </div>

      {/* Lab Tabs */}
      <Tabs
        activeTab={activeLab}
        onChange={setActiveLab}
        variant="pill"
        tabs={[
          { id: 'carbon', label: '1. Carbon Footprint Lab', icon: Zap },
          { id: 'circular', label: '2. Circular Economy Lab', icon: RotateCcw },
          { id: 'esg', label: '3. ESG Metrics Lab', icon: BarChart3 },
        ]}
      />

      {/* ============================================================ */}
      {/* 1. CARBON FOOTPRINT LAB */}
      {/* ============================================================ */}
      {activeLab === 'carbon' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* INPUTS PANEL (7 COLS) */}
            <Card className="lg:col-span-7 bg-white dark:bg-charcoal-900 p-6 space-y-5 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
              <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Facility Activity Inputs</h3>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Enter primary utility and operational data to calculate emissions.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setElectricityKWh(48000)
                    setTransportKm(25000)
                    setFuelGasM3(12000)
                    setWasteKg(8500)
                    setGridRegion('eu-average')
                  }}
                  className="text-xs font-semibold text-forest-800 dark:text-forest-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Default
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Electricity */}
                <div className="space-y-1.5 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <div className="flex justify-between items-center font-semibold text-charcoal-800 dark:text-charcoal-200">
                    <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-500" /> Purchased Electricity (Scope 2)</span>
                    <span className="font-mono text-sm font-bold text-charcoal-950 dark:text-charcoal-50">{electricityKWh.toLocaleString()} kWh</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="1000"
                    value={electricityKWh}
                    onChange={(e) => setElectricityKWh(Number(e.target.value))}
                    className="w-full accent-forest-700 cursor-pointer"
                  />
                  <div className="flex justify-between items-center pt-1 text-[11px] text-charcoal-500 dark:text-charcoal-400">
                    <span>Grid Factor Location:</span>
                    <select
                      value={gridRegion}
                      onChange={(e) => setGridRegion(e.target.value)}
                      className="text-xs font-medium rounded border border-charcoal-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-charcoal-100 px-2 py-0.5"
                    >
                      <option value="eu-average">EU Grid Residual Mix (250g/kWh)</option>
                      <option value="us-average">US Sub-regional eGRID (380g/kWh)</option>
                      <option value="nordic-clean">Nordic Hydro/Nuclear (40g/kWh)</option>
                    </select>
                  </div>
                </div>

                {/* Transport */}
                <div className="space-y-1.5 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <div className="flex justify-between items-center font-semibold text-charcoal-800 dark:text-charcoal-200">
                    <span>Company Fleet Travel (Scope 1)</span>
                    <span className="font-mono text-sm font-bold text-charcoal-950 dark:text-charcoal-50">{transportKm.toLocaleString()} km</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="1000"
                    value={transportKm}
                    onChange={(e) => setTransportKm(Number(e.target.value))}
                    className="w-full accent-forest-700 cursor-pointer"
                  />
                  <span className="text-[10px] text-charcoal-400">DEFRA 2025 blended petrol/diesel factor (0.171 kg CO2e/km)</span>
                </div>

                {/* Natural Gas */}
                <div className="space-y-1.5 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <div className="flex justify-between items-center font-semibold text-charcoal-800 dark:text-charcoal-200">
                    <span>Onsite Natural Gas Heating (Scope 1)</span>
                    <span className="font-mono text-sm font-bold text-charcoal-950 dark:text-charcoal-50">{fuelGasM3.toLocaleString()} m³</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={fuelGasM3}
                    onChange={(e) => setFuelGasM3(Number(e.target.value))}
                    className="w-full accent-forest-700 cursor-pointer"
                  />
                  <span className="text-[10px] text-charcoal-400">Stationary combustion factor (2.02 kg CO2e/m³)</span>
                </div>

                {/* Landfill Waste */}
                <div className="space-y-1.5 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <div className="flex justify-between items-center font-semibold text-charcoal-800 dark:text-charcoal-200">
                    <span>Landfill Waste Generated (Scope 3 Cat 5)</span>
                    <span className="font-mono text-sm font-bold text-charcoal-950 dark:text-charcoal-50">{wasteKg.toLocaleString()} kg</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="30000"
                    step="500"
                    value={wasteKg}
                    onChange={(e) => setWasteKg(Number(e.target.value))}
                    className="w-full accent-forest-700 cursor-pointer"
                  />
                  <span className="text-[10px] text-charcoal-400">Municipal landfill anaerobic digestion proxy (0.48 kg CO2e/kg)</span>
                </div>
              </div>
            </Card>

            {/* RESULTS & BREAKDOWN (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Total Card */}
              <Card className="bg-charcoal-950 text-white p-6 space-y-4 shadow-modal">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-400">
                  Total Calculated Carbon Footprint
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    {carbonCalc.total}
                  </span>
                  <span className="text-sm text-charcoal-300 font-bold">tCO₂e / year</span>
                </div>

                <div className="pt-2 border-t border-charcoal-800 space-y-2 text-xs">
                  <span className="text-charcoal-400 block font-medium">Category Breakdown</span>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-charcoal-300">Electricity (Scope 2): {carbonCalc.electricity} tCO2e</span>
                      <span className="font-bold text-forest-400">{carbonCalc.electricityPct}%</span>
                    </div>
                    <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-forest-500 h-full rounded-full" style={{ width: `${carbonCalc.electricityPct}%` }} />
                    </div>

                    <div className="flex justify-between text-[11px] pt-1">
                      <span className="text-charcoal-300">Heating Gas (Scope 1): {carbonCalc.fuel} tCO2e</span>
                      <span className="font-bold text-amber-400">{carbonCalc.fuelPct}%</span>
                    </div>
                    <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${carbonCalc.fuelPct}%` }} />
                    </div>

                    <div className="flex justify-between text-[11px] pt-1">
                      <span className="text-charcoal-300">Transport Fleet: {carbonCalc.transport} tCO2e</span>
                      <span className="font-bold text-sky-400">{carbonCalc.transportPct}%</span>
                    </div>
                    <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full rounded-full" style={{ width: `${carbonCalc.transportPct}%` }} />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Insights & Recommendations */}
              <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border border-charcoal-200 dark:border-charcoal-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 dark:text-charcoal-50 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" /> Decarbonization Insights
                </h4>
                <ul className="space-y-2 text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 shrink-0 mt-0.5" />
                    <span><strong>High Scope 1 Thermal Load:</strong> Onsite natural gas accounts for {carbonCalc.fuelPct}% of emissions. Transitioning to heat pump heat recovery could shave ~{Math.round(carbonCalc.fuel * 0.7)} tCO2e.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 shrink-0 mt-0.5" />
                    <span><strong>Clean Power Contract:</strong> Shifting to certified EACs (Guarantees of Origin) would reduce market-based Scope 2 emissions to 0.0 tCO2e.</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. CIRCULAR ECONOMY LAB */}
      {/* ============================================================ */}
      {activeLab === 'circular' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-7 bg-white dark:bg-charcoal-900 p-6 space-y-5 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
              <div>
                <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Product Lifecycle Scenario Builder</h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5">
                  Configure consumer hardware packaging and casing across 4 stages to evaluate circularity index.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* 1. Materials */}
                <div className="space-y-2 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Stage 1: Raw Material Bill of Materials</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'virgin-plastic', label: 'Virgin ABS Polymer', note: 'Linear extraction' },
                      { id: 'recycled-alu', label: '100% Recycled Alu', note: 'High recycled content' },
                      { id: 'bio-composite', label: 'Mycelium Bio-composite', note: 'Regenerative bio-based' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMaterialChoice(opt.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          materialChoice === opt.id
                            ? 'border-forest-700 dark:border-forest-500 bg-forest-50 dark:bg-forest-950/60 text-forest-950 dark:text-forest-200 font-bold shadow-xs'
                            : 'border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-white dark:hover:bg-charcoal-800'
                        }`}
                      >
                        <p className="text-xs font-bold leading-tight">{opt.label}</p>
                        <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 block mt-0.5">{opt.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Manufacturing */}
                <div className="space-y-2 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Stage 2: Assembly & Processing</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'standard', label: 'Standard Grid & Solvents', note: 'Standard factory' },
                      { id: 'clean-electric', label: 'Clean Electric Assembly', note: 'Low-solvent assembly' },
                      { id: 'renewable', label: '100% Renewable Zero-Waste', note: 'ISO 14001 certified' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setManufacturingChoice(opt.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          manufacturingChoice === opt.id
                            ? 'border-forest-700 dark:border-forest-500 bg-forest-50 dark:bg-forest-950/60 text-forest-950 dark:text-forest-200 font-bold shadow-xs'
                            : 'border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-white dark:hover:bg-charcoal-800'
                        }`}
                      >
                        <p className="text-xs font-bold leading-tight">{opt.label}</p>
                        <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 block mt-0.5">{opt.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Usage */}
                <div className="space-y-2 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Stage 3: Business Model & Use Phase</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'single-use', label: 'One-off Purchase', note: 'No repair support' },
                      { id: 'repairable', label: 'Modular / Self-Repair', note: 'Disassembly guide' },
                      { id: 'subscription', label: 'Product-as-a-Service', note: 'Take-back incentive' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setUsageChoice(opt.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          usageChoice === opt.id
                            ? 'border-forest-700 dark:border-forest-500 bg-forest-50 dark:bg-forest-950/60 text-forest-950 dark:text-forest-200 font-bold shadow-xs'
                            : 'border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-white dark:hover:bg-charcoal-800'
                        }`}
                      >
                        <p className="text-xs font-bold leading-tight">{opt.label}</p>
                        <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 block mt-0.5">{opt.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. End of Life */}
                <div className="space-y-2 p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Stage 4: End-of-Life Material Loop</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'landfill', label: 'Municipal Landfill', note: '0% material recovery' },
                      { id: 'downcycle', label: 'Mechanical Downcycling', note: 'Fiber degradation' },
                      { id: 'closed-loop', label: 'Closed-Loop Remanufacturing', note: 'Cradle-to-Cradle loop' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEolChoice(opt.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          eolChoice === opt.id
                            ? 'border-forest-700 dark:border-forest-500 bg-forest-50 dark:bg-forest-950/60 text-forest-950 dark:text-forest-200 font-bold shadow-xs'
                            : 'border-charcoal-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-white dark:hover:bg-charcoal-800'
                        }`}
                      >
                        <p className="text-xs font-bold leading-tight">{opt.label}</p>
                        <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 block mt-0.5">{opt.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* CIRCULARITY SCORE CARD */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-charcoal-950 text-white p-6 space-y-4 shadow-modal">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-400">
                  Calculated Circularity Index
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">
                    {circularityScore}%
                  </span>
                  <Badge variant={circularityScore >= 80 ? 'forest' : circularityScore >= 50 ? 'warning' : 'danger'} size="sm">
                    {circularityScore >= 80 ? 'Cradle-to-Cradle Gold' : circularityScore >= 50 ? 'Transitional Circular' : 'High Linear Risk'}
                  </Badge>
                </div>

                <ProgressBar value={circularityScore} size="md" variant="forest" />

                <div className="pt-2 border-t border-charcoal-800 text-xs text-charcoal-300 space-y-2">
                  <p>
                    {circularityScore >= 80
                      ? '✓ Meets Cradle-to-Cradle Certified® Gold standards. Minimal resource depletion and verified closed-loop recovery.'
                      : circularityScore >= 50
                      ? 'Fair progress. Transitioning to subscription take-back or bio-composites is recommended to reach >80%.'
                      : 'Linear risk: high virgin resource consumption with substantial residual disposal liabilities.'}
                  </p>
                </div>
              </Card>

              <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border border-charcoal-200 dark:border-charcoal-800 text-xs">
                <h4 className="font-bold text-charcoal-900 dark:text-charcoal-50">Life Cycle Engineering Notes</h4>
                <ul className="space-y-1.5 text-charcoal-600 dark:text-charcoal-300 list-disc list-inside">
                  <li>Disassembly architecture complies with WEEE directive recycling throughput rates.</li>
                  <li>Eliminates hazardous halogenated flame retardants in compliance with RoHS.</li>
                  <li>Reverse logistics take-back cost offset by residual polymer recovery value.</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. ESG METRICS LAB */}
      {/* ============================================================ */}
      {activeLab === 'esg' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Card className="lg:col-span-7 bg-white dark:bg-charcoal-900 p-6 space-y-5 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
              <div>
                <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Corporate ESG Performance Scoring</h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5">
                  Adjust metrics across Environmental, Social, and Governance pillars to model CSRD disclosure ratings.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Environmental */}
                <div className="p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700 space-y-3">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400" /> Environmental Metrics (40% Weight)
                  </span>
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                      <span>Renewable Electricity Target: {renewableTarget}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={renewableTarget}
                      onChange={(e) => setRenewableTarget(Number(e.target.value))}
                      className="w-full accent-forest-700 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                      <span>Scope 1 & 2 Absolute Reduction: {scopeReduction}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={scopeReduction}
                      onChange={(e) => setScopeReduction(Number(e.target.value))}
                      className="w-full accent-forest-700 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Social */}
                <div className="p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700 space-y-3">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400" /> Social Metrics (30% Weight)
                  </span>
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                      <span>Gender Diversity in Leadership: {genderDiversity}%</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="55"
                      value={genderDiversity}
                      onChange={(e) => setGenderDiversity(Number(e.target.value))}
                      className="w-full accent-sky-700 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                      <span>Annual Training Hours / Employee: {trainingHours} hrs</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="60"
                      value={trainingHours}
                      onChange={(e) => setTrainingHours(Number(e.target.value))}
                      className="w-full accent-sky-700 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Governance */}
                <div className="p-3.5 rounded-lg bg-sand-50/70 dark:bg-charcoal-800/60 border border-charcoal-200/60 dark:border-charcoal-700 space-y-3">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-charcoal-700 dark:text-charcoal-300" /> Governance Metrics (30% Weight)
                  </span>
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-charcoal-800 dark:text-charcoal-200">
                      <span>Independent Board Members: {boardIndependence}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={boardIndependence}
                      onChange={(e) => setBoardIndependence(Number(e.target.value))}
                      className="w-full accent-charcoal-700 cursor-pointer"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={hasEsgCompensation}
                      onChange={(e) => setHasEsgCompensation(e.target.checked)}
                      className="rounded text-forest-700 focus:ring-forest-600"
                    />
                    <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">Executive Compensation Directly Linked to ESG Milestones</span>
                  </label>
                </div>
              </div>
            </Card>

            {/* ESG SCORE CARD */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-charcoal-950 text-white p-6 space-y-4 shadow-modal">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-400">
                  Aggregate ESG Rating
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">{esgScore.score}</span>
                  <span className="text-xs text-charcoal-400 font-mono">/ 100</span>
                </div>
                <div className="p-2.5 rounded bg-charcoal-900 border border-charcoal-800 text-xs font-semibold text-forest-300">
                  Rating: {esgScore.grade}
                </div>

                <div className="pt-2 border-t border-charcoal-800 text-xs text-charcoal-300 space-y-2">
                  <span className="font-bold text-white block">Statutory Compliance Status</span>
                  <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ESRS E1 Climate Transition Plan compliant
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> EU CSRD Wave 1 Limited Assurance ready
                  </p>
                </div>
              </Card>

              <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-3 border border-charcoal-200 dark:border-charcoal-800 text-xs">
                <h4 className="font-bold text-charcoal-900 dark:text-charcoal-50">Auditor Compliance Advice</h4>
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  Your double materiality matrix requires documentation of stakeholder consultation surveys conducted with supplier workforce representatives.
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillLabsPage
