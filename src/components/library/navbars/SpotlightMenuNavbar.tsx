"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Patterns" },
  { label: "Cards" },
  { label: "Backgrounds" },
  { label: "Gallery" },
  { label: "Hero" },
];

export default function SpotlightMenuNavbar({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const [label, setLabel] = useState<string | null>(null);
  
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-[#0C1E29] p-4 cursor-crosshair font-mono flex flex-col", className)}
    >
      <motion.div
        className="pointer-events-none absolute h-64 w-64 rounded-full mix-blend-screen"
        style={{
          x: useTransform(sx, v => v - 128),
          y: useTransform(sy, v => v - 128),
          background: "radial-gradient(circle, rgba(255, 254, 21, 0.15), transparent 70%)",
        }}
      />
      
      <nav className="relative rounded-none border border-[#163648] bg-[#0C1E29]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-xl">
        <div className="text-[#FFFE15] font-bold uppercase tracking-widest">AnimFlow</div>
        <div className="flex items-center gap-2">
          {ITEMS.map(it => (
            <button
              key={it.label}
              onMouseEnter={() => setLabel(it.label)}
              onMouseLeave={() => setLabel(null)}
              className="relative px-4 py-2 text-xs font-bold text-[#E2E8F0]/50 hover:text-[#FFFE15] hover:bg-[#163648]/50 uppercase tracking-widest transition-colors rounded-none"
            >
              {it.label}
            </button>
          ))}
        </div>
        <button className="rounded-none bg-[#FFFE15] text-[#0C1E29] px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
          Start
        </button>
      </nav>
      
      <div className="relative mt-auto pt-8 pb-4 text-center text-[#E2E8F0]/40 text-xs uppercase tracking-widest">
        {label ? (
          <span className="text-[#FFFE15] bg-[#163648] px-3 py-1">Exploring <b>{label}</b></span>
        ) : (
          "Move your cursor to move the spotlight"
        )}
      </div>
    </div>
  );
}
