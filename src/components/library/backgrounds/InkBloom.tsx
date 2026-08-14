"use client";
import { useEffect, useState } from "react";

const COLORS = [
  "rgba(255, 254, 21, 0.4), rgba(255, 254, 21, 0.2), transparent",
  "rgba(226, 232, 240, 0.35), rgba(22, 54, 72, 0.2), transparent",
];

export default function InkBloom() {
  const [blobs, setBlobs] = useState<
    { id: number; x: number; y: number; scale: number; rot: number; color: string }[]
  >([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      setBlobs((prev) => {
        const next = [
          ...prev.slice(-12),
          {
            id: id++,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            scale: 0.4 + Math.random() * 1.4,
            rot: Math.random() * 360,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          },
        ];
        return next;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0C1E29]">
      {blobs.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            transform: `translate(-50%, -50%) scale(${b.scale}) rotate(${b.rot}deg)`,
          }}
        >
          <div
            className="w-64 h-64 rounded-full blur-2xl animate-ink-bloom"
            style={{ background: `radial-gradient(circle, ${b.color})` }}
          />
        </div>
      ))}
    </div>
  );
}
