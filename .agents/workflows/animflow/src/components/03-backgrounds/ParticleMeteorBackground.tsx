import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** ParticleMeteorBackground — Meteor shower on a noise field. */
export default function ParticleMeteorBackground({ className }: { className?: string }) {
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
    type M = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number };
    const meteors: M[] = [];
    let raf = 0;
    const spawn = () => {
      if (meteors.length > 50) return;
      meteors.push({
        x: Math.random() * w, y: -20,
        vx: -2 - Math.random() * 3, vy: 4 + Math.random() * 4,
        life: 0, max: 200 + Math.random() * 200,
        hue: 180 + Math.random() * 120,
      });
    };
    const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      // starfield fade
      ctx.fillStyle = "rgba(2,3,15,0.25)"; ctx.fillRect(0, 0, w, h);
      // background stars
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      for (let i = 0; i < 100; i++) {
        const x = (i * 73 + t * 8) % w;
        const y = (i * 191) % h;
        ctx.fillRect(x, y, 1, 1);
      }
      if (Math.random() < 0.3) spawn();
      ctx.globalCompositeOperation = "lighter";
      meteors.forEach((m, i) => {
        m.life++; m.x += m.vx; m.y += m.vy;
        if (m.life > m.max || m.y > h + 20) { meteors.splice(i, 1); return; }
        const tailLen = 60;
        const tx = m.x - m.vx * tailLen * 0.3, ty = m.y - m.vy * tailLen * 0.3;
        const grd = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grd.addColorStop(0, `hsla(${m.hue},90%,75%,1)`);
        grd.addColorStop(1, `hsla(${m.hue},90%,75%,0)`);
        ctx.strokeStyle = grd; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
      });
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#02030f]", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
