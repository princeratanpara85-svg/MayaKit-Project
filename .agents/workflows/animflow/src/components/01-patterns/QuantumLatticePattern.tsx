import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** QuantumLatticePattern — Quantum-dot lattice with periodic pulse traveling across it.
 *  Mix: React Bits Grid + H5-Dooring 点阵 (dot matrix) + Magic UI pulse. */
export default function QuantumLatticePattern({ className }: { className?: string }) {
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
    const step = 22, t0 = performance.now();
    let raf = 0;
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "#020409"; ctx.fillRect(0, 0, w, h);
      const cols = Math.ceil(w / step), rows = Math.ceil(h / step);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * step + step / 2, y = j * step + step / 2;
          const wave = Math.sin((i + j) * 0.5 - t * 2) * 0.5 + 0.5;
          const r = 1 + wave * 3.5;
          const hue = (i + j) * 8 + t * 30;
          ctx.fillStyle = `hsla(${hue},90%,60%,${0.3 + wave * 0.7})`;
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
          // crosshair on hot dots
          if (wave > 0.85) {
            ctx.strokeStyle = `hsla(${hue},90%,70%,${wave * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y);
            ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
