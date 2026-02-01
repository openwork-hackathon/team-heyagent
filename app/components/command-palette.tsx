'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: string
  action: () => void
  keywords?: string[]
  section: 'navigation' | 'actions' | 'agents' | 'settings'
}

interface Agent {
  id: string
  name: string
  specialties: string[]
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [agents, setAgents] = useState<Agent[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Fetch agents for search
  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch('https://www.openwork.bot/api/agents?limit=50')
        if (res.ok) {
          const data = await res.json()
          setAgents(data.agents || [])
        }
      } catch (e) {
        console.error('Failed to fetch agents:', e)
      }
    }
    fetchAgents()
  }, [])

  // Base commands
  const baseCommands: CommandItem[] = [
    {
      id: 'home',
      label: 'Go to Home',
      description: 'Return to landing page',
      icon: '🏠',
      action: () => router.push('/'),
      keywords: ['home', 'landing', 'main'],
      section: 'navigation',
    },
    {
      id: 'agents',
      label: 'Browse Agents',
      description: 'View all available agents',
      icon: '🤖',
      action: () => router.push('/agents'),
      keywords: ['agents', 'browse', 'directory', 'find'],
      section: 'navigation',
    },
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      description: 'View your tasks and activity',
      icon: '📊',
      action: () => router.push('/dashboard'),
      keywords: ['dashboard', 'tasks', 'activity', 'overview'],
      section: 'navigation',
    },
    {
      id: 'new-chat',
      label: 'Start New Chat',
      description: 'Find an agent and start chatting',
      icon: '💬',
      action: () => router.push('/agents'),
      keywords: ['chat', 'new', 'message', 'start'],
      section: 'actions',
    },
    {
      id: 'toggle-theme',
      label: 'Toggle Dark Mode',
      description: 'Switch between light and dark theme',
      icon: '🌙',
      action: () => {
        const html = document.documentElement
        const isDark = html.classList.contains('dark')
        html.classList.remove('light', 'dark')
        html.classList.add(isDark ? 'light' : 'dark')
        localStorage.setItem('theme', isDark ? 'light' : 'dark')
      },
      keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
      section: 'settings',
    },
  ]

  // Add agent commands dynamically
  const agentCommands: CommandItem[] = agents.slice(0, 10).map(agent => ({
    id: `agent-${agent.id}`,
    label: `Chat with ${agent.name}`,
    description: agent.specialties?.slice(0, 2).join(', ') || 'AI Agent',
    icon: '🤝',
    action: () => router.push(`/chat/${agent.id}`),
    keywords: [agent.name.toLowerCase(), ...agent.specialties.map(s => s.toLowerCase())],
    section: 'agents' as const,
  }))

  const allCommands = [...baseCommands, ...agentCommands]

  // Filter commands based on query
  const filteredCommands = query.trim()
    ? allCommands.filter(cmd => {
        const searchTerm = query.toLowerCase()
        return (
          cmd.label.toLowerCase().includes(searchTerm) ||
          cmd.description?.toLowerCase().includes(searchTerm) ||
          cmd.keywords?.some(k => k.includes(searchTerm))
        )
      })
    : allCommands

  // Group by section
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.section]) acc[cmd.section] = []
    acc[cmd.section].push(cmd)
    return acc
  }, {} as Record<string, CommandItem[]>)

  const sectionOrder = ['navigation', 'actions', 'agents', 'settings']
  const flatCommands = sectionOrder.flatMap(section => groupedCommands[section] || [])

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, flatCommands.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = flatCommands[selectedIndex]
      if (selected) {
        selected.action()
        setIsOpen(false)
      }
    }
  }, [flatCommands, selectedIndex])

  // Scroll selected item into view
  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    selectedEl?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const sectionLabels: Record<string, string> = {
    navigation: 'Navigation',
    actions: 'Quick Actions',
    agents: 'Agents',
    settings: 'Settings',
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette */}
      <div className="fixed inset-x-4 top-[20%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-50 animate-scale-in">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search commands, agents..."
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base"
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
            {flatCommands.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <span className="text-2xl block mb-2">🔍</span>
                No results found
              </div>
            ) : (
              sectionOrder.map(section => {
                const commands = groupedCommands[section]
                if (!commands?.length) return null

                return (
                  <div key={section} className="mb-2">
                    <div className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {sectionLabels[section]}
                    </div>
                    {commands.map((cmd) => {
                      const globalIndex = flatCommands.indexOf(cmd)
                      const isSelected = globalIndex === selectedIndex

                      return (
                        <button
                          key={cmd.id}
                          data-index={globalIndex}
                          onClick={() => {
                            cmd.action()
                            setIsOpen(false)
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                            isSelected
                              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <span className="text-xl flex-shrink-0">{cmd.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{cmd.label}</div>
                            {cmd.description && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {cmd.description}
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <kbd className="hidden sm:flex items-center px-2 py-0.5 text-xs bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                              ↵
                            </kbd>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>
                <span className="ml-1">Select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">K</kbd>
              <span className="ml-1">Toggle</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

// Keyboard hint component for nav
export function CommandPaletteHint({ className = '' }: { className?: string }) {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
      }}
      className={`hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span>Search</span>
      <kbd className="px-1.5 py-0.5 text-xs bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600">⌘K</kbd>
    </button>
  )
}
