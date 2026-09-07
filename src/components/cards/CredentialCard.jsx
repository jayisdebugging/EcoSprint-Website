import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, ShieldCheck, Share2, ExternalLink, Check } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { useToast } from '../ui/Toast'

export const CredentialCard = ({ credential }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { addToast } = useToast()

  const handleShare = (e) => {
    e.stopPropagation()
    const verifyUrl = `${window.location.origin}/verify/${credential.id}`
    navigator.clipboard?.writeText(verifyUrl)
    addToast({
      title: 'Verification Link Copied',
      message: 'Shareable verification URL copied to your clipboard.',
      type: 'success'
    })
  }

  return (
    <>
      <Card className="bg-white dark:bg-charcoal-900 flex flex-col justify-between border border-charcoal-200/90 dark:border-charcoal-800 shadow-card" hoverable>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="w-9 h-9 rounded-lg bg-forest-50 dark:bg-forest-950/60 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-800 dark:text-forest-400">
              <Award className="w-5 h-5" />
            </span>
            <Badge variant="forest" size="sm" dot>
              {credential.status}
            </Badge>
          </div>

          <div>
            <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 leading-snug">
              {credential.title}
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
              Issued to {credential.recipientName} • {credential.issuedDate}
            </p>
          </div>

          <div className="space-y-1 text-xs">
            <span className="text-charcoal-500 dark:text-charcoal-400 block">Issuing Auditor / Mentor</span>
            <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">{credential.issuingMentor}</span>
          </div>

          <div className="p-2.5 rounded-md bg-sand-50 dark:bg-charcoal-800/70 border border-charcoal-200/60 dark:border-charcoal-700 text-[11px] font-mono text-charcoal-600 dark:text-charcoal-300 break-all">
            ID: {credential.credentialId}
          </div>

          <div className="flex flex-wrap gap-1">
            {credential.skills.slice(0, 3).map((s, i) => (
              <span key={i} className="text-[10px] bg-sand-100 dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-charcoal-200/60 dark:border-charcoal-700 px-2 py-0.5 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="xs"
              leftIcon={Share2}
              onClick={handleShare}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setModalOpen(true)}
            >
              View
            </Button>
          </div>

          <Link to={`/verify/${credential.id}`}>
            <Button
              variant="primary"
              size="xs"
              rightIcon={ExternalLink}
            >
              Verify
            </Button>
          </Link>
        </div>
      </Card>

      {/* View Credential Certificate Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="EcoSprint Verified Credential"
        description="Public audit proof of demonstrated technical sustainability competencies."
        maxWidth="max-w-lg"
      >
        <div className="p-6 bg-sand-50 dark:bg-charcoal-900 rounded-xl border-2 border-forest-800/30 dark:border-forest-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-forest-800 text-white flex items-center justify-center mx-auto shadow-subtle">
            <Award className="w-6 h-6 text-forest-300" />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-forest-800 dark:text-forest-400 font-bold">
              EcoSprint Certificate of Completion
            </p>
            <h3 className="text-xl font-bold text-charcoal-950 dark:text-charcoal-50 mt-1">
              {credential.title}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 mt-2">
              Conferred upon <span className="font-bold text-charcoal-900 dark:text-charcoal-50">{credential.recipientName}</span>
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-charcoal-800/90 rounded-lg border border-charcoal-200 dark:border-charcoal-700 text-xs text-charcoal-600 dark:text-charcoal-300 space-y-1.5 text-left">
            <div className="flex justify-between">
              <span className="text-charcoal-500 dark:text-charcoal-400">Sprint:</span>
              <span className="font-semibold text-charcoal-800 dark:text-charcoal-200">{credential.sprintTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500 dark:text-charcoal-400">Credential ID:</span>
              <span className="font-mono text-charcoal-900 dark:text-charcoal-100">{credential.credentialId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500 dark:text-charcoal-400">Issue Date:</span>
              <span className="text-charcoal-800 dark:text-charcoal-200">{credential.issuedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500 dark:text-charcoal-400">Status:</span>
              <span className="font-semibold text-forest-800 dark:text-forest-400">Verified on Ledger</span>
            </div>
            <div className="pt-1 border-t border-charcoal-100 dark:border-charcoal-700">
              <span className="text-charcoal-500 dark:text-charcoal-400 block text-[10px]">Verification Hash:</span>
              <span className="font-mono text-[10px] text-charcoal-500 dark:text-charcoal-400 break-all">{credential.verificationHash}</span>
            </div>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Link to={`/verify/${credential.id}`} onClick={() => setModalOpen(false)}>
              <Button variant="primary" size="sm" rightIcon={ExternalLink}>
                Open Public Verification Page
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CredentialCard
