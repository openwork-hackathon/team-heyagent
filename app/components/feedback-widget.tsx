'use client'

import { useState, useRef, useEffect } from 'react'

type FeedbackType = 'bug' | 'suggestion' | 'other'

interface FeedbackData {
  type: FeedbackType
  description: string
  email?: string
  screenshot?: string
  metadata: {
    url: string
    userAgent: string
    platform: string
    screenSize: string
    timestamp: string
    theme: 'light' | 'dark'
  }
}

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<FeedbackType>('bug')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setType('bug')
        setDescription('')
        setEmail('')
        setScreenshot(null)
        setIsSuccess(false)
        setError(null)
      }, 300)
    }
  }, [isOpen])

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Screenshot must be under 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setScreenshot(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getMetadata = () => {
    return {
      url: window.location.href,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString(),
      theme: document.documentElement.classList.contains('dark') ? 'dark' as const : 'light' as const,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!description.trim()) {
      setError('Please describe your feedback')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const feedbackData: FeedbackData = {
      type,
      description: description.trim(),
      email: email.trim() || undefined,
      screenshot: screenshot || undefined,
      metadata: getMetadata(),
    }

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      })

      if (!res.ok) {
        throw new Error('Failed to submit feedback')
      }

      setIsSuccess(true)
      
      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)

    } catch (err) {
      console.error('Feedback submission error:', err)
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const typeLabels = {
    bug: { label: '🐛 Bug Report', color: 'text-red-600 dark:text-red-400' },
    suggestion: { label: '💡 Suggestion', color: 'text-yellow-600 dark:text-yellow-400' },
    other: { label: '💬 Other', color: 'text-blue-600 dark:text-blue-400' },
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        aria-label="Send Feedback"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-24 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 z-50 animate-slide-in-up">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <span>💬</span> Send Feedback
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            {isSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Thank you! 🎉</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your feedback has been received. We appreciate your help making HeyAgent better!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as FeedbackType)}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="bug">🐛 Bug Report</option>
                    <option value="suggestion">💡 Suggestion</option>
                    <option value="other">💬 Other</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={type === 'bug' ? 'What happened? What did you expect?' : 'Tell us your thoughts...'}
                    rows={4}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Screenshot <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="hidden"
                  />
                  {screenshot ? (
                    <div className="relative">
                      <img 
                        src={screenshot} 
                        alt="Screenshot preview" 
                        className="w-full h-24 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => setScreenshot(null)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-3 py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Attach screenshot
                    </button>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email <span className="text-gray-400 dark:text-gray-500">(for follow-up)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isSubmitting || !description.trim()
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Feedback
                    </>
                  )}
                </button>

                {/* Auto-captured info hint */}
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                  We automatically capture page URL, browser, and device info to help debug issues.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
