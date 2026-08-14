import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** OrbitGalaxyBackground — Orbiting galaxy spiral with stars. */
export default function OrbitGalaxyBackground({ className }: { className?: string }) {
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
    type S = { a: number; r: number; speed: number; size: number; hue: number; off: number };
    const arms = 3, starsPerArm = 80;
    const stars: S[] = [];
    for (let a = 0; a < arms; a++) {
      for (let i = 0; i < starsPerArm; i++) {
        stars.push({
          a: (a / arms) * Math.PI * 2,
          r: 20 + i * 4,
          speed: 0.0005 + (1 - i / starsPerArm) * 0.001,
          size: 0.4 + (1 - i / starsPerArm) * 1.6,
          hue: 200 + a * 60,
          off: Math.random() * 0.4,
        });
      }
    }
    // background dust
    const dust = Array.from({ length: 200 }, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * 1.2 }));
    let raf = 0; const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "#000007"; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      dust.forEach(d => ctx.fillRect(d.x * w, d.y * h, d.s, d.s));
      const cx = w / 2, cy = h / 2;
      stars.forEach(s => {
        const angle = s.a + t * s.speed * 1000 + s.r * 0.005;
        const x = cx + Math.cos(angle) * s.r * (1 + Math.sin(t + s.off) * 0.05);
        const y = cy + Math.sin(angle) * s.r * 0.6 * (1 + Math.cos(t + s.off) * 0.05);
        ctx.fillStyle = `hsla(${s.hue},90%,${50 + s.size * 10}%,${0.3 + s.size / 4})`;
        ctx.beginPath(); ctx.arc(x, y, s.size, 0, Math.PI * 2); ctx.fill();
      });
      // core glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      grd.addColorStop(0, "rgba(255,255,220,0.6)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grd; ctx.fillRect(cx - 60, cy - 60, 120, 120);
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
