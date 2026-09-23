"use client"

import React from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  Terminal,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  FileCode,
  Sparkles,
  Zap,
  Lock,
  Layers,
  Check,
  Binary,
  Code2
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface OrchestrationPayload {
  astHash: string
  rawCode: string
  nlDirective: string
  intentPacket?: { category: string; target: string }
  candidateCode?: string
  validationPassed?: boolean
  judgeVerdict?: string
  exitStatus?: string
}

export interface MotionPhase1Props {
  sceneStep: number
  payload: OrchestrationPayload
}

export function MotionPhase1({ sceneStep, payload }: MotionPhase1Props) {
  const isDirectiveActive = sceneStep >= 1
  const isLaserActive = sceneStep >= 1
  const isTelemetryActive = sceneStep >= 2
  const isOutcomeActive = sceneStep >= 3

  const codeLines = payload.rawCode.split("\n")

  // Framer Motion Stagger Variants for Step 2 Telemetry Table
  const tableContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.05,
      },
    },
  }

  const tableRowVariants: Variants = {
    hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 350, damping: 24 },
    },
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch font-mono">
      {/* Left Column: Code Ingestion & Scanner Deck */}
      <div className="space-y-4 flex flex-col justify-between">
        {/* Phase Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#22d3ee] tracking-wider">
            <Terminal className="w-4 h-4 text-[#22d3ee]" />
            <span>01 // Ingestion & Source Scan</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-ping" />
            <span>KINETIC INGESTION</span>
          </div>
        </div>

        {/* Step 1: NL Directive Badge Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            borderColor: isDirectiveActive ? "#10B981" : "rgba(255,255,255,0.08)",
            backgroundColor: isDirectiveActive ? "rgba(16,185,129,0.08)" : "#0A0A0E",
            boxShadow: isDirectiveActive
              ? "0 0 20px rgba(16,185,129,0.2)"
              : "0 0 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0E] relative overflow-hidden transition-all"
        >
          {/* Subtle glow background shift on active */}
          {isDirectiveActive && (
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#10B981]/10 rounded-full blur-xl pointer-events-none" />
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-[10px] uppercase font-bold px-2 py-0.5 rounded border transition-colors",
                    isDirectiveActive
                      ? "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40"
                      : "bg-white/5 text-white/40 border-white/10"
                  )}
                >
                  Natural Language Directive
                </span>
                {isDirectiveActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-[10px] text-[#10B981] font-bold"
                  >
                    <Sparkles className="w-3 h-3" /> Grounded
                  </motion.span>
                )}
              </div>
              <p className="text-xs md:text-sm text-white/90 font-mono font-medium leading-relaxed">
                &ldquo;{payload.nlDirective}&rdquo;
              </p>
            </div>

            <motion.div
              animate={{
                scale: isDirectiveActive ? [1, 1.2, 1] : 1,
                color: isDirectiveActive ? "#10B981" : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-lg bg-white/5 shrink-0 border border-white/5"
            >
              {isDirectiveActive ? (
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              ) : (
                <Code2 className="w-5 h-5 text-white/20" />
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Source Code Container + Vertical Laser Sweep */}
        <div className="relative rounded-xl bg-[#0A0A0E] border border-white/[0.08] overflow-hidden text-xs text-white/80 shadow-2xl flex-1 flex flex-col min-h-[260px]">
          {/* Editor Header Bar */}
          <div className="px-4 py-2.5 bg-[#070709] border-b border-white/[0.08] flex items-center justify-between text-[11px] text-white/50 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="ml-2 font-semibold text-white/70 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-[#22d3ee]" />
                SessionManager.java
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="text-white/30">JAVA 17</span>
              <span className="text-[#22d3ee]/80 font-bold">
                {isLaserActive ? "SCANNING..." : "IDLE"}
              </span>
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="p-4 overflow-x-auto relative flex-1 bg-[#070709]/60 font-mono text-[11.5px] leading-relaxed">
            {codeLines.map((line, idx) => (
              <div key={idx} className="flex hover:bg-white/[0.02] px-1 rounded transition-colors">
                <span className="w-7 select-none text-white/20 text-right pr-3 shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span className="text-white/90 whitespace-pre">{line}</span>
              </div>
            ))}

            {/* Vertical Cyan Laser Sweep Line across rawCode */}
            {isLaserActive && (
              <>
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-[#22d3ee] z-20 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 12px #22d3ee, 0 0 24px #22d3ee, 0 0 36px rgba(34, 211, 238, 0.8)",
                  }}
                  animate={{ top: ["4%", "92%", "4%"] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute left-0 right-0 h-10 bg-gradient-to-b from-[#22d3ee]/15 via-[#22d3ee]/5 to-transparent pointer-events-none z-10"
                  animate={{ top: ["0%", "88%", "0%"] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Telemetry Table & Outcome Card */}
      <div className="flex flex-col justify-between space-y-4">
        {/* Telemetry Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2 text-xs uppercase font-bold text-purple-400 tracking-wider">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>02 // Telemetry Matrix Grounding</span>
          </div>
          <span className="text-[10px] text-white/40">CPU AST ENGINE</span>
        </div>

        {/* Step 2: Telemetry Table Card */}
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0E] space-y-3 flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40 border-b border-white/[0.08] pb-2">
            <span>PARSER AGENT</span>
            <span>METRIC EXPRESSION</span>
            <span>GROUNDED VERDICT</span>
          </div>

          {/* Staggered Reveal of Telemetry Table */}
          {isTelemetryActive ? (
            <motion.div
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2.5 flex-1 flex flex-col justify-center"
            >
              {/* Row 1: javalang */}
              <motion.div
                variants={tableRowVariants}
                className="p-3 rounded-lg border border-[#22d3ee]/30 bg-[#22d3ee]/10 flex items-center justify-between transition-all"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#22d3ee] font-mono font-bold">javalang.parse()</span>
                  </div>
                  <div className="text-[10px] text-white/50">AST Structural Parser</div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/40 text-[10px] font-bold tracking-wide">
                    METHOD UNIT
                  </span>
                </div>
              </motion.div>

              {/* Row 2: javac */}
              <motion.div
                variants={tableRowVariants}
                className="p-3 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 flex items-center justify-between transition-all"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#10B981] font-mono font-bold">javac benchmark</span>
                  </div>
                  <div className="text-[10px] text-white/50">Syntax Compilation Ratio</div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 text-[10px] font-bold tracking-wide">
                    100% CSR
                  </span>
                </div>
              </motion.div>

              {/* Row 3: lizard.cc() */}
              <motion.div
                variants={tableRowVariants}
                className="p-3 rounded-lg border border-[#F59E0B]/30 bg-[#F59E0B]/10 flex items-center justify-between transition-all"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="text-[#F59E0B] font-mono font-bold">lizard.cc()</span>
                  </div>
                  <div className="text-[10px] text-white/50">Cyclomatic Complexity</div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 text-[10px] font-bold tracking-wide">
                    14 HIGH
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-8 text-center space-y-2 border border-dashed border-white/10 rounded-lg">
              <Binary className="w-6 h-6 text-white/20 animate-pulse" />
              <p className="text-xs text-white/40">Awaiting Telemetry Extraction (Step 2)...</p>
            </div>
          )}

          {/* Micro Telemetry Bar */}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/40">
            <span>AST SCAN DEPTH: 14 NODES</span>
            <span>STATUS: {isTelemetryActive ? "GROUNDED" : "PENDING"}</span>
          </div>
        </div>

        {/* Step 3: Bottom Outcome Card lights up solid cyan border locking AST_0 Memory Fingerprint */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            borderColor: isOutcomeActive ? "#22d3ee" : "rgba(255,255,255,0.08)",
            backgroundColor: isOutcomeActive ? "rgba(34,211,238,0.08)" : "#0A0A0E",
            boxShadow: isOutcomeActive
              ? "0 0 30px rgba(34,211,238,0.25)"
              : "0 0 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0E] relative overflow-hidden transition-all"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/50">
                  BASELINE LOCK STATUS
                </span>
                {isOutcomeActive && (
                  <span className="px-2 py-0.5 rounded bg-[#22d3ee]/20 text-[#22d3ee] text-[9px] font-bold uppercase border border-[#22d3ee]/30 animate-pulse">
                    FINGERPRINT LOCKED
                  </span>
                )}
              </div>
              <div className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isOutcomeActive ? "text-[#22d3ee]" : "text-white/30"
                  )}
                />
                <span>AST_0 Memory Fingerprint</span>
              </div>
            </div>

            {/* Hash Badge Seal */}
            <div className="text-right">
              {isOutcomeActive ? (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: [0.7, 1.12, 1], opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="px-3 py-1.5 rounded-lg bg-[#22d3ee]/20 border border-[#22d3ee]/50 text-[#22d3ee] font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  <Lock className="w-3.5 h-3.5 text-[#22d3ee]" />
                  <span>{payload.astHash}</span>
                </motion.div>
              ) : (
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/30 font-mono text-xs">
                  0x0000...0000
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
