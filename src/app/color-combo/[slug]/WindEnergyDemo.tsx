"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Epilogue, Inter } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Wind } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const epilogue = Epilogue({ subsets: ['latin'], variable: '--font-epilogue' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function WindEnergyDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [sage, olive] = palette.colors;

  useGSAP(() => {
    const customEase = "cubic-bezier(0.22, 1, 0.36, 1)";
    
    // Smooth, breezy reveals for text
    gsap.fromTo(".breeze-reveal", 
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        duration: 1.8, 
        ease: customEase, 
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".breeze-reveal-trigger",
          start: "top 85%",
        }
      }
    );

    gsap.utils.toArray(".breeze-reveal-scroll").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.6, ease: customEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );
    });

    // Slow continuous rotation for turbine-like elements
    gsap.to(".turbine-spin", {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

    // Substantive landscape pan (Parallax)
    gsap.utils.toArray(".landscape-pan").forEach((el: any) => {
      gsap.fromTo(el, 
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
    
    // Number counter animation
    gsap.utils.toArray(".impact-stat").forEach((el: any) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      gsap.fromTo(el,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 3,
          ease: "power2.out",
          snap: { innerHTML: 0.1 },
          scrollTrigger: {
            trigger: el,
            start: "top 80%"
          }
        }
      );
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${epilogue.variable} ${inter.variable} overflow-x-hidden font-inter`}
      style={{ backgroundColor: sage, color: olive }}
    >
      {/* SVG Duotone Filter for photography */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="duotone-wind">
          <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" result="gray" />
          <feComponentTransfer colorInterpolationFilters="sRGB">
            {/* Map black to #4B421B (75, 66, 27 -> 0.294, 0.259, 0.106) */}
            {/* Map white to #D7EAE2 (215, 234, 226 -> 0.843, 0.918, 0.886) */}
            <feFuncR type="table" tableValues="0.294 0.843"></feFuncR>
            <feFuncG type="table" tableValues="0.259 0.918"></feFuncG>
            <feFuncB type="table" tableValues="0.106 0.886"></feFuncB>
          </feComponentTransfer>
        </filter>
      </svg>
      
      <style dangerouslySetInnerHTML={{__html: `
        .duotone-photo {
          /* filter removed as requested */
        }
        
        .wind-line {
          height: 1px;
          background-color: ${olive};
          opacity: 0.2;
          width: 100%;
        }

        .hover-lift {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
        }
      `}} />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-8 md:px-12 flex justify-between items-center z-50 pointer-events-none mix-blend-multiply">
        <div className="font-epilogue text-2xl font-bold tracking-tight pointer-events-auto cursor-pointer flex items-center gap-3">
          <Wind className="w-6 h-6 turbine-spin opacity-80" />
          Aeroform Infrastructure
        </div>
        <div className="hidden md:flex gap-10 font-inter text-sm tracking-wide font-medium pointer-events-auto">
          <a className="hover:opacity-60 transition-opacity cursor-pointer">Technology</a>
          <a className="hover:opacity-60 transition-opacity cursor-pointer">Offshore Projects</a>
          <a className="hover:opacity-60 transition-opacity cursor-pointer">Impact</a>
          <a className="hover:opacity-60 transition-opacity cursor-pointer">Careers</a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative w-full h-screen flex flex-col justify-end overflow-hidden pt-32 pb-16 px-8 md:px-12 breeze-reveal-trigger">
        <div className="absolute inset-0 z-0 opacity-70">
          <img 
            src="https://picsum.photos/seed/7768f19f/1200/800" 
            className="w-full h-full object-cover landscape-pan duotone-photo" 
            alt="Wind turbines on rolling hills" 
          />
          <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: `linear-gradient(to top, ${sage}, transparent 60%)` }} />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end h-full">
          <div className="overflow-hidden mb-6">
            <h1 className="font-epilogue text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter breeze-reveal uppercase">
              Harnessing
            </h1>
          </div>
          <div className="overflow-hidden flex justify-between items-end flex-wrap gap-8">
            <h1 className="font-epilogue text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter breeze-reveal uppercase">
              The Atmosphere
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-md font-light leading-relaxed breeze-reveal pb-2 opacity-90">
              Pioneering utility-scale wind energy to power the next century. Clean, relentless, and infinitely renewable.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MISSION & HOW IT WORKS */}
      <section className="py-32 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="wind-line mb-16 breeze-reveal-scroll" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 breeze-reveal-scroll">
            <h2 className="font-epilogue text-4xl md:text-6xl font-medium tracking-tight mb-8">Engineering for the open sky.</h2>
            <p className="font-inter text-lg leading-relaxed opacity-80 font-light mb-8">
              Aeroform designs, deploys, and operates the world's most efficient onshore and offshore wind infrastructure. We transform atmospheric kinetic energy into baseline grid stability, without the carbon footprint.
            </p>
            <button className="flex items-center gap-4 border-b pb-2 hover:gap-6 transition-all font-inter font-medium tracking-wide" style={{ borderColor: olive }}>
              Explore our Turbine Tech <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="md:col-span-7 flex flex-col gap-8 breeze-reveal-scroll">
            <div className="aspect-[16/9] w-full overflow-hidden relative group">
              <img 
                src="https://picsum.photos/seed/4ce12114/1200/800" 
                className="w-full h-full object-cover duotone-photo scale-105 group-hover:scale-100 transition-transform duration-[2s]" 
                alt="Offshore wind farm at sunset" 
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-epilogue text-xl font-bold mb-3">Aerodynamic Efficiency</h4>
                <p className="font-inter text-sm opacity-70 leading-relaxed">Our advanced swept-blade designs capture 18% more kinetic energy at lower wind speeds.</p>
              </div>
              <div>
                <h4 className="font-epilogue text-xl font-bold mb-3">Grid Resilience</h4>
                <p className="font-inter text-sm opacity-70 leading-relaxed">Integrated solid-state battery buffering ensures smooth, continuous power output to the grid.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT STATS */}
      <section className="py-24 px-8 md:px-12 w-full border-y" style={{ borderColor: `${olive}30`, backgroundColor: `${olive}05` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          <div className="breeze-reveal-scroll">
            <div className="font-epilogue text-7xl md:text-8xl font-bold mb-4 tracking-tighter flex items-center justify-center gap-1">
              <span className="impact-stat" data-target="4.2">0</span>
              <span className="text-4xl md:text-5xl">GW</span>
            </div>
            <p className="font-inter text-sm tracking-widest uppercase opacity-70">Total Operating Capacity</p>
          </div>
          <div className="breeze-reveal-scroll">
            <div className="font-epilogue text-7xl md:text-8xl font-bold mb-4 tracking-tighter flex items-center justify-center gap-1">
              <span className="impact-stat" data-target="1.8">0</span>
              <span className="text-4xl md:text-5xl">M</span>
            </div>
            <p className="font-inter text-sm tracking-widest uppercase opacity-70">Homes Powered Annually</p>
          </div>
          <div className="breeze-reveal-scroll">
            <div className="font-epilogue text-7xl md:text-8xl font-bold mb-4 tracking-tighter flex items-center justify-center gap-1">
              <span className="impact-stat" data-target="9.4">0</span>
              <span className="text-4xl md:text-5xl">M</span>
            </div>
            <p className="font-inter text-sm tracking-widest uppercase opacity-70">Tons of CO2 Offset</p>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section className="py-32 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 breeze-reveal-scroll">
          <h2 className="font-epilogue text-5xl md:text-7xl font-bold tracking-tighter">Active Projects</h2>
          <span className="font-inter text-sm tracking-widest uppercase opacity-60">Global Reach</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Project 1 */}
          <div className="flex flex-col gap-6 breeze-reveal-scroll hover-lift cursor-pointer group">
            <div className="aspect-[4/5] w-full overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/7a8e9edd/1200/800" 
                className="w-full h-full object-cover duotone-photo landscape-pan" 
                alt="North Sea Array" 
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-epilogue text-3xl font-bold mb-2">North Sea Array I</h3>
                <p className="font-inter text-sm opacity-70">1.2 GW Offshore Installation</p>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity border rounded-full p-2" style={{ borderColor: olive }}>
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="flex flex-col gap-6 breeze-reveal-scroll hover-lift cursor-pointer group md:mt-24">
            <div className="aspect-[4/5] w-full overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/7765e729/1200/800" 
                className="w-full h-full object-cover duotone-photo landscape-pan" 
                alt="Patagonian Ridge" 
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-epilogue text-3xl font-bold mb-2">Patagonian Ridge</h3>
                <p className="font-inter text-sm opacity-70">800 MW High-Altitude Onshore</p>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity border rounded-full p-2" style={{ borderColor: olive }}>
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUBSTANTIAL FOOTER */}
      <footer className="pt-32 pb-8 px-8 md:px-12 w-full mt-16 flex flex-col border-t" style={{ borderColor: `${olive}30` }}>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between mb-24 gap-16 breeze-reveal-scroll">
          <div className="md:w-1/2">
            <h2 className="font-epilogue text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
              Build the<br/>Clean Future.
            </h2>
            <p className="font-inter text-lg opacity-80 max-w-md mb-10 leading-relaxed font-light">
              We are actively hiring structural engineers, atmospheric data scientists, and deployment specialists to help scale the global transition to wind power.
            </p>
            <button className="px-8 py-4 font-inter text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity" style={{ backgroundColor: olive, color: sage }}>
              View Open Roles
            </button>
          </div>
          
          <div className="md:w-1/3 grid grid-cols-2 gap-8 font-inter">
            <div className="flex flex-col gap-4">
              <span className="text-xs tracking-widest uppercase opacity-50 mb-2">Company</span>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">About Aeroform</a>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">Leadership</a>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">Investors</a>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">Newsroom</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs tracking-widest uppercase opacity-50 mb-2">Operations</span>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">Offshore Wind</a>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">Onshore Wind</a>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">Grid Integration</a>
              <a className="hover:opacity-60 transition-opacity cursor-pointer">Sustainability</a>
            </div>
          </div>
        </div>

        <div className="w-full border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-inter opacity-60 uppercase tracking-widest" style={{ borderColor: `${olive}20` }}>
          <span>© {new Date().getFullYear()} Aeroform Infrastructure Inc.</span>
          <div className="flex gap-8">
            <a className="hover:opacity-100 transition-opacity cursor-pointer">Privacy Policy</a>
            <a className="hover:opacity-100 transition-opacity cursor-pointer">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
