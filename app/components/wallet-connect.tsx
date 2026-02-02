'use client'

/**
 * Wallet connection components for $HEYAGENT token integration
 * Uses wagmi for wallet connection on Base chain
 * 
 * @module components/wallet-connect
 */

import { useState, useEffect } from 'react'

// $HEYAGENT token contract on Base
const HEYAGENT_TOKEN = {
  address: '0x80d6754aEE7fCF654FC588AeBbe2aDB9E3fe757D',
  symbol: 'HEYAGENT',
  decimals: 18,
  chain: 'Base',
  mintClubUrl: 'https://mint.club/token/base/HEYAGENT',
}

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  isLoading: boolean
}

/**
 * Simple wallet connect button
 * For demo purposes - shows mock connection UI
 * Production would use wagmi hooks
 */
export function WalletConnectButton({ className = '' }: { className?: string }) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    isLoading: false,
  })

  const handleConnect = async () => {
    setWallet(prev => ({ ...prev, isLoading: true }))
    
    // Check if window.ethereum exists (MetaMask, etc.)
    if (typeof window !== 'undefined' && (window as unknown as { ethereum?: unknown }).ethereum) {
      try {
        const ethereum = (window as unknown as { ethereum: { request: (args: { method: string }) => Promise<string[]> } }).ethereum
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          setWallet({
            isConnected: true,
            address: accounts[0],
            balance: '1,000', // Mock balance for demo
            isLoading: false,
          })
          localStorage.setItem('heyagent-wallet', accounts[0])
        }
      } catch {
        setWallet(prev => ({ ...prev, isLoading: false }))
      }
    } else {
      // No wallet - show demo mode
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 10) + '...'
      setWallet({
        isConnected: true,
        address: mockAddress,
        balance: '1,000',
        isLoading: false,
      })
      localStorage.setItem('heyagent-wallet', mockAddress)
    }
  }

  const handleDisconnect = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      isLoading: false,
    })
    localStorage.removeItem('heyagent-wallet')
  }

  // Check for saved wallet on mount
  useEffect(() => {
    const saved = localStorage.getItem('heyagent-wallet')
    if (saved) {
      setWallet({
        isConnected: true,
        address: saved.slice(0, 10) + '...',
        balance: '1,000',
        isLoading: false,
      })
    }
  }, [])

  if (wallet.isConnected) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-lg">💰</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {wallet.balance} $HEYAGENT
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {wallet.address}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={wallet.isLoading}
      className={`flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors ${className}`}
    >
      {wallet.isLoading ? (
        <>
          <span className="animate-spin">⏳</span>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <span>🔗</span>
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  )
}

/**
 * Token balance display card
 */
export function TokenBalanceCard() {
  const [balance, setBalance] = useState<string | null>(null)
  
  useEffect(() => {
    const wallet = localStorage.getItem('heyagent-wallet')
    if (wallet) {
      setBalance('1,000') // Mock balance
    }
  }, [])

  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Your $HEYAGENT Balance</h3>
        <span className="text-2xl">💎</span>
      </div>
      
      {balance ? (
        <div className="text-4xl font-bold mb-2">{balance}</div>
      ) : (
        <div className="text-2xl font-bold mb-2 opacity-60">Connect wallet</div>
      )}
      
      <p className="text-primary-100 text-sm mb-4">
        Stake tokens to unlock premium features
      </p>
      
      <a
        href={HEYAGENT_TOKEN.mintClubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
      >
        Buy on Mint Club →
      </a>
    </div>
  )
}

/**
 * Compact token info for header
 */
export function TokenInfoCompact() {
  return (
    <a
      href={HEYAGENT_TOKEN.mintClubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
    >
      <span>💎</span>
      <span>$HEYAGENT</span>
      <span className="text-amber-500">→</span>
    </a>
  )
}

export { HEYAGENT_TOKEN }
