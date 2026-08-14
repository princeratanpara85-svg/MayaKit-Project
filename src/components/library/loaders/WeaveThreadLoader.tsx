"use client";

import React from "react";

interface WeaveThreadLoaderProps {
  label?: string;
}

export function WeaveThreadLoader({ label = "Weaving" }: WeaveThreadLoaderProps) {
  const THREADS = 6;

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-16 bg-[#0C1E29] rounded-xl font-sans w-full min-h-[300px]">
      <style>{`
        @keyframes weave-draw {
          0% { stroke-dashoffset: 240; }
          45%, 55% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -240; }
        }
      `}</style>
      <svg viewBox="0 0 120 120" className="w-32 h-32">
        {Array.from({ length: THREADS }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={10 + i * 20}
            x2="120"
            y2={10 + i * 20}
            // MayaKit Yellow
            stroke="#FFFE15"
            strokeWidth="2"
            strokeDasharray="120 120"
            style={{
              animation: "weave-draw 3s ease-in-out infinite",
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
        {Array.from({ length: THREADS }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={10 + i * 20}
            y1="0"
            x2={10 + i * 20}
            y2="120"
            // MayaKit Accent/White for contrast
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="120 120"
            style={{
              animation: "weave-draw 3s ease-in-out infinite reverse",
              animationDelay: `${i * 0.12}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </svg>
      <span className="text-white/60 text-sm font-bold tracking-widest uppercase">{label}</span>
    </div>
  );
}
