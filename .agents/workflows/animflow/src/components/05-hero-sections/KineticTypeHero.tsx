import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** KineticTypeHero — Kinetic typography, every letter animated. */
const text = "kinetic";
export default function KineticTypeHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#020208] flex items-center justify-center p-6", className)}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <h1 className="text-7xl md:text-8xl font-black tracking-tighter flex">
        {text.split("").map((c, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ background: "linear-gradient(180deg, #fff 0%, #888 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          >
            {c}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}
