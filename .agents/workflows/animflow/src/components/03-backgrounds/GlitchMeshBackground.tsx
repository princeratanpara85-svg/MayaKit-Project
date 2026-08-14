import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** GlitchMeshBackground — Glitch / mesh distortion. */
export default function GlitchMeshBackground({ className }: { className?: string }) {
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
      ctx.fillStyle = "#0a000a"; ctx.fillRect(0, 0, w, h);
      const step = 40;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const n = (Math.sin(x * 0.01 + t) + Math.cos(y * 0.01 - t * 0.7)) * 0.5;
          if (n > 0.3) {
            const offsetX = (Math.random() - 0.5) * 20 * (Math.random() < 0.05 ? 3 : 1);
            const offsetY = (Math.random() - 0.5) * 20 * (Math.random() < 0.05 ? 3 : 1);
            const hue = Math.random() < 0.5 ? 320 : 180;
            ctx.fillStyle = `hsla(${hue},90%,60%,${n * 0.3})`;
            ctx.fillRect(x + offsetX, y + offsetY, step - 4, step - 4);
          }
        }
      }
      // scanline
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      const scanY = (t * 200) % h;
      ctx.fillRect(0, scanY, w, 2);
      // rare glitch flash
      if (Math.random() < 0.01) {
        ctx.fillStyle = "rgba(255,0,128,0.05)";
        ctx.fillRect(Math.random() * w - 50, 0, 100, h);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
