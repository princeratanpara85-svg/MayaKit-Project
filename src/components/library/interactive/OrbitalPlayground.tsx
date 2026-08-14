"use client";
import { useEffect, useRef } from "react";

export default function OrbitalPlayground() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t = 0;
    let raf: number;

    const animate = () => {
      t += 0.016;
      if (container.current) {
        const elements = container.current.querySelectorAll('.creature');
        elements.forEach((c: any, i) => {
          const radius = 80 + i * 28 + Math.sin(t * 0.4 + i) * 18;
          const speed = 0.3 + i * 0.07;
          const angle = t * speed + i * 1.2;

          const wobbleX = Math.sin(t * 1.7 + i * 2) * 12;
          const wobbleY = Math.cos(t * 1.3 + i * 1.5) * 10;

          const x = Math.cos(angle) * radius + wobbleX;
          const y = Math.sin(angle) * radius * 0.65 + wobbleY;

          c.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${1 + Math.sin(t * 3 + i) * 0.3})`;
        });
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={container}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden bg-[#0C1E29]"
    >
      <div className="absolute w-24 h-24 rounded-full bg-primary/10 blur-3xl" />
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="creature absolute top-1/2 left-1/2 w-3 h-3 rounded-full mix-blend-screen pointer-events-none"
          style={{
            background: i % 2 === 0 ? "#FFFE15" : "#E2E8F0",
            boxShadow: "0 0 12px 4px #FFFE15",
          }}
        />
      ))}
    </div>
  );
}
