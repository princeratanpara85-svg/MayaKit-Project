"use client";

import React, { useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Domine, Archivo } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pencil, Compass, MoveDiagonal, CheckCircle2 } from "lucide-react";

const domine = Domine({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

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
  const lightColor = isDark(bg) ? fg : bg;
  const darkColor = isDark(bg) ? bg : fg;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: lightColor }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover absolute inset-0"
        style={{ filter: "grayscale(100%) contrast(1.3)", mixBlendMode: "multiply" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: darkColor, mixBlendMode: "lighten" }}
      />
    </div>
  );
};

export function ArtisanalPencilDemo({ palette }: { palette: Palette }) {
  const bg = palette.colors[1]; // Background (Soft cloud-white blue)
  const fg = palette.colors[0]; // Foreground (Celestial sky blue)

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pencilTipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(pencilTipRef.current, { left: "50%", top: "0%" });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Slight smoothing for the drawing effect
          onUpdate: (self) => {
            const pt = path.getPointAtLength(self.progress * len);
            // SVG viewBox is 0 0 100 100 with preserveAspectRatio="none",
            // so pt.x and pt.y are exact percentages.
            gsap.set(pencilTipRef.current, {
              left: `${pt.x}%`,
              top: `${pt.y}%`
            });
          }
        }
      });
      
      // Animate content elements fading in as the scroll passes them
      const fadeElements = gsap.utils.toArray('.reveal-on-scroll');
      fadeElements.forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      className={`min-h-screen selection:bg-[${fg}] selection:text-[${bg}]`} 
      style={{ backgroundColor: bg, color: fg, fontFamily: archivo.style.fontFamily }}
    >
      <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: "450vh" }}>
        
        {/* The SVG Canvas for the Continuous Line */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path 
            ref={pathRef}
            id="pencil-path"
            d="
              M 50 0 
              L 50 10 
              C 50 15, 15 15, 15 20 
              L 15 35 
              C 15 42.5, 85 42.5, 85 50 
              L 85 65 
              C 85 72.5, 50 72.5, 50 80 
              L 50 100
            "
            fill="none" 
            stroke={fg} 
            strokeWidth="0.15" 
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </svg>

        {/* The Pencil Icon that follows the line */}
        <div ref={pencilTipRef} className="absolute z-20 pointer-events-none" style={{ transform: "translate(-4px, -28px)" }}>
          <Pencil size={32} strokeWidth={1.5} style={{ color: fg, fill: bg }} />
        </div>

        {/* --- CONTENT LAYERS --- */}

        {/* HERO SECTION */}
        <div className="absolute w-full top-[10vh] left-0 flex flex-col items-center justify-center z-20 px-6 reveal-on-scroll">
          <span className="uppercase tracking-[0.3em] text-sm font-semibold mb-6">Makers of Precision</span>
          <h1 className={`text-6xl md:text-8xl font-bold tracking-tight text-center ${domine.className}`}>
            The Art of<br/>the Mark.
          </h1>
          <p className="mt-8 text-xl opacity-80 max-w-md text-center">
            Handcrafted analog tools for a digital world. Every pencil is a meticulously balanced instrument of expression.
          </p>
        </div>

        {/* CRAFT SECTION (Left curve) */}
        <div className="absolute w-[85%] md:w-[65%] left-[25%] md:left-[22%] h-[50vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 z-20 px-4" style={{ top: "100vh" }}>
          <div className="w-full md:w-1/2 reveal-on-scroll">
            <Compass size={32} className="mb-6 opacity-70" />
            <h2 className={`text-4xl md:text-5xl font-semibold leading-tight ${domine.className}`}>
              Sourced with purpose.
            </h2>
            <p className="mt-6 text-lg opacity-80 leading-relaxed">
              We exclusively use incense cedar from sustainable forests, known for its clean sharpening and distinct aroma. Our graphite is milled to a tolerance of 0.5 microns, ensuring a core completely free of grit.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-[30vh] md:h-full reveal-on-scroll">
            <DuotoneImage 
              src="https://picsum.photos/seed/0ded7deb/1200/800" 
              alt="Wood textures and craft"
              bg={bg} fg={fg}
              className="w-full h-full rounded-sm"
            />
          </div>
        </div>

        {/* PRODUCT LINEUP SECTION (Right curve) */}
        <div className="absolute w-[85%] md:w-[65%] right-[25%] md:right-[22%] h-[50vh] flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 z-20 px-4" style={{ top: "215vh" }}>
          <div className="w-full md:w-1/2 h-[30vh] md:h-full reveal-on-scroll">
            <DuotoneImage 
              src="https://picsum.photos/seed/eab109d4/1200/800" 
              alt="Graphite pencils aligned"
              bg={bg} fg={fg}
              className="w-full h-full rounded-sm"
            />
          </div>
          <div className="w-full md:w-1/2 reveal-on-scroll">
            <MoveDiagonal size={32} className="mb-6 opacity-70" />
            <h2 className={`text-4xl md:text-5xl font-semibold leading-tight ${domine.className}`}>
              Grades of expression.
            </h2>
            <p className="mt-6 text-lg opacity-80 leading-relaxed">
              From the architectural precision of our 2H cores to the sweeping, velvety darkness of our 4B sketching tools, our lineup delivers unbroken, pure marks for every hand.
            </p>
            <ul className="mt-8 space-y-3 opacity-90 font-medium">
              <li className="flex items-center gap-3"><CheckCircle2 size={16} /> 2H Drafting Series</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} /> HB Everyday Writer</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} /> 4B Soft Sketch</li>
            </ul>
          </div>
        </div>

        {/* PHILOSOPHY SECTION (Center) */}
        <div className="absolute w-full top-[310vh] left-0 flex flex-col items-center justify-center z-20 px-6 reveal-on-scroll">
          <div className="max-w-2xl text-center">
            <h2 className={`text-4xl md:text-5xl font-semibold leading-tight mb-8 ${domine.className}`}>
              A tool that gets out of the way.
            </h2>
            <p className="text-xl md:text-2xl opacity-80 leading-relaxed italic">
              "A great pencil shouldn't feel like you are holding an object; it should feel like an extension of your mind connecting directly to the paper."
            </p>
            <div className="mt-8 h-[1px] w-16 mx-auto opacity-40" style={{ backgroundColor: fg }} />
          </div>
        </div>

        {/* FOOTER SECTION */}
        <div className="absolute w-full bottom-[10vh] left-0 flex flex-col items-center justify-center z-20 px-6 reveal-on-scroll">
          <div className="w-full max-w-4xl border-t pt-16 flex flex-col md:flex-row justify-between items-start gap-12" style={{ borderColor: fg }}>
            <div className="max-w-xs">
              <h3 className={`text-3xl font-bold mb-6 ${domine.className}`}>Graphite & Sky</h3>
              <p className="opacity-70 text-sm leading-relaxed mb-8">
                Designing analog tools for thinkers, architects, and artists. Made with precision and soul.
              </p>
              <button 
                className="px-8 py-3 text-sm uppercase tracking-widest font-bold transition-transform hover:scale-105"
                style={{ backgroundColor: fg, color: bg }}
              >
                Shop Collection
              </button>
            </div>
            <div className="flex gap-16 text-sm font-medium">
              <div className="flex flex-col gap-4 opacity-80">
                <span className="uppercase tracking-widest opacity-50 mb-2 font-bold">Products</span>
                <a href="#" className="hover:opacity-100 transition-opacity">The Everyday HB</a>
                <a href="#" className="hover:opacity-100 transition-opacity">The Architect 2H</a>
                <a href="#" className="hover:opacity-100 transition-opacity">The Artist 4B</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Accessories</a>
              </div>
              <div className="flex flex-col gap-4 opacity-80">
                <span className="uppercase tracking-widest opacity-50 mb-2 font-bold">Company</span>
                <a href="#" className="hover:opacity-100 transition-opacity">Our Craft</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Sustainability</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Journal</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
              </div>
            </div>
          </div>
          <div className="w-full max-w-4xl text-center mt-24 opacity-40 text-xs tracking-widest uppercase font-semibold">
            © {new Date().getFullYear()} Graphite & Sky. The Analog Standard.
          </div>
        </div>

      </div>
    </div>
  );
}
