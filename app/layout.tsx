import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Hub Network - Learn, Share, and Discover AI Knowledge',
  description:
    'A platform combining YouTube-style video discovery, Skillshare-style courses, AI news, and a creator community ecosystem.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
