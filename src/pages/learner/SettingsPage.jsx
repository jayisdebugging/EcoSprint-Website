import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Bell,
  Shield,
  Eye,
  Lock,
  Globe,
  Check,
  Info,
  KeyRound,
  Mail,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Tabs } from '../../components/ui/Tabs'
import { Modal } from '../../components/ui/Modal'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account')
  const { user, preferences, setPreferences, changePassword, deleteAccount } = useApp()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const handleDeleteAccount = async () => {
    if (isDeleting) return
    setIsDeleting(true)
    setDeleteError('')
    const result = await deleteAccount()
    setIsDeleting(false)
    if (!result.ok) {
      setDeleteError(result.error || 'Unable to delete your account right now. Please try again.')
      return
    }
    setDeleteModalOpen(false)
    addToast({ title: 'Account deleted', message: 'Your account has been deleted.', type: 'success' })
    navigate('/', { replace: true })
  }

  const prefs = preferences || {}

  // Account / password
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  // Notifications
  const [emailDigest, setEmailDigest] = useState(prefs.emailDigest !== false)
  const [mentorReminders, setMentorReminders] = useState(prefs.mentorReminders !== false)
  const [careerAlerts, setCareerAlerts] = useState(prefs.careerAlerts !== false)
  const [peerActivity, setPeerActivity] = useState(prefs.peerActivity === true)

  // Regional
  const [language, setLanguage] = useState(prefs.language || 'English (UK)')
  const [timezone, setTimezone] = useState(prefs.timezone || 'UTC+01:00 (Central European Time)')

  // Privacy
  const [publicProfile, setPublicProfile] = useState(prefs.publicProfile !== false)
  const [showCredentials, setShowCredentials] = useState(prefs.showCredentials !== false)
  const [allowTalentRecruiters, setAllowTalentRecruiters] = useState(prefs.allowTalentRecruiters !== false)

  const handleSaveNotifications = async () => {
    const next = { ...prefs, emailDigest, mentorReminders, careerAlerts, peerActivity }
    setPreferences(next)
    addToast({ title: 'Notification Preferences Saved', message: 'Your alert settings have been updated.', type: 'success' })
  }

  const handleSaveRegional = async () => {
    setPreferences({ ...prefs, language, timezone })
    addToast({ title: 'Regional Preferences Saved', message: 'Language and timezone settings updated.', type: 'success' })
  }

  const handleSavePrivacy = async () => {
    setPreferences({ ...prefs, publicProfile, showCredentials, allowTalentRecruiters })
    addToast({ title: 'Privacy Settings Saved', message: 'Your talent visibility preferences were updated.', type: 'success' })
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      addToast({ title: 'Password too short', message: 'Use at least 6 characters.', type: 'error' })
      return
    }
    if (newPassword !== confirmPassword) {
      addToast({ title: 'Passwords do not match', message: 'New password and confirmation must match.', type: 'error' })
      return
    }
    setPasswordLoading(true)
    const result = await changePassword(currentPassword, newPassword)
    setPasswordLoading(false)
    if (!result.ok) {
      addToast({ title: 'Password change failed', message: result.error || 'Please try again.', type: 'error' })
      return
    }
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    addToast({ title: 'Password Updated', message: 'Use your new password the next time you sign in.', type: 'success' })
  }

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">Workspace Settings</h1>
        <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
          Configure account security, notification cadences, learning preferences, and privacy.
        </p>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'account', label: 'Account & Security', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'preferences', label: 'Learning Preferences', icon: Globe },
          { id: 'privacy', label: 'Privacy & Sharing', icon: Shield },
        ]}
      />

      {/* ACCOUNT SECTION */}
      {activeTab === 'account' && (
        <>
        <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 space-y-6 border border-charcoal-200 dark:border-charcoal-800">
          <div className="space-y-1 border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
            <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Account Credentials</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Signed in via Supabase Auth. Manage your email and password below.</p>
          </div>

          <div className="space-y-4 text-xs max-w-lg">
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
                Registered Email Address
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/60 dark:bg-charcoal-800 text-charcoal-900 dark:text-charcoal-100">
                <Mail className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                <span className="font-medium">{user.email || '—'}</span>
                <Badge variant="forest" size="sm" className="ml-auto">Verified</Badge>
              </div>
              <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                Email changes are managed by Supabase Auth. Contact support if you need to change it.
              </p>
            </div>
          </div>

          <div className="space-y-1 border-t border-charcoal-100 dark:border-charcoal-800 pt-4">
            <h4 className="text-sm font-bold text-charcoal-900 dark:text-charcoal-50 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-forest-700 dark:text-forest-400" /> Change Password
            </h4>
            <form onSubmit={handleChangePassword} className="space-y-3 max-w-lg text-xs pt-2">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                />
              </div>
              <div className="pt-2">
                <Button type="submit" variant="primary" size="sm" leftIcon={Lock} isLoading={passwordLoading}>
                  Update Password
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-1 border-t border-charcoal-100 dark:border-charcoal-800 pt-4">
            <span className="text-sm font-bold text-charcoal-900 dark:text-charcoal-50 flex items-center gap-2">
              <Shield className="w-4 h-4 text-forest-700 dark:text-forest-400" />Two-Factor Authentication
            </span>
            <div className="p-3.5 rounded-lg bg-sand-50 dark:bg-charcoal-800/60 border border-charcoal-200 dark:border-charcoal-700 flex items-center justify-between mt-2">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-charcoal-400" />
                <div>
                  <p className="font-bold text-charcoal-900 dark:text-charcoal-50">Managed by Supabase Auth</p>
                  <span className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
                    Enable 2FA (TOTP) for your account from your Supabase project's Auth settings.
                  </span>
                </div>
              </div>
              <Badge variant="neutral" size="sm">Not enabled</Badge>
            </div>
          </div>
        </Card>

        {/* DANGER ZONE */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 space-y-6 border border-rose-200 dark:border-rose-900/60 shadow-card">
          <div className="space-y-1 border-b border-rose-100 dark:border-rose-900/50 pb-3">
            <h3 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Danger Zone
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
              Irreversible actions on your account. These cannot be undone once confirmed.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-charcoal-900 dark:text-charcoal-50">Delete your account</h4>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 max-w-lg leading-relaxed">
              Permanently delete your EcoSprint account and associated data. This also removes your
              profile, enrollments, progress, projects, quiz results, credentials, and saved items from
              the platform. Verification links for past credentials will no longer resolve.
            </p>
            <div className="pt-3">
              <Button
                variant="danger"
                size="sm"
                leftIcon={Trash2}
                onClick={() => {
                  setDeleteError('')
                  setDeleteModalOpen(true)
                }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => {
            if (!isDeleting) setDeleteModalOpen(false)
          }}
          title="Delete your account?"
          description="This will permanently delete your EcoSprint account and associated data. This action cannot be undone."
          maxWidth="max-w-md"
        >
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-700 dark:text-rose-400 mt-0.5" />
              <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                Your profile, enrollments, lesson progress, quiz results, projects, submissions,
                credentials, saved items and notifications will be removed. Signed in as{' '}
                <strong className="font-semibold text-charcoal-900 dark:text-charcoal-100">{user?.email || 'you'}</strong>.
              </p>
            </div>
            {deleteError && (
              <p className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg px-3 py-2">
                {deleteError}
              </p>
            )}
            <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
              If you confirm, you will be signed out immediately and will not be able to log back
              in with this account.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={Trash2}
              isLoading={isDeleting}
              onClick={handleDeleteAccount}
            >
              {isDeleting ? 'Deleting…' : 'Delete my account'}
            </Button>
          </div>
        </Modal>
        </>
      )}
      {activeTab === 'notifications' && (
        <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 space-y-6 border border-charcoal-200 dark:border-charcoal-800">
          <div className="space-y-1 border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
            <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Notification Alerts</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Choose which updates you receive. Saved to your learner profile.</p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={mentorReminders}
                onChange={(e) => setMentorReminders(e.target.checked)}
                className="mt-1 rounded text-forest-700 focus:ring-forest-600"
              />
              <div>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Live Mentor Critique Reminders</span>
                <span className="text-charcoal-500 dark:text-charcoal-400">Receive alerts before scheduled cohort office hours and live juries.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="mt-1 rounded text-forest-700 focus:ring-forest-600"
              />
              <div>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Weekly Sprint Milestone Digest</span>
                <span className="text-charcoal-500 dark:text-charcoal-400">Summary of progress, deadline countdowns, and newly unlocked simulation labs.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={careerAlerts}
                onChange={(e) => setCareerAlerts(e.target.checked)}
                className="mt-1 rounded text-forest-700 focus:ring-forest-600"
              />
              <div>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Career Network Match Alerts</span>
                <span className="text-charcoal-500 dark:text-charcoal-400">Notifications when new sustainability job openings match your verified credentials.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={peerActivity}
                onChange={(e) => setPeerActivity(e.target.checked)}
                className="mt-1 rounded text-forest-700 focus:ring-forest-600"
              />
              <div>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Peer Review Comments</span>
                <span className="text-charcoal-500 dark:text-charcoal-400">Alerts when cohort peers post critique notes on your lab models.</span>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex justify-end">
            <Button variant="primary" size="sm" leftIcon={Check} onClick={handleSaveNotifications}>
              Save Notification Preferences
            </Button>
          </div>
        </Card>
      )}

      {/* PREFERENCES SECTION */}
      {activeTab === 'preferences' && (
        <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 space-y-6 border border-charcoal-200 dark:border-charcoal-800">
          <div className="space-y-1 border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
            <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Learning & Regional Preferences</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Timezone coordination for live sessions and unit standards.</p>
          </div>

          <div className="space-y-4 text-xs max-w-lg">
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase text-charcoal-700 dark:text-charcoal-300">Display Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-800 text-charcoal-900 dark:text-charcoal-100"
              >
                <option>English (UK)</option>
                <option>English (US)</option>
                <option>Deutsch</option>
                <option>Français</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase text-charcoal-700 dark:text-charcoal-300">Cohort Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/70 dark:bg-charcoal-800 text-charcoal-900 dark:text-charcoal-100"
              >
                <option>UTC+00:00 (London, Dublin, Lisbon)</option>
                <option>UTC+01:00 (Central European Time: Berlin, Paris, Stockholm)</option>
                <option>UTC-05:00 (Eastern Time: New York, Toronto)</option>
                <option>UTC-08:00 (Pacific Time: San Francisco)</option>
                <option>UTC+08:00 (Singapore, Perth)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex justify-end">
            <Button variant="primary" size="sm" leftIcon={Check} onClick={handleSaveRegional}>
              Save Regional Preferences
            </Button>
          </div>
        </Card>
      )}

      {/* PRIVACY SECTION */}
      {activeTab === 'privacy' && (
        <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 space-y-6 border border-charcoal-200 dark:border-charcoal-800">
          <div className="space-y-1 border-b border-charcoal-100 dark:border-charcoal-800 pb-3">
            <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50">Privacy & Talent Visibility</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Control who can discover your verified portfolio and contact you.</p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowTalentRecruiters}
                onChange={(e) => setAllowTalentRecruiters(e.target.checked)}
                className="mt-1 rounded text-forest-700 focus:ring-forest-600"
              />
              <div>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Allow Verified Hiring Partners to Contact Me</span>
                <span className="text-charcoal-500 dark:text-charcoal-400">Enterprise sustainability recruiters in our Career Network can view your completed capstones.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showCredentials}
                onChange={(e) => setShowCredentials(e.target.checked)}
                className="mt-1 rounded text-forest-700 focus:ring-forest-600"
              />
              <div>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Public Credential Verification</span>
                <span className="text-charcoal-500 dark:text-charcoal-400">Allow third-party auditors and employers to verify credentials via /verify/:id link.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publicProfile}
                onChange={(e) => setPublicProfile(e.target.checked)}
                className="mt-1 rounded text-forest-700 focus:ring-forest-600"
              />
              <div>
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">Show Profile in Cohort Fellow Directory</span>
                <span className="text-charcoal-500 dark:text-charcoal-400">Display your profile to other learners in your active cohort room.</span>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-charcoal-100 dark:border-charcoal-800 flex justify-end">
            <Button variant="primary" size="sm" leftIcon={Check} onClick={handleSavePrivacy}>
              Save Privacy Settings
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default SettingsPage