"use client";

import React, { useRef, useState } from "react";
import { Palette } from "@/data/palettes";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-space' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-jakarta' });

export function SmartphoneLaunchDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [tangerine, teal] = palette.colors; // tangerine = #FF8135, teal = #015B63
  const [selectedColor, setSelectedColor] = useState(tangerine);

  useGSAP(() => {
    // Reveal text
    gsap.utils.toArray(".reveal-text").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          duration: 1.0, 
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    gsap.utils.toArray(".footer-stagger").forEach((el: any, i: number) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, 
          duration: 1.0, 
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "footer", start: "top 90%" }
        }
      );
    });

    // 3D Phone Hero Sequence (Master Timeline via CSS Sticky)
    // Bulletproof 3D initialization natively in GSAP
    gsap.set(".css-phone", {
      transformPerspective: 2000,
      rotationY: 0,
      rotationX: 0,
      scale: 1
    });

    const phoneTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Animate the phone gracefully in a full 360-degree rotation
    phoneTl.to(".css-phone", {
      rotationY: 360,
      rotationX: 15,
      scale: 1.4,
      ease: "none",
      duration: 1
    }, 0);

    // Feature Text 1: "Monolithic Glass" (Show during rotation to back: 0.2 to 0.45)
    phoneTl.fromTo(".feature-text-1", 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }, 
      0.15
    );
    phoneTl.to(".feature-text-1", 
      { opacity: 0, x: -50, duration: 0.1, ease: "power2.in" }, 
      0.4
    );

    // Feature Text 2: "ProMotion Vision" (Show during rotation back to front: 0.6 to 0.9)
    phoneTl.fromTo(".feature-text-2", 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 0.15, ease: "power2.out" }, 
      0.6
    );
    phoneTl.to(".feature-text-2", 
      { opacity: 0, x: 50, duration: 0.15, ease: "power2.in" }, 
      0.85
    );

    // Camera Philosophy section
    gsap.fromTo(".lens-glass",
      { rotate: 0, scale: 0.8 },
      { rotate: 180, scale: 1.1, ease: "sine.inOut",
        scrollTrigger: { trigger: ".camera-track", start: "top bottom", end: "bottom top", scrub: 1 }
      }
    );

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`relative min-h-screen ${jakarta.className} ${spaceGrotesk.variable}`}
      style={{ backgroundColor: teal, color: tangerine }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-space { font-family: var(--font-space), sans-serif; }
        .transform-3d { transform-style: preserve-3d; perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${teal}; }
        ::-webkit-scrollbar-thumb { background: ${tangerine}40; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: ${tangerine}; }
      `}} />

      {/* 1. NAV (Apple-style minimal) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center backdrop-blur-xl border-b border-white/5" style={{ backgroundColor: `${teal}90`, transform: "translateZ(1000px)" }}>
        <div className="font-space font-bold text-xl tracking-tight">AXIOM ONE</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold opacity-90">
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Design</span>
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Specs</span>
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Camera</span>
          <button 
            className="px-5 py-2 rounded-full font-bold text-sm transition-transform duration-150 ease-out active:scale-95"
            style={{ backgroundColor: tangerine, color: teal }}
          >
            Pre-order
          </button>
        </div>
      </nav>

      {/* 2. HERO / HARDWARE SHOWCASE (Scroll-Jacked via CSS Sticky) */}
      <div className="hero-track w-full h-[300vh] relative">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center transform-3d">
          
          {/* Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <h1 className="font-space font-bold text-[30vw] leading-none text-white whitespace-nowrap">AXIOM</h1>
          </div>

          {/* The CSS 3D Phone */}
          <div className="css-phone relative w-[280px] md:w-[320px] h-[580px] md:h-[660px] preserve-3d z-20">
            
            {/* Note: Physical buttons have been moved to the midframe Z=6 layer to render properly in 3D space */}

            {/* Front Screen */}
            <div className="absolute inset-0 rounded-[50px] bg-black border-[8px] border-[#111] backface-hidden flex flex-col items-center shadow-[0_0_100px_rgba(255,129,53,0.15)] overflow-hidden" style={{ transform: "translateZ(11px)" }}>
              {/* Screen Wallpaper */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#015B63] via-[#013A40] to-black opacity-80" />
              {/* Screen Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-3 w-28 h-8 bg-black rounded-full flex items-center justify-between px-2 z-10 shadow-lg border border-white/5">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-900 to-black border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400/30 rounded-full" />
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500/80 shadow-[0_0_5px_#22c55e]" />
              </div>

              {/* Lock Screen UI */}
              <div className="relative z-10 font-space font-bold text-6xl mt-20 text-white tracking-tighter">12:00</div>
              <div className="relative z-10 text-white/70 text-sm mt-1 font-medium">Tuesday, September 15</div>
              
              {/* Lock Screen Widgets */}
              <div className="relative z-10 flex gap-4 mt-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/5">
                  <span className="text-white text-xs font-bold">24°</span>
                  <span className="text-white/50 text-[10px]">Cloudy</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/5">
                  <span className="text-white text-xs font-bold">89%</span>
                  <span className="text-white/50 text-[10px]">Battery</span>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 w-36 h-1.5 bg-white/40 rounded-full z-10" />
            </div>

            {/* Back Glass */}
            <div className="absolute inset-0 rounded-[50px] border-[4px] border-[#222] backface-hidden preserve-3d shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 overflow-hidden" style={{ backgroundColor: selectedColor, transform: "rotateY(180deg) translateZ(11px)" }}>
              {/* Frosting / Texture */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] mix-blend-overlay" />
              {/* Metallic Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none" />
              
              {/* Axiom Logo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="font-space font-bold text-4xl tracking-widest" style={{ color: selectedColor === "#ffffff" ? "#000" : "#fff" }}>AXIOM</div>
              </div>
              
              {/* Ultra-Detailed Camera Module */}
              <div className="absolute top-8 left-8 w-32 h-36 rounded-[30px] bg-black/30 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center gap-3 p-3 transform-3d shadow-2xl" style={{ transform: "translateZ(8px)" }}>
                {/* Main Lens */}
                <div className="w-14 h-14 rounded-full bg-[#111] border-[3px] border-[#333] flex items-center justify-center shadow-[inset_0_5px_15px_rgba(0,0,0,1)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-purple-500/40 mix-blend-screen" />
                  <div className="w-6 h-6 rounded-full bg-[#050505] border-[2px] border-[#1a1a1a] shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] relative">
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/40 blur-[1px]" />
                  </div>
                </div>
                {/* Ultrawide Lens */}
                <div className="w-10 h-10 rounded-full bg-[#111] border-[3px] border-[#333] flex items-center justify-center shadow-[inset_0_5px_15px_rgba(0,0,0,1)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 via-transparent to-blue-500/40 mix-blend-screen" />
                  <div className="w-4 h-4 rounded-full bg-[#050505] border border-[#1a1a1a] relative">
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/40 blur-[1px]" />
                  </div>
                </div>
                {/* Flash & LiDAR */}
                <div className="absolute right-4 top-12 flex flex-col gap-4">
                  <div className="w-4 h-4 rounded-full bg-yellow-100/90 shadow-[0_0_15px_rgba(255,255,150,0.5)] border border-white/20" />
                  <div className="w-4 h-4 rounded-full bg-[#111] border border-[#222] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-red-500/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Edge / Dense Metallic Midframe Stack */}
            <div className="absolute inset-0 preserve-3d pointer-events-none transition-colors duration-500">
              {Array.from({ length: 21 }).map((_, i) => {
                const layerColor = selectedColor === "#ffffff" 
                     ? (i === 0 || i === 20 ? "#ccc" : "#e5e5e5") 
                     : (i === 0 || i === 20 ? "#000" : "#1a1a1a");
                return (
                  <div key={i} className="absolute inset-0 rounded-[50px] transform-3d pointer-events-none" style={{ 
                    backgroundColor: layerColor,
                    boxShadow: `0 0 0 1px ${layerColor}`, // Bleeds color by 1px to perfectly fuse anti-aliasing gaps
                    transform: `translateZ(${i - 10}px)` 
                  }}>
                    {/* Attach Physical Buttons to the exact middle layer (Z=0 which is i=10) */}
                    {i === 10 && (
                      <>
                        <div className="absolute top-32 -left-[4px] w-[6px] h-14 bg-gray-800 rounded-l-[4px] shadow-lg border-y border-l border-white/20" />
                        <div className="absolute top-52 -left-[4px] w-[6px] h-14 bg-gray-800 rounded-l-[4px] shadow-lg border-y border-l border-white/20" />
                        <div className="absolute top-40 -right-[4px] w-[6px] h-20 bg-gray-800 rounded-r-[4px] shadow-lg border-y border-r border-white/20" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Feature Texts */}
          <div className="feature-text-1 absolute left-10 md:left-32 top-1/3 max-w-sm opacity-0 z-30">
            <h3 className="font-space font-bold text-3xl mb-4">Monolithic Glass.</h3>
            <p className="text-lg opacity-80 leading-relaxed">Forged at 800°C for unprecedented durability. A seamless block of engineering.</p>
          </div>

          <div className="feature-text-2 absolute right-10 md:right-32 top-1/2 max-w-sm opacity-0 z-30 text-right">
            <h3 className="font-space font-bold text-3xl mb-4">ProMotion Vision.</h3>
            <p className="text-lg opacity-80 leading-relaxed">120Hz adaptive refresh rate that feels like physical ink flowing under glass.</p>
          </div>

        </div>

        {/* Scroll Triggers for the sticky track */}
        <div className="feature-trigger-1 absolute top-[50vh] w-full h-10" />
        <div className="feature-trigger-2 absolute top-[150vh] w-full h-10" />
      </div>

      {/* 3. DESIGN PHILOSOPHY */}
      <section className="w-full py-40 px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10 border-t border-white/5 bg-[#014D54]">
        <h2 className="font-space font-bold text-5xl md:text-7xl tracking-tighter mb-12 reveal-text">Absolute Purity.</h2>
        <p className="max-w-3xl text-xl md:text-2xl leading-[1.8] opacity-80 reveal-text">
          We removed everything that wasn't essential. No seams. No plastic. No distractions. The Axiom One is the culmination of three years of obsessive material science, resulting in a device that doesn't just look different—it feels inevitable.
        </p>
      </section>

      {/* 4. CAMERA SYSTEM (Split Pinned) */}
      <div className="camera-track w-full flex flex-col lg:flex-row relative text-white" style={{ backgroundColor: teal }}>
        {/* Left: Sticky Camera Graphic */}
        <div className="lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 flex items-center justify-center overflow-hidden border-r border-white/10" style={{ backgroundColor: teal }}>
           <div className="lens-glass relative w-64 md:w-96 aspect-square rounded-full shadow-[0_20px_100px_rgba(0,0,0,0.5)] border-[12px] flex items-center justify-center" style={{ borderColor: `${teal}90`, backgroundColor: `${tangerine}20` }}>
             <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${tangerine}80, transparent 60%)`, mixBlendMode: 'screen' }} />
             <div className="absolute inset-0 rounded-full backdrop-blur-md" />
             <div className="w-3/4 h-3/4 rounded-full border border-white/20 flex items-center justify-center shadow-2xl relative z-10" style={{ background: `radial-gradient(circle at 50% 50%, #000, #111)` }}>
                <div className="w-1/2 h-1/2 rounded-full border border-white/10 shadow-[inset_0_0_40px_rgba(255,129,53,0.5)]" style={{ background: `radial-gradient(circle at 40% 40%, ${tangerine}, #000)` }} />
             </div>
             {/* Lens glints */}
             <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white opacity-20 blur-xl pointer-events-none" />
           </div>
        </div>
        
        {/* Right: Scrolling Content */}
        <div className="lg:w-1/2 flex flex-col" style={{ color: tangerine }}>
           <div className="min-h-screen flex flex-col justify-center px-10 md:px-24 py-20 border-b border-white/10" style={{ backgroundColor: `${teal}fa` }}>
              <h3 className="font-space font-bold text-4xl md:text-6xl tracking-tight mb-8">Light. Captured.</h3>
              <p className="text-xl opacity-80 leading-relaxed mb-12">The all-new 50MP sensor pulls in 200% more light than the previous generation. Night becomes day. Shadows reveal their secrets.</p>
           </div>
           <div className="min-h-screen flex flex-col justify-center px-10 md:px-24 py-20 border-b border-white/10" style={{ backgroundColor: `${teal}f0` }}>
              <h3 className="font-space font-bold text-4xl md:text-6xl tracking-tight mb-8">Computational Magic.</h3>
              <p className="text-xl opacity-80 leading-relaxed mb-12">Powered by our custom ISP, every shot undergoes 3 trillion operations before you even see it. Perfect exposure. Perfect color.</p>
           </div>
           <div className="min-h-screen flex flex-col justify-center px-10 md:px-24 py-20" style={{ backgroundColor: teal }}>
              <h3 className="font-space font-bold text-4xl md:text-6xl tracking-tight mb-8">8K Cinematic.</h3>
              <p className="text-xl opacity-80 leading-relaxed mb-12">Shoot film-grade 8K video at 30fps natively. It's a Hollywood studio that fits in your pocket.</p>
           </div>
        </div>
      </div>

      {/* 5. COLOR SELECTOR */}
      <section className="w-full py-40 px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10 border-t border-white/5 bg-black/20" style={{ color: tangerine }}>
        <h2 className="font-space font-bold text-5xl tracking-tighter mb-8 reveal-text">Pick Your Finish.</h2>
        <p className="text-xl opacity-80 mb-16 reveal-text">Available in two striking anodized colors.</p>
        
        <div className="flex gap-12 reveal-text">
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setSelectedColor(tangerine)}
              className="w-20 h-20 rounded-full border-4 shadow-xl transition-transform duration-150 ease-out active:scale-95 cursor-pointer"
              style={{ backgroundColor: tangerine, borderColor: selectedColor === tangerine ? "white" : "transparent" }}
              aria-label="Select Tangerine"
            />
            <span className="font-bold tracking-widest text-sm uppercase">Tangerine</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setSelectedColor("#ffffff")}
              className="w-20 h-20 rounded-full border-4 shadow-xl transition-transform duration-150 ease-out active:scale-95 cursor-pointer"
              style={{ backgroundColor: "#ffffff", borderColor: selectedColor === "#ffffff" ? tangerine : "transparent" }}
              aria-label="Select Pearl"
            />
            <span className="font-bold tracking-widest text-sm uppercase">Pearl</span>
          </div>
        </div>
        
        <p className="mt-12 text-sm opacity-60 italic">(Scroll up to see your choice applied to the hardware)</p>
      </section>

      {/* 6. SUBSTANTIAL FOOTER */}
      <footer className="w-full py-32 px-6 md:px-24 border-t relative overflow-hidden" style={{ borderColor: tangerine, backgroundColor: teal, color: tangerine }}>
        {/* Massive Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-space font-bold text-[35vw] leading-none opacity-20 pointer-events-none z-0">
          AXIOM
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 max-w-7xl mx-auto relative z-10">
          <div className="col-span-2 md:col-span-1 footer-stagger">
            <h4 className="font-space font-bold text-4xl mb-8 tracking-tighter">AXIOM</h4>
            <p className="opacity-70 text-sm leading-relaxed max-w-xs">Designing the future of human-computer interaction, one millimeter at a time.</p>
          </div>
          <div className="flex flex-col gap-4 footer-stagger">
            <h5 className="font-bold tracking-widest text-sm uppercase opacity-50 mb-4">Products</h5>
            <a href="#" className="hover:opacity-60 transition-opacity">Axiom One</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Axiom Pro</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Axiom Pods</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Accessories</a>
          </div>
          <div className="flex flex-col gap-4 footer-stagger">
            <h5 className="font-bold tracking-widest text-sm uppercase opacity-50 mb-4">Company</h5>
            <a href="#" className="hover:opacity-60 transition-opacity">About Us</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Careers</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Environment</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Newsroom</a>
          </div>
          <div className="flex flex-col gap-4 footer-stagger">
            <h5 className="font-bold tracking-widest text-sm uppercase opacity-50 mb-4">Support</h5>
            <a href="#" className="hover:opacity-60 transition-opacity">Help Center</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Repair</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Warranty</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-xs relative z-10 footer-stagger">
          <p>© {new Date().getFullYear()} Axiom Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
