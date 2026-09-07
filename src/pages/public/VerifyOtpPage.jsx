import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ShieldCheck, RefreshCw, Mail } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'

const RESEND_COOLDOWN_SECONDS = 60

const maskEmail = (value) => {
  if (!/^\S+@\S+\.\S+$/.test(value)) return 'your email'
  const [local, ...rest] = value.split('@')
  const domain = rest.join('@')
  if (!local) return value
  const visible = local.slice(0, 1)
  const maskedLocal = visible + '*'.repeat(Math.min(4, Math.max(2, local.length - 1)))
  return `${maskedLocal}@${domain}`
}

export const VerifyOtpPage = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { resendOtp } = useApp()

  const mode = params.get('mode') === 'login' ? 'login' : 'signup'
  const rawEmail = params.get('email') || ''
  const email = rawEmail.toLowerCase()
  const redirectTo = params.get('redirect') || '/dashboard'

  const [error, setError] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendIn, setResendIn] = useState(RESEND_COOLDOWN_SECONDS)

  const validEmail = useMemo(() => /^\S+@\S+\.\S+$/.test(email), [email])
  const isSignup = mode === 'signup'

  useEffect(() => {
    if (resendIn <= 0) return undefined
    const timer = setTimeout(() => setResendIn((prev) => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendIn])

  useEffect(() => {
    if (!email) {
      navigate((mode === 'login' ? '/login' : '/register') + (redirectTo !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''), { replace: true })
    }
  }, [email, mode, navigate, redirectTo])

  const handleResend = async () => {
    if (resendIn > 0 || isResending) return
    setIsResending(true)
    setError('')
    try {
      const result = await resendOtp({ mode, email })
      if (!result.ok) {
        setError(result.error || 'Unable to send a new email right now.')
        return
      }
      setResendIn(RESEND_COOLDOWN_SECONDS)
      addToast({
        title: isSignup ? 'Confirmation email sent' : 'Sign-in link sent',
        message: isSignup
          ? `A fresh confirmation link is on its way to ${email}.`
          : `A fresh sign-in link is on its way to ${email}.`,
        type: 'success'
      })
    } finally {
      setIsResending(false)
    }
  }

  const changeEmailTo = (base) =>
    base + (redirectTo !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectTo)}` : '')

  return (
    <div className="py-12 sm:py-20 bg-sand-50 dark:bg-charcoal-950 min-h-[85vh] flex items-center transition-colors duration-200">
      <Container size="sm">
        <div className="text-center mb-8 space-y-2">
          <Link to="/" className="inline-flex items-center justify-center gap-2.5 mb-3 animate-fade-in">
            <img
              src="/ecosprint-tree.png"
              alt=""
              width={48}
              height={50}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              decoding="async"
              draggable={false}
            />
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-charcoal-950 dark:text-charcoal-50">
              EcoSprint
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 dark:text-charcoal-50 tracking-tight">
            Check your email
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 max-w-sm mx-auto leading-relaxed">
            {isSignup
              ? 'Verify your new EcoSprint account with one quick click.'
              : 'We sent a secure sign-in link to your inbox — just click it to sign in.'}
          </p>
        </div>

        <Card className="bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-card max-w-md mx-auto p-6 sm:p-8 space-y-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-100 dark:bg-forest-900/60 text-forest-700 dark:text-forest-300 ring-1 ring-forest-200 dark:ring-forest-800">
              <Mail className="w-8 h-8" />
            </span>
            <p className="text-sm text-charcoal-700 dark:text-charcoal-200 leading-relaxed">
              We sent a {isSignup ? 'confirmation link' : 'secure sign-in link'} to{' '}
              <strong className="font-semibold text-charcoal-900 dark:text-charcoal-100">
                {validEmail ? maskEmail(email) : 'your email'}
              </strong>
              .
            </p>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
              {isSignup
                ? 'Please check your inbox and click the confirmation link to verify your email address.'
                : 'Click the link in the email to sign in to EcoSprint.'}
            </p>
          </div>

          {error && (
            <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <Button
            id="resend-email"
            type="button"
            variant="primary"
            size="md"
            isLoading={isResending}
            disabled={resendIn > 0 || isResending}
            onClick={handleResend}
            className="w-full justify-center"
            rightIcon={RefreshCw}
          >
            {resendIn > 0 ? `Resend email in ${resendIn}s` : isResending ? 'Sending…' : 'Resend email'}
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 border-t border-charcoal-100 dark:border-charcoal-800 text-xs">
            <Link
              to={changeEmailTo(isSignup ? '/register' : '/login')}
              className="font-semibold text-forest-700 dark:text-forest-400 hover:underline"
            >
              Use a different email
            </Link>
            <span className="hidden sm:inline text-charcoal-300 dark:text-charcoal-700">•</span>
            <Link
              to={changeEmailTo('/login')}
              className="font-semibold text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200 transition-colors"
            >
              Back to sign in
            </Link>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-charcoal-500 dark:text-charcoal-400">
            <ShieldCheck className="w-4 h-4 shrink-0 text-forest-700 dark:text-forest-400 mt-0.5" />
            <p className="leading-relaxed">
              {isSignup
                ? 'Once you confirm, you’ll be signed in and taken to your dashboard automatically. Didn’t receive it? Check your spam or promotions folder.'
                : 'The sign-in link is sent by Supabase, is single-use, and expires shortly after it is issued. Never forward it — EcoSprint will never ask you to share it.'}
            </p>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default VerifyOtpPage