'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface TokenBalance {
  balance: number
  usdValue: string
  change24h: number
}

/**
 * Compact token balance display for header/nav
 * Shows user's $HEYAGENT balance with quick buy link
 */
export function TokenBalanceHeader() {
  const [balance, setBalance] = useState<TokenBalance | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in production would fetch from wallet/API
    setTimeout(() => {
      setBalance({
        balance: 1250,
        usdValue: '$5.25',
        change24h: 12.5,
      })
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg animate-pulse">
        <div className="w-4 h-4 bg-amber-200 dark:bg-amber-700 rounded" />
        <div className="w-16 h-4 bg-amber-200 dark:bg-amber-700 rounded" />
      </div>
    )
  }

  if (!balance) {
    return (
      <Link
        href="https://mint.club/token/base/HEYAGENT"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
      >
        <span>🪙</span>
        <span>Get $HEYAGENT</span>
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
        <span className="text-amber-600 dark:text-amber-400">🪙</span>
        <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
          {balance.balance.toLocaleString()}
        </span>
        <span className="text-xs text-amber-600 dark:text-amber-400">
          ({balance.usdValue})
        </span>
        {balance.change24h !== 0 && (
          <span className={`text-xs font-medium ${
            balance.change24h > 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {balance.change24h > 0 ? '+' : ''}{balance.change24h}%
          </span>
        )}
      </div>
      <Link
        href="https://mint.club/token/base/HEYAGENT"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        title="Buy more $HEYAGENT"
      >
        + Buy
      </Link>
    </div>
  )
}

/**
 * Mini token indicator for mobile nav
 */
export function TokenBalanceMini() {
  return (
    <Link
      href="https://mint.club/token/base/HEYAGENT"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-full"
    >
      <span className="text-sm">🪙</span>
      <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">1,250</span>
    </Link>
  )
}
