"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { HorizonGlow } from "@/components/horizon-glow"

interface TeamMember {
  role: string
  description: string
  detailsLink: string
}

const teamMembers: TeamMember[] = [
  {
    role: "Project Lead",
    description: "Orchestrates multi-agent pipelines and coordinates model-level GBNF grammar constraints to build a production-ready codebase.",
    detailsLink: "#",
  },
  {
    role: "Full stack developer",
    description: "Builds production-ready applications with confidence with thoroughly designed artifacts and comprehensive verification tests.",
    detailsLink: "#",
  },
  {
    role: "Frontend developer",
    description: "Designs modern UI systems, premium dark modes, visual telemetry gauges, and smooth GPU-accelerated micro-animations.",
    detailsLink: "#",
  },
  {
    role: "Quality assurance",
    description: "Ensures Java AST stability and runs regression benchmarks, validating syntax errors and preventing class boundary drift.",
    detailsLink: "#",
  },
]

export function TeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 5)
      // Allow minor threshold gap
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", checkScroll)
      // Initial check
      checkScroll()
      // Check on window resize
      window.addEventListener("resize", checkScroll)
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
    }
  }

  return (
    <section id="team" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30 overflow-hidden">
      {/* Background glow and sparkles */}
      <HorizonGlow glowPosition="center" glowColor="mixed" sparkleCount={5} showHorizonLine={true} />

      {/* Section header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">05 / Team</span>
          <h2 className="mt-4 font-[var(--font-outfit)] text-5xl md:text-7xl tracking-tight font-medium text-foreground">
            MEET THE BUILDERS
          </h2>
        </div>
        <p className="max-w-xs font-mono text-xs text-muted-foreground leading-relaxed">
          The developers who build the next generation of local Java refactoring intelligence.
        </p>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[420px] snap-start group"
            >
              {/* Media Card (Image Placeholder) */}
              <div className="relative aspect-[16/10] w-full rounded-[2rem] bg-gradient-to-br from-card to-background border border-border/40 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:border-accent/40 shadow-xl">
                {/* Visual Placeholder Content */}
                <div className="absolute inset-0 bg-[#0d0d0f]/60 z-10" />
                
                {/* Subtle tech mesh grid in background */}
                <div className="absolute inset-0 grid-bg opacity-15" />
                
                {/* Avatar mock circle inside card */}
                <div className="w-20 h-20 rounded-full border border-border/50 bg-card/65 flex items-center justify-center text-muted-foreground/60 text-xs font-mono z-15 shadow-inner transition-transform duration-500 group-hover:scale-105">
                  [ PHOTO ]
                </div>

                {/* Centered Play Button Overlay */}
                <button 
                  className="absolute z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 hover:scale-110 hover:border-accent/50 transition-all duration-300"
                  aria-label="Play video intro"
                >
                  <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
                </button>
              </div>

              {/* Developer Details */}
              <div className="mt-6 flex flex-col items-start px-2">
                <h3 className="font-[var(--font-inter)] text-lg md:text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent duration-300">
                  {member.role}
                </h3>
                <p className="mt-2 font-[var(--font-inter)] text-sm text-muted-foreground/80 leading-relaxed min-h-[60px]">
                  {member.description}
                </p>
                <a
                  href={member.detailsLink}
                  className="mt-4 font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-accent flex items-center gap-1.5 transition-colors duration-200"
                >
                  View details <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls - Floating arrow buttons */}
        <div className="mt-8 flex items-center gap-3 justify-end md:justify-start md:px-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "w-10 h-10 rounded-full border border-border/50 flex items-center justify-center bg-card text-foreground transition-all duration-300",
              canScrollLeft ? "opacity-100 hover:border-accent hover:text-accent" : "opacity-30 cursor-not-allowed"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "w-10 h-10 rounded-full border border-border/50 flex items-center justify-center bg-card text-foreground transition-all duration-300",
              canScrollRight ? "opacity-100 hover:border-accent hover:text-accent" : "opacity-30 cursor-not-allowed"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
