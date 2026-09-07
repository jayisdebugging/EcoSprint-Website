import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Lock, Mail, Eye, EyeOff, Send, KeyRound } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'
import { supabase, SUPABASE_CONFIGURED, SUPABASE_CONFIG_MESSAGE } from '../../lib/supabase'
import { cn } from '../../utils/cn'
import { homeForRole } from '../../utils/roles'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotError, setForgotError] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState('password')
  const [otpEmail, setOtpEmail] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)

  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { addToast } = useToast()
  const { login, resendOtp } = useApp()

  const redirectTo = params.get('redirect') || '/dashboard'

  const validate = () => {
    const errs = {}
    if (!email.trim()) errs.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email address'
    if (!password) errs.password = 'Password is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setIsLoading(true)
    try {
      const result = await login(email.trim(), password, { remember: rememberMe })
      if (!result.ok) {
        setFormError(result.error || 'Unable to sign in')
        return
      }
      addToast({
        title: 'Welcome back',
        message: `Signed in as ${result.user.name}.`,
        type: 'success'
      })
      const target = params.get('redirect') ? redirectTo : homeForRole(result.user?.role)
      navigate(target.startsWith('/') ? target : homeForRole(result.user?.role), { replace: true })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setOtpError('')
    if (!otpEmail.trim()) {
      setOtpError('Enter your account email address.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(otpEmail.trim())) {
      setOtpError('Please enter a valid email address.')
      return
    }

    setOtpLoading(true)
    try {
      const result = await resendOtp({ mode: 'login', email: otpEmail.trim() })
      if (!result.ok) {
        setOtpError(result.error || 'Could not send a code. Check the email and try again.')
        return
      }
      navigate(
        `/verify-otp?mode=login&email=${encodeURIComponent(otpEmail.trim())}${
          redirectTo !== '/dashboard' ? `&redirect=${encodeURIComponent(redirectTo)}` : ''
        }`,
        { replace: true }
      )
    } finally {
      setOtpLoading(false)
    }
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    setForgotError('')
    if (!forgotEmail.trim()) {
      setForgotError('Enter your account email address.')
      return
    }
    if (!SUPABASE_CONFIGURED) {
      setForgotError(SUPABASE_CONFIG_MESSAGE)
      return
    }
    setForgotLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
      redirectTo: `${window.location.origin}/login`
    })
    setForgotLoading(false)
    if (error) {
      setForgotError(error.message || 'Could not send a reset link. Check the email and try again.')
      return
    }
    setForgotSent(true)
  }

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
            Log in to EcoSprint
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 max-w-sm mx-auto">
            Sign in to open your workspace, Sprint Room, labs, and credentials.
          </p>
        </div>

        <Card className="bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-card max-w-md mx-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-1 p-1 bg-sand-100 dark:bg-charcoal-800 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMode('password')
                setOtpError('')
                setFormError('')
              }}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-md px-3 py-2 transition-colors',
                authMode === 'password'
                  ? 'bg-white dark:bg-charcoal-900 text-charcoal-900 dark:text-charcoal-100 shadow-subtle'
                  : 'text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200'
              )}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Password
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('otp')
                setOtpError('')
                setFormError('')
              }}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-md px-3 py-2 transition-colors',
                authMode === 'otp'
                  ? 'bg-white dark:bg-charcoal-900 text-charcoal-900 dark:text-charcoal-100 shadow-subtle'
                  : 'text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-700 dark:hover:text-charcoal-200'
              )}
            >
              <Mail className="w-3.5 h-3.5" />
              Passwordless
            </button>
          </div>

          {formError && (
            <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">
              {formError}
            </div>
          )}

          {authMode === 'password' ? (
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <Input
              label="Email"
              type="email"
              required
              value={email}
              error={errors.email}
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              leftIcon={Mail}
              placeholder="you@company.com"
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              error={errors.password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
              }}
              leftIcon={Lock}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 transition-colors p-1 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-charcoal-300 dark:border-charcoal-700 text-forest-700 dark:text-forest-500 focus:ring-forest-600 dark:focus:ring-forest-500 bg-white dark:bg-charcoal-800"
                />
                <span>Remember this session</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-forest-700 dark:text-forest-400 hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full justify-center mt-2"
              rightIcon={ArrowRight}
            >
              Sign in
            </Button>
          </form>
          ) : (
            <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
              {otpError && (
                <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">
                  {otpError}
                </div>
              )}
              <Input
                label="Email"
                type="email"
                required
                value={otpEmail}
                error={undefined}
                autoComplete="email"
                onChange={(e) => {
                  setOtpEmail(e.target.value)
                  if (otpError) setOtpError('')
                }}
                leftIcon={Mail}
                placeholder="you@company.com"
              />
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 -mt-1">
                We'll email you a secure sign-in link you can click to sign in — no password
                needed. Only works for existing accounts.
              </p>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={otpLoading}
                className="w-full justify-center mt-2"
                rightIcon={Send}
              >
                Send sign-in link
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 text-center text-xs text-charcoal-500 dark:text-charcoal-400">
            <span>New to EcoSprint? </span>
            <Link
              to={`/register${params.get('redirect') ? `?redirect=${encodeURIComponent(params.get('redirect'))}` : ''}`}
              className="font-bold text-forest-700 dark:text-forest-400 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </Card>
      </Container>

      <Modal
        isOpen={forgotModalOpen}
        onClose={() => {
          setForgotModalOpen(false)
          setForgotSent(false)
          setForgotError('')
          setForgotEmail('')
        }}
        title={forgotSent ? 'Reset link sent' : 'Reset your password'}
        description="We'll email you a secure link to set a new password."
        maxWidth="max-w-sm"
      >
        {forgotSent ? (
          <div className="space-y-3 text-xs">
            <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
              If an account exists for <strong>{forgotEmail}</strong>, a password reset email is on its way. Check your inbox (and spam folder), then follow the link to choose a new password.
            </p>
            <div className="pt-3 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setForgotModalOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleForgot} className="space-y-3">
            {forgotError && (
              <p className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">
                {forgotError}
              </p>
            )}
            <Input
              label="Account email"
              type="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="you@company.com"
              leftIcon={Mail}
            />
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setForgotModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                rightIcon={Send}
                isLoading={forgotLoading}
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default LoginPage
