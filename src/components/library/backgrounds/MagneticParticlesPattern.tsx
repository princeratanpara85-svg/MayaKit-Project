"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** MagneticParticlesPattern — Particles bend toward the cursor like a magnetic field. */
export default function MagneticParticlesPattern({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const c = cv.current!, wDiv = wrap.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, mx = -9999, my = -9999;
    
    const N = 220;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0025,
      vy: (Math.random() - 0.5) * 0.0025,
    }));
    
    const resize = () => {
      const r = wDiv.getBoundingClientRect(); 
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; 
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); 
    window.addEventListener("resize", resize);
    
    // Attach mouse tracking to window to avoid blocking local elements
    const onMove = (e: MouseEvent) => { 
      const r = wDiv.getBoundingClientRect(); 
      mx = e.clientX - r.left; 
      my = e.clientY - r.top; 
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", (e) => {
      if (e.relatedTarget === null) onLeave();
    });
    
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(12,30,41,0.25)"; // #0C1E29 trail
      ctx.fillRect(0, 0, w, h);
      
      ctx.globalCompositeOperation = "lighter";
      
      for (const p of pts) {
        // magnetic pull
        if (mx > 0 && mx < w && my > 0 && my < h) {
          const dx = mx - p.x * w, dy = my - p.y * h;
          const d = Math.hypot(dx, dy) + 0.0001;
          const pull = 120 / (d * d) * 0.6;
          p.vx += (dx / d) * pull * 0.002;
          p.vy += (dy / d) * pull * 0.002;
        }
        
        p.vx *= 0.96; p.vy *= 0.96;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        
        ctx.fillStyle = `rgba(255, 254, 21, 0.8)`; // #FFFE15
        ctx.beginPath(); 
        ctx.arc(p.x * w, p.y * h, 1.4, 0, Math.PI * 2); 
        ctx.fill();
      }
      
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    
    return () => { 
      window.removeEventListener("resize", resize); 
      window.removeEventListener("mousemove", onMove); 
      cancelAnimationFrame(raf); 
    };
  }, []);
  
  return (
    <div ref={wrap} className={cn("relative w-full h-full min-h-[400px] bg-[#0C1E29] overflow-hidden rounded-none", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none flex items-end justify-start p-5 text-[10px] tracking-[0.3em] text-[#FFFE15]/60 uppercase font-bold">
        Magnetic Particles
      </div>
    </div>
  );
}
