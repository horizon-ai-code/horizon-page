"use client"

import { useEffect, useRef } from "react"
import { TextScramble } from "@/components/text-scramble"
import { SplitFlapDisplay, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-display"
import { NoiseOverlay } from "@/components/noise-overlay"
import { ScrollIndicator } from "@/components/scroll-indicator"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SplitFlapAudioProvider>
      <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background px-6 md:px-28">
        <NoiseOverlay opacity={0.03} />

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-pulse opacity-50">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Scroll</span>
          <ScrollIndicator className="text-muted-foreground opacity-50" />
        </div>

        {/* Main content */}
        <div ref={contentRef} className="w-full max-w-5xl">
          <div className="relative">
            <SplitFlapDisplay 
              text="HORIZON AI" 
              className="font-[var(--font-bebas)] text-[clamp(1.5rem,7vw,10rem)] whitespace-nowrap leading-[0.85] tracking-tight text-foreground w-full"
              speed={80}
            />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>

          <h2 className="font-[var(--font-bebas)] text-foreground/80 text-[clamp(1rem,3vw,2rem)] mt-8 tracking-wide">
            <TextScramble text="NEXT-GEN" className="text-accent inline-block mr-2" />
            JAVA REFACTORING PIPELINE
          </h2>

          <p className="mt-8 max-w-md font-mono text-sm text-foreground/70 leading-relaxed">
            Runs fully local with no cloud dependency or API keys. Targets consumer GPUs (as low as 4GB VRAM) with automatic CPU fallback.
          </p>

          <div className="mt-12 flex items-center gap-8">
            <a
              href="https://github.com/horizon-ai-code/horizon"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
            >
              <TextScramble text="View Repository" />
            </a>
            <a
              href="#signals"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Explore Pipeline
            </a>
          </div>
        </div>
      </section>
    </SplitFlapAudioProvider>
  )
}
