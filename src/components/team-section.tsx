"use client"

import { useRef, useState, useEffect } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { HorizonGlow } from "@/components/horizon-glow"
import { ScrambleText } from "@/components/text-scramble"
import gsap from "gsap"
import { motion, AnimatePresence } from "framer-motion"

type TeamMember = {
  id: string
  role: string
  name: string
  description: string
  imageSrc: string
  siteUrl: string
  objectPosition?: string
}

const teamMembers: TeamMember[] = [
  {
    id: "christian",
    role: "Project Lead",
    name: "Christian Balinado",
    description: "Orchestrates overall direction, multi-agent workflows, and coordination across the refactoring pipeline to align local agent orchestration with system goals.",
    imageSrc: "/ian.png",
    siteUrl: "https://github.com/blueztian",
    objectPosition: "90% center", // Shift Ian leftwards to add padding on the right side
  },
  {
    id: "joshua",
    role: "Full Stack / Lead Developer",
    name: "Joshua Lopez",
    description: "Engineers the core multi-agent execution services, state management, and real-time WebSocket telemetry communication layer that drives Horizon's pipelines.",
    imageSrc: "/joshua.png",
    siteUrl: "https://www.pugario.tech/",
    objectPosition: "80% center", // Shift Joshua leftwards to add padding on the right side
  },
  {
    id: "jericho",
    role: "Frontend Developer",
    name: "Jericho Varde",
    description: "Designs the premium JetBrains-inspired UI, orchestrating the dynamic FlowGrid visual timelines, Glassbox Terminal console feeds, and metric display layouts.",
    imageSrc: "/vardz.png",
    siteUrl: "https://www.vardz.dev/",
    objectPosition: "center center",
  },
  {
    id: "andrew",
    role: "Quality Assurance Manager",
    name: "Andrew Dejito",
    description: "Develops semantic validation tests and runs syntax error monitors, ensuring AST verification and complexity metrics are strictly maintained throughout the refactoring pipeline.",
    imageSrc: "/andrew.png",
    siteUrl: "https://github.com/andrewdejito",
    objectPosition: "center center",
  },
]

export function TeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

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
      id="team" 
      className="relative py-32 border-t border-[var(--border)] overflow-hidden bg-[var(--background)]"
    >
      {/* Background glow and sparkles */}
      <HorizonGlow glowPosition="center" glowColor="mixed" sparkleCount={5} showHorizonLine={false} />

      {/* Section Header */}
      <div className="mb-16 px-6 md:px-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7">
          <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">05 / Team</span>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] uppercase">
            Meet the team<br />
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 pb-1">
          <p className="font-[var(--font-sans)] text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
            This is the team that built the Multi Agent Orchestration system behind Horizon, driving automated AST checks, telemetry flows, and refactoring pipelines.
          </p>
        </div>
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
            <TeamCard 
              key={member.id} 
              member={member} 
              index={index} 
              activeIndex={activeIndex} 
            />
          ))}
          {/* Spacer to allow the last card to scroll to the most left */}
          <div className="flex-shrink-0 w-[20vw] sm:w-[50vw] md:w-[58vw]" />
        </div>
      </div>

      {/* Synced Caption Panel below the row */}
      <div className="mt-12 px-6 md:px-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Caption Info Block */}
        <div className="md:col-span-8 flex flex-col items-start min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-medium tracking-tight text-[var(--foreground)]">
                {teamMembers[activeIndex].role}
              </h3>
              <p className="mt-4 font-[var(--font-sans)] text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
                {teamMembers[activeIndex].description}
              </p>
              <a
                href={teamMembers[activeIndex].siteUrl}
                onClick={(e) => {
                  if (teamMembers[activeIndex].siteUrl === "#") e.preventDefault()
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-1 font-[var(--font-mono)] text-xs text-[var(--accent)] tracking-wider"
              >
                <span>View portfolio</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">›</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls - Single integrated pill capsule */}
        <div className="md:col-span-4 flex justify-end items-center">
          <div className="flex items-center bg-[#2b2d30] rounded-full p-1 shadow-2xl border border-[var(--border)]/80">
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-[var(--foreground)] font-semibold text-lg transition-all duration-300",
                activeIndex > 0 ? "opacity-100 hover:bg-white/5" : "opacity-25 cursor-not-allowed"
              )}
              aria-label="Scroll left"
            >
              ‹
            </button>
            <div className="w-[1px] h-4 bg-[var(--border)]/80" />
            <button
              onClick={() => scroll("right")}
              disabled={activeIndex === teamMembers.length - 1}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-[var(--foreground)] font-semibold text-lg transition-all duration-300",
                activeIndex < teamMembers.length - 1 ? "opacity-100 hover:bg-white/5" : "opacity-25 cursor-not-allowed"
              )}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamCard({
  member,
  index,
  activeIndex,
}: {
  member: TeamMember
  index: number
  activeIndex: number
}) {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !pillRef.current) return

    const container = containerRef.current
    const pill = pillRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Animate custom cursor pill to follow mouse position with GSAP easing lag
      gsap.to(pill, {
        x: x,
        y: y,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovered])

  return (
    <a
      ref={containerRef}
      href={member.siteUrl}
      onClick={(e) => {
        if (member.siteUrl === "#") e.preventDefault()
      }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${member.role}'s site`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[42vw] aspect-[16/9] snap-start group relative rounded-[2rem] bg-[var(--card)] border border-[var(--border)]/65 overflow-hidden flex items-center justify-center transition-all duration-500 shadow-xl",
        activeIndex === index ? "border-[var(--accent)]/60 scale-[1.01]" : "opacity-75 hover:opacity-90",
        isHovered && "cursor-none" // Hide default cursor inside image container boundary
      )}
    >
      {/* Subtle tech mesh grid in background */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      {/* Responsive Image with Graceful Initials Fallback */}
      <CardImage 
        src={member.imageSrc} 
        alt={member.name} 
        initials={member.name.split(" ").map((w) => w[0]).join("").toUpperCase()} 
        objectPosition={member.objectPosition}
      />

      {/* Developer name overlay text on the left side of the image (horizontal scramble transition on view) */}
      {activeIndex === index && (
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-15 select-none pointer-events-none max-w-[160px] md:max-w-[220px] text-left">
          <ScrambleText 
            key={member.name}
            text={member.name} 
            className="font-[var(--font-display)] text-2xl md:text-[2.25rem] font-bold text-[#393b40] tracking-tight leading-[1.05] uppercase"
          />
        </div>
      )}

      {/* Centered Hover Pill (Visit Site) following the pointer */}
      <div
        ref={pillRef}
        className={cn(
          "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20 px-5 py-2.5 bg-white text-black font-sans text-[11px] font-bold rounded-full shadow-2xl flex items-center gap-2 pointer-events-none transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Play className="w-3 h-3 fill-black text-black" />
        <span>Visit Site</span>
      </div>
    </a>
  )
}

function CardImage({ src, alt, initials, objectPosition = "center" }: { src: string; alt: string; initials: string; objectPosition?: string }) {
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
      style={{ objectPosition }}
      className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
    />
  )
}
