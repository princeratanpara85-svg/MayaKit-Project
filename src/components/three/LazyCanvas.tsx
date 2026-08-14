"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export function LazyCanvas({ children, className, ...props }: { children: React.ReactNode, className?: string, camera?: any, [key: string]: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }, { rootMargin: "100% 0px 100% 0px" });

    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full pointer-events-none ${className || ""}`}>
      {!isVisible && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-sm pointer-events-none"></div>
      )}
      {isVisible && <SceneCanvas {...props}>{children}</SceneCanvas>}
    </div>
  );
}
