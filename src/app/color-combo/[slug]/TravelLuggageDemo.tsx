"use client";

import React, { useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Oswald, Epilogue } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Droplets, Maximize, Anchor } from "lucide-react";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
const epilogue = Epilogue({ subsets: ["latin"], weight: ["400", "500", "700"] });

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
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover absolute inset-0"
      />
    </div>
  );
};

export function TravelLuggageDemo({ palette }: { palette: Palette }) {
  const bg = palette.colors[0]; // Deep Emerald
  const fg = palette.colors[1]; // Warm Copper

  const explodeRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. EXPLODED VIEW ANIMATION
      const explodeTl = gsap.timeline({
        scrollTrigger: {
          trigger: explodeRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        }
      });

      // Initial state for annotations
      gsap.set(".anno", { opacity: 0, y: 20 });

      explodeTl
        .to('.hero-text', { opacity: 0, y: -50, duration: 0.5 }, 0)
        .to('.main-bag', { scale: 0.85, duration: 1, ease: "power2.inOut" }, 0)
        .to('.part-tl', { x: '-28vw', y: '-28vh', rotation: -12, scale: 1.1, duration: 1, ease: "power2.inOut" }, 0)
        .to('.part-tr', { x: '28vw', y: '-28vh', rotation: 8, scale: 1.1, duration: 1, ease: "power2.inOut" }, 0)
        .to('.part-bl', { x: '-28vw', y: '28vh', rotation: -6, scale: 1.1, duration: 1, ease: "power2.inOut" }, 0)
        .to('.part-br', { x: '28vw', y: '28vh', rotation: 14, scale: 1.1, duration: 1, ease: "power2.inOut" }, 0)
        .to('.anno', { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }, 0.7)
        .to({}, { duration: 0.5 }); // Hold at the end


      // 2. HORIZONTAL SLIDER ANIMATION
      const slider = sliderRef.current;
      if (slider) {
        gsap.to(slider, {
          xPercent: -100 + (100 / 3), // 3 items, move to last
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className={`min-h-screen selection:bg-[${fg}] selection:text-[${bg}]`} 
      style={{ backgroundColor: bg, color: fg, fontFamily: epilogue.style.fontFamily }}
    >
      
      {/* --- EXPLODED VIEW SECTION --- */}
      <div ref={explodeRef} className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">
        
        <div className="hero-text absolute top-12 md:top-24 text-center z-30 px-6">
          <span className="uppercase tracking-widest text-sm font-bold opacity-80 block mb-4">
            Industrial Grade Luggage
          </span>
          <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none ${oswald.className}`}>
            Deconstruct<br/>The Journey.
          </h1>
          <p className="mt-6 text-lg md:text-xl font-medium opacity-90 max-w-md mx-auto">
            Scroll to unpack the engineering behind the world's most resilient travel gear.
          </p>
        </div>

        {/* Annotations (Revealed on scroll) */}
        <div className="anno absolute top-[15%] left-[5%] md:left-[10%] w-48 md:w-64 z-30">
          <div className="flex items-center gap-3 mb-2 font-bold uppercase tracking-wider">
            <Droplets size={20} /> Aquaguard Zips
          </div>
          <p className="text-sm opacity-80 leading-relaxed font-medium">Polyurethane coated closures block moisture at the most vulnerable ingress points.</p>
        </div>
        
        <div className="anno absolute top-[15%] right-[5%] md:right-[10%] w-48 md:w-64 z-30 text-right">
          <div className="flex items-center justify-end gap-3 mb-2 font-bold uppercase tracking-wider">
            Aerospace Shell <ShieldCheck size={20} />
          </div>
          <p className="text-sm opacity-80 leading-relaxed font-medium">5052 Aluminum alloy construction absorbs impact without shattering or warping.</p>
        </div>

        <div className="anno absolute bottom-[15%] left-[5%] md:left-[10%] w-48 md:w-64 z-30">
          <div className="flex items-center gap-3 mb-2 font-bold uppercase tracking-wider">
            <Anchor size={20} /> Precision Hardware
          </div>
          <p className="text-sm opacity-80 leading-relaxed font-medium">Machined steel latches and hinges tested for 50,000 cycles under maximum tension.</p>
        </div>

        <div className="anno absolute bottom-[15%] right-[5%] md:right-[10%] w-48 md:w-64 z-30 text-right">
          <div className="flex items-center justify-end gap-3 mb-2 font-bold uppercase tracking-wider">
            Silent Glide <Maximize size={20} />
          </div>
          <p className="text-sm opacity-80 leading-relaxed font-medium">Dual-bearing polyurethane wheels offer frictionless movement across rough tarmac.</p>
        </div>

        {/* Flying Parts (Initially centered, fly out on scroll) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="part-tl w-40 h-40 md:w-56 md:h-56 absolute z-10 p-2 shadow-2xl" style={{ backgroundColor: bg }}>
            <DuotoneImage src="https://picsum.photos/seed/aa580d02/1200/800" alt="Zipper detail" bg={bg} fg={fg} className="w-full h-full" />
          </div>
          <div className="part-tr w-40 h-40 md:w-56 md:h-56 absolute z-10 p-2 shadow-2xl" style={{ backgroundColor: bg }}>
            <DuotoneImage src="https://picsum.photos/seed/574637bf/1200/800" alt="Shell texture" bg={bg} fg={fg} className="w-full h-full" />
          </div>
          <div className="part-bl w-40 h-40 md:w-56 md:h-56 absolute z-10 p-2 shadow-2xl" style={{ backgroundColor: bg }}>
            <DuotoneImage src="https://picsum.photos/seed/ffabe7b2/1200/800" alt="Hardware detail" bg={bg} fg={fg} className="w-full h-full" />
          </div>
          <div className="part-br w-40 h-40 md:w-56 md:h-56 absolute z-10 p-2 shadow-2xl" style={{ backgroundColor: bg }}>
            <DuotoneImage src="https://picsum.photos/seed/89dddc4d/1200/800" alt="Wheel detail" bg={bg} fg={fg} className="w-full h-full" />
          </div>
        </div>

        {/* Main Bag */}
        <div className="main-bag relative z-20 w-[80%] max-w-[500px] aspect-[3/4] shadow-2xl p-4" style={{ backgroundColor: bg }}>
          <DuotoneImage 
            src="https://picsum.photos/seed/eedc9f85/1200/800" 
            alt="The Atlas Carry-On" 
            bg={bg} fg={fg} 
            className="w-full h-full" 
          />
          <h2 
            className={`absolute inset-0 flex items-center justify-center text-[15vw] md:text-[8vw] font-black uppercase pointer-events-none mix-blend-overlay opacity-30 ${oswald.className}`}
          >
            ATLAS
          </h2>
        </div>
      </div>

      {/* --- HORIZONTAL PRODUCT LINEUP --- */}
      <div ref={horizontalRef} className="h-screen w-full relative overflow-hidden">
        <div ref={sliderRef} className="flex h-full w-[300vw]">
          
          {/* Product 1 */}
          <div className="w-[100vw] h-full flex items-center p-8 md:p-24 border-r-2" style={{ borderColor: fg }}>
            <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-12">
              <div className="w-full md:w-1/2">
                <span className="uppercase tracking-widest font-bold opacity-70 mb-4 block">01 / The Lineup</span>
                <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 ${oswald.className}`}>
                  The Carry-On
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-md font-medium leading-relaxed">
                  Engineered for the overhead bin. Features a compressible interior system, allowing 20% more packing capacity in a compliant shell.
                </p>
                <button className="px-8 py-4 uppercase tracking-widest font-bold text-sm transition-transform hover:-translate-y-1" style={{ backgroundColor: fg, color: bg }}>
                  View Specifications
                </button>
              </div>
              <div className="w-full md:w-1/2 aspect-square p-6" style={{ backgroundColor: fg }}>
                <DuotoneImage src="https://picsum.photos/seed/23d889fe/1200/800" alt="Carry On" bg={bg} fg={fg} className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="w-[100vw] h-full flex items-center p-8 md:p-24 border-r-2" style={{ borderColor: fg }}>
            <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-7xl mx-auto gap-12">
              <div className="w-full md:w-1/2 aspect-square p-6" style={{ backgroundColor: fg }}>
                <DuotoneImage src="https://picsum.photos/seed/908d54ff/1200/800" alt="Backpack" bg={bg} fg={fg} className="w-full h-full" />
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-12">
                <span className="uppercase tracking-widest font-bold opacity-70 mb-4 block">02 / The Lineup</span>
                <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 ${oswald.className}`}>
                  The Daypack
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-md font-medium leading-relaxed">
                  Built for transit. Waterproof ballistic nylon shell with a suspended laptop compartment and quick-access tech pockets.
                </p>
                <button className="px-8 py-4 uppercase tracking-widest font-bold text-sm transition-transform hover:-translate-y-1" style={{ backgroundColor: fg, color: bg }}>
                  View Specifications
                </button>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="w-[100vw] h-full flex items-center p-8 md:p-24">
            <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-12">
              <div className="w-full md:w-1/2">
                <span className="uppercase tracking-widest font-bold opacity-70 mb-4 block">03 / The Lineup</span>
                <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 ${oswald.className}`}>
                  The Trunk
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-md font-medium leading-relaxed">
                  For the extended journey. Features reinforced corner guards, dual TSA locks, and a 120L capacity for multi-week travel.
                </p>
                <button className="px-8 py-4 uppercase tracking-widest font-bold text-sm transition-transform hover:-translate-y-1" style={{ backgroundColor: fg, color: bg }}>
                  View Specifications
                </button>
              </div>
              <div className="w-full md:w-1/2 aspect-[4/3] p-6" style={{ backgroundColor: fg }}>
                <DuotoneImage src="https://picsum.photos/seed/f6549452/1200/800" alt="Trunk Luggage" bg={bg} fg={fg} className="w-full h-full" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="w-full border-t-4 py-24 px-8 md:px-16" style={{ borderColor: fg }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          
          <div className="max-w-md">
            <h3 className={`text-5xl font-black uppercase tracking-tighter mb-6 ${oswald.className}`}>
              <div className={`text-9xl opacity-20 font-black absolute -top-12 -left-12 ${oswald.className}`}>01</div>
              BUILT FOR THE LONG HAUL
            </h3>
            <p className="opacity-80 font-medium leading-relaxed mb-8">
              Every piece of our luggage is backed by a lifetime warranty. If we can't fix it, we replace it. No questions asked.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Join our dispatch" 
                className="px-4 py-3 bg-transparent border-2 outline-none font-bold placeholder:opacity-50 flex-1" 
                style={{ borderColor: fg, color: fg }} 
              />
              <button 
                className="px-6 py-3 uppercase tracking-widest font-bold text-sm"
                style={{ backgroundColor: fg, color: bg }}
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex gap-16 md:gap-24 uppercase tracking-widest text-sm font-bold">
            <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-2">Shop</span>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Carry-On</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Checked</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Backpacks</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Accessories</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-2">Support</span>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Lifetime Warranty</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Repairs</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Shipping & Returns</a>
              <a href="#" className="hover:underline underline-offset-4 decoration-2">Contact Us</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t-2 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 font-bold uppercase tracking-widest text-xs" style={{ borderColor: fg }}>
          <span>© {new Date().getFullYear()} Atlas Travel Goods.</span>
          <div className="flex gap-6">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>

    </div>
  );
}
