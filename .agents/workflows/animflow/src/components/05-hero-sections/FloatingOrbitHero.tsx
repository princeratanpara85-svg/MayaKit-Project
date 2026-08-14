import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** FloatingOrbitHero — Orbiting shapes around the title. */
export default function FloatingOrbitHero({ className }: { className?: string }) {
  const orbits = [
    { r: 130, speed: 20, color: "from-cyan-400 to-blue-500", icon: "◆" },
    { r: 170, speed: 28, color: "from-fuchsia-400 to-pink-500", icon: "✦" },
    { r: 210, speed: 36, color: "from-amber-400 to-orange-500", icon: "●" },
  ];
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#02000a] flex items-center justify-center", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_60%)]" />
      {orbits.map((o, i) => (
        <div key={i} className="absolute" style={{ width: o.r * 2, height: o.r * 2 }}>
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: o.speed, repeat: Infinity, ease: "linear" }}
          >
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 h-6 w-6 rounded-lg bg-gradient-to-br ${o.color} flex items-center justify-center text-white text-xs shadow-lg`}>
              {o.icon}
            </div>
          </motion.div>
        </div>
      ))}
      <div className="relative text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] text-white">Orbit <br />in motion.</h1>
        <button className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-sm font-semibold">Explore <ArrowRight size={14} /></button>
      </div>
    </div>
  );
}
