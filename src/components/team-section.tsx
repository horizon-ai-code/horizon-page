"use client"

import { useRef, useState, useEffect } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { HorizonGlow } from "@/components/horizon-glow"
import gsap from "gsap"

type TeamMember = {
  id: string
  role: string
  name: string
  description: string
  imageSrc: string
  initials: string
  detailsLink: string
}

const teamMembers: TeamMember[] = [
  {
    id: "christian",
    role: "Project Lead",
    name: "Christian Balinado",
    description: "Orchestrates overall direction, multi-agent workflows, and coordination across the refactoring pipeline to align local agent orchestration with system goals.",
    imageSrc: "/team/christian-placeholder.jpg",
    initials: "CB",
    detailsLink: "#",
  },
  {
    id: "joshua",
    role: "Full Stack Developer",
    name: "Joshua Lopez",
    description: "Engineers the core multi-agent execution services, state management, and real-time WebSocket telemetry communication layer that drives Horizon's pipelines.",
    imageSrc: "/team/joshua-placeholder.jpg",
    initials: "JL",
    detailsLink: "#",
  },
  {
    id: "jericho",
    role: "Frontend Developer",
    name: "Jericho Varde",
    description: "Designs the premium JetBrains-inspired UI, orchestrating the dynamic FlowGrid visual timelines, Glassbox Terminal console feeds, and metric display layouts.",
    imageSrc: "/team/jericho-placeholder.jpg",
    initials: "JV",
    detailsLink: "#",
  },
  {
    id: "andrew",
    role: "Quality Assurance",
    name: "Andrew Dejito",
    description: "Develops semantic validation tests and runs syntax error monitors, ensuring AST verification and complexity metrics are strictly maintained throughout the refactoring pipeline.",
    imageSrc: "/team/andrew-placeholder.jpg",
    initials: "AD",
    detailsLink: "#",
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
            <div
              key={member.id}
              className={cn(
                "flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[42vw] aspect-[16/9] snap-start group relative rounded-[2rem] bg-[var(--card)] border border-[var(--border)]/65 overflow-hidden flex items-center justify-center transition-all duration-500 shadow-xl",
                activeIndex === index ? "border-[var(--accent)]/60 scale-[1.01]" : "opacity-75 hover:opacity-90"
              )}
            >
              {/* Subtle tech mesh grid in background */}
              <div className="absolute inset-0 grid-bg opacity-5" />

              {/* Initials Display inside placeholder card */}
              <div className="font-[var(--font-display)] text-5xl md:text-7xl font-bold text-[var(--muted-foreground)]/30 tracking-tight transition-transform duration-700 group-hover:scale-105 select-none">
                {member.initials}
              </div>

              {/* Centered Play Button Overlay */}
              <button 
                className="absolute z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-[var(--foreground)] shadow-lg hover:bg-white/20 hover:scale-110 hover:border-[var(--accent)]/55 transition-all duration-300"
                aria-label={`Play video intro for ${member.name}`}
              >
                <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Synced Caption Panel below the row */}
      <div className="mt-12 px-6 md:px-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Caption Info Block */}
        <div className="md:col-span-8 flex flex-col items-start min-h-[160px]">
          <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-medium tracking-tight text-[var(--foreground)]">
            {teamMembers[activeIndex].role} — <span className="text-[var(--muted-foreground)] font-light">{teamMembers[activeIndex].name}</span>
          </h3>
          <p className="mt-4 font-[var(--font-sans)] text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl transition-all duration-300">
            {teamMembers[activeIndex].description}
          </p>
          <a
            href={teamMembers[activeIndex].detailsLink}
            className="mt-6 inline-flex items-center gap-1.5 font-[var(--font-mono)] text-xs text-[var(--accent)] hover:underline tracking-wider"
          >
            View specs ›
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
