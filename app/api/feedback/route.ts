import { NextRequest, NextResponse } from 'next/server'

interface FeedbackData {
  type: 'bug' | 'suggestion' | 'other'
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

interface StoredFeedback extends FeedbackData {
  id: string
  receivedAt: string
}

// In-memory storage for demo (in production, use a database)
// This will persist across requests but not across server restarts
const feedbackStore: StoredFeedback[] = []

export async function POST(req: NextRequest) {
  try {
    const data: FeedbackData = await req.json()

    // Validate required fields
    if (!data.description?.trim()) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }

    if (!['bug', 'suggestion', 'other'].includes(data.type)) {
      return NextResponse.json(
        { error: 'Invalid feedback type' },
        { status: 400 }
      )
    }

    // Create feedback entry
    const feedback: StoredFeedback = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: data.type,
      description: data.description.trim(),
      email: data.email?.trim() || undefined,
      // Don't store screenshot in memory (too large), just log that one was attached
      screenshot: data.screenshot ? '[Screenshot attached]' : undefined,
      metadata: {
        url: data.metadata?.url || 'unknown',
        userAgent: data.metadata?.userAgent || 'unknown',
        platform: data.metadata?.platform || 'unknown',
        screenSize: data.metadata?.screenSize || 'unknown',
        timestamp: data.metadata?.timestamp || new Date().toISOString(),
        theme: data.metadata?.theme || 'light',
      },
      receivedAt: new Date().toISOString(),
    }

    // Store feedback
    feedbackStore.push(feedback)

    // Log feedback for monitoring (in production, send to a service)
    console.log('📬 New Feedback Received:', {
      id: feedback.id,
      type: feedback.type,
      description: feedback.description.substring(0, 100) + (feedback.description.length > 100 ? '...' : ''),
      email: feedback.email || 'not provided',
      hasScreenshot: !!data.screenshot,
      url: feedback.metadata.url,
      receivedAt: feedback.receivedAt,
    })

    return NextResponse.json({
      success: true,
      id: feedback.id,
      message: 'Feedback received successfully',
    })

  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve all feedback (for team review)
export async function GET(req: NextRequest) {
  // Simple auth check via query param (in production, use proper auth)
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')

  if (key !== 'heyagent-alpha-2024') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    count: feedbackStore.length,
    feedback: feedbackStore.map(f => ({
      ...f,
      // Redact email for privacy in list view
      email: f.email ? f.email.replace(/(.{2}).*@/, '$1***@') : undefined,
    })),
  })
}
