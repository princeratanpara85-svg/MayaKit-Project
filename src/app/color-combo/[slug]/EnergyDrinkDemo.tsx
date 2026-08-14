"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Anton, Barlow } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' });
const barlow = Barlow({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-barlow', style: ['normal', 'italic'] });

export function EnergyDrinkDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [lime, forest] = palette.colors; // lime = #CBDC3E, forest = #164717

  useGSAP(() => {
    // The "Adrenaline Jolt" curve: fast acceleration, violent overshoot, hard snap back.
    const joltEase = "cubic-bezier(0, 1.5, 0.4, 1)";

    // 1. Hero Jolt Reveal (Extreme speed and scale)
    gsap.fromTo(".jolt-in", 
      { opacity: 0, scale: 0.5, y: 100, rotation: -5 },
      { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.8, ease: joltEase, stagger: 0.1 }
    );

    // 2. Scroll Jolts
    gsap.utils.toArray(".scroll-jolt").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.8, x: -50, skewX: 10 },
        {
          opacity: 1, scale: 1, x: 0, skewX: 0,
          duration: 0.8,
          ease: joltEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // 3. Grid Item Stagger Jolt
    gsap.fromTo(".grid-jolt",
      { opacity: 0, scale: 0.2, y: 50 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.8,
        ease: joltEase,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top 80%",
        }
      }
    );

    // 4. Parallax Extreme
    gsap.utils.toArray(".parallax-extreme").forEach((el: any) => {
      gsap.to(el, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5 // slight scrub for a feeling of speed/momentum rather than locked 1:1
        }
      });
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${anton.variable} ${barlow.variable} selection:bg-[${lime}] selection:text-[${forest}] overflow-x-hidden font-barlow`}
      style={{ backgroundColor: forest, color: lime }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-anton { font-family: var(--font-anton), sans-serif; text-transform: uppercase; }
        .font-barlow { font-family: var(--font-barlow), sans-serif; }
        
        .img-wrapper {
          overflow: hidden;
          background-color: ${forest}; 
        }
        
        /* Aggressive hover state */
        .athlete-card:hover img {
          transform: scale(1.1) rotate(2deg);
        }
        .athlete-card:hover .overlay-name {
          transform: translateY(0) skewX(-10deg);
          opacity: 1;
        }

        /* Extreme Tactile Button */
        .apex-btn {
          display: inline-block;
          transition: transform 150ms cubic-bezier(0, 1.5, 0.4, 1), background-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
          transform-origin: center;
          cursor: pointer;
          font-family: var(--font-anton);
          font-size: 1.5rem;
          padding: 12px 32px;
          border: 4px solid ${lime};
          background-color: transparent;
          color: ${lime};
          text-transform: uppercase;
          line-height: 1;
          box-shadow: 6px 6px 0px ${lime};
        }
        .apex-btn:hover {
          background-color: ${lime};
          color: ${forest};
          transform: translate(-4px, -4px) skewX(-10deg);
          box-shadow: 10px 10px 0px ${lime};
        }
        .apex-btn:active {
          transform: translate(4px, 4px) skewX(0deg) scale(0.92); 
          box-shadow: 0px 0px 0px ${lime};
          transition: transform 50ms ease, box-shadow 50ms ease;
        }

        .border-lime {
          border-color: rgba(203, 220, 62, 0.2);
        }

        /* Fake CSS Can Shape */
        .can-shape {
          width: 140px;
          height: 320px;
          background: linear-gradient(90deg, #111 0%, #333 20%, #111 50%, #444 80%, #111 100%);
          border-radius: 12px / 8px;
          position: relative;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.8), 20px 20px 40px rgba(0,0,0,0.6);
        }
        .can-shape::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 5%;
          width: 90%;
          height: 12px;
          background: #888;
          border-radius: 50%;
          border: 1px solid #aaa;
        }
        .can-shape::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 5%;
          width: 90%;
          height: 8px;
          background: #333;
          border-radius: 50%;
        }
        .can-label {
          position: absolute;
          top: 10%;
          bottom: 10%;
          left: 0;
          width: 100%;
          background-color: ${lime};
          color: ${forest};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .can-label-text {
          transform: rotate(-90deg);
          font-family: var(--font-anton);
          font-size: 5rem;
          line-height: 0.8;
          white-space: nowrap;
          color: ${forest};
        }
      `}} />

      {/* SVG filter removed */}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full py-3 px-6 md:px-12 flex justify-between items-center z-50 bg-transparent">
        <div className={`font-anton text-4xl tracking-tight text-[${lime}] italic cursor-pointer hover:scale-110 transition-transform duration-200`}>
          APEX
        </div>
        <div className="hidden md:flex gap-12 font-barlow text-lg font-black italic tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">Products</a>
          <a href="#" className="hover:text-white transition-colors">Athletes</a>
          <a href="#" className="hover:text-white transition-colors">Events</a>
        </div>
        <button className="apex-btn !text-lg !py-2 !px-6 !border-2 !box-shadow-none shadow-[4px_4px_0px_#CBDC3E]">
          Buy Now
        </button>
      </nav>

      {/* 1. HERO */}
      <section className={`relative w-full h-screen flex flex-col items-center justify-center pt-20 px-4 md:px-12 z-10 overflow-hidden text-center border-b-[16px] border-[${lime}]`}>
         <div className="absolute inset-0 z-0 img-wrapper">
           <img src="https://picsum.photos/seed/11f09c35/1200/800" className="w-full h-full object-cover transition-transform duration-500" alt="Skateboarder mid air" />
           {/* Hard vignette */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#164717_100%)] opacity-80" />
         </div>

         <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className={`font-anton text-[15vw] leading-[0.85] text-[${lime}] italic jolt-in mix-blend-screen drop-shadow-[0_0_20px_rgba(203,220,62,0.5)]`}>
               DEFY<br/>GRAVITY
            </h1>
            <p className={`font-barlow text-xl md:text-3xl font-black italic uppercase mt-8 jolt-in bg-[${lime}] text-[${forest}] px-4 py-1 -skew-x-12`}>
               Zero Sugar. Maximum Velocity.
            </p>
         </div>
      </section>

      {/* 2. PRODUCT LINEUP */}
      <section className="relative w-full py-32 px-8 md:px-12 z-20">
         <div className="w-full flex flex-col items-center text-center mb-24 scroll-jolt">
            <h2 className="font-anton text-6xl md:text-8xl italic">Choose Your Weapon</h2>
         </div>

         <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32">
            
            {/* Can 1 */}
            <div className="flex flex-col items-center gap-8 scroll-jolt">
               <div className="can-shape hover:-translate-y-8 hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0,1.5,0.4,1)]">
                 <div className="can-label">
                   <div className="can-label-text">ORIGINAL</div>
                 </div>
               </div>
               <h3 className="font-anton text-3xl">Apex Original</h3>
               <button className={`font-barlow font-black italic uppercase text-lg border-b-4 border-[${lime}] hover:text-white`}>Shop Now</button>
            </div>

            {/* Can 2 */}
            <div className="flex flex-col items-center gap-8 scroll-jolt" style={{ animationDelay: '0.1s' }}>
               <div className="can-shape hover:-translate-y-8 hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0,1.5,0.4,1)]">
                 <div className="can-label !bg-white">
                   <div className="can-label-text !text-black">ZERO</div>
                 </div>
               </div>
               <h3 className="font-anton text-3xl">Apex Zero Sugar</h3>
               <button className={`font-barlow font-black italic uppercase text-lg border-b-4 border-[${lime}] hover:text-white`}>Shop Now</button>
            </div>

         </div>
      </section>

      {/* 3. THE BOOST (Value Prop) */}
      <section className="relative w-full py-48 px-8 md:px-12 z-20 overflow-hidden" style={{ backgroundColor: lime, color: forest }}>
         {/* Massive background text */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
           <span className="font-anton text-[30vw] whitespace-nowrap">300MG</span>
         </div>
         
         <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 scroll-jolt">
               <h2 className="font-anton text-6xl md:text-8xl leading-none mb-6">PURE<br/>ADRENALINE</h2>
               <p className="font-barlow text-xl font-bold italic leading-tight">
                 Formulated for the extreme. 300mg of caffeine, taurine, and B-vitamins to push you past the breaking point. No crash. Just raw output.
               </p>
            </div>
            <div className="md:w-1/2 flex justify-center scroll-jolt">
               <button className={`apex-btn !border-[${forest}] !text-[${forest}] !shadow-[6px_6px_0px_#164717] hover:!bg-[${forest}] hover:!text-[${lime}] hover:!shadow-[10px_10px_0px_#164717]`}>
                 Learn the Science
               </button>
            </div>
         </div>
      </section>

      {/* 4. THE APEX TEAM (Athletes) */}
      <section className="relative w-full py-32 px-4 md:px-12 z-20">
         <div className="w-full flex justify-between items-end mb-16 scroll-jolt">
            <h2 className="font-anton text-6xl md:text-8xl italic">The Apex Team</h2>
            <button className={`font-barlow font-black italic uppercase text-xl border-b-4 border-[${lime}] pb-1 hover:text-white hidden md:block`}>View All Athletes</button>
         </div>

         <div className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            
            {/* Athlete 1 */}
            <div className={`athlete-card relative w-full aspect-[4/5] img-wrapper border-[8px] border-[${forest}] hover:border-[${lime}] transition-colors duration-200 cursor-pointer overflow-hidden grid-jolt`}>
               <img src="https://picsum.photos/seed/567fa5f3/1200/800" className="w-full h-full object-cover transition-transform duration-500" alt="BMX" />
               <div className="absolute bottom-0 left-0 p-6 z-20">
                 <div className={`overlay-name opacity-0 translate-y-8 transition-all duration-300 ease-[cubic-bezier(0,1.5,0.4,1)] bg-[${lime}] text-[${forest}] px-4 py-2 inline-block`}>
                   <h3 className="font-anton text-4xl leading-none">JAXON REED</h3>
                   <span className="font-barlow font-black italic uppercase text-sm">FMX Pro</span>
                 </div>
               </div>
            </div>

            {/* Athlete 2 */}
            <div className={`athlete-card relative w-full aspect-[4/5] img-wrapper border-[8px] border-[${forest}] hover:border-[${lime}] transition-colors duration-200 cursor-pointer overflow-hidden grid-jolt`}>
               <img src="https://picsum.photos/seed/d2b1ea11/1200/800" className="w-full h-full object-cover transition-transform duration-500" alt="Surfer" />
               <div className="absolute bottom-0 left-0 p-6 z-20">
                 <div className={`overlay-name opacity-0 translate-y-8 transition-all duration-300 ease-[cubic-bezier(0,1.5,0.4,1)] bg-[${lime}] text-[${forest}] px-4 py-2 inline-block`}>
                   <h3 className="font-anton text-4xl leading-none">MAYA KAI</h3>
                   <span className="font-barlow font-black italic uppercase text-sm">Big Wave Surf</span>
                 </div>
               </div>
            </div>

            {/* Athlete 3 */}
            <div className={`athlete-card relative w-full aspect-[4/5] img-wrapper border-[8px] border-[${forest}] hover:border-[${lime}] transition-colors duration-200 cursor-pointer overflow-hidden grid-jolt`}>
               <img src="https://picsum.photos/seed/375da8ef/1200/800" className="w-full h-full object-cover transition-transform duration-500" alt="Snowboard" />
               <div className="absolute bottom-0 left-0 p-6 z-20">
                 <div className={`overlay-name opacity-0 translate-y-8 transition-all duration-300 ease-[cubic-bezier(0,1.5,0.4,1)] bg-[${lime}] text-[${forest}] px-4 py-2 inline-block`}>
                   <h3 className="font-anton text-4xl leading-none">LEO CHEN</h3>
                   <span className="font-barlow font-black italic uppercase text-sm">Snowboard Park</span>
                 </div>
               </div>
            </div>

         </div>
      </section>

      {/* 5. FOOTER */}
      <footer className={`relative w-full pt-32 pb-12 px-8 md:px-12 z-20 border-t-8 border-[${lime}]`}>
         
         <div className="flex flex-col md:flex-row justify-between items-start gap-16 scroll-jolt">
            
            <div className="flex flex-col gap-8 max-w-md">
               <div className="font-anton text-8xl italic leading-none">FUEL YOUR FIRE</div>
               <button className="apex-btn self-start">Shop The Lineup</button>
            </div>

            <div className="flex gap-16 font-barlow text-lg font-bold uppercase italic">
               <div className="flex flex-col gap-4">
                  <a href="#" className="hover:text-white transition-colors">Drinks</a>
                  <a href="#" className="hover:text-white transition-colors">Apparel</a>
                  <a href="#" className="hover:text-white transition-colors">Team</a>
               </div>
               <div className="flex flex-col gap-4">
                  <a href="#" className="hover:text-white transition-colors">Events</a>
                  <a href="#" className="hover:text-white transition-colors">Careers</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
               </div>
            </div>

         </div>

         <div className="w-full mt-32 pt-8 border-t-2 border-lime flex flex-col md:flex-row justify-between items-center gap-6 font-barlow text-sm font-bold uppercase opacity-60 scroll-jolt">
            <div>© {new Date().getFullYear()} APEX ENERGY DRINKS.</div>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
         </div>

      </footer>

    </div>
  );
}
