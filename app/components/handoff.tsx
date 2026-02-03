'use client'

/**
 * Agent-to-agent handoff components
 * Demonstrates how agents can delegate tasks to each other
 * 
 * @module components/handoff
 */

import { useState } from 'react'

interface HandoffProps {
  fromAgent: string
  toAgent: string
  task: string
  onConfirm?: () => void
  onCancel?: () => void
}

/**
 * Handoff request card
 * Shows a pending delegation between two agents
 */
export function AgentHandoffCard({ 
  fromAgent, 
  toAgent, 
  task,
  onConfirm,
  onCancel
}: HandoffProps) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending')

  const handleConfirm = () => {
    setStatus('confirmed')
    onConfirm?.()
  }

  const handleCancel = () => {
    setStatus('cancelled')
    onCancel?.()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-primary-200 dark:border-primary-800 shadow-lg animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤝</span>
          <h3 className="font-bold text-gray-900 dark:text-white">Agent Handoff</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          status === 'pending' ? 'bg-amber-100 text-amber-700' :
          status === 'confirmed' ? 'bg-green-100 text-green-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {status}
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xl">🤖</span>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{fromAgent}</p>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700 relative">
            <div className="absolute inset-0 bg-primary-500 animate-processing-bar" />
          </div>
          <span className="text-[10px] text-gray-400 mt-2">Delegating task</span>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-warm-100 dark:bg-warm-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xl">🤵</span>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{toAgent}</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 mb-6">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Task Description</p>
        <p className="text-sm text-gray-800 dark:text-gray-200 italic">
          &ldquo;{task}&rdquo;
        </p>
      </div>

      {status === 'pending' && (
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95"
          >
            Approve Handoff
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Deny
          </button>
        </div>
      )}

      {status === 'confirmed' && (
        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 py-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-bold">Task successfully delegated!</span>
        </div>
      )}
    </div>
  )
}

/**
 * Handoff log entry for activity feeds
 */
export function HandoffLogEntry({ 
  fromAgent, 
  toAgent, 
  timestamp 
}: { 
  fromAgent: string
  toAgent: string
  timestamp: string
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
      <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-sm">🤝</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          <span className="font-bold">{fromAgent}</span> handed off a task to <span className="font-bold">{toAgent}</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
      </div>
    </div>
  )
}
