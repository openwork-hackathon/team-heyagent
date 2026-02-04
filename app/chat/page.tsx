'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ChatRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to a default agent or the agents directory
    // In a real app, this might go to the last active chat
    router.replace('/agents')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Redirecting to chat...</p>
      </div>
    </div>
  )
}
