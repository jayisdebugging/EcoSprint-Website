import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShieldCheck, Award, CheckCircle2, ArrowLeft, ExternalLink, Calendar, User, FileText, Check, SearchX, Loader2 } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { getCredentialByLookup } from '../../services/supabaseService'

export const VerifyCredentialPage = () => {
  const { id } = useParams()
  const [credential, setCredential] = useState(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState('loading') // loading | found | notfound | error

  useEffect(() => {
    let cancelled = false
    const lookup = async () => {
      setLoading(true)
      setState('loading')
      const result = await getCredentialByLookup(id)
      if (cancelled) return
      setLoading(false)
      if (!result.ok) {
        setCredential(null)
        setState(result.error && !result.data ? (id ? 'notfound' : 'error') : 'error')
        if (result.error) console.warn('[EcoSprint] Verification lookup:', result.error)
        return
      }
      setCredential(result.data)
      setState('found')
    }
    lookup()
    return () => {
      cancelled = true
    }
  }, [id])

  const handleCopyHash = () => {
    if (!credential) return
    navigator.clipboard?.writeText(credential.verificationHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (loading || state === 'loading') {
    return (
      <div className="py-16 text-center text-sm text-charcoal-500 dark:text-charcoal-400 flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" /> Checking verification ledger...
      </div>
    )
  }

  if (state !== 'found' || !credential) {
    return (
      <div className="py-12 sm:py-16 bg-sand-50 dark:bg-charcoal-950 min-h-screen transition-colors duration-200">
        <Container size="md">
          <div className="mb-6">
            <Link to="/sprints" className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 dark:text-charcoal-400 hover:text-forest-700 dark:hover:text-forest-400 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Explore Sprints
            </Link>
          </div>
          <Card className="bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-card max-w-md mx-auto p-8 space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-sand-100 dark:bg-charcoal-800 text-charcoal-400 flex items-center justify-center">
              <SearchX className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold text-charcoal-950 dark:text-charcoal-50">Credential Not Verified</h1>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
              {state === 'notfound'
                ? `No credential was found matching "${id}" in the EcoSprint ledger. Check the link and try again, or ask the recipient to re-share it.`
                : 'The verification service could not be reached right now. Please try again shortly.'}
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <Link to="/sprints">
                <Button variant="primary" size="sm">Explore Sprints</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-12 sm:py-16 bg-sand-50 dark:bg-charcoal-950 min-h-screen transition-colors duration-200">
      <Container size="md">
        <div className="mb-6">
          <Link to="/credentials" className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 dark:text-charcoal-400 hover:text-forest-700 dark:hover:text-forest-400 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Credentials
          </Link>
        </div>

        {/* Verification Certificate Card */}
        <Card className="bg-white dark:bg-charcoal-900 border-2 border-charcoal-200/90 dark:border-charcoal-800 shadow-card p-6 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Top Stamp / Verified Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-100 dark:border-charcoal-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-forest-800 dark:bg-forest-700 text-white flex items-center justify-center shadow-subtle">
                <Award className="w-6 h-6 text-forest-300 dark:text-forest-200" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-forest-700 dark:text-forest-400 block">
                  EcoSprint Official Record
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal-950 dark:text-charcoal-50">
                  Public Credential Verification
                </h1>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 dark:bg-forest-950/60 border border-forest-300 dark:border-forest-700 text-forest-900 dark:text-forest-300 text-xs font-bold self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-forest-700 dark:text-forest-400" />
              <span>Cryptographically Verified</span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold text-charcoal-500 dark:text-charcoal-400">Credential Conferred</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-charcoal-50 leading-tight">
                {credential.title}
              </h2>
              <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-2xl">
                {credential.description}
              </p>
            </div>

            {/* Recipient & Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5 rounded-xl bg-sand-50 dark:bg-charcoal-950/70 border border-charcoal-200/80 dark:border-charcoal-800">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-charcoal-400" /> Learner Recipient
                </span>
                <p className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100">{credential.recipientName}</p>
                <span className="text-xs text-forest-700 dark:text-forest-400 font-medium">Grade: {credential.grade}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-charcoal-400" /> Date of Issue
                </span>
                <p className="text-sm font-bold text-charcoal-900 dark:text-charcoal-100">{credential.issuedDate}</p>
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">Status: {credential.status}</span>
              </div>

              <div className="space-y-1 sm:col-span-2 md:col-span-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-charcoal-400" /> Credential Identifier
                </span>
                <p className="text-xs font-mono font-bold text-charcoal-900 dark:text-charcoal-100">{credential.credentialId}</p>
                <span className="text-xs text-charcoal-500 dark:text-charcoal-400">Auditor: {credential.issuingMentor}</span>
              </div>
            </div>

            {/* Sprint Details */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold text-charcoal-500 dark:text-charcoal-400">Cohort Sprint Completed</span>
              <p className="text-base font-bold text-charcoal-900 dark:text-charcoal-100">{credential.sprintTitle}</p>
            </div>

            {/* Verified Skills Demonstrated */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold text-charcoal-500 dark:text-charcoal-400">
                Verified Technical Competencies
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {credential.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-700 text-xs font-semibold text-charcoal-800 dark:text-charcoal-200">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 dark:text-forest-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptographic Ledger Proof */}
            <div className="p-4 rounded-lg bg-charcoal-950 border border-charcoal-800 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-forest-400">
                  Immutable Verification Hash
                </span>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="text-xs text-charcoal-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-forest-400" /> : null}
                  {copied ? 'Copied' : 'Copy Hash'}
                </button>
              </div>
              <p className="font-mono text-xs text-charcoal-300 break-all select-all">
                {credential.verificationHash}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-charcoal-100 dark:border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-charcoal-500 dark:text-charcoal-400">
              Verified by EcoSprint Credential Assurance Network
            </span>
            <div className="flex gap-3">
              <Link to="/sprints">
                <Button variant="outline" size="sm">
                  Explore Sprints
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="primary" size="sm">
                  Go to Learner Hub
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default VerifyCredentialPage
