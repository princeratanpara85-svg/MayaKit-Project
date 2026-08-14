"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], weight: ["900"] });

const THEME_COLORS = [
  { label: "White", value: "#FFFFFF" },
  { label: "Maya Yellow", value: "#FFFE15" }
];

export function PaperFoldTextTransition() {
  const [activeColor, setActiveColor] = useState(THEME_COLORS[0].value);
  const [waveColor, setWaveColor] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const timeoutSwap = useRef<any>(null);
  const timeoutReset = useRef<any>(null);

  const handleColorChange = (color: string) => {
    if (color === activeColor || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setWaveColor(color);

    if (timeoutSwap.current) clearTimeout(timeoutSwap.current);
    if (timeoutReset.current) clearTimeout(timeoutReset.current);

    // Swap text color at exactly the midpoint (when paper is fully folded over the screen)
    timeoutSwap.current = setTimeout(() => {
      setActiveColor(color);
    }, 500); // 50% of 1.0s

    // Reset animation state when paper completely unfolds
    timeoutReset.current = setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
      setWaveColor(null);
    }, 1000);
  };

  const transitionConfig = { 
    duration: 1.0, 
    ease: "easeInOut" as const,
    times: [0, 0.25, 0.45, 0.55, 0.75, 1] 
  };

  return (
    <div className="relative min-h-[600px] w-full bg-[#0C1E29] flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10" style={{ perspective: "1500px" }}>
      
      {/* Controls */}
      <div className="absolute top-16 left-0 right-0 flex justify-center gap-6 z-30">
        {THEME_COLORS.map((theme) => (
          <button
            key={theme.value}
            onClick={() => handleColorChange(theme.value)}
            className="px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 shadow-xl"
            style={{ 
              backgroundColor: theme.value, 
              color: theme.value === "#FFFFFF" ? "#0C1E29" : "#FFFFFF",
              opacity: activeColor === theme.value ? 0.4 : 1,
              cursor: activeColor === theme.value ? "default" : "pointer"
            }}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Main Text */}
      <h1 
        className={cn("text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter text-center z-10 transition-colors duration-0", inter.className)}
        style={{ color: activeColor }}
      >
        PAPER FOLD
      </h1>

      {/* The Animated Folding Doors (4 Panels) */}
      <AnimatePresence>
        {isAnimating && waveColor && (
          <div className="absolute inset-0 z-20 pointer-events-none" style={{ perspective: "2000px" }}>
            
            {/* LEFT SIDE */}
            <div className="absolute top-0 left-0 w-1/2 h-full" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                key={`left-panel-1-${waveColor}`}
                animate={{ rotateY: [90, 0, 0, 0, 0, 90] }}
                transition={transitionConfig}
                className="absolute top-0 left-0 w-1/2 h-full origin-left flex justify-end"
                style={{ backgroundColor: waveColor, transformStyle: "preserve-3d" }}
              >
                {/* Crease shadow for depth */}
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-black/15" />
                
                {/* Panel 2 (Nested in Panel 1) */}
                <motion.div
                  key={`left-panel-2-${waveColor}`}
                  animate={{ rotateY: [-180, -180, 0, 0, -180, -180] }}
                  transition={transitionConfig}
                  className="absolute top-0 left-full w-full h-full origin-left"
                  style={{ backgroundColor: waveColor }}
                />
              </motion.div>
            </div>

            {/* RIGHT SIDE */}
            <div className="absolute top-0 right-0 w-1/2 h-full" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                key={`right-panel-4-${waveColor}`}
                animate={{ rotateY: [-90, 0, 0, 0, 0, -90] }}
                transition={transitionConfig}
                className="absolute top-0 right-0 w-1/2 h-full origin-right flex justify-start"
                style={{ backgroundColor: waveColor, transformStyle: "preserve-3d" }}
              >
                {/* Crease shadow for depth */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-black/15" />
                
                {/* Panel 3 (Nested in Panel 4) */}
                <motion.div
                  key={`right-panel-3-${waveColor}`}
                  animate={{ rotateY: [180, 180, 0, 0, 180, 180] }}
                  transition={transitionConfig}
                  className="absolute top-0 right-full w-full h-full origin-right"
                  style={{ backgroundColor: waveColor }}
                />
              </motion.div>
            </div>
            
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
