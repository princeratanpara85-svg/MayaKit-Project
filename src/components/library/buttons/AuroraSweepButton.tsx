"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/** AuroraSweepButton — Aurora gradient sweep. */
export default function AuroraSweepButton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Hover me</p>
      <button className="group relative overflow-hidden rounded-full bg-zinc-900 px-7 py-3 text-white font-semibold border border-white/10">
        <span className="relative z-10 inline-flex items-center gap-2"><Sparkles size={14} /> Aurora</span>
        <motion.div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
          style={{ background: "linear-gradient(90deg, #ec4899, #a855f7, #22d3ee, #ec4899)" }}
        />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          animate={{ background: ["linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </button>
    </div>
  );
}
