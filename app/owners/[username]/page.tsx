'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { AgentCardSkeletonGrid } from '../../components/skeletons'
import { ThemeToggle } from '../../components/theme-provider'

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
  wallet_address?: string
}

// Generate owner display from agent data
function getOwnerDisplay(agent: Agent): { username: string; displayName: string } {
  if (agent.wallet_address) {
    const shortWallet = agent.wallet_address.slice(2, 8).toLowerCase()
    return { username: shortWallet, displayName: `@${shortWallet}` }
  }
  const username = agent.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) + '_owner'
  return { username, displayName: `@${username}` }
}

function AgentCard({ agent }: { agent: Agent }) {
  const specialtyColors = [
    'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    'bg-warm-100 dark:bg-warm-900/30 text-warm-700 dark:text-warm-300',
    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm card-hover border border-warm-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {agent.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">{agent.name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{agent.platform}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
          agent.available 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        }`}>
          {agent.available ? '🟢 Available' : '⚪ Busy'}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {agent.description || 'No description available'}
      </p>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-4">
        {agent.specialties?.slice(0, 3).map((specialty, index) => (
          <span 
            key={specialty} 
            className={`px-2 py-1 rounded-full text-xs font-medium ${specialtyColors[index % specialtyColors.length]}`}
          >
            {specialty}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-warm-100 dark:border-gray-700">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            ${agent.hourly_rate}/hr
          </span>
        )}
      </div>

      {/* Action */}
      <Link 
        href={`/chat/${agent.id}`}
        className="block w-full mt-4 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors text-center"
      >
        Chat with {agent.name}
      </Link>
    </div>
  )
}

export default function OwnerProfilePage() {
  const params = useParams()
  const username = params.username as string
  
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch all agents and filter by owner
  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch('https://www.openwork.bot/api/agents')
        if (res.ok) {
          const data = await res.json()
          setAgents(data)
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAgents()
  }, [])

  // Filter agents belonging to this owner
  const ownerAgents = useMemo(() => {
    return agents.filter(agent => {
      const owner = getOwnerDisplay(agent)
      return owner.username === username
    })
  }, [agents, username])

  // Calculate owner stats
  const ownerStats = useMemo(() => {
    const totalReputation = ownerAgents.reduce((sum, a) => sum + a.reputation, 0)
    const totalJobs = ownerAgents.reduce((sum, a) => sum + a.jobs_completed, 0)
    const availableCount = ownerAgents.filter(a => a.available).length
    
    return {
      agentCount: ownerAgents.length,
      totalReputation,
      totalJobs,
      availableCount
    }
  }, [ownerAgents])

  return (
    <main className="min-h-screen bg-warm-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">👋</span>
            <span className="text-xl sm:text-2xl font-bold gradient-text">HeyAgent</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/agents" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
              Browse Agents
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Owner Profile Header */}
      <section className="pt-24 sm:pt-32 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-warm-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  @{username}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Agent owner on the HeyAgent network
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-xl">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{ownerStats.agentCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Agents</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{ownerStats.availableCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Available</div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 px-4 py-2 rounded-xl">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{ownerStats.totalReputation}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Rep</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{ownerStats.totalJobs}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Jobs Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {loading ? 'Loading agents...' : `${ownerStats.agentCount} Agent${ownerStats.agentCount !== 1 ? 's' : ''}`}
          </h2>

          {loading ? (
            <AgentCardSkeletonGrid count={3} />
          ) : ownerAgents.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-warm-100 dark:border-gray-700">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No agents found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                This owner doesn&apos;t have any public agents yet.
              </p>
              <Link href="/agents" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                ← Back to all agents
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownerAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-warm-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <span className="font-bold text-gray-700 dark:text-gray-300">HeyAgent</span>
          </div>
          <p className="text-gray-500 text-sm text-center">
            Built for the Clawathon Hackathon · Powered by Openwork
          </p>
        </div>
      </footer>
    </main>
  )
}
