import type React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Horizon AI",
  description:
    "AI-driven Java refactoring pipeline powered by local multi-agent LLM orchestration.",
  generator: "v0.app",
  icons: {
    icon: "/logo-dark.png",
    apple: "/logo-dark.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${inter.variable} ${firaCode.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
