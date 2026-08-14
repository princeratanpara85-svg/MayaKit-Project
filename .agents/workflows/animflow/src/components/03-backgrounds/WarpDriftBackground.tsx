import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Number of stars in the field. */
  density?: number;
  /** Drift speed multiplier. */
  intensity?: number;
  /** Tint of the warm half of the warp palette. */
  color?: string;
  className?: string;
};

/**
 * WarpDriftBackground — the homepage hero background.
 *
 * A 3D-projected starfield that streaks toward the camera, with a
 * magenta→cyan→white recolor curve as stars get closer (Magic UI's warp
 * background + Aceternity's glowing stars + a hand-rolled aurora tint).
 * The faint aurora gradient adds depth and avoids a flat black void.
 */
export default function WarpDriftBackground({
  density = 1600,
  intensity = 1,
  color = "#ff4d8d",
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    type Star = { x: number; y: number; z: number; pz: number; hueShift: number };
    const stars: Star[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < density; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width,
          y: (Math.random() - 0.5) * height,
          z: Math.random() * width,
          pz: 0,
          hueShift: Math.random() * 0.4 - 0.2,
        });
      }
    };

    resize();
    initStars();
    const onResize = () => {
      resize();
      initStars();
    };
    window.addEventListener("resize", onResize);

    let last = performance.now();
    const speed = 18 * intensity; // px/frame base

    const draw = (now: number) => {
      const dt = Math.min(48, now - last) / 16.6667; // normalize to 60fps
      last = now;

      // soft motion-trail fade (instead of full clear for a ghostly smear)
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= speed * dt;

        // wrap forward so the field is endless
        if (s.z < 1) {
          s.x = (Math.random() - 0.5) * width;
          s.y = (Math.random() - 0.5) * height;
          s.pz = s.z = width;
          continue;
        }

        const fov = 320;
        const sx = (s.x / s.z) * fov + cx;
        const sy = (s.y / s.z) * fov + cy;
        const px = (s.x / s.pz) * fov + cx;
        const py = (s.y / s.pz) * fov + cy;

        if (sx < 0 || sx > width || sy < 0 || sy > height) continue;

        // proximity 0 (far) -> 1 (close)
        const prox = 1 - s.z / width;
        const streakLen = Math.max(2, (1 - prox) * 90 + 6);

        // Recolor curve: far = deep magenta, mid = cyan, near = white
        // We lerp between two anchor palettes using prox.
        const t = prox;
        let r: number, g: number, b: number;
        if (t < 0.5) {
          // magenta (#ff4d8d) -> cyan (#22d3ee)
          const k = t / 0.5;
          r = 255 + (34 - 255) * k;
          g = 77 + (211 - 77) * k;
          b = 141 + (238 - 141) * k;
        } else {
          // cyan (#22d3ee) -> white (#ffffff)
          const k = (t - 0.5) / 0.5;
          r = 34 + (255 - 34) * k;
          g = 211 + (255 - 211) * k;
          b = 238 + (255 - 238) * k;
        }

        const alpha = Math.min(1, 0.2 + prox * 0.95);
        ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, prox * 1.8);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // bright head dot for nearby stars
        if (prox > 0.55) {
          const headAlpha = (prox - 0.55) / 0.45;
          ctx.fillStyle = `rgba(255, 255, 255, ${headAlpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.6, prox * 1.6), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // aurora tint that breathes slowly
      const t = now * 0.00018;
      const aurora = ctx.createRadialGradient(
        cx + Math.cos(t) * width * 0.25,
        cy + Math.sin(t * 1.3) * height * 0.2,
        40,
        cx,
        cy,
        Math.max(width, height) * 0.7,
      );
      aurora.addColorStop(0, "rgba(255, 77, 141, 0.18)");
      aurora.addColorStop(0.5, "rgba(34, 211, 238, 0.06)");
      aurora.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, width, height);

      // warm core tint from `color` prop
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.45);
      core.addColorStop(0, color + "22");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, width, height);

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
    <div className={cn("relative h-[420px] w-full overflow-hidden bg-black", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* faint vignette + grain so it doesn't read as a flat black rectangle */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />
      <div className="noise-bg pointer-events-none absolute inset-0" />
    </div>
  );
}
