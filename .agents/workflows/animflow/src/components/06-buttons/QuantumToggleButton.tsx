import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Moon, Sun } from "lucide-react";

/** QuantumToggleButton — Quantum-style toggle. */
export default function QuantumToggleButton() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Toggle me</p>
      <button
        onClick={() => setOn(v => !v)}
        className={`relative flex items-center gap-3 rounded-full px-2 py-2 transition-colors ${on ? "bg-violet-500" : "bg-zinc-800"}`}
        style={{ width: 200 }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-lg"
          style={{ marginLeft: on ? 130 : 0 }}
        >
          {on ? <Moon size={16} className="text-violet-500" /> : <Sun size={16} className="text-amber-500" />}
        </motion.div>
        <span className={`absolute right-4 text-xs font-bold ${on ? "text-white" : "text-white/40"}`}>
          {on ? "DARK" : "LIGHT"}
        </span>
        <span className={`absolute left-12 text-xs font-bold ${on ? "text-white/40" : "text-white"}`}>
          {on ? "QUANTUM" : "STABLE"}
        </span>
      </button>
    </div>
  );
}
