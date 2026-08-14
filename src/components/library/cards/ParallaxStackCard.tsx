"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, Mountain, Waves, Trees } from "lucide-react";
import { cn } from "@/lib/utils";

/** ParallaxStackCard — Stacked cards with parallax depth on hover. */
const ITEMS = [
  { icon: Mountain, title: "Dolomites", color: "from-orange-400 to-rose-500", sub: "Italy · 2,400m" },
  { icon: Waves, title: "Bali", color: "from-cyan-400 to-blue-500", sub: "Indonesia · 0m" },
  { icon: Trees, title: "Yosemite", color: "from-emerald-400 to-teal-500", sub: "California · 1,200m" },
  { icon: Layers, title: "Patagonia", color: "from-fuchsia-400 to-pink-500", sub: "Chile · 3,050m" },
];
export default function ParallaxStackCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#06080f] overflow-hidden p-6", className)}>
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        className="relative w-full max-w-sm h-[300px]"
        style={{ perspective: 1000 }}
      >
        {ITEMS.map((it, i) => {
          const depth = (i + 1) * 12;
          const tx = useTransform(mx, [0, 1], [-depth, depth]);
          const ty = useTransform(my, [0, 1], [-depth * 0.6, depth * 0.6]);
          const Icon = it.icon;
          return (
            <motion.div
              key={i}
              style={{ 
                x: tx, y: ty, z: depth, 
                rotateX: useTransform(my, [0, 1], [10, -10]), 
                rotateY: useTransform(mx, [0, 1], [-10, 10]),
                top: `${i * 3.5}rem`
              }}
              className={`absolute inset-x-4 h-28 rounded-2xl p-5 border border-white/10 bg-gradient-to-br ${it.color} shadow-xl flex items-center gap-4`}
            >
              <Icon className="text-white" size={28} />
              <div>
                <p className="text-white font-bold text-lg leading-none">{it.title}</p>
                <p className="text-white/80 text-xs mt-1">{it.sub}</p>
              </div>
              <button className="ml-auto rounded-full bg-white/20 backdrop-blur text-white text-[10px] px-2 py-1">View</button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
