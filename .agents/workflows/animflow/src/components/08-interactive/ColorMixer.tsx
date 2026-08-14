import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/** ColorMixer — Color mixer with draggable sources. */
export default function ColorMixer({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p1, setP1] = useState({ x: 0.2, y: 0.5 });
  const [p2, setP2] = useState({ x: 0.5, y: 0.3 });
  const [p3, setP3] = useState({ x: 0.8, y: 0.7 });
  // simple color mix from positions
  const r = Math.round((p1.x * 255 + p2.x * 100 + p3.x * 50) % 256);
  const g = Math.round((p1.y * 255 + p2.y * 50 + p3.y * 200) % 256);
  const b = Math.round(((1 - p1.x) * 200 + p2.y * 200 + (1 - p3.x) * 255) % 256);
  const mixed = `rgb(${r},${g},${b})`;
  return (
    <div ref={ref} className={cn("relative w-full h-full overflow-hidden bg-[#08060f]", className)}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${p1.x * 100}% ${p1.y * 100}%, #f43f5e88, transparent 40%), radial-gradient(circle at ${p2.x * 100}% ${p2.y * 100}%, #10b98188, transparent 40%), radial-gradient(circle at ${p3.x * 100}% ${p3.y * 100}%, #3b82f688, transparent 40%)` }} />
      {[{ p: p1, set: setP1, c: "from-rose-500 to-rose-700" }, { p: p2, set: setP2, c: "from-emerald-500 to-emerald-700" }, { p: p3, set: setP3, c: "from-blue-500 to-blue-700" }].map((s, i) => (
        <motion.div
          key={i}
          drag dragConstraints={ref}
          dragMomentum={false}
          onDrag={(_, info) => {
            const r = ref.current!.getBoundingClientRect();
            s.set({ x: (info.point.x - r.left) / r.width, y: (info.point.y - r.top) / r.height });
          }}
          className={`absolute h-12 w-12 rounded-full bg-gradient-to-br ${s.c} cursor-grab active:cursor-grabbing shadow-2xl ring-4 ring-white/20`}
          style={{ left: `calc(${s.p.x * 100}% - 24px)`, top: `calc(${s.p.y * 100}% - 24px)` }}
        />
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10">
        <div className="h-4 w-4 rounded-full" style={{ background: mixed }} />
        <span className="text-[10px] text-white/80 font-mono">{mixed}</span>
      </div>
    </div>
  );
}
