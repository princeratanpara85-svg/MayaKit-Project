"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Marcellus } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const marcellus = Marcellus({ weight: "400", subsets: ["latin"] });

export function SwargaDevotionalDemo({ palette }: { palette: Palette }) {
  const [skyBlue, cloudWhite] = palette.colors; // #2772A0, #CCDDEA
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Ascension Parallax Mechanics
  // As user scrolls down (0 -> 1), background elements move DOWN (0 -> +Y), 
  // creating the illusion of the camera moving UP (ascending).
  const cloud1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "50%"]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], ["-20%", "80%"]);
  const rayY = useTransform(scrollYProgress, [0, 1], ["-30%", "100%"]);
  
  // Background color interpolation for the journey
  // Starts grounded (skyBlue), ascends to ethereal (cloudWhite), returns to grounded (skyBlue)
  const bg = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.7, 1], 
    [skyBlue, skyBlue, cloudWhite, skyBlue]
  );
  
  const textInterpolation = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [cloudWhite, cloudWhite, skyBlue, cloudWhite]
  );

  return (
    <motion.div 
      ref={containerRef}
      className={cn(
        "relative min-h-[400vh] w-full selection:bg-[#CCDDEA] selection:text-[#2772A0] overflow-hidden",
        marcellus.className
      )}
      style={{ backgroundColor: bg, color: textInterpolation }}
    >
      {/* ISOLATED CHROME HEADER */}
      <header className="fixed top-0 left-0 right-0 p-8 sm:p-12 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-lg tracking-[0.2em] uppercase hover:opacity-70 transition-opacity duration-1000"
          style={{ color: cloudWhite }}
        >
          Gallery
        </Link>
        <div className="tracking-[0.3em] uppercase text-sm opacity-60" style={{ color: cloudWhite }}>
          Swarga
        </div>
      </header>

      {/* ASCENSION PARALLAX BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Abstract Light Rays (Ascension) */}
        <motion.div 
          className="absolute w-full h-[200vh] flex justify-center gap-12 sm:gap-32 opacity-20"
          style={{ y: rayY, filter: "blur(60px)" }}
        >
          <div className="w-[10vw] h-full" style={{ background: `linear-gradient(to bottom, transparent, ${cloudWhite}, transparent)` }} />
          <div className="w-[15vw] h-full -mt-[20vh]" style={{ background: `linear-gradient(to bottom, transparent, ${cloudWhite}, transparent)` }} />
          <div className="w-[8vw] h-full mt-[10vh]" style={{ background: `linear-gradient(to bottom, transparent, ${cloudWhite}, transparent)` }} />
        </motion.div>

        {/* Abstract Clouds/Atmosphere */}
        <motion.div 
          className="absolute w-[80vw] h-[80vw] rounded-full opacity-30 mix-blend-screen"
          style={{ 
            y: cloud1Y, 
            background: `radial-gradient(circle, ${cloudWhite} 0%, transparent 70%)`,
            filter: "blur(80px)",
            left: "-10vw"
          }}
        />
        <motion.div 
          className="absolute w-[60vw] h-[60vw] rounded-full opacity-20 mix-blend-screen"
          style={{ 
            y: cloud2Y, 
            background: `radial-gradient(circle, ${cloudWhite} 0%, transparent 70%)`,
            filter: "blur(100px)",
            right: "-5vw"
          }}
        />
      </div>

      {/* CONTENT JOURNEY */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* SECTION 1: THE ANCHOR (KARMA) */}
        <section className="h-screen w-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="max-w-3xl flex flex-col items-center"
          >
            <div className="tracking-[0.4em] uppercase text-sm mb-12 opacity-60">The Foundation</div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl mb-12 leading-tight tracking-wide">
              Karma & Punya
            </h1>
            <p className="text-xl sm:text-2xl opacity-80 leading-relaxed max-w-2xl font-light">
              In Sanatan Dharma, the cosmos is ordered by cause and effect. 
              The attainment of higher realms is not a matter of permanent salvation, 
              but the natural fruition of Punya—meritorious action performed in the earthly plane.
            </p>
            
            <div className="mt-24 w-[1px] h-32 opacity-30" style={{ backgroundColor: 'currentColor' }} />
          </motion.div>
        </section>

        {/* SECTION 2: THE ASCENT (LOKAS) */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center py-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="max-w-4xl flex flex-col items-center"
          >
            <div className="tracking-[0.4em] uppercase text-sm mb-8 opacity-60">The Ascent</div>
            <h2 className="text-4xl sm:text-6xl mb-16 leading-snug">
              Ascending the Fourteen Realms
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-24 text-center">
              {[
                { title: "Bhur Loka", desc: "The physical, earthly plane where karma is actively generated." },
                { title: "Bhuvar Loka", desc: "The subtle atmospheric space, the realm of intermediate spirits." },
                { title: "Svar Loka", desc: "The celestial heavens, existing above the earthly atmosphere." }
              ].map((loka, i) => (
                <div key={loka.title} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border border-current opacity-30 flex items-center justify-center mb-6">
                    <span className="opacity-50 text-sm">{i + 1}</span>
                  </div>
                  <h3 className="text-2xl mb-4">{loka.title}</h3>
                  <p className="opacity-70 leading-relaxed text-lg">{loka.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: THE PEAK (SWARGA LOKA) */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="max-w-3xl flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-16 relative">
               <div className="absolute inset-0 rounded-full border border-current opacity-20 animate-[spin_20s_linear_infinite]" />
               <div className="absolute inset-2 rounded-full border border-current opacity-40 animate-[spin_15s_linear_infinite_reverse]" />
               <div className="absolute inset-0 flex items-center justify-center opacity-60">✦</div>
            </div>

            <div className="tracking-[0.4em] uppercase text-sm mb-12 opacity-80">The Zenith</div>
            <h2 className="text-6xl sm:text-8xl mb-12 leading-tight">
              Swarga Loka
            </h2>
            <p className="text-2xl opacity-90 leading-relaxed max-w-2xl font-light">
              The heavenly realm of Indra. A place of profound beauty, sensory delight, and peace. 
              Here, the soul experiences the rewards of its virtuous earthly deeds. It is a realm devoid of physical suffering.
            </p>
          </motion.div>
        </section>

        {/* SECTION 4: IMPERMANENCE (THE RETURN) */}
        <section className="min-h-screen w-full flex flex-col items-center justify-end px-6 text-center pb-32 pt-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="max-w-3xl flex flex-col items-center"
          >
            <div className="w-[1px] h-32 opacity-30 mb-24" style={{ backgroundColor: 'currentColor' }} />
            
            <div className="tracking-[0.4em] uppercase text-sm mb-12 opacity-60">The Return</div>
            <h2 className="text-4xl sm:text-6xl mb-12 leading-tight">
              The Impermanence of Heaven
            </h2>
            <p className="text-xl sm:text-2xl opacity-80 leading-relaxed max-w-2xl font-light mb-24">
              Unlike the concept of a permanent afterlife, Swarga is a temporary state. 
              When the merit of one's Punya is exhausted, the soul descends once more into the cycle of Samsara to continue its journey toward ultimate liberation (Moksha).
            </p>

            <div className="text-sm tracking-[0.2em] uppercase opacity-40 pt-12 border-t border-current w-full flex justify-between max-w-md">
              <span>Samsara</span>
              <span>Moksha</span>
              <span>Swarga</span>
            </div>
          </motion.div>
        </section>

      </div>
    </motion.div>
  );
}
// Force IDE cache update
