"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ScrollProgressNavbar({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll connected specifically to our internal container
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  
  return (
    <div className={cn("relative w-full h-[400px] overflow-hidden bg-[#0C1E29] border border-[#163648] font-mono", className)}>
      
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-[#FFFE15] origin-left z-50" 
        style={{ scaleX }} 
      />
      
      <nav className="absolute top-1 left-0 right-0 bg-[#0C1E29]/90 backdrop-blur-xl border-b border-[#163648] px-6 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2 text-[#FFFE15] font-bold tracking-widest uppercase">
          AnimFlow
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-[#E2E8F0]/70 uppercase tracking-widest">
          <button className="hover:text-[#FFFE15] transition-colors">Cards</button>
          <button className="hover:text-[#FFFE15] transition-colors">Backgrounds</button>
          <button className="hover:text-[#FFFE15] transition-colors">Gallery</button>
        </div>
        <button className="bg-[#FFFE15] text-[#0C1E29] px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
          Get
        </button>
      </nav>
      
      <div ref={containerRef} className="absolute inset-0 pt-20 px-8 pb-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-12 pb-32 pt-8 text-center">
          <h2 className="text-2xl font-bold text-[#E2E8F0] uppercase tracking-widest mb-16">
            Scroll down to test the <span className="text-[#FFFE15]">progress bar</span>
          </h2>
          
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="border-t border-[#163648] pt-12">
              <p className="text-[#E2E8F0]/40 text-sm leading-8 uppercase tracking-widest">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                · Block #{i + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
