import { useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Heart, Magnet, MoveHorizontal, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- Placeholder image-tile "art" (no external assets) ---------------- */
type Art = "mtn" | "wave" | "sun" | "aurora" | "grid" | "orb" | "city" | "leaf" | "ring" | "face" | "wave2" | "tri";
const ART: Art[] = ["mtn", "wave", "sun", "aurora", "grid", "orb", "city", "leaf", "ring", "face", "wave2", "tri"];
const PALETTES: [string, string, string][] = [
  ["#f97316", "#db2777", "#1e1b4b"],
  ["#06b6d4", "#3b82f6", "#0c0a09"],
  ["#a855f7", "#ec4899", "#1e1b4b"],
  ["#f59e0b", "#ef4444", "#1c1917"],
  ["#10b981", "#0ea5e9", "#0f172a"],
  ["#8b5cf6", "#22d3ee", "#0c0a09"],
  ["#fb7185", "#f59e0b", "#0c0a09"],
  ["#22d3ee", "#a855f7", "#0f0f23"],
  ["#84cc16", "#06b6d4", "#0a0a0a"],
  ["#f43f5e", "#7c3aed", "#0c0a09"],
  ["#0ea5e9", "#10b981", "#0a0f1c"],
  ["#eab308", "#dc2626", "#1c1917"],
];

function TileArt({ kind, c1, c2, c3 }: { kind: Art; c1: string; c2: string; c3: string }) {
  const id = `g-${kind}-${c1.slice(1)}`;
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`${id}-r`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c1} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c3} stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      {kind === "mtn" && (
        <>
          <polygon points="0,200 70,90 110,150 160,70 200,200" fill={c3} opacity="0.85" />
          <polygon points="0,200 50,140 95,170 140,110 200,200" fill="#000" opacity="0.45" />
          <circle cx="160" cy="50" r="14" fill="#fff8" />
        </>
      )}
      {kind === "wave" && (
        <>
          <path d="M0,130 Q50,90 100,130 T200,130 L200,200 L0,200Z" fill={c3} opacity="0.7" />
          <path d="M0,160 Q50,120 100,160 T200,160 L200,200 L0,200Z" fill="#000" opacity="0.5" />
          <circle cx="160" cy="55" r="20" fill="#fff" opacity="0.5" />
        </>
      )}
      {kind === "sun" && (
        <>
          <circle cx="100" cy="110" r="60" fill={`url(#${id}-r)`} />
          <rect y="140" width="200" height="60" fill={c3} opacity="0.7" />
        </>
      )}
      {kind === "aurora" && (
        <>
          {[0, 30, 60, 90, 120].map((y, i) => (
            <ellipse key={i} cx="100" cy={y + 30} rx="180" ry="22" fill={i % 2 ? c1 : c2} opacity={0.35 - i * 0.04} />
          ))}
        </>
      )}
      {kind === "grid" && (
        <g opacity="0.6">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="200" stroke="#fff" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 25} x2="200" y2={i * 25} stroke="#fff" strokeWidth="0.5" />
          ))}
          <circle cx="100" cy="100" r="40" fill="#000" opacity="0.5" />
        </g>
      )}
      {kind === "orb" && (
        <>
          <circle cx="100" cy="100" r="55" fill={`url(#${id}-r)`} />
          <circle cx="80" cy="85" r="14" fill="#fff" opacity="0.7" />
        </>
      )}
      {kind === "city" && (
        <>
          {Array.from({ length: 10 }).map((_, i) => {
            const h = 40 + ((i * 37) % 90);
            return <rect key={i} x={i * 20} y={200 - h} width="16" height={h} fill="#000" opacity={0.5 + (i % 3) * 0.15} />;
          })}
        </>
      )}
      {kind === "leaf" && (
        <>
          <path d="M40,180 Q60,40 180,40 Q140,160 40,180Z" fill="#000" opacity="0.5" />
          <line x1="50" y1="170" x2="160" y2="60" stroke="#fff" strokeOpacity="0.5" />
        </>
      )}
      {kind === "ring" && (
        <>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#fff" strokeWidth="8" opacity="0.5" />
          <circle cx="100" cy="100" r="30" fill="#000" opacity="0.4" />
        </>
      )}
      {kind === "face" && (
        <>
          <ellipse cx="100" cy="100" rx="55" ry="65" fill="#000" opacity="0.4" />
          <circle cx="85" cy="90" r="4" fill="#fff" />
          <circle cx="115" cy="90" r="4" fill="#fff" />
          <path d="M80,120 Q100,135 120,120" stroke="#fff" strokeWidth="2" fill="none" />
        </>
      )}
      {kind === "wave2" && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 18} x2="200" y2={i * 18} stroke="#fff" strokeWidth="0.6" opacity={0.15 + (i % 3) * 0.1} />
          ))}
        </>
      )}
      {kind === "tri" && (
        <>
          <polygon points="100,30 170,170 30,170" fill="#000" opacity="0.5" />
          <polygon points="100,60 150,160 50,160" fill={c1} opacity="0.6" />
        </>
      )}
    </svg>
  );
}

type Tile = { art: Art; label: string; palette: [string, string, string] };

function buildTiles(seed = 0, count = 8): Tile[] {
  return Array.from({ length: count }).map((_, i) => ({
    art: ART[(i + seed) % ART.length],
    palette: PALETTES[(i * 3 + seed) % PALETTES.length],
    label: ["MIST", "NOVA", "AURA", "PEAK", "ORBIT", "MESA", "FERN", "ECHO", "WAVE", "LOOM", "TIDE", "FLUX"][(i + seed) % 12] ?? "VOX",
  }));
}

const SNAP_POINTS = [-360, -180, 0, 180, 360];

/* ---------------- Magnetic drag row ---------------- */
function MagneticRow({
  tiles, rowIndex, draggedRowIndex, setDraggedRowIndex,
}: {
  tiles: Tile[];
  rowIndex: number;
  draggedRowIndex: number;
  setDraggedRowIndex: (n: number) => void;
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState<number | null>(null);

  // Magnetic strength: how much neighboring rows get pulled by the dragged row
  const isActive = draggedRowIndex === rowIndex;
  const dist = Math.abs(draggedRowIndex - rowIndex);
  const isNeighbor = draggedRowIndex !== -1 && !isActive;
  const magneticX = useTransform(x, (v) => (isNeighbor ? v * (dist === 1 ? 0.25 : 0.1) : 0));

  // Rotate slightly while dragging for tactile feel
  const rotate = useTransform(x, (v) => (isActive ? v / 40 : 0));

  const handleDragEnd = () => {
    const current = x.get();
    // snap to nearest snap point
    const snap = SNAP_POINTS.reduce((p, c) => (Math.abs(c - current) < Math.abs(p - current) ? c : p));
    x.set(snap);
    setTimeout(() => setDraggedRowIndex(-1), 250);
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ x: isActive ? x : magneticX, rotate }}
      drag={isActive || draggedRowIndex === -1 ? "x" : false}
      dragConstraints={{ left: -480, right: 480 }}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={() => setDraggedRowIndex(rowIndex)}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className={cn(
        "relative flex gap-3 py-1.5 select-none",
        isActive ? "cursor-grabbing z-10" : "cursor-grab"
      )}
    >
      {tiles.map((t, i) => (
        <motion.div
          key={`${rowIndex}-${i}`}
          whileHover={{ y: -4, scale: 1.04 }}
          animate={{
            boxShadow: isActive
              ? "0 25px 50px -12px rgba(168,85,247,0.55)"
              : "0 8px 20px -8px rgba(0,0,0,0.6)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(liked === i ? null : i);
          }}
          className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
        >
          <TileArt kind={t.art} c1={t.palette[0]} c2={t.palette[1]} c3={t.palette[2]} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-white/90">{t.label}</span>
              <motion.span
                animate={{ scale: liked === i ? [1, 1.6, 1] : 1, color: liked === i ? "#f43f5e" : "#fff" }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <Heart size={11} fill={liked === i ? "#f43f5e" : "transparent"} />
              </motion.span>
            </div>
          </div>
          {isActive && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---------------- Main component ---------------- */
export default function MagneticDragGallery() {
  const [draggedRow, setDraggedRow] = useState(-1);
  const [seed, setSeed] = useState(0);
  const rows = useMemo(
    () => [buildTiles(seed, 8), buildTiles(seed + 2, 8), buildTiles(seed + 5, 8)],
    [seed]
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-950 via-black to-zinc-900">
      {/* ambient grain */}
      <div className="absolute inset-0 noise-bg pointer-events-none" />
      {/* radial glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* header */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-3 text-white">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
          <Magnet size={12} className="text-fuchsia-400" />
          Magnetic Strip
        </div>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/80 hover:bg-white/10 transition"
        >
          <Shuffle size={11} /> Re-roll
        </button>
      </div>

      {/* 3 rows */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pt-12 pb-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative w-full px-2">
            <MagneticRow
              tiles={rows[i]}
              rowIndex={i}
              draggedRowIndex={draggedRow}
              setDraggedRowIndex={setDraggedRow}
            />
          </div>
        ))}
      </div>

      {/* footer hint */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 text-[10px] text-white/50">
        <MoveHorizontal size={11} className="animate-pulse" />
        <span>Drag any row · Neighbors magnetically follow</span>
        <AnimatePresence>
          {draggedRow !== -1 && (
            <motion.span
              key="snap"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="ml-2 rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-[10px] text-fuchsia-200"
            >
              row {draggedRow + 1} engaged
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
