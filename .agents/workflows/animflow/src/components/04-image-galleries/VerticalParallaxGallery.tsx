import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const COLS = [
  { items: [{ c: "from-rose-400 to-pink-600", h: 120 }, { c: "from-amber-400 to-orange-600", h: 90 }, { c: "from-violet-400 to-fuchsia-600", h: 140 }], speed: 0.5 },
  { items: [{ c: "from-cyan-400 to-blue-600", h: 100 }, { c: "from-emerald-400 to-teal-600", h: 150 }, { c: "from-sky-400 to-indigo-600", h: 80 }], speed: 0.8 },
  { items: [{ c: "from-yellow-400 to-rose-500", h: 130 }, { c: "from-fuchsia-400 to-purple-600", h: 110 }, { c: "from-lime-400 to-emerald-600", h: 100 }], speed: 0.3 },
];

/** VerticalParallaxGallery — Scroll-driven vertical parallax columns. */
export default function VerticalParallaxGallery({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });
  return (
    <div ref={ref} className={cn("relative w-full h-full overflow-y-auto overflow-x-hidden bg-[#0a0612] p-3 scrollbar-none", className)}>
      <div className="grid grid-cols-3 gap-2">
        {COLS.map((col, ci) => {
          const y = useTransform(scrollYProgress, [0, 1], [0, -100 * col.speed]);
          return (
            <motion.div key={ci} style={{ y }} className="flex flex-col gap-2">
              {[...col.items, ...col.items].map((it, i) => (
                <div key={i} className={`rounded-lg bg-gradient-to-br ${it.c} relative overflow-hidden`} style={{ height: it.h }}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
      <div className="h-32" />
    </div>
  );
}
