"use client";

import React, { useRef, useEffect } from 'react';

export default function ParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const time = useRef(0);
  
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      if (!isHovered.current && ref.current) {
        time.current += 0.02;
        // Idle sway
        const x = Math.sin(time.current) * 0.05;
        const y = Math.cos(time.current * 0.8) * 0.05;
        ref.current.style.setProperty('--x', x.toString());
        ref.current.style.setProperty('--y', y.toString());
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty('--x', x.toString());
    ref.current.style.setProperty('--y', y.toString());
  };
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseMove={handleMove}
      onMouseLeave={() => { 
        isHovered.current = false;
        if (ref.current) {
          // It will lerp naturally back into the sine wave via the rAF
        }
      }}
      className="w-full h-full min-h-[400px] rounded-none overflow-hidden relative bg-[#0C1E29]"
      style={{ '--x': '0', '--y': '0' } as React.CSSProperties}
    >
      <img 
        src="https://picsum.photos/800/600?1" 
        alt="Parallax" 
        className="absolute inset-0 w-full h-full object-cover translate-x-[calc(var(--x)*-40px)] translate-y-[calc(var(--y)*-40px)] scale-110 transition-transform duration-100 ease-linear" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E29] to-transparent translate-x-[calc(var(--x)*-20px)] translate-y-[calc(var(--y)*-20px)] transition-transform duration-100 ease-linear pointer-events-none" />
      
      <span className="absolute top-4 left-4 text-[#E2E8F0] font-mono text-4xl font-bold translate-x-[calc(var(--x)*20px)] translate-y-[calc(var(--y)*20px)] transition-transform duration-100 ease-linear pointer-events-none opacity-50 mix-blend-overlay">
        DEPTH
      </span>

      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10 translate-x-[calc(var(--x)*-10px)] translate-y-[calc(var(--y)*-10px)]">
        MOVE CURSOR
      </span>
    </div>
  );
}
