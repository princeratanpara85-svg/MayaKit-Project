import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** HexShimmerPattern — Hex grid with shimmering gradient traveling through cells.
 *  Mix: Magic UI grid pattern + H5-Dooring 蜂巢 (honeycomb) + 21st.dev noise glow. */
export default function HexShimmerPattern({ className }: { className?: string }) {
  const cols = 7, rows = 8;
  const w = 60, h = 52;
  const hexPath = (cx: number, cy: number) => {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = cx + (w / 2) * Math.cos(angle);
      const y = cy + (h / 2) * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#070318] flex items-center justify-center", className)}>
      <div className="relative" style={{ width: cols * w + 30, height: rows * h + 30 }}>
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const offset = r % 2 === 0 ? 0 : w / 2;
            const cx = c * w + offset + 15;
            const cy = r * (h * 0.75) + 15;
            return (
              <motion.svg
                key={`${r}-${c}`}
                className="absolute"
                style={{ left: cx - w / 2, top: cy - h / 2 }}
                width={w} height={h}
                animate={{
                  filter: [
                    "drop-shadow(0 0 0px rgba(168,85,247,0)) hue-rotate(0deg)",
                    "drop-shadow(0 0 14px rgba(236,72,153,0.7)) hue-rotate(80deg)",
                    "drop-shadow(0 0 0px rgba(168,85,247,0)) hue-rotate(0deg)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: (r + c) * 0.12, ease: "easeInOut" }}
              >
                <polygon points={hexPath(w / 2, h / 2)} fill="rgba(168,85,247,0.18)" stroke="rgba(236,72,153,0.6)" strokeWidth="1" />
              </motion.svg>
            );
          })
        )}
        <motion.div
          className="absolute -inset-20 pointer-events-none"
          animate={{ background: [
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(34,211,238,0.25), transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 50%)",
          ]}}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
