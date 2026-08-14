import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Box, Layers, Image as ImgIcon, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: Sparkles, label: "Patterns" },
  { icon: Layers, label: "Cards" },
  { icon: Box, label: "Backgrounds" },
  { icon: ImgIcon, label: "Gallery" },
  { icon: Rocket, label: "Hero" },
];

/** SpotlightMenuNavbar — Spotlight-followed menu. */
export default function SpotlightMenuNavbar({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const [label, setLabel] = useState<string | null>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4 cursor-pointer")}
    >
      <motion.div
        className="pointer-events-none absolute h-32 w-32 rounded-full"
        style={{
          x: useTransform(sx, v => v - 64),
          y: useTransform(sy, v => v - 64),
          background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)",
        }}
      />
      <nav className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <div className="text-white font-bold">AnimFlow</div>
        <div className="flex items-center gap-1">
          {ITEMS.map(it => (
            <button
              key={it.label}
              onMouseEnter={() => setLabel(it.label)}
              onMouseLeave={() => setLabel(null)}
              className="relative px-3 py-1.5 rounded-lg text-sm text-white/70 hover:text-white flex items-center gap-1.5"
            >
              <it.icon size={12} /> {it.label}
            </button>
          ))}
        </div>
        <button className="rounded-lg bg-white text-black px-3 py-1.5 text-xs font-semibold">Start</button>
      </nav>
      <div className="relative mt-6 text-center text-white/40 text-xs">
        {label ? <span className="text-white">Exploring <b>{label}</b></span> : "Move your cursor across the navbar"}
      </div>
    </div>
  );
}
