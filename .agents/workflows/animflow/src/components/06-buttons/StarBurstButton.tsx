import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StarBurstButton
 * ----------------
 * A constellation of tiny stars orbits a central button. On hover, the
 * stars explode outward in a choreographed burst (Magic UI Meteors + React
 * Bits magnet) then drift back. Includes a comet trail that loops around
 * the button.
 */
export interface StarBurstButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: "burst" | "comet" | "shower";
}

interface StarSpec {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  hue: number;
}

function buildStars(count: number): StarSpec[] {
  // deterministic so SSR hydration won't differ in the preview
  const stars: StarSpec[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.13;
    const distance = 80 + ((i * 37) % 70);
    const size = 6 + (i % 5) * 2;
    const delay = (i * 0.04) % 0.6;
    const hue = 40 + ((i * 23) % 60);
    stars.push({ id: i, angle, distance, size, delay, hue });
  }
  return stars;
}

export default function StarBurstButton({
  label = "Make it shine",
  onClick,
  variant = "burst",
}: StarBurstButtonProps) {
  const [hover, setHover] = useState(false);
  const stars = useMemo(() => buildStars(28), []);

  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#05030f] via-[#0a0420] to-[#10041a]">
      {/* starfield background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 73) % 100;
          const y = (i * 41) % 100;
          const s = (i % 4) * 0.5 + 0.5;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{ duration: 2 + (i % 5), delay: (i % 7) * 0.2, repeat: Infinity }}
            />
          );
        })}
      </div>

      {/* nebula glow */}
      <div className="absolute h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
      <div className="absolute translate-x-20 h-60 w-60 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">
          Constellation · 03
        </span>

        {/* burst stars - positioned absolute around the button */}
        <div className="relative">
          <AnimatePresence>
            {hover &&
              stars.map((s) => {
                const tx = Math.cos(s.angle) * s.distance;
                const ty = Math.sin(s.angle) * s.distance;
                return (
                  <motion.span
                    key={s.id}
                    initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
                    animate={{
                      x: tx,
                      y: ty,
                      scale: [0, 1, 0.6, 0],
                      rotate: s.angle * (180 / Math.PI),
                      opacity: [0, 1, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.4,
                      delay: s.delay,
                      ease: [0.2, 0.7, 0.2, 1],
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2"
                    style={{ color: `hsl(${s.hue} 90% 70%)` }}
                  >
                    <Star
                      size={s.size}
                      strokeWidth={0}
                      fill="currentColor"
                      style={{ filter: `drop-shadow(0 0 6px currentColor)` }}
                    />
                  </motion.span>
                );
              })}
          </AnimatePresence>

          {/* the button itself */}
          <motion.button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "relative isolate h-16 w-64 rounded-full",
              "bg-gradient-to-b from-indigo-500 via-violet-600 to-fuchsia-700",
              "border border-white/20",
              "shadow-[0_20px_60px_-15px_rgba(217,70,239,0.7)]",
              "overflow-hidden"
            )}
          >
            {/* shimmer sweep */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                transform: "skewX(-20deg)",
              }}
              animate={{ x: ["-150%", "400%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* halo on hover */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full ring-2 ring-amber-300/60"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: hover ? 1 : 0, scale: hover ? 1.15 : 0.9 }}
              transition={{ duration: 0.4 }}
              style={{ filter: "blur(2px)" }}
            />

            <span className="relative z-10 flex items-center justify-center gap-2 h-full w-full text-sm font-semibold tracking-[0.18em] uppercase text-white">
              <motion.span
                animate={hover ? { rotate: 360, scale: 1.15 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Star className="h-4 w-4 fill-amber-200 text-amber-200" />
              </motion.span>
              {label}
            </span>
          </motion.button>
        </div>

        <p className="text-xs text-white/40 max-w-xs text-center leading-relaxed">
          {variant === "comet"
            ? "Comet trails loop around the button."
            : variant === "shower"
              ? "Meteors rain through the constellation."
              : "Hover to release the stars."}
        </p>
      </div>

      {/* comet / shower extras */}
      {variant === "comet" && (
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute h-[2px] w-24 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,235,180,0.9), transparent)",
                top: "50%",
                left: "50%",
                filter: "drop-shadow(0 0 4px rgba(255,235,180,0.7))",
              }}
              initial={{ rotate: 0, x: -200, y: -120 - i * 30, opacity: 0 }}
              animate={{ rotate: 360, opacity: [0, 1, 0] }}
              transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      )}

      {variant === "shower" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-[2px] w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
                left: `${(i * 17) % 100}%`,
                top: `-10%`,
                rotate: "20deg",
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: "120vh", opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, delay: (i * 0.18) % 4, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
