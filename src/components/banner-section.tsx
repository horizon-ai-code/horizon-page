"use client"

import { useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { HorizonGlow } from "@/components/horizon-glow"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToSetup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById("installation")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} className="relative py-24 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30 bg-[#0d0d0f]/15 overflow-hidden">
      {/* Background radial glow */}
      <HorizonGlow glowPosition="center" glowColor="blue" sparkleCount={8} showHorizonLine={false} />

      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight uppercase">
            Want to refactor your java code fully offline and no ai cloud dependency?
          </h2>
          <p className="mt-4 font-mono text-xs text-muted-foreground max-w-md">
            Deploy Horizon locally inside your secure intranet environment using pre-built GGUF models.
          </p>
        </div>

        <a
          href="#installation"
          onClick={scrollToSetup}
          className="group inline-flex items-center gap-3 bg-accent text-accent-foreground border border-accent hover:bg-transparent hover:text-accent px-8 py-4 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-lg shadow-xl"
        >
          <span>Install Horizon</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </section>
  )
}
