"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Anton, Barlow } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const barlow = Barlow({ weight: ['400', '600', '900'], subsets: ['latin'] });

export function GameStudioDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [yellow, red] = palette.colors; // yellow = #FFEA00, red = #FC3E03

  useGSAP(() => {
    // Cinematic Slam animations
    // Custom cubic-bezier for a unique aggressive slam, differing from logistics-violet
    const slamEase = "CustomEase.create('slam', '0.7, 0, 0.3, 1')"; // Or fallback to power3.out if CustomEase isn't registered

    gsap.utils.toArray(".slam-reveal").forEach((el: any) => {
      gsap.fromTo(el, 
        { clipPath: "inset(0 100% 0 0)", x: -60 },
        { 
          clipPath: "inset(0 0% 0 0)", x: 0, 
          duration: 0.7, 
          ease: "power3.out", // Fallback to power3.out for guaranteed punchiness without CustomEase plugin
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );
    });
    
    gsap.utils.toArray(".slam-up").forEach((el: any) => {
      gsap.fromTo(el, 
        { clipPath: "inset(100% 0 0 0)", y: 60 },
        { 
          clipPath: "inset(0% 0 0 0)", y: 0, 
          duration: 0.7, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%"
          }
        }
      );
    });

    // Deep zoom for cinematic posters (Culture / Portfolios)
    gsap.utils.toArray(".poster-container").forEach((el: any) => {
      const img = el.querySelector("img");
      if(img) {
         gsap.fromTo(img,
           { scale: 1.5, filter: "brightness(0.5)" },
           { 
             scale: 1, 
             filter: "brightness(1)",
             duration: 1.5, 
             ease: "power3.out",
             scrollTrigger: { trigger: el, start: "top 80%" }
           }
         );
      }
    });

    // Hero title parallax
    gsap.to(".hero-title", {
      y: 200,
      scale: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${barlow.className} ${anton.variable} selection:bg-[${yellow}] selection:text-[${red}]`}
      style={{ backgroundColor: red, color: yellow }}
    >
      {/* GLOBAL NAVBAR (Fake) */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50 mix-blend-difference" style={{ color: yellow }}>
        <div className="font-anton text-3xl tracking-widest uppercase">KVS</div>
        <div className="hidden md:flex gap-8 font-bold tracking-widest uppercase text-sm">
          <a href="#" className="hover:underline">Games</a>
          <a href="#" className="hover:underline">Studio</a>
          <a href="#" className="hover:underline">Careers</a>
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .font-anton { font-family: var(--font-anton), sans-serif; }
        
        .kinetic-btn {
          position: relative;
          overflow: hidden;
          transition: transform 160ms ease-out, color 300ms ease;
        }
        .kinetic-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: ${yellow};
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
          z-index: -1;
        }
        .kinetic-btn:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        .kinetic-btn:hover {
          color: ${red} !important;
          transform: scale(0.97);
        }
      `}} />

      {/* 1. HERO (Cinematic Monolith) */}
      <section className="hero-section relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-24 z-10" style={{ backgroundColor: yellow, color: red }}>
        <div className="absolute inset-0 pointer-events-none z-0 bg-black">
           {/* Brutalist abstract crop */}
           <img 
             src="https://picsum.photos/seed/3466a60d/1200/800" 
             className="w-full h-full object-cover opacity-60 hero-bg grayscale" 
             alt="Hero abstract game art" 
           />
        </div>
        <div className="relative z-10 text-center w-full px-4" style={{ color: yellow }}>
          <h1 className="hero-title font-anton text-[18vw] md:text-[22vw] leading-[0.9] tracking-tighter uppercase m-0">Kinetic<br/>Void</h1>
          <p className="mt-8 font-bold text-xl md:text-3xl uppercase tracking-[0.4em] slam-reveal inline-block border-t-4 pt-4" style={{ borderColor: yellow }}>Interactive Entertainment</p>
        </div>
      </section>

      {/* 2. FEATURED GAMES (Cinematic Poster Treatment) */}
      <section className="relative w-full z-20 pt-48 pb-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: red }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-32 flex flex-col md:flex-row justify-between items-end border-b-8 pb-8" style={{ borderColor: yellow }}>
            <h2 className="font-anton text-7xl md:text-9xl uppercase tracking-tighter slam-reveal">Our Worlds</h2>
            <p className="text-2xl md:text-4xl font-bold tracking-widest uppercase mb-2 slam-reveal text-right max-w-sm">40M+ Active Players</p>
          </div>

          <div className="flex flex-col gap-48">
            {/* Game 1 */}
            <div className="group relative w-full flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="w-full md:w-[60%] aspect-[16/10] relative overflow-hidden poster-container shadow-2xl">
                 <div className="absolute inset-0 z-10 opacity-30 mix-blend-color pointer-events-none" style={{ backgroundColor: red }} />
                 <img src="https://picsum.photos/seed/004a4ba8/1200/800" className="w-full h-full object-cover" alt="Neon Drifter" />
                 <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
                   <div className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-black text-white inline-block mb-4">Now Available</div>
                 </div>
              </div>
              <div className="w-full md:w-[40%] flex flex-col justify-center">
                <h3 className="font-anton text-[6rem] md:text-[8rem] lg:text-[10rem] uppercase leading-[0.8] tracking-tighter mb-8 slam-reveal">Neon<br/>Drifter</h3>
                <p className="text-xl md:text-2xl font-semibold opacity-90 mb-12 max-w-lg slam-up">A high-speed cybernetic racing experience pushing the absolute boundaries of physics and adrenaline.</p>
                <button className="kinetic-btn self-start border-[6px] text-2xl font-bold uppercase tracking-[0.2em] px-12 py-5" style={{ borderColor: yellow, color: yellow }}>Watch Trailer</button>
              </div>
            </div>

            {/* Game 2 */}
            <div className="group relative w-full flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
              <div className="w-full md:w-[60%] aspect-[4/5] md:aspect-[16/10] relative overflow-hidden poster-container shadow-2xl">
                 <div className="absolute inset-0 z-10 opacity-50 mix-blend-color pointer-events-none" style={{ backgroundColor: red }} />
                 <img src="https://picsum.photos/seed/4dfdf0f7/1200/800" className="w-full h-full object-cover" alt="Abyssal Protocol" />
                 <div className="absolute bottom-0 right-0 p-8 z-20 pointer-events-none">
                   <div className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-white text-black inline-block mb-4">In Development</div>
                 </div>
              </div>
              <div className="w-full md:w-[40%] flex flex-col justify-center items-start md:items-end md:text-right">
                <h3 className="font-anton text-[6rem] md:text-[8rem] lg:text-[10rem] uppercase leading-[0.8] tracking-tighter mb-8 slam-reveal">Abyssal<br/>Protocol</h3>
                <p className="text-xl md:text-2xl font-semibold opacity-90 mb-12 max-w-lg slam-up">Survival horror redefined. Descend into a derelict underwater research facility where silence is your only weapon.</p>
                <button className="kinetic-btn self-start md:self-end border-[6px] text-2xl font-bold uppercase tracking-[0.2em] px-12 py-5" style={{ borderColor: yellow, color: yellow }}>Teaser Trailer</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDIO CULTURE (Cinematic Brutalism) */}
      <section className="relative w-full z-20 py-48 overflow-hidden" style={{ backgroundColor: yellow, color: red }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
             
             {/* Culture Cinematic Crop */}
             <div className="md:col-span-7 relative aspect-[4/5] overflow-hidden poster-container shadow-2xl bg-black">
               <img src="https://picsum.photos/seed/0dc80e13/1200/800" className="w-full h-full object-cover grayscale opacity-80" alt="Studio Culture" />
               <div className="absolute inset-0 mix-blend-multiply opacity-50 pointer-events-none" style={{ backgroundColor: red }} />
               
               {/* Huge overlapping typography */}
               <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end text-left z-20 mix-blend-difference pointer-events-none" style={{ color: yellow }}>
                 <h2 className="font-anton text-[12vw] md:text-[9vw] uppercase leading-[0.8] tracking-tighter slam-reveal">Our<br/>DNA</h2>
               </div>
             </div>

             {/* Stats & Description */}
             <div className="md:col-span-5 flex flex-col justify-center pt-12 md:pt-0">
                <p className="text-3xl md:text-4xl font-bold leading-tight mb-16 slam-up max-w-md">We are 400+ artists, engineers, and visionaries building worlds.</p>
                
                <div className="flex flex-col gap-12 border-t-[8px] pt-12" style={{ borderColor: red }}>
                  <div className="slam-up">
                    <p className="font-anton text-8xl uppercase tracking-tighter leading-none mb-2">3</p>
                    <p className="text-xl font-bold uppercase tracking-widest">Global Studios</p>
                  </div>
                  <div className="slam-up">
                    <p className="font-anton text-8xl uppercase tracking-tighter leading-none mb-2">15+</p>
                    <p className="text-xl font-bold uppercase tracking-widest">Industry Awards</p>
                  </div>
                </div>
             </div>

           </div>
        </div>
      </section>

      {/* 4. PRESS / ACCOLADES (Giant Marquee Quotes) */}
      <section className="relative w-full z-20 py-48 overflow-hidden" style={{ backgroundColor: red, color: yellow }}>
         <div className="flex flex-col justify-center items-center text-center px-6">
            <h2 className="font-anton text-[15vw] uppercase mb-16 opacity-10 tracking-tighter leading-[0.7] absolute top-20 pointer-events-none select-none w-full text-center whitespace-nowrap overflow-hidden">Accolades Accolades</h2>
            
            <div className="flex flex-col gap-32 max-w-5xl mx-auto relative z-10">
              <div className="slam-reveal">
                <p className="text-5xl md:text-7xl font-bold italic leading-[1.1] mb-8 tracking-tight text-white">"A staggering achievement in interactive storytelling. A true masterpiece."</p>
                <p className="font-anton text-4xl md:text-5xl uppercase tracking-[0.2em]">— IGN</p>
              </div>
              <div className="slam-reveal">
                <p className="text-5xl md:text-7xl font-bold italic leading-[1.1] mb-8 tracking-tight text-white">"Kinetic Void is setting the new gold standard for the entire industry."</p>
                <p className="font-anton text-4xl md:text-5xl uppercase tracking-[0.2em]">— Polygon</p>
              </div>
            </div>
         </div>
      </section>

      {/* 5. COLOSSAL FOOTER */}
      <section className="relative w-full h-[90vh] flex flex-col justify-between p-6 md:p-12 z-30" style={{ backgroundColor: red, color: yellow }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end font-bold uppercase tracking-widest text-xl gap-12">
          <div className="flex flex-col gap-4 text-left">
            <p className="font-anton text-4xl mb-4 opacity-50 tracking-tighter">Studios</p>
            <p>Los Angeles</p>
            <p>Tokyo</p>
            <p>London</p>
          </div>
          <div className="flex flex-col gap-4 text-left md:text-right">
            <p className="font-anton text-4xl mb-4 opacity-50 tracking-tighter">Connect</p>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Press Kit</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </div>

        <div className="w-full text-center mt-auto pb-12 overflow-hidden">
          <h1 className="font-anton text-[24vw] leading-[0.75] tracking-tighter uppercase m-0 transition-transform duration-500 ease-out cursor-pointer hover:scale-[1.03]" 
              style={{ WebkitTextStroke: `6px ${yellow}`, color: "transparent" }}>
            JOIN US
          </h1>
        </div>
      </section>

    </div>
  );
}
