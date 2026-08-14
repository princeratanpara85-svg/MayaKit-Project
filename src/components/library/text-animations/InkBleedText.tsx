"use client";

import React, { useState } from "react";

interface InkBleedTextProps {
  text?: string;
}

export function InkBleedText({ text = "Bleed some color" }: InkBleedTextProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [radius, setRadius] = useState(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleEnter = () => setRadius(60);
  const handleLeave = () => setRadius(0);

  return (
    <div className="flex items-center justify-center p-16 bg-[#0C1E29] rounded-xl font-sans w-full min-h-[300px]">
      <div
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative inline-block cursor-crosshair"
      >
        <h2 
          className="text-5xl font-black tracking-tight text-transparent" 
          style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}
        >
          {text}
        </h2>
        <h2
          // MayaKit theme gradient
          className="text-5xl font-black tracking-tight absolute inset-0 bg-gradient-to-r from-[#FFFE15] via-white to-[#FFFE15]"
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitMaskImage: pos
              ? `radial-gradient(circle ${radius}px at ${pos.x}% ${pos.y}%, black 60%, transparent 100%)`
              : "radial-gradient(circle 0px at 50% 50%, black 60%, transparent 100%)",
            maskImage: pos
              ? `radial-gradient(circle ${radius}px at ${pos.x}% ${pos.y}%, black 60%, transparent 100%)`
              : "radial-gradient(circle 0px at 50% 50%, black 60%, transparent 100%)",
            transition: "mask-image 0.6s ease-out, -webkit-mask-image 0.6s ease-out",
          }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
}
