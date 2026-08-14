"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export default function RecursiveWindowDemo({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.set(".recursive-layer", { clearProps: "all" });

    const tl = gsap.timeline({
      repeat: -1,
    });

    const eases = ["power1.out", "power2.out", "power3.out", "power4.out", "expo.out"];
    const durations = [0.9, 1.0, 1.1, 1.2, 1.4];

    for (let i = 0; i < 5; i++) {
      tl.fromTo(`.layer-${i}`, 
        { 
          scale: 0.85, 
          opacity: 0, 
          borderColor: "rgba(255, 254, 21, 0)"
        },
        { 
          scale: 1, 
          opacity: 1, 
          borderColor: "rgba(255, 254, 21, 1)",
          duration: durations[i], 
          ease: eases[i] 
        }, 
        i === 0 ? 0.1 : `-=${durations[i-1] * 0.7}`
      );

      tl.to(`.layer-${i}`, {
        borderColor: "rgba(255, 254, 21, 0.15)",
        duration: 0.8,
        ease: "sine.inOut"
      }, `>-0.2`); 
    }

    tl.to({}, { duration: 1.8 });

    tl.to(".recursive-layer", {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.05
    });

    gsap.to(".core-dot", {
      scale: 1.5,
      opacity: 0.5,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { scope: container, dependencies: [prefersReducedMotion] });

  const renderLayer = (depth: number): React.ReactNode => {
    if (depth === 4) {
      return (
        <div className={`recursive-layer layer-${depth} w-full h-full border border-border bg-background rounded-sm flex items-center justify-center relative shadow-2xl overflow-hidden`}>
           <div className="flex flex-col items-center gap-3">
             <div className="core-dot w-3 h-3 bg-primary rounded-full"></div>
             <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">Core</span>
           </div>
        </div>
      );
    }
    
    return (
      <div className={`recursive-layer layer-${depth} w-full h-full border border-border bg-muted/40 rounded-sm p-4 sm:p-6 md:p-8 lg:p-12 relative shadow-lg overflow-hidden`}>
        {renderLayer(depth + 1)}
      </div>
    );
  };

  return (
    <div ref={container} className={cn("w-full h-full flex items-center justify-center overflow-hidden p-8", className)}>
      <div className="w-full h-full relative">
        {renderLayer(0)}
      </div>
    </div>
  );
}
