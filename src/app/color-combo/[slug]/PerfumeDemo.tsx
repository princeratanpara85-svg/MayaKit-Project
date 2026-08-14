"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Italiana, Commissioner } from "next/font/google";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { Sparkles, Wind, Droplets, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const commissioner = Commissioner({ weight: ["300", "400", "500"], subsets: ["latin"] });

// The Evaporation Curve (Fast burst, rapid expansion, long lingering tail)
const EVAPORATION_EASE: [number, number, number, number] = [0.2, 0.9, 0.1, 1];
const HEART_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // Slower, richer
const BASE_EASE: [number, number, number, number] = [0.6, 0.05, 0.01, 0.9]; // Extremely heavy, slow

export function PerfumeDemo({ palette }: { palette: Palette }) {
  const [indigo, lavender] = palette.colors; // #151130, #C8BEFA
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Scent Trail properties driven by scroll
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const blob1X = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const blob1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2, 3]);
  const blob1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.1]);

  const blob2Y = useTransform(scrollYProgress, [0, 1], ["50%", "-100%"]);
  const blob2Scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const blob2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.8]);

  return (
    <motion.div 
      ref={containerRef}
      className={cn(
        "relative w-full selection:bg-[#C8BEFA] selection:text-[#151130] overflow-x-hidden",
        commissioner.className
      )}
      style={{ backgroundColor: indigo, color: lavender }}
    >
      {/* THE SCENT TRAIL (Background Diffusion) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Blob 1 */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[40vw] aspect-square rounded-full blur-[100px] md:blur-[140px]"
          style={{ 
            backgroundColor: lavender,
            y: blob1Y,
            x: blob1X,
            scale: blob1Scale,
            opacity: blob1Opacity
          }}
        />
        {/* Blob 2 */}
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[60vw] aspect-square rounded-full blur-[120px] md:blur-[160px]"
          style={{ 
            backgroundColor: lavender,
            y: blob2Y,
            scale: blob2Scale,
            opacity: blob2Opacity,
            mixBlendMode: "screen"
          }}
        />
      </div>

      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-xs uppercase tracking-[0.3em] hover:opacity-70 transition-opacity"
        >
          MAISON NOIR
        </Link>
        <div className="flex gap-8 pointer-events-auto text-[10px] uppercase tracking-[0.2em]">
          <a href="#" className="hover:opacity-70 transition-opacity">Collection</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Maison</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Cart (0)</a>
        </div>
      </header>

      <div className="relative z-10">
        
        {/* 1. TOP NOTES (0-15 mins) */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center relative p-8">
          
          <div className="absolute top-32 right-12 text-[9px] uppercase tracking-[0.4em] opacity-60 flex flex-col items-end gap-1">
            <span>Stage I</span>
            <span>0-15 Minutes</span>
            <span>Volatile / Luminous</span>
          </div>

          {/* Duotoned Perfume Bottle */}
          <div className="w-full max-w-sm aspect-[3/4] relative mb-12">
            <motion.div 
              initial={{ filter: "blur(20px)", opacity: 0, scale: 0.95 }}
              animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EVAPORATION_EASE }}
              className="w-full h-full relative"
            >
              {/* Duotone SVG Filter */}
              <svg className="hidden">
                <filter id="duotone-perfume">
                  <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0
                                                       0.33 0.33 0.33 0 0
                                                       0.33 0.33 0.33 0 0
                                                       0 0 0 1 0" />
                  <feComponentTransfer colorInterpolationFilters="sRGB">
                    <feFuncR type="table" tableValues="0.082 0.784" /> {/* #15 -> #C8 */}
                    <feFuncG type="table" tableValues="0.067 0.745" /> {/* #11 -> #BE */}
                    <feFuncB type="table" tableValues="0.188 0.980" /> {/* #30 -> #FA */}
                  </feComponentTransfer>
                </filter>
              </svg>
              <div 
                className="w-full h-full bg-cover bg-center rounded-t-full shadow-2xl"
                style={{ 
                  backgroundImage: 'url("https://picsum.photos/seed/c3069f73/1200/800")',
                  filter: 'url(#duotone-perfume)' 
                }}
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: EVAPORATION_EASE, delay: 0.3 }}
            className="text-center max-w-2xl"
          >
            <h1 className={cn("text-6xl md:text-8xl lg:text-[9rem] leading-[0.8] mb-6", italiana.className)}>
              L'Éthéré
            </h1>
            <p className="text-lg md:text-xl font-light opacity-80 max-w-lg mx-auto leading-relaxed">
              An initial burst of Calabrian Bergamot and Pink Pepper. Sharp, fleeting, demanding absolute attention.
            </p>
          </motion.div>

        </section>

        {/* 2. HEART NOTES (2-4 hours) */}
        <section className="min-h-[150vh] w-full flex flex-col justify-center py-32 px-8 md:px-24 border-t border-[#C8BEFA]/10">
          
          <div className="text-[9px] uppercase tracking-[0.4em] opacity-60 mb-24">
            Stage II // 2-4 Hours // The Dry Down
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            
            <div>
              <motion.h2 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.8, ease: HEART_EASE }}
                className={cn("text-5xl md:text-7xl leading-tight mb-8", italiana.className)}
              >
                The Alchemy of the Heart.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.5, ease: HEART_EASE, delay: 0.2 }}
                className="text-lg opacity-70 font-light leading-relaxed max-w-md"
              >
                As the volatile citrus burns off, the true character of the fragrance emerges from the skin. A rich, narcotic absolute of Moroccan Jasmine blends with the powdery elegance of Florentine Iris.
              </motion.p>
            </div>

            <div className="flex flex-col gap-12">
              {[
                { name: "Moroccan Jasmine Absolute", desc: "Hand-picked at dawn to preserve the highest concentration of indole.", icon: Sparkles },
                { name: "Florentine Iris Pallida", desc: "Aged for three years in subterranean vaults to develop its signature powdery warmth.", icon: Wind },
                { name: "Saffron Distillate", desc: "A leathery, warm spice that bridges the floral heart to the woody base.", icon: Droplets }
              ].map((note, i) => (
                <motion.div 
                  key={note.name}
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.5, ease: HEART_EASE, delay: i * 0.3 }}
                  className="group flex gap-6"
                >
                  <div className="mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    <note.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className={cn("text-2xl md:text-3xl mb-2", italiana.className)}>{note.name}</h3>
                    <p className="text-sm opacity-60 font-light max-w-sm leading-relaxed group-hover:opacity-100 transition-opacity">{note.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. BASE NOTES (8+ hours) */}
        <section className="min-h-screen w-full flex flex-col justify-end pb-32 px-8 md:px-24">
          
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
            
            <div className="text-[9px] uppercase tracking-[0.4em] opacity-60 mb-16">
              Stage III // 8+ Hours // The Skin Scent
            </div>

            <motion.h2 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: BASE_EASE }}
              className={cn("text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] mb-12", italiana.className)}
            >
              The Memory.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: BASE_EASE, delay: 0.5 }}
              className="text-lg md:text-xl font-light opacity-70 max-w-2xl leading-relaxed mb-24"
            >
              What remains is the heaviest, most intimate molecular structure. Mysore Sandalwood and Ambergris meld with the natural chemistry of your skin, lingering long after you have left the room.
            </motion.p>

            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: BASE_EASE, delay: 1 }}
              className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] pb-2 border-b border-[#C8BEFA]/30 hover:border-[#C8BEFA] transition-colors"
            >
              Discover L'Éthéré 
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </motion.button>
          </div>

        </section>
        
        <footer className="w-full text-center py-8 text-[9px] uppercase tracking-[0.4em] opacity-30 border-t border-[#C8BEFA]/10">
          © {new Date().getFullYear()} Maison Noir Parfums. Paris.
        </footer>

      </div>
    </motion.div>
  );
}
