"use client";

import React from "react";

interface FractalPulseLoaderProps {
  label?: string;
}

const DEPTH = 5;

export function FractalPulseLoader({ label = "Processing" }: FractalPulseLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-16 bg-[#0C1E29] rounded-xl font-sans w-full min-h-[300px]">
      <style>{`
        @keyframes fractal-pulse {
          0% { transform: scale(0.3) rotate(0deg); opacity: 0.9; border-color: rgba(255, 254, 21, 0.9); }
          100% { transform: scale(1.8) rotate(45deg); opacity: 0; border-color: rgba(255, 254, 21, 0); }
        }
      `}</style>
      <div className="relative w-32 h-32 flex items-center justify-center">
        {Array.from({ length: DEPTH }).map((_, i) => (
          <div
            key={i}
            className="absolute w-10 h-10 border-2 rotate-45"
            style={{
              animation: "fractal-pulse 2.4s cubic-bezier(0.4,0,0.2,1) infinite",
              animationDelay: `${i * 0.45}s`,
            }}
          />
        ))}
        {/* MayaKit Yellow Core */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFFE15] shadow-[0_0_15px_rgba(255,254,21,0.8)]" />
      </div>
      <span className="text-white/60 text-sm font-bold tracking-widest uppercase">{label}</span>
    </div>
  );
}
