import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** LiquidGradientBackground — Liquid gradient blobs morphing. */
export default function LiquidGradientBackground({ className }: { className?: string }) {
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
    type B = { x: number; y: number; r: number; h: number; s: number };
    const blobs: B[] = Array.from({ length: 5 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 200 + Math.random() * 200,
      h: Math.random() * 360, s: 0.3 + Math.random() * 0.4,
    }));
    let raf = 0; const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "rgba(5,5,20,0.08)"; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        b.x += Math.sin(t * b.s + b.h) * 0.6;
        b.y += Math.cos(t * b.s * 0.7 + b.h) * 0.6;
        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grd.addColorStop(0, `hsla(${b.h},90%,65%,0.7)`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#050514]", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
