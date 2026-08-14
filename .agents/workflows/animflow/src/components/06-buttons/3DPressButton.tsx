import { motion } from "framer-motion";
import { Play } from "lucide-react";

/** 3DPressButton — 3D press with depth + glow. */
export default function ThreeDPressButton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Press me</p>
      <motion.button
        whileTap={{ y: 4, scale: 0.97 }}
        className="relative rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 px-7 py-3 text-amber-950 font-bold"
        style={{
          boxShadow: "0 8px 0 #b45309, 0 12px 20px rgba(245,158,11,0.4)",
        }}
      >
        <span className="inline-flex items-center gap-2"><Play size={14} fill="currentColor" /> Press</span>
      </motion.button>
    </div>
  );
}
