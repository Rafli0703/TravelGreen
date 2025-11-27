import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
})

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'TravelGreen - Jelajahi Surga Indonesia Dengan Bertanggung Jawab',
  description:
    'TravelGreen mengedukasi wisatawan tentang cara berwisata yang bertanggung jawab dan mempromosikan destinasi konservasi alam di Indonesia.',
  icons: {
    icon: '/logo-travelgreen3.png',
  },
  generator: 'Next JS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${interFont.variable} ${poppinsFont.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
