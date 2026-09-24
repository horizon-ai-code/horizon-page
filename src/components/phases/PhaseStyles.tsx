import React from "react";

export function PhaseStyles() {
  return (
    <>
      <style>{`
        .refactor-animation-root {
            --bg-color: #0f111a;
            --editor-bg: #1e1e2e;
            --text-color: #cdd6f4;
            --keyword-color: #cba6f7;
            --class-color: #f9e2af;
            --string-color: #a6e3a1;
            --method-color: #89b4fa;
            --border-color: rgba(255, 255, 255, 0.1);
            --glow-color: rgba(137, 180, 250, 0.3);
        }

        .refactor-animation-root * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .refactor-animation-root {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
            position: relative;
        }

        .refactor-animation-root #container {
            width: 80%;
            max-width: 1000px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 1.5s ease-out, transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root #container.visible {
            opacity: 1;
            transform: scale(1);
        }

        .refactor-animation-root .window {
            background-color: var(--editor-bg);
            border-radius: 12px;
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px var(--glow-color);
            overflow: hidden;
            position: relative;
        }

        .refactor-animation-root .window-header {
            height: 36px;
            background-color: rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 16px;
        }

        .refactor-animation-root .window-controls {
            display: flex;
            gap: 8px;
        }

        .refactor-animation-root .control-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .refactor-animation-root .dot-red { background-color: #ff5f56; }
        .refactor-animation-root .dot-yellow { background-color: #ffbd2e; }
        .refactor-animation-root .dot-green { background-color: #27c93f; }

        .refactor-animation-root .window-title {
            margin-left: 16px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.5);
            font-family: monospace;
        }

        .refactor-animation-root #editor-area {
            height: 400px;
            padding: 24px;
            font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
            font-size: 16px;
            line-height: 1.6;
            overflow-y: auto;
            position: relative;
        }

        .refactor-animation-root #editor-area::-webkit-scrollbar {
            width: 10px;
        }
        .refactor-animation-root #editor-area::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
        }
        .refactor-animation-root #editor-area::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.2);
            border-radius: 5px;
        }

        .refactor-animation-root #code-content {
            white-space: pre-wrap;
            tab-size: 4;
        }

        .refactor-animation-root .kw { color: var(--keyword-color); font-weight: bold; }
        .refactor-animation-root .cl { color: var(--class-color); }
        .refactor-animation-root .str { color: var(--string-color); }
        .refactor-animation-root .mth { color: var(--method-color); }
        .refactor-animation-root .sym { color: #89dceb; }

        .refactor-animation-root #request-area {
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .refactor-animation-root #request-input-container {
            flex-grow: 1;
            background-color: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 16px;
            min-height: 60px;
            display: flex;
            align-items: center;
        }

        .refactor-animation-root #request-text {
            font-size: 16px;
            color: #bac2de;
            white-space: pre-wrap;
        }

        .refactor-animation-root .submit-btn {
            background-color: var(--keyword-color);
            color: #11111b;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.3s;
        }

        .refactor-animation-root .blinking-cursor {
            display: inline-block;
            width: 10px;
            height: 20px;
            background-color: var(--text-color);
            vertical-align: middle;
            animation: ra-blink 1s step-end infinite;
        }

        @keyframes ra-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        .refactor-animation-root #mouse-cursor {
            position: absolute;
            width: 24px;
            height: 24px;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1.5"><path d="M3 3l7 19 3-8 8-3z"/></svg>');
            pointer-events: none;
            z-index: 1000;
            top: 100%;
            left: 50%;
            transition: top 1s ease-in-out, left 1s ease-in-out;
            opacity: 0;
            filter: drop-shadow(2px 4px 4px rgba(0,0,0,0.5));
        }

        .refactor-animation-root #mouse-cursor.active {
            opacity: 1;
        }

        .refactor-animation-root .nav-btn {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(30, 30, 46, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.5);
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 2000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        .refactor-animation-root .nav-btn:hover {
            background: rgba(40, 40, 60, 0.8);
            color: rgba(255, 255, 255, 0.9);
            border-color: rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 15px rgba(137, 180, 250, 0.4);
            transform: translateY(-50%) scale(1.1);
        }

        .refactor-animation-root #prev-btn { left: 20px; }
        .refactor-animation-root #next-btn { right: 20px; }

        .refactor-animation-root #scene2-container {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 1s ease-out;
            z-index: 10;
        }

        .refactor-animation-root #scene2-container.visible {
            opacity: 1;
            pointer-events: auto;
        }

        .refactor-animation-root .data-packet {
            width: 80px;
            height: 60px;
            background: linear-gradient(135deg, var(--keyword-color), var(--method-color));
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #11111b;
            font-weight: bold;
            font-size: 12px;
            box-shadow: 0 0 20px var(--glow-color);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            z-index: 100;
        }

        .refactor-animation-root #arch-canvas {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 5;
        }

        .refactor-animation-root .flow-line {
            stroke: var(--border-color);
            stroke-width: 2;
            stroke-dasharray: 5, 5;
            fill: none;
        }

        .refactor-animation-root .flow-line.active {
            stroke: var(--keyword-color);
            animation: ra-dash 20s linear infinite;
        }

        @keyframes ra-dash {
            to { stroke-dashoffset: -1000; }
        }

        .refactor-animation-root .arch-node {
            background-color: var(--editor-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            position: absolute;
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-align: center;
            z-index: 10;
        }

        .refactor-animation-root .arch-node.visible {
            opacity: 1;
            transform: scale(1);
        }

        .refactor-animation-root .node-title {
            font-size: 14px;
            color: var(--text-color);
            font-weight: bold;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }

        .refactor-animation-root .node-icon {
            font-size: 32px;
            margin-bottom: 12px;
        }

        .refactor-animation-root #node-frontend {
            top: 15%; left: 50%;
            transform: translate(-50%, 0) scale(0.9);
            width: 200px;
        }
        .refactor-animation-root #node-frontend.visible {
            transform: translate(-50%, 0) scale(1);
        }

        .refactor-animation-root #node-ws {
            top: 40%; left: 50%;
            transform: translate(-50%, 0) scale(0.9);
            width: 180px;
            background-color: rgba(30, 30, 46, 0.8);
            border-color: var(--method-color);
            box-shadow: 0 0 15px rgba(137, 180, 250, 0.2);
        }
        .refactor-animation-root #node-ws.visible {
            transform: translate(-50%, 0) scale(1);
        }

        .refactor-animation-root #node-backend {
            top: 65%; left: 30%;
            transform: translate(-50%, 0) scale(0.9);
            width: 220px;
            border-color: var(--keyword-color);
        }
        .refactor-animation-root #node-backend.visible {
            transform: translate(-50%, 0) scale(1);
        }

        .refactor-animation-root #node-session {
            top: 65%; left: 70%;
            transform: translate(-50%, 0) scale(0.9);
            width: 200px;
            background-color: rgba(203, 166, 247, 0.1);
            border-color: var(--keyword-color);
        }
        .refactor-animation-root #node-session.visible {
            transform: translate(-50%, 0) scale(1);
        }

        .refactor-animation-root .session-details {
            font-family: monospace;
            font-size: 12px;
            color: var(--string-color);
            margin-top: 10px;
            background: rgba(0,0,0,0.3);
            padding: 8px;
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        .refactor-animation-root .session-details.visible {
            opacity: 1;
        }

        .refactor-animation-root #next-phase-indicator {
            position: absolute;
            bottom: 10%; left: 50%;
            transform: translate(-50%, 20px);
            opacity: 0;
            text-align: center;
            transition: all 1s ease;
        }

        .refactor-animation-root #next-phase-indicator.visible {
            opacity: 1;
            transform: translate(-50%, 0);
        }

        .refactor-animation-root .phase-text {
            color: var(--class-color);
            font-weight: bold;
            font-size: 16px;
            letter-spacing: 2px;
            margin-top: 10px;
        }

        .refactor-animation-root .arrow-down {
            font-size: 24px;
            color: var(--class-color);
            animation: ra-bounce 2s infinite;
        }

        @keyframes ra-bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        .refactor-animation-root #particle-container {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 90;
        }

        .refactor-animation-root #scene3-container {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 1s ease-out;
            z-index: 20;
        }

        .refactor-animation-root #scene3-container.visible {
            opacity: 1;
            pointer-events: auto;
        }

        .refactor-animation-root .chamber-wrapper {
            position: relative;
            width: 1000px;
            height: 600px;
            opacity: 0;
            transform: scale(0.95);
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root .chamber-wrapper.visible {
            opacity: 1;
            transform: scale(1);
        }

        .refactor-animation-root #chamber-svg-layer {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .refactor-animation-root .analysis-beam {
            fill: none;
            stroke: var(--border-color);
            stroke-width: 2;
            stroke-dasharray: 10, 10;
            opacity: 0.3;
            transition: all 0.5s ease;
        }

        .refactor-animation-root .analysis-beam.active {
            stroke: var(--keyword-color);
            opacity: 0.8;
            animation: ra-beamFlow 1s linear infinite;
        }

        .refactor-animation-root .analysis-beam.return {
            stroke: var(--string-color);
            opacity: 1;
            animation: ra-beamFlowReverse 0.8s linear infinite;
        }

        @keyframes ra-beamFlow { to { stroke-dashoffset: -20; } }
        @keyframes ra-beamFlowReverse { to { stroke-dashoffset: 20; } }

        .refactor-animation-root .chamber-core {
            position: absolute;
            top: 45%; left: 50%;
            transform: translate(-50%, -50%);
            width: 320px;
            background-color: var(--editor-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(137, 180, 250, 0.1);
            z-index: 10;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            line-height: 1.6;
            color: rgba(255,255,255,0.6);
            transition: all 0.8s ease;
            overflow: hidden;
        }

        .refactor-animation-root .chamber-core.scanning {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(137, 180, 250, 0.3);
            border-color: var(--method-color);
        }

        .refactor-animation-root .core-laser {
            position: absolute;
            left: 0; width: 100%; height: 2px;
            background-color: var(--method-color);
            box-shadow: 0 0 15px 5px rgba(137, 180, 250, 0.5);
            top: 10%;
            opacity: 0;
            z-index: 5;
        }

        .refactor-animation-root .code-row { transition: all 0.2s ease; padding: 0 5px; border-radius: 4px; }
        .refactor-animation-root .code-row.scanned { color: var(--text-color); text-shadow: 0 0 5px rgba(255,255,255,0.2); }
        .refactor-animation-root .code-row.target { color: var(--class-color); background: rgba(249, 226, 175, 0.15); }

        .refactor-animation-root .chamber-module {
            position: absolute;
            width: 180px; height: 180px;
            background: rgba(30, 30, 46, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 5;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            transition: all 0.5s ease;
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
        }

        .refactor-animation-root .chamber-module.visible { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        .refactor-animation-root .chamber-module.active { border-color: var(--keyword-color); box-shadow: 0 0 30px rgba(203, 166, 247, 0.2); }
        .refactor-animation-root .chamber-module.complete { border-color: var(--string-color); box-shadow: 0 0 30px rgba(166, 227, 161, 0.2); }

        .refactor-animation-root .chamber-module.mod-syntax { top: 45%; left: 15%; }
        .refactor-animation-root .chamber-module.mod-semantic { top: 45%; left: 85%; }
        .refactor-animation-root .chamber-module.mod-complexity { top: 85%; left: 50%; width: 220px; height: 120px; border-radius: 16px; }

        .refactor-animation-root .module-label {
            position: absolute;
            top: -25px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: rgba(255,255,255,0.5);
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .refactor-animation-root .mod-complexity .module-label { top: -20px; }

        .refactor-animation-root .syn-node { fill: var(--editor-bg); stroke: var(--border-color); stroke-width: 2; transition: all 0.3s ease; }
        .refactor-animation-root .syn-edge { stroke: var(--border-color); stroke-width: 2; transition: all 0.3s ease; }

        .refactor-animation-root .chamber-module.active .syn-node.a1 { fill: var(--string-color); stroke: var(--string-color); filter: drop-shadow(0 0 5px var(--string-color)); }
        .refactor-animation-root .chamber-module.active .syn-node.a2 { fill: var(--keyword-color); stroke: var(--keyword-color); filter: drop-shadow(0 0 5px var(--keyword-color)); transition-delay: 0.3s; }
        .refactor-animation-root .chamber-module.active .syn-node.a3 { fill: var(--method-color); stroke: var(--method-color); filter: drop-shadow(0 0 5px var(--method-color)); transition-delay: 0.6s; }
        .refactor-animation-root .chamber-module.active .syn-edge { stroke: var(--string-color); opacity: 0.5; }

        .refactor-animation-root .sem-target-ring { fill: none; stroke: var(--border-color); stroke-width: 1; stroke-dasharray: 4 4; animation: ra-spin 10s linear infinite; }
        .refactor-animation-root .sem-icon { fill: rgba(255,255,255,0.2); transition: all 0.5s ease; }
        .refactor-animation-root .sem-pulse { fill: none; stroke: var(--class-color); stroke-width: 2; opacity: 0; transform-origin: center; }

        .refactor-animation-root .chamber-module.active .sem-target-ring { stroke: var(--class-color); stroke-width: 2; }
        .refactor-animation-root .chamber-module.active .sem-icon { fill: var(--class-color); filter: drop-shadow(0 0 8px var(--class-color)); transform: scale(1.1); }
        .refactor-animation-root .chamber-module.active .sem-pulse { animation: ra-radarPulse 1.5s ease-out infinite; }

        @keyframes ra-radarPulse {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }

        .refactor-animation-root .comp-track { fill: none; stroke: rgba(0,0,0,0.5); stroke-width: 8; stroke-linecap: round; }
        .refactor-animation-root .comp-fill { fill: none; stroke: var(--class-color); stroke-width: 8; stroke-linecap: round; stroke-dasharray: 200; stroke-dashoffset: 200; transition: stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1); }
        .refactor-animation-root .comp-text { fill: var(--text-color); font-family: monospace; font-size: 20px; font-weight: bold; opacity: 0; transition: opacity 0.5s; text-anchor: middle; dominant-baseline: middle;}

        .refactor-animation-root .chamber-module.active .comp-fill { stroke-dashoffset: 70; }
        .refactor-animation-root .chamber-module.active .comp-text { opacity: 1; }

        .refactor-animation-root .baseline-artifact-s3 {
            position: absolute;
            top: 45%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 240px;
            background: rgba(30, 30, 46, 0.95);
            border: 2px solid var(--string-color);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 0 40px rgba(166, 227, 161, 0.3);
            backdrop-filter: blur(10px);
            z-index: 20;
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root .baseline-artifact-s3.visible {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .refactor-animation-root .art-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            color: var(--string-color);
            font-weight: bold;
            margin-bottom: 15px;
            letter-spacing: 1px;
        }

        .refactor-animation-root .art-indicators { display: flex; gap: 15px; }

        .refactor-animation-root .art-dot-group { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .refactor-animation-root .art-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--editor-bg); border: 2px solid var(--border-color); }
        .refactor-animation-root .art-label { font-family: monospace; font-size: 9px; color: rgba(255,255,255,0.5); text-transform: uppercase; }

        .refactor-animation-root .art-dot.syn-pass { background: var(--string-color); border-color: var(--string-color); box-shadow: 0 0 10px var(--string-color); }
        .refactor-animation-root .art-dot.sem-pass { background: var(--string-color); border-color: var(--string-color); box-shadow: 0 0 10px var(--string-color); }
        .refactor-animation-root .art-dot.comp-pass { background: var(--class-color); border-color: var(--class-color); box-shadow: 0 0 10px var(--class-color); }

        .refactor-animation-root #next-phase-indicator-2 {
            position: absolute;
            bottom: 5%; left: 50%;
            transform: translate(-50%, 20px);
            opacity: 0;
            text-align: center;
            transition: all 1s ease;
            z-index: 10;
        }

        .refactor-animation-root #next-phase-indicator-2.visible {
            opacity: 1;
            transform: translate(-50%, 0);
        }

        .refactor-animation-root #scene4-container {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 1s ease-out;
            z-index: 25;
            overflow: hidden;
        }

        .refactor-animation-root #scene4-container.visible {
            opacity: 1;
            pointer-events: auto;
        }

        .refactor-animation-root .model-badge {
            position: absolute;
            top: -80px; left: 50%;
            transform: translateX(-50%);
            background: rgba(30, 30, 46, 0.85);
            border: 1px solid var(--border-color);
            border-radius: 50px;
            padding: 8px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            backdrop-filter: blur(10px);
            z-index: 100;
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root .model-badge.visible {
            top: 30px;
            opacity: 1;
        }

        .refactor-animation-root .badge-planner { border-color: var(--keyword-color); animation: ra-pulsePlanner 3s infinite alternate ease-in-out; }
        .refactor-animation-root .badge-planner .badge-title, .refactor-animation-root .badge-planner .badge-icon { color: var(--keyword-color); }

        .refactor-animation-root .badge-generator { border-color: var(--string-color); animation: ra-pulseGenerator 3s infinite alternate ease-in-out; }
        .refactor-animation-root .badge-generator .badge-title, .refactor-animation-root .badge-generator .badge-icon { color: var(--string-color); }

        .refactor-animation-root .badge-judge { border-color: var(--class-color); animation: ra-pulseJudge 3s infinite alternate ease-in-out; }
        .refactor-animation-root .badge-judge .badge-title, .refactor-animation-root .badge-judge .badge-icon { color: var(--class-color); }

        @keyframes ra-pulsePlanner {
            from { box-shadow: 0 0 10px rgba(203, 166, 247, 0.15); }
            to { box-shadow: 0 0 25px rgba(203, 166, 247, 0.4); }
        }
        @keyframes ra-pulseGenerator {
            from { box-shadow: 0 0 10px rgba(166, 227, 161, 0.15); }
            to { box-shadow: 0 0 25px rgba(166, 227, 161, 0.4); }
        }
        @keyframes ra-pulseJudge {
            from { box-shadow: 0 0 10px rgba(249, 226, 175, 0.15); }
            to { box-shadow: 0 0 25px rgba(249, 226, 175, 0.4); }
        }

        .refactor-animation-root .badge-icon { font-size: 24px; filter: drop-shadow(0 0 8px currentColor); }
        .refactor-animation-root .badge-details { display: flex; flex-direction: column; }
        .refactor-animation-root .badge-title { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 1px; font-weight: bold; }
        .refactor-animation-root .badge-model { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--text-color); font-weight: bold; }
        .refactor-animation-root .badge-type { font-family: monospace; font-size: 9px; color: rgba(255,255,255,0.5); text-transform: uppercase; }

        .refactor-animation-root #planner-core {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 500px; height: 500px;
            opacity: 0;
            transition: opacity 1s;
            z-index: 1;
        }

        .refactor-animation-root .core-ring {
            fill: none;
            stroke-width: 2;
            transform-origin: center;
        }

        .refactor-animation-root .core-ring-outer {
            stroke: rgba(137, 180, 250, 0.2);
            stroke-dasharray: 20 30;
            animation: ra-spin 20s linear infinite;
        }

        .refactor-animation-root .core-ring-middle {
            stroke: rgba(249, 226, 175, 0.2);
            stroke-dasharray: 10 15;
            animation: ra-spin-reverse 15s linear infinite;
        }

        .refactor-animation-root .core-ring-inner {
            stroke: rgba(166, 227, 161, 0.3);
            stroke-dasharray: 5 10;
            animation: ra-spin 10s linear infinite;
        }

        .refactor-animation-root #intent-packet {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 80px; height: 80px;
            background: radial-gradient(circle, rgba(166, 227, 161, 0.3) 0%, transparent 70%);
            border: 2px solid var(--string-color);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--string-color);
            font-size: 24px;
            box-shadow: 0 0 30px var(--string-color);
            opacity: 0;
            z-index: 10;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root #ast-container {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.5);
            width: 500px; height: 350px;
            opacity: 0;
            z-index: 10;
            transition: all 1s ease-in-out;
            background: rgba(30, 30, 46, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 0 40px rgba(0,0,0,0.6);
            backdrop-filter: blur(5px);
        }

        .refactor-animation-root .ast-rect {
            fill: var(--editor-bg);
            stroke: rgba(255, 255, 255, 0.3);
            stroke-width: 2;
            transition: all 0.5s ease;
        }

        .refactor-animation-root .ast-text {
            fill: var(--text-color);
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            text-anchor: middle;
            transition: all 0.5s ease;
        }

        .refactor-animation-root .ast-edge {
            stroke: rgba(255, 255, 255, 0.2);
            stroke-width: 2;
            transition: all 0.5s ease;
            fill: none;
        }

        .refactor-animation-root .ast-node-group.dim .ast-rect { fill: rgba(0,0,0,0.5); stroke: rgba(255,255,255,0.1); }
        .refactor-animation-root .ast-node-group.dim .ast-text { fill: rgba(255,255,255,0.2); }
        .refactor-animation-root .ast-edge.dim { stroke: rgba(255,255,255,0.05); }

        .refactor-animation-root .ast-node-group.target .ast-rect {
            fill: rgba(255, 95, 86, 0.15);
            stroke: #ff5f56;
            filter: drop-shadow(0 0 15px #ff5f56);
        }

        .refactor-animation-root .ast-node-group.target .ast-text {
            fill: #ff5f56;
            font-weight: bold;
        }

        .refactor-animation-root .ast-edge.target {
            stroke: #ff5f56;
            stroke-width: 3;
            stroke-dasharray: 5 5;
            animation: ra-flowDash 1s linear infinite;
        }

        .refactor-animation-root #synthesis-sphere {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 150px; height: 150px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(203, 166, 247, 0.8) 0%, transparent 70%);
            box-shadow: 0 0 60px var(--keyword-color);
            opacity: 0;
            z-index: 20;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root #blueprint-artifact {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            display: flex;
            align-items: center;
            gap: 15px;
            opacity: 0;
            z-index: 30;
            transition: all 1s ease-in-out;
        }

        .refactor-animation-root .bp-card {
            background: rgba(30, 30, 46, 0.95);
            border: 1px solid var(--border-color);
            border-top: 3px solid var(--class-color);
            border-radius: 12px;
            padding: 15px;
            width: 130px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }

        .refactor-animation-root .bp-card.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .refactor-animation-root .bp-icon-large {
            font-size: 24px;
            margin-bottom: 10px;
            color: var(--class-color);
        }

        .refactor-animation-root .bp-card-title {
            font-family: monospace;
            font-size: 11px;
            color: var(--text-color);
            font-weight: bold;
            text-transform: uppercase;
        }

        .refactor-animation-root .bp-arrow {
            color: var(--class-color);
            font-size: 24px;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
        }

        .refactor-animation-root .bp-arrow.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .refactor-animation-root .execution-package {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 200px; height: 60px;
            background: linear-gradient(90deg, var(--keyword-color), var(--class-color));
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #11111b;
            font-family: monospace;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 0 40px rgba(203, 166, 247, 0.6);
            opacity: 0;
            z-index: 40;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root .intent-word {
            position: absolute;
            font-family: monospace;
            font-size: 14px;
            color: var(--string-color);
            opacity: 0;
            transition: all 1s ease-in-out;
            z-index: 15;
            font-weight: bold;
            text-shadow: 0 0 5px rgba(166, 227, 161, 0.8);
        }

        .refactor-animation-root .planner-particle {
            position: absolute;
            width: 6px; height: 6px;
            border-radius: 50%;
            opacity: 1;
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 5;
            pointer-events: none;
        }

        .refactor-animation-root #intent-cube-container {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            perspective: 800px;
            z-index: 10;
            opacity: 0;
            transition: all 1s ease-in-out;
        }

        .refactor-animation-root .intent-cube {
            width: 80px; height: 80px;
            transform-style: preserve-3d;
            animation: ra-rotateCube 8s infinite linear;
        }

        .refactor-animation-root .intent-cube .face {
            position: absolute;
            width: 80px; height: 80px;
            background: rgba(137, 180, 250, 0.15);
            border: 2px solid var(--method-color);
            box-shadow: inset 0 0 15px rgba(137, 180, 250, 0.5), 0 0 10px rgba(137, 180, 250, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: rgba(255,255,255,0.2);
        }

        .refactor-animation-root .intent-cube .front  { transform: translateZ(40px); }
        .refactor-animation-root .intent-cube .back   { transform: rotateY(180deg) translateZ(40px); }
        .refactor-animation-root .intent-cube .right  { transform: rotateY(90deg) translateZ(40px); }
        .refactor-animation-root .intent-cube .left   { transform: rotateY(-90deg) translateZ(40px); }
        .refactor-animation-root .intent-cube .top    { transform: rotateX(90deg) translateZ(40px); }
        .refactor-animation-root .intent-cube .bottom { transform: rotateX(-90deg) translateZ(40px); }
        @keyframes ra-rotateCube {
            0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
            100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .refactor-animation-root .ast-node-group.highlight .ast-rect {
            fill: rgba(203, 166, 247, 0.2);
            stroke: var(--keyword-color);
            filter: drop-shadow(0 0 10px var(--keyword-color));
        }

        .refactor-animation-root .ast-node-group.highlight .ast-text {
            fill: var(--keyword-color);
            font-weight: bold;
        }

        .refactor-animation-root .ast-node-group.target .ast-rect {
            fill: rgba(249, 226, 175, 0.15);
            stroke: var(--class-color);
            filter: drop-shadow(0 0 15px var(--class-color));
        }

        .refactor-animation-root .ast-node-group.target .ast-text {
            fill: var(--class-color);
            font-weight: bold;
        }

        .refactor-animation-root .ast-edge.highlight {
            stroke: var(--keyword-color);
            stroke-width: 3;
        }

        .refactor-animation-root .ast-edge.target {
            stroke: var(--class-color);
            stroke-width: 3;
            stroke-dasharray: 5 5;
            animation: ra-flowDash 1s linear infinite;
        }

        @keyframes ra-flowDash {
            to { stroke-dashoffset: -10; }
        }

        .refactor-animation-root .ast-node-group.dim { opacity: 0.2; }
        .refactor-animation-root .ast-edge.dim { opacity: 0.2; }

        .refactor-animation-root .phase-indicator {
            position: absolute;
            bottom: 5%; left: 50%;
            transform: translate(-50%, 20px);
            opacity: 0;
            text-align: center;
            transition: all 1s ease;
        }

        .refactor-animation-root .phase-indicator.visible {
            opacity: 1;
            transform: translate(-50%, 0);
        }

        .refactor-animation-root #scene5-container {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 1s ease-out;
            z-index: 30;
        }

        .refactor-animation-root #scene5-container.visible {
            opacity: 1;
            pointer-events: auto;
        }

        .refactor-animation-root .blueprint-mini {
            position: absolute;
            top: -100px; left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            background: rgba(30, 30, 46, 0.95);
            border: 2px solid var(--class-color);
            padding: 10px 24px;
            border-radius: 20px;
            box-shadow: 0 0 20px rgba(249, 226, 175, 0.4);
            opacity: 0;
            z-index: 100;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root #generator-engine {
            position: absolute;
            top: 30%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 140px; height: 140px;
            opacity: 0;
            z-index: 50;
            transition: all 1s ease;
        }

        .refactor-animation-root .gen-ring {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 50%;
            border: 2px dashed var(--string-color);
        }

        .refactor-animation-root .gen-ring.outer {
            border: 2px solid transparent;
            border-top-color: var(--string-color);
            border-bottom-color: var(--string-color);
            animation: ra-spin 6s linear infinite;
            box-shadow: 0 0 30px rgba(166, 227, 161, 0.2);
        }
        .refactor-animation-root .gen-ring.middle {
            border: 2px solid transparent;
            border-left-color: var(--method-color);
            border-right-color: var(--method-color);
            animation: ra-spin-reverse 4s linear infinite;
            transform: scale(0.85);
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 50%;
        }
        .refactor-animation-root .gen-ring.inner {
            border: 2px dashed var(--keyword-color);
            animation: ra-spin 8s linear infinite;
            transform: scale(0.7);
        }

        .refactor-animation-root .gen-center {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            font-size: 50px;
            filter: drop-shadow(0 0 15px var(--string-color));
            transition: all 0.5s ease;
        }

        .refactor-animation-root .gen-core-hex {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 70px; height: 70px;
            background: rgba(166, 227, 161, 0.05);
            border: 2px solid var(--string-color);
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            transition: all 0.5s ease;
            animation: ra-pulseHex 3s infinite alternate;
        }

        .refactor-animation-root .gen-core-hex.active {
            background: rgba(166, 227, 161, 0.3);
            box-shadow: 0 0 30px var(--string-color);
            transform: translate(-50%, -50%) scale(1.1);
            animation: ra-pulseHexFast 0.5s infinite alternate;
        }

        @keyframes ra-pulseHex {
            from { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px rgba(166, 227, 161, 0.2); }
            to { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 20px rgba(166, 227, 161, 0.4); }
        }

        @keyframes ra-pulseHexFast {
            from { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 20px var(--string-color); }
            to { transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 0 40px var(--string-color); }
        }

        .refactor-animation-root #code-compare-container {
            display: flex;
            gap: 20px;
            width: 90%;
            max-width: 1100px;
            height: 450px;
            margin-top: 80px;
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }

        .refactor-animation-root .code-pane {
            flex: 1;
            background-color: var(--editor-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }

        .refactor-animation-root .old-pane { opacity: 0.6; filter: grayscale(0.5); }
        .refactor-animation-root .new-pane { border-color: rgba(166, 227, 161, 0.5); box-shadow: 0 0 25px rgba(166, 227, 161, 0.15); }

        .refactor-animation-root .pane-header {
            height: 40px;
            background: rgba(0,0,0,0.3);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            padding: 0 16px;
            font-family: monospace;
            font-size: 14px;
            color: rgba(255,255,255,0.7);
            font-weight: bold;
        }

        .refactor-animation-root .pane-content {
            padding: 20px;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 14.5px;
            line-height: 1.6;
            overflow-y: auto;
            color: var(--text-color);
            white-space: pre-wrap;
            flex-grow: 1;
        }

        .refactor-animation-root .highlight-red {
            background-color: rgba(255, 95, 86, 0.15);
            border-radius: 4px;
            display: inline-block;
            width: 100%;
            padding: 2px 0;
            border-left: 3px solid #ff5f56;
        }
        .refactor-animation-root .highlight-green {
            background-color: rgba(166, 227, 161, 0.15);
            border-radius: 4px;
            display: inline-block;
            width: 100%;
            padding: 2px 0;
            border-left: 3px solid var(--string-color);
        }

        .refactor-animation-root #scene6-container {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 1s ease-out;
            z-index: 35;
        }

        .refactor-animation-root #scene6-container.visible {
            opacity: 1;
            pointer-events: auto;
        }

        .refactor-animation-root .val-title {
            position: absolute;
            top: 5%;
            color: rgba(255,255,255,0.4);
            font-family: 'JetBrains Mono', monospace;
            letter-spacing: 2px;
            font-size: 14px;
        }

        .refactor-animation-root .val-module {
            position: absolute;
            background: rgba(30, 30, 46, 0.85);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            width: 120px; height: 140px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            transition: all 0.5s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 10;
        }

        .refactor-animation-root .val-mod-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: var(--text-color);
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .refactor-animation-root .val-module.processing { border-color: var(--keyword-color); box-shadow: 0 0 20px rgba(203, 166, 247, 0.3); }
        .refactor-animation-root .val-module.pass { border-color: var(--string-color); box-shadow: 0 0 20px rgba(166, 227, 161, 0.3); }
        .refactor-animation-root .val-module.fail { border-color: #ff5f56; box-shadow: 0 0 20px rgba(255, 95, 86, 0.4); }

        .refactor-animation-root .syntax-mod { top: 25%; left: 50%; transform: translate(-50%, -50%); }
        .refactor-animation-root .boundary-mod { top: 50%; left: 25%; transform: translate(-50%, -50%); }
        .refactor-animation-root .complexity-mod { top: 50%; left: 75%; transform: translate(-50%, -50%); }

        .refactor-animation-root .val-core {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: var(--editor-bg);
            padding: 20px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            color: rgba(255,255,255,0.8);
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            line-height: 1.5;
            box-shadow: 0 15px 35px rgba(0,0,0,0.6);
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 15;
        }

        .refactor-animation-root .val-core.fail-core {
            border-color: #ff5f56;
            color: #ff5f56;
            box-shadow: 0 0 30px rgba(255, 95, 86, 0.2);
            animation: ra-shake 0.5s;
        }

        @keyframes ra-shake {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            25% { transform: translate(-55%, -50%) scale(1); }
            75% { transform: translate(-45%, -50%) scale(1); }
        }

        .refactor-animation-root .val-beam {
            stroke: rgba(255,255,255,0.1);
            stroke-width: 2;
            stroke-dasharray: 5 5;
            transition: all 0.5s ease;
        }

        .refactor-animation-root .val-beam.active-beam { stroke: var(--keyword-color); stroke-width: 3; animation: ra-flowDash 1s linear infinite; }
        .refactor-animation-root .val-beam.pass-beam { stroke: var(--string-color); stroke-width: 3; stroke-dasharray: none; opacity: 0.5; }
        .refactor-animation-root .val-beam.fail-beam { stroke: #ff5f56; stroke-width: 3; stroke-dasharray: none; opacity: 0.8; }

        .refactor-animation-root .val-feedback {
            position: absolute;
            top: 50%; left: 75%;
            transform: translate(-50%, -50%) scale(0);
            background: rgba(255, 95, 86, 0.15);
            border: 1px solid #ff5f56;
            color: #ff5f56;
            padding: 8px 16px;
            border-radius: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            z-index: 50;
            opacity: 0;
            backdrop-filter: blur(5px);
            box-shadow: 0 0 15px rgba(255,95,86,0.3);
            transition: top 1.5s cubic-bezier(0.25, 1, 0.5, 1), left 1.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s, transform 0.5s;
        }

        .refactor-animation-root .val-retry-node {
            position: absolute;
            top: 20%; left: 20%;
            transform: translate(-50%, -50%);
            background: rgba(30, 30, 46, 0.9);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: var(--text-color);
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            transition: all 0.3s ease;
            z-index: 5;
        }

        .refactor-animation-root .val-retry-node .badge-icon { font-size: 20px; margin-bottom: 5px; color: var(--keyword-color); }
        .refactor-animation-root .val-retry-node.active-retry { border-color: #ff5f56; box-shadow: 0 0 25px rgba(255, 95, 86, 0.3); transform: translate(-50%, -50%) scale(1.1); }
        .refactor-animation-root .val-retry-node.active-retry .badge-icon { color: #ff5f56; animation: ra-spin 2s linear infinite; }

        .refactor-animation-root .validated-package {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(90deg, var(--string-color), var(--method-color));
            color: #111;
            padding: 15px 30px;
            border-radius: 30px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 0 40px rgba(166,227,161,0.5);
            opacity: 0;
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root .syn-rect { transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .refactor-animation-root .bound-shield { transition: all 0.5s ease; stroke-dasharray: 100; animation: ra-spin 10s linear infinite; transform-origin: center;}
        .refactor-animation-root .comp-bar { transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

        .refactor-animation-root #scene7-container {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 1s ease-out;
            z-index: 40;
            overflow: hidden;
        }

        .refactor-animation-root #scene7-container.visible {
            opacity: 1;
            pointer-events: auto;
        }

        .refactor-animation-root #model-swap-area {
            position: absolute;
            top: 8%; left: 0;
            width: 100%; height: 80px;
            z-index: 100;
        }

        .refactor-animation-root .model-badge.swap-badge {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0;
            transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .refactor-animation-root .model-badge.swap-badge.active-center {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .refactor-animation-root .model-badge.swap-badge.exit-left {
            opacity: 0;
            transform: translate(calc(-50% - 300px), -50%) scale(0.8);
            filter: blur(5px);
        }

        .refactor-animation-root .model-badge.swap-badge.enter-right {
            opacity: 0;
            transform: translate(calc(-50% + 300px), -50%) scale(0.8);
            filter: blur(0px);
        }

        .refactor-animation-root .model-status-text {
            color: var(--keyword-color);
            font-weight: bold;
            font-size: 10px;
            margin-top: 4px;
            text-align: center;
            letter-spacing: 2px;
            transition: color 0.5s;
        }

        .refactor-animation-root #s7-compare-area {
            position: absolute;
            top: 25%;
            width: 800px;
            display: flex;
            justify-content: space-between;
            z-index: 10;
        }

        .refactor-animation-root .s7-code-box {
            width: 250px; height: 200px;
            background: rgba(30, 30, 46, 0.85);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px;
            opacity: 0;
            transform: translateY(30px);
            transition: all 1s ease;
            box-shadow: 0 15px 35px rgba(0,0,0,0.4);
            position: relative;
        }

        .refactor-animation-root .s7-code-box.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .refactor-animation-root .s7-box-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: var(--text-color);
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .refactor-animation-root .s7-ast-visual { width: 100%; height: 100%; }

        .refactor-animation-root #judge-core-container {
            position: absolute;
            top: 60%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 160px; height: 160px;
            z-index: 20;
            opacity: 0;
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .refactor-animation-root .judge-sphere {
            width: 100%; height: 100%;
            border-radius: 50%;
            border: 2px solid var(--class-color);
            background: radial-gradient(circle, rgba(249, 226, 175, 0.1) 0%, rgba(30,30,46,0.9) 70%);
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 30px rgba(249, 226, 175, 0.2);
            animation: ra-pulseJudgeCore 4s infinite alternate;
            position: relative;
        }

        @keyframes ra-pulseJudgeCore {
            from { box-shadow: 0 0 20px rgba(249, 226, 175, 0.2); }
            to { box-shadow: 0 0 50px rgba(249, 226, 175, 0.5); }
        }

        .refactor-animation-root .judge-crystal {
            width: 40px; height: 40px;
            background: var(--class-color);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            box-shadow: 0 0 20px var(--class-color);
            transition: all 0.5s ease;
        }

        .refactor-animation-root .judge-crystal.reject { background: #ff5f56; box-shadow: 0 0 30px #ff5f56; }
        .refactor-animation-root .judge-crystal.accept { background: var(--string-color); box-shadow: 0 0 30px var(--string-color); }

        .refactor-animation-root #judge-beams-svg {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 15;
        }

        .refactor-animation-root .eval-beam {
            fill: none;
            stroke: rgba(255,255,255,0.1);
            stroke-width: 2;
            stroke-dasharray: 6 6;
            opacity: 0;
            transition: all 0.5s ease;
        }

        .refactor-animation-root .eval-beam.active {
            opacity: 1;
            stroke: var(--class-color);
            animation: ra-flowDashReverse 1s linear infinite;
        }

        .refactor-animation-root .eval-beam.reject { stroke: #ff5f56; stroke-width: 4; stroke-dasharray: none; animation: none; }
        .refactor-animation-root .eval-beam.accept { stroke: var(--string-color); stroke-width: 3; stroke-dasharray: none; opacity: 1; animation: none; }

        @keyframes ra-flowDashReverse { to { stroke-dashoffset: 20; } }

        .refactor-animation-root #s7-final-comparison {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0;
            width: 88%;
            max-width: 920px;
            z-index: 60;
            transition: all 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
        }
        .refactor-animation-root #s7-final-comparison.visible {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            pointer-events: auto;
        }
        .refactor-animation-root .s7-final-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 15px;
            font-weight: bold;
            color: var(--string-color);
            text-align: center;
            margin-bottom: 18px;
            letter-spacing: 2px;
            text-shadow: 0 0 20px rgba(166, 227, 161, 0.5);
        }
        .refactor-animation-root .s7-final-panels {
            display: flex;
            gap: 18px;
            align-items: stretch;
        }
        .refactor-animation-root .s7-code-panel {
            flex: 1;
            background: rgba(22, 22, 35, 0.97);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            text-align: left;
            box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }
        .refactor-animation-root .s7-code-panel.original  { border-color: rgba(255, 95, 86, 0.45); box-shadow: 0 0 20px rgba(255,95,86,0.08); }
        .refactor-animation-root .s7-code-panel.refactored{ border-color: var(--string-color);      box-shadow: 0 0 25px rgba(166,227,161,0.15); }
        .refactor-animation-root .s7-panel-header {
            padding: 9px 16px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: bold;
            letter-spacing: 2px;
            border-bottom: 1px solid var(--border-color);
            background: rgba(0,0,0,0.25);
        }
        .refactor-animation-root .s7-code-panel.original  .s7-panel-header { color: #ff5f56; }
        .refactor-animation-root .s7-code-panel.refactored .s7-panel-header { color: var(--string-color); }
        .refactor-animation-root .s7-panel-code {
            padding: 14px 18px;
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 12.5px;
            line-height: 1.65;
            color: var(--text-color);
            margin: 0;
            white-space: pre;
            overflow-x: auto;
            background: transparent;
        }
        .refactor-animation-root .s7-panel-arrow {
            color: var(--string-color);
            font-size: 30px;
            display: flex;
            align-items: center;
            padding: 0 4px;
            filter: drop-shadow(0 0 12px var(--string-color));
            flex-shrink: 0;
        }

        @keyframes ra-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
        }
        @keyframes ra-spin-reverse {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
        }

        .refactor-animation-root .particle {
            position: absolute;
            width: 8px; height: 8px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 95;
        }

        .refactor-animation-root .baseline-badge {
            position: absolute;
            bottom: 8%; left: 50%;
            transform: translateX(-50%);
            background: rgba(30, 30, 46, 0.95);
            border: 2px solid var(--border-color);
            border-radius: 40px;
            padding: 12px 28px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 0 30px rgba(166, 227, 161, 0.3);
            opacity: 0;
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 100;
            white-space: nowrap;
        }
        .refactor-animation-root .baseline-badge.visible {
            opacity: 1;
        }

        .refactor-animation-root .beam-label {
            position: absolute;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: var(--class-color);
            opacity: 0;
            transition: opacity 0.5s;
            background: rgba(0,0,0,0.6);
            padding: 2px 6px;
            border-radius: 4px;
        }

        .refactor-animation-root #s7-feedback-packet {
            position: absolute;
            top: 60%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: rgba(255, 95, 86, 0.15);
            border: 1px solid #ff5f56;
            color: #ff5f56;
            padding: 10px 20px;
            border-radius: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: bold;
            z-index: 50;
            opacity: 0;
            box-shadow: 0 0 20px rgba(255,95,86,0.4);
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .refactor-animation-root #s7-iteration-counter {
            position: absolute;
            top: 15%;
            color: rgba(255,255,255,0.4);
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            letter-spacing: 2px;
            opacity: 0;
            transition: opacity 0.5s;
        }

        .refactor-animation-root .fallback-shield {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            border-radius: 12px;
            border: 2px solid var(--string-color);
            background: rgba(166, 227, 161, 0.05);
            box-shadow: 0 0 40px rgba(166, 227, 161, 0.3), inset 0 0 20px rgba(166, 227, 161, 0.2);
            opacity: 0;
            transition: all 1s ease;
            pointer-events: none;
            z-index: 5;
        }

        .refactor-animation-root .fallback-text {
            position: absolute;
            bottom: -30px; left: 50%;
            transform: translateX(-50%);
            color: var(--string-color);
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 1s ease;
        }
      `}</style>
    </>
  );
}
