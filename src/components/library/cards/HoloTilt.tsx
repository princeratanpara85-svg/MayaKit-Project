"use client";

import React, { useRef, useState } from 'react';

export default function HoloTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState({ rx: 0, ry: 0, px: 50, py: 50 });

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setS({ rx: -((py - 50) / 50) * 14, ry: ((px - 50) / 50) * 16, px, py });
  };

  return (
    <div 
      className="grid h-full w-full place-items-center p-6 bg-[#0C1E29]" 
      onMouseMove={move}
      onMouseLeave={() => setS(v => ({ ...v, rx: 0, ry: 0 }))}
    >
      <div 
        ref={ref} 
        className="relative w-full max-w-[250px] transition-transform duration-200 ease-out"
        style={{ transform: `perspective(760px) rotateX(${s.rx}deg) rotateY(${s.ry}deg)`, transformStyle: 'preserve-3d' }}
      >
        <div className="relative overflow-hidden rounded-xl border border-[#163648] bg-[#0C1E29] p-4 shadow-2xl">
          
          {/* Subtle sheen (replaced holographic rainbow) */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-all duration-100"
            style={{
              background: `radial-gradient(circle at ${s.px}% ${s.py}%, rgba(255,254,21,0.15), transparent 60%)`,
            }} 
          />
          
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(circle at ${s.px}% ${s.py}%, rgba(226,232,240,0.05), transparent 46%)` }} />
            
          <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#E2E8F0]/50">MOTION PASS</span>
              <span className="h-6 w-8 rounded bg-[#163648] p-[3px]">
                <span className="block h-full w-full rounded-[2px] border border-[#0C1E29]" />
              </span>
            </div>
            <div className="mt-3 font-display text-5xl font-extrabold text-[#E2E8F0]" style={{ transform: 'translateZ(46px)' }}>
              ∞
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#E2E8F0]/50">
              <span>ID: L00P-M4RT</span>
              <span className="flex gap-1">
                <i className="h-1.5 w-1.5 rounded-full bg-[#163648]" />
                <i className="h-1.5 w-1.5 rounded-full bg-[#E2E8F0]" />
                <i className="h-1.5 w-1.5 rounded-full bg-[#FFFE15]" />
              </span>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute -right-3 -top-3 rounded-md bg-[#FFFE15] px-2 py-1 font-display text-[10px] font-bold text-[#0C1E29] shadow-lg"
          style={{ transform: 'rotate(12deg) translateZ(50px)' }}
        >
          FREE
        </div>
      </div>
    </div>
  );
}
