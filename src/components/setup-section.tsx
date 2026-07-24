"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { HorizonGlow } from "@/components/horizon-glow"

const commands = {
  gpu: "curl -sL https://raw.githubusercontent.com/horizon-ai-code/horizon/main/docker-compose.yml | docker compose -f - up -d",
  cpu: "curl -sL https://raw.githubusercontent.com/horizon-ai-code/horizon/main/docker-compose.cpu.yml | docker compose -f - up -d"
}

export function SetupSection() {
  const [activeTab, setActiveTab] = useState<"gpu" | "cpu">("gpu")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="installation" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <HorizonGlow glowPosition="bottom" glowColor="cyan" sparkleCount={15} showHorizonLine={false} />
      {/* Section header */}
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Setup</span>
        <h2 className="mt-4 font-[var(--font-inter)] text-5xl md:text-7xl tracking-tight">INSTALLATION</h2>
        <p className="mt-6 font-mono text-sm text-foreground/70 max-w-2xl leading-relaxed">
          No build required. Everything (app code + models) is bundled inside the pre-built image and pulled from GitHub Container Registry.
        </p>
      </div>

      {/* Terminal Window */}
      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden border border-border/50 bg-[#0A0A0B] shadow-2xl relative group">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-[#121214]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveTab("gpu")}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-widest transition-colors duration-200",
                  activeTab === "gpu" ? "text-accent" : "text-muted-foreground hover:text-foreground"
                )}
              >
                GPU (Recommended)
              </button>
              <button 
                onClick={() => setActiveTab("cpu")}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-widest transition-colors duration-200",
                  activeTab === "cpu" ? "text-accent" : "text-muted-foreground hover:text-foreground"
                )}
              >
                CPU Only
              </button>
            </div>
            
            <div className="w-[42px]" /> {/* Spacer for centering tabs */}
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 relative">
            <div className="flex items-start gap-4">
              <Terminal className="w-5 h-5 text-accent shrink-0 mt-0.5 opacity-80" />
              <div className="flex-1 overflow-x-auto scrollbar-hide">
                <code className="font-mono text-xs md:text-sm text-foreground/90 whitespace-pre">
                  <span className="text-accent/60 mr-2">$</span>
                  {commands[activeTab]}
                </code>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-foreground/70 hover:text-foreground transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Tech Tags */}
          <div className="px-6 py-4 border-t border-border/20 bg-[#121214]/50 flex flex-wrap justify-center gap-3">
             {["Docker-ready", "Local-first", "Pre-built models", "No telemetry"].map((tag, i) => (
               <span key={i} className="font-mono text-[10px] px-3 py-1 rounded-full border border-border/50 text-foreground/60">
                 {tag}
               </span>
             ))}
          </div>
      </div>

      {/* What happens next? */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-8 text-center">
          What happens next?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col bg-card/25 border border-border/40 p-6 rounded-xl hover:border-accent/40 transition-all duration-300">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3 block">
              01 / Copy & Run
            </span>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Run the compose command in your terminal to automatically pull the pre-quantized models and configure local VRAM serialization.
            </p>
          </div>
          <div className="flex flex-col bg-card/25 border border-border/40 p-6 rounded-xl hover:border-accent/40 transition-all duration-300">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3 block">
              02 / Access Studio
            </span>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Navigate to <code className="text-[10px] font-mono text-foreground bg-muted/50 px-1.5 py-0.5 rounded border border-border/30">http://localhost:3000</code> to load the desktop refactoring studio workspace.
            </p>
          </div>
          <div className="flex flex-col bg-card/25 border border-border/40 p-6 rounded-xl hover:border-accent/40 transition-all duration-300">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3 block">
              03 / Refactor
            </span>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Upload your Java source files. The multi-agent pipeline immediately kicks off analysis, displaying live AST changes in the workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
