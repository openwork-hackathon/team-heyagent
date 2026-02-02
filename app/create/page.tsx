'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../components/theme-provider'
import { VisibilitySelector } from '../components/privacy'

type Step = 1 | 2 | 3 | 4

interface AgentData {
  name: string
  personality: 'friendly' | 'professional' | 'casual' | 'custom'
  avatar: string | null
  aboutYou: string
  tone: number // 0-100 (formal to casual)
  responseLength: number // 0-100 (brief to detailed)
  approvalLevel: 'all' | 'important' | 'none'
  visibility: 'public' | 'friends' | 'private'
}

const AVATAR_OPTIONS = [
  { emoji: '🤖', label: 'Robot' },
  { emoji: '🧑‍💼', label: 'Professional' },
  { emoji: '😊', label: 'Friendly' },
  { emoji: '🚀', label: 'Ambitious' },
  { emoji: '🎨', label: 'Creative' },
  { emoji: '💡', label: 'Innovator' },
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐻', label: 'Bear' },
]

const PERSONALITY_OPTIONS = [
  { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, uses casual language', emoji: '😊' },
  { value: 'professional', label: 'Professional', description: 'Formal, polished, business-appropriate', emoji: '👔' },
  { value: 'casual', label: 'Casual', description: 'Relaxed, conversational, like texting a friend', emoji: '🤙' },
  { value: 'custom', label: 'Custom', description: 'Define your own style', emoji: '✨' },
] as const

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

// Step 1: Name & Avatar
function StepNameAvatar({ 
  data, 
  onChange 
}: { 
  data: AgentData
  onChange: (updates: Partial<AgentData>) => void 
}) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">{data.avatar || '🤖'}</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your Agent
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Give your personal AI a name and face
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
          placeholder="e.g., My Assistant, Work Agent, Social Helper"
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          maxLength={50}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {data.name.length}/50 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Choose an Avatar
        </label>
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
          {AVATAR_OPTIONS.map(({ emoji, label }) => (
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
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Personality Style
        </label>
        <div className="grid gap-3">
          {PERSONALITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ personality: option.value })}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                data.personality === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              <div>
                <h4 className={`font-semibold ${
                  data.personality === option.value 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {option.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Step 2: About You
function StepAboutYou({ 
  data, 
  onChange 
}: { 
  data: AgentData
  onChange: (updates: Partial<AgentData>) => void 
}) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🧠</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Teach Your Agent
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The more you share, the better it represents you
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tell your agent about yourself
        </label>
        <textarea
          value={data.aboutYou}
          onChange={(e) => onChange({ aboutYou: e.target.value })}
          placeholder="I'm a software developer who loves hiking. I prefer brief, direct communication. I'm usually busy during work hours (9-5 PST) but responsive in evenings..."
          rows={6}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          maxLength={1000}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {data.aboutYou.length}/1000 characters
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-blue-500">💡</span>
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              What to include
            </p>
            <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
              <li>• Your communication style preferences</li>
              <li>• Your typical availability</li>
              <li>• Topics you frequently discuss</li>
              <li>• How you want to be represented</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
          Or connect your accounts (coming soon)
        </p>
        <div className="flex justify-center gap-3 opacity-50">
          <button disabled className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400">
            <span>𝕏</span> Twitter
          </button>
          <button disabled className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-400">
            <span>in</span> LinkedIn
          </button>
        </div>
      </div>
    </div>
  )
}

// Step 3: Behavior Settings
function StepBehavior({ 
  data, 
  onChange 
}: { 
  data: AgentData
  onChange: (updates: Partial<AgentData>) => void 
}) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Fine-tune Behavior
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Control how your agent responds
        </p>
      </div>

      {/* Tone slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Communication Tone
        </label>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 w-16">Formal</span>
          <input
            type="range"
            min="0"
            max="100"
            value={data.tone}
            onChange={(e) => onChange({ tone: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 w-16 text-right">Casual</span>
        </div>
      </div>

      {/* Response length slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Response Length
        </label>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 w-16">Brief</span>
          <input
            type="range"
            min="0"
            max="100"
            value={data.responseLength}
            onChange={(e) => onChange({ responseLength: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 w-16 text-right">Detailed</span>
        </div>
      </div>

      {/* Approval level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          When should your agent ask for approval?
        </label>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'Everything', description: 'Ask before every action', icon: '🔒' },
            { value: 'important', label: 'Important only', description: 'Ask before scheduling, sending emails, etc.', icon: '⚡' },
            { value: 'none', label: 'Never', description: 'Handle everything autonomously', icon: '🚀' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ approvalLevel: option.value as AgentData['approvalLevel'] })}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                data.approvalLevel === option.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="text-xl">{option.icon}</span>
              <div>
                <h4 className={`font-semibold ${
                  data.approvalLevel === option.value 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {option.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visibility setting */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Who can see your agent?
        </label>
        <VisibilitySelector 
          value={data.visibility} 
          onChange={(visibility) => onChange({ visibility })} 
        />
      </div>
    </div>
  )
}

// Step 4: Preview & Launch
function StepPreview({ data }: { data: AgentData }) {
  const sampleMessage = "Hey, are you available for a quick call tomorrow?"
  const sampleResponse = data.personality === 'professional' 
    ? `Thank you for reaching out. I'm checking ${data.name.split(' ')[0] || 'my owner'}'s calendar and will confirm availability shortly.`
    : data.personality === 'casual'
    ? `Hey! Let me check the schedule real quick and get back to you 👍`
    : `Hi there! I'd be happy to check availability for you. One moment please!`

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ready to Launch
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Preview how your agent will respond
        </p>
      </div>

      {/* Agent Card Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-3xl">
            {data.avatar || '🤖'}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {data.name || 'My Agent'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Always online
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {data.personality} style
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Conversation */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">Sample conversation</p>
        
        {/* Incoming message */}
        <div className="flex justify-start mb-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-900 dark:text-white">{sampleMessage}</p>
          </div>
        </div>

        {/* Agent response */}
        <div className="flex justify-end">
          <div className="bg-primary-500 rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
            <p className="text-sm text-white">{sampleResponse}</p>
            <p className="text-xs text-primary-200 mt-1 flex items-center gap-1">
              <span>🤖</span> Responding as your agent
            </p>
          </div>
        </div>
      </div>

      {/* Settings Summary */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <div className="flex gap-3">
          <span className="text-amber-500">⚙️</span>
          <div className="text-sm">
            <p className="text-amber-800 dark:text-amber-200 font-medium">Your settings</p>
            <p className="text-amber-700 dark:text-amber-300 mt-1">
              {data.approvalLevel === 'all' && 'Asks before every action'}
              {data.approvalLevel === 'important' && 'Asks before important actions only'}
              {data.approvalLevel === 'none' && 'Handles everything autonomously'}
              {' • '}
              Tone: {data.tone < 33 ? 'Formal' : data.tone < 66 ? 'Balanced' : 'Casual'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreateAgentPage() {
  const [step, setStep] = useState<Step>(1)
  const [isCreating, setIsCreating] = useState(false)
  const [created, setCreated] = useState(false)
  const [data, setData] = useState<AgentData>({
    name: '',
    personality: 'friendly',
    avatar: null,
    aboutYou: '',
    tone: 50,
    responseLength: 50,
    approvalLevel: 'important',
    visibility: 'public',
  })

  const totalSteps = 4

  const updateData = (updates: Partial<AgentData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.name.trim().length >= 2 && data.avatar !== null
      case 2:
        return data.aboutYou.trim().length >= 20
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
      setStep((step + 1) as Step)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step)
    }
  }

  const handleCreate = async () => {
    setIsCreating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Save agent to localStorage for persistence
    const newAgent = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'online',
      messagesHandled: 0,
      pendingApprovals: 0,
    }
    
    const existingAgents = JSON.parse(localStorage.getItem('heyagent-agents') || '[]')
    existingAgents.push(newAgent)
    localStorage.setItem('heyagent-agents', JSON.stringify(existingAgents))
    
    setIsCreating(false)
    setCreated(true)
  }

  if (created) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-warm-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Agent is Live!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            <strong>{data.name}</strong> is now online and ready to represent you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Go to My Agents
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Home
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
          {step === 1 && <StepNameAvatar data={data} onChange={updateData} />}
          {step === 2 && <StepAboutYou data={data} onChange={updateData} />}
          {step === 3 && <StepBehavior data={data} onChange={updateData} />}
          {step === 4 && <StepPreview data={data} />}

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
                  <>🚀 Launch Agent</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Cancel link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel and go back
          </Link>
        </div>
      </div>
    </div>
  )
}
