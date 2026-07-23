"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    date: "Lizard / Halstead Analyzer",
    title: "Baseline",
    note: "Establishes cyclomatic complexity and structural signatures of the original code.",
  },
  {
    date: "Planner Agent (Qwen2.5-Coder 3B)",
    title: "Strategy",
    note: "Classifies refactoring intent and synthesizes an AST modification plan.",
  },
  {
    date: "Generator Agent (Qwen2.5-Coder 3B)",
    title: "Execution",
    note: "Applies mutations sequentially or single-shot, generating multiple scored variants.",
  },
  {
    date: "javalang AST Validator",
    title: "Validation",
    note: "Runs syntax, complexity-gate, and boundary checks to catch unintended side effects.",
  },
  {
    date: "Judge Agent (Llama-3.2 3B)",
    title: "Adjudication",
    note: "Audits the change for semantic correctness and overrides hallucinated diffs.",
  },
  {
    date: "Insights & Save",
    title: "Finalization",
    note: "Cleans up, persists results, and extracts developer-facing insights.",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Pipeline</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">PIPELINE PHASES</h2>
      </div>

      {/* Infinite Carousel container */}
      <div className="relative overflow-hidden w-full pb-8">
        {/* Optional gradients for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="flex gap-8 pr-8">
            {signals.map((signal, index) => (
              <SignalCard key={`first-${index}`} signal={signal} index={index} />
            ))}
          </div>
          <div className="flex gap-8 pr-8">
            {signals.map((signal, index) => (
              <SignalCard key={`second-${index}`} signal={signal} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SignalCard({
  signal,
  index,
}: {
  signal: { date: string; title: string; note: string }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      {/* Card with paper texture effect */}
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8 overflow-hidden">
        {/* Top torn edge effect */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent z-20" />

        {/* Large background number */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[160px] leading-none font-[var(--font-bebas)] text-foreground/[0.02] group-hover:text-foreground/[0.08] transition-colors duration-500 pointer-events-none select-none z-0">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <span className="font-mono text-[10px] text-foreground/70 text-right">
              {signal.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
            {signal.title}
          </h3>

          {/* Divider line */}
          <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

          {/* Description */}
          <p className="font-mono text-xs text-foreground/70 leading-relaxed">{signal.note}</p>
        </div>

        {/* Bottom right corner fold effect */}
        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden z-20">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
