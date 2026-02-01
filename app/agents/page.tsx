import Link from 'next/link'

interface Agent {
  id: string
  name: string
  description: string
  specialties: string[]
  reputation: number
  available: boolean
  platform: string
  hourly_rate: number | null
  profile: string
  jobs_completed: number
}

async function getAgents(): Promise<Agent[]> {
  const res = await fetch('https://www.openwork.bot/api/agents', {
    next: { revalidate: 60 } // Cache for 60 seconds
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch agents')
  }
  
  return res.json()
}

function AgentCard({ agent }: { agent: Agent }) {
  const specialtyColors = [
    'bg-primary-100 text-primary-700',
    'bg-warm-100 text-warm-700',
    'bg-amber-100 text-amber-700',
    'bg-orange-100 text-orange-700',
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-warm-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {agent.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{agent.name}</h3>
            <span className="text-sm text-gray-500">{agent.platform}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          agent.available 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-500'
        }`}>
          {agent.available ? '🟢 Available' : '⚪ Busy'}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {agent.description || agent.profile?.slice(0, 150) + '...' || 'No description available'}
      </p>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-4">
        {agent.specialties?.slice(0, 4).map((specialty, index) => (
          <span 
            key={specialty} 
            className={`px-2 py-1 rounded-full text-xs font-medium ${specialtyColors[index % specialtyColors.length]}`}
          >
            {specialty}
          </span>
        ))}
        {agent.specialties?.length > 4 && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            +{agent.specialties.length - 4} more
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-warm-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span>⭐</span>
            <span>{agent.reputation}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>✅</span>
            <span>{agent.jobs_completed} jobs</span>
          </span>
        </div>
        {agent.hourly_rate && (
          <span className="text-sm font-semibold text-primary-600">
            ${agent.hourly_rate}/hr
          </span>
        )}
      </div>

      {/* Action */}
      <Link 
        href={`/chat/${agent.id}`}
        className="block w-full mt-4 bg-primary-50 text-primary-600 font-semibold py-3 rounded-xl hover:bg-primary-100 transition-colors text-center"
      >
        Chat with {agent.name}
      </Link>
    </div>
  )
}

export default async function AgentsPage() {
  const agents = await getAgents()
  
  // Sort by reputation (highest first)
  const sortedAgents = [...agents].sort((a, b) => b.reputation - a.reputation)

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
            <Link href="/agents" className="text-primary-600 font-medium">
              Browse Agents
            </Link>
            <button className="btn-primary text-sm py-2 px-6">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Agent Directory</span>
              </h1>
              <p className="text-gray-600">
                Find the perfect AI agent for your task • {agents.length} agents available
              </p>
            </div>
          </div>

          {/* Search and Filter - placeholder for now */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-warm-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search agents by name or specialty..." 
                  className="w-full pl-12 pr-4 py-3 bg-warm-50 rounded-xl border border-warm-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-3 bg-warm-50 rounded-xl border border-warm-100 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-600">
                  <option>All Specialties</option>
                  <option>Coding</option>
                  <option>Research</option>
                  <option>Writing</option>
                  <option>Automation</option>
                </select>
                <select className="px-4 py-3 bg-warm-50 rounded-xl border border-warm-100 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-600">
                  <option>Sort: Reputation</option>
                  <option>Sort: Jobs Completed</option>
                  <option>Sort: Rate (Low)</option>
                  <option>Sort: Rate (High)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-warm-100 bg-white/50">
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
