"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Oswald, IBM_Plex_Sans } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const oswald = Oswald({ weight: ['500', '700'], subsets: ['latin'], variable: '--font-oswald' });
const ibmPlex = IBM_Plex_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'], style: ['normal'] });

export function EnergyCorpDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [flame, navy] = palette.colors; // flame = #FF6A5C, navy = #081120

  useGSAP(() => {
    // "Hydraulic Pressure" animations: heavy, straining buildup followed by a mechanical slide
    gsap.utils.toArray(".hydraulic-reveal").forEach((el: any) => {
      gsap.fromTo(el, 
        { clipPath: "inset(0 100% 0 0)" },
        { 
          clipPath: "inset(0 0% 0 0)", 
          duration: 1.8, 
          ease: "circ.inOut",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    gsap.utils.toArray(".hydraulic-slide-up").forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 80, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1.5, 
          ease: "circ.out",
          scrollTrigger: { trigger: el, start: "top 90%" }
        }
      );
    });

    // Mechanical stat counters
    gsap.utils.toArray(".stat-counter").forEach((el: any) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      gsap.fromTo(el,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2.5,
          ease: "circ.out",
          snap: { innerHTML: 1 },
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: function() {
            el.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toLocaleString();
          }
        }
      );
    });

    // Hero Drill Abstraction Parallax
    gsap.to(".hero-drill", {
      rotation: 90,
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5 // Heavy scrub
      }
    });
    
    // Parallax background image for rig
    gsap.to(".rig-parallax", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".rig-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${ibmPlex.className} ${oswald.variable} selection:bg-[${flame}] selection:text-[${navy}]`}
      style={{ backgroundColor: navy, color: flame }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-oswald { font-family: var(--font-oswald), sans-serif; }
        
        .industrial-btn {
          position: relative;
          display: inline-block;
          font-family: var(--font-oswald), sans-serif;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 1rem 2.5rem;
          color: ${navy};
          background-color: ${flame};
          border: none;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0, 0.55, 0.45, 1);
        }
        .industrial-btn:active {
          transform: scale(0.97);
        }
        .industrial-btn::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: rgba(0,0,0,0.3);
        }
        
        .heavy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2px;
          background-color: ${flame};
          border: 2px solid ${flame};
        }
        .heavy-grid > div {
          background-color: ${navy};
        }
      `}} />

      {/* GLOBAL NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50 mix-blend-difference" style={{ color: flame }}>
        <div className="font-oswald text-4xl tracking-tight uppercase font-bold">AEGIS</div>
        <div className="hidden md:flex gap-10 font-bold tracking-widest uppercase text-sm">
          <a href="#" className="hover:opacity-70 transition-opacity">Operations</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Sustainability</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Investors</a>
        </div>
      </nav>

      {/* 1. HERO (Corporate Presence) */}
      <section className="hero-section relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10" style={{ backgroundColor: navy }}>
        
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
           {/* Massive geometric pipeline/drill abstraction */}
           <div className="hero-drill w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] border-[4vw] rounded-sm absolute" style={{ borderColor: flame }} />
           <div className="hero-drill w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] border-[2vw] rounded-sm absolute rotate-45" style={{ borderColor: flame }} />
        </div>

        <div className="relative z-10 text-center w-full px-6 flex flex-col items-center mt-24">
          <div className="overflow-hidden mb-4">
             <h1 className="font-oswald text-[12vw] md:text-[9vw] leading-[0.9] tracking-tighter uppercase m-0 hydraulic-slide-up">POWERING</h1>
          </div>
          <div className="overflow-hidden mb-12">
             <h1 className="font-oswald text-[12vw] md:text-[9vw] leading-[0.9] tracking-tighter uppercase m-0 hydraulic-slide-up text-transparent" style={{ WebkitTextStroke: `2px ${flame}` }}>THE GLOBE</h1>
          </div>
          
          <div className="w-[2px] h-24 mb-8 origin-top hydraulic-reveal" style={{ backgroundColor: flame }} />
          
          <p className="font-bold text-lg md:text-xl tracking-widest uppercase hydraulic-slide-up max-w-lg">Global infrastructure and energy solutions for a rapidly evolving world.</p>
        </div>
      </section>

      {/* 2. SCALE / STATS (Mechanical Counters) */}
      <section className="relative w-full py-24 z-20 border-y-4" style={{ backgroundColor: flame, borderColor: flame, color: navy }}>
         <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
            <div className="flex flex-col items-center">
               <div className="font-oswald text-7xl md:text-9xl font-bold tracking-tighter mb-4">
                  <span className="stat-counter" data-target="3.2">0</span>M
               </div>
               <p className="text-xl font-bold tracking-widest uppercase">Barrels Per Day</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="font-oswald text-7xl md:text-9xl font-bold tracking-tighter mb-4">
                  <span className="stat-counter" data-target="45">0</span>
               </div>
               <p className="text-xl font-bold tracking-widest uppercase">Operating Countries</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="font-oswald text-7xl md:text-9xl font-bold tracking-tighter mb-4">
                  $<span className="stat-counter" data-target="18">0</span>B
               </div>
               <p className="text-xl font-bold tracking-widest uppercase">Annual Capital CapEx</p>
            </div>
         </div>
      </section>

      {/* 3. OPERATIONS OVERVIEW (Heavy Grid) */}
      <section className="relative w-full py-48 px-6 md:px-12 z-20" style={{ backgroundColor: navy }}>
        <div className="max-w-[1600px] mx-auto">
          
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end">
            <h2 className="font-oswald text-7xl md:text-[8rem] uppercase tracking-tighter hydraulic-reveal leading-none">CORE<br/>OPERATIONS</h2>
            <p className="text-xl md:text-3xl font-bold tracking-widest uppercase mb-2 hydraulic-slide-up max-w-sm text-right mt-8 md:mt-0">Extract. Refine. Deliver.</p>
          </div>

          <div className="heavy-grid hydraulic-slide-up">
            
            {/* Exploration */}
            <div className="p-8 md:p-12 flex flex-col justify-between group h-[600px] relative overflow-hidden">
               <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen grayscale group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                  <img src="https://picsum.photos/seed/c0c3bfd9/1200/800" className="w-full h-full object-cover" alt="Oil Rig" />
               </div>
               <div className="absolute inset-0 z-0 mix-blend-multiply opacity-80 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: navy }} />
               
               <div className="relative z-10 font-oswald text-8xl text-transparent font-bold tracking-tighter" style={{ WebkitTextStroke: `1px ${flame}` }}>01</div>
               <div className="relative z-10 mt-auto">
                  <h3 className="font-oswald text-5xl uppercase font-bold tracking-tighter mb-6">Upstream Exploration</h3>
                  <p className="text-lg font-medium leading-relaxed opacity-90 max-w-sm">Deep-water drilling and terrestrial extraction leveraging state-of-the-art seismic imaging and automated rig technologies.</p>
               </div>
            </div>

            {/* Refining */}
            <div className="p-8 md:p-12 flex flex-col justify-between group h-[600px] relative overflow-hidden">
               <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen grayscale group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                  <img src="https://picsum.photos/seed/05ad1ab7/1200/800" className="w-full h-full object-cover" alt="Refinery" />
               </div>
               <div className="absolute inset-0 z-0 mix-blend-multiply opacity-80 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: navy }} />
               
               <div className="relative z-10 font-oswald text-8xl text-transparent font-bold tracking-tighter" style={{ WebkitTextStroke: `1px ${flame}` }}>02</div>
               <div className="relative z-10 mt-auto">
                  <h3 className="font-oswald text-5xl uppercase font-bold tracking-tighter mb-6">Downstream Refining</h3>
                  <p className="text-lg font-medium leading-relaxed opacity-90 max-w-sm">Processing crude into high-yield petrochemicals, aviation fuel, and industrial lubricants at our 12 global mega-refineries.</p>
               </div>
            </div>

            {/* Distribution */}
            <div className="p-8 md:p-12 flex flex-col justify-between group h-[600px] relative overflow-hidden">
               <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen grayscale group-hover:mix-blend-normal group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                  <img src="https://picsum.photos/seed/6082b90d/1200/800" className="w-full h-full object-cover" alt="Tanker" />
               </div>
               <div className="absolute inset-0 z-0 mix-blend-multiply opacity-80 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: navy }} />
               
               <div className="relative z-10 font-oswald text-8xl text-transparent font-bold tracking-tighter" style={{ WebkitTextStroke: `1px ${flame}` }}>03</div>
               <div className="relative z-10 mt-auto">
                  <h3 className="font-oswald text-5xl uppercase font-bold tracking-tighter mb-6">Global Logistics</h3>
                  <p className="text-lg font-medium leading-relaxed opacity-90 max-w-sm">A highly coordinated fleet of VLCC tankers and transcontinental pipelines ensuring uninterrupted energy supply chains.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SUSTAINABILITY (Industrial Shift) */}
      <section className="rig-section relative w-full h-[80vh] flex items-center overflow-hidden border-y-4" style={{ borderColor: flame, backgroundColor: navy }}>
        <div className="absolute inset-0 z-0">
           {/* Industrial rig background */}
           <img 
             src="https://picsum.photos/seed/57d9b257/1200/800" 
             className="w-full h-[130%] object-cover rig-parallax mix-blend-screen opacity-20 grayscale" 
             alt="Wind Turbines & Industry" 
           />
           <div className={`absolute inset-0 bg-gradient-to-r from-[${navy}] to-transparent z-10`} />
        </div>
        
        <div className="relative z-20 px-6 md:px-24 max-w-4xl">
          <h2 className="font-oswald text-6xl md:text-8xl uppercase tracking-tighter mb-8 hydraulic-slide-up leading-none">THE ENERGY<br/>TRANSITION</h2>
          <div className="w-24 h-[4px] mb-8 hydraulic-reveal" style={{ backgroundColor: flame }} />
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12 hydraulic-slide-up opacity-90">
            Committing $5 Billion annually to carbon capture (CCUS), offshore wind infrastructure, and next-generation hydrogen fuel cells. We are engineering the bridge to a sustainable future, without compromising the energy demands of today.
          </p>
          <button className="industrial-btn text-xl hydraulic-slide-up">Read 2026 ESG Report</button>
        </div>
      </section>

      {/* 5. MASSIVE FOOTER */}
      <section className="relative w-full pt-32 pb-12 px-6 md:px-12 z-30 flex flex-col justify-between min-h-[70vh]" style={{ backgroundColor: navy }}>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24 max-w-[1600px] mx-auto w-full">
          
          <div className="flex flex-col gap-6 font-bold uppercase tracking-widest text-lg">
            <h4 className="font-oswald text-3xl tracking-tighter mb-2 opacity-50">Corporate</h4>
            <a href="#" className="hover:opacity-70 transition-opacity">Investor Relations</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Board of Directors</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Global Careers</a>
          </div>

          <div className="flex flex-col gap-6 font-bold uppercase tracking-widest text-lg md:text-right">
            <h4 className="font-oswald text-3xl tracking-tighter mb-2 opacity-50">Compliance</h4>
            <a href="#" className="hover:opacity-70 transition-opacity">Safety Protocols</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Environmental Data</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Ethics Hotline</a>
          </div>

        </div>
        
        <div className="w-full text-center mt-auto border-t-[1px] pt-12 flex flex-col items-center" style={{ borderColor: `${flame}40` }}>
          <h1 className="font-oswald text-[20vw] leading-[0.75] tracking-tighter uppercase m-0 cursor-default opacity-20 hover:opacity-100 transition-opacity duration-700">
            AEGIS
          </h1>
          <p className="mt-8 font-bold text-sm tracking-[0.3em] uppercase opacity-40">© {new Date().getFullYear()} Aegis Petroleum Corporation. All Rights Reserved.</p>
        </div>
      </section>

    </div>
  );
}
