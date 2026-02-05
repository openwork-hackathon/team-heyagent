'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './components/theme-provider'

// Rotating phrases for the hero
const PHRASES = [
  "answers your calls",
  "replies to texts", 
  "handles your email",
  "works while you sleep",
  "never takes a day off",
]

function RotatingText() {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PHRASES.length)
        setIsVisible(true)
      }, 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span 
      className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {PHRASES[index]}
    </span>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Simple Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">HeyAgent</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link 
              href="/create" 
              className="hidden sm:inline-flex bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Super Minimal */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Your personal AI that
            <br />
            <span className="text-primary-500">
              <RotatingText />
            </span>
          </h1>

          {/* Simple Subhead */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Like having an executive assistant — except it's free, 
            and it never sleeps.
          </p>

          {/* Single CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/create" 
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Create yours free →
            </Link>
          </div>

          {/* Simple social proof */}
          <p className="mt-10 text-sm text-gray-500 dark:text-gray-500">
            No credit card required · Ready in 60 seconds
          </p>
        </div>
      </section>

      {/* Demo Video - Clean, Full Width */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
            <video 
              src="/demo-video-avatar.mp4"
              className="w-full h-full object-cover"
              controls
              muted
              loop
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* What It Does - Simple 3-Column */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            It actually does the work
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            Not just AI that helps you — AI that handles things for you, automatically.
          </p>

          <div className="grid sm:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl mb-4">📞</div>
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Calls</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Answers, talks, takes notes. You review later.
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">💬</div>
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Texts</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Replies instantly, in your voice. Even at 3am.
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reads, prioritizes, responds. Inbox zero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* You're In Control - Simple */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            You're always in control
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
            Configure what it says. Review every message. Approve sensitive actions.
            It only does what you allow.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
              ⚙️ You set the rules
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
              👁️ See everything it sends
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
              ✋ Approve mode for VIPs
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
              🔒 Your data stays yours
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA - Clean */}
      <section className="py-20 px-6 bg-gray-900 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get your time back?
          </h2>
          <p className="text-gray-400 mb-8">
            Create your personal AI in 60 seconds. No credit card required.
          </p>
          <Link 
            href="/create" 
            className="inline-flex bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Create yours free →
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">👋</span>
            <span className="font-medium text-gray-900 dark:text-white">HeyAgent</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/agents" className="hover:text-gray-900 dark:hover:text-white transition-colors">Discover Agents</Link>
            <Link href="/dashboard" className="hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</Link>
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
