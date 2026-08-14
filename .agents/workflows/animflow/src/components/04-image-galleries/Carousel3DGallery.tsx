import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { c: "from-rose-500 via-fuchsia-500 to-purple-600", t: "Neon City", s: "Tokyo · 2025" },
  { c: "from-amber-400 via-orange-500 to-rose-500", t: "Sahara", s: "Morocco · 2024" },
  { c: "from-cyan-400 via-blue-500 to-indigo-600", t: "Polar Night", s: "Tromsø · 2024" },
  { c: "from-emerald-400 via-teal-500 to-cyan-500", t: "Reef", s: "Palau · 2025" },
  { c: "from-violet-500 via-purple-500 to-fuchsia-500", t: "Mystic", s: "Iceland · 2025" },
];

/** Carousel3DGallery — 3D carousel with depth perspective. */
export default function Carousel3DGallery({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] flex items-center justify-center", className)}>
      <div className="relative w-full h-full" style={{ perspective: 1200 }}>
        <AnimatePresence mode="popLayout">
          {SLIDES.map((s, idx) => {
            const offset = idx - i;
            const isActive = idx === i;
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: `${offset * 50}%`,
                  z: isActive ? 0 : -200,
                  rotateY: offset * -25,
                  opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3,
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ duration: 0.7 }}
                className={`absolute top-1/2 left-1/2 w-64 h-80 -ml-32 -mt-40 rounded-2xl bg-gradient-to-br ${s.c} overflow-hidden shadow-2xl`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-bold">{s.t}</p>
                  <p className="text-xs text-white/80">{s.s}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <button onClick={() => setI(v => (v - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20"><ChevronLeft size={16} /></button>
      <button onClick={() => setI(v => (v + 1) % SLIDES.length)} className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20"><ChevronRight size={16} /></button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={cn("h-1 rounded-full transition-all", idx === i ? "w-6 bg-white" : "w-1 bg-white/40")} />
        ))}
      </div>
    </div>
  );
}
