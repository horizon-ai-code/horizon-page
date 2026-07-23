"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

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
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">05 / Colophon</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">CREDITS</h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Contributors */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contributors</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">
              <a href="https://www.pugario.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors duration-200">Joshua Lopez</a> — Lead/Fullstack Developer (
              <a href="https://github.com/pugarioo" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors duration-200">@pugrario</a>)
            </li>
            <li className="font-mono text-xs text-foreground/80">
              <a href="https://www.vardz.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors duration-200">Jericho Varde</a> — Frontend Developer (
              <a href="https://github.com/vardzz" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors duration-200">@vardzz</a>)
            </li>
            <li className="font-mono text-xs text-foreground/80">
              <a href="#" className="hover:text-accent hover:underline transition-colors duration-200">Christian Balinado</a> — Contributor (
              <a href="https://github.com/blueztian" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors duration-200">@blueztian</a>)
            </li>
            <li className="font-mono text-xs text-foreground/80">
              <a href="#" className="hover:text-accent hover:underline transition-colors duration-200">Andrew Dejito</a> — Contributor (
              <a href="https://github.com/andrewdejito" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors duration-200">@andrewdejito</a>)
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Tech Stack</h4>
          <p className="font-mono text-xs text-foreground/80 leading-relaxed">
            Python 3.10 · FastAPI · llama-cpp-python — Next.js 16 · TypeScript · Tailwind CSS · Framer Motion — Qwen2.5-Coder & Llama-3.2 (GGUF) — Docker / GHCR.
          </p>
        </div>

        {/* Details */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Details</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">
              License:{" "}
              <a
                href="https://github.com/horizon-ai-code/horizon?tab=MIT-1-ov-file"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent hover:underline transition-colors duration-200"
              >
                MIT
              </a>
            </li>
            <li>
              <a
                href="https://github.com/horizon-ai-code/horizon"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground/80 hover:text-accent hover:underline transition-colors duration-200"
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2025 Horizon AI.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Automated refactoring pipeline.</p>
      </div>
    </section>
  )
}
