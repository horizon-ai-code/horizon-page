import React from "react";
import { Cpu, Scale, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export function Phase7Evaluation() {
  return (
    <div id="scene7-container" className="scene">
      <div id="s7-iteration-counter">STRATEGY ITERATION: 1</div>

      <div id="model-swap-area">
        <div id="s7-qwen-badge" className="model-badge badge-planner swap-badge">
          <div className="badge-icon">
            <Cpu className="w-5 h-5 text-purple-400" />
          </div>
          <div className="badge-details">
            <div className="badge-title">GENERATOR ENGINE</div>
            <div className="badge-model">Qwen2.5-Coder-3B-Instruct</div>
            <div id="qwen-status" className="model-status-text">ACTIVE</div>
          </div>
        </div>

        <div id="s7-llama-badge" className="model-badge badge-judge swap-badge enter-right">
          <div className="badge-icon">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <div className="badge-details">
            <div className="badge-title">EVALUATION ENGINE</div>
            <div className="badge-model">Llama-3.2-3B-Instruct</div>
            <div id="llama-status" className="model-status-text" style={{ color: "var(--class-color)" }}>STANDBY</div>
          </div>
        </div>
      </div>

      <div id="s7-compare-area">
        <div id="s7-box-original" className="s7-code-box">
          <div className="s7-box-title">Original Structure</div>
          <svg className="s7-ast-visual" viewBox="0 0 100 100">
            <path d="M 50 10 L 20 40 L 40 70 L 60 70 L 80 40 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <path d="M 20 40 L 80 40 M 40 70 L 80 40 M 20 40 L 60 70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx="50" cy="10" r="4" fill="var(--text-color)" />
            <circle cx="20" cy="40" r="4" fill="#ff5f56" />
            <circle cx="80" cy="40" r="4" fill="var(--text-color)" />
            <circle cx="40" cy="70" r="4" fill="#ff5f56" />
            <circle cx="60" cy="70" r="4" fill="var(--text-color)" />
          </svg>
          <div id="fallback-shield" className="fallback-shield"></div>
          <div id="fallback-text" className="fallback-text">SAFE ORIGINAL VERSION RESTORED</div>
        </div>

        <div id="s7-box-refactored" className="s7-code-box">
          <div className="s7-box-title" style={{ color: "var(--string-color)" }}>Generated Candidate</div>
          <svg className="s7-ast-visual" viewBox="0 0 100 100">
            <path d="M 50 10 L 50 40 L 50 70 L 50 90" fill="none" stroke="var(--string-color)" strokeWidth="2" />
            <circle cx="50" cy="10" r="4" fill="var(--string-color)" />
            <circle cx="50" cy="40" r="4" fill="var(--string-color)" />
            <circle cx="50" cy="70" r="4" fill="var(--string-color)" />
            <circle cx="50" cy="90" r="4" fill="var(--string-color)" />
          </svg>
        </div>
      </div>

      <div id="judge-core-container">
        <div className="judge-sphere">
          <div id="judge-crystal" className="judge-crystal"></div>
        </div>
      </div>

      <svg id="judge-beams-svg">
        <line id="s7-beam-logic" className="eval-beam" x1="50%" y1="60%" x2="70%" y2="35%" />
        <line id="s7-beam-struct" className="eval-beam" x1="50%" y1="60%" x2="70%" y2="45%" />
        <line id="s7-beam-quality" className="eval-beam" x1="50%" y1="60%" x2="70%" y2="55%" />
      </svg>

      <div id="s7-label-logic" className="beam-label" style={{ top: "45%", left: "60%" }}>Logic Consistency</div>
      <div id="s7-label-struct" className="beam-label" style={{ top: "50%", left: "62%" }}>Structural Change</div>
      <div id="s7-label-quality" className="beam-label" style={{ top: "55%", left: "64%" }}>Refactoring Quality</div>

      <div id="s7-feedback-packet" className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span>REFACTORING QUALITY DEGRADATION</span>
      </div>

      <div id="s7-final-comparison">
        <div className="s7-final-title flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>VALIDATED OUTPUT — ITERATION 2 APPROVED</span>
        </div>
        <div className="s7-final-panels">
          <div className="s7-code-panel original">
            <div className="s7-panel-header flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>ORIGINAL — IMPERATIVE LOOP</span>
            </div>
            <pre className="s7-panel-code">{`public class StudentManager {

    private List<Student> students;

    public void addStudent(Student s) {
        students.add(s);
    }

    public void displayStudents() {
        for (Student s : students) {
            System.out.println(s.getName());
        }
    }
}`}</pre>
          </div>
          <div className="s7-panel-arrow">
            <ArrowRight className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="s7-code-panel refactored">
            <div className="s7-panel-header flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>REFACTORED — DECLARATIVE STREAM</span>
            </div>
            <pre className="s7-panel-code">{`public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {
        students.stream()
                .map(Student::getName)
                .forEach(System.out::println);
    }
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
