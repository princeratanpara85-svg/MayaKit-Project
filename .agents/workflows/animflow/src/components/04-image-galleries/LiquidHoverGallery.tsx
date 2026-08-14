import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TILES = Array.from({ length: 8 }, (_, i) => ({
  c: ["from-rose-400 to-pink-600", "from-cyan-400 to-blue-600", "from-amber-400 to-orange-600", "from-violet-400 to-fuchsia-600", "from-emerald-400 to-teal-600", "from-sky-400 to-indigo-600", "from-yellow-400 to-rose-500", "from-fuchsia-400 to-purple-600"][i],
  t: ["Dawn", "Reef", "Dune", "Bloom", "Glade", "Tide", "Dusk", "Star"][i],
}));

/** LiquidHoverGallery — Liquid distortion on hover. */
export default function LiquidHoverGallery({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={cn("relative w-full h-full overflow-hidden bg-[#08060f] grid grid-cols-4 gap-2 p-3", className)}>
      {TILES.map((t, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.08, zIndex: 10 }}
          className={`relative aspect-square rounded-xl bg-gradient-to-br ${t.c} overflow-hidden cursor-pointer`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ filter: "url(#liquid)" }}
            style={{ filter: "url(#liquid)" }}
          >
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
            <div className="absolute bottom-2 left-2 text-white text-xs font-medium">{t.t}</div>
          </motion.div>
          <svg className="absolute inset-0 w-0 h-0">
            <defs>
              <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" />
                <feDisplacementMap in="SourceGraphic" scale="20" />
              </filter>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
