'use client'

import { useState, useEffect } from 'react'

interface PainSolution {
  pain: string
  solution: string
}

const PAIN_SOLUTIONS: PainSolution[] = [
  { pain: "I have 500 unread messages", solution: "Your personal AI clears them while you sleep" },
  { pain: "I can't afford a personal assistant", solution: "Now you have one. For free." },
  { pain: "My clients are awake when I'm asleep", solution: "Your personal AI never sleeps" },
  { pain: "I keep leaving people on read", solution: "Your personal AI replies so you don't have to" },
  { pain: "I have 10,000 followers and zero time", solution: "Your personal AI talks to all of them" },
  { pain: "My virtual assistant doesn't get me", solution: "This one sounds exactly like you" },
  { pain: "Work, kids, messages — I can't keep up", solution: "Your personal AI handles the messages" },
  { pain: "I lost a deal because I replied too late", solution: "Your personal AI replies instantly. Always." },
  { pain: "Only rich people have assistants", solution: "Not anymore." },
  { pain: "I answer the same questions 100 times", solution: "Your personal AI handles the FAQ" },
  { pain: "Half my clients are 12 hours ahead", solution: "Your personal AI is in every timezone" },
  { pain: "I'm exhausted from being 'always on'", solution: "Your personal AI is always on. You're not." },
]

export function RotatingHeadline() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPain, setShowPain] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showPain) {
        // Switch to solution
        setIsAnimating(true)
        setTimeout(() => {
          setShowPain(false)
          setIsAnimating(false)
        }, 300)
      } else {
        // Switch to next pain
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % PAIN_SOLUTIONS.length)
          setShowPain(true)
          setIsAnimating(false)
        }, 300)
      }
    }, 2000) // 2 seconds per state

    return () => clearInterval(interval)
  }, [showPain])

  const current = PAIN_SOLUTIONS[currentIndex]

  return (
    <div className="min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center">
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
        }`}
      >
        {showPain ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full mb-4">
              <span className="text-red-500">❌</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">The Problem</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-700 dark:text-gray-300 italic">
              "{current.pain}"
            </h1>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
              <span className="text-green-500">✅</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">The Solution</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              {current.solution}
            </h1>
          </div>
        )}
      </div>
      
      {/* Progress dots */}
      <div className="flex gap-1.5 mt-6">
        {PAIN_SOLUTIONS.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-500 w-6' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function AutonomousFeatures() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-sm font-medium text-primary-300">Fully Autonomous</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            It actually does the work.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            This isn't "AI that helps you write emails."<br />
            This is <span className="text-white font-semibold">AI that reads, responds, and handles your inbox — automatically.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Calls */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📞
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Answers your calls</h3>
                <p className="text-gray-400 mb-3">
                  Picks up, talks in your voice, takes notes — you review later
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Automatically
                </span>
              </div>
            </div>
          </div>

          {/* Texts */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                💬
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Replies to texts</h3>
                <p className="text-gray-400 mb-3">
                  Responds in your voice, instantly — even at 3am
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Automatically
                </span>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                📧
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Handles email</h3>
                <p className="text-gray-400 mb-3">
                  Reads, prioritizes, responds — inbox zero, finally
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Automatically
                </span>
              </div>
            </div>
          </div>

          {/* Agent-to-Agent */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🤖
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Talks to other AIs</h3>
                <p className="text-gray-400 mb-3">
                  Agent-to-agent coordination, negotiation, scheduling — on your behalf
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Automatically
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-white mb-2">
            Just like a $50k/year executive assistant.
          </p>
          <p className="text-xl text-primary-400">
            Except it's free. And never sleeps.
          </p>
        </div>
      </div>
    </section>
  )
}
