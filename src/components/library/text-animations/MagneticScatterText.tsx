"use client";

import React, { useRef } from "react";

interface MagneticScatterTextProps {
  text?: string;
}

export function MagneticScatterText({ text = "Hover across me" }: MagneticScatterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const mx = e.clientX;
    const my = e.clientY;
    letterRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const lx = rect.left + rect.width / 2;
      const ly = rect.top + rect.height / 2;
      const dx = lx - mx;
      const dy = ly - my;
      const dist = Math.hypot(dx, dy);
      const radius = 70;
      if (dist < radius) {
        const force = (1 - dist / radius) * 26;
        const angle = Math.atan2(dy, dx);
        el.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px) rotate(${Math.cos(angle) * force}deg)`;
        el.style.color = "#FFFE15"; // MayaKit Yellow
        el.style.textShadow = "0 0 10px rgba(255, 254, 21, 0.5)";
      } else {
        el.style.transform = "translate(0,0) rotate(0deg)";
        el.style.color = "#FFFFFF";
        el.style.textShadow = "none";
      }
    });
  };

  const handleLeave = () => {
    letterRefs.current.forEach((el) => {
      if (el) {
        el.style.transform = "translate(0,0) rotate(0deg)";
        el.style.color = "#FFFFFF";
        el.style.textShadow = "none";
      }
    });
  };

  return (
    <div className="flex items-center justify-center p-16 bg-[#0C1E29] rounded-xl font-sans w-full min-h-[300px]">
      <h2
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="text-5xl font-black tracking-tight text-white flex flex-wrap justify-center cursor-crosshair"
      >
        {text.split("").map((ch, i) => (
          <span
            key={i}
            ref={(el) => { letterRefs.current[i] = el; }}
            className="inline-block"
            style={{ transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), color 0.3s ease, text-shadow 0.3s ease" }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h2>
    </div>
  );
}
