import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** ParallaxDepthHero — Mouse parallax depth, multi-layer. */
export default function ParallaxDepthHero({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width - 0.5) * 30); my.set(((e.clientY - r.top) / r.height - 0.5) * 30); }}
      className={cn("relative w-full h-full overflow-hidden bg-[#04060e] flex items-center justify-center", className)}
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_70%)]" />
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 60 + i * 18, height: 60 + i * 18,
            left: `${10 + i * 10}%`, top: `${20 + (i % 3) * 20}%`,
            background: ["linear-gradient(45deg,#a855f7,#ec4899)", "linear-gradient(45deg,#22d3ee,#3b82f6)", "linear-gradient(45deg,#fbbf24,#f97316)"][i % 3],
            filter: "blur(40px)", opacity: 0.4,
            x: useTransform(sx, v => v * (i + 1) * 0.4),
            y: useTransform(sy, v => v * (i + 1) * 0.4),
          }}
        />
      ))}
      <motion.div className="relative text-center" style={{ x: useTransform(sx, v => v * 0.4), y: useTransform(sy, v => v * 0.4) }}>
        <Sparkles className="mx-auto mb-3 text-cyan-300" size={20} />
        <h1 className="text-5xl md:text-6xl font-bold text-white">Move your <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">cursor</span>.</h1>
        <p className="mt-3 text-sm text-white/60">Watch the layers respond in 3D space.</p>
      </motion.div>
    </div>
  );
}
