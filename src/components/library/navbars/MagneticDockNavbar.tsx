"use client";

import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type DockItem = {
  id: string;
  label: string;
  initial: string;
};

const ITEMS: DockItem[] = [
  { id: "home", label: "Home", initial: "H" },
  { id: "explore", label: "Explore", initial: "E" },
  { id: "play", label: "Play", initial: "P" },
  { id: "chat", label: "Chat", initial: "C" },
  { id: "gallery", label: "Gallery", initial: "G" },
  { id: "music", label: "Music", initial: "M" },
  { id: "mail", label: "Mail", initial: "M" },
  { id: "settings", label: "Settings", initial: "S" },
];

const BASE_SIZE = 48; // px
const MAX_SIZE = 96; // px
const MAGNIFICATION_RANGE = 140; // px influence radius

function DockIcon({
  item,
  mouseX,
  isHover,
  onHover,
  onLeave,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  isHover: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distance,
    [-MAGNIFICATION_RANGE, 0, MAGNIFICATION_RANGE],
    [BASE_SIZE, MAX_SIZE, BASE_SIZE]
  );
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 200, damping: 14 });

  return (
    <div className="relative flex flex-col items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <motion.button
        ref={ref}
        type="button"
        style={{ width: size, height: size }}
        className={cn(
          "relative z-10 grid place-items-center rounded-none font-mono font-bold text-2xl transition-colors border-2",
          isHover ? "bg-[#FFFE15] text-[#0C1E29] border-[#0C1E29]" : "bg-[#163648] text-[#E2E8F0] border-[#0C1E29]"
        )}
      >
        <span>{item.initial}</span>
      </motion.button>

      {/* Brutalist Reflection */}
      <div
        className="pointer-events-none absolute -bottom-1 h-8 w-full overflow-hidden opacity-30 mt-1"
        aria-hidden
      >
        <motion.div
          style={{ width: size, height: size }}
          className={cn(
            "origin-top scale-y-[-1] rounded-none border-2",
            isHover ? "bg-[#FFFE15] border-[#0C1E29]" : "bg-[#163648] border-[#0C1E29]"
          )}
        />
      </div>

      {/* Tooltip */}
      <motion.span
        initial={false}
        animate={{
          opacity: isHover ? 1 : 0,
          y: isHover ? -10 : -4,
        }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-none bg-[#FFFE15] px-2 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#0C1E29] border border-[#0C1E29]"
      >
        {item.label}
      </motion.span>
    </div>
  );
}

export default function MagneticDockNavbar() {
  const mouseX = useMotionValue<number>(-9999);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
  };

  return (
    <div
      className={cn(
        "relative h-full min-h-[400px] w-full overflow-hidden rounded-none bg-[#0C1E29] flex flex-col"
      )}
    >
      <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-[#E2E8F0]/40 font-mono">
        Magnético · Dock
      </div>

      <div className="relative z-0 flex h-full flex-col items-center justify-center px-8 text-center pt-16 flex-1">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-balance text-3xl font-bold leading-tight text-[#E2E8F0] uppercase tracking-wider font-mono"
        >
          Hover. <span className="bg-[#FFFE15] text-[#0C1E29] px-2">Lean in.</span> Launch.
        </motion.h1>
      </div>

      <div
        onMouseMove={handleMove}
        onMouseLeave={() => mouseX.set(-9999)}
        className="w-full flex justify-center pb-8 pt-10"
      >
        <div
          className={cn(
            "relative flex items-end gap-1 rounded-none px-4 py-3",
            "border border-[#163648] bg-[#0C1E29]/90 backdrop-blur-md"
          )}
        >
          {ITEMS.map((item) => (
            <DockIcon
              key={item.id}
              item={item}
              mouseX={mouseX}
              isHover={hovered === item.id}
              onHover={() => setHovered(item.id)}
              onLeave={() => setHovered((h) => (h === item.id ? null : h))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
