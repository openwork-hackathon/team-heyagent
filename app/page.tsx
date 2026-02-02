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
            <Link href="/leaderboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              Leaderboard
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
              href="/leaderboard" 
              className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏆 Leaderboard
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
            <span className="text-4xl sm:text-5xl animate-float stagger-1">🌙</span>
            <span className="text-4xl sm:text-5xl animate-float stagger-2">🤖</span>
            <span className="text-4xl sm:text-5xl animate-float stagger-3">☀️</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Agents are always online
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 animate-fade-in-up text-gray-900 dark:text-white">
            Your friends&apos; expertise.
            <br />
            <span className="gradient-text">Available 24/7.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fade-in-up stagger-1 px-4">
            Your friends train AI agents with their skills. 
            <span className="text-primary-600 dark:text-primary-400 font-semibold"> Use them anytime</span> — no waiting, no time zones, no scheduling.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up stagger-2 px-4">
            <Link href="/agents" className="btn-primary inline-flex items-center justify-center gap-2">
              <span>Find an Agent</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href="#problems" className="btn-secondary inline-flex items-center justify-center gap-2">
              <span>See How It Works</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 sm:mt-16 animate-fade-in-up stagger-3">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Access expertise around the clock</p>
            <div className="flex justify-center items-center gap-3 sm:gap-8 flex-wrap px-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🌍</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Any Time Zone</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">⚡</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Instant Response</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🔐</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Permission-Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section id="problems" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-warm-50 to-white dark:from-gray-800/50 dark:to-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            The availability problem, solved.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-10 sm:mb-14 max-w-2xl mx-auto text-sm sm:text-base">
            The people you need are often unavailable. Their agents aren&apos;t.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Problem 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 space-y-2">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-red-500">❌</span>
                  </div>
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-green-500">✅</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">Your friend is asleep</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Their agent is awake</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Get help at 3am without feeling guilty about waking anyone up.</p>
                </div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 space-y-2">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-red-500">❌</span>
                  </div>
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-green-500">✅</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">Expert is too busy</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Their agent has time</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Skip the scheduling dance. Their agent is ready when you are.</p>
                </div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 space-y-2">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-red-500">❌</span>
                  </div>
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-green-500">✅</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">Different time zones</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Agents work 24/7</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Tokyo, London, or LA — their agent doesn&apos;t care what time it is.</p>
                </div>
              </div>
            </div>

            {/* Problem 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 space-y-2">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-red-500">❌</span>
                  </div>
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <span className="text-green-500">✅</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">Can&apos;t afford a consultant</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Access friends&apos; expertise</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Your network has experts. Their agents extend that expertise to you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Real people. Real agents. Always on.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Here&apos;s how people use HeyAgent
          </p>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Example 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                S
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Sky&apos;s Trading Agent</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                &quot;Sky trained a crypto trading agent. Ask it about market trends, token analysis, or trading strategies — anytime, even at 3am.&quot;
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Online now
                </span>
                <span>•</span>
                <span>Crypto, Trading</span>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                M
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Maria&apos;s Coding Agent</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                &quot;Maria&apos;s agent can debug your code at 3am when she can&apos;t. It knows her coding patterns and best practices.&quot;
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Online now
                </span>
                <span>•</span>
                <span>Python, TypeScript</span>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                T
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Team Research Agent</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                &quot;Your team&apos;s research agent works while everyone sleeps. Wake up to answers, not waiting.&quot;
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Online now
                </span>
                <span>•</span>
                <span>Research, Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            How it works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Connect with your network&apos;s agents in three steps
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🔍</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">1. Discover</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Browse agents trained by people in your network. See their skills and availability.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🤝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">2. Request Access</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Ask the owner for permission. They control who can use their agent.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700 sm:col-span-2 md:col-span-1">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">💬</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">3. Chat Anytime</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Message the agent whenever you need help. They never sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xl animate-pulse-glow">
            <div className="flex justify-center mb-4">
              <span className="text-4xl sm:text-5xl">🌙</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Your network never sleeps.
            </h2>
            <p className="text-base sm:text-lg text-primary-100 mb-6 sm:mb-8 max-w-xl mx-auto">
              Connect with agents trained by the people you know. Get help whenever you need it.
            </p>
            <Link href="/agents" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary-50 transition-all hover:scale-105 shadow-lg text-sm sm:text-base">
              <span>Browse Agents</span>
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
