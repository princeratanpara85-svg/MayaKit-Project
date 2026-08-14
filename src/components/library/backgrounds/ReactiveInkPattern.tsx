"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** ReactiveInkPattern — Ink in water, metaball-like blobs that react to mouse. */
export default function ReactiveInkPattern({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const c = cv.current!; 
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, mx = -9999, my = -9999;
    
    const blobs = Array.from({ length: 5 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0015,
      vy: (Math.random() - 0.5) * 0.0015,
      r: 0.15 + Math.random() * 0.1,
    }));
    
    const resize = () => {
      const r = wrap.current!.getBoundingClientRect(); 
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; 
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); 
    window.addEventListener("resize", resize);
    
    // Attach mouse tracking to window to avoid blocking local elements
    const onMove = (e: MouseEvent) => { 
      const r = wrap.current!.getBoundingClientRect(); 
      mx = e.clientX - r.left; 
      my = e.clientY - r.top; 
    };
    window.addEventListener("mousemove", onMove);
    
    let raf = 0;
    const draw = () => {
      // #0C1E29 background
      ctx.fillStyle = "#0C1E29"; 
      ctx.fillRect(0, 0, w, h);
      
      for (const b of blobs) {
        if (mx > 0 && mx < w && my > 0 && my < h) {
          const dx = mx - b.x * w, dy = my - b.y * h, d = Math.hypot(dx, dy) + 0.0001;
          if (d < 200) { b.vx -= (dx / d) * 0.0008; b.vy -= (dy / d) * 0.0008; }
        }
        b.vx *= 0.97; b.vy *= 0.97;
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0 || b.x > 1) b.vx *= -1;
        if (b.y < 0 || b.y > 1) b.vy *= -1;
      }
      
      // build SDF and threshold
      const img = ctx.getImageData(0, 0, c.width, c.height);
      const data = img.data;
      const R = Math.max(w, h) * 0.12;
      
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          let sum = 0;
          for (const b of blobs) {
            const dx = x - b.x * w, dy = y - b.y * h, d = Math.hypot(dx, dy);
            sum += R / d;
          }
          if (sum > 1) {
            const idx = (y * dpr * c.width + x * dpr) * 4;
            // #FFFE15 ink
            data[idx] = 255; 
            data[idx + 1] = 254; 
            data[idx + 2] = 21; 
            data[idx + 3] = 255;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    
    return () => { 
      window.removeEventListener("resize", resize); 
      window.removeEventListener("mousemove", onMove); 
      cancelAnimationFrame(raf); 
    };
  }, []);
  
  return (
    <div ref={wrap} className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-[#0C1E29] rounded-none", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none flex items-end justify-start p-5 text-xs font-mono tracking-[0.3em] text-[#0C1E29] uppercase font-bold mix-blend-difference">
        Reactive Ink
      </div>
    </div>
  );
}
