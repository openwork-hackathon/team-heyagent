'use client'

interface TokenBadgeProps {
  amount: number
  variant?: 'required' | 'reward' | 'stake'
  size?: 'sm' | 'md' | 'lg'
}

// Token requirement/reward badge component
export function TokenBadge({ amount, variant = 'required', size = 'sm' }: TokenBadgeProps) {
  const variants = {
    required: {
      bg: 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30',
      text: 'text-amber-700 dark:text-amber-400',
      icon: '🪙',
      label: 'Required',
    },
    reward: {
      bg: 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
      text: 'text-green-700 dark:text-green-400',
      icon: '✨',
      label: 'Earn',
    },
    stake: {
      bg: 'bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30',
      text: 'text-purple-700 dark:text-purple-400',
      icon: '🔐',
      label: 'Stake',
    },
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  const { bg, text, icon, label } = variants[variant]

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizes[size]} ${bg} ${text} rounded-full font-semibold`}>
      <span>{icon}</span>
      <span>{amount.toLocaleString()} $HEYAGENT</span>
      {size !== 'sm' && <span className="opacity-70">({label})</span>}
    </span>
  )
}

// Premium agent indicator
export function PremiumAgentBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-sm ${className}`}>
      <span>⭐</span>
      <span>Premium</span>
    </span>
  )
}

// Token gate overlay for locked features
export function TokenGateOverlay({ 
  amount, 
  feature,
  onUnlock 
}: { 
  amount: number
  feature: string
  onUnlock?: () => void
}) {
  return (
    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
      <div className="text-center p-4">
        <div className="text-3xl mb-2">🔒</div>
        <p className="text-white font-semibold mb-1">{feature}</p>
        <TokenBadge amount={amount} variant="required" size="md" />
        <button
          onClick={onUnlock}
          className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Get $HEYAGENT
        </button>
      </div>
    </div>
  )
}

// Mint Club buy link component
export function BuyTokenButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://mint.club/token/base/HEYAGENT"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg ${className}`}
    >
      <span>🪙</span>
      <span>Buy $HEYAGENT</span>
    </a>
  )
}
