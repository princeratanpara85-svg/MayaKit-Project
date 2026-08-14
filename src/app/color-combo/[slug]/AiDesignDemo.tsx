"use client";

import React, { useRef, useState, useEffect } from "react";
import { Palette } from "@/data/palettes";
import { Instrument_Sans, Spline_Sans_Mono } from "next/font/google";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Terminal, Layers, Component, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const instrument = Instrument_Sans({ weight: ["400", "500", "600"], subsets: ["latin"] });
const spline = Spline_Sans_Mono({ weight: ["400", "700"], subsets: ["latin"] });

// The Token Stream Ease (Sharp, staggered, fast spring)
const STREAM_SPRING: any = { type: "spring", stiffness: 400, damping: 30 };

// 3-Stage Assembly Component
const GenerativeNode = ({ 
  stage, 
  delay = 0,
  wireframe, 
  render, 
  polish,
  className
}: { 
  stage: number, 
  delay?: number,
  wireframe: React.ReactNode, 
  render: React.ReactNode, 
  polish: React.ReactNode,
  className?: string
}) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div 
            key="wireframe"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ ...STREAM_SPRING, delay }}
            className="w-full h-full border border-dashed border-[#035352]/30 flex items-center justify-center text-[#035352]/30 p-4"
          >
            {wireframe}
          </motion.div>
        )}
        {stage === 1 && (
          <motion.div 
            key="render"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ ...STREAM_SPRING, delay }}
            className="w-full h-full bg-[#035352]/5 border border-[#035352]/10 flex items-center justify-center p-4"
          >
            {render}
          </motion.div>
        )}
        {stage >= 2 && (
          <motion.div 
            key="polish"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...STREAM_SPRING, delay }}
            className="w-full h-full"
          >
            {polish}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function AiDesignDemo({ palette }: { palette: Palette }) {
  const [teal, cream] = palette.colors; // #035352, #F3E8BC
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll to 3 stages (0: Wireframe, 1: Render, 2: Polish)
  const stageRaw = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 1, 2]);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    return stageRaw.onChange(v => setCurrentStage(Math.floor(v)));
  }, [stageRaw]);

  // Dynamic Prompt based on scroll
  const currentPrompt = currentStage === 0 
    ? "> Initializing layout grid. Defining spatial boundaries..." 
    : currentStage === 1 
    ? "> Applying structural hierarchy. Generating skeleton tokens..." 
    : "> Injecting typography system. Rendering asset buffers. Complete.";

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative min-h-[300vh] w-full selection:bg-[#035352] selection:text-[#F3E8BC] overflow-x-hidden",
        instrument.className
      )}
      style={{ backgroundColor: cream, color: teal }}
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-[#F3E8BC]">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-xl font-medium tracking-tight hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <Sparkles size={20} /> Aura.ai
        </Link>
        <div className="flex gap-8 pointer-events-auto text-sm font-medium">
          <a href="#" className="hover:opacity-70 transition-opacity">Engine</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Documentation</a>
          <button className="bg-[#F3E8BC] text-[#035352] px-4 py-1 rounded-full text-xs font-bold">Launch Workspace</button>
        </div>
      </header>

      {/* PERSISTENT PROMPT TERMINAL (FLOATING) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 pointer-events-none">
        <motion.div 
          className="bg-[#035352] text-[#F3E8BC] p-4 rounded-xl shadow-2xl flex items-start gap-4 border border-[#F3E8BC]/20"
        >
          <Terminal size={16} className="mt-1 opacity-50 shrink-0" />
          <div className="flex flex-col">
            <div className={cn("text-xs opacity-50 uppercase tracking-widest mb-2", spline.className)}>
              System.Generative_Loop [Stage {currentStage + 1}/3]
            </div>
            <div className={cn("text-sm md:text-base typing-indicator", spline.className)}>
              {currentPrompt}
              <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-[#F3E8BC] ml-1 align-middle"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* THE CANVAS (FIXED BACKGROUND THAT ASSEMBLES ITSELF) */}
      <div className="fixed inset-0 p-8 pt-32 pb-40 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-full max-w-6xl h-full border border-[#035352]/20 rounded-3xl bg-white/30 backdrop-blur-3xl shadow-xl overflow-hidden flex flex-col p-8 gap-8">
          
          {/* Mock UI Header */}
          <div className="w-full h-16 flex justify-between items-center border-b border-[#035352]/10 pb-4">
            <GenerativeNode 
              stage={currentStage} delay={0.1} className="w-32 h-8"
              wireframe={<div className="w-full h-full" />}
              render={<div className="w-full h-full bg-[#035352]/20 rounded" />}
              polish={<div className={cn("text-xl font-bold tracking-tight", instrument.className)}>Nexus®</div>}
            />
            <div className="flex gap-4">
              {[0, 1, 2].map(i => (
                <GenerativeNode 
                  key={i} stage={currentStage} delay={0.15 + (i * 0.05)} className="w-16 h-4"
                  wireframe={<div className="w-full h-full" />}
                  render={<div className="w-full h-full bg-[#035352]/10 rounded" />}
                  polish={<div className="text-sm font-medium opacity-60">Link {i+1}</div>}
                />
              ))}
            </div>
          </div>

          {/* Mock UI Hero */}
          <div className="flex-1 flex gap-8">
            <div className="w-1/2 flex flex-col justify-center gap-6">
              <GenerativeNode 
                stage={currentStage} delay={0.2} className="w-24 h-6"
                wireframe={<div className="w-full h-full border-b border-dashed border-[#035352]/30" />}
                render={<div className="w-full h-full bg-[#035352]/20 rounded-full" />}
                polish={<div className="text-xs font-bold uppercase tracking-widest text-[#035352] px-3 py-1 bg-[#035352]/10 rounded-full inline-flex w-auto">V2.0 Live</div>}
              />
              
              <GenerativeNode 
                stage={currentStage} delay={0.25} className="w-full h-40"
                wireframe={<div className="w-full h-full flex items-center justify-center"><Layers size={24} className="opacity-20" /></div>}
                render={
                  <div className="w-full h-full flex flex-col gap-2">
                    <div className="w-[90%] h-10 bg-[#035352]/30 rounded" />
                    <div className="w-[70%] h-10 bg-[#035352]/30 rounded" />
                    <div className="w-[80%] h-10 bg-[#035352]/30 rounded" />
                  </div>
                }
                polish={
                  <h1 className="text-6xl md:text-7xl font-medium tracking-tight leading-[1.1] text-[#035352]">
                    Design at the speed of thought.
                  </h1>
                }
              />

              <GenerativeNode 
                stage={currentStage} delay={0.3} className="w-[80%] h-20"
                wireframe={<div className="w-full h-full" />}
                render={
                  <div className="w-full h-full flex flex-col gap-2">
                    <div className="w-full h-4 bg-[#035352]/10 rounded" />
                    <div className="w-[90%] h-4 bg-[#035352]/10 rounded" />
                    <div className="w-[60%] h-4 bg-[#035352]/10 rounded" />
                  </div>
                }
                polish={
                  <p className="text-lg text-[#035352]/70 leading-relaxed">
                    Aura.ai transforms your natural language prompts into production-ready React components, bridging the gap between ideation and deployment.
                  </p>
                }
              />

              <GenerativeNode 
                stage={currentStage} delay={0.35} className="w-48 h-12 mt-4"
                wireframe={<div className="w-full h-full" />}
                render={<div className="w-full h-full bg-[#035352]/40 rounded-lg" />}
                polish={
                  <button className="w-full h-full bg-[#035352] text-[#F3E8BC] rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Start Generating <ArrowRight size={16} />
                  </button>
                }
              />
            </div>

            <div className="w-1/2 h-full">
              <GenerativeNode 
                stage={currentStage} delay={0.4} className="w-full h-full rounded-2xl overflow-hidden"
                wireframe={<div className="w-full h-full flex items-center justify-center"><Component size={48} className="opacity-10" /></div>}
                render={<div className="w-full h-full bg-[#035352]/10" />}
                polish={
                  <div className="w-full h-full relative group">
                    {/* SVG Duotone Filter */}
                    <svg className="hidden">
                      <filter id="duotone-ai">
                        <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0
                                                             0.33 0.33 0.33 0 0
                                                             0.33 0.33 0.33 0 0
                                                             0 0 0 1 0" />
                        <feComponentTransfer colorInterpolationFilters="sRGB">
                          <feFuncR type="table" tableValues="0.012 0.953" /> {/* #03 -> #F3 */}
                          <feFuncG type="table" tableValues="0.325 0.910" /> {/* #53 -> #E8 */}
                          <feFuncB type="table" tableValues="0.321 0.737" /> {/* #52 -> #BC */}
                        </feComponentTransfer>
                      </filter>
                    </svg>
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                      style={{ 
                        backgroundImage: 'url("https://picsum.photos/seed/19f9003d/1200/800")',
                        filter: 'url(#duotone-ai)' 
                      }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#035352]/20 rounded-2xl pointer-events-none" />
                  </div>
                }
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
