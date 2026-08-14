"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Discover" },
  { label: "Explore" },
  { label: "Saved" },
  { label: "Profile" },
];

/** CosmicStarNavbar — Cosmic / starry navbar with brutalist styles. */
export default function CosmicStarNavbar({ className }: { className?: string }) {
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
    
    type S = { x: number; y: number; vx: number; vy: number; r: number };
    const stars: S[] = Array.from({ length: 60 }, () => ({
      x: Math.random(), 
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.4 + 0.4,
    }));
    
    let raf = 0;
    const draw = () => {
      // Clear with solid #0C1E29 but slight opacity for trail
      ctx.fillStyle = "rgba(12, 30, 41, 0.4)"; 
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0 || s.x > 1) s.vx *= -1;
        if (s.y < 0 || s.y > 1) s.vy *= -1;
        // Stars colored with #FFFE15 (yellow)
        ctx.fillStyle = `rgba(255, 254, 21, 0.9)`;
        ctx.beginPath(); 
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); 
        ctx.fill();
      });
      
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-[#0C1E29] p-4 flex flex-col", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative rounded-none border border-[#163648] bg-[#0C1E29]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between w-full shadow-lg"
      >
        <div className="text-[#E2E8F0] font-mono font-bold inline-flex items-center gap-2 tracking-widest uppercase">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
            <div className="w-3 h-3 bg-[#FFFE15]" />
          </motion.div>
          Cosmos
        </div>
        <div className="flex items-center gap-1 text-sm font-mono text-[#E2E8F0]/70 uppercase tracking-wider">
          {LINKS.map(l => (
            <button key={l.label} className="px-4 py-2 rounded-none hover:bg-[#163648] hover:text-[#E2E8F0] transition-colors">
              {l.label}
            </button>
          ))}
        </div>
        <button className="rounded-none bg-[#FFFE15] text-[#0C1E29] px-6 py-2 text-sm font-mono font-bold tracking-widest uppercase hover:bg-white transition-colors">
          Launch
        </button>
      </motion.nav>
      
      <div className="relative mt-auto pt-8 pb-4 text-center text-[#E2E8F0]/50 font-mono text-xs uppercase tracking-widest">
        A brutalist cosmic navbar.
      </div>
    </div>
  );
}
