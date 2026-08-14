"use client";

import { motion } from "framer-motion";
import { Code2, GitBranch, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** KineticMorphCard — Card edges morph / breathe, content slides in. */
export default function KineticMorphCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#080814] overflow-hidden p-6", className)}>
      <motion.div
        initial={{ borderRadius: "32px" }}
        animate={{ borderRadius: ["32px", "48px 16px 48px 16px", "16px 48px 16px 48px", "32px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-sm p-6 bg-gradient-to-br from-slate-900 to-black border border-white/10 overflow-hidden"
      >
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-30 blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono mb-3">
            <Code2 size={14} /> /repos/animflow
          </div>
          <h3 className="text-2xl font-bold text-white leading-tight">Open-source animated React components, free forever.</h3>
          <div className="mt-4 flex items-center gap-4 text-white/70 text-xs">
            <span className="inline-flex items-center gap-1"><GitBranch size={12} /> 84 forks</span>
            <span className="inline-flex items-center gap-1 text-amber-300"><Star size={12} fill="currentColor" /> 8.3k</span>
          </div>
          <div className="mt-5 flex -space-x-2">
            {["#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"].map((c, i) => (
              <div key={i} className="h-7 w-7 rounded-full border-2 border-black" style={{ background: c }} />
            ))}
            <div className="h-7 px-2 rounded-full border-2 border-black bg-white/10 text-white/80 text-[10px] flex items-center">+42</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
