"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Home" },
  { label: "Search" },
  { label: "Saved" },
  { label: "Alerts" },
  { label: "Profile" },
];

export default function LiquidBubbleNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#0C1E29] p-4 font-mono", className)}>
      <div className="rounded-none border border-[#163648] bg-[#0C1E29]/80 backdrop-blur-md p-2 shadow-xl">
        <LayoutGroup>
          <div className="relative flex items-center justify-center gap-2">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActive(i)}
                className={cn(
                  "relative flex items-center justify-center px-6 py-3 text-sm tracking-widest uppercase transition-colors z-10 rounded-none", 
                  active === i ? "text-[#0C1E29] font-bold" : "text-[#E2E8F0]/60 hover:text-[#E2E8F0]"
                )}
              >
                {active === i && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 -z-10 rounded-none bg-[#FFFE15]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <div className="absolute bottom-8 text-center text-[#E2E8F0]/40 text-xs uppercase tracking-widest">
        Click any tab to slide the brutalist block
      </div>
    </div>
  );
}
