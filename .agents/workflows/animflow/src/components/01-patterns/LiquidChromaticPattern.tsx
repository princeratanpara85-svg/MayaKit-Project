import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** LiquidChromaticPattern — RGB-split chromatic blobs flowing on a dark background.
 *  Mix: Magic UI liquid gradients + H5-Dooring layered chromatic UI + Aceternity
 *  aurora. We render three offset color channels of flowing metaballs. */
export default function LiquidChromaticPattern({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const blobs = Array.from({ length: 7 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      r: 0.18 + Math.random() * 0.22,
    }));
    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const t0 = performance.now();
    let raf = 0;
    const draw = (t: number) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(0, 0, w, h);
      const time = (t - t0) * 0.001;
      // wobble
      blobs.forEach(b => { b.x += b.vx; b.y += b.vy;
        if (b.x < 0 || b.x > 1) b.vx *= -1;
        if (b.y < 0 || b.y > 1) b.vy *= -1;
      });
      const channels: [string, number, number][] = [
        ["rgba(255,0,128,0.85)", -6, -2], // R
        ["rgba(0,255,200,0.85)", 6, 2],   // G
        ["rgba(120,80,255,0.85)", 0, 6],  // B
      ];
      ctx.globalCompositeOperation = "lighter";
      for (const [color, ox, oy] of channels) {
        ctx.fillStyle = color;
        for (const b of blobs) {
          const px = (b.x + Math.sin(time + b.x * 6) * 0.05) * w + ox;
          const py = (b.y + Math.cos(time + b.y * 6) * 0.05) * h + oy;
          const grd = ctx.createRadialGradient(px, py, 0, px, py, b.r * Math.max(w, h));
          grd.addColorStop(0, color);
          grd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grd;
          ctx.beginPath(); ctx.arc(px, py, b.r * Math.max(w, h), 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className={cn("relative w-full h-full bg-black overflow-hidden", className)}>
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,black_90%)] pointer-events-none" />
    </div>
  );
}
