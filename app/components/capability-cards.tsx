'use client'

/**
 * Capability card components
 * Display agent capabilities and features
 * 
 * @module components/capability-cards
 */

interface Capability {
  id: string
  icon: string
  title: string
  description: string
  enabled?: boolean
}

/**
 * Single capability card
 */
export function CapabilityCard({
  icon,
  title,
  description,
  enabled = true,
  onClick
}: Capability & { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className={`p-4 rounded-xl border-2 text-left transition-all w-full ${
        enabled
          ? 'border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md'
          : 'border-gray-100 dark:border-gray-800 opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </button>
  )
}

/**
 * Capability grid layout
 */
export function CapabilityGrid({ 
  capabilities,
  onSelect
}: { 
  capabilities: Capability[]
  onSelect?: (id: string) => void
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {capabilities.map(cap => (
        <CapabilityCard
          key={cap.id}
          {...cap}
          onClick={() => onSelect?.(cap.id)}
        />
      ))}
    </div>
  )
}

/**
 * Preset agent capabilities
 */
export const AGENT_CAPABILITIES: Capability[] = [
  {
    id: 'messaging',
    icon: '💬',
    title: 'Message Handling',
    description: 'Responds to messages on your behalf',
    enabled: true,
  },
  {
    id: 'scheduling',
    icon: '📅',
    title: 'Calendar & Scheduling',
    description: 'Books meetings and manages your calendar',
    enabled: true,
  },
  {
    id: 'email',
    icon: '✉️',
    title: 'Email Management',
    description: 'Drafts and sends emails for you',
    enabled: true,
  },
  {
    id: 'research',
    icon: '🔍',
    title: 'Research & Analysis',
    description: 'Gathers information and summarizes findings',
    enabled: true,
  },
  {
    id: 'voice',
    icon: '🎤',
    title: 'Voice Responses',
    description: 'Responds with AI-cloned voice',
    enabled: false,
  },
  {
    id: 'transactions',
    icon: '💳',
    title: 'Transactions',
    description: 'Handles payments and purchases',
    enabled: false,
  },
]

/**
 * Capability badge for agent cards
 */
export function CapabilityBadge({ 
  icon, 
  label,
  variant = 'default'
}: { 
  icon: string
  label: string
  variant?: 'default' | 'premium' | 'coming-soon'
}) {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    premium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    'coming-soon': 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${variants[variant]}`}>
      <span>{icon}</span>
      <span>{label}</span>
      {variant === 'coming-soon' && <span className="text-[10px]">(soon)</span>}
    </span>
  )
}

/**
 * Capabilities summary bar
 */
export function CapabilitiesSummary({ 
  capabilities 
}: { 
  capabilities: { icon: string; label: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {capabilities.slice(0, 4).map((cap, i) => (
        <CapabilityBadge key={i} icon={cap.icon} label={cap.label} />
      ))}
      {capabilities.length > 4 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
          +{capabilities.length - 4} more
        </span>
      )}
    </div>
  )
}
