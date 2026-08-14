import { motion } from "framer-motion";
import { Zap } from "lucide-react";

/** GlitchNeonButton — Glitch neon. */
export default function GlitchNeonButton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Hover for glitch</p>
      <motion.button
        whileHover="hover"
        className="relative px-7 py-3 bg-black border-2 border-cyan-300 text-cyan-300 font-bold tracking-widest uppercase text-sm"
        style={{ boxShadow: "0 0 20px rgba(103,232,249,0.5), inset 0 0 20px rgba(103,232,249,0.2)" }}
      >
        <motion.span variants={{ hover: { x: [0, -3, 3, -1, 0] } }} transition={{ duration: 0.3 }} className="inline-flex items-center gap-2">
          <Zap size={14} /> Engage
        </motion.span>
        <motion.span
          variants={{ hover: { opacity: 1, x: [0, -2, 2, 0] } }}
          initial={{ opacity: 0 }}
          className="absolute inset-0 text-cyan-300 pointer-events-none"
          aria-hidden
        >
          <span className="flex items-center justify-center h-full gap-2"><Zap size={14} /> Engage</span>
        </motion.span>
      </motion.button>
    </div>
  );
}
