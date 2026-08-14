"use client";

import React from 'react';
import { motion } from 'framer-motion';

const blob1 = "M40,-45 C53,-33 60,-15 60,0 C60,15 53,33 40,45 C27,57 13,60 0,60 C-13,60 -27,57 -40,45 C-53,33 -60,15 -60,0 C-60,-15 -53,-33 -40,-45 C-27,-57 -13,-60 0,-60 C13,-60 27,-57 40,-45 Z";
const blob2 = "M35,-40 C48,-28 55,-12 55,2 C55,16 48,32 35,44 C22,56 11,62 -1,62 C-13,62 -24,56 -37,44 C-50,32 -57,16 -57,2 C-57,-12 -50,-28 -37,-40 C-24,-52 -13,-58 -1,-58 C11,-58 22,-52 35,-40 Z";

export default function LiquidBlobImage() {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#0C1E29] rounded-none overflow-hidden">
      <svg viewBox="-70 -70 140 140" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="blobClip">
            <motion.path 
              d={blob1} 
              animate={{ d: [blob1, blob2, blob1] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
            />
          </clipPath>
        </defs>
        
        {/* Outer styling ring for brutalist aesthetic */}
        <motion.path 
          d={blob1} 
          animate={{ d: [blob1, blob2, blob1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
          fill="none"
          stroke="#163648"
          strokeWidth="2"
        />

        <image
          href="https://picsum.photos/800/800"
          x="-70" y="-70" width="140" height="140"
          clipPath="url(#blobClip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10">
        MORPHING
      </span>
    </div>
  );
}
