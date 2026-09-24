import React from "react";
import { Brain, Target, Scissors, Sparkles, ArrowRight } from "lucide-react";

export function Phase4Decomposition() {
  return (
    <div id="scene4-container" className="scene">
      <div id="planner-model-badge" className="model-badge badge-planner">
        <div className="badge-icon">
          <Brain className="w-6 h-6 text-purple-400" />
        </div>
        <div className="badge-details">
          <div className="badge-title">PLANNER ENGINE</div>
          <div className="badge-model">Qwen2.5-Coder-3B-Instruct</div>
          <div className="badge-type">Small Language Model</div>
        </div>
      </div>

      <div
        id="input-baseline"
        className="data-packet"
        style={{
          width: "100px",
          fontSize: "10px",
          zIndex: 100,
          background: "var(--editor-bg)",
          border: "1px solid var(--border-color)",
          color: "var(--text-color)",
          position: "absolute",
          top: "-50px",
          left: "40%",
          transform: "translateX(-50%)",
          transition: "top 0.8s ease",
          opacity: 0,
        }}
      >
        [Baseline Code]
      </div>
      <div
        id="input-instruction"
        className="data-packet"
        style={{
          width: "100px",
          fontSize: "10px",
          zIndex: 100,
          background: "rgba(166, 227, 161, 0.2)",
          border: "1px solid var(--string-color)",
          color: "var(--string-color)",
          position: "absolute",
          top: "-50px",
          left: "60%",
          transform: "translateX(-50%)",
          transition: "top 0.8s ease",
          opacity: 0,
        }}
      >
        "Refactor..."
      </div>

      <div id="planner-core">
        <svg viewBox="0 0 500 500" width="100%" height="100%">
          <circle cx="250" cy="250" r="220" className="core-ring core-ring-outer" />
          <circle cx="250" cy="250" r="160" className="core-ring core-ring-middle" />
          <circle cx="250" cy="250" r="100" className="core-ring core-ring-inner" />
        </svg>
      </div>

      <div id="intent-packet">
        <Target className="w-8 h-8 text-emerald-400" />
      </div>

      <div id="ast-container">
        <svg id="ast-svg" width="100%" height="100%" viewBox="0 0 500 350">
          <path id="ast-edge-left" className="ast-edge" d="M 250 80 L 150 180" />
          <path id="ast-edge-right" className="ast-edge" d="M 250 80 L 350 180" />
          <path id="ast-edge-target" className="ast-edge" d="M 350 180 L 350 280" />

          <g id="ast-root" className="ast-node-group">
            <rect x="170" y="40" width="160" height="40" className="ast-rect" />
            <text x="250" y="65" className="ast-text">class StudentManager</text>
          </g>

          <g id="ast-var" className="ast-node-group">
            <rect x="70" y="160" width="160" height="40" className="ast-rect" />
            <text x="150" y="185" className="ast-text">method addStudent()</text>
          </g>

          <g id="ast-branch-r" className="ast-node-group">
            <rect x="270" y="160" width="160" height="40" className="ast-rect" />
            <text x="350" y="185" className="ast-text">method displayStudents()</text>
          </g>

          <g id="ast-issue" className="ast-node-group">
            <rect x="270" y="260" width="160" height="40" className="ast-rect" />
            <text x="350" y="285" className="ast-text">loop for(Student s)</text>
          </g>
        </svg>
      </div>

      <div id="synthesis-sphere"></div>

      <div id="blueprint-artifact">
        <div className="bp-card" id="bp-card1">
          <div className="bp-icon-large" style={{ color: "#ff5f56" }}>
            <Target className="w-6 h-6 inline-block" />
          </div>
          <div className="bp-card-title">Target Loop</div>
        </div>

        <div className="bp-arrow" id="bp-arrow1">
          <ArrowRight className="w-6 h-6 inline-block" />
        </div>

        <div className="bp-card" id="bp-card2">
          <div className="bp-icon-large" style={{ color: "var(--keyword-color)" }}>
            <Scissors className="w-6 h-6 inline-block" />
          </div>
          <div className="bp-card-title">Extract Logic</div>
        </div>

        <div className="bp-arrow" id="bp-arrow2">
          <ArrowRight className="w-6 h-6 inline-block" />
        </div>

        <div className="bp-card" id="bp-card3">
          <div className="bp-icon-large" style={{ color: "var(--string-color)" }}>
            <Sparkles className="w-6 h-6 inline-block" />
          </div>
          <div className="bp-card-title">Generate Stream</div>
        </div>
      </div>

      <div id="execution-package" className="execution-package">
        [ EXECUTION PLAN ]
      </div>
    </div>
  );
}
