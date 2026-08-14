"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function ScrollRevealImage() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
      // Reset if you want it to trigger every time: else setInView(false);
    }, { threshold: 0.3 });
    
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  
  return (
    <div ref={ref} className="w-full h-full min-h-[400px] rounded-none overflow-hidden relative bg-[#163648]">
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#FFFE15] to-[#FFFE15]/50 transition-all duration-1000 ease-out"
        style={{
          clipPath: inView ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 0, 0% 0, 0% 100%, 0% 100%)',
        }}
      >
        <img 
          src="https://picsum.photos/800/600?2" 
          alt="Reveal" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" 
        />
      </div>
      
      {!inView && (
        <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#0C1E29] px-3 py-1 border border-[#163648] pointer-events-none uppercase tracking-widest z-10 animate-pulse">
          SCROLL TO REVEAL
        </span>
      )}
    </div>
  );
}
