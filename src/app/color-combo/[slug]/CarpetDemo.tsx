"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Forum, Albert_Sans } from "next/font/google";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { Grid, Scissors, MoveRight, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const forum = Forum({ weight: "400", subsets: ["latin"] });
const albert = Albert_Sans({ weight: ["300", "400", "600"], subsets: ["latin"] });

// The Loom Snap (Percussive, sharp, high-tension)
const LOOM_SNAP: [number, number, number, number] = [0.7, 0, 0.3, 1];

export function CarpetDemo({ palette }: { palette: Palette }) {
  const [wine, white] = palette.colors; // #5A2132, #EFE9E9
  
  return (
    <div 
      className={cn(
        "relative min-h-screen w-full selection:bg-[#5A2132] selection:text-[#EFE9E9] overflow-x-hidden",
        albert.className
      )}
      style={{ backgroundColor: white, color: wine }}
    >
      {/* GLOBAL WARP (Vertical Lines) */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-8 md:px-24">
        <div className="w-[1px] h-full opacity-20" style={{ backgroundColor: wine }} />
        <div className="w-[1px] h-full opacity-20 hidden md:block" style={{ backgroundColor: wine }} />
        <div className="w-[1px] h-full opacity-20" style={{ backgroundColor: wine }} />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-[10px] uppercase font-semibold tracking-widest hover:opacity-70 transition-opacity bg-[#EFE9E9] px-2"
        >
          MAISON TISSERAND
        </Link>
        <div className="flex gap-8 pointer-events-auto text-[10px] uppercase font-semibold tracking-widest bg-[#EFE9E9] px-2">
          <a href="#" className="hover:opacity-70 transition-opacity">Collections</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Bespoke</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Atelier</a>
        </div>
      </header>

      {/* 1. THE FOUNDATION (HERO) */}
      <section className="min-h-screen w-full relative z-10 flex flex-col justify-center px-8 md:px-24 pt-24 pb-12">
        {/* Weft Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: LOOM_SNAP }}
          className="absolute top-[30%] left-0 right-0 h-[1px] opacity-20 origin-left" 
          style={{ backgroundColor: wine }} 
        />
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 items-center justify-between w-full h-full relative z-10">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center bg-[#EFE9E9] py-8 relative">
            {/* Warp Drop Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, ease: LOOM_SNAP, delay: 0.2 }}
              className="absolute top-0 bottom-0 right-[-10%] w-[1px] opacity-20 origin-top hidden md:block" 
              style={{ backgroundColor: wine }} 
            />

            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: LOOM_SNAP, delay: 0.4 }}
              className={cn("text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight mb-8", forum.className)}
            >
              The Art<br/>of Tension.
            </motion.h1>
            <motion.p 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: LOOM_SNAP, delay: 0.6 }}
              className="max-w-sm text-sm opacity-80 leading-relaxed font-light"
            >
              Hand-knotted in the high altitudes of the Atlas Mountains. We preserve ancient weaving architectures to create textiles of uncompromising density and weight.
            </motion.p>
          </div>

          <div className="w-full md:w-[45%] aspect-[4/5] relative bg-[#EFE9E9] p-4 overflow-hidden">
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: LOOM_SNAP, delay: 0.8 }}
              className="w-full h-full relative"
            >
              {/* Duotone SVG Filter */}
              <svg className="hidden">
                <filter id="duotone-carpet">
                  <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0
                                                       0.33 0.33 0.33 0 0
                                                       0.33 0.33 0.33 0 0
                                                       0 0 0 1 0" />
                  <feComponentTransfer colorInterpolationFilters="sRGB">
                    <feFuncR type="table" tableValues="0.353 0.937" /> {/* #5A -> #EF */}
                    <feFuncG type="table" tableValues="0.129 0.914" /> {/* #21 -> #E9 */}
                    <feFuncB type="table" tableValues="0.196 0.914" /> {/* #32 -> #E9 */}
                  </feComponentTransfer>
                </filter>
              </svg>
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url("https://picsum.photos/seed/3a10324e/1200/800")',
                  filter: 'url(#duotone-carpet)' 
                }}
              />
              <div className="absolute bottom-4 left-4 text-[10px] uppercase font-bold tracking-widest bg-[#EFE9E9] px-2 py-1">
                Fig 1. High-Density Wool
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. THE WEAVE (COLLECTIONS) */}
      <section className="min-h-[120vh] w-full relative z-10 py-32">
        {/* Multiple Weft Lines forming a denser grid */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: LOOM_SNAP }}
          className="absolute top-[20%] left-0 right-0 h-[1px] opacity-20 origin-left" 
          style={{ backgroundColor: wine }} 
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: LOOM_SNAP, delay: 0.1 }}
          className="absolute top-[50%] left-0 right-0 h-[1px] opacity-20 origin-left hidden md:block" 
          style={{ backgroundColor: wine }} 
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: LOOM_SNAP, delay: 0.2 }}
          className="absolute top-[80%] left-0 right-0 h-[1px] opacity-20 origin-left" 
          style={{ backgroundColor: wine }} 
        />

        <div className="px-8 md:px-24">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: LOOM_SNAP, delay: 0.3 }}
            className="bg-[#EFE9E9] inline-block pr-8 pb-8"
          >
            <h2 className={cn("text-5xl md:text-7xl mb-4", forum.className)}>The Weave.</h2>
            <p className="text-sm opacity-60 uppercase font-bold tracking-widest">02 // Architectures</p>
          </motion.div>
        </div>

        <div className="px-8 md:px-24 mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          
          {[
            { title: "Knot Density 120", desc: "A robust, heavy-weight construction ideal for high-traffic environments. Woven using hand-spun Ghazni wool.", img: "https://picsum.photos/seed/286bd8c7/1200/800" },
            { title: "Silk & Mohair Blend", desc: "An intensely soft, luminous surface texture. The silk warp creates structural integrity while mohair provides the pile.", img: "https://picsum.photos/seed/69ea2ae8/1200/800" }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: LOOM_SNAP, delay: i * 0.2 }}
              className="group relative bg-[#EFE9E9] p-4 cursor-pointer"
            >
              <div className="w-full aspect-square overflow-hidden relative mb-6">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url("${item.img}")`,
                    filter: 'url(#duotone-carpet)' 
                  }}
                />
                <div className="absolute inset-0 bg-[#5A2132]/0 group-hover:bg-[#5A2132]/10 transition-colors duration-500" />
                
                {/* Structural hover markers */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#5A2132] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#5A2132] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className={cn("text-3xl mb-2", forum.className)}>{item.title}</h3>
              <p className="text-sm font-light opacity-70 leading-relaxed max-w-sm">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* 3. THE CRAFT (ARTISANAL STORY) */}
      <section className="min-h-screen w-full relative z-10 flex flex-col justify-center py-32 border-t border-[#5A2132]/20">
        
        {/* Weft Line that triggers content */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: LOOM_SNAP }}
          className="absolute top-1/2 left-0 right-0 h-[1px] opacity-20 origin-left" 
          style={{ backgroundColor: wine }} 
        />

        <div className="px-8 md:px-24 flex flex-col md:flex-row items-center gap-16 relative">
          
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: LOOM_SNAP, delay: 0.5 }}
            className="md:w-1/3 bg-[#EFE9E9] py-8 pr-8"
          >
            <Grid size={32} className="mb-8 opacity-50" />
            <h2 className={cn("text-4xl md:text-6xl mb-6", forum.className)}>Warp. Weft.<br/>Tension.</h2>
            <div className="w-12 h-[1px] bg-[#5A2132] opacity-30 mb-6" />
            <p className="text-sm font-light opacity-80 leading-relaxed">
              True artisanal weaving cannot be rushed. It takes our master weavers up to eight months to complete a single 9x12 carpet, hand-tying over a million individual knots. The resulting textile is practically indestructible, meant to be passed down through generations.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: LOOM_SNAP, delay: 0.7 }}
            className="md:w-2/3 grid grid-cols-2 gap-8 bg-[#EFE9E9] p-8"
          >
            <div className="border border-[#5A2132]/20 p-6">
              <Scissors size={20} className="mb-4 opacity-50" />
              <div className="text-xs font-bold uppercase tracking-widest mb-2">Hand-Carded</div>
              <p className="text-xs opacity-60">Wool is brushed by hand to preserve the natural lanolin, resulting in superior stain resistance.</p>
            </div>
            <div className="border border-[#5A2132]/20 p-6">
              <Maximize size={20} className="mb-4 opacity-50" />
              <div className="text-xs font-bold uppercase tracking-widest mb-2">Loom Tension</div>
              <p className="text-xs opacity-60">High-tension weaving ensures the carpet will never warp, buckle, or stretch over decades of use.</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. THE KNOT (FOOTER) */}
      <section className="min-h-[70vh] w-full relative z-20 bg-[#5A2132] text-[#EFE9E9] flex flex-col justify-end p-8 md:p-24 overflow-hidden">
        
        {/* White grid lines cutting into the block */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LOOM_SNAP }}
            className="absolute top-0 bottom-0 left-24 w-[1px] opacity-20 origin-top" 
            style={{ backgroundColor: white }} 
          />
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LOOM_SNAP, delay: 0.2 }}
            className="absolute top-32 left-0 right-0 h-[1px] opacity-20 origin-left" 
            style={{ backgroundColor: white }} 
          />
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: LOOM_SNAP, delay: 0.6 }}
          className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-16"
        >
          <div className="max-w-2xl">
            <h2 className={cn("text-6xl md:text-8xl lg:text-[9rem] leading-[0.8] tracking-tight mb-8", forum.className)}>
              Commission<br/>a Piece.
            </h2>
            <p className="text-lg opacity-70 font-light mb-12 max-w-md">
              Available in custom dimensions to fit your architecture. Speak with our atelier to begin the design process.
            </p>
            
            <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b border-[#EFE9E9]/30 pb-2 hover:border-[#EFE9E9] transition-colors group">
              Contact the Atelier <MoveRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>

          <div className="flex flex-col gap-8 text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 text-right">
            <a href="#" className="hover:opacity-100 transition-opacity">Care Instructions</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Sustainability</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Showrooms</a>
            <div className="mt-8 pt-8 border-t border-[#EFE9E9]/20">
              © {new Date().getFullYear()} Maison Tisserand.
            </div>
          </div>
        </motion.div>

      </section>

    </div>
  );
}
