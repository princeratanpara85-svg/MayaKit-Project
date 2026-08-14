"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

/** ChromaticShiftButton — RGB-shift / chromatic on hover. */
export default function ChromaticShiftButton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Hover for shift</p>
      <button className="group relative px-8 py-3 bg-black rounded-full overflow-hidden border border-white/20">
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100"
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          aria-hidden
        >
          <Eye size={14} className="mr-2" /> Chromatic
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-cyan-500 opacity-0 group-hover:opacity-100"
          animate={{ x: [3, -3, 3] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          aria-hidden
        >
          <Eye size={14} className="mr-2" /> Chromatic
        </motion.span>
        <span className="relative text-white font-semibold inline-flex items-center gap-2 group-hover:opacity-0 transition-opacity">
          <Eye size={14} /> Chromatic
        </span>
      </button>
    </div>
  );
}
