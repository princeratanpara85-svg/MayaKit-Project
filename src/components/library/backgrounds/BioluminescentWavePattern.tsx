"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** BioluminescentWavePattern — Wave interference (sine fields overlapping) with glowing dots. */
export default function BioluminescentWavePattern({ className }: { className?: string }) {
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
    
    const t0 = performance.now();
    let raf = 0;
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "rgba(12,30,41,0.35)"; // #0C1E29 trailing background
      ctx.fillRect(0, 0, w, h);
      
      const step = 14;
      ctx.globalCompositeOperation = "lighter";
      
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const v = (Math.sin(x * 0.04 + t * 1.5) + Math.cos(y * 0.04 + t * 1.1) + Math.sin((x + y) * 0.03 + t * 0.7)) / 3;
          const a = (v + 1) / 2;
          const r = 1 + a * 3.5;
          // Use our single accent #FFFE15
          ctx.fillStyle = `rgba(255, 254, 21, ${0.1 + a * 0.6})`;
          ctx.beginPath(); 
          ctx.arc(x, y, r, 0, Math.PI * 2); 
          ctx.fill();
        }
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
      <div className="pointer-events-none absolute bottom-4 left-5 text-xs font-mono uppercase tracking-[0.3em] text-[#E2E8F0]/40 font-bold">
        bioluminescent · waves
      </div>
    </div>
  );
}
