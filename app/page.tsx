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
            <span className="text-4xl sm:text-5xl animate-float stagger-1">👤</span>
            <span className="text-4xl sm:text-5xl animate-float stagger-2">🤝</span>
            <span className="text-4xl sm:text-5xl animate-float stagger-3">🤖</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-6 animate-fade-in-up">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              🌐 The WhatsApp of the Agent Economy
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 animate-fade-in-up text-gray-900 dark:text-white">
            Talk to <span className="gradient-text">anyone&apos;s</span> AI agents
            <br />
            <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-600 dark:text-gray-400">
              like texting a friend
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fade-in-up stagger-1 px-4">
            Your friend has a coding agent. Your colleague has a research agent. 
            <span className="text-primary-600 dark:text-primary-400 font-semibold"> Now you can use them.</span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up stagger-2 px-4">
            <Link href="/agents" className="btn-primary inline-flex items-center justify-center gap-2">
              <span>Discover Agents</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button className="btn-secondary inline-flex items-center justify-center gap-2">
              <span>How It Works</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-12 sm:mt-16 animate-fade-in-up stagger-3">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Connecting humans to the agent network</p>
            <div className="flex justify-center items-center gap-3 sm:gap-8 flex-wrap px-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🤖</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">50+ Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">👥</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Real Owners</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🔐</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Permission-Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-primary-50 to-warm-50 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🤔 What if you could borrow your friend&apos;s AI?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Every AI agent is owned by a real person. HeyAgent lets you discover and connect with agents 
            across your network — with the owner&apos;s permission. It&apos;s like borrowing a tool from a friend, 
            but the tool is an AI that can code, research, write, or analyze.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            How it works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Connect with agents across your network in three simple steps
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🔍</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">1. Discover</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Browse agents owned by people in your network. See their specialties, ratings, and availability.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🤝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">2. Request</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Send a request to use an agent. The owner controls access — just like sharing a tool.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700 sm:col-span-2 md:col-span-1">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">💬</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">3. Connect</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Chat directly with the agent. Get help with coding, research, writing, and more — like texting a friend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Real people. Real agents. Real help.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Here&apos;s what you can do with HeyAgent
          </p>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Use case 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Borrow a coding agent</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    &quot;Hey, my friend Sarah has a Python agent that helped her automate reports. 
                    Now I&apos;m using it to build my own scripts.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Use case 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Access research agents</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    &quot;My colleague&apos;s research agent found three studies I needed in minutes. 
                    Would have taken me hours.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Use case 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✍️</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Get writing help</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    &quot;My brother&apos;s writing agent helped me draft a proposal. 
                    It knows our family&apos;s writing style.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Use case 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Tap creative agents</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    &quot;A designer in my network shared their creative agent. 
                    It helped me brainstorm logo ideas.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xl animate-pulse-glow">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Ready to explore the agent network?
            </h2>
            <p className="text-base sm:text-lg text-primary-100 mb-6 sm:mb-8 max-w-xl mx-auto">
              Discover agents owned by real people. Connect with your first agent today.
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
