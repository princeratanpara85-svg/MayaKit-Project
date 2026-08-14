import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Magnet, Move } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MagneticDragField — draggable orbs in a field of magnetic field-lines.
 * The cursor acts as a magnet, and orbs spring toward it; release to throw
 * them — they drift back, bending space along invisible flux lines.
 *
 * Mix: Hover.dev magnetic micro-interactions + Aceternity 3D card + React Bits blob.
 */

interface Orb {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  dragging: boolean;
  mass: number;
}

const INITIAL: Omit<Orb, "id">[] = [
  { x: 0.18, y: 0.32, vx: 0, vy: 0, hue: 280, dragging: false, mass: 1 },
  { x: 0.78, y: 0.30, vx: 0, vy: 0, hue: 200, dragging: false, mass: 1 },
  { x: 0.30, y: 0.72, vx: 0, vy: 0, hue: 340, dragging: false, mass: 1 },
  { x: 0.68, y: 0.70, vx: 0, vy: 0, hue: 40, dragging: false, mass: 1 },
  { x: 0.50, y: 0.50, vx: 0, vy: 0, hue: 160, dragging: false, mass: 1 },
];

export default function MagneticDragField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>(INITIAL.map((o, i) => ({ ...o, id: i })));
  const dragRef = useRef<{ id: number | null; ox: number; oy: number }>({ id: null, ox: 0, oy: 0 });
  const mouseRef = useRef({ x: 0, y: 0, active: false, downId: -1 });
  const [intensity, setIntensity] = useState(1);

  // rAF physics + field lines
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = wrap.clientWidth * dpr;
      canvas.height = wrap.clientHeight * dpr;
      canvas.style.width = wrap.clientWidth + "px";
      canvas.style.height = wrap.clientHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const tick = () => {
      time += 0.016;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      ctx.fillStyle = "rgba(7, 5, 18, 0.35)";
      ctx.fillRect(0, 0, w, h);

      // Draw magnetic field lines (sinusoidal)
      ctx.lineWidth = 1;
      for (let i = 0; i < 14; i++) {
        const yy = (i + 0.5) * (h / 14);
        const amp = 18 + Math.sin(time * 0.6 + i) * 6;
        ctx.strokeStyle = `hsla(${(i * 26) % 360}, 80%, 60%, 0.05)`;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = yy + Math.sin(x * 0.012 + time * 0.6 + i) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Physics
      const orbs = orbsRef.current;
      for (const o of orbs) {
        if (o.dragging) {
          // The drag handler sets position directly
          o.vx = 0;
          o.vy = 0;
          continue;
        }
        // Field force toward center + slight orbit
        const cx = w * 0.5;
        const cy = h * 0.5;
        const dx = cx - o.x;
        const dy = cy - o.y;
        const d = Math.hypot(dx, dy) + 0.001;
        o.vx += (dx / d) * 0.05 + Math.cos(time * 0.4 + o.hue) * 0.04;
        o.vy += (dy / d) * 0.05 + Math.sin(time * 0.5 + o.hue) * 0.04;
        // Cursor pull (when not over an orb being dragged)
        if (mouseRef.current.active) {
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const mdx = mx - o.x;
          const mdy = my - o.y;
          const md = Math.hypot(mdx, mdy) + 0.001;
          if (md < 220) {
            const pull = (1 - md / 220) * 0.6 * intensity;
            o.vx += (mdx / md) * pull;
            o.vy += (mdy / md) * pull;
          }
        }
        // Damping + integrate
        o.vx *= 0.92;
        o.vy *= 0.92;
        o.x += o.vx;
        o.y += o.vy;
        // Soft bounds
        const m = 30;
        if (o.x < m) o.vx += 0.4;
        if (o.x > w - m) o.vx -= 0.4;
        if (o.y < m) o.vy += 0.4;
        if (o.y > h - m) o.vy -= 0.4;
      }

      // Orbs on canvas (with glow)
      ctx.globalCompositeOperation = "lighter";
      for (const o of orbs) {
        const grd = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, 60);
        grd.addColorStop(0, `hsla(${o.hue}, 100%, 70%, 0.9)`);
        grd.addColorStop(0.4, `hsla(${o.hue}, 100%, 60%, 0.25)`);
        grd.addColorStop(1, `hsla(${o.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(o.x, o.y, 60, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [intensity]);

  const onMove = (e: React.PointerEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.active = true;
    const drag = dragRef.current;
    if (drag.id !== null) {
      const orb = orbsRef.current[drag.id];
      if (orb) {
        orb.x = x;
        orb.y = y;
      }
    }
  };
  const onLeave = () => {
    mouseRef.current.active = false;
    dragRef.current.id = null;
  };

  const startDrag = (id: number) => (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current.id = id;
    orbsRef.current[id].dragging = true;
  };
  const endDrag = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (dragRef.current.id !== null) {
      orbsRef.current[dragRef.current.id].dragging = false;
    }
    dragRef.current.id = null;
  };

  const reset = () => {
    orbsRef.current = INITIAL.map((o, i) => ({ ...o, id: i }));
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "relative h-[380px] w-full overflow-hidden rounded-xl",
        "bg-[radial-gradient(circle_at_center,_#0d0a24_0%,_#03030a_70%)]"
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Draggable orb handles (transparent, on top) */}
      {orbsRef.current.map((o, i) => (
        <motion.button
          key={o.id}
          onPointerDown={startDrag(i)}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="absolute z-10 cursor-grab active:cursor-grabbing"
          style={{
            left: o.x - 26,
            top: o.y - 26,
            width: 52,
            height: 52,
          }}
          animate={{
            scale: o.dragging ? 1.4 : 1,
            rotate: o.dragging ? 180 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span
            className="block h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, hsl(${o.hue}, 100%, 80%), hsl(${o.hue}, 100%, 50%))`,
              boxShadow: `0 0 30px hsl(${o.hue}, 100%, 60%)`,
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/90">
            {i + 1}
          </span>
        </motion.button>
      ))}

      {/* Top HUD */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/80 backdrop-blur">
        <Magnet size={12} className="text-cyan-400" />
        Magnetic field · drag the orbs
      </div>

      {/* Intensity slider */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur">
        <span className="text-[10px] uppercase tracking-wider text-white/60">Field</span>
        <input
          type="range"
          min={0}
          max={2.5}
          step={0.05}
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="h-1 w-24 accent-cyan-400"
        />
        <span className="w-8 text-[10px] text-white/70">{intensity.toFixed(2)}</span>
        <button
          onClick={reset}
          className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/70 hover:bg-white/10"
        >
          reset
        </button>
      </div>

      <div className="absolute right-4 bottom-4 z-20 flex items-center gap-1.5 text-[10px] text-white/40">
        <Move size={10} />
        {orbsRef.current.length} particles
      </div>
    </div>
  );
}
