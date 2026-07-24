"use client"

import { useState } from "react"
import { Check, Copy, Sparkles } from "lucide-react"
import { HorizonGlow } from "@/components/horizon-glow"
import { cn } from "@/lib/utils"

export function CodeSection() {
  const [copied, setCopied] = useState(false)
  const [activeTabRight, setActiveTabRight] = useState<"code" | "insights">("code")

  const refactoredCode = `public class OrderTracker {

    private static final String[] messages = {
        "Order Placed",
        "Processing",
        "Shipped",
        "Delivered"
    };

    public String getStatusMessage(int s) {
        return messages[s];
    }
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(refactoredCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="demo" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30 bg-[#0d0d0f]/20 overflow-hidden">
      <HorizonGlow glowPosition="center" glowColor="blue" sparkleCount={15} showHorizonLine={false} />
      
      {/* Section Header */}
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03.5 / Studio Demo</span>
        <h2 className="mt-4 font-[var(--font-inter)] text-5xl md:text-7xl tracking-tight">REFACTORING IN ACTION</h2>
        <p className="mt-6 font-mono text-sm text-foreground/70 max-w-2xl leading-relaxed">
          See how the SLM orchestration translates complex, nested conditionals into structured, clean, and optimized Java patterns.
        </p>
      </div>

      {/* Side-by-side IDE Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto items-stretch">
        
        {/* Left Code Editor (Input.java) */}
        <div className="flex flex-col rounded-xl overflow-hidden border border-border/40 bg-[#1E1F22] shadow-2xl relative min-h-[460px]">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-[#2B2D30]/80 backdrop-blur-sm select-none">
            <div className="flex items-center">
              <div className="px-4 py-1.5 rounded-t-lg bg-[#1E1F22] border-t border-x border-border/30 text-xs font-mono text-foreground font-medium">
                Input.java
              </div>
            </div>
            <div className="font-mono text-[9px] text-[#548af7]/90 bg-[#548af7]/10 px-2 py-0.5 rounded border border-[#548af7]/20 uppercase tracking-wider font-semibold">
              # 20 lines
            </div>
          </div>

          {/* Editor Body */}
          <div className="p-6 font-mono text-xs md:text-sm flex-1 relative flex">
            {/* Line Numbers */}
            <div className="text-muted-foreground/35 select-none text-right pr-6 border-r border-border/10 flex flex-col justify-start space-y-1.5 w-10">
              {Array.from({ length: 11 }).map((_, i) => (
                <span key={i}>{i + 4}</span>
              ))}
            </div>
            
            {/* Syntax Highlighted Code */}
            <div className="pl-6 flex-1 text-[#A9B7C6] whitespace-pre overflow-x-auto leading-relaxed select-text space-y-1.5">
              <div>
                <span className="text-[#569CD6]">String</span> msg = <span className="text-[#6A8759]">""</span>;
              </div>
              <div></div>
              <div>
                <span className="text-[#CC7832]">if</span> (s == <span className="text-[#6897BB]">0</span>) &#123;
              </div>
              <div className="pl-4">
                msg = <span className="text-[#6A8759]">"Order Placed"</span>;
              </div>
              <div>
                &#125; <span className="text-[#CC7832]">else if</span> (s == <span className="text-[#6897BB]">1</span>) &#123;
              </div>
              <div className="pl-4">
                msg = <span className="text-[#6A8759]">"Processing"</span>;
              </div>
              <div>
                &#125; <span className="text-[#CC7832]">else if</span> (s == <span className="text-[#6897BB]">2</span>) &#123;
              </div>
              <div className="pl-4">
                msg = <span className="text-[#6A8759]">"Shipped"</span>;
              </div>
              <div>
                &#125; <span className="text-[#CC7832]">else if</span> (s == <span className="text-[#6897BB]">3</span>) &#123;
              </div>
              <div className="pl-4">
                msg = <span className="text-[#6A8759]">"Delivered"</span>;
              </div>
              <div>
                &#125; <span className="text-[#CC7832]">else</span> &#123;
              </div>
            </div>

            {/* Prompt overlay dialog */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#1A1A1C]/95 border border-border/50 rounded-xl p-5 shadow-2xl backdrop-blur-md z-20">
              <p className="text-[11px] text-foreground/80 leading-relaxed font-sans">
                This method translates an integer status code from a database into a human-readable message.
              </p>
              <p className="text-[11px] text-foreground/80 leading-relaxed font-sans mt-2">
                The Goal: Refactor this code to eliminate the "magic numbers" and get rid of the clunky if/else chain.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border/20 pt-3">
                <div className="w-6 h-6 rounded-md bg-[#2B2D30] flex items-center justify-center border border-border/40 text-muted-foreground text-xs select-none">
                  ⌘
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground font-sans text-[11px] font-semibold hover:bg-accent/90 transition-all select-none shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Run</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Code Editor (RefactoredOutput.java / Insights.md) */}
        <div className="flex flex-col rounded-xl overflow-hidden border border-border/40 bg-[#1E1F22] shadow-2xl relative min-h-[460px]">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-[#2B2D30]/80 backdrop-blur-sm select-none">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTabRight("insights")}
                className={cn(
                  "px-4 py-1.5 text-xs font-mono transition-all font-medium rounded-t-lg border-t border-x",
                  activeTabRight === "insights"
                    ? "bg-[#1E1F22] border-border/30 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground/75"
                )}
              >
                Insights.md
              </button>
              <button
                onClick={() => setActiveTabRight("code")}
                className={cn(
                  "px-4 py-1.5 text-xs font-mono transition-all font-medium rounded-t-lg border-t border-x",
                  activeTabRight === "code"
                    ? "bg-[#1E1F22] border-border/30 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground/75"
                )}
              >
                RefactoredOutput.java
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[#59ba7c]/90 bg-[#59ba7c]/10 border border-[#59ba7c]/20 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#59ba7c] animate-pulse" />
                Ready
              </div>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="p-6 font-mono text-xs md:text-sm flex-1 relative flex">
            {activeTabRight === "code" ? (
              <>
                {/* Line Numbers */}
                <div className="text-muted-foreground/35 select-none text-right pr-6 border-r border-border/10 flex flex-col justify-start space-y-1.5 w-10">
                  {Array.from({ length: 13 }).map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>

                {/* Syntax Highlighted Code */}
                <div className="pl-6 flex-1 text-[#A9B7C6] whitespace-pre overflow-x-auto leading-relaxed select-text space-y-1.5">
                  <div>
                    <span className="text-[#CC7832]">public class</span> <span className="text-[#A9B7C6]">OrderTracker</span> &#123;
                  </div>
                  <div></div>
                  <div className="pl-4">
                    <span className="text-[#CC7832]">private static final</span> <span className="text-[#569CD6]">String</span>[] messages = &#123;
                  </div>
                  <div className="pl-8 text-[#6A8759]">
                    "Order Placed",
                  </div>
                  <div className="pl-8 text-[#6A8759]">
                    "Processing",
                  </div>
                  <div className="pl-8 text-[#6A8759]">
                    "Shipped",
                  </div>
                  <div className="pl-8 text-[#6A8759]">
                    "Delivered"
                  </div>
                  <div className="pl-4">
                    &#125;;
                  </div>
                  <div></div>
                  <div className="pl-4">
                    <span className="text-[#CC7832]">public</span> <span className="text-[#569CD6]">String</span> <span className="text-[#FFC66D]">getStatusMessage</span>(<span className="text-[#569CD6]">int</span> s) &#123;
                  </div>
                  <div className="pl-8">
                    <span className="text-[#CC7832]">return</span> messages[s];
                  </div>
                  <div className="pl-4">
                    &#125;
                  </div>
                  <div>&#125;</div>
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto font-sans text-xs md:text-sm text-foreground/80 leading-relaxed max-w-full prose prose-invert select-text pr-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-4 border-b border-border/20 pb-2">Refactoring Insights</h4>
                <ul className="space-y-3 list-disc pl-4 font-mono text-[11px] text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Clunky If-Else Elimination:</strong> Replaced the multi-branch conditional chain with a static lookup array, boosting runtime efficiency.
                  </li>
                  <li>
                    <strong className="text-foreground">Magic Numbers Removed:</strong> Grouped raw integer statuses (0, 1, 2, 3) into an indexed string array structure.
                  </li>
                  <li>
                    <strong className="text-foreground">Complexity:</strong> Reduced Cyclomatic Complexity from <span className="text-red-400">5</span> to <span className="text-green-400">1</span>.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
