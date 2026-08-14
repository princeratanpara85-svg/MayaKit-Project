"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PortalCircles } from "@/components/ui/PortalCircles";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Staggered text entrance
    tl.from(".hero-text", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden bg-background">
      
      {/* Background 2D Animation Layer */}
      <PortalCircles />
      
      {/* Content Layer (Centered, High Z-Index) */}
      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 mt-12 md:mt-0">
        
        <div className="hero-text inline-flex items-center rounded-sm border border-border px-3 py-1 mb-8 bg-muted/80 backdrop-blur-sm">
          <span className="font-mono text-xs font-medium text-primary uppercase tracking-wider">v1.0 Live</span>
        </div>
        
        <h1 className="hero-text font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-8 drop-shadow-sm">
          Interfaces that move with <span className="text-primary block mt-2">purpose.</span>
        </h1>
        
        <p className="hero-text font-body text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl leading-relaxed mx-auto">
          A premium motion-logic library for modern frameworks. High-performance animated UI components, built to be copied directly into your project.
        </p>
        
        <div className="hero-text flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            href="/components" 
            className="flex w-full sm:w-auto min-h-[52px] items-center justify-center rounded-sm bg-primary px-10 py-3 font-display font-bold text-primary-foreground transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Get Started
          </Link>
          <Link 
            href="/docs" 
            className="flex w-full sm:w-auto min-h-[52px] items-center justify-center rounded-sm border border-primary bg-background/50 backdrop-blur-sm px-10 py-3 font-display font-bold text-primary transition-all duration-150 ease-out hover:bg-primary/10 active:scale-[0.97]"
          >
            Read Docs
          </Link>
        </div>

      </div>
    </section>
  );
}
