"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Glowing Cyber/Neon Arrow SVG
const NeonArrow = () => (
  <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#glow)">
      {/* Shaft */}
      <rect x="0" y="11" width="100" height="2" fill="#00FFFF" />
      {/* Arrowhead */}
      <path d="M96 4L118 12L96 20L102 12Z" fill="#00FFFF" />
    </g>
    <defs>
      <filter id="glow" x="-10" y="-10" width="140" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        <feComposite in="SourceGraphic" in2="effect1_foregroundBlur" operator="over"/>
      </filter>
    </defs>
  </svg>
);

export function NeonSliceCopyButton() {
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleCopy = () => {
    if (animating) return;
    setAnimating(true);
    
    navigator.clipboard.writeText(window.location.href).catch(() => {});

    setTimeout(() => {
      setCopied(true);
    }, 200);

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
          "relative group px-12 py-6 rounded-full border-2 transition-colors duration-300",
          copied ? "border-[#00FFFF] bg-[#00FFFF]/10" : "border-white/20 hover:border-white/50 bg-white/5"
        )}
      >
        <div className="relative flex items-center justify-center w-32 h-8">
          
          <AnimatePresence>
            {!copied && (
              <>
                <motion.span
                  key="copy-top"
                  exit={{ x: -20, y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center text-xl font-black tracking-widest text-white uppercase"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 70%)" }}
                >
                  COPY
                </motion.span>
                
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
                className="absolute inset-0 flex items-center justify-center text-xl font-black tracking-widest text-[#00FFFF] uppercase drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
              >
                COPIED
              </motion.span>
            )}
          </AnimatePresence>

        </div>
      </button>

      {animating && (
        <motion.div
          initial={{ x: "-400px", opacity: 0 }}
          animate={{ x: "400px", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="absolute z-10 pointer-events-none"
        >
          <NeonArrow />
        </motion.div>
      )}

    </div>
  );
}
