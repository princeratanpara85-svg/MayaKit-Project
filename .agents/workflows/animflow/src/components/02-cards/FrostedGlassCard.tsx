import { motion } from "framer-motion";
import { Music, Headphones, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/** FrostedGlassCard — Glassmorphism with progressive blur and noise. */
export default function FrostedGlassCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden p-6 flex items-center justify-center bg-gradient-to-br from-fuchsia-600 via-pink-500 to-orange-400", className)}>
      {/* gradient blobs in bg */}
      <motion.div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-cyan-300 blur-3xl" animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-yellow-300 blur-3xl" animate={{ x: [0, -20, 0], y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      <div className="relative w-full max-w-sm rounded-3xl border border-white/30 bg-white/10 backdrop-blur-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"><Music className="text-white" size={20} /></div>
          <div>
            <p className="text-white font-semibold text-sm">Cosmic Drift</p>
            <p className="text-white/70 text-xs">Aurora Sound</p>
          </div>
          <button className="ml-auto h-10 w-10 rounded-full bg-white text-fuchsia-600 flex items-center justify-center"><Play size={16} fill="currentColor" /></button>
        </div>
        <div className="flex items-end gap-1 h-16 mb-2">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div key={i} className="flex-1 bg-white/80 rounded-full" animate={{ height: ["20%", `${20 + Math.abs(Math.sin(i)) * 80}%`, "20%"] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.05 }} />
          ))}
        </div>
        <div className="flex items-center justify-between text-white/80 text-[10px]">
          <span>1:24</span>
          <div className="flex-1 mx-2 h-1 rounded-full bg-white/20 overflow-hidden">
            <motion.div className="h-full bg-white" animate={{ width: ["10%", "70%"] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }} />
          </div>
          <span>3:42</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-white/80 text-xs">
          <Headphones size={12} /> Spatial audio · Lossless
        </div>
      </div>
    </div>
  );
}
