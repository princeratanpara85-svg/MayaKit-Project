"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticTrailImage() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [trail, setTrail] = useState<{x:number,y:number,id:number}[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Idle auto-sway when not hovered
    if (isHovered) return;
    let frame: number;
    let time = 0;
    const animate = () => {
      time += 0.02;
      x.set(Math.sin(time) * 10);
      y.set(Math.cos(time * 0.8) * 10);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [isHovered, x, y]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width/2;
    const dy = e.clientY - rect.top - rect.height/2;
    x.set(dx * 0.3);
    y.set(dy * 0.3);
    const newTrail = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top, 
      id: Date.now() + Math.random() 
    };
    setTrail(prev => [...prev, newTrail]);
    setTimeout(() => {
      setTrail(prev => prev.filter(t => t.id !== newTrail.id));
    }, 800);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => { 
        setIsHovered(false);
      }}
      className="relative w-full h-full min-h-[400px] rounded-none overflow-hidden bg-[#0C1E29]"
    >
      <motion.img
        src="https://picsum.photos/800/600?3"
        alt="Magnetic"
        style={{ x: springX, y: springY }}
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
      
      {trail.map(t => (
        <span 
          key={t.id} 
          className="absolute w-3 h-3 bg-[#FFFE15] rounded-none animate-ping opacity-80 pointer-events-none" 
          style={{ left: t.x - 6, top: t.y - 6 }} 
        />
      ))}
      
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#163648] px-3 py-1 border border-[#0C1E29] pointer-events-none uppercase tracking-widest z-10 transition-opacity duration-300">
        MOVE CURSOR
      </span>
    </div>
  );
}
