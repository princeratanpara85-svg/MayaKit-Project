import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** VortexPlasmaBackground — Vortex / plasma tunnel with chromatic shift. */
export default function VortexPlasmaBackground({ className }: { className?: string }) {
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
    let raf = 0; const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const rings = 40;
      for (let i = 0; i < rings; i++) {
        const r = (i * 8) + (t * 30) % 8;
        const hue = (i * 12 + t * 50) % 360;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue},90%,60%,${0.6 - i / rings})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      // chromatic glow
      ctx.globalCompositeOperation = "lighter";
      [0, 120, 240].forEach((off, i) => {
        const r = 80 + Math.sin(t + i) * 20;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grd.addColorStop(0, `hsla(${off},90%,60%,0.3)`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      });
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
