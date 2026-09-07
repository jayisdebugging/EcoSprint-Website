import React from 'react'
import { Link } from 'react-router-dom'
import { Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { CredentialCard } from '../../components/cards/CredentialCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { useApp } from '../../context/AppContext'

export const CredentialsPage = () => {
  const { credentialsList } = useApp()

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">EcoSprint Verified Credentials</h1>
            <Badge variant="forest" size="sm">Auditor Assured</Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
            Immutable digital certificates and verifiable competency badges conferred upon peer-reviewed capstone submission.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/verify/${credentialsList[0]?.id || 'cred-csrd-practitioner'}`}>
            <Button variant="outline" size="sm" rightIcon={ArrowRight}>
              Public Verification Portal
            </Button>
          </Link>
        </div>
      </div>

      {credentialsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentialsList.map((cred) => (
            <CredentialCard key={cred.id} credential={cred} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Credentials Yet"
          description="Complete sprint capstone projects to earn cryptographically verifiable credentials."
          action={
            <Link to="/sprints">
              <Button variant="primary" size="sm">
                Explore Sprints
              </Button>
            </Link>
          }
        />
      )}
    </div>
  )
}

export default CredentialsPage
