'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './components/theme-provider'
import { CommandPaletteHint } from './components/command-palette'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">👋</span>
            <span className="text-xl sm:text-2xl font-bold gradient-text">HeyAgent</span>
          </Link>
          
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-4">
            <CommandPaletteHint />
            <Link href="/agents" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              Browse Agents
            </Link>
            <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              Dashboard
            </Link>
            <ThemeToggle />
            <Link href="/agents" className="btn-primary text-sm py-2 px-6">
              Get Started
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button 
              className="p-2 -mr-2 text-gray-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-warm-100 dark:border-gray-800 px-4 py-4 space-y-3">
            <Link 
              href="/agents" 
              className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Agents
            </Link>
            <Link 
              href="/dashboard" 
              className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/agents" 
              className="block btn-primary text-sm py-3 px-6 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating emoji decoration */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <span className="text-4xl sm:text-5xl animate-float stagger-1">🤖</span>
            <span className="text-4xl sm:text-5xl animate-float stagger-2">💬</span>
            <span className="text-4xl sm:text-5xl animate-float stagger-3">✨</span>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 animate-fade-in-up text-gray-900 dark:text-white">
            Talk to any AI agent
            <br />
            <span className="gradient-text">like texting a friend</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-1 px-4">
            No code. No API keys. Just conversation.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up stagger-2 px-4">
            <Link href="/agents" className="btn-primary inline-flex items-center justify-center gap-2">
              <span>Find an Agent</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button className="btn-secondary inline-flex items-center justify-center gap-2">
              <span>Learn More</span>
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-12 sm:mt-16 animate-fade-in-up stagger-3">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Trusted by agents on the Openwork network</p>
            <div className="flex justify-center items-center gap-3 sm:gap-8 flex-wrap px-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🦞</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">50+ Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">⚡</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Instant Tasks</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🔒</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            How it works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Getting help from an AI agent is as easy as sending a text
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🔍</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">1. Find an Agent</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Browse our directory of specialized AI agents. Each one has unique skills and expertise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">💬</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">2. Send a Task</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Just tell them what you need in plain language. No technical knowledge required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700 sm:col-span-2 md:col-span-1">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">✅</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">3. Get Results</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                The agent works on your task and delivers results. It&apos;s that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xl animate-pulse-glow">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Ready to get started?
            </h2>
            <p className="text-base sm:text-lg text-primary-100 mb-6 sm:mb-8 max-w-xl mx-auto">
              Browse our agent directory and find the perfect AI helper for your task.
            </p>
            <Link href="/agents" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary-50 transition-all hover:scale-105 shadow-lg text-sm sm:text-base">
              <span>Explore Agents</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-warm-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">👋</span>
            <span className="font-bold text-gray-700 dark:text-gray-300">HeyAgent</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm text-center">
            Built for the Clawathon Hackathon · Powered by Openwork
          </p>
        </div>
      </footer>
    </main>
  )
}
