"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function RecursiveWindow() {
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

    // Reset inline styles that might interfere on hot reload
    gsap.set(".recursive-layer", { clearProps: "all" });

    const tl = gsap.timeline({
      repeat: -1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    const eases = ["power1.out", "power2.out", "power3.out", "power4.out", "expo.out"];
    const durations = [0.9, 1.0, 1.1, 1.2, 1.4];

    for (let i = 0; i < 5; i++) {
      tl.fromTo(`.layer-${i}`, 
        { 
          scale: 0.85, 
          opacity: 0, 
          borderColor: "rgba(255, 254, 21, 0)" // transparent primary
        },
        { 
          scale: 1, 
          opacity: 1, 
          borderColor: "rgba(255, 254, 21, 1)", // solid primary flash
          duration: durations[i], 
          ease: eases[i] 
        }, 
        i === 0 ? 0.1 : `-=${durations[i-1] * 0.7}` // overlap
      );

      tl.to(`.layer-${i}`, {
        borderColor: "rgba(255, 254, 21, 0.15)", // fades back to border-border
        duration: 0.8,
        ease: "sine.inOut"
      }, `>-0.2`); 
    }

    // Hold at the end of the reveal cycle
    tl.to({}, { duration: 1.8 });

    // Clean fade-out reset before the next cycle
    tl.to(".recursive-layer", {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.05
    });

    // Independent continuous pulsing animation for the core dot
    gsap.to(".core-dot", {
      scale: 1.5,
      opacity: 0.5,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

  }, { scope: container, dependencies: [prefersReducedMotion] });

  // Recursive wrapper generator
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
    
    // Each outer layer adds padding, nesting the next layer deeper inside
    return (
      <div className={`recursive-layer layer-${depth} w-full h-full border border-border bg-muted/40 rounded-sm p-4 sm:p-6 md:p-8 lg:p-12 relative shadow-lg overflow-hidden`}>
        {renderLayer(depth + 1)}
      </div>
    );
  };

  return (
    <section ref={container} className="w-full bg-background px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-4">NESTED MOTION</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Depth through recursion.
          </h2>
          <p className="font-body text-lg text-foreground/70">
            A composition demonstrating complex nested sequencing. Each frame operates on its own easing curve, decoupling outer and inner state.
          </p>
        </div>

        {/* The Window Composition */}
        <div className="w-full aspect-square md:aspect-video max-h-[650px] relative">
          {renderLayer(0)}
        </div>
        
      </div>
    </section>
  );
}
