import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Wand2 } from "lucide-react";

/** MagneticMorphButton — Magnetic morph (chamfer / shape shift on hover). */
export default function MagneticMorphButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Hover &amp; move</p>
      <motion.button
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
          y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ x: sx, y: sy }}
        whileHover={{ borderRadius: ["12px", "24px 4px 24px 4px", "4px 24px 4px 24px", "12px"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="relative rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 px-6 py-3 text-white font-semibold shadow-2xl shadow-fuchsia-500/30"
      >
        <span className="inline-flex items-center gap-2"><Wand2 size={16} /> Morph Me</span>
      </motion.button>
    </div>
  );
}
