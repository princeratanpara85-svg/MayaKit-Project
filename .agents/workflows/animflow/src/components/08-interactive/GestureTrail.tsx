import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** GestureTrail — Trail of gestures (mouse-paint canvas). */
export default function GestureTrail({ className }: { className?: string }) {
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
    type D = { x: number; y: number; t: number; hue: number };
    const points: D[] = [];
    let raf = 0; let hue = 0;
    let drawing = false;
    const onDown = (e: PointerEvent) => { drawing = true; onMove(e); };
    const onUp = () => { drawing = false; };
    const onMove = (e: PointerEvent) => {
      if (!drawing) return;
      const r = c.getBoundingClientRect();
      points.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now(), hue: hue });
      hue = (hue + 6) % 360;
    };
    c.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    c.addEventListener("pointermove", onMove);
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,15,0.08)"; ctx.fillRect(0, 0, w, h);
      const now = performance.now();
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1], b = points[i];
        const age = (now - b.t) / 1500;
        if (age > 1) continue;
        ctx.strokeStyle = `hsla(${b.hue},90%,60%,${1 - age})`;
        ctx.lineWidth = (1 - age) * 18;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      // remove old
      while (points.length && (now - points[0].t) > 1500) points.shift();
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); c.removeEventListener("pointerdown", onDown); window.removeEventListener("pointerup", onUp); c.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#05050f] cursor-crosshair", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /><div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50 pointer-events-none">Click & drag to paint</div></div>;
}
