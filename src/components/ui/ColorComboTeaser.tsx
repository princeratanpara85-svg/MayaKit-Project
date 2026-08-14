"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const examplePalettes = [
  { id: 1, type: "3-COLOR", colors: ["#FF416C", "#FF4B2B", "#2A2A72"] },
  { id: 2, type: "2-COLOR", colors: ["#00B4DB", "#0083B0"] },
  { id: 3, type: "2-COLOR", colors: ["#11998E", "#38EF7D"] },
  { id: 4, type: "3-COLOR", colors: ["#F2709C", "#FF9472", "#F09819"] },
];

export function ColorComboTeaser() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%", // triggers when top of section hits 75% of viewport
      }
    });

    // Reveal text block
    tl.from(".color-teaser-text", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });

    // Reveal cards staggered
    tl.from(".palette-card", {
      y: 30,
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)"
    }, "-=0.6");
    
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full bg-background border-t border-border/20 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* Visual Side: 60% Width (Left) */}
          <div className="w-full lg:w-[60%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 perspective-[1000px]">
            {examplePalettes.map((palette) => (
              <div 
                key={palette.id}
                className="palette-card group relative flex flex-col bg-muted/40 border border-border p-3 transition-transform duration-300 ease-out hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#FFFE15]"
              >
                {/* Swatch Stack */}
                <div className="flex flex-col w-full h-32 mb-3 border border-border/50">
                  {palette.colors.map((color, idx) => (
                    <div 
                      key={idx} 
                      className="w-full flex-1" 
                      style={{ backgroundColor: color }} 
                    />
                  ))}
                </div>
                
                {/* Label */}
                <div className="flex items-center justify-between mt-auto pt-1 border-t border-border/30">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-foreground/50 group-hover:text-foreground transition-colors">
                    {palette.type}
                  </span>
                  <span className="w-1.5 h-1.5 bg-foreground/20 group-hover:bg-primary transition-colors"></span>
                </div>
              </div>
            ))}
          </div>

          {/* Text Content: 40% Width (Right-weighted) */}
          <div className="w-full lg:w-[40%] flex flex-col items-start text-left">
            <span className="color-teaser-text font-mono text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4">
              COLOR COMBO
            </span>
            <h2 className="color-teaser-text font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Palettes you can actually see in motion.
            </h2>
            <p className="color-teaser-text font-body text-lg text-foreground/70 mb-8 max-w-md">
              Don't just stare at hex codes on a blank canvas. Preview curated color combinations applied directly to fully functional UI components, instantly.
            </p>
            <div className="color-teaser-text">
              <Link 
                href="/color-combo"
                className="inline-flex min-h-[48px] items-center justify-center rounded-none bg-primary px-8 py-3 font-display font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                Explore Color Combos
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
