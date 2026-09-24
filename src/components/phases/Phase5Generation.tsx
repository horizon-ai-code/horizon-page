import React from "react";

export function Phase5Generation() {
  return (
    <div id="scene5-container" className="scene">
      <div id="generator-model-badge" className="model-badge badge-generator">
        <div className="badge-icon">⚡</div>
        <div className="badge-details">
          <div className="badge-title">GENERATOR ENGINE</div>
          <div className="badge-model">Qwen2.5-Coder-3B-Instruct</div>
          <div className="badge-type">Small Language Model</div>
        </div>
      </div>

      <div
        id="gen-status"
        style={{
          position: "absolute",
          top: "15%",
          color: "var(--string-color)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "14px",
          letterSpacing: "1px",
          opacity: 0,
          transition: "opacity 0.5s",
          zIndex: 100,
          fontWeight: "bold",
          textShadow: "0 0 10px rgba(166, 227, 161, 0.5)",
        }}
      >
        RECEIVING EXECUTION PACKAGE...
      </div>

      <div
        id="incoming-blueprint"
        className="execution-package"
        style={{
          top: "-100px",
          transform: "translateX(-50%)",
          boxShadow: "0 0 40px rgba(166, 227, 161, 0.6)",
          background: "linear-gradient(90deg, var(--string-color), var(--method-color))",
        }}
      >
        [ EXECUTION PLAN ]
      </div>

      <div id="generator-engine">
        <div className="gen-ring outer"></div>
        <div className="gen-ring middle"></div>
        <div className="gen-ring inner"></div>
        <div className="gen-core-hex" id="gen-core-hex"></div>
        <div className="gen-center">⚙️</div>
      </div>

      <div id="code-compare-container">
        <div className="code-pane old-pane">
          <div className="pane-header">Original (Imperative)</div>
          <div id="old-code-content" className="pane-content"></div>
        </div>
        <div className="code-pane new-pane">
          <div className="pane-header" style={{ color: "var(--string-color)" }}>Refactored (Declarative Stream)</div>
          <div id="new-code-content" className="pane-content"></div>
        </div>
      </div>

      <div
        id="refactor-complete"
        className="baseline-badge"
        style={{ borderColor: "var(--string-color)", color: "var(--string-color)" }}
      >
        <span style={{ fontSize: "24px" }}>✨</span> REFACTORING COMPLETE
      </div>
    </div>
  );
}
