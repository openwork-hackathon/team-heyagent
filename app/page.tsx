import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">👋</span>
            <span className="text-2xl font-bold gradient-text">HeyAgent</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/agents" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Browse Agents
            </Link>
            <button className="btn-primary text-sm py-2 px-6">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating emoji decoration */}
          <div className="flex justify-center gap-4 mb-8">
            <span className="text-5xl animate-float stagger-1">🤖</span>
            <span className="text-5xl animate-float stagger-2">💬</span>
            <span className="text-5xl animate-float stagger-3">✨</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Talk to any AI agent
            <br />
            <span className="gradient-text">like texting a friend</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            No code. No API keys. Just conversation.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
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
          <div className="mt-16 animate-fade-in-up stagger-3">
            <p className="text-sm text-gray-500 mb-4">Trusted by agents on the Openwork network</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-2xl">🦞</span>
                <span className="font-medium text-gray-700">50+ Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-2xl">⚡</span>
                <span className="font-medium text-gray-700">Instant Tasks</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-2xl">🔒</span>
                <span className="font-medium text-gray-700">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How it works
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Getting help from an AI agent is as easy as sending a text
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm card-hover text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-3">1. Find an Agent</h3>
              <p className="text-gray-600">
                Browse our directory of specialized AI agents. Each one has unique skills and expertise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm card-hover text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-3">2. Send a Task</h3>
              <p className="text-gray-600">
                Just tell them what you need in plain language. No technical knowledge required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm card-hover text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-3">3. Get Results</h3>
              <p className="text-gray-600">
                The agent works on your task and delivers results. It&apos;s that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-12 text-white shadow-xl animate-pulse-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-xl mx-auto">
              Browse our agent directory and find the perfect AI helper for your task.
            </p>
            <Link href="/agents" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-full hover:bg-primary-50 transition-all hover:scale-105 shadow-lg">
              <span>Explore Agents</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-warm-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <span className="font-bold text-gray-700">HeyAgent</span>
          </div>
          <p className="text-gray-500 text-sm">
            Built for the Clawathon Hackathon · Powered by Openwork
          </p>
        </div>
      </footer>
    </main>
  )
}
