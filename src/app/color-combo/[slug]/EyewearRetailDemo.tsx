"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Unbounded, Lexend } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const unbounded = Unbounded({ subsets: ['latin'], weight: ['400', '600', '800', '900'], variable: '--font-unbounded' });
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-lexend' });

export function EyewearRetailDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [cyan, charcoal] = palette.colors; 

  useGSAP(() => {
    // 1. Hero Blur Focus (Intro Animation on Load)
    gsap.to(".hero-focus-scrub", {
      filter: "blur(0px)",
      scale: 1,
      duration: 2,
      delay: 0.5,
      ease: "power2.out"
    });

    // Parallax on hero image
    gsap.to(".hero-parallax", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Aperture Masks on Scroll (reveal in)
    gsap.utils.toArray(".aperture-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { clipPath: "circle(0% at center)" },
        {
          clipPath: "circle(50% at center)", // base state before hover
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    });

    // 3. Sticky Focal Timeline
    const focalItems = gsap.utils.toArray(".focal-item");
    focalItems.forEach((item: any, i) => {
      // Blur out other items, focus active item
      ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(item, { filter: "blur(0px)", opacity: 1, duration: 0.5 });
          gsap.to(".lens-graphic-inner", { scale: 1 + (i * 0.2), rotation: i * 45, duration: 1, ease: "back.out(1.7)" });
        },
        onLeaveBack: () => {
          gsap.to(item, { filter: "blur(8px)", opacity: 0.3, duration: 0.5 });
          gsap.to(".lens-graphic-inner", { scale: 1 + ((i-1) * 0.2), rotation: (i-1) * 45, duration: 1, ease: "back.out(1.7)" });
        },
        onEnterBack: () => {
          gsap.to(item, { filter: "blur(0px)", opacity: 1, duration: 0.5 });
          gsap.to(".lens-graphic-inner", { scale: 1 + (i * 0.2), rotation: i * 45, duration: 1, ease: "back.out(1.7)" });
        },
        onLeave: () => {
          gsap.to(item, { filter: "blur(8px)", opacity: 0.3, duration: 0.5 });
        }
      });
    });

    // 4. Museum Placard Parallax
    gsap.to(".museum-img", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".museum-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // 5. Colossal Footer Focus Pull
    gsap.fromTo(".footer-focus-pull",
      { filter: "blur(30px)", opacity: 0.5, scale: 1.1 },
      {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${unbounded.variable} ${lexend.variable} overflow-x-hidden font-lexend`}
      style={{ backgroundColor: charcoal, color: cyan }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* Duotone mapping for cyan/charcoal */
        .duotone-optic {
          /* filter removed as requested */
        }
        
        /* Interactive Aperture Mask */
        .aperture-mask {
          clip-path: circle(50% at center);
          transition: clip-path 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .aperture-wrapper:hover .aperture-mask {
          clip-path: circle(75% at center);
        }
        .aperture-wrapper:hover .aperture-img {
          transform: scale(1.05);
        }
        .aperture-img {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Footer text mask */
        .masked-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
        }
      `}} />

      {/* SVG Duotone Definition */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="duotone-cyan">
          <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" result="gray" />
          <feComponentTransfer colorInterpolationFilters="sRGB">
            <feFuncR type="table" tableValues="0.090 0"></feFuncR>
            <feFuncG type="table" tableValues="0.094 0.906"></feFuncG>
            <feFuncB type="table" tableValues="0.110 1"></feFuncB>
          </feComponentTransfer>
        </filter>
      </svg>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-8 md:px-12 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
        <div className="font-unbounded text-2xl font-black tracking-tighter uppercase pointer-events-auto">
          CLARO
        </div>
        <div className="hidden md:flex gap-12 font-lexend text-xs tracking-[0.2em] uppercase font-bold pointer-events-auto">
          <a className="hover:opacity-70 transition-opacity cursor-pointer">Vision</a>
          <a className="hover:opacity-70 transition-opacity cursor-pointer">Sun</a>
          <a className="hover:opacity-70 transition-opacity cursor-pointer">Technology</a>
        </div>
        <div className="font-lexend text-xs tracking-widest uppercase pointer-events-auto border-b border-transparent hover:border-current transition-colors cursor-pointer">
          Cart [0]
        </div>
      </nav>

      {/* 1. LAYERED HERO (Scroll Scrubbed Blur) */}
      <section className="hero-section relative w-full h-[120vh] bg-black">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center hero-focus-scrub" style={{ filter: "blur(10px)", transform: "scale(1.05)" }}>
          {/* Background image constrained to a massive central lens shape */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
             <div className="w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] rounded-full overflow-hidden absolute">
                <img 
                  src="https://picsum.photos/seed/8f1f0b18/1200/800" 
                  className="w-full h-full object-cover duotone-optic hero-parallax scale-125" 
                  alt="Optical clarity" 
                />
             </div>
          </div>
          {/* Overlapping dramatic typography */}
          <div className="relative z-10 w-full px-8 md:px-12 flex flex-col pointer-events-none">
            <h1 className="font-unbounded text-[20vw] font-black leading-[0.8] tracking-tighter uppercase mix-blend-difference opacity-90 -ml-[5vw]">
              OPTICAL
            </h1>
            <h1 className="font-unbounded text-[20vw] font-black leading-[0.8] tracking-tighter uppercase text-right -mr-[5vw]">
              PURITY.
            </h1>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRIC APERTURE GRID */}
      <section className="relative w-full py-48 px-8 md:px-12 z-20 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto relative h-[120vh]">
          {/* Massive anchored image bleeding right */}
          <div className="absolute right-[-5vw] md:right-[-10vw] top-0 w-[90vw] md:w-[60vw] h-[60vh] md:h-[80vh] aperture-wrapper cursor-pointer z-10 group">
             <div className="w-full h-full aperture-mask aperture-reveal bg-black">
                <img src="https://picsum.photos/seed/878738e0/1200/800" className="w-full h-full object-cover duotone-optic aperture-img" alt="Titanium Frame" />
             </div>
             <div className="absolute bottom-8 left-8 md:left-12 mix-blend-difference pointer-events-none">
               <h3 className="font-unbounded text-3xl md:text-5xl font-black uppercase tracking-tighter">O-Series</h3>
               <p className="font-lexend text-xs md:text-sm tracking-widest uppercase mt-4">Ultra-Light Titanium</p>
             </div>
          </div>

          {/* Floating overlapping small image left */}
          <div className="absolute left-4 md:left-[10vw] top-[50vh] md:top-[40vh] w-[60vw] md:w-[25vw] h-[40vh] aperture-wrapper cursor-pointer z-20 group">
             <div className="w-full h-full aperture-mask aperture-reveal bg-black">
                <img src="https://picsum.photos/seed/34f37bcf/1200/800" className="w-full h-full object-cover duotone-optic aperture-img" alt="Acetate Frame" />
             </div>
             <div className="absolute bottom-8 left-8 mix-blend-difference pointer-events-none">
               <h3 className="font-unbounded text-2xl font-black uppercase tracking-tighter">A-Series</h3>
               <p className="font-lexend text-xs tracking-widest uppercase mt-2 opacity-70">Sourced Acetate</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY-SCROLL FOCAL TIMELINE */}
      <section className="relative w-full flex flex-col md:flex-row z-30 border-y" style={{ borderColor: cyan }}>
        {/* Sticky Left: The Lens */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 flex items-center justify-center overflow-hidden border-r" style={{ borderColor: cyan }}>
          <div className="w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] border rounded-full flex items-center justify-center relative" style={{ borderColor: cyan, opacity: 0.5 }}>
            {/* Inner lens elements that animate on scroll */}
            <div className="lens-graphic-inner w-[80%] h-[80%] border rounded-full absolute" style={{ borderColor: cyan, opacity: 0.8 }} />
            <div className="lens-graphic-inner w-[40%] h-[40%] mix-blend-difference rounded-full absolute" style={{ backgroundColor: cyan }} />
            <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2" style={{ backgroundColor: cyan, opacity: 0.3 }} />
            <div className="absolute left-1/2 top-0 w-[1px] h-full -translate-x-1/2" style={{ backgroundColor: cyan, opacity: 0.3 }} />
          </div>
        </div>

        {/* Scroll Right: Features */}
        <div className="w-full md:w-1/2 py-[50vh] px-8 md:px-24 flex flex-col gap-[80vh]">
          <div className="focal-item opacity-30" style={{ filter: "blur(8px)" }}>
            <span className="font-lexend text-xs font-bold tracking-widest uppercase border border-current px-3 py-1 rounded-full mb-6 inline-block">01 Focus</span>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Refractive Precision.</h2>
            <p className="font-lexend text-lg font-light leading-relaxed opacity-80">Our proprietary grinding process eliminates microscopic aberrations, delivering edge-to-edge optical perfection without distortion.</p>
          </div>
          <div className="focal-item opacity-30" style={{ filter: "blur(8px)" }}>
            <span className="font-lexend text-xs font-bold tracking-widest uppercase border border-current px-3 py-1 rounded-full mb-6 inline-block">02 Form</span>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Weightless Architecture.</h2>
            <p className="font-lexend text-lg font-light leading-relaxed opacity-80">Aerospace-grade titanium structures ensure maximum durability while sitting completely imperceptible on the bridge of the nose.</p>
          </div>
          <div className="focal-item opacity-30" style={{ filter: "blur(8px)" }}>
            <span className="font-lexend text-xs font-bold tracking-widest uppercase border border-current px-3 py-1 rounded-full mb-6 inline-block">03 Protection</span>
            <h2 className="font-unbounded text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Total Spectral Shield.</h2>
            <p className="font-lexend text-lg font-light leading-relaxed opacity-80">Multi-layered coatings selectively filter high-energy blue light while allowing absolute true-color transmission across the spectrum.</p>
          </div>
        </div>
      </section>

      {/* 4. MUSEUM-PLACARD EDITORIAL */}
      <section className="museum-section relative w-full h-[120vh] overflow-hidden flex items-center justify-center">
        {/* Massive background image */}
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="https://picsum.photos/seed/9b1436da/1200/800" 
            className="w-full h-[140%] object-cover duotone-optic museum-img -top-[20%] opacity-80" 
            alt="Editorial Eyewear" 
          />
        </div>

        {/* Structured Placard Grid */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 flex justify-end">
          <div className="w-full md:w-[450px] bg-black/80 backdrop-blur-xl border p-12" style={{ borderColor: cyan, opacity: 0.9 }}>
            <h3 className="font-unbounded text-3xl font-black uppercase tracking-tighter mb-12">Engineering Specifications</h3>
            
            <div className="flex flex-col gap-6 font-lexend text-xs tracking-widest uppercase mb-16">
              <div className="flex justify-between border-b pb-2" style={{ borderColor: cyan }}>
                <span className="opacity-60">Base Curve</span>
                <span className="font-bold">4.0 Aspheric</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: cyan }}>
                <span className="opacity-60">Refractive Index</span>
                <span className="font-bold">1.67 High-Index</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: cyan }}>
                <span className="opacity-60">Frame Weight</span>
                <span className="font-bold">12.4 Grams</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: cyan }}>
                <span className="opacity-60">Coatings</span>
                <span className="font-bold">Anti-Reflective / Hydrophobic</span>
              </div>
            </div>

            <button className="w-full py-4 border border-current font-lexend text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-4">
              View Technical Report <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. COLOSSAL FOCUS-PULL FOOTER */}
      <footer className="footer-section relative w-full min-h-screen flex flex-col justify-end pt-32 pb-8 px-8 md:px-12 bg-black z-40 overflow-hidden">
        
        {/* Dynamic Image Masked Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none footer-focus-pull mix-blend-screen w-full">
          <h2 
            className="font-unbounded text-[20vw] font-black leading-none tracking-tighter text-center uppercase masked-text w-full"
            style={{ 
              backgroundImage: 'url(https://picsum.photos/seed/8f1f0b18/1200/800)',
              filter: "brightness(1.2)"
            }}
          >
            CLARO
          </h2>
        </div>

        {/* Footer content */}
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-16 footer-focus-pull mb-16 bg-black/60 p-8 rounded-2xl mt-[30vh]">
          <div className="flex flex-col gap-6 font-lexend text-sm tracking-widest uppercase font-bold">
            <a className="hover:opacity-70 transition-opacity cursor-pointer">Shop Collections</a>
            <a className="hover:opacity-70 transition-opacity cursor-pointer">Find a Store</a>
            <a className="hover:opacity-70 transition-opacity cursor-pointer">Book Eye Exam</a>
            <a className="hover:opacity-70 transition-opacity cursor-pointer">Support & Repair</a>
          </div>
          
          <div className="text-right flex flex-col items-end gap-4">
            <div className="font-unbounded text-xl font-bold uppercase tracking-widest mb-4">Newsletter</div>
            <div className="flex border-b" style={{ borderColor: cyan, opacity: 0.5 }}>
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent font-lexend text-xs tracking-widest uppercase p-2 outline-none w-48 md:w-64" style={{ color: cyan }} />
              <button className="p-2 hover:opacity-70 transition-opacity"><MoveRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full flex justify-between items-center mt-8 font-lexend text-[10px] tracking-widest uppercase opacity-40 footer-focus-pull border-t pt-8" style={{ borderColor: cyan }}>
          <span>© {new Date().getFullYear()} Claro Optical Ltd.</span>
          <div className="flex gap-8">
            <a className="hover:opacity-100 transition-opacity cursor-pointer">Privacy</a>
            <a className="hover:opacity-100 transition-opacity cursor-pointer">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
