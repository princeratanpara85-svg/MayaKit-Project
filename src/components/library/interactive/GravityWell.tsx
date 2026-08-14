"use client";

import React, { useRef } from "react";
import gsap from "gsap";

export default function GravityWell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    gsap.to(elementRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const handleMouseLeave = () => {
    if (!elementRef.current) return;
    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center p-8 bg-background overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={elementRef}
        className="relative z-10 w-24 h-24 rounded-full border border-border bg-muted flex items-center justify-center cursor-pointer group"
      >
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-xl bg-[#FFFE15] transition-opacity duration-500" />
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-primary" />
        </div>
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center text-xs font-mono text-foreground/50">
        // PULLS ELEMENT TOWARD CURSOR
      </div>
    </div>
  );
}
