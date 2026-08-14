"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** TopoFlowPattern — Animated topographic contour lines flowing in a flow field. */
export default function TopoFlowPattern({ className }: { className?: string }) {
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
      ctx.fillStyle = "rgba(12,30,41,0.4)"; // #0C1E29 trail
      ctx.fillRect(0, 0, w, h);
      
      const levels = 18;
      ctx.lineWidth = 1;
      
      for (let l = 1; l < levels; l++) {
        const target = l / levels;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const n = (Math.sin(x * 0.012 + t + l * 0.3) + Math.cos(x * 0.018 - t * 0.6 + l * 0.2)) * 0.5;
          const y = h / 2 + n * (h * 0.4) + (target - 0.5) * h * 0.6;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        // Strict #FFFE15 lines
        ctx.strokeStyle = `rgba(255, 254, 21, ${0.15 + (l / levels) * 0.3})`;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-[#0C1E29] rounded-none", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none flex items-end justify-start p-5 text-xs font-mono tracking-[0.3em] text-[#FFFE15]/60 uppercase font-bold">
        Topo Flow
      </div>
    </div>
  );
}
