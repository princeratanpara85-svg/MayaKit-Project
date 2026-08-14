"use client";

import React, { useEffect } from "react";
import { Palette } from "@/data/palettes";
import { Anton, Inter } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const anton = Anton({ weight: "400", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function StreetwearStoreDemo({ palette }: { palette: Palette }) {
  const [lightColor, darkColor] = palette.colors;
  const container = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reveals = gsap.utils.toArray(".st-reveal");
    reveals.forEach((el: any) => {
      gsap.to(el, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration: 0.7,
        ease: "cubic-bezier(0.19, 1, 0.22, 1)",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        }
      });
    });
  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${anton.className} ${inter.variable}`}
      style={{
        backgroundColor: darkColor,
        color: lightColor,
        "--ease-sharp": "cubic-bezier(0.19, 1, 0.22, 1)",
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .st-btn {
          transition: transform 160ms var(--ease-sharp);
        }
        .st-btn:active {
          transform: scale(0.97);
        }

        .st-reveal {
          opacity: 0;
          clip-path: inset(100% 0% 0% 0%);
          transform: translateY(20px);
        }        
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }

        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .product-card {
          position: relative;
          overflow: hidden;
        }
        .cart-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          transform: translateY(100%);
          transition: transform 400ms var(--ease-sharp);
        }
        .product-card:hover .cart-bar {
          transform: translateY(0);
        }
        
        .font-body {
          font-family: var(--font-inter), sans-serif;
        }
      `}} />

      {/* NAVBAR */}
      <nav 
        className="sticky top-0 z-50 w-full border-b-2 flex items-center justify-between px-6 py-4 uppercase tracking-widest backdrop-blur-md"
        style={{ borderColor: lightColor, backgroundColor: `${darkColor}CC` }}
      >
        <div className="text-3xl leading-none">ALTER//EGO</div>
        <div className="flex items-center gap-8 font-body font-bold text-sm">
          <a href="#" className="hidden md:block st-btn hover:opacity-70">Apparel</a>
          <a href="#" className="hidden md:block st-btn hover:opacity-70">Accessories</a>
          <a href="#" className="hidden md:block st-btn hover:opacity-70">Archive</a>
          <button className="st-btn border-2 px-4 py-2 hover:bg-white/10" style={{ borderColor: lightColor }}>
            CART [0]
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b-2" style={{ borderColor: lightColor }}>
        {/* Marquee Background */}
        <div className="marquee-container py-12 md:py-24 opacity-20 pointer-events-none select-none border-b-2" style={{ borderColor: lightColor }}>
          <div className="marquee-content text-[15vw] leading-[0.8]">
            ORIGINAL CONCEPTS // NO CAPES // STREET WEAR // ORIGINAL CONCEPTS // NO CAPES // STREET WEAR //
          </div>
        </div>
        
        {/* Spotlight Product */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 st-reveal">
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-6">
              THE <br/> VIGILANTE <br/> HOODIE
            </h1>
            <p className="font-body font-medium text-lg md:text-xl max-w-md mb-8 opacity-90 leading-relaxed">
              Heavyweight 400gsm cotton. Boxy drop-shoulder fit. Inspired by those who operate strictly in the shadows.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-4xl">$120</span>
              <button 
                className="st-btn px-8 py-4 text-xl font-body font-bold tracking-widest"
                style={{ backgroundColor: lightColor, color: darkColor }}
              >
                BUY NOW
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 st-reveal delay-200 relative aspect-[4/5] border-4" style={{ borderColor: lightColor }}>
            <img 
              src="https://picsum.photos/seed/2b4663f3/1200/800" 
              alt="Model wearing hoodie" 
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "KINETIC TEE", price: "$45", img: "https://picsum.photos/seed/d6989eb7/1200/800" },
            { name: "SHADOW CARGO", price: "$110", img: "https://picsum.photos/seed/79770217/1200/800" },
            { name: "STEALTH CAP", price: "$35", img: "https://picsum.photos/seed/dd2e7c8d/1200/800" },
            { name: "MUTANT JACKET", price: "$180", img: "https://picsum.photos/seed/mutant/800/800" },
            { name: "SPEEDSTER JOGGERS", price: "$90", img: "https://picsum.photos/seed/joggers/800/800" },
            { name: "ARMOR VEST", price: "$150", img: "https://picsum.photos/seed/vest/800/800" }
          ].map((item, i) => (
            <div 
              key={item.name}
              className={`product-card border-b-2 sm:border-b-2 lg:border-b-2 border-r-2 flex flex-col group cursor-pointer st-reveal delay-${(i % 3) * 100}`}
              style={{ borderColor: lightColor }}
            >
              {/* Image Box */}
              <div className="relative aspect-square border-b-2 overflow-hidden" style={{ borderColor: lightColor }}>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Cart Bar Hover */}
                <div 
                  className="cart-bar w-full py-4 text-center text-2xl font-body font-black uppercase tracking-widest"
                  style={{ backgroundColor: lightColor, color: darkColor }}
                >
                  ADD TO CART
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6 flex justify-between items-center bg-transparent">
                <h3 className="text-2xl md:text-3xl tracking-wide">{item.name}</h3>
                <span className="font-body font-bold text-lg">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE BANNER */}
      <section 
        className="w-full py-24 md:py-32 px-6 flex items-center justify-center text-center border-b-2 relative overflow-hidden"
        style={{ borderColor: lightColor, backgroundColor: lightColor, color: darkColor }}
      >
        <div className="st-reveal relative z-10 max-w-5xl">
          <h2 className="text-5xl md:text-7xl lg:text-9xl leading-[0.85]">
            NOT ALL HEROES WEAR CAPES.
            <br />
            SOME WEAR THIS.
          </h2>
        </div>
        
        {/* Subtle background graphic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center mix-blend-overlay">
          <div className="w-[150%] h-[150%] border-[20px] rounded-full" style={{ borderColor: darkColor }} />
        </div>
      </section>

      {/* SUBSTANTIAL FOOTER */}
      <footer className="w-full pt-24 px-6 md:px-12 pb-12 font-body">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="st-reveal">
            <h3 className={`text-4xl mb-6 ${anton.className}`}>ALTER//EGO</h3>
            <p className="opacity-80 mb-8 max-w-sm leading-relaxed">
              Premium streetwear for the extraordinary. We design tactical, functional, and hyper-stylized apparel for the urban vigilante.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 border-2 flex items-center justify-center hover:bg-white/10 cursor-pointer st-btn" style={{ borderColor: lightColor }}>IG</div>
              <div className="w-10 h-10 border-2 flex items-center justify-center hover:bg-white/10 cursor-pointer st-btn" style={{ borderColor: lightColor }}>XX</div>
              <div className="w-10 h-10 border-2 flex items-center justify-center hover:bg-white/10 cursor-pointer st-btn" style={{ borderColor: lightColor }}>YT</div>
            </div>
          </div>

          <div className="st-reveal delay-100">
            <h4 className="font-bold text-xl mb-6 uppercase tracking-widest border-b-2 pb-2 inline-block" style={{ borderColor: lightColor }}>Shop</h4>
            <ul className="flex flex-col gap-4 font-medium opacity-80">
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">New Arrivals</a></li>
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">Outerwear</a></li>
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">T-Shirts</a></li>
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">Bottoms</a></li>
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">Accessories</a></li>
            </ul>
          </div>

          <div className="st-reveal delay-200">
            <h4 className="font-bold text-xl mb-6 uppercase tracking-widest border-b-2 pb-2 inline-block" style={{ borderColor: lightColor }}>Support</h4>
            <ul className="flex flex-col gap-4 font-medium opacity-80">
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">FAQ</a></li>
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">Shipping & Returns</a></li>
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">Size Guide</a></li>
              <li><a href="#" className="hover:opacity-100 hover:ml-2 transition-all">Contact Us</a></li>
            </ul>
          </div>

          <div className="st-reveal delay-300">
            <h4 className="font-bold text-xl mb-6 uppercase tracking-widest border-b-2 pb-2 inline-block" style={{ borderColor: lightColor }}>Newsletter</h4>
            <p className="opacity-80 mb-4 text-sm">Join the syndicate. 10% off your first drop.</p>
            <form className="flex" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-2 border-r-0 px-4 py-3 w-full font-body font-bold focus:outline-none placeholder:opacity-50"
                style={{ borderColor: lightColor, color: lightColor }}
              />
              <button 
                type="submit" 
                className="px-6 border-2 font-bold uppercase tracking-widest st-btn"
                style={{ backgroundColor: lightColor, color: darkColor, borderColor: lightColor }}
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t-2 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold uppercase tracking-widest opacity-60 st-reveal delay-200" style={{ borderColor: lightColor }}>
          <div>© {new Date().getFullYear()} ALTER//EGO CONCEPTS.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100">Terms</a>
            <a href="#" className="hover:opacity-100">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
