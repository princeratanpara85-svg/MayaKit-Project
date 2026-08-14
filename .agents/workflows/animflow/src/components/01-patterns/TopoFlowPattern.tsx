import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** TopoFlowPattern — Animated topographic contour lines flowing in a flow field.
 *  Mix: H5-Dooring 拓扑 + Magic UI ripples + 21st.dev shader flow. */
export default function TopoFlowPattern({ className }: { className?: string }) {
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
    const t0 = performance.now();
    let raf = 0;
    const draw = () => {
      const t = (performance.now() - t0) * 0.001;
      ctx.fillStyle = "rgba(3,7,18,0.4)"; ctx.fillRect(0, 0, w, h);
      const levels = 18;
      ctx.lineWidth = 0.8;
      for (let l = 1; l < levels; l++) {
        const target = l / levels;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const n = (Math.sin(x * 0.012 + t + l * 0.3) + Math.cos(x * 0.018 - t * 0.6 + l * 0.2)) * 0.5;
          const y = h / 2 + n * (h * 0.4) + (target - 0.5) * h * 0.6;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const hue = 200 + l * 12;
        ctx.strokeStyle = `hsla(${hue},90%,60%,${0.15 + (l / levels) * 0.3})`;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <div className={cn("relative w-full h-full overflow-hidden bg-[#030712]", className)}><canvas ref={cv} className="absolute inset-0 w-full h-full" /></div>;
}
