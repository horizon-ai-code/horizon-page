"use client"

import { useRef, useState, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { HorizonGlow } from "@/components/horizon-glow"
import gsap from "gsap"

type TeamMember = {
  id: string
  role: string
  description: string
  imageSrc: string
  detailsLink: string
}

const teamMembers: TeamMember[] = [
  {
    id: "christian",
    role: "Project Lead",
    description: "Orchestrates overall direction, multi-agent workflows, and coordination across the refactoring pipeline to align local agent orchestration with system goals.",
    imageSrc: "/team/christian-placeholder.jpg",
    detailsLink: "https://github.com/blueztian",
  },
  {
    id: "joshua",
    role: "Full Stack Developer",
    description: "Engineers the core multi-agent execution services, state management, and real-time WebSocket telemetry communication layer that drives Horizon's pipelines.",
    imageSrc: "/team/joshua-placeholder.jpg",
    detailsLink: "https://www.pugario.tech/",
  },
  {
    id: "jericho",
    role: "Frontend Developer",
    description: "Designs the premium JetBrains-inspired UI, orchestrating the dynamic FlowGrid visual timelines, Glassbox Terminal console feeds, and metric display layouts.",
    imageSrc: "/vardz.png",
    detailsLink: "https://www.vardz.dev/",
  },
  {
    id: "andrew",
    role: "Quality Assurance",
    description: "Develops semantic validation tests and runs syntax error monitors, ensuring AST verification and complexity metrics are strictly maintained throughout the refactoring pipeline.",
    imageSrc: "/team/andrew-placeholder.jpg",
    detailsLink: "https://github.com/andrewdejito",
  },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Custom cursor tracking logic reused from pipeline-section
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

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
      const card = scrollRef.current.querySelector(".snap-start")
      if (card) {
        const cardWidth = card.getBoundingClientRect().width + 24 // card width + gap
        
        // If we are scrolled to the absolute end, snap to the last team member card
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 25
        if (isAtEnd) {
          setActiveIndex(teamMembers.length - 1)
        } else {
          const index = Math.round(scrollLeft / cardWidth)
          if (index !== activeIndex && index >= 0 && index < teamMembers.length) {
            setActiveIndex(index)
          }
        }
      }
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(
        scrollLeft + clientWidth < scrollWidth - 25
      )
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(".snap-start")
      if (card) {
        const cardWidth = card.getBoundingClientRect().width + 24 // card width + gap
        const newIndex = direction === "left" ? activeIndex - 1 : activeIndex + 1
        if (newIndex >= 0 && newIndex < teamMembers.length) {
          const targetScrollLeft = newIndex * cardWidth
          scrollRef.current.scrollTo({ left: targetScrollLeft, behavior: "smooth" })
          setActiveIndex(newIndex)
        }
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="team" 
      className="relative py-32 border-t border-[var(--border)] overflow-hidden bg-[var(--background)]"
    >
      {/* Background glow and sparkles */}
      <HorizonGlow glowPosition="center" glowColor="mixed" sparkleCount={5} showHorizonLine={false} />

      {/* GSAP Custom Pointer Tracker */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)]/10",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Section Header */}
      <div className="mb-16 px-6 md:px-28">
        <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">05 / Team</span>
        <h2 className="mt-4 font-[var(--font-display)] text-5xl md:text-7xl tracking-tight text-[var(--foreground)]">
          MEET THE BUILDERS
        </h2>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 scrollbar-hide px-6 md:px-28 scroll-pl-6 md:scroll-pl-28"
          style={{ scrollbarWidth: "none" }}
        >
          {teamMembers.map((member, index) => (
            <a
              key={member.id}
              href={member.detailsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[42vw] aspect-[16/9] snap-start group relative rounded-[2rem] bg-[var(--card)] border border-[var(--border)]/65 overflow-hidden flex items-center justify-center transition-all duration-500 shadow-xl cursor-pointer block",
                activeIndex === index ? "border-[var(--accent)]/60 scale-[1.01]" : "opacity-75 hover:opacity-90"
              )}
            >
              {/* Subtle tech mesh grid in background */}
              <div className="absolute inset-0 grid-bg opacity-5" />

              {/* Responsive Image with Graceful Initials Fallback */}
              <CardImage 
                src={member.imageSrc} 
                alt={member.role} 
                initials={member.role.split(" ").map(w => w[0]).join("").toUpperCase()} 
              />

              {/* Centered Hover Pill (Visit Site) */}
              <div 
                className="absolute z-20 px-6 py-3 bg-white text-black font-sans text-xs font-bold rounded-full shadow-2xl flex items-center gap-2 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none"
              >
                <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5px]" />
                <span>Visit Site</span>
              </div>
            </a>
          ))}
          {/* Spacer to allow the last card to scroll to the most left */}
          <div className="flex-shrink-0 w-[20vw] sm:w-[50vw] md:w-[58vw]" />
        </div>
      </div>

      {/* Synced Caption Panel below the row */}
      <div className="mt-12 px-6 md:px-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Caption Info Block */}
        <div className="md:col-span-8 flex flex-col items-start min-h-[160px]">
          <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-medium tracking-tight text-[var(--foreground)]">
            {teamMembers[activeIndex].role}
          </h3>
          <p className="mt-4 font-[var(--font-sans)] text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl transition-all duration-300">
            {teamMembers[activeIndex].description}
          </p>
          <a
            href={teamMembers[activeIndex].detailsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-[var(--font-mono)] text-xs text-[var(--accent)] hover:underline tracking-wider"
          >
            View portfolio ›
          </a>
        </div>

        {/* Carousel controls - Top-right of description block */}
        <div className="md:col-span-4 flex justify-end items-center gap-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--card)] text-[var(--foreground)] transition-all duration-300",
              canScrollLeft ? "opacity-100 hover:border-[var(--accent)] hover:text-[var(--accent)]" : "opacity-35 cursor-not-allowed"
            )}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--card)] text-[var(--foreground)] transition-all duration-300",
              canScrollRight ? "opacity-100 hover:border-[var(--accent)] hover:text-[var(--accent)]" : "opacity-35 cursor-not-allowed"
            )}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

function CardImage({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const [hasError, setHasError] = useState(false)
  const isPlaceholder = src.includes("-placeholder")

  if (isPlaceholder || hasError) {
    return (
      <div className="font-[var(--font-display)] text-5xl md:text-7xl font-bold text-[var(--muted-foreground)]/30 tracking-tight transition-transform duration-700 group-hover:scale-105 select-none z-10">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
    />
  )
}
