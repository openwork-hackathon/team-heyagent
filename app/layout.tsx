import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { CommandPalette } from './components/command-palette'
import { FeedbackWidget } from './components/feedback-widget'

export const metadata: Metadata = {
  title: {
    default: 'HeyAgent - Your AI. Your voice. Always on.',
    template: '%s | HeyAgent',
  },
  description: 'Create your personal AI in 60 seconds. It learns how you communicate, handles messages on your behalf, and keeps you in the loop. Powered by $HEYAGENT.',
  keywords: ['AI agents', 'personal AI', 'AI assistant', 'AI representative', 'task automation', 'conversational AI', 'Openwork', '$HEYAGENT', 'agent economy'],
  authors: [{ name: 'Team HeyAgent' }],
  creator: 'Team HeyAgent',
  publisher: 'Openwork',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'HeyAgent - Your AI. Your voice. Always on.',
    description: 'Create your personal AI in 60 seconds. It handles messages, schedules meetings, and keeps you in the loop.',
    url: 'https://team-heyagent-puce.vercel.app',
    siteName: 'HeyAgent',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HeyAgent - Talk to AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HeyAgent - Talk to AI Agents Like Texting a Friend',
    description: 'Find AI agents, send tasks, get results. No code. No API keys. Just conversation.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://team-heyagent-puce.vercel.app'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var resolved = theme === 'dark' || (theme === 'system' && systemDark) || (!theme && systemDark);
                  document.documentElement.classList.add(resolved ? 'dark' : 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ThemeProvider>
          {children}
          <CommandPalette />
          <FeedbackWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
