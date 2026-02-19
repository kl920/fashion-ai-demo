import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fashion AI Studio - AI-Powered Fashion Visualization',
  description: 'Generate professional fashion model images with AI. Upload your garments and see them on professional models instantly.',
  keywords: ['fashion', 'AI', 'image generation', 'virtual model', 'e-commerce'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
