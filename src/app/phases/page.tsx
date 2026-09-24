'use client';

import React, { useEffect, useRef } from "react";
import {
  PhaseStyles,
  PhaseNav,
  Phase1Input,
  Phase2Pipeline,
  Phase3Analysis,
  Phase4Decomposition,
  Phase5Generation,
  Phase6Validation,
  Phase7Evaluation,
} from "@/components/phases";

/**
 * RefactorAnimation
 * -------------------------------------------------------------------------
 * Faithful React + Tailwind port of the original 7-scene "AI refactor"
 * animation (StudentManager.java walkthrough).
 *
 * Why this isn't 100% Tailwind utility classes:
 * The original relies heavily on CSS custom properties, keyframe
 * animations, cubic-bezier transitions, radial/linear gradients, and
 * absolute-positioned SVG diagrams that are driven by imperative
 * getBoundingClientRect() math in JS. Tailwind has no equivalent for
 * custom keyframes, CSS variables, or JS-computed positions, so — to
 * guarantee the design is pixel-identical, as requested — the original
 * CSS is kept verbatim in a scoped <style> block (this is the standard,
 * supported way to combine Tailwind with bespoke CSS; Tailwind's own
 * utilities are layered on top for the parts that map cleanly, e.g.
 * fixed/absolute positioning helpers are left as the original classes
 * so nothing shifts by a pixel). All class names, ids, and structure are
 * unchanged from the source so the JS animation logic (which selects
 * elements by id) works exactly as before.
 *
 * All the original imperative timeline logic (typeText, moveMouse,
 * delayAsync, the 7 runScene* functions, nextScene/prevScene, and
 * resetSceneState) is preserved as-is inside a single useEffect that
 * mounts once, with a cleanup function that clears all pending timers
 * and event listeners on unmount.
 */
export default function RefactorAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google Fonts (JetBrains Mono) — load once
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const root = rootRef.current;
    if (!root) return undefined;

    // Scope all getElementById calls to this component instance so the
    // component can be safely mounted more than once on a page.
    const $ = (id: string): any => root.querySelector(`#${id}`);
    const $$ = (sel: string): any => root.querySelectorAll(sel);

    const javaCode = `public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {
        for(Student s : students) {
            System.out.println(s.getName());
        }
    }
}`;

    const requestText =
      "Refactor this Java code to improve readability, reduce duplicated code, and optimize performance.";

    const keywords = ["public", "class", "private", "void", "for"];
    const classes = ["StudentManager", "List", "Student", "System"];
    const methods = [
      "addStudent",
      "displayStudents",
      "add",
      "out",
      "println",
      "getName",
    ];

    const codeElement = $("code-content");
    const codeCursor = $("code-cursor");
    const requestElement = $("request-text");
    const requestCursor = $("request-cursor");
    const mouseCursor = $("mouse-cursor");
    const editorArea = $("editor-area");
    const container = $("container"); // Scene 1
    const scene2Container = $("scene2-container");
    const requestInputContainer = $("request-input-container");

    // Scene 2 elements
    const dataPacket = $("data-packet");
    const nodeFE = $("node-frontend");
    const nodeWS = $("node-ws");
    const nodeBE = $("node-backend");
    const nodeSession = $("node-session");
    const lineFeWs = $("line-fe-ws");
    const lineWsBe = $("line-ws-be");
    const lineBeSession = $("line-be-session");
    const sessionInfo = $("session-info");
    const nextPhaseIndicator = $("next-phase-indicator");
    const particleContainer = $("particle-container");

    let isAnimating = false;
    let scene1TimeoutIds: ReturnType<typeof setTimeout>[] = [];
    let scene2TimeoutIds: ReturnType<typeof setTimeout>[] = [];
    let scene3TimeoutIds: ReturnType<typeof setTimeout>[] = [];
    let scene4TimeoutIds: ReturnType<typeof setTimeout>[] = [];
    let scene5TimeoutIds: ReturnType<typeof setTimeout>[] = [];
    let scene6TimeoutIds: ReturnType<typeof setTimeout>[] = [];
    let scene7TimeoutIds: ReturnType<typeof setTimeout>[] = [];

    function highlightSyntax(codeStr: string) {
      let highlighted = codeStr.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      keywords.forEach((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, "g");
        highlighted = highlighted.replace(regex, `<span class="kw">${kw}</span>`);
      });

      classes.forEach((cls) => {
        const regex = new RegExp(`\\b${cls}\\b`, "g");
        highlighted = highlighted.replace(regex, `<span class="cl">${cls}</span>`);
      });

      methods.forEach((mth) => {
        const regex = new RegExp(`\\b${mth}\\b`, "g");
        highlighted = highlighted.replace(regex, `<span class="mth">${mth}</span>`);
      });

      highlighted = highlighted.replace(/([{}();,])/g, '<span class="sym">$1</span>');

      return highlighted;
    }

    async function typeText(text: string, element: any, minDelay = 20, maxDelay = 80, isCode = false, sceneId?: number) {
      let currentText = "";
      for (let i = 0; i < text.length; i++) {
        if (currentScene !== sceneId) return;

        currentText += text[i];

        if (isCode) {
          element.innerHTML = highlightSyntax(currentText);
          editorArea.scrollTop = editorArea.scrollHeight;
        } else {
          element.textContent = currentText;
        }

        let delay = Math.random() * (maxDelay - minDelay) + minDelay;

        if (text[i] === "\n" || text[i] === "." || text[i] === ";") {
          delay += 200;
        }

        await new Promise((resolve) => {
          const id = setTimeout(resolve, delay);
          if (sceneId === 1) scene1TimeoutIds.push(id);
        });
      }
    }

    async function moveMouse(x: number, y: number, duration = 1000, sceneId?: number) {
      if (currentScene !== sceneId) return;
      mouseCursor.style.transition = `top ${duration}ms ease-in-out, left ${duration}ms ease-in-out`;
      mouseCursor.style.left = `${x}px`;
      mouseCursor.style.top = `${y}px`;
      await new Promise((resolve) => {
        const id = setTimeout(resolve, duration);
        if (sceneId === 1) scene1TimeoutIds.push(id);
      });
    }

    function delayAsync(ms: number, sceneId?: number) {
      return new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          if (currentScene === sceneId) resolve();
        }, ms);
        if (sceneId === 1) scene1TimeoutIds.push(id);
        else if (sceneId === 2) scene2TimeoutIds.push(id);
        else if (sceneId === 3) scene3TimeoutIds.push(id);
        else if (sceneId === 4) scene4TimeoutIds.push(id);
        else if (sceneId === 5) scene5TimeoutIds.push(id);
        else if (sceneId === 6) scene6TimeoutIds.push(id);
        else if (sceneId === 7) scene7TimeoutIds.push(id);
      });
    }

    async function runScene1() {
      if (currentScene !== 1) return;
      isAnimating = true;

      await delayAsync(200, 1);
      if (currentScene !== 1) return;
      container.classList.add("visible");
      await delayAsync(600, 1);
      if (currentScene !== 1) return;

      mouseCursor.classList.add("active");
      const editorRect = editorArea.getBoundingClientRect();
      await moveMouse(editorRect.left + 50, editorRect.top + 50, 400, 1);
      if (currentScene !== 1) return;

      mouseCursor.style.opacity = "0";
      await delayAsync(100, 1);
      if (currentScene !== 1) return;

      await typeText(javaCode, codeElement, 1, 8, true, 1);
      if (currentScene !== 1) return;

      await delayAsync(300, 1);
      if (currentScene !== 1) return;

      codeCursor.style.display = "none";
      mouseCursor.style.opacity = "1";
      const inputRect = requestInputContainer.getBoundingClientRect();
      await moveMouse(inputRect.left + 50, inputRect.top + 30, 400, 1);
      if (currentScene !== 1) return;

      mouseCursor.style.opacity = "0";
      requestCursor.style.display = "inline-block";
      await delayAsync(100, 1);
      if (currentScene !== 1) return;

      await typeText(requestText, requestElement, 3, 12, false, 1);
      if (currentScene !== 1) return;

      await delayAsync(200, 1);
      if (currentScene !== 1) return;

      requestCursor.style.display = "none";
      mouseCursor.style.opacity = "1";
      const btnRect = $("submit-btn").getBoundingClientRect();
      await moveMouse(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2, 350, 1);
      if (currentScene !== 1) return;

      $("submit-btn").style.opacity = "1";
      await delayAsync(150, 1);
      if (currentScene !== 1) return;
      $("submit-btn").style.transform = "scale(0.95)";
      await delayAsync(100, 1);
      if (currentScene !== 1) return;
      $("submit-btn").style.transform = "scale(1)";

      await delayAsync(600, 1);
      if (currentScene === 1) {
        nextScene();
      }
    }

    function drawLine(lineElem: any, startElem: any, endElem: any) {
      const rect1 = startElem.getBoundingClientRect();
      const rect2 = endElem.getBoundingClientRect();

      const startX = rect1.left + rect1.width / 2;
      const startY = rect1.top + rect1.height / 2;
      const endX = rect2.left + rect2.width / 2;
      const endY = rect2.top + rect2.height / 2;

      const controlY = startY + (endY - startY) / 2;
      const path = `M ${startX} ${startY} C ${startX} ${controlY}, ${endX} ${controlY}, ${endX} ${endY}`;

      lineElem.setAttribute("d", path);
    }

    function updateAllLines() {
      drawLine(lineFeWs, nodeFE, nodeWS);

      const wsRect = nodeWS.getBoundingClientRect();
      const beRect = nodeBE.getBoundingClientRect();

      const startX = wsRect.left + wsRect.width / 2;
      const startY = wsRect.top + wsRect.height / 2;

      const endBeX = beRect.left + beRect.width / 2;
      const endBeY = beRect.top;

      const pathWsBe = `M ${startX} ${startY} C ${startX} ${endBeY - 50}, ${endBeX} ${endBeY - 50}, ${endBeX} ${endBeY}`;
      lineWsBe.setAttribute("d", pathWsBe);

      const beRectRight = beRect.right;
      const beCenterY = beRect.top + beRect.height / 2;
      const sessionRectLeft = nodeSession.getBoundingClientRect().left;

      const pathBeSession = `M ${beRectRight} ${beCenterY} L ${sessionRectLeft} ${beCenterY}`;
      lineBeSession.setAttribute("d", pathBeSession);
    }

    function createParticles() {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        const startX = centerX + (Math.random() - 0.5) * 100;
        const startY = centerY + (Math.random() - 0.5) * 100;

        particle.style.left = startX + "px";
        particle.style.top = startY + "px";

        const colors = ["#cba6f7", "#f9e2af", "#a6e3a1", "#89b4fa", "#cdd6f4"];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        particleContainer.appendChild(particle);

        setTimeout(() => {
          particle.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          particle.style.left = centerX + "px";
          particle.style.top = centerY + "px";
          particle.style.opacity = "0";
          particle.style.transform = `scale(${Math.random() * 2})`;
        }, 50);
      }

      setTimeout(() => {
        particleContainer.innerHTML = "";
      }, 1000);
    }

    async function runScene2() {
      if (currentScene !== 2) return;

      window.addEventListener("resize", updateAllLines);
      updateAllLines();

      scene2Container.classList.add("visible");

      await delayAsync(200, 2);
      if (currentScene !== 2) return;
      createParticles();

      await delayAsync(600, 2);
      if (currentScene !== 2) return;
      dataPacket.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease";
      dataPacket.style.opacity = "1";
      dataPacket.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(1000, 2);
      if (currentScene !== 2) return;

      nodeFE.classList.add("visible");
      await delayAsync(400, 2);
      if (currentScene !== 2) return;

      nodeWS.classList.add("visible");
      await delayAsync(400, 2);
      if (currentScene !== 2) return;

      nodeBE.classList.add("visible");
      await delayAsync(400, 2);
      if (currentScene !== 2) return;

      nodeSession.classList.add("visible");

      await delayAsync(800, 2);
      if (currentScene !== 2) return;

      const feRect = nodeFE.getBoundingClientRect();
      dataPacket.style.transition = "top 0.5s ease, left 0.5s ease";
      dataPacket.style.top = feRect.top + feRect.height / 2 + "px";
      dataPacket.style.left = feRect.left + feRect.width / 2 + "px";

      await delayAsync(600, 2);
      if (currentScene !== 2) return;

      lineFeWs.classList.add("active");

      const wsRect = nodeWS.getBoundingClientRect();
      dataPacket.style.transition = "top 1s ease-in-out, left 1s ease-in-out";
      dataPacket.style.top = wsRect.top + wsRect.height / 2 + "px";
      dataPacket.style.left = wsRect.left + wsRect.width / 2 + "px";

      await delayAsync(1000, 2);
      if (currentScene !== 2) return;

      dataPacket.style.transform = "translate(-50%, -50%) scale(1.2)";
      nodeWS.style.boxShadow = "0 0 30px rgba(137, 180, 250, 0.6)";
      await delayAsync(300, 2);
      dataPacket.style.transform = "translate(-50%, -50%) scale(1)";
      nodeWS.style.boxShadow = "0 0 15px rgba(137, 180, 250, 0.2)";

      if (currentScene !== 2) return;

      lineWsBe.classList.add("active");

      const beRect = nodeBE.getBoundingClientRect();
      dataPacket.style.top = beRect.top + beRect.height / 2 + "px";
      dataPacket.style.left = beRect.left + beRect.width / 2 + "px";

      await delayAsync(1000, 2);
      if (currentScene !== 2) return;

      dataPacket.style.transform = "translate(-50%, -50%) scale(0.5)";
      dataPacket.style.opacity = "0.5";

      await delayAsync(600, 2);
      if (currentScene !== 2) return;

      lineBeSession.classList.add("active");

      const sessionRect = nodeSession.getBoundingClientRect();
      dataPacket.style.top = sessionRect.top + sessionRect.height / 2 + "px";
      dataPacket.style.left = sessionRect.left + sessionRect.width / 2 + "px";

      await delayAsync(800, 2);
      if (currentScene !== 2) return;

      dataPacket.style.opacity = "0";

      nodeSession.style.transform = "translate(-50%, 0) scale(1.1)";
      nodeSession.style.boxShadow = "0 0 40px rgba(203, 166, 247, 0.5)";

      await delayAsync(300, 2);
      if (currentScene !== 2) return;

      nodeSession.style.transform = "translate(-50%, 0) scale(1)";
      nodeSession.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
      sessionInfo.classList.add("visible");

      await delayAsync(1500, 2);
      if (currentScene !== 2) return;

      nextPhaseIndicator.classList.add("visible");

      await delayAsync(2000, 2);
      if (currentScene === 2) {
        nextScene();
      }
    }

    async function runScene3() {
      if (currentScene !== 3) return;

      const containerS3 = $("scene3-container");
      const wrapper = $("chamber-wrapper");
      const core = $("chamber-core");
      const laser = $("core-laser");
      const codeRows = $$(".code-row");

      const modSyn = $("mod-syntax");
      const modSem = $("mod-semantic");
      const modComp = $("mod-complexity");

      const beamSyn = $("beam-syntax");
      const beamSem = $("beam-semantic");
      const beamComp = $("beam-complexity");

      containerS3.classList.add("visible");
      await delayAsync(300, 3);
      if (currentScene !== 3) return;
      wrapper.classList.add("visible");

      await delayAsync(800, 3);
      if (currentScene !== 3) return;

      beamSyn.classList.add("active");
      beamSem.classList.add("active");
      beamComp.classList.add("active");

      modSyn.classList.add("visible");
      modSem.classList.add("visible");
      modComp.classList.add("visible");

      await delayAsync(800, 3);
      if (currentScene !== 3) return;

      core.classList.add("scanning");
      laser.style.opacity = "1";
      laser.style.transition = "top 3s linear";
      laser.style.top = "90%";

      setTimeout(() => {
        if (currentScene === 3) modSyn.classList.add("active");
      }, 200);

      for (let i = 0; i < codeRows.length; i++) {
        if (currentScene !== 3) break;
        setTimeout(() => {
          if (currentScene === 3) codeRows[i].classList.add("scanned");
        }, i * (3000 / codeRows.length));
      }

      setTimeout(() => {
        if (currentScene === 3) {
          modSem.classList.add("active");
          $("core-target-row").classList.add("target");
          $("core-target-row2").classList.add("target");
          $("core-target-row3").classList.add("target");
        }
      }, 1500);

      setTimeout(() => {
        if (currentScene === 3) modComp.classList.add("active");
      }, 2200);

      await delayAsync(3200, 3);
      if (currentScene !== 3) return;

      laser.style.opacity = "0";
      core.classList.remove("scanning");

      modSyn.classList.add("complete");
      modSem.classList.add("complete");
      modComp.classList.add("complete");

      beamSyn.classList.remove("active");
      beamSyn.classList.add("return");
      beamSem.classList.remove("active");
      beamSem.classList.add("return");
      beamComp.classList.remove("active");
      beamComp.classList.add("return");

      await delayAsync(1200, 3);
      if (currentScene !== 3) return;

      beamSyn.classList.remove("return");
      beamSem.classList.remove("return");
      beamComp.classList.remove("return");

      core.style.transform = "translate(-50%, -50%) scale(0)";
      core.style.opacity = "0";

      await delayAsync(500, 3);
      if (currentScene !== 3) return;

      const artifact = $("baseline-artifact-s3");
      artifact.classList.add("visible");

      await delayAsync(400, 3);
      if (currentScene === 3) $("dot-syn").classList.add("syn-pass");
      await delayAsync(300, 3);
      if (currentScene === 3) $("dot-sem").classList.add("sem-pass");
      await delayAsync(300, 3);
      if (currentScene === 3) $("dot-comp").classList.add("comp-pass");

      await delayAsync(1000, 3);
      if (currentScene !== 3) return;

      $("next-phase-indicator-2").classList.add("visible");

      await delayAsync(2500, 3);
      if (currentScene === 3) {
        nextScene();
      }
    }

    function createClassificationParticles() {
      const container = $("scene4-container");
      const colors = ["#a6e3a1", "#89b4fa", "#f9e2af"];
      for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");
        p.className = "planner-particle";
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        p.style.left = "50%";
        p.style.top = "50%";

        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * 120;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        p.style.transform = `translate(${tx}px, ${ty}px)`;

        container.appendChild(p);

        setTimeout(() => {
          if (currentScene !== 4) return;
          p.style.transform = `translate(0px, 0px)`;
          p.style.opacity = "0";
        }, 50 + Math.random() * 200);

        setTimeout(() => p.remove(), 1000);
      }
    }

    function createIntentWords() {
      const container = $("scene4-container");
      const words = ["REFACTOR", "OPTIMIZE", "READABILITY"];

      words.forEach((wordText, index) => {
        const word = document.createElement("div");
        word.className = "intent-word";
        word.textContent = wordText;

        word.style.left = Math.random() > 0.5 ? "20%" : "80%";
        word.style.top = 30 + Math.random() * 40 + "%";

        container.appendChild(word);

        setTimeout(() => {
          if (currentScene !== 4) return;
          word.style.opacity = "1";
          word.style.transform = "scale(1.2)";
        }, index * 400);

        setTimeout(() => {
          if (currentScene !== 4) return;
          word.style.left = "50%";
          word.style.top = "50%";
          word.style.transform = "translate(-50%, -50%) scale(0)";
          word.style.opacity = "0";
        }, index * 400 + 800);

        setTimeout(() => word.remove(), 3000);
      });
    }

    async function runScene4() {
      if (currentScene !== 4) return;

      const container4 = $("scene4-container");
      container4.classList.add("visible");

      const badge = $("planner-model-badge");
      const core = $("planner-core");
      const inBaseline = $("input-baseline");
      const inInst = $("input-instruction");
      const intentPacket = $("intent-packet");
      const astContainer = $("ast-container");
      const synthSphere = $("synthesis-sphere");
      const blueprint = $("blueprint-artifact");
      const execPack = $("execution-package");

      await delayAsync(300, 4);
      if (currentScene !== 4) return;

      badge.classList.add("visible");
      core.style.opacity = "1";

      await delayAsync(800, 4);
      if (currentScene !== 4) return;

      inBaseline.style.opacity = "1";
      inBaseline.style.top = "15%";
      inInst.style.opacity = "1";
      inInst.style.top = "15%";

      await delayAsync(400, 4);
      if (currentScene !== 4) return;

      inBaseline.style.top = "50%";
      inBaseline.style.transform = "translate(-50%, -50%) scale(0.5)";
      inInst.style.top = "50%";
      inInst.style.transform = "translate(-50%, -50%) scale(0.5)";

      await delayAsync(600, 4);
      if (currentScene !== 4) return;

      inBaseline.style.opacity = "0";
      inInst.style.opacity = "0";

      const ringInnerS4 = root!.querySelector(".core-ring-inner") as HTMLElement | SVGElement | null;
      if (ringInnerS4) {
        ringInnerS4.style.stroke = "var(--string-color)";
        ringInnerS4.style.strokeWidth = "4";
      }

      intentPacket.style.opacity = "1";
      intentPacket.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(1200, 4);
      if (currentScene !== 4) return;

      intentPacket.style.transform = "translate(-250px, -50%) scale(0.8)";

      await delayAsync(400, 4);
      if (currentScene !== 4) return;

      astContainer.style.opacity = "1";
      astContainer.style.transform = "translate(100px, -50%) scale(0.7)";

      await delayAsync(800, 4);
      if (currentScene !== 4) return;

      $("ast-root").classList.add("dim");
      $("ast-var").classList.add("dim");
      $("ast-edge-left").classList.add("dim");

      $("ast-edge-target").classList.add("target");
      $("ast-issue").classList.add("target");

      await delayAsync(1500, 4);
      if (currentScene !== 4) return;

      intentPacket.style.transform = "translate(-50%, -50%) scale(0.5)";
      astContainer.style.transform = "translate(-50%, -50%) scale(0.3)";

      await delayAsync(500, 4);
      if (currentScene !== 4) return;

      intentPacket.style.opacity = "0";
      astContainer.style.opacity = "0";
      synthSphere.style.opacity = "1";
      synthSphere.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(800, 4);
      if (currentScene !== 4) return;

      synthSphere.style.transform = "translate(-50%, -50%) scale(1.3)";
      await delayAsync(300, 4);
      if (currentScene !== 4) return;
      synthSphere.style.transform = "translate(-50%, -50%) scale(0.5)";
      synthSphere.style.opacity = "0";

      blueprint.style.opacity = "1";
      blueprint.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(400, 4);
      if (currentScene !== 4) return;

      $("bp-card1").classList.add("visible");
      await delayAsync(400, 4);
      if (currentScene !== 4) return;

      $("bp-arrow1").classList.add("visible");
      $("bp-card2").classList.add("visible");
      await delayAsync(400, 4);
      if (currentScene !== 4) return;

      $("bp-arrow2").classList.add("visible");
      $("bp-card3").classList.add("visible");

      await delayAsync(2000, 4);
      if (currentScene !== 4) return;

      blueprint.style.transform = "translate(-50%, -50%) scale(0)";
      blueprint.style.opacity = "0";

      await delayAsync(400, 4);
      if (currentScene !== 4) return;

      execPack.style.opacity = "1";
      execPack.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(800, 4);
      if (currentScene !== 4) return;

      execPack.style.top = "150%";
      execPack.style.transform = "translate(-50%, -50%) scale(0.8)";

      await delayAsync(600, 4);
      if (currentScene === 4) {
        nextScene();
      }
    }

    async function runScene5() {
      if (currentScene !== 5) return;

      const container5 = $("scene5-container");
      container5.classList.add("visible");

      const badge = $("generator-model-badge");
      const blueprint = $("incoming-blueprint");
      const engine = $("generator-engine");
      const hex = $("gen-core-hex");
      const codeView = $("code-compare-container");
      const newCode = $("new-code-content");
      const oldCode = $("old-code-content");
      const status = $("gen-status");
      const completeBadge = $("refactor-complete");

      const originalJava = `public class StudentManager {

    private List<Student> students;

    public void addStudent(Student s) {
        students.add(s);
    }

    public void displayStudents() {`;
      const loopBlock = `
        for (Student s : students) {
            System.out.println(s.getName());
        }`;
      const closingJava = `
    }
}`;
      oldCode.innerHTML =
        document.createTextNode(originalJava).textContent +
        `<span id="s5-old-loop" style="display:inline; transition: all 0.5s ease; border-left: 3px solid transparent; padding-left: 4px;">` +
        document.createTextNode(loopBlock).textContent +
        `</span>` +
        document.createTextNode(closingJava).textContent;

      await delayAsync(300, 5);
      if (currentScene !== 5) return;
      badge.classList.add("visible");

      await delayAsync(600, 5);
      if (currentScene !== 5) return;

      status.textContent = "RECEIVING EXECUTION PACKAGE...";
      status.style.opacity = "1";

      blueprint.style.top = "25%";
      blueprint.style.opacity = "1";
      blueprint.style.transform = "translateX(-50%) scale(1)";

      await delayAsync(800, 5);
      if (currentScene !== 5) return;

      engine.style.opacity = "1";
      engine.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(800, 5);
      if (currentScene !== 5) return;

      blueprint.style.top = "25%";
      blueprint.style.transform = "translateX(-50%) scale(0)";
      blueprint.style.opacity = "0";

      engine.style.transform = "translate(-50%, -50%) scale(1.2)";
      hex.classList.add("active");

      await delayAsync(600, 5);
      if (currentScene !== 5) return;

      status.textContent = "UNPACKING PLAN: TARGETING IMPERATIVE LOOP...";
      engine.style.transform = "translate(-50%, -50%) scale(0.9)";

      await delayAsync(600, 5);
      if (currentScene !== 5) return;

      engine.style.top = "10%";
      engine.style.transform = "translate(-50%, -50%) scale(0.5)";

      codeView.style.opacity = "1";
      codeView.style.transform = "translateY(0)";

      await delayAsync(1000, 5);
      if (currentScene !== 5) return;

      const oldLoop = $("s5-old-loop");
      if (oldLoop) {
        oldLoop.style.backgroundColor = "rgba(255, 95, 86, 0.15)";
        oldLoop.style.borderLeftColor = "#ff5f56";
        oldLoop.style.boxShadow = "inset 0 0 15px rgba(255, 95, 86, 0.1)";
      }

      await delayAsync(1000, 5);
      if (currentScene !== 5) return;

      status.textContent = "STREAMING DECLARATIVE REFACTOR...";

      const refactoredCode = `public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {
        students.stream()
                .map(Student::getName)
                .forEach(System.out::println);
    }
}`;

      let currentText = "";
      const streamStart = refactoredCode.indexOf("students.stream()");
      for (let i = 0; i < refactoredCode.length; i++) {
        if (currentScene !== 5) return;
        currentText += refactoredCode[i];

        if (i >= streamStart && streamStart !== -1) {
          const beforeStream = document.createTextNode(refactoredCode.substring(0, streamStart)).textContent;
          const streamPart = document.createTextNode(currentText.substring(streamStart)).textContent;
          newCode.innerHTML =
            beforeStream +
            `<span class="highlight-green" style="display:inline;">${streamPart}</span>` +
            '<span class="blinking-cursor"></span>';
        } else {
          newCode.textContent = currentText;
        }

        await new Promise((resolve) => {
          const id = setTimeout(resolve, 15);
          scene5TimeoutIds.push(id);
        });
      }

      const beforeStream2 = refactoredCode.substring(0, streamStart);
      const streamPart2 = refactoredCode.substring(streamStart);
      newCode.innerHTML =
        document.createTextNode(beforeStream2).textContent +
        `<span class="highlight-green" style="display:inline;">${document.createTextNode(streamPart2).textContent}</span>`;

      await delayAsync(600, 5);
      if (currentScene !== 5) return;

      status.textContent = "GENERATION COMPLETE";
      hex.classList.remove("active");

      completeBadge.classList.add("visible");
    }

    async function runScene6() {
      if (currentScene !== 6) return;

      const container6 = $("scene6-container");
      container6.classList.add("visible");

      const core = $("val-core");
      const synMod = $("val-syntax");
      const boundMod = $("val-boundary");
      const compMod = $("val-complexity");
      const fbPacket = $("val-feedback");
      const retryNode = $("val-retry-node");
      const beams = $$(".val-beam");

      await delayAsync(600, 6);
      if (currentScene !== 6) return;
      core.style.opacity = "1";
      core.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(800, 6);
      if (currentScene !== 6) return;

      beams.forEach((b: any) => b.classList.add("active-beam"));

      synMod.classList.add("processing");
      await delayAsync(800, 6);
      if (currentScene !== 6) return;

      $("syn-token-1").setAttribute("x", "20");
      $("syn-token-2").setAttribute("x", "20");
      $("syn-token-3").setAttribute("x", "20");

      await delayAsync(400, 6);
      synMod.classList.remove("processing");
      synMod.classList.add("pass");
      $("val-beam-syntax").classList.replace("active-beam", "pass-beam");

      if (currentScene !== 6) return;
      boundMod.classList.add("processing");
      await delayAsync(800, 6);

      $("bound-shield").style.opacity = "1";
      $("bound-shield").style.stroke = "var(--string-color)";

      await delayAsync(400, 6);
      boundMod.classList.remove("processing");
      boundMod.classList.add("pass");
      $("val-beam-boundary").classList.replace("active-beam", "pass-beam");

      if (currentScene !== 6) return;
      compMod.classList.add("processing");
      await delayAsync(500, 6);

      $("comp-bar-gen").setAttribute("y", "20");
      $("comp-bar-gen").setAttribute("height", "65");

      await delayAsync(800, 6);
      if (currentScene !== 6) return;

      compMod.classList.remove("processing");
      compMod.classList.add("fail");
      $("val-beam-complexity").classList.replace("active-beam", "fail-beam");
      core.classList.add("fail-core");

      await delayAsync(600, 6);
      if (currentScene !== 6) return;

      fbPacket.style.opacity = "1";
      fbPacket.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(800, 6);
      if (currentScene !== 6) return;

      fbPacket.style.top = "20%";
      fbPacket.style.left = "20%";

      await delayAsync(1200, 6);
      if (currentScene !== 6) return;

      fbPacket.style.opacity = "0";
      retryNode.classList.add("active-retry");
      $("val-attempt").textContent = "Attempt: 2";

      core.style.opacity = "0";
      core.classList.remove("fail-core");

      synMod.classList.remove("pass");
      boundMod.classList.remove("pass");
      compMod.classList.remove("fail");
      $$(".val-beam").forEach((b: any) => {
        b.classList.remove("pass-beam", "fail-beam");
      });
      $("syn-token-1").setAttribute("x", "10");
      $("syn-token-2").setAttribute("x", "40");
      $("comp-bar-gen").setAttribute("y", "75");
      $("comp-bar-gen").setAttribute("height", "10");
      $("bound-shield").style.opacity = "0.2";
      $("bound-shield").style.stroke = "var(--method-color)";

      await delayAsync(1000, 6);
      if (currentScene !== 6) return;

      retryNode.classList.remove("active-retry");
      core.style.opacity = "1";

      await delayAsync(800, 6);
      if (currentScene !== 6) return;

      $$(".val-beam").forEach((b: any) => b.classList.add("pass-beam"));
      synMod.classList.add("pass");
      boundMod.classList.add("pass");
      compMod.classList.add("pass");

      $("syn-token-1").setAttribute("x", "20");
      $("syn-token-2").setAttribute("x", "20");

      $("comp-bar-gen").setAttribute("y", "65");
      $("comp-bar-gen").setAttribute("height", "20");

      $("bound-shield").style.opacity = "1";
      $("bound-shield").style.stroke = "var(--string-color)";

      await delayAsync(1200, 6);
      if (currentScene !== 6) return;

      core.style.opacity = "0";

      const validatedPack = $("validated-package");
      validatedPack.style.opacity = "1";
      validatedPack.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(1500, 6);
      if (currentScene !== 6) return;

      validatedPack.style.left = "150%";

      await delayAsync(800, 6);
      if (currentScene === 6) {
        nextScene();
      }
    }

    async function runScene7() {
      if (currentScene !== 7) return;

      const container7 = $("scene7-container");
      container7.classList.add("visible");

      const qwenBadge = $("s7-qwen-badge");
      const llamaBadge = $("s7-llama-badge");
      const qwenStatus = $("qwen-status");
      const llamaStatus = $("llama-status");

      const originalBox = $("s7-box-original");
      const refactoredBox = $("s7-box-refactored");

      const judgeCore = $("judge-core-container");
      const judgeCrystal = $("judge-crystal");

      const beams = [$("s7-beam-logic"), $("s7-beam-struct"), $("s7-beam-quality")];
      const labels = [$("s7-label-logic"), $("s7-label-struct"), $("s7-label-quality")];

      const feedback = $("s7-feedback-packet");
      const iterCounter = $("s7-iteration-counter");

      await delayAsync(300, 7);
      if (currentScene !== 7) return;

      qwenBadge.classList.add("active-center");

      await delayAsync(1000, 7);
      if (currentScene !== 7) return;

      qwenStatus.textContent = "UNLOAD";
      qwenStatus.style.color = "#ff5f56";

      await delayAsync(800, 7);
      if (currentScene !== 7) return;

      qwenBadge.classList.remove("active-center");
      qwenBadge.classList.add("exit-left");

      llamaBadge.classList.remove("enter-right");
      llamaBadge.classList.add("active-center");

      await delayAsync(1000, 7);
      if (currentScene !== 7) return;

      llamaStatus.textContent = "LOAD";
      llamaStatus.style.color = "var(--string-color)";

      await delayAsync(800, 7);
      if (currentScene !== 7) return;

      llamaStatus.textContent = "ACTIVE";

      iterCounter.style.opacity = "1";

      await delayAsync(500, 7);
      if (currentScene !== 7) return;

      originalBox.classList.add("visible");
      refactoredBox.classList.add("visible");

      await delayAsync(800, 7);
      if (currentScene !== 7) return;

      judgeCore.style.opacity = "1";
      judgeCore.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(1200, 7);
      if (currentScene !== 7) return;

      beams.forEach((b) => b.classList.add("active"));
      labels.forEach((l) => (l.style.opacity = "1"));

      await delayAsync(1500, 7);
      if (currentScene !== 7) return;

      beams[2].classList.add("reject");
      labels[2].style.color = "#ff5f56";
      judgeCrystal.classList.add("reject");

      await delayAsync(800, 7);
      if (currentScene !== 7) return;

      feedback.style.opacity = "1";
      feedback.style.transform = "translate(-50%, -50%) scale(1)";

      await delayAsync(800, 7);
      if (currentScene !== 7) return;

      feedback.style.left = "-20%";

      await delayAsync(1000, 7);
      if (currentScene !== 7) return;

      beams.forEach((b) => b.classList.remove("active", "reject"));
      labels.forEach((l) => {
        l.style.opacity = "0";
        l.style.color = "var(--class-color)";
      });
      judgeCrystal.classList.remove("reject");
      feedback.style.opacity = "0";
      feedback.style.left = "50%";
      feedback.style.transform = "translate(-50%, -50%) scale(0)";

      refactoredBox.style.opacity = "0";
      refactoredBox.style.transform = "translateY(-30px)";

      iterCounter.textContent = "STRATEGY ITERATION: 2";

      await delayAsync(1200, 7);
      if (currentScene !== 7) return;

      refactoredBox.style.transform = "translateY(30px)";
      await delayAsync(100, 7);
      if (currentScene !== 7) return;
      refactoredBox.style.opacity = "1";
      refactoredBox.style.transform = "translateY(0)";

      await delayAsync(800, 7);
      if (currentScene !== 7) return;

      beams.forEach((b) => b.classList.add("active"));
      labels.forEach((l) => (l.style.opacity = "1"));

      await delayAsync(1800, 7);
      if (currentScene !== 7) return;

      beams.forEach((b) => {
        b.classList.remove("active", "reject");
        b.classList.add("accept");
      });
      labels.forEach((l) => (l.style.color = "var(--string-color)"));
      judgeCrystal.classList.remove("reject");
      judgeCrystal.classList.add("accept");

      await delayAsync(600, 7);
      if (currentScene !== 7) return;

      iterCounter.style.color = "var(--string-color)";
      iterCounter.textContent = "✅ VALIDATION SUCCESSFUL — OUTPUT APPROVED";

      await delayAsync(1400, 7);
      if (currentScene !== 7) return;

      judgeCore.style.transition = "all 0.6s ease";
      judgeCore.style.opacity = "0";
      judgeCore.style.transform = "translate(-50%, -50%) scale(0)";
      beams.forEach((b) => {
        b.style.transition = "opacity 0.5s";
        b.style.opacity = "0";
      });
      labels.forEach((l) => (l.style.opacity = "0"));
      originalBox.style.transition = "opacity 0.5s ease";
      originalBox.style.opacity = "0";
      refactoredBox.style.transition = "opacity 0.5s ease";
      refactoredBox.style.opacity = "0";
      iterCounter.style.opacity = "0";
      $("s7-llama-badge").style.opacity = "0";

      await delayAsync(700, 7);
      if (currentScene !== 7) return;

      $("s7-final-comparison").classList.add("visible");
    }

    let currentScene = 1;
    const totalScenes = 7;

    function updateNavButtons() {
      const prevBtn = $("prev-btn");
      const nextBtn = $("next-btn");

      if (currentScene <= 1) {
        prevBtn.style.opacity = "0.2";
        prevBtn.style.cursor = "default";
      } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
      }

      if (currentScene >= totalScenes) {
        nextBtn.style.opacity = "0.2";
        nextBtn.style.cursor = "default";
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
      }
    }

    function clearAllTimeouts() {
      scene1TimeoutIds.forEach(clearTimeout);
      scene2TimeoutIds.forEach(clearTimeout);
      scene3TimeoutIds.forEach(clearTimeout);
      scene4TimeoutIds.forEach(clearTimeout);
      scene5TimeoutIds.forEach(clearTimeout);
      scene6TimeoutIds.forEach(clearTimeout);
      scene7TimeoutIds.forEach(clearTimeout);
      scene1TimeoutIds = [];
      scene2TimeoutIds = [];
      scene3TimeoutIds = [];
      scene4TimeoutIds = [];
      scene5TimeoutIds = [];
      scene6TimeoutIds = [];
      scene7TimeoutIds = [];
    }

    async function nextScene() {
      if (currentScene < totalScenes) {
        clearAllTimeouts();

        if (currentScene === 1) {
          container.style.opacity = "0";
          container.style.transform = "scale(0.95)";
          $("mouse-cursor").style.opacity = "0";
        } else if (currentScene === 2) {
          scene2Container.style.opacity = "0";
        } else if (currentScene === 3) {
          $("scene3-container").style.opacity = "0";
        } else if (currentScene === 4) {
          $("scene4-container").style.opacity = "0";
        } else if (currentScene === 5) {
          $("scene5-container").style.opacity = "0";
        } else if (currentScene === 6) {
          $("scene6-container").style.opacity = "0";
        } else if (currentScene === 7) {
          $("scene7-container").style.opacity = "0";
        }

        await new Promise((resolve) => setTimeout(resolve, 600));

        currentScene++;
        updateNavButtons();

        resetSceneState();

        if (currentScene === 2) runScene2();
        else if (currentScene === 3) runScene3();
        else if (currentScene === 4) runScene4();
        else if (currentScene === 5) runScene5();
        else if (currentScene === 6) runScene6();
        else if (currentScene === 7) runScene7();
      }
    }

    async function prevScene() {
      if (currentScene > 1) {
        clearAllTimeouts();

        if (currentScene === 2) {
          scene2Container.style.opacity = "0";
        } else if (currentScene === 3) {
          $("scene3-container").style.opacity = "0";
        } else if (currentScene === 4) {
          $("scene4-container").style.opacity = "0";
        } else if (currentScene === 5) {
          $("scene5-container").style.opacity = "0";
        } else if (currentScene === 6) {
          $("scene6-container").style.opacity = "0";
        } else if (currentScene === 7) {
          $("scene7-container").style.opacity = "0";
        }

        await new Promise((resolve) => setTimeout(resolve, 600));

        currentScene--;
        updateNavButtons();

        resetSceneState();

        if (currentScene === 1) {
          container.style.opacity = "0";
          container.style.transform = "scale(0.95)";
          runScene1();
        } else if (currentScene === 2) runScene2();
        else if (currentScene === 3) runScene3();
        else if (currentScene === 4) runScene4();
        else if (currentScene === 5) runScene5();
        else if (currentScene === 6) runScene6();
        else if (currentScene === 7) runScene7();
      }
    }

    function resetSceneState() {
      // Reset Scene 1 elements
      codeElement.innerHTML = "";
      requestElement.textContent = "";
      codeCursor.style.display = "inline-block";
      requestCursor.style.display = "none";
      mouseCursor.style.opacity = "0";
      mouseCursor.style.top = "100%";
      mouseCursor.style.left = "50%";
      $("submit-btn").style.opacity = "0.5";
      $("submit-btn").style.transform = "scale(1)";
      container.classList.remove("visible");
      container.style.opacity = "";
      container.style.transform = "";

      // Reset Scene 2 elements
      scene2Container.classList.remove("visible");
      scene2Container.style.opacity = "";
      dataPacket.style.opacity = "0";
      dataPacket.style.transform = "translate(-50%, -50%) scale(0)";
      dataPacket.style.top = "50%";
      dataPacket.style.left = "50%";

      nodeFE.classList.remove("visible");
      nodeWS.classList.remove("visible");
      nodeBE.classList.remove("visible");
      nodeSession.classList.remove("visible");

      lineFeWs.classList.remove("active");
      lineWsBe.classList.remove("active");
      lineBeSession.classList.remove("active");

      sessionInfo.classList.remove("visible");
      nextPhaseIndicator.classList.remove("visible");
      particleContainer.innerHTML = "";

      // Reset Scene 3 elements
      $("scene3-container").classList.remove("visible");
      $("scene3-container").style.opacity = "";

      const wrapper = $("chamber-wrapper");
      if (wrapper) {
        wrapper.classList.remove("visible");
        const core = $("chamber-core");
        core.style.transform = "";
        core.style.opacity = "";
        core.classList.remove("scanning");

        $("core-laser").style.opacity = "0";
        $("core-laser").style.top = "10%";
        $("core-laser").style.transition = "none";

        $$(".code-row").forEach((row: any) => {
          row.classList.remove("scanned", "target");
        });

        ["mod-syntax", "mod-semantic", "mod-complexity"].forEach((id) => {
          const el = $(id);
          if (el) el.classList.remove("visible", "active", "complete");
        });

        ["beam-syntax", "beam-semantic", "beam-complexity"].forEach((id) => {
          const el = $(id);
          if (el) el.classList.remove("active", "return");
        });

        $("baseline-artifact-s3").classList.remove("visible");
        $("dot-syn").classList.remove("syn-pass");
        $("dot-sem").classList.remove("sem-pass");
        $("dot-comp").classList.remove("comp-pass");
      }

      $("next-phase-indicator-2").classList.remove("visible");

      // Reset Scene 4 elements
      const scene4 = $("scene4-container");
      if (scene4) {
        scene4.classList.remove("visible");
        scene4.style.opacity = "";

        $("planner-model-badge").classList.remove("visible");
        $("planner-core").style.opacity = "0";
        const ringInnerReset = root!.querySelector(".core-ring-inner") as HTMLElement | SVGElement | null;
        if (ringInnerReset) {
          ringInnerReset.style.stroke = "rgba(166, 227, 161, 0.3)";
          ringInnerReset.style.strokeWidth = "2";
        }

        const inBaseline = $("input-baseline");
        inBaseline.style.opacity = "0";
        inBaseline.style.top = "-50px";
        inBaseline.style.transform = "translateX(-50%)";
        const inInst = $("input-instruction");
        inInst.style.opacity = "0";
        inInst.style.top = "-50px";
        inInst.style.transform = "translateX(-50%)";

        const intentPacket = $("intent-packet");
        intentPacket.style.opacity = "0";
        intentPacket.style.transform = "translate(-50%, -50%) scale(0)";
        intentPacket.style.top = "50%";
        intentPacket.style.left = "50%";

        const astContainer = $("ast-container");
        astContainer.style.opacity = "0";
        astContainer.style.transform = "translate(-50%, -50%) scale(0.5)";

        ["ast-root", "ast-var", "ast-branch-r", "ast-issue"].forEach((id) => {
          const el = $(id);
          if (el) el.classList.remove("dim", "target");
        });
        ["ast-edge-left", "ast-edge-right", "ast-edge-target"].forEach((id) => {
          const el = $(id);
          if (el) el.classList.remove("dim", "target");
        });

        const synthSphere = $("synthesis-sphere");
        synthSphere.style.opacity = "0";
        synthSphere.style.transform = "translate(-50%, -50%) scale(0)";

        const blueprint = $("blueprint-artifact");
        blueprint.style.opacity = "0";
        blueprint.style.transform = "translate(-50%, -50%) scale(0)";

        ["bp-card1", "bp-card2", "bp-card3"].forEach((id) => {
          const el = $(id);
          if (el) el.classList.remove("visible");
        });
        ["bp-arrow1", "bp-arrow2"].forEach((id) => {
          const el = $(id);
          if (el) el.classList.remove("visible");
        });

        const execPack = $("execution-package");
        execPack.style.opacity = "0";
        execPack.style.transform = "translate(-50%, -50%) scale(0)";
        execPack.style.top = "50%";
      }

      $$(".planner-particle").forEach((el: any) => el.remove());

      // Reset Scene 5 elements
      const scene5 = $("scene5-container");
      if (scene5) {
        scene5.classList.remove("visible");
        scene5.style.opacity = "";
        $("generator-model-badge").classList.remove("visible");
        $("incoming-blueprint").style.top = "-100px";
        $("incoming-blueprint").style.opacity = "0";
        $("incoming-blueprint").style.transform = "translateX(-50%)";
        $("generator-engine").style.transform = "translate(-50%, -50%) scale(0)";
        $("generator-engine").style.opacity = "0";
        $("generator-engine").style.top = "25%";
        $("gen-core-hex").classList.remove("active");
        $("code-compare-container").style.opacity = "0";
        $("code-compare-container").style.transform = "translateY(40px)";
        $("new-code-content").innerHTML = "";
        $("refactor-complete").classList.remove("visible");
        $("gen-status").style.opacity = "0";
      }

      // Reset Scene 6 elements
      const scene6 = $("scene6-container");
      if (scene6) {
        scene6.classList.remove("visible");
        scene6.style.opacity = "";

        const core = $("val-core");
        core.style.opacity = "0";
        core.style.transform = "translate(-50%, -50%) scale(0)";
        core.classList.remove("fail-core");

        ["val-syntax", "val-boundary", "val-complexity"].forEach((id) => {
          const el = $(id);
          if (el) el.classList.remove("processing", "pass", "fail");
        });

        $$(".val-beam").forEach((b: any) => {
          b.classList.remove("active-beam", "pass-beam", "fail-beam");
        });

        $("syn-token-1").setAttribute("x", "10");
        $("syn-token-2").setAttribute("x", "40");
        $("syn-token-3").setAttribute("x", "20");

        $("bound-shield").style.opacity = "0.2";
        $("bound-shield").style.stroke = "var(--method-color)";

        $("comp-bar-gen").setAttribute("y", "75");
        $("comp-bar-gen").setAttribute("height", "10");

        const fb = $("val-feedback");
        fb.style.opacity = "0";
        fb.style.transform = "translate(-50%, -50%) scale(0)";
        fb.style.top = "50%";
        fb.style.left = "75%";

        $("val-retry-node").classList.remove("active-retry");
        $("val-attempt").textContent = "Attempt: 1";

        const valPack = $("validated-package");
        valPack.style.opacity = "0";
        valPack.style.transform = "translate(-50%, -50%) scale(0)";
        valPack.style.left = "50%";
      }

      // Reset Scene 7 elements
      const scene7 = $("scene7-container");
      if (scene7) {
        scene7.classList.remove("visible");
        scene7.style.opacity = "";

        $("s7-qwen-badge").classList.remove("active-center", "exit-left");
        $("s7-llama-badge").classList.remove("active-center");
        $("s7-llama-badge").classList.add("enter-right");
        $("s7-llama-badge").style.top = "";
        $("qwen-status").textContent = "ACTIVE";
        $("qwen-status").style.color = "";
        $("llama-status").textContent = "STANDBY";
        $("llama-status").style.color = "var(--class-color)";

        $("s7-box-original").classList.remove("visible");
        $("s7-box-original").removeAttribute("style");
        $("s7-box-refactored").classList.remove("visible");
        $("s7-box-refactored").removeAttribute("style");

        $("judge-core-container").style.opacity = "0";
        $("judge-core-container").style.transform = "translate(-50%, -50%) scale(0)";
        $("judge-core-container").style.transition = "";
        $("judge-crystal").classList.remove("reject", "accept");

        $$(".eval-beam").forEach((b: any) => {
          b.classList.remove("active", "reject", "accept");
          b.style.opacity = "";
          b.style.transition = "";
        });
        $$(".beam-label").forEach((l: any) => {
          l.style.opacity = "0";
          l.style.color = "";
        });

        $("s7-feedback-packet").style.opacity = "0";
        $("s7-feedback-packet").style.transform = "translate(-50%, -50%) scale(0)";
        $("s7-feedback-packet").style.left = "50%";

        $("s7-iteration-counter").style.opacity = "0";
        $("s7-iteration-counter").style.color = "";
        $("s7-iteration-counter").textContent = "STRATEGY ITERATION: 1";

        $("s7-llama-badge").style.opacity = "";
        $("fallback-shield").style.opacity = "0";
        $("fallback-text").style.opacity = "0";

        $("s7-final-comparison").classList.remove("visible");
      }
    }

    // Wire up nav buttons (originally inline onclick="")
    const prevBtnEl = $("prev-btn");
    const nextBtnEl = $("next-btn");
    prevBtnEl.addEventListener("click", prevScene);
    nextBtnEl.addEventListener("click", nextScene);

    // Kick off (originally window.addEventListener('load', ...))
    updateNavButtons();
    runScene1();

    return () => {
      currentScene = -1; // stop any in-flight async loops from proceeding
      clearAllTimeouts();
      window.removeEventListener("resize", updateAllLines);
      prevBtnEl.removeEventListener("click", prevScene);
      nextBtnEl.removeEventListener("click", nextScene);
      particleContainer.innerHTML = "";
      if (fontLink.parentNode) fontLink.parentNode.removeChild(fontLink);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="refactor-animation-root">
      <PhaseStyles />
      <PhaseNav />
      <Phase1Input />
      <Phase2Pipeline />
      <Phase3Analysis />
      <Phase4Decomposition />
      <Phase5Generation />
      <Phase6Validation />
      <Phase7Evaluation />
      <div id="mouse-cursor"></div>
    </div>
  );
}