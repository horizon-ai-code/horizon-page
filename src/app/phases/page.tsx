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
  Scale,
  Sparkles,
  Database,
  Lock
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
  rawCode: `public class StudentManager {
    private List<Student> students;
    
    public void addStudent(Student student) {
        if (student != null) {
            if (student.getName() != null) {
                students.add(student);
            }
        }
    }

    public void displayStudents() {
        for (Student s : students) {
            System.out.println(s.getName());
        }
    }
}`,
  nlDirective: "Clean up nested conditional checks & modernize display method",
  intentPacket: { category: "FLATTEN_CONDITIONAL", target: "method:addStudent" },
  candidateCode: `public class StudentManager {
    private List<Student> students = new ArrayList<>();

    public void addStudent(Student student) {
        if (student == null || student.getName() == null) return;
        students.add(student);
    }

    public void displayStudents() {
        students.stream().map(Student::getName).forEach(System::println);
    }
}`,
  validationPassed: true,
  judgeVerdict: "ACCEPT",
  exitStatus: "COMMIT_SUCCESS",
}

interface SceneInfo {
  id: number
  num: string
  title: string
  tag: string
  activeModel: string
  vramUsage: string
}

const SCENES: SceneInfo[] = [
  {
    id: 0,
    num: "01",
    title: "PHASE 1: INGESTION & BASELINE",
    tag: "INGEST",
    activeModel: "javalang + lizard + javac",
    vramUsage: "0.0 GB (CPU Local)"
  },
  {
    id: 1,
    num: "02",
    title: "PHASE 2: STRATEGY & INTENT MAPPING",
    tag: "SSIS PLANNER",
    activeModel: "Qwen-Coder 2.5 3B (4-bit Planner)",
    vramUsage: "3.2 GB / 4.0 GB VRAM"
  },
  {
    id: 2,
    num: "03",
    title: "PHASE 3: PLAN EXECUTION & GENERATION",
    tag: "GENERATOR",
    activeModel: "Qwen-Coder 2.5 3B (4-bit Generator)",
    vramUsage: "3.2 GB / 4.0 GB VRAM"
  },
  {
    id: 3,
    num: "04",
    title: "PHASE 4: D2NR LOOP 1 — VALIDATION ROUTING",
    tag: "D2NR L1",
    activeModel: "Deterministic Routing Engine (javalang + AST Math)",
    vramUsage: "3.2 GB VRAM (Standby)"
  },
  {
    id: 4,
    num: "05",
    title: "PHASE 5: D2NR LOOP 2 — HEURISTIC ADJUDICATION",
    tag: "LLAMA JUDGE",
    activeModel: "Llama 3.2 3B (4-bit Judge)",
    vramUsage: "3.4 GB / 4.0 GB VRAM"
  },
  {
    id: 5,
    num: "06",
    title: "PHASE 6: FINALIZATION & COMMIT MERGE",
    tag: "COMMIT",
    activeModel: "Horizon Pipeline Orchestration Engine",
    vramUsage: "0.0 GB (Unloaded)"
  }
]

export default function HorizonOrchestrationStudio() {
  const [currentScene, setCurrentScene] = useState<number>(0)
  const [subStep, setSubStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [payload] = useState<OrchestrationPayload>(INITIAL_PAYLOAD)

  // Auto-advance cinematic timeline loop
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setSubStep((prev) => {
        if (prev < 3) return prev + 1
        setCurrentScene((s) => (s < SCENES.length - 1 ? s + 1 : 0))
        return 0
      })
    }, 3800)
    return () => clearInterval(timer)
  }, [isPlaying])

  const handleNext = () => {
    setSubStep(0)
    setCurrentScene((s) => Math.min(SCENES.length - 1, s + 1))
  }

  const handlePrev = () => {
    setSubStep(0)
    setCurrentScene((s) => Math.max(0, s - 1))
  }

  const activeSceneData = SCENES[currentScene]

  return (
    <div className="w-full min-h-screen bg-[#070709] text-white font-mono flex flex-col justify-between p-4 md:p-8 select-none overflow-hidden relative">
      {/* Background Grid and Cinematic Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <NoiseOverlay opacity={0.03} />
      <HorizonGlow glowPosition="center" glowColor="blue" sparkleCount={10} showHorizonLine={false} />

      {/* Top Header & Navigation */}
      <header className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-20">
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
              HORIZON-AI // ORCHESTRATION_STUDIO
            </span>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1 bg-[#0E0E14] p-1 rounded-lg border border-white/10">
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => {
                setCurrentScene(idx)
                setSubStep(0)
              }}
              className={cn(
                "px-2.5 py-1 rounded text-[11px] font-bold transition-all duration-300 relative",
                currentScene === idx
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  : "text-white/40 hover:text-white/80 border border-transparent"
              )}
            >
              {scene.num}
            </button>
          ))}
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/15 text-xs flex items-center gap-1.5 font-bold transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>
          <button
            onClick={() => setSubStep(0)}
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors cursor-pointer"
            title="Replay Substep"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </header>

      {/* Main Kinetic Stage */}
      <main className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center relative z-10 py-4">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs tracking-widest text-emerald-400/90 uppercase font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {activeSceneData.title}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/40 hidden sm:inline">
              VRAM: <strong className="text-purple-300">{activeSceneData.vramUsage}</strong>
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 tracking-wider font-bold">
              {activeSceneData.tag}
            </span>
          </div>
        </div>

        <div className="relative flex items-center">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-5 md:-left-6 z-30 p-3 rounded-full bg-[#121218] border border-white/15 text-white/80 hover:text-emerald-400 hover:border-emerald-500/40 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Main Visual Stage Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-[#0E0E14] border border-white/15 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(16,185,129,0.12)] relative min-h-[460px] flex flex-col justify-center overflow-hidden"
            >
              {renderOrchestrationScene(currentScene, subStep, payload)}
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute -right-5 md:-right-6 z-30 p-3 rounded-full bg-[#121218] border border-white/15 text-white/80 hover:text-emerald-400 hover:border-emerald-500/40 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Bottom Telemetry Footer */}
      <footer className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 pt-4 border-t border-white/10 gap-3 relative z-20">
        <div className="flex items-center gap-6">
          <span>AST_HASH: <strong className="text-cyan-300 font-bold">{payload.astHash}</strong></span>
          <span>SSIS_SLOT: <strong className="text-purple-300 font-bold">Qwen 2.5 / Llama 3.2 4-bit</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SUBSTEP {subStep + 1}/4</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Scene Dispatcher matching documented phases precisely
function renderOrchestrationScene(sceneIdx: number, subStep: number, payload: OrchestrationPayload) {
  switch (sceneIdx) {
    case 0:
      return <Phase1Visualizer subStep={subStep} payload={payload} />
    case 1:
      return <Phase2Visualizer subStep={subStep} payload={payload} />
    case 2:
      return <Phase3Visualizer subStep={subStep} payload={payload} />
    case 3:
      return <Phase4Visualizer subStep={subStep} payload={payload} />
    case 4:
      return <Phase5Visualizer subStep={subStep} payload={payload} />
    case 5:
      return <Phase6Visualizer subStep={subStep} payload={payload} />
    default:
      return null
  }
}

/* --- PHASE 1: Ingestion & Baseline --- */
function Phase1Visualizer({ subStep, payload }: { subStep: number; payload: OrchestrationPayload }) {
  return <MotionPhase1 sceneStep={subStep} payload={payload} />
}

/* --- PHASE 2: Strategy Block (SSIS Planner) --- */
function Phase2Visualizer({ subStep, payload }: { subStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="space-y-3">
        <motion.div
          animate={{ borderColor: subStep >= 0 ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)" }}
          className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-500/10 text-xs text-purple-200 font-bold flex items-center justify-between shadow-lg"
        >
          <span>Qwen-Coder 2.5 3B (4-bit VRAM)</span>
          <Cpu className="w-4 h-4 text-purple-400" />
        </motion.div>
        <motion.div
          animate={{ opacity: subStep >= 1 ? 1 : 0.4, x: subStep >= 1 ? 0 : -8 }}
          className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-300 font-bold"
        >
          Intent: {payload.intentPacket.category} ({payload.intentPacket.target})
        </motion.div>
        <motion.div
          animate={{ opacity: subStep >= 2 ? 1 : 0.4, x: subStep >= 2 ? 0 : -8 }}
          className="p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-xs text-cyan-300"
        >
          Cognitive Reset: Context Isolation Active
        </motion.div>
      </div>
      <div className="p-5 rounded-xl border border-white/10 bg-[#121218] relative overflow-hidden space-y-2">
        <div className="text-[10px] text-white/40 uppercase font-bold flex justify-between">
          <span>AST Modification JSON Output</span>
          {subStep >= 3 && <span className="text-emerald-400 text-[9px] font-bold">READY</span>}
        </div>
        <pre className="text-xs text-emerald-400 font-mono overflow-x-auto leading-relaxed">
          <code>{`{
  "action": "REPLACE",
  "targetScope": "${payload.intentPacket.target}",
  "strategy": "STREAM_DECLARATIVE",
  "intent": "${payload.intentPacket.category}"
}`}</code>
        </pre>
      </div>
    </div>
  )
}

/* --- PHASE 3: Plan Execution --- */
function Phase3Visualizer({ subStep, payload }: { subStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="p-5 rounded-xl border border-violet-500/30 bg-violet-500/5 flex items-center justify-center h-48 relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="w-28 h-28 rounded-full border-2 border-violet-500/30 border-t-violet-400 flex items-center justify-center relative"
        >
          <Sparkles className="w-8 h-8 text-violet-400 animate-pulse" />
        </motion.div>
        <span className="absolute bottom-3 text-[10px] text-violet-300 font-bold tracking-wider">
          SYNTHESIZING CANDIDATE AST
        </span>
      </div>
      <div className="space-y-3">
        <div className="text-xs uppercase text-violet-400 font-bold flex items-center gap-2">
          <Zap className="w-4 h-4" /> System Prompt Shift: GENERATOR
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-[#121218] text-xs font-mono text-emerald-300 overflow-x-auto max-h-48 leading-relaxed">
          <pre>{payload.candidateCode}</pre>
        </div>
      </div>
    </div>
  )
}

/* --- PHASE 4: D2NR Loop 1 Validation --- */
function Phase4Visualizer({ subStep, payload }: { subStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.div
          animate={{ scale: subStep >= 0 ? 1 : 0.95, opacity: subStep >= 0 ? 1 : 0.4 }}
          className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center text-xs text-emerald-300 font-bold"
        >
          <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-emerald-400" /> Tier 1: Syntax Heal
        </motion.div>
        <motion.div
          animate={{ scale: subStep >= 1 ? 1 : 0.95, opacity: subStep >= 1 ? 1 : 0.4 }}
          className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center text-xs text-emerald-300 font-bold"
        >
          <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-emerald-400" /> Check A: CC ≤ 4
        </motion.div>
        <motion.div
          animate={{ scale: subStep >= 2 ? 1 : 0.95, opacity: subStep >= 2 ? 1 : 0.4 }}
          className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center text-xs text-emerald-300 font-bold"
        >
          <Activity className="w-5 h-5 mx-auto mb-2 text-emerald-400" /> Check B &amp; C: Invariant
        </motion.div>
      </div>
      <div className="text-center text-xs text-white/60 bg-white/[0.02] p-3 rounded-lg border border-white/10">
        Deterministic quarantine verifying syntax, complexity bounds, and intent math.
      </div>
    </div>
  )
}

/* --- PHASE 5: D2NR Loop 2 Judge --- */
function Phase5Visualizer({ subStep, payload }: { subStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-around p-5 rounded-xl border border-white/10 bg-[#121218]">
        <div className="text-center">
          <div className="text-[10px] text-white/40">QWEN-CODER</div>
          <div className="text-xs font-bold text-amber-400">UNLOADED</div>
        </div>
        <div className="text-xs text-purple-300 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 font-bold">
          SSIS Hot-Swap ➔ Llama 3.2 3B
        </div>
        <div className="text-center">
          <div className="text-[10px] text-white/40">LLAMA 3.2 JUDGE</div>
          <div className="text-xs font-bold text-emerald-400">ACTIVE VRAM</div>
        </div>
      </div>
      <div className="text-center">
        <motion.span
          animate={{ scale: subStep >= 2 ? [0.9, 1.1, 1] : 1 }}
          className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] inline-flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>VERDICT: {payload.judgeVerdict} (Semantic Consistency Verified)</span>
        </motion.span>
      </div>
    </div>
  )
}

/* --- PHASE 6: Finalization & Commit --- */
function Phase6Visualizer({ subStep, payload }: { subStep: number; payload: OrchestrationPayload }) {
  return (
    <div className="text-center space-y-6 py-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl font-extrabold text-emerald-400 tracking-tight font-mono"
      >
        {payload.exitStatus}
      </motion.div>
      <div className="text-xs text-white/60 max-w-md mx-auto leading-relaxed font-mono">
        Refactored candidate committed. Original codebase retained as safe fallback. Execution metrics logged.
      </div>
      <div className="pt-2 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold font-mono text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg"
        >
          <span>Return to Horizon Studio Demo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}