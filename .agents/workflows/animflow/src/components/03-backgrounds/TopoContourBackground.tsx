import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** TopoContourBackground — Topographic contour map, animated. */
export default function TopoContourBackground({ className }: { className?: string }) {
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
      ctx.fillStyle = "#01060d"; ctx.fillRect(0, 0, w, h);
      const levels = 22;
      for (let l = 0; l < levels; l++) {
        const offset = l * 18 - t * 18;
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const r = (Math.min(w, h) / 3) + Math.sin(a * 3 + t * 0.5) * 30 + Math.cos(a * 5 - t * 0.3) * 20;
          const x = w / 2 + Math.cos(a + offset * 0.01) * r;
          const y = h / 2 + Math.sin(a + offset * 0.01) * r;
          if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const hue = 180 + l * 8;
        ctx.strokeStyle = `hsla(${hue},85%,60%,${0.15 + (l / levels) * 0.3})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#01060d]", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
