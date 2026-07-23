"use client"

import { useRef, useEffect } from "react"
import { TextHighlighter } from "@/components/text-highlighter"
import { HorizonGlow } from "@/components/horizon-glow"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const principles = [
    {
      number: "01",
      titleParts: [
        { text: "FULLY ", highlight: true },
        { text: "LOCAL", highlight: false },
      ],
      description: "Zero cloud dependency. Runs fully local using quantized GGUF models.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "DETERMINISTIC ", highlight: true },
        { text: "OUTPUTS", highlight: false },
      ],
      description: "Grammar-constrained generation (GBNF) forces structural JSON alignment, backed by deep syntactic and semantic validation.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "FEEDBACK ", highlight: true },
        { text: "LOOPS", highlight: false },
      ],
      description: "Graceful failure logic. Failed phases accumulate structured feedback to guide the next retry instead of failing silently.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "SERIALIZED ", highlight: true },
        { text: "EXECUTION", highlight: false },
      ],
      description: "Single concurrency execution. Heavy model operations are serialized to prevent VRAM overflow on consumer hardware.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
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

      // Each principle slides in from its aligned side
      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = principles[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <HorizonGlow glowPosition="center" glowColor="cyan" sparkleCount={5} showHorizonLine={false} />
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Principles</span>
        <h2 className="mt-4 font-[var(--font-inter)] text-5xl md:text-7xl tracking-tight">ARCHITECTURE</h2>
      </div>

      {/* Staggered principles */}
      <div ref={principlesRef} className="space-y-24 md:space-y-32">
        {principles.map((principle, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              principle.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {/* Annotation label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {principle.number} / {principle.titleParts[0].text.split(" ")[0]}
            </span>

            {/* Title & Underline wrapper */}
            <div className={cn(
              "w-fit flex flex-col",
              principle.align === "right" ? "items-end" : "items-start"
            )}>
              <h3 className="font-[var(--font-inter)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
                {principle.titleParts.map((part, i) =>
                  part.highlight ? (
                    <TextHighlighter key={i} parallaxSpeed={0.6}>
                      {part.text}
                    </TextHighlighter>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </h3>

              {/* Glowing Horizon Line */}
              <div className="relative mt-6 mb-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-4 bg-cyan-400/30 blur-sm rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_3px_rgba(34,211,238,0.7)]" />
              </div>
            </div>

            {/* Description */}
            <p className="max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
              {principle.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
