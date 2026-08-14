import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

const CARDS = [
  { c: "from-rose-400 to-pink-600", t: "Mountain", sub: "Alps" },
  { c: "from-cyan-400 to-blue-600", t: "Ocean", sub: "Bali" },
  { c: "from-amber-400 to-orange-600", t: "Desert", sub: "Sahara" },
  { c: "from-violet-400 to-fuchsia-600", t: "Forest", sub: "Amazon" },
  { c: "from-emerald-400 to-teal-600", t: "Aurora", sub: "Iceland" },
];

/** ShuffleStackGallery — Cards shuffle / re-stack on click. */
export default function ShuffleStackGallery({ className }: { className?: string }) {
  const [order, setOrder] = useState(CARDS.map((_, i) => i));
  const shuffle = () => setOrder(prev => [...prev].sort(() => Math.random() - 0.5));
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] flex items-center justify-center p-6", className)}>
      <button onClick={shuffle} className="absolute top-4 right-4 z-20 rounded-full bg-white/10 backdrop-blur p-2 text-white hover:bg-white/20"><Shuffle size={14} /></button>
      <div className="relative w-64 h-80">
        <AnimatePresence>
          {order.map((idx, i) => {
            const c = CARDS[idx];
            return (
              <motion.div
                key={idx}
                layout
                initial={{ scale: 0.9, opacity: 0, rotate: -8 + Math.random() * 16 }}
                animate={{
                  x: (i - 2) * 14,
                  y: i * 4,
                  rotate: (i - 2) * 5,
                  scale: 1 - (order.length - 1 - i) * 0.02,
                  zIndex: i,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.c} shadow-2xl overflow-hidden border border-white/20`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/80">{c.sub}</p>
                  <p className="text-2xl font-bold">{c.t}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
