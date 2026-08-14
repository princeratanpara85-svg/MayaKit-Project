"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Familjen_Grotesk } from "next/font/google";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { 
  MapPin, 
  ChefHat, 
  Bike, 
  Package, 
  ArrowRight,
  Star,
  Clock,
  Smartphone,
  Navigation
} from "lucide-react";
import { cn } from "@/lib/utils";

const familjen = Familjen_Grotesk({ subsets: ["latin"] });

// Custom strong bezier curves as per Emil's philosophy
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

export function FoodDeliveryDemo({ palette }: { palette: Palette }) {
  const [cream, teal] = palette.colors; // #F3E5C3, #174E4F
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring physics for the delivery route line to make it feel alive and fluid
  const routeProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(routeProgress, [0, 1], ["0%", "100%"]);
  
  // Transform the bike icon down the line
  const bikeY = useTransform(routeProgress, [0, 1], ["0vh", "100vh"]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative min-h-[400vh] w-full selection:bg-[#F3E5C3] selection:text-[#174E4F] overflow-hidden",
        familjen.className
      )}
      style={{ backgroundColor: teal, color: cream }}
    >
      {/* GLOBAL ROUTE NARRATIVE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center sm:justify-start sm:pl-32 lg:pl-64">
        
        {/* Route Milestones */}
        <div className="absolute top-0 bottom-0 w-[240px] -ml-[260px] hidden lg:block">
          <motion.div 
            className="absolute right-0 flex items-center gap-4 text-xs font-bold tracking-widest uppercase"
            style={{ 
              top: "20%",
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0.3]),
              x: useTransform(scrollYProgress, [0, 0.1], [20, 0]),
            }}
          >
            Kitchen Set <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cream }} />
          </motion.div>
          
          <motion.div 
            className="absolute right-0 flex items-center gap-4 text-xs font-bold tracking-widest uppercase"
            style={{ 
              top: "50%",
              opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0.3]),
              x: useTransform(scrollYProgress, [0.3, 0.4], [20, 0]),
            }}
          >
            Route Optimized <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cream }} />
          </motion.div>
          
          <motion.div 
            className="absolute right-0 flex items-center gap-4 text-xs font-bold tracking-widest uppercase"
            style={{ 
              top: "80%",
              opacity: useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0.3]),
              x: useTransform(scrollYProgress, [0.7, 0.8], [20, 0]),
            }}
          >
            Doorstep Drop <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cream }} />
          </motion.div>
        </div>

        {/* The Track */}
        <div 
          className="h-full w-[2px] opacity-20"
          style={{ backgroundColor: cream }}
        />
        
        {/* The Active Route Line */}
        <motion.div 
          className="absolute top-0 w-[4px] -ml-[1px] shadow-[0_0_15px_rgba(243,229,195,0.8)]"
          style={{ 
            backgroundColor: cream,
            height: lineHeight,
            transformOrigin: "top"
          }}
        />

        {/* The Delivery Vehicle */}
        <motion.div 
          className="absolute -ml-[23px] flex items-center justify-center h-12 w-12 rounded-full border-4"
          style={{ 
            top: bikeY, 
            backgroundColor: teal,
            borderColor: cream,
            color: cream,
            marginTop: "-24px" // Offset center
          }}
        >
          <Bike size={20} className="relative z-10" />
        </motion.div>
      </div>

      {/* FLOATING PILL NAVBAR */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-md shadow-lg border w-11/12 max-w-xl transition-all duration-300" style={{ backgroundColor: 'rgba(23, 78, 79, 0.7)', borderColor: 'rgba(243, 229, 195, 0.2)', color: cream }}>
        <Link 
          href="/color-combo" 
          className="text-sm font-bold tracking-tight hover:scale-95 transition-transform duration-200 active:scale-[0.97]"
        >
          ← Gallery
        </Link>
        <div className="font-bold tracking-widest uppercase text-sm hidden sm:block">
          CraveDrop.
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:opacity-70 transition-opacity active:scale-[0.97]">Kitchens</a>
          <a href="#" className="hover:opacity-70 transition-opacity active:scale-[0.97]">Transit</a>
        </div>
      </header>

      {/* CONTENT SECTIONS */}
      <div className="relative z-10 pointer-events-none">
        
        {/* SECTION 1: THE CRAVING (HERO) */}
        <section className="h-screen w-full flex items-center pl-4 pr-4 sm:pl-48 lg:pl-80 pt-20 relative overflow-hidden">
          
          {/* Looping Decorator - Right Side */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 max-w-md hidden lg:flex flex-col gap-12 overflow-hidden pointer-events-none opacity-[0.15]">
            <motion.div 
              animate={{ y: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex flex-col gap-24 pt-24 items-center"
            >
              <Bike size={140} />
              <Package size={120} />
              <ChefHat size={130} />
              <MapPin size={110} />
              <Bike size={140} />
              <Package size={120} />
              <ChefHat size={130} />
              <MapPin size={110} />
            </motion.div>
          </div>

          <div className="max-w-3xl pointer-events-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase"
              style={{ backgroundColor: cream, color: teal }}
            >
              <MapPin size={16} /> Location Set
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter mb-8"
            >
              Craving <br />
              <span className="italic opacity-90">Solved.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
              className="text-xl sm:text-2xl max-w-xl opacity-80 mb-12 leading-relaxed"
            >
              The city's best local kitchens, mapped, tracked, and delivered to your doorstep in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
            >
              <button 
                className="group relative flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold rounded-full overflow-hidden transition-all duration-200 active:scale-[0.97]"
                style={{ backgroundColor: cream, color: teal }}
              >
                <span className="relative z-10">Start Order Journey</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
                <div className="absolute inset-0 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: THE KITCHEN (PARTNERS) */}
        <section className="min-h-screen w-full flex items-center pl-4 pr-4 sm:pl-48 lg:pl-80 py-32">
          <div className="w-full pointer-events-auto">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-12 w-12 rounded-full flex items-center justify-center border-2" style={{ borderColor: cream }}>
                <ChefHat size={24} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">The Kitchens.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl">
              {[
                { name: "Neon Noodle Bar", type: "Asian Fusion", time: "15-25 min", img: "https://picsum.photos/seed/ff4bbb96/1200/800" },
                { name: "Rustic Crust", type: "Woodfired Pizza", time: "20-35 min", img: "https://picsum.photos/seed/cd0db3f9/1200/800" },
                { name: "Green Leaf", type: "Vegan Bowls", time: "10-20 min", img: "https://picsum.photos/seed/ba1c0ea4/1200/800" },
                { name: "Midnight Burger", type: "Smash Burgers", time: "15-30 min", img: "https://picsum.photos/seed/5f83f88d/1200/800" }
              ].map((partner, i) => (
                <motion.div 
                  key={partner.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6 bg-black">
                    <img 
                      src={partner.img} 
                      alt={partner.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Image overlay badge */}
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-md" style={{ backgroundColor: 'rgba(23,78,79,0.8)', color: cream }}>
                      <Star size={12} className="fill-current" /> 4.9
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:underline underline-offset-4">{partner.name}</h3>
                      <p className="opacity-70 font-medium">{partner.type}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold opacity-90 border rounded-full px-3 py-1.5" style={{ borderColor: 'rgba(243,229,195,0.3)' }}>
                      <Clock size={14} /> {partner.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: THE TRANSIT (TRACKING) */}
        <section className="min-h-screen w-full flex items-center pl-4 pr-4 sm:pl-48 lg:pl-80 py-32">
          <div className="max-w-2xl pointer-events-auto">
             <div className="flex items-center gap-4 mb-16">
              <div className="h-12 w-12 rounded-full flex items-center justify-center border-2" style={{ borderColor: cream }}>
                <Navigation size={24} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">The Transit.</h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: EASE_IN_OUT }}
              className="p-8 sm:p-12 rounded-3xl mb-12 border-l-8"
              style={{ backgroundColor: cream, color: teal, borderColor: 'rgba(23,78,79,0.2)' }}
            >
              <h3 className="text-3xl font-bold mb-6">Live Route Tracking</h3>
              <p className="text-lg opacity-80 mb-8 leading-relaxed font-medium">
                Our predictive routing engine maps the fastest path from the kitchen to your couch, updating second by second. No guessing, no cold food.
              </p>
              
              <div className="flex flex-col gap-6 w-full max-w-sm relative">
                <div className="absolute left-3.5 top-5 bottom-5 w-0.5 opacity-20" style={{ backgroundColor: teal }} />
                
                <div className="flex items-center gap-6 relative z-10 opacity-50">
                  <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: teal, color: cream }}>
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <div className="font-bold">Order Confirmed</div>
                </div>
                
                <div className="flex items-center gap-6 relative z-10 opacity-50">
                  <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ backgroundColor: teal, color: cream }}>
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <div className="font-bold">Preparing Food</div>
                </div>

                <div className="flex items-center gap-6 relative z-10">
                  <div className="h-7 w-7 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(23,78,79,0.5)]" style={{ backgroundColor: teal, color: cream }}>
                    <Bike size={14} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Heading your way</div>
                    <div className="text-sm font-semibold opacity-70">Arriving in 8 mins</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: THE DOORSTEP (FOOTER) */}
        <footer className="min-h-screen w-full flex flex-col justify-end pl-4 pr-4 sm:pl-48 lg:pl-80 pb-20 pt-32 pointer-events-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-12 w-12 rounded-full flex items-center justify-center border-2" style={{ backgroundColor: cream, color: teal }}>
              <Package size={24} />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">The Doorstep.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-6xl mb-32 border-t-2 pt-16" style={{ borderColor: 'rgba(243,229,195,0.2)' }}>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Get the App</h3>
              <p className="opacity-70 mb-8 max-w-xs font-medium">Experience the fastest delivery in the city, straight from your pocket.</p>
              <div className="flex flex-col gap-4 max-w-[200px]">
                <button className="flex items-center gap-3 px-6 py-4 rounded-xl font-bold active:scale-95 transition-transform duration-200" style={{ backgroundColor: cream, color: teal }}>
                  <Smartphone size={20} /> App Store
                </button>
                <button className="flex items-center gap-3 px-6 py-4 rounded-xl font-bold border-2 active:scale-95 transition-all duration-200 hover:bg-white/5" style={{ borderColor: cream }}>
                  <Smartphone size={20} /> Play Store
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Partner With Us</h3>
              <ul className="flex flex-col gap-4 font-semibold text-lg opacity-80">
                <li><a href="#" className="hover:underline underline-offset-4">Add your restaurant</a></li>
                <li><a href="#" className="hover:underline underline-offset-4">Become a rider</a></li>
                <li><a href="#" className="hover:underline underline-offset-4">Corporate ordering</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Legal & Support</h3>
              <ul className="flex flex-col gap-4 font-semibold text-lg opacity-80">
                <li><a href="#" className="hover:underline underline-offset-4">Help Center</a></li>
                <li><a href="#" className="hover:underline underline-offset-4">Terms of Service</a></li>
                <li><a href="#" className="hover:underline underline-offset-4">Privacy Policy</a></li>
              </ul>
            </div>

          </div>

          <div className="text-[10vw] font-bold leading-none tracking-tighter opacity-10 uppercase flex justify-between w-full pr-10">
            <span>Crave</span>
            <span>Drop.</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
