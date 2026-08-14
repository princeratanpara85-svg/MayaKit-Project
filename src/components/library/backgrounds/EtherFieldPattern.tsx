"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** EtherFieldPattern — Generative vector field with luminous threads. */
export default function EtherFieldPattern({ className }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const c = cv.current!; 
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    
    const resize = () => {
      const r = c.getBoundingClientRect(); 
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; 
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); 
    window.addEventListener("resize", resize);
    
    type P = { x: number; y: number; life: number; max: number };
    const particles: P[] = [];
    const spawn = () => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          life: 0, max: 80 + Math.random() * 60,
        });
      }
    };
    
    const t0 = performance.now();
    let raf = 0;
    
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "rgba(12,30,41,0.18)"; // #0C1E29 base
      ctx.fillRect(0, 0, w, h);
      
      if (particles.length < 400) spawn();
      
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.life++;
        const a = p.life / p.max;
        if (a >= 1) { 
          p.x = Math.random() * w; 
          p.y = Math.random() * h; 
          p.life = 0; 
          p.max = 80 + Math.random() * 60; 
          continue; 
        }
        
        const angle = Math.sin(p.x * 0.005 + t) + Math.cos(p.y * 0.005 - t * 0.7);
        p.x += Math.cos(angle * 2) * 1.6;
        p.y += Math.sin(angle * 2) * 1.6;
        
        // Use #FFFE15 exclusively
        ctx.strokeStyle = `rgba(255, 254, 21, ${(1 - a) * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(angle * 2) * 8, p.y - Math.sin(angle * 2) * 8);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-[#0C1E29] rounded-none", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="pointer-events-none absolute bottom-4 right-5 text-xs font-mono uppercase tracking-[0.3em] text-[#FFFE15]/60 font-bold">
        ether · field
      </div>
    </div>
  );
}
