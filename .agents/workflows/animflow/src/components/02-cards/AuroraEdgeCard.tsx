import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** AuroraEdgeCard — Animated aurora border that follows the cursor. */
export default function AuroraEdgeCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ang = useMotionValue(0);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const a = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
    ang.set(a);
  };
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#06040d] overflow-hidden p-6", className)}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        className="relative w-full max-w-sm aspect-[5/3] rounded-2xl p-[1.5px]"
        style={{ background: useMotionValue<number>(ang).get() !== undefined ? `conic-gradient(from ${ang}deg at 50% 50%, #22d3ee, #a855f7, #ec4899, #22d3ee)` : undefined }}
      >
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-zinc-900 to-black p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400">
            <div className="flex items-center gap-1 text-xs font-mono">+12.4%</div>
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/50">Portfolio</p>
            <p className="text-3xl font-bold text-white">$284,901</p>
            <p className="text-xs text-emerald-400 mt-1">+$31,420 this month</p>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">12 assets</span>
            <span className="text-white inline-flex items-center gap-1">Manage <ArrowRight size={12} /></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
