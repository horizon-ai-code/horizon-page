"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
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
  Brain,
  Scale
} from "lucide-react"
import { HorizonGlow } from "@/components/horizon-glow"
import { NoiseOverlay } from "@/components/noise-overlay"
import { MotionPhase1 } from "@/components/MotionPhase1"
import { cn } from "@/lib/utils"

export interface OrchestrationPayload {
  astHash: string
  rawCode: string
  nlDirective: string
  intentPacket: { category: string; target: string }
  candidateCode: string
  validationPassed: boolean
  judgeVerdict: string
  exitStatus: string
}

const INITIAL_PAYLOAD: OrchestrationPayload = {
  astHash: "0x9f8a...4b12",
  rawCode: `public class SessionManager {
    public boolean validateToken(String token, boolean refresh, boolean strict) {
        if (token != null) {
            if (token.length() > 10) {
                if (refresh && !strict) return true;
                else if (!refresh && strict) return false;
            }
        }
        return false;
    }
}`,
  nlDirective: "Clean up this nested if/else nightmare",
  intentPacket: { category: "FLATTEN_CONDITIONAL", target: "method:validateToken" },
  candidateCode: `public class SessionManager {
    private static final String[] rules = {"token_valid", "strict_check"};

    public boolean validateToken(String token, boolean refresh, boolean strict) {
        if (token == null || token.length() <= 10) return false;
        return refresh ^ strict;
    }
}`,
  validationPassed: true,
  judgeVerdict: "ACCEPT",
  exitStatus: "COMMIT_SUCCESS",
}

interface PhaseInfo {
  id: number
  num: string
  title: string
  subtitle: string
  tagline: string
  activeModel: string
  vramUsage: string
}

const PHASES_INFO: PhaseInfo[] = [
  {
    id: 1,
    num: "01",
    title: "Ingestion & Baseline",
    subtitle: "Structural Analysis & Metric Grounding",
    tagline: "Establishes a mathematically grounded baseline of the user's raw Java codebase in memory.",
    activeModel: "Parser Tools (javalang + lizard + javac)",
    vramUsage: "0.0 GB (CPU Local)",
  },
  {
    id: 2,
    num: "02",
    title: "The Strategy Block",
    subtitle: "Multi-Agent Intent Generation & Prompt Isolation",
    tagline: "Translates natural language instructions into strict AST modification enums with isolated context boundaries.",
    activeModel: "Qwen-Coder 2.5 3B (4-bit Planner)",
    vramUsage: "3.2 GB / 4.0 GB VRAM",
  },
  {
    id: 3,
    num: "03",
    title: "Plan Execution",
    subtitle: "Prompt Shift & Candidate Code Generation",
    tagline: "Shifts Planner role to Generator within VRAM to execute AST mutations and synthesize candidate Java code.",
    activeModel: "Qwen-Coder 2.5 3B (4-bit Generator)",
    vramUsage: "3.2 GB / 4.0 GB VRAM",
  },
  {
    id: 4,
    num: "04",
    title: "Deterministic Validation Routing (D2NR - Loop 1)",
    subtitle: "Dual-Tier Syntax Healing & Structural Boundary Check",
    tagline: "Guarantees syntactic and structural safety through deterministic inner and outer loop routing.",
    activeModel: "Deterministic Routing Engine (javalang + AST Math)",
    vramUsage: "3.2 GB VRAM (Standby)",
  },
  {
    id: 5,
    num: "05",
    title: "Heuristic Adjudication (D2NR - Loop 2)",
    subtitle: "SSIS Model Swap & Judge Audit",
    tagline: "Performs VRAM model swap to run independent semantic evaluation and audit logic preservation.",
    activeModel: "Llama 3.2 3B (4-bit Judge)",
    vramUsage: "3.4 GB / 4.0 GB VRAM",
  },
  {
    id: 6,
    num: "06",
    title: "Finalization",
    subtitle: "Controlled Exit & Trace Persistence",
    tagline: "Outputs verified refactored Java code with full metric breakdown or graceful fallback degradation.",
    activeModel: "Horizon Pipeline Orchestration Engine",
    vramUsage: "0.0 GB (Unloaded)",
  },
]

export default function KineticPhasesStudio() {
  const [currentPhase, setCurrentPhase] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [sceneStep, setSceneStep] = useState<number>(1)
  const [payload] = useState<OrchestrationPayload>(INITIAL_PAYLOAD)

  // Auto-advance internal scene steps like a motion graphic storyboard
  useEffect(() => {
    if (!isPlaying) return
    const stepTimer = setInterval(() => {
      setSceneStep((prev) => {
        if (prev < 3) return prev + 1
        // End of phase substeps -> auto advance phase cleanly
        setTimeout(() => {
          setCurrentPhase((p) => (p < 6 ? p + 1 : 1))
          setSceneStep(1)
        }, 600)
        return prev
      })
    }, 1800)
    return () => clearInterval(stepTimer)
  }, [isPlaying, currentPhase])

  const handlePhaseChange = (phaseNum: number) => {
    setCurrentPhase(phaseNum)
    setSceneStep(1)
  }

  const activePhaseData = PHASES_INFO[currentPhase - 1]

  return (
    <div className="w-full min-h-screen bg-[#070709] text-white font-mono flex flex-col justify-between p-4 md:p-8 relative overflow-hidden">
      <NoiseOverlay opacity={0.03} />
      <HorizonGlow glowPosition="center" glowColor="blue" sparkleCount={10} showHorizonLine={false} />

      {/* Top VCR Motion Transport Bar & Navigation */}
      <header className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs text-white/60 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Overview</span>
          </Link>
          <span className="text-white/20">/</span>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs tracking-widest text-white/80 uppercase font-bold">
              HORIZON-AI // KINETIC_ORCHESTRATION_ENGINE
            </span>
          </div>
        </div>

        {/* Phase Pill Progress Sequence */}
        <div className="flex items-center gap-1.5 bg-[#0A0A0E] p-1 rounded-lg border border-white/10">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handlePhaseChange(num)}
              className={cn(
                "px-3 py-1 rounded text-[11px] font-bold transition-all duration-300 relative",
                currentPhase === num
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                  : "text-white/40 hover:text-white/80 border border-transparent"
              )}
            >
              0{num}
            </button>
          ))}
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePhaseChange(Math.max(1, currentPhase - 1))}
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
            title="Previous Phase"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/15 text-xs flex items-center gap-1.5 font-bold transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-cyan-400" />}
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>
          <button
            onClick={() => handlePhaseChange(Math.min(6, currentPhase + 1))}
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
            title="Next Phase"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Phase Overview Header Banner */}
      <div className="max-w-6xl mx-auto w-full mt-6 mb-2 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] uppercase font-bold tracking-widest mb-1">
            <Layers className="w-3 h-3" />
            <span>Phase {activePhaseData.num} / 06</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
            {activePhaseData.title}
          </h1>
          <p className="text-xs text-white/60 mt-1 max-w-2xl">
            {activePhaseData.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/10 shrink-0">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <div className="text-[11px]">
            <span className="text-white/40 block">ACTIVE MODEL & VRAM</span>
            <span className="text-cyan-300 font-bold">{activePhaseData.activeModel}</span>
            <span className="text-purple-300 ml-2">({activePhaseData.vramUsage})</span>
          </div>
        </div>
      </div>

      {/* Kinetic Stage Viewport (3D Depth Camera Pan Slide & Motion Engine) */}
      <main className="max-w-6xl mx-auto w-full my-4 flex-1 flex flex-col justify-center relative z-10 min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, x: 28, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -28, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="w-full bg-[#0A0A0E]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* SVG Data Beam Beam Connection Header */}
            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden pointer-events-none">
              <svg className="w-full h-full">
                <motion.path
                  d="M 0 0 L 1200 0"
                  stroke="url(#gradient-beam)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="gradient-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Phase Substep Visualizer Renderer */}
            <PhaseStageRouter phase={currentPhase} sceneStep={sceneStep} payload={payload} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Kinetic Telemetry Scrub Footer */}
      <footer className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 pt-4 border-t border-white/10 gap-3 relative z-20">
        <div className="flex items-center gap-6">
          <span>ACTIVE_HASH: <strong className="text-cyan-300 font-bold">{payload.astHash}</strong></span>
          <span>SSIS_SLOT: <strong className="text-purple-300 font-bold">Qwen 2.5 / Llama 3.2 4-bit</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SUBSTEP {sceneStep}/3</span>
          </div>
          <button
            onClick={() => setSceneStep(1)}
            className="hover:text-white flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400" /> Replay Scene
          </button>
        </div>
      </footer>
    </div>
  )
}

function PhaseStageRouter({
  phase,
  sceneStep,
  payload,
}: {
  phase: number
  sceneStep: number
  payload: OrchestrationPayload
}) {
  switch (phase) {
    case 1:
      return <MotionPhase1 sceneStep={sceneStep} payload={payload} />
    case 2:
      return <MotionPhase2 sceneStep={sceneStep} payload={payload} />
    case 3:
      return <MotionPhase3 sceneStep={sceneStep} payload={payload} />
    case 4:
      return <MotionPhase4 sceneStep={sceneStep} payload={payload} />
    case 5:
      return <MotionPhase5 sceneStep={sceneStep} payload={payload} />
    case 6:
      return <MotionPhase6 sceneStep={sceneStep} payload={payload} />
    default:
      return null
  }
}



// Phase 2: The Strategy Block (VRAM Morph & Cognitive Reset)
function MotionPhase2({ sceneStep, payload }: { sceneStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="space-y-6">
      <div className="text-xs uppercase text-purple-400 tracking-wider font-bold flex items-center gap-2">
        <Brain className="w-4 h-4" /> Phase 2 // The Strategy Block (SSIS Planner)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* VRAM Weight Swap Shared Motion Container */}
        <motion.div
          layout
          layoutId="vram-block"
          className="p-4 rounded-xl border border-purple-500/40 bg-purple-500/10 space-y-2 shadow-lg"
        >
          <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">VRAM RESIDENT SLOT</div>
          <div className="text-sm font-bold text-white">Qwen-Coder 2.5 3B (4-bit)</div>
          <div className="text-[11px] text-purple-200/70">Role: Planner | Allocated: ~2.1 GB VRAM</div>
        </motion.div>

        <div className={cn(
          "p-4 rounded-xl border transition-all flex flex-col justify-between",
          sceneStep >= 1 ? "border-cyan-500/40 bg-cyan-500/10" : "border-white/10 bg-white/[0.02]"
        )}>
          <div className="text-[10px] text-cyan-300 font-bold uppercase">STEP 3: INTENT PACKET</div>
          <div className="text-xs font-bold mt-2 px-2.5 py-1.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 inline-block">
            {payload.intentPacket.category}
          </div>
          <div className="text-[10px] text-white/50 mt-2">Target: {payload.intentPacket.target}</div>
        </div>

        <div className={cn(
          "p-4 rounded-xl border transition-all flex flex-col justify-between",
          sceneStep >= 2 ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/10 bg-white/[0.02]"
        )}>
          <div className="text-[10px] text-emerald-300 font-bold uppercase">STEP 4: COGNITIVE RESET</div>
          <div className="text-xs mt-1 text-emerald-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Context Barrier Active
          </div>
          <div className="text-[10px] text-white/50 mt-2">Model weights primed in memory</div>
        </div>
      </div>

      {/* Step 5 Plan Generation JSON */}
      <div className="space-y-2">
        <div className="text-[10px] text-white/40 uppercase font-bold">Step 5: Output AST Modification JSON</div>
        <motion.div
          animate={{ opacity: sceneStep >= 3 ? 1 : 0.4 }}
          className="p-4 rounded-xl bg-[#070709] border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-inner overflow-x-auto"
        >
          <pre>{`{
  "refactoringIntent": "${payload.intentPacket.category}",
  "target": "${payload.intentPacket.target}",
  "action": "REPLACE_WITH_BOOLEAN_EXPRESSION",
  "nodes": ["if_token_check", "if_refresh_strict_matrix"]
}`}</pre>
        </motion.div>
      </div>
    </div>
  )
}

// Phase 3: Plan Execution (Prompt Shift & Candidate Code Synthesizer)
function MotionPhase3({ sceneStep, payload }: { sceneStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="space-y-6">
      <div className="text-xs uppercase text-violet-400 tracking-wider font-bold flex items-center gap-2">
        <Code2 className="w-4 h-4" /> Phase 3 // Plan Execution (Prompt Shift: Planner &rarr; Generator)
      </div>

      <div className="p-4 rounded-xl border border-violet-500/40 bg-violet-500/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-violet-400 animate-ping" />
          <span className="text-xs font-bold text-violet-200">System Prompt Shift Active in VRAM</span>
        </div>
        <span className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 text-[10px] font-bold uppercase">
          Step 6 Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
        <div className="p-4 rounded-xl bg-[#070709] border border-white/10 space-y-2 text-white/60">
          <div className="text-[10px] text-white/40 border-b border-white/10 pb-1">INBOUND AST PLAN</div>
          <pre className="text-cyan-300 text-[11px]">{`{ action: "FLATTEN_CONDITIONAL", target: "method:validateToken" }`}</pre>
        </div>

        <motion.div
          animate={{ borderColor: sceneStep >= 2 ? "#8b5cf6" : "rgba(255,255,255,0.1)" }}
          className="p-4 rounded-xl bg-[#070709] border border-violet-500/30 text-violet-200 relative overflow-hidden"
        >
          <div className="text-[10px] text-violet-400 border-b border-white/10 pb-1 mb-2 font-bold flex justify-between">
            <span>Candidate Java Output</span>
            <span className="text-emerald-400">RefactoredOutput.java</span>
          </div>
          <pre className="font-mono text-[11px] leading-relaxed overflow-x-auto">{payload.candidateCode}</pre>
        </motion.div>
      </div>
    </div>
  )
}

// Phase 4: Deterministic Validation Routing (D2NR Loop 1)
function MotionPhase4({ sceneStep, payload }: { sceneStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="space-y-6">
      <div className="text-xs uppercase text-emerald-400 tracking-wider font-bold flex items-center gap-2">
        <ShieldCheck className="w-4 h-4" /> Phase 4 // D2NR Loop 1 (Deterministic Validation Routing)
      </div>

      <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 font-mono text-xs flex items-center justify-between">
        <span className="font-bold text-emerald-300">Step 7: Tier 1 Syntax Heal (javalang Parser)</span>
        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
          SYNTAX CLEAN (0 INNER LOOPS)
        </span>
      </div>

      <div className="space-y-2 font-mono text-xs">
        <div className="text-[10px] text-white/40 uppercase font-bold">Step 8: Tier 2 Structural Checkpoints</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            animate={{ scale: sceneStep >= 1 ? 1 : 0.98 }}
            className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-center"
          >
            <div className="text-[10px] opacity-75 uppercase">Check A</div>
            <div className="font-bold text-sm mt-1">CC &le; 4 [PASS]</div>
            <div className="text-[10px] mt-1 text-emerald-400/70">Complexity Constrained</div>
          </motion.div>

          <motion.div
            animate={{ scale: sceneStep >= 2 ? 1 : 0.98 }}
            className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-center"
          >
            <div className="text-[10px] opacity-75 uppercase">Check B</div>
            <div className="font-bold text-sm mt-1">Boundaries [PASS]</div>
            <div className="text-[10px] mt-1 text-emerald-400/70">Outer AST Preserved</div>
          </motion.div>

          <motion.div
            animate={{ scale: sceneStep >= 3 ? 1 : 0.98 }}
            className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-center"
          >
            <div className="text-[10px] opacity-75 uppercase">Check C</div>
            <div className="font-bold text-sm mt-1">Intent Math [PASS]</div>
            <div className="text-[10px] mt-1 text-emerald-400/70">Differential Verified</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Phase 5: Heuristic Adjudication (SSIS Model Swap to Llama 3.2 3B Judge)
function MotionPhase5({ sceneStep, payload }: { sceneStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="space-y-6">
      <div className="text-xs uppercase text-amber-400 tracking-wider font-bold flex items-center gap-2">
        <Scale className="w-4 h-4" /> Phase 5 // D2NR Loop 2 (Heuristic Adjudication)
      </div>

      {/* Model Swap Shared Layout Container */}
      <motion.div
        layout
        layoutId="vram-block"
        className="p-4 rounded-xl border border-purple-500/50 bg-purple-500/15 flex items-center justify-between shadow-lg"
      >
        <div>
          <span className="text-[10px] text-purple-300 font-bold uppercase block">SSIS VRAM HOT-SWAP</span>
          <span className="text-sm font-bold text-white">Unload Qwen-Coder &rarr; Load 4-bit Llama 3.2 3B (Judge)</span>
        </div>
        <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
          3.4 GB VRAM
        </span>
      </motion.div>

      {/* Step 9 Judge Audit Rationale & Rubber Stamp */}
      <div className="p-5 rounded-xl bg-[#070709] border border-white/10 space-y-4">
        <div className="text-[10px] text-white/40 uppercase font-bold flex justify-between">
          <span>Step 9: Tier 3 Audit Rationale</span>
          <span className="text-amber-400">Judge Evaluation</span>
        </div>
        <p className="text-xs text-white/90 leading-relaxed font-mono">
          &quot;The generated refactor eliminates nested conditional branches while maintaining exact logical equivalence for session validation token inputs.&quot;
        </p>

        {/* Rubber-stamp Verdict Seal */}
        <div className="flex justify-end pt-2">
          <motion.div
            animate={{ scale: sceneStep >= 2 ? [0, 1.15, 1] : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="px-6 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>VERDICT: {payload.judgeVerdict}</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Phase 6: Finalization (Dossier & Commitment)
function MotionPhase6({ sceneStep, payload }: { sceneStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="space-y-6 text-center py-6">
      <div className="text-xs uppercase text-emerald-400 tracking-widest font-bold flex items-center justify-center gap-2">
        <Zap className="w-4 h-4" /> Phase 6 // Finalization & Output Dossier
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="space-y-3"
      >
        <div className="text-3xl md:text-5xl font-bold text-emerald-400 font-mono tracking-tight">
          STATUS: {payload.exitStatus}
        </div>
        <p className="text-xs text-white/60 font-mono max-w-xl mx-auto">
          Cyclomatic Complexity Delta: <strong className="text-red-400">CC 14</strong> &rarr; <strong className="text-emerald-400">CC 4 (-71.4%)</strong> | Complete Execution Trace Persisted
        </p>
      </motion.div>

      <div className="pt-4 border-t border-white/10 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-lg"
        >
          <span>Return to Horizon Studio Demo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}