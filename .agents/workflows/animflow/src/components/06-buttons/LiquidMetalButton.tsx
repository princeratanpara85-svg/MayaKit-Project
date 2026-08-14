import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Droplet, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * LiquidMetalButton
 * ----------------------
 * A mercury / chrome surface button. Combines:
 *  - A conic-gradient sheen that rotates (Aceternity UI shine)
 *  - SVG fractal-noise displacement + heavy specular highlight
 *  - Magnetic cursor follow with spring physics (Hover.dev / React Bits)
 *  - Drop "blob" on click that merges with the surface
 *
 * The "metal" feel comes from a layered approach:
 *   1. base = dark mirror gradient
 *   2. mid  = conic-gradient sheen, slowly rotating
 *   3. top  = SVG turbulence for tiny ripples (masked)
 *   4. text = sharp white with subtle stroke shadow
 */
export interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: "mercury" | "chrome" | "iridium";
}

const SHEEN_PRESETS = {
  mercury: {
    bg: "from-[#0b0b0e] via-[#1a1a22] to-[#0b0b0e]",
    sheen: ["#ffffff", "#a8a8b8", "#3a3a45", "#ffffff", "#a8a8b8"],
    text: "text-white",
    glow: "shadow-[0_30px_80px_-20px_rgba(255,255,255,0.35)]",
  },
  chrome: {
    bg: "from-[#0a0f1a] via-[#1a2438] to-[#0a0f1a]",
    sheen: ["#5ee2ff", "#ffffff", "#5b8cff", "#ffffff", "#5ee2ff"],
    text: "text-white",
    glow: "shadow-[0_30px_80px_-20px_rgba(94,226,255,0.55)]",
  },
  iridium: {
    bg: "from-[#10091a] via-[#241636] to-[#10091a]",
    sheen: ["#ff9dff", "#ffe7ad", "#9b6bff", "#ffe7ad", "#ff9dff"],
    text: "text-white",
    glow: "shadow-[0_30px_80px_-20px_rgba(255,157,255,0.55)]",
  },
} as const;

export default function LiquidMetalButton({
  label = "Quicksilver",
  onClick,
  variant = "mercury",
}: LiquidMetalButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [blobs, setBlobs] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 180, damping: 14, mass: 0.6 });

  // sheen position follow
  const sheenX = useTransform(sx, [-1, 1], ["0%", "100%"]);
  const sheenY = useTransform(sy, [-1, 1], ["0%", "100%"]);

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    mx.set(Math.max(-1, Math.min(1, x)));
    my.set(Math.max(-1, Math.min(1, y)));
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const id = ++idRef.current;
    setBlobs((b) => [...b, { id, x: px, y: py }]);
    setTimeout(() => setBlobs((b) => b.filter((x) => x.id !== id)), 900);
    onClick?.();
  }

  const preset = SHEEN_PRESETS[variant];
  const sheen = `conic-gradient(from 0deg at var(--cx,50%) var(--cy,50%), ${preset.sheen.join(",")})`;

  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#06060a] to-[#0d0d14]">
      {/* faint environment reflection */}
      <div className="absolute inset-0 opacity-40 pointer-events-none [background:radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(120,120,180,0.08),_transparent_60%)]" />

      {/* tiny dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/50"
            initial={{
              x: `${(i * 53) % 100}%`,
              y: `${(i * 71) % 100}%`,
              opacity: 0,
            }}
            animate={{ y: ["0%", "-20%"], opacity: [0, 0.7, 0] }}
            transition={{ duration: 6 + (i % 5), delay: i * 0.18, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-5">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">Mercury Series · 02</span>

        <motion.button
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onClick={handleClick}
          whileTap={{ scale: 0.94 }}
          style={{
            // pass sheen origin to the conic-gradient via CSS vars
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            ["--cx" as never]: sheenX as unknown as string,
            ["--cy" as never]: sheenY as unknown as string,
          }}
          className={cn(
            "group relative isolate overflow-hidden rounded-full",
            "h-20 w-72 px-8",
            "border border-white/15",
            preset.glow,
            "transition-shadow duration-500"
          )}
        >
          {/* base metal */}
          <span className={cn("absolute inset-0 bg-gradient-to-br", preset.bg)} />

          {/* conic sheen rotating slowly */}
          <motion.span
            className="absolute inset-[-50%] opacity-70 mix-blend-screen"
            style={{ background: sheen }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* reflective specular that follows cursor */}
          <motion.span
            aria-hidden
            className="absolute inset-0 mix-blend-overlay"
            style={{
              background: useTransform(
                [sx, sy],
                ([x, y]) =>
                  `radial-gradient(120px 80px at ${50 + (x as number) * 35}% ${50 + (y as number) * 35}%, rgba(255,255,255,0.55), transparent 60%)`
              ),
            }}
          />

          {/* SVG turbulence for tiny ripples (chrome distortion feel) */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full mix-blend-soft-light opacity-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="lm-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 0.45 0"
                />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#lm-noise)" />
          </svg>

          {/* rim highlight */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/15 [mask-image:linear-gradient(120deg,white,transparent_35%,transparent_65%,white)]" />

          {/* click blobs */}
          {blobs.map((b) => (
            <motion.span
              key={b.id}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.2, 0.7, 0.2, 1] }}
              onAnimationStart={() => {}}
              className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: b.x,
                top: b.y,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)",
                mixBlendMode: "screen",
              }}
            />
          ))}

          {/* text */}
          <span
            className={cn(
              "relative z-10 flex items-center justify-center gap-2 h-full w-full",
              "text-sm font-semibold tracking-[0.18em] uppercase",
              preset.text
            )}
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.6)" }}
          >
            <Droplet className="h-4 w-4" />
            {label}
            <Sparkles className="h-3.5 w-3.5 opacity-80" />
          </span>
        </motion.button>

        <p className="text-xs text-white/40 max-w-xs text-center leading-relaxed">
          Hover to bend the surface. Click to drop a mercury bead.
        </p>
      </div>
    </div>
  );
}
