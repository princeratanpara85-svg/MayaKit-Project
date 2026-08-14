"use client";

import { useEffect, useRef } from "react";

export function ImpossibleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const spacing = 45;
    let cols = 0;
    let rows = 0;
    
    // Grid nodes
    let nodes: { x: number, y: number, ox: number, oy: number }[][] = [];

    // Tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;
    let isTouch = false;
    let time = 0;
    
    // Accessibility bounds
    let prefersReducedMotion = false;
    if (typeof window !== "undefined") {
      prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      isTouch = window.matchMedia("(pointer: coarse)").matches;
    }

    const initGrid = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Extra padding so lines flow off edge smoothly
      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          const ox = (c - 1) * spacing;
          const oy = (r - 1) * spacing;
          row.push({ x: ox, y: oy, ox, oy });
        }
        nodes.push(row);
      }
    };

    initGrid();

    const resizeObserver = new ResizeObserver(() => {
      initGrid();
    });
    resizeObserver.observe(canvas.parentElement || canvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = canvas.getBoundingClientRect();
      // Only hover if within the bounds of this canvas vertically
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        isHovering = true;
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      } else {
        isHovering = false;
        mouseX = -1000;
        mouseY = -1000;
      }
    };

    const handleMouseLeave = () => {
      if (isTouch) return;
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      const radius = 180; // Distance of bend influence
      const maxDisplacement = 40; 

      // 1. Update node physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const node = nodes[r][c];
          
          let targetX = node.ox;
          let targetY = node.oy;

          if (!prefersReducedMotion) {
            if (isTouch) {
              // Gentle ambient drift for mobile/coarse
              const dist = Math.sin(node.ox * 0.005 + time) * Math.cos(node.oy * 0.005 + time);
              targetX = node.ox + dist * 15;
              targetY = node.oy + dist * 15;
            } else if (isHovering) {
              const dx = node.ox - mouseX;
              const dy = node.oy - mouseY;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < radius) {
                const falloff = Math.pow(1 - distance / radius, 2); 
                const angle = Math.atan2(dy, dx);
                // Push lines outward from cursor to create "curvature" around it
                targetX = node.ox + Math.cos(angle) * maxDisplacement * falloff;
                targetY = node.oy + Math.sin(angle) * maxDisplacement * falloff;
              }
            }
          }

          // Lerp spring return
          node.x += (targetX - node.x) * 0.12;
          node.y += (targetY - node.y) * 0.12;
        }
      }

      // 2. Draw lines
      ctx.lineWidth = 1;
      const baseColor = "rgba(255, 254, 21, 0.08)"; // border-border equivalent, very low opacity
      ctx.strokeStyle = baseColor;
      
      // Horizontal connections
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        ctx.moveTo(nodes[r][0].x, nodes[r][0].y);
        for (let c = 1; c < cols; c++) {
           ctx.lineTo(nodes[r][c].x, nodes[r][c].y);
        }
      }
      ctx.stroke();

      // Vertical connections
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        ctx.moveTo(nodes[0][c].x, nodes[0][c].y);
        for (let r = 1; r < rows; r++) {
          ctx.lineTo(nodes[r][c].x, nodes[r][c].y);
        }
      }
      ctx.stroke();

      // 3. Ambient accents
      // Occasional bright segments crossing near cursor to emphasize the warp
      if (isHovering && !prefersReducedMotion && !isTouch) {
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const node = nodes[r][c];
            const dx = node.x - mouseX;
            const dy = node.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100 && Math.random() > 0.98) {
               ctx.beginPath();
               ctx.moveTo(node.x, node.y);
               // Connect right
               ctx.lineTo(nodes[r][c+1].x, nodes[r][c+1].y);
               ctx.strokeStyle = `rgba(255, 254, 21, ${0.4 + (1 - dist/100) * 0.4})`; // Brighter #FFFE15
               ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Performance: Only run rAF when section is actually visible
    const observer = new IntersectionObserver((entries) => {
       if (entries[0].isIntersecting) {
         if (!animationFrameId) animationFrameId = requestAnimationFrame(render);
       } else {
         if (animationFrameId) {
           cancelAnimationFrame(animationFrameId);
           animationFrameId = 0; // nullify to prevent duplicates
         }
       }
    }, { rootMargin: "100px" });
    
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" 
    />
  );
}
