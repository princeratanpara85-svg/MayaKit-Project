import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** NeonStormBackground — Electric storm with lightning flashes. */
export default function NeonStormBackground({ className }: { className?: string }) {
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
    let raf = 0;
    type Bolt = { path: { x: number; y: number }[]; life: number; max: number };
    const bolts: Bolt[] = [];
    const makeBolt = (sx: number, sy: number) => {
      const path = [{ x: sx, y: sy }];
      let x = sx, y = sy;
      while (y < h) {
        x += (Math.random() - 0.5) * 40;
        y += 10 + Math.random() * 18;
        path.push({ x, y });
        if (Math.random() < 0.15 && path.length > 2) {
          // branch
          const bx = x, by = y;
          const branch: { x: number; y: number }[] = [];
          let cx = bx, cy = by;
          for (let i = 0; i < 5; i++) {
            cx += (Math.random() - 0.5) * 30; cy += 8 + Math.random() * 12;
            branch.push({ x: cx, y: cy });
          }
          bolts.push({ path: branch, life: 0, max: 8 });
        }
      }
      bolts.push({ path, life: 0, max: 10 });
    };
    const t0 = performance.now();
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "rgba(8,2,30,0.4)"; ctx.fillRect(0, 0, w, h);
      // ambient clouds
      for (let i = 0; i < 8; i++) {
        const cx = ((i * 73 + t * 12) % (w + 200)) - 100;
        const cy = (i * 47) % h;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
        grd.addColorStop(0, "rgba(99,102,241,0.15)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd; ctx.fillRect(cx - 100, cy - 100, 200, 200);
      }
      if (Math.random() < 0.015) makeBolt(Math.random() * w, 0);
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i]; b.life++;
        if (b.life > b.max) { bolts.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(200,210,255,${1 - b.life / b.max})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#a5b4fc"; ctx.shadowBlur = 12;
        ctx.beginPath();
        b.path.forEach((p, j) => j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.shadowBlur = 0;
        // flash overlay
        if (b.life < 2) {
          ctx.fillStyle = "rgba(200,210,255,0.04)"; ctx.fillRect(0, 0, w, h);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#08021e]", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
