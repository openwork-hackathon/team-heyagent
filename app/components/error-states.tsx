'use client'

import Link from 'next/link'

// Generic error boundary fallback
export function ErrorFallback({ 
  error, 
  reset 
}: { 
  error?: Error
  reset?: () => void 
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">😵</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error?.message || "We're having trouble loading this page. Please try again."}
        </p>
        <div className="flex gap-3 justify-center">
          {reset && (
            <button
              onClick={reset}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          )}
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

// Not found state
export function NotFound({ 
  title = "Page not found",
  message = "The page you're looking for doesn't exist or has been moved."
}: { 
  title?: string
  message?: string 
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}

// Empty state component
export function EmptyState({
  icon = '📭',
  title,
  message,
  action,
  actionLabel = 'Get Started'
}: {
  icon?: string
  title: string
  message: string
  action?: () => void
  actionLabel?: string
}) {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {message}
      </p>
      {action && (
        <button
          onClick={action}
          className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// Connection error state
export function ConnectionError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <div className="flex-1">
          <p className="font-medium text-red-800 dark:text-red-200">
            Connection Error
          </p>
          <p className="text-sm text-red-600 dark:text-red-400">
            Unable to connect. Check your internet connection.
          </p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1.5 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
