/**
 * HeyAgent Component Library
 * 
 * Central export file for all UI components.
 * Import components from here for consistency.
 * 
 * @example
 * ```tsx
 * import { TokenBadge, StatusDot, FeedbackButtons } from '@/components'
 * ```
 * 
 * @module components
 */

// Token components
export { TokenBadge, PremiumAgentBadge, TokenGateOverlay, BuyTokenButton } from './token-badge'
export { TokenStatsCard, StakingStatus, PriorityQueueBadge } from './token-stats'
export { TokenBalanceHeader, TokenBalanceMini } from './token-balance'

// Chat components
export { TypingIndicator, ThinkingBadge, SparkleThinking, ProcessingBar } from './thinking-indicator'
export { FeedbackButtons, CopyButton, RegenerateButton, MessageActions } from './feedback'
export { SuggestedResponseCard, ResponseTime, AgentDisclosure } from './chat-ui'
export { QuickActionPill, QuickActionsBar, FloatingActionButton, PRESET_ACTIONS } from './quick-actions'

// Agent components
export { StatusDot, StatusBadge, LastSeen, TypingStatus, AgentStatusAvatar } from './agent-status'
export { CapabilityCard, CapabilityGrid, CapabilityBadge, CapabilitiesSummary, AGENT_CAPABILITIES } from './capability-cards'
export { AgentCardSkeleton, AgentCardSkeletonGrid } from './skeletons'

// Conversation components
export { MessagePreviewBubble, ConversationPreview, InlineConversationPreview, UnreadBadge, ConversationListItem } from './conversation-preview'

// Privacy components
export { PrivacySettings, PrivacyToggle, VisibilitySelector } from './privacy'

// UI utilities
export { ErrorFallback, NotFound, EmptyState, ConnectionError } from './error-states'
export { useToast, ToastContainer, Spinner, LoadingOverlay, ProgressBar } from './notifications'
export { ScreenReaderOnly, SkipToContent, LiveRegion, FocusTrapHint, KeyboardShortcut } from './accessibility'

// Theme
export { ThemeProvider, ThemeToggle } from './theme-provider'

// Command palette
export { CommandPalette, CommandPaletteHint } from './command-palette'
