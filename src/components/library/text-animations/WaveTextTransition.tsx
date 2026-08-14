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

export function WaveTextTransition() {
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

    // Swap text color just as the wave fully covers it
    timeoutSwap.current = setTimeout(() => {
      setActiveColor(color);
    }, 450); // ~45% into a 1s animation

    // Reset animation state when wave completely leaves the screen
    timeoutReset.current = setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
      setWaveColor(null);
    }, 1000);
  };

  return (
    <div className="relative min-h-[600px] w-full bg-[#0C1E29] flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10">
      
      {/* Controls (Above the wave) */}
      <div className="absolute top-16 left-0 right-0 flex justify-center gap-6 z-30">
        {THEME_COLORS.map((theme) => (
          <button
            key={theme.value}
            onClick={() => handleColorChange(theme.value)}
            disabled={isAnimating}
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
        className={cn("text-6xl md:text-9xl uppercase tracking-tighter text-center z-10 transition-colors duration-0", inter.className)}
        style={{ color: activeColor }}
      >
        MAYA KIT
      </h1>

      {/* The Animated Wave */}
      <AnimatePresence>
        {isAnimating && waveColor && (
          <motion.div
            key={waveColor}
            initial={{ top: "-120%" }}
            animate={{ top: "120%" }}
            exit={{ top: "120%" }}
            transition={{ duration: 1, ease: [0.5, 0, 0.2, 1] }}
            className="absolute left-0 h-[150%] w-full z-20 flex flex-col pointer-events-none"
          >
            {/* Solid body of the wave */}
            <div className="flex-grow w-full" style={{ backgroundColor: waveColor }} />
            
            {/* Curvy leading edge using an SVG path */}
            <svg 
              className="w-full h-32 md:h-64 block shrink-0 -mt-[1px]" 
              viewBox="0 0 1440 320" 
              preserveAspectRatio="none"
            >
              <path 
                fill={waveColor} 
                d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,133.3C672,139,768,213,864,229.3C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
