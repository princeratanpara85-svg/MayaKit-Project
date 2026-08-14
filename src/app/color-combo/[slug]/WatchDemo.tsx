"use client";

import React, { useRef, useState, useEffect } from "react";
import { Palette } from "@/data/palettes";
import { Questrial, Libre_Franklin } from "next/font/google";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { Settings, Anchor, Watch, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const questrial = Questrial({ weight: "400", subsets: ["latin"] });
const libre = Libre_Franklin({ weight: ["300", "400", "600"], subsets: ["latin"] });

// Generate bezel markers
const markers = Array.from({ length: 60 });

export function WatchDemo({ palette }: { palette: Palette }) {
  const [ocean, cyan] = palette.colors; // #0F4B70, #C4F8FF
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // THE ESCAPEMENT MECHANISM
  // 1. We take smooth scroll progress and force it into discrete steps (e.g. 100 ticks for the whole page)
  const TICKS = 120;
  const steppedProgress = useTransform(scrollYProgress, (v) => Math.floor(v * TICKS) / TICKS);
  
  // 2. We apply a highly stiff spring to the stepped value. 
  // This causes the value to stay perfectly still while scrolling, and then instantly "snap" to the next tick.
  const mechanicalSpring = useSpring(steppedProgress, {
    stiffness: 1500, // Extremely high stiffness for instant snap
    damping: 40,     // Slight dampening to prevent ringing, feels like a solid mechanical lock
    restDelta: 0.0001
  });

  // Mappings driven by the ticking spring
  const bezelRotation = useTransform(mechanicalSpring, [0, 1], [0, 180]); // 180 degrees over the scroll
  const gearRotation = useTransform(mechanicalSpring, [0, 1], [0, -360]); // 360 degrees counter-rot
  const contentYOffset = useTransform(mechanicalSpring, [0, 1], ["0%", "-80%"]);
  const tickCounter = useTransform(mechanicalSpring, (v) => Math.floor(v * TICKS));

  const [displayTick, setDisplayTick] = useState(0);
  useEffect(() => {
    return tickCounter.onChange(v => setDisplayTick(v));
  }, [tickCounter]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative min-h-[400vh] w-full selection:bg-[#C4F8FF] selection:text-[#0F4B70] overflow-x-hidden",
        libre.className
      )}
      style={{ backgroundColor: ocean, color: cyan }}
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
        <Link 
          href="/color-combo" 
          className={cn("pointer-events-auto text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity", questrial.className)}
        >
          Valerius Genève
        </Link>
        <div className="flex gap-8 pointer-events-auto text-[10px] uppercase tracking-[0.2em]">
          <a href="#" className="hover:opacity-70 transition-opacity">Calibres</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Boutiques</a>
        </div>
      </header>

      {/* THE BEZEL (FIXED BACKGROUND STRUCTURE) */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[150vh] h-[150vh] border border-[#C4F8FF]/20 rounded-full z-0 pointer-events-none flex justify-center items-center">
        {/* Bezel Rotation driven by escapement */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{ rotate: bezelRotation }}
        >
          {/* Dial Markers */}
          {markers.map((_, i) => (
            <div 
              key={i}
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
              style={{ transform: `rotate(${i * 6}deg)` }}
            >
              <div 
                className={cn(
                  "w-[1px] bg-[#C4F8FF]",
                  i % 5 === 0 ? "h-12 opacity-40 w-[2px]" : "h-4 opacity-10"
                )} 
              />
              {i % 5 === 0 && (
                <div className={cn("absolute top-16 left-1/2 -translate-x-1/2 text-[10px] opacity-30", questrial.className)} style={{ transform: `rotate(${-i * 6}deg)` }}>
                  {i === 0 ? '60' : i.toString().padStart(2, '0')}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* FIXED METRICS / TICK COUNTER */}
      <div className="fixed bottom-8 right-8 text-right z-50 pointer-events-none mix-blend-difference flex flex-col items-end gap-2">
        <div className="text-[10px] uppercase tracking-[0.3em] opacity-50 flex items-center gap-2">
          <Settings size={12} className={displayTick % 2 === 0 ? "rotate-45" : ""} /> Escapement Active
        </div>
        <div className={cn("text-4xl tabular-nums", questrial.className)}>
          {displayTick.toString().padStart(3, '0')} / {TICKS}
        </div>
      </div>

      {/* SCROLLING CONTENT LAYER */}
      <div className="relative z-10 pl-[10vw] md:pl-[30vw] pr-8 md:pr-24">
        
        {/* 1. THE DIAL (HERO) */}
        <section className="h-screen flex flex-col justify-center">
          <div className="max-w-xl">
            <h1 className={cn("text-6xl md:text-[7rem] leading-[0.9] tracking-tighter mb-8", questrial.className)}>
              Absolute<br/>Precision.
            </h1>
            <p className="text-lg opacity-70 font-light leading-relaxed max-w-sm mb-12">
              Every component finished by hand. Every calibre tested to tolerances of -1/+2 seconds per day. The pinnacle of Swiss horology.
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] opacity-50 animate-pulse">
              Scroll to Engage Gear Train <ChevronDown size={14} />
            </div>
          </div>
        </section>

        {/* 2. THE MOVEMENT (CALIBRE SPECS) */}
        <section className="h-screen flex flex-col justify-center items-end text-right">
          <div className="w-full max-w-4xl flex justify-end items-center relative">
            
            {/* Massive Gear in Background */}
            <motion.div 
              className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-dashed border-[#C4F8FF]/20 opacity-30 flex items-center justify-center -z-10"
              style={{ rotate: gearRotation }}
            >
              <div className="w-[50vh] h-[50vh] rounded-full border border-[#C4F8FF]/10" />
              <div className="w-[40vh] h-[40vh] rounded-full border border-dashed border-[#C4F8FF]/20 absolute" />
            </motion.div>

            <div className="max-w-md relative bg-[#0F4B70] p-8 border border-[#C4F8FF]/20">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full border border-[#C4F8FF] flex items-center justify-center bg-[#0F4B70]">
                <Settings size={14} />
              </div>
              
              <h2 className={cn("text-4xl md:text-5xl mb-6", questrial.className)}>Calibre V.840</h2>
              <p className="text-sm opacity-70 font-light leading-relaxed mb-8">
                An integrated, column-wheel chronograph movement featuring a vertical clutch. Comprised of 324 individual components, chamfered and polished by our master watchmakers.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-[#C4F8FF]/20 pt-6 text-left">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-1">Frequency</div>
                  <div className={cn("text-2xl", questrial.className)}>4 Hz</div>
                  <div className="text-[9px] opacity-40 uppercase">(28,800 vph)</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-1">Power Reserve</div>
                  <div className={cn("text-2xl", questrial.className)}>72 Hrs</div>
                  <div className="text-[9px] opacity-40 uppercase">(Twin Barrel)</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. THE COMPLICATIONS (CIRCULAR LAYOUTS) */}
        <section className="h-screen flex flex-col justify-center">
          <div className="w-full flex gap-12 items-center justify-start">
            
            {/* Duotoned Sub-dial Image */}
            <div className="w-[40vh] h-[40vh] rounded-full border-4 border-[#C4F8FF] p-2 relative shrink-0">
              {/* SVG Duotone Filter */}
              <svg className="hidden">
                <filter id="duotone-watch">
                  <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0
                                                       0.33 0.33 0.33 0 0
                                                       0.33 0.33 0.33 0 0
                                                       0 0 0 1 0" />
                  <feComponentTransfer colorInterpolationFilters="sRGB">
                    <feFuncR type="table" tableValues="0.059 0.769" /> {/* #0F -> #C4 */}
                    <feFuncG type="table" tableValues="0.294 0.973" /> {/* #4B -> #F8 */}
                    <feFuncB type="table" tableValues="0.439 1.000" /> {/* #70 -> #FF */}
                  </feComponentTransfer>
                </filter>
              </svg>
              <div 
                className="w-full h-full rounded-full bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url("https://picsum.photos/seed/923b2e28/1200/800")',
                  filter: 'url(#duotone-watch)' 
                }}
              />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#C4F8FF]/20 -translate-x-1/2" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#C4F8FF]/20 -translate-y-1/2" />
            </div>

            <div className="max-w-md">
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-4 flex items-center gap-2">
                <Clock size={12} /> The Complications
              </div>
              <h2 className={cn("text-5xl mb-6", questrial.className)}>Perpetual Calendar.</h2>
              <p className="text-sm opacity-70 font-light leading-relaxed">
                Mechanically programmed to account for the varying lengths of months and leap years until 2100. A masterpiece of miniaturization, displaying day, date, month, and moon phase.
              </p>
            </div>

          </div>
        </section>

        {/* 4. THE CROWN (FOOTER) */}
        <section className="min-h-screen flex flex-col justify-end pb-32 pt-32 text-center relative border-t border-[#C4F8FF]/20">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-full border border-[#C4F8FF]/30 flex items-center justify-center mb-8 relative">
              <motion.div 
                className="absolute inset-2 border border-dashed border-[#C4F8FF]/50 rounded-full"
                style={{ rotate: gearRotation }}
              />
              <Anchor size={20} className="opacity-80" />
            </div>

            <h2 className={cn("text-6xl md:text-8xl tracking-tighter mb-8", questrial.className)}>
              Acquire Time.
            </h2>
            <p className="text-sm opacity-70 font-light mb-12 max-w-sm">
              Our timepieces are produced in strictly limited quantities. Contact a boutique to arrange a private viewing.
            </p>

            <button className="px-12 py-4 border border-[#C4F8FF] hover:bg-[#C4F8FF] hover:text-[#0F4B70] transition-colors text-[10px] uppercase tracking-[0.3em] font-bold">
              Boutique Locator
            </button>

          </div>

          <footer className="absolute bottom-8 left-0 right-0 flex justify-between items-center text-[9px] uppercase tracking-[0.3em] opacity-40 px-8">
            <div>© {new Date().getFullYear()} Valerius Genève</div>
            <div>Swiss Made Since 1842</div>
          </footer>
        </section>

      </div>
    </div>
  );
}
