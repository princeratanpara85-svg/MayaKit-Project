"use client";

import React, { useEffect, useRef } from 'react';

export default function SparkTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999, on: false });

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf: number, t = 0, parts: any[] = [], dpr = 1;
    const colors = ['#FFFE15', '#163648', '#E2E8F0'];

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

    const spawn = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, s = Math.random() * 2 + 0.6;
        parts.push({
          x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 0.6,
          life: 1, d: Math.random() * 0.02 + 0.014, size: Math.random() * 3.5 + 1.5,
          c: colors[(Math.random() * colors.length) | 0], shape: Math.random() < 0.72 ? 'c' : 's',
          rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.25,
        });
      }
    };

    const step = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const gx = mouse.current.on ? mouse.current.x : w / 2 + Math.sin(t * 0.9) * w * 0.3;
      const gy = mouse.current.on ? mouse.current.y : h / 2 + Math.sin(t * 1.6 + 1.2) * h * 0.26;
      
      spawn(gx, gy, mouse.current.on ? 5 : 2);
      
      ctx.beginPath(); 
      ctx.arc(gx, gy, 7 + Math.sin(t * 5) * 1.5, 0, 6.283);
      ctx.strokeStyle = 'rgba(255, 254, 21, 0.85)'; // Primary token with opacity
      ctx.lineWidth = 1.5; 
      ctx.stroke();
      
      ctx.beginPath(); 
      ctx.arc(gx, gy, 1.8, 0, 6.283); 
      ctx.fillStyle = '#FFFE15'; 
      ctx.fill();
      
      parts = parts.filter(p => p.life > 0);
      if (parts.length > 380) parts.splice(0, parts.length - 380);
      
      for (const p of parts) {
        p.vy += 0.045; 
        p.x += p.vx; 
        p.y += p.vy; 
        p.rot += p.vr; 
        p.life -= p.d;
        
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.c;
        if (p.shape === 'c') { 
          ctx.beginPath(); 
          ctx.arc(p.x, p.y, p.size * p.life + 0.4, 0, 6.283); 
          ctx.fill(); 
        } else {
          ctx.save(); 
          ctx.translate(p.x, p.y); 
          ctx.rotate(p.rot);
          const s = p.size * 1.6 * p.life + 0.5;
          ctx.fillRect(-s / 2, -s / 2, s, s); 
          ctx.restore();
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
      className="h-full w-full cursor-crosshair bg-[#0C1E29]" 
    />
  );
}
