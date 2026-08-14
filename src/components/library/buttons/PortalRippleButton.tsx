"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

/** PortalRippleButton — Portal ripple on click. */
export default function PortalRippleButton() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Click to send</p>
      <button
        onClick={(e) => {
          const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
          const id = Date.now();
          setRipples(p => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
          setTimeout(() => setRipples(p => p.filter(x => x.id !== id)), 900);
        }}
        className="relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-3 text-white font-semibold"
      >
        <AnimatePresence>
          {ripples.map(r => (
            <motion.span
              key={r.id}
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute h-10 w-10 rounded-full bg-white pointer-events-none"
              style={{ left: r.x - 20, top: r.y - 20 }}
            />
          ))}
        </AnimatePresence>
        <span className="relative inline-flex items-center gap-2"><Send size={14} /> Send</span>
      </button>
    </div>
  );
}
