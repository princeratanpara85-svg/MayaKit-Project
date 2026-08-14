"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cinzel = Cinzel({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-cinzel' });
const cormorant = Cormorant_Garamond({ weight: ['400', '500', '600', '700'], subsets: ['latin'], style: ['normal', 'italic'] });

export function NalandaArchiveDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [parchment, oxblood] = palette.colors; // parchment = #F3EEE6, oxblood = #581000

  useGSAP(() => {
    // "Ink Reveal" animations: slow blur to sharp, fading opacity
    gsap.utils.toArray(".ink-reveal").forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, filter: "blur(12px)", y: 20 },
        { 
          opacity: 1, 
          filter: "blur(0px)", 
          y: 0,
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%"
          }
        }
      );
    });

    // Staggered ink reveals for lists/columns
    gsap.utils.toArray(".ink-stagger-container").forEach((container: any) => {
      const items = container.querySelectorAll(".ink-stagger-item");
      gsap.fromTo(items,
        { opacity: 0, filter: "blur(8px)", y: 15 },
        {
          opacity: 1, filter: "blur(0px)", y: 0,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: "top 90%"
          }
        }
      );
    });

    // Clip-path reveals for images
    gsap.utils.toArray(".clip-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );
    });

    // Parallax for the Library section to emphasize depth and scale
    gsap.to(".layer-1", {
      y: -250,
      ease: "none",
      scrollTrigger: { trigger: ".library-section", start: "top bottom", end: "bottom top", scrub: true }
    });
    gsap.to(".layer-2", {
      y: -100,
      ease: "none",
      scrollTrigger: { trigger: ".library-section", start: "top bottom", end: "bottom top", scrub: true }
    });

  }, { scope: container });

  // Palm leaf motif SVG
  const PalmLeafRule = () => (
    <div className="flex items-center justify-center my-16 opacity-40 ink-reveal w-full max-w-2xl mx-auto">
      <div className="flex-1 h-[1px]" style={{ backgroundColor: oxblood }} />
      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="mx-4">
        <path d="M20 0C14 6 6 6 0 6C6 6 14 6 20 12C26 6 34 6 40 6C34 6 26 6 20 0Z" fill={oxblood}/>
      </svg>
      <div className="flex-1 h-[1px]" style={{ backgroundColor: oxblood }} />
    </div>
  );

  const TornEdgeTop = () => (
    <svg className="absolute top-0 left-0 w-full h-12 md:h-24 z-30" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none">
       <path d="M0 0L1440 0V48.5C1380 20.5 1250 68.5 1100 35.5C950 2.5 800 68.5 700 48.5C600 28.5 450 78.5 300 48.5C150 18.5 50 68.5 0 48.5V0Z" fill={parchment}/>
    </svg>
  );
  
  const TornEdgeBottom = () => (
    <svg className="absolute bottom-0 left-0 w-full h-12 md:h-24 z-30 transform rotate-180" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none">
       <path d="M0 0L1440 0V48.5C1380 20.5 1250 68.5 1100 35.5C950 2.5 800 68.5 700 48.5C600 28.5 450 78.5 300 48.5C150 18.5 50 68.5 0 48.5V0Z" fill={parchment}/>
    </svg>
  );

  return (
    <div 
      ref={container}
      className={`relative min-h-screen ${cormorant.className} ${cinzel.variable} selection:bg-[${oxblood}] selection:text-[${parchment}] font-medium overflow-x-hidden`}
      style={{ backgroundColor: parchment, color: oxblood }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-cinzel { font-family: var(--font-cinzel), serif; }
        
        .drop-cap::first-letter {
          font-family: var(--font-cinzel), serif;
          font-size: 5.5rem;
          line-height: 0.75;
          float: left;
          padding-right: 16px;
          padding-top: 8px;
          color: ${oxblood};
        }
      `}} />

      {/* 0. EDITORIAL HEADER */}
      <header className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 transition-opacity duration-1000 mix-blend-multiply" style={{ color: oxblood }}>
         <div className="font-cinzel text-lg md:text-xl tracking-[0.2em] uppercase font-bold">The Nalanda Archive</div>
         <div className="hidden md:flex gap-16 font-cinzel text-xs tracking-[0.3em] uppercase font-bold">
            <span className="cursor-pointer transition-all duration-150 ease-out hover:opacity-50 hover:scale-105 active:scale-95 inline-block origin-center">Chronicle</span>
            <span className="cursor-pointer transition-all duration-150 ease-out hover:opacity-50 hover:scale-105 active:scale-95 inline-block origin-center">Scholars</span>
            <span className="cursor-pointer transition-all duration-150 ease-out hover:opacity-50 hover:scale-105 active:scale-95 inline-block origin-center">Dharmaganja</span>
         </div>
      </header>

      {/* 1. HERO (Title Page) */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20" style={{ backgroundColor: parchment, color: oxblood }}>
        {/* Subtle background texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://images.pexels.com/photos/10818318/pexels-photo-10818318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            className="w-full h-full object-cover opacity-80"
            alt="Ancient Stone Texture"
          />
        </div>
        
        <div className="relative z-10 text-center w-full max-w-6xl px-6 flex flex-col items-center mt-12">
          <p className="font-cinzel text-xs md:text-sm tracking-[0.6em] uppercase mb-12 ink-reveal opacity-70 font-semibold">5th Century CE – 12th Century CE</p>
          <h1 className="font-cinzel text-[14vw] md:text-[11vw] leading-none tracking-widest uppercase mb-16 ink-reveal">Nalanda</h1>
        </div>
      </section>

      {/* 2. THE SEAT OF KNOWLEDGE (Marginalia Layout) */}
      <section className="relative w-full py-32 md:py-40 px-6 md:px-12 z-20">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
           {/* Subtle texture carries through */}
           <img 
             src="https://picsum.photos/seed/f060d99a/1200/800" 
             className="w-full h-full object-cover" 
             alt="Texture" 
           />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
           
           <div className="text-center mb-24 ink-reveal">
              <h2 className="font-cinzel text-4xl md:text-5xl uppercase tracking-widest leading-[1.3]">The First Great University</h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
             
             {/* Marginalia Column */}
             <div className="lg:col-span-4 flex flex-col justify-start sticky top-32 pt-2 lg:border-r border-opacity-30 pr-8" style={{ borderColor: oxblood }}>
                <div className="w-full aspect-[4/3] overflow-hidden mb-12 shadow-xl clip-reveal">
                  <img 
                     src="https://images.pexels.com/photos/36271658/pexels-photo-36271658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                     className="w-full h-full object-cover"
                     alt="Ancient Ruins"
                  />
                </div>
                
                <div className="ink-reveal">
                  <h4 className="font-cinzel text-sm uppercase tracking-[0.3em] font-bold mb-4 opacity-70">Scholastic Range</h4>
                  <p className="text-lg italic leading-relaxed opacity-80 mb-12">
                    A curriculum spanning Mahayana theology, astronomy, medicine (Chikitsa-vidya), logic (Pramana), and the Vedas.
                  </p>
                </div>
                <div className="ink-reveal">
                  <h4 className="font-cinzel text-sm uppercase tracking-[0.3em] font-bold mb-4 opacity-70">Global Beacon</h4>
                  <p className="text-lg italic leading-relaxed opacity-80">
                    Seekers of knowledge traveled from Tibet, China, Korea, and Central Asia to study within its formidable brick walls.
                  </p>
                </div>
             </div>

             {/* Main Text Column */}
             <div className="lg:col-span-8 flex flex-col gap-8 text-xl md:text-2xl leading-[1.8] text-justify ink-reveal opacity-90 drop-cap">
                <p>
                  Located in the ancient kingdom of Magadha, Nalanda was an acclaimed Mahavihara—a large Buddhist monastery—that flourished under the Gupta Empire. Long before the universities of Europe were established, it stood as a global beacon of learning.
                </p>
                <p>
                  At its peak, the university attracted scholars and students from near and far, with historical accounts from traveling monks suggesting it accommodated thousands of students and teachers simultaneously. The transmission of knowledge was profound, shifting the tectonic plates of Eastern philosophy for generations.
                </p>
                <p>
                  Admission was famously strict. Prospective students were interrogated at the gates by the university's <em>Dvara-panditas</em> (gatekeepers), who were themselves erudite scholars. Only a fraction of applicants passed these rigorous entrance examinations, ensuring that only the most dedicated minds entered the monastic colleges.
                </p>
             </div>
           </div>

           <PalmLeafRule />

        </div>
      </section>

      {/* 3. THE SCHOLARS (Monograms) */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20 border-y" style={{ borderColor: `${oxblood}30`, backgroundColor: `${oxblood}08` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 ink-reveal">
            <h2 className="font-cinzel text-5xl md:text-6xl uppercase tracking-widest mb-6">Luminaries</h2>
            <p className="text-2xl italic opacity-70 max-w-2xl mx-auto">Masters whose philosophical frameworks shaped Eastern thought for millennia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12 ink-stagger-container">
             
             {/* Nagarjuna */}
             <div className="ink-stagger-item flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full flex items-center justify-center mb-10 border-[1px] p-2 relative shadow-lg cursor-pointer transition-all duration-200 ease-out hover:scale-105 active:scale-95" style={{ borderColor: `${oxblood}50`, backgroundColor: `${parchment}` }}>
                   <div className="absolute inset-2 rounded-full border border-dashed opacity-40" style={{ borderColor: oxblood }} />
                   <span className="font-cinzel text-7xl font-bold transition-colors duration-200" style={{ color: oxblood }}>N</span>
                </div>
                <h3 className="font-cinzel text-2xl uppercase tracking-[0.2em] mb-4">Nagarjuna</h3>
                <p className="italic text-lg mb-8 opacity-60">c. 150 – 250 CE</p>
                <p className="text-xl leading-relaxed opacity-90 text-justify">
                  Though he predates the peak of Nalanda's institutionalized era, Nagarjuna's works formed the core of its curriculum. He articulated the doctrine of emptiness (Shunyata) and founded the Madhyamaka school of Mahayana Buddhism, revolutionizing ontological thought.
                </p>
             </div>

             {/* Dharmakirti */}
             <div className="ink-stagger-item flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full flex items-center justify-center mb-10 border-[1px] p-2 relative shadow-lg cursor-pointer transition-all duration-200 ease-out hover:scale-105 active:scale-95" style={{ borderColor: `${oxblood}50`, backgroundColor: `${parchment}` }}>
                   <div className="absolute inset-2 rounded-full border border-dashed opacity-40" style={{ borderColor: oxblood }} />
                   <span className="font-cinzel text-7xl font-bold transition-colors duration-200" style={{ color: oxblood }}>D</span>
                </div>
                <h3 className="font-cinzel text-2xl uppercase tracking-[0.2em] mb-4">Dharmakirti</h3>
                <p className="italic text-lg mb-8 opacity-60">c. 6th or 7th Century CE</p>
                <p className="text-xl leading-relaxed opacity-90 text-justify">
                  An immensely influential Indian Buddhist philosopher who worked and taught at Nalanda. He was one of the primary theorists of Buddhist atomism and logic (Pramana), significantly impacting both Buddhist and Hindu epistemology for centuries.
                </p>
             </div>

             {/* Xuanzang */}
             <div className="ink-stagger-item flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full flex items-center justify-center mb-10 border-[1px] p-2 relative shadow-lg cursor-pointer transition-all duration-200 ease-out hover:scale-105 active:scale-95" style={{ borderColor: `${oxblood}50`, backgroundColor: `${parchment}` }}>
                   <div className="absolute inset-2 rounded-full border border-dashed opacity-40" style={{ borderColor: oxblood }} />
                   <span className="font-cinzel text-7xl font-bold transition-colors duration-200" style={{ color: oxblood }}>X</span>
                </div>
                <h3 className="font-cinzel text-2xl uppercase tracking-[0.2em] mb-4">Xuanzang</h3>
                <p className="italic text-lg mb-8 opacity-60">c. 602 – 664 CE</p>
                <p className="text-xl leading-relaxed opacity-90 text-justify">
                  A Chinese Buddhist monk, scholar, and traveler who studied at Nalanda. His meticulous records provide historians with the most comprehensive and awe-inspiring descriptions of Nalanda's massive scale and daily monastic life.
                </p>
             </div>

          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURE (Dharmaganja Parallax) */}
      <section className="library-section relative w-full h-[120vh] overflow-hidden flex items-center justify-center" style={{ backgroundColor: oxblood }}>
        <TornEdgeTop />
        
        {/* Parallax Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           {/* Mid Layer (Face statues for scholarly/spiritual vibe) */}
           <img 
             src="https://images.pexels.com/photos/34010414/pexels-photo-34010414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
             className="absolute top-0 left-0 w-full h-[130%] object-cover layer-1 opacity-90" 
             alt="Mid Architecture" 
           />
        </div>
        
        {/* The text content flipped to parchment color for dramatic contrast */}
        <div className="relative z-20 text-center px-8 md:px-16 py-16 md:py-24 max-w-4xl ink-reveal border backdrop-blur-md" style={{ borderColor: `${parchment}40`, backgroundColor: `${oxblood}95`, color: parchment }}>
          <h2 className="font-cinzel text-5xl md:text-7xl uppercase tracking-widest mb-6">Dharmaganja</h2>
          <p className="font-cinzel text-sm md:text-base tracking-[0.4em] uppercase mb-12 opacity-80 font-bold">"The Treasury of Truth"</p>
          <div className="w-16 h-[1px] mx-auto mb-12 opacity-40" style={{ backgroundColor: parchment }} />
          <p className="text-xl md:text-2xl leading-[1.8] text-justify opacity-90">
            The university's legendary library complex consisted of three massive multi-story buildings: Ratnasagara (Ocean of Jewels), Ratnodadhi (Sea of Jewels), and Ratnaranjaka (Jewel-adorned). According to Tibetan accounts, Ratnodadhi was nine stories high, housing the most sacred manuscripts. It was a staggering repository of global knowledge, holding hundreds of thousands of meticulously copied texts on palm leaves.
          </p>
        </div>

        <TornEdgeBottom />
      </section>

      {/* 5. DECLINE & LEGACY */}
      <section className="relative w-full py-32 md:py-48 px-6 md:px-12 z-20">
         <div className="max-w-7xl mx-auto">
            <h2 className="font-cinzel text-5xl md:text-6xl uppercase tracking-widest mb-16 md:mb-24 ink-reveal text-center">The Ash and The Ember</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               <div className="clip-reveal w-full aspect-[4/5] overflow-hidden relative shadow-2xl">
                 <img 
                    src="https://images.pexels.com/photos/35638213/pexels-photo-35638213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Ancient Relic"
                    className="w-full h-full object-cover"
                 />
               </div>

               <div className="flex flex-col gap-8 md:gap-12 text-xl md:text-2xl leading-[1.8] opacity-90 ink-reveal text-justify drop-cap">
                 <p>
                   In the late 12th century, the university was ransacked and destroyed by the invading armies of Bakhtiyar Khilji. The great library of Dharmaganja was set alight; traditional Tibetan accounts state the vast collection of manuscripts burned for months, signaling a catastrophic and irreplaceable loss of ancient knowledge.
                 </p>
                 <p>
                   Yet, Nalanda's intellectual legacy survived. Scholars who managed to flee carried core texts into Tibet and beyond, preserving philosophical frameworks that formed the basis of Tibetan Buddhism. Today, near the excavated ruins of the ancient red-brick site, a new modern Nalanda University has been established—a homage to India's first great global center of learning.
                 </p>
               </div>
            </div>
         </div>
         <PalmLeafRule />
      </section>

      {/* 6. FOOTER */}
      <section className="relative w-full py-32 px-6 md:px-12 z-30 border-t overflow-hidden" style={{ borderColor: `${oxblood}30`, backgroundColor: `${oxblood}08` }}>
        
        {/* Blended Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://images.pexels.com/photos/35683341/pexels-photo-35683341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            className="w-full h-full object-cover mix-blend-multiply opacity-50" 
            alt="Footer Background" 
          />
          {/* Subtle gradient to ensure text remains readable at the very bottom */}
          <div className={`absolute inset-0 bg-gradient-to-t from-[${parchment}]/80 to-transparent`} />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-16 relative z-10">
          
          <div className="text-center md:text-left ink-reveal">
            <h1 className="font-cinzel text-5xl md:text-7xl uppercase tracking-widest mb-6">Nalanda</h1>
            <p className="italic text-xl md:text-2xl opacity-70">Preserving the Knowledge</p>
          </div>

          <div className="flex gap-16 md:gap-24 font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase ink-reveal font-semibold">
            <div className="flex flex-col gap-8">
              <span className="cursor-pointer transition-all duration-150 ease-out hover:opacity-50 hover:scale-105 active:scale-95 inline-block origin-center">The Ruins</span>
              <span className="cursor-pointer transition-all duration-150 ease-out hover:opacity-50 hover:scale-105 active:scale-95 inline-block origin-center">Manuscripts</span>
            </div>
            <div className="flex flex-col gap-8">
              <span className="cursor-pointer transition-all duration-150 ease-out hover:opacity-50 hover:scale-105 active:scale-95 inline-block origin-center">Modern Campus</span>
              <span className="cursor-pointer transition-all duration-150 ease-out hover:opacity-50 hover:scale-105 active:scale-95 inline-block origin-center">Excavations</span>
            </div>
          </div>

        </div>
        
        <div className="mt-48 text-center text-xs font-cinzel tracking-[0.4em] uppercase opacity-60 ink-reveal relative z-10 font-bold bg-white/30 py-2 backdrop-blur-sm rounded-full max-w-fit mx-auto px-6">
          © {new Date().getFullYear()} Historical Archive Illustration
        </div>
      </section>

    </div>
  );
}
