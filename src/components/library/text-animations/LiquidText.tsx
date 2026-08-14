"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function LiquidText({ text = "MOTION" }: { text?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    setIsHovered(true);
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    }
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iterations) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);
  };

  const handleLeave = () => {
    setIsHovered(false);
    setDisplayText(text);
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-muted p-8 overflow-hidden"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div 
        ref={glowRef}
        className="absolute inset-0 bg-[#FFFE15]/5 opacity-0 blur-2xl pointer-events-none"
      />
      <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary relative z-10 tracking-widest mix-blend-difference">
        {displayText}
      </h2>
    </div>
  );
}
