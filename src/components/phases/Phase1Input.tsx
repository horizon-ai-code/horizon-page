import React from "react";

export function Phase1Input() {
  return (
    <div id="container" className="scene">
      <div className="window" id="editor-window">
        <div className="window-header">
          <div className="window-controls">
            <div className="control-dot dot-red"></div>
            <div className="control-dot dot-yellow"></div>
            <div className="control-dot dot-green"></div>
          </div>
          <div className="window-title">StudentManager.java</div>
        </div>
        <div id="editor-area">
          <span id="code-content"></span>
          <span id="code-cursor" className="blinking-cursor"></span>
        </div>
      </div>

      <div className="window" id="request-window">
        <div id="request-area">
          <div id="request-input-container">
            <span id="request-text"></span>
            <span
              id="request-cursor"
              className="blinking-cursor"
              style={{ display: "none" }}
            ></span>
          </div>
          <button className="submit-btn" id="submit-btn" type="button">
            Refactor
          </button>
        </div>
      </div>
    </div>
  );
}
