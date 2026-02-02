'use client'

/**
 * Quick action button components
 * Salesforce Einstein-inspired quick actions for chat interface
 * 
 * @module components/quick-actions
 */

interface QuickAction {
  id: string
  label: string
  icon: string
  action: () => void
}

/**
 * Quick action pill button
 */
export function QuickActionPill({ 
  label, 
  icon, 
  onClick,
  variant = 'default'
}: { 
  label: string
  icon: string
  onClick: () => void
  variant?: 'default' | 'primary' | 'success'
}) {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50',
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${variants[variant]}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

/**
 * Quick actions bar for chat interface
 * Shows suggested actions based on conversation context
 */
export function QuickActionsBar({ 
  actions,
  title = 'Quick actions'
}: { 
  actions: QuickAction[]
  title?: string
}) {
  if (actions.length === 0) return null

  return (
    <div className="py-3 px-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {actions.map(action => (
          <QuickActionPill
            key={action.id}
            label={action.label}
            icon={action.icon}
            onClick={action.action}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Preset quick actions for common tasks
 */
export const PRESET_ACTIONS = {
  schedule: {
    id: 'schedule',
    label: 'Schedule meeting',
    icon: '📅',
  },
  email: {
    id: 'email',
    label: 'Draft email',
    icon: '✉️',
  },
  followUp: {
    id: 'followUp',
    label: 'Follow up',
    icon: '🔄',
  },
  summarize: {
    id: 'summarize',
    label: 'Summarize',
    icon: '📝',
  },
  remind: {
    id: 'remind',
    label: 'Set reminder',
    icon: '⏰',
  },
}

/**
 * Floating action button for primary action
 */
export function FloatingActionButton({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
      title={label}
    >
      <span className="text-xl">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
