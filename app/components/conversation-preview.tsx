'use client'

/**
 * Conversation preview components
 * Shows condensed message previews for agent cards and notifications
 * 
 * @module components/conversation-preview
 */

interface Message {
  sender: 'user' | 'agent'
  text: string
  timestamp: string
}

/**
 * Single message preview bubble
 */
export function MessagePreviewBubble({ 
  message, 
  compact = false 
}: { 
  message: Message
  compact?: boolean 
}) {
  const isUser = message.sender === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${compact ? 'px-2 py-1' : 'px-3 py-2'} rounded-lg text-sm ${
        isUser
          ? 'bg-primary-500 text-white rounded-br-sm'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
      }`}>
        <p className={compact ? 'text-xs' : 'text-sm'}>{message.text}</p>
      </div>
    </div>
  )
}

/**
 * Conversation preview card
 * Shows last few messages in a condensed format
 */
export function ConversationPreview({ 
  messages,
  maxMessages = 3,
  showTimestamp = false
}: { 
  messages: Message[]
  maxMessages?: number
  showTimestamp?: boolean
}) {
  const displayMessages = messages.slice(-maxMessages)

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 space-y-2">
      {displayMessages.map((msg, i) => (
        <MessagePreviewBubble key={i} message={msg} compact />
      ))}
      {showTimestamp && messages.length > 0 && (
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          {new Date(messages[messages.length - 1].timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      )}
    </div>
  )
}

/**
 * Inline conversation preview for agent cards
 */
export function InlineConversationPreview({ lastMessage }: { lastMessage: string }) {
  const truncated = lastMessage.length > 60 
    ? lastMessage.slice(0, 60) + '...' 
    : lastMessage

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span className="text-gray-400">💬</span>
      <span className="italic truncate">&ldquo;{truncated}&rdquo;</span>
    </div>
  )
}

/**
 * Unread message indicator
 */
export function UnreadBadge({ count }: { count: number }) {
  if (count === 0) return null

  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary-500 text-white text-xs font-bold rounded-full">
      {count > 99 ? '99+' : count}
    </span>
  )
}

/**
 * Conversation list item
 */
export function ConversationListItem({
  agentName,
  agentAvatar,
  lastMessage,
  timestamp,
  unreadCount = 0,
  onClick
}: {
  agentName: string
  agentAvatar?: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors text-left"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
        {agentAvatar || agentName.charAt(0).toUpperCase()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900 dark:text-white truncate">{agentName}</h4>
          <span className="text-xs text-gray-400 dark:text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{lastMessage}</p>
      </div>

      {unreadCount > 0 && <UnreadBadge count={unreadCount} />}
    </button>
  )
}
