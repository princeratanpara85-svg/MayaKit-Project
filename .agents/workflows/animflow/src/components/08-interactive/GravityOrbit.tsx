import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** GravityOrbit — Particles orbit / fall under gravity, click to add mass. */
export default function GravityOrbit({ className }: { className?: string }) {
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
    type P = { x: number; y: number; vx: number; vy: number; m: number; h: number };
    const particles: P[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
      m: 0.5 + Math.random() * 0.5, h: Math.random() * 360,
    }));
    let masses: { x: number; y: number; m: number }[] = [];
    const tick = () => {
      ctx.fillStyle = "rgba(2,4,12,0.15)"; ctx.fillRect(0, 0, w, h);
      // apply gravity from masses
      for (const p of particles) {
        for (const M of masses) {
          const dx = M.x - p.x, dy = M.y - p.y;
          const d2 = dx * dx + dy * dy + 100;
          const f = M.m * 300 / d2;
          p.vx += dx * f * 0.001; p.vy += dy * f * 0.001;
        }
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.999; p.vy *= 0.999;
        if (p.x < 0 || p.x > w) p.vx *= -0.9;
        if (p.y < 0 || p.y > h) p.vy *= -0.9;
        ctx.fillStyle = `hsla(${p.h},90%,60%,0.9)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.m * 1.5, 0, Math.PI * 2); ctx.fill();
      }
      // draw masses
      for (const M of masses) {
        const grd = ctx.createRadialGradient(M.x, M.y, 0, M.x, M.y, 60 * M.m);
        grd.addColorStop(0, "rgba(255,255,200,0.6)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(M.x, M.y, 60 * M.m, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    const onClick = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      masses.push({ x: e.clientX - r.left, y: e.clientY - r.top, m: 1 + Math.random() * 2 });
      if (masses.length > 5) masses.shift();
    };
    c.addEventListener("click", onClick);
    return () => { window.removeEventListener("resize", resize); c.removeEventListener("click", onClick); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#02040c] cursor-crosshair", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /><div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50 pointer-events-none">Click anywhere to add a gravity well</div></div>;
}
