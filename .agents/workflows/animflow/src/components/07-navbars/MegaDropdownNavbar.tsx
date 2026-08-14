import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers, Box, Image as ImgIcon, Rocket, MousePointer2, Menu, Wand2, Cuboid, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { icon: Sparkles, name: "Patterns", desc: "Background patterns", items: ["Aurora", "Liquid", "Hyperbolic", "Quantum", "+6"] },
  { icon: Layers, name: "Cards", desc: "Interactive cards", items: ["Holographic", "Tilt", "Glass", "Aurora Edge", "+6"] },
  { icon: Box, name: "Backgrounds", desc: "WebGL scenes", items: ["Warp", "Aurora Veil", "Lightning", "Galaxy", "+6"] },
  { icon: ImgIcon, name: "Galleries", desc: "Image showcases", items: ["Dome 3D", "Marquee", "Carousel", "Polaroid", "+6"] },
];
/** MegaDropdownNavbar — Mega dropdown with smooth reveal. */
export default function MegaDropdownNavbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4", className)}>
      <nav
        onMouseLeave={() => setOpen(false)}
        className="relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2"
      >
        <div className="text-white font-bold">AnimFlow</div>
        <div className="flex items-center gap-1 text-sm text-white/70">
          {["Components", "Pricing", "Docs", "Blog"].map(l => (
            <button
              key={l}
              onMouseEnter={() => setOpen(l === "Components")}
              className="px-3 py-1.5 rounded-lg hover:bg-white/5 inline-flex items-center gap-1"
            >
              {l}
              {l === "Components" && <ChevronDown size={12} />}
            </button>
          ))}
        </div>
        <button className="rounded-lg bg-white text-black px-3 py-1.5 text-xs font-semibold">Start</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl p-4 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {SECTIONS.map(s => (
                <div key={s.name} className="rounded-xl border border-white/5 p-3 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2 text-white">
                    <s.icon size={14} className="text-fuchsia-400" />
                    <p className="font-semibold text-sm">{s.name}</p>
                    <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] text-white/50 mt-0.5">{s.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.items.map(it => <span key={it} className="text-[10px] text-white/70 bg-white/5 rounded px-1.5 py-0.5">{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-4 text-center text-white/40 text-xs">Hover "Components" to see the mega dropdown</div>
    </div>
  );
}
