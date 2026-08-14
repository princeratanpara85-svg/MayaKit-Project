import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** MagneticTiltCard — 3D tilt with cursor-tracked shine. */
export default function MagneticTiltCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 180, damping: 14 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 180, damping: 14 });
  const sx = useTransform(mx, [0, 1], ["0%", "100%"]);
  const sy = useTransform(my, [0, 1], ["0%", "100%"]);
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#0a0a12] overflow-hidden p-6", className)}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400" />
        <motion.div className="absolute inset-0 opacity-60 mix-blend-screen" style={{ background: useTransform<string, string>([sx, sy] as any, (v) => `radial-gradient(circle at ${v.split(",")[0]} ${v.split(",")[1]}, rgba(255,255,255,0.6), transparent 50%)`) }} />
        <div className="absolute inset-0 p-6 flex flex-col justify-end" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-white/30 backdrop-blur" />
            <div>
              <p className="text-xs font-semibold text-white">Nova Chen</p>
              <p className="text-[10px] text-white/70">@nova · 2h</p>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white leading-tight">Loved the sunrise over Halong Bay — almost missed my flight for it.</h3>
          <div className="mt-4 flex items-center gap-4 text-white/90 text-xs">
            <span className="inline-flex items-center gap-1"><Heart size={14} /> 1.2k</span>
            <span className="inline-flex items-center gap-1"><MessageCircle size={14} /> 84</span>
            <span className="inline-flex items-center gap-1"><Share2 size={14} /> 32</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
