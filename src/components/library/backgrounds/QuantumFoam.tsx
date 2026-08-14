"use client";
import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function QuantumFoam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let bubbles: Bubble[] = [];
    let animationId: number;
    let logicalW = 800;
    let logicalH = 500;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      logicalW = rect.width || canvas.clientWidth || window.innerWidth;
      logicalH = rect.height || canvas.clientHeight || window.innerHeight;
      
      canvas.width = logicalW * dpr;
      canvas.height = logicalH * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    const spawn = () => {
      if (bubbles.length > 80) return;
      bubbles.push({
        x: Math.random() * logicalW,
        y: Math.random() * logicalH,
        r: 2 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 150 + Math.random() * 200,
      });
    };

    const loop = () => {
      ctx.fillStyle = "rgba(12, 30, 41, 0.25)";
      ctx.fillRect(0, 0, logicalW, logicalH);

      if (Math.random() < 0.4) spawn();

      // Update positions & physics
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i];
          const b = bubbles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && dist < a.r + b.r + 20) {
            a.vx += (dx / dist) * 0.01;
            a.vy += (dy / dist) * 0.01;
            b.vx -= (dx / dist) * 0.01;
            b.vy -= (dy / dist) * 0.01;
          }
        }
      }

      // Draw and safely splice backwards
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life++;
        b.x += b.vx;
        b.y += b.vy;
        b.r += 0.05;

        // safe bounds bounce
        if (b.x < 0) { b.x = 0; b.vx *= -1; }
        if (b.x > logicalW) { b.x = logicalW; b.vx *= -1; }
        if (b.y < 0) { b.y = 0; b.vy *= -1; }
        if (b.y > logicalH) { b.y = logicalH; b.vy *= -1; }

        const alpha = Math.max(0, 1 - b.life / b.maxLife);
        
        try {
          const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          gradient.addColorStop(0, `rgba(255, 254, 21, ${alpha * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255, 254, 21, ${alpha * 0.3})`);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } catch (e) {
          // ignore gradient errors during rapid resize
        }

        if (b.life >= b.maxLife || b.r > 80) {
          try {
            for (let s = 0; s < 6; s++) {
              const angle = (s / 6) * Math.PI * 2;
              ctx.beginPath();
              ctx.arc(
                b.x + Math.cos(angle) * b.r * 0.6,
                b.y + Math.sin(angle) * b.r * 0.6,
                1.5,
                0,
                Math.PI * 2
              );
              ctx.fillStyle = `rgba(255, 254, 21, ${alpha})`;
              ctx.fill();
            }
          } catch(e) {}
          bubbles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="relative w-full h-full pointer-events-none"
    />
  );
}
