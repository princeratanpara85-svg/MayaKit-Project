import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ITEMS = [
  { h: 140, c: "from-rose-400 to-pink-600", t: "Sunset" },
  { h: 100, c: "from-cyan-400 to-blue-600", t: "Coral" },
  { h: 120, c: "from-amber-400 to-orange-600", t: "Canyon" },
  { h: 160, c: "from-violet-400 to-fuchsia-600", t: "Lavender" },
  { h: 90, c: "from-emerald-400 to-teal-600", t: "Moss" },
  { h: 130, c: "from-sky-400 to-indigo-600", t: "Cloud" },
  { h: 110, c: "from-yellow-400 to-rose-500", t: "Dune" },
  { h: 150, c: "from-fuchsia-400 to-purple-600", t: "Twilight" },
  { h: 100, c: "from-lime-400 to-emerald-600", t: "Spring" },
  { h: 120, c: "from-pink-400 to-rose-600", t: "Bloom" },
];

/** MasonryRevealGallery — Masonry grid that reveals with stagger. */
export default function MasonryRevealGallery({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#0a0612] p-4", className)}>
      <div className="columns-3 gap-2 h-full">
        {ITEMS.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
            className={`mb-2 break-inside-avoid rounded-lg bg-gradient-to-br ${it.c} relative overflow-hidden cursor-pointer group`}
            style={{ height: it.h }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-1 left-2 text-white text-[10px] font-medium opacity-80">{it.t}</div>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
