"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Staatliches, Public_Sans } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Initialize fonts
const staatliches = Staatliches({ weight: "400", subsets: ["latin"] });
const publicSans = Public_Sans({ subsets: ["latin"] });

// Custom sharp industrial curve per user request (Heavy machine lever snap)
const INDUSTRIAL_SNAP = [0.9, 0, 0.1, 1];



// Persistent SVG Cross-Section
function PinnedCrossSection() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  return (
    <div className="fixed right-[-10vw] top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] opacity-10 pointer-events-none z-0">
      <motion.svg 
        style={{ rotate }}
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="#F54F1B" strokeWidth="10" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#F54F1B" strokeWidth="4" />
        <line x1="50" y1="5" x2="50" y2="20" stroke="#F54F1B" strokeWidth="4" />
        <line x1="50" y1="80" x2="50" y2="95" stroke="#F54F1B" strokeWidth="4" />
        <line x1="5" y1="50" x2="20" y2="50" stroke="#F54F1B" strokeWidth="4" />
        <line x1="80" y1="50" x2="95" y2="50" stroke="#F54F1B" strokeWidth="4" />
      </motion.svg>
    </div>
  );
}

// Marquee Component
function SpecificationsMarquee() {
  return (
    <div className="w-full bg-[#F54F1B] text-[#1E223D] py-4 overflow-hidden flex whitespace-nowrap border-y-4 border-[#1E223D]">
      <motion.div 
        className={cn("flex space-x-12", staatliches.className)}
        animate={{ x: [0, -1000] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex space-x-12 items-center text-2xl tracking-widest">
            <span>SCHEDULE 40 PVC</span>
            <span className="w-2 h-2 rounded-full bg-[#1E223D]" />
            <span>HDPE PIPING</span>
            <span className="w-2 h-2 rounded-full bg-[#1E223D]" />
            <span>ISO 9001:2015</span>
            <span className="w-2 h-2 rounded-full bg-[#1E223D]" />
            <span>10,000 PSI RATED</span>
            <span className="w-2 h-2 rounded-full bg-[#1E223D]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function PipeManufacturingDemo({ palette }: { palette: Palette }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax for Hero
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "min-h-screen w-full relative",
        publicSans.className
      )}
      style={{
        backgroundColor: palette.colors[0], // #1E223D
        color: palette.colors[1], // #F54F1B
      }}
    >
      <PinnedCrossSection />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-[#1E223D]/90 backdrop-blur-md border-b border-[#F54F1B]/20">
        <Link href="/color-combo" className="flex items-center gap-2 group">
          <ArrowRight className="w-5 h-5 rotate-180 transition-transform duration-150 ease-out group-active:scale-[0.97]" />
          <span className="font-bold uppercase tracking-wider text-sm transition-transform duration-150 ease-out group-active:scale-[0.97]">Back</span>
        </Link>
        <div className={cn("text-3xl tracking-widest", staatliches.className)}>
          APEX TUBULAR
        </div>
        <button className="bg-[#F54F1B] text-[#1E223D] px-6 py-2 font-bold uppercase tracking-wider text-sm transition-transform duration-150 ease-out active:scale-[0.97]">
          Quote
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex flex-col justify-end p-8 md:p-16 overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <img 
            src="https://picsum.photos/seed/037b3319/1200/800" 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: INDUSTRIAL_SNAP }}
          >
            <h1 className={cn("text-7xl md:text-9xl tracking-tight leading-[0.85] mb-6", staatliches.className)}>
              STRUCTURAL <br />
              INTEGRITY <br />
              AT SCALE.
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl text-[#F54F1B]/80 font-light border-l-4 border-[#F54F1B] pl-6">
              Industrial grade piping systems engineered for the world's most demanding infrastructure projects. From high-pressure steel to advanced polymer extrusion.
            </p>
          </motion.div>
        </div>
      </section>

      <SpecificationsMarquee />

      {/* Extrusion Process Section */}
      <section className="relative w-full py-32 px-8 md:px-16 border-t border-[#F54F1B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className={cn("text-5xl md:text-7xl tracking-wide", staatliches.className)}>
              THE EXTRUSION LINE
            </h2>
          </div>

          {/* Wipe-in Extrusion Cards */}
          <div className="space-y-32">
            {[
              { title: "RAW POLYMER HOPPER", desc: "Pure high-density polyethylene pellets fed into the heating chamber.", img: "https://picsum.photos/seed/aa848e0c/1200/800" },
              { title: "HIGH-TEMP EXTRUSION", desc: "Material forced through a precision die at 400°F under massive hydraulic pressure.", img: "https://picsum.photos/seed/037b3319/1200/800" },
              { title: "COOLING CALIBRATION", desc: "Vacuum sizing and chilled water baths set the exact external diameter.", img: "https://picsum.photos/seed/aa848e0c/1200/800" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="flex flex-col md:flex-row gap-8 md:gap-16 items-center border border-[#F54F1B] bg-[#1E223D] p-8"
              >
                <div className="w-full md:w-1/2">
                  <img 
                    src={step.img} 
                    alt={step.title}
                    className="w-full h-[400px] object-cover border border-[#F54F1B]"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className={cn("text-[#F54F1B]/50 text-8xl mb-4", staatliches.className)}>0{i + 1}</div>
                  <h3 className={cn("text-4xl md:text-5xl mb-4", staatliches.className)}>
                    {step.title}
                  </h3>
                  <p className="text-xl text-[#F54F1B]/80 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heavy Footer */}
      <footer className="w-full bg-[#F54F1B] text-[#1E223D] pt-32 pb-16 px-8 md:px-16 border-t-8 border-[#1E223D]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className={cn("text-6xl md:text-8xl tracking-tight leading-none mb-8", staatliches.className)}>
              PROCURE<br/>YOUR NEXT<br/>PROJECT.
            </h2>
            <button className="bg-[#1E223D] text-[#F54F1B] px-12 py-6 text-xl font-bold uppercase tracking-widest transition-transform duration-150 ease-out hover:bg-[#1E223D]/90 active:scale-[0.97]">
              REQUEST A QUOTE
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm font-bold uppercase tracking-wider">
            <div className="flex flex-col gap-4">
              <span className="text-[#1E223D]/50 border-b border-[#1E223D]/20 pb-2 mb-2">PRODUCTS</span>
              <a href="#" className="hover:opacity-70 transition-opacity">HDPE Pipe</a>
              <a href="#" className="hover:opacity-70 transition-opacity">PVC Schedule 40</a>
              <a href="#" className="hover:opacity-70 transition-opacity">PVC Schedule 80</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Fittings & Valves</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[#1E223D]/50 border-b border-[#1E223D]/20 pb-2 mb-2">COMPANY</span>
              <a href="#" className="hover:opacity-70 transition-opacity">About Us</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Quality Specs</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Distributors</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-[#1E223D]/20 flex flex-col md:flex-row justify-between text-sm font-bold uppercase tracking-wider text-[#1E223D]/60">
          <span>© 2026 APEX TUBULAR INDUSTRIES</span>
          <span>ISO 9001 CERTIFIED FACILITY</span>
        </div>
      </footer>
    </div>
  );
}
