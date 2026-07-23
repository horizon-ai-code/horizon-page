"use client"

import { useRef, useEffect } from "react"
import { HorizonGlow } from "@/components/horizon-glow"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30 bg-[#0d0d0f]/20"
    >
      <HorizonGlow glowPosition="bottom" glowColor="mixed" sparkleCount={4} showHorizonLine={false} />

      <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left Brand Panel */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <div className="flex items-center gap-3">
            <img src="/logo-dark.png" alt="Horizon Logo" className="w-8 h-8 object-contain" />
            <span className="font-[var(--font-outfit)] text-xl font-medium tracking-tight text-foreground">Horizon AI</span>
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted-foreground leading-relaxed max-w-xs">
            Privacy-first, local multi-agent LLM orchestration for automated Java AST refactoring.
          </p>
          <div className="mt-6 w-full max-w-[280px] rounded-lg bg-card border border-border/50 px-4 py-2.5 flex items-center justify-between text-[11px] text-muted-foreground/75">
            <span className="font-mono">How can we help you refactor today?</span>
            <div className="w-5 h-5 rounded-md bg-accent/15 flex items-center justify-center text-accent">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Right Navigation Links Columns */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Tech Stack / Architecture */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Architecture</h4>
            <ul className="space-y-2.5">
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#principles">AST Verification</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#principles">GBNF Grammars</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#principles">Quantized GGUF</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#principles">Feedback Loops</a>
              </li>
            </ul>
          </div>

          {/* Contributors */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contributors</h4>
            <ul className="space-y-2.5">
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="https://www.pugario.tech/" target="_blank" rel="noopener noreferrer">Joshua Lopez</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="https://www.vardz.dev/" target="_blank" rel="noopener noreferrer">Jericho Varde</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="https://github.com/blueztian" target="_blank" rel="noopener noreferrer">Christian Balinado</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="https://github.com/andrewdejito" target="_blank" rel="noopener noreferrer">Andrew Dejito</a>
              </li>
            </ul>
          </div>

          {/* Project Details */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="https://github.com/horizon-ai-code/horizon" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="https://github.com/horizon-ai-code/horizon?tab=MIT-1-ov-file" target="_blank" rel="noopener noreferrer">MIT License</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#installation">Docker Compose</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#signals">Pipeline Phases</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 Horizon AI.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Automated refactoring pipeline.</p>
      </div>
    </section>
  )
}
