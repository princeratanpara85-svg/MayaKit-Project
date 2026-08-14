"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** NeonRippleCard — Neon ripple on click, glow trail. */
type Ripple = { id: number; x: number; y: number };
export default function NeonRippleCard({ className }: { className?: string }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#08020f] overflow-hidden p-6", className)}>
      <div
        onClick={(e) => {
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const id = Date.now();
          setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
          setTimeout(() => setRipples((p) => p.filter((x) => x.id !== id)), 1200);
        }}
        className="relative w-full max-w-sm aspect-[5/3] rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-900/40 to-purple-900/40 p-6 cursor-pointer overflow-hidden"
      >
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.div
              key={r.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute h-20 w-20 rounded-full border-2 border-fuchsia-300 pointer-events-none"
              style={{ left: r.x - 40, top: r.y - 40, boxShadow: "0 0 30px 6px rgba(232,121,249,0.4)" }}
            />
          ))}
        </AnimatePresence>
        <div className="relative">
          <div className="flex items-center gap-2 text-fuchsia-300 mb-3">
            <Sparkles size={16} /> <span className="text-xs uppercase tracking-widest">Click me</span>
          </div>
          <h3 className="text-3xl font-bold text-white leading-tight">Tap anywhere for ripples.</h3>
          <p className="text-xs text-fuchsia-200/60 mt-2">Each click spawns a glowing neon shockwave that radiates outward.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-fuchsia-200 text-[10px] font-mono">
            <MousePointer2 size={10} /> clicks: {ripples.length}
          </div>
        </div>
      </div>
    </div>
  );
}
