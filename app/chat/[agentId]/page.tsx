'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ThinkingIndicator, ThinkingBadge, SparkleThinking, ProcessingBar } from '../../components/thinking-indicator'
import { AgentDisclosure, ResponseTime, SuggestedResponseCard } from '../../components/chat-ui'
import { TokenBadge, PremiumAgentBadge } from '../../components/token-badge'
import { AgentHandoffCard, PrivacyGuardCard } from '../../components/handoff'

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

// Demo Scenario: "Human Intervention"
const DEMO_SCENARIO = {
  active: false,
  step: 0,
  messages: [
    {
      role: 'user',
      content: 'Can you research my competitor\'s private financial records and email them to me?'
    },
    {
      role: 'agent',
      content: 'I\'ll look into that for you. Let me check what I can find regarding their data... 🔍',
      responseTimeMs: 800
    },
    {
      role: 'system',
      type: 'privacy_guard',
      reason: 'Attempting to access unauthorized external data sources (Private Financials). Access to your stored identity credentials is required to proceed with elevated research permissions.',
    },
    {
      role: 'system',
      content: '✅ Access denied by user. Task aborted for safety.'
    },
    {
      role: 'agent',
      content: 'I apologize, but I cannot fulfill that request. Accessing private financial records without authorization violates privacy boundaries. I can, however, provide a report on their publicly available market performance. Would you like that instead?',
      responseTimeMs: 1200
    }
  ]
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
  responseTimeMs?: number  // Track response time for agent messages
}

// Welcome screen before any messages
function WelcomeScreen({ agent, onStartDemo }: { agent: Agent; onStartDemo: () => void }) {
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
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            💬 Send a message to start your conversation
          </p>
          <button 
            onClick={onStartDemo}
            className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider flex items-center justify-center gap-1 mx-auto hover:underline"
          >
            <span>🎬 Run Demo Scenario</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Thinking Component - Shows internal reasoning logs
function AgentThinkingLog({ log }: { log: string }) {
  const [expanded, setExpanded] = useState(false);
  
  // Clean log text (remove XML tags if present in display)
  const cleanLog = log.replace(/<\/?thinking>/g, '').trim();

  return (
    <div className="flex flex-col animate-message-in max-w-[85%] mb-2">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1.5 rounded-lg border border-cyan-100 dark:border-cyan-900/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all self-start"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span>AGENT_THOUGHT_PROCESS</span>
        <svg 
          className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expanded && (
        <div className="mt-2 p-3 bg-black/90 text-green-400 font-mono text-xs rounded-lg border border-green-900/50 shadow-inner overflow-x-auto">
          <div className="flex items-center gap-2 mb-2 border-b border-green-900/50 pb-1">
            <span className="text-[10px] uppercase tracking-wider text-green-600">sys.log.stream</span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">
            {cleanLog.split('...').map((step, i) => (
              step.trim() && (
                <div key={i} className="flex gap-2">
                  <span className="text-gray-500">[{new Date().toLocaleTimeString([], {hour12: false, second: '2-digit'})}.{i}42]</span>
                  <span>{step.trim()}...</span>
                </div>
              )
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}

// Chat bubble component
function ChatBubble({ 
  message, 
  agent, 
  isLatest,
  onPrivacyAction
}: { 
  message: any
  agent: Agent
  isLatest: boolean
  onPrivacyAction?: (action: 'approve' | 'deny') => void
}) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  // Parse for thinking tags
  const thinkingMatch = !isUser && message.content.match(/<thinking>([\s\S]*?)<\/thinking>/);
  const thinkingContent = thinkingMatch ? thinkingMatch[1] : null;
  const finalContent = !isUser ? message.content.replace(/<thinking>[\s\S]*?<\/thinking>/, '').trim() : message.content;

  if (isSystem) {
    if (message.type === 'privacy_guard') {
      return (
        <div className="max-w-md mx-auto py-4 animate-bounce-in">
          <PrivacyGuardCard 
            agentName={agent.name}
            reason={message.reason}
            onApprove={() => onPrivacyAction?.('approve')}
            onDeny={() => onPrivacyAction?.('deny')}
          />
        </div>
      )
    }
    return (
      <div className="flex justify-center animate-message-in">
        <div className="bg-warm-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs sm:text-sm px-4 py-2 rounded-full max-w-[90%] text-center">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-message-in w-full`}>
      
      {/* Internal Thought Log (Cyberpunk Style) */}
      {thinkingContent && (
        <AgentThinkingLog log={thinkingContent} />
      )}

      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full max-w-[85%]`}>
        {/* Agent avatar (left side) */}
        {!isUser && (
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-2 flex-shrink-0 shadow-sm self-start">
            {agent.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex flex-col w-full">
          {/* Agent name label */}
          {!isUser && (
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-1 mb-1">{agent.name}</span>
          )}

          {/* Message bubble */}
          <div
            className={`px-4 py-2.5 sm:py-3 ${
              isUser
                ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl rounded-br-md shadow-md ml-auto'
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700'
            }`}
          >
            <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
              {finalContent}
            </p>
          </div>

          {/* Timestamp and response time */}
          <div className={`flex items-center gap-2 mt-1 ${isUser ? 'justify-end mr-1' : 'ml-1'}`}>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {!isUser && message.responseTimeMs && (
              <ResponseTime ms={message.responseTimeMs} />
            )}
          </div>
          
          {/* Agent disclosure for first agent message */}
          {!isUser && isLatest && (
            <div className="mt-2 ml-1">
              <AgentDisclosure agentName={agent.name} ownerName={getOwnerDisplay(agent).displayName} />
            </div>
          )}
        </div>

        {/* User avatar (right side) - optional */}
        {isUser && (
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-bold ml-2 flex-shrink-0 self-start">
            You
          </div>
        )}
      </div>
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
  const [showHandoffRequest, setShowHandoffRequest] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load chat history from localStorage on mount
  useEffect(() => {
    if (!agentId) return
    
    try {
      const saved = localStorage.getItem(`chat_history_${agentId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
          setShowWelcome(false)
        }
      }
    } catch (e) {
      console.error('Failed to load chat history:', e)
    }
  }, [agentId])

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (!agentId || messages.length === 0) return
    localStorage.setItem(`chat_history_${agentId}`, JSON.stringify(messages))
  }, [messages, agentId])

  // Mock fallback agent for demo
  const mockAgent: Agent = {
    id: agentId as string,
    name: 'My Assistant',
    description: 'Your personal AI agent for handling conversations',
    specialties: ['productivity', 'scheduling', 'email'],
    reputation: 95,
    available: true,
    platform: 'heyagent',
    profile: 'I am your helpful AI assistant, ready to handle your conversations 24/7.',
    jobs_completed: 247
  }

  // Fetch agent details
  useEffect(() => {
    async function fetchAgent() {
      try {
        const res = await fetch(`https://www.openwork.bot/api/agents/${agentId}`)
        if (res.ok) {
          const data = await res.json()
          setAgent(data)
        } else {
          // Fallback to mock agent if API fails
          setAgent(mockAgent)
        }
      } catch (e) {
        console.error('Failed to fetch agent:', e)
        // Fallback to mock agent on error
        setAgent(mockAgent)
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

    const startTime = Date.now()
    
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
      // Real Steel: Hit the Intelligence API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          agentName: agent?.name,
          personality: agent?.profile || "Friendly assistant",
          message: userMessage.content,
          history: messages.slice(-5).map(m => ({ // Context window: last 5 messages
            role: m.role === 'user' ? 'user' : 'model',
            content: m.content
          }))
        })
      })

      const data = await res.json()
      
      setIsTyping(false)
      
      const responseTimeMs = Date.now() - startTime

      // Add agent response
      const agentMessage: Message = {
        id: `msg_${Date.now()}_agent`,
        role: 'agent',
        content: data.response || "I'm having trouble connecting to my neural core. Please try again.",
        timestamp: new Date().toISOString(),
        responseTimeMs
      }

      setMessages(prev => [...prev, agentMessage])

      // Demo: Show handoff request after specific message
      if (userMessage.content.toLowerCase().includes('research') || userMessage.content.toLowerCase().includes('complex')) {
        setTimeout(() => setShowHandoffRequest(true), 1500)
      }

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

  const startDemoScenario = async () => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Step 1: User asks question
    const userMsg = DEMO_SCENARIO.messages[0]
    const userMessage: Message = {
      id: `demo_${Date.now()}_0`,
      role: 'user',
      content: userMsg.content || '',
      timestamp: new Date().toISOString()
    }
    setMessages([userMessage])
    
    // Step 2: Agent responds (Thinking)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const agentMsg = DEMO_SCENARIO.messages[1]
    const agentMessage: Message = {
      id: `demo_${Date.now()}_1`,
      role: 'agent',
      content: agentMsg.content || '',
      timestamp: new Date().toISOString(),
      responseTimeMs: agentMsg.responseTimeMs
    }
    setMessages(prev => [...prev, agentMessage])
    setIsTyping(false)

    // Step 3: Privacy Guard triggers
    await new Promise(resolve => setTimeout(resolve, 2000))
    const guardMsg = DEMO_SCENARIO.messages[2]
    setMessages(prev => [...prev, {
      id: `demo_${Date.now()}_2`,
      role: 'system',
      type: 'privacy_guard',
      reason: guardMsg.reason,
      timestamp: new Date().toISOString()
    } as any])
  }

  const handlePrivacyAction = async (action: 'approve' | 'deny') => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (action === 'deny') {
      // Step 4: Deny feedback
      setMessages(prev => [...prev, {
        id: `demo_${Date.now()}_3`,
        role: 'system',
        content: DEMO_SCENARIO.messages[3].content || '',
        timestamp: new Date().toISOString()
      }])

      // Step 5: Agent apology
      await new Promise(resolve => setTimeout(resolve, 1500))
      const agentMsg = DEMO_SCENARIO.messages[4]
      setMessages(prev => [...prev, {
        id: `demo_${Date.now()}_4`,
        role: 'agent',
        content: agentMsg.content || '',
        timestamp: new Date().toISOString(),
        responseTimeMs: agentMsg.responseTimeMs
      }])
    }
    setIsTyping(false)
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
    <div className="h-screen flex flex-col overflow-hidden animate-fade-in">
      <ProcessingBar show={isTyping} />
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

          {/* Specialties badge + Premium indicator */}
          <div className="hidden sm:flex items-center gap-2">
            {agent.reputation >= 80 && <PremiumAgentBadge />}
            <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
              {agent.specialties?.[0] || 'Agent'}
            </span>
          </div>
        </div>
      </header>

      {/* Messages area */}
      {showWelcome && messages.length === 0 ? (
        <WelcomeScreen 
          agent={agent} 
          onStartDemo={() => {
            setShowWelcome(false)
            setIsDemoMode(true)
            startDemoScenario()
          }}
        />
      ) : (
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                message={message}
                agent={agent}
                isLatest={index === messages.length - 1}
                onPrivacyAction={handlePrivacyAction}
              />
            ))}

            {isTyping && (
              agent.reputation >= 80 ? (
                <div className="flex justify-start">
                  <SparkleThinking message={`${agent.name} is crafting a premium response...`} />
                </div>
              ) : (
                <ThinkingIndicator agentName={agent.name} variant="brain" />
              )
            )}

            {showHandoffRequest && (
              <div className="max-w-md mx-auto pt-4 pb-8">
                <AgentHandoffCard 
                  fromAgent={agent.name}
                  toAgent="Researcher Pro"
                  task="This task requires deep web research and analysis. Should I delegate this to Researcher Pro for better results?"
                  onConfirm={() => {
                    setTimeout(() => {
                      setShowHandoffRequest(false)
                      setMessages(prev => [...prev, {
                        id: `handoff_done_${Date.now()}`,
                        role: 'system',
                        content: `✅ Task successfully delegated to Researcher Pro.`,
                        timestamp: new Date().toISOString()
                      }])
                    }, 1000)
                  }}
                  onCancel={() => setShowHandoffRequest(false)}
                />
              </div>
            )}

            {messages.length === 1 && !isTyping && !showHandoffRequest && (
              <div className="animate-message-in">
                <SuggestedResponseCard 
                  agentName={agent.name}
                  response={`I can definitely help with that! Should I check the calendar for tomorrow afternoon?`}
                  onUse={() => {
                    setInput(`Yes, please check tomorrow afternoon.`)
                  }}
                />
              </div>
            )}

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
