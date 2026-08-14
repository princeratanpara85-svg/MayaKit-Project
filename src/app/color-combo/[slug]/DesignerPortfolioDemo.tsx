"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Syne, Manrope } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-manrope' });

export function DesignerPortfolioDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [violet, navy] = palette.colors; // violet = #B14EFF, navy = #0A1633

  useGSAP(() => {
    const emilEase = "cubic-bezier(0.23, 1, 0.32, 1)";

    // 1. Hero Staggered Character Reveal
    // We split the text into spans manually in the JSX, then animate them here
    gsap.fromTo(".hero-char", 
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        ease: emilEase,
        stagger: 0.03, // fast, confident stagger
        delay: 0.2
      }
    );

    gsap.fromTo(".hero-fade",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: emilEase }
    );

    // 2. Hardware-accelerated clip-path reveals for project images
    gsap.utils.toArray(".project-clip-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { clipPath: "inset(100% 0 0 0)" }, // reveal from bottom up
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: emilEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );
    });

    // Parallax on images for depth
    gsap.utils.toArray(".project-parallax").forEach((el: any) => {
      gsap.to(el, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // 3. Emil-style fast intersection reveals for content text
    gsap.utils.toArray(".content-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          ease: emilEase,
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    // 4. Horizontal Scroll Section (Process)
    const processCards = gsap.utils.toArray(".process-card");
    gsap.to(processCards, {
      xPercent: -100 * (processCards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".process-section",
        pin: true,
        scrub: 1,
        snap: 1 / (processCards.length - 1),
        end: () => "+=" + (document.querySelector(".process-section")?.clientWidth || 1000)
      }
    });

  }, { scope: container });

  const heroText = "I shape digital brands & experiences.";
  const heroChars = heroText.split("");

  return (
    <div 
      ref={container}
      className={`min-h-screen ${manrope.variable} ${syne.variable} selection:bg-[${violet}] selection:text-[${navy}] overflow-x-hidden`}
      style={{ backgroundColor: navy, color: violet }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-syne { font-family: var(--font-syne), sans-serif; }
        .font-manrope { font-family: var(--font-manrope), sans-serif; }
        
        /* Emil's strict tactile interactions */
        .emil-btn {
          display: inline-block;
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms ease;
          transform-origin: center;
          cursor: pointer;
        }
        .emil-btn:active {
          transform: scale(0.97); /* The core tactile feedback */
        }
        .emil-btn:hover {
          opacity: 0.8;
        }

        /* Sophisticated underline hover effect */
        .hover-underline {
          position: relative;
          text-decoration: none;
        }
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: ${violet};
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        /* Image hover scaling */
        .project-image-wrapper {
          overflow: hidden;
        }
        .project-image-wrapper img {
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .project-image-wrapper:hover img {
          transform: scale(1.05);
        }

        .process-section {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
      `}} />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-8 md:px-16 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-syne text-2xl font-bold tracking-tight emil-btn">
          ALEX.
        </div>
        <div className="hidden md:flex gap-12 font-manrope font-semibold text-sm tracking-widest uppercase">
          <a href="#" className="hover-underline emil-btn">Work</a>
          <a href="#" className="hover-underline emil-btn">Studio</a>
          <a href="#" className="hover-underline emil-btn">Contact</a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section className="relative w-full h-[100vh] flex flex-col justify-center px-8 md:px-16 z-10 pt-20">
        <p className="font-manrope text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-8 hero-fade">
          Independent Art Director
        </p>
        <h1 className="font-syne text-[10vw] md:text-[7vw] font-extrabold leading-[0.9] tracking-tighter flex flex-wrap">
          {heroChars.map((char, i) => (
            <span key={i} className="hero-char inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
              {char}
            </span>
          ))}
        </h1>
        <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-6xl hero-fade">
           <p className="font-manrope text-lg md:text-xl max-w-md font-medium opacity-80 leading-relaxed">
             Specializing in bold brand identities and immersive digital platforms for cultural institutions and forward-thinking tech.
           </p>
           <button className="emil-btn mt-8 md:mt-0 font-syne font-bold text-xl flex items-center gap-4">
             View Case Studies
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
           </button>
        </div>
      </section>

      {/* 2. SELECTED WORK (The Grid) */}
      <section className="relative w-full py-32 px-8 md:px-16 z-20">
         <div className={`w-full flex justify-between items-end border-b border-[${violet}] pb-8 mb-24 content-reveal`} style={{ borderColor: 'rgba(177,78,255,0.2)' }}>
            <h2 className="font-syne text-3xl md:text-5xl font-bold">Selected Work</h2>
            <p className="font-manrope font-bold tracking-widest uppercase text-sm">2024 — 2026</p>
         </div>

         <div className="flex flex-col gap-48">
            {/* Project 1 */}
            <div className="w-full flex flex-col md:flex-row gap-12 items-center group cursor-pointer emil-btn" style={{ display: 'flex' }}>
               <div className="w-full md:w-3/5 aspect-[4/3] project-clip-reveal project-image-wrapper">
                  <img 
                    src="https://picsum.photos/seed/3b113c15/1200/800" 
                    className="w-full h-[120%] object-cover project-parallax -mt-[10%]" 
                    alt="Project 1" 
                  />
               </div>
               <div className="w-full md:w-2/5 flex flex-col gap-6 content-reveal">
                  <p className="font-manrope font-bold tracking-widest uppercase text-xs opacity-70">Editorial Design</p>
                  <h3 className="font-syne text-5xl md:text-7xl font-bold leading-none hover-underline self-start">Nalanda<br/>Archive</h3>
                  <p className="font-manrope text-lg opacity-80 mt-4">A brutalist digital exhibition space preserving architectural history through stark typography and immense negative space.</p>
               </div>
            </div>

            {/* Project 2 - Reversed */}
            <div className="w-full flex flex-col md:flex-row-reverse gap-12 items-center group cursor-pointer emil-btn" style={{ display: 'flex' }}>
               <div className="w-full md:w-3/5 aspect-[3/4] md:aspect-[4/3] project-clip-reveal project-image-wrapper">
                  <img 
                    src="https://picsum.photos/seed/da4169e1/1200/800" 
                    className="w-full h-[120%] object-cover project-parallax -mt-[10%]" 
                    alt="Project 2" 
                  />
               </div>
               <div className="w-full md:w-2/5 flex flex-col gap-6 content-reveal">
                  <p className="font-manrope font-bold tracking-widest uppercase text-xs opacity-70">Brand Identity</p>
                  <h3 className="font-syne text-5xl md:text-7xl font-bold leading-none hover-underline self-start">Aura<br/>Music</h3>
                  <p className="font-manrope text-lg opacity-80 mt-4">Defining the visual language for a high-fidelity audio streaming platform using aggressive neon and deep contrasts.</p>
               </div>
            </div>

            {/* Project 3 */}
            <div className="w-full flex flex-col md:flex-row gap-12 items-center group cursor-pointer emil-btn" style={{ display: 'flex' }}>
               <div className="w-full md:w-3/5 aspect-[16/9] project-clip-reveal project-image-wrapper">
                  <img 
                    src="https://picsum.photos/seed/cd772866/1200/800" 
                    className="w-full h-[120%] object-cover project-parallax -mt-[10%]" 
                    alt="Project 3" 
                  />
               </div>
               <div className="w-full md:w-2/5 flex flex-col gap-6 content-reveal">
                  <p className="font-manrope font-bold tracking-widest uppercase text-xs opacity-70">Creative Direction</p>
                  <h3 className="font-syne text-5xl md:text-7xl font-bold leading-none hover-underline self-start">Object<br/>Studio</h3>
                  <p className="font-manrope text-lg opacity-80 mt-4">Complete rebrand and digital flagship for an avant-garde furniture design collective based in Copenhagen.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 3. PROCESS / ABOUT (Horizontal Scroll) */}
      <section className={`process-section relative bg-[${violet}] text-[${navy}]`} style={{ backgroundColor: violet, color: navy }}>
         <div className="absolute top-16 left-8 md:left-16 font-syne text-3xl font-bold z-10">Process.</div>
         <div className="flex h-full w-[300vw] md:w-[200vw] pl-8 md:pl-[30vw]">
            <div className="process-card w-screen md:w-[50vw] h-full flex flex-col justify-center px-8 md:px-16 shrink-0">
               <h3 className="font-syne text-5xl md:text-7xl font-bold mb-8">01. Discovery</h3>
               <p className="font-manrope text-xl md:text-2xl font-medium max-w-lg leading-relaxed">
                 Every great design starts with an interrogation. I dig into the core truth of your brand, stripping away the excess until only the absolute essence remains.
               </p>
            </div>
            <div className="process-card w-screen md:w-[50vw] h-full flex flex-col justify-center px-8 md:px-16 shrink-0">
               <h3 className="font-syne text-5xl md:text-7xl font-bold mb-8">02. Tension</h3>
               <p className="font-manrope text-xl md:text-2xl font-medium max-w-lg leading-relaxed">
                 Safe design goes unnoticed. I introduce visual tension through aggressive typography, extreme contrasts, and unexpected spatial relationships to command attention.
               </p>
            </div>
            <div className="process-card w-screen md:w-[50vw] h-full flex flex-col justify-center px-8 md:px-16 shrink-0">
               <h3 className="font-syne text-5xl md:text-7xl font-bold mb-8">03. Polish</h3>
               <p className="font-manrope text-xl md:text-2xl font-medium max-w-lg leading-relaxed">
                 The difference between good and world-class lies in motion and tactile feedback. Every interaction is engineered to feel instantly responsive and physically grounded.
               </p>
            </div>
         </div>
      </section>

      {/* 4. CLIENTS & EXPERTISE */}
      <section className="relative w-full py-48 px-8 md:px-16 z-20">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24">
            <div className="flex-1">
               <h3 className="font-syne text-3xl font-bold mb-12 content-reveal">Expertise</h3>
               <ul className="flex flex-col gap-6 font-manrope text-xl font-medium content-reveal">
                  <li className="border-b pb-4 hover-underline w-fit cursor-default" style={{ borderColor: 'rgba(177,78,255,0.2)' }}>Art Direction</li>
                  <li className="border-b pb-4 hover-underline w-fit cursor-default" style={{ borderColor: 'rgba(177,78,255,0.2)' }}>Brand Identity</li>
                  <li className="border-b pb-4 hover-underline w-fit cursor-default" style={{ borderColor: 'rgba(177,78,255,0.2)' }}>Interaction Design</li>
                  <li className="border-b pb-4 hover-underline w-fit cursor-default" style={{ borderColor: 'rgba(177,78,255,0.2)' }}>Typography Systems</li>
                  <li className="border-b pb-4 hover-underline w-fit cursor-default" style={{ borderColor: 'rgba(177,78,255,0.2)' }}>3D WebGL Concepts</li>
               </ul>
            </div>
            <div className="flex-1">
               <h3 className="font-syne text-3xl font-bold mb-12 content-reveal">Selected Clients</h3>
               <div className="grid grid-cols-2 gap-x-8 gap-y-12 font-syne text-2xl font-bold content-reveal opacity-80">
                  <div className="emil-btn">Nalanda Archive</div>
                  <div className="emil-btn">Aura Music</div>
                  <div className="emil-btn">Object Studio</div>
                  <div className="emil-btn">Neo-Bank</div>
                  <div className="emil-btn">Vogue Digital</div>
                  <div className="emil-btn">Kinetik</div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. MASSIVE FOOTER */}
      <footer className="relative w-full pt-32 pb-16 px-8 md:px-16 z-20 border-t" style={{ borderColor: 'rgba(177,78,255,0.2)' }}>
         <div className="w-full flex flex-col justify-center items-center text-center content-reveal">
            <p className="font-manrope font-bold tracking-[0.2em] uppercase text-sm mb-8 opacity-70">Have a project in mind?</p>
            <a href="mailto:hello@example.com" className="font-syne text-[12vw] md:text-[10vw] font-black leading-none hover:opacity-80 transition-opacity emil-btn mb-16">
               Let's Talk.
            </a>
         </div>

         <div className="w-full mt-32 flex flex-col md:flex-row justify-between items-end gap-12 font-manrope font-semibold text-sm content-reveal">
            <div className="flex flex-col gap-2">
               <span className="opacity-50">Local Time</span>
               <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' })} (CET)</span>
            </div>
            
            <div className="flex gap-8 uppercase tracking-widest">
               <a href="#" className="hover-underline emil-btn">Twitter</a>
               <a href="#" className="hover-underline emil-btn">Instagram</a>
               <a href="#" className="hover-underline emil-btn">Behance</a>
               <a href="#" className="hover-underline emil-btn">LinkedIn</a>
            </div>

            <div className="text-right flex flex-col gap-2">
               <span className="opacity-50">© {new Date().getFullYear()} Alex Design</span>
               <span>All Rights Reserved.</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
