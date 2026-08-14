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

export function TriangleShutterTransition() {
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

    // Swap text color at exactly the midpoint (when triangles meet in center)
    timeoutSwap.current = setTimeout(() => {
      setActiveColor(color);
    }, 600); 

    // Reset animation state when triangles completely leave the screen
    timeoutReset.current = setTimeout(() => {
      setIsAnimating(false);
      isAnimatingRef.current = false;
      setWaveColor(null);
    }, 1200);
  };

  const transitionConfig = { duration: 1.2, ease: [0.65, 0, 0.35, 1] };

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
        className={cn("text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter text-center z-10 transition-colors duration-0", inter.className)}
        style={{ color: activeColor }}
      >
        SHUTTER
      </h1>

      {/* The Animated Triangles */}
      <AnimatePresence>
        {isAnimating && waveColor && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Top Triangle */}
            <motion.div
              key={`top-${waveColor}`}
              initial={{ y: "-100%" }}
              animate={{ y: "200%" }}
              transition={transitionConfig}
              className="absolute top-0 left-0 w-full h-[50%]"
              style={{ 
                backgroundColor: waveColor,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)"
              }}
            />
            {/* Bottom Triangle */}
            <motion.div
              key={`bottom-${waveColor}`}
              initial={{ y: "100%" }}
              animate={{ y: "-200%" }}
              transition={transitionConfig}
              className="absolute bottom-0 left-0 w-full h-[50%]"
              style={{ 
                backgroundColor: waveColor,
                clipPath: "polygon(0 100%, 100% 100%, 50% 0)"
              }}
            />
            {/* Left Triangle */}
            <motion.div
              key={`left-${waveColor}`}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={transitionConfig}
              className="absolute top-0 left-0 w-[50%] h-full"
              style={{ 
                backgroundColor: waveColor,
                clipPath: "polygon(0 0, 0 100%, 100% 50%)"
              }}
            />
            {/* Right Triangle */}
            <motion.div
              key={`right-${waveColor}`}
              initial={{ x: "100%" }}
              animate={{ x: "-200%" }}
              transition={transitionConfig}
              className="absolute top-0 right-0 w-[50%] h-full"
              style={{ 
                backgroundColor: waveColor,
                clipPath: "polygon(100% 0, 100% 100%, 0 50%)"
              }}
            />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
