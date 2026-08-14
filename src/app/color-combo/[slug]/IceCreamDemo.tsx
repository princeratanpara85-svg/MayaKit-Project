"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Lora, Nunito } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lora = Lora({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--font-lora' });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-nunito' });

export function IceCreamDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [cream, ocean] = palette.colors; // cream = #FAF8C0, ocean = #224E6F

  useGSAP(() => {
    // The "Scoop Bounce" curve: soft, exaggerated, gooey bounce.
    const scoopEase = "cubic-bezier(0.34, 1.56, 0.64, 1)";

    // 1. Hero Bounce Reveal
    gsap.fromTo(".bounce-in", 
      { opacity: 0, scale: 0.8, y: 60, rotation: -4 },
      { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.4, ease: scoopEase, stagger: 0.15 }
    );

    // 2. Scroll Bounces
    gsap.utils.toArray(".scroll-bounce").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.2,
          ease: scoopEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // 3. Grid Item Stagger Bounce
    gsap.fromTo(".grid-bounce",
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1.2,
        ease: scoopEase,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top 80%",
        }
      }
    );

    // 4. Marquee Infinite Scroll
    gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1
    });

    // 5. Floating / Bobbing elements (Parallax)
    gsap.utils.toArray(".float-element").forEach((el: any) => {
      gsap.to(el, {
        yPercent: -20,
        rotation: 3,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${lora.variable} ${nunito.variable} selection:bg-[${ocean}] selection:text-[${cream}] overflow-x-hidden font-nunito`}
      style={{ backgroundColor: cream, color: ocean }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-lora { font-family: var(--font-lora), serif; }
        .font-nunito { font-family: var(--font-nunito), sans-serif; }
        
        .img-wrapper {
          overflow: hidden;
          background-color: ${cream}; 
          border-radius: 9999px; /* Fully rounded pill/circle shapes for ice cream */
        }
        
        /* Bouncy hover state */
        .flavor-card:hover img {
          transform: scale(1.08) rotate(3deg);
        }

        /* Soft Tactile Button */
        .melt-btn {
          display: inline-block;
          transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 300ms ease, color 300ms ease;
          transform-origin: center;
          cursor: pointer;
          font-family: var(--font-nunito);
          font-weight: 900;
          font-size: 1.1rem;
          padding: 16px 40px;
          border-radius: 9999px;
          border: 3px solid ${ocean};
          background-color: transparent;
          color: ${ocean};
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .melt-btn:hover {
          background-color: ${ocean};
          color: ${cream};
          transform: translateY(-4px) scale(1.02); /* Bob up */
        }
        .melt-btn:active {
          transform: translateY(0px) scale(0.95); /* Soft squish */
        }

        .border-ocean {
          border-color: rgba(34, 78, 111, 0.2);
        }
      `}} />

      {/* SVG Filter removed */}

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50 mix-blend-multiply">
        <div className="font-lora text-3xl font-bold italic tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300">
          Melt & Co.
        </div>
        <div className="hidden md:flex gap-12 font-nunito text-sm font-bold tracking-widest uppercase">
          <a href="#" className="hover:opacity-70 transition-opacity">Flavors</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Our Craft</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Locations</a>
        </div>
        <button className="melt-btn !text-sm !py-2 !px-6 !border-2">
          Order Now
        </button>
      </nav>

      {/* 1. HERO */}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 px-8 md:px-12 z-10 overflow-hidden">
         
         <div className="md:w-1/2 flex flex-col items-start max-w-2xl z-20">
            <h1 className="font-lora text-6xl md:text-[7vw] font-bold italic leading-[1.1] bounce-in">
               Joy in every<br/>scoop.
            </h1>
            <p className="font-nunito text-lg md:text-xl font-bold mt-8 max-w-md bounce-in opacity-80 leading-relaxed">
               Handcrafted artisanal ice cream, made in small batches with organic local dairy. Life is short, eat dessert first.
            </p>
            <div className="mt-12 bounce-in">
               <button className="melt-btn">Taste the Magic</button>
            </div>
         </div>

         <div className="md:w-1/2 relative w-full h-[60vh] md:h-[80vh] flex justify-center items-center mt-12 md:mt-0 bounce-in">
            <div className={`relative w-[80%] max-w-[500px] aspect-[3/4] img-wrapper rotate-[-2deg] shadow-2xl border-4 border-[${ocean}] float-element`}>
               <img 
                 src="https://picsum.photos/seed/ee2d20f7/1200/800" 
                 className="w-full h-full object-cover transition-transform duration-500" 
                 alt="Ice Cream Cone" 
               />
            </div>
            {/* Floating decorative elements */}
            <div className={`absolute top-[10%] left-[10%] w-16 h-16 rounded-full bg-[${ocean}] float-element opacity-20`} />
            <div className={`absolute bottom-[20%] right-[10%] w-8 h-8 rounded-full bg-[${ocean}] float-element opacity-40`} />
         </div>

      </section>

      {/* 2. FLAVOR LINEUP (The Scoops) */}
      <section className="relative w-full py-32 px-8 md:px-12 z-20 bg-opacity-5">
         <div className="w-full flex flex-col items-center text-center mb-20 scroll-bounce">
            <span className="font-nunito font-black uppercase tracking-widest opacity-60 mb-4">Signature Creations</span>
            <h2 className="font-lora text-5xl md:text-6xl font-bold italic">Meet the Classics</h2>
         </div>

         <div className="grid-container grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl mx-auto">
            
            {/* Flavor 1 */}
            <div className="flavor-card flex flex-col items-center gap-6 cursor-pointer group grid-bounce">
               <div className={`w-64 h-64 img-wrapper border-4 border-[${ocean}] shadow-xl`}>
                  <img src="https://picsum.photos/seed/24d2c8aa/1200/800" className="w-full h-full object-cover transition-transform duration-500" alt="Sea Salt Caramel" />
               </div>
               <div className="text-center">
                  <h3 className="font-lora text-3xl font-bold italic mb-2">Sea Salt Caramel</h3>
                  <p className="font-nunito font-bold opacity-70">Burnt sugar, organic cream, flaky Maldon salt.</p>
               </div>
            </div>

            {/* Flavor 2 */}
            <div className="flavor-card flex flex-col items-center gap-6 cursor-pointer group grid-bounce md:mt-16">
               <div className={`w-64 h-64 img-wrapper border-4 border-[${ocean}] shadow-xl`}>
                  <img src="https://picsum.photos/seed/74c38968/1200/800" className="w-full h-full object-cover transition-transform duration-500" alt="Midnight Chocolate" />
               </div>
               <div className="text-center">
                  <h3 className="font-lora text-3xl font-bold italic mb-2">Midnight Chocolate</h3>
                  <p className="font-nunito font-bold opacity-70">72% dark cocoa, fudge ribbons, absolute decadence.</p>
               </div>
            </div>

            {/* Flavor 3 */}
            <div className="flavor-card flex flex-col items-center gap-6 cursor-pointer group grid-bounce">
               <div className={`w-64 h-64 img-wrapper border-4 border-[${ocean}] shadow-xl`}>
                  <img src="https://picsum.photos/seed/52df74a3/1200/800" className="w-full h-full object-cover transition-transform duration-500" alt="Strawberry Basil" />
               </div>
               <div className="text-center">
                  <h3 className="font-lora text-3xl font-bold italic mb-2">Strawberry Basil</h3>
                  <p className="font-nunito font-bold opacity-70">Roasted berries, fresh herbs, surprisingly perfect.</p>
               </div>
            </div>

         </div>
      </section>

      {/* 3. THE CRAFT (Ingredients Story) */}
      <section className="relative w-full py-40 px-8 md:px-12 z-20 flex flex-col items-center text-center">
         <div className="max-w-4xl relative z-10 scroll-bounce">
            <h2 className="font-lora text-5xl md:text-7xl font-bold italic mb-8">
               No shortcuts. Just incredibly good ingredients.
            </h2>
            <p className="font-nunito text-xl font-bold opacity-80 leading-relaxed max-w-2xl mx-auto">
               We source our milk from happy, pasture-raised cows and partner with local farmers for our seasonal fruits. It takes three days to make a single batch, and you can taste every second of it.
            </p>
         </div>
         
         <div className="absolute left-[5%] top-[20%] w-48 h-48 img-wrapper float-element hidden md:block">
            <img src="https://picsum.photos/seed/0bbd2f95/1200/800" className="w-full h-full object-cover" alt="Milk" />
         </div>
         <div className="absolute right-[5%] bottom-[20%] w-56 h-56 img-wrapper float-element hidden md:block">
            <img src="https://picsum.photos/seed/7f1feccd/1200/800" className="w-full h-full object-cover" alt="Vanilla Beans" />
         </div>
      </section>

      {/* 4. MARQUEE (Brand Personality) */}
      <section className={`relative w-full py-12 bg-[${ocean}] overflow-hidden flex items-center`} style={{ color: cream }}>
         <div className="w-[200vw] flex marquee-inner whitespace-nowrap">
            <div className="w-1/2 flex justify-around items-center font-nunito font-black uppercase text-4xl tracking-widest">
               <span>MELT WITH US</span>
               <span>•</span>
               <span>STAY CHILL</span>
               <span>•</span>
               <span>TREAT YOURSELF</span>
               <span>•</span>
            </div>
            <div className="w-1/2 flex justify-around items-center font-nunito font-black uppercase text-4xl tracking-widest">
               <span>MELT WITH US</span>
               <span>•</span>
               <span>STAY CHILL</span>
               <span>•</span>
               <span>TREAT YOURSELF</span>
               <span>•</span>
            </div>
         </div>
      </section>

      {/* 5. FOOTER */}
      {/* SVG Wavy Top Border */}
      <div className="w-full overflow-hidden rotate-180 -mb-1 relative z-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-[60px] fill-[${ocean}]`}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <footer className="relative w-full pt-20 pb-12 px-8 md:px-12 z-20" style={{ backgroundColor: ocean, color: cream }}>
         
         <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24 scroll-bounce">
            <h2 className="font-lora text-6xl md:text-8xl font-bold italic mb-12">Craving a scoop?</h2>
            <p className="font-nunito text-xl font-bold opacity-80 mb-12">
               Find us in grocers nationwide, or visit our flagship scoop shops.
            </p>
            <div className="flex gap-6">
               <button className={`melt-btn !border-[${cream}] !text-[${ocean}] !bg-[${cream}] hover:!bg-transparent hover:!text-[${cream}]`}>
                 Find a Store
               </button>
            </div>
         </div>

         <div className={`flex flex-col md:flex-row justify-between items-start gap-16 border-t border-[${cream}] border-opacity-20 pt-16 scroll-bounce`}>
            
            <div className="flex flex-col gap-4 max-w-xs">
               <div className="font-lora text-4xl font-bold italic">Melt & Co.</div>
               <p className="font-nunito font-bold opacity-60">
                 Artisanal ice cream for the young at heart.
               </p>
            </div>

            <div className="flex gap-16 font-nunito font-bold uppercase tracking-widest text-sm opacity-80">
               <div className="flex flex-col gap-6">
                  <a href="#" className="hover:text-white transition-colors">Shop Online</a>
                  <a href="#" className="hover:text-white transition-colors">Gift Cards</a>
                  <a href="#" className="hover:text-white transition-colors">Merch</a>
               </div>
               <div className="flex flex-col gap-6">
                  <a href="#" className="hover:text-white transition-colors">Our Story</a>
                  <a href="#" className="hover:text-white transition-colors">Ingredients</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
               </div>
            </div>

         </div>

         <div className="w-full mt-24 pt-8 flex justify-between items-center font-nunito text-xs font-bold uppercase tracking-widest opacity-50 scroll-bounce">
            <div>© {new Date().getFullYear()} MELT & CO. ALL RIGHTS RESERVED.</div>
            <div>STAY SWEET.</div>
         </div>

      </footer>

    </div>
  );
}
