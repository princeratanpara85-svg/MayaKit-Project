"use client";

import React, { useRef, useState } from "react";
import { Palette } from "@/data/palettes";
import { Prata, Josefin_Sans } from "next/font/google";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, View, Sparkles, Box, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const prata = Prata({ weight: "400", subsets: ["latin"] });
const josefin = Josefin_Sans({ subsets: ["latin"] });

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const DRAWER_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];



export function WallpaperDecorDemo({ palette }: { palette: Palette }) {
  const [gold, navy] = palette.colors; // Dynamic, colors may be swapped
  const encodedGold = gold.replace("#", "%23");

  const patterns = {
    damask: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodedGold}' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    geometric: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='${encodedGold}' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    botanical: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodedGold}' fill-opacity='0.25'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };
  
  const [activePattern, setActivePattern] = useState<keyof typeof patterns>("damask");
  const { scrollY } = useScroll();
  
  // Parallax surface movement to emphasize physical texture
  const surfaceY = useTransform(scrollY, [0, 2000], ["0px", "400px"]);

  return (
    <div 
      className={cn(
        "relative min-h-screen w-full overflow-hidden selection:bg-[#D4AF37] selection:text-[#0B1F3A]",
        josefin.className
      )}
      style={{ backgroundColor: navy, color: gold }}
    >
      {/* GLOBAL NAVBAR */}
      <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-screen">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-sm font-bold tracking-widest hover:opacity-70 transition-opacity active:scale-[0.97]"
          style={{ color: gold }}
        >
          ← GALLERY
        </Link>
        <div className={cn("text-xl tracking-[0.3em] uppercase", prata.className)} style={{ color: gold }}>
          Aurelia
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest pointer-events-auto" style={{ color: gold }}>
          <button className="hover:opacity-70 transition-opacity active:scale-[0.97] uppercase">Collections</button>
          <button className="hover:opacity-70 transition-opacity active:scale-[0.97] uppercase">Visualizer</button>
        </div>
      </header>

      {/* SECTION 1: CANVAS HERO */}
      <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
        {/* Tiling Grid Background */}
        <motion.div 
          className="absolute inset-[-100%]"
          style={{ 
            backgroundImage: patterns.damask,
            backgroundSize: "120px 120px",
            backgroundRepeat: "repeat",
            y: surfaceY,
          }}
        />
        
        {/* Vignette overlay to focus the center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,31,58,0.85)_100%)] pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: DRAWER_EASE }}
            className="mb-8 border border-[#D4AF37]/30 p-2 rounded-full backdrop-blur-sm"
          >
            <div className="px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-[#D4AF37]/20" style={{ backgroundColor: 'rgba(11,31,58,0.5)' }}>
              2027 Signature Collection
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: DRAWER_EASE, delay: 0.1 }}
            className={cn("text-6xl md:text-8xl lg:text-9xl tracking-tight mb-8", prata.className)}
          >
            Surface &<br/>
            <span className="italic">Substance.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: DRAWER_EASE, delay: 0.2 }}
            className="text-lg md:text-xl max-w-xl mx-auto opacity-80 leading-relaxed font-light px-6"
          >
            Transform your architecture with deeply textured, artisan-crafted wallpapers that bring narrative to empty walls.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: THE COLLECTION SHOWCASE */}
      <section className="py-32 px-6 md:px-12 w-full max-w-7xl mx-auto relative z-20">
        <div className="flex items-end justify-between mb-20 border-b pb-8" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
          <div>
            <h2 className={cn("text-4xl md:text-5xl mb-4", prata.className)}>The Archives</h2>
            <p className="opacity-70 font-light tracking-wide">Historical patterns, re-mastered for the modern home.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 font-bold tracking-widest text-xs uppercase hover:opacity-70 transition-opacity active:scale-[0.97]">
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: "damask", name: "Imperial Damask", type: "Silk Textured" },
            { id: "geometric", name: "Deco Framework", type: "Matte Vinyl" },
            { id: "botanical", name: "Midnight Flora", type: "Hand-pressed Paper" }
          ].map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: DRAWER_EASE, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 border" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                {/* Pattern Container */}
                <div 
                  className="absolute inset-0 opacity-40 transition-transform duration-1000 ease-out group-hover:scale-110"
                  style={{ 
                    backgroundImage: patterns[item.id as keyof typeof patterns],
                    backgroundSize: "80px 80px",
                    backgroundRepeat: "repeat"
                  }}
                />
                
                {/* Interaction Lens Hover Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none flex items-center justify-center bg-[#0B1F3A]/40 backdrop-blur-[2px]">
                  <div className="h-16 w-16 rounded-full border border-[#D4AF37] flex items-center justify-center">
                    <View size={20} />
                  </div>
                </div>
              </div>
              <h3 className={cn("text-2xl mb-1", prata.className)}>{item.name}</h3>
              <p className="text-sm uppercase tracking-widest opacity-60">{item.type}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THE ROOM VISUALIZER */}
      <section className="py-32 w-full border-y relative overflow-hidden" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
        
        {/* Background ambient pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: patterns.geometric, backgroundSize: "40px" }} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          
          {/* Left: Swatch Selector */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6 opacity-70">
              <Sparkles size={16} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Interactive</span>
            </div>
            <h2 className={cn("text-4xl md:text-5xl mb-8", prata.className)}>See it in<br/>your space.</h2>
            <p className="opacity-70 mb-12 font-light leading-relaxed">
              Select a swatch below to visualize the pattern mapped to architectural scale.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { id: "damask", name: "Imperial Damask" },
                { id: "geometric", name: "Deco Framework" },
                { id: "botanical", name: "Midnight Flora" }
              ].map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setActivePattern(swatch.id as keyof typeof patterns)}
                  className="w-full flex items-center justify-between p-6 border text-left transition-all duration-300 active:scale-[0.98]"
                  style={{ 
                    borderColor: activePattern === swatch.id ? gold : 'rgba(212,175,55,0.2)',
                    backgroundColor: activePattern === swatch.id ? 'rgba(212,175,55,0.05)' : 'transparent'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="h-10 w-10 border opacity-80"
                      style={{ 
                        borderColor: 'rgba(212,175,55,0.3)',
                        backgroundImage: patterns[swatch.id as keyof typeof patterns],
                        backgroundSize: "20px 20px"
                      }}
                    />
                    <span className={cn("text-lg", activePattern === swatch.id ? "opacity-100" : "opacity-60")}>
                      {swatch.name}
                    </span>
                  </div>
                  {activePattern === swatch.id && <ChevronRight size={18} />}
                </button>
              ))}
            </div>
          </div>

          {/* Right: The Wall Visualizer */}
          <div className="lg:col-span-8">
            <div className="w-full aspect-[4/3] md:aspect-video relative overflow-hidden border p-4 sm:p-8" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
              
              {/* The "Wall" that animates patterns */}
              <div className="absolute inset-0 bg-[#0B1F3A]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePattern}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: patterns[activePattern],
                      backgroundSize: "160px 160px",
                      backgroundRepeat: "repeat"
                    }}
                  />
                </AnimatePresence>
                
                {/* Realistic Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/20 to-[#0B1F3A]/80 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15)_0%,transparent_60%)] pointer-events-none" />
              </div>

              {/* Architectural Foreground Elements (Stylized Room) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/3 border-t border-x rounded-t-lg backdrop-blur-sm flex items-end justify-center pb-8" style={{ borderColor: 'rgba(212,175,55,0.4)', backgroundColor: 'rgba(11,31,58,0.4)' }}>
                <div className="text-xs tracking-[0.3em] uppercase opacity-50 font-bold">Stylized Sofa</div>
              </div>
              
              {/* Picture Frame on Wall */}
              <div className="absolute top-1/4 left-1/4 w-32 h-40 border-4 shadow-2xl flex items-center justify-center backdrop-blur-md" style={{ borderColor: gold, backgroundColor: 'rgba(11,31,58,0.2)' }}>
                <Box size={24} className="opacity-30" />
              </div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-70 px-4 py-2 border rounded-full backdrop-blur-md" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(11,31,58,0.5)' }}>
                <Maximize2 size={12} /> Scale: 1:10
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 4: SUBSTANTIAL FOOTER */}
      <footer className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          <div className="lg:col-span-1">
            <div className={cn("text-3xl tracking-widest uppercase mb-6", prata.className)}>Aurelia</div>
            <p className="opacity-60 text-sm leading-loose">
              Elevating interior architecture through meticulously crafted, bespoke wall coverings since 1994.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6 opacity-80">Materials</h4>
            <ul className="flex flex-col gap-4 opacity-60 text-sm">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Heavyweight Vinyl</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Artisan Silk</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Hand-pressed Paper</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Metallic Foil</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6 opacity-80">Services</h4>
            <ul className="flex flex-col gap-4 opacity-60 text-sm">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Order Samples</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Trade Program</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Installation Guide</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Bespoke Printing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6 opacity-80">Connect</h4>
            <ul className="flex flex-col gap-4 opacity-60 text-sm">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Instagram</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Pinterest</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Architectural Digest</a></li>
            </ul>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t opacity-40 text-xs font-bold tracking-widest uppercase" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
          <span>© {new Date().getFullYear()} Aurelia Decor</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
