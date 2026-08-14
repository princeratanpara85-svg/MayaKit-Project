"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MotionPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (isReduced) {
      gsap.set(dotRef.current, { attr: { cx: 350 } });
      gsap.set(".philosophy-line", { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=150%", // Scrub over 1.5x viewport height to give it breathing room
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // Text reveals: staggered fade and slide up
    tl.fromTo(".philosophy-line",
      { opacity: 0.1, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: "power2.out" }
    );

    // SVG diagram: dot moves along the rail from cx=50 to cx=350.
    // Total duration of the text stagger is approx 2 seconds. We'll map the dot movement to start immediately.
    tl.to(dotRef.current, {
      attr: { cx: 350 },
      duration: 2,
      ease: "sine.inOut"
    }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-background min-h-screen flex items-center justify-center py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Area: Statement */}
        <div className="flex flex-col items-start w-full">
          <span className="font-mono text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-8">
            THE PHILOSOPHY
          </span>
          
          <h2 className="philosophy-line font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-2">
            Motion is meaning.
          </h2>
          <h2 className="philosophy-line font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-2">
            Logic over ornament.
          </h2>
          <h2 className="philosophy-line font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Physics is the language.
          </h2>
        </div>

        {/* Right Area: Visual Anchor (Animated SVG) */}
        <div className="flex items-center justify-center lg:justify-end w-full">
          <svg 
            height="200" 
            viewBox="0 0 400 200" 
            width="400" 
            className="w-full max-w-lg h-auto" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Static Structure (Rail) */}
            <line stroke="var(--color-muted)" strokeWidth="2" x1="50" x2="350" y1="100" y2="100"></line>
            <rect fill="var(--color-muted)" height="20" width="2" x="50" y="90"></rect>
            <rect fill="var(--color-muted)" height="20" width="2" x="348" y="90"></rect>
            
            {/* Physics Curve Indicator */}
            <path d="M50 150 Q200 50 350 150" fill="none" stroke="var(--color-muted)" strokeDasharray="4 4" strokeWidth="1"></path>
            
            {/* Moving Element (Active Dot) */}
            <circle ref={dotRef} cx="50" cy="100" fill="var(--color-primary)" r="6"></circle>
          </svg>
        </div>

      </div>
    </section>
  );
}
