"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const stats = [
  { id: 1, value: "Growing", label: "LIBRARY OF COMPONENTS", isNumeric: false },
  { id: 2, value: "100", suffix: "%", label: "OPEN SOURCE", isNumeric: true, target: 100 },
  { id: 3, value: "0", label: "COMPROMISES", isNumeric: true, target: 0 },
  { id: 4, value: "MIT", label: "LICENSED", isNumeric: false },
];

export function StatsStrip() {
  const container = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%", // Trigger as soon as it comes mostly into view
      }
    });

    // Fade in all stats containers
    tl.from(".stat-item", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Run counters for numeric stats
    stats.forEach((stat, index) => {
      if (stat.isNumeric && stat.target !== undefined) {
        const el = numberRefs.current[index];
        if (el) {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: stat.target,
            duration: 2.0,
            ease: "power3.out",
            delay: index * 0.1, // sync roughly with stagger
            scrollTrigger: {
              trigger: container.current,
              start: "top 85%",
            },
            onUpdate: () => {
              el.textContent = Math.floor(counterObj.val).toString();
            }
          });
        }
      }
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full bg-muted py-16 lg:py-20 border-t border-b border-border/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between w-full">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className={`stat-item flex-1 flex flex-col items-center justify-center text-center w-full py-6 md:py-0
                ${index !== stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-border/20' : ''}
              `}
            >
              <div className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-2">
                {stat.isNumeric ? (
                  <>
                    <span 
                      ref={el => {
                        if (el) numberRefs.current[index] = el;
                      }}
                    >
                      0
                    </span>
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </>
                ) : (
                  <span>{stat.value}</span>
                )}
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-foreground/60 tracking-[0.2em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
