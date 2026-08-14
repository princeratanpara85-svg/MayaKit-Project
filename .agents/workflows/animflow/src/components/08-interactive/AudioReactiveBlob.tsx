import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

/** AudioReactiveBlob — Microphone-driven blob using Web Audio API. */
export default function AudioReactiveBlob({ className }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const stateRef = useRef({ audioCtx: null as AudioContext | null, analyser: null as AnalyserNode | null, data: null as Uint8Array | null, level: 0 });

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
    const draw = () => {
      const lvl = stateRef.current.level;
      ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 6; i++) {
        const r = 40 + lvl * 200 + i * 18;
        const hue = 280 + i * 25 + lvl * 80;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grd.addColorStop(0, `hsla(${hue},90%,60%,${0.5 - i * 0.07})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  const toggle = async () => {
    if (active) {
      stateRef.current.audioCtx?.close().catch(() => {});
      stateRef.current = { audioCtx: null, analyser: null, data: null, level: 0 };
      setActive(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      stateRef.current = { audioCtx, analyser, data, level: 0 };
      const tick = () => {
        if (!stateRef.current.analyser) return;
        stateRef.current.analyser.getByteFrequencyData(stateRef.current.data!);
        const sum = stateRef.current.data!.reduce((a, b) => a + b, 0);
        stateRef.current.level = sum / stateRef.current.data!.length / 255;
        requestAnimationFrame(tick);
      };
      tick();
      setActive(true);
    } catch (e) {
      console.warn("mic denied", e);
    }
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-black flex items-center justify-center", className)}>
      <canvas ref={cv} className="absolute inset-0 w-full h-full" />
      <button onClick={toggle} className="relative z-10 rounded-full bg-white/10 backdrop-blur p-3 text-white border border-white/20">
        {active ? <Mic size={20} className="text-emerald-300" /> : <MicOff size={20} />}
      </button>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50">
        {active ? "Make some noise" : "Click to enable mic"}
      </p>
    </div>
  );
}
