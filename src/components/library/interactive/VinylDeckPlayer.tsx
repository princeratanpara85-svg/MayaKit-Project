"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

export function VinylDeckPlayer() {
  const rotation = useMotionValue(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const lastAngle = useRef(0);
  const [playing, setPlaying] = useState(false);
  const discRef = useRef<HTMLDivElement>(null);

  const getAngle = (clientX: number, clientY: number) => {
    if (!discRef.current) return 0;
    const rect = discRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastAngle.current = getAngle(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const angle = getAngle(e.clientX, e.clientY);
    let delta = angle - lastAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    rotation.set(rotation.get() + delta);
    velocity.current = delta;
    lastAngle.current = angle;
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  useAnimationFrame(() => {
    if (dragging.current) return;
    if (playing) {
      // settle toward a steady playback speed
      velocity.current += (2.2 - velocity.current) * 0.02;
    } else {
      // friction decay when paused/released
      velocity.current *= 0.96;
    }
    if (Math.abs(velocity.current) > 0.001) {
      rotation.set(rotation.get() + velocity.current);
    }
  });

  const togglePlay = () => setPlaying((p) => !p);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-16 bg-[#0C1E29] rounded-2xl w-full min-h-[500px] font-sans">
      <div className="relative w-72 h-72">
        {/* tonearm */}
        <motion.div
          className="absolute -right-6 -top-6 w-32 h-32 origin-top-right z-20"
          animate={{ rotate: playing ? 24 : -18 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          style={{ transformOrigin: "90% 10%" }}
        >
          <div className="absolute right-2 top-2 w-2 h-24 bg-gradient-to-b from-neutral-400 to-neutral-600 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
          <div className="absolute right-0 bottom-0 w-5 h-5 rounded-full bg-neutral-300 shadow-md" />
        </motion.div>

        {/* record disc */}
        <motion.div
          ref={discRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ rotate: rotation }}
          className="relative w-72 h-72 rounded-full cursor-grab active:cursor-grabbing shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "repeating-radial-gradient(circle at center, #111 0px, #111 2px, #000 3px, #000 4px)",
            }}
          />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
          {/* label */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* MayaKit Theme Label */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFFE15] to-[#E6E513] flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
              <span className="text-[10px] font-black text-black tracking-widest text-center leading-tight">
                SIDE A<br />TRACK 01
              </span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0C1E29] shadow-inner" />
          </div>
          {/* motion streak highlight, only visible while spinning fast */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.08) 8%, transparent 16%)",
            }}
            animate={{ opacity: playing ? [0.4, 0.8, 0.4] : 0.1 }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      <button
        onClick={togglePlay}
        // MayaKit Button
        className="px-8 py-3 rounded-full bg-[#FFFE15] text-black font-black uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(255,254,21,0.4)] transition-all"
      >
        {playing ? "Pause" : "Drop the needle"}
      </button>
      <p className="text-white/40 text-xs font-medium">Or drag the record directly — it has real momentum.</p>
    </div>
  );
}
