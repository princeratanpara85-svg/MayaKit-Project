import { motion, useScroll, useSpring } from "framer-motion";
import { Layers, Box, Image as ImgIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** ScrollProgressNavbar — Progress bar across the top, animated links. */
export default function ScrollProgressNavbar({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] p-4", className)}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 origin-left z-50" style={{ scaleX }} />
      <nav className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold">
          <Sparkles size={16} className="text-fuchsia-400" /> AnimFlow
        </div>
        <div className="flex items-center gap-1 text-xs text-white/70">
          <a className="px-2 py-1 hover:text-white inline-flex items-center gap-1"><Layers size={12} /> Cards</a>
          <a className="px-2 py-1 hover:text-white inline-flex items-center gap-1"><Box size={12} /> Bg</a>
          <a className="px-2 py-1 hover:text-white inline-flex items-center gap-1"><ImgIcon size={12} /> Gallery</a>
        </div>
        <button className="rounded-lg bg-white text-black px-2.5 py-1 text-xs font-semibold">Get</button>
      </nav>
      <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 max-h-44 overflow-y-auto">
        {Array.from({ length: 18 }).map((_, i) => (
          <p key={i} className="text-white/40 text-xs leading-6">Scroll the preview to see the progress bar fill · paragraph #{i + 1}</p>
        ))}
      </div>
    </div>
  );
}
