"use client";

import React, { useEffect, useRef } from 'react';

export default function BounceSticker() {
  const wrap = useRef<HTMLDivElement>(null);
  const el = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wrap.current || !el.current) return;

    let x = 30, y = 20, vx = 2.6, vy = 2.0, rot = -6, sq = 1, axis = 'x', hits = 0, raf: number;
    let isPrimary = true; // Alternating state

    const step = () => {
      if (!wrap.current || !el.current) return;
      
      const w = wrap.current.clientWidth - el.current.offsetWidth;
      const h = wrap.current.clientHeight - el.current.offsetHeight;
      
      x += vx; 
      y += vy;
      let hit = false;
      
      if (x <= 0) { x = 0; vx = Math.abs(vx); hit = true; axis = 'x'; }
      if (x >= w) { x = w; vx = -Math.abs(vx); hit = true; axis = 'x'; }
      if (y <= 0) { y = 0; vy = Math.abs(vy); hit = true; axis = 'y'; }
      if (y >= h) { y = h; vy = -Math.abs(vy); hit = true; axis = 'y'; }
      
      if (hit) {
        sq = 1.5; 
        isPrimary = !isPrimary;
        hits++;
        if (count.current) count.current.textContent = 'bounces ×' + hits;
        rot += Math.random() * 18 - 9;
        
        // Apply fixed color alternation instead of hue rotation
        if (isPrimary) {
          el.current.style.backgroundColor = '#FFFE15';
          el.current.style.color = '#0C1E29';
        } else {
          el.current.style.backgroundColor = '#163648';
          el.current.style.color = '#E2E8F0';
        }
      }
      
      sq += (1 - sq) * 0.1;
      const sx = axis === 'x' ? 2 - sq : sq;
      const sy = axis === 'x' ? sq : 2 - sq;
      
      el.current.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg) scale(${sx},${sy})`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrap} className="relative h-full w-full overflow-hidden bg-[#0C1E29]">
      <div ref={el} className="absolute left-0 top-0 will-change-transform rounded-lg border-2 border-[#E2E8F0]/10 transition-colors duration-100" style={{ backgroundColor: '#FFFE15', color: '#0C1E29' }}>
        <div className="flex items-center gap-1.5 px-3 py-2 font-display text-xs font-bold shadow-[4px_4px_0_#000]">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
            <polygon points="12,0 15,9 24,9 17,14 19,24 12,18 5,24 7,14 0,9 9,9" />
          </svg>
          LOOP!
        </div>
      </div>
      <span ref={count} className="absolute bottom-2 right-3 font-mono text-[10px] text-[#E2E8F0]/35">
        bounces ×0
      </span>
    </div>
  );
}
