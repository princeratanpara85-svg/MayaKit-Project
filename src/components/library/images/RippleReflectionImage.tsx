"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function RippleReflectionImage() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Start the ripple in the center initially (estimated 200, 200 for a 400x400 container)
  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const springX = useSpring(x, { stiffness: 50, damping: 10 });
  const springY = useSpring(y, { stiffness: 50, damping: 10 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || !ref.current) return;
    
    // Idle auto-sway
    let frame: number;
    let time = 0;
    const animate = () => {
      const rect = ref.current!.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      time += 0.02;
      x.set(centerX + Math.sin(time) * 40);
      y.set(centerY + Math.cos(time * 0.7) * 20);
      
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [isHovered, x, y]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={ref} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full min-h-[400px] relative overflow-hidden rounded-none bg-[#0C1E29]"
    >
      <img 
        src="https://picsum.photos/800/600?6" 
        alt="Top Half"
        className="absolute top-0 w-full h-1/2 object-cover" 
      />
      
      <div className="absolute bottom-0 w-full h-1/2 bg-[#163648] flex items-center justify-center text-[#E2E8F0] font-mono text-xs tracking-widest border-t border-[#0C1E29]">
        RIPPLE SURFACE
      </div>
      
      <motion.div
        className="absolute top-0 left-0 mix-blend-overlay pointer-events-none rounded-full -ml-10 -mt-10"
        style={{
          width: 80,
          height: 80,
          x: springX,
          y: springY,
          background: 'radial-gradient(circle, rgba(255,254,21,0.4) 0%, transparent 70%)',
        }}
      />
      
      <span className="absolute bottom-4 right-4 text-[#E2E8F0] font-mono text-xs bg-[#0C1E29] px-3 py-1 border border-[#163648] pointer-events-none uppercase tracking-widest z-10 transition-opacity duration-300">
        MOVE CURSOR
      </span>
    </div>
  );
}
