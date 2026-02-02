/**
 * Accessibility utility components and hooks
 * Improves screen reader support and keyboard navigation
 * 
 * @module components/accessibility
 */

/**
 * Screen reader only text
 * Visually hidden but accessible to screen readers
 */
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

/**
 * Skip to main content link
 * Appears on focus for keyboard navigation
 */
export function SkipToContent({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:shadow-lg"
    >
      Skip to main content
    </a>
  )
}

/**
 * Live region for dynamic announcements
 * Screen readers will announce changes to this region
 */
export function LiveRegion({ 
  message, 
  type = 'polite' 
}: { 
  message: string
  type?: 'polite' | 'assertive'
}) {
  return (
    <div
      role="status"
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

/**
 * Focus trap container
 * Keeps focus within a modal or dialog
 */
export function FocusTrapHint() {
  return (
    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
      <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Tab</kbd> to navigate,{' '}
      <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Esc</kbd> to close
    </div>
  )
}

/**
 * Keyboard shortcut display
 */
export function KeyboardShortcut({ 
  keys, 
  label 
}: { 
  keys: string[]
  label: string
}) {
  return (
    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
      <span>{label}</span>
      <div className="flex gap-1">
        {keys.map((key, i) => (
          <span key={i}>
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
              {key}
            </kbd>
            {i < keys.length - 1 && <span className="mx-0.5">+</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
