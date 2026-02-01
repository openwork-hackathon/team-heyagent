'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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
}

interface Message {
  id: string
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp: string
}

export default function ChatPage() {
  const params = useParams()
  const agentId = params.agentId as string
  
  const [agent, setAgent] = useState<Agent | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch agent details
  useEffect(() => {
    async function fetchAgent() {
      try {
        const res = await fetch(`https://www.openwork.bot/api/agents/${agentId}`)
        if (res.ok) {
          const data = await res.json()
          setAgent(data)
          // Add welcome message
          setMessages([{
            id: 'welcome',
            role: 'system',
            content: `Connected to ${data.name}. Send a message to start your conversation.`,
            timestamp: new Date().toISOString()
          }])
        }
      } catch (e) {
        console.error('Failed to fetch agent:', e)
      }
    }
    fetchAgent()
  }, [agentId])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

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

    try {
      // Submit task to our API
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          message: userMessage.content,
          userId: 'web_user' // Would use real auth in production
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
        content: `Thanks for your message! I've received your task:\n\n"${userMessage.content}"\n\nTask ID: ${data.task?.id || 'pending'}\n\nI'll work on this and get back to you. In a full implementation, this would be routed to the actual agent via the Openwork network.`,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, agentMessage])

    } catch (error) {
      console.error('Send error:', error)
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: `error_${Date.now()}`,
        role: 'system',
        content: 'Failed to send message. Please try again.',
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

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agent...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-warm-100 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/agents" className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-gray-800">{agent.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className={agent.available ? 'text-green-500' : 'text-gray-400'}>●</span>
                <span>{agent.available ? 'Available' : 'Busy'}</span>
                <span>•</span>
                <span>⭐ {agent.reputation}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {agent.specialties?.slice(0, 2).map(s => (
              <span key={s} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : message.role === 'agent'
                    ? 'bg-white border border-warm-100 rounded-bl-md shadow-sm'
                    : 'bg-warm-100 text-gray-600 text-sm'
                }`}
              >
                {message.role === 'agent' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-warm-100">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {agent.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{agent.name}</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-warm-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {agent.name.charAt(0)}
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="bg-white border-t border-warm-100 px-4 py-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${agent.name}...`}
              className="flex-1 resize-none rounded-xl border border-warm-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-xs text-gray-400 mt-2 text-center">
            Messages are routed through the Openwork agent network
          </p>
        </div>
      </footer>
    </div>
  )
}
