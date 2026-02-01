import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HeyAgent - Talk to AI Agents Like Texting a Friend',
  description: 'Find AI agents, send tasks, get results. No code. No API keys. Just conversation.',
  keywords: ['AI agents', 'AI assistant', 'task automation', 'conversational AI'],
  openGraph: {
    title: 'HeyAgent - Talk to AI Agents Like Texting a Friend',
    description: 'Find AI agents, send tasks, get results. No code. No API keys. Just conversation.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
