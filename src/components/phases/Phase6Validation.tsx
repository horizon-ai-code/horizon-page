import React from "react";
import { RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

export function Phase6Validation() {
  return (
    <div id="scene6-container" className="scene">
      <div className="val-title">PHASE 4: DETERMINISTIC VALIDATION</div>

      <svg
        id="val-svg-layer"
        style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: 1, pointerEvents: "none" }}
      >
        <line x1="50%" y1="50%" x2="50%" y2="25%" id="val-beam-syntax" className="val-beam" />
        <line x1="50%" y1="50%" x2="25%" y2="50%" id="val-beam-boundary" className="val-beam" />
        <line x1="50%" y1="50%" x2="75%" y2="50%" id="val-beam-complexity" className="val-beam" />
      </svg>

      <div id="val-retry-node" className="val-retry-node">
        <div className="badge-icon">
          <RefreshCw className="w-5 h-5 text-purple-400" />
        </div>
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Generator Revision</div>
        <div id="val-attempt" style={{ color: "rgba(255,255,255,0.5)" }}>Attempt: 1</div>
      </div>

      <div id="val-syntax" className="val-module syntax-mod">
        <div className="val-mod-title">Syntax Check</div>
        <svg width="60" height="60" viewBox="0 0 100 100">
          <rect id="syn-token-1" className="syn-rect" x="10" y="20" width="40" height="10" fill="var(--keyword-color)" rx="2" />
          <rect id="syn-token-2" className="syn-rect" x="40" y="45" width="50" height="10" fill="var(--string-color)" rx="2" />
          <rect id="syn-token-3" className="syn-rect" x="20" y="70" width="30" height="10" fill="var(--class-color)" rx="2" />
        </svg>
      </div>

      <div id="val-boundary" className="val-module boundary-mod">
        <div className="val-mod-title">Boundary Check</div>
        <svg width="60" height="60" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="var(--editor-bg)" stroke="var(--text-color)" strokeWidth="2" />
          <path
            id="bound-shield"
            className="bound-shield"
            d="M 20 50 A 30 30 0 1 1 80 50 A 30 30 0 1 1 20 50"
            fill="none"
            stroke="var(--method-color)"
            strokeWidth="4"
            opacity="0.2"
          />
        </svg>
      </div>

      <div id="val-complexity" className="val-module complexity-mod">
        <div className="val-mod-title">Complexity Check</div>
        <svg width="60" height="60" viewBox="0 0 100 100">
          <text x="25" y="95" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">BASE</text>
          <rect x="25" y="50" width="15" height="35" fill="var(--text-color)" opacity="0.4" rx="2" />

          <text x="60" y="95" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">GEN</text>
          <rect id="comp-bar-gen" className="comp-bar" x="60" y="75" width="15" height="10" fill="var(--class-color)" rx="2" />
        </svg>
      </div>

      <div id="val-core" className="val-core">
        <span className="kw">students</span>.stream()<br />
        &nbsp;&nbsp;.map(...)<br />
        &nbsp;&nbsp;.forEach(...)
      </div>

      <div id="val-feedback" className="val-feedback flex items-center gap-1">
        <AlertTriangle className="w-4 h-4 text-red-400" /> O(N²) Detected
      </div>

      <div id="validated-package" className="validated-package flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" /> VALIDATED CODE
      </div>
    </div>
  );
}
