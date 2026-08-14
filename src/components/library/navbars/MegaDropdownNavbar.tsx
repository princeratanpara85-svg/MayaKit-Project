"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { name: "Patterns", desc: "Background patterns", items: ["Aurora", "Liquid", "Hyperbolic", "Quantum", "+6"] },
  { name: "Cards", desc: "Interactive cards", items: ["Holographic", "Tilt", "Glass", "Aurora Edge", "+6"] },
  { name: "Backgrounds", desc: "WebGL scenes", items: ["Warp", "Aurora Veil", "Lightning", "Galaxy", "+6"] },
  { name: "Galleries", desc: "Image showcases", items: ["Dome 3D", "Marquee", "Carousel", "Polaroid", "+6"] },
];

export default function MegaDropdownNavbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] bg-[#0C1E29] p-4 font-mono", className)}>
      <nav
        onMouseLeave={() => setOpen(false)}
        className="relative flex items-center justify-between rounded-none border border-[#163648] bg-[#0C1E29] px-6 py-4"
      >
        <div className="text-[#FFFE15] font-bold tracking-widest uppercase">AnimFlow</div>
        <div className="flex items-center gap-1 text-sm text-[#E2E8F0]/70 uppercase tracking-widest">
          {["Components", "Pricing", "Docs", "Blog"].map(l => (
            <button
              key={l}
              onMouseEnter={() => setOpen(l === "Components")}
              className="px-4 py-2 rounded-none hover:bg-[#163648] hover:text-[#E2E8F0] inline-flex items-center gap-2 transition-colors"
            >
              {l}
              {l === "Components" && <ChevronDown size={14} className={cn("transition-transform", open ? "rotate-180 text-[#FFFE15]" : "")} />}
            </button>
          ))}
        </div>
        <button className="rounded-none bg-[#FFFE15] text-[#0C1E29] px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">Start</button>
      </nav>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-none border border-[#163648] bg-[#0C1E29] p-6 overflow-hidden shadow-2xl relative z-10"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="grid grid-cols-2 gap-4">
              {SECTIONS.map(s => (
                <div key={s.name} className="rounded-none border border-[#163648] p-4 hover:bg-[#163648] hover:border-[#FFFE15]/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2 text-[#FFFE15]">
                    <p className="font-bold text-sm uppercase tracking-widest">{s.name}</p>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">{`->`}</span>
                  </div>
                  <p className="text-[10px] text-[#E2E8F0]/50 mt-1 uppercase tracking-wider">{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {s.items.map(it => (
                      <span key={it} className="text-[10px] text-[#E2E8F0] bg-[#0C1E29] border border-[#163648] rounded-none px-2 py-1 uppercase tracking-wider">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-8 text-center text-[#E2E8F0]/40 text-xs font-mono uppercase tracking-widest">
        Hover "Components" to see the mega dropdown
      </div>
    </div>
  );
}
