import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Bell, Volume2, Wifi, Moon, Shield, Zap, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TOGGLES = [
  { icon: Bell, label: "Notifications", on: true },
  { icon: Volume2, label: "Sound", on: true },
  { icon: Wifi, label: "Wi-Fi", on: false },
  { icon: Moon, label: "Dark mode", on: true },
  { icon: Shield, label: "2FA", on: false },
  { icon: Zap, label: "Auto-save", on: true },
];

/** MorphingToggles — Toggles that morph between states. */
export default function MorphingToggles({ className }: { className?: string }) {
  const [state, setState] = useState(TOGGLES.map(t => t.on));
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4", className)}>
      <LayoutGroup>
        <div className="space-y-2">
          {TOGGLES.map((t, i) => (
            <motion.div
              key={t.label}
              layout
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <t.icon size={14} className="text-fuchsia-300" />
                {t.label}
              </div>
              <button
                onClick={() => setState(s => s.map((v, j) => j === i ? !v : v))}
                className={cn("relative h-6 w-11 rounded-full transition-colors", state[i] ? "bg-emerald-500" : "bg-zinc-700")}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow flex items-center justify-center"
                  style={{ left: state[i] ? 22 : 2 }}
                >
                  <AnimatePresence mode="wait">
                    {state[i] ? (
                      <motion.div key="y" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={10} className="text-emerald-600" /></motion.div>
                    ) : (
                      <motion.div key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><X size={10} className="text-zinc-600" /></motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
}
