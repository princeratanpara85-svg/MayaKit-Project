"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** QuantumLatticePattern — Quantum-dot lattice with periodic pulse traveling across it. */
export default function QuantumLatticePattern({ className }: { className?: string }) {
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
    
    const step = 22, t0 = performance.now();
    let raf = 0;
    
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "#0C1E29"; // Base background
      ctx.fillRect(0, 0, w, h);
      
      const cols = Math.ceil(w / step), rows = Math.ceil(h / step);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * step + step / 2, y = j * step + step / 2;
          const wave = Math.sin((i + j) * 0.5 - t * 2) * 0.5 + 0.5;
          const r = 1 + wave * 3.5;
          
          // Use #FFFE15 (255, 254, 21) with varying opacity
          ctx.fillStyle = `rgba(255, 254, 21, ${0.1 + wave * 0.7})`;
          ctx.beginPath(); 
          ctx.arc(x, y, r, 0, Math.PI * 2); 
          ctx.fill();
          
          // crosshair on hot dots
          if (wave > 0.85) {
            ctx.strokeStyle = `rgba(255, 254, 21, ${wave * 0.8})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); 
            ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y);
            ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6); 
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden rounded-none", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none flex items-end justify-start p-5 text-xs font-mono tracking-[0.3em] text-[#FFFE15]/60 uppercase font-bold">
        Quantum Lattice
      </div>
    </div>
  );
}
