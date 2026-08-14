"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette } from "@/data/palettes";
import { Geologica, Onest } from "next/font/google";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { Database, Zap, Repeat, Bot, ArrowRight, ShieldCheck, ChevronRight, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

const geologica = Geologica({ subsets: ["latin"] });
const onest = Onest({ subsets: ["latin"] });

// AI Automation Ease (Long wind-up, instant snap)
const AI_EASE: [number, number, number, number] = [0.8, 0, 0, 1];

// Jittery chaos animation
const chaosAnimation: any = {
  rotate: [0, 2, -1, 3, 0, -2, 1, 0],
  x: [0, -3, 2, -1, 4, -2, 0],
  y: [0, 2, -3, 1, -2, 3, 0],
  transition: { repeat: Infinity, duration: 2, ease: "linear" }
};

export function AiAutomationDemo({ palette }: { palette: Palette }) {
  const [emerald, copper] = palette.colors; // #0F4C3A, #C67C4E
  
  const [scrubberPosition, setScrubberPosition] = useState(50); // percentage 0-100
  const heroRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setScrubberPosition((x / rect.width) * 100);
  };

  // Accelerator scroll logic
  const acceleratorRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: acceleratorRef,
    offset: ["start center", "end center"]
  });

  const packetProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const packetTop = useTransform(packetProgress, [0, 1], ["0%", "100%"]);

  return (
    <div 
      className={cn(
        "relative min-h-screen w-full selection:bg-[#C67C4E] selection:text-[#0F4C3A] overflow-x-hidden",
        onest.className
      )}
      style={{ backgroundColor: emerald, color: "#FFFFFF" }}
    >
      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          ← Gallery
        </Link>
        <div className="flex items-center gap-6 pointer-events-auto text-xs font-bold tracking-widest uppercase">
          <button className="hover:opacity-70 transition-opacity">Solutions</button>
          <button className="px-5 py-2 border hover:bg-white hover:text-[#0F4C3A] transition-colors rounded-sm" style={{ borderColor: copper }}>
            Book Demo
          </button>
        </div>
      </header>

      {/* SECTION 1: THE TRANSFORMATION SCRUBBER (HERO) */}
      <section 
        ref={heroRef}
        onPointerMove={handlePointerMove}
        className="relative h-screen w-full overflow-hidden cursor-ew-resize touch-none"
      >
        {/* Layer 1: Chaos (Manual State) */}
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#0F4C3A]">
          <div className="max-w-4xl w-full">
            <motion.div animate={chaosAnimation} className="relative z-10 border border-dashed border-white/20 p-8 rotate-3 translate-x-4">
              <h1 className={cn("text-5xl md:text-7xl font-bold mb-6 text-white/50", geologica.className)}>
                Manual Data Entry
              </h1>
              <p className="text-xl max-w-lg text-white/40 mb-8 font-mono">
                ERR: Process bottleneck detected. High latency. Human error probability: 14.2%. Support queues overflowing. 
              </p>
              <div className="flex gap-4">
                <div className="w-24 h-8 bg-red-500/20 border border-red-500/50 rotate-[-5deg]" />
                <div className="w-32 h-8 bg-red-500/20 border border-red-500/50 translate-y-2" />
                <div className="w-16 h-8 bg-red-500/20 border border-red-500/50 rotate-[4deg]" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Layer 2: Order (Automated State) */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-8 bg-[#156950]"
          style={{ clipPath: `inset(0 ${100 - scrubberPosition}% 0 0)` }}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${copper} 1px, transparent 1px), linear-gradient(90deg, ${copper} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="max-w-4xl w-full relative z-10">
            <div className="p-8 border-l-4 bg-[#0F4C3A]/50 backdrop-blur-md" style={{ borderColor: copper }}>
              <h1 className={cn("text-5xl md:text-7xl font-black mb-6", geologica.className)} style={{ color: copper }}>
                Instant Automation
              </h1>
              <p className="text-xl max-w-lg mb-8 opacity-90 leading-relaxed">
                Seamless AI integration. Zero latency processing. Infinite scalability. We build the engines that run your operations automatically.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase">
                  <Database size={14} style={{ color: copper }} /> Synchronized
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase">
                  <Zap size={14} style={{ color: copper }} /> 0.02ms Latency
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Scrubber Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] z-20"
          style={{ left: `${scrubberPosition}%`, backgroundColor: copper }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center bg-[#0F4C3A] shadow-[0_0_20px_rgba(198,124,78,0.5)]" style={{ borderColor: copper }}>
            <ChevronsRight size={24} style={{ color: copper }} />
          </div>
          {/* glowing aura */}
          <div className="absolute top-0 bottom-0 w-[20px] -translate-x-1/2 blur-md opacity-30 pointer-events-none" style={{ backgroundColor: copper }} />
        </div>
      </section>

      {/* SECTION 2 & 3: THE ACCELERATOR PIPELINE */}
      <section ref={acceleratorRef} className="relative w-full py-32 px-4 md:px-12 max-w-7xl mx-auto flex">
        
        {/* The Pipeline Track */}
        <div className="w-12 md:w-24 shrink-0 relative flex justify-center">
          <div className="absolute top-0 bottom-0 w-[2px] opacity-20" style={{ backgroundColor: copper }} />
          {/* The Data Packet */}
          <motion.div 
            className="absolute w-4 h-16 rounded-full shadow-[0_0_15px_rgba(198,124,78,1)]"
            style={{ 
              backgroundColor: copper,
              top: packetTop,
              translateY: "-50%" 
            }}
          />
        </div>

        {/* The Nodes (Services) */}
        <div className="flex-1 flex flex-col gap-[30vh] pb-[20vh]">
          
          {/* Node 1 */}
          <div className="relative">
            <div className="absolute left-[-24px] md:left-[-48px] top-8 w-6 h-[2px] opacity-20" style={{ backgroundColor: copper }} />
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: AI_EASE }}
              className="p-8 md:p-12 border bg-black/10 backdrop-blur-sm"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-sm"><Bot size={24} style={{ color: copper }} /></div>
                <h3 className={cn("text-3xl md:text-4xl font-bold", geologica.className)}>Intelligent Support Agents</h3>
              </div>
              <p className="text-lg opacity-70 mb-8 max-w-2xl leading-relaxed">
                Deploy conversational AI that resolves 80% of tier-1 support tickets instantly. Connected directly to your internal knowledge base and CRM for hyper-personalized responses.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold tracking-widest uppercase">
                <span className="px-3 py-1 bg-[#156950] border border-transparent">NLP Routing</span>
                <span className="px-3 py-1 bg-[#156950] border border-transparent">Context Retention</span>
                <span className="px-3 py-1 bg-[#156950] border border-transparent">24/7 Availability</span>
              </div>
            </motion.div>
          </div>

          {/* Node 2 */}
          <div className="relative">
            <div className="absolute left-[-24px] md:left-[-48px] top-8 w-6 h-[2px] opacity-20" style={{ backgroundColor: copper }} />
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: AI_EASE }}
              className="p-8 md:p-12 border bg-black/10 backdrop-blur-sm"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-sm"><Repeat size={24} style={{ color: copper }} /></div>
                <h3 className={cn("text-3xl md:text-4xl font-bold", geologica.className)}>Process Automation</h3>
              </div>
              <p className="text-lg opacity-70 mb-8 max-w-2xl leading-relaxed">
                Eliminate manual copy-pasting. We integrate APIs across your entire tech stack (Salesforce, Slack, Jira, ERPs) to trigger multi-step actions instantly based on specific events.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="flex items-center gap-3 text-sm opacity-80"><ShieldCheck size={16} style={{ color: copper }} /> Error-free execution</div>
                <div className="flex items-center gap-3 text-sm opacity-80"><ShieldCheck size={16} style={{ color: copper }} /> Audit logging</div>
                <div className="flex items-center gap-3 text-sm opacity-80"><ShieldCheck size={16} style={{ color: copper }} /> Webhook listeners</div>
                <div className="flex items-center gap-3 text-sm opacity-80"><ShieldCheck size={16} style={{ color: copper }} /> Secure auth</div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 4: THROUGHPUT METRICS */}
      <section className="py-32 bg-[#156950] border-y border-black/20">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-16 justify-between">
          <div className="flex-1">
            <h2 className={cn("text-4xl md:text-5xl font-bold mb-6", geologica.className)}>
              System Impact
            </h2>
            <p className="text-lg opacity-80 max-w-md">
              The compounding return on automation. When systems communicate flawlessly, human capital is freed for high-leverage strategic work.
            </p>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: AI_EASE }}
              className="border-l-2 pl-6" 
              style={{ borderColor: copper }}
            >
              <div className={cn("text-5xl font-bold mb-2", geologica.className)}>14.2k</div>
              <div className="text-xs font-bold tracking-widest uppercase opacity-60">Hours Saved Monthly</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: AI_EASE, delay: 0.1 }}
              className="border-l-2 pl-6" 
              style={{ borderColor: copper }}
            >
              <div className={cn("text-5xl font-bold mb-2", geologica.className)}>99.8%</div>
              <div className="text-xs font-bold tracking-widest uppercase opacity-60">Error Reduction</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: AI_EASE, delay: 0.2 }}
              className="border-l-2 pl-6" 
              style={{ borderColor: copper }}
            >
              <div className={cn("text-5xl font-bold mb-2", geologica.className)}>{'<'}1s</div>
              <div className="text-xs font-bold tracking-widest uppercase opacity-60">Response Latency</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: AI_EASE, delay: 0.3 }}
              className="border-l-2 pl-6" 
              style={{ borderColor: copper }}
            >
              <div className={cn("text-5xl font-bold mb-2", geologica.className)}>3.5x</div>
              <div className="text-xs font-bold tracking-widest uppercase opacity-60">Throughput Multiplier</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL NODE (FOOTER) */}
      <footer className="py-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className={cn("text-5xl md:text-7xl font-bold mb-8", geologica.className)}>
          Initiate Sequence.
        </h2>
        <p className="text-xl opacity-70 mb-12 max-w-xl">
          Plug your operations into our infrastructure. Schedule an architecture review to map out your automation potential.
        </p>
        
        <div className="w-full max-w-md p-2 bg-white/5 border flex items-center justify-between pl-6" style={{ borderColor: copper }}>
          <span className="text-sm font-bold tracking-widest uppercase opacity-70">Connect Data Stream</span>
          <button className="px-8 py-4 font-bold tracking-widest uppercase text-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-2" style={{ backgroundColor: copper, color: "#0F4C3A" }}>
            Execute <ArrowRight size={18} />
          </button>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-32 pt-8 border-t opacity-40 text-xs font-bold tracking-widest uppercase" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
          <span>© {new Date().getFullYear()} AutoSys Corp.</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>Security</span>
            <span>API Docs</span>
            <span>Status</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
