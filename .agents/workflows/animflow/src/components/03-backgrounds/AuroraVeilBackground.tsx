import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Approximate number of vertical "curtain" bands. */
  density?: number;
  /** Animation speed multiplier. */
  intensity?: number;
  /** Dominant aurora tint. */
  color?: string;
  className?: string;
};

/**
 * AuroraVeilBackground — vertical aurora curtains that breathe, ripple and
 * roll across the sky. Combines Aceternity's aurora background with a
 * per-band sine field (H5-Dooring-style) and a starfield sparkle.
 */
export default function AuroraVeilBackground({
  density = 7,
  intensity = 1,
  color = "#22d3ee",
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // complementary warm tint
    const companion = "#a855f7";

    // pre-bake a tiny star canvas for sparkle
    const sparkle = document.createElement("canvas");
    sparkle.width = 256;
    sparkle.height = 256;
    {
      const sctx = sparkle.getContext("2d")!;
      sctx.fillStyle = "rgba(0,0,0,0)";
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const a = 0.3 + Math.random() * 0.7;
        sctx.fillStyle = `rgba(255,255,255,${a * 0.6})`;
        sctx.fillRect(x, y, 1, 1);
      }
    }

    let t0 = performance.now();
    const draw = (now: number) => {
      const t = ((now - t0) / 1000) * intensity;
      // base wash
      ctx.globalCompositeOperation = "source-over";
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#04060f");
      g.addColorStop(0.55, "#070a18");
      g.addColorStop(1, "#02030a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // starfield
      ctx.globalCompositeOperation = "screen";
      const pat = ctx.createPattern(sparkle, "repeat");
      if (pat) ctx.fillStyle = pat;
      ctx.fillRect(0, 0, w, h);

      // aurora curtains
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < density; i++) {
        const phase = i * 1.37;
        const cx = (i / density) * w + Math.sin(t * 0.3 + phase) * 60 + w * 0.05;
        const width = w / density * 1.4;
        const top = h * 0.15 + Math.sin(t * 0.6 + phase) * h * 0.08;
        const bot = h * 0.95;

        // vertical band as a series of horizontal slices
        const slices = 40;
        for (let s = 0; s < slices; s++) {
          const u = s / slices;
          const y = top + (bot - top) * u;
          // horizontal ripple — multiple sines for a "draped" feel
          const ripple =
            Math.sin(u * 6 + t * 1.2 + phase) * 30 +
            Math.sin(u * 13 + t * 0.7 + phase * 2) * 14 +
            Math.cos(u * 21 + t * 0.4) * 6;
          const cxS = cx + ripple;

          const alpha = (1 - Math.abs(u - 0.5) * 1.2) * (0.5 + Math.sin(t + phase) * 0.2);
          const a = Math.max(0, alpha * 0.07);

          // mix two colors
          const mix = 0.5 + 0.5 * Math.sin(t * 0.4 + phase);
          const grad = ctx.createLinearGradient(cxS - width, y, cxS + width, y);
          grad.addColorStop(0, "rgba(0,0,0,0)");
          grad.addColorStop(0.5, i % 2 === 0 ? hexToRgba(color, a) : hexToRgba(companion, a));
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(cxS - width, y, width * 2, (bot - top) / slices + 2);
        }
      }

      // top horizon glow
      ctx.globalCompositeOperation = "screen";
      const horizon = ctx.createLinearGradient(0, 0, 0, h * 0.5);
      horizon.addColorStop(0, hexToRgba(color, 0.15));
      horizon.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = horizon;
      ctx.fillRect(0, 0, w, h * 0.5);

      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [density, intensity, color]);

  return (
    <div className={cn("relative h-[400px] w-full overflow-hidden bg-[#04060f]", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="noise-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.18),transparent_60%)]" />
    </div>
  );
}

function hexToRgba(hex: string, a: number) {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
