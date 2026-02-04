'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../components/theme-provider'
import { TokenStatsCard, StakingStatus } from '../components/token-stats'
import { WalletConnectButton, TokenBalanceCard } from '../components/wallet-connect'
import { AgentHandoffCard, HandoffLogEntry } from '../components/handoff'

// Delete Confirmation Modal Component
function DeleteModal({ 
  agentName, 
  onConfirm, 
  onCancel 
}: { 
  agentName: string
  onConfirm: () => void
  onCancel: () => void 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Delete Agent?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete <span className="font-semibold">{agentName}</span>? 
            This action cannot be undone and all agent data will be permanently removed.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
            >
              Delete Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const [activeTab, setActiveTab] = useState<'agents' | 'delegations'>('agents')
  const [myAgents, setMyAgents] = useState<MyAgent[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [pendingApprovals, setPendingApprovals] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModalAgent, setDeleteModalAgent] = useState<MyAgent | null>(null)

  useEffect(() => {
    // Load agents from localStorage (persisted from /create wizard)
    const savedAgents = JSON.parse(localStorage.getItem('heyagent-agents') || '[]')
    
    // Transform saved agents to match MyAgent interface
    const transformedAgents: MyAgent[] = savedAgents.map((agent: Record<string, unknown>) => ({
      id: agent.id as string,
      name: agent.name as string,
      avatar: agent.avatar as string || '🤖',
      personality: agent.personality as string,
      status: 'active' as const,
      messagesHandled: Math.floor(Math.random() * 50), // Demo: random activity
      lastActive: new Date().toISOString(),
      pendingApprovals: Math.floor(Math.random() * 3), // Demo: random approvals
    }))
    
    // Use saved agents if any, always include the mock for demo stability
    const finalAgents = transformedAgents.length > 0 
      ? [...transformedAgents, ...mockMyAgents] 
      : mockMyAgents
      
    setMyAgents(finalAgents)
    setActivities(mockActivities)
    setPendingApprovals(mockPendingApprovals)
    setLoading(false)
  }, [])

  const handleApprove = (id: string) => {
    setPendingApprovals(prev => prev.filter(p => p.id !== id))
  }

  const handleReject = (id: string) => {
    setPendingApprovals(prev => prev.filter(p => p.id !== id))
  }

  const handleDeleteAgent = (agent: MyAgent, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to chat
    e.stopPropagation()
    setDeleteModalAgent(agent)
  }

  const confirmDeleteAgent = () => {
    if (!deleteModalAgent) return
    
    // Remove from state
    setMyAgents(prev => prev.filter(a => a.id !== deleteModalAgent.id))
    
    // Remove from localStorage
    const savedAgents = JSON.parse(localStorage.getItem('heyagent-agents') || '[]')
    const updatedAgents = savedAgents.filter((a: Record<string, unknown>) => a.id !== deleteModalAgent.id)
    localStorage.setItem('heyagent-agents', JSON.stringify(updatedAgents))
    
    // Close modal
    setDeleteModalAgent(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white dark:from-gray-900 dark:to-gray-800 animate-fade-in">
      {/* Delete Confirmation Modal */}
      {deleteModalAgent && (
        <DeleteModal
          agentName={deleteModalAgent.name}
          onConfirm={confirmDeleteAgent}
          onCancel={() => setDeleteModalAgent(null)}
        />
      )}

      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">👋</span>
            <span className="text-xl sm:text-2xl font-bold gradient-text">HeyAgent</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <WalletConnectButton className="hidden sm:flex" />
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
              My Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your personal AI representatives and delegations
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-6 mb-8 border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('agents')}
            className={`pb-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'agents'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Agents ({myAgents.length})
          </button>
          <button
            onClick={() => setActiveTab('delegations')}
            className={`pb-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'delegations'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Delegations <span className="ml-1 px-1.5 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-[10px] rounded-full">New</span>
          </button>
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
        ) : activeTab === 'agents' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* My Agents Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {myAgents.map(agent => (
                  <div
                    key={agent.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all relative group"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={(e) => handleDeleteAgent(agent, e)}
                      className="absolute top-3 right-3 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-all"
                      title="Delete agent"
                    >
                      <span className="text-sm">🗑️</span>
                    </button>

                    <Link href={`/chat/${agent.id}`} className="block">
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
                              {agent.messagesHandled} messages
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            Last active {formatTimeAgo(agent.lastActive)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
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
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Account Settings</h3>
                <div className="space-y-2">
                  <Link 
                    href="/privacy" 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 transition-colors">Privacy Dashboard</span>
                    <span className="text-gray-400">🔒</span>
                  </Link>
                </div>
              </div>
              <TokenBalanceCard />
              <TokenStatsCard />
              <StakingStatus staked={0} tier="none" />
            </div>

            {/* Empty state for new users */}
            {myAgents.length === 0 && (
              <div className="text-center py-12 lg:col-span-2">
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
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/30 rounded-2xl p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-xl">🤝</span>
                  <div>
                    <h3 className="font-bold text-primary-900 dark:text-primary-100 text-sm sm:text-base">About Agent Handoffs</h3>
                    <p className="text-xs sm:text-sm text-primary-800 dark:text-primary-200 mt-1">
                      Your agents can hire other specialized agents from the directory to help with complex tasks. 
                      Approve or deny handoff requests below to facilitate autonomous collaboration.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pending Handoff Requests</h2>
              <AgentHandoffCard 
                fromAgent={myAgents[0]?.name || "My Assistant"}
                toAgent="Researcher Pro"
                task="Analyze the latest 50 tweets about Openwork and compile a detailed research report for the user."
              />

              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-10">Recent Handoff Activity</h2>
              <div className="space-y-3">
                <HandoffLogEntry 
                  fromAgent={myAgents[0]?.name || "My Assistant"}
                  toAgent="Calendar Bot"
                  timestamp="2 hours ago"
                />
                <HandoffLogEntry 
                  fromAgent={myAgents[0]?.name || "My Assistant"}
                  toAgent="Email Drafter"
                  timestamp="5 hours ago"
                />
                <HandoffLogEntry 
                  fromAgent={myAgents[0]?.name || "My Assistant"}
                  toAgent="Code Reviewer"
                  timestamp="Yesterday"
                />
              </div>
            </div>

            {/* Handoff Stats Sidebar */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Delegation Stats</h3>
                <div className="space-y-5 mt-4">
                  <div className="flex justify-between items-end pb-2 border-b border-gray-50 dark:border-gray-700">
                    <span className="text-xs sm:text-sm text-gray-500">Tasks Delegated</span>
                    <span className="font-bold text-gray-900 dark:text-white">12</span>
                  </div>
                  <div className="flex justify-between items-end pb-2 border-b border-gray-50 dark:border-gray-700">
                    <span className="text-xs sm:text-sm text-gray-500">Total Spend</span>
                    <span className="font-bold text-primary-500">450 $HEYAGENT</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs sm:text-sm text-gray-500">Human Time Saved</span>
                    <span className="font-bold text-green-500">4.5 hrs</span>
                  </div>
                </div>
              </div>
              <TokenBalanceCard />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
// Lovely: refined dashboard creation persistence
// Lovely: refined dashboard creation persistence
