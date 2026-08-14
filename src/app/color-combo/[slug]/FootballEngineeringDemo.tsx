"use client";

import React, { useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Unbounded, Lexend } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hexagon, Activity, Wind, Target } from "lucide-react";

const unbounded = Unbounded({ subsets: ["latin"], weight: ["400", "700", "900"] });
const lexend = Lexend({ subsets: ["latin"], weight: ["300", "400", "600"] });

gsap.registerPlugin(ScrollTrigger);

const isDark = (hex: string) => {
  const rgb = parseInt(hex.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 128;
};

const DuotoneImage = ({ src, alt, bg, fg, className }: { src: string, alt: string, bg: string, fg: string, className?: string }) => {
  const lightColor = isDark(bg) ? fg : bg;
  const darkColor = isDark(bg) ? bg : fg;

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`} style={{ backgroundColor: lightColor }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover absolute inset-0"
        style={{ filter: "grayscale(100%) contrast(1.3)", mixBlendMode: "multiply" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: darkColor, mixBlendMode: "lighten" }}
      />
    </div>
  );
};

// Reusable HexTile Component
const HexTile = ({ col, row, bg, fg, children, isImage = false, borderOnly = false }: any) => {
  const topCalc = `calc(50% + (${row} + ${Math.abs(col) % 2 === 1 ? 0.5 : 0}) * var(--h))`;
  const leftCalc = `calc(50% + ${col * 0.75} * var(--w))`;

  return (
    <div 
      className="hex-tile absolute transition-all duration-300 hover:z-10 hover:scale-105"
      style={{
        width: "var(--w)",
        height: "var(--h)",
        left: leftCalc,
        top: topCalc,
        transform: "translate(-50%, -50%)",
        zIndex: 1
      }}
    >
      <div 
        className="w-full h-full shadow-2xl"
        style={{
          backgroundColor: borderOnly ? fg : bg,
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      >
        <div 
          className={`absolute inset-[2px] md:inset-[4px] flex items-center justify-center text-center flex-col ${isImage ? 'p-0' : 'p-4 md:p-8'}`}
          style={{
            backgroundColor: isImage ? 'transparent' : bg,
            color: fg,
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        >
          {isImage ? (
            <div className="absolute inset-0">
              {children}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export function FootballEngineeringDemo({ palette }: { palette: Palette }) {
  const fg = palette.colors[0]; // Electric Cyan #00E7FF
  const bg = palette.colors[1]; // Near-black #17181C

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the assembly of each cluster as it scrolls into view
      gsap.utils.toArray('.cluster').forEach((cluster: any) => {
        const tiles = cluster.querySelectorAll('.hex-tile');
        
        gsap.fromTo(tiles, 
          { 
            scale: 0, 
            rotation: () => (Math.random() - 0.5) * 180,
            opacity: 0,
            x: () => (Math.random() - 0.5) * 800,
            y: () => (Math.random() - 0.5) * 800,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cluster,
              start: "top 70%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className={`min-h-screen selection:bg-[${fg}] selection:text-[${bg}]`} 
      style={{ backgroundColor: bg, color: fg, fontFamily: lexend.style.fontFamily }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .hex-grid-container {
          --w: 160px;
          --h: 138.56px; 
        }
        @media (min-width: 768px) {
          .hex-grid-container {
            --w: 320px;
            --h: 277.12px;
          }
        }
      `}} />

      <div ref={containerRef} className="w-full flex flex-col items-center hex-grid-container overflow-hidden">
        
        {/* --- CLUSTER 1: HERO --- */}
        <div className="cluster relative w-full h-[120vh] max-h-[1000px] my-12">
          
          <HexTile col={0} row={0} bg={fg} fg={bg}>
            <h1 className={`text-3xl md:text-5xl font-black uppercase leading-tight ${unbounded.className}`}>
              Aero<br/>Core
            </h1>
            <p className="mt-2 text-xs md:text-sm font-semibold uppercase tracking-widest">Match Series</p>
          </HexTile>

          <HexTile col={-1} row={-1} bg={bg} fg={fg} borderOnly>
            <Wind size={40} className="mb-4 opacity-80" />
            <h3 className={`text-lg md:text-xl font-bold uppercase ${unbounded.className}`}>Kinetic Flight</h3>
            <p className="mt-2 text-xs opacity-70">Engineered for zero-drag trajectory.</p>
          </HexTile>

          <HexTile col={1} row={-1} bg={bg} fg={fg} isImage>
            <DuotoneImage src="https://picsum.photos/seed/029d43a0/1200/800" alt="Football Macro" bg={bg} fg={fg} />
          </HexTile>

          <HexTile col={-1} row={0} bg={bg} fg={fg} isImage>
            <DuotoneImage src="https://picsum.photos/seed/5ec2bf12/1200/800" alt="Technical Texture" bg={bg} fg={fg} />
          </HexTile>

          <HexTile col={1} row={0} bg={bg} fg={fg} borderOnly>
            <Target size={40} className="mb-4 opacity-80" />
            <h3 className={`text-lg md:text-xl font-bold uppercase ${unbounded.className}`}>0.01mm Tolerance</h3>
            <p className="mt-2 text-xs opacity-70">Machine-calibrated symmetry.</p>
          </HexTile>

          <HexTile col={0} row={1} bg={bg} fg={fg}>
            <Hexagon size={32} className="mb-2 opacity-50" />
            <span className="uppercase tracking-[0.2em] text-xs font-bold mt-2">Scroll to Unfold</span>
          </HexTile>

        </div>

        {/* --- CLUSTER 2: CONSTRUCTION --- */}
        <div className="cluster relative w-full h-[120vh] max-h-[1000px] my-12">
          
          <HexTile col={0} row={0} bg={bg} fg={fg} isImage>
            <DuotoneImage src="https://picsum.photos/seed/56af1519/1200/800" alt="Stadium Lights" bg={bg} fg={fg} />
          </HexTile>

          <HexTile col={1} row={0} bg={fg} fg={bg}>
            <h3 className={`text-xl md:text-3xl font-black uppercase leading-tight ${unbounded.className}`}>
              Thermal<br/>Bonded
            </h3>
            <p className="mt-2 text-xs md:text-sm font-semibold opacity-90">Seamless construction prevents water absorption, ensuring identical weight in all weather conditions.</p>
          </HexTile>

          <HexTile col={2} row={-1} bg={bg} fg={fg} borderOnly>
            <h4 className={`text-2xl font-bold uppercase ${unbounded.className}`}>100%</h4>
            <p className="mt-2 text-xs uppercase tracking-widest opacity-70">Moisture Repellent</p>
          </HexTile>

          <HexTile col={-1} row={0} bg={bg} fg={fg} borderOnly>
            <Activity size={40} className="mb-4 opacity-80" />
            <h3 className={`text-lg md:text-xl font-bold uppercase ${unbounded.className}`}>Micro-PU Texture</h3>
            <p className="mt-2 text-xs opacity-70">Enhanced boot grip and control.</p>
          </HexTile>

          <HexTile col={-1} row={1} bg={bg} fg={fg} isImage>
            <DuotoneImage src="https://picsum.photos/seed/24219793/1200/800" alt="Action Kick" bg={bg} fg={fg} />
          </HexTile>

        </div>

        {/* --- CLUSTER 3: PERFORMANCE --- */}
        <div className="cluster relative w-full h-[100vh] max-h-[800px] my-12">
          
          <HexTile col={0} row={0} bg={bg} fg={fg} borderOnly>
            <h3 className={`text-2xl md:text-4xl font-black uppercase leading-tight ${unbounded.className}`}>
              FIFA PRO<br/>Certified
            </h3>
            <p className="mt-4 text-xs opacity-70">Exceeds the highest global standards for roundness, bounce, and weight.</p>
          </HexTile>

          <HexTile col={-1} row={-1} bg={bg} fg={fg} isImage>
            <DuotoneImage src="https://picsum.photos/seed/029d43a0/1200/800" alt="Ball Detail" bg={bg} fg={fg} />
          </HexTile>

          <HexTile col={1} row={-1} bg={fg} fg={bg}>
            <h4 className={`text-xl font-bold uppercase ${unbounded.className}`}>Deploy the Apex</h4>
            <button className="mt-4 px-6 py-3 border-2 border-current text-xs font-bold uppercase tracking-widest hover:bg-current hover:text-[var(--bg)] transition-colors" style={{ '--bg': fg } as any}>
              Order Specs
            </button>
          </HexTile>

        </div>

        {/* --- FOOTER --- */}
        <div className="w-full max-w-5xl mx-auto border-t pt-16 pb-8 px-8 mt-24 flex flex-col md:flex-row justify-between items-start gap-12" style={{ borderColor: fg }}>
          
          <div className="max-w-sm">
            <h2 className={`text-4xl font-black uppercase tracking-tighter mb-4 ${unbounded.className}`}>AERO-CORE MFG.</h2>
            <p className="opacity-70 text-sm leading-relaxed font-light">
              Engineering the geometry of victory. We partner with top-tier leagues and academies to provide precision-manufactured match balls.
            </p>
            <div className="mt-8 flex gap-4">
              <span className="p-3 border rounded-full opacity-50 hover:opacity-100 cursor-pointer" style={{ borderColor: fg }}><Target size={20} /></span>
              <span className="p-3 border rounded-full opacity-50 hover:opacity-100 cursor-pointer" style={{ borderColor: fg }}><Activity size={20} /></span>
            </div>
          </div>

          <div className="flex gap-16 text-sm font-semibold uppercase tracking-widest">
            <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-2">Products</span>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Pro Match Series</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Training Grade</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Futsal Lines</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-2">Technical</span>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Lab Data</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Materials</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Certifications</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Partner Inquiry</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
