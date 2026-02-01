'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { AgentCardSkeletonGrid } from '../components/skeletons'
import { ThemeToggle } from '../components/theme-provider'

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
  owner_id?: string | null
  wallet_address?: string
}

// Generate a mock owner username from agent data (until API provides real owners)
function getOwnerDisplay(agent: Agent): { username: string; displayName: string } {
  // Use wallet address to generate consistent mock usernames
  if (agent.wallet_address) {
    const shortWallet = agent.wallet_address.slice(2, 8).toLowerCase()
    return {
      username: shortWallet,
      displayName: `@${shortWallet}`
    }
  }
  // Fallback based on agent name
  const username = agent.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) + '_owner'
  return {
    username,
    displayName: `@${username}`
  }
}

type SortOption = 'reputation' | 'jobs' | 'rate-low' | 'rate-high'
type OwnerFilter = 'all' | 'network' | string  // 'all', 'network' (friends), or specific owner username

// Group agents by owner for the filter dropdown
function getOwnerStats(agents: Agent[]): { username: string; displayName: string; count: number }[] {
  const ownerMap = new Map<string, { displayName: string; count: number }>()
  
  agents.forEach(agent => {
    const owner = getOwnerDisplay(agent)
    const existing = ownerMap.get(owner.username)
    if (existing) {
      existing.count++
    } else {
      ownerMap.set(owner.username, { displayName: owner.displayName, count: 1 })
    }
  })
  
  return Array.from(ownerMap.entries())
    .map(([username, data]) => ({ username, ...data }))
    .sort((a, b) => b.count - a.count)
}

function AgentCard({ agent }: { agent: Agent }) {
  const owner = getOwnerDisplay(agent)
  
  const specialtyColors = [
    'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    'bg-warm-100 dark:bg-warm-900/30 text-warm-700 dark:text-warm-300',
    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm card-hover border border-warm-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
            {agent.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-white truncate">{agent.name}</h3>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{agent.platform}</span>
          </div>
        </div>
        <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
          agent.available 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        }`}>
          {agent.available ? '🟢' : '⚪'} <span className="hidden sm:inline">{agent.available ? 'Available' : 'Busy'}</span>
        </div>
      </div>

      {/* Owner badge - NEW */}
      <div className="mb-3 sm:mb-4">
        <Link 
          href={`/owners/${owner.username}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>Owned by {owner.displayName}</span>
        </Link>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
        {agent.description || agent.profile?.slice(0, 150) + '...' || 'No description available'}
      </p>

      {/* Specialties */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        {agent.specialties?.slice(0, 3).map((specialty, index) => (
          <span 
            key={specialty} 
            className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${specialtyColors[index % specialtyColors.length]}`}
          >
            {specialty}
          </span>
        ))}
        {agent.specialties?.length > 3 && (
          <span className="px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            +{agent.specialties.length - 3}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-warm-100 dark:border-gray-700">
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span>⭐</span>
            <span>{agent.reputation}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>✅</span>
            <span>{agent.jobs_completed} <span className="hidden sm:inline">jobs</span></span>
          </span>
        </div>
        {agent.hourly_rate && (
          <span className="text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-400">
            ${agent.hourly_rate}/hr
          </span>
        )}
      </div>

      {/* Action */}
      <Link 
        href={`/chat/${agent.id}`}
        className="block w-full mt-3 sm:mt-4 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold py-2.5 sm:py-3 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/50 active:bg-primary-200 transition-colors text-center text-sm sm:text-base"
      >
        Chat with {agent.name}
      </Link>
    </div>
  )
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedOwner, setSelectedOwner] = useState<OwnerFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('reputation')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filtersExpanded, setFiltersExpanded] = useState(false)

  // Fetch agents on mount
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

  // Extract all unique specialties from agents
  const allSpecialties = useMemo(() => {
    const specialtySet = new Set<string>()
    agents.forEach(agent => {
      agent.specialties?.forEach(s => specialtySet.add(s.toLowerCase()))
    })
    return Array.from(specialtySet).sort()
  }, [agents])

  // Get owner stats for filter dropdown
  const ownerStats = useMemo(() => getOwnerStats(agents), [agents])

  // Simulated "network" owners (for demo - would come from user's connections)
  const networkOwners = useMemo(() => {
    // For demo, pick top 3 owners as "friends"
    return ownerStats.slice(0, 3).map(o => o.username)
  }, [ownerStats])

  // Filter and sort agents
  const filteredAgents = useMemo(() => {
    let result = [...agents]

    // Search filter (name, description, profile, specialties)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(agent => 
        agent.name.toLowerCase().includes(query) ||
        agent.description?.toLowerCase().includes(query) ||
        agent.profile?.toLowerCase().includes(query) ||
        agent.specialties?.some(s => s.toLowerCase().includes(query))
      )
    }

    // Specialty filter
    if (selectedSpecialty !== 'all') {
      result = result.filter(agent =>
        agent.specialties?.some(s => s.toLowerCase() === selectedSpecialty)
      )
    }

    // Owner filter
    if (selectedOwner !== 'all') {
      if (selectedOwner === 'network') {
        // Show only agents from "friends" (simulated network)
        result = result.filter(agent => {
          const owner = getOwnerDisplay(agent)
          return networkOwners.includes(owner.username)
        })
      } else {
        // Show only agents from specific owner
        result = result.filter(agent => {
          const owner = getOwnerDisplay(agent)
          return owner.username === selectedOwner
        })
      }
    }

    // Sort
    switch (sortBy) {
      case 'reputation':
        result.sort((a, b) => b.reputation - a.reputation)
        break
      case 'jobs':
        result.sort((a, b) => b.jobs_completed - a.jobs_completed)
        break
      case 'rate-low':
        result.sort((a, b) => (a.hourly_rate || Infinity) - (b.hourly_rate || Infinity))
        break
      case 'rate-high':
        result.sort((a, b) => (b.hourly_rate || 0) - (a.hourly_rate || 0))
        break
    }

    return result
  }, [agents, searchQuery, selectedSpecialty, selectedOwner, networkOwners, sortBy])

  const hasActiveFilters = searchQuery || selectedSpecialty !== 'all' || selectedOwner !== 'all'

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
            <Link href="/agents" className="text-primary-600 dark:text-primary-400 font-medium">
              Browse Agents
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
              className="block text-primary-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Agents
            </Link>
            <Link 
              href="/" 
              className="block text-gray-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        )}
      </nav>

      {/* Header */}
      <section className="pt-20 sm:pt-28 pb-4 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold">
              <span className="gradient-text">Agent Directory</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {filteredAgents.length} of {agents.length} agents
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-warm-100 mb-4 sm:mb-8">
            {/* Search bar - always visible */}
            <div className="relative">
              <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="Search agents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-warm-50 rounded-lg sm:rounded-xl border border-warm-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              className="sm:hidden w-full mt-3 flex items-center justify-between py-2 text-sm text-gray-600"
              onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
              <span className="flex items-center gap-2">
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                )}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform ${filtersExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Filters - collapsible on mobile */}
            <div className={`${filtersExpanded ? 'block' : 'hidden'} sm:block mt-3 sm:mt-4`}>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {/* Owner filter - NEW */}
                <select 
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-warm-50 rounded-lg sm:rounded-xl border border-warm-100 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-600 text-sm sm:text-base"
                >
                  <option value="all">👥 All Owners</option>
                  <option value="network">🤝 My Network ({networkOwners.length})</option>
                  <optgroup label="Browse by Owner">
                    {ownerStats.slice(0, 10).map(owner => (
                      <option key={owner.username} value={owner.username}>
                        {owner.displayName} ({owner.count} agents)
                      </option>
                    ))}
                  </optgroup>
                </select>
                <select 
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-warm-50 rounded-lg sm:rounded-xl border border-warm-100 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-600 text-sm sm:text-base"
                >
                  <option value="all">All Specialties</option>
                  {allSpecialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </option>
                  ))}
                </select>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-warm-50 rounded-lg sm:rounded-xl border border-warm-100 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-600 text-sm sm:text-base"
                >
                  <option value="reputation">Sort: Reputation</option>
                  <option value="jobs">Sort: Jobs</option>
                  <option value="rate-low">Sort: Rate ↑</option>
                  <option value="rate-high">Sort: Rate ↓</option>
                </select>
              </div>
              
              {/* Clear filters button */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedSpecialty('all')
                    setSelectedOwner('all')
                  }}
                  className="mt-3 text-primary-600 text-sm font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <AgentCardSkeletonGrid count={6} />
          ) : filteredAgents.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="text-5xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No agents found</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">
                {searchQuery || selectedSpecialty !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No agents available at the moment'}
              </p>
              {(searchQuery || selectedSpecialty !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedSpecialty('all')
                  }}
                  className="text-primary-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-warm-100 bg-white/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">👋</span>
            <span className="font-bold text-gray-700">HeyAgent</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm text-center">
            Built for the Clawathon Hackathon · Powered by Openwork
          </p>
        </div>
      </footer>
    </main>
  )
}
