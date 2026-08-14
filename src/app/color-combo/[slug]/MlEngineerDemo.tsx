"use client";

import React, { useState, useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Spectral, JetBrains_Mono } from "next/font/google";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { Network, Database, BrainCircuit, Activity, ChevronDown, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

const spectral = Spectral({ weight: ["300", "400", "600"], style: ["normal", "italic"], subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export function MlEngineerDemo({ palette }: { palette: Palette }) {
  const [espresso, lime] = palette.colors; // #1F0E06, #C6E385
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Optimizer (Spring) smoothing to simulate SGD/Adam convergence momentum
  const optimizer = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // Metrics driven by scroll
  const lossRaw = useTransform(optimizer, [0, 1], [1.4823, 0.0012]);
  const epochRaw = useTransform(optimizer, [0, 1], [0, 100]);
  
  const [loss, setLoss] = useState("1.4823");
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    return lossRaw.onChange(v => setLoss(v.toFixed(4)));
  }, [lossRaw]);

  useEffect(() => {
    return epochRaw.onChange(v => setEpoch(Math.floor(v)));
  }, [epochRaw]);

  // Visual convergence mappings
  // Starts blurry and rotated, resolves to perfectly sharp and aligned by 40% scroll
  const heroBlur = useTransform(optimizer, [0, 0.4], ["8px", "0px"]);
  const heroRotate = useTransform(optimizer, [0, 0.4], ["-4deg", "0deg"]);
  const heroOpacity = useTransform(optimizer, [0, 0.4], [0.4, 1]);
  
  // Background grid precision
  const gridOpacity = useTransform(optimizer, [0, 0.8], [0, 0.1]);

  return (
    <motion.div 
      ref={containerRef}
      className={cn(
        "relative min-h-[400vh] w-full selection:bg-[#C6E385] selection:text-[#1F0E06] overflow-x-hidden",
        spectral.className
      )}
      style={{ backgroundColor: espresso, color: lime }}
    >
      {/* BACKGROUND GRAPH / GRID */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `linear-gradient(${lime} 1px, transparent 1px), linear-gradient(90deg, ${lime} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* FIXED TRAINING METRICS HUD */}
      <header className={cn("fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none mix-blend-difference text-[#C6E385]", jetbrains.className)}>
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-xs font-bold tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2 uppercase"
        >
          [Interrupt_Kernel]
        </Link>
        <div className="flex flex-col items-end gap-1 pointer-events-auto text-xs opacity-80">
          <div>Epoch: {epoch.toString().padStart(3, '0')} / 100</div>
          <div className="flex items-center gap-2">
            Loss: <span className="w-16 inline-block text-right">{loss}</span>
          </div>
          <div>Optimizer: AdamW</div>
          <div>LR: 3e-4</div>
        </div>
      </header>

      {/* CONTENT LAYER */}
      <div className="relative z-10">

        {/* 1. EPOCH 0: RAW DATA (HERO) */}
        <section className="h-screen w-full flex flex-col items-center justify-center p-8 sticky top-0 -z-10">
          <motion.div 
            className="flex flex-col items-center text-center"
            style={{ 
              filter: `blur(${heroBlur.get()})`, 
              rotate: heroRotate,
              opacity: heroOpacity
            }}
          >
            <div className={cn("text-sm uppercase tracking-[0.3em] mb-8 opacity-60", jetbrains.className)}>
              Dr. Aris Vane
            </div>
            
            <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-[1.1] max-w-4xl mb-8">
              Latent Space Architecture & Generative Reasoning.
            </h1>
            
            <p className="text-xl italic opacity-70 max-w-2xl">
              Researching the probabilistic boundaries of diffusion models and self-supervised representation learning.
            </p>

            <motion.div 
              style={{ opacity: useTransform(optimizer, [0, 0.1], [1, 0]) }}
              className={cn("absolute bottom-12 flex flex-col items-center gap-2 text-xs opacity-50 uppercase tracking-widest", jetbrains.className)}
            >
              Scroll to Converge <ChevronDown size={16} className="animate-bounce" />
            </motion.div>
          </motion.div>
        </section>

        {/* 2. FORWARD PASS: RESEARCH (ACADEMIC FEEL) */}
        <section className="min-h-screen w-full bg-[#1F0E06] relative z-10 pt-32 pb-16 px-8 md:px-24 border-t border-[#C6E385]/20">
          <div className="max-w-4xl mx-auto">
            <h2 className={cn("text-xs uppercase tracking-[0.2em] mb-16 opacity-50 flex items-center gap-4", jetbrains.className)}>
              <Network size={16} /> 01 // Selected Publications
            </h2>

            <div className="flex flex-col gap-24">
              {[
                { 
                  title: "High-Dimensional Manifold Traversal in Continuous Diffusion Models", 
                  conf: "NeurIPS 2025", 
                  abstract: "We introduce a novel sampling trajectory that directly traverses the latent manifold without requiring discretized Langevin dynamics. By modeling the noise-prediction objective as a continuous flow field, we achieve a 4.2x speedup in generation while retaining FID scores comparable to standard DDPMs."
                },
                { 
                  title: "Attention as a Markov Process: Bound States in Transformers", 
                  conf: "ICML 2024", 
                  abstract: "Analyzing the self-attention mechanism through the lens of Markov chains reveals that deep transformer layers often collapse into bound states. We propose an entropy-regularized attention head that forces exploration of the sequence, yielding a 1.8% absolute improvement on SuperGLUE."
                }
              ].map((paper, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className={cn("text-xs font-bold uppercase tracking-widest mb-4 opacity-50 flex items-center gap-4", jetbrains.className)}>
                    {paper.conf}
                    <div className="h-[1px] flex-1 bg-[#C6E385]/20 group-hover:bg-[#C6E385]/60 transition-colors" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-light leading-snug mb-6 group-hover:italic transition-all duration-500">
                    {paper.title}
                  </h3>
                  <div className="flex gap-8">
                    <div className={cn("w-16 shrink-0 text-xs uppercase opacity-40 pt-1", jetbrains.className)}>Abstract</div>
                    <p className="text-lg opacity-80 leading-relaxed font-light">
                      {paper.abstract}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. GLOBAL MINIMUM: MODELS & DEPLOYMENTS */}
        <section className="min-h-screen w-full bg-[#1A0C05] relative z-10 py-32 px-4 md:px-12 border-t border-[#C6E385]/20">
          <div className="max-w-7xl mx-auto">
            <h2 className={cn("text-xs uppercase tracking-[0.2em] mb-16 opacity-50 flex items-center gap-4", jetbrains.className)}>
              <Database size={16} /> 02 // Deployed Architectures
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Vision-Language Grounding", desc: "A multi-modal architecture aligning CLIP embeddings with a frozen LLM for zero-shot object detection.", params: "7.2B", metric: "84.2 mAP" },
                { name: "Time-Series Forecasting", desc: "Temporal convolutional network (TCN) optimized for high-frequency financial ticker prediction.", params: "120M", metric: "0.04 RMSE" },
                { name: "Retrieval-Augmented Gen", desc: "Vector-database backed RAG system utilizing a custom bi-encoder for dense passage retrieval.", params: "1.5B", metric: "92.1% Recall@5" },
                { name: "On-Device Distillation", desc: "Knowledge distillation of a large language model down to a 4-bit quantized mobile deployment.", params: "350M", metric: "24ms Latency" }
              ].map((project, i) => (
                <div key={i} className="p-8 border border-[#C6E385]/20 hover:border-[#C6E385] hover:bg-[#C6E385]/5 transition-colors relative overflow-hidden group">
                  {/* Hover visual effect (Neural weights) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 100% 0%, ${lime}20 0%, transparent 50%)`
                    }}
                  />
                  
                  <h3 className="text-2xl font-light mb-4">{project.name}</h3>
                  <p className="text-sm opacity-70 mb-12 h-16">{project.desc}</p>
                  
                  <div className={cn("flex justify-between items-end text-xs uppercase tracking-widest opacity-60 border-t border-[#C6E385]/20 pt-4", jetbrains.className)}>
                    <div>
                      <div className="mb-1 opacity-50">Parameters</div>
                      <div className="text-[#C6E385] text-sm">{project.params}</div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1 opacity-50">Peak Performance</div>
                      <div className="text-[#C6E385] text-sm">{project.metric}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. NETWORK ACTIVATION: FOOTER CTA */}
        <section className="min-h-screen w-full bg-[#1F0E06] relative z-10 flex flex-col justify-end items-center text-center p-8 border-t border-[#C6E385]/20 overflow-hidden">
          
          {/* Abstract Network Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_120s_linear_infinite]">
              {/* Nodes and edges */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 2" />
              <path d="M 50 10 L 50 90 M 10 50 L 90 50 M 21 21 L 79 79 M 21 79 L 79 21" stroke="currentColor" strokeWidth="0.1" />
              <circle cx="50" cy="10" r="1" fill="currentColor" />
              <circle cx="50" cy="90" r="1" fill="currentColor" />
              <circle cx="10" cy="50" r="1" fill="currentColor" />
              <circle cx="90" cy="50" r="1" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto pb-32">
            <BrainCircuit size={48} className="mb-8 opacity-50" />
            <h2 className="text-5xl md:text-7xl font-light italic mb-8">
              Initialize Connection.
            </h2>
            <p className="text-lg opacity-70 mb-12">
              Available for specialized consulting, research collaborations, and deep learning architecture reviews.
            </p>
            
            <button className={cn("px-8 py-4 border border-[#C6E385] hover:bg-[#C6E385] hover:text-[#1F0E06] transition-all flex items-center gap-4 text-xs font-bold uppercase tracking-widest", jetbrains.className)}>
              Run print(contact_info) <MoveRight size={16} />
            </button>
          </div>

          <footer className={cn("w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#C6E385]/20 text-[10px] uppercase tracking-widest opacity-40", jetbrains.className)}>
            <div>© {new Date().getFullYear()} Vane Research</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-100 transition-opacity">HuggingFace</a>
              <a href="#" className="hover:opacity-100 transition-opacity">ArXiv</a>
              <a href="#" className="hover:opacity-100 transition-opacity">GitHub</a>
            </div>
          </footer>
        </section>

      </div>
    </motion.div>
  );
}
