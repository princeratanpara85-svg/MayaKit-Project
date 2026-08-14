"use client";

import React, { useRef } from "react";
import gsap from "gsap";

export default function DimensionalButton() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    gsap.to(ref.current, {
      rotateX: -yPct * 30, // max 15 deg
      rotateY: xPct * 30,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-background p-8 overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-3/4 max-w-[200px] aspect-video rounded-xl border border-border/50 bg-muted/80 backdrop-blur-md flex items-center justify-center cursor-pointer group shadow-2xl"
      >
        <div 
          style={{ transform: "translateZ(50px)" }} 
          className="text-foreground font-bold tracking-widest px-6 py-2 border border-[#FFFE15]/20 rounded-md bg-background/50 group-hover:bg-[#FFFE15]/10 group-hover:border-[#FFFE15]/50 transition-colors"
        >
          INTERACT
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 bg-[#FFFE15]/0 group-hover:bg-[#FFFE15]/10 blur-xl transition-all duration-500 rounded-xl" style={{ transform: "translateZ(-20px)" }} />
      </div>
    </div>
  );
}
