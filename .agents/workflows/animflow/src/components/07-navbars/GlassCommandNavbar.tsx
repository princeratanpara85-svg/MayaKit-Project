import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, CornerDownLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** GlassCommandNavbar — Command-K style, glass + spotlight. */
const COMMANDS = [
  { icon: "✦", label: "Browse components", kbd: "B" },
  { icon: "⚡", label: "Generate new", kbd: "N" },
  { icon: "☼", label: "Toggle theme", kbd: "T" },
  { icon: "★", label: "Star on GitHub", kbd: "G" },
  { icon: "✉", label: "Subscribe to updates", kbd: "S" },
];
export default function GlassCommandNavbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4", className)}>
      <div className="flex items-center justify-between mb-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2">
        <div className="text-white font-bold">AnimFlow</div>
        <div className="text-white/60 text-xs hidden md:block">9 categories · 90 components</div>
        <button onClick={() => setOpen(v => !v)} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-white/70 text-xs inline-flex items-center gap-1.5"><Command size={10} />K</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mx-auto max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl p-3 shadow-2xl"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 mb-2">
              <Search size={14} className="text-white/40" />
              <input placeholder="Type a command..." className="bg-transparent flex-1 outline-none text-white text-sm placeholder:text-white/30" />
              <kbd className="text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            {COMMANDS.map((c, i) => (
              <motion.button
                key={c.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 text-left text-sm"
              >
                <span>{c.icon}</span>
                <span className="flex-1">{c.label}</span>
                <kbd className="text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">{c.kbd}</kbd>
                <CornerDownLeft size={10} className="text-white/30" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
          <p className="text-white/50 text-[10px] uppercase tracking-widest">Categories</p>
          <p className="text-white font-semibold text-lg">9</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
          <p className="text-white/50 text-[10px] uppercase tracking-widest">Components</p>
          <p className="text-white font-semibold text-lg">90</p>
        </div>
      </div>
    </div>
  );
}
