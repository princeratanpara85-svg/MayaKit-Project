"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyCanvas } from "@/components/three/LazyCanvas";
import { ParticleOrganism } from "@/components/three/ParticleOrganism";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function OrganismSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".organism-text", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-background flex flex-col items-center border-t border-border/20 pt-16 pb-16 overflow-hidden">
      
      {/* Content Layer (Top) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none flex flex-col items-center text-center pb-8">
        <span className="organism-text font-mono text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-6">
          LIVING ARCHITECTURE
        </span>
        <h2 className="organism-text font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl">
          Code that breathes.
        </h2>
        <p className="organism-text mt-6 text-foreground/70 font-body text-lg md:text-xl max-w-2xl">
          MayaKit is not a static repository of mechanical parts. It is an interconnected system designed to feel organic, responsive, and alive. Interactions ripple through the DOM naturally, turning rigid interfaces into fluid experiences.
        </p>
      </div>

      {/* Three.js Canvas Layer (Contained Specimen Box) */}
      <div className="relative z-0 w-full max-w-5xl mx-auto h-[500px] md:h-[600px] border border-border bg-muted/20 opacity-90 pointer-events-auto rounded-none mb-8">
        <span className="absolute top-5 left-5 font-mono text-[10px] sm:text-xs text-foreground/50 uppercase tracking-widest z-10 pointer-events-none">
          07 / SPECIMEN
        </span>
        <LazyCanvas>
          <ParticleOrganism />
        </LazyCanvas>
      </div>

    </section>
  );
}
