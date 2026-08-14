"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], weight: ["900"] });

const PAGES: Record<string, { title: string; heading: string; text: string; cta: string }> = {
  about: {
    title: "About Us",
    heading: "We build for the future.",
    text: "MayaKit is a next-generation component library designed for the modern web. We believe in performance, aesthetics, and pushing the boundaries of what is possible in the browser.",
    cta: "Meet the Team"
  },
  origins: {
    title: "Origins",
    heading: "Born from necessity.",
    text: "Started as a set of internal tools, MayaKit evolved into a comprehensive suite of UI primitives that power some of the most dynamic interfaces on the internet.",
    cta: "Read our Story"
  },
  gallery: {
    title: "Gallery",
    heading: "A canvas of possibility.",
    text: "Explore how creators around the world are using MayaKit to build stunning, high-performance web experiences that captivate their audiences.",
    cta: "View Showcase"
  }
};

export function CenterExpandPageTransition() {
  const [activePage, setActivePage] = useState("about");
  const [transitionPage, setTransitionPage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const timeoutSwap = useRef<any>(null);
  const timeoutReset = useRef<any>(null);

  const navigateTo = (pageKey: string) => {
    if (pageKey === activePage || isAnimating) return;
    
    setIsAnimating(true);
    setTransitionPage(pageKey);

    if (timeoutSwap.current) clearTimeout(timeoutSwap.current);
    if (timeoutReset.current) clearTimeout(timeoutReset.current);

    // Swap the page content exactly at the midpoint (when the screen is fully covered)
    timeoutSwap.current = setTimeout(() => {
      setActivePage(pageKey);
    }, 750); // 50% of 1.5s

    // Reset animation state
    timeoutReset.current = setTimeout(() => {
      setIsAnimating(false);
      setTransitionPage(null);
    }, 1500);
  };

  const current = PAGES[activePage];
  const next = transitionPage ? PAGES[transitionPage] : null;

  return (
    <div className="relative min-h-[600px] w-full bg-[#0C1E29] flex flex-col overflow-hidden rounded-xl border border-white/10 font-sans text-white">
      
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
        <div className={cn("text-2xl font-black tracking-tighter text-[#FFFE15]", inter.className)}>
          MAYA<span className="text-white">KIT</span>
        </div>
        <div className="flex gap-8">
          {Object.keys(PAGES).map((key) => (
            <button
              key={key}
              onClick={() => navigateTo(key)}
              className={cn(
                "text-sm font-bold tracking-widest uppercase transition-colors hover:text-[#FFFE15]",
                activePage === key ? "text-[#FFFE15]" : "text-white/60"
              )}
            >
              {PAGES[key].title}
            </button>
          ))}
        </div>
      </nav>

      {/* Simulated Page Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center z-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            <h1 className={cn("text-5xl md:text-7xl uppercase tracking-tighter mb-6", inter.className)}>
              {current.heading}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
              {current.text}
            </p>
            <button className="px-8 py-4 bg-white text-[#0C1E29] rounded-full font-bold text-sm tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 shadow-xl">
              {current.cta}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isAnimating && transitionPage && next && (
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
            
            {/* Top-Left Triangle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.1, 1.1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
              className="absolute inset-0 bg-[#FFFE15] origin-center"
              style={{ clipPath: "polygon(0 0, 101% 0, 0 101%)" }}
            />
            
            {/* Bottom-Right Triangle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.1, 1.1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
              className="absolute inset-0 bg-[#FFFE15] origin-center"
              style={{ clipPath: "polygon(100% 100%, -1% 100%, 100% -1%)" }}
            />

            {/* Transition Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 1.2] }}
              transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.35, 0.45, 0.55, 0.65] }}
              className={cn("relative z-10 text-5xl md:text-8xl text-[#0C1E29] uppercase tracking-tighter", inter.className)}
            >
              {next.title}
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
