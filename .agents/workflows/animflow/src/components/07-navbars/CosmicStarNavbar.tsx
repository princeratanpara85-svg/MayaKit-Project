import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { icon: Sparkles, label: "Discover" },
  { icon: Compass, label: "Explore" },
  { icon: Heart, label: "Saved" },
  { icon: User, label: "Profile" },
];

/** CosmicStarNavbar — Cosmic / starry navbar. */
export default function CosmicStarNavbar({ className }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!; const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    type S = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const stars: S[] = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.4 + 0.4,
      hue: 180 + Math.random() * 180,
    }));
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,2,15,0.25)"; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0 || s.x > 1) s.vx *= -1;
        if (s.y < 0 || s.y > 1) s.vy *= -1;
        ctx.fillStyle = `hsla(${s.hue},90%,70%,0.9)`;
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#04020e] p-4", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full" />
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative rounded-2xl border border-white/15 bg-black/40 backdrop-blur-2xl px-4 py-2 flex items-center justify-between"
      >
        <div className="text-white font-bold inline-flex items-center gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
            <Sparkles size={16} className="text-yellow-300" />
          </motion.div>
          Cosmos
        </div>
        <div className="flex items-center gap-1 text-xs text-white/70">
          {LINKS.map(l => (
            <button key={l.label} className="px-3 py-1.5 rounded-lg hover:bg-white/5 inline-flex items-center gap-1.5">
              <l.icon size={12} /> {l.label}
            </button>
          ))}
        </div>
        <button className="rounded-lg bg-white text-black px-3 py-1.5 text-xs font-semibold">Launch</button>
      </motion.nav>
      <div className="relative mt-8 text-center text-white/70 text-sm">A navbar that floats through the cosmos.</div>
    </div>
  );
}
