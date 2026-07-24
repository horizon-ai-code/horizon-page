"use client"

import { useRef, useEffect, useState } from "react"
import { HorizonGlow } from "@/components/horizon-glow"
import { ArrowUpRight, Github } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import packageInfo from "../../package.json"

gsap.registerPlugin(ScrollTrigger)

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1000)
  }

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
      <HorizonGlow 
        className="[&_svg]:!text-[var(--accent)] [&_svg]:!drop-shadow-[0_0_8px_var(--accent)]" 
        glowPosition="bottom" 
        glowColor="blue" 
        sparkleCount={15} 
        showHorizonLine={false} 
      />

      <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left Brand Panel */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <div className="flex items-center gap-3">
            <img src="/logo-dark.png" alt="Horizon Logo" className="w-8 h-8 object-contain" />
            <span className="font-[var(--font-outfit)] text-xl font-medium tracking-tight text-foreground">Horizon AI</span>
            <a
              href="https://github.com/horizon-ai-code/horizon"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted-foreground leading-relaxed max-w-xs">
            Privacy-first, local multi-agent LLM orchestration for an automated Java AST refactoring pipeline.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-6 w-full max-w-[280px]">
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Get updates (email)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-card/50 border border-border/50 px-4 py-2.5 pr-10 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/75 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-2.5 w-5 h-5 rounded-md bg-accent/15 flex items-center justify-center text-accent hover:bg-accent/25 active:scale-95 transition-all cursor-pointer"
                aria-label="Submit"
              >
                {status === "loading" ? (
                  <span className="w-2.5 h-2.5 rounded-full border border-accent border-t-transparent animate-spin" />
                ) : status === "success" ? (
                  <span className="text-[9px] font-bold">✓</span>
                ) : (
                  <ArrowUpRight className="w-3 h-3" />
                )}
              </button>
            </div>
            {status === "success" && (
              <p className="mt-1.5 font-mono text-[9px] text-accent animate-fade-in">Subscribed successfully!</p>
            )}
          </form>
        </div>

        {/* Right Navigation Links Columns */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Tech Stack / Architecture */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Architecture</h4>
            <ul className="flex flex-wrap gap-2 max-w-[200px]">
              <li className="font-mono text-[10px] text-muted-foreground bg-card border border-border/40 px-2 py-1 rounded">
                AST Verification
              </li>
              <li className="font-mono text-[10px] text-muted-foreground bg-card border border-border/40 px-2 py-1 rounded">
                GBNF Grammars
              </li>
              <li className="font-mono text-[10px] text-muted-foreground bg-card border border-border/40 px-2 py-1 rounded">
                Quantized GGUF
              </li>
              <li className="font-mono text-[10px] text-muted-foreground bg-card border border-border/40 px-2 py-1 rounded">
                Feedback Loops
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#hero">Horizon</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#installation">Installation</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#signals">Pipeline</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#work">Features</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#demo">Demo</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#principles">Architecture</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#team">Team</a>
              </li>
              <li className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors">
                <a href="#colophon">Colophon</a>
              </li>
            </ul>
          </div>

          {/* Builders */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Builders</h4>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <a href="https://github.com/blueztian" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors w-fit">
                  Christian Balinado
                </a>
                <span className="font-mono text-[9px] text-muted-foreground mt-0.5">Project Lead</span>
              </li>
              <li className="flex flex-col">
                <a href="https://github.com/pugarioo" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors w-fit">
                  Joshua Lopez
                </a>
                <span className="font-mono text-[9px] text-muted-foreground mt-0.5">Full Stack / Lead Developer</span>
              </li>
              <li className="flex flex-col">
                <a href="https://github.com/vardzz" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors w-fit">
                  Jericho Varde
                </a>
                <span className="font-mono text-[9px] text-muted-foreground mt-0.5">Frontend Developer</span>
              </li>
              <li className="flex flex-col">
                <a href="https://github.com/andrewdejito" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-foreground/75 hover:text-accent transition-colors w-fit">
                  Andrew Dejito
                </a>
                <span className="font-mono text-[9px] text-muted-foreground mt-0.5">Quality Assurance Manager</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
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
        className="mt-24 pt-8 border-t border-border/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2026 Horizon AI.
          </p>
          <span className="font-mono text-[9px] text-muted-foreground/60 bg-card border border-border/40 px-2 py-0.5 rounded w-fit">
            v{packageInfo.version} • telemetry active
          </span>
        </div>
      </div>
    </section>
  )
}

