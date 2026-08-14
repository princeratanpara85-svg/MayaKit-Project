"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** LiquidChromeCard — Liquid chrome / mercury distortion in the card background. */
export default function LiquidChromeCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-[#0b0b14] overflow-hidden p-6", className)}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width) * 100);
          my.set(((e.clientY - r.top) / r.height) * 100);
        }}
        className="relative w-full max-w-sm aspect-[16/10] rounded-3xl overflow-hidden border border-white/10"
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
          <defs>
            <radialGradient id="chrome" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#f5f5fa" />
              <stop offset="40%" stopColor="#888" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>
            <filter id="turb">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="30" />
            </filter>
          </defs>
          <motion.rect
            width="400" height="250"
            filter="url(#turb)"
            style={{ fill: "url(#chrome)" }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 mix-blend-overlay"
          style={{

            backgroundImage: useTransform([sx, sy], ([x, y]: any) => {
              return `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.4), transparent 40%)`;
            }) as any,
          }}
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white">
            <Sparkles size={18} />
            <span className="text-[10px] uppercase tracking-widest opacity-80">Mercury Pro</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">Live pricing</p>
            <p className="text-3xl font-bold text-white">$2,499</p>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-white/80">
              View details <ArrowUpRight size={12} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
