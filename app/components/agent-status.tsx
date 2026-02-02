'use client'

/**
 * Agent status indicator components
 * Shows online/offline/busy status with visual cues
 * 
 * @module components/agent-status
 */

type AgentStatus = 'online' | 'busy' | 'away' | 'offline'

interface StatusConfig {
  color: string
  bgColor: string
  label: string
  pulse: boolean
}

const STATUS_CONFIG: Record<AgentStatus, StatusConfig> = {
  online: {
    color: 'bg-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    label: 'Online',
    pulse: true,
  },
  busy: {
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    label: 'Busy',
    pulse: false,
  },
  away: {
    color: 'bg-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    label: 'Away',
    pulse: false,
  },
  offline: {
    color: 'bg-gray-300 dark:bg-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    label: 'Offline',
    pulse: false,
  },
}

/**
 * Simple status dot indicator
 */
export function StatusDot({ 
  status, 
  size = 'md' 
}: { 
  status: AgentStatus
  size?: 'sm' | 'md' | 'lg'
}) {
  const config = STATUS_CONFIG[status]
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  return (
    <span className="relative flex">
      {config.pulse && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`} />
      )}
      <span className={`relative inline-flex rounded-full ${sizes[size]} ${config.color}`} />
    </span>
  )
}

/**
 * Status badge with label
 */
export function StatusBadge({ status }: { status: AgentStatus }) {
  const config = STATUS_CONFIG[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor}`}>
      <StatusDot status={status} size="sm" />
      <span className={status === 'online' ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}>
        {config.label}
      </span>
    </span>
  )
}

/**
 * Last seen indicator
 */
export function LastSeen({ timestamp }: { timestamp: string }) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  let text: string
  if (diffMins < 1) text = 'Just now'
  else if (diffMins < 60) text = `${diffMins}m ago`
  else if (diffHours < 24) text = `${diffHours}h ago`
  else text = `${diffDays}d ago`

  return (
    <span className="text-xs text-gray-500 dark:text-gray-400">
      Last active {text}
    </span>
  )
}

/**
 * Typing status indicator for agent card
 */
export function TypingStatus({ agentName }: { agentName: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400">
      <span className="flex gap-0.5">
        <span className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
        <span className="w-1 h-1 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
      </span>
      <span>{agentName} is typing...</span>
    </span>
  )
}

/**
 * Combined status display with avatar indicator
 */
export function AgentStatusAvatar({
  name,
  status,
  avatar,
  size = 'md'
}: {
  name: string
  status: AgentStatus
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: { avatar: 'w-8 h-8 text-sm', dot: 'w-2 h-2 bottom-0 right-0' },
    md: { avatar: 'w-10 h-10 text-base', dot: 'w-3 h-3 bottom-0 right-0' },
    lg: { avatar: 'w-14 h-14 text-xl', dot: 'w-4 h-4 bottom-0.5 right-0.5' },
  }
  const s = sizes[size]

  return (
    <div className="relative">
      <div className={`${s.avatar} bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold`}>
        {avatar || name.charAt(0).toUpperCase()}
      </div>
      <span className={`absolute ${s.dot} ${STATUS_CONFIG[status].color} rounded-full border-2 border-white dark:border-gray-900`} />
    </div>
  )
}
