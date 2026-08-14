import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** HyperspaceHero — Hyperspace / warp-tunnel hero. */
export default function HyperspaceHero({ className }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!; const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, cx = 0, cy = 0;
    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
    };
    resize(); window.addEventListener("resize", resize);
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,10,0.25)"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      for (let i = 0; i < 60; i++) {
        const t = (performance.now() * 0.001 + i * 0.1) % 5;
        const r = t * 100;
        ctx.lineWidth = Math.max(0.5, 4 - t);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // center text overlay drawn on canvas too
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">HYPERSPACE</h1>
        <p className="mt-2 text-sm text-white/70">Engage warp drive.</p>
      </div>
    </div>
  );
}
