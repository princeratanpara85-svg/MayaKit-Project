"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Traditional wooden arrow SVG
const TraditionalArrow = () => (
  <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
    {/* Shaft */}
    <rect x="20" y="10" width="80" height="4" fill="#8B4513" />
    <rect x="20" y="10" width="80" height="2" fill="#A0522D" />
    
    {/* Fletching (Feathers) */}
    <path d="M5 4L25 10V14L5 20L15 12L5 4Z" fill="#F5F5DC" />
    <path d="M5 4L25 10V11L15 8L5 4Z" fill="#E6E6FA" />
    
    {/* Arrowhead */}
    <path d="M100 6L118 12L100 18V6Z" fill="#708090" />
    <path d="M100 6L118 12L100 12V6Z" fill="#C0C0C0" />
  </svg>
);

export function TraditionalGravityCopyButton() {
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleCopy = () => {
    if (animating) return;
    setAnimating(true);
    
    // Copy to clipboard
    navigator.clipboard.writeText(window.location.href).catch(() => {});

    // Trigger text split exactly when arrow passes center (approx 300ms)
    setTimeout(() => {
      setCopied(true);
    }, 250);

    // Reset state after animation completes
    setTimeout(() => {
      setCopied(false);
      setAnimating(false);
    }, 2500);
  };

  return (
    <div className="relative w-full min-h-[400px] bg-[#0C1E29] rounded-xl overflow-hidden flex items-center justify-center font-sans border border-white/10">
      
      {/* The Button */}
      <button 
        onClick={handleCopy}
        disabled={animating}
        className={cn(
          "relative group px-12 py-6 rounded-full border-2 transition-colors duration-300",
          copied ? "border-[#FFFE15] bg-[#FFFE15]/10" : "border-white/20 hover:border-white/50 bg-white/5"
        )}
      >
        <div className="relative flex items-center justify-center w-32 h-8">
          
          {/* Default State: COPY (Split into Top and Bottom halves) */}
          <AnimatePresence>
            {!copied && (
              <>
                {/* Top Half */}
                <motion.span
                  key="copy-top"
                  exit={{ y: -40, opacity: 0, rotateZ: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-xl font-black tracking-widest text-white uppercase"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
                >
                  COPY
                </motion.span>
                
                {/* Bottom Half */}
                <motion.span
                  key="copy-bottom"
                  exit={{ y: 40, opacity: 0, rotateZ: 15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-xl font-black tracking-widest text-white uppercase"
                  style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
                >
                  COPY
                </motion.span>
              </>
            )}
          </AnimatePresence>

          {/* Copied State */}
          <AnimatePresence>
            {copied && (
              <motion.span
                key="copied-text"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "backOut" }}
                className="absolute inset-0 flex items-center justify-center text-xl font-black tracking-widest text-[#FFFE15] uppercase"
              >
                COPIED
              </motion.span>
            )}
          </AnimatePresence>

        </div>
      </button>

      {/* The Flying Arrow */}
      {animating && (
        <motion.div
          initial={{ x: "-300px", opacity: 0 }}
          animate={{ x: "300px", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.6, ease: "linear" }}
          className="absolute z-10 pointer-events-none"
        >
          <TraditionalArrow />
        </motion.div>
      )}

    </div>
  );
}
