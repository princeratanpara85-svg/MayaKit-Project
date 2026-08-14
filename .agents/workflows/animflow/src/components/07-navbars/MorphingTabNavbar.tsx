import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Sparkles, Zap, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { icon: LayoutGrid, label: "All", sub: "90 components" },
  { icon: Sparkles, label: "New", sub: "Just shipped" },
  { icon: Zap, label: "Trending", sub: "Most used" },
  { icon: Layers, label: "Featured", sub: "Hand-picked" },
];

/** MorphingTabNavbar — Tabs that morph / expand with smooth transitions. */
export default function MorphingTabNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4", className)}>
      <div className="flex items-center gap-2 p-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={cn("relative flex-1 rounded-xl px-3 py-2 text-sm transition-colors", active === i ? "text-white" : "text-white/50 hover:text-white/80")}
          >
            {active === i && (
              <motion.div
                layoutId="morph-tab"
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <div className="relative flex items-center justify-center gap-2">
              <t.icon size={14} />
              <span className="font-semibold">{t.label}</span>
            </div>
            <AnimatePresence>
              {active === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative text-[10px] text-white/80 mt-0.5"
                >
                  {t.sub}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <div className="mt-6 text-center text-white/40 text-xs">Click tabs — the active one morphs and reveals sub-text.</div>
    </div>
  );
}
