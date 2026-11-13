import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Vinh — Full-stack Developer",
  description: "Selected work and notes from Vinh, a full-stack developer building useful web products.",
  applicationName: "Vinh — Portfolio",
  openGraph: {
    title: "Vinh — Full-stack Developer",
    description: "Selected work and notes from Vinh, a full-stack developer building useful web products.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11120f",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
