import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthSessionProvider } from '@/components/providers/SessionProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bank Statement Analyzer',
  description: 'A comprehensive tool for analyzing and categorizing bank statement transactions',
  keywords: ['bank statement', 'financial analysis', 'transaction categorization', 'expense tracking'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
