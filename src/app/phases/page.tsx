"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Terminal,
  Zap,
  Target,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ShieldCheck,
  Box,
  Flame,
  Check,
  RefreshCw
} from "lucide-react"
import { HorizonGlow } from "@/components/horizon-glow"
import { NoiseOverlay } from "@/components/noise-overlay"

export default function PhasesPage() {
  const [currentScene, setCurrentScene] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [sceneStep, setSceneStep] = useState<number>(0)

  // Clearable timeout tracker for animation sequences
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const addTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timeoutsRef.current.push(id)
    return id
  }

  // Scene titles & specs mapping
  const sceneInfos = [
    { num: 1, title: "SCENE 1: USER INPUT & CODE INGESTION", tag: "INPUT INGEST", model: "Local IDE Client", vram: "0.0 GB" },
    { num: 2, title: "SCENE 2: SYSTEM ARCHITECTURE & SESSION", tag: "WEBSOCKET DISPATCH", model: "Horizon Orchestrator", vram: "0.1 GB" },
    { num: 3, title: "SCENE 3: BASELINE CHAMBER ANALYSIS", tag: "AST TELEMETRY", model: "javalang + lizard", vram: "0.2 GB (CPU)" },
    { num: 4, title: "SCENE 4: STRATEGY PLANNER", tag: "SSIS PLANNER", model: "Qwen2.5-Coder-3B-Instruct", vram: "3.2 GB / 4.0 GB" },
    { num: 5, title: "SCENE 5: GENERATOR ENGINE & CODE STREAMING", tag: "SSIS GENERATOR", model: "Qwen2.5-Coder-3B-Instruct", vram: "3.2 GB / 4.0 GB" },
    { num: 6, title: "SCENE 6: DETERMINISTIC VALIDATION", tag: "STATIC ANALYSIS", model: "AST Validator Loop", vram: "0.2 GB (CPU)" },
    { num: 7, title: "SCENE 7: MULTI-MODEL EVALUATION & JUDGE", tag: "LLAMA JUDGE LOOP", model: "Llama-3.2-3B-Instruct", vram: "3.4 GB / 4.0 GB" },
  ]

  // Scene lifecycle animation sequencer
  useEffect(() => {
    clearAllTimeouts()
    setSceneStep(0)

    if (!isPlaying) return

    if (currentScene === 1) {
      // Scene 1 timeline
      addTimeout(() => setSceneStep(1), 400)   // Fade container
      addTimeout(() => setSceneStep(2), 1000)  // Mouse to editor & typing code
      addTimeout(() => setSceneStep(3), 2800)  // Mouse to prompt & typing directive
      addTimeout(() => setSceneStep(4), 4500)  // Mouse to button & click
      addTimeout(() => {
        if (isPlaying) handleNext()
      }, 5800)
    } else if (currentScene === 2) {
      // Scene 2 timeline
      addTimeout(() => setSceneStep(1), 300)   // Particles condense -> packet
      addTimeout(() => setSceneStep(2), 1200)  // Reveal nodes
      addTimeout(() => setSceneStep(3), 2200)  // Packet moves UI -> WS
      addTimeout(() => setSceneStep(4), 3600)  // Packet moves WS -> BE
      addTimeout(() => setSceneStep(5), 4800)  // Packet BE -> Session ACTIVE
      addTimeout(() => {
        if (isPlaying) handleNext()
      }, 6800)
    } else if (currentScene === 3) {
      // Scene 3 timeline
      addTimeout(() => setSceneStep(1), 400)   // Modules & beams activate
      addTimeout(() => setSceneStep(2), 1400)  // Laser scanning down code
      addTimeout(() => setSceneStep(3), 3200)  // Semantic target hit & complexity spike
      addTimeout(() => setSceneStep(4), 4600)  // Laser completes, morph into Baseline Profile Artifact
      addTimeout(() => {
        if (isPlaying) handleNext()
      }, 6800)
    } else if (currentScene === 4) {
      // Scene 4 timeline
      addTimeout(() => setSceneStep(1), 400)   // Planner Badge & core rings spin
      addTimeout(() => setSceneStep(2), 1400)  // Input packets fly in -> Intent Packet
      addTimeout(() => setSceneStep(3), 2800)  // AST Structural Map appears & targets loop
      addTimeout(() => setSceneStep(4), 4400)  // Synthesis sphere & Blueprint cards unfold
      addTimeout(() => setSceneStep(5), 5800)  // Execution package shoots down
      addTimeout(() => {
        if (isPlaying) handleNext()
      }, 7200)
    } else if (currentScene === 5) {
      // Scene 5 timeline
      addTimeout(() => setSceneStep(1), 400)   // Generator Badge & execution plan arrives
      addTimeout(() => setSceneStep(2), 1400)  // Generator Engine active
      addTimeout(() => setSceneStep(3), 2600)  // Code split view appears & original loop target lit
      addTimeout(() => setSceneStep(4), 4200)  // Refactored code stream completes
      addTimeout(() => setSceneStep(5), 5600)  // Refactoring Complete badge
      addTimeout(() => {
        if (isPlaying) handleNext()
      }, 7400)
    } else if (currentScene === 6) {
      // Scene 6 timeline
      addTimeout(() => setSceneStep(1), 400)   // Code core in validation chamber
      addTimeout(() => setSceneStep(2), 1400)  // Syntax (Pass) & Boundary (Pass)
      addTimeout(() => setSceneStep(3), 2800)  // Complexity (FAIL - bar spikes & core turns red)
      addTimeout(() => setSceneStep(4), 4200)  // Feedback packet shoots back to Generator Attempt node
      addTimeout(() => setSceneStep(5), 5400)  // Attempt 2: Revised code arrives, ALL PASS (green)
      addTimeout(() => setSceneStep(6), 6600)  // Validated Code Package shoots right
      addTimeout(() => {
        if (isPlaying) handleNext()
      }, 7800)
    } else if (currentScene === 7) {
      // Scene 7 timeline
      addTimeout(() => setSceneStep(1), 400)   // Model swap: Qwen exits left, Llama Judge enters right
      addTimeout(() => setSceneStep(2), 1800)  // Candidate AST arrives, Judge Core active
      addTimeout(() => setSceneStep(3), 3200)  // Iteration 1: Quality Beam REJECT (red), feedback packet
      addTimeout(() => setSceneStep(4), 5000)  // Iteration 2: Candidate update, ALL CHECKS ACCEPT (green)
      addTimeout(() => setSceneStep(5), 6800)  // Final Side-by-Side Comparison (Original vs Refactored)
      addTimeout(() => {
        if (isPlaying) handleNext()
      }, 9200)
    }

    return () => clearAllTimeouts()
  }, [currentScene, isPlaying])

  const handleNext = () => {
    setCurrentScene((prev) => (prev < 7 ? prev + 1 : 1))
  }

  const handlePrev = () => {
    setCurrentScene((prev) => (prev > 1 ? prev - 1 : 7))
  }

  const handleReset = () => {
    clearAllTimeouts()
    setSceneStep(0)
    setCurrentScene(1)
  }

  const activeInfo = sceneInfos[currentScene - 1]

  return (
    <div className="w-full min-h-screen bg-[#0f111a] text-[#cdd6f4] font-sans flex flex-col justify-between select-none overflow-x-hidden relative">
      {/* Dynamic Embedded Styling for faithfully capturing simulation keyframes & CSS vars */}
      <style jsx global>{`
        :root {
          --bg-color: #0f111a;
          --editor-bg: #1e1e2e;
          --text-color: #cdd6f4;
          --keyword-color: #cba6f7;
          --class-color: #f9e2af;
          --string-color: #a6e3a1;
          --method-color: #89b4fa;
          --border-color: rgba(255, 255, 255, 0.12);
          --glow-color: rgba(137, 180, 250, 0.3);
        }

        .kw { color: var(--keyword-color); font-weight: bold; }
        .cl { color: var(--class-color); font-weight: bold; }
        .str { color: var(--string-color); }
        .mth { color: var(--method-color); }
        .sym { color: #89dceb; }

        .blinking-cursor {
          display: inline-block;
          width: 8px;
          height: 18px;
          background-color: var(--text-color);
          vertical-align: middle;
          animation: simulationBlink 0.8s step-end infinite;
        }

        @keyframes simulationBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes flowDash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes flowDashReverse {
          to { stroke-dashoffset: 20; }
        }
        @keyframes pulseHexFast {
          from { transform: translate(-50%, -50%) scale(1.02); box-shadow: 0 0 20px var(--string-color); }
          to { transform: translate(-50%, -50%) scale(1.12); box-shadow: 0 0 40px var(--string-color); }
        }
        @keyframes pulseJudgeCore {
          from { box-shadow: 0 0 20px rgba(249, 226, 175, 0.2); }
          to { box-shadow: 0 0 50px rgba(249, 226, 175, 0.5); }
        }

        .flow-line-dash {
          stroke-dasharray: 6, 6;
          animation: flowDash 15s linear infinite;
        }

        .glow-laser {
          box-shadow: 0 0 15px 4px #22d3ee, 0 0 30px 8px rgba(34, 211, 238, 0.5);
        }
      `}</style>

      {/* Grid overlay and background glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      <NoiseOverlay opacity={0.03} />
      <HorizonGlow glowPosition="center" glowColor="blue" sparkleCount={12} showHorizonLine={false} />

      {/* Top Header Navigation */}
      <header className="relative z-20 max-w-6xl mx-auto w-full pt-4 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wider">HORIZON ORCHESTRATION LAB</span>
          </div>
        </div>

        {/* Scene Navigation Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#121218] border border-white/10 p-1 rounded-xl font-mono text-[11px] overflow-x-auto max-w-full">
          {sceneInfos.map((sc) => (
            <button
              key={sc.num}
              onClick={() => {
                clearAllTimeouts()
                setSceneStep(0)
                setCurrentScene(sc.num)
              }}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold whitespace-nowrap cursor-pointer ${
                currentScene === sc.num
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              0{sc.num}
            </button>
          ))}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
            title={isPlaying ? "Pause Timeline" : "Play Timeline"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Kinetic Simulation Canvas */}
      <main className="max-w-6xl mx-auto w-full my-auto flex flex-col justify-center relative z-10 p-4 md:p-6">
        {/* Active Scene Badge Metadata */}
        <div className="flex flex-wrap items-center justify-between mb-3 px-2 font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-widest text-purple-300 uppercase font-bold">
              {activeInfo.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/50">
              Model: <strong className="text-cyan-300">{activeInfo.model}</strong>
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold tracking-wider">
              VRAM: {activeInfo.vram}
            </span>
          </div>
        </div>

        {/* Outer Frame with Prev/Next controls */}
        <div className="relative flex items-center">
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-6 z-40 p-3 rounded-full bg-[#121218] border border-white/15 text-white/80 hover:text-purple-400 hover:border-purple-500/40 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="w-full bg-[#121218] border border-white/15 rounded-2xl p-4 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative min-h-[520px] flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.03, y: -10 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col justify-center"
              >
                {renderSceneContent(currentScene, sceneStep, handleNext)}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-6 z-40 p-3 rounded-full bg-[#121218] border border-white/15 text-white/80 hover:text-purple-400 hover:border-purple-500/40 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Footer info bar */}
      <footer className="relative z-20 py-3 text-center text-xs text-white/40 font-mono border-t border-white/5 bg-[#070709]">
        <span>Horizon AI Code Refactoring Simulation &bull; Next.js Client Component &bull; 7 Cinematic Stages</span>
      </footer>
    </div>
  )
}

/* =========================================================================
   SCENE DISPATCHER & SUB-SCENE COMPONENTS
   ========================================================================= */

function renderSceneContent(sceneIdx: number, step: number, onNext: () => void) {
  switch (sceneIdx) {
    case 1:
      return <ReactScene1 step={step} onNext={onNext} />
    case 2:
      return <ReactScene2 step={step} />
    case 3:
      return <ReactScene3 step={step} />
    case 4:
      return <ReactScene4 step={step} />
    case 5:
      return <ReactScene5 step={step} />
    case 6:
      return <ReactScene6 step={step} />
    case 7:
      return <ReactScene7 step={step} />
    default:
      return null
  }
}

/* -------------------------------------------------------------------------
   SCENE 1: User Input Animation & Code Ingestion
   ------------------------------------------------------------------------- */
function ReactScene1({ step, onNext }: { step: number; onNext: () => void }) {
  const fullCode = `public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {
        for(Student s : students) {
            System.out.println(s.getName());
        }
    }
}`

  const directive = "Refactor this Java code to improve readability, reduce duplicated code, and optimize performance."

  const displayedCode =
    step >= 2
      ? fullCode
      : step === 1
      ? "public class StudentManager {\n    private List<Student> students;\n"
      : "pub"

  const displayedPrompt =
    step >= 3
      ? directive
      : step === 2
      ? "Refactor this Java code..."
      : ""

  return (
    <div className="space-y-6 font-mono max-w-4xl mx-auto w-full">
      {/* Editor Window */}
      <motion.div
        animate={{
          borderColor: step >= 3 ? "rgba(34,211,238,0.6)" : "rgba(255,255,255,0.15)",
          boxShadow: step >= 3 ? "0 0 35px rgba(34,211,238,0.2)" : "0 0 0px transparent",
        }}
        className="bg-[#1e1e2e] rounded-xl border p-5 relative overflow-hidden transition-all shadow-2xl"
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-xs text-white/60 ml-2 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> StudentManager.java
            </span>
          </div>
          <span className="text-[10px] text-cyan-300 font-bold bg-cyan-500/15 px-2.5 py-0.5 rounded border border-cyan-500/30">
            {step >= 3 ? "AST INGESTION READY" : "TYPING CODE"}
          </span>
        </div>

        <pre className="text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[170px] text-white/90">
          <code>
            {displayedCode.split("\n").map((line, lIdx) => (
              <div key={lIdx} className="flex">
                <span className="w-6 text-white/20 select-none text-right pr-3 shrink-0 text-[11px]">
                  {lIdx + 1}
                </span>
                <span className="whitespace-pre">
                  {line.split(/(\bpublic\b|\bclass\b|\bprivate\b|\bvoid\b|\bfor\b|\bList\b|\bStudentManager\b|\bStudent\b|\bSystem\b|\bout\b|\bprintln\b|\bgetName\b|\baddStudent\b|\bdisplayStudents\b)/g).map((tok, tIdx) => {
                    if (["public", "class", "private", "void", "for"].includes(tok)) return <span key={tIdx} className="kw">{tok}</span>
                    if (["StudentManager", "List", "Student", "System"].includes(tok)) return <span key={tIdx} className="cl">{tok}</span>
                    if (["addStudent", "displayStudents", "out", "println", "getName"].includes(tok)) return <span key={tIdx} className="mth">{tok}</span>
                    return <span key={tIdx}>{tok}</span>
                  })}
                </span>
              </div>
            ))}
          </code>
          {step < 3 && <span className="blinking-cursor ml-1" />}
        </pre>
      </motion.div>

      {/* Refactor Directive Window */}
      <motion.div
        animate={{
          borderColor: step >= 3 ? "#22d3ee" : "rgba(255,255,255,0.12)",
          backgroundColor: step >= 3 ? "rgba(34,211,238,0.06)" : "rgba(30,30,46,0.5)",
        }}
        className="p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all"
      >
        <div className="flex-1 w-full space-y-1.5">
          <div className="text-[10px] uppercase text-cyan-300 font-bold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Refactoring Directive Input
          </div>
          <div className="text-xs text-white/90 bg-[#0f111a] px-3.5 py-2.5 rounded-lg border border-white/10 leading-relaxed font-mono">
            {displayedPrompt || "Awaiting user directive prompt..."}
            {step === 2 && <span className="blinking-cursor ml-1" />}
          </div>
        </div>

        <motion.button
          onClick={onNext}
          animate={{
            scale: step >= 4 ? [1, 1.05, 1] : 1,
          }}
          className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shrink-0 ${
            step >= 4
              ? "bg-emerald-400 text-black border-2 border-emerald-300 shadow-[0_0_20px_#10B981]"
              : "bg-cyan-500 text-black hover:bg-cyan-400 border border-cyan-300"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{step >= 4 ? "SYSTEM PRIMED" : "REFACTOR CODE"}</span>
        </motion.button>
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   SCENE 2: System Architecture & Session Dispatch
   ------------------------------------------------------------------------- */
function ReactScene2({ step }: { step: number }) {
  return (
    <div className="relative w-full h-[460px] flex flex-col items-center justify-center font-mono">
      {/* Canvas SVG for curved connection paths between nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
        {/* Path UI -> WS */}
        <path
          d="M 500 120 L 500 210"
          stroke={step >= 3 ? "#cba6f7" : "rgba(255,255,255,0.15)"}
          strokeWidth="2"
          className={step >= 3 ? "flow-line-dash" : ""}
          fill="none"
        />
        {/* Path WS -> Backend */}
        <path
          d="M 500 270 C 500 330, 300 330, 300 360"
          stroke={step >= 4 ? "#cba6f7" : "rgba(255,255,255,0.15)"}
          strokeWidth="2"
          className={step >= 4 ? "flow-line-dash" : ""}
          fill="none"
        />
        {/* Path Backend -> Session */}
        <path
          d="M 410 390 L 590 390"
          stroke={step >= 5 ? "#a6e3a1" : "rgba(255,255,255,0.15)"}
          strokeWidth="2"
          className={step >= 5 ? "flow-line-dash" : ""}
          fill="none"
        />
      </svg>

      {/* Nodes Container */}
      <div className="relative z-10 w-full h-full max-w-4xl">
        {/* 1. UI Node */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : -20 }}
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 bg-[#1e1e2e] border border-white/20 rounded-xl p-3 text-center shadow-xl"
        >
          <div className="text-2xl mb-1">💻</div>
          <div className="text-xs font-bold text-white tracking-wider">USER INTERFACE</div>
          <div className="text-[10px] text-white/40">Local Client</div>
        </motion.div>

        {/* 2. WebSocket Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: step >= 2 ? 1 : 0,
            scale: step >= 2 ? 1 : 0.8,
            borderColor: step >= 3 ? "#89b4fa" : "rgba(255,255,255,0.2)",
            boxShadow: step >= 3 ? "0 0 25px rgba(137,180,250,0.3)" : "none",
          }}
          className="absolute top-[35%] left-1/2 -translate-x-1/2 w-52 bg-[#1e1e2e]/90 border rounded-xl p-3 text-center shadow-xl"
        >
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs font-bold text-white tracking-wider">WebSocket Dispatcher</div>
          <div className="text-[10px] text-cyan-300">Bi-Directional AST Stream</div>
        </motion.div>

        {/* 3. Backend Orchestrator Node */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: step >= 2 ? 1 : 0,
            x: step >= 2 ? 0 : -30,
            borderColor: step >= 4 ? "#cba6f7" : "rgba(255,255,255,0.2)",
          }}
          className="absolute top-[62%] left-[20%] -translate-x-1/2 w-56 bg-[#1e1e2e] border rounded-xl p-3.5 text-center shadow-xl"
        >
          <div className="text-2xl mb-1">⚙️</div>
          <div className="text-xs font-bold text-purple-300 tracking-wider">Horizon Backend</div>
          <div className="text-[10px] text-white/50">Pipeline Orchestrator</div>
        </motion.div>

        {/* 4. Session Manager Node */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{
            opacity: step >= 2 ? 1 : 0,
            x: step >= 2 ? 0 : 30,
            borderColor: step >= 5 ? "#a6e3a1" : "rgba(255,255,255,0.2)",
            boxShadow: step >= 5 ? "0 0 30px rgba(166,227,161,0.2)" : "none",
          }}
          className="absolute top-[62%] left-[80%] -translate-x-1/2 w-56 bg-purple-500/10 border rounded-xl p-3.5 text-center shadow-xl"
        >
          <div className="text-2xl mb-1">🗄️</div>
          <div className="text-xs font-bold text-emerald-300 tracking-wider">Session Manager</div>
          <div className="mt-1 text-[10px] bg-black/40 p-1.5 rounded font-mono text-emerald-400 border border-emerald-500/30">
            SESSION #HZN-001 <strong className="text-emerald-300">{step >= 5 ? "ACTIVE" : "INIT..."}</strong>
          </div>
        </motion.div>

        {/* Animated Data Packet */}
        <motion.div
          animate={{
            opacity: step >= 1 && step < 5 ? 1 : step >= 5 ? 0 : 0,
            top: step <= 2 ? "50%" : step === 3 ? "35%" : step === 4 ? "62%" : "62%",
            left: step <= 3 ? "50%" : step === 4 ? "30%" : "80%",
            scale: step === 3 ? 1.2 : step === 4 ? 0.9 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold text-xs shadow-[0_0_20px_#cba6f7] z-30"
        >
          &#123; Request Packet &#125;
        </motion.div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   SCENE 3: Baseline Chamber Analysis & AST Laser Scan
   ------------------------------------------------------------------------- */
function ReactScene3({ step }: { step: number }) {
  return (
    <div className="relative w-full h-[460px] flex flex-col items-center justify-center font-mono">
      {/* SVG Connecting Beams from central code core to 3 analysis modules */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
        {/* Beam to Syntax */}
        <line
          x1="500" y1="270" x2="240" y2="270"
          stroke={step >= 1 ? "#38bdf8" : "rgba(255,255,255,0.1)"}
          strokeWidth="2"
          strokeDasharray="6,6"
          className={step >= 1 ? "flow-line-dash" : ""}
        />
        {/* Beam to Semantic */}
        <line
          x1="500" y1="270" x2="760" y2="270"
          stroke={step >= 2 ? "#f9e2af" : "rgba(255,255,255,0.1)"}
          strokeWidth="2"
          strokeDasharray="6,6"
          className={step >= 2 ? "flow-line-dash" : ""}
        />
        {/* Beam to Complexity */}
        <line
          x1="500" y1="270" x2="500" y2="450"
          stroke={step >= 3 ? "#ef4444" : "rgba(255,255,255,0.1)"}
          strokeWidth="2"
          strokeDasharray="6,6"
          className={step >= 3 ? "flow-line-dash" : ""}
        />
      </svg>

      {/* 1. Syntax Module (Left) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -40 }}
        className={`absolute top-[45%] left-[18%] -translate-x-1/2 -translate-y-1/2 w-48 bg-[#1e1e2e]/90 border p-4 rounded-2xl flex flex-col items-center justify-center shadow-xl ${
          step >= 1 ? "border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.2)]" : "border-white/10"
        }`}
      >
        <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider mb-2">Syntax Module</span>
        <svg className="w-24 h-16" viewBox="0 0 100 80">
          <line x1="50" y1="15" x2="25" y2="45" stroke="#38bdf8" strokeWidth="2" />
          <line x1="50" y1="15" x2="75" y2="45" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="50" cy="15" r="7" fill="#38bdf8" />
          <circle cx="25" cy="45" r="7" fill={step >= 1 ? "#a6e3a1" : "#38bdf8"} />
          <circle cx="75" cy="45" r="7" fill={step >= 1 ? "#cba6f7" : "#38bdf8"} />
        </svg>
        <span className="text-[10px] text-sky-200 font-bold mt-1">javalang AST Unit</span>
      </motion.div>

      {/* 2. Semantic Module (Right) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : 40 }}
        className={`absolute top-[45%] left-[82%] -translate-x-1/2 -translate-y-1/2 w-48 bg-[#1e1e2e]/90 border p-4 rounded-2xl flex flex-col items-center justify-center shadow-xl ${
          step >= 2 ? "border-amber-400 shadow-[0_0_25px_rgba(249,226,175,0.2)]" : "border-white/10"
        }`}
      >
        <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider mb-2">Semantic Reticle</span>
        <div className="relative my-1">
          <Target className={`w-10 h-10 ${step >= 2 ? "text-amber-400 animate-spin" : "text-white/30"}`} />
        </div>
        <span className="text-[10px] text-amber-300 font-bold mt-1 text-center">
          {step >= 2 ? "FLAGGED: IMPERATIVE LOOP" : "SCANNING PATTERNS"}
        </span>
      </motion.div>

      {/* 3. Complexity Module (Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 30 }}
        className={`absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 bg-[#1e1e2e]/90 border p-3 rounded-2xl flex flex-col items-center justify-center shadow-xl ${
          step >= 3 ? "border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)]" : "border-white/10"
        }`}
      >
        <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider mb-1">Complexity Module</span>
        <div className="text-xl font-bold text-red-400 font-mono my-0.5">
          {step >= 3 ? "O(N) High CC=14" : "CC Baseline"}
        </div>
        <span className="text-[9px] text-white/50">lizard metrics analyzer</span>
      </motion.div>

      {/* Center Code Core / Laser Scanning Container */}
      <div className="relative z-20 w-80 bg-[#1e1e2e] border border-white/20 rounded-xl p-4 shadow-2xl overflow-hidden font-mono text-xs">
        {step < 4 ? (
          <>
            <div className="text-[10px] text-cyan-300 font-bold border-b border-white/10 pb-1.5 mb-2 flex items-center justify-between">
              <span>AST BASELINE SCAN</span>
              <span className="animate-pulse">LASER SWEEP</span>
            </div>

            <div className="space-y-1 relative">
              <div className="text-white/70">public class StudentManager &#123;</div>
              <div className="text-white/50 pl-2">private List&lt;Student&gt; students;</div>
              <div
                className={`py-1 px-1.5 rounded transition-all ${
                  step >= 2 ? "bg-amber-500/20 text-amber-200 border-l-2 border-amber-400 font-bold scale-[1.02]" : "text-white/70"
                }`}
              >
                for(Student s : students) &#123; System.out.println(s.getName()); &#125;
              </div>
              <div className="text-white/70">&#125;</div>

              {/* Glowing Cyan Laser Sweep Line */}
              {step === 2 && (
                <motion.div
                  animate={{ top: ["0%", "90%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-1 bg-cyan-400 glow-laser z-30 pointer-events-none"
                />
              )}
            </div>
          </>
        ) : (
          /* Step 4: Consolidated Baseline Profile Artifact */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-3 py-2"
          >
            <div className="text-xs font-bold text-emerald-400 tracking-wider">BASELINE PROFILE ARTIFACT</div>
            <div className="flex justify-center gap-4 text-xs font-bold font-mono">
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981]" />
                <span className="text-[10px] text-white/50 mt-1">SYN</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981]" />
                <span className="text-[10px] text-white/50 mt-1">SEM</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                <span className="text-[10px] text-white/50 mt-1">CMP</span>
              </div>
            </div>
            <div className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 py-1 rounded border border-emerald-500/40">
              TARGET ISOLATED FOR PHASE 3
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   SCENE 4: Strategy Planner (SSIS Planner & AST Targeting)
   ------------------------------------------------------------------------- */
function ReactScene4({ step }: { step: number }) {
  return (
    <div className="relative w-full h-[460px] flex flex-col items-center justify-center font-mono space-y-4">
      {/* Planner Model Identity Badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: step >= 1 ? 0 : -20, opacity: step >= 1 ? 1 : 0 }}
        className="px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
      >
        <Brain className="w-4 h-4 text-purple-400" />
        <span>PLANNER ENGINE: Qwen2.5-Coder-3B-Instruct (4-bit SLM)</span>
      </motion.div>

      {/* Main Visual Workspace */}
      <div className="relative w-full max-w-3xl h-[360px] flex items-center justify-center">
        {/* Core Rotating Rings Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-72 h-72 rounded-full border-2 border-dashed border-purple-400 animate-[spinSlow_20s_linear_infinite]" />
          <div className="absolute w-52 h-52 rounded-full border border-cyan-400 border-dashed animate-[spinReverse_15s_linear_infinite]" />
        </div>

        {/* Step 2: Intent Packet Formation */}
        {step === 2 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center text-3xl shadow-[0_0_30px_#cba6f7] z-20"
          >
            🎯
          </motion.div>
        )}

        {/* Step 3: AST Structural Map */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[460px] bg-[#1e1e2e]/90 border border-white/20 rounded-xl p-4 shadow-2xl z-20 text-center"
          >
            <div className="text-xs text-purple-300 font-bold mb-3 uppercase">Structural AST Map &amp; Target Lock</div>
            <svg className="w-full h-44" viewBox="0 0 400 160">
              {/* Edges */}
              <line x1="200" y1="35" x2="110" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <line x1="200" y1="35" x2="290" y2="85" stroke="#ff5f56" strokeWidth="3" strokeDasharray="4,4" />
              <line x1="290" y1="85" x2="290" y2="135" stroke="#ff5f56" strokeWidth="3" strokeDasharray="4,4" />

              {/* Class Root */}
              <rect x="130" y="10" width="140" height="30" rx="6" fill="#121218" stroke="rgba(255,255,255,0.3)" />
              <text x="200" y="30" fill="#cdd6f4" fontSize="11" textAnchor="middle">class StudentManager</text>

              {/* Left Method */}
              <rect x="50" y="70" width="120" height="30" rx="6" fill="#121218" stroke="rgba(255,255,255,0.15)" opacity="0.4" />
              <text x="110" y="90" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">addStudent()</text>

              {/* Right Method */}
              <rect x="230" y="70" width="120" height="30" rx="6" fill="#121218" stroke="#ff5f56" />
              <text x="290" y="90" fill="#ff5f56" fontSize="10" fontWeight="bold" textAnchor="middle">displayStudents()</text>

              {/* Loop Target */}
              <rect x="220" y="120" width="140" height="30" rx="6" fill="rgba(255,95,86,0.2)" stroke="#ff5f56" />
              <text x="290" y="140" fill="#ff5f56" fontSize="10" fontWeight="bold" textAnchor="middle">for(Student s : students)</text>
            </svg>
          </motion.div>
        )}

        {/* Step 4: Blueprint Artifact Cards */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 z-20"
          >
            <div className="bg-[#1e1e2e] border-t-2 border-t-red-400 border-white/10 rounded-xl p-4 w-36 text-center shadow-xl">
              <div className="text-2xl mb-1 text-red-400">🎯</div>
              <div className="text-[11px] font-bold text-white uppercase">1. Target Loop</div>
              <div className="text-[9px] text-white/40 mt-1">Imperative AST</div>
            </div>
            <div className="text-purple-400 text-xl font-bold">&rarr;</div>
            <div className="bg-[#1e1e2e] border-t-2 border-t-purple-400 border-white/10 rounded-xl p-4 w-36 text-center shadow-xl">
              <div className="text-2xl mb-1 text-purple-400">✂️</div>
              <div className="text-[11px] font-bold text-white uppercase">2. Extract Logic</div>
              <div className="text-[9px] text-white/40 mt-1">AST Mutation</div>
            </div>
            <div className="text-purple-400 text-xl font-bold">&rarr;</div>
            <div className="bg-[#1e1e2e] border-t-2 border-t-emerald-400 border-white/10 rounded-xl p-4 w-36 text-center shadow-xl">
              <div className="text-2xl mb-1 text-emerald-400">✨</div>
              <div className="text-[11px] font-bold text-white uppercase">3. Stream Code</div>
              <div className="text-[9px] text-white/40 mt-1">Declarative Stream</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Step 5: Execution Package Output */}
      {step >= 5 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 text-black font-bold text-xs shadow-[0_0_25px_rgba(203,166,247,0.4)]"
        >
          [ EXECUTION PLAN PACKAGE DISPATCHED TO GENERATOR ]
        </motion.div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------
   SCENE 5: Generator Engine & Code Streaming
   ------------------------------------------------------------------------- */
function ReactScene5({ step }: { step: number }) {
  const streamedRefactor = `public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {
        students.stream()
                .map(Student::getName)
                .forEach(System::println);
    }
}`

  return (
    <div className="space-y-4 font-mono max-w-5xl mx-auto w-full">
      {/* Generator Engine Model Identity */}
      <div className="flex justify-center">
        <div className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>GENERATOR ENGINE: Qwen2.5-Coder-3B-Instruct</span>
        </div>
      </div>

      {/* Split View Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Left: Original Code */}
        <div className="bg-[#1e1e2e] border border-white/15 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-black/30 px-4 py-2 border-b border-white/10 font-bold text-red-400 flex items-center justify-between">
            <span>Original (Imperative)</span>
            <span className="text-[10px] text-white/40">BEFORE</span>
          </div>
          <pre className="p-4 leading-relaxed overflow-x-auto text-white/70">
            <code>
{`public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {`}
              <span className="bg-red-500/20 text-red-300 border-l-2 border-red-500 block py-1 px-1 my-1">
{`        for(Student s : students) {
            System.out.println(s.getName());
        }`}
              </span>
{`    }
}`}
            </code>
          </pre>
        </div>

        {/* Right: Refactored Code Streaming */}
        <div className="bg-[#1e1e2e] border border-emerald-500/40 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(166,227,161,0.1)]">
          <div className="bg-black/30 px-4 py-2 border-b border-white/10 font-bold text-emerald-400 flex items-center justify-between">
            <span>Refactored (Declarative Stream)</span>
            <span className="text-[10px] text-emerald-400 animate-pulse">
              {step >= 4 ? "STREAM COMPLETE" : "REAL-TIME AST STREAM"}
            </span>
          </div>
          <pre className="p-4 leading-relaxed overflow-x-auto text-white/90">
            <code>
              {step >= 3 ? (
                <>
{`public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {`}
                  <span className="bg-emerald-500/20 text-emerald-300 border-l-2 border-emerald-400 block py-1 px-1 my-1 font-bold">
{`        students.stream()
                .map(Student::getName)
                .forEach(System::println);`}
                  </span>
{`    }
}`}
                </>
              ) : (
                <div className="text-white/40 py-8 text-center italic">
                  Ingesting Execution Plan Blueprint...
                </div>
              )}
            </code>
          </pre>
        </div>
      </div>

      {/* Completion Banner */}
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(166,227,161,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>REFACTORING GENERATION COMPLETE &bull; HANDING OFF TO VALIDATOR</span>
        </motion.div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------
   SCENE 6: Deterministic Validation Loop
   ------------------------------------------------------------------------- */
function ReactScene6({ step }: { step: number }) {
  return (
    <div className="relative w-full h-[460px] flex flex-col items-center justify-center font-mono">
      {/* Top Left Generator Revision Node */}
      <div className="absolute top-4 left-4 bg-[#1e1e2e] border border-white/15 rounded-xl p-3 text-xs z-20">
        <div className="font-bold text-purple-300 flex items-center gap-1.5">
          <RefreshCw className={`w-3.5 h-3.5 ${step === 4 ? "animate-spin text-red-400" : ""}`} /> Generator Revision Loop
        </div>
        <div className="text-[10px] text-white/50 mt-1">
          Attempt: <strong className={step >= 4 ? "text-amber-400" : "text-emerald-400"}>{step >= 4 ? "2" : "1"}</strong>
        </div>
      </div>

      {/* Validation Modules Grid */}
      <div className="grid grid-cols-3 gap-6 max-w-3xl w-full mb-8 z-20">
        {/* Syntax Check */}
        <div
          className={`p-4 rounded-xl border text-center transition-all ${
            step >= 2 ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(166,227,161,0.2)]" : "border-white/15 bg-[#1e1e2e]"
          }`}
        >
          <div className="text-[10px] text-white/50 uppercase font-bold">Check 1</div>
          <div className="text-xs font-bold text-white mt-1">Syntax Validation</div>
          <div className="mt-2 text-xs font-bold flex items-center justify-center gap-1">
            {step >= 2 ? (
              <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> PASS</span>
            ) : (
              <span className="text-white/40">CHECKING...</span>
            )}
          </div>
        </div>

        {/* Boundary Check */}
        <div
          className={`p-4 rounded-xl border text-center transition-all ${
            step >= 2 ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(166,227,161,0.2)]" : "border-white/15 bg-[#1e1e2e]"
          }`}
        >
          <div className="text-[10px] text-white/50 uppercase font-bold">Check 2</div>
          <div className="text-xs font-bold text-white mt-1">Boundary Shield</div>
          <div className="mt-2 text-xs font-bold flex items-center justify-center gap-1">
            {step >= 2 ? (
              <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> PASS</span>
            ) : (
              <span className="text-white/40">CHECKING...</span>
            )}
          </div>
        </div>

        {/* Complexity Check (Fails on step 3, Passes on step 5) */}
        <div
          className={`p-4 rounded-xl border text-center transition-all ${
            step === 3
              ? "border-red-500 bg-red-500/20 shadow-[0_0_25px_rgba(239,68,68,0.4)] animate-pulse"
              : step >= 5
              ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(166,227,161,0.2)]"
              : "border-white/15 bg-[#1e1e2e]"
          }`}
        >
          <div className="text-[10px] text-white/50 uppercase font-bold">Check 3</div>
          <div className="text-xs font-bold text-white mt-1">Complexity &amp; CC</div>
          <div className="mt-2 text-xs font-bold flex items-center justify-center gap-1">
            {step === 3 ? (
              <span className="text-red-400 flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> SPIKE FAIL</span>
            ) : step >= 5 ? (
              <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> CC &#8804; 4 PASS</span>
            ) : (
              <span className="text-white/40">CHECKING...</span>
            )}
          </div>
        </div>
      </div>

      {/* Central Core Code */}
      <motion.div
        animate={{
          borderColor: step === 3 ? "#ef4444" : step >= 5 ? "#a6e3a1" : "rgba(255,255,255,0.2)",
        }}
        className="w-96 bg-[#1e1e2e] border rounded-xl p-4 shadow-2xl text-xs font-mono text-center z-20"
      >
        <span className="text-purple-300 font-bold">students</span>.stream()<br />
        &nbsp;&nbsp;.map(Student::getName)<br />
        &nbsp;&nbsp;.forEach(System::println);
      </motion.div>

      {/* Step 4: Feedback packet flying back */}
      {step === 4 && (
        <motion.div
          initial={{ scale: 0, x: 100, y: 100 }}
          animate={{ scale: 1, x: -180, y: -120 }}
          transition={{ duration: 0.8 }}
          className="absolute z-30 px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold text-[11px] shadow-[0_0_20px_#ef4444] flex items-center gap-1"
        >
          <AlertTriangle className="w-3.5 h-3.5" /> ⚠️ O(N²) Detected &rarr; Revise Blueprint
        </motion.div>
      )}

      {/* Step 6: Validated Code Package Package Output */}
      {step >= 6 && (
        <motion.div
          initial={{ scale: 0, x: 0 }}
          animate={{ scale: 1, x: 280 }}
          transition={{ duration: 0.8 }}
          className="absolute z-30 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold text-xs shadow-[0_0_30px_#10B981] flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> VALIDATED CODE PACKAGE
        </motion.div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------
   SCENE 7: Multi-Model Evaluation & Heuristic Judge
   ------------------------------------------------------------------------- */
function ReactScene7({ step }: { step: number }) {
  return (
    <div className="relative w-full h-[480px] flex flex-col items-center justify-center font-mono space-y-4">
      {/* Model Swap Area */}
      <div className="flex justify-center gap-4 z-20">
        <motion.div
          animate={{
            opacity: step >= 1 ? 0.3 : 1,
            scale: step >= 1 ? 0.9 : 1,
          }}
          className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold"
        >
          Qwen Generator (UNLOAD)
        </motion.div>
        <motion.div
          animate={{
            scale: step >= 1 ? 1.05 : 1,
            borderColor: step >= 1 ? "#f9e2af" : "rgba(255,255,255,0.2)",
            boxShadow: step >= 1 ? "0 0 20px rgba(249,226,175,0.3)" : "none",
          }}
          className="px-4 py-1.5 rounded-full bg-amber-500/15 border text-amber-300 text-xs font-bold flex items-center gap-2"
        >
          <span>⚖️ EVALUATION ENGINE: Llama-3.2-3B-Instruct (Judge)</span>
        </motion.div>
      </div>

      {step < 5 ? (
        <>
          {/* Strategy Iteration Counter */}
          <div className="text-xs font-bold text-amber-300 tracking-wider">
            STRATEGY ITERATION: {step >= 4 ? "2 (RE-EVALUATION)" : "1"}
          </div>

          {/* AST Comparison Cards & Judge Sphere */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full items-center z-20">
            {/* Candidate AST */}
            <div className="bg-[#1e1e2e] border border-white/15 rounded-xl p-4 text-center shadow-xl">
              <div className="text-xs font-bold text-white mb-2">Generated Candidate AST</div>
              <svg className="w-full h-32" viewBox="0 0 200 100">
                <path d="M 100 15 L 100 45 L 100 75" stroke="#a6e3a1" strokeWidth="3" fill="none" />
                <circle cx="100" cy="15" r="6" fill="#a6e3a1" />
                <circle cx="100" cy="45" r="6" fill="#a6e3a1" />
                <circle cx="100" cy="75" r="6" fill="#a6e3a1" />
              </svg>
            </div>

            {/* Heuristic Judge Core */}
            <motion.div
              animate={{
                borderColor: step === 3 ? "#ef4444" : step >= 4 ? "#a6e3a1" : "#f9e2af",
                boxShadow:
                  step === 3
                    ? "0 0 35px rgba(239,68,68,0.4)"
                    : step >= 4
                    ? "0 0 35px rgba(166,227,161,0.4)"
                    : "0 0 20px rgba(249,226,175,0.2)",
              }}
              className="bg-[#1e1e2e] border-2 rounded-2xl p-5 text-center shadow-2xl flex flex-col items-center justify-center min-h-[160px]"
            >
              <div className="text-3xl mb-1">⚖️</div>
              <div className="text-xs font-bold text-white uppercase">Judge Verdict</div>
              <div
                className={`mt-2 text-sm font-bold px-3 py-1 rounded-full border ${
                  step === 3
                    ? "bg-red-500/20 text-red-400 border-red-500"
                    : step >= 4
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400"
                    : "bg-amber-500/20 text-amber-300 border-amber-400"
                }`}
              >
                {step === 3 ? "REJECT (QUALITY DEGRADATION)" : step >= 4 ? "ACCEPT (OUTPUT APPROVED)" : "EVALUATING INVARIANTS..."}
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        /* Step 5: Final Side-by-Side Comparison Panel */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-5xl bg-[#121218] border border-emerald-500/50 rounded-2xl p-5 shadow-[0_0_50px_rgba(166,227,161,0.2)] z-20 space-y-4"
        >
          <div className="text-center font-bold text-emerald-400 text-sm tracking-wider flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>VALIDATED OUTPUT &bull; STRATEGY ITERATION 2 APPROVED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Original Panel */}
            <div className="bg-[#1e1e2e] border border-red-500/40 rounded-xl overflow-hidden">
              <div className="bg-red-500/10 px-4 py-2 border-b border-red-500/30 text-red-400 font-bold">
                ⚠ ORIGINAL — IMPERATIVE LOOP
              </div>
              <pre className="p-4 leading-relaxed overflow-x-auto text-white/70">
                <code>
{`public class StudentManager {

    private List<Student> students;

    public void displayStudents() {
        for (Student s : students) {
            System.out.println(s.getName());
        }
    }
}`}
                </code>
              </pre>
            </div>

            {/* Refactored Panel */}
            <div className="bg-[#1e1e2e] border border-emerald-500/50 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(166,227,161,0.15)]">
              <div className="bg-emerald-500/10 px-4 py-2 border-b border-emerald-500/30 text-emerald-300 font-bold">
                ✅ REFACTORED — DECLARATIVE STREAM
              </div>
              <pre className="p-4 leading-relaxed overflow-x-auto text-emerald-300 font-bold">
                <code>
{`public class StudentManager {

    private List<Student> students;

    public void displayStudents() {
        students.stream()
                .map(Student::getName)
                .forEach(System::println);
    }
}`}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}