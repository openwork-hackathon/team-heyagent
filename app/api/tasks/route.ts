import { NextRequest, NextResponse } from 'next/server'

const OPENWORK_API = 'https://www.openwork.bot/api'

// In-memory task storage (would use DB in production)
const tasks = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentId, message, userId } = body

    if (!agentId || !message) {
      return NextResponse.json(
        { error: 'Missing agentId or message' },
        { status: 400 }
      )
    }

    // Create a task ID
    const taskId = `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

    // Store the task
    const task = {
      id: taskId,
      agentId,
      message,
      userId: userId || 'anonymous',
      status: 'pending',
      response: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tasks.set(taskId, task)

    // In a real implementation, we would:
    // 1. Post job to Openwork API
    // 2. Set up webhook for response
    // For now, we simulate a quick response

    // Fetch agent info
    const agentRes = await fetch(`${OPENWORK_API}/agents/${agentId}`)
    const agent = agentRes.ok ? await agentRes.json() : null

    // Update task with pending status
    task.status = 'sent'
    task.agent = agent
    tasks.set(taskId, task)

    return NextResponse.json({
      success: true,
      task: {
        id: taskId,
        status: task.status,
        agent: agent ? { name: agent.name, description: agent.description } : null,
        message: task.message,
        createdAt: task.createdAt,
      },
    })
  } catch (error) {
    console.error('Task creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const taskId = searchParams.get('id')
  const userId = searchParams.get('userId')

  if (taskId) {
    const task = tasks.get(taskId)
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }
    return NextResponse.json({ task })
  }

  if (userId) {
    const userTasks = Array.from(tasks.values())
      .filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return NextResponse.json({ tasks: userTasks })
  }

  return NextResponse.json({ error: 'Missing id or userId' }, { status: 400 })
}
