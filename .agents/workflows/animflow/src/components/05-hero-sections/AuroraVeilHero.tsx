import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** AuroraVeilHero — Aurora background + giant gradient title. */
export default function AuroraVeilHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#020412] flex items-center justify-center p-6", className)}>
      <div className="absolute inset-0">
        <motion.div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-fuchsia-600/30 blur-3xl" animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-cyan-500/30 blur-3xl" animate={{ x: [0, -40, 0], y: [0, 60, 0] }} transition={{ duration: 12, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-violet-500/30 blur-3xl" animate={{ y: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity }} />
      </div>
      <div className="relative text-center max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-balance">
          <span className="bg-gradient-to-br from-fuchsia-200 via-violet-200 to-cyan-200 bg-clip-text text-transparent">aurora.</span>
        </h1>
        <p className="mt-3 text-base md:text-lg text-white/70 text-balance">Open-source animated React components that feel alive. Free forever.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold inline-flex items-center gap-1.5">Get started <ArrowRight size={14} /></button>
          <button className="rounded-full border border-white/20 bg-white/5 backdrop-blur text-white px-5 py-2 text-sm">GitHub ↗</button>
        </div>
      </div>
    </div>
  );
}
