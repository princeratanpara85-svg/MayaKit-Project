"use client";

import React, { useRef } from "react";

interface DepthPressWaveTextProps {
  text?: string;
}

export function DepthPressWaveText({ text = "Press into these letters" }: DepthPressWaveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    letterRefs.current.forEach((el) => {
      if (!el) return;
      const lx = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(lx - mx);
      const radius = 90;
      const depth = Math.max(0, 1 - dist / radius);
      // Change color on depth
      el.style.transform = `perspective(300px) translateZ(${-depth * 24}px) translateY(${depth * 6}px)`;
      el.style.opacity = `${1 - depth * 0.35}`;
      el.style.color = depth > 0.5 ? "#FFFE15" : "#FFFFFF";
    });
  };

  const handleLeave = () => {
    letterRefs.current.forEach((el) => {
      if (el) {
        el.style.transform = "perspective(300px) translateZ(0) translateY(0)";
        el.style.opacity = "1";
        el.style.color = "#FFFFFF";
      }
    });
  };

  return (
    <div className="flex items-center justify-center p-16 bg-[#0C1E29] rounded-xl font-sans w-full min-h-[300px]" style={{ perspective: 400 }}>
      <h2
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="text-5xl font-black tracking-tight text-white flex flex-wrap justify-center cursor-crosshair"
        style={{ transformStyle: "preserve-3d" }}
      >
        {text.split("").map((ch, i) => (
          <span
            key={i}
            ref={(el) => { letterRefs.current[i] = el; }}
            className="inline-block"
            style={{ transition: "transform 0.15s ease-out, opacity 0.15s ease-out, color 0.2s ease-out" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h2>
    </div>
  );
}
