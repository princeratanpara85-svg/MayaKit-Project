"use client";

import React, { useRef } from "react";
import { Palette } from "@/data/palettes";
import { Rokkitt, Cabin } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Droplet, Sprout, Wind, MapPin, Leaf, ShieldCheck, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const rokkitt = Rokkitt({ weight: ["400", "500", "700"], subsets: ["latin"] });
const cabin = Cabin({ weight: ["400", "500", "600"], subsets: ["latin"] });

// The Grounded Rise (Organic Easing)
const ORGANIC_EASE: any = [0.45, 0, 0.55, 1];

// Reusable Image Component (No Duotone)
function FarmImage({ src, className }: { src: string, className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div 
        className="w-full h-full bg-cover bg-center absolute inset-0"
        style={{ 
          backgroundImage: `url("${src}")`
        }}
      />
    </div>
  );
}

export function DairyFarmDemo({ palette }: { palette: Palette }) {
  const [teal, cream] = palette.colors; // #035352, #F3E8BC
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);
  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full selection:bg-[#035352] selection:text-[#F3E8BC] overflow-x-hidden",
        cabin.className
      )}
      style={{ backgroundColor: cream, color: teal }}
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-[#F3E8BC]">
        <Link 
          href="/color-combo" 
          className={cn("pointer-events-auto text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity", rokkitt.className)}
        >
          Oakhaven Farms
        </Link>
        <div className="flex gap-8 pointer-events-auto text-sm font-medium">
          <a href="#" className="hover:opacity-70 transition-opacity">Our Pastures</a>
          <a href="#" className="hover:opacity-70 transition-opacity">The Creamery</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Delivery</a>
        </div>
      </header>

      {/* 1. THE PASTURE (HERO) */}
      <section className="relative w-full min-h-[120vh] bg-[#F3E8BC] flex flex-col items-center justify-center pt-32 pb-48 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: ORGANIC_EASE }}
          className="text-center max-w-4xl px-8 relative z-20"
        >
          <div className="flex items-center justify-center gap-2 mb-6 opacity-60">
            <Sprout size={18} />
            <span className="uppercase tracking-widest text-xs font-semibold">Since 1924</span>
          </div>
          <h1 className={cn("text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] tracking-tight mb-8", rokkitt.className)}>
            Rooted in <br/>Respect.
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80 leading-relaxed">
            Wholesome, pasture-raised dairy from our family to your doorstep. Unhurried by time, uncompromised by industry.
          </p>
        </motion.div>

        {/* Hero Background Image */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0 opacity-100"
        >
          <FarmImage 
            src="https://images.unsplash.com/photo-OpMfiq8nPI0?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full"
          />
        </motion.div>

        {/* Sweeping Horizon Curve 1 */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32 md:h-64 fill-[#035352]">
            <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. THE NARRATIVE JOURNEY (PROCESS & HERITAGE) */}
      <section className="relative w-full bg-[#035352] text-[#F3E8BC] pb-48 z-20">
        
        {/* Continuous Milestone Path */}
        <svg className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-[100%] opacity-20 pointer-events-none" viewBox="0 0 32 3000" preserveAspectRatio="none">
          <motion.path 
            d="M16,0 C16,750 -16,1500 16,2250 C48,3000 16,3000 16,3000"
            fill="none" 
            stroke="#F3E8BC" 
            strokeWidth="4" 
            strokeDasharray="12 12"
            style={{ pathLength }}
          />
        </svg>

        <div className="max-w-6xl mx-auto px-8 py-32 space-y-48 relative z-10">
          
          {/* Section: Heritage & Family */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: ORGANIC_EASE }}
              className="flex-1"
            >
              <h2 className={cn("text-5xl md:text-7xl mb-6", rokkitt.className)}>Four Generations.</h2>
              <p className="text-xl opacity-80 leading-relaxed mb-6">
                What started as a modest herd of twelve cows in 1924 has grown into a community staple. We are still family-owned and operated, prioritizing soil health and animal welfare over mass production.
              </p>
              <ul className="space-y-4 opacity-70 text-lg">
                <li className="flex items-center gap-3"><Heart size={20} /> 100% Family Owned</li>
                <li className="flex items-center gap-3"><Leaf size={20} /> Certified Regenerative Organic</li>
                <li className="flex items-center gap-3"><ShieldCheck size={20} /> Hormone & Antibiotic Free</li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, ease: ORGANIC_EASE }}
              className="flex-1 w-full"
            >
              <FarmImage 
                src="https://images.unsplash.com/photo-nUCt1PjRNHE?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-96 rounded-3xl"
              />
            </motion.div>
          </div>

          {/* Section: The Pasture & Breed */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: ORGANIC_EASE }}
              className="flex-1"
            >
              <h2 className={cn("text-5xl md:text-7xl mb-6", rokkitt.className)}>The Pasture.</h2>
              <p className="text-xl opacity-80 leading-relaxed">
                Our herd consists primarily of Jersey and Guernsey cattle, breeds renowned for rich, creamy milk with naturally higher butterfat content. They spend over 300 days a year outdoors, grazing on wild clover, alfalfa, and native rye.
              </p>
            </motion.div>
            <div className="flex-1 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.5, ease: ORGANIC_EASE }}
                className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-[#F3E8BC]/20 flex items-center justify-center relative"
              >
                <div className="absolute inset-4 rounded-full border border-[#F3E8BC]/10 border-dashed" />
                <Wind size={48} className="opacity-40" />
              </motion.div>
            </div>
          </div>

          {/* Section: The Parlor & Process */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: ORGANIC_EASE }}
              className="flex-1"
            >
              <h2 className={cn("text-5xl md:text-7xl mb-6", rokkitt.className)}>The Parlor.</h2>
              <p className="text-xl opacity-80 leading-relaxed mb-6">
                Milking happens naturally, twice a day, in a calm and quiet environment. We never rush the process. It's a gentle rhythm that has dictated our lives for nearly a century. 
              </p>
              <p className="text-xl opacity-80 leading-relaxed">
                Our milk is vat-pasteurized at a lower temperature to preserve enzymes, flavor, and its natural nutritional profile. We never homogenize our milk, meaning the cream always rises to the top.
              </p>
            </motion.div>
            <div className="flex-1 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, rotate: 5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.5, ease: ORGANIC_EASE }}
                className="w-64 h-64 md:w-96 md:h-96 rounded-t-full border border-[#F3E8BC]/20 flex items-center justify-center relative bg-[#035352]"
              >
                <div className="absolute inset-4 rounded-t-full border border-[#F3E8BC]/10 border-dashed" />
                <Droplet size={48} className="opacity-40" />
              </motion.div>
            </div>
          </div>

        </div>

        {/* Sweeping Horizon Curve 2 */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32 md:h-64 fill-[#F3E8BC]">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 3. THE DOORSTEP (DELIVERY & FOOTER) */}
      <section className="relative w-full bg-[#F3E8BC] text-[#035352] pt-16 z-30 overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16 pb-32">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: ORGANIC_EASE }}
            className="flex-1 w-full order-2 md:order-1"
          >
             <FarmImage 
                src="https://picsum.photos/seed/5bdef485/1200/800" 
                className="w-full h-96 rounded-t-full rounded-b-3xl"
              />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: ORGANIC_EASE }}
            className="flex-1 order-1 md:order-2"
          >
            <div className="w-16 h-16 mb-8 rounded-full border border-[#035352]/20 flex items-center justify-center">
              <MapPin size={24} className="opacity-60" />
            </div>
            
            <h2 className={cn("text-6xl md:text-8xl mb-8", rokkitt.className)}>
              To Your Door.
            </h2>
            <p className="text-xl opacity-80 mb-12 leading-relaxed">
              Freshly pasteurized and bottled in traditional glass to preserve flavor and reduce plastic waste. Delivered directly to your doorstep before the sun comes up. Join our local delivery route today and taste the difference of true farm-fresh dairy.
            </p>

            <button className="px-12 py-5 bg-[#035352] text-[#F3E8BC] text-lg font-semibold rounded-full hover:opacity-90 transition-opacity">
              Check Availability
            </button>
          </motion.div>
        </div>

        {/* Dense Footer */}
        <footer className="mt-24 pt-24 pb-12 border-t border-[#035352]/20 px-8 bg-[#035352] text-[#F3E8BC]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2 pr-12">
                <h3 className={cn("text-4xl mb-6", rokkitt.className)}>Oakhaven Farms</h3>
                <p className="opacity-70 leading-relaxed mb-6 max-w-sm">
                  Dedicated to regenerative agriculture, animal welfare, and producing the highest quality dairy in the region since 1924.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#F3E8BC]/30 flex items-center justify-center opacity-80 hover:bg-[#F3E8BC] hover:text-[#035352] cursor-pointer transition-colors">fb</div>
                  <div className="w-10 h-10 rounded-full border border-[#F3E8BC]/30 flex items-center justify-center opacity-80 hover:bg-[#F3E8BC] hover:text-[#035352] cursor-pointer transition-colors">ig</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold tracking-widest uppercase text-xs opacity-50 mb-6">Products</h4>
                <ul className="space-y-4 opacity-80">
                  <li><a href="#" className="hover:underline">Creamline Whole Milk</a></li>
                  <li><a href="#" className="hover:underline">Heavy Whipping Cream</a></li>
                  <li><a href="#" className="hover:underline">Cultured Butter</a></li>
                  <li><a href="#" className="hover:underline">Artisan Cheeses</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold tracking-widest uppercase text-xs opacity-50 mb-6">The Farm</h4>
                <ul className="space-y-4 opacity-80">
                  <li><a href="#" className="hover:underline">Our Heritage</a></li>
                  <li><a href="#" className="hover:underline">Animal Welfare</a></li>
                  <li><a href="#" className="hover:underline">Sustainability Report</a></li>
                  <li><a href="#" className="hover:underline">Farm Tours</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#F3E8BC]/10 opacity-50 text-sm">
              <div>© {new Date().getFullYear()} Oakhaven Farms. All rights reserved.</div>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </section>

    </div>
  );
}
