"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyCanvas } from "@/components/three/LazyCanvas";
import { MagneticConstellation } from "@/components/three/MagneticConstellation";
import { ImpossibleGrid } from "@/components/ui/ImpossibleGrid";
import { LazyComponent } from "@/components/ui/LazyComponent";

import GravityWell from "@/components/library/interactive/GravityWell";
import LiquidText from "@/components/library/text-animations/LiquidText";
import DimensionalButton from "@/components/library/buttons/DimensionalButton";
import TimeFracture from "@/components/library/text-animations/TimeFracture";
import ConnectCard from "@/components/library/cards/ConnectCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturedComponentsGrid() {
  const container = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ScrollTrigger stagger reveal
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-background px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <LazyComponent rootMargin="100%">
        <ImpossibleGrid />
      </LazyComponent>
      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-4">THE LIBRARY</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Every interaction, engineered.
          </h2>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          
          {/* Card 1: Magnetic Button (2x2) -> GravityWell */}
          <div className="bento-card md:col-span-2 md:row-span-2 bg-muted border border-border p-0 relative group overflow-hidden flex flex-col items-center justify-center rounded-sm">
            <span className="absolute top-5 left-5 font-mono text-xs text-foreground uppercase tracking-widest opacity-80 z-20 pointer-events-none">01 / Gravity Well</span>
            <LazyComponent rootMargin="50%">
              <GravityWell />
            </LazyComponent>
          </div>

          {/* Card 2: Text Scramble (2x1) -> LiquidText */}
          <div className="bento-card md:col-span-2 md:row-span-1 bg-muted border border-border p-0 relative group overflow-hidden flex items-center justify-center rounded-sm">
            <span className="absolute top-5 left-5 font-mono text-xs text-foreground uppercase tracking-widest opacity-80 z-20 pointer-events-none">02 / Liquid Text</span>
            <LazyComponent rootMargin="50%">
              <LiquidText text="MOTION" />
            </LazyComponent>
          </div>

          {/* Card 3: 3D Tilt Card (1x2) -> DimensionalButton */}
          <div className="bento-card md:col-span-1 md:row-span-2 bg-muted border border-border p-0 relative group overflow-hidden flex items-center justify-center rounded-sm">
            <span className="absolute top-5 left-5 font-mono text-xs text-foreground uppercase tracking-widest opacity-80 z-20 pointer-events-none">03 / Dimensional Button</span>
            <LazyComponent rootMargin="50%">
              <DimensionalButton />
            </LazyComponent>
          </div>

          {/* Card 4: Magnetic Constellation (1x1) - Kept as-is */}
          <div className="bento-card md:col-span-1 md:row-span-1 bg-muted border border-border relative group overflow-hidden flex items-center justify-center rounded-sm">
            <span className="absolute top-5 left-5 font-mono text-[10px] sm:text-xs text-foreground uppercase tracking-widest opacity-80 z-10 pointer-events-none">04 / Constellation</span>
            
            <div className="absolute inset-0 w-full h-full opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <LazyCanvas>
                 <MagneticConstellation count={60} connectionDistance={2} />
              </LazyCanvas>
            </div>
          </div>

          {/* Card 5: Time Fracture (2x1) - Placed before 1x1 to fix grid wrapping */}
          <div className="bento-card md:col-span-2 md:row-span-1 bg-muted border border-border p-0 relative group overflow-hidden flex items-center justify-center rounded-sm">
            <span className="absolute top-5 left-5 font-mono text-xs text-foreground uppercase tracking-widest opacity-80 z-20 pointer-events-none">05 / Time Fracture</span>
            <LazyComponent rootMargin="50%">
              <TimeFracture text="MAYAKIT" />
            </LazyComponent>
          </div>

          {/* Card 6: Connect Card (1x1) */}
          <div className="bento-card md:col-span-1 md:row-span-1 p-0 relative rounded-sm">
            <LazyComponent rootMargin="50%">
              <ConnectCard />
            </LazyComponent>
          </div>

        </div>
      </div>
    </section>
  );
}
