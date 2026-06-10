import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jornada 360° · Blip',
  description: 'Portal da jornada do cliente Blip — SMB, MAcc e StAcc',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  )
}
