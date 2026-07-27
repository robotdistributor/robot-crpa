import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CRPA — Canadian Registry for Public Accountability',
  description:
    'A verified, searchable database of public accountability data on Canadian institutions — from child protection to family courts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#f8f9fa] text-[#1a1a2e]">{children}</body>
    </html>
  )
}
