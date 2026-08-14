"use client";

import React, { useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Yeseva_One, Work_Sans } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Leaf, Droplets } from "lucide-react";

const yeseva = Yeseva_One({ subsets: ["latin"], weight: ["400"] });
const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

gsap.registerPlugin(ScrollTrigger);

const isDark = (hex: string) => {
  const rgb = parseInt(hex.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 128;
};

const DuotoneImage = ({ src, alt, bg, fg, className }: { src: string, alt: string, bg: string, fg: string, className?: string }) => {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover absolute inset-0"
      />
    </div>
  );
};

export function BerryDessertDemo({ palette }: { palette: Palette }) {
  const darkColor = palette.colors[0]; // Deep Indigo #151130
  const lightColor = palette.colors[1]; // Lavender #C8BEFA

  const containerRef = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec2InnerRef = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const sec3InnerRef = useRef<HTMLDivElement>(null);
  const sec4Ref = useRef<HTMLDivElement>(null);
  const sec4InnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
        }
      });

      // Initially hide the overlay sections via clip-path
      gsap.set(sec2Ref.current, { clipPath: "circle(0% at 15% 85%)" });
      gsap.set(sec3Ref.current, { clipPath: "circle(0% at 85% 15%)" });
      gsap.set(sec4Ref.current, { clipPath: "circle(0% at 50% 100%)" });

      // Stain 1: Bottom Left (Products)
      tl.to(sec2Ref.current, { clipPath: "circle(150% at 15% 85%)", duration: 1, ease: "power2.inOut" })
        .fromTo(sec2InnerRef.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "power2.out" }, "<");

      // Stain 2: Top Right (Sourcing)
      tl.to(sec3Ref.current, { clipPath: "circle(150% at 85% 15%)", duration: 1, ease: "power2.inOut" })
        .fromTo(sec3InnerRef.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "power2.out" }, "<");

      // Stain 3: Bottom Center (Footer)
      tl.to(sec4Ref.current, { clipPath: "circle(150% at 50% 100%)", duration: 1, ease: "power2.inOut" })
        .fromTo(sec4InnerRef.current, { scale: 1.1 }, { scale: 1, duration: 1, ease: "power2.out" }, "<");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className={`min-h-screen selection:bg-[${lightColor}] selection:text-[${darkColor}]`} 
      style={{ fontFamily: workSans.style.fontFamily }}
    >
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
        
        {/* --- SECTION 1: HERO (Dark) --- */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10" style={{ backgroundColor: darkColor, color: lightColor }}>
          <div className="absolute inset-0 opacity-40">
            <DuotoneImage 
              src="https://picsum.photos/seed/954f6457/1200/800" 
              alt="Clustered Berries" 
              bg={darkColor} fg={lightColor} className="w-full h-full" 
            />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <span className="uppercase tracking-[0.4em] text-sm font-bold opacity-80 mb-6 block">
              Culinary Botany
            </span>
            <h1 className={`text-6xl md:text-8xl font-normal leading-tight mb-6 ${yeseva.className}`}>
              The Midnight<br/>Harvest.
            </h1>
            <p className="text-xl md:text-2xl font-medium opacity-90 mx-auto max-w-lg leading-relaxed">
              An exploration of the world's most potent purple berries. Indulgence born from the wild.
            </p>
            <div className="mt-16 animate-bounce opacity-70 uppercase tracking-widest text-xs font-bold flex flex-col items-center gap-3">
              <Droplets size={16} />
              Scroll to bleed
            </div>
          </div>
        </div>


        {/* --- SECTION 2: PRODUCTS (Light) --- */}
        <div 
          ref={sec2Ref} 
          className="absolute inset-0 w-full h-full z-20" 
          style={{ backgroundColor: lightColor, color: darkColor }}
        >
          <div ref={sec2InnerRef} className="w-full h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-20 flex flex-col justify-center">
              <span className="uppercase tracking-[0.3em] font-bold opacity-70 mb-4 block text-sm">
                01 / Confections
              </span>
              <h2 className={`text-5xl md:text-7xl font-normal leading-tight mb-8 ${yeseva.className}`}>
                Indulgence in every hue.
              </h2>
              <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90 max-w-md mb-12">
                From velvety wild blackberry gelato to sharp, tangy jamun preserves, we extract the absolute essence of purple berries to create unparalleled culinary experiences.
              </p>
              <button 
                className="self-start px-8 py-4 uppercase tracking-widest text-sm font-bold flex items-center gap-4 transition-all hover:pr-6"
                style={{ backgroundColor: darkColor, color: lightColor }}
              >
                Shop the Pantry <ArrowRight size={18} />
              </button>
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col md:flex-row p-4 gap-4">
              <div className="w-full md:w-1/2 h-full flex flex-col gap-4">
                <div className="flex-1 rounded-t-full md:rounded-t-none md:rounded-l-full overflow-hidden">
                   <DuotoneImage src="https://picsum.photos/seed/c847cb10/1200/800" alt="Berry Ice Cream" bg={darkColor} fg={lightColor} className="w-full h-full hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl mb-2 ${yeseva.className}`}>Mulberry Gelato</h3>
                  <p className="opacity-70 font-medium">Small-batch churned with organic cream.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-full flex flex-col gap-4">
                <div className="flex-1 rounded-b-full md:rounded-b-none md:rounded-r-full overflow-hidden">
                   <DuotoneImage src="https://picsum.photos/seed/9c935265/1200/800" alt="Berry Jam" bg={darkColor} fg={lightColor} className="w-full h-full hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl mb-2 ${yeseva.className}`}>Jamun Conserve</h3>
                  <p className="opacity-70 font-medium">Wild-foraged, low-sugar preserves.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* --- SECTION 3: SOURCING (Dark) --- */}
        <div 
          ref={sec3Ref} 
          className="absolute inset-0 w-full h-full z-30" 
          style={{ backgroundColor: darkColor, color: lightColor }}
        >
          <div ref={sec3InnerRef} className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 w-full h-full opacity-60">
              <DuotoneImage 
                src="https://picsum.photos/seed/68f227c7/1200/800" 
                alt="Foraging Hands" 
                bg={darkColor} fg={lightColor} 
                className="w-full h-full" 
              />
            </div>
            
            <div className="relative z-10 max-w-2xl text-center px-6 p-12 backdrop-blur-sm border" style={{ borderColor: lightColor }}>
              <Leaf size={32} className="mx-auto mb-6 opacity-80" />
              <h2 className={`text-5xl md:text-7xl font-normal leading-tight mb-8 ${yeseva.className}`}>
                Foraged, not farmed.
              </h2>
              <p className="text-xl font-medium leading-relaxed opacity-90">
                The most intense flavors cannot be cultivated in neat rows. They must be found. Our teams work with indigenous foragers across alpine and temperate regions to source wild berries at their absolute peak of ripeness.
              </p>
            </div>
          </div>
        </div>


        {/* --- SECTION 4: FOOTER (Light) --- */}
        <div 
          ref={sec4Ref} 
          className="absolute inset-0 w-full h-full z-40 flex flex-col justify-between" 
          style={{ backgroundColor: lightColor, color: darkColor }}
        >
          <div ref={sec4InnerRef} className="w-full h-full flex flex-col justify-between p-8 md:p-16">
            
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h2 className={`text-7xl md:text-[120px] leading-none mb-6 ${yeseva.className}`}>
                Taste the Harvest.
              </h2>
              <p className="text-xl md:text-2xl font-medium opacity-80 max-w-md mx-auto mb-10">
                Sign up for seasonal releases and exclusive wild-foraged batches.
              </p>
              <div className="flex w-full max-w-md mx-auto border-b-2" style={{ borderColor: darkColor }}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent w-full py-4 outline-none font-bold placeholder:opacity-50"
                  style={{ color: darkColor }}
                />
                <button className="uppercase font-bold tracking-widest text-sm hover:opacity-70 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="w-full border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: darkColor }}>
              <h3 className={`text-3xl ${yeseva.className}`}>Bramble & Co.</h3>
              
              <div className="flex gap-8 uppercase font-bold tracking-widest text-xs opacity-70">
                <a href="#" className="hover:opacity-100 transition-opacity">Shop</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Our Story</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Recipes</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Journal</a>
              </div>
              
              <div className="text-xs font-bold uppercase tracking-widest opacity-40">
                © {new Date().getFullYear()} Bramble & Co.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
