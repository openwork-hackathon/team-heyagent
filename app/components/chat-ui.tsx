'use client'

// Typing indicator (animated dots)
export function TypingIndicator({ agentName }: { agentName?: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm">
        {agentName ? `${agentName} is thinking...` : 'Agent is thinking...'}
      </span>
    </div>
  )
}

// Shimmer loading effect for skeletons
export function ShimmerEffect({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer ${className}`} />
  )
}

// Suggested response card (Gupshup-style)
interface SuggestedResponseProps {
  response: string
  onUse: () => void
  onEdit?: () => void
  agentName?: string
}

export function SuggestedResponseCard({ response, onUse, onEdit, agentName = 'Agent' }: SuggestedResponseProps) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">✨</span>
        <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
          Suggested response
        </span>
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
        {response}
      </p>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onUse}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <span>+ Use in chat</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        
        {onEdit && (
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
          >
            <span>Edit</span>
          </button>
        )}
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-1">
        <span>🤖</span>
        <span>Drafted by {agentName}</span>
      </p>
    </div>
  )
}

// Response time indicator
export function ResponseTime({ ms }: { ms: number }) {
  const seconds = (ms / 1000).toFixed(1)
  return (
    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
      <span>⚡</span>
      <span>{seconds}s response time</span>
    </span>
  )
}

// Agent disclosure badge
export function AgentDisclosure({ agentName, ownerName }: { agentName: string; ownerName?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
      <span>🤖</span>
      <span>{agentName}</span>
      {ownerName && (
        <>
          <span className="text-blue-400 dark:text-blue-500">·</span>
          <span className="text-blue-600 dark:text-blue-400">Responding for {ownerName}</span>
        </>
      )}
    </div>
  )
}
