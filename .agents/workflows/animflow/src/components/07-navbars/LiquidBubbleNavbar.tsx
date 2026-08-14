import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Home, Search, Heart, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Heart, label: "Saved" },
  { icon: Bell, label: "Alerts" },
  { icon: User, label: "Profile" },
];

/** LiquidBubbleNavbar — Liquid bubble that morphs to active item. */
export default function LiquidBubbleNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4", className)}>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2">
        <LayoutGroup>
          <div className="relative flex items-center justify-between">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActive(i)}
                className={cn("relative flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors z-10", active === i ? "text-white" : "text-white/50")}
              >
                {active === i && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <t.icon size={16} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <div className="mt-8 text-center text-white/40 text-xs">Click any tab — watch the liquid bubble morph.</div>
    </div>
  );
}
