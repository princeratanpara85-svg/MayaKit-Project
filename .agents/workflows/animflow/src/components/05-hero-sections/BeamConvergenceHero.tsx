import { useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 12 SVG beams originating from the edges of the canvas, converging to the
 * center where the title sits. Beams subtly track the mouse (Aceternity
 * background-beams feel) while a moving flare rides along each beam.
 */

interface BeamConfig {
  startX: number; // 0..100
  startY: number; // 0..100
  endX: number;   // 50 (center)
  endY: number;   // 50 (center)
  color: string;
  delay: number;
  duration: number;
}

const BEAM_COLORS = [
  "rgba(168,85,247,0.9)",   // fuchsia
  "rgba(34,211,238,0.9)",   // cyan
  "rgba(244,114,182,0.9)",  // pink
  "rgba(250,204,21,0.85)",  // yellow
  "rgba(74,222,128,0.85)",  // green
  "rgba(96,165,250,0.9)",   // blue
];

function makeBeams(count: number): BeamConfig[] {
  return Array.from({ length: count }).map((_, i) => {
    // Spread start points around the border
    const angle = (i / count) * Math.PI * 2;
    const cx = 50, cy = 50;
    // 0..60 radius from center, but on the border-ish
    const r = 65 + (i % 3) * 4;
    const startX = cx + Math.cos(angle) * r;
    const startY = cy + Math.sin(angle) * r;
    return {
      startX,
      startY,
      endX: cx,
      endY: cy,
      color: BEAM_COLORS[i % BEAM_COLORS.length],
      delay: (i % 5) * 0.18,
      duration: 2.2 + (i % 4) * 0.5,
    };
  });
}

export default function BeamConvergenceHero() {
  const beams = useMemo(() => makeBeams(14), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 20);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 20);
  };

  // A floating parallax for the title
  const titleX = useTransform(sx, (v) => -v * 1.5);
  const titleY = useTransform(sy, (v) => -v * 1.5);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#080014] via-[#0a0420] to-[#080014]"
    >
      {/* SVG beam layer */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {BEAM_COLORS.map((c, i) => (
            <linearGradient key={i} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c} stopOpacity="0" />
              <stop offset="50%" stopColor={c} stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
            </linearGradient>
          ))}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="40%" stopColor="rgba(168,85,247,0.5)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </radialGradient>
          <filter id="blur-beam">
            <feGaussianBlur stdDeviation="0.35" />
          </filter>
        </defs>

        {/* Center glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="22"
          fill="url(#centerGlow)"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Beams */}
        {beams.map((b, i) => (
          <g key={i} filter="url(#blur-beam)">
            {/* Wide soft beam */}
            <motion.line
              x1={b.startX}
              y1={b.startY}
              x2={b.endX}
              y2={b.endY}
              stroke={b.color}
              strokeWidth="0.55"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                repeat: Infinity,
                times: [0, 0.45, 0.85, 1],
                ease: "easeInOut",
              }}
            />
            {/* Thin sharp core */}
            <motion.line
              x1={b.startX}
              y1={b.startY}
              x2={b.endX}
              y2={b.endY}
              stroke="#ffffff"
              strokeWidth="0.12"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                repeat: Infinity,
                times: [0, 0.45, 0.85, 1],
                ease: "easeInOut",
              }}
            />
            {/* Flare head riding along the beam */}
            <motion.circle
              r="0.7"
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={{
                cx: [b.startX, b.endX],
                cy: [b.startY, b.endY],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: b.duration * 0.9,
                delay: b.delay,
                repeat: Infinity,
                times: [0, 0.2, 0.8, 1],
                ease: "easeIn",
              }}
            />
          </g>
        ))}
      </svg>

      {/* Mouse-tracked parallax glow that follows the pointer */}
      <motion.div
        style={{ x: useTransform(sx, (v) => v), y: useTransform(sy, (v) => v) }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-3xl"
      />

      {/* Center content */}
      <motion.div
        style={{ x: titleX, y: titleY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur"
          style={{ textShadow: "0 1px 6px black" }}
        >
          <Zap size={11} className="text-amber-300" />
          v3.0 · Now with edges
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mt-3 text-5xl md:text-6xl font-bold tracking-tight leading-[0.95]",
            "bg-gradient-to-b from-white via-white to-fuchsia-300 bg-clip-text text-transparent"
          )}
          style={{ filter: "drop-shadow(0 0 30px rgba(255,255,255,0.35))" }}
        >
          All energy<br />in one place.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 max-w-sm text-sm text-white/70"
          style={{ textShadow: "0 1px 6px black" }}
        >
          Twelve beams. One focal point. Zero compromises — your brand, amplified.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-6 flex gap-3"
        >
          <button className="group relative overflow-hidden rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_-8px_rgba(255,255,255,0.7)] transition-transform hover:scale-[1.03]">
            <span className="flex items-center gap-2">
              Get Started <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <button className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
            <Sparkles size={14} className="mr-2 inline-block" /> Live demo
          </button>
        </motion.div>
      </motion.div>

      {/* Noise */}
      <div className="pointer-events-none absolute inset-0 noise-bg" />
    </div>
  );
}
