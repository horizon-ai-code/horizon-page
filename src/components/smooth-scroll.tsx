"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Declare global window property for TypeScript
declare global {
  interface Window {
    lenis?: Lenis
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Intercept all hash/anchor link clicks for smooth routing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      if (link) {
        const href = link.getAttribute("href")
        if (href && href.startsWith("#")) {
          // Check if the target element exists on the page
          const targetElement = document.getElementById(href.substring(1))
          if (targetElement) {
            e.preventDefault()
            targetElement.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      lenis.destroy()
      window.lenis = undefined
      gsap.ticker.remove(lenis.raf)
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
