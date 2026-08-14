"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const COMMANDS = [
  { label: "Browse components", kbd: "B" },
  { label: "Generate new", kbd: "N" },
  { label: "Toggle theme", kbd: "T" },
  { label: "Star on GitHub", kbd: "G" },
  { label: "Subscribe to updates", kbd: "S" },
];

export default function GlassCommandNavbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(true);
  
  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-[#0C1E29] p-4 font-mono", className)}>
      <div className="flex items-center justify-between mb-4 rounded-none border border-[#163648] bg-[#0C1E29]/80 backdrop-blur-md px-6 py-4 w-full">
        <div className="text-[#FFFE15] font-bold tracking-widest uppercase">AnimFlow</div>
        <div className="text-[#E2E8F0]/60 text-xs hidden md:block uppercase tracking-wider">9 categories · 90 components</div>
        <button 
          onClick={() => setOpen(v => !v)} 
          className="rounded-none border border-[#163648] bg-[#163648]/50 px-3 py-1.5 text-[#E2E8F0] text-xs inline-flex items-center gap-2 hover:bg-[#163648] transition-colors tracking-widest"
        >
          CMD <kbd className="bg-[#0C1E29] px-1 font-sans">K</kbd>
        </button>
      </div>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mx-auto max-w-md rounded-none border border-[#163648] bg-[#0C1E29]/90 backdrop-blur-md p-4 shadow-2xl relative z-10"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-none bg-[#163648]/30 mb-3 border border-[#163648]/50">
              <span className="text-[#FFFE15]">{`>`}</span>
              <input 
                placeholder="Type a command..." 
                className="bg-transparent flex-1 outline-none text-[#E2E8F0] text-sm placeholder:text-[#E2E8F0]/30 font-mono" 
              />
              <kbd className="text-[10px] text-[#E2E8F0]/40 border border-[#163648] rounded-none px-2 py-1 bg-[#0C1E29]">ESC</kbd>
            </div>
            
            <div className="space-y-1">
              {COMMANDS.map((c, i) => (
                <motion.button
                  key={c.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-none text-[#E2E8F0]/80 hover:bg-[#163648] hover:text-[#FFFE15] transition-colors text-left text-sm group border border-transparent hover:border-[#FFFE15]/20"
                >
                  <span className="tracking-wide">{c.label}</span>
                  <div className="flex items-center gap-3">
                    <kbd className="text-[10px] text-[#E2E8F0]/40 border border-[#163648] rounded-none px-2 py-1 bg-[#0C1E29] group-hover:text-[#FFFE15]/60 group-hover:border-[#FFFE15]/30">
                      {c.kbd}
                    </kbd>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-4 text-xs font-mono">
        <div className="rounded-none border border-[#163648] bg-[#0C1E29] p-4 text-center">
          <p className="text-[#E2E8F0]/50 text-[10px] uppercase tracking-widest mb-1">Categories</p>
          <p className="text-[#FFFE15] font-bold text-lg">9</p>
        </div>
        <div className="rounded-none border border-[#163648] bg-[#0C1E29] p-4 text-center">
          <p className="text-[#E2E8F0]/50 text-[10px] uppercase tracking-widest mb-1">Components</p>
          <p className="text-[#FFFE15] font-bold text-lg">90</p>
        </div>
      </div>
    </div>
  );
}
