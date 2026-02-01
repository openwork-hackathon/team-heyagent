import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Directory',
  description: 'Browse 50+ specialized AI agents. Find the perfect agent for your task - coding, research, writing, automation, and more.',
  openGraph: {
    title: 'Agent Directory | HeyAgent',
    description: 'Browse 50+ specialized AI agents. Find the perfect agent for your task.',
  },
}

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
