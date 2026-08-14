"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "home", label: "Home", initial: "HO" },
  { id: "explore", label: "Explore", initial: "EX" },
  { id: "create", label: "Create", initial: "CR" },
  { id: "saved", label: "Saved", initial: "SA" },
  { id: "profile", label: "Profile", initial: "PR" },
];

export default function SideRailNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-[#0C1E29] p-4 flex gap-4 font-mono", className)}>
      <aside className="w-20 border border-[#163648] bg-[#0C1E29]/80 backdrop-blur-md p-2 flex flex-col items-center gap-2">
        {ITEMS.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setActive(i)}
            className={cn(
              "relative w-full h-16 flex flex-col items-center justify-center font-bold text-xs uppercase tracking-widest transition-colors rounded-none",
              active === i ? "text-[#0C1E29]" : "text-[#E2E8F0]/40 hover:text-[#E2E8F0]"
            )}
          >
            {active === i && (
              <motion.div
                layoutId="side-rail-active"
                className="absolute inset-0 bg-[#FFFE15]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{it.initial}</span>
          </button>
        ))}
      </aside>
      
      <div className="flex-1 border border-[#163648] bg-[#163648]/20 p-8 flex flex-col justify-center relative overflow-hidden">
        <p className="text-[10px] uppercase tracking-widest text-[#E2E8F0]/40 mb-2">Active Section</p>
        <motion.h2 
          key={active}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-bold text-[#FFFE15] uppercase tracking-widest"
        >
          {ITEMS[active].label}
        </motion.h2>
        <p className="text-sm text-[#E2E8F0]/60 mt-6 uppercase tracking-wider max-w-sm leading-relaxed">
          Vertical side rail with animated active state via Framer Motion <code className="bg-[#0C1E29] px-1 py-0.5 text-[#FFFE15]">layoutId</code>.
        </p>
      </div>
    </div>
  );
}
