"use client";

import React, { useRef, useEffect } from "react";
import { Palette } from "@/data/palettes";
import { Chivo, IBM_Plex_Mono } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const chivo = Chivo({ 
  weight: ["300", "400", "700", "900"], 
  subsets: ["latin"] 
});

const plexMono = IBM_Plex_Mono({ 
  weight: ["400", "500", "600"], 
  subsets: ["latin"], 
  variable: "--font-plex-mono" 
});

export default function LogisticsTradeDemo({ palette }: { palette: Palette }) {
  const [lemon, violet] = palette.colors; // lemon: #FCFCC0, violet: #8263EC
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Number counters
    const counters = gsap.utils.toArray(".stat-counter");
    counters.forEach((el: any) => {
      const targetNumber = parseInt(el.getAttribute("data-target"), 10);
      gsap.fromTo(el, 
        { innerHTML: 0 },
        {
          innerHTML: targetNumber,
          duration: 2,
          ease: "power4.out",
          snap: { innerHTML: 1 }, // Snap to whole numbers
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          onUpdate: function() {
            // Re-apply suffix if any (e.g. "+", "M")
            const suffix = el.getAttribute("data-suffix") || "";
            el.innerHTML = Math.round(this.targets()[0].innerHTML) + suffix;
          }
        }
      );
    });

    // Staggered reveals for grid items (sharp, precise)
    gsap.fromTo(".data-row", 
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".data-grid",
          start: "top 85%",
        }
      }
    );

    // SVG Line Draw (Shipping routes)
    gsap.fromTo(".route-line", 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power3.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".map-section",
          start: "top 70%",
        }
      }
    );

    // Continuous ticker tape
    gsap.to(".ticker-track", {
      xPercent: -50,
      ease: "none",
      duration: 80, // Much slower now
      repeat: -1
    });

    // Tech text reveals
    gsap.utils.toArray(".tech-reveal").forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          }
        }
      );
    });

    // Asset cards staggered reveal
    gsap.fromTo(".asset-card",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".asset-gallery-section",
          start: "top 80%",
        }
      }
    );

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`min-h-screen ${chivo.className} ${plexMono.variable} selection:bg-[${lemon}] selection:text-[${violet}] relative overflow-x-hidden`}
      style={{
        backgroundColor: violet,
        color: lemon,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .font-mono-ui {
          font-family: var(--font-plex-mono), monospace;
        }

        /* Tech/Grid aesthetics */
        .tech-grid {
          background-image: 
            linear-gradient(to right, ${lemon}15 1px, transparent 1px),
            linear-gradient(to bottom, ${lemon}15 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .tech-border {
          border: 1px solid ${lemon}40;
        }

        .tech-border-b {
          border-bottom: 1px solid ${lemon}40;
        }

        .btn-logistics {
          background-color: transparent;
          border: 1px solid ${lemon};
          color: ${lemon};
          font-family: var(--font-plex-mono), monospace;
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-logistics::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background-color: ${lemon};
          transition: transform 0.3s ease;
          z-index: 0;
        }
        .btn-logistics:hover::before {
          transform: translateX(100%);
        }
        .btn-logistics:hover {
          color: ${violet};
        }
        .btn-logistics span {
          position: relative;
          z-index: 1;
        }

        /* Ticker */
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: ${lemon};
          color: ${violet};
          border-top: 1px solid ${violet};
          border-bottom: 1px solid ${violet};
          white-space: nowrap;
          padding: 0.5rem 0;
        }
        .ticker-track {
          display: inline-block;
        }
        
        /* Map lines */
        .route-line {
          fill: none;
          stroke: ${lemon};
          stroke-width: 2;
          stroke-linecap: round;
        }
        .map-node {
          fill: ${lemon};
        }

        /* Radar scan line */
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .scan-line {
          animation: scan 3s linear infinite;
        }
      `}} />

      {/* TOP BAR / NAVIGATION */}
      <header className={`relative z-40 w-full flex flex-col md:flex-row justify-between items-start md:items-center p-6 tech-border-b bg-[${violet}]`}>
        <div className="text-3xl font-black tracking-tight mb-4 md:mb-0">
          NEXUS<span className="font-light">TRADE</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-12 font-mono-ui text-sm">
          <div className="flex flex-col">
            <span className="opacity-50 text-[10px]">SYSTEM STATUS</span>
            <span>[ ONLINE_OP ]</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-50 text-[10px]">ACTIVE ROUTES</span>
            <span>4,291</span>
          </div>
          <div className="flex flex-col">
            <span className="opacity-50 text-[10px]">GLOBAL TIME</span>
            <span>{new Date().toISOString().substring(11, 16)} UTC</span>
          </div>
        </div>

        <nav className="flex items-center gap-8 font-mono-ui text-sm uppercase tracking-wider">
          <a href="#" className="hover:opacity-70 transition-opacity">Services</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Network</a>
          <button className="btn-logistics text-xs py-2 px-4"><span>Track Cargo</span></button>
        </nav>
      </header>

      {/* TICKER TAPE */}
      <div className="ticker-wrap font-mono-ui text-xs font-bold uppercase tracking-widest">
        <div className="ticker-track">
          {Array(10).fill("Vessel 'TITAN' cleared custom (Rotterdam) // FLT-882 delayed 2hrs (Shanghai) // Container Capacity at 94% // ").map((text, i) => (
            <span key={i} className="mx-4">{text}</span>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full tech-grid tech-border-b">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono-ui text-sm mb-6 flex items-center gap-4 tech-reveal">
              <span className={`w-8 h-[1px] bg-[${lemon}]`} style={{ backgroundColor: lemon }} />
              B2B GLOBAL LOGISTICS
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase tech-reveal">
              Precision <br />
              <span className="font-light">in Transit.</span>
            </h1>
            <p className="font-mono-ui text-lg opacity-80 max-w-md mb-10 leading-relaxed tech-reveal">
              End-to-end supply chain infrastructure. We move capital equipment, industrial goods, and high-value freight across 150+ borders with absolute certainty.
            </p>
            <div className="flex gap-4 tech-reveal">
              <button className="btn-logistics"><span>Request Quote</span></button>
              <button className="btn-logistics border-none" style={{ backgroundColor: `${lemon}20` }}><span>View Network</span></button>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] tech-border p-2 tech-reveal">
            <div className="absolute top-4 left-4 font-mono-ui text-xs z-10 p-2 bg-black/50 backdrop-blur-sm text-white">CAM_01 // PORT OF SINGAPORE</div>
            <div className="absolute bottom-4 right-4 font-mono-ui text-xs z-10 p-2 bg-black/50 backdrop-blur-sm flex gap-2 text-white">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: lemon }} /> REC
            </div>
            <img 
              src="https://picsum.photos/seed/b30fc78e/1200/800" 
              alt="Cargo Ship" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* STATS & GLOBAL REACH (THE MAP) */}
      <section className="map-section relative py-32 border-b" style={{ borderColor: `${lemon}40` }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-12">Network <br/>Velocity</h2>
            
            <div className="flex flex-col gap-8 font-mono-ui border-l pl-6" style={{ borderColor: `${lemon}40` }}>
              <div>
                <div className="text-sm opacity-60 mb-1">ANNUAL TEU HANDLED</div>
                <div className="text-5xl font-medium"><span className="stat-counter" data-target="4">0</span><span data-suffix="M+">M+</span></div>
              </div>
              <div>
                <div className="text-sm opacity-60 mb-1">COUNTRIES OPERATED</div>
                <div className="text-5xl font-medium"><span className="stat-counter" data-target="152">0</span></div>
              </div>
              <div>
                <div className="text-sm opacity-60 mb-1">ON-TIME DELIVERY</div>
                <div className="text-5xl font-medium"><span className="stat-counter" data-target="99">0</span><span data-suffix=".8%">.8%</span></div>
              </div>
            </div>
          </div>
          
          <div className={`w-full lg:w-2/3 relative h-[400px] md:h-[600px] tech-border bg-[${violet}] flex items-center justify-center p-8 overflow-hidden`}>
            <div className="absolute inset-0 tech-grid opacity-50" />
            <svg viewBox="0 0 800 400" className="w-full h-full relative z-10">
              {/* Abstract Continents (Dots/Shapes) */}
              <path d="M100,150 Q120,100 200,120 T250,200" className="map-node" opacity="0.2" fill="none" stroke={lemon} strokeWidth="20" strokeDasharray="1 10" strokeLinecap="round" />
              <path d="M400,100 Q450,80 500,150 T480,250" className="map-node" opacity="0.2" fill="none" stroke={lemon} strokeWidth="20" strokeDasharray="1 10" strokeLinecap="round" />
              <path d="M600,150 Q650,120 700,180 T750,220" className="map-node" opacity="0.2" fill="none" stroke={lemon} strokeWidth="20" strokeDasharray="1 10" strokeLinecap="round" />
              
              {/* Animated Routes */}
              <path d="M150,150 Q250,50 450,120" className="route-line" />
              <circle cx="150" cy="150" r="4" fill={lemon} />
              <circle cx="450" cy="120" r="4" fill={lemon} />

              <path d="M450,120 Q550,200 650,160" className="route-line" />
              <circle cx="650" cy="160" r="4" fill={lemon} />

              <path d="M200,180 Q300,300 480,220" className="route-line" />
              <circle cx="200" cy="180" r="4" fill={lemon} />
              <circle cx="480" cy="220" r="4" fill={lemon} />
            </svg>
            
            {/* UI Overlay on Map */}
            <div className="absolute top-4 right-4 font-mono-ui text-xs text-right opacity-70">
              [ LIVE TRACKING ]<br/>
              NODE: ACTIVE
            </div>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE GALLERY */}
      <section className="asset-gallery-section py-32 px-6 max-w-7xl mx-auto border-b" style={{ borderColor: `${lemon}40` }}>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-16 tech-reveal">Physical <br/>Assets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "OCEAN FREIGHT", desc: "42 Ultra-Large Container Vessels", img: "https://picsum.photos/seed/b4e214e1/1200/800" },
            { title: "AIR CARGO", desc: "18 Boeing 777F Freighters", img: "https://picsum.photos/seed/a785ed81/1200/800" },
            { title: "WAREHOUSING", desc: "8.5M sq ft Bonded Storage", img: "https://picsum.photos/seed/f800204b/1200/800" }
          ].map((asset, i) => (
            <div key={i} className="asset-card tech-border p-4 relative group overflow-hidden cursor-crosshair">
              <div className="aspect-[4/5] relative overflow-hidden mb-4 tech-border">
                {/* Scanning line animation overlay */}
                <div className={`absolute inset-0 w-full h-1 bg-[${lemon}]/50 blur-[2px] scan-line z-20 pointer-events-none`} style={{ backgroundColor: lemon }} />
                <img 
                  src={asset.img} 
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="font-mono-ui">
                <div className="text-xs opacity-50 mb-1 tracking-widest">[ ASSET {i + 1} ]</div>
                <h3 className="text-xl font-bold uppercase mb-2">{asset.title}</h3>
                <p className="text-sm opacity-80">{asset.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES TABULAR GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-16">Operational <br/>Capabilities</h2>
        
        <div className="data-grid flex flex-col">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b font-mono-ui text-xs opacity-60 uppercase tracking-widest" style={{ borderColor: `${lemon}40` }}>
            <div className="col-span-1">ID</div>
            <div className="col-span-3">Service Unit</div>
            <div className="col-span-5">Technical Specification</div>
            <div className="col-span-3 text-right">Status</div>
          </div>

          {/* Data Rows */}
          {[
            { id: "SV-01", name: "Ocean Freight", spec: "FCL/LCL, Reefer, Breakbulk, Ro-Ro. Weekly sailings.", status: "AVAILABLE" },
            { id: "SV-02", name: "Air Cargo", spec: "Next-flight-out, Charters, Hand-carry solutions.", status: "AVAILABLE" },
            { id: "SV-03", name: "Customs Brokerage", spec: "Automated clearance, Tariff classification, Compliance.", status: "SYSTEM ONLINE" },
            { id: "SV-04", name: "Contract Logistics", spec: "Bonded warehousing, Vendor managed inventory.", status: "LIMITED CAP" }
          ].map((row, i) => (
            <div key={i} className="data-row relative grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b cursor-crosshair group items-center overflow-hidden" style={{ borderColor: `${lemon}40` }}>
              {/* Sliding background */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" style={{ backgroundColor: `${lemon}20` }} />
              
              <div className="col-span-1 font-mono-ui text-sm opacity-50 relative z-10">{row.id}</div>
              <div className="col-span-3 text-2xl font-bold uppercase relative z-10 group-hover:tracking-widest transition-all duration-500">{row.name}</div>
              <div className="col-span-5 font-mono-ui text-sm opacity-80 leading-relaxed relative z-10 group-hover:translate-x-2 transition-transform duration-500">{row.spec}</div>
              <div className="col-span-3 font-mono-ui text-sm md:text-right flex items-center md:justify-end gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full group-hover:animate-ping" style={{ backgroundColor: row.status === 'LIMITED CAP' ? 'transparent' : lemon, border: `1px solid ${lemon}` }} />
                {row.status}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 group-hover:translate-x-2 duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`tech-border-t pt-24 pb-8 px-6 bg-[${violet}]`} style={{ borderColor: lemon }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 font-mono-ui">
          
          <div className="lg:col-span-1 tech-reveal">
            <div className="text-2xl font-black tracking-tight mb-4 font-sans uppercase">NEXUS_TRADE</div>
            <p className="text-sm opacity-60 mb-6">
              Global Headquarters<br/>
              Terminal 4, Port Zone<br/>
              Rotterdam, NL
            </p>
            <div className="flex gap-4 text-xs">
              <a href="#" className="hover:underline">LINKEDIN</a>
              <a href="#" className="hover:underline">PORTAL</a>
            </div>
          </div>

          <div className="tech-reveal">
            <div className="text-xs uppercase opacity-50 mb-6 tracking-widest border-b pb-2 inline-block" style={{ borderColor: `${lemon}40` }}>Divisions</div>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:translate-x-2 transition-transform inline-block">Nexus Freight</a></li>
              <li><a href="#" className="hover:translate-x-2 transition-transform inline-block">Nexus Customs</a></li>
              <li><a href="#" className="hover:translate-x-2 transition-transform inline-block">Nexus Supply Chain</a></li>
            </ul>
          </div>

          <div className="tech-reveal">
            <div className="text-xs uppercase opacity-50 mb-6 tracking-widest border-b pb-2 inline-block" style={{ borderColor: `${lemon}40` }}>Legal</div>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:translate-x-2 transition-transform inline-block">Terms of Carriage</a></li>
              <li><a href="#" className="hover:translate-x-2 transition-transform inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:translate-x-2 transition-transform inline-block">Bill of Lading Terms</a></li>
            </ul>
          </div>

          <div className="tech-border p-6 relative tech-reveal overflow-hidden group">
            <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" style={{ backgroundColor: `${lemon}10` }} />
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l z-10" style={{ borderColor: lemon, transform: 'translate(-1px, -1px)' }} />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r z-10" style={{ borderColor: lemon, transform: 'translate(1px, -1px)' }} />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l z-10" style={{ borderColor: lemon, transform: 'translate(-1px, 1px)' }} />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r z-10" style={{ borderColor: lemon, transform: 'translate(1px, 1px)' }} />
            
            <div className="text-xs uppercase opacity-50 mb-4 tracking-widest relative z-10">Client Portal</div>
            <p className="text-sm opacity-80 mb-6 relative z-10">Access live tracking, documentation, and automated booking systems.</p>
            <button className="btn-logistics w-full text-xs relative z-10"><span>Login Securely</span></button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t flex flex-col md:flex-row justify-between pt-6 font-mono-ui text-xs opacity-50 tech-reveal" style={{ borderColor: `${lemon}20` }}>
          <div>© {new Date().getFullYear()} NEXUS TRADE LOGISTICS GMBH. ALL RIGHTS RESERVED.</div>
          <div className="mt-4 md:mt-0">SYS_VER: 4.9.2 // BUILD: 8841</div>
        </div>
      </footer>
    </div>
  );
}
