"use client";

import React, { useRef, useState, useEffect } from "react";
import { Palette } from "@/data/palettes";
import { Bodoni_Moda, Mulish } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const bodoni = Bodoni_Moda({ subsets: ['latin'], variable: '--font-bodoni' });
const mulish = Mulish({ subsets: ['latin'], variable: '--font-mulish' });

export function FurniturePremiumDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [wine, champagne] = palette.colors; // wine = #5C0E14, champagne = #F0E193

  // For the Signature Piece spring effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  useGSAP(() => {
    const customEase = "cubic-bezier(0.19, 1, 0.22, 1)";

    // Initial load reveals
    gsap.fromTo(".nav-element", 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: customEase, stagger: 0.1, delay: 0.2 }
    );

    gsap.fromTo(".hero-text",
      { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: customEase, stagger: 0.2, delay: 0.4 }
    );

    gsap.fromTo(".hero-img-overlay",
      { scaleY: 1 },
      { scaleY: 0, transformOrigin: "top", duration: 1.6, ease: customEase, delay: 0.2 }
    );

    // Scroll reveals
    gsap.utils.toArray(".scroll-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.4,
          ease: customEase,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    gsap.utils.toArray(".image-reveal-wrapper").forEach((el: any) => {
      const img = el.querySelector("img");
      gsap.fromTo(img, 
        { scale: 1.15, filter: "brightness(0.5)" },
        {
          scale: 1, filter: "brightness(1)",
          duration: 1.8,
          ease: customEase,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        }
      );
    });

    // Substantive Parallax on Backgrounds
    gsap.utils.toArray(".parallax-bg").forEach((el: any) => {
      gsap.to(el, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Navbar Color Transition
    ScrollTrigger.create({
      trigger: ".hero-section",
      start: "bottom top",
      onEnter: () => gsap.to(".global-nav", { color: wine, duration: 0.4 }),
      onLeaveBack: () => gsap.to(".global-nav", { color: champagne, duration: 0.4 })
    });

  }, { scope: container });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={container}
      className={`min-h-screen ${bodoni.variable} ${mulish.variable} overflow-x-hidden font-mulish`}
      style={{ backgroundColor: wine, color: champagne }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-bodoni { font-family: var(--font-bodoni), serif; }
        .font-mulish { font-family: var(--font-mulish), sans-serif; }
        
        /* The custom easing variable as requested */
        :root {
          --ease-out: cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* Active states for UI feel */
        .furniture-btn {
          transition: transform 160ms var(--ease-out), background-color 300ms ease, color 300ms ease;
          border: 1px solid ${champagne};
          cursor: pointer;
        }
        .furniture-btn:active {
          transform: scale(0.97);
        }
        .furniture-btn:hover {
          background-color: ${champagne};
          color: ${wine};
        }

        .furniture-link {
          position: relative;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 300ms ease;
        }
        .furniture-link:hover {
          opacity: 1;
        }
        .furniture-link::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: ${champagne};
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 400ms var(--ease-out);
        }
        .furniture-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Subtle Duotone/Tint for imagery to maintain strict color palette */
        .wine-tint {
          position: relative;
        }
        .wine-tint::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${wine};
          mix-blend-mode: multiply;
          opacity: 0.4;
          pointer-events: none;
        }
        
        .champagne-tint::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${champagne};
          mix-blend-mode: soft-light;
          opacity: 0.15;
          pointer-events: none;
        }

        /* Image hover zooms */
        .collection-card {
          overflow: hidden;
        }
        .collection-card img {
          transition: transform 700ms ease;
        }
        .collection-card:hover img {
          transform: scale(1.05);
        }
      `}} />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full p-8 md:px-16 flex justify-between items-center z-50 pointer-events-none global-nav transition-colors" style={{ color: champagne }}>
        <div className="font-bodoni text-2xl tracking-widest uppercase nav-element pointer-events-auto cursor-pointer">
          Aethelred
        </div>
        <div className="hidden md:flex gap-12 font-mulish text-xs tracking-[0.2em] uppercase font-light pointer-events-auto">
          <a className="furniture-link nav-element">Collections</a>
          <a className="furniture-link nav-element">Atelier</a>
          <a className="furniture-link nav-element">Journal</a>
        </div>
        <button className="nav-element font-mulish text-xs tracking-[0.15em] uppercase pointer-events-auto opacity-80 hover:opacity-100 transition-opacity">
          Menu
        </button>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col justify-end p-8 md:p-16 z-10 hero-section">
         <div className="absolute inset-0 z-0 overflow-hidden wine-tint champagne-tint">
           <img 
             src="https://picsum.photos/seed/67055982/1200/800" 
             className="w-full h-[115%] object-cover parallax-bg" 
             alt="Luxury living space" 
           />
           <div className="absolute inset-0 bg-black/20" />
           {/* Unveiling overlay */}
           <div className="absolute inset-0 hero-img-overlay" style={{ backgroundColor: wine }} />
         </div>

         <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-8 pb-8">
            <h1 className="font-bodoni text-5xl md:text-[7vw] leading-[0.9] font-normal uppercase tracking-tight w-full md:w-2/3">
               <span className="block hero-text">Objects of</span>
               <span className="block hero-text">Permanence.</span>
            </h1>
            <div className="w-full md:w-1/3 flex flex-col gap-6 hero-text">
               <p className="font-mulish font-light text-sm md:text-base leading-relaxed opacity-90">
                 Handcrafted spatial interventions for the discerning collector. We shape wood, stone, and metal into heirlooms that anchor the home.
               </p>
               <button className="furniture-btn w-fit px-8 py-4 text-xs tracking-[0.2em] uppercase">
                 View Collection
               </button>
            </div>
         </div>
      </section>

      {/* 2. COLLECTIONS */}
      <section className="relative w-full py-32 px-8 md:px-16 z-20">
         <div className="w-full flex justify-between items-end mb-16 scroll-reveal">
            <h2 className="font-bodoni text-3xl md:text-5xl uppercase tracking-wider">The Spaces</h2>
            <span className="font-mulish text-xs tracking-[0.2em] uppercase opacity-70 hidden md:block">01 / Collections</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { title: "Living", img: "1586023492125-27b2c045efd7" },
              { title: "Dining", img: "1595428774223-ef52624120d2" },
              { title: "Sanctuary", img: "1616486029423-aaa4789e8c9a" }
            ].map((col, i) => (
              <div key={col.title} className="flex flex-col gap-6 collection-card cursor-pointer scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                 <div className="w-full aspect-[3/4] overflow-hidden image-reveal-wrapper wine-tint">
                    <img 
                      src={`https://picsum.photos/seed/${col.title}/800/1000`}
                      className="w-full h-full object-cover"
                      alt={col.title}
                    />
                 </div>
                 <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: `${champagne}40` }}>
                    <h3 className="font-bodoni text-2xl uppercase tracking-widest">{col.title}</h3>
                    <span className="font-mulish text-xs opacity-60">Explore</span>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 3. CRAFTSMANSHIP / MATERIALS */}
      <section className="relative w-full py-32 z-20 flex flex-col md:flex-row min-h-screen">
         <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center scroll-reveal" style={{ backgroundColor: champagne, color: wine }}>
            <span className="font-mulish text-xs tracking-[0.2em] uppercase opacity-60 mb-12">02 / The Atelier</span>
            <h2 className="font-bodoni text-4xl md:text-6xl leading-[1.1] uppercase tracking-wide mb-8">
              Patience in<br/>every grain.
            </h2>
            <div className="font-mulish text-base md:text-lg font-light leading-relaxed opacity-90 flex flex-col gap-6">
              <p>True luxury is the absence of haste. Our artisans spend hundreds of hours selecting, shaping, and finishing materials that tell a story of origin.</p>
              <p>We work exclusively with sustainably sourced, old-growth timber and hand-cast bronzes. The imperfections are not flaws; they are the signature of nature, preserved by human hands.</p>
            </div>
            <button className="mt-12 w-fit border-b pb-2 font-mulish text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity" style={{ borderBottomColor: wine }}>
              Discover Our Process
            </button>
         </div>
         <div className="w-full md:w-1/2 h-[60vh] md:h-auto relative overflow-hidden image-reveal-wrapper wine-tint">
            <img 
              src="https://picsum.photos/seed/8578644a/1200/800" 
              className="absolute inset-0 w-full h-[120%] object-cover parallax-bg"
              alt="Wood grain texture"
            />
         </div>
      </section>

      {/* 4. SIGNATURE PIECE DEEP-DIVE (SPRING ANIMATION) */}
      <section className="relative w-full py-48 px-8 md:px-16 z-20 overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="font-mulish text-xs tracking-[0.2em] uppercase opacity-70 mb-8 scroll-reveal">03 / Signature Piece</span>
            <h2 className="font-bodoni text-5xl md:text-7xl uppercase tracking-wider mb-24 scroll-reveal">The Monolith Table</h2>
            
            <motion.div 
              className="w-full max-w-4xl aspect-video relative image-reveal-wrapper wine-tint shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1000,
              }}
            >
               <img 
                 src="https://picsum.photos/seed/bbde58f7/1200/800"
                 className="w-full h-full object-cover"
                 alt="Monolith Table"
               />
               <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
            </motion.div>
            
            <p className="mt-16 font-mulish font-light max-w-2xl text-lg opacity-80 scroll-reveal">
              Carved from a single slab of deeply oxidized oak, the Monolith Table anchors any dining space with severe, unyielding grace. A testament to monumental minimalism.
            </p>
         </div>
      </section>

      {/* 5. FOOTER / SHOWROOM */}
      <footer className="relative w-full pt-32 pb-16 px-8 md:px-16 z-20 border-t" style={{ borderColor: `${champagne}30` }}>
         <div className="w-full flex flex-col md:flex-row justify-between items-start gap-16 pb-32 border-b" style={{ borderColor: `${champagne}20` }}>
            
            <div className="md:w-1/2 flex flex-col scroll-reveal">
               <h2 className="font-bodoni text-4xl uppercase tracking-widest mb-8">Aethelred</h2>
               <p className="font-mulish font-light opacity-70 max-w-sm mb-12">
                 Bespoke furniture for architectural interiors. Designed and crafted in our remote studio.
               </p>
               <div className="flex flex-col gap-2 font-mulish text-sm uppercase tracking-widest opacity-60">
                 <p>Los Angeles Showroom</p>
                 <p>By Appointment Only</p>
               </div>
            </div>

            <div className="md:w-1/2 flex flex-col md:flex-row gap-16 font-mulish text-sm uppercase tracking-[0.15em] scroll-reveal">
               <div className="flex flex-col gap-6">
                 <span className="opacity-50 mb-2">Explore</span>
                 <a className="furniture-link w-fit">Collections</a>
                 <a className="furniture-link w-fit">Atelier</a>
                 <a className="furniture-link w-fit">Materials</a>
                 <a className="furniture-link w-fit">Journal</a>
               </div>
               <div className="flex flex-col gap-6">
                 <span className="opacity-50 mb-2">Connect</span>
                 <a className="furniture-link w-fit">Book Consultation</a>
                 <a className="furniture-link w-fit">Trade Program</a>
                 <a className="furniture-link w-fit">Contact Us</a>
                 <a className="furniture-link w-fit">Instagram</a>
               </div>
            </div>

         </div>

         <div className="w-full mt-12 flex flex-col md:flex-row justify-between items-center font-mulish text-xs uppercase tracking-widest opacity-40 scroll-reveal">
            <span>© {new Date().getFullYear()} Aethelred Furniture.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
               <a className="hover:opacity-100 transition-opacity cursor-pointer">Terms</a>
               <a className="hover:opacity-100 transition-opacity cursor-pointer">Privacy</a>
            </div>
         </div>
      </footer>

    </div>
  );
}
