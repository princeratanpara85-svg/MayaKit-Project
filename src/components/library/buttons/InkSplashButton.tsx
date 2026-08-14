"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet } from "lucide-react";

/** InkSplashButton — Ink splash on click. */
export default function InkSplashButton() {
  const [splashes, setSplashes] = useState<{ id: number; x: number; y: number; c: string }[]>([]);
  const colors = ["#a855f7", "#ec4899", "#22d3ee", "#fbbf24", "#10b981"];
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Click to splash</p>
      <button
        onClick={(e) => {
          const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
          const x = e.clientX - r.left, y = e.clientY - r.top;
          const id = Date.now();
          setSplashes(p => [...p, { id, x, y, c: colors[Math.floor(Math.random() * colors.length)] }]);
          setTimeout(() => setSplashes(p => p.filter(s => s.id !== id)), 1200);
        }}
        className="relative overflow-hidden rounded-full bg-white text-black px-7 py-3 font-semibold"
      >
        <AnimatePresence>
          {splashes.map(s => (
            <motion.div
              key={s.id}
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute h-10 w-10 rounded-full pointer-events-none mix-blend-multiply"
              style={{ left: s.x - 20, top: s.y - 20, background: s.c, filter: "blur(8px)" }}
            />
          ))}
        </AnimatePresence>
        <span className="relative inline-flex items-center gap-2"><Droplet size={14} /> Splash</span>
      </button>
    </div>
  );
}
