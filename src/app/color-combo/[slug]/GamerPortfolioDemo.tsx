"use client";

import React, { useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Orbitron, Rajdhani } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const orbitron = Orbitron({ weight: ["400", "700", "900"], subsets: ["latin"] });
const rajdhani = Rajdhani({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-rajdhani" });

export default function GamerPortfolioDemo({ palette }: { palette: Palette }) {
  const [yellow, blue] = palette.colors; // yellow: #EFD359, blue: #245BFD
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Elastic/Bouncy reveals for HUD panels
    const panels = gsap.utils.toArray(".hud-panel");
    panels.forEach((el: any) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "elastic.out(1, 0.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        }
      });
    });

    // Horizontal scroll for clips reel
    const reel = document.querySelector(".clips-reel-track");
    if (reel) {
      gsap.to(reel, {
        x: () => -(reel.scrollWidth - window.innerWidth + 48), // 48 is padding
        ease: "none",
        scrollTrigger: {
          trigger: ".clips-reel-section",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });
    }

    // Floating animation for stats cards
    gsap.to(".hud-float", {
      y: -10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.3,
        from: "random"
      }
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${orbitron.className} ${rajdhani.variable} selection:bg-[${yellow}] selection:text-[${blue}] overflow-hidden`}
      style={{
        backgroundColor: blue,
        color: yellow,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --hud-glow: 0 0 15px ${yellow}40, 0 0 30px ${yellow}20;
          --hud-glow-hover: 0 0 20px ${yellow}80, 0 0 40px ${yellow}40;
          --hud-border: 2px solid ${yellow}80;
        }

        .hud-bg-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .hud-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, ${yellow}15 1px, transparent 1px),
            linear-gradient(to bottom, ${yellow}15 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
        }

        .hud-panel {
          background: ${blue}CC;
          backdrop-filter: blur(8px);
          border: var(--hud-border);
          box-shadow: var(--hud-glow);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        /* Sci-fi corner cut accents */
        .hud-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 20px; height: 2px;
          background: ${yellow};
          box-shadow: 0 0 10px ${yellow};
        }
        .hud-panel::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 2px; height: 20px;
          background: ${yellow};
          box-shadow: 0 0 10px ${yellow};
        }

        .hud-btn {
          background: transparent;
          color: ${yellow};
          border: 2px solid ${yellow};
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .hud-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: ${yellow};
          transition: transform 0.3s ease;
          z-index: -1;
          transform: skewX(-15deg);
        }
        .hud-btn:hover {
          color: ${blue};
          box-shadow: var(--hud-glow-hover);
          transform: scale(1.05);
        }
        .hud-btn:hover::before {
          transform: skewX(-15deg) translateX(120%);
        }

        .glitch-text {
          position: relative;
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 red; /* Just a tiny red chromatic aberration, or we can use blue/yellow */
          text-shadow: -2px 0 ${blue};
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 ${yellow};
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(10px, 9999px, 30px, 0); transform: translate(0); }
          20% { clip: rect(50px, 9999px, 80px, 0); transform: translate(-2px, 1px); }
          40% { clip: rect(20px, 9999px, 50px, 0); transform: translate(2px, -1px); }
          60% { clip: rect(70px, 9999px, 100px, 0); transform: translate(-1px, 2px); }
          80% { clip: rect(30px, 9999px, 60px, 0); transform: translate(1px, -2px); }
          100% { clip: rect(90px, 9999px, 120px, 0); transform: translate(0); }
        }

        .font-ui {
          font-family: var(--font-rajdhani), sans-serif;
        }

        .image-duotone {
          filter: grayscale(100%) contrast(1.2);
          mix-blend-mode: hard-light;
        }
      `}} />

      <div className="hud-bg-noise" />
      <div className="absolute inset-0 hud-grid opacity-50 z-0 pointer-events-none" />

      {/* NAV / TOP BAR */}
      <nav className="relative z-50 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xl" style={{ borderColor: yellow, boxShadow: `0 0 15px ${yellow}40` }}>
            ZX
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest uppercase">ZED_XROSS</h1>
            <div className="flex items-center gap-2 text-sm font-ui font-semibold opacity-80">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: yellow }} />
              SYSTEM.ONLINE
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 font-ui text-lg font-bold uppercase tracking-wider">
          <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">Archive</a>
          <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">Loadout</a>
          <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">Comms</a>
        </div>
        
        <button className="hud-btn hidden md:block">INITIATE_SYNC</button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 w-full min-h-[80vh] flex flex-col justify-center items-center px-6 text-center">
        <div className="hud-panel p-2 px-6 mb-8 rounded-full font-ui font-bold tracking-widest text-sm md:text-base flex items-center gap-3">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: yellow }} />
          BROADCASTING TO 14.2K VIEWERS
        </div>
        
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6 leading-none glitch-text" data-text="NO-HIT RUN">
          NO-HIT RUN
        </h2>
        
        <p className="font-ui text-xl md:text-2xl font-medium max-w-2xl opacity-90 mb-12">
          Speedrunner. Challenge Runner. Currently attempting the impossible in Void Crawler.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className={`hud-btn flex items-center justify-center gap-3 !bg-[${yellow}] !text-[${blue}] hover:!bg-transparent hover:!text-[${yellow}]`} style={{ backgroundColor: yellow, color: blue }}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            WATCH LIVE
          </button>
          <button className="hud-btn flex items-center justify-center gap-3">
            SUBSCRIBE_
          </button>
        </div>

        {/* Floating tech elements */}
        <div className="absolute top-1/4 left-[10%] w-32 h-32 border border-dashed rounded-full hud-float opacity-30 pointer-events-none" style={{ borderColor: yellow, animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-[10%] w-48 h-48 border border-dotted rounded-full hud-float opacity-20 pointer-events-none" style={{ borderColor: yellow, animationDuration: '4s' }} />
      </section>

      {/* HIGHLIGHT REEL (Horizontal Scroll) */}
      <section className="clips-reel-section h-screen bg-black/20 border-y relative z-10 overflow-hidden" style={{ borderColor: `${yellow}40` }}>
        <div className="absolute top-8 left-8 z-20">
          <h3 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-8" style={{ backgroundColor: yellow }} />
            DATABANKS // HIGHLIGHTS
          </h3>
        </div>

        <div className="clips-reel-track h-full flex items-center gap-8 px-8 w-[300vw] md:w-[200vw]">
          {[
            { title: "VOID CRAWLER WR 12:04", views: "1.2M", time: "12:04" },
            { title: "FLAWLESS BOSS RUSH", views: "850K", time: "45:12" },
            { title: "THE IMPOSSIBLE JUMP", views: "2.1M", time: "01:30" },
            { title: "GLITCHLESS ANY%", views: "500K", time: "55:00" },
          ].map((clip, i) => (
            <div key={i} className="hud-panel w-[80vw] md:w-[45vw] aspect-video flex-shrink-0 group cursor-pointer">
              <div className="absolute inset-0 bg-black">
                <img 
                  src={`https://picsum.photos/seed/00a4a6ab/1200/800}`}
                  alt={clip.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                />
              </div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="self-end font-ui font-bold text-lg px-3 py-1 bg-black/50 backdrop-blur rounded border" style={{ borderColor: `${yellow}80` }}>
                  {clip.time}
                </div>
                <div>
                  <div className="font-ui font-bold text-sm uppercase opacity-80 mb-1">{clip.views} VIEWS</div>
                  <h4 className="text-2xl md:text-3xl font-bold uppercase">{clip.title}</h4>
                </div>
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm bg-black/20">
                <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center" style={{ borderColor: yellow, boxShadow: `0 0 30px ${yellow}` }}>
                  <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS & ACHIEVEMENTS */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-bold uppercase text-center mb-16 tracking-widest">
          PLAYER_STATS
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "HOURS LOGGED", val: "10,492", sub: "IN VOID CRAWLER" },
            { label: "WORLD RECORDS", val: "04", sub: "CURRENTLY HELD" },
            { label: "TOURNAMENT WINS", val: "12", sub: "GLOBAL RANKING #3" },
            { label: "COMMUNITY", val: "2.5M", sub: "SYNDICATE MEMBERS" },
          ].map((stat, i) => (
            <div key={i} className="hud-panel hud-float p-8 text-center flex flex-col justify-center border-t-4" style={{ borderTopColor: yellow, animationDelay: `${i * 0.2}s` }}>
              <div className="font-ui font-bold opacity-70 mb-4 tracking-widest">{stat.label}</div>
              <div className="text-5xl md:text-6xl font-black mb-2">{stat.val}</div>
              <div className="font-ui text-sm font-semibold uppercase opacity-50">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMAND CENTER FOOTER */}
      <footer className="relative z-10 border-t-2 mt-20 pt-20 pb-10 px-6 md:px-12 bg-black/30 backdrop-blur-md" style={{ borderColor: yellow }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="hud-panel p-6 border-none bg-transparent shadow-none">
            <h4 className="text-3xl font-black uppercase mb-6 tracking-widest">ZED_XROSS</h4>
            <p className="font-ui opacity-80 mb-8 max-w-xs leading-relaxed font-medium text-lg">
              Pushing the limits of what's possible in digital realms. Join the Syndicate and witness the impossible.
            </p>
            <div className="flex gap-4">
              {['TWITCH', 'YOUTUBE', 'DISCORD', 'X'].map(social => (
                <div key={social} className="px-3 py-1 font-ui font-bold text-sm border rounded cursor-pointer hover:bg-white/10" style={{ borderColor: yellow }}>
                  {social}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-ui font-bold text-xl mb-6 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: yellow }} />
              TRANSMISSIONS
            </h5>
            <ul className="flex flex-col gap-4 font-ui font-semibold text-lg opacity-80">
              <li><a href="#" className="hover:text-white transition-colors">STREAM SCHEDULE</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LATEST VODS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">MERCH DROP_03</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BUSINESS INQUIRIES</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-ui font-bold text-xl mb-6 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: yellow }} />
              HARDWARE
            </h5>
            <ul className="flex flex-col gap-4 font-ui font-semibold text-lg opacity-80">
              <li className="flex justify-between border-b pb-2" style={{ borderColor: `${yellow}40` }}><span>CPU</span> <span>NEURAL X9</span></li>
              <li className="flex justify-between border-b pb-2" style={{ borderColor: `${yellow}40` }}><span>GPU</span> <span>RTX 9090 TI</span></li>
              <li className="flex justify-between border-b pb-2" style={{ borderColor: `${yellow}40` }}><span>MOUSE</span> <span>CYBER-AIM PRO</span></li>
              <li className="flex justify-between border-b pb-2" style={{ borderColor: `${yellow}40` }}><span>KEYBOARD</span> <span>MECH-TACTIC 60</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-ui font-bold text-xl mb-6 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: yellow }} />
              JOIN NETWORK
            </h5>
            <p className="font-ui opacity-80 mb-4 text-sm font-semibold">Get notified about surprise streams and exclusive drops.</p>
            <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ENTER_EMAIL" 
                className="bg-black/50 border px-4 py-3 font-ui font-bold focus:outline-none placeholder:opacity-50 rounded"
                style={{ borderColor: yellow, color: yellow }}
              />
              <button type="submit" className="hud-btn text-center">
                INITIALIZE
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t flex flex-col md:flex-row justify-between items-center gap-4 pt-6 font-ui font-bold text-sm uppercase tracking-widest opacity-60" style={{ borderColor: `${yellow}40` }}>
          <div>© {new Date().getFullYear()} ZED_XROSS SYNDICATE. ALL SYSTEMS NOMINAL.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">TERMS_OF_SERVICE</a>
            <a href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
