'use client'

import { useState, useEffect } from 'react'

interface ThinkingIndicatorProps {
  agentName: string
  variant?: 'dots' | 'pulse' | 'brain' | 'steps'
  showStatus?: boolean
}

// Thinking status messages that cycle
const thinkingStatuses = [
  'Processing your request...',
  'Analyzing context...',
  'Formulating response...',
  'Almost there...',
]

export function ThinkingIndicator({ 
  agentName, 
  variant = 'brain',
  showStatus = true 
}: ThinkingIndicatorProps) {
  const [statusIndex, setStatusIndex] = useState(0)

  // Cycle through status messages
  useEffect(() => {
    if (!showStatus) return
    
    const interval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % thinkingStatuses.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [showStatus])

  return (
    <div className="flex justify-start animate-message-in">
      {/* Agent Avatar */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-2 flex-shrink-0 shadow-sm">
        {agentName.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-500 ml-1 mb-1">{agentName}</span>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700 px-4 py-3">
          {variant === 'dots' && <DotsAnimation />}
          {variant === 'pulse' && <PulseAnimation />}
          {variant === 'brain' && <BrainAnimation />}
          {variant === 'steps' && <StepsAnimation />}
        </div>

        {showStatus && (
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-1 mt-1.5 animate-fade-in" key={statusIndex}>
            {thinkingStatuses[statusIndex]}
          </span>
        )}
      </div>
    </div>
  )
}

// Classic three dots animation
function DotsAnimation() {
  return (
    <div className="flex gap-1.5 items-center h-5">
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-typing-dot" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-typing-dot" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-typing-dot" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

// Pulsing circle animation
function PulseAnimation() {
  return (
    <div className="flex items-center gap-2 h-5">
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 bg-primary-400 dark:bg-primary-500 rounded-full animate-ping opacity-75" />
        <div className="absolute inset-1 bg-primary-500 dark:bg-primary-400 rounded-full" />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">Thinking</span>
    </div>
  )
}

// Brain/thinking emoji animation
function BrainAnimation() {
  return (
    <div className="flex items-center gap-2 h-5">
      <div className="relative">
        <span className="text-lg animate-pulse">🧠</span>
        <div className="absolute -top-0.5 -right-0.5">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
          </span>
        </div>
      </div>
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
        <span className="w-1.5 h-1.5 bg-primary-400 dark:bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
      </div>
    </div>
  )
}

// Steps/progress animation
function StepsAnimation() {
  const [step, setStep] = useState(0)
  const steps = ['Reading', 'Thinking', 'Writing']

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % steps.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3 h-5">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === step 
              ? 'bg-primary-500 scale-125' 
              : i < step 
                ? 'bg-green-500' 
                : 'bg-gray-300 dark:bg-gray-600'
          }`} />
          <span className={`text-xs transition-colors duration-300 ${
            i === step 
              ? 'text-primary-600 dark:text-primary-400 font-medium' 
              : 'text-gray-400 dark:text-gray-500'
          }`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

// Compact inline thinking indicator for headers/badges
export function ThinkingBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
      </span>
      Thinking
    </span>
  )
}

// Full-width processing bar for page-level loading
export function ProcessingBar({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 animate-processing-bar" />
    </div>
  )
}
