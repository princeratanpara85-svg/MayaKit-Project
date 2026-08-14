import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Compass, Plus, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Explore" },
  { icon: Plus, label: "Create" },
  { icon: Heart, label: "Saved" },
  { icon: User, label: "Profile" },
];

/** SideRailNavbar — Side rail vertical nav. */
export default function SideRailNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4 flex gap-3", className)}>
      <aside className="w-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 flex flex-col items-center gap-2">
        {ITEMS.map((it, i) => (
          <button
            key={it.label}
            onClick={() => setActive(i)}
            className={cn(
              "relative w-12 h-12 rounded-xl flex items-center justify-center text-white/60 transition-colors",
              active === i && "text-white"
            )}
          >
            {active === i && (
              <motion.div
                layoutId="side-rail-active"
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <it.icon size={18} className="relative z-10" />
          </button>
        ))}
      </aside>
      <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
        <p className="text-xs uppercase tracking-widest text-white/40">Section</p>
        <p className="text-2xl font-bold text-white mt-1">{ITEMS[active].label}</p>
        <p className="text-sm text-white/60 mt-2">Vertical side rail with animated active state via Framer Motion `layoutId`.</p>
      </div>
    </div>
  );
}
