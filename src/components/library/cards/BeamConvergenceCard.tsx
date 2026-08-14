"use client";

import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/** BeamConvergenceCard — Multiple light beams converge on the card title. */
export default function BeamConvergenceCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#08080c] overflow-hidden p-6", className)}>
      <div className="relative w-full max-w-sm rounded-2xl border border-amber-300/20 bg-gradient-to-br from-zinc-900 to-black p-6 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.line
              key={i}
              x1={i * 60 + 20} y1="0" x2="150" y2="100"
              stroke="url(#beam-grad)" strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          <defs>
            <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-amber-300 mb-2">
            <Zap size={16} /> <span className="text-[10px] uppercase tracking-widest">Featured drop</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Solar Flare Edition</h3>
          <p className="text-xs text-white/60 mb-4">Limited release — only 200 minted. Inspired by the 2026 solar maximum.</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/40 uppercase">Reserve price</p>
              <p className="text-lg font-bold text-white">2.4 Ξ</p>
            </div>
            <button className="rounded-lg bg-amber-300 text-black px-3 py-1.5 text-xs font-semibold">Mint now</button>
          </div>
          <div className="mt-4 flex items-center gap-1 text-amber-300">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
            <span className="ml-1 text-[10px] text-white/60">4.9 · 12k reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
