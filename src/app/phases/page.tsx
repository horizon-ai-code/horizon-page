'use client';

import React, { useEffect, useRef } from "react";

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
      `}</style>
      <style>{`
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
      `}</style>
      <style>{`
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
      `}</style>
      <style>{`
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

      <button id="prev-btn" className="nav-btn" type="button">←</button>
      <button id="next-btn" className="nav-btn" type="button">→</button>

      {/* Scene 1 Container */}
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
              <span id="request-cursor" className="blinking-cursor" style={{ display: "none" }}></span>
            </div>
            <button className="submit-btn" id="submit-btn" type="button">Refactor</button>
          </div>
        </div>
      </div>

      {/* Scene 2 Container */}
      <div id="scene2-container" className="scene">
        <svg id="arch-canvas">
          <path id="line-fe-ws" className="flow-line" d=""></path>
          <path id="line-ws-be" className="flow-line" d=""></path>
          <path id="line-be-session" className="flow-line" d=""></path>
        </svg>

        <div id="node-frontend" className="arch-node">
          <div className="node-icon">💻</div>
          <div className="node-title">USER INTERFACE</div>
        </div>

        <div id="node-ws" className="arch-node">
          <div className="node-icon">⚡</div>
          <div className="node-title">WebSocket Connection</div>
        </div>

        <div id="node-backend" className="arch-node">
          <div className="node-icon">⚙️</div>
          <div className="node-title">HorizonAI Backend</div>
          <div style={{ fontSize: "12px", color: "#bac2de", marginTop: "5px" }}>Orchestrator</div>
        </div>

        <div id="node-session" className="arch-node">
          <div className="node-icon">🗄️</div>
          <div className="node-title">Session Manager</div>
          <div className="session-details" id="session-info">
            SESSION<br />
            #HZN-001<br />
            <span style={{ color: "var(--string-color)" }}>ACTIVE</span>
          </div>
        </div>

        <div className="data-packet" id="data-packet">{"{ Request }"}</div>

        <div id="particle-container"></div>

        <div id="next-phase-indicator">
          <div className="arrow-down">↓</div>
          <div className="phase-text">Phase 1: Baseline Analysis</div>
        </div>
      </div>

      {/* Scene 3 Container */}
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
          <div className="arrow-down">↓</div>
          <div className="phase-text" style={{ color: "var(--keyword-color)" }}>Phase 2: Strategy Block</div>
        </div>
      </div>

      {/* Scene 4 Container */}
      <div id="scene4-container" className="scene">
        <div id="planner-model-badge" className="model-badge badge-planner">
          <div className="badge-icon">🧠</div>
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

        <div id="intent-packet">🎯</div>

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
            <div className="bp-icon-large" style={{ color: "#ff5f56" }}>🎯</div>
            <div className="bp-card-title">Target Loop</div>
          </div>

          <div className="bp-arrow" id="bp-arrow1">→</div>

          <div className="bp-card" id="bp-card2">
            <div className="bp-icon-large" style={{ color: "var(--keyword-color)" }}>✂️</div>
            <div className="bp-card-title">Extract Logic</div>
          </div>

          <div className="bp-arrow" id="bp-arrow2">→</div>

          <div className="bp-card" id="bp-card3">
            <div className="bp-icon-large" style={{ color: "var(--string-color)" }}>✨</div>
            <div className="bp-card-title">Generate Stream</div>
          </div>
        </div>

        <div id="execution-package" className="execution-package">
          [ EXECUTION PLAN ]
        </div>
      </div>

      {/* Scene 5 Container */}
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

      {/* Scene 6 Container */}
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
          <div className="badge-icon">⚙️</div>
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

        <div id="val-feedback" className="val-feedback">
          ⚠️ O(N²) Detected
        </div>

        <div id="validated-package" className="validated-package">
          <span style={{ fontSize: "20px" }}>✅</span> VALIDATED CODE
        </div>
      </div>

      {/* Scene 7 Container */}
      <div id="scene7-container" className="scene">
        <div id="s7-iteration-counter">STRATEGY ITERATION: 1</div>

        <div id="model-swap-area">
          <div id="s7-qwen-badge" className="model-badge badge-planner swap-badge">
            <div className="badge-icon">⚙️</div>
            <div className="badge-details">
              <div className="badge-title">GENERATOR ENGINE</div>
              <div className="badge-model">Qwen2.5-Coder-3B-Instruct</div>
              <div id="qwen-status" className="model-status-text">ACTIVE</div>
            </div>
          </div>

          <div id="s7-llama-badge" className="model-badge badge-judge swap-badge enter-right">
            <div className="badge-icon">⚖️</div>
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

        <div id="s7-feedback-packet">
          <span>⚠️</span> REFACTORING QUALITY DEGRADATION
        </div>

        <div id="s7-final-comparison">
          <div className="s7-final-title">✅ VALIDATED OUTPUT — ITERATION 2 APPROVED</div>
          <div className="s7-final-panels">
            <div className="s7-code-panel original">
              <div className="s7-panel-header">⚠ ORIGINAL — IMPERATIVE LOOP</div>
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
            <div className="s7-panel-arrow">→</div>
            <div className="s7-code-panel refactored">
              <div className="s7-panel-header">✅ REFACTORED — DECLARATIVE STREAM</div>
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

      <div id="mouse-cursor"></div>
    </div>
  );
}