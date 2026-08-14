"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * AuroraMeshPattern
 * ─────────────────
 * Layered yellow aurora "curtains" warped by a value-noise field. 
 * Standardized to brutalist colors.
 */
export default function AuroraMeshPattern({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const parent = parentRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    // Pre-computed value-noise lattice for cheap FBM.
    const NSIZE = 64;
    const noise = new Float32Array(NSIZE * NSIZE);
    for (let i = 0; i < noise.length; i++) noise[i] = Math.random();

    const noiseAt = (x: number, y: number) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const idx = (xx: number, yy: number) =>
        noise[((yy & (NSIZE - 1)) * NSIZE) + (xx & (NSIZE - 1))];
      const a = idx(xi, yi);
      const b = idx(xi + 1, yi);
      const c = idx(xi, yi + 1);
      const d = idx(xi + 1, yi + 1);
      return (
        a * (1 - u) * (1 - v) +
        b * u * (1 - v) +
        c * (1 - u) * v +
        d * u * v
      );
    };

    const fbm = (x: number, y: number) => {
      let amp = 0.5;
      let freq = 1;
      let sum = 0;
      for (let i = 0; i < 4; i++) {
        sum += amp * noiseAt(x * freq, y * freq);
        amp *= 0.5;
        freq *= 2;
      }
      return sum;
    };

    const resize = () => {
      const r = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    let t0 = performance.now();
    const draw = (now: number) => {
      const t = (now - t0) * 0.0005; // seconds, slow
      ctx.clearRect(0, 0, w, h);

      // background dark fill (#0C1E29)
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#0C1E29");
      bg.addColorStop(1, "#071219");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Three aurora "curtains" — varying opacities of #FFFE15
      const bands = [
        { y0: 0.15, color: "rgba(255,254,21,0.55)" }, // Bright
        { y0: 0.40, color: "rgba(255,254,21,0.35)" }, // Medium
        { y0: 0.65, color: "rgba(255,254,21,0.20)" }, // Faint
      ];

      for (let bi = 0; bi < bands.length; bi++) {
        const band = bands[bi];
        const yBase = band.y0 * h;
        const ampY = h * 0.18;
        const thickness = h * 0.18;

        // Draw a vertical mesh of strands within this band.
        const STRANDS = 110;
        ctx.lineWidth = 1;
        ctx.globalCompositeOperation = "lighter";
        for (let s = 0; s < STRANDS; s++) {
          const x = (s / (STRANDS - 1)) * w;
          // Sample noise field for vertical displacement.
          const nx = x * 0.0035 + t * 0.3 + bi * 4.7;
          const ny = bi * 2.3 - t * 0.4;
          const n = fbm(nx, ny) - 0.5; // -0.5..0.5
          const offsetY = n * ampY;

          const y0 = yBase + offsetY;
          // strand alpha and color depend on its position
          const alpha = 0.06 + 0.18 * Math.abs(fbm(nx * 0.7, ny * 1.1) - 0.5) * 2;
          ctx.strokeStyle = `rgba(255,254,21,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(x, y0 - thickness * 0.5);
          // wavy vertical strand
          for (let k = 1; k <= 12; k++) {
            const yy = y0 - thickness * 0.5 + (k / 12) * thickness;
            const wn = fbm(nx * 1.5, ny + k * 0.18 + t * 0.8);
            ctx.lineTo(x + (wn - 0.5) * 6, yy);
          }
          ctx.stroke();
        }

        // Overlay a soft colored glow shaped like the curtain.
        const grad = ctx.createLinearGradient(0, yBase - thickness, 0, yBase + thickness);
        grad.addColorStop(0, "rgba(12,30,41,0)");
        grad.addColorStop(0.5, band.color);
        grad.addColorStop(1, "rgba(12,30,41,0)");
        ctx.fillStyle = grad;
        // Fill the band area with a soft mask by drawing the glow per strand column
        for (let s = 0; s < STRANDS; s += 2) {
          const x = (s / (STRANDS - 1)) * w;
          const n = fbm(x * 0.0035 + t * 0.3 + bi * 4.7, bi * 2.3 - t * 0.4) - 0.5;
          const cx = x;
          const cy = yBase + n * ampY;
          const r = thickness * 0.7;
          const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          radial.addColorStop(0, band.color);
          radial.addColorStop(1, "rgba(12,30,41,0)");
          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Add a faint moving noise overlay for grain.
      ctx.globalCompositeOperation = "overlay";
      const grainAlpha = 0.1;
      const grainSize = 2;
      for (let i = 0; i < 600; i++) {
        const gx = Math.random() * w;
        const gy = Math.random() * h;
        const a = grainAlpha * Math.random();
        ctx.fillStyle = `rgba(226,232,240,${a})`;
        ctx.fillRect(gx, gy, grainSize, grainSize);
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative h-full min-h-[400px] w-full overflow-hidden rounded-none",
        "bg-[#0C1E29]", className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C1E29]/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-4 left-5 text-xs font-mono uppercase tracking-[0.3em] text-[#FFFE15]/60 font-bold">
        aurora · mesh · 01
      </div>
    </div>
  );
}
