"use client";

import React, { useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Lora, Hanken_Grotesk } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen, PenTool, Sparkles } from "lucide-react";

const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] });

gsap.registerPlugin(ScrollTrigger);

const DuotoneImage = ({ src, alt, bg, fg, className }: { src: string, alt: string, bg: string, fg: string, className?: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: fg }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover absolute inset-0"
        style={{ filter: "grayscale(100%) contrast(1.3)", mixBlendMode: "multiply" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: bg, mixBlendMode: "lighten" }}
      />
    </div>
  );
};

export function IndianStorybookDemo({ palette }: { palette: Palette }) {
  const bg = palette.colors[0]; // Dark (e.g. #1F0E06)
  const fg = palette.colors[1]; // Light (e.g. #C6E385)

  const containerRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const totalPages = pagesRef.current.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalPages * 120}vh`,
          scrub: 1,
          pin: true,
        }
      });

      // Animate each page turning like a book leaf
      pagesRef.current.forEach((page, i) => {
        if (!page) return;
        if (i === totalPages - 1) return; // Last page stays

        // Set transform origin for the page turn
        gsap.set(page, { transformOrigin: "left center", transformPerspective: 2000 });

        tl.to(page, {
          rotateY: -100, // Swing open towards camera on the left
          opacity: 0,
          scale: 0.95,
          ease: "power2.inOut",
          duration: 1
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className={`min-h-screen selection:bg-[${fg}] selection:text-[${bg}]`} 
      style={{ backgroundColor: bg, color: fg, fontFamily: hanken.style.fontFamily }}
    >
      {/* Pinned Book Container */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
        
        {/* --- PAGE 5: FOOTER (Bottom most layer) --- */}
        <div 
          ref={(el) => { pagesRef.current[4] = el; }}
          className="absolute inset-0 w-full h-full z-10 flex flex-col justify-between p-8 md:p-16"
          style={{ backgroundColor: bg }}
        >
          <div className="max-w-4xl mx-auto w-full pt-20">
            <h2 className={`text-4xl md:text-7xl font-bold mb-12 text-center ${lora.className}`}>
              Bring the stories home.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 border-t pt-12" style={{ borderColor: fg }}>
              <div>
                <h3 className={`text-2xl mb-4 ${lora.className}`}>The Katha Library</h3>
                <p className="mb-6 opacity-80 max-w-sm">
                  Subscribe to our monthly curations. Every box includes a beautifully bound edition of a regional folk tale and an art print from the illustrator.
                </p>
                <button 
                  className="px-8 py-4 uppercase tracking-widest text-sm font-bold flex items-center gap-3 transition-transform hover:translate-x-2"
                  style={{ backgroundColor: fg, color: bg }}
                >
                  Explore Editions <ArrowRight size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-4 text-lg opacity-80">
                <a href="#" className="hover:opacity-100 transition-opacity">Our Heritage</a>
                <a href="#" className="hover:opacity-100 transition-opacity">The Illustrators</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Submit a Story</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="w-full text-center pb-4 opacity-50 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} Katha Publishing. Stories from the soil.
          </div>
        </div>

        {/* --- PAGE 4: CRAFT / ILLUSTRATION --- */}
        <div 
          ref={(el) => { pagesRef.current[3] = el; }}
          className="absolute inset-0 w-full h-full z-20 flex items-center"
          style={{ backgroundColor: bg }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
            <DuotoneImage 
              src="https://picsum.photos/seed/9b6e6fea/1200/800" 
              alt="Traditional carving detail"
              bg={bg} fg={fg}
              className="w-full h-full hidden md:block"
            />
            <div className="flex flex-col justify-center p-8 md:p-20">
              <PenTool size={32} className="mb-8 opacity-70" />
              <h2 className={`text-4xl md:text-6xl font-bold mb-8 leading-tight ${lora.className}`}>
                The Craft of Visualization.
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed opacity-90 max-w-lg mb-10">
                We commission traditional artists from across the subcontinent. Utilizing indigenous styles like Madhubani, Warli, and Patachitra, every page becomes a canvas of living heritage.
              </p>
              <div className="h-[1px] w-full max-w-xs mb-10" style={{ backgroundColor: fg, opacity: 0.3 }} />
              <p className="opacity-70 text-lg leading-relaxed max-w-lg">
                The visual language of our books is as important as the written word. We believe that to truly preserve a story, you must preserve the visual culture from which it was born.
              </p>
            </div>
          </div>
        </div>

        {/* --- PAGE 3: COLLECTIONS --- */}
        <div 
          ref={(el) => { pagesRef.current[2] = el; }}
          className="absolute inset-0 w-full h-full z-30 flex flex-col justify-center p-8 md:p-16"
          style={{ backgroundColor: bg }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-16">
              <BookOpen size={24} />
              <h2 className="text-sm tracking-[0.3em] uppercase font-bold">Our Collections</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Panchatantra", desc: "Timeless fables of wisdom, politics, and survival written for ancient princes.", img: "https://picsum.photos/seed/1a38b1e0/1200/800" },
                { title: "Mythos", desc: "The grand epics translated for contemporary minds, retaining their original majesty.", img: "https://picsum.photos/seed/e693dc82/1200/800" },
                { title: "Village Lore", desc: "Oral traditions and regional stories documented from the deep villages of the subcontinent.", img: "https://picsum.photos/seed/1480d73e/1200/800" }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="w-full aspect-[3/4] mb-6 overflow-hidden">
                    <DuotoneImage 
                      src={item.img} 
                      alt={item.title}
                      bg={bg} fg={fg}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className={`text-3xl font-bold mb-3 ${lora.className}`}>{item.title}</h3>
                  <p className="opacity-80 text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- PAGE 2: PHILOSOPHY --- */}
        <div 
          ref={(el) => { pagesRef.current[1] = el; }}
          className="absolute inset-0 w-full h-full z-40 flex items-center justify-center p-8 md:p-16"
          style={{ backgroundColor: bg }}
        >
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            {/* Background texture layer */}
            <DuotoneImage 
              src="https://picsum.photos/seed/0ca369dd/1200/800"
              alt="Texture" bg={bg} fg={fg} className="w-full h-full"
            />
          </div>
          <div className="relative z-10 max-w-4xl text-center">
            <Sparkles size={32} className="mx-auto mb-10 opacity-70" />
            <h2 className={`text-4xl md:text-6xl font-medium leading-tight mb-10 ${lora.className}`}>
              Before they were written, they were spoken under banyan trees.
            </h2>
            <p className="text-xl md:text-3xl leading-relaxed opacity-90 max-w-3xl mx-auto">
              These are not merely stories. They are the very fabric of our moral and cultural imagination. Katha revives these ancient narratives, preserving their soul while presenting them to a modern world.
            </p>
          </div>
        </div>

        {/* --- PAGE 1: HERO COVER --- */}
        <div 
          ref={(el) => { pagesRef.current[0] = el; }}
          className="absolute inset-0 w-full h-full z-50 flex flex-col items-center justify-center shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
          style={{ backgroundColor: bg }}
        >
          {/* Border frame for the cover */}
          <div className="absolute inset-6 md:inset-12 border-2 p-2 pointer-events-none" style={{ borderColor: fg }}>
            <div className="w-full h-full border pointer-events-none" style={{ borderColor: fg, opacity: 0.5 }} />
          </div>

          <div className="text-center relative z-10 px-8">
            <span className="text-xs md:text-sm tracking-[0.4em] uppercase font-bold opacity-80 mb-6 block">
              Heritage Publishers
            </span>
            <h1 className={`text-7xl md:text-[150px] font-bold mb-6 tracking-tighter ${lora.className}`} style={{ color: fg }}>
              KATHA
            </h1>
            <div className="h-[1px] w-24 mx-auto mb-6" style={{ backgroundColor: fg }} />
            <p className="text-xl md:text-2xl opacity-90 max-w-md mx-auto italic">
              Publishing the soul of Indian storytelling for the modern reader.
            </p>
          </div>
          
          <div className="absolute bottom-12 md:bottom-24 text-sm tracking-widest uppercase opacity-70 flex flex-col items-center gap-3 animate-pulse">
            Scroll to open
            <div className="w-[1px] h-12" style={{ backgroundColor: fg }} />
          </div>
        </div>

      </div>
    </div>
  );
}
