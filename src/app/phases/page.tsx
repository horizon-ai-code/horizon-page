'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Terminal, Cpu, ShieldCheck, 
  Activity, CheckCircle2, Sparkles, Database, Lock, RefreshCw, AlertTriangle
} from "lucide-react";

export default function HorizonOrchestrationStudio() {
  const [currentScene, setCurrentScene] = useState(0);
  const [subStep, setSubStep] = useState(0);

  // 6 Documented Orchestration Phases mapped into cinematic visual motion scenes
  const scenes = [
    { id: 0, title: "PHASE 1: INGESTION & BASELINE", tag: "INGEST" },
    { id: 1, title: "PHASE 2: STRATEGY & INTENT MAPPING", tag: "SSIS PLANNER" },
    { id: 2, title: "PHASE 3: PLAN EXECUTION & GENERATION", tag: "GENERATOR" },
    { id: 3, title: "PHASE 4: D2NR LOOP 1 — VALIDATION ROUTING", tag: "D2NR L1" },
    { id: 4, title: "PHASE 5: D2NR LOOP 2 — HEURISTIC ADJUDICATION", tag: "LLAMA JUDGE" },
    { id: 5, title: "PHASE 6: FINALIZATION & COMMIT MERGE", tag: "COMMIT" }
  ];

  // Auto-advance cinematic timeline loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSubStep((prev) => {
        if (prev < 3) return prev + 1;
        setCurrentScene((s) => (s < scenes.length - 1 ? s + 1 : 0));
        return 0;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [scenes.length]);

  const handleNext = () => {
    setSubStep(0);
    setCurrentScene((s) => Math.min(scenes.length - 1, s + 1));
  };

  const handlePrev = () => {
    setSubStep(0);
    setCurrentScene((s) => Math.max(0, s - 1));
  };

  return (
    <div className="w-full min-h-screen bg-[#070709] text-white font-mono flex flex-col justify-center items-center p-6 select-none overflow-hidden relative">
      {/* Background Grid and Cinematic Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      {/* Main Kinetic Stage */}
      <main className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center relative z-10">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs tracking-widest text-emerald-400/90 uppercase font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {scenes[currentScene].title}
          </span>
          <span className="text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/50 tracking-wider">
            {scenes[currentScene].tag}
          </span>
        </div>

        <div className="relative flex items-center">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-6 z-30 p-3 rounded-full bg-[#121218] border border-white/15 text-white/80 hover:text-emerald-400 hover:border-emerald-500/40 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
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
              className="w-full bg-[#0E0E14] border border-white/15 rounded-2xl p-8 shadow-[0_0_50px_rgba(16,185,129,0.12)] relative min-h-[460px] flex flex-col justify-center overflow-hidden"
            >
              {renderOrchestrationScene(currentScene, subStep)}
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute -right-6 z-30 p-3 rounded-full bg-[#121218] border border-white/15 text-white/80 hover:text-emerald-400 hover:border-emerald-500/40 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}

// Scene Dispatcher matching documented phases precisely
function renderOrchestrationScene(sceneIdx: number, subStep: number) {
  switch (sceneIdx) {
    case 0: return <Phase1Visualizer />;
    case 1: return <Phase2Visualizer />;
    case 2: return <Phase3Visualizer />;
    case 3: return <Phase4Visualizer />;
    case 4: return <Phase5Visualizer />;
    case 5: return <Phase6Visualizer />;
    default: return null;
  }
}

/* --- PHASE 1: Ingestion & Baseline --- */
function Phase1Visualizer() {
  return (
    <div className="space-y-6">
      <div className="bg-[#121218] rounded-xl border border-white/10 p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-white/50 ml-2">StudentManager.java</span>
        </div>
        <pre className="text-xs text-white/80 leading-relaxed font-mono overflow-x-auto">
          <code>{`public class StudentManager { private List<Student> students;
  public void addStudent(Student student) {
    students.add(student); } 
  public void displayStudents() {
    for(Student s : students) { System.out.println(s.getName()); } 
  }
}`}</code>
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-500/10 text-xs flex justify-between">
          <span className="text-white/60">javalang Scope</span>
          <span className="text-sky-300 font-bold">METHOD UNIT</span>
        </div>
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs flex justify-between">
          <span className="text-white/60">javac CSR</span>
          <span className="text-emerald-300 font-bold">100% PASS</span>
        </div>
        <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs flex justify-between">
          <span className="text-white/60">lizard CC</span>
          <span className="text-amber-300 font-bold">CC = 14</span>
        </div>
      </div>
    </div>
  );
}

/* --- PHASE 2: Strategy Block (SSIS Planner) --- */
function Phase2Visualizer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-500/10 text-xs text-purple-200 font-bold flex items-center justify-between">
          <span>Qwen-Coder 2.5 3B (4-bit VRAM)</span>
          <Cpu className="w-4 h-4 text-purple-400" />
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-300 font-bold">
          Intent: FLATTEN_CONDITIONAL
        </div>
        <div className="p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-xs text-cyan-300">
          Cognitive Reset: Context Isolation Active
        </div>
      </div>
      <div className="p-5 rounded-xl border border-white/10 bg-[#121218] relative overflow-hidden">
        <div className="text-[10px] text-white/40 mb-2 uppercase">AST Modification JSON Output</div>
        <pre className="text-xs text-emerald-400 font-mono">
          <code>{`{\n  "action": "REPLACE",\n  "targetScope": "method:displayStudents",\n  "strategy": "STREAM_DECLARATIVE"\n}`}</code>
        </pre>
      </div>
    </div>
  );
}

/* --- PHASE 3: Plan Execution --- */
function Phase3Visualizer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="p-5 rounded-xl border border-violet-500/30 bg-violet-500/5 flex items-center justify-center h-44">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="w-28 h-28 rounded-full border-2 border-violet-500/30 border-t-violet-400 flex items-center justify-center relative"
        >
          <Sparkles className="w-8 h-8 text-violet-400 animate-pulse" />
        </motion.div>
      </div>
      <div className="space-y-3">
        <div className="text-xs uppercase text-violet-400 font-bold">System Prompt Shift: GENERATOR</div>
        <div className="p-3.5 rounded-xl border border-white/10 bg-[#121218] text-xs font-mono text-emerald-300">
          {`// Streaming candidate code...\nprivate static final String[] templates = {"optimized"};`}
        </div>
      </div>
    </div>
  );
}

/* --- PHASE 4: D2NR Loop 1 Validation --- */
function Phase4Visualizer() {
  return (
    <div className="space-y-6">
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
      <div className="text-center text-xs text-white/50">
        Deterministic quarantine verifying syntax, complexity bounds, and intent math.
      </div>
    </div>
  );
}

/* --- PHASE 5: D2NR Loop 2 Judge --- */
function Phase5Visualizer() {
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
        <span className="px-5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] inline-block">
          VERDICT: ACCEPT (Semantic Consistency Verified)
        </span>
      </div>
    </div>
  );
}

/* --- PHASE 6: Finalization & Commit --- */
function Phase6Visualizer() {
  return (
    <div className="text-center space-y-6 py-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl font-extrabold text-emerald-400 tracking-tight"
      >
        COMMIT_SUCCESS
      </motion.div>
      <div className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
        Refactored candidate committed. Original codebase retained as safe fallback. Execution metrics logged.
      </div>
    </div>
  );
}