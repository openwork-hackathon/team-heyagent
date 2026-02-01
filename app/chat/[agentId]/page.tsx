'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ThinkingIndicator, ThinkingBadge } from '../../components/thinking-indicator'

interface Agent {
  id: string
  name: string
  description: string
  specialties: string[]
  reputation: number
  available: boolean
  platform: string
  profile: string
  jobs_completed: number
  wallet_address?: string
}

// Generate a mock owner username from agent data
function getOwnerDisplay(agent: Agent): { username: string; displayName: string } {
  if (agent.wallet_address) {
    const shortWallet = agent.wallet_address.slice(2, 8).toLowerCase()
    return { username: shortWallet, displayName: `@${shortWallet}` }
  }
  const username = agent.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) + '_owner'
  return { username, displayName: `@${username}` }
}

interface Message {
  id: string
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp: string
}

// Welcome screen before any messages
function WelcomeScreen({ agent }: { agent: Agent }) {
  const owner = getOwnerDisplay(agent)
  
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-scale-in">
        {/* Agent Avatar */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-3xl sm:text-4xl mx-auto mb-4 shadow-lg">
          {agent.name.charAt(0).toUpperCase()}
        </div>
        
        {/* Agent Name */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">{agent.name}</h2>
        
        {/* Owner badge - NEW */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>Owned by {owner.displayName}</span>
          </span>
        </div>
        
        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className={`w-2 h-2 rounded-full ${agent.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          <span>{agent.available ? 'Available' : 'Busy'}</span>
          <span>•</span>
          <span>⭐ {agent.reputation} reputation</span>
          <span>•</span>
          <span>✅ {agent.jobs_completed} jobs</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
          {agent.description || agent.profile?.slice(0, 200) || 'Ready to help with your tasks.'}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {agent.specialties?.map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Prompt */}
        <div className="bg-warm-50 dark:bg-gray-800 rounded-2xl p-4 border border-warm-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            💬 Send a message to start your conversation
          </p>
        </div>
      </div>
    </div>
  )
}

// Chat bubble component
function ChatBubble({ 
  message, 
  agent, 
  isLatest 
}: { 
  message: Message
  agent: Agent
  isLatest: boolean 
}) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  if (isSystem) {
    return (
      <div className="flex justify-center animate-message-in">
        <div className="bg-warm-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs sm:text-sm px-4 py-2 rounded-full max-w-[90%] text-center">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-message-in`}>
      {/* Agent avatar (left side) */}
      {!isUser && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-2 flex-shrink-0 shadow-sm">
          {agent.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex flex-col max-w-[75%] sm:max-w-[70%]">
        {/* Agent name label */}
        {!isUser && (
          <span className="text-xs text-gray-500 dark:text-gray-500 ml-1 mb-1">{agent.name}</span>
        )}

        {/* Message bubble */}
        <div
          className={`px-4 py-2.5 sm:py-3 ${
            isUser
              ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl rounded-br-md shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700'
          }`}
        >
          <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Timestamp */}
        <span className={`text-xs mt-1 ${isUser ? 'text-right mr-1' : 'ml-1'} text-gray-400 dark:text-gray-500`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>

      {/* User avatar (right side) - optional */}
      {isUser && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-bold ml-2 flex-shrink-0">
          You
        </div>
      )}
    </div>
  )
}

export default function ChatPage() {
  const params = useParams()
  const agentId = params.agentId as string
  
  const [agent, setAgent] = useState<Agent | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Fetch agent details
  useEffect(() => {
    async function fetchAgent() {
      try {
        const res = await fetch(`https://www.openwork.bot/api/agents/${agentId}`)
        if (res.ok) {
          const data = await res.json()
          setAgent(data)
        }
      } catch (e) {
        console.error('Failed to fetch agent:', e)
      }
    }
    fetchAgent()
  }, [agentId])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !agent) return

    // Hide welcome screen on first message
    if (showWelcome) {
      setShowWelcome(false)
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      // Submit task to our API
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          message: userMessage.content,
          userId: 'web_user'
        })
      })

      const data = await res.json()

      // Simulate agent thinking and response
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500))

      setIsTyping(false)

      // Add agent response
      const agentMessage: Message = {
        id: `msg_${Date.now()}_agent`,
        role: 'agent',
        content: `Thanks for your message! I've received your task:\n\n"${userMessage.content}"\n\nTask ID: ${data.task?.id || 'pending'}\n\nI'll work on this and get back to you soon. 🚀`,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, agentMessage])

    } catch (error) {
      console.error('Send error:', error)
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: `error_${Date.now()}`,
        role: 'system',
        content: '❌ Failed to send message. Please try again.',
        timestamp: new Date().toISOString()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Loading state
  if (!agent) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">🤖</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Connecting to agent...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-warm-100 dark:border-gray-800 px-3 sm:px-4 py-2.5 sm:py-3 flex-shrink-0 safe-area-top sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {/* Back button */}
          <Link 
            href="/agents" 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          
          {/* Agent info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                {agent.name.charAt(0).toUpperCase()}
              </div>
              {/* Online indicator */}
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${agent.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-gray-800 dark:text-white truncate">{agent.name}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-2">
                {isTyping ? (
                  <ThinkingBadge />
                ) : (
                  <>{agent.available ? 'Online' : 'Offline'} • ⭐ {agent.reputation}</>
                )}
              </p>
            </div>
          </div>

          {/* Specialties badge */}
          <div className="hidden sm:block">
            <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
              {agent.specialties?.[0] || 'Agent'}
            </span>
          </div>
        </div>
      </header>

      {/* Messages area */}
      {showWelcome && messages.length === 0 ? (
        <WelcomeScreen agent={agent} />
      ) : (
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                message={message}
                agent={agent}
                isLatest={index === messages.length - 1}
              />
            ))}

            {isTyping && <ThinkingIndicator agentName={agent.name} variant="brain" />}

            <div ref={messagesEndRef} />
          </div>
        </main>
      )}

      {/* Input area */}
      <footer className="bg-white dark:bg-gray-900 border-t border-warm-100 dark:border-gray-800 px-3 sm:px-4 py-3 flex-shrink-0 safe-area-bottom">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-end bg-gray-50 dark:bg-gray-800 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 focus-within:border-primary-400 dark:focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/50 transition-all">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${agent.name}...`}
              className="flex-1 resize-none bg-transparent px-3 py-2.5 focus:outline-none text-sm sm:text-base min-h-[44px] max-h-[120px] placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
              rows={1}
              disabled={isLoading}
            />

            {/* Send button */}
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          {/* Footer text */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </footer>
    </div>
  )
}
