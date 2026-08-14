"use client";

import React, { useState, useEffect, useRef } from "react";
import { Palette } from "@/data/palettes";
import { Newsreader, Work_Sans } from "next/font/google";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { Leaf, ArrowRight, Globe, Wind, Droplets, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"] });
const workSans = Work_Sans({ subsets: ["latin"] });

// Organic delayed blossoming ease
const ORGANIC_EASE: [number, number, number, number] = [0.5, 0, 0, 1];

// A component that counts up rapidly to simulate real-time global impact
const LiveCounter = () => {
  const [count, setCount] = useState(148293402);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add 1 to 5 trees every 300ms
      setCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("text-5xl md:text-8xl lg:text-9xl tracking-tighter tabular-nums", newsreader.className)}>
      {count.toLocaleString()}
    </div>
  );
};

// A branch component that sprouts from the center root
const Branch = ({ 
  direction = "right", 
  delay = 0,
  children 
}: { 
  direction?: "left" | "right", 
  delay?: number,
  children: React.ReactNode 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className={cn("relative w-full flex", direction === "left" ? "justify-end pr-8 md:pr-16 lg:pr-32" : "justify-start pl-8 md:pl-16 lg:pl-32")}>
      {/* The Branch Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: ORGANIC_EASE, delay }}
        style={{ originX: direction === "left" ? 1 : 0 }}
        className={cn(
          "absolute top-8 h-[2px] w-8 md:w-16 lg:w-32 bg-current opacity-30",
          direction === "left" ? "right-0" : "left-0"
        )}
      />
      
      {/* The Sprouting Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 1.2, ease: ORGANIC_EASE, delay: delay + 0.3 }}
        className={cn("relative z-10 max-w-md", direction === "left" ? "text-right" : "text-left")}
      >
        {children}
      </motion.div>
    </div>
  );
};

export function ReforestationNonprofitDemo({ palette }: { palette: Palette }) {
  const [sage, forest] = palette.colors; // #ABCBA2, #1A2417
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring physics for the root to make its growth feel thick and substantial
  const rootProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const rootHeight = useTransform(rootProgress, [0, 1], ["0%", "100%"]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative min-h-[400vh] w-full selection:bg-[#ABCBA2] selection:text-[#1A2417] overflow-x-hidden",
        workSans.className
      )}
      style={{ backgroundColor: forest, color: sage }}
    >
      {/* GLOBAL HEADER */}
      <header className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
        <Link 
          href="/color-combo" 
          className="pointer-events-auto text-sm font-bold tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          ← GALLERY
        </Link>
        <div className="flex items-center gap-6 pointer-events-auto text-xs font-bold tracking-widest uppercase">
          <button className="hover:opacity-70 transition-opacity">Our Mission</button>
          <button className="px-5 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors">
            Donate
          </button>
        </div>
      </header>

      {/* THE LIVING ROOT SYSTEM (CENTRAL AXIS) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="w-full h-full bg-current opacity-20" />
        <motion.div 
          className="absolute top-0 left-0 w-full bg-current shadow-[0_0_15px_rgba(171,203,162,0.8)]"
          style={{ 
            height: rootHeight,
            transformOrigin: "top"
          }}
        />
      </div>

      <div className="relative z-10 pointer-events-none">
        
        {/* SECTION 1: THE SEED (HERO) */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-32 px-4 pointer-events-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: ORGANIC_EASE }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full border border-current opacity-60">
              <Leaf size={24} />
            </div>
            
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase mb-8 opacity-80">
              Real-Time Global Impact
            </h2>
            
            <LiveCounter />
            
            <div className={cn("text-2xl md:text-4xl italic mt-6 mb-12 opacity-90", newsreader.className)}>
              Trees planted. And counting.
            </div>

            <p className="max-w-xl text-center text-lg opacity-80 mb-12 leading-relaxed">
              We are a decentralized coalition of communities restoring the earth's lungs. One sapling, one acre, one forest at a time.
            </p>

            <button className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: sage, color: forest }}>
              Plant a Seed <ArrowRight size={18} />
            </button>
          </motion.div>

        </section>

        {/* SECTION 2: THE ROOTS (IMPACT SHOWCASE) */}
        <section className="min-h-screen w-full py-32 pointer-events-auto">
          <div className="max-w-5xl mx-auto w-full relative">
            
            <div className="mb-[20vh]">
              <Branch direction="left">
                <div className="flex flex-col items-end">
                  <Globe size={32} className="mb-4 opacity-50" />
                  <h3 className={cn("text-5xl md:text-7xl mb-4", newsreader.className)}>120+</h3>
                  <p className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2">Ecosystems Restored</p>
                  <p className="opacity-60 text-sm max-w-[250px] leading-relaxed">
                    From the Amazon basin to the boreal forests of Canada, establishing self-sustaining biomes.
                  </p>
                </div>
              </Branch>
            </div>

            <div className="mb-[20vh]">
              <Branch direction="right">
                <div className="flex flex-col items-start">
                  <Wind size={32} className="mb-4 opacity-50" />
                  <h3 className={cn("text-5xl md:text-7xl mb-4", newsreader.className)}>40M</h3>
                  <p className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2">Tons CO₂ Offset</p>
                  <p className="opacity-60 text-sm max-w-[250px] leading-relaxed">
                    Verified atmospheric carbon drawn down and locked safely into the soil and living wood.
                  </p>
                </div>
              </Branch>
            </div>

            <div className="mb-[10vh]">
              <Branch direction="left">
                <div className="flex flex-col items-end">
                  <Droplets size={32} className="mb-4 opacity-50" />
                  <h3 className={cn("text-5xl md:text-7xl mb-4", newsreader.className)}>8k+</h3>
                  <p className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2">Local Farmers</p>
                  <p className="opacity-60 text-sm max-w-[250px] leading-relaxed">
                    Creating sustainable livelihoods by paying indigenous communities to protect and nurture the canopy.
                  </p>
                </div>
              </Branch>
            </div>

          </div>
        </section>

        {/* SECTION 3: THE CANOPY (ACTIVE PROJECTS) */}
        <section className="min-h-screen w-full py-32 pointer-events-auto relative z-20 bg-[#1A2417]">
          <div className="max-w-6xl mx-auto px-6 w-full text-center mb-24">
            <h2 className={cn("text-5xl md:text-7xl mb-6", newsreader.className)}>The Canopy.</h2>
            <p className="opacity-70 max-w-2xl mx-auto text-lg">Explore our active reforestation sites globally. 100% of public donations go directly to funding these critical nurseries.</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "madagascar", name: "Madagascar", desc: "Mangrove Restoration", img: "https://picsum.photos/seed/5de82014/1200/800" },
              { id: "amazon", name: "The Amazon", desc: "Rainforest Protection", img: "https://picsum.photos/seed/61fc5a8f/1200/800" },
              { id: "pnw", name: "Pacific Northwest", desc: "Wildfire Recovery", img: "https://picsum.photos/seed/2f35a240/1200/800" },
            ].map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: ORGANIC_EASE, delay: i * 0.2 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
              >
                {/* Image */}
                <div className="absolute inset-0 bg-black">
                  <img 
                    src={project.img} 
                    alt={project.name} 
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-40 group-hover:mix-blend-normal"
                  />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className={cn("text-3xl mb-2", newsreader.className)}>{project.name}</h3>
                    <p className="text-xs font-bold tracking-widest uppercase opacity-70">{project.desc}</p>
                  </div>
                  
                  {/* Hover Donation Prompt */}
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-3 font-bold text-sm tracking-widest uppercase translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.5,0,0,1]">
                      Fund this site <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: GROUNDED FOUNDATION (FOOTER) */}
        <footer className="pt-32 pb-12 px-6 md:px-12 w-full max-w-7xl mx-auto pointer-events-auto border-t" style={{ borderColor: 'rgba(171,203,162,0.2)' }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Leaf size={24} />
                <span className={cn("text-2xl", newsreader.className)}>CanopyOrg</span>
              </div>
              <p className="opacity-60 text-sm leading-relaxed max-w-xs">
                A registered 501(c)(3) nonprofit dedicated to restoring the earth's natural balance through scientific, community-led reforestation.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-6 opacity-50">Action</h4>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li><a href="#" className="hover:opacity-70 transition-opacity">Donate Now</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Start a Fundraiser</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Corporate Partnerships</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Volunteer</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-6 opacity-50">Transparency</h4>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li><a href="#" className="hover:opacity-70 transition-opacity">Annual Reports</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Financials</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Scientific Methodology</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Board of Directors</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-6 opacity-50">Follow</h4>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li><a href="#" className="hover:opacity-70 transition-opacity">Instagram</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">Twitter / X</a></li>
                <li><a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t opacity-40 text-xs font-bold tracking-widest uppercase" style={{ borderColor: 'rgba(171,203,162,0.2)' }}>
            <span>© {new Date().getFullYear()} CanopyOrg. Planted in Oregon.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
