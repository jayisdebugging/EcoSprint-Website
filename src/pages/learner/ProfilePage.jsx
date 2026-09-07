import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Mail,
  MapPin,
  Building,
  Award,
  CheckCircle2,
  Edit3,
  Check,
  X,
  Plus,
  BookOpen,
  FolderGit2,
  ExternalLink
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { useApp } from '../../context/AppContext'

export const ProfilePage = () => {
  const { user, updateUser, credentialsList, projectsList } = useApp()
  const { addToast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name || 'Learner')
  const [headline, setHeadline] = useState(user.headline || '')
  const [bio, setBio] = useState(user.bio || '')
  const [location, setLocation] = useState(user.location || '')
  const [company, setCompany] = useState(user.company || '')
  const [skills, setSkills] = useState(user.skillsAcquired || [])
  const [newSkillInput, setNewSkillInput] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    updateUser({
      name,
      headline,
      bio,
      location,
      company,
      skillsAcquired: skills
    })
    setIsEditing(false)
    addToast({
      title: 'Profile Updated',
      message: 'Your public learner profile changes have been saved.',
      type: 'success'
    })
  }

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()])
      setNewSkillInput('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  const completedProjects = projectsList.filter((p) => p.status === 'Completed')

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900 dark:text-charcoal-50 tracking-tight">Learner Profile</h1>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
            Manage your verified talent portfolio, credentials, and employer representation.
          </p>
        </div>

        <Button
          variant={isEditing ? 'secondary' : 'outline'}
          size="sm"
          leftIcon={isEditing ? X : Edit3}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card className="bg-white dark:bg-charcoal-900 p-6 sm:p-8 space-y-6 border border-charcoal-200 dark:border-charcoal-800 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar src={user.avatar} name={name} size="xl" status="online" />
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-extrabold text-charcoal-950 dark:text-charcoal-50">{name}</h2>
              <Badge variant="forest" size="sm" dot>Verified Fellow</Badge>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-forest-800 dark:text-forest-400">{headline || 'EcoSprint Learner'}</p>
            {(company || location) && (
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                {[company, location].filter(Boolean).join(' • ')}
              </p>
            )}
          </div>
        </div>

        {/* Edit Form or Display Mode */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-charcoal-100 dark:border-charcoal-800 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Organization / Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Professional Headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
              />
              <Input
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
                Professional Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-sand-50/60 dark:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-600/30 text-charcoal-800 dark:text-charcoal-100 placeholder-charcoal-400 dark:placeholder-charcoal-500 resize-none"
              />
            </div>

            {/* Edit Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-300">
                Competencies & Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 text-xs bg-forest-50 dark:bg-forest-950/60 text-forest-900 dark:text-forest-200 border border-forest-200 dark:border-forest-800 px-2.5 py-1 rounded-full font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-forest-700 dark:text-forest-400 hover:text-rose-700 dark:hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 max-w-sm pt-1">
                <Input
                  placeholder="Add skill (e.g., TCFD Scenario)..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                />
                <Button type="button" variant="outline" size="sm" onClick={handleAddSkill}>
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" leftIcon={Check}>
                Save Profile
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 pt-4 border-t border-charcoal-100 dark:border-charcoal-800">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
                About / Bio
              </span>
              <p className="text-xs sm:text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed max-w-2xl">
                {bio}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
                Verified Technical Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <Badge key={i} variant="sage" size="md" dot>
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Completed Sprints & Capstones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Completed Sprints */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-forest-700 dark:text-forest-400" /> Completed Sprints
          </h3>
          {credentialsList.length > 0 ? (
            <div className="space-y-3 text-xs">
              {credentialsList.slice(0, 5).map((c) => (
                <div key={c.id} className="p-3 bg-sand-50 dark:bg-charcoal-800/60 rounded-lg border border-charcoal-200/60 dark:border-charcoal-700 space-y-1">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">{c.title}</span>
                  <p className="text-charcoal-500 dark:text-charcoal-400">Completed {c.issuedDate || '—'} • Verified</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No completed sprints yet"
              description="Finish a sprint to unlock cohorts and capstone dossiers here."
            />
          )}
        </Card>

        {/* Completed Capstone Dossiers */}
        <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-forest-700 dark:text-forest-400" /> Completed Capstones
          </h3>
          <div className="space-y-3 text-xs">
            {completedProjects.length > 0 ? (
              completedProjects.map((proj) => (
                <div key={proj.id} className="p-3 bg-sand-50 dark:bg-charcoal-800/60 rounded-lg border border-charcoal-200/60 dark:border-charcoal-700 space-y-1">
                  <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block">{proj.title}</span>
                  <p className="text-charcoal-500 dark:text-charcoal-400">Auditor Score: {proj.rubricScore || '—'}% • Submitted</p>
                </div>
              ))
            ) : (
              <EmptyState
                title="No capstone submissions yet"
                description="Your submitted and verified capstone dossiers will appear here."
              />
            )}
          </div>
        </Card>
      </div>

      {/* Verified Credentials Section */}
      <Card className="bg-white dark:bg-charcoal-900 p-6 space-y-4 border border-charcoal-200 dark:border-charcoal-800 shadow-subtle">
        <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-charcoal-800 pb-2">
          <h3 className="text-base font-bold text-charcoal-900 dark:text-charcoal-50 flex items-center gap-2">
            <Award className="w-4 h-4 text-forest-700 dark:text-forest-400" /> Verified Credentials Conferred
          </h3>
          <Link to="/credentials" className="text-xs font-semibold text-forest-800 dark:text-forest-400 hover:underline inline-flex items-center gap-1">
            Manage Credentials <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        {credentialsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {credentialsList.map((c) => (
              <div key={c.id} className="p-3.5 bg-sand-50/80 dark:bg-charcoal-800/60 rounded-lg border border-charcoal-200 dark:border-charcoal-700 space-y-1">
                <span className="font-bold text-charcoal-900 dark:text-charcoal-50 block truncate">{c.title}</span>
                <p className="text-[11px] font-mono text-charcoal-500 dark:text-charcoal-400">{c.credentialId}</p>
                <span className="text-[10px] text-forest-800 dark:text-forest-400 font-bold block">✓ Verified</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No credentials yet"
            description="Earn verifiable credentials by completing full sprints."
          />
        )}
      </Card>
    </div>
  )
}

export default ProfilePage
