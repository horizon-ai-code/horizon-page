"use client"

import React, { useState, useEffect, useRef } from "react"

export default function PhasesPage() {
  const [currentScene, setCurrentScene] = useState<number>(1)
  const totalScenes = 7

  // --- Scene 1 State ---
  const [s1ContainerVisible, setS1ContainerVisible] = useState(false)
  const [s1CodeText, setS1CodeText] = useState("")
  const [s1CodeCursor, setS1CodeCursor] = useState(true)
  const [s1RequestText, setS1RequestText] = useState("")
  const [s1RequestCursor, setS1RequestCursor] = useState(false)
  const [s1Mouse, setS1Mouse] = useState<{ x: number; y: number; opacity: number; active: boolean }>({
    x: 50,
    y: 100,
    opacity: 0,
    active: false,
  })
  const [s1SubmitBtn, setS1SubmitBtn] = useState({ opacity: 0.5, transform: "scale(1)" })

  // --- Scene 2 State ---
  const [s2ContainerVisible, setS2ContainerVisible] = useState(false)
  const [s2DataPacket, setS2DataPacket] = useState({
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0)",
    top: "50%",
    left: "50%",
    transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease",
  })
  const [s2Nodes, setS2Nodes] = useState({ fe: false, ws: false, be: false, session: false })
  const [s2Lines, setS2Lines] = useState({ feWs: false, wsBe: false, beSession: false })
  const [s2WsShadow, setS2WsShadow] = useState("0 10px 30px rgba(0, 0, 0, 0.3)")
  const [s2SessionTransform, setS2SessionTransform] = useState("translate(-50%, 0) scale(1)")
  const [s2SessionShadow, setS2SessionShadow] = useState("0 10px 30px rgba(0, 0, 0, 0.3)")
  const [s2SessionInfoVisible, setS2SessionInfoVisible] = useState(false)
  const [s2NextPhaseVisible, setS2NextPhaseVisible] = useState(false)
  const [s2Particles, setS2Particles] = useState<Array<{ id: number; left: number; top: number; bg: string; targetLeft: number; targetTop: number; scale: number; opacity: number }>>([])

  // --- Scene 3 State ---
  const [s3ContainerVisible, setS3ContainerVisible] = useState(false)
  const [s3WrapperVisible, setS3WrapperVisible] = useState(false)
  const [s3CoreState, setS3CoreState] = useState({ scanning: false, opacity: 1, transform: "translate(-50%, -50%) scale(1)" })
  const [s3LaserState, setS3LaserState] = useState({ opacity: 0, top: "10%", transition: "none" })
  const [s3CodeScanned, setS3CodeScanned] = useState<boolean[]>(new Array(14).fill(false))
  const [s3CodeTarget, setS3CodeTarget] = useState(false)
  const [s3ModulesVisible, setS3ModulesVisible] = useState({ syn: false, sem: false, comp: false })
  const [s3ModulesActive, setS3ModulesActive] = useState({ syn: false, sem: false, comp: false })
  const [s3ModulesComplete, setS3ModulesComplete] = useState({ syn: false, sem: false, comp: false })
  const [s3Beams, setS3Beams] = useState({
    syn: "" as "" | "active" | "return",
    sem: "" as "" | "active" | "return",
    comp: "" as "" | "active" | "return",
  })
  const [s3ArtifactVisible, setS3ArtifactVisible] = useState(false)
  const [s3Dots, setS3Dots] = useState({ syn: false, sem: false, comp: false })
  const [s3NextPhaseVisible, setS3NextPhaseVisible] = useState(false)

  // --- Scene 4 State ---
  const [s4ContainerVisible, setS4ContainerVisible] = useState(false)
  const [s4BadgeVisible, setS4BadgeVisible] = useState(false)
  const [s4CoreOpacity, setS4CoreOpacity] = useState(0)
  const [s4InnerRingStyle, setS4InnerRingStyle] = useState({ stroke: "rgba(166, 227, 161, 0.3)", strokeWidth: "2" })
  const [s4InputBaseline, setS4InputBaseline] = useState({ opacity: 0, top: "-50px", transform: "translateX(-50%)" })
  const [s4InputInstruction, setS4InputInstruction] = useState({ opacity: 0, top: "-50px", transform: "translateX(-50%)" })
  const [s4IntentPacket, setS4IntentPacket] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "50%", left: "50%" })
  const [s4AstContainer, setS4AstContainer] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" })
  const [s4AstHighlight, setS4AstHighlight] = useState({ dim: false, target: false })
  const [s4SynthSphere, setS4SynthSphere] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)" })
  const [s4Blueprint, setS4Blueprint] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)" })
  const [s4BpCards, setS4BpCards] = useState({ c1: false, c2: false, c3: false, a1: false, a2: false })
  const [s4ExecPack, setS4ExecPack] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "50%" })

  // --- Scene 5 State ---
  const [s5ContainerVisible, setS5ContainerVisible] = useState(false)
  const [s5BadgeVisible, setS5BadgeVisible] = useState(false)
  const [s5Status, setS5Status] = useState({ text: "RECEIVING EXECUTION PACKAGE...", opacity: 0 })
  const [s5IncomingBlueprint, setS5IncomingBlueprint] = useState({ top: "-100px", opacity: 0, transform: "translateX(-50%)" })
  const [s5Engine, setS5Engine] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "25%", hexActive: false })
  const [s5CodeCompare, setS5CodeCompare] = useState({ opacity: 0, transform: "translateY(40px)" })
  const [s5OldLoopHighlight, setS5OldLoopHighlight] = useState(false)
  const [s5NewCodeHtml, setS5NewCodeHtml] = useState("")
  const [s5RefactorComplete, setS5RefactorComplete] = useState(false)

  // --- Scene 6 State ---
  const [s6ContainerVisible, setS6ContainerVisible] = useState(false)
  const [s6Core, setS6Core] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", fail: false })
  const [s6Beams, setS6Beams] = useState({
    syn: "" as "" | "active-beam" | "pass-beam" | "fail-beam",
    bound: "" as "" | "active-beam" | "pass-beam" | "fail-beam",
    comp: "" as "" | "active-beam" | "pass-beam" | "fail-beam",
  })
  const [s6Modules, setS6Modules] = useState({
    syn: "" as "" | "processing" | "pass" | "fail",
    bound: "" as "" | "processing" | "pass" | "fail",
    comp: "" as "" | "processing" | "pass" | "fail",
  })
  const [s6TokensX, setS6TokensX] = useState({ t1: "10", t2: "40", t3: "20" })
  const [s6BoundShield, setS6BoundShield] = useState({ opacity: 0.2, stroke: "var(--method-color)" })
  const [s6CompBar, setS6CompBar] = useState({ y: "75", height: "10" })
  const [s6Feedback, setS6Feedback] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "50%", left: "75%" })
  const [s6RetryNode, setS6RetryNode] = useState({ active: false, attempt: 1 })
  const [s6ValidatedPackage, setS6ValidatedPackage] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", left: "50%" })

  // --- Scene 7 State ---
  const [s7ContainerVisible, setS7ContainerVisible] = useState(false)
  const [s7IterCounter, setS7IterCounter] = useState({ text: "STRATEGY ITERATION: 1", opacity: 0, color: "" })
  const [s7QwenBadge, setS7QwenBadge] = useState({ activeCenter: false, exitLeft: false, status: "ACTIVE", statusColor: "" })
  const [s7LlamaBadge, setS7LlamaBadge] = useState({ enterRight: true, activeCenter: false, opacity: 1, status: "STANDBY", statusColor: "var(--class-color)" })
  const [s7Boxes, setS7Boxes] = useState({ original: false, refactored: false, refactoredY: "0px", refactoredOpacity: 1 })
  const [s7JudgeCore, setS7JudgeCore] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", transition: "" })
  const [s7JudgeCrystal, setS7JudgeCrystal] = useState({ state: "" as "" | "reject" | "accept" })
  const [s7Beams, setS7Beams] = useState({ state: "" as "" | "active" | "reject" | "accept", opacity: 1 })
  const [s7Labels, setS7Labels] = useState({ opacity: 0, color: "" })
  const [s7Feedback, setS7Feedback] = useState({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", left: "50%" })
  const [s7FinalCompVisible, setS7FinalCompVisible] = useState(false)

  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const delayAsync = (ms: number, sceneId: number): Promise<void> => {
    return new Promise((resolve) => {
      const id = setTimeout(() => {
        resolve()
      }, ms)
      timeoutsRef.current.push(id)
    })
  }

  // Helper syntax highlighter for typing
  const highlightSyntax = (codeStr: string) => {
    let highlighted = codeStr.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const keywords = ["public", "class", "private", "void", "for"]
    const classes = ["StudentManager", "List", "Student", "System"]
    const methods = ["addStudent", "displayStudents", "add", "out", "println", "getName"]

    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "g")
      highlighted = highlighted.replace(regex, `<span class="kw">${kw}</span>`)
    })
    classes.forEach((cls) => {
      const regex = new RegExp(`\\b${cls}\\b`, "g")
      highlighted = highlighted.replace(regex, `<span class="cl">${cls}</span>`)
    })
    methods.forEach((mth) => {
      const regex = new RegExp(`\\b${mth}\\b`, "g")
      highlighted = highlighted.replace(regex, `<span class="mth">${mth}</span>`)
    })
    highlighted = highlighted.replace(/([{}();,])/g, '<span class="sym">$1</span>')
    return highlighted
  }

  // Navigation handlers
  const nextScene = () => {
    if (currentScene < totalScenes) {
      clearAllTimeouts()
      const next = currentScene + 1
      setCurrentScene(next)
    }
  }

  const prevScene = () => {
    if (currentScene > 1) {
      clearAllTimeouts()
      const prev = currentScene - 1
      setCurrentScene(prev)
    }
  }

  // Scene runner dispatcher
  useEffect(() => {
    clearAllTimeouts()

    if (currentScene === 1) {
      runScene1()
    } else if (currentScene === 2) {
      runScene2()
    } else if (currentScene === 3) {
      runScene3()
    } else if (currentScene === 4) {
      runScene4()
    } else if (currentScene === 5) {
      runScene5()
    } else if (currentScene === 6) {
      runScene6()
    } else if (currentScene === 7) {
      runScene7()
    }

    return () => clearAllTimeouts()
  }, [currentScene])

  // --- SCENE 1 EXECUTION ---
  const runScene1 = async () => {
    // Reset state
    setS1ContainerVisible(false)
    setS1CodeText("")
    setS1RequestText("")
    setS1CodeCursor(true)
    setS1RequestCursor(false)
    setS1Mouse({ x: 50, y: 100, opacity: 0, active: false })
    setS1SubmitBtn({ opacity: 0.5, transform: "scale(1)" })

    await delayAsync(200, 1)
    setS1ContainerVisible(true)
    await delayAsync(600, 1)

    // Mouse enters
    setS1Mouse({ x: 250, y: 150, opacity: 1, active: true })
    await delayAsync(400, 1)
    setS1Mouse((prev) => ({ ...prev, opacity: 0 }))
    await delayAsync(100, 1)

    // Type java code
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
}`
    let currentCode = ""
    for (let i = 0; i < javaCode.length; i++) {
      currentCode += javaCode[i]
      setS1CodeText(highlightSyntax(currentCode))
      await delayAsync(javaCode[i] === "\n" || javaCode[i] === ";" ? 50 : 8, 1)
    }

    await delayAsync(300, 1)
    setS1CodeCursor(false)
    setS1Mouse({ x: 300, y: 380, opacity: 1, active: true })
    await delayAsync(400, 1)

    setS1Mouse((prev) => ({ ...prev, opacity: 0 }))
    setS1RequestCursor(true)
    await delayAsync(100, 1)

    // Type request
    const reqText = "Refactor this Java code to improve readability, reduce duplicated code, and optimize performance."
    let currentReq = ""
    for (let i = 0; i < reqText.length; i++) {
      currentReq += reqText[i]
      setS1RequestText(currentReq)
      await delayAsync(12, 1)
    }

    await delayAsync(200, 1)
    setS1RequestCursor(false)
    setS1Mouse({ x: 750, y: 390, opacity: 1, active: true })
    await delayAsync(350, 1)

    setS1SubmitBtn({ opacity: 1, transform: "scale(1)" })
    await delayAsync(150, 1)
    setS1SubmitBtn({ opacity: 1, transform: "scale(0.95)" })
    await delayAsync(100, 1)
    setS1SubmitBtn({ opacity: 1, transform: "scale(1)" })

    await delayAsync(600, 1)
    setCurrentScene(2)
  }

  // --- SCENE 2 EXECUTION ---
  const runScene2 = async () => {
    // Reset state
    setS2ContainerVisible(true)
    setS2DataPacket({
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0)",
      top: "50%",
      left: "50%",
      transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease",
    })
    setS2Nodes({ fe: false, ws: false, be: false, session: false })
    setS2Lines({ feWs: false, wsBe: false, beSession: false })
    setS2SessionInfoVisible(false)
    setS2NextPhaseVisible(false)

    await delayAsync(200, 2)

    // Burst particles
    const newParticles = []
    const colors = ["#cba6f7", "#f9e2af", "#a6e3a1", "#89b4fa", "#cdd6f4"]
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        left: 50 + (Math.random() - 0.5) * 10,
        top: 50 + (Math.random() - 0.5) * 10,
        bg: colors[Math.floor(Math.random() * colors.length)],
        targetLeft: 50,
        targetTop: 50,
        scale: Math.random() * 2,
        opacity: 1,
      })
    }
    setS2Particles(newParticles)

    await delayAsync(600, 2)
    setS2DataPacket((prev) => ({ ...prev, opacity: 1, transform: "translate(-50%, -50%) scale(1)" }))

    await delayAsync(1000, 2)
    setS2Nodes((prev) => ({ ...prev, fe: true }))
    await delayAsync(400, 2)
    setS2Nodes((prev) => ({ ...prev, ws: true }))
    await delayAsync(400, 2)
    setS2Nodes((prev) => ({ ...prev, be: true }))
    await delayAsync(400, 2)
    setS2Nodes((prev) => ({ ...prev, session: true }))

    await delayAsync(800, 2)
    // Packet -> FE
    setS2DataPacket((prev) => ({ ...prev, transition: "top 0.5s ease, left 0.5s ease", top: "15%", left: "50%" }))

    await delayAsync(600, 2)
    setS2Lines((prev) => ({ ...prev, feWs: true }))
    // Packet -> WS
    setS2DataPacket((prev) => ({ ...prev, transition: "top 1s ease-in-out, left 1s ease-in-out", top: "40%", left: "50%" }))

    await delayAsync(1000, 2)
    setS2DataPacket((prev) => ({ ...prev, transform: "translate(-50%, -50%) scale(1.2)" }))
    setS2WsShadow("0 0 30px rgba(137, 180, 250, 0.6)")
    await delayAsync(300, 2)
    setS2DataPacket((prev) => ({ ...prev, transform: "translate(-50%, -50%) scale(1)" }))
    setS2WsShadow("0 0 15px rgba(137, 180, 250, 0.2)")

    setS2Lines((prev) => ({ ...prev, wsBe: true }))
    // Packet -> BE
    setS2DataPacket((prev) => ({ ...prev, top: "65%", left: "30%" }))

    await delayAsync(1000, 2)
    setS2DataPacket((prev) => ({ ...prev, transform: "translate(-50%, -50%) scale(0.5)", opacity: 0.5 }))

    await delayAsync(600, 2)
    setS2Lines((prev) => ({ ...prev, beSession: true }))
    // Packet -> Session
    setS2DataPacket((prev) => ({ ...prev, top: "65%", left: "70%" }))

    await delayAsync(800, 2)
    setS2DataPacket((prev) => ({ ...prev, opacity: 0 }))
    setS2SessionTransform("translate(-50%, 0) scale(1.1)")
    setS2SessionShadow("0 0 40px rgba(203, 166, 247, 0.5)")

    await delayAsync(300, 2)
    setS2SessionTransform("translate(-50%, 0) scale(1)")
    setS2SessionShadow("0 10px 30px rgba(0, 0, 0, 0.3)")
    setS2SessionInfoVisible(true)

    await delayAsync(1500, 2)
    setS2NextPhaseVisible(true)

    await delayAsync(2000, 2)
    setCurrentScene(3)
  }

  // --- SCENE 3 EXECUTION ---
  const runScene3 = async () => {
    setS3ContainerVisible(true)
    setS3CoreState({ scanning: false, opacity: 1, transform: "translate(-50%, -50%) scale(1)" })
    setS3LaserState({ opacity: 0, top: "10%", transition: "none" })
    setS3CodeScanned(new Array(14).fill(false))
    setS3CodeTarget(false)
    setS3ModulesVisible({ syn: false, sem: false, comp: false })
    setS3ModulesActive({ syn: false, sem: false, comp: false })
    setS3ModulesComplete({ syn: false, sem: false, comp: false })
    setS3Beams({ syn: "", sem: "", comp: "" })
    setS3ArtifactVisible(false)
    setS3Dots({ syn: false, sem: false, comp: false })
    setS3NextPhaseVisible(false)

    await delayAsync(300, 3)
    setS3WrapperVisible(true)

    await delayAsync(800, 3)
    setS3Beams({ syn: "active", sem: "active", comp: "active" })
    setS3ModulesVisible({ syn: true, sem: true, comp: true })

    await delayAsync(800, 3)
    setS3CoreState((prev) => ({ ...prev, scanning: true }))
    setS3LaserState({ opacity: 1, top: "90%", transition: "top 3s linear" })
    setS3ModulesActive((prev) => ({ ...prev, syn: true }))

    // Scanned lines sequence
    for (let i = 0; i < 14; i++) {
      setTimeout(() => {
        setS3CodeScanned((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, i * (3000 / 14))
    }

    setTimeout(() => {
      setS3ModulesActive((prev) => ({ ...prev, sem: true }))
      setS3CodeTarget(true)
    }, 1500)

    setTimeout(() => {
      setS3ModulesActive((prev) => ({ ...prev, comp: true }))
    }, 2200)

    await delayAsync(3200, 3)
    setS3LaserState((prev) => ({ ...prev, opacity: 0 }))
    setS3CoreState((prev) => ({ ...prev, scanning: false }))
    setS3ModulesComplete({ syn: true, sem: true, comp: true })

    setS3Beams({ syn: "return", sem: "return", comp: "return" })

    await delayAsync(1200, 3)
    setS3Beams({ syn: "", sem: "", comp: "" })

    setS3CoreState({ scanning: false, opacity: 0, transform: "translate(-50%, -50%) scale(0)" })

    await delayAsync(500, 3)
    setS3ArtifactVisible(true)

    await delayAsync(400, 3)
    setS3Dots((prev) => ({ ...prev, syn: true }))
    await delayAsync(300, 3)
    setS3Dots((prev) => ({ ...prev, sem: true }))
    await delayAsync(300, 3)
    setS3Dots((prev) => ({ ...prev, comp: true }))

    await delayAsync(1000, 3)
    setS3NextPhaseVisible(true)

    await delayAsync(2500, 3)
    setCurrentScene(4)
  }

  // --- SCENE 4 EXECUTION ---
  const runScene4 = async () => {
    setS4ContainerVisible(true)
    setS4BadgeVisible(false)
    setS4CoreOpacity(0)
    setS4InnerRingStyle({ stroke: "rgba(166, 227, 161, 0.3)", strokeWidth: "2" })
    setS4InputBaseline({ opacity: 0, top: "-50px", transform: "translateX(-50%)" })
    setS4InputInstruction({ opacity: 0, top: "-50px", transform: "translateX(-50%)" })
    setS4IntentPacket({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "50%", left: "50%" })
    setS4AstContainer({ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" })
    setS4AstHighlight({ dim: false, target: false })
    setS4SynthSphere({ opacity: 0, transform: "translate(-50%, -50%) scale(0)" })
    setS4Blueprint({ opacity: 0, transform: "translate(-50%, -50%) scale(0)" })
    setS4BpCards({ c1: false, c2: false, c3: false, a1: false, a2: false })
    setS4ExecPack({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "50%" })

    await delayAsync(300, 4)
    setS4BadgeVisible(true)
    setS4CoreOpacity(1)

    await delayAsync(800, 4)
    setS4InputBaseline({ opacity: 1, top: "15%", transform: "translateX(-50%)" })
    setS4InputInstruction({ opacity: 1, top: "15%", transform: "translateX(-50%)" })

    await delayAsync(400, 4)
    setS4InputBaseline({ opacity: 1, top: "50%", transform: "translate(-50%, -50%) scale(0.5)" })
    setS4InputInstruction({ opacity: 1, top: "50%", transform: "translate(-50%, -50%) scale(0.5)" })

    await delayAsync(600, 4)
    setS4InputBaseline((prev) => ({ ...prev, opacity: 0 }))
    setS4InputInstruction((prev) => ({ ...prev, opacity: 0 }))

    setS4InnerRingStyle({ stroke: "var(--string-color)", strokeWidth: "4" })
    setS4IntentPacket({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", top: "50%", left: "50%" })

    await delayAsync(1200, 4)
    setS4IntentPacket((prev) => ({ ...prev, transform: "translate(-250px, -50%) scale(0.8)" }))

    await delayAsync(400, 4)
    setS4AstContainer({ opacity: 1, transform: "translate(100px, -50%) scale(0.7)" })

    await delayAsync(800, 4)
    setS4AstHighlight({ dim: true, target: true })

    await delayAsync(1500, 4)
    setS4IntentPacket((prev) => ({ ...prev, transform: "translate(-50%, -50%) scale(0.5)" }))
    setS4AstContainer({ opacity: 1, transform: "translate(-50%, -50%) scale(0.3)" })

    await delayAsync(500, 4)
    setS4IntentPacket((prev) => ({ ...prev, opacity: 0 }))
    setS4AstContainer((prev) => ({ ...prev, opacity: 0 }))
    setS4SynthSphere({ opacity: 1, transform: "translate(-50%, -50%) scale(1)" })

    await delayAsync(800, 4)
    setS4SynthSphere({ opacity: 1, transform: "translate(-50%, -50%) scale(1.3)" })
    await delayAsync(300, 4)
    setS4SynthSphere({ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" })

    setS4Blueprint({ opacity: 1, transform: "translate(-50%, -50%) scale(1)" })

    await delayAsync(400, 4)
    setS4BpCards((prev) => ({ ...prev, c1: true }))
    await delayAsync(400, 4)
    setS4BpCards((prev) => ({ ...prev, a1: true, c2: true }))
    await delayAsync(400, 4)
    setS4BpCards((prev) => ({ ...prev, a2: true, c3: true }))

    await delayAsync(2000, 4)
    setS4Blueprint({ opacity: 0, transform: "translate(-50%, -50%) scale(0)" })

    await delayAsync(400, 4)
    setS4ExecPack({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", top: "50%" })

    await delayAsync(800, 4)
    setS4ExecPack({ opacity: 0.8, transform: "translate(-50%, -50%) scale(0.8)", top: "150%" })

    await delayAsync(600, 4)
    setCurrentScene(5)
  }

  // --- SCENE 5 EXECUTION ---
  const runScene5 = async () => {
    setS5ContainerVisible(true)
    setS5BadgeVisible(false)
    setS5Status({ text: "RECEIVING EXECUTION PACKAGE...", opacity: 0 })
    setS5IncomingBlueprint({ top: "-100px", opacity: 0, transform: "translateX(-50%)" })
    setS5Engine({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "25%", hexActive: false })
    setS5CodeCompare({ opacity: 0, transform: "translateY(40px)" })
    setS5OldLoopHighlight(false)
    setS5NewCodeHtml("")
    setS5RefactorComplete(false)

    await delayAsync(300, 5)
    setS5BadgeVisible(true)

    await delayAsync(600, 5)
    setS5Status({ text: "RECEIVING EXECUTION PACKAGE...", opacity: 1 })
    setS5IncomingBlueprint({ top: "25%", opacity: 1, transform: "translateX(-50%) scale(1)" })

    await delayAsync(800, 5)
    setS5Engine({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", top: "25%", hexActive: false })

    await delayAsync(800, 5)
    setS5IncomingBlueprint({ top: "25%", opacity: 0, transform: "translateX(-50%) scale(0)" })
    setS5Engine({ opacity: 1, transform: "translate(-50%, -50%) scale(1.2)", top: "25%", hexActive: true })

    await delayAsync(600, 5)
    setS5Status({ text: "UNPACKING PLAN: TARGETING IMPERATIVE LOOP...", opacity: 1 })
    setS5Engine({ opacity: 1, transform: "translate(-50%, -50%) scale(0.9)", top: "25%", hexActive: true })

    await delayAsync(600, 5)
    setS5Engine({ opacity: 1, transform: "translate(-50%, -50%) scale(0.5)", top: "10%", hexActive: true })
    setS5CodeCompare({ opacity: 1, transform: "translateY(0)" })

    await delayAsync(1000, 5)
    setS5OldLoopHighlight(true)

    await delayAsync(1000, 5)
    setS5Status({ text: "STREAMING DECLARATIVE REFACTOR...", opacity: 1 })

    const refactoredCode = `public class StudentManager {

    private List<Student> students;

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayStudents() {
        students.stream()
                .map(Student::getName)
                .forEach(System::println);
    }
}`
    const streamStart = refactoredCode.indexOf("students.stream()")
    let currentText = ""

    for (let i = 0; i < refactoredCode.length; i++) {
      currentText += refactoredCode[i]
      if (i >= streamStart && streamStart !== -1) {
        const beforeStream = refactoredCode.substring(0, streamStart)
        const streamPart = currentText.substring(streamStart)
        setS5NewCodeHtml(beforeStream + `<span class="highlight-green" style="display:inline;">${streamPart}</span><span class="blinking-cursor"></span>`)
      } else {
        setS5NewCodeHtml(currentText)
      }
      await delayAsync(15, 5)
    }

    const beforeStream2 = refactoredCode.substring(0, streamStart)
    const streamPart2 = refactoredCode.substring(streamStart)
    setS5NewCodeHtml(beforeStream2 + `<span class="highlight-green" style="display:inline;">${streamPart2}</span>`)

    await delayAsync(600, 5)
    setS5Status({ text: "GENERATION COMPLETE", opacity: 1 })
    setS5Engine((prev) => ({ ...prev, hexActive: false }))
    setS5RefactorComplete(true)
  }

  // --- SCENE 6 EXECUTION ---
  const runScene6 = async () => {
    setS6ContainerVisible(true)
    setS6Core({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", fail: false })
    setS6Beams({ syn: "", bound: "", comp: "" })
    setS6Modules({ syn: "", bound: "", comp: "" })
    setS6TokensX({ t1: "10", t2: "40", t3: "20" })
    setS6BoundShield({ opacity: 0.2, stroke: "var(--method-color)" })
    setS6CompBar({ y: "75", height: "10" })
    setS6Feedback({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", top: "50%", left: "75%" })
    setS6RetryNode({ active: false, attempt: 1 })
    setS6ValidatedPackage({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", left: "50%" })

    await delayAsync(600, 6)
    setS6Core({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", fail: false })

    await delayAsync(800, 6)
    setS6Beams({ syn: "active-beam", bound: "active-beam", comp: "active-beam" })

    // Syntax Check Pass
    setS6Modules((prev) => ({ ...prev, syn: "processing" }))
    await delayAsync(800, 6)
    setS6TokensX({ t1: "20", t2: "20", t3: "20" })
    await delayAsync(400, 6)
    setS6Modules((prev) => ({ ...prev, syn: "pass" }))
    setS6Beams((prev) => ({ ...prev, syn: "pass-beam" }))

    // Boundary Check Pass
    setS6Modules((prev) => ({ ...prev, bound: "processing" }))
    await delayAsync(800, 6)
    setS6BoundShield({ opacity: 1, stroke: "var(--string-color)" })
    await delayAsync(400, 6)
    setS6Modules((prev) => ({ ...prev, bound: "pass" }))
    setS6Beams((prev) => ({ ...prev, bound: "pass-beam" }))

    // Complexity Check Fail
    setS6Modules((prev) => ({ ...prev, comp: "processing" }))
    await delayAsync(500, 6)
    setS6CompBar({ y: "20", height: "65" })
    await delayAsync(800, 6)
    setS6Modules((prev) => ({ ...prev, comp: "fail" }))
    setS6Beams((prev) => ({ ...prev, comp: "fail-beam" }))
    setS6Core((prev) => ({ ...prev, fail: true }))

    // Feedback Packet to Retry Node
    await delayAsync(600, 6)
    setS6Feedback({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", top: "50%", left: "75%" })
    await delayAsync(800, 6)
    setS6Feedback({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", top: "20%", left: "20%" })

    await delayAsync(1200, 6)
    setS6Feedback((prev) => ({ ...prev, opacity: 0 }))
    setS6RetryNode({ active: true, attempt: 2 })

    setS6Core({ opacity: 0, transform: "translate(-50%, -50%) scale(1)", fail: false })
    setS6Modules({ syn: "", bound: "", comp: "" })
    setS6Beams({ syn: "", bound: "", comp: "" })
    setS6TokensX({ t1: "10", t2: "40", t3: "20" })
    setS6CompBar({ y: "75", height: "10" })
    setS6BoundShield({ opacity: 0.2, stroke: "var(--method-color)" })

    await delayAsync(1000, 6)
    setS6RetryNode({ active: false, attempt: 2 })
    setS6Core({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", fail: false })

    await delayAsync(800, 6)
    setS6Beams({ syn: "pass-beam", bound: "pass-beam", comp: "pass-beam" })
    setS6Modules({ syn: "pass", bound: "pass", comp: "pass" })
    setS6TokensX({ t1: "20", t2: "20", t3: "20" })
    setS6CompBar({ y: "65", height: "20" })
    setS6BoundShield({ opacity: 1, stroke: "var(--string-color)" })

    await delayAsync(1200, 6)
    setS6Core((prev) => ({ ...prev, opacity: 0 }))
    setS6ValidatedPackage({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", left: "50%" })

    await delayAsync(1500, 6)
    setS6ValidatedPackage({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", left: "150%" })

    await delayAsync(800, 6)
    setCurrentScene(7)
  }

  // --- SCENE 7 EXECUTION ---
  const runScene7 = async () => {
    setS7ContainerVisible(true)
    setS7IterCounter({ text: "STRATEGY ITERATION: 1", opacity: 0, color: "" })
    setS7QwenBadge({ activeCenter: false, exitLeft: false, status: "ACTIVE", statusColor: "" })
    setS7LlamaBadge({ enterRight: true, activeCenter: false, opacity: 1, status: "STANDBY", statusColor: "var(--class-color)" })
    setS7Boxes({ original: false, refactored: false, refactoredY: "0px", refactoredOpacity: 1 })
    setS7JudgeCore({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", transition: "" })
    setS7JudgeCrystal({ state: "" })
    setS7Beams({ state: "", opacity: 1 })
    setS7Labels({ opacity: 0, color: "" })
    setS7Feedback({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", left: "50%" })
    setS7FinalCompVisible(false)

    await delayAsync(300, 7)
    setS7QwenBadge((prev) => ({ ...prev, activeCenter: true }))

    await delayAsync(1000, 7)
    setS7QwenBadge((prev) => ({ ...prev, status: "UNLOAD", statusColor: "#ff5f56" }))

    await delayAsync(800, 7)
    setS7QwenBadge((prev) => ({ ...prev, activeCenter: false, exitLeft: true }))
    setS7LlamaBadge((prev) => ({ ...prev, enterRight: false, activeCenter: true }))

    await delayAsync(1000, 7)
    setS7LlamaBadge((prev) => ({ ...prev, status: "LOAD", statusColor: "var(--string-color)" }))

    await delayAsync(800, 7)
    setS7LlamaBadge((prev) => ({ ...prev, status: "ACTIVE" }))

    setS7IterCounter({ text: "STRATEGY ITERATION: 1", opacity: 1, color: "" })

    await delayAsync(500, 7)
    setS7Boxes((prev) => ({ ...prev, original: true, refactored: true }))

    await delayAsync(800, 7)
    setS7JudgeCore({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", transition: "" })

    await delayAsync(1200, 7)
    setS7Beams({ state: "active", opacity: 1 })
    setS7Labels({ opacity: 1, color: "" })

    await delayAsync(1500, 7)
    setS7Beams({ state: "reject", opacity: 1 })
    setS7Labels({ opacity: 1, color: "#ff5f56" })
    setS7JudgeCrystal({ state: "reject" })

    await delayAsync(800, 7)
    setS7Feedback({ opacity: 1, transform: "translate(-50%, -50%) scale(1)", left: "50%" })

    await delayAsync(800, 7)
    setS7Feedback((prev) => ({ ...prev, left: "-20%" }))

    await delayAsync(1000, 7)
    setS7Beams({ state: "", opacity: 1 })
    setS7Labels({ opacity: 0, color: "var(--class-color)" })
    setS7JudgeCrystal({ state: "" })
    setS7Feedback({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", left: "50%" })

    setS7Boxes((prev) => ({ ...prev, refactoredOpacity: 0, refactoredY: "-30px" }))
    setS7IterCounter({ text: "STRATEGY ITERATION: 2", opacity: 1, color: "" })

    await delayAsync(1200, 7)
    setS7Boxes((prev) => ({ ...prev, refactoredY: "30px" }))
    await delayAsync(100, 7)
    setS7Boxes((prev) => ({ ...prev, refactoredOpacity: 1, refactoredY: "0px" }))

    await delayAsync(800, 7)
    setS7Beams({ state: "active", opacity: 1 })
    setS7Labels({ opacity: 1, color: "" })

    await delayAsync(1800, 7)
    setS7Beams({ state: "accept", opacity: 1 })
    setS7Labels({ opacity: 1, color: "var(--string-color)" })
    setS7JudgeCrystal({ state: "accept" })

    await delayAsync(600, 7)
    setS7IterCounter({ text: "✅ VALIDATION SUCCESSFUL — OUTPUT APPROVED", opacity: 1, color: "var(--string-color)" })

    await delayAsync(1400, 7)
    setS7JudgeCore({ opacity: 0, transform: "translate(-50%, -50%) scale(0)", transition: "all 0.6s ease" })
    setS7Beams((prev) => ({ ...prev, opacity: 0 }))
    setS7Labels((prev) => ({ ...prev, opacity: 0 }))
    setS7Boxes((prev) => ({ ...prev, original: false, refactored: false }))
    setS7IterCounter((prev) => ({ ...prev, opacity: 0 }))
    setS7LlamaBadge((prev) => ({ ...prev, opacity: 0 }))

    await delayAsync(700, 7)
    setS7FinalCompVisible(true)
  }

  return (
    <div className="w-full min-h-screen bg-[#0f111a] text-[#cdd6f4] font-mono select-none overflow-hidden relative">
      <style jsx global>{`
        :root {
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

        .kw { color: var(--keyword-color); font-weight: bold; }
        .cl { color: var(--class-color); }
        .str { color: var(--string-color); }
        .mth { color: var(--method-color); }
        .sym { color: #89dceb; }

        .blinking-cursor {
          display: inline-block;
          width: 10px;
          height: 20px;
          background-color: var(--text-color);
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .flow-line {
          stroke: var(--border-color);
          stroke-width: 2;
          stroke-dasharray: 5, 5;
          fill: none;
        }
        .flow-line.active {
          stroke: var(--keyword-color);
          animation: dash 20s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes pulsePlanner {
          from { box-shadow: 0 0 10px rgba(203, 166, 247, 0.15); }
          to { box-shadow: 0 0 25px rgba(203, 166, 247, 0.4); }
        }
        @keyframes pulseGenerator {
          from { box-shadow: 0 0 10px rgba(166, 227, 161, 0.15); }
          to { box-shadow: 0 0 25px rgba(166, 227, 161, 0.4); }
        }
        @keyframes pulseJudge {
          from { box-shadow: 0 0 10px rgba(249, 226, 175, 0.15); }
          to { box-shadow: 0 0 25px rgba(249, 226, 175, 0.4); }
        }
        @keyframes pulseJudgeCore {
          from { box-shadow: 0 0 20px rgba(249, 226, 175, 0.2); }
          to { box-shadow: 0 0 50px rgba(249, 226, 175, 0.5); }
        }
        @keyframes pulseHex {
          from { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px rgba(166, 227, 161, 0.2); }
          to { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 20px rgba(166, 227, 161, 0.4); }
        }
        @keyframes pulseHexFast {
          from { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 20px var(--string-color); }
          to { transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 0 40px var(--string-color); }
        }
        @keyframes shake {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          25% { transform: translate(-55%, -50%) scale(1); }
          75% { transform: translate(-45%, -50%) scale(1); }
        }

        .highlight-green {
          background-color: rgba(166, 227, 161, 0.15);
          border-radius: 4px;
          display: inline-block;
          width: 100%;
          padding: 2px 0;
          border-left: 3px solid var(--string-color);
        }
      `}</style>

      {/* Nav Buttons */}
      <button
        id="prev-btn"
        className="fixed top-1/2 -translate-y-1/2 left-5 w-12 h-12 rounded-full bg-[#1e1e2e]/50 backdrop-blur-md border border-white/10 text-white/50 text-2xl flex items-center justify-center cursor-pointer z-50 transition-all hover:bg-[#28283c]/80 hover:text-white/90 hover:border-white/30 hover:shadow-[0_0_15px_rgba(137,180,250,0.4)] hover:scale-110 active:scale-95 disabled:opacity-20 disabled:cursor-default"
        onClick={prevScene}
        disabled={currentScene <= 1}
      >
        &larr;
      </button>
      <button
        id="next-btn"
        className="fixed top-1/2 -translate-y-1/2 right-5 w-12 h-12 rounded-full bg-[#1e1e2e]/50 backdrop-blur-md border border-white/10 text-white/50 text-2xl flex items-center justify-center cursor-pointer z-50 transition-all hover:bg-[#28283c]/80 hover:text-white/90 hover:border-white/30 hover:shadow-[0_0_15px_rgba(137,180,250,0.4)] hover:scale-110 active:scale-95 disabled:opacity-20 disabled:cursor-default"
        onClick={nextScene}
        disabled={currentScene >= totalScenes}
      >
        &rarr;
      </button>

      {/* Mouse Cursor */}
      <div
        id="mouse-cursor"
        className={`fixed w-6 h-6 bg-[url('data:image/svg+xml;utf8,<svg_xmlns="http://www.w3.org/2000/svg"_width="24"_height="24"_viewBox="0_0_24_24"_fill="white"_stroke="black"_stroke-width="1.5"><path_d="M3_3l7_19_3-8_8-3z"/></svg>')] pointer-events-none z-[1000] transition-all duration-300 ${
          s1Mouse.opacity > 0 ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: `${s1Mouse.x}px`, top: `${s1Mouse.y}px` }}
      />

      {/* SCENE 1 CONTAINER */}
      {currentScene === 1 && (
        <div
          id="container"
          className={`w-[80%] max-w-[1000px] mx-auto my-auto flex flex-col gap-6 transition-all duration-1000 ${
            s1ContainerVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ minHeight: "80vh", justifyContent: "center" }}
        >
          {/* Code Editor Window */}
          <div className="bg-[#1e1e2e] rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(137,180,250,0.3)] overflow-hidden relative">
            <div className="h-9 bg-black/20 border-b border-white/10 flex items-center px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="ml-4 text-xs text-white/50 font-mono">StudentManager.java</div>
            </div>
            <div className="h-[360px] p-6 font-mono text-base leading-relaxed overflow-y-auto relative">
              <span dangerouslySetInnerHTML={{ __html: s1CodeText }} />
              {s1CodeCursor && <span className="blinking-cursor" />}
            </div>
          </div>

          {/* Request Input Window */}
          <div className="bg-[#1e1e2e] rounded-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(137,180,250,0.3)] overflow-hidden">
            <div className="p-5 flex items-center gap-4">
              <div className="grow bg-black/20 border border-white/10 rounded-lg p-4 min-h-[60px] flex items-center">
                <span className="text-base text-[#bac2de] whitespace-pre-wrap">{s1RequestText}</span>
                {s1RequestCursor && <span className="blinking-cursor ml-1" />}
              </div>
              <button
                className="bg-[var(--keyword-color)] text-[#11111b] border-none rounded-lg px-6 py-3 font-bold text-sm cursor-pointer transition-all duration-300 shrink-0"
                style={{ opacity: s1SubmitBtn.opacity, transform: s1SubmitBtn.transform }}
              >
                Refactor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 2 CONTAINER */}
      {currentScene === 2 && (
        <div
          id="scene2-container"
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-1000 z-10 ${
            s2ContainerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 600">
            <path d="M 500 120 L 500 240" className={`flow-line ${s2Lines.feWs ? "active" : ""}`} />
            <path d="M 500 270 C 500 330, 300 330, 300 360" className={`flow-line ${s2Lines.wsBe ? "active" : ""}`} />
            <path d="M 410 390 L 590 390" className={`flow-line ${s2Lines.beSession ? "active" : ""}`} />
          </svg>

          {/* Particle burst */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {s2Particles.map((p) => (
              <div
                key={p.id}
                className="absolute w-2 h-2 rounded-full transition-all duration-800"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  backgroundColor: p.bg,
                  opacity: p.opacity,
                  transform: `scale(${p.scale})`,
                }}
              />
            ))}
          </div>

          {/* Node 1: FE */}
          <div
            className={`absolute top-[15%] left-1/2 -translate-x-1/2 w-48 bg-[#1e1e2e] border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-500 z-10 ${
              s2Nodes.fe ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="text-3xl mb-2">💻</div>
            <div className="text-xs text-[#cdd6f4] font-bold tracking-wider">USER INTERFACE</div>
          </div>

          {/* Node 2: WS */}
          <div
            className={`absolute top-[40%] left-1/2 -translate-x-1/2 w-44 bg-[#1e1e2e]/80 border border-[var(--method-color)] rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all duration-500 z-10 ${
              s2Nodes.ws ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ boxShadow: s2WsShadow }}
          >
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-xs text-[#cdd6f4] font-bold tracking-wider">WebSocket Connection</div>
          </div>

          {/* Node 3: Backend */}
          <div
            className={`absolute top-[65%] left-[30%] -translate-x-1/2 w-56 bg-[#1e1e2e] border border-[var(--keyword-color)] rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-500 z-10 ${
              s2Nodes.be ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="text-3xl mb-2">⚙️</div>
            <div className="text-xs text-[#cdd6f4] font-bold tracking-wider">HorizonAI Backend</div>
            <div className="text-xs text-[#bac2de] mt-1">Orchestrator</div>
          </div>

          {/* Node 4: Session Manager */}
          <div
            className={`absolute top-[65%] left-[70%] -translate-x-1/2 w-48 bg-[rgba(203,166,247,0.1)] border border-[var(--keyword-color)] rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all duration-500 z-10 ${
              s2Nodes.session ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ transform: s2SessionTransform, boxShadow: s2SessionShadow }}
          >
            <div className="text-3xl mb-2">🗄️</div>
            <div className="text-xs text-[#cdd6f4] font-bold tracking-wider">Session Manager</div>
            <div
              className={`font-mono text-xs text-[var(--string-color)] mt-2 bg-black/30 p-2 rounded transition-opacity duration-500 ${
                s2SessionInfoVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              SESSION<br />
              #HZN-001<br />
              <span className="text-[var(--string-color)] font-bold">ACTIVE</span>
            </div>
          </div>

          {/* Data Packet */}
          <div
            className="w-20 h-14 bg-gradient-to-br from-[var(--keyword-color)] to-[var(--method-color)] rounded-lg flex items-center justify-center text-[#11111b] font-bold text-xs shadow-[0_0_20px_var(--glow-color)] absolute z-50"
            style={{
              opacity: s2DataPacket.opacity,
              transform: s2DataPacket.transform,
              top: s2DataPacket.top,
              left: s2DataPacket.left,
              transition: s2DataPacket.transition,
            }}
          >
            &#123; Request &#125;
          </div>

          {/* Next phase indicator */}
          <div
            className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center transition-all duration-1000 ${
              s2NextPhaseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="text-2xl text-[var(--class-color)] animate-bounce">&darr;</div>
            <div className="text-[var(--class-color)] font-bold text-base tracking-widest mt-2">Phase 1: Baseline Analysis</div>
          </div>
        </div>
      )}

      {/* SCENE 3 CONTAINER */}
      {currentScene === 3 && (
        <div
          id="scene3-container"
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-1000 z-20 ${
            s3ContainerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`relative w-[1000px] h-[600px] transition-all duration-1000 ${
              s3WrapperVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* SVG Connecting Beams */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600">
              <line
                x1="500" y1="270" x2="240" y2="270"
                stroke={s3Beams.syn === "active" ? "var(--keyword-color)" : s3Beams.syn === "return" ? "var(--string-color)" : "var(--border-color)"}
                strokeWidth="2" strokeDasharray="10,10"
                className={`transition-all duration-500 ${s3Beams.syn === "active" ? "opacity-80 animate-[flowDash_1s_linear_infinite]" : s3Beams.syn === "return" ? "opacity-100 animate-[flowDashReverse_0.8s_linear_infinite]" : "opacity-30"}`}
              />
              <line
                x1="500" y1="270" x2="760" y2="270"
                stroke={s3Beams.sem === "active" ? "var(--keyword-color)" : s3Beams.sem === "return" ? "var(--string-color)" : "var(--border-color)"}
                strokeWidth="2" strokeDasharray="10,10"
                className={`transition-all duration-500 ${s3Beams.sem === "active" ? "opacity-80 animate-[flowDash_1s_linear_infinite]" : s3Beams.sem === "return" ? "opacity-100 animate-[flowDashReverse_0.8s_linear_infinite]" : "opacity-30"}`}
              />
              <line
                x1="500" y1="270" x2="500" y2="450"
                stroke={s3Beams.comp === "active" ? "var(--keyword-color)" : s3Beams.comp === "return" ? "var(--string-color)" : "var(--border-color)"}
                strokeWidth="2" strokeDasharray="10,10"
                className={`transition-all duration-500 ${s3Beams.comp === "active" ? "opacity-80 animate-[flowDash_1s_linear_infinite]" : s3Beams.comp === "return" ? "opacity-100 animate-[flowDashReverse_0.8s_linear_infinite]" : "opacity-30"}`}
              />
            </svg>

            {/* Syntax Module */}
            <div
              className={`absolute top-[45%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#1e1e2e]/80 backdrop-blur-md border rounded-full flex flex-col justify-center items-center z-20 shadow-xl transition-all duration-500 ${
                s3ModulesVisible.syn ? "opacity-100 scale-100" : "opacity-0 scale-90"
              } ${s3ModulesComplete.syn ? "border-[var(--string-color)] shadow-[0_0_30px_rgba(166,227,161,0.2)]" : s3ModulesActive.syn ? "border-[var(--keyword-color)] shadow-[0_0_30px_rgba(203,166,247,0.2)]" : "border-white/10"}`}
            >
              <div className="absolute -top-6 font-mono text-[11px] text-white/50 tracking-widest uppercase">SYNTAX</div>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <line x1="50" y1="20" x2="25" y2="50" stroke="var(--border-color)" strokeWidth="2" />
                <line x1="50" y1="20" x2="75" y2="50" stroke="var(--border-color)" strokeWidth="2" />
                <line x1="25" y1="50" x2="25" y2="80" stroke="var(--border-color)" strokeWidth="2" />
                <line x1="75" y1="50" x2="75" y2="80" stroke="var(--border-color)" strokeWidth="2" />
                <circle cx="50" cy="20" r="10" fill={s3ModulesActive.syn ? "var(--string-color)" : "var(--editor-bg)"} stroke="var(--border-color)" strokeWidth="2" />
                <circle cx="25" cy="50" r="10" fill={s3ModulesActive.syn ? "var(--keyword-color)" : "var(--editor-bg)"} stroke="var(--border-color)" strokeWidth="2" />
                <circle cx="75" cy="50" r="10" fill={s3ModulesActive.syn ? "var(--keyword-color)" : "var(--editor-bg)"} stroke="var(--border-color)" strokeWidth="2" />
                <circle cx="25" cy="80" r="8" fill={s3ModulesActive.syn ? "var(--method-color)" : "var(--editor-bg)"} stroke="var(--border-color)" strokeWidth="2" />
                <circle cx="75" cy="80" r="8" fill={s3ModulesActive.syn ? "var(--method-color)" : "var(--editor-bg)"} stroke="var(--border-color)" strokeWidth="2" />
              </svg>
            </div>

            {/* Semantic Module */}
            <div
              className={`absolute top-[45%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#1e1e2e]/80 backdrop-blur-md border rounded-full flex flex-col justify-center items-center z-20 shadow-xl transition-all duration-500 ${
                s3ModulesVisible.sem ? "opacity-100 scale-100" : "opacity-0 scale-90"
              } ${s3ModulesComplete.sem ? "border-[var(--string-color)] shadow-[0_0_30px_rgba(166,227,161,0.2)]" : s3ModulesActive.sem ? "border-[var(--keyword-color)] shadow-[0_0_30px_rgba(203,166,247,0.2)]" : "border-white/10"}`}
            >
              <div className="absolute -top-6 font-mono text-[11px] text-white/50 tracking-widest uppercase">SEMANTIC</div>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="45" stroke={s3ModulesActive.sem ? "var(--class-color)" : "var(--border-color)"} strokeWidth={s3ModulesActive.sem ? 2 : 1} strokeDasharray="4 4" fill="none" className="animate-[spin_10s_linear_infinite]" />
                <path d="M 45 45 L 35 60 L 45 75 M 75 45 L 85 60 L 75 75" fill="none" stroke={s3ModulesActive.sem ? "var(--class-color)" : "rgba(255,255,255,0.2)"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="60" cy="60" r="8" fill={s3ModulesActive.sem ? "var(--class-color)" : "rgba(255,255,255,0.2)"} />
              </svg>
            </div>

            {/* Complexity Module */}
            <div
              className={`absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-32 bg-[#1e1e2e]/80 backdrop-blur-md border rounded-2xl flex flex-col justify-center items-center z-20 shadow-xl transition-all duration-500 ${
                s3ModulesVisible.comp ? "opacity-100 scale-100" : "opacity-0 scale-90"
              } ${s3ModulesComplete.comp ? "border-[var(--string-color)] shadow-[0_0_30px_rgba(166,227,161,0.2)]" : s3ModulesActive.comp ? "border-[var(--keyword-color)] shadow-[0_0_30px_rgba(203,166,247,0.2)]" : "border-white/10"}`}
            >
              <div className="absolute -top-5 font-mono text-[11px] text-white/50 tracking-widest uppercase">COMPLEXITY</div>
              <svg width="140" height="80" viewBox="0 0 140 80">
                <path d="M 20 70 A 50 50 0 0 1 120 70" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="8" strokeLinecap="round" />
                <path d="M 20 70 A 50 50 0 0 1 120 70" fill="none" stroke="var(--class-color)" strokeWidth="8" strokeLinecap="round" strokeDasharray="200" strokeDashoffset={s3ModulesActive.comp ? "70" : "200"} className="transition-all duration-1500" />
                <text x="70" y="55" fill="var(--text-color)" fontFamily="monospace" fontSize="20" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity={s3ModulesActive.comp ? 1 : 0}>
                  O(N)
                </text>
              </svg>
            </div>

            {/* Center Code Core */}
            <div
              className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-[#1e1e2e] border border-white/10 rounded-xl p-5 shadow-2xl z-30 font-mono text-xs leading-relaxed text-white/60 overflow-hidden transition-all duration-800 ${
                s3CoreState.scanning ? "shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(137,180,250,0.3)] border-[var(--method-color)]" : ""
              }`}
              style={{ opacity: s3CoreState.opacity, transform: s3CoreState.transform }}
            >
              <div className="absolute left-0 w-full h-[2px] bg-[var(--method-color)] shadow-[0_0_15px_5px_rgba(137,180,250,0.5)] z-40" style={{ opacity: s3LaserState.opacity, top: s3LaserState.top, transition: s3LaserState.transition }} />
              <div className={`px-1 rounded ${s3CodeScanned[0] ? "text-[var(--text-color)]" : ""}`}>public class StudentManager &#123;</div>
              <div>&nbsp;</div>
              <div className={`px-1 rounded ${s3CodeScanned[2] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;private List&lt;Student&gt; students;</div>
              <div>&nbsp;</div>
              <div className={`px-1 rounded ${s3CodeScanned[4] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;public void addStudent(Student s) &#123;</div>
              <div className={`px-1 rounded ${s3CodeScanned[5] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;&nbsp;&nbsp;students.add(s);</div>
              <div className={`px-1 rounded ${s3CodeScanned[6] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;&#125;</div>
              <div>&nbsp;</div>
              <div className={`px-1 rounded ${s3CodeTarget ? "text-[var(--class-color)] bg-[rgba(249,226,175,0.15)]" : s3CodeScanned[8] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;public void displayStudents() &#123;</div>
              <div className={`px-1 rounded ${s3CodeTarget ? "text-[var(--class-color)] bg-[rgba(249,226,175,0.15)]" : s3CodeScanned[9] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;&nbsp;&nbsp;for (Student s : students) &#123;</div>
              <div className={`px-1 rounded ${s3CodeTarget ? "text-[var(--class-color)] bg-[rgba(249,226,175,0.15)]" : s3CodeScanned[10] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(s.getName());</div>
              <div className={`px-1 rounded ${s3CodeScanned[11] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
              <div className={`px-1 rounded ${s3CodeScanned[12] ? "text-[var(--text-color)]" : ""}`}>&nbsp;&nbsp;&#125;</div>
              <div className={`px-1 rounded ${s3CodeScanned[13] ? "text-[var(--text-color)]" : ""}`}>&#125;</div>
            </div>

            {/* Baseline Profile Artifact */}
            <div
              className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 bg-[#1e1e2e]/95 border-2 border-[var(--string-color)] rounded-2xl p-5 flex flex-col items-center shadow-[0_0_40px_rgba(166,227,161,0.3)] backdrop-blur-md z-40 transition-all duration-800 ${
                s3ArtifactVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            >
              <div className="font-mono text-sm text-[var(--string-color)] font-bold tracking-widest mb-4">BASELINE PROFILE</div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1.5 font-mono text-[9px] text-white/50 uppercase">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-[var(--border-color)] bg-[var(--editor-bg)] transition-all ${s3Dots.syn ? "bg-[var(--string-color)] border-[var(--string-color)] shadow-[0_0_10px_var(--string-color)]" : ""}`} />
                  SYN
                </div>
                <div className="flex flex-col items-center gap-1.5 font-mono text-[9px] text-white/50 uppercase">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-[var(--border-color)] bg-[var(--editor-bg)] transition-all ${s3Dots.sem ? "bg-[var(--string-color)] border-[var(--string-color)] shadow-[0_0_10px_var(--string-color)]" : ""}`} />
                  SEM
                </div>
                <div className="flex flex-col items-center gap-1.5 font-mono text-[9px] text-white/50 uppercase">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-[var(--border-color)] bg-[var(--editor-bg)] transition-all ${s3Dots.comp ? "bg-[var(--class-color)] border-[var(--class-color)] shadow-[0_0_10px_var(--class-color)]" : ""}`} />
                  CMP
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-[5%] left-1/2 -translate-x-1/2 text-center transition-all duration-1000 z-10 ${
              s3NextPhaseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="text-2xl text-[var(--keyword-color)] animate-bounce">&darr;</div>
            <div className="text-[var(--keyword-color)] font-bold text-base tracking-widest mt-2">Phase 2: Strategy Block</div>
          </div>
        </div>
      )}

      {/* SCENE 4 CONTAINER */}
      {currentScene === 4 && (
        <div
          id="scene4-container"
          className={`absolute inset-0 flex justify-center items-center transition-opacity duration-1000 z-25 overflow-hidden ${
            s4ContainerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Planner Model Badge */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 bg-[#1e1e2e]/85 border border-[var(--keyword-color)] rounded-full px-6 py-2 flex items-center gap-3 backdrop-blur-md z-[100] transition-all duration-800 animate-[pulsePlanner_3s_infinite_alternate_ease-in-out] ${
              s4BadgeVisible ? "top-[30px] opacity-100" : "-top-[80px] opacity-0"
            }`}
          >
            <div className="text-2xl text-[var(--keyword-color)]">🧠</div>
            <div className="flex flex-col font-mono">
              <div className="text-[10px] text-[var(--keyword-color)] font-bold tracking-widest">PLANNER ENGINE</div>
              <div className="text-sm text-[#cdd6f4] font-bold font-sans">Qwen2.5-Coder-3B-Instruct</div>
              <div className="text-[9px] text-white/50 uppercase">Small Language Model</div>
            </div>
          </div>

          {/* Incoming Inputs */}
          <div
            className="w-24 h-8 bg-[#1e1e2e] border border-white/10 text-[#cdd6f4] font-mono text-[10px] rounded flex items-center justify-center absolute z-[100] transition-all duration-800"
            style={{ opacity: s4InputBaseline.opacity, top: s4InputBaseline.top, transform: s4InputBaseline.transform, left: "40%" }}
          >
            [Baseline Code]
          </div>
          <div
            className="w-24 h-8 bg-[rgba(166,227,161,0.2)] border border-[var(--string-color)] text-[var(--string-color)] font-mono text-[10px] rounded flex items-center justify-center absolute z-[100] transition-all duration-800"
            style={{ opacity: s4InputInstruction.opacity, top: s4InputInstruction.top, transform: s4InputInstruction.transform, left: "60%" }}
          >
            &quot;Refactor...&quot;
          </div>

          {/* Planner Core Background Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-1000 z-0 pointer-events-none" style={{ opacity: s4CoreOpacity }}>
            <svg viewBox="0 0 500 500" width="100%" height="100%">
              <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(137, 180, 250, 0.2)" strokeWidth="2" strokeDasharray="20 30" className="animate-[spin_20s_linear_infinite] origin-center" />
              <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(249, 226, 175, 0.2)" strokeWidth="2" strokeDasharray="10 15" className="animate-[spin-reverse_15s_linear_infinite] origin-center" />
              <circle cx="250" cy="250" r="100" fill="none" stroke={s4InnerRingStyle.stroke} strokeWidth={s4InnerRingStyle.strokeWidth} strokeDasharray="5 10" className="animate-[spin_10s_linear_infinite] origin-center transition-all" />
            </svg>
          </div>

          {/* Intent Packet */}
          <div
            className="absolute w-20 h-20 bg-[radial-gradient(circle,rgba(166,227,161,0.3)_0%,transparent_70%)] border-2 border-[var(--string-color)] rounded-full flex items-center justify-center text-[var(--string-color)] text-2xl shadow-[0_0_30px_var(--string-color)] z-10 transition-all duration-1000"
            style={{ opacity: s4IntentPacket.opacity, transform: s4IntentPacket.transform, top: s4IntentPacket.top, left: s4IntentPacket.left }}
          >
            🎯
          </div>

          {/* Structural AST Map */}
          <div
            className="absolute top-1/2 left-1/2 w-[500px] h-[350px] bg-[#1e1e2e]/80 border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm z-10 transition-all duration-1000"
            style={{ opacity: s4AstContainer.opacity, transform: s4AstContainer.transform }}
          >
            <svg width="100%" height="100%" viewBox="0 0 500 350">
              <path d="M 250 80 L 150 180" className={`stroke-white/20 stroke-2 fill-none transition-all ${s4AstHighlight.dim ? "opacity-20" : ""}`} />
              <path d="M 250 80 L 350 180" className={`stroke-white/20 stroke-2 fill-none transition-all ${s4AstHighlight.dim ? "opacity-20" : ""}`} />
              <path d="M 350 180 L 350 280" className={`transition-all fill-none ${s4AstHighlight.target ? "stroke-[#ff5f56] stroke-[3px] stroke-dasharray-[5_5] animate-[flowDash_1s_linear_infinite]" : "stroke-white/20 stroke-2"}`} />

              <g className={`transition-all ${s4AstHighlight.dim ? "opacity-20" : ""}`}>
                <rect x="170" y="40" width="160" height="40" fill="var(--editor-bg)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="4" />
                <text x="250" y="65" fill="var(--text-color)" fontFamily="JetBrains Mono" fontSize="12" textAnchor="middle">class StudentManager</text>
              </g>
              <g className={`transition-all ${s4AstHighlight.dim ? "opacity-20" : ""}`}>
                <rect x="70" y="160" width="160" height="40" fill="var(--editor-bg)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="4" />
                <text x="150" y="185" fill="var(--text-color)" fontFamily="JetBrains Mono" fontSize="12" textAnchor="middle">method addStudent()</text>
              </g>
              <g className={`transition-all ${s4AstHighlight.target ? "" : s4AstHighlight.dim ? "opacity-20" : ""}`}>
                <rect x="270" y="160" width="160" height="40" fill="var(--editor-bg)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="4" />
                <text x="350" y="185" fill="var(--text-color)" fontFamily="JetBrains Mono" fontSize="12" textAnchor="middle">method displayStudents()</text>
              </g>
              <g className={`transition-all ${s4AstHighlight.target ? "text-[#ff5f56]" : ""}`}>
                <rect x="270" y="260" width="160" height="40" fill={s4AstHighlight.target ? "rgba(255,95,86,0.15)" : "var(--editor-bg)"} stroke={s4AstHighlight.target ? "#ff5f56" : "rgba(255,255,255,0.3)"} strokeWidth="2" rx="4" />
                <text x="350" y="285" fill={s4AstHighlight.target ? "#ff5f56" : "var(--text-color)"} fontFamily="JetBrains Mono" fontSize="12" fontWeight={s4AstHighlight.target ? "bold" : "normal"} textAnchor="middle">loop for(Student s)</text>
              </g>
            </svg>
          </div>

          {/* Synthesis Sphere */}
          <div
            className="absolute top-1/2 left-1/2 w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(203,166,247,0.8)_0%,transparent_70%)] shadow-[0_0_60px_var(--keyword-color)] z-20 transition-all duration-1000"
            style={{ opacity: s4SynthSphere.opacity, transform: s4SynthSphere.transform }}
          />

          {/* Blueprint Artifact */}
          <div
            className="absolute top-1/2 left-1/2 flex items-center gap-4 z-30 transition-all duration-1000"
            style={{ opacity: s4Blueprint.opacity, transform: s4Blueprint.transform }}
          >
            <div className={`bg-[#1e1e2e]/95 border border-white/10 border-t-4 border-t-[var(--class-color)] rounded-xl p-4 w-32 flex flex-col items-center text-center shadow-xl transition-all duration-500 ${s4BpCards.c1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="text-2xl mb-2 text-[#ff5f56]">🎯</div>
              <div className="font-mono text-[11px] font-bold text-[var(--text-color)] uppercase">Target Loop</div>
            </div>
            <div className={`text-[var(--class-color)] text-2xl transition-all duration-300 ${s4BpCards.a1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>&rarr;</div>
            <div className={`bg-[#1e1e2e]/95 border border-white/10 border-t-4 border-t-[var(--class-color)] rounded-xl p-4 w-32 flex flex-col items-center text-center shadow-xl transition-all duration-500 ${s4BpCards.c2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="text-2xl mb-2 text-[var(--keyword-color)]">✂️</div>
              <div className="font-mono text-[11px] font-bold text-[var(--text-color)] uppercase">Extract Logic</div>
            </div>
            <div className={`text-[var(--class-color)] text-2xl transition-all duration-300 ${s4BpCards.a2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>&rarr;</div>
            <div className={`bg-[#1e1e2e]/95 border border-white/10 border-t-4 border-t-[var(--class-color)] rounded-xl p-4 w-32 flex flex-col items-center text-center shadow-xl transition-all duration-500 ${s4BpCards.c3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="text-2xl mb-2 text-[var(--string-color)]">✨</div>
              <div className="font-mono text-[11px] font-bold text-[var(--text-color)] uppercase">Generate Stream</div>
            </div>
          </div>

          {/* Execution Package Output */}
          <div
            className="absolute left-1/2 w-52 h-14 bg-gradient-to-r from-[var(--keyword-color)] to-[var(--class-color)] rounded-full flex items-center justify-center text-[#11111b] font-mono font-bold text-sm shadow-[0_0_40px_rgba(203,166,247,0.6)] z-40 transition-all duration-800"
            style={{ opacity: s4ExecPack.opacity, transform: s4ExecPack.transform, top: s4ExecPack.top }}
          >
            [ EXECUTION PLAN ]
          </div>
        </div>
      )}

      {/* SCENE 5 CONTAINER */}
      {currentScene === 5 && (
        <div
          id="scene5-container"
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-1000 z-30 ${
            s5ContainerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Generator Badge */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 bg-[#1e1e2e]/85 border border-[var(--string-color)] rounded-full px-6 py-2 flex items-center gap-3 backdrop-blur-md z-[100] transition-all duration-800 animate-[pulseGenerator_3s_infinite_alternate_ease-in-out] ${
              s5BadgeVisible ? "top-[30px] opacity-100" : "-top-[80px] opacity-0"
            }`}
          >
            <div className="text-2xl text-[var(--string-color)]">⚡</div>
            <div className="flex flex-col font-mono">
              <div className="text-[10px] text-[var(--string-color)] font-bold tracking-widest">GENERATOR ENGINE</div>
              <div className="text-sm text-[#cdd6f4] font-bold font-sans">Qwen2.5-Coder-3B-Instruct</div>
              <div className="text-[9px] text-white/50 uppercase">Small Language Model</div>
            </div>
          </div>

          <div className="absolute top-[15%] text-[var(--string-color)] font-mono text-sm tracking-wider z-[100] font-bold transition-opacity duration-500 shadow-[0_0_10px_rgba(166,227,161,0.5)]" style={{ opacity: s5Status.opacity }}>
            {s5Status.text}
          </div>

          {/* Incoming Blueprint */}
          <div
            className="absolute w-52 h-14 bg-gradient-to-r from-[var(--string-color)] to-[var(--method-color)] rounded-full flex items-center justify-center text-[#11111b] font-mono font-bold text-sm shadow-[0_0_40px_rgba(166,227,161,0.6)] z-40 transition-all duration-800"
            style={{ top: s5IncomingBlueprint.top, opacity: s5IncomingBlueprint.opacity, transform: s5IncomingBlueprint.transform, left: "50%" }}
          >
            [ EXECUTION PLAN ]
          </div>

          {/* Generator Engine Core */}
          <div
            className="absolute left-1/2 w-36 h-36 z-50 transition-all duration-1000"
            style={{ opacity: s5Engine.opacity, transform: s5Engine.transform, top: s5Engine.top }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--string-color)] border-b-[var(--string-color)] animate-[spin_6s_linear_infinite] shadow-[0_0_30px_rgba(166,227,161,0.2)]" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-l-[var(--method-color)] border-r-[var(--method-color)] animate-[spin-reverse_4s_linear_infinite] scale-85" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--keyword-color)] animate-[spin_8s_linear_infinite] scale-70" />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[rgba(166,227,161,0.05)] border-2 border-[var(--string-color)] clip-path-hex transition-all ${s5Engine.hexActive ? "bg-[rgba(166,227,161,0.3)] shadow-[0_0_30px_var(--string-color)] animate-[pulseHexFast_0.5s_infinite_alternate]" : "animate-[pulseHex_3s_infinite_alternate]"}`} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">⚙️</div>
          </div>

          {/* Code Split View */}
          <div
            className="flex gap-5 w-[90%] max-w-[1100px] h-[450px] mt-20 z-10 transition-all duration-1000"
            style={{ opacity: s5CodeCompare.opacity, transform: s5CodeCompare.transform }}
          >
            <div className="flex-1 bg-[#1e1e2e] border border-white/10 rounded-xl overflow-hidden flex flex-col opacity-60 grayscale-[0.5] shadow-xl">
              <div className="h-10 bg-black/30 border-b border-white/10 flex items-center px-4 font-mono text-sm text-white/70 font-bold">
                Original (Imperative)
              </div>
              <pre className="p-5 font-mono text-sm leading-relaxed overflow-y-auto text-[#cdd6f4] whitespace-pre-wrap flex-grow">
                <code>
                  {`public class StudentManager {\n\n    private List<Student> students;\n\n    public void addStudent(Student s) {\n        students.add(s);\n    }\n\n    public void displayStudents() {`}
                  <span className={`transition-all duration-500 ${s5OldLoopHighlight ? "bg-[rgba(255,95,86,0.15)] border-l-3 border-l-[#ff5f56] rounded px-1" : ""}`}>
                    {`\n        for (Student s : students) {\n            System.out.println(s.getName());\n        }`}
                  </span>
                  {`\n    }\n}`}
                </code>
              </pre>
            </div>

            <div className="flex-1 bg-[#1e1e2e] border border-[rgba(166,227,161,0.5)] rounded-xl overflow-hidden flex flex-col shadow-[0_0_25px_rgba(166,227,161,0.15)]">
              <div className="h-10 bg-black/30 border-b border-white/10 flex items-center px-4 font-mono text-sm text-[var(--string-color)] font-bold">
                Refactored (Declarative Stream)
              </div>
              <pre className="p-5 font-mono text-sm leading-relaxed overflow-y-auto text-[#cdd6f4] whitespace-pre-wrap flex-grow">
                <code dangerouslySetInnerHTML={{ __html: s5NewCodeHtml }} />
              </pre>
            </div>
          </div>

          {/* Refactor Complete Badge */}
          <div
            className={`absolute bottom-[8%] left-1/2 -translate-x-1/2 bg-[#1e1e2e]/95 border-2 border-[var(--string-color)] text-[var(--string-color)] rounded-full px-7 py-3 font-mono text-base font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(166,227,161,0.3)] z-[100] transition-all duration-800 ${
              s5RefactorComplete ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <span className="text-2xl">✨</span> REFACTORING COMPLETE
          </div>
        </div>
      )}

      {/* SCENE 6 CONTAINER */}
      {currentScene === 6 && (
        <div
          id="scene6-container"
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-1000 z-35 ${
            s6ContainerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute top-[5%] text-white/40 font-mono text-sm tracking-widest uppercase">PHASE 4: DETERMINISTIC VALIDATION</div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600">
            <line x1="500" y1="300" x2="500" y2="150" className={`stroke-white/10 stroke-2 stroke-dasharray-[5_5] transition-all duration-500 ${s6Beams.syn === "active-beam" ? "stroke-[var(--keyword-color)] stroke-[3px] animate-[flowDash_1s_linear_infinite]" : s6Beams.syn === "pass-beam" ? "stroke-[var(--string-color)] stroke-[3px] opacity-50" : s6Beams.syn === "fail-beam" ? "stroke-[#ff5f56] stroke-[3px] opacity-80" : ""}`} />
            <line x1="500" y1="300" x2="250" y2="300" className={`stroke-white/10 stroke-2 stroke-dasharray-[5_5] transition-all duration-500 ${s6Beams.bound === "active-beam" ? "stroke-[var(--keyword-color)] stroke-[3px] animate-[flowDash_1s_linear_infinite]" : s6Beams.bound === "pass-beam" ? "stroke-[var(--string-color)] stroke-[3px] opacity-50" : s6Beams.bound === "fail-beam" ? "stroke-[#ff5f56] stroke-[3px] opacity-80" : ""}`} />
            <line x1="500" y1="300" x2="750" y2="300" className={`stroke-white/10 stroke-2 stroke-dasharray-[5_5] transition-all duration-500 ${s6Beams.comp === "active-beam" ? "stroke-[var(--keyword-color)] stroke-[3px] animate-[flowDash_1s_linear_infinite]" : s6Beams.comp === "pass-beam" ? "stroke-[var(--string-color)] stroke-[3px] opacity-50" : s6Beams.comp === "fail-beam" ? "stroke-[#ff5f56] stroke-[3px] opacity-80" : ""}`} />
          </svg>

          {/* Retry Node */}
          <div
            className={`absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-[#1e1e2e]/90 border border-white/10 rounded-xl p-4 flex flex-col items-center font-mono text-xs z-20 transition-all duration-300 ${
              s6RetryNode.active ? "border-[#ff5f56] shadow-[0_0_25px_rgba(255,95,86,0.3)] scale-110" : ""
            }`}
          >
            <div className={`text-xl mb-1 ${s6RetryNode.active ? "text-[#ff5f56] animate-[spin_2s_linear_infinite]" : "text-[var(--keyword-color)]"}`}>⚙️</div>
            <div className="font-bold mb-1">Generator Revision</div>
            <div className="text-white/50">Attempt: {s6RetryNode.attempt}</div>
          </div>

          {/* Syntax Module */}
          <div
            className={`absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e1e2e]/85 border border-white/10 rounded-xl w-32 h-36 flex flex-col items-center justify-center backdrop-blur-md shadow-xl z-20 transition-all duration-500 ${
              s6Modules.syn === "processing" ? "border-[var(--keyword-color)] shadow-[0_0_20px_rgba(203,166,247,0.3)]" : s6Modules.syn === "pass" ? "border-[var(--string-color)] shadow-[0_0_20px_rgba(166,227,161,0.3)]" : s6Modules.syn === "fail" ? "border-[#ff5f56] shadow-[0_0_20px_rgba(255,95,86,0.4)]" : ""
            }`}
          >
            <div className="font-mono text-[11px] text-[var(--text-color)] mb-2 uppercase font-bold">Syntax Check</div>
            <svg width="60" height="60" viewBox="0 0 100 100">
              <rect x={s6TokensX.t1} y="20" width="40" height="10" fill="var(--keyword-color)" rx="2" className="transition-all duration-500" />
              <rect x={s6TokensX.t2} y="45" width="50" height="10" fill="var(--string-color)" rx="2" className="transition-all duration-500" />
              <rect x={s6TokensX.t3} y="70" width="30" height="10" fill="var(--class-color)" rx="2" className="transition-all duration-500" />
            </svg>
          </div>

          {/* Boundary Module */}
          <div
            className={`absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 bg-[#1e1e2e]/85 border border-white/10 rounded-xl w-32 h-36 flex flex-col items-center justify-center backdrop-blur-md shadow-xl z-20 transition-all duration-500 ${
              s6Modules.bound === "processing" ? "border-[var(--keyword-color)] shadow-[0_0_20px_rgba(203,166,247,0.3)]" : s6Modules.bound === "pass" ? "border-[var(--string-color)] shadow-[0_0_20px_rgba(166,227,161,0.3)]" : s6Modules.bound === "fail" ? "border-[#ff5f56] shadow-[0_0_20px_rgba(255,95,86,0.4)]" : ""
            }`}
          >
            <div className="font-mono text-[11px] text-[var(--text-color)] mb-2 uppercase font-bold">Boundary Check</div>
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="15" fill="var(--editor-bg)" stroke="var(--text-color)" strokeWidth="2" />
              <path d="M 20 50 A 30 30 0 1 1 80 50 A 30 30 0 1 1 20 50" fill="none" stroke={s6BoundShield.stroke} strokeWidth="4" opacity={s6BoundShield.opacity} className="transition-all duration-500 animate-[spin_10s_linear_infinite] origin-center" />
            </svg>
          </div>

          {/* Complexity Module */}
          <div
            className={`absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 bg-[#1e1e2e]/85 border border-white/10 rounded-xl w-32 h-36 flex flex-col items-center justify-center backdrop-blur-md shadow-xl z-20 transition-all duration-500 ${
              s6Modules.comp === "processing" ? "border-[var(--keyword-color)] shadow-[0_0_20px_rgba(203,166,247,0.3)]" : s6Modules.comp === "pass" ? "border-[var(--string-color)] shadow-[0_0_20px_rgba(166,227,161,0.3)]" : s6Modules.comp === "fail" ? "border-[#ff5f56] shadow-[0_0_20px_rgba(255,95,86,0.4)]" : ""
            }`}
          >
            <div className="font-mono text-[11px] text-[var(--text-color)] mb-2 uppercase font-bold">Complexity Check</div>
            <svg width="60" height="60" viewBox="0 0 100 100">
              <text x="25" y="95" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">BASE</text>
              <rect x="25" y="50" width="15" height="35" fill="var(--text-color)" opacity="0.4" rx="2" />
              <text x="60" y="95" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">GEN</text>
              <rect x="60" y={s6CompBar.y} width="15" height={s6CompBar.height} fill="var(--class-color)" rx="2" className="transition-all duration-800" />
            </svg>
          </div>

          {/* Center Code Core */}
          <div
            className={`absolute top-1/2 left-1/2 bg-[#1e1e2e] border border-white/10 rounded-xl p-5 font-mono text-xs leading-relaxed shadow-2xl text-white/80 z-20 transition-all duration-800 ${
              s6Core.fail ? "border-[#ff5f56] text-[#ff5f56] shadow-[0_0_30px_rgba(255,95,86,0.2)] animate-[shake_0.5s]" : ""
            }`}
            style={{ opacity: s6Core.opacity, transform: s6Core.transform }}
          >
            <span className="kw">students</span>.stream()<br />
            &nbsp;&nbsp;.map(...)<br />
            &nbsp;&nbsp;.forEach(...)
          </div>

          {/* Feedback Packet */}
          <div
            className="absolute bg-[rgba(255,95,86,0.15)] border border-[#ff5f56] text-[#ff5f56] px-4 py-2 rounded-full font-mono text-xs z-50 backdrop-blur-md shadow-[0_0_15px_rgba(255,95,86,0.3)] transition-all duration-1000"
            style={{ opacity: s6Feedback.opacity, transform: s6Feedback.transform, top: s6Feedback.top, left: s6Feedback.left }}
          >
            ⚠️ O(N²) Detected
          </div>

          {/* Validated Package */}
          <div
            className="absolute top-1/2 bg-gradient-to-r from-[var(--string-color)] to-[var(--method-color)] text-[#111] px-8 py-4 rounded-full font-mono font-bold text-base shadow-[0_0_40px_rgba(166,227,161,0.5)] z-[100] flex items-center gap-2 transition-all duration-1000"
            style={{ opacity: s6ValidatedPackage.opacity, transform: s6ValidatedPackage.transform, left: s6ValidatedPackage.left }}
          >
            <span className="text-xl">✅</span> VALIDATED CODE
          </div>
        </div>
      )}

      {/* SCENE 7 CONTAINER */}
      {currentScene === 7 && (
        <div
          id="scene7-container"
          className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-1000 z-40 overflow-hidden ${
            s7ContainerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute top-[15%] text-white/40 font-mono text-sm tracking-widest transition-all duration-500 font-bold" style={{ opacity: s7IterCounter.opacity, color: s7IterCounter.color }}>
            {s7IterCounter.text}
          </div>

          {/* Model Swap Area */}
          <div className="absolute top-[8%] left-0 w-full h-20 z-[100]">
            <div
              className={`model-badge badge-planner absolute top-1/2 left-1/2 bg-[#1e1e2e]/85 border border-[var(--keyword-color)] rounded-full px-6 py-2 flex items-center gap-3 backdrop-blur-md transition-all duration-1000 ${
                s7QwenBadge.activeCenter ? "opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100" : s7QwenBadge.exitLeft ? "opacity-0 -translate-x-[calc(50%+300px)] -translate-y-1/2 scale-80 blur-sm" : "opacity-0 -translate-x-1/2 -translate-y-1/2 scale-85"
              }`}
            >
              <div className="text-2xl text-[var(--keyword-color)]">⚙️</div>
              <div className="flex flex-col font-mono">
                <div className="text-[10px] text-[var(--keyword-color)] font-bold">GENERATOR ENGINE</div>
                <div className="text-sm font-bold font-sans">Qwen2.5-Coder-3B-Instruct</div>
                <div className="text-[10px] font-bold text-center tracking-widest" style={{ color: s7QwenBadge.statusColor }}>{s7QwenBadge.status}</div>
              </div>
            </div>

            <div
              className={`model-badge badge-judge absolute top-1/2 left-1/2 bg-[#1e1e2e]/85 border border-[var(--class-color)] rounded-full px-6 py-2 flex items-center gap-3 backdrop-blur-md transition-all duration-1000 ${
                s7LlamaBadge.activeCenter ? "opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100" : s7LlamaBadge.enterRight ? "opacity-0 translate-x-[calc(-50%+300px)] -translate-y-1/2 scale-80" : "opacity-0 -translate-x-1/2 -translate-y-1/2 scale-85"
              }`}
              style={{ opacity: s7LlamaBadge.opacity }}
            >
              <div className="text-2xl text-[var(--class-color)]">⚖️</div>
              <div className="flex flex-col font-mono">
                <div className="text-[10px] text-[var(--class-color)] font-bold">EVALUATION ENGINE</div>
                <div className="text-sm font-bold font-sans">Llama-3.2-3B-Instruct</div>
                <div className="text-[10px] font-bold text-center tracking-widest" style={{ color: s7LlamaBadge.statusColor }}>{s7LlamaBadge.status}</div>
              </div>
            </div>
          </div>

          {/* Code Comparison Panels */}
          <div className="absolute top-[25%] w-[800px] flex justify-between z-10">
            <div
              className={`w-[250px] h-[200px] bg-[#1e1e2e]/85 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center p-4 shadow-2xl relative transition-all duration-1000 ${
                s7Boxes.original ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="font-mono text-xs text-[var(--text-color)] mb-4 uppercase tracking-wider font-bold">Original Structure</div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path d="M 50 10 L 20 40 L 40 70 L 60 70 L 80 40 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <path d="M 20 40 L 80 40 M 40 70 L 80 40 M 20 40 L 60 70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx="50" cy="10" r="4" fill="var(--text-color)" />
                <circle cx="20" cy="40" r="4" fill="#ff5f56" />
                <circle cx="80" cy="40" r="4" fill="var(--text-color)" />
                <circle cx="40" cy="70" r="4" fill="#ff5f56" />
                <circle cx="60" cy="70" r="4" fill="var(--text-color)" />
              </svg>
            </div>

            <div
              className="w-[250px] h-[200px] bg-[#1e1e2e]/85 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center p-4 shadow-2xl relative transition-all duration-1000"
              style={{
                opacity: s7Boxes.refactored ? s7Boxes.refactoredOpacity : 0,
                transform: s7Boxes.refactored ? `translateY(${s7Boxes.refactoredY})` : "translateY(30px)",
              }}
            >
              <div className="font-mono text-xs text-[var(--string-color)] mb-4 uppercase tracking-wider font-bold">Generated Candidate</div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path d="M 50 10 L 50 40 L 50 70 L 50 90" fill="none" stroke="var(--string-color)" strokeWidth="2" />
                <circle cx="50" cy="10" r="4" fill="var(--string-color)" />
                <circle cx="50" cy="40" r="4" fill="var(--string-color)" />
                <circle cx="50" cy="70" r="4" fill="var(--string-color)" />
                <circle cx="50" cy="90" r="4" fill="var(--string-color)" />
              </svg>
            </div>
          </div>

          {/* Judge Core */}
          <div
            className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-20 transition-all duration-1000"
            style={{ opacity: s7JudgeCore.opacity, transform: s7JudgeCore.transform, transition: s7JudgeCore.transition }}
          >
            <div className="w-full h-full rounded-full border-2 border-[var(--class-color)] bg-[radial-gradient(circle,rgba(249,226,175,0.1)_0%,rgba(30,30,46,0.9)_70%)] flex items-center justify-center shadow-[0_0_30px_rgba(249,226,175,0.2)] animate-[pulseJudgeCore_4s_infinite_alternate] relative">
              <div
                className={`w-10 h-10 bg-[var(--class-color)] clip-path-diamond shadow-[0_0_20px_var(--class-color)] transition-all duration-500 ${
                  s7JudgeCrystal.state === "reject" ? "bg-[#ff5f56] shadow-[0_0_30px_#ff5f56]" : s7JudgeCrystal.state === "accept" ? "bg-[var(--string-color)] shadow-[0_0_30px_var(--string-color)]" : ""
                }`}
              />
            </div>
          </div>

          {/* Evaluation Beams SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-15" style={{ opacity: s7Beams.opacity }}>
            <line x1="50%" y1="60%" x2="70%" y2="35%" className={`fill-none stroke-2 stroke-dasharray-[6_6] opacity-0 transition-all duration-500 ${s7Beams.state === "active" ? "opacity-100 stroke-[var(--class-color)] animate-[flowDashReverse_1s_linear_infinite]" : s7Beams.state === "reject" ? "stroke-[#ff5f56] stroke-[4px] opacity-100" : s7Beams.state === "accept" ? "stroke-[var(--string-color)] stroke-[3px] opacity-100" : ""}`} />
            <line x1="50%" y1="60%" x2="70%" y2="45%" className={`fill-none stroke-2 stroke-dasharray-[6_6] opacity-0 transition-all duration-500 ${s7Beams.state === "active" ? "opacity-100 stroke-[var(--class-color)] animate-[flowDashReverse_1s_linear_infinite]" : s7Beams.state === "reject" ? "stroke-[#ff5f56] stroke-[4px] opacity-100" : s7Beams.state === "accept" ? "stroke-[var(--string-color)] stroke-[3px] opacity-100" : ""}`} />
            <line x1="50%" y1="60%" x2="70%" y2="55%" className={`fill-none stroke-2 stroke-dasharray-[6_6] opacity-0 transition-all duration-500 ${s7Beams.state === "active" ? "opacity-100 stroke-[var(--class-color)] animate-[flowDashReverse_1s_linear_infinite]" : s7Beams.state === "reject" ? "stroke-[#ff5f56] stroke-[4px] opacity-100" : s7Beams.state === "accept" ? "stroke-[var(--string-color)] stroke-[3px] opacity-100" : ""}`} />
          </svg>

          <div className="absolute top-[45%] left-[60%] font-mono text-[10px] text-[var(--class-color)] bg-black/60 px-1.5 py-0.5 rounded transition-all duration-500 z-20" style={{ opacity: s7Labels.opacity, color: s7Labels.color }}>Logic Consistency</div>
          <div className="absolute top-[50%] left-[62%] font-mono text-[10px] text-[var(--class-color)] bg-black/60 px-1.5 py-0.5 rounded transition-all duration-500 z-20" style={{ opacity: s7Labels.opacity, color: s7Labels.color }}>Structural Change</div>
          <div className="absolute top-[55%] left-[64%] font-mono text-[10px] text-[var(--class-color)] bg-black/60 px-1.5 py-0.5 rounded transition-all duration-500 z-20" style={{ opacity: s7Labels.opacity, color: s7Labels.color }}>Refactoring Quality</div>

          {/* Feedback Packet */}
          <div
            className="absolute top-[60%] bg-[rgba(255,95,86,0.15)] border border-[#ff5f56] text-[#ff5f56] px-5 py-2.5 rounded-full font-mono text-xs font-bold z-50 shadow-[0_0_20px_rgba(255,95,86,0.4)] flex items-center gap-2 transition-all duration-1000"
            style={{ opacity: s7Feedback.opacity, transform: s7Feedback.transform, left: s7Feedback.left }}
          >
            <span>⚠️</span> REFACTORING QUALITY DEGRADATION
          </div>

          {/* Final Side-by-Side Comparison Panel */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[920px] z-60 transition-all duration-900 ${
              s7FinalCompVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-85 pointer-events-none"
            }`}
          >
            <div className="font-mono text-base font-bold text-[var(--string-color)] text-center mb-4 tracking-widest shadow-[0_0_20px_rgba(166,227,161,0.5)]">
              ✅ VALIDATED OUTPUT &mdash; ITERATION 2 APPROVED
            </div>
            <div className="flex gap-4 items-stretch">
              <div className="flex-1 bg-[rgba(22,22,35,0.97)] border border-red-500/45 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,95,86,0.08)]">
                <div className="px-4 py-2 font-mono text-xs font-bold tracking-widest border-b border-white/10 bg-black/25 text-[#ff5f56]">
                  ⚠ ORIGINAL &mdash; IMPERATIVE LOOP
                </div>
                <pre className="p-4 font-mono text-xs leading-relaxed text-[#cdd6f4] whitespace-pre overflow-x-auto">
{`public class StudentManager {

    private List<Student> students;

    public void addStudent(Student s) {
        students.add(s);
    }

    public void displayStudents() {
        for (Student s : students) {
            System.out.println(s.getName());
        }
    }
}`}
                </pre>
              </div>

              <div className="text-[var(--string-color)] text-3xl flex items-center px-1 shrink-0 drop-shadow-[0_0_12px_var(--string-color)]">&rarr;</div>

              <div className="flex-1 bg-[rgba(22,22,35,0.97)] border border-[var(--string-color)] rounded-xl overflow-hidden shadow-[0_0_25px_rgba(166,227,161,0.15)]">
                <div className="px-4 py-2 font-mono text-xs font-bold tracking-widest border-b border-white/10 bg-black/25 text-[var(--string-color)]">
                  ✅ REFACTORED &mdash; DECLARATIVE STREAM
                </div>
                <pre className="p-4 font-mono text-xs leading-relaxed text-[#cdd6f4] whitespace-pre overflow-x-auto">
{`public class StudentManager {

    private List<Student> students;

    public void addStudent(Student s) {
        students.add(s);
    }

    public void displayStudents() {
        students.stream()
                .map(Student::getName)
                .forEach(System::println);
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}