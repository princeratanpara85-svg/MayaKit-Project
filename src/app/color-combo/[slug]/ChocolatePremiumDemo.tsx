"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { EB_Garamond, Jost } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ebGaramond = EB_Garamond({ subsets: ['latin'], variable: '--font-eb-garamond' });
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

export function ChocolatePremiumDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [strawberry, vanilla] = palette.colors; // strawberry = #E84F5E, vanilla = #FCDFC5

  useGSAP(() => {
    // Custom easing curves strictly for this demo
    // --ease-melt for slow, sensual reveals (melting)
    // --ease-ui for responsive button interactions
    const easeMelt = "cubic-bezier(0.65, 0, 0.35, 1)";
    const easeUI = "cubic-bezier(0.25, 1, 0.25, 1)";

    // Sensory Hero Reveal - fading and unblurring slowly like melting chocolate
    gsap.fromTo(".sensory-hero-reveal", 
      { opacity: 0, filter: "blur(12px)", scale: 1.05 },
      { opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.5, ease: easeMelt, stagger: 0.3 }
    );

    // Slow unwrapping text reveals for the Craft section
    gsap.utils.toArray(".unwrap-text").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
        {
          opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.8,
          ease: easeMelt,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    });

    // Gentle fade ups for standard sections
    gsap.utils.toArray(".fade-melt-up").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 1.5,
          ease: easeMelt,
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
          }
        }
      );
    });

    // Parallax on backgrounds to give depth to the textures
    gsap.utils.toArray(".melt-parallax").forEach((el: any) => {
      gsap.to(el, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${ebGaramond.variable} ${jost.variable} overflow-x-hidden font-jost`}
      style={{ backgroundColor: strawberry, color: vanilla }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-garamond { font-family: var(--font-eb-garamond), serif; }
        .font-jost { font-family: var(--font-jost), sans-serif; }
        
        :root {
          --ease-melt: cubic-bezier(0.65, 0, 0.35, 1);
          --ease-ui: cubic-bezier(0.25, 1, 0.25, 1);
        }

        /* Tactile UI Interactions */
        .choco-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          transition: transform 200ms var(--ease-ui), background-color 400ms ease, color 400ms ease;
          border: 1px solid ${vanilla};
          cursor: pointer;
          background: transparent;
        }
        .choco-btn:active {
          transform: scale(0.98); /* Gentle press */
        }
        .choco-btn:hover {
          background-color: ${vanilla};
          color: ${strawberry};
        }

        /* Fluid link underlines */
        .choco-link {
          position: relative;
          cursor: pointer;
          transition: opacity 400ms ease;
        }
        .choco-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: ${vanilla};
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 500ms var(--ease-melt);
        }
        .choco-link:hover::after {
          transform: scaleX(1);
        }

        /* Duotone Tinting for Confectionery Photography */
        .strawberry-tint::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${strawberry};
          mix-blend-mode: color; /* Preserves luminosity but forces strawberry hue */
          opacity: 0.9;
          pointer-events: none;
        }
        .strawberry-tint::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${strawberry};
          mix-blend-mode: multiply; /* Deepens the shadows */
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }
        
        .vanilla-tint::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${vanilla};
          mix-blend-mode: color;
          opacity: 0.8;
          pointer-events: none;
        }
        .vanilla-tint::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${vanilla};
          mix-blend-mode: overlay;
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
        }

        /* Hover expansion for Signature Flavors split section */
        .flavor-split {
          transition: flex-basis 800ms var(--ease-melt);
          flex-basis: 50%;
        }
        .flavor-container:hover .flavor-split {
          flex-basis: 40%;
        }
        .flavor-container .flavor-split:hover {
          flex-basis: 60%;
        }
        
        .flavor-split img {
          transition: transform 1200ms var(--ease-melt);
        }
        .flavor-split:hover img {
          transform: scale(1.05); /* Slow sensory zoom */
        }
      `}} />

      {/* 1. SENSORY HERO */}
      <section className="relative w-full h-[100vh] flex flex-col justify-center items-center text-center p-8 z-10 overflow-hidden">
         <div className="absolute inset-0 z-0 strawberry-tint sensory-hero-reveal">
           <img 
             src="https://images.pexels.com/photos/8217984/pexels-photo-8217984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
             className="absolute -top-[15%] left-0 w-full h-[130%] object-cover melt-parallax" 
             alt="Cocoa texture" 
           />
           <div className="absolute inset-0 bg-black/30 z-10" />
         </div>
         
         {/* Navbar layered over hero */}
         <nav className="absolute top-0 w-full p-8 md:px-16 flex justify-between items-center z-50 sensory-hero-reveal" style={{ color: vanilla }}>
           <div className="font-garamond text-3xl italic tracking-wider cursor-pointer">
             Éphémère
           </div>
           <div className="hidden md:flex gap-16 font-jost text-xs tracking-[0.2em] uppercase">
             <a className="choco-link">Boutique</a>
             <a className="choco-link">The Craft</a>
             <a className="choco-link">Gifting</a>
           </div>
         </nav>

         <div className="relative z-20 flex flex-col items-center max-w-4xl sensory-hero-reveal mt-20">
            <span className="font-jost text-sm tracking-[0.3em] uppercase opacity-80 mb-8 block">
              Artisanal Confectionery
            </span>
            <h1 className="font-garamond text-6xl md:text-[8vw] leading-[1] italic tracking-tight mb-8">
               The Art of Melt.
            </h1>
            <p className="font-jost font-light text-base md:text-lg max-w-lg opacity-80 leading-relaxed mb-12">
               Crafted in small batches. A profound sensory indulgence where bitter cocoa meets the absolute purity of strawberry and vanilla.
            </p>
            <button className="choco-btn font-jost text-xs tracking-[0.2em] uppercase">
               Enter the Boutique
            </button>
         </div>
      </section>

      {/* 2. SIGNATURE FLAVORS (SPLIT PRESENTATION) */}
      <section className="relative w-full h-[80vh] flex flex-col md:flex-row z-20 flavor-container border-t border-b" style={{ borderColor: `${vanilla}40` }}>
         {/* Vanilla Line */}
         <div className="flavor-split relative h-full flex flex-col justify-center items-center p-8 overflow-hidden cursor-pointer" style={{ backgroundColor: vanilla, color: strawberry }}>
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.pexels.com/photos/7491913/pexels-photo-7491913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                className="w-full h-full object-cover" 
                alt="Vanilla Crepe" 
              />
            </div>
            <div className="relative z-10 text-center fade-melt-up pointer-events-none" style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.5)" }}>
               <span className="font-jost text-[0.65rem] tracking-[0.3em] uppercase mb-4 block font-medium">Signature Series</span>
               <h2 className="font-garamond text-4xl md:text-5xl italic mb-4 font-semibold">Vanilla Cloud</h2>
               <p className="font-jost text-sm font-medium max-w-xs leading-relaxed">
                 Madagascar beans folded into single-origin white chocolate. A delicate, ethereal dissolve.
               </p>
            </div>
         </div>

         {/* Strawberry Line */}
         <div className="flavor-split relative h-full flex flex-col justify-center items-center p-8 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.pexels.com/photos/5619164/pexels-photo-5619164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                className="w-full h-full object-cover" 
                alt="Strawberry Texture" 
              />
            </div>
            <div className="relative z-10 text-center fade-melt-up pointer-events-none" style={{ textShadow: "0px 4px 20px rgba(0,0,0,0.6)" }}>
               <span className="font-jost text-[0.65rem] tracking-[0.3em] uppercase mb-4 block font-medium">Signature Series</span>
               <h2 className="font-garamond text-4xl md:text-5xl italic mb-4 font-semibold">Wild Strawberry</h2>
               <p className="font-jost text-sm font-medium max-w-xs leading-relaxed">
                 Freeze-dried wild strawberries enrobed in dark ganache. Tart, intense, and deeply romantic.
               </p>
            </div>
         </div>
      </section>

      {/* 3. THE CRAFT (TACTILE STORY) */}
      <section className="relative w-full py-32 px-8 md:px-24 z-20 overflow-hidden">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden fade-melt-up">
               <img 
                 src="https://images.pexels.com/photos/20335797/pexels-photo-20335797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                 className="absolute -top-[15%] left-0 w-full h-[130%] object-cover melt-parallax" 
                 alt="Crafting surface" 
               />
               <div className="absolute inset-0 border border-white/20 m-6 z-20 pointer-events-none" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
               <h2 className="font-garamond text-4xl md:text-6xl italic leading-tight mb-12 unwrap-text">
                 Unrushed,<br/>Uncompromised.
               </h2>
               <div className="font-jost font-light text-base md:text-lg leading-relaxed opacity-80 flex flex-col gap-6 unwrap-text">
                 <p>Confectionery is a practice of patience. The tempering of chocolate requires precise manipulation of temperature and time to achieve that perfect, resonant snap.</p>
                 <p>Every bar of Éphémère is hand-poured, rested on marble cooling slabs, and individually foil-wrapped to seal in the volatile aromatic oils of our signature strawberry and vanilla infusions.</p>
               </div>
               <div className="mt-12 fade-melt-up">
                  <a className="choco-link font-jost text-xs uppercase tracking-[0.2em]">Read our story</a>
               </div>
            </div>
         </div>
      </section>

      {/* 4. GIFTING & COLLECTIONS */}
      <section className="relative w-full py-32 px-8 md:px-16 z-20 text-center" style={{ backgroundColor: vanilla, color: strawberry }}>
         <span className="font-jost text-xs tracking-[0.3em] uppercase opacity-70 mb-6 block fade-melt-up">The Collection</span>
         <h2 className="font-garamond text-5xl md:text-6xl italic mb-24 fade-melt-up">Curated Indulgence</h2>

         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "The Sommelier Box", desc: "A 24-piece assorted tasting flight.", price: "$120", image: "https://images.pexels.com/photos/9410226/pexels-photo-9410226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
              { name: "Strawberry Reserve", desc: "Pure strawberry enrobed in 72% dark.", price: "$85", image: "https://images.unsplash.com/photo-VidaHewOaxs?q=80&w=2000&auto=format&fit=crop" },
              { name: "Vanilla & Salt", desc: "Tahitian vanilla with smoked sea salt.", price: "$65", image: "https://cdn.pixabay.com/photo/2014/06/25/11/17/caja-white-chocolate-380702_1280.jpg" }
            ].map((item, i) => (
              <div key={item.name} className="flex flex-col items-center text-center fade-melt-up group cursor-pointer" style={{ transitionDelay: `${i * 100}ms` }}>
                 <div className="w-full aspect-square overflow-hidden mb-8 relative">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-transform duration-[1200ms]" 
                      style={{ transitionTimingFunction: "var(--ease-melt)" }}
                      alt={item.name} 
                    />
                    {/* Hover scale effect applied via group-hover on parent */}
                    <style dangerouslySetInnerHTML={{ __html: `
                      .group:hover img { transform: scale(1.08); }
                    `}} />
                 </div>
                 <h3 className="font-garamond text-3xl italic mb-4">{item.name}</h3>
                 <p className="font-jost font-light text-sm opacity-80 max-w-[200px] mx-auto mb-6">{item.desc}</p>
                 <span className="font-jost text-xs tracking-[0.2em] uppercase font-medium">{item.price}</span>
              </div>
            ))}
         </div>
      </section>

      {/* 5. FOOTER / CTA - THE OVERHAUL */}
      <footer className="relative w-full z-20 overflow-hidden pt-16 flex flex-col items-center">
         
         {/* Marquee top border */}
         <div className="w-full overflow-hidden border-y py-4 flex whitespace-nowrap mb-16" style={{ borderColor: `${vanilla}30` }}>
            <div className="marquee-track flex w-max font-jost text-xs md:text-sm tracking-[0.4em] uppercase">
               <div className="flex gap-8 items-center px-4">
                 <span>EPHEMERAL INDULGENCE</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>SENSORY CRAFT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>MELT IN THE MOMENT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>PARISIAN ATELIER</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>EPHEMERAL INDULGENCE</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>SENSORY CRAFT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>MELT IN THE MOMENT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>PARISIAN ATELIER</span><span className="text-[0.5rem] opacity-50">✦</span>
               </div>
               <div className="flex gap-8 items-center px-4">
                 <span>EPHEMERAL INDULGENCE</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>SENSORY CRAFT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>MELT IN THE MOMENT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>PARISIAN ATELIER</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>EPHEMERAL INDULGENCE</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>SENSORY CRAFT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>MELT IN THE MOMENT</span><span className="text-[0.5rem] opacity-50">✦</span>
                 <span>PARISIAN ATELIER</span><span className="text-[0.5rem] opacity-50">✦</span>
               </div>
            </div>
         </div>

         {/* Grid Layout */}
         <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 mb-16">
            
            {/* Left Huge Statement */}
            <div className="md:col-span-7 border-b md:border-b-0 md:border-r pb-16 md:pb-0 md:pr-16 flex flex-col justify-between fade-melt-up" style={{ borderColor: `${vanilla}30` }}>
               <h2 className="font-garamond text-6xl md:text-8xl italic leading-[1.1] mb-16">
                 The art of <br/> the melt.
               </h2>
               <div className="flex items-center gap-8">
                  <div className="w-32 h-32 rounded-full border flex items-center justify-center relative overflow-hidden group cursor-pointer" style={{ borderColor: vanilla }}>
                     <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full origin-center" style={{ backgroundColor: vanilla }} />
                     <style dangerouslySetInnerHTML={{ __html: `
                       .group:hover .hover-invert { color: ${strawberry} !important; }
                     `}} />
                     <span className="font-jost text-xs tracking-[0.2em] uppercase relative z-10 transition-colors duration-700 hover-invert" style={{ color: vanilla }}>Shop Now</span>
                  </div>
               </div>
            </div>

            {/* Right Links & Newsletter */}
            <div className="md:col-span-5 flex flex-col md:pl-16 pt-16 md:pt-0">
               {/* Newsletter Box */}
               <div className="pb-16 border-b flex flex-col justify-center fade-melt-up" style={{ borderColor: `${vanilla}30` }}>
                  <span className="font-jost text-xs tracking-[0.3em] uppercase mb-8 block opacity-70">Join our Society</span>
                  <form className="relative group">
                     <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent border-b outline-none font-garamond text-3xl italic pb-4 placeholder:opacity-40 transition-all focus:border-opacity-100" style={{ borderColor: `${vanilla}40`, color: vanilla }} />
                     <button className="absolute right-0 bottom-4 font-jost text-sm tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity">Submit</button>
                  </form>
               </div>

               {/* Links Box */}
               <div className="pt-16 flex flex-col md:flex-row gap-16 fade-melt-up">
                  <div className="flex flex-col gap-4">
                     <span className="font-jost text-[0.65rem] tracking-[0.2em] uppercase opacity-50 mb-4">Explore</span>
                     {["Boutique", "The Craft", "Sourcing", "Gifting"].map(link => (
                        <a key={link} className="font-garamond text-2xl italic hover:ml-2 transition-all cursor-pointer opacity-80 hover:opacity-100">{link}</a>
                     ))}
                  </div>
                  <div className="flex flex-col gap-4">
                     <span className="font-jost text-[0.65rem] tracking-[0.2em] uppercase opacity-50 mb-4">Connect</span>
                     {["Instagram", "Pinterest", "Journal", "Contact"].map(link => (
                        <a key={link} className="font-garamond text-2xl italic hover:ml-2 transition-all cursor-pointer opacity-80 hover:opacity-100">{link}</a>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Massive Brand Name */}
         <div className="w-full overflow-hidden flex justify-center items-center pt-8 pointer-events-none relative select-none">
            <h1 className="font-garamond italic text-[24vw] leading-[0.75] tracking-tighter opacity-90 scale-y-[1.15]" style={{ color: vanilla }}>
               Éphémère
            </h1>
         </div>
         
         <div className="w-full px-8 py-6 border-t flex flex-col md:flex-row justify-between items-center font-jost text-[0.65rem] tracking-[0.2em] uppercase opacity-50 z-20" style={{ borderColor: `${vanilla}30` }}>
            <span>© {new Date().getFullYear()} Éphémère. All Rights Reserved.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
               <a className="hover:opacity-100 cursor-pointer">Privacy</a>
               <a className="hover:opacity-100 cursor-pointer">Terms</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
