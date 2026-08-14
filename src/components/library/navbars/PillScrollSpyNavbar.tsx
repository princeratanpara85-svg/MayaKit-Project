"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "intro", label: "Intro", blurb: "Welcome to the brutalist scroll spy." },
  { id: "react", label: "React", blurb: "Framer Motion layoutId magic." },
  { id: "layers", label: "Layers", blurb: "Intersection observer tracking." },
  { id: "models", label: "Models", blurb: "Internal scroll boundaries." },
];

export default function PillScrollSpyNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && containerRef.current) {
      // Simplistic scroll alignment
      containerRef.current.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      className={cn(
        "relative h-[400px] w-full overflow-hidden rounded-none bg-[#0C1E29] border border-[#163648] font-mono",
        className
      )}
    >
      {/* The navbar */}
      <nav className="absolute left-0 right-0 top-0 z-20 bg-[#0C1E29]/90 backdrop-blur-md border-b border-[#163648] p-4 flex justify-center">
        <div className="relative flex items-center gap-1 rounded-none border border-[#163648] bg-[#0C1E29] p-1">
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={cn(
                  "relative z-10 flex items-center justify-center rounded-none px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                  isActive ? "text-[#0C1E29]" : "text-[#E2E8F0]/50 hover:text-[#E2E8F0]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="pill-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-none bg-[#FFFE15]"
                  />
                )}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Internal scroll container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto pt-24 pb-32 px-8 snap-y snap-mandatory"
      >
        {SECTIONS.map((s, i) => (
          <div 
            key={s.id} 
            id={s.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="min-h-[300px] flex flex-col items-center justify-center text-center snap-center mb-10"
          >
            <span className="inline-block bg-[#163648] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFFE15] mb-4">
              {s.label} · {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-3xl font-bold leading-tight text-[#E2E8F0] uppercase tracking-widest">
              Section <span className="text-[#FFFE15]">{s.label}</span>
            </h2>
            <p className="mt-4 text-sm text-[#E2E8F0]/60 max-w-sm mx-auto uppercase tracking-wider">{s.blurb}</p>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <span className="bg-[#0C1E29] border border-[#163648] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#E2E8F0]/40">
          Scroll inside to spy
        </span>
      </div>
    </div>
  );
}
