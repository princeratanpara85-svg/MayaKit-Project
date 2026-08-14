import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** MagneticParticlesPattern — Particles bend toward the cursor like a magnetic field.
 *  Mix: React Bits "Magnet" + Magic UI "Particles" + H5-Dooring flow-field canvases. */
export default function MagneticParticlesPattern({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!, wDiv = wrap.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, mx = -9999, my = -9999;
    const N = 220;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0025,
      vy: (Math.random() - 0.5) * 0.0025,
      h: Math.random() * 360,
    }));
    const resize = () => {
      const r = wDiv.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => { const r = wDiv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const onLeave = () => { mx = -9999; my = -9999; };
    wDiv.addEventListener("mousemove", onMove);
    wDiv.addEventListener("mouseleave", onLeave);
    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of pts) {
        // magnetic pull
        if (mx > 0) {
          const dx = mx - p.x * w, dy = my - p.y * h;
          const d = Math.hypot(dx, dy) + 0.0001;
          const pull = 120 / (d * d) * 0.6;
          p.vx += (dx / d) * pull * 0.002;
          p.vy += (dy / d) * pull * 0.002;
        }
        p.vx *= 0.96; p.vy *= 0.96;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        p.h = (p.h + 0.5) % 360;
        ctx.fillStyle = `hsla(${p.h},90%,65%,0.9)`;
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 1.4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("resize", resize); wDiv.removeEventListener("mousemove", onMove); wDiv.removeEventListener("mouseleave", onLeave); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={wrap} className={cn("relative w-full h-full bg-black overflow-hidden cursor-crosshair", className)}>
    <canvas ref={cv} className="absolute inset-0 w-full h-full" />
    <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-3 text-[10px] tracking-[0.3em] text-white/40 uppercase">Move your cursor</div>
  </div>;
}
