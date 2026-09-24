import React from "react";
import { ChevronDown } from "lucide-react";

export function Phase3Analysis() {
  return (
    <div id="scene3-container" className="scene">
      <div className="chamber-wrapper" id="chamber-wrapper">
        <svg id="chamber-svg-layer">
          <path id="beam-syntax" className="analysis-beam" d="M 500 270 L 240 270" />
          <path id="beam-semantic" className="analysis-beam" d="M 500 270 L 760 270" />
          <path id="beam-complexity" className="analysis-beam" d="M 500 270 L 500 450" />
        </svg>

        <div className="chamber-module mod-syntax" id="mod-syntax">
          <div className="module-label">SYNTAX</div>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <line x1="50" y1="20" x2="25" y2="50" className="syn-edge" />
            <line x1="50" y1="20" x2="75" y2="50" className="syn-edge" />
            <line x1="25" y1="50" x2="25" y2="80" className="syn-edge" />
            <line x1="75" y1="50" x2="75" y2="80" className="syn-edge" />
            <circle cx="50" cy="20" r="10" className="syn-node a1" />
            <circle cx="25" cy="50" r="10" className="syn-node a2" />
            <circle cx="75" cy="50" r="10" className="syn-node a2" />
            <circle cx="25" cy="80" r="8" className="syn-node a3" />
            <circle cx="75" cy="80" r="8" className="syn-node a3" />
          </svg>
        </div>

        <div className="chamber-module mod-semantic" id="mod-semantic">
          <div className="module-label">SEMANTIC</div>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="45" className="sem-target-ring" />
            <circle cx="60" cy="60" r="25" className="sem-pulse" />
            <path
              d="M 45 45 L 35 60 L 45 75 M 75 45 L 85 60 L 75 75"
              className="sem-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="60" cy="60" r="8" className="sem-icon" />
          </svg>
        </div>

        <div className="chamber-module mod-complexity" id="mod-complexity">
          <div className="module-label">COMPLEXITY</div>
          <svg width="140" height="80" viewBox="0 0 140 80">
            <path d="M 20 70 A 50 50 0 0 1 120 70" className="comp-track" />
            <path d="M 20 70 A 50 50 0 0 1 120 70" className="comp-fill" />
            <text x="70" y="55" className="comp-text">O(N)</text>
          </svg>
        </div>

        <div className="chamber-core" id="chamber-core">
          <div className="core-laser" id="core-laser"></div>
          <div className="code-row">public class StudentManager {"{"}</div>
          <div className="code-row">&nbsp;</div>
          <div className="code-row">&nbsp;&nbsp;&nbsp;&nbsp;private List&lt;Student&gt; students;</div>
          <div className="code-row">&nbsp;</div>
          <div className="code-row">&nbsp;&nbsp;&nbsp;&nbsp;public void addStudent(Student s) {"{"}</div>
          <div className="code-row">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;students.add(s);</div>
          <div className="code-row">&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
          <div className="code-row">&nbsp;</div>
          <div className="code-row" id="core-target-row">&nbsp;&nbsp;&nbsp;&nbsp;public void displayStudents() {"{"}</div>
          <div className="code-row" id="core-target-row2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (Student s : students) {"{"}</div>
          <div className="code-row" id="core-target-row3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(s.getName());</div>
          <div className="code-row">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
          <div className="code-row">&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
          <div className="code-row">{"}"}</div>
        </div>

        <div className="baseline-artifact-s3" id="baseline-artifact-s3">
          <div className="art-title">BASELINE PROFILE</div>
          <div className="art-indicators">
            <div className="art-dot-group">
              <div className="art-dot" id="dot-syn"></div>
              <div className="art-label">SYN</div>
            </div>
            <div className="art-dot-group">
              <div className="art-dot" id="dot-sem"></div>
              <div className="art-label">SEM</div>
            </div>
            <div className="art-dot-group">
              <div className="art-dot" id="dot-comp"></div>
              <div className="art-label">CMP</div>
            </div>
          </div>
        </div>
      </div>

      <div id="next-phase-indicator-2">
        <div className="arrow-down">
          <ChevronDown className="w-6 h-6 inline-block" />
        </div>
        <div className="phase-text" style={{ color: "var(--keyword-color)" }}>Phase 2: Strategy Block</div>
      </div>
    </div>
  );
}
