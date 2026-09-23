"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Cpu, 
  Activity, 
  Layers, 
  Code2, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Check, 
  Database,
  FileCode,
  Brain,
  Scale
} from "lucide-react"
import { HorizonGlow } from "@/components/horizon-glow"
import { NoiseOverlay } from "@/components/noise-overlay"
import { cn } from "@/lib/utils"

interface PhaseData {
  id: number
  number: string
  title: string
  subtitle: string
  tagline: string
  activeModel: string
  vramUsage: string
  steps: {
    number: string
    title: string
    description: string
    badge?: string
    details?: string[]
    outcome?: string
    circuitBreaker?: string
    failureHandling?: string
  }[]
}

const PHASES: PhaseData[] = [
  {
    id: 1,
    number: "01",
    title: "Ingestion & Baseline",
    subtitle: "Structural Analysis & Metric Grounding",
    tagline: "Establishes a mathematically grounded baseline of the user's raw Java codebase in memory.",
    activeModel: "Parser Tools (javalang + lizard + javac)",
    vramUsage: "0.0 GB (CPU Local)",
    steps: [
      {
        number: "Step 1",
        title: "Input Ingestion",
        description: "The user submits a raw Java code snippet and a natural language instruction.",
        details: [
          'User Instruction: "Clean up this nested if/else nightmare"',
          "Raw Code: Complex OrderTracker class with nested conditional branches"
        ]
      },
      {
        number: "Step 2",
        title: "Baseline Analysis",
        description: "Structural parsing and metric extraction across multiple evaluation tools.",
        details: [
          "javalang: Performs orchestration-level structural parsing (identifies Class Unit, Method Unit, or Statement Unit).",
          "javac: Evaluates compilation during benchmark testing for Compilation Success Rate (CSR).",
          "lizard: Computes baseline Cyclomatic Complexity (CC = 12)."
        ]
      }
    ]
  },
  {
    id: 2,
    number: "02",
    title: "The Strategy Block",
    subtitle: "Multi-Agent Intent Generation & Prompt Isolation",
    tagline: "Translates natural language instructions into strict AST modification enums with isolated context boundaries.",
    activeModel: "Qwen-Coder 2.5 3B (4-bit Planner)",
    vramUsage: "3.2 GB / 4.0 GB VRAM",
    steps: [
      {
        number: "Step 3",
        title: "Intent Generation",
        description: "Under SSIS, 4-bit Qwen-Coder 2.5 3B acts as the Planner, mapping prompt to defined refactoring enums.",
        details: [
          "Enum Mapping: Maps user request to FLATTEN_CONDITIONAL, EXTRACT_METHOD, or EXTRACT_VARIABLE.",
          "Intent Packet: Generates exact refactoring category and target code boundaries."
        ]
      },
      {
        number: "Step 4",
        title: "Cognitive Reset (Prompt Isolation)",
        description: "Resets inference context while retaining model weights in VRAM to prevent prompt pollution.",
        details: [
          "Flushes prior conversational tokens from buffer.",
          "Keeps 4-bit Qwen-Coder weights primed in GPU VRAM."
        ]
      },
      {
        number: "Step 5",
        title: "Plan Generation",
        description: "Planner receives Intent Packet and generates structural AST Modification JSON payload.",
        details: [
          'Output AST Plan: {"action": "FLATTEN_CONDITIONAL", "targetLine": 4, "nodes": [...]}',
          "Defines exact replacement, extraction, and insertion coordinates."
        ]
      }
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Plan Execution",
    subtitle: "Prompt Shift & Candidate Code Generation",
    tagline: "Shifts Planner role to Generator within VRAM to execute AST mutations and synthesize candidate Java code.",
    activeModel: "Qwen-Coder 2.5 3B (4-bit Generator)",
    vramUsage: "3.2 GB / 4.0 GB VRAM",
    steps: [
      {
        number: "Step 6",
        title: "Code Generation",
        description: "Retains Qwen-Coder in VRAM, shifting system prompt to act as Generator.",
        details: [
          "Input: Receives AST Modification JSON (The Plan) + Raw Input Java.",
          "Action: Mutates structural nodes and outputs Candidate Java Code."
        ]
      }
    ]
  },
  {
    id: 4,
    number: "04",
    title: "Deterministic Validation Routing (D2NR - Loop 1)",
    subtitle: "Dual-Tier Syntax Healing & Structural Boundary Check",
    tagline: "Guarantees syntactic and structural safety through deterministic inner and outer loop routing.",
    activeModel: "Deterministic Routing Engine (javalang + AST Math)",
    vramUsage: "3.2 GB VRAM (Standby)",
    steps: [
      {
        number: "Step 7",
        title: "Tier 1 Validation (Syntax Heal)",
        description: "javalang attempts to parse candidate code syntax.",
        failureHandling: "IF FAIL (Syntax Error): Triggers Inner Loop back to Generator (Step 6) with exact error feedback.",
        circuitBreaker: "Circuit Breaker: Exceeding 3 inner iterations escalates to Outer Loop (Step 5) with 'Syntax Unrecoverable'."
      },
      {
        number: "Step 8",
        title: "Tier 2 Validation (Structural Fix)",
        description: "Executes 3-checkpoint structural boundary verification engine.",
        details: [
          "Check A (Complexity): Verifies Cyclomatic Complexity constraint (CC_new <= CC_baseline).",
          "Check B (Global Boundaries): Ensures AST nodes outside target scope remain unchanged.",
          "Check C (Intent Math): Validates AST node differential (e.g., Method Count + 1)."
        ],
        failureHandling: "IF FAIL: Triggers Outer Loop back to Planner (Step 5) with 'Strategy Invalid' payload."
      }
    ]
  },
  {
    id: 5,
    number: "05",
    title: "Heuristic Adjudication (D2NR - Loop 2)",
    subtitle: "SSIS Model Swap & Judge Audit",
    tagline: "Performs VRAM model swap to run independent semantic evaluation and audit logic preservation.",
    activeModel: "Llama 3.2 3B (4-bit Judge)",
    vramUsage: "3.4 GB / 4.0 GB VRAM",
    steps: [
      {
        number: "Step 9",
        title: "Tier 3 Audit (Judge Evaluation)",
        description: "SSIS unloads Qwen-Coder and loads 4-bit Llama 3.2 3B into VRAM to act as Judge.",
        details: [
          "Evaluates structural difference against Intent Packet.",
          "Produces rationale examining code differences and semantic behavioral equivalence."
        ],
        failureHandling: "IF REVISE (Logic Altered): Triggers Outer Loop back to Planner (Step 5) with audit notes.",
        circuitBreaker: "Circuit Breaker: Max permitted outer-loop iterations triggers controlled abort status."
      }
    ]
  },
  {
    id: 6,
    number: "06",
    title: "Finalization",
    subtitle: "Controlled Exit & Trace Persistence",
    tagline: "Outputs verified refactored Java code with full metric breakdown or graceful fallback degradation.",
    activeModel: "Horizon Pipeline Orchestration Engine",
    vramUsage: "0.0 GB (Unloaded)",
    steps: [
      {
        number: "Step 10",
        title: "Output Generation",
        description: "Determines final output based on loop termination status.",
        details: [
          "On Success: Outputs clean candidate code, complexity reduction metrics, and complete execution trace.",
          "On Abort: Gracefully degrades, retaining safe original baseline code while recording diagnostic logs."
        ]
      }
    ]
  }
]

export default function PhasesPage() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [innerLoopSimulateError, setInnerLoopSimulateError] = useState(false)
  const [tier2SimulateError, setTier2SimulateError] = useState(false)
  const [judgeDecision, setJudgeDecision] = useState<"ACCEPT" | "REVISE">("ACCEPT")
  const [finalPath, setFinalPath] = useState<"SUCCESS" | "ABORT">("SUCCESS")

  const currentPhase = PHASES[currentPhaseIndex]

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentPhaseIndex((prev) => {
          if (prev >= PHASES.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const nextPhase = () => {
    if (currentPhaseIndex < PHASES.length - 1) {
      setCurrentPhaseIndex((prev) => prev + 1)
    }
  }

  const prevPhase = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex((prev) => prev - 1)
    }
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <NoiseOverlay opacity={0.03} />
      <HorizonGlow glowPosition="center" glowColor="blue" sparkleCount={12} showHorizonLine={false} />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Overview</span>
          </Link>
          <span className="text-border">/</span>
          <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">
            Horizon Orchestration Engine
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono transition-all duration-200",
              isPlaying
                ? "border-accent bg-accent/10 text-accent"
                : "border-border/50 hover:border-accent/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-accent" />}
            <span>{isPlaying ? "Pause Simulation" : "Auto Play"}</span>
          </button>
          <button
            onClick={() => {
              setCurrentPhaseIndex(0)
              setIsPlaying(false)
            }}
            className="p-1.5 rounded-full border border-border/50 hover:border-foreground text-muted-foreground hover:text-foreground transition-colors"
            title="Reset to Phase 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        
        {/* Title Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent font-mono text-[11px] uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Breakdown</span>
          </div>
          <h1 className="font-[var(--font-inter)] text-4xl md:text-6xl font-bold tracking-tight">
            6 PHASES OF ORCHESTRATION
          </h1>
          <p className="mt-3 font-mono text-xs md:text-sm text-foreground/70 max-w-3xl leading-relaxed">
            Step-by-step visual exploration of local multi-agent LLM refactoring, SSIS prompt engineering isolation, and D2NR dual-loop validation routing.
          </p>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {PHASES.map((p, idx) => {
            const isActive = idx === currentPhaseIndex
            return (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentPhaseIndex(idx)
                  setIsPlaying(false)
                }}
                className={cn(
                  "flex flex-col p-3 rounded-lg border text-left transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "border-accent bg-accent/10 shadow-[0_0_15px_rgba(84,138,247,0.15)]"
                    : "border-border/30 bg-card/40 hover:border-border hover:bg-card/70 text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
                <div className="flex items-center justify-between mb-1">
                  <span className={cn("font-mono text-xs font-bold", isActive ? "text-accent" : "text-muted-foreground")}>
                    {p.number}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                </div>
                <span className={cn("font-mono text-xs line-clamp-1 font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {p.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* Phase Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Steps (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Phase Card Header */}
            <div className="p-6 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  Phase {currentPhase.number} / 06
                </span>
                <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground bg-background/60 px-2.5 py-1 rounded border border-border/30">
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                  <span>{currentPhase.activeModel}</span>
                </div>
              </div>

              <h2 className="font-[var(--font-inter)] text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {currentPhase.title}
              </h2>
              <p className="mt-1 font-mono text-xs text-accent/80 font-medium">
                {currentPhase.subtitle}
              </p>
              <p className="mt-4 font-mono text-xs text-foreground/70 leading-relaxed border-t border-border/20 pt-4">
                {currentPhase.tagline}
              </p>

              {/* VRAM meter */}
              <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">VRAM Allocation:</span>
                <span className="text-accent font-bold">{currentPhase.vramUsage}</span>
              </div>
            </div>

            {/* Steps Accordion / Breakdown */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground px-1">
                Execution Steps ({currentPhase.steps.length})
              </h3>
              
              {currentPhase.steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="p-5 rounded-xl border border-border/40 bg-card/30 hover:border-border/80 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/20 font-mono text-[10px] font-bold text-accent uppercase">
                      {step.number}
                    </span>
                    <h4 className="font-[var(--font-inter)] text-base font-semibold text-foreground">
                      {step.title}
                    </h4>
                  </div>

                  <p className="font-mono text-xs text-foreground/80 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {step.details && (
                    <ul className="space-y-1.5 font-mono text-[11px] text-muted-foreground bg-background/40 p-3 rounded-lg border border-border/20">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.failureHandling && (
                    <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 font-mono text-[11px] text-amber-300/90 leading-relaxed flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <span>{step.failureHandling}</span>
                    </div>
                  )}

                  {step.circuitBreaker && (
                    <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 font-mono text-[11px] text-red-300/90 leading-relaxed flex items-start gap-2">
                      <XCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                      <span>{step.circuitBreaker}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <button
                onClick={prevPhase}
                disabled={currentPhaseIndex === 0}
                className={cn(
                  "group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border font-mono text-xs uppercase tracking-widest transition-all",
                  currentPhaseIndex === 0
                    ? "opacity-40 cursor-not-allowed border-border/20 text-muted-foreground"
                    : "border-border/50 hover:border-foreground text-foreground hover:bg-foreground/5"
                )}
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Previous Phase</span>
              </button>

              <button
                onClick={nextPhase}
                disabled={currentPhaseIndex === PHASES.length - 1}
                className={cn(
                  "group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border font-mono text-xs uppercase tracking-widest transition-all shadow-md",
                  currentPhaseIndex === PHASES.length - 1
                    ? "opacity-40 cursor-not-allowed border-border/20 text-muted-foreground"
                    : "border-accent bg-accent text-accent-foreground hover:bg-transparent hover:text-accent"
                )}
              >
                <span>Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Right Column: Live Animated Visualization Graphic (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl border border-border/50 bg-[#0d0d0f]/80 backdrop-blur-md relative overflow-hidden min-h-[580px] flex flex-col justify-between shadow-2xl">
              
              {/* Graphic Title Header */}
              <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent animate-pulse" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                    Phase {currentPhase.number} Live Orchestration Visualization
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Interactive Engine</span>
                </div>
              </div>

              {/* Dynamic Animated Content per Phase */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* PHASE 1 ANIMATION */}
                  {currentPhaseIndex === 0 && (
                    <motion.div
                      key="phase1"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="rounded-xl border border-border/40 bg-[#1E1F22] p-4 font-mono text-xs relative">
                        <div className="flex items-center justify-between text-muted-foreground mb-3 text-[10px] border-b border-border/20 pb-2">
                          <span className="flex items-center gap-2 text-accent">
                            <Terminal className="w-3.5 h-3.5" /> User Input & Instruction
                          </span>
                          <span>Input.java</span>
                        </div>
                        <div className="bg-background/80 p-3 rounded border border-border/20 text-accent font-semibold mb-3">
                          &gt; &quot;Clean up this nested if/else nightmare&quot;
                        </div>
                        <pre className="text-muted-foreground leading-relaxed overflow-x-auto text-[11px]">
{`public class OrderTracker {
    public String getStatusMessage(int s) {
        String msg = "";
        if (s == 0) { msg = "Order Placed"; }
        else if (s == 1) { msg = "Processing"; }
        else if (s == 2) { msg = "Shipped"; }
        else if (s == 3) { msg = "Delivered"; }
        return msg;
    }
}`}
                        </pre>
                      </div>

                      {/* Analysis Tool Outputs */}
                      <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                        <div className="p-3 rounded-lg border border-border/40 bg-card/40 text-center">
                          <span className="text-[10px] text-muted-foreground block uppercase">javalang AST Unit</span>
                          <span className="text-accent font-bold text-sm mt-1 block">Method Unit</span>
                        </div>
                        <div className="p-3 rounded-lg border border-border/40 bg-card/40 text-center">
                          <span className="text-[10px] text-muted-foreground block uppercase">javac CSR Check</span>
                          <span className="text-emerald-400 font-bold text-sm mt-1 block">100% Pass</span>
                        </div>
                        <div className="p-3 rounded-lg border border-border/40 bg-card/40 text-center">
                          <span className="text-[10px] text-muted-foreground block uppercase">lizard Baseline CC</span>
                          <span className="text-amber-400 font-bold text-sm mt-1 block">CC = 12</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs text-emerald-400 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Baseline Snapshot Grounded in Memory
                        </span>
                        <span className="text-[10px] opacity-75">AST0 Ready</span>
                      </div>
                    </motion.div>
                  )}

                  {/* PHASE 2 ANIMATION */}
                  {currentPhaseIndex === 1 && (
                    <motion.div
                      key="phase2"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      {/* VRAM allocation bar */}
                      <div className="p-4 rounded-xl border border-border/40 bg-card/30 font-mono text-xs">
                        <div className="flex justify-between mb-2 text-muted-foreground text-[11px]">
                          <span className="flex items-center gap-2 text-accent">
                            <Brain className="w-4 h-4" /> SSIS Model Loader (VRAM)
                          </span>
                          <span>4-bit Qwen-Coder 2.5 3B (Planner)</span>
                        </div>
                        <div className="w-full h-3 bg-background rounded-full overflow-hidden border border-border/30 p-0.5">
                          <div className="h-full bg-accent rounded-full w-[80%] animate-pulse" />
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                          <span>Allocated: 3.2 GB</span>
                          <span>Limit: 4.0 GB VRAM</span>
                        </div>
                      </div>

                      {/* Step 3 & 4 visualization */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                        <div className="p-4 rounded-xl border border-accent/40 bg-accent/5">
                          <span className="text-[10px] uppercase tracking-wider text-accent font-bold block mb-2">
                            Step 3: Intent Packet
                          </span>
                          <div className="p-2 rounded bg-background border border-border/20 text-emerald-400 font-semibold mb-2">
                            Enum: FLATTEN_CONDITIONAL
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Target Boundary: Method Unit (getStatusMessage)
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-500/5 relative overflow-hidden">
                          <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold block mb-2">
                            Step 4: Cognitive Reset
                          </span>
                          <div className="text-[11px] text-purple-300">
                            Context Buffer: <span className="text-emerald-400 font-bold">RESET</span>
                          </div>
                          <div className="text-[11px] text-purple-300 mt-1">
                            Model Weights: <span className="text-accent font-bold">RETAINED IN VRAM</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 5 Output */}
                      <div className="p-4 rounded-xl border border-border/40 bg-[#1E1F22] font-mono text-xs">
                        <span className="text-[10px] text-muted-foreground block uppercase mb-2">
                          Step 5: Generated AST Modification JSON
                        </span>
                        <pre className="text-accent text-[11px] leading-relaxed">
{`{
  "refactoringIntent": "FLATTEN_CONDITIONAL",
  "target": "getStatusMessage",
  "action": "REPLACE_WITH_LOOKUP_ARRAY",
  "structure": { "type": "String[]", "name": "messages" }
}`}
                        </pre>
                      </div>
                    </motion.div>
                  )}

                  {/* PHASE 3 ANIMATION */}
                  {currentPhaseIndex === 2 && (
                    <motion.div
                      key="phase3"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="p-4 rounded-xl border border-accent/40 bg-accent/5 font-mono text-xs flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-accent animate-ping" />
                          <div>
                            <span className="text-foreground font-bold block">Prompt Shift Completed</span>
                            <span className="text-[11px] text-muted-foreground">Planner System Prompt &rarr; Generator System Prompt</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-accent/20 border border-accent/30 text-accent text-[10px] uppercase font-bold">
                          Step 6 Active
                        </span>
                      </div>

                      {/* Live Code Generation Visualizer */}
                      <div className="p-4 rounded-xl border border-border/40 bg-[#1E1F22] font-mono text-xs space-y-3">
                        <div className="flex items-center justify-between text-muted-foreground text-[10px] border-b border-border/20 pb-2">
                          <span className="flex items-center gap-2 text-accent">
                            <Code2 className="w-3.5 h-3.5" /> Synthesizing Candidate Java Code
                          </span>
                          <span className="text-emerald-400 font-semibold">RefactoredOutput.java</span>
                        </div>
                        <pre className="text-foreground leading-relaxed text-[11px] overflow-x-auto">
{`public class OrderTracker {
    private static final String[] messages = {
        "Order Placed", "Processing", "Shipped", "Delivered"
    };

    public String getStatusMessage(int s) {
        return messages[s];
    }
}`}
                        </pre>
                      </div>

                      <div className="p-3 rounded-lg border border-border/30 bg-card/40 font-mono text-xs text-muted-foreground flex items-center justify-between">
                        <span>Candidate Code Sent to D2NR Validation</span>
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </div>
                    </motion.div>
                  )}

                  {/* PHASE 4 ANIMATION */}
                  {currentPhaseIndex === 3 && (
                    <motion.div
                      key="phase4"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      {/* Simulation Controls */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-card/30 font-mono text-xs">
                        <span className="text-muted-foreground">Interactive Route Simulator:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setInnerLoopSimulateError(!innerLoopSimulateError)}
                            className={cn(
                              "px-3 py-1 rounded border text-[11px] transition-colors",
                              innerLoopSimulateError
                                ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                                : "border-border/40 text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {innerLoopSimulateError ? "Syntax Error (Inner Loop)" : "Syntax Valid"}
                          </button>
                          <button
                            onClick={() => setTier2SimulateError(!tier2SimulateError)}
                            className={cn(
                              "px-3 py-1 rounded border text-[11px] transition-colors",
                              tier2SimulateError
                                ? "bg-red-500/20 border-red-500/50 text-red-300"
                                : "border-border/40 text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {tier2SimulateError ? "Tier 2 Fail (Outer Loop)" : "Tier 2 Pass"}
                          </button>
                        </div>
                      </div>

                      {/* Tier 1 Box */}
                      <div className={cn(
                        "p-4 rounded-xl border font-mono text-xs transition-all",
                        innerLoopSimulateError ? "border-amber-500 bg-amber-500/10" : "border-emerald-500/50 bg-emerald-500/5"
                      )}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold uppercase text-[11px]">Step 7: Tier 1 Validation (javalang Parser)</span>
                          {innerLoopSimulateError ? (
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Inner Loop Triggered (Iter 1/3)
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Syntax Clean
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {innerLoopSimulateError
                            ? "Routes error details to Step 6 Generator for bounded syntax healing."
                            : "Candidate code parsed cleanly without syntax errors."}
                        </p>
                      </div>

                      {/* Tier 2 Checkpoints */}
                      <div className="space-y-2 font-mono text-xs">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                          Step 8: Tier 2 Structural Checkpoints
                        </span>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className={cn("p-3 rounded border text-center", tier2SimulateError ? "border-red-500/50 bg-red-500/10 text-red-300" : "border-emerald-500/40 bg-emerald-500/5 text-emerald-300")}>
                            <span className="text-[10px] block opacity-75">Check A</span>
                            <span className="font-bold text-[11px]">Complexity (CC &le; 12)</span>
                          </div>
                          <div className={cn("p-3 rounded border text-center", tier2SimulateError ? "border-red-500/50 bg-red-500/10 text-red-300" : "border-emerald-500/40 bg-emerald-500/5 text-emerald-300")}>
                            <span className="text-[10px] block opacity-75">Check B</span>
                            <span className="font-bold text-[11px]">Boundaries Preserved</span>
                          </div>
                          <div className={cn("p-3 rounded border text-center", tier2SimulateError ? "border-red-500/50 bg-red-500/10 text-red-300" : "border-emerald-500/40 bg-emerald-500/5 text-emerald-300")}>
                            <span className="text-[10px] block opacity-75">Check C</span>
                            <span className="font-bold text-[11px]">Intent Math</span>
                          </div>
                        </div>

                        {tier2SimulateError && (
                          <div className="p-3 rounded-lg border border-red-500/50 bg-red-500/10 text-red-300 text-[11px] flex items-center justify-between">
                            <span>Outer Loop Triggered: Strategy Invalid</span>
                            <span className="font-bold">&rarr; Route to Step 5 (Planner)</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* PHASE 5 ANIMATION */}
                  {currentPhaseIndex === 4 && (
                    <motion.div
                      key="phase5"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      {/* Model Swap Indicator */}
                      <div className="p-4 rounded-xl border border-accent/40 bg-card/40 font-mono text-xs">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-accent font-bold flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin" /> SSIS Dynamic Model Swap
                          </span>
                          <span className="text-[10px] text-muted-foreground">3.4 GB VRAM</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-background border border-border/20 text-[11px]">
                          <span className="text-muted-foreground line-through">Qwen-Coder 2.5 3B (Unloaded)</span>
                          <span className="text-emerald-400 font-bold">&rarr; Llama 3.2 3B (Judge Loaded)</span>
                        </div>
                      </div>

                      {/* Tier 3 Judge Audit Card */}
                      <div className="p-4 rounded-xl border border-border/40 bg-[#1E1F22] font-mono text-xs space-y-3">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border/20 pb-2">
                          <span className="flex items-center gap-2 text-accent">
                            <Scale className="w-3.5 h-3.5" /> Tier 3 Audit Rationale
                          </span>
                          <span>Semantic Judge Model</span>
                        </div>
                        <p className="text-foreground/90 leading-relaxed text-[11px]">
                          &quot;The candidate refactor replaces complex nested conditional logic with a static array index lookup. Semantic behavior, branch mapping, and input/output contracts are strictly preserved.&quot;
                        </p>
                      </div>

                      {/* Interactive Decision Switcher */}
                      <div className="p-4 rounded-xl border border-border/30 bg-card/30 font-mono text-xs space-y-3">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-muted-foreground">Judge Decision:</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setJudgeDecision("ACCEPT")}
                              className={cn(
                                "px-3 py-1 rounded border transition-colors",
                                judgeDecision === "ACCEPT" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold" : "border-border/40 text-muted-foreground"
                              )}
                            >
                              IF ACCEPT
                            </button>
                            <button
                              onClick={() => setJudgeDecision("REVISE")}
                              className={cn(
                                "px-3 py-1 rounded border transition-colors",
                                judgeDecision === "REVISE" ? "bg-amber-500/20 border-amber-500 text-amber-400 font-bold" : "border-border/40 text-muted-foreground"
                              )}
                            >
                              IF REVISE
                            </button>
                          </div>
                        </div>

                        {judgeDecision === "ACCEPT" ? (
                          <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] flex items-center justify-between">
                            <span>Loop Terminates Successfully</span>
                            <span className="font-bold">&rarr; Proceed to Phase 6</span>
                          </div>
                        ) : (
                          <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] flex items-center justify-between">
                            <span>Outer Loop Triggered (Logic Altered)</span>
                            <span className="font-bold">&rarr; Route Notes to Step 5 (Planner)</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* PHASE 6 ANIMATION */}
                  {currentPhaseIndex === 5 && (
                    <motion.div
                      key="phase6"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      {/* Path Switcher */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-card/30 font-mono text-xs">
                        <span className="text-muted-foreground">Output Status Path:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setFinalPath("SUCCESS")}
                            className={cn(
                              "px-3 py-1 rounded border text-[11px] transition-colors",
                              finalPath === "SUCCESS"
                                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold"
                                : "border-border/40 text-muted-foreground hover:text-foreground"
                            )}
                          >
                            On Success
                          </button>
                          <button
                            onClick={() => setFinalPath("ABORT")}
                            className={cn(
                              "px-3 py-1 rounded border text-[11px] transition-colors",
                              finalPath === "ABORT"
                                ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                                : "border-border/40 text-muted-foreground hover:text-foreground"
                            )}
                          >
                            On Abort (Max Iterations)
                          </button>
                        </div>
                      </div>

                      {finalPath === "SUCCESS" ? (
                        <div className="space-y-4 font-mono text-xs">
                          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/5">
                            <div className="flex items-center justify-between mb-3 text-[11px]">
                              <span className="text-emerald-400 font-bold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Final Refactoring Delivered
                              </span>
                              <span className="text-muted-foreground">CSR: 100% | Loops: 1 Inner, 0 Outer</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div className="p-2.5 rounded bg-background border border-border/20">
                                <span className="text-[10px] text-muted-foreground block">Baseline Complexity</span>
                                <span className="text-red-400 font-bold text-base">CC = 12</span>
                              </div>
                              <div className="p-2.5 rounded bg-background border border-border/20">
                                <span className="text-[10px] text-muted-foreground block">Refactored Complexity</span>
                                <span className="text-emerald-400 font-bold text-base">CC = 1 (-91.6%)</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              Execution trace &amp; metric changes persisted to log audit database.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 font-mono text-xs space-y-3">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-amber-400 font-bold flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4" /> Graceful Degradation Safe Fallback
                            </span>
                            <span className="text-amber-300 font-semibold">Status: Aborted</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Max outer-loop iterations reached. System safely retained original baseline Java code without mutating user source code. Diagnostic execution traces stored for analysis.
                          </p>
                        </div>
                      )}

                      <div className="p-4 rounded-xl border border-border/30 bg-card/40 font-mono text-xs text-center">
                        <Link
                          href="/"
                          className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
                        >
                          <span>Return to Main Horizon Demo</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer Progress Indicator */}
              <div className="mt-8 border-t border-border/30 pt-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>Phase {currentPhase.id} of 6 Complete</span>
                <div className="flex gap-1.5">
                  {PHASES.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === currentPhaseIndex ? "w-8 bg-accent" : "w-2 bg-border/40"
                      )}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
