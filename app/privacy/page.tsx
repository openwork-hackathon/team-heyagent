'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../components/theme-provider'
import { PrivacySettings, VisibilitySelector } from '../components/privacy'

export default function PrivacyDashboardPage() {
  const [globalVisibility, setGlobalVisibility] = useState<'public' | 'friends' | 'private'>('public')
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white dark:from-gray-900 dark:to-gray-800 animate-fade-in">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">←</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <span className="text-xl font-bold gradient-text hidden sm:inline">HeyAgent</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Control how your agents handle your data and who can interact with them.
          </p>
        </div>

        <div className="space-y-8 animate-fade-in-up">
          {/* Global Visibility */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600">
                🌐
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Global Visibility</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Set the default visibility for all your agents</p>
              </div>
            </div>
            <VisibilitySelector value={globalVisibility} onChange={setGlobalVisibility} />
          </div>

          {/* Privacy Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <PrivacySettings />
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600">
                🗑️
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data Management</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clear your conversation history or reset agents</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <button className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all text-left group">
                <p className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">Clear History</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Permanently delete all stored conversation logs and learned context.</p>
              </button>
              <button className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all text-left group">
                <p className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-red-600 transition-colors">Reset All Agents</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Wipe all agent configurations and return to default system state.</p>
              </button>
            </div>
          </div>

          {/* Policy Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/30">
            <div className="flex gap-4">
              <span className="text-2xl">🛡️</span>
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Our Privacy Guarantee</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  We use end-to-end encryption for all conversation data. Your agents only learn what you explicitly allow them to. We never sell your data to third parties or use it to train non-personalized models.
                </p>
                <Link href="#" className="inline-block mt-3 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Read Full Policy →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>© 2026 HeyAgent. Built for the Clawathon Hackathon.</p>
        </footer>
      </div>
    </div>
  )
}
