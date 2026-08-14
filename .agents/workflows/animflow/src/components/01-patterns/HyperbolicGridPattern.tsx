import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** HyperbolicGridPattern — A grid that warps in hyperbolic space, mouse-driven.
 *  Mix: Aceternity "Grid" + React Bits distortion + 21st.dev warp math. */
export default function HyperbolicGridPattern({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!; const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, mx = 0, my = 0;
    const resize = () => {
      const r = wrap.current!.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => { const r = wrap.current!.getBoundingClientRect(); mx = (e.clientX - r.left) / w - 0.5; my = (e.clientY - r.top) / h - 0.5; };
    wrap.current!.addEventListener("mousemove", onMove);
    let raf = 0;
    const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "#06010f"; ctx.fillRect(0, 0, w, h);
      const step = 28;
      ctx.strokeStyle = "rgba(168,85,247,0.4)"; ctx.lineWidth = 0.6;
      for (let x = -step; x < w + step; x += step) {
        ctx.beginPath();
        for (let py = 0; py <= h; py += 2) {
          const px = x + Math.sin((py / h) * Math.PI * 2 + t) * 8 + mx * 40;
          if (py === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      for (let y = -step; y < h + step; y += step) {
        ctx.beginPath();
        for (let px = 0; px <= w; px += 2) {
          const py = y + Math.cos((px / w) * Math.PI * 2 + t * 0.8) * 8 + my * 40;
          if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      // accent glow at cursor
      const grd = ctx.createRadialGradient((mx + 0.5) * w, (my + 0.5) * h, 0, (mx + 0.5) * w, (my + 0.5) * h, 220);
      grd.addColorStop(0, "rgba(236,72,153,0.25)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd; ctx.fillRect(0, 0, w, h);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); wrap.current?.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={wrap} className={cn("relative w-full h-full overflow-hidden cursor-crosshair", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
