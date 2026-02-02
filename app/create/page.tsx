'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../components/theme-provider'

type Visibility = 'public' | 'team' | 'private'

interface AgentData {
  name: string
  description: string
  avatar: string | null
  visibility: Visibility
  specialties: string[]
}

const SPECIALTY_OPTIONS = [
  'coding', 'research', 'writing', 'analysis', 
  'trading', 'design', 'marketing', 'support'
]

// Step indicator component
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
            step === currentStep
              ? 'bg-primary-500 text-white scale-110 shadow-lg'
              : step < currentStep
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}>
            {step < currentStep ? '✓' : step}
          </div>
          {step < totalSteps && (
            <div className={`w-8 h-1 mx-1 rounded ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

// Step 1: Name & Description
function StepBasicInfo({ 
  data, 
  onChange 
}: { 
  data: AgentData
  onChange: (updates: Partial<AgentData>) => void 
}) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🤖</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your Agent
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Give your agent a name and describe what it does
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Agent Name *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g., CodeHelper, ResearchBot, TradingGuru"
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          maxLength={50}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {data.name.length}/50 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe what your agent specializes in and how it can help others..."
          rows={4}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          maxLength={300}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {data.description.length}/300 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Specialties
        </label>
        <div className="flex flex-wrap gap-2">
          {SPECIALTY_OPTIONS.map((specialty) => (
            <button
              key={specialty}
              type="button"
              onClick={() => {
                const current = data.specialties
                const updated = current.includes(specialty)
                  ? current.filter(s => s !== specialty)
                  : [...current, specialty]
                onChange({ specialties: updated })
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                data.specialties.includes(specialty)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step 2: Avatar
function StepAvatar({ 
  data, 
  onChange 
}: { 
  data: AgentData
  onChange: (updates: Partial<AgentData>) => void 
}) {
  const avatarOptions = [
    { emoji: '🤖', label: 'Robot' },
    { emoji: '🧠', label: 'Brain' },
    { emoji: '⚡', label: 'Lightning' },
    { emoji: '🎯', label: 'Target' },
    { emoji: '🚀', label: 'Rocket' },
    { emoji: '💎', label: 'Diamond' },
    { emoji: '🦊', label: 'Fox' },
    { emoji: '🦁', label: 'Lion' },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">{data.avatar || '🎨'}</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose an Avatar
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Pick an icon that represents your agent
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
        {avatarOptions.map(({ emoji, label }) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onChange({ avatar: emoji })}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              data.avatar === emoji
                ? 'bg-primary-100 dark:bg-primary-900/50 border-2 border-primary-500 scale-105'
                : 'bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-3xl">{emoji}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
          </button>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Custom avatar upload coming soon! 📷
        </p>
      </div>
    </div>
  )
}

// Step 3: Visibility
function StepVisibility({ 
  data, 
  onChange 
}: { 
  data: AgentData
  onChange: (updates: Partial<AgentData>) => void 
}) {
  const visibilityOptions: { value: Visibility; icon: string; title: string; description: string }[] = [
    {
      value: 'public',
      icon: '🌐',
      title: 'Public',
      description: 'Anyone can discover and chat with your agent'
    },
    {
      value: 'team',
      icon: '👥',
      title: 'Friends Only',
      description: 'Only approved friends can access your agent'
    },
    {
      value: 'private',
      icon: '🔒',
      title: 'Private',
      description: 'Only you can use this agent'
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Set Visibility
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Control who can access your agent
        </p>
      </div>

      <div className="space-y-3">
        {visibilityOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange({ visibility: option.value })}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              data.visibility === option.value
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{option.icon}</span>
              <div>
                <h3 className={`font-semibold ${
                  data.visibility === option.value 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
              {data.visibility === option.value && (
                <div className="ml-auto text-primary-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Step 4: Review
function StepReview({ data }: { data: AgentData }) {
  const visibilityLabels = {
    public: { icon: '🌐', label: 'Public' },
    team: { icon: '👥', label: 'Friends Only' },
    private: { icon: '🔒', label: 'Private' }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review Your Agent
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Make sure everything looks good before creating
        </p>
      </div>

      {/* Preview Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-3xl">
            {data.avatar || '🤖'}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {data.name || 'Unnamed Agent'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                data.visibility === 'public' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  : data.visibility === 'team'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {visibilityLabels[data.visibility].icon} {visibilityLabels[data.visibility].label}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {data.description || 'No description provided'}
        </p>

        {data.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.specialties.map((specialty) => (
              <span 
                key={specialty}
                className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-amber-500">💡</span>
          <div>
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
              Ready to create?
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              You can edit these settings anytime after creation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreateAgentPage() {
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [created, setCreated] = useState(false)
  const [data, setData] = useState<AgentData>({
    name: '',
    description: '',
    avatar: null,
    visibility: 'public',
    specialties: []
  })

  const totalSteps = 4

  const updateData = (updates: Partial<AgentData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.name.trim().length >= 3 && data.description.trim().length >= 10
      case 2:
        return data.avatar !== null
      case 3:
        return true
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCreate = async () => {
    setIsCreating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsCreating(false)
    setCreated(true)
  }

  if (created) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Agent Created!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            <strong>{data.name}</strong> is now live and ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/agents"
              className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              View All Agents
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <span className="text-xl font-bold gradient-text">HeyAgent</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <StepIndicator currentStep={step} totalSteps={totalSteps} />

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          {step === 1 && <StepBasicInfo data={data} onChange={updateData} />}
          {step === 2 && <StepAvatar data={data} onChange={updateData} />}
          {step === 3 && <StepVisibility data={data} onChange={updateData} />}
          {step === 4 && <StepReview data={data} />}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                ← Back
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                  canProceed()
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={isCreating}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>✨ Create Agent</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Cancel link */}
        <div className="text-center mt-6">
          <Link
            href="/agents"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel and go back
          </Link>
        </div>
      </div>
    </div>
  )
}
