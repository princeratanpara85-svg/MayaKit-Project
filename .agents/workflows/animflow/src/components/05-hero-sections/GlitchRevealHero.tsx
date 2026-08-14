import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** GlitchRevealHero — Glitch-reveal text effect. */
export default function GlitchRevealHero({ className }: { className?: string }) {
  const text = "BREAK THE INTERNET";
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black flex items-center justify-center p-6", className)}>
      <div className="relative">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white text-center">
          {text.split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="inline-block"
              style={{ textShadow: "2px 0 #ff00aa, -2px 0 #00eeff" }}
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>
        <motion.h1
          className="absolute inset-0 text-5xl md:text-6xl font-black tracking-tighter text-center pointer-events-none"
          style={{ color: "rgba(255,0,170,0.7)", textShadow: "none" }}
          animate={{ x: [0, -3, 2, -1, 0], y: [0, 1, -1, 0, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
          aria-hidden
        >
          {text}
        </motion.h1>
        <motion.h1
          className="absolute inset-0 text-5xl md:text-6xl font-black tracking-tighter text-center pointer-events-none"
          style={{ color: "rgba(0,238,255,0.7)", textShadow: "none" }}
          animate={{ x: [0, 3, -2, 1, 0], y: [0, -1, 1, 0, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror", delay: 0.15 }}
          aria-hidden
        >
          {text}
        </motion.h1>
        <p className="text-center mt-4 text-white/60 text-sm font-mono">// glitch_hero.exe loaded</p>
      </div>
    </div>
  );
}
