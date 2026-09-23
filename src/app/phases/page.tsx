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
  Cpu,
  Activity,
  Layers,
  Code2,
  Terminal,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  Target,
  BarChart3,
  Box,
  Brain,
  Check,
  Flame,
  Globe
} from "lucide-react"
import { HorizonGlow } from "@/components/horizon-glow"
import { NoiseOverlay } from "@/components/noise-overlay"
import { cn } from "@/lib/utils"

export interface OrchestrationPayload {
  astHash: string
  rawCode: string
  nlDirective: string
  intentPacket: { category: string; target: string }
  candidateCode: string
  judgeVerdict: string
  exitStatus: string
}

const INITIAL_PAYLOAD: OrchestrationPayload = {
  astHash: "0x9f8a...4b12",
  rawCode: `public class StudentManager {
    private List<Student> students;

    public void displayStudents() {
        for (Student s : students) {
            System.out.println(s.getName());
        }
    }
}`,
  nlDirective: "Refactor imperative for loop to declarative Java Stream API",
  intentPacket: { category: "STREAM_DECLARATIVE", target: "method:displayStudents" },
  candidateCode: `public class StudentManager {
    private List<Student> students = new ArrayList<>();

    public void displayStudents() {
        students.stream()
                .map(Student::getName)
                .forEach(System::println);
    }
}`,
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
    title: "PHASE 1: USER INPUT & CODE INGESTION",
    tag: "ACCELERATED INPUT",
    activeModel: "Local IDE Client",
    vramUsage: "0.0 GB (Client)"
  },
  {
    id: 1,
    num: "02",
    title: "PHASE 2: BASELINE ANALYSIS & LASER SCAN",
    tag: "AST TELEMETRY",
    activeModel: "javalang + lizard + javac",
    vramUsage: "0.0 GB (CPU Local)"
  },
  {
    id: 2,
    num: "03",
    title: "PHASE 3: STRATEGY PLANNER",
    tag: "SSIS PLANNER",
    activeModel: "Qwen2.5-Coder-3B-Instruct (4-bit)",
    vramUsage: "3.2 GB / 4.0 GB VRAM"
  },
  {
    id: 3,
    num: "04",
    title: "PHASE 4: GENERATOR ENGINE & CODE STREAMING",
    tag: "SSIS GENERATOR",
    activeModel: "Qwen2.5-Coder-3B-Instruct (4-bit)",
    vramUsage: "3.2 GB / 4.0 GB VRAM"
  },
  {
    id: 4,
    num: "05",
    title: "PHASE 5: D2NR LOOP & HEURISTIC JUDGE",
    tag: "LLAMA JUDGE",
    activeModel: "Llama 3.2 3B (4-bit Judge)",
    vramUsage: "3.4 GB / 4.0 GB VRAM"
  },
  {
    id: 5,
    num: "06",
    title: "PHASE 6: FINALIZATION & COMMIT MERGE",
    tag: "COMMIT MERGE",
    activeModel: "Horizon Pipeline Engine",
    vramUsage: "0.0 GB (Unloaded)"
  }
]

export default function HorizonOrchestrationStudio() {
  const [currentScene, setCurrentScene] = useState<number>(0)
  const [subStep, setSubStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [payload] = useState<OrchestrationPayload>(INITIAL_PAYLOAD)

  // Auto-advance timeline loop
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setSubStep((prev) => {
        if (prev < 3) return prev + 1
        setCurrentScene((s) => (s < SCENES.length - 1 ? s + 1 : 0))
        return 0
      })
    }, 4200)
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
      {/* Background Grid and Glow Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <NoiseOverlay opacity={0.03} />
      <HorizonGlow glowPosition="center" glowColor="blue" sparkleCount={10} showHorizonLine={false} />

      {/* Main Kinetic Stage */}
      <main className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center relative z-10 py-4">
        {/* Stage Header Info */}
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
              {renderOrchestrationScene(currentScene, subStep, payload, setSubStep, handleNext)}
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
    </div>
  )
}

// Dispatcher function for all 6 cinematic orchestration scenes
function renderOrchestrationScene(
  sceneIdx: number,
  subStep: number,
  payload: OrchestrationPayload,
  setSubStep: React.Dispatch<React.SetStateAction<number>>,
  handleNext: () => void
) {
  switch (sceneIdx) {
    case 0:
      return <Scene1UserInput subStep={subStep} payload={payload} onNextScene={handleNext} />
    case 1:
      return <Scene2BaselineAnalysis subStep={subStep} payload={payload} />
    case 2:
      return <Scene3StrategyPlanner subStep={subStep} payload={payload} />
    case 3:
      return <Scene4GeneratorEngine subStep={subStep} payload={payload} />
    case 4:
      return <Scene5ValidationLoop subStep={subStep} payload={payload} />
    case 5:
      return <Scene6Finalization subStep={subStep} payload={payload} />
    default:
      return null
  }
}

/* =========================================================================
   SCENE 1: User Input (Accelerated Typing & Snappy Click Trigger)
   ========================================================================= */
function Scene1UserInput({
  subStep,
  payload,
  onNextScene
}: {
  subStep: number
  payload: OrchestrationPayload
  onNextScene: () => void
}) {
  const [typedCode, setTypedCode] = useState("")
  const [typedPrompt, setTypedPrompt] = useState("")
  const [isClicked, setIsClicked] = useState(false)

  const fullCodeBoilerplate = `public class StudentManager {\n    private List<Student> students;\n\n    public void displayStudents() {\n`
  const loopCode = `        for (Student s : students) {\n            System.out.println(s.getName());\n        }\n    }\n}`

  useEffect(() => {
    // Fast chunked typing simulator (~1.5 seconds total)
    setTypedCode(fullCodeBoilerplate)
    const timer1 = setTimeout(() => {
      setTypedCode(fullCodeBoilerplate + loopCode)
    }, 600)

    const timer2 = setTimeout(() => {
      setTypedPrompt(payload.nlDirective)
    }, 1200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [payload.nlDirective, fullCodeBoilerplate, loopCode])

  const handleClickRefactor = () => {
    setIsClicked(true)
    setTimeout(() => {
      onNextScene()
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* IDE Code Window */}
      <div className="bg-[#121218] rounded-xl border border-white/15 p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-white/60 ml-2 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> StudentManager.java
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            FAST INGESTION (1.5s)
          </span>
        </div>

        <pre className="text-xs text-white/90 leading-relaxed font-mono overflow-x-auto min-h-[140px]">
          <code>{typedCode || fullCodeBoilerplate}</code>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="inline-block w-2 h-4 bg-cyan-400 ml-1 translate-y-0.5"
          />
        </pre>
      </div>

      {/* Prompt Box & Snappy Refactor Action */}
      <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full space-y-1">
          <div className="text-[10px] uppercase text-cyan-300 font-bold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Refactoring Directive Input
          </div>
          <div className="text-xs text-white/90 bg-[#070709] px-3.5 py-2.5 rounded-lg border border-white/10 font-mono">
            {typedPrompt || "Typing directive..."}
          </div>
        </div>

        <motion.button
          onClick={handleClickRefactor}
          animate={{ scale: isClicked ? 0.94 : 1 }}
          className={cn(
            "w-full md:w-auto px-6 py-3 rounded-xl font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shrink-0",
            isClicked
              ? "bg-emerald-400 text-black border-2 border-emerald-300 shadow-[0_0_20px_#10B981]"
              : "bg-cyan-500 text-black hover:bg-cyan-400 border border-cyan-300"
          )}
        >
          <Zap className="w-4 h-4" />
          <span>{isClicked ? "Ingesting..." : "Refactor Code"}</span>
        </motion.button>
      </div>
    </div>
  )
}

/* =========================================================================
   SCENE 2: Baseline Analysis (Enhanced Laser Scan & AST/Semantic/Complexity Modules)
   ========================================================================= */
function Scene2BaselineAnalysis({
  subStep,
  payload
}: {
  subStep: number
  payload: OrchestrationPayload
}) {
  const isScanning = subStep >= 0
  const isExtracted = subStep >= 2

  return (
    <div className="space-y-6">
      {/* Code Container with Glowing Laser Sweep */}
      <div className="bg-[#121218] rounded-xl border border-white/15 p-5 shadow-2xl relative overflow-hidden min-h-[170px]">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <span className="text-xs text-white/60 font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> StudentManager.java
          </span>
          <span className="text-[10px] text-cyan-300 font-bold">LASER SCANNING BASELINE</span>
        </div>

        <div className="relative font-mono text-xs leading-relaxed">
          <div className={cn("transition-transform duration-200", isScanning && "scale-[1.01] text-cyan-100")}>
            {`public class StudentManager {\n  private List<Student> students;\n  public void displayStudents() {`}
          </div>
          <div
            className={cn(
              "py-1 px-2 rounded transition-all duration-300 my-1",
              isScanning ? "bg-cyan-500/20 text-cyan-200 border-l-2 border-cyan-400 font-bold scale-[1.02]" : "text-white/80"
            )}
          >
            {`    for(Student s : students) { System.out.println(s.getName()); }`}
          </div>
          <div className="text-white/80">{`  }\n}`}</div>

          {/* Thicker Glowing Laser Sweep Beam */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee] z-20 pointer-events-none"
            animate={{ top: ["0%", "90%", "0%"] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Module Visualizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Syntax Module (SVG AST Tree) */}
        <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 space-y-2">
          <div className="text-[10px] text-sky-300 font-bold uppercase flex justify-between">
            <span>Syntax Module</span>
            <span>javalang</span>
          </div>
          <div className="h-16 flex items-center justify-center">
            <svg className="w-full h-12" viewBox="0 0 160 40">
              <motion.path
                d="M 20 20 L 60 10 M 20 20 L 60 30 M 60 10 L 120 10 M 60 30 L 120 30"
                stroke="#38bdf8"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <circle cx="20" cy="20" r="5" fill="#38bdf8" />
              <circle cx="60" cy="10" r="4" fill="#38bdf8" />
              <circle cx="60" cy="30" r="4" fill="#38bdf8" />
              <circle cx="120" cy="10" r="4" fill="#38bdf8" />
              <circle cx="120" cy="30" r="4" fill="#38bdf8" />
            </svg>
          </div>
          <div className="text-[10px] text-sky-200 text-center font-bold">METHOD UNIT AST GENERATED</div>
        </div>

        {/* 2. Semantic Module (Pulsing Reticle Target) */}
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-2 flex flex-col justify-between">
          <div className="text-[10px] text-amber-300 font-bold uppercase flex justify-between">
            <span>Semantic Module</span>
            <span>Pattern Reticle</span>
          </div>
          <div className="flex items-center justify-center my-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="p-2 rounded-full border border-amber-400/50 bg-amber-500/20"
            >
              <Target className="w-6 h-6 text-amber-400" />
            </motion.div>
          </div>
          <div className="text-[10px] text-amber-300 text-center font-bold">FLAGGED: IMPERATIVE FOR_LOOP</div>
        </div>

        {/* 3. Complexity Module (Animated Gauge Spike to O(N)) */}
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 space-y-2 flex flex-col justify-between">
          <div className="text-[10px] text-red-300 font-bold uppercase flex justify-between">
            <span>Complexity Module</span>
            <span>lizard metrics</span>
          </div>
          <div className="h-10 flex items-end justify-center gap-1.5 px-2">
            <motion.div
              initial={{ height: "20%" }}
              animate={{ height: "90%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-4 bg-red-500 rounded-t shadow-[0_0_10px_#ef4444]"
            />
            <motion.div
              initial={{ height: "15%" }}
              animate={{ height: "70%" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-4 bg-amber-500 rounded-t"
            />
            <motion.div
              initial={{ height: "10%" }}
              animate={{ height: "40%" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-4 bg-emerald-500 rounded-t"
            />
          </div>
          <div className="text-[10px] text-red-300 text-center font-bold">SPIKE: CC = 14 (HIGH O(N))</div>
        </div>
      </div>

      {/* Ghost Extraction Effect Slide-Off */}
      {isExtracted && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-3.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 flex items-center justify-between text-xs text-cyan-300 shadow-lg"
        >
          <span className="flex items-center gap-2 font-bold">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Ghost Isolation Buffer Primed
          </span>
          <span className="text-[11px] bg-cyan-500/20 px-2.5 py-0.5 rounded font-mono font-bold">
            TARGET SLID TO PHASE 3
          </span>
        </motion.div>
      )}
    </div>
  )
}

/* =========================================================================
   SCENE 3: Strategy Planner (Model Badge & Identify->Understand->Plan->Output Sequence)
   ========================================================================= */
function Scene3StrategyPlanner({
  subStep,
  payload
}: {
  subStep: number
  payload: OrchestrationPayload
}) {
  return (
    <div className="space-y-6">
      {/* Model Identity Badge Drop Down */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-center"
      >
        <div className="px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <Brain className="w-4 h-4 text-purple-400" />
          <span>Planner Engine: Qwen2.5-Coder-3B-Instruct</span>
        </div>
      </motion.div>

      {/* Choreographed Sequence Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        {/* 1. Identify */}
        <motion.div
          animate={{
            borderColor: subStep >= 0 ? "#ef4444" : "rgba(255,255,255,0.1)",
            backgroundColor: subStep >= 0 ? "rgba(239,68,68,0.1)" : "#121218"
          }}
          className="p-3.5 rounded-xl border space-y-1 text-center"
        >
          <div className="text-[10px] text-red-400 font-bold uppercase">1. IDENTIFY</div>
          <div className="font-bold text-white">Target AST Node</div>
          <div className="text-[10px] text-red-300/80">forLoop:displayStudents</div>
        </motion.div>

        {/* 2. Understand */}
        <motion.div
          animate={{
            borderColor: subStep >= 1 ? "#38bdf8" : "rgba(255,255,255,0.1)",
            backgroundColor: subStep >= 1 ? "rgba(56,189,248,0.1)" : "#121218"
          }}
          className="p-3.5 rounded-xl border space-y-1 text-center"
        >
          <div className="text-[10px] text-cyan-400 font-bold uppercase">2. UNDERSTAND</div>
          <div className="font-bold text-white flex items-center justify-center gap-1">
            <Box className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> Intent Cube
          </div>
          <div className="text-[10px] text-cyan-300/80">STREAM_DECLARATIVE</div>
        </motion.div>

        {/* 3. Plan */}
        <motion.div
          animate={{
            borderColor: subStep >= 2 ? "#a855f7" : "rgba(255,255,255,0.1)",
            backgroundColor: subStep >= 2 ? "rgba(168,85,247,0.1)" : "#121218"
          }}
          className="p-3.5 rounded-xl border space-y-1 text-center"
        >
          <div className="text-[10px] text-purple-400 font-bold uppercase">3. PLAN</div>
          <div className="font-bold text-white flex items-center justify-center gap-1">
            <Globe className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Synthesis Sphere
          </div>
          <div className="text-[10px] text-purple-300/80">Calculating Mutations</div>
        </motion.div>

        {/* 4. Output */}
        <motion.div
          animate={{
            borderColor: subStep >= 3 ? "#10B981" : "rgba(255,255,255,0.1)",
            backgroundColor: subStep >= 3 ? "rgba(16,185,129,0.1)" : "#121218"
          }}
          className="p-3.5 rounded-xl border space-y-1 text-center"
        >
          <div className="text-[10px] text-emerald-400 font-bold uppercase">4. OUTPUT</div>
          <div className="font-bold text-white">Blueprint Ready</div>
          <div className="text-[10px] text-emerald-300/80">AST JSON Emitted</div>
        </motion.div>
      </div>

      {/* Modification Blueprint JSON Display */}
      <div className="p-5 rounded-xl border border-white/10 bg-[#121218] relative overflow-hidden">
        <div className="text-[10px] text-white/40 mb-2 uppercase font-bold flex justify-between">
          <span>Modification Blueprint JSON Output</span>
          <span className="text-emerald-400">ISOLATED STRATEGY</span>
        </div>
        <pre className="text-xs text-emerald-400 font-mono leading-relaxed overflow-x-auto">
          <code>{`{\n  "action": "REPLACE",\n  "targetScope": "${payload.intentPacket.target}",\n  "strategy": "${payload.intentPacket.category}",\n  "mutation": "MAP_TO_SYSTEM_PRINTLN"\n}`}</code>
        </pre>
      </div>
    </div>
  )
}

/* =========================================================================
   SCENE 4: Generator Engine (Badge, Engine Ingestion Rings & Code Streaming)
   ========================================================================= */
function Scene4GeneratorEngine({
  subStep,
  payload
}: {
  subStep: number
  payload: OrchestrationPayload
}) {
  return (
    <div className="space-y-6">
      {/* Model Identity Badge Drop Down */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-center"
      >
        <div className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Generator Engine: Qwen2.5-Coder-3B-Instruct</span>
        </div>
      </motion.div>

      {/* Engine Ingestion Rings Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col items-center justify-center h-44 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="w-28 h-28 rounded-full border-2 border-amber-500/30 border-t-amber-400 flex items-center justify-center relative"
          >
            <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
          </motion.div>
          <span className="mt-3 text-[10px] text-amber-300 font-bold tracking-wider uppercase">
            INGESTING BLUEPRINT ➔ STREAMING AST
          </span>
        </div>

        {/* Streaming Split Pane Payoff (Old vs New) */}
        <div className="space-y-2">
          <div className="text-xs uppercase text-amber-400 font-bold flex items-center justify-between">
            <span>Refactoring Payoff</span>
            <span className="text-emerald-400 text-[10px]">REAL-TIME STREAM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
            {/* Old Imperative Code (Grayed out) */}
            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-white/50 space-y-1">
              <div className="text-[9px] text-red-400 font-bold uppercase">OLD (Imperative)</div>
              <pre className="line-through text-red-300/70">{`for(Student s : students) {\n  System.out.println(s.getName());\n}`}</pre>
            </div>

            {/* New Declarative Code (Streaming in Green) */}
            <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 space-y-1">
              <div className="text-[9px] text-emerald-400 font-bold uppercase">NEW (Declarative Stream)</div>
              <pre className="font-bold">{`students.stream()\n  .map(Student::getName)\n  .forEach(System::println);`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   SCENE 5: D2NR Validation Loop & Heuristic Judge
   ========================================================================= */
function Scene5ValidationLoop({
  subStep,
  payload
}: {
  subStep: number
  payload: OrchestrationPayload
}) {
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center text-xs text-emerald-300 font-bold">
          <CheckCircle2 className="w-5 h-5 mx-auto mb-2 text-emerald-400" /> Tier 1: Syntax Heal
        </div>
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center text-xs text-emerald-300 font-bold">
          <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-emerald-400" /> Check A: CC ≤ 4
        </div>
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center text-xs text-emerald-300 font-bold">
          <Activity className="w-5 h-5 mx-auto mb-2 text-emerald-400" /> Check B &amp; C: Invariant
        </div>
      </div>

      <div className="text-center">
        <span className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] inline-flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>VERDICT: {payload.judgeVerdict} (Semantic Consistency Verified)</span>
        </span>
      </div>
    </div>
  )
}

/* =========================================================================
   SCENE 6: Finalization & Commit Merge
   ========================================================================= */
function Scene6Finalization({
  subStep,
  payload
}: {
  subStep: number
  payload: OrchestrationPayload
}) {
  return (
    <div className="text-center space-y-6 py-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl md:text-5xl font-extrabold text-emerald-400 tracking-tight font-mono"
      >
        {payload.exitStatus}
      </motion.div>
      <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed font-mono">
        Refactored candidate committed. Original codebase retained as safe fallback. Execution metrics logged.
      </p>
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