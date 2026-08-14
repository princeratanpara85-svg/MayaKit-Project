import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** EtherFieldPattern — Generative vector field with luminous threads.
 *  Mix: H5-Dooring 流场 (flow field) + 21st.dev shader warp + Magic UI warp. */
export default function EtherFieldPattern({ className }: { className?: string }) {
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
    type P = { x: number; y: number; life: number; max: number; hue: number };
    const particles: P[] = [];
    const spawn = () => {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          life: 0, max: 80 + Math.random() * 60,
          hue: 180 + Math.random() * 180,
        });
      }
    };
    const t0 = performance.now();
    let raf = 0;
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "rgba(5,5,15,0.18)"; ctx.fillRect(0, 0, w, h);
      if (particles.length < 400) spawn();
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.life++;
        const a = p.life / p.max;
        if (a >= 1) { p.x = Math.random() * w; p.y = Math.random() * h; p.life = 0; p.max = 80 + Math.random() * 60; continue; }
        const angle = Math.sin(p.x * 0.005 + t) + Math.cos(p.y * 0.005 - t * 0.7);
        p.x += Math.cos(angle * 2) * 1.6;
        p.y += Math.sin(angle * 2) * 1.6;
        ctx.strokeStyle = `hsla(${p.hue},90%,60%,${(1 - a) * 0.5})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(angle * 2) * 8, p.y - Math.sin(angle * 2) * 8);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#05050f]", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
