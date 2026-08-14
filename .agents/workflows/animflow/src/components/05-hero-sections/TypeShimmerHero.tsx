import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/** TypeShimmerHero — Shimmer text reveal with rotating badges. */
const BADGES = ["Free Forever", "MIT License", "v1.0 Shipped", "8.3k Stars"];
export default function TypeShimmerHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#03020a] flex items-center justify-center p-6", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.15),transparent_50%)]" />
      <div className="relative text-center max-w-2xl">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 mb-4"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles size={12} className="text-yellow-400" /> Now with WebGL shaders
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
          <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-x_6s_ease_infinite]">Animations</span>
          <br />
          <span className="text-white">that make people stop scrolling.</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-white/60">90+ open-source React components. Drop them in, ship in minutes.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90">
            Get started <ArrowRight size={14} />
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur text-white px-4 py-2 text-sm">
            <Zap size={14} /> Live demo
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-white/40">
          {BADGES.map((b, i) => (
            <motion.span
              key={b}
              className="px-2 py-0.5 rounded-full border border-white/10"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
            >
              {b}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
