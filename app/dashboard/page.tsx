'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../components/theme-provider'

interface MyAgent {
  id: string
  name: string
  avatar: string
  personality: string
  status: 'active' | 'paused'
  messagesHandled: number
  lastActive: string
  pendingApprovals: number
}

interface Activity {
  id: string
  agentId: string
  agentName: string
  action: string
  target: string
  time: string
  requiresApproval: boolean
}

// Mock data for demo
const mockMyAgents: MyAgent[] = [
  {
    id: 'my-agent-1',
    name: 'My Assistant',
    avatar: '🤖',
    personality: 'friendly',
    status: 'active',
    messagesHandled: 47,
    lastActive: new Date(Date.now() - 120000).toISOString(),
    pendingApprovals: 2,
  },
]

const mockActivities: Activity[] = [
  {
    id: 'act-1',
    agentId: 'my-agent-1',
    agentName: 'My Assistant',
    action: 'Replied to',
    target: '@user123 on Twitter',
    time: new Date(Date.now() - 120000).toISOString(),
    requiresApproval: false,
  },
  {
    id: 'act-2',
    agentId: 'my-agent-1',
    agentName: 'My Assistant',
    action: 'Scheduled meeting with',
    target: 'Sarah Chen',
    time: new Date(Date.now() - 3600000).toISOString(),
    requiresApproval: false,
  },
  {
    id: 'act-3',
    agentId: 'my-agent-1',
    agentName: 'My Assistant',
    action: 'Handled',
    target: '12 emails',
    time: new Date(Date.now() - 7200000).toISOString(),
    requiresApproval: false,
  },
]

const mockPendingApprovals: Activity[] = [
  {
    id: 'pend-1',
    agentId: 'my-agent-1',
    agentName: 'My Assistant',
    action: 'Wants to send email to',
    target: 'your boss about project deadline',
    time: new Date(Date.now() - 300000).toISOString(),
    requiresApproval: true,
  },
  {
    id: 'pend-2',
    agentId: 'my-agent-1',
    agentName: 'My Assistant',
    action: 'Received unusual request from',
    target: 'unknown sender',
    time: new Date(Date.now() - 600000).toISOString(),
    requiresApproval: true,
  },
]

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hr ago`
  return `${diffDays} day ago`
}

export default function DashboardPage() {
  const [myAgents, setMyAgents] = useState<MyAgent[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [pendingApprovals, setPendingApprovals] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMyAgents(mockMyAgents)
      setActivities(mockActivities)
      setPendingApprovals(mockPendingApprovals)
      setLoading(false)
    }, 500)
  }, [])

  const handleApprove = (id: string) => {
    setPendingApprovals(prev => prev.filter(p => p.id !== id))
  }

  const handleReject = (id: string) => {
    setPendingApprovals(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">👋</span>
            <span className="text-xl sm:text-2xl font-bold gradient-text">HeyAgent</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/agents" 
              className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Discover
            </Link>
            <ThemeToggle />
            <Link href="/create" className="btn-primary text-sm py-2 px-4">
              + New Agent
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              My Agents
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your personal AI representatives
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* My Agents Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {myAgents.map(agent => (
                <Link
                  key={agent.id}
                  href={`/chat/${agent.id}`}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-[1.01] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-3xl">
                      {agent.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {agent.name}
                        </h3>
                        {agent.pendingApprovals > 0 && (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium rounded-full">
                            {agent.pendingApprovals} pending
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className={`flex items-center gap-1 ${
                          agent.status === 'active' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-400'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            agent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          {agent.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {agent.messagesHandled} messages today
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Last active {formatTimeAgo(agent.lastActive)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Create New Agent Card */}
              <Link
                href="/create"
                className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 transition-all flex items-center justify-center min-h-[140px] group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">➕</span>
                  </div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Create New Agent</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">60-second setup</p>
                </div>
              </Link>
            </div>

            {/* Pending Approvals */}
            {pendingApprovals.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⚠️</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Needs Your Attention ({pendingApprovals.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {pendingApprovals.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
                          🤖
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">
                            <span className="font-medium">{item.agentName}</span> {item.action}{' '}
                            <span className="font-medium">{item.target}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimeAgo(item.time)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                {activities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-sm">
                      🤖
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.agentName} {activity.action.toLowerCase()}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {formatTimeAgo(activity.time)}
                    </p>
                  </div>
                ))}
              </div>

              {activities.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Your agent&apos;s actions will appear here
                  </p>
                </div>
              )}
            </div>

            {/* Empty state for new users */}
            {myAgents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No agents yet
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Create your first agent in 60 seconds. It&apos;ll represent you 24/7.
                </p>
                <Link
                  href="/create"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span>Create Your Agent</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
