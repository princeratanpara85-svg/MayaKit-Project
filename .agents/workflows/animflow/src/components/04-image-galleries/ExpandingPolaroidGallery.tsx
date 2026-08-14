import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const POLAROIDS = [
  { c: "from-rose-400 to-pink-600", r: -6, t: "Mom" },
  { c: "from-cyan-400 to-blue-600", r: 4, t: "Dad" },
  { c: "from-amber-400 to-orange-600", r: -3, t: "Sis" },
  { c: "from-violet-400 to-fuchsia-600", r: 7, t: "Bro" },
  { c: "from-emerald-400 to-teal-600", r: -5, t: "Gram" },
];

/** ExpandingPolaroidGallery — Polaroids expand on hover. */
export default function ExpandingPolaroidGallery({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#0a0612] flex items-center justify-center p-4", className)}>
      <div className="flex items-center justify-center gap-3">
        {POLAROIDS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ rotate: p.r }}
            whileHover={{ rotate: 0, scale: 1.2, zIndex: 10, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="bg-white p-2 pb-8 shadow-2xl origin-bottom"
          >
            <div className={`w-32 h-36 bg-gradient-to-br ${p.c} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
            </div>
            <p className="absolute bottom-2 inset-x-0 text-center text-zinc-800 font-handwriting text-sm">{p.t}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
