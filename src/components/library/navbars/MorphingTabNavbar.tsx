"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "All", sub: "90 components" },
  { label: "New", sub: "Just shipped" },
  { label: "Trending", sub: "Most used" },
  { label: "Featured", sub: "Hand-picked" },
];

export default function MorphingTabNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#0C1E29] p-4 font-mono", className)}>
      <div className="flex items-center gap-2 p-2 rounded-none border border-[#163648] bg-[#0C1E29]">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={cn(
              "relative flex-1 rounded-none px-6 py-3 text-sm transition-colors uppercase tracking-widest min-w-[140px]", 
              active === i ? "text-[#0C1E29]" : "text-[#E2E8F0]/50 hover:text-[#E2E8F0]"
            )}
          >
            {active === i && (
              <motion.div
                layoutId="morph-tab"
                className="absolute inset-0 rounded-none bg-[#FFFE15]"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <div className="relative flex items-center justify-center gap-2">
              <span className="font-bold">{t.label}</span>
            </div>
            <AnimatePresence>
              {active === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative text-[10px] text-[#0C1E29]/80 mt-1 uppercase font-bold"
                >
                  {t.sub}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <div className="absolute bottom-8 text-center text-[#E2E8F0]/40 text-xs uppercase tracking-widest">
        Click tabs — the active one morphs and reveals sub-text.
      </div>
    </div>
  );
}
