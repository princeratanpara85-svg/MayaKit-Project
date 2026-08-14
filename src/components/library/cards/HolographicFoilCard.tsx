"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, Crown, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HolographicFoilCard
 * Inspirations:
 *  - Aceternity UI "Card Hover Effect" (radial mask spotlight)
 *  - Magic UI "Magic Card" (mouse-tracked spotlight + gradient)
 *  - React Bits holographic tilt technique
 *
 * Rainbow conic gradient, foil "scratches", mouse-tracked spotlight
 * & a chromatic shift on the title.
 */
export default function HolographicFoilCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const rotateX = useTransform(mouseY, [0, 100], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 100], [-6, 6]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 bg-[radial-gradient(circle_at_30%_20%,#1a1033_0%,#050010_60%)]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative w-[320px] h-[380px] rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(168,85,247,0.5)] cursor-pointer"
      >
        {/* Base rainbow conic foil — slow rotation always on */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: hover ? 220 : 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, #ff4d8d, #ffb84d, #ffe34d, #4dffb8, #4dc8ff, #6e4dff, #ff4dd8, #ff4d8d)",
            filter: "saturate(1.4)",
          }}
        />

        {/* Dark mask to make it more metallic */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35)_0%,transparent_45%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.7)_0%,transparent_55%)] mix-blend-overlay" />

        {/* Holo scratches */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(110deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 5px)",
          }}
        />

        {/* Card content layer (dark) */}
        <div className="absolute inset-0 rounded-3xl p-6 flex flex-col bg-gradient-to-br from-black/40 via-black/55 to-black/30 backdrop-blur-[1px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
              <Crown size={11} className="text-amber-300" />
              Limited Holo
            </div>
            <span className="text-[10px] text-white/70">#0042 / 250</span>
          </div>

          {/* Avatar / monogram disc */}
          <div className="mt-5 flex items-center gap-4">
            <div className="relative h-14 w-14 rounded-2xl overflow-hidden ring-1 ring-white/30">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "conic-gradient(from 90deg, #f0abfc, #818cf8, #f0abfc, #c084fc, #f0abfc)",
                }}
              />
              <div className="absolute inset-0 grid place-items-center text-xl font-black text-white drop-shadow">
                N
              </div>
            </div>
            <div>
              <div className="text-xs text-white/60">Issued to</div>
              <div className="text-sm font-semibold tracking-wide">NOVA STELLAR</div>
            </div>
          </div>

          {/* Title with chromatic shift on hover */}
          <div className="mt-6 relative">
            <motion.h3
              animate={hover ? { x: [-1, 1, -1, 0] } : { x: 0 }}
              transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
              className={cn(
                "text-3xl font-black leading-[1.05] tracking-tight text-white",
                "drop-shadow-[0_2px_0_rgba(255,0,128,0.4)]"
              )}
            >
              Holo
              <br />
              Edition
            </motion.h3>
            {/* RGB ghost layers */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 text-3xl font-black leading-[1.05] tracking-tight mix-blend-screen"
              style={{
                color: "rgba(0,255,255,0.7)",
                transform: "translate(-2px, 1px)",
              }}
            >
              Holo
              <br />
              Edition
            </div>
            <div
              className="pointer-events-none absolute inset-0 -z-10 text-3xl font-black leading-[1.05] tracking-tight mix-blend-screen"
              style={{
                color: "rgba(255,0,200,0.7)",
                transform: "translate(2px, -1px)",
              }}
            >
              Holo
              <br />
              Edition
            </div>
          </div>

          <p className="mt-3 text-xs text-white/75 leading-relaxed">
            A card whose foil catches the cursor. Each surface micro-iridescence
            is synthesized from a rotating conic gradient + chromatic ghosts.
          </p>

          {/* Tag row */}
          <div className="mt-auto flex items-center gap-2 flex-wrap">
            {[
              { icon: Sparkles, label: "Foil" },
              { icon: Star, label: "Rare" },
              { icon: Zap, label: "Mint" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 backdrop-blur px-2.5 py-1 text-[10px] text-white"
              >
                <Icon size={10} /> {label}
              </span>
            ))}
          </div>

          <button className="mt-4 w-full rounded-xl bg-white text-black font-semibold text-sm py-2.5 hover:bg-amber-300 transition-colors">
            Claim Edition
          </button>
        </div>

        {/* Mouse-tracked spotlight highlight */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [mouseX, mouseY] as any,
              ([x, y]) =>
                `radial-gradient(circle 180px at ${x}% ${y}%, rgba(255,255,255,0.55), transparent 60%)`
            ),
            mixBlendMode: "screen",
          }}
        />

        {/* Glossy sweep */}
        <motion.div
          className="pointer-events-none absolute -inset-1 opacity-30"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 45%, transparent 60%)",
          }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
