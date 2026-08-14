"use client";

import React, { useState, useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Teko, Titillium_Web } from "next/font/google";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { Rocket, Target, Orbit, ArrowUpRight, Shield, Zap, Crosshair, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const teko = Teko({ weight: ["400", "600"], subsets: ["latin"] });
const titillium = Titillium_Web({ weight: ["200", "400", "700"], subsets: ["latin"] });

// Thrust Ease (Starts extremely slow overcoming gravity, then massive acceleration)
const THRUST_EASE: [number, number, number, number] = [1, 0, 0, 1];

// A ticking countdown for the hero section
const TMinusCountdown = () => {
  const [seconds, setSeconds] = useState(10);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setLaunched(true);
    }
  }, [seconds]);

  return (
    <div className={cn("text-8xl md:text-[12rem] font-bold leading-none tracking-tighter tabular-nums", teko.className)}>
      T-{seconds < 10 ? `0${seconds}` : seconds}
      {launched && <span className="text-4xl absolute ml-4 mt-8 animate-pulse text-red-500">IGNITION</span>}
    </div>
  );
};

export function AerospaceDemo({ palette }: { palette: Palette }) {
  const [cosmicBlue, nearWhite] = palette.colors; // #021F94, #F5F2F3
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Telemetry mappings
  const altitudeRaw = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const velocityRaw = useTransform(scrollYProgress, [0, 1], [0, 28000]);
  
  // Smooth the telemetry data so it feels like real physical sensors catching up
  const altitude = useSpring(altitudeRaw, { stiffness: 50, damping: 20 });
  const velocity = useSpring(velocityRaw, { stiffness: 40, damping: 15 });

  const [displayAlt, setDisplayAlt] = useState(0);
  const [displayVel, setDisplayVel] = useState(0);

  useEffect(() => {
    return altitude.onChange(v => setDisplayAlt(Math.floor(v)));
  }, [altitude]);

  useEffect(() => {
    return velocity.onChange(v => setDisplayVel(Math.floor(v)));
  }, [velocity]);

  // Background color darkens as we approach space
  const bgColor = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5, 1], 
    ["#1A3BC4", "#0A1F75", "#040D36", "#010515"]
  );

  return (
    <motion.div 
      ref={containerRef}
      className={cn(
        "relative min-h-[400vh] w-full selection:bg-[#F5F2F3] selection:text-[#021F94] overflow-x-hidden",
        titillium.className
      )}
      style={{ backgroundColor: bgColor, color: nearWhite }}
    >
      {/* 1. FIXED TELEMETRY HUD */}
      <div className="fixed top-0 left-0 bottom-0 w-16 md:w-24 border-r border-white/20 z-50 flex flex-col justify-between items-center py-8 pointer-events-none mix-blend-difference bg-transparent">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto transform -rotate-90 text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity whitespace-nowrap mt-8"
        >
          [ESC] Abort
        </Link>

        {/* Vertical Trajectory Line */}
        <div className="flex-1 w-[2px] bg-white/20 my-8 relative">
          <motion.div 
            className="absolute bottom-0 w-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

        <div className="flex flex-col gap-8 items-center">
          <div className="transform -rotate-90 text-xs font-bold tracking-widest whitespace-nowrap">
            ALT: {displayAlt.toString().padStart(3, '0')} KM
          </div>
          <div className="transform -rotate-90 text-xs font-bold tracking-widest whitespace-nowrap text-red-400">
            VEL: {displayVel.toLocaleString()} KM/H
          </div>
        </div>
      </div>

      {/* FIXED NAVIGATION (TOP RIGHT) */}
      <header className="fixed top-0 right-0 p-8 z-50 pointer-events-none mix-blend-difference flex gap-8">
        <div className="pointer-events-auto text-xs font-bold tracking-widest uppercase flex flex-col items-end gap-2 text-right">
          <a href="#" className="hover:text-red-400 transition-colors">Vehicles</a>
          <a href="#" className="hover:text-red-400 transition-colors">Missions</a>
          <a href="#" className="hover:text-red-400 transition-colors">Astronauts</a>
        </div>
      </header>

      {/* CONTENT SCROLL AREA */}
      <div className="pl-16 md:pl-24 w-full relative z-10">
        
        {/* T-MINUS 0: THE PAD (0KM) */}
        <section className="h-screen w-full flex flex-col justify-center px-8 md:px-24 border-b border-white/10 relative">
          <div className="max-w-4xl">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-red-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Pre-Launch Sequence
            </h2>
            <TMinusCountdown />
            <h1 className={cn("text-4xl md:text-6xl uppercase tracking-wider mt-4", teko.className)}>
              Aetherion Aerospace
            </h1>
            <p className="max-w-xl text-lg opacity-70 mt-6 leading-relaxed font-light">
              Designing fully reusable launch vehicles to establish permanent human presence in low earth orbit and beyond. The future is multi-planetary.
            </p>
          </div>
          <div className="absolute bottom-12 right-12 animate-bounce opacity-50 flex flex-col items-center gap-2 text-xs uppercase tracking-widest">
            Initiate Ascent <ChevronUp size={16} />
          </div>
        </section>

        {/* MAX Q: SPACECRAFT ENGINEERING (15KM) */}
        <section className="min-h-screen w-full flex flex-col justify-center py-32 px-8 md:px-24 border-b border-white/10">
          <div className="flex items-center gap-6 mb-16 opacity-50">
            <div className="h-[1px] w-12 bg-current" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">15KM : MAX Q : Structural Engineering</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Interactive SVG Diagram */}
            <div className="w-full lg:w-1/2 aspect-square relative flex justify-center items-center">
              {/* Massive background glow */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
              
              <svg viewBox="0 0 100 200" className="w-2/3 h-full overflow-visible drop-shadow-[0_0_20px_rgba(245,242,243,0.3)]">
                {/* Rocket Body */}
                <path d="M 50 10 C 60 20, 65 50, 65 150 L 35 150 C 35 50, 40 20, 50 10 Z" fill="transparent" stroke="currentColor" strokeWidth="1" className="opacity-80" />
                {/* Grid overlay */}
                <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" className="opacity-30" />
                <line x1="30" y1="100" x2="70" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" className="opacity-30" />
                
                {/* Engine Bells */}
                <path d="M 40 150 L 35 170 L 45 170 Z" fill="transparent" stroke="currentColor" strokeWidth="1" />
                <path d="M 50 150 L 45 170 L 55 170 Z" fill="transparent" stroke="currentColor" strokeWidth="1" />
                <path d="M 60 150 L 55 170 L 65 170 Z" fill="transparent" stroke="currentColor" strokeWidth="1" />

                {/* Hotspots */}
                <circle cx="50" cy="30" r="3" fill="#F87171" className="animate-pulse cursor-pointer" />
                <circle cx="63" cy="100" r="3" fill="#F87171" className="animate-pulse cursor-pointer" />
                <circle cx="50" cy="160" r="3" fill="#F87171" className="animate-pulse cursor-pointer" />
              </svg>

              {/* Data callouts */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: THRUST_EASE }}
                className="absolute top-1/4 -left-12 border border-white/20 p-4 bg-black/40 backdrop-blur-md"
              >
                <div className={cn("text-2xl uppercase", teko.className)}>Payload Fairing</div>
                <div className="text-[10px] uppercase tracking-widest text-red-400">Vol: 825m³</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: THRUST_EASE, delay: 0.2 }}
                className="absolute bottom-1/4 -right-12 border border-white/20 p-4 bg-black/40 backdrop-blur-md text-right"
              >
                <div className={cn("text-2xl uppercase", teko.className)}>Raptor Array</div>
                <div className="text-[10px] uppercase tracking-widest text-red-400">Thrust: 74,000 kN</div>
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 max-w-xl">
              <h2 className={cn("text-5xl md:text-7xl uppercase leading-[0.9] mb-8", teko.className)}>
                Built for Maximum Dynamic Pressure.
              </h2>
              <p className="text-lg opacity-70 mb-12 font-light leading-relaxed">
                As the vehicle breaches the sound barrier, aerodynamic stress peaks. Our proprietary carbon-composite architectures are engineered to withstand forces that would tear conventional rockets apart.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
                <div>
                  <Shield size={24} className="mb-4 text-red-400" />
                  <div className={cn("text-3xl uppercase", teko.className)}>Aero-Shell</div>
                  <p className="text-xs opacity-60">Thermal protection rating up to 3,000°C during atmospheric reentry.</p>
                </div>
                <div>
                  <Zap size={24} className="mb-4 text-red-400" />
                  <div className={cn("text-3xl uppercase", teko.className)}>Avionics</div>
                  <p className="text-xs opacity-60">Triple-redundant flight computers processing 4M inputs per second.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KARMAN LINE: MISSIONS (100KM) */}
        <section className="min-h-screen w-full flex flex-col justify-center py-32 px-8 md:px-24 border-b border-white/10">
          <div className="flex items-center gap-6 mb-16 opacity-50">
            <div className="h-[1px] w-12 bg-current" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">100KM : KARMAN LINE : Edge of Space</span>
          </div>

          <h2 className={cn("text-6xl md:text-8xl uppercase mb-16", teko.className)}>
            Flight Manifest
          </h2>

          <div className="flex flex-col gap-4">
            {[
              { id: "A-04", name: "Artemis Resupply", date: "Q3 2026", status: "Active Processing", orbit: "Lunar Transfer" },
              { id: "S-12", name: "Starlink Array deployment", date: "Q4 2026", status: "Vehicle Stacking", orbit: "Low Earth" },
              { id: "X-01", name: "Deep Space Observatory", date: "Q1 2027", status: "Payload Integration", orbit: "L2 Lagrange" },
            ].map((mission, i) => (
              <motion.div 
                key={mission.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: THRUST_EASE, delay: i * 0.1 }}
                className="group w-full flex flex-col md:flex-row md:items-center justify-between p-6 border border-white/10 bg-black/20 hover:bg-white hover:text-[#021F94] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-8 md:w-1/3 mb-4 md:mb-0">
                  <span className={cn("text-4xl text-red-500 group-hover:text-[#021F94]", teko.className)}>{mission.id}</span>
                  <span className="font-bold text-lg uppercase tracking-wider">{mission.name}</span>
                </div>
                
                <div className="flex flex-col gap-1 md:w-1/4">
                  <span className="text-[10px] uppercase tracking-widest opacity-50">Launch Window</span>
                  <span className="font-mono text-sm">{mission.date}</span>
                </div>

                <div className="flex flex-col gap-1 md:w-1/4">
                  <span className="text-[10px] uppercase tracking-widest opacity-50">Target Orbit</span>
                  <span className="text-sm font-bold tracking-widest uppercase">{mission.orbit}</span>
                </div>

                <div className="md:w-1/6 text-right flex items-center justify-end gap-2 text-xs font-bold tracking-widest uppercase">
                  {mission.status}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LEO: FOOTER / CAREERS (400KM) */}
        <section className="min-h-screen w-full flex flex-col justify-end py-16 px-8 md:px-24">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: THRUST_EASE }}
              className="relative"
            >
              {/* Massive orbital ring graphic */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border border-dashed border-white/10 rounded-full animate-[spin_90s_linear_infinite_reverse]" />
              
              <div className="flex items-center justify-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-blue-300 mb-8">
                <Target size={16} /> 400KM : LOW EARTH ORBIT
              </div>

              <h2 className={cn("text-7xl md:text-[10rem] uppercase leading-none tracking-tighter mb-12", teko.className)}>
                Join the Mission.
              </h2>
              
              <p className="max-w-2xl mx-auto text-lg opacity-70 mb-12 font-light">
                We are actively recruiting propulsion engineers, software architects, and mission controllers. The next great leap requires the sharpest minds on the planet.
              </p>
              
              <button className="px-12 py-5 bg-white text-[#021F94] font-bold tracking-widest uppercase text-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 mx-auto">
                View Open Roles <ArrowUpRight size={18} />
              </button>
            </motion.div>

          </div>

          {/* Pure Data Footer */}
          <footer className="w-full border-t border-white/20 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
            <div>© {new Date().getFullYear()} Aetherion Aerospace. Earth Division.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-100 transition-opacity">Manifesto</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Press Kit</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Supplier Portal</a>
            </div>
          </footer>
        </section>

      </div>
    </motion.div>
  );
}
