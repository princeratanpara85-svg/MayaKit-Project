import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Home,
  Compass,
  PlayCircle,
  MessageCircle,
  Image as ImageIcon,
  Music2,
  Mail,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MagneticDockNavbar
 * macOS-style dock with magnification: each icon scales based on its
 * distance to the cursor. Framer Motion `useMotionValue` feeds a `useSpring`
 * so neighbouring items "lean in" smoothly. Each icon has a glossy gradient
 * body, a reflection underneath, and a tooltip that fades in once the icon
 * exceeds 1.3× scale.
 *
 * Source remix:
 *   - React Bits "Dock" (magnetic magnification)
 *   - Magic UI "Dock" (reflection + glass tile)
 */

type DockItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string; // tailwind gradient classes
};

const ITEMS: DockItem[] = [
  { id: "home", label: "Home", icon: Home, color: "from-sky-400 to-indigo-600" },
  { id: "explore", label: "Explore", icon: Compass, color: "from-fuchsia-400 to-pink-600" },
  { id: "play", label: "Play", icon: PlayCircle, color: "from-rose-400 to-orange-500" },
  { id: "chat", label: "Chat", icon: MessageCircle, color: "from-emerald-400 to-teal-600" },
  { id: "gallery", label: "Gallery", icon: ImageIcon, color: "from-amber-300 to-rose-500" },
  { id: "music", label: "Music", icon: Music2, color: "from-violet-400 to-purple-600" },
  { id: "mail", label: "Mail", icon: Mail, color: "from-cyan-400 to-blue-600" },
  { id: "settings", label: "Settings", icon: Settings, color: "from-slate-300 to-slate-600" },
];

const BASE_SIZE = 44; // px
const MAX_SIZE = 88; // px
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

  // Map distance to a scale: closer to 0 = bigger
  const sizeTransform = useTransform(
    distance,
    [-MAGNIFICATION_RANGE, 0, MAGNIFICATION_RANGE],
    [BASE_SIZE, MAX_SIZE, BASE_SIZE],
  );
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 200, damping: 14 });

  // Icon glyph slightly larger when zoomed
  const iconSize = useTransform(size, (s) => Math.round(s * 0.42));

  return (
    <div className="relative flex flex-col items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <motion.button
        ref={ref}
        type="button"
        style={{ width: size, height: size }}
        className={cn(
          "relative z-10 grid place-items-center rounded-2xl",
          "bg-gradient-to-br shadow-[0_8px_22px_-10px_rgba(0,0,0,0.65)]",
          "ring-1 ring-white/15",
          item.color,
        )}
      >
        <motion.span style={{ width: iconSize, height: iconSize }} className="grid place-items-center">
          <item.icon className="h-full w-full text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
        </motion.span>

        {/* glossy highlight */}
        <span className="pointer-events-none absolute inset-x-2 top-1 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/35 to-transparent" />
      </motion.button>

      {/* Reflection */}
      <div
        className="pointer-events-none absolute -bottom-7 h-7 w-full overflow-hidden opacity-60"
        aria-hidden
      >
        <div
          className={cn(
            "h-full w-full origin-top scale-y-[-1] rounded-2xl bg-gradient-to-t blur-[2px]",
            item.color,
          )}
          style={{ filter: "saturate(80%)" }}
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
        className="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white shadow-md ring-1 ring-white/10 backdrop-blur"
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
        "relative h-[400px] w-full overflow-hidden rounded-2xl",
        "bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.25),_transparent_60%),_radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.18),_transparent_60%),_#0b0b18]",
      )}
    >
      {/* subtle noise */}
      <div className="noise-bg pointer-events-none absolute inset-0" />

      {/* Faint starfield */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />

      {/* Top decorative status row */}
      <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/40">
        magnético · dock
      </div>

      {/* Hero content underneath (faint) */}
      <div className="relative z-0 flex h-full flex-col items-center justify-center px-8 pt-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
        >
          Hover. <span className="bg-gradient-to-r from-fuchsia-300 to-sky-300 bg-clip-text text-transparent">Lean in.</span> Launch.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-3 max-w-md text-sm text-white/55"
        >
          A spring-physics dock that magnifies the icons you reach for. Move the cursor — watch the neighbours tilt up.
        </motion.p>
      </div>

      {/* The dock itself */}
      <div
        onMouseMove={handleMove}
        onMouseLeave={() => mouseX.set(-9999)}
        className="absolute inset-x-0 bottom-6 z-30 flex justify-center px-4"
      >
        <div
          className={cn(
            "relative flex items-end gap-3 rounded-2xl px-3 py-2",
            "border border-white/10 bg-white/[0.04] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl",
            "ring-1 ring-inset ring-white/5",
          )}
        >
          {/* top sheen */}
          <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

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

      {/* corner glow */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-3xl" />
    </div>
  );
}
