'use client'

import { useState, useEffect } from 'react'

interface TokenStats {
  supply: string
  holders: number
  price: string
  marketCap: string
  curveProgress: number
}

// Token stats display component
export function TokenStatsCard({ compact = false }: { compact?: boolean }) {
  const [stats, setStats] = useState<TokenStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demo - in production would fetch from Mint Club API
    setTimeout(() => {
      setStats({
        supply: '1,000,000',
        holders: 247,
        price: '$0.0042',
        marketCap: '$4,200',
        curveProgress: 68,
      })
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl ${compact ? 'p-4' : 'p-6'} border border-warm-100 dark:border-gray-700 animate-pulse`}>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  if (compact) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <span className="text-amber-600 dark:text-amber-400 font-semibold">
          🪙 {stats.price}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {stats.holders} holders
        </span>
        <a
          href="https://mint.club/token/base/HEYAGENT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          Buy →
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span>🪙</span>
          <span>$HEYAGENT</span>
        </h3>
        <a
          href="https://mint.club/token/base/HEYAGENT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          View on Mint Club →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.price}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.holders}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Holders</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.marketCap}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Market Cap</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.supply}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Supply</p>
        </div>
      </div>

      {/* Bonding curve progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Bonding Curve Progress</span>
          <span>{stats.curveProgress}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${stats.curveProgress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Staking status component
export function StakingStatus({ 
  staked = 0,
  tier = 'none'
}: { 
  staked?: number
  tier?: 'none' | 'bronze' | 'silver' | 'gold' | 'diamond'
}) {
  const tiers = {
    none: { label: 'No Stake', color: 'gray', min: 0, benefits: [] },
    bronze: { label: 'Bronze', color: 'amber', min: 100, benefits: ['Priority queue'] },
    silver: { label: 'Silver', color: 'gray', min: 1000, benefits: ['Priority queue', 'Faster responses'] },
    gold: { label: 'Gold', color: 'yellow', min: 10000, benefits: ['Priority queue', 'Faster responses', 'Custom personas'] },
    diamond: { label: 'Diamond', color: 'blue', min: 100000, benefits: ['All benefits', 'Early access', 'Governance'] },
  }

  const currentTier = tiers[tier]

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
          Your Stake
        </span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold bg-${currentTier.color}-100 dark:bg-${currentTier.color}-900/30 text-${currentTier.color}-700 dark:text-${currentTier.color}-300`}>
          {currentTier.label}
        </span>
      </div>
      
      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
        {staked.toLocaleString()} $HEYAGENT
      </p>

      {currentTier.benefits.length > 0 && (
        <div className="text-xs text-amber-700 dark:text-amber-300">
          <p className="font-medium mb-1">Your benefits:</p>
          <ul className="space-y-0.5">
            {currentTier.benefits.map(b => (
              <li key={b}>✓ {b}</li>
            ))}
          </ul>
        </div>
      )}

      {tier === 'none' && (
        <a
          href="https://mint.club/token/base/HEYAGENT"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline"
        >
          Stake to unlock benefits →
        </a>
      )}
    </div>
  )
}

// Priority queue indicator
export function PriorityQueueBadge({ position }: { position: number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
      <span>⚡</span>
      <span>Priority #{position}</span>
    </span>
  )
}
