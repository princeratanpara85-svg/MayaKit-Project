"use client";

import React, { useRef, useState, useEffect } from "react";

interface LiquidTrailUnderlineTextProps {
  text?: string;
}

export function LiquidTrailUnderlineText({ text = "Trace beneath these words" }: LiquidTrailUnderlineTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{ x: number; t: number }[]>([]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const now = Date.now();
    setPoints((prev) => [...prev.slice(-25), { x, t: now }]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPoints((prev) => prev.filter((p) => now - p.t < 600));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-16 bg-[#0C1E29] rounded-xl font-sans w-full min-h-[300px]">
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        className="relative inline-block cursor-crosshair"
      >
        <h2 className="text-5xl font-black tracking-tight text-white relative z-10">{text}</h2>
        <svg className="absolute -bottom-2 left-0 w-full h-4 overflow-visible pointer-events-none">
          {points.map((p, i) => {
            const age = (Date.now() - p.t) / 600;
            const opacity = Math.max(0, 1 - age);
            const radius = 5 * (1 - age * 0.5);
            return (
              <circle
                key={p.t + "-" + i}
                cx={p.x}
                cy={6}
                r={Math.max(radius, 0)}
                // MayaKit Yellow
                fill="#FFFE15"
                opacity={opacity * 0.8}
                style={{ filter: "drop-shadow(0 0 4px rgba(255, 254, 21, 0.5))" }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
