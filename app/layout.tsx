import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import NetworkStatus from '@/components/NetworkStatus'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Flashcard Wizard',
  description:
    'Transform any text into intelligent flashcards with AI. Study smarter with our AI-powered flashcard generator.',
  keywords: [
    'AI Flashcards',
    'Study Tool',
    'Flashcard Generator',
    'AI Learning',
    'Smart Study',
    'Education Technology',
    'Study Cards',
    'Memory Training',
    'Learning App',
    'Study Assistant',
    'AI Study Tool',
    'Educational SaaS',
  ],
  openGraph: {
    title: 'AI Flashcard Wizard',
    description:
      'Transform any text into intelligent flashcards with AI. Study smarter with our AI-powered flashcard generator.',
    siteName: 'AI Flashcard Wizard',
    images: [
      {
        url: 'https://i.postimg.cc/65jX93Ct/Screenshot-2025-07-02-224028.png',
        width: 1200,
        height: 630,
        alt: 'AI Flashcard Wizard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Flashcard Wizard',
    description:
      'Transform any text into intelligent flashcards with AI. Study smarter with our AI-powered flashcard generator.',
    images: [
      'https://i.postimg.cc/65jX93Ct/Screenshot-2025-07-02-224028.png',
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning className={geist.variable}>
        <body className='font-sans antialiased' suppressHydrationWarning>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <NetworkStatus />
            <main className='min-h-screen container mx-auto px-4'>
              {children}
              <Analytics />
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
