import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** GridDistortionBackground — Grid distorted by mouse / scroll. */
export default function GridDistortionBackground({ className }: { className?: string }) {
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
    wrap.current!.addEventListener("mousemove", (e) => {
      const r = wrap.current!.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    });
    let raf = 0;
    const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "#04050d"; ctx.fillRect(0, 0, w, h);
      const step = 30;
      ctx.strokeStyle = "rgba(99,102,241,0.35)"; ctx.lineWidth = 0.5;
      // vertical
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        for (let y = 0; y < h; y += 4) {
          const d = Math.hypot(x - mx, y - my);
          const f = Math.max(0, 1 - d / 200);
          const px = x + Math.sin(y * 0.02 + t) * 6 * f;
          if (y === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
        }
        ctx.stroke();
      }
      // horizontal
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 4) {
          const d = Math.hypot(x - mx, y - my);
          const f = Math.max(0, 1 - d / 200);
          const py = y + Math.cos(x * 0.02 + t) * 6 * f;
          if (x === 0) ctx.moveTo(x, py); else ctx.lineTo(x, py);
        }
        ctx.stroke();
      }
      // accent
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, 150);
      g.addColorStop(0, "rgba(168,85,247,0.4)"); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={wrap} className={cn("relative w-full h-full overflow-hidden cursor-crosshair", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
