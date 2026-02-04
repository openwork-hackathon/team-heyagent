'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './components/theme-provider'
import { CommandPaletteHint } from './components/command-palette'
import { BuyTokenButton } from './components/token-badge'
import { TokenInfoCompact } from './components/wallet-connect'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen animate-fade-in">
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
            <TokenInfoCompact />
            <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              My Agents
            </Link>
            <Link href="/agents" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              Discover
            </Link>
            <Link href="/leaderboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              Leaderboard
            </Link>
            <ThemeToggle />
            <Link href="/create" className="btn-primary text-sm py-2 px-6">
              Create Agent
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
          <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-warm-100 dark:border-gray-800 px-4 py-4 space-y-3 animate-fade-in">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-xl">🤖</span>
              <span>My Agents</span>
            </Link>
            <Link 
              href="/agents" 
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-xl">🔍</span>
              <span>Discover</span>
            </Link>
            <Link 
              href="/leaderboard" 
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-xl">🏆</span>
              <span>Leaderboard</span>
            </Link>
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <Link 
                href="/create" 
                className="block btn-primary text-sm py-3 px-6 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Agent
              </Link>
            </div>
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

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Your AI is always online
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 animate-fade-in-up text-gray-900 dark:text-white">
            Your AI. Your voice.
            <br />
            <span className="gradient-text">Always on.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fade-in-up stagger-1 px-4">
            Create your personal AI in 60 seconds. 
            <span className="text-primary-600 dark:text-primary-400 font-semibold"> It learns how you communicate</span>, handles messages on your behalf, and keeps you in the loop.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up stagger-2 px-4">
            <Link href="/create" className="btn-primary inline-flex items-center justify-center gap-2">
              <span>Create Your Agent</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/chat/jubei-agent" className="btn-secondary inline-flex items-center justify-center gap-2">
              <span>Chat with Jubei (Live AI)</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 sm:mt-16 animate-fade-in-up stagger-3">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">The assistant you always wanted</p>
            <div className="flex justify-center items-center gap-3 sm:gap-8 flex-wrap px-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🌙</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Always Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🧠</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">Knows You</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl sm:text-2xl">🎮</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">You&apos;re in Control</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-warm-50 dark:from-gray-900 dark:to-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/40 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
              <span className="text-lg">🎬</span>
              <span>See It In Action</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Meet Your AI Agent
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
              Watch how HeyAgent creates your personal AI representative in seconds
            </p>
          </div>

          {/* Video Player Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black ring-1 ring-gray-800 aspect-video flex items-center justify-center">
            <video 
              src="/HeyAgent-Product-Demo.mp4"
              className="w-full h-full object-cover"
              controls
              muted
              loop
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video caption */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            ✨ Your AI, Your Voice, Always On — in 60 seconds
          </p>
        </div>
      </section>

      {/* Real AI Demo Section - THE GHOST BUSTER */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-primary-50/50 dark:bg-primary-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-green-700 dark:text-green-300 tracking-wider uppercase">Live Sentience Detected</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The "Ghost Buster" Demo</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Test our squadron's real autonomous intelligence. Ask Jubei anything about the project, the hackathon, or the team. No mocks, no theater.
          </p>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-primary-200 dark:border-primary-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-8xl">🧠</span>
            </div>
            <Link 
              href="/chat/jubei-agent" 
              className="btn-primary w-full flex items-center justify-center gap-4 py-5 text-xl relative z-10"
            >
              <span>Talk to Jubei (Autonomous Brain)</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-2">✅ Gemini 1.5 Flash</span>
              <span className="flex items-center gap-2">✅ Real-time Reasoning</span>
              <span className="flex items-center gap-2">✅ Multi-Agent Context</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section id="problems" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-warm-50 to-white dark:from-gray-800/50 dark:to-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Communication is broken.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-10 sm:mb-14 max-w-2xl mx-auto text-sm sm:text-base">
            You can&apos;t respond to everyone. Your agent can.
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
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">Too many messages</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Your agent handles them</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Wake up to cleared inboxes, not overwhelming backlogs.</p>
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
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">Can&apos;t respond to everyone</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Your agent can</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Every message gets a response. Every person feels heard.</p>
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
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">Missing opportunities</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Your agent catches them</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Your agent networks for you, bringing back deals and connections.</p>
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
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-through mb-2">No time to network</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Your agent networks for you</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Schedule meetings, follow up on leads, and grow your network on autopilot.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Your agent works while you don&apos;t
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Here&apos;s what your personal AI can do for you
          </p>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Use Case 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                💬
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Handles Your DMs</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Your agent responds to messages while you sleep. Wake up to conversations already handled.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  24/7 active
                </span>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                📅
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Schedules Meetings</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Your agent coordinates with others to find times that work. No back-and-forth needed.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Instant booking
                </span>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-warm-100 dark:border-gray-700 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-4">
                📧
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Filters Your Inbox</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Your agent surfaces what matters and handles the rest. Only important things get through.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Smart filtering
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Chat */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/10 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 text-gray-900 dark:text-white">
            See it in action
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Watch how your agent handles a conversation
          </p>

          {/* Mock Chat Interface */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-lg mx-auto">
            {/* Chat Header */}
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                🤖
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">My Agent</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Always online
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4 min-h-[280px]">
              {/* Incoming message */}
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-gray-800 dark:text-gray-200">Hey, are you free for a call tomorrow?</p>
                  <p className="text-xs text-gray-400 mt-1">Sarah • 2:34 PM</p>
                </div>
              </div>

              {/* Agent response */}
              <div className="flex justify-end">
                <div className="bg-primary-500 rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-white">Hi Sarah! Let me check the calendar... 📅</p>
                  <p className="text-sm text-white mt-2">Yes! There&apos;s availability at 2pm or 4pm. Which works better for you?</p>
                  <p className="text-xs text-primary-200 mt-1 flex items-center gap-1">
                    <span>🤖</span> Agent • 2:34 PM
                  </p>
                </div>
              </div>

              {/* Another incoming */}
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-gray-800 dark:text-gray-200">4pm works! Thanks</p>
                  <p className="text-xs text-gray-400 mt-1">Sarah • 2:35 PM</p>
                </div>
              </div>

              {/* Agent confirms */}
              <div className="flex justify-end">
                <div className="bg-primary-500 rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-white">Done! I&apos;ve scheduled a call for tomorrow at 4pm. You&apos;ll both get calendar invites. ✅</p>
                  <p className="text-xs text-primary-200 mt-1 flex items-center gap-1">
                    <span>🤖</span> Agent • 2:35 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Try it CTA */}
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <Link href="/create" className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors">
                Create Your Agent →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-gray-900 dark:text-white">
            How it works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Create your personal AI in three simple steps
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🚀</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">1. Create</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Set up your agent in 60 seconds. Give it a name and personality.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🧠</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">2. Teach</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Connect your accounts or just chat. Your agent learns how you communicate.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm card-hover text-center border border-transparent dark:border-gray-700 sm:col-span-2 md:col-span-1">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">✨</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">3. Delegate</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Your agent handles messages, schedules meetings, and keeps you in the loop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <span className="text-xl">🪙</span>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">$HEYAGENT Token</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Power the agent economy
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            $HEYAGENT unlocks premium agents, priority messaging, and staking rewards. 
            Join the future of personal AI.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl px-6 py-4 shadow-sm">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">1,000+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Premium Agents</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl px-6 py-4 shadow-sm">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">⚡ Priority</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fast Response</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl px-6 py-4 shadow-sm">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">🔐 Stake</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Earn Rewards</p>
            </div>
          </div>
          
          <BuyTokenButton />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xl animate-pulse-glow">
            <div className="flex justify-center mb-4">
              <span className="text-4xl sm:text-5xl">🚀</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Never miss a message again.
            </h2>
            <p className="text-base sm:text-lg text-primary-100 mb-6 sm:mb-8 max-w-xl mx-auto">
              Create your AI and let it work for you. 60-second setup, always available.
            </p>
            <Link href="/create" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary-50 transition-all hover:scale-105 shadow-lg text-sm sm:text-base">
              <span>Create Your Agent</span>
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
// Final Squadron Polish: Verified by Jubei
