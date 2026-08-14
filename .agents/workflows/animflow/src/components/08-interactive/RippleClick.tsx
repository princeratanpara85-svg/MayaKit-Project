import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mouse } from "lucide-react";
import { cn } from "@/lib/utils";

/** RippleClick — Ripple on click anywhere. */
type R = { id: number; x: number; y: number; c: string };
export default function RippleClick({ className }: { className?: string }) {
  const [r, setR] = useState<R[]>([]);
  const colors = ["#a855f7", "#ec4899", "#22d3ee", "#fbbf24", "#10b981"];
  return (
    <div
      onClick={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setR(p => [...p, { id: Date.now() + Math.random(), x: e.clientX - rect.left, y: e.clientY - rect.top, c: colors[Math.floor(Math.random() * colors.length)] }]);
        setTimeout(() => setR(p => p.slice(-20)), 1500);
      }}
      className={cn("relative w-full h-full overflow-hidden bg-[#08060f] cursor-crosshair", className)}
    >
      <AnimatePresence>
        {r.map(rip => (
          <motion.div
            key={rip.id}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute h-12 w-12 rounded-full border-2 pointer-events-none"
            style={{ left: rip.x - 24, top: rip.y - 24, borderColor: rip.c, boxShadow: `0 0 30px ${rip.c}` }}
          />
        ))}
      </AnimatePresence>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <Mouse className="text-white/30 mb-2" size={28} />
        <p className="text-white/40 text-sm">Click anywhere</p>
      </div>
    </div>
  );
}
