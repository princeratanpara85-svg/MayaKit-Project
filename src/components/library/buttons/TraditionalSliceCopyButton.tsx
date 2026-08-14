"use client";

import React, { useState } from "react";
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

export function TraditionalSliceCopyButton() {
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleCopy = () => {
    if (animating) return;
    setAnimating(true);
    
    navigator.clipboard.writeText(window.location.href).catch(() => {});

    // Trigger text split exactly when arrow passes center (approx 300ms)
    setTimeout(() => {
      setCopied(true);
    }, 250);

    // Reset state
    setTimeout(() => {
      setCopied(false);
      setAnimating(false);
    }, 2500);
  };

  return (
    <div className="relative w-full min-h-[400px] bg-[#0C1E29] rounded-xl overflow-hidden flex items-center justify-center font-sans border border-white/10">
      
      <button 
        onClick={handleCopy}
        disabled={animating}
        className={cn(
          "relative group px-12 py-6 rounded-full transition-all duration-500",
          "bg-white/5 backdrop-blur-md border border-white/10",
          "hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden",
          copied ? "border-[#FFFE15] bg-[#FFFE15]/10 shadow-[0_0_30px_rgba(255,254,21,0.2)]" : ""
        )}
      >
        {/* Premium subtle shine effect */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center justify-center w-32 h-8">
          
          <AnimatePresence>
            {!copied && (
              <>
                {/* Top Diagonal Half */}
                <motion.span
                  key="copy-top"
                  exit={{ x: -20, y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-xl font-black tracking-widest text-white uppercase"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 70%)" }}
                >
                  COPY
                </motion.span>
                
                {/* Bottom Diagonal Half */}
                <motion.span
                  key="copy-bottom"
                  exit={{ x: 20, y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-xl font-black tracking-widest text-white uppercase"
                  style={{ clipPath: "polygon(0 70%, 100% 30%, 100% 100%, 0 100%)" }}
                >
                  COPY
                </motion.span>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {copied && (
              <motion.span
                key="copied-text"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
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
