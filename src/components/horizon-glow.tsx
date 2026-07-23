"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Sparkle {
  id: number
  x: number // percentage
  y: number // percentage
  size: number // px
  delay: number // seconds
  duration: number // seconds
  color: string
}

interface HorizonGlowProps {
  className?: string
  glowColor?: "cyan" | "blue" | "mixed"
  glowPosition?: "top" | "center" | "bottom"
  showHorizonLine?: boolean
  sparkleCount?: number
}

export function HorizonGlow({
  className,
  glowColor = "mixed",
  glowPosition = "center",
  showHorizonLine = true,
  sparkleCount = 4,
}: HorizonGlowProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // Generate stable sparkle positions on mount to avoid hydration mismatch
    const colors = [
      "text-cyan-300/80 shadow-cyan-500/50",
      "text-blue-300/80 shadow-blue-500/50",
      "text-cyan-200/80 shadow-cyan-400/50",
      "text-white/80 shadow-white/50"
    ]
    const generated: Sparkle[] = Array.from({ length: sparkleCount }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // keep away from absolute edges
      y: 15 + Math.random() * 70,
      size: 6 + Math.random() * 8, // 6px to 14px
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4, // 3s to 7s
      color: colors[i % colors.length],
    }))
    setSparkles(generated)
  }, [sparkleCount])

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0 select-none", className)}>
      {/* Background radial glow */}
      <div 
        className={cn(
          "absolute w-[600px] md:w-[900px] h-[300px] md:h-[450px] blur-[130px] rounded-full opacity-35 mix-blend-screen transition-all duration-1000",
          glowPosition === "top" && "top-0 -translate-y-1/2 left-1/2 -translate-x-1/2",
          glowPosition === "center" && "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
          glowPosition === "bottom" && "bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2",
          glowColor === "cyan" && "bg-cyan-500/20",
          glowColor === "blue" && "bg-primary/15",
          glowColor === "mixed" && "bg-gradient-to-r from-cyan-500/15 via-primary/10 to-cyan-500/15"
        )}
      />

      {/* Glowing Horizon Line (from logo) */}
      {showHorizonLine && (
        <div 
          className={cn(
            "absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent transition-all duration-700",
            glowPosition === "top" && "top-12",
            glowPosition === "center" && "top-[45%]",
            glowPosition === "bottom" && "bottom-12"
          )}
        >
          {/* Central Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-8 bg-cyan-400/20 blur-md rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_4px_rgba(34,211,238,0.7)]" />
        </div>
      )}

      {/* Sparkling Stars */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: `horizon-sparkle ${sparkle.duration}s ease-in-out infinite alternate`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("filter drop-shadow transition-opacity duration-1000", sparkle.color)}
          >
            <path
              d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
