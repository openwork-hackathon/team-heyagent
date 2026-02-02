'use client'

import { useState } from 'react'

interface FeedbackButtonsProps {
  messageId: string
  onFeedback?: (type: 'up' | 'down', messageId: string) => void
}

// Thumbs up/down feedback buttons
export function FeedbackButtons({ messageId, onFeedback }: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const [showThanks, setShowThanks] = useState(false)

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type)
    setShowThanks(true)
    onFeedback?.(type, messageId)
    
    setTimeout(() => setShowThanks(false), 2000)
  }

  if (showThanks) {
    return (
      <span className="text-xs text-green-600 dark:text-green-400 animate-fade-in">
        Thanks for the feedback! ✓
      </span>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleFeedback('up')}
        disabled={feedback !== null}
        className={`p-1.5 rounded-lg transition-all ${
          feedback === 'up'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        title="Good response"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      </button>
      <button
        onClick={() => handleFeedback('down')}
        disabled={feedback !== null}
        className={`p-1.5 rounded-lg transition-all ${
          feedback === 'down'
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
        }`}
        title="Needs improvement"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
        </svg>
      </button>
    </div>
  )
}

// Copy button for messages
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
      title="Copy message"
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  )
}

// Regenerate button
export function RegenerateButton({ onRegenerate }: { onRegenerate: () => void }) {
  return (
    <button
      onClick={onRegenerate}
      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
      title="Regenerate response"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  )
}

// Message action toolbar
export function MessageActions({ 
  messageId, 
  text,
  onRegenerate,
  onFeedback 
}: { 
  messageId: string
  text: string
  onRegenerate?: () => void
  onFeedback?: (type: 'up' | 'down', messageId: string) => void
}) {
  return (
    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <FeedbackButtons messageId={messageId} onFeedback={onFeedback} />
      <CopyButton text={text} />
      {onRegenerate && <RegenerateButton onRegenerate={onRegenerate} />}
    </div>
  )
}
