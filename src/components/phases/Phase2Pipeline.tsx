import React from "react";
import { Monitor, Zap, Cpu, Database, ChevronDown } from "lucide-react";

export function Phase2Pipeline() {
  return (
    <div id="scene2-container" className="scene">
      <svg id="arch-canvas">
        <path id="line-fe-ws" className="flow-line" d=""></path>
        <path id="line-ws-be" className="flow-line" d=""></path>
        <path id="line-be-session" className="flow-line" d=""></path>
      </svg>

      <div id="node-frontend" className="arch-node">
        <div className="node-icon">
          <Monitor className="w-8 h-8 text-blue-400" />
        </div>
        <div className="node-title">USER INTERFACE</div>
      </div>

      <div id="node-ws" className="arch-node">
        <div className="node-icon">
          <Zap className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="node-title">WebSocket Connection</div>
      </div>

      <div id="node-backend" className="arch-node">
        <div className="node-icon">
          <Cpu className="w-8 h-8 text-purple-400" />
        </div>
        <div className="node-title">HorizonAI Backend</div>
        <div style={{ fontSize: "12px", color: "#bac2de", marginTop: "5px" }}>
          Orchestrator
        </div>
      </div>

      <div id="node-session" className="arch-node">
        <div className="node-icon">
          <Database className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="node-title">Session Manager</div>
        <div className="session-details" id="session-info">
          SESSION<br />
          #HZN-001<br />
          <span style={{ color: "var(--string-color)" }}>ACTIVE</span>
        </div>
      </div>

      <div className="data-packet" id="data-packet">
        {"{ Request }"}
      </div>

      <div id="particle-container"></div>

      <div id="next-phase-indicator">
        <div className="arrow-down">
          <ChevronDown className="w-6 h-6 inline-block" />
        </div>
        <div className="phase-text">Phase 1: Baseline Analysis</div>
      </div>
    </div>
  );
}
