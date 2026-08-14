"use client";

import React, { useRef, useState, useEffect } from "react";

/**
 * LazyComponent wrapper uses IntersectionObserver to completely unmount
 * heavy physics/animation components when they are scrolled out of view.
 * This drastically reduces time/space complexity (CPU/GPU usage) by
 * pausing off-screen GSAP/Framer renders.
 */
export function LazyComponent({ 
  children,
  fallback = <div className="w-full h-full bg-muted/20 animate-pulse rounded-sm" />,
  rootMargin = "200px" // Load slightly before it enters screen
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Toggle visibility based on intersection state
        setIsVisible(entry.isIntersecting);
      });
    }, { rootMargin });

    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isVisible ? children : fallback}
    </div>
  );
}
