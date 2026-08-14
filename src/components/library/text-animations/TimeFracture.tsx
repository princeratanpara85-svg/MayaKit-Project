"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";

export default function TimeFracture({ text = "MAYAKIT" }: { text?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !flareRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    gsap.to(flareRef.current, {
      x: mouseX - 64,
      y: mouseY - 64,
      duration: 0.1,
      ease: "none"
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (flareRef.current) {
      gsap.to(flareRef.current, { opacity: 1, duration: 0.2 });
    }
    
    lettersRef.current.forEach((el, i) => {
      if (!el) return;
      const offset = (i - text.length / 2) * 15;
      const rotation = i % 2 === 0 ? 10 : -10;
      const yOffset = i % 2 === 0 ? -10 : 10;
      
      gsap.to(el, {
        x: offset,
        y: yOffset,
        rotation: rotation,
        opacity: 0.8,
        scale: 1.1,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)"
      });
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (flareRef.current) {
      gsap.to(flareRef.current, { opacity: 0, duration: 0.2 });
    }
    
    lettersRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)"
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-muted p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex space-x-1 sm:space-x-2 relative z-10">
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
               lettersRef.current[i] = el;
            }}
            className="text-3xl md:text-5xl font-bold font-heading text-primary inline-block"
          >
            {char}
          </span>
        ))}
      </div>
      
      <div 
        ref={flareRef}
        className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#FFFE15]/10 blur-3xl pointer-events-none opacity-0"
      />
    </div>
  );
}
