import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** ReactiveInkPattern — Ink in water, metaball-like blobs that react to mouse.
 *  Mix: H5-Dooring 水墨 (ink) effects + 21st.dev fluid sim + React Bits blob. */
export default function ReactiveInkPattern({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!; const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, mx = -9999, my = -9999;
    const blobs = Array.from({ length: 5 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0015,
      vy: (Math.random() - 0.5) * 0.0015,
      r: 0.15 + Math.random() * 0.1,
    }));
    const resize = () => {
      const r = wrap.current!.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const onMove = (e: MouseEvent) => { const r = wrap.current!.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    wrap.current!.addEventListener("mousemove", onMove);
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, w, h);
      for (const b of blobs) {
        if (mx > 0) {
          const dx = mx - b.x * w, dy = my - b.y * h, d = Math.hypot(dx, dy) + 0.0001;
          if (d < 200) { b.vx -= (dx / d) * 0.0008; b.vy -= (dy / d) * 0.0008; }
        }
        b.vx *= 0.97; b.vy *= 0.97;
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0 || b.x > 1) b.vx *= -1;
        if (b.y < 0 || b.y > 1) b.vy *= -1;
      }
      // build SDF and threshold
      const img = ctx.getImageData(0, 0, c.width, c.height);
      const data = img.data;
      const R = Math.max(w, h) * 0.12;
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          let sum = 0;
          for (const b of blobs) {
            const dx = x - b.x * w, dy = y - b.y * h, d = Math.hypot(dx, dy);
            sum += R / d;
          }
          if (sum > 1) {
            const idx = (y * dpr * c.width + x * dpr) * 4;
            data[idx] = 240; data[idx + 1] = 240; data[idx + 2] = 250; data[idx + 3] = 255;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); wrap.current?.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={wrap} className={cn("relative w-full h-full overflow-hidden bg-black cursor-crosshair", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
