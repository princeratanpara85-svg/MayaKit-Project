import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TILES = Array.from({ length: 12 }, (_, i) => ({
  h: 80 + (i * 23) % 50,
  c: ["from-rose-500 to-pink-700", "from-cyan-500 to-blue-700", "from-amber-500 to-orange-700", "from-violet-500 to-fuchsia-700", "from-emerald-500 to-teal-700", "from-sky-500 to-indigo-700"][i % 6],
  t: ["Sky", "Reef", "Dune", "Bloom", "Forest", "Dawn", "Tide", "Glade", "Dusk", "Star", "Lush", "Mist"][i],
}));

/** SpotlightHoverGallery — Cursor spotlight reveals image. */
export default function SpotlightHoverGallery({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      className={cn("relative w-full h-full overflow-hidden bg-black grid grid-cols-4 gap-1 p-2", className)}
    >
      {TILES.map((t, i) => (
        <div key={i} className={`rounded-md bg-gradient-to-br ${t.c} relative overflow-hidden`} style={{ height: t.h }}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-1 left-1 text-white/40 text-[8px]">{t.t}</div>
        </div>
      ))}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{ x: pos.x - 80, y: pos.y - 80 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.4 }}
        style={{ width: 160, height: 160, background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 60%)", mixBlendMode: "screen" }}
      />
    </div>
  );
}
