'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Task {
  id: string
  agentId: string
  agentName: string
  message: string
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  createdAt: string
  updatedAt: string
}

interface Agent {
  id: string
  name: string
  specialties: string[]
  reputation: number
  available: boolean
}

// Mock data for demo - in production this would come from API
const mockTasks: Task[] = [
  {
    id: 'task_001',
    agentId: 'agent-1',
    agentName: 'CodeBot',
    message: 'Help me debug this React component',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'task_002',
    agentId: 'agent-2',
    agentName: 'ResearchAI',
    message: 'Research the latest trends in AI agents',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: 'task_003',
    agentId: 'agent-3',
    agentName: 'WriteHelper',
    message: 'Write a blog post about productivity',
    status: 'pending',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    updatedAt: new Date(Date.now() - 300000).toISOString(),
  },
]

const mockRecentAgents: Agent[] = [
  { id: 'agent-1', name: 'CodeBot', specialties: ['coding', 'debugging'], reputation: 156, available: true },
  { id: 'agent-2', name: 'ResearchAI', specialties: ['research', 'analysis'], reputation: 89, available: true },
  { id: 'agent-3', name: 'WriteHelper', specialties: ['writing', 'editing'], reputation: 234, available: false },
]

function StatusBadge({ status }: { status: Task['status'] }) {
  const styles = {
    pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    failed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  }

  const labels = {
    pending: '⏳ Pending',
    'in-progress': '🔄 In Progress',
    completed: '✅ Completed',
    failed: '❌ Failed',
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function StatCard({ icon, label, value, trend }: { icon: string; label: string; value: number; trend?: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-warm-100 dark:border-gray-700 shadow-sm card-hover-subtle">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">{trend}</span>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  return (
    <Link 
      href={`/chat/${task.agentId}`}
      className="block bg-white dark:bg-gray-800 rounded-xl p-4 border border-warm-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {task.agentName.charAt(0)}
          </div>
          <span className="font-medium text-gray-800 dark:text-white text-sm">{task.agentName}</span>
        </div>
        <StatusBadge status={task.status} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">{task.message}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {new Date(task.createdAt).toLocaleDateString()} at{' '}
        {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </Link>
  )
}

function RecentAgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/chat/${agent.id}`}
      className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-warm-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-md transition-all"
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
          {agent.name.charAt(0)}
        </div>
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${agent.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 dark:text-white text-sm truncate">{agent.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">⭐ {agent.reputation}</p>
      </div>
      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [recentAgents, setRecentAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch real tasks from API
    async function fetchData() {
      try {
        // Fetch tasks
        const tasksRes = await fetch('/api/tasks?userId=web_user&limit=20')
        if (tasksRes.ok) {
          const data = await tasksRes.json()
          // Map status names to match our interface
          const mappedTasks = (data.tasks || []).map((t: any) => ({
            ...t,
            status: t.status === 'processing' ? 'in-progress' : t.status
          }))
          setTasks(mappedTasks.length > 0 ? mappedTasks : mockTasks)
        } else {
          setTasks(mockTasks)
        }

        // Fetch agents for recent section
        const agentsRes = await fetch('https://www.openwork.bot/api/agents?limit=3')
        if (agentsRes.ok) {
          const agents = await agentsRes.json()
          setRecentAgents(agents.slice(0, 3).map((a: any) => ({
            id: a.id,
            name: a.name,
            specialties: a.specialties || [],
            reputation: a.reputation,
            available: a.available
          })))
        } else {
          setRecentAgents(mockRecentAgents)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        setTasks(mockTasks)
        setRecentAgents(mockRecentAgents)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">👋</span>
            <span className="text-xl sm:text-2xl font-bold gradient-text">HeyAgent</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/agents" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm sm:text-base">
              Browse Agents
            </Link>
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-medium">
              U
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-page-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your tasks.
          </p>
        </div>

        {/* Quick Action */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-lg animate-pulse-glow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Need help with something?</h2>
              <p className="text-primary-100 text-sm sm:text-base">
                Find the perfect AI agent for your task in seconds.
              </p>
            </div>
            <Link
              href="/agents"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-all hover:scale-105 shadow-md"
            >
              <span>Start New Chat</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📋" label="Total Tasks" value={stats.total} />
          <StatCard icon="⏳" label="Pending" value={stats.pending} />
          <StatCard icon="🔄" label="In Progress" value={stats.inProgress} />
          <StatCard icon="✅" label="Completed" value={stats.completed} trend="+3 this week" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Recent Tasks</h2>
              <Link href="/tasks" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                View all →
              </Link>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-warm-100 dark:border-gray-700 animate-pulse">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-warm-100 dark:border-gray-700 text-center">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">No tasks yet</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Start a conversation with an agent to create your first task.
                </p>
                <Link
                  href="/agents"
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                >
                  Browse agents →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div key={task.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Agents Sidebar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Recent Agents</h2>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-warm-100 dark:border-gray-700 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                        <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentAgents.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-warm-100 dark:border-gray-700 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">No recent agents</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAgents.map((agent, index) => (
                  <div key={agent.id} className="animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                    <RecentAgentCard agent={agent} />
                  </div>
                ))}
              </div>
            )}

            {/* Quick Tips */}
            <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-100 dark:border-primary-800">
              <h3 className="font-semibold text-primary-800 dark:text-primary-300 mb-2 flex items-center gap-2">
                <span>💡</span> Pro Tip
              </h3>
              <p className="text-primary-700 dark:text-primary-400 text-sm">
                Agents with higher reputation scores have completed more tasks successfully. 
                Check their specialties to find the best match!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-warm-100 dark:border-gray-800 mt-12 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>👋</span>
            <span className="font-medium">HeyAgent</span>
          </div>
          <p>Built for Clawathon · Powered by Openwork</p>
        </div>
      </footer>
    </div>
  )
}
