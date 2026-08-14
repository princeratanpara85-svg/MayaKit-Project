"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Bricolage_Grotesque, Montserrat } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });
const montserrat = Montserrat({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

export function MusicStreamingDemo({ palette }: { palette: Palette }) {
  const container = useRef<HTMLDivElement>(null);
  const [mint, charcoal] = palette.colors; // mint = #2AF5C8, charcoal = #141414

  useGSAP(() => {
    // 1. Premium Emil-style Entry Animations (opacity + scale(0.95))
    // We replace the loose power4 with Emil's recommended tight cubic-bezier
    const emilEase = "cubic-bezier(0.23, 1, 0.32, 1)";
    
    gsap.utils.toArray(".emil-enter").forEach((el: any) => {
      gsap.fromTo(el, 
        { scale: 0.95, opacity: 0, y: 20 },
        { 
          scale: 1, opacity: 1, y: 0,
          duration: 0.8, 
          ease: emilEase,
          scrollTrigger: { trigger: el, start: "top 90%" }
        }
      );
    });

    // 2. Hardware-accelerated clip-path reveals for images
    gsap.utils.toArray(".clip-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 1.2,
          ease: emilEase,
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    // 3. Shocking 3D Grid Reveal (Discover Section)
    gsap.fromTo(".discover-card",
      { scale: 0.8, opacity: 0, y: 150, rotationX: 45, transformPerspective: 1000 },
      {
        scale: 1, opacity: 1, y: 0, rotationX: 0,
        duration: 1.2,
        ease: "expo.out", // Extremely dramatic snap into place
        stagger: 0.15,
        scrollTrigger: { trigger: ".discover-grid", start: "top 80%" }
      }
    );

    // 4. Live Lyrics Scroll Sync
    const lyricsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".lyrics-container",
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
      }
    });
    
    const lyricLines = gsap.utils.toArray(".lyric-line");
    lyricLines.forEach((el: any, index) => {
      lyricsTl.to(el, {
        opacity: 1,
        color: mint,
        duration: 1,
        ease: "none"
      }, index * 0.5);
      
      // Fade out previous lines slightly to keep focus on the "current" line
      if (index > 0) {
        lyricsTl.to(lyricLines[index - 1] as HTMLElement, {
          opacity: 0.3,
          color: "#ffffff",
          duration: 0.5,
          ease: "none"
        }, index * 0.5);
      }
    });

    // 5. Hero EQ Animation
    gsap.to(".eq-bar", {
      scaleY: "random(0.2, 1.2)",
      duration: 0.4,
      ease: "sine.inOut",
      stagger: {
        each: 0.05,
        repeat: -1,
        yoyo: true
      }
    });

    // 6. Audio scrubber animation
    gsap.to(".scrubber-progress", {
      width: "100%",
      duration: 12,
      ease: "none",
      repeat: -1
    });

    // 7. Parallax Floating Albums
    gsap.to(".album-float-1", {
      y: -120, rotation: -5, ease: "none",
      scrollTrigger: { trigger: ".features-section", scrub: 1 }
    });
    gsap.to(".album-float-2", {
      y: -200, rotation: 10, ease: "none",
      scrollTrigger: { trigger: ".features-section", scrub: 1 }
    });
    gsap.to(".album-float-3", {
      y: -80, rotation: -15, ease: "none",
      scrollTrigger: { trigger: ".features-section", scrub: 1 }
    });

  }, { scope: container });

  const eqBars = Array.from({ length: 40 }).map((_, i) => i);

  // 3D Tilt Hover Effect for Discover Cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(target, {
      rotateX,
      rotateY,
      scale: 1.05,
      transformPerspective: 1000,
      ease: "power2.out", // Fast tracking
      duration: 0.4
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    gsap.to(target, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "elastic.out(1, 0.4)", // Bouncy spring return (Emil style)
      duration: 1.2
    });
  };

  return (
    <div 
      ref={container}
      className={`min-h-screen ${montserrat.className} ${bricolage.variable} selection:bg-[${mint}] selection:text-[${charcoal}] overflow-hidden`}
      style={{ backgroundColor: charcoal, color: '#FFFFFF' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-bricolage { font-family: var(--font-bricolage), sans-serif; }
        
        .aura-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 24px;
        }
        
        .eq-bar { transform-origin: bottom; }

        /* Emil's Design Engineering Principles */
        .emil-btn {
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), filter 200ms ease, background-color 200ms ease;
          transform-origin: center;
        }
        .emil-btn:active {
          transform: scale(0.97); /* Crucial tactile feedback */
        }
        .emil-btn:hover {
          filter: brightness(1.1);
        }
        
        .emil-image-wrapper {
          overflow: hidden;
          border-radius: 16px;
        }
        .emil-image {
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .emil-image-wrapper:hover .emil-image {
          transform: scale(1.05);
        }

        /* Hardware-accelerated clip-path for entry reveals */
        .clip-reveal {
          clip-path: inset(0 0 100% 0);
        }
      `}} />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-bricolage text-3xl font-extrabold tracking-tighter" style={{ color: mint }}>
          AURA
        </div>
        <div className="hidden md:flex gap-8 font-semibold tracking-wide text-sm items-center">
          <a href="#" className={`hover:text-[${mint}] transition-colors`}>Premium</a>
          <a href="#" className={`hover:text-[${mint}] transition-colors`}>Discover</a>
          <button className="emil-btn px-6 py-2 rounded-full font-bold text-black" style={{ backgroundColor: mint }}>Sign In</button>
        </div>
      </nav>

      {/* 1. HERO (The Soundscape) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0 flex items-end justify-center gap-2 md:gap-4 pb-0 opacity-20 pointer-events-none">
          {eqBars.map((bar) => (
             <div key={bar} className="eq-bar w-8 md:w-16 rounded-t-sm" style={{ height: '60vh', backgroundColor: mint }} />
          ))}
        </div>
        <div className={`absolute inset-0 z-0 bg-gradient-to-b from-[${charcoal}] via-[${charcoal}fa] to-[${charcoal}] pointer-events-none`} />

        <div className="relative z-10 text-center w-full px-6 flex flex-col items-center mt-12">
          {/* Using core mint color prominently on Hero text */}
          <h1 className="font-bricolage text-[16vw] md:text-[12vw] font-extrabold leading-[0.85] tracking-tighter emil-enter" style={{ color: mint }}>
            HEAR<br/><span className="text-white">EVERYTHING.</span>
          </h1>
          <p className="mt-8 font-medium text-xl md:text-2xl max-w-lg emil-enter text-gray-300">
            Millions of tracks. Exclusive podcasts. The highest fidelity audio on the planet.
          </p>
          <div className="mt-12 flex gap-4 emil-enter">
             <button className="emil-btn px-8 py-4 rounded-full font-bricolage text-xl font-bold text-black shadow-[0_0_30px_rgba(42,245,200,0.3)]" style={{ backgroundColor: mint }}>
               Get Aura Free
             </button>
          </div>
        </div>
      </section>

      {/* 2. PLAYER UI SHOWCASE */}
      <section className="relative w-full py-24 z-20 flex justify-center px-6">
         <div className="w-full max-w-4xl aura-card p-6 md:p-12 flex flex-col md:flex-row items-center gap-12 emil-enter shadow-2xl relative overflow-hidden" style={{ borderColor: 'rgba(42,245,200,0.2)' }}>
            {/* Mint Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: mint }} />

            <div className="w-full md:w-[40%] aspect-square emil-image-wrapper shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
               <img src="https://picsum.photos/seed/9bdbf97b/1200/800" className="emil-image w-full h-full object-cover" alt="Album Cover" />
            </div>

            <div className="w-full md:w-[60%] flex flex-col relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bricolage text-4xl font-bold mb-2">Neon Nights</h3>
                    <p className="text-xl font-semibold" style={{ color: mint }}>The Midnight Synthetics</p>
                  </div>
                  <div className={`emil-btn w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center cursor-pointer hover:border-[${mint}] transition-colors`} style={{ color: mint }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </div>
               </div>

               <div className="w-full mb-8">
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full scrubber-progress rounded-full" style={{ backgroundColor: mint, width: '0%' }} />
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
                     <span style={{ color: mint }}>1:24</span>
                     <span>4:05</span>
                  </div>
               </div>

               <div className="flex items-center justify-center gap-8">
                  <svg className="emil-btn cursor-pointer text-gray-400 hover:text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                  <div className="emil-btn w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(42,245,200,0.3)]" style={{ backgroundColor: mint, color: charcoal }}>
                     <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                  <svg className="emil-btn cursor-pointer text-gray-400 hover:text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
               </div>
            </div>
         </div>
      </section>

      {/* 3. NEW: CURATED DISCOVER GRID */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20">
         <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 emil-enter">
               <div>
                  <h2 className="font-bricolage text-5xl md:text-7xl font-bold tracking-tight">Handpicked.</h2>
                  <h2 className="font-bricolage text-5xl md:text-7xl font-bold tracking-tight" style={{ color: mint }}>Just for you.</h2>
               </div>
               <p className="text-xl text-gray-400 font-medium max-w-sm mt-6 md:mt-0">
                  Our editors and algorithms work in perfect harmony to surface tracks you'll obsess over.
               </p>
            </div>

            {/* Masonry-style Grid */}
            <div className="discover-grid grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "2000px" }}>
               <div 
                  className="discover-card aura-card p-4 flex flex-col gap-4 cursor-pointer"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" }}
               >
                  <div className="w-full aspect-square emil-image-wrapper clip-reveal" style={{ transform: "translateZ(30px)" }}>
                     <img src="https://picsum.photos/seed/24223510/1200/800" className="emil-image w-full h-full object-cover pointer-events-none" alt="Playlist 1" />
                  </div>
                  <div style={{ transform: "translateZ(40px)" }}>
                     <h4 className="font-bold text-xl drop-shadow-md">Underground Techno</h4>
                     <p className="text-sm text-gray-400 drop-shadow-md">142 BPM, dark rooms.</p>
                  </div>
               </div>
               
               <div 
                  className="discover-card aura-card p-4 flex flex-col gap-4 md:mt-12 cursor-pointer"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" }}
               >
                  <div className="w-full aspect-[4/5] emil-image-wrapper clip-reveal" style={{ transform: "translateZ(30px)" }}>
                     <img src="https://picsum.photos/seed/68af7967/1200/800" className="emil-image w-full h-full object-cover pointer-events-none" alt="Playlist 2" />
                  </div>
                  <div style={{ transform: "translateZ(40px)" }}>
                     <h4 className="font-bold text-xl drop-shadow-md" style={{ color: mint }}>Synthwave Essentials</h4>
                     <p className="text-sm text-gray-400 drop-shadow-md">Neon dreams & retro futures.</p>
                  </div>
               </div>

               <div 
                  className="discover-card aura-card p-4 flex flex-col gap-4 cursor-pointer"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transformStyle: "preserve-3d" }}
               >
                  <div className="w-full aspect-square emil-image-wrapper clip-reveal" style={{ transform: "translateZ(30px)" }}>
                     <img src="https://picsum.photos/seed/600cffb1/1200/800" className="emil-image w-full h-full object-cover pointer-events-none" alt="Playlist 3" />
                  </div>
                  <div style={{ transform: "translateZ(40px)" }}>
                     <h4 className="font-bold text-xl drop-shadow-md">Lo-Fi Study</h4>
                     <p className="text-sm text-gray-400 drop-shadow-md">Beats to relax/study to.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. NEW: LIVE LYRICS SECTION */}
      <section className="relative w-full py-48 px-6 z-20" style={{ backgroundColor: '#0f0f0f' }}>
         <div className="max-w-4xl mx-auto flex flex-col">
            <h3 className="font-bricolage text-2xl md:text-3xl font-bold mb-16 uppercase tracking-widest text-gray-500 emil-enter">Aura Live Sync</h3>
            
            <div className="lyrics-container font-bricolage text-4xl md:text-7xl font-bold tracking-tight leading-tight md:leading-snug">
               <div className="lyric-line opacity-20 mb-4 transition-colors">You were standing in the neon glow,</div>
               <div className="lyric-line opacity-20 mb-4 transition-colors">A silhouette against the radio,</div>
               <div className="lyric-line opacity-20 mb-4 transition-colors">The frequency was crystal clear,</div>
               <div className="lyric-line opacity-20 transition-colors">And suddenly the future's here.</div>
            </div>
         </div>
      </section>

      {/* 5. FEATURES (The Record Crate Parallax) */}
      <section className="features-section relative w-full py-48 px-6 md:px-12 z-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          
          <div className="flex flex-col gap-16 relative z-20">
            <div className="emil-enter">
              <h2 className="font-bricolage text-5xl md:text-6xl font-bold tracking-tight mb-4" style={{ color: mint }}>Offline Mode</h2>
              <p className="text-xl text-gray-400 font-medium">Take your entire library anywhere. No connection? No problem.</p>
            </div>
            <div className="emil-enter">
              <h2 className="font-bricolage text-5xl md:text-6xl font-bold tracking-tight mb-4">Aura Sync</h2>
              <p className="text-xl text-gray-400 font-medium">Seamlessly transition between your phone, desktop, and smart speakers without missing a beat.</p>
            </div>
            <div className="emil-enter">
              <h2 className="font-bricolage text-5xl md:text-6xl font-bold tracking-tight mb-4">Neural Discovery</h2>
              <p className="text-xl text-gray-400 font-medium">Our AI doesn't just look at genre—it analyzes BPM, sonic texture, and rhythm to find your next favorite track.</p>
            </div>
          </div>

          <div className="relative h-[800px] hidden md:block">
             <div className="absolute top-[10%] right-[10%] w-64 aspect-square rounded-xl overflow-hidden shadow-2xl album-float-1 border border-gray-800">
               <img src="https://picsum.photos/seed/eaf27e56/1200/800" className="w-full h-full object-cover" alt="Album 1" />
             </div>
             <div className="absolute top-[40%] left-[5%] w-72 aspect-square rounded-xl overflow-hidden shadow-2xl album-float-2 border border-gray-800 z-20" style={{ borderColor: mint }}>
               <img src="https://picsum.photos/seed/6ed4b141/1200/800" className="w-full h-full object-cover" alt="Album 2" />
             </div>
             {/* Replaced broken image with a working neon aesthetic music image */}
             <div className="absolute bottom-[10%] right-[20%] w-56 aspect-square rounded-xl overflow-hidden shadow-2xl album-float-3 border border-gray-800">
               <img src="https://picsum.photos/seed/598df7ed/1200/800" className="w-full h-full object-cover" alt="Album 3" />
             </div>
          </div>
        </div>
      </section>

      {/* 6. EXPANDED FOOTER */}
      <footer className="relative w-full pt-40 pb-20 px-6 md:px-12 z-30 flex flex-col border-t" style={{ borderColor: 'rgba(42,245,200,0.1)', backgroundColor: '#0a0a0a' }}>
         <div className="max-w-[1400px] mx-auto w-full">
            
            {/* Huge CTA */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 mb-32 emil-enter">
               <h1 className="font-bricolage text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none" style={{ color: mint }}>
                  JOIN AURA.
               </h1>
               <div className="flex flex-col gap-6">
                  <p className="text-xl text-gray-400 max-w-sm">
                     Experience the highest fidelity audio. Get your first month completely free.
                  </p>
                  <button className="emil-btn px-10 py-5 rounded-full font-bricolage text-2xl font-bold text-black shadow-[0_0_30px_rgba(42,245,200,0.3)] w-fit" style={{ backgroundColor: mint }}>
                     Start Free Trial
                  </button>
               </div>
            </div>

            {/* Link Grids */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 emil-enter">
               <div className="flex flex-col gap-4">
                  <h4 className="font-bricolage font-bold text-xl mb-4" style={{ color: mint }}>Company</h4>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Jobs</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">For the Record</a>
               </div>
               <div className="flex flex-col gap-4">
                  <h4 className="font-bricolage font-bold text-xl mb-4" style={{ color: mint }}>Communities</h4>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">For Artists</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Developers</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Advertising</a>
               </div>
               <div className="flex flex-col gap-4">
                  <h4 className="font-bricolage font-bold text-xl mb-4" style={{ color: mint }}>Useful Links</h4>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Web Player</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Free Mobile App</a>
               </div>
               <div className="flex flex-col gap-6">
                  <h4 className="font-bricolage font-bold text-xl mb-2" style={{ color: mint }}>Stay Tuned</h4>
                  <p className="text-gray-400 text-sm">Subscribe to our newsletter for exclusive drops.</p>
                  <div className={`flex bg-gray-900 rounded-full p-1 border border-gray-800 focus-within:border-[${mint}] transition-colors`}>
                     <input type="email" placeholder="Email address" className="bg-transparent border-none outline-none px-4 text-sm w-full text-white" />
                     <button className="emil-btn p-3 rounded-full text-black" style={{ backgroundColor: mint }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                     </button>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-semibold text-gray-500 text-sm emil-enter">
               <div className="flex gap-8">
                  <a href="#" className="hover:text-white transition-colors">Legal</a>
                  <a href="#" className="hover:text-white transition-colors">Privacy Center</a>
                  <a href="#" className="hover:text-white transition-colors">Cookies</a>
               </div>
               <div className="flex gap-6 text-white">
                  <a href="#" className={`emil-btn hover:text-[${mint}] transition-colors`}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className={`emil-btn hover:text-[${mint}] transition-colors`}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                  </a>
               </div>
               <div>© {new Date().getFullYear()} Aura Music. All rights reserved.</div>
            </div>
         </div>
      </footer>

    </div>
  );
}
