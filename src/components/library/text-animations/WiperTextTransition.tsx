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

export function WiperTextTransition() {
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

    // Swap text color just as the wiper fully covers it (at exactly 50%)
    timeoutSwap.current = setTimeout(() => {
      setActiveColor(color);
    }, 600); // Half of 1.2s

    // Reset animation state when wiper completely leaves the screen
    timeoutReset.current = setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
      setWaveColor(null);
    }, 1200);
  };

  return (
    <div className="relative min-h-[600px] w-full bg-[#0C1E29] flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10">
      
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
        className={cn("text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter text-center z-10 transition-colors duration-0", inter.className)}
        style={{ color: activeColor }}
      >
        WIPER
      </h1>

      {/* The Animated Wiper */}
      <AnimatePresence>
        {isAnimating && waveColor && (
          <motion.div
            key={waveColor}
            initial={{ rotate: -135 }}
            animate={{ rotate: 135 }}
            exit={{ rotate: 135 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="absolute z-20 pointer-events-none"
            style={{ 
              backgroundColor: waveColor,
              width: "400%",
              height: "400%",
              left: "-150%",
              bottom: "-100%",
              transformOrigin: "50% 100%"
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
