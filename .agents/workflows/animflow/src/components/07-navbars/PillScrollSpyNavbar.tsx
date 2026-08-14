import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Layers, Box, Compass, Wand2, Atom } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PillScrollSpyNavbar
 * A floating pill bar in which a soft, magnetic pill indicator slides from
 * one section to another using Framer Motion's `layoutId` magic. The
 * "active" section auto-rotates on a timer so visitors can see the indicator
 * flow without scrolling. Below the bar, the content panel cross-fades to
 * match the active section.
 *
 * Source remix:
 *   - Magic UI pill nav (layoutId morphing indicator)
 *   - React Bits "Scroll Spy" pattern (intersection observer → active id)
 */

type Section = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  blurb: string;
  accent: string; // tailwind gradient class
};

const SECTIONS: Section[] = [
  {
    id: "intro",
    label: "Intro",
    icon: Sparkles,
    blurb: "Hello, traveler. Drift through the cosmos of animated components.",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    id: "react",
    label: "React",
    icon: Zap,
    blurb: "Framer Motion's `layoutId` makes the pill slingshot between items with zero effort.",
    accent: "from-sky-400 to-indigo-500",
  },
  {
    id: "layers",
    label: "Layers",
    icon: Layers,
    blurb: "Stacked panels, blurred backdrops, and noise overlays compose a tactile surface.",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: "models",
    label: "Models",
    icon: Box,
    blurb: "Three.js geometry, R3F scenes and procedural shaders — all under 12kb gzipped.",
    accent: "from-amber-300 to-rose-500",
  },
  {
    id: "explore",
    label: "Explore",
    icon: Compass,
    blurb: "A living gallery that updates with the season. Drop in a token, ship a hero.",
    accent: "from-cyan-300 to-blue-500",
  },
  {
    id: "magic",
    label: "Magic",
    icon: Wand2,
    blurb: "Hover any block to see micro-interactions that feel hand-tuned.",
    accent: "from-fuchsia-300 to-pink-500",
  },
  {
    id: "quantum",
    label: "Quantum",
    icon: Atom,
    blurb: "Auto-rotation cycles the focus, so you can preview without scrolling.",
    accent: "from-rose-300 to-orange-400",
  },
];

const ROTATE_MS = 2400;

export default function PillScrollSpyNavbar() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((curr) => {
        const idx = SECTIONS.findIndex((s) => s.id === curr);
        return SECTIONS[(idx + 1) % SECTIONS.length].id;
      });
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [paused]);

  const activeIdx = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
  const activeSection = SECTIONS[activeIdx];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "relative h-[400px] w-full overflow-hidden rounded-2xl",
        "bg-[linear-gradient(180deg,#0a0a14_0%,#100b1f_60%,#160a26_100%)]",
      )}
    >
      <div className="noise-bg pointer-events-none absolute inset-0 opacity-50" />

      {/* moving aurora blob behind the pill */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The pill bar */}
      <nav className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
        <div
          className={cn(
            "relative flex items-center gap-1 rounded-full px-1.5 py-1.5",
            "border border-white/10 bg-white/[0.04] shadow-[0_10px_40px_-15px_rgba(168,85,247,0.6)] backdrop-blur-2xl",
          )}
        >
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300",
                  isActive ? "text-white" : "text-white/55 hover:text-white/80",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="pill-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className={cn(
                      "absolute inset-0 -z-10 rounded-full bg-gradient-to-r shadow-[0_0_18px_rgba(168,85,247,0.55)]",
                      s.accent,
                    )}
                  />
                )}
                <s.icon className="h-3.5 w-3.5" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
        {/* progress dot row */}
        <div className="mt-3 flex items-center justify-center gap-1">
          {SECTIONS.map((s, i) => (
            <motion.span
              key={s.id}
              animate={{
                width: i === activeIdx ? 22 : 6,
                backgroundColor: i === activeIdx ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
      </nav>

      {/* Hero / body content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 pt-32 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-xl"
          >
            <span
              className={cn(
                "inline-block rounded-full bg-gradient-to-r px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90",
                activeSection.accent,
              )}
            >
              {activeSection.label} · {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
              A pill that <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">remembers</span> where you are.
            </h2>
            <p className="mt-3 text-sm text-white/60">{activeSection.blurb}</p>
          </motion.div>
        </AnimatePresence>

        {/* tiny CTA that never changes (gives context) */}
        <div className="mt-7 flex gap-3">
          <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-white/20 transition hover:scale-[1.04]">
            Try it
          </button>
          <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur transition hover:bg-white/10">
            Docs
          </button>
        </div>
      </div>
    </div>
  );
}
