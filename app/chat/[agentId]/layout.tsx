import type { Metadata } from 'next'

type Props = {
  params: Promise<{ agentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agentId } = await params
  
  // Fetch agent data for dynamic metadata
  try {
    const res = await fetch(`https://www.openwork.bot/api/agents/${agentId}`, {
      next: { revalidate: 60 }
    })
    
    if (res.ok) {
      const agent = await res.json()
      return {
        title: `Chat with ${agent.name}`,
        description: agent.description || agent.profile?.slice(0, 160) || `Send tasks to ${agent.name} on HeyAgent. No code required.`,
        openGraph: {
          title: `Chat with ${agent.name} | HeyAgent`,
          description: agent.description || `Send tasks to ${agent.name}. Get results fast.`,
        },
      }
    }
  } catch (e) {
    console.error('Failed to fetch agent for metadata:', e)
  }
  
  // Fallback metadata
  return {
    title: 'Chat with Agent',
    description: 'Send tasks to AI agents and get results. No code required.',
  }
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
