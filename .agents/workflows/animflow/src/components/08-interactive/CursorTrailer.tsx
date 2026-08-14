import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CursorTrailer — A pulsing, rainbow-shifting trail of fading orbs
 * that follows the mouse, leaves glowing sparkles on click, and reacts
 * to pointer speed (faster = wider, brighter trail).
 *
 * Mix: H5-Dooring ripple click + React Bits blob cursor + Magic UI particles.
 */

interface Orb {
  id: number;
  x: number;
  y: number;
  hue: number;
  size: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
}

export default function CursorTrailer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0, last: 0 });
  const idRef = useRef(0);
  const [, force] = useState(0);
  const [clickBurst, setClickBurst] = useState<{ id: number; x: number; y: number; hue: number }[]>([]);

  // Continuous rAF render
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = wrap.clientWidth * dpr;
      canvas.height = wrap.clientHeight * dpr;
      canvas.style.width = wrap.clientWidth + "px";
      canvas.style.height = wrap.clientHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    const tick = (t: number) => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      // Soft fade-trail (no full clear, leaves comet tail)
      ctx.fillStyle = "rgba(5, 5, 12, 0.18)";
      ctx.fillRect(0, 0, w, h);

      // Composite orb trails
      ctx.globalCompositeOperation = "lighter";
      for (let i = orbsRef.current.length - 1; i >= 0; i--) {
        const o = orbsRef.current[i];
        o.x += o.vx;
        o.y += o.vy;
        o.vx *= 0.96;
        o.vy *= 0.96;
        o.life += 1;
        if (o.life > o.maxLife) {
          orbsRef.current.splice(i, 1);
          continue;
        }
        const k = 1 - o.life / o.maxLife;
        const radius = o.size * (0.5 + k * 0.7);
        const grd = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, radius);
        grd.addColorStop(0, `hsla(${o.hue}, 100%, 70%, ${0.7 * k})`);
        grd.addColorStop(0.4, `hsla(${o.hue}, 100%, 60%, ${0.3 * k})`);
        grd.addColorStop(1, `hsla(${o.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(o.x, o.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // Auto-emit orbs along mouse path
      const m = mouseRef.current;
      if (m.x > 0) {
        if (m.last === 0) m.last = t;
        const dt = Math.max(1, t - m.last);
        m.last = t;
        const dx = m.x - m.prevX;
        const dy = m.y - m.prevY;
        m.speed = Math.hypot(dx, dy) / dt;
        m.prevX = m.x;
        m.prevY = m.y;
        if (m.speed > 0.05) {
          const count = Math.min(6, 1 + Math.floor(m.speed * 30));
          for (let i = 0; i < count; i++) {
            orbsRef.current.push({
              id: idRef.current++,
              x: m.x + (Math.random() - 0.5) * 8,
              y: m.y + (Math.random() - 0.5) * 8,
              hue: (t * 0.05 + i * 24) % 360,
              size: 10 + Math.random() * 14 + m.speed * 18,
              life: 0,
              maxLife: 40 + Math.random() * 30,
              vx: (Math.random() - 0.5) * 1.2,
              vy: (Math.random() - 0.5) * 1.2,
            });
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    mouseRef.current.x = e.clientX - r.left;
    mouseRef.current.y = e.clientY - r.top;
  };
  const onLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  const onClick = (e: React.MouseEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // burst of orbs
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const sp = 2 + Math.random() * 4;
      orbsRef.current.push({
        id: idRef.current++,
        x,
        y,
        hue: (i * 18) % 360,
        size: 18 + Math.random() * 16,
        life: 0,
        maxLife: 60,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
      });
    }
    setClickBurst((b) => [
      ...b,
      { id: Date.now() + Math.random(), x, y, hue: Math.random() * 360 },
    ]);
    setTimeout(() => setClickBurst((b) => b.slice(1)), 800);
    force((n) => n + 1);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={cn(
        "relative h-[380px] w-full overflow-hidden rounded-xl",
        "bg-[radial-gradient(ellipse_at_top,_#0c0a1f_0%,_#05050c_60%)]"
      )}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Framer-Motion burst rings on click */}
      <AnimatePresence>
        {clickBurst.map((b) => (
          <motion.div
            key={b.id}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute h-12 w-12 rounded-full"
            style={{
              left: b.x - 24,
              top: b.y - 24,
              border: `2px solid hsl(${b.hue}, 100%, 70%)`,
              boxShadow: `0 0 30px hsl(${b.hue}, 100%, 60%)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Instruction */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/70 backdrop-blur">
        <MousePointer2 size={12} className="text-fuchsia-400" />
        Move your mouse · click to burst
      </div>
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 text-[10px] text-white/40">
        <Sparkles size={10} />
        {idRef.current} particles
      </div>
    </div>
  );
}
