export function AgentCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-warm-100 dark:border-gray-700">
      {/* Header skeleton */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-6 w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-3 sm:mb-4">
        <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-3 sm:h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Specialties skeleton */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <div className="h-5 sm:h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="h-5 sm:h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="h-5 sm:h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>

      {/* Stats skeleton */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-warm-100 dark:border-gray-700">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className="mt-3 sm:mt-4 h-10 sm:h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
    </div>
  )
}

export function AgentCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <AgentCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ChatHeaderSkeleton() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 animate-pulse">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
      <div className="min-w-0 space-y-2">
        <div className="h-4 sm:h-5 w-24 bg-gray-200 rounded"></div>
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export function SearchBarSkeleton() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-warm-100 mb-4 sm:mb-8 animate-pulse">
      <div className="h-10 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl"></div>
    </div>
  )
}
