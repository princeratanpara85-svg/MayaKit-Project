"use client";

import React from "react";
import { Palette } from "@/data/palettes";
import { Paytone_One, Rubik } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Flame, Leaf, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

const paytone = Paytone_One({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: ["400", "700", "900"], subsets: ["latin"] });

// The "Crunch" Easing: Pulls back, shoots forward, overshoots, and snaps hard.
const CRUNCH_EASE: any = [0.68, -0.6, 0.32, 1.6];

export function SnackDemo({ palette }: { palette: Palette }) {
  const [forest, yellow] = palette.colors; // #202B22, #FFD85F
  
  return (
    <div 
      className={cn(
        "relative min-h-screen w-full selection:bg-[#202B22] selection:text-[#FFD85F] overflow-x-hidden",
        rubik.className
      )}
      style={{ backgroundColor: yellow, color: forest }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        ::selection { background-color: ${forest}; color: ${yellow}; }
        .hover-border:hover { border-color: ${yellow} !important; }
      `}} />
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference" style={{ color: yellow }}>
        <Link 
          href="/color-combo" 
          className={cn("pointer-events-auto text-2xl hover:scale-110 transition-transform origin-left", paytone.className)}
        >
          SNAP<br/>CHIPS.
        </Link>
        <div className="flex gap-6 pointer-events-auto text-sm font-black uppercase tracking-widest">
          <a href="#" className="hover:scale-110 transition-transform origin-right">Flavors</a>
          <a href="#" className="hover:scale-110 transition-transform origin-right">Buy Now</a>
        </div>
      </header>

      {/* 1. THE RAW PEEL (HERO) */}
      <section className="min-h-[110vh] w-full flex flex-col justify-center items-center relative p-8">
        
        {/* Background Image that violently snaps in */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.2 }}
            transition={{ duration: 1, ease: CRUNCH_EASE }}
            className="w-full h-full"
          >
            {/* SVG Duotone Filter */}
            <svg className="hidden">
              <filter id="duotone-snack">
                <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0
                                                     0.33 0.33 0.33 0 0
                                                     0.33 0.33 0.33 0 0
                                                     0 0 0 1 0" />
                <feComponentTransfer colorInterpolationFilters="sRGB">
                  <feFuncR type="table" tableValues="1.000 0.125" /> {/* #FF -> #20 */}
                  <feFuncG type="table" tableValues="0.847 0.169" /> {/* #D8 -> #2B */}
                  <feFuncB type="table" tableValues="0.373 0.133" /> {/* #5F -> #22 */}
                </feComponentTransfer>
              </filter>
            </svg>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: 'url("https://picsum.photos/seed/58668409/1200/800")',
                filter: 'url(#duotone-snack)' 
              }}
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: -100, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: CRUNCH_EASE, delay: 0.2 }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <div className="px-4 py-2 font-black uppercase tracking-widest text-sm mb-8 -rotate-3 hover:rotate-3 transition-transform cursor-default" style={{ backgroundColor: forest, color: yellow }}>
            100% Real Kerala Nendran
          </div>
          <h1 className={cn("text-7xl md:text-[10rem] leading-[0.85] tracking-tight uppercase mb-8", paytone.className)} style={{ filter: `drop-shadow(8px 8px 0 ${forest})` }}>
            Respect<br/>The Crunch.
          </h1>
          <p className="text-xl font-bold max-w-md mx-auto uppercase">
            Thick cut. Kettle fried. Absurdly seasoned.
          </p>
        </motion.div>

      </section>

      {/* 2. THE MANDOLINE SLICE (FLAVORS) */}
      <section className="relative z-20">
        
        {/* Slice 1 */}
        <div 
          className="w-full py-32 md:py-48 px-8 md:px-24 flex flex-col justify-center"
          style={{ backgroundColor: forest, color: yellow, clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)", marginTop: "-10vh" }}
        >
          <motion.div 
            initial={{ x: -200, rotate: -10, opacity: 0 }}
            whileInView={{ x: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: CRUNCH_EASE }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-4 text-xl">
              <Zap className="fill-current" /> <span className="font-black uppercase tracking-widest">Classic Salted</span>
            </div>
            <h2 className={cn("text-6xl md:text-8xl leading-none uppercase mb-6", paytone.className)}
                style={{ filter: `drop-shadow(4px 4px 0 ${yellow})`, color: forest, WebkitTextStroke: `2px ${yellow}` }}
            >
              The<br/>OG.
            </h2>
            <p className="text-xl font-bold">
              Just bananas, coconut oil, and a massive hit of sea salt. No weird stuff.
            </p>
          </motion.div>
        </div>

        {/* Slice 2 */}
        <div 
          className="w-full py-32 md:py-48 px-8 md:px-24 flex flex-col justify-center items-end text-right border-y-[16px]"
          style={{ backgroundColor: yellow, color: forest, borderColor: forest, clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 90%)", marginTop: "-10vh" }}
        >
          <motion.div 
            initial={{ x: 200, rotate: 10, opacity: 0 }}
            whileInView={{ x: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: CRUNCH_EASE }}
            className="max-w-2xl"
          >
            <div className="flex items-center justify-end gap-4 mb-4 text-xl">
              <span className="font-black uppercase tracking-widest">Spicy Masala</span> <Flame className="fill-current" />
            </div>
            <h2 className={cn("text-6xl md:text-8xl leading-none uppercase mb-6", paytone.className)}
                style={{ filter: `drop-shadow(4px 4px 0 ${forest})`, color: yellow, WebkitTextStroke: `2px ${forest}` }}
            >
              Bring<br/>The Heat.
            </h2>
            <p className="text-xl font-bold">
              Tossed in a violent explosion of red chili, cumin, and black pepper.
            </p>
          </motion.div>
        </div>

      </section>

      {/* 3. THE FRY & SEASON (PROCESS JITTER) */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center py-32 px-8 text-center"
               style={{ backgroundColor: forest, color: yellow, marginTop: "-10vh" }}>
        
        <div className="max-w-4xl flex flex-col items-center">
          <Leaf size={48} className="mb-12" />
          
          <motion.h2 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: CRUNCH_EASE }}
            className={cn("text-5xl md:text-7xl leading-tight uppercase mb-12", paytone.className)}
          >
            How it's made.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { step: "1", title: "THICK SLICED", text: "We don't do paper thin. We cut 'em thick so they fight back when you bite." },
              { step: "2", title: "KETTLE FRIED", text: "Dropped in pure, screaming hot coconut oil until perfectly golden." },
              { step: "3", title: "AGGRESSIVELY SEASONED", text: "Tossed by hand while hot. We do not skimp on the flavor dust." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: CRUNCH_EASE, delay: i * 0.1 }}
                className="p-8 hover:animate-[spin_0.1s_linear_infinite] cursor-crosshair border-[8px]"
                style={{ backgroundColor: yellow, color: forest, borderColor: forest, transform: `rotate(${i % 2 === 0 ? '-3deg' : '4deg'})` }}
              >
                <div className={cn("text-5xl mb-4 opacity-30", paytone.className)}>{item.step}</div>
                <div className={cn("text-2xl uppercase mb-4", paytone.className)}>{item.title}</div>
                <div className="font-bold">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* 4. THE BAG (FOOTER) */}
      <section className="w-full pt-32 pb-16 px-8 text-center border-t-[16px]" style={{ backgroundColor: yellow, borderColor: forest }}>
        
        <motion.div 
          initial={{ scale: 1.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: CRUNCH_EASE }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          <h2 className={cn("text-6xl md:text-[8rem] uppercase leading-none mb-12", paytone.className)} style={{ filter: `drop-shadow(8px 8px 0 ${forest})`, color: forest }}>
            Snack<br/>Hard.
          </h2>
          
          <button 
            className={cn("hover-border group flex items-center justify-center gap-4 text-3xl md:text-5xl uppercase px-12 py-8 hover:scale-90 hover:-rotate-3 transition-transform duration-100 ease-out border-[8px] border-transparent", paytone.className)}
            style={{ backgroundColor: forest, color: yellow }}
          >
            Grab a Bag <MoveRight size={48} className="group-hover:translate-x-4 transition-transform" />
          </button>
        </motion.div>

        <footer className="mt-32 pt-8 border-t-[8px] flex flex-col md:flex-row justify-between items-center font-black uppercase tracking-widest text-sm" style={{ borderColor: forest, color: forest }}>
          <div>© {new Date().getFullYear()} SNAP CHIPS INC.</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Insta</a>
            <a href="#" className="hover:underline">TikTok</a>
            <a href="#" className="hover:underline">Legal</a>
          </div>
        </footer>

      </section>

    </div>
  );
}
