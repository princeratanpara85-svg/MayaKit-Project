"use client";

import React, { useEffect, useRef } from 'react';

export default function DotWave() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999, on: false });

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf: number, t = 0, dpr = 1;
    // Distinct visually from ImpossibleGrid: 
    // Palettes: Background, Primary, Secondary/Muted
    const pal = ['#0C1E29', '#163648', '#FFFE15', '#E2E8F0'];
    
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = cv.offsetWidth; 
      h = cv.offsetHeight;
      cv.width = w * dpr; 
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    
    resize();
    const ro = new ResizeObserver(resize); 
    ro.observe(cv);

    const step = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      
      const mx = mouse.current.on ? mouse.current.x : w / 2 + Math.cos(t * 0.5) * w * 0.28;
      const my = mouse.current.on ? mouse.current.y : h / 2 + Math.sin(t * 0.8) * h * 0.28;
      
      // Smaller gap for a denser, more distinct fluid wave compared to ImpossibleGrid
      const gap = 16;
      
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const d = Math.hypot(x - mx, y - my);
          const wave = Math.sin(d * 0.055 - t * 2.4);
          const push = Math.max(0, 1 - d / 110);
          
          const ox = ((x - mx) / (d || 1)) * push * 12;
          const oy = ((y - my) / (d || 1)) * push * 12;
          
          ctx.fillStyle = wave > 0.82 ? pal[2] : wave > 0.35 ? pal[3] : push > 0.2 ? pal[2] : pal[1];
          ctx.globalAlpha = 0.5 + (wave + 1) * 0.25;
          
          ctx.beginPath(); 
          // Circles instead of crosses, reacting strongly to the wave phase
          ctx.arc(x + ox, y + oy, 1.8 + (wave + 1) * 2, 0, 6.283); 
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    
    return () => { 
      cancelAnimationFrame(raf); 
      ro.disconnect(); 
    };
  }, []);

  const move = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, on: true };
  };

  return (
    <canvas 
      ref={ref} 
      onMouseMove={move} 
      onMouseLeave={() => (mouse.current.on = false)} 
      className="h-full w-full bg-[#0C1E29]" 
    />
  );
}
