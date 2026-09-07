import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, User, Mail, Lock, Eye, EyeOff, GraduationCap, School, Check } from 'lucide-react'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'
import { homeForRole } from '../../utils/roles'
import { cn } from '../../utils/cn'

const ROLE_OPTIONS = [
  {
    value: 'learner',
    title: 'Learner',
    icon: GraduationCap,
    description: 'Learn sustainability skills, complete projects and earn credentials.'
  },
  {
    value: 'teacher',
    title: 'Teacher / Mentor',
    icon: School,
    description: 'Teach, mentor learners and manage learning/cohort content.'
  }
]

export const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { addToast } = useToast()
  const { register } = useApp()

  const redirectTo = params.get('redirect') || '/dashboard'

  const interestOptions = [
    'Carbon Accounting',
    'Circular Economy',
    'ESG Reporting',
    'Sustainable Supply Chains',
    'Climate Risk'
  ]

  const toggleInterest = (topic) => {
    setSelectedInterests((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    )
  }

  const validate = () => {
    const errs = {}
    if (!name.trim() || name.trim().length < 2) errs.name = 'Full name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email address'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (!role) errs.role = 'Please choose how you will use EcoSprint'
    if (!agreedTerms) errs.terms = 'Please accept the terms to create an account'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setIsLoading(true)
    try {
      const result = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        interests: selectedInterests
      })
      if (result.needsConfirmation || result.needsOtp) {
        navigate(
          `/verify-otp?mode=signup&email=${encodeURIComponent(email.trim())}${
            redirectTo !== '/dashboard' ? `&redirect=${encodeURIComponent(redirectTo)}` : ''
          }`,
          { replace: true }
        )
        return
      }
      if (!result.ok) {
        setFormError(result.error || 'Unable to create account')
        return
      }
      const roleLabel = result.user?.role === 'teacher' ? 'a teacher' : 'a learner'
      addToast({
        title: 'Account created',
        message: `You are signed in as ${roleLabel}.`,
        type: 'success'
      })
      const target = params.get('redirect') ? redirectTo : homeForRole(result.user?.role)
      navigate(target.startsWith('/') ? target : homeForRole(result.user?.role), { replace: true })
    } finally {
      setIsLoading(false)
    }
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
            Create your EcoSprint account
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 max-w-sm mx-auto">
            Register as a learner to enroll in Sprints, complete labs, and earn credentials — or as a teacher to lead cohorts.
          </p>
        </div>

        <Card className="bg-white dark:bg-charcoal-900 border border-charcoal-200/90 dark:border-charcoal-800 shadow-card max-w-md mx-auto p-6 sm:p-8 space-y-6">
          {formError && (
            <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">
              {formError}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            <Input
              label="Full name"
              required
              value={name}
              error={errors.name}
              autoComplete="name"
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              leftIcon={User}
              placeholder="Your name"
            />

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
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
              }}
              leftIcon={Lock}
              placeholder="At least 8 characters"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <Input
              label="Confirm password"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              error={errors.confirmPassword}
              autoComplete="new-password"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
              }}
              leftIcon={Lock}
              placeholder="Re-enter password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 transition-colors p-1"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {/* How will you use EcoSprint */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
                How will you use EcoSprint?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ROLE_OPTIONS.map((option) => {
                  const active = role === option.value
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setRole(option.value)
                        if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }))
                      }}
                      className={cn(
                        'flex flex-col items-start gap-1.5 text-left p-3.5 rounded-lg border bg-sand-50/60 dark:bg-charcoal-800 transition-all duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600/40',
                        active
                          ? 'border-forest-600 dark:border-forest-500 ring-2 ring-forest-600/20 dark:ring-forest-500/20 bg-forest-50/70 dark:bg-forest-950/40'
                          : 'border-charcoal-200 dark:border-charcoal-700 hover:border-charcoal-300 dark:hover:border-charcoal-600'
                      )}
                    >
                      <span className="flex items-center justify-between w-full">
                        <span
                          className={cn(
                            'flex items-center gap-2 text-sm font-bold',
                            active ? 'text-forest-800 dark:text-forest-300' : 'text-charcoal-800 dark:text-charcoal-200'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-4 h-4',
                              active ? 'text-forest-700 dark:text-forest-400' : 'text-charcoal-400 dark:text-charcoal-500'
                            )}
                          />
                          {option.title}
                        </span>
                        <span
                          className={cn(
                            'flex items-center justify-center w-5 h-5 rounded-full border transition-colors',
                            active
                              ? 'bg-forest-700 dark:bg-forest-500 border-forest-700 dark:border-forest-500 text-white'
                              : 'border-charcoal-300 dark:border-charcoal-600 text-transparent'
                          )}
                        >
                          <Check className="w-3 h-3" />
                        </span>
                      </span>
                      <span className="text-[11px] leading-relaxed text-charcoal-500 dark:text-charcoal-400">
                        {option.description}
                      </span>
                    </button>
                  )
                })}
              </div>
              {errors.role && <p className="text-xs text-rose-600 font-medium">{errors.role}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
                Learning interests (optional)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map((topic) => {
                  const active = selectedInterests.includes(topic)
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleInterest(topic)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
                        active
                          ? 'bg-forest-800 dark:bg-forest-700 text-white border-forest-800 dark:border-forest-600'
                          : 'bg-sand-50 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400 border-charcoal-200 dark:border-charcoal-700'
                      }`}
                    >
                      {topic}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-1">
              <label className="flex items-start gap-2.5 text-xs text-charcoal-600 dark:text-charcoal-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => {
                    setAgreedTerms(e.target.checked)
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }))
                  }}
                  className="mt-0.5 rounded border-charcoal-300 dark:border-charcoal-700 text-forest-700 dark:text-forest-500 focus:ring-forest-600 bg-white dark:bg-charcoal-800"
                />
                <span>
                  I agree to EcoSprint’s terms of use. Admin and company access is not self-serve and can only be granted by EcoSprint administrators.
                </span>
              </label>
              {errors.terms && <p className="text-xs text-rose-600 font-medium pl-6">{errors.terms}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full justify-center mt-2"
              rightIcon={ArrowRight}
            >
              Create account
            </Button>
          </form>

          <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 text-center text-xs text-charcoal-500 dark:text-charcoal-400">
            <span>Already have an account? </span>
            <Link
              to={`/login${params.get('redirect') ? `?redirect=${encodeURIComponent(params.get('redirect'))}` : ''}`}
              className="font-bold text-forest-700 dark:text-forest-400 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default RegisterPage