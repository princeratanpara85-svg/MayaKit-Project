"use client";

import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf: number, dpr = 1;
    const stars: any[] = [];
    
    for (let i = 0; i < 150; i++) {
      stars.push({ 
        x: Math.random() * 2 - 1, 
        y: Math.random() * 2 - 1, 
        z: Math.random() + 0.15, 
        pz: 1 
      });
    }
    
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
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, sc = w * 0.55;
      
      for (const s of stars) {
        s.z -= 0.0045;
        if (s.z <= 0.06) { 
          s.x = Math.random() * 2 - 1; 
          s.y = Math.random() * 2 - 1; 
          s.z = 1; 
          s.pz = 1; 
        }
        
        const sx = cx + (s.x / s.z) * sc, sy = cy + (s.y / s.z) * sc;
        const px = cx + (s.x / s.pz) * sc, py = cy + (s.y / s.pz) * sc;
        s.pz = s.z;
        
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) { 
          s.x = Math.random() * 2 - 1; 
          s.y = Math.random() * 2 - 1; 
          s.z = 1; 
          s.pz = 1; 
          continue; 
        }
        
        const a = 1 - s.z;
        // MayaKit Colors
        ctx.strokeStyle = a > 0.55 ? `rgba(255, 254, 21, ${0.25 + a * 0.75})` : `rgba(226, 232, 240, ${0.25 + a * 0.75})`;
        ctx.lineWidth = a * 1.8 + 0.2;
        ctx.beginPath(); 
        ctx.moveTo(px, py); 
        ctx.lineTo(sx, sy); 
        ctx.stroke();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    
    return () => { 
      cancelAnimationFrame(raf); 
      ro.disconnect(); 
    };
  }, []);

  return (
    <div className="h-full w-full bg-[#0C1E29]">
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
