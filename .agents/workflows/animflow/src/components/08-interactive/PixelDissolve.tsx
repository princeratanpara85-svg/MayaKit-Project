import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** PixelDissolve — Image/text dissolves to pixels on click. */
export default function PixelDissolve({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = wrap.current!;
    const off = document.createElement("canvas");
    const octx = off.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    type P = { x: number; y: number; vx: number; vy: number; a: number; hue: number };
    let pixels: P[] = [];
    let dispersed = false;
    const render = () => {
      w = c.clientWidth; h = c.clientHeight;
      off.width = w; off.height = h;
      // gradient + text
      const grd = octx.createLinearGradient(0, 0, w, h);
      grd.addColorStop(0, "#a855f7"); grd.addColorStop(1, "#22d3ee");
      octx.fillStyle = grd; octx.fillRect(0, 0, w, h);
      octx.fillStyle = "white";
      octx.font = "bold 64px Inter";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText("PIXEL", w / 2, h / 2 - 16);
      octx.font = "bold 22px Inter";
      octx.fillText("click to dissolve", w / 2, h / 2 + 32);
    };
    render();
    const ctx = (c.getContext("2d"))!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const sample = () => {
      pixels = [];
      const step = 6;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const d = octx.getImageData(x, y, 1, 1).data;
          if (d[3] > 100) {
            pixels.push({ x, y, vx: 0, vy: 0, a: 1, hue: 0 });
          }
        }
      }
    };
    sample();
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(0, 0, w, h);
      for (const p of pixels) {
        if (dispersed) {
          p.vy += 0.1; p.x += p.vx; p.y += p.vy; p.a *= 0.985;
          if (p.y > h + 20) p.a = 0;
        }
        if (p.a > 0.05) {
          ctx.fillStyle = `rgba(255,255,255,${p.a})`;
          ctx.fillRect(p.x, p.y, 4, 4);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onClick = () => {
      if (!dispersed) {
        dispersed = true;
        for (const p of pixels) {
          p.vx = (Math.random() - 0.5) * 12;
          p.vy = (Math.random() - 1) * 8;
        }
        setTimeout(() => { dispersed = false; sample(); }, 2000);
      }
    };
    c.addEventListener("click", onClick);
    const onResize = () => { render(); sample(); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); c.removeEventListener("click", onClick); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-black cursor-crosshair", className)}><canvas ref={wrap} className="absolute inset-0 w-full h-full" /></div>;
}
