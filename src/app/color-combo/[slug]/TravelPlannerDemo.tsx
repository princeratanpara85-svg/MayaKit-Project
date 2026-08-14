"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Playfair_Display, Outfit } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['400', '600', '700'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-outfit' });

export function TravelPlannerDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [lightGray, richBrown] = palette.colors; // lightGray = #E5E5E5, richBrown = #553621

  useGSAP(() => {
    // Confident, crisp editorial easing (NOT soft/drifting)
    // Starts fast, snaps deliberately into place like turning a magazine page.
    const editorialEase = "cubic-bezier(0.19, 1, 0.22, 1)"; // easeOutExpo

    // 1. Hero Reveal (Crisp text reveal)
    gsap.fromTo(".hero-text", 
      { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: editorialEase, stagger: 0.2 }
    );

    // 2. Crisp Editorial Scroll Reveals
    gsap.utils.toArray(".editorial-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: editorialEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // 3. Image Clip-Path Reveals (Magazine-like Unveil)
    gsap.utils.toArray(".img-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: editorialEase,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    });

    // 4. Horizontal Destination Carousel
    const track = document.querySelector(".dest-carousel-track") as HTMLElement;
    if (track) {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".dest-carousel",
          pin: true,
          scrub: 0.5, // Slight smoothing for premium feel
          invalidateOnRefresh: true,
          end: () => "+=" + (track.scrollWidth - window.innerWidth)
        }
      });
    }

    // 5. Journey Line Drawing (Process Section)
    gsap.fromTo(".journey-line",
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        ease: "none",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 50%",
          end: "bottom 80%",
          scrub: true
        }
      }
    );

    // 6. Staggered Itinerary Deep-Dive
    gsap.fromTo(".itinerary-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 1.2,
        ease: editorialEase,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".itinerary-section",
          start: "top 70%"
        }
      }
    );

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${playfair.variable} ${outfit.variable} selection:bg-[${richBrown}] selection:text-[${lightGray}] overflow-x-hidden`}
      style={{ backgroundColor: lightGray, color: richBrown }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-playfair { font-family: var(--font-playfair), serif; }
        .font-outfit { font-family: var(--font-outfit), sans-serif; }
        
        /* Premium Duotone Filter */
        .duotone-img {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease;
        }
        .img-wrapper {
          overflow: hidden;
        }
        .img-wrapper:hover .duotone-img {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        /* Tactile interactions (Elegantly scaled back for premium feel) */
        .tactile-btn {
          display: inline-block;
          transition: transform 300ms cubic-bezier(0.19, 1, 0.22, 1), opacity 300ms ease;
          transform-origin: center;
          cursor: pointer;
        }
        .tactile-btn:active {
          transform: scale(0.98); /* Less aggressive than 0.97 for a softer, premium touch */
        }
        .tactile-btn:hover {
          opacity: 0.7;
        }

        .dest-carousel {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .editorial-line {
          width: 1px;
          background-color: ${richBrown};
          opacity: 0.3;
        }
      `}} />

      {/* SVG Duotone Definition (Perfectly mapping colors) */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="duotone-travel">
          <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" result="gray" />
          <feComponentTransfer colorInterpolationFilters="sRGB">
            {/* Maps Black -> Rich Brown (#553621: 85,54,33 -> 0.33, 0.21, 0.13) */}
            {/* Maps White -> Light Gray (#E5E5E5: 229,229,229 -> 0.89, 0.89, 0.89) */}
            <feFuncR type="table" tableValues="0.33 0.89"></feFuncR>
            <feFuncG type="table" tableValues="0.21 0.89"></feFuncG>
            <feFuncB type="table" tableValues="0.13 0.89"></feFuncB>
          </feComponentTransfer>
        </filter>
      </svg>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-8 md:px-16 flex justify-between items-center z-50 mix-blend-multiply">
        <div className="font-playfair text-3xl italic font-bold tracking-tight tactile-btn">
          Atlas.
        </div>
        <div className="hidden md:flex gap-12 font-outfit font-medium text-xs tracking-[0.2em] uppercase">
          <a href="#" className="tactile-btn">Destinations</a>
          <a href="#" className="tactile-btn">Journeys</a>
          <a href="#" className="tactile-btn">Journal</a>
        </div>
        <button className={`tactile-btn font-outfit text-xs font-semibold tracking-widest uppercase border border-[${richBrown}] px-6 py-3 hover:bg-[${richBrown}] hover:text-[${lightGray}] transition-colors duration-500`}>
          Enquire
        </button>
      </nav>

      {/* 1. HERO */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center pt-20 px-8 md:px-16 z-10">
         <div className="absolute inset-0 z-0 opacity-70 img-wrapper">
           <img 
             src="https://picsum.photos/seed/925a0d1d/1200/800" 
             className="w-full h-full object-cover duotone-img" 
             alt="Hero Background" 
           />
           {/* Gradient fade to integrate with background */}
           <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: `linear-gradient(to top, ${lightGray}, transparent)` }} />
         </div>

         <div className="relative z-10 text-center flex flex-col items-center max-w-4xl">
            <h1 className="font-playfair text-[10vw] md:text-[6vw] font-bold leading-[1.1] tracking-tight">
               <span className="block hero-text">Curated Journeys.</span>
               <span className="block hero-text italic">Boundless Horizons.</span>
            </h1>
            <p className="font-outfit text-lg md:text-xl font-light mt-8 max-w-2xl hero-text opacity-80 leading-relaxed">
               We design bespoke itineraries for the discerning traveler, weaving together authentic encounters, untamed landscapes, and unparalleled luxury.
            </p>
         </div>
      </section>

      {/* 2. FEATURED DESTINATIONS (Horizontal Carousel) */}
      <section className="dest-carousel relative z-20 border-y" style={{ borderColor: 'rgba(85,54,33,0.1)' }}>
         <div className="absolute top-12 left-8 md:left-16 font-outfit text-xs tracking-[0.2em] uppercase font-semibold z-30">Featured Regions</div>
         
         <div className="dest-carousel-track flex h-[70vh] items-center px-8 md:px-16 gap-12 md:gap-24 w-max">
            
            {/* Card 1 */}
            <div className="dest-card w-[80vw] md:w-[40vw] shrink-0 flex flex-col gap-6 cursor-pointer group">
               <div className="w-full aspect-[16/10] img-wrapper img-reveal relative">
                  <img src="https://picsum.photos/seed/9057ecc9/1200/800" className="w-full h-full object-cover duotone-img" alt="Kyoto" />
               </div>
               <div className="flex justify-between items-end editorial-reveal">
                  <div>
                    <h3 className="font-playfair text-4xl italic mb-2 group-hover:opacity-70 transition-opacity duration-500">Kyoto, Japan</h3>
                    <p className="font-outfit text-sm tracking-widest uppercase opacity-60">Ancient Temples & Zen Gardens</p>
                  </div>
                  <span className="font-outfit text-sm underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
               </div>
            </div>

            {/* Card 2 */}
            <div className="dest-card w-[80vw] md:w-[40vw] shrink-0 flex flex-col gap-6 cursor-pointer group">
               <div className="w-full aspect-[16/10] img-wrapper img-reveal relative">
                  <img src="https://picsum.photos/seed/291ff231/1200/800" className="w-full h-full object-cover duotone-img" alt="Tuscany" />
               </div>
               <div className="flex justify-between items-end editorial-reveal">
                  <div>
                    <h3 className="font-playfair text-4xl italic mb-2 group-hover:opacity-70 transition-opacity duration-500">Tuscany, Italy</h3>
                    <p className="font-outfit text-sm tracking-widest uppercase opacity-60">Vineyards & Renaissance Art</p>
                  </div>
                  <span className="font-outfit text-sm underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
               </div>
            </div>

            {/* Card 3 */}
            <div className="dest-card w-[80vw] md:w-[40vw] shrink-0 flex flex-col gap-6 cursor-pointer group">
               <div className="w-full aspect-[16/10] img-wrapper img-reveal relative">
                  <img src="https://picsum.photos/seed/9aa5fd61/1200/800" className="w-full h-full object-cover duotone-img" alt="Patagonia" />
               </div>
               <div className="flex justify-between items-end editorial-reveal">
                  <div>
                    <h3 className="font-playfair text-4xl italic mb-2 group-hover:opacity-70 transition-opacity duration-500">Patagonia, Chile</h3>
                    <p className="font-outfit text-sm tracking-widest uppercase opacity-60">Glaciers & Untamed Wilderness</p>
                  </div>
                  <span className="font-outfit text-sm underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
               </div>
            </div>

            {/* Card 4 */}
            <div className="dest-card w-[80vw] md:w-[40vw] shrink-0 flex flex-col gap-6 cursor-pointer group">
               <div className="w-full aspect-[16/10] img-wrapper img-reveal relative">
                  <img src="https://picsum.photos/seed/3a0a4d5a/1200/800" className="w-full h-full object-cover duotone-img" alt="Marrakech" />
               </div>
               <div className="flex justify-between items-end editorial-reveal">
                  <div>
                    <h3 className="font-playfair text-4xl italic mb-2 group-hover:opacity-70 transition-opacity duration-500">Marrakech, Morocco</h3>
                    <p className="font-outfit text-sm tracking-widest uppercase opacity-60">Vibrant Souks & Desert Oasis</p>
                  </div>
                  <span className="font-outfit text-sm underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
               </div>
            </div>

         </div>
      </section>

      {/* 3. THE PROCESS (Journey Map) */}
      <section className="process-section relative w-full py-48 px-8 md:px-16 z-20 flex justify-center">
         <div className="max-w-4xl w-full flex relative">
            
            {/* SVG Journey Line */}
            <div className={`absolute left-6 md:left-[50%] top-0 bottom-0 w-[2px] -translate-x-[1px] opacity-20 bg-[${richBrown}]`} />
            <svg className="absolute left-6 md:left-[50%] top-0 bottom-0 w-8 -translate-x-4 h-full" viewBox="0 0 32 1000" preserveAspectRatio="none">
               <path 
                 className="journey-line" 
                 d="M16 0 L16 1000" 
                 fill="none" 
                 stroke={richBrown} 
                 strokeWidth="2" 
               />
            </svg>

            <div className="w-full flex flex-col gap-32 relative z-10">
               
               <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 editorial-reveal">
                  <div className="md:w-1/2 md:text-right flex flex-col pl-16 md:pl-0">
                     <span className="font-outfit text-xs tracking-[0.2em] uppercase font-bold mb-4 opacity-60">Phase 01</span>
                     <h3 className="font-playfair text-3xl italic font-bold">The Consultation</h3>
                     <p className="font-outfit mt-4 opacity-80 leading-relaxed font-light">We begin with a conversation. Understanding your rhythms, preferences, and the unwritten desires of your ideal escape.</p>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 editorial-reveal">
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="md:w-1/2 flex flex-col pl-16 md:pl-16">
                     <span className="font-outfit text-xs tracking-[0.2em] uppercase font-bold mb-4 opacity-60">Phase 02</span>
                     <h3 className="font-playfair text-3xl italic font-bold">The Blueprint</h3>
                     <p className="font-outfit mt-4 opacity-80 leading-relaxed font-light">Our specialists craft a seamless narrative, securing boutique accommodations and private access to hidden cultural gems.</p>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 editorial-reveal">
                  <div className="md:w-1/2 md:text-right flex flex-col pl-16 md:pl-0">
                     <span className="font-outfit text-xs tracking-[0.2em] uppercase font-bold mb-4 opacity-60">Phase 03</span>
                     <h3 className="font-playfair text-3xl italic font-bold">The Immersion</h3>
                     <p className="font-outfit mt-4 opacity-80 leading-relaxed font-light">You embark on a flawlessly orchestrated journey. We remain in the shadows, anticipating every need while you experience the world.</p>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
               </div>

            </div>
         </div>
      </section>

      {/* 4. SIGNATURE ITINERARY DEEP-DIVE */}
      <section className="itinerary-section relative w-full py-32 px-8 md:px-16 z-20" style={{ backgroundColor: richBrown, color: lightGray }}>
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
            
            <div className="md:w-1/3 flex flex-col editorial-reveal">
               <h2 className="font-playfair text-5xl md:text-6xl font-bold leading-tight">
                 Signature<br/>
                 <span className="italic font-light">Escape</span>
               </h2>
               <p className="font-outfit mt-8 text-sm tracking-[0.2em] uppercase opacity-70">
                 The Icelandic Highland Traverse
               </p>
               <p className="font-outfit mt-6 font-light leading-relaxed opacity-90">
                 A breathtaking seven-day expedition through volcanic deserts, glacial rivers, and private luxury lodges.
               </p>
               <button className="tactile-btn mt-12 w-fit font-outfit text-xs font-semibold tracking-widest uppercase border-b pb-2 hover:opacity-70 transition-opacity">
                 View Full Itinerary
               </button>
            </div>

            <div className="md:w-2/3 flex flex-col">
               <div className="border-t border-b py-8 flex flex-col md:flex-row gap-8 itinerary-item" style={{ borderColor: 'rgba(229,229,229,0.2)' }}>
                  <div className="font-outfit font-bold text-sm tracking-widest md:w-32 opacity-70">DAY 01</div>
                  <div className="flex-1">
                     <h4 className="font-playfair text-2xl italic mb-4">Arrival in Reykjavík</h4>
                     <p className="font-outfit font-light opacity-80">Private helicopter transfer from Keflavík directly to The Retreat at Blue Lagoon for a private geothermal immersion.</p>
                  </div>
               </div>
               <div className="border-b py-8 flex flex-col md:flex-row gap-8 itinerary-item" style={{ borderColor: 'rgba(229,229,229,0.2)' }}>
                  <div className="font-outfit font-bold text-sm tracking-widest md:w-32 opacity-70">DAY 02</div>
                  <div className="flex-1">
                     <h4 className="font-playfair text-2xl italic mb-4">The Golden Circle Private Access</h4>
                     <p className="font-outfit font-light opacity-80">A guided Superjeep expedition through Þingvellir, with exclusive after-hours access to the Geysir geothermal area.</p>
                  </div>
               </div>
               <div className="border-b py-8 flex flex-col md:flex-row gap-8 itinerary-item" style={{ borderColor: 'rgba(229,229,229,0.2)' }}>
                  <div className="font-outfit font-bold text-sm tracking-widest md:w-32 opacity-70">DAY 03</div>
                  <div className="flex-1">
                     <h4 className="font-playfair text-2xl italic mb-4">Glacial Ice Caves</h4>
                     <p className="font-outfit font-light opacity-80">Descend into the sapphire blue ice caves of Vatnajökull alongside a private glaciologist.</p>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="relative w-full py-48 px-8 md:px-16 z-20 flex justify-center text-center">
         <div className="max-w-4xl editorial-reveal">
            <span className="font-outfit text-4xl block mb-8 opacity-30">“</span>
            <h3 className="font-playfair text-3xl md:text-5xl font-light italic leading-snug">
               Every detail was executed with a profound understanding of what constitutes true luxury. It wasn't just a trip; it was an awakening.
            </h3>
            <p className="font-outfit mt-12 text-sm tracking-widest uppercase font-bold opacity-70">
               — M. & E. Kensington, Alpine Retreat
            </p>
         </div>
      </section>

      {/* 6. MASSIVE FOOTER */}
      <footer className="relative w-full pt-32 pb-16 px-8 md:px-16 z-20 border-t" style={{ borderColor: 'rgba(85,54,33,0.1)' }}>
         <div className="w-full flex flex-col justify-center items-center text-center editorial-reveal">
            <p className="font-outfit font-semibold tracking-[0.2em] uppercase text-xs mb-8 opacity-60">Ready to explore?</p>
            <a href="#" className="font-playfair text-[8vw] md:text-[6vw] font-bold italic leading-none hover:opacity-70 transition-opacity tactile-btn mb-24">
               Begin Your Journey.
            </a>
         </div>

         <div className="w-full flex flex-col md:flex-row justify-between items-start gap-16 font-outfit text-sm font-light editorial-reveal">
            
            <div className="flex flex-col gap-4">
               <h4 className="font-bold tracking-widest uppercase text-xs mb-2 opacity-60">Offices</h4>
               <p>London — 44 20 7946 0958</p>
               <p>New York — 1 212 555 0192</p>
               <p>Tokyo — 81 3 3224 9999</p>
            </div>

            <div className="flex gap-16">
               <div className="flex flex-col gap-4">
                  <h4 className="font-bold tracking-widest uppercase text-xs mb-2 opacity-60">Company</h4>
                  <a href="#" className="hover:opacity-70 tactile-btn">About Us</a>
                  <a href="#" className="hover:opacity-70 tactile-btn">Our Philosophy</a>
                  <a href="#" className="hover:opacity-70 tactile-btn">Press</a>
               </div>
               <div className="flex flex-col gap-4">
                  <h4 className="font-bold tracking-widest uppercase text-xs mb-2 opacity-60">Social</h4>
                  <a href="#" className="hover:opacity-70 tactile-btn">Instagram</a>
                  <a href="#" className="hover:opacity-70 tactile-btn">Pinterest</a>
                  <a href="#" className="hover:opacity-70 tactile-btn">Journal</a>
               </div>
            </div>

         </div>

         <div className="w-full mt-32 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-outfit text-xs font-light opacity-60 editorial-reveal" style={{ borderColor: 'rgba(85,54,33,0.1)' }}>
            <div className="tracking-widest uppercase">© {new Date().getFullYear()} Atlas Travel Planning</div>
            <div className="flex gap-8 tracking-widest uppercase">
               <a href="#" className="hover:opacity-100 tactile-btn">Terms</a>
               <a href="#" className="hover:opacity-100 tactile-btn">Privacy</a>
            </div>
         </div>
      </footer>

    </div>
  );
}
