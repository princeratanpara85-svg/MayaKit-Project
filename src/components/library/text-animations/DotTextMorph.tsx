"use client";

import React, { useEffect, useRef } from 'react';

const DEFAULT_WORDS = ['WOW', 'LOOP', 'FREE', 'COPY', 'SHIP'];

export default function DotTextMorph({ words = DEFAULT_WORDS, className = '' }: { words?: string[], className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999, on: false });

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, raf: number, wi = 0, pts: [number, number][] = [], parts: any[] = [], dpr = 1;
    const colors = ['#FFFE15', '#E2E8F0', '#163648'];

    const sample = () => {
      if (!w || !h) return;
      const off = document.createElement('canvas');
      off.width = w; 
      off.height = h;
      const o = off.getContext('2d');
      if (!o) return;
      
      o.font = `800 ${Math.min(w * 0.3, h * 0.62)}px Archivo, sans-serif`;
      o.textAlign = 'center'; 
      o.textBaseline = 'middle';
      o.fillStyle = '#fff';
      o.fillText(words[wi], w / 2, h / 2);
      
      const data = o.getImageData(0, 0, w, h).data;
      const gap = Math.max(2, Math.round(Math.sqrt((w * h) / 5000)));
      let raw: [number, number][] = [];
      
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(y * w + x) * 4 + 3] > 128) raw.push([x, y]);
        }
      }
      if (raw.length > 4000) raw = raw.filter(() => Math.random() < 4000 / raw.length);
      pts = raw;
      
      if (!parts.length) {
        parts = pts.map(([x, y]) => ({
          x: Math.random() * w, y: Math.random() * h, tx: x, ty: y,
          vx: 0, vy: 0, c: colors[(Math.random() * colors.length) | 0],
        }));
      } else {
        parts.forEach(p => {
          const [tx, ty] = pts[(Math.random() * pts.length) | 0];
          p.tx = tx; p.ty = ty;
          p.vx += (Math.random() - 0.5) * 7;
          p.vy += (Math.random() - 0.5) * 7;
        });
      }
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = cv.offsetWidth; 
      h = cv.offsetHeight;
      cv.width = w * dpr; 
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sample();
    };
    
    resize();
    const ro = new ResizeObserver(resize); 
    ro.observe(cv);
    if (document.fonts?.ready) document.fonts.ready.then(sample);
    
    const iv = setInterval(() => { wi = (wi + 1) % words.length; sample(); }, 2600);
    
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my, on } = mouse.current;
      for (const p of parts) {
        p.vx = (p.vx + (p.tx - p.x) * 0.055) * 0.88;
        p.vy = (p.vy + (p.ty - p.y) * 0.055) * 0.88;
        if (on) {
          const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
          if (d < 70 && d > 0.1) { 
            const f = ((70 - d) / 70) * 2.4; 
            p.vx += (dx / d) * f; 
            p.vy += (dy / d) * f; 
          }
        }
        p.x += p.vx; 
        p.y += p.vy;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x - 1.3, p.y - 1.3, 2.6, 2.6);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    
    return () => { 
      cancelAnimationFrame(raf); 
      clearInterval(iv); 
      ro.disconnect(); 
    };
  }, [words]);

  const move = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, on: true };
  };

  return (
    <canvas 
      ref={ref} 
      onMouseMove={move} 
      onMouseLeave={() => (mouse.current.on = false)}
      className={`h-full w-full cursor-crosshair ${className}`} 
    />
  );
}
