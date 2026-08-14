import { cn } from "@/lib/utils";

const IMAGES = Array.from({ length: 8 }, (_, i) => ({
  h: 60 + (i * 17) % 80,
  c: ["from-rose-400 to-pink-600", "from-cyan-400 to-blue-600", "from-amber-400 to-orange-600", "from-violet-400 to-fuchsia-600", "from-emerald-400 to-teal-600", "from-sky-400 to-indigo-600", "from-yellow-400 to-rose-500", "from-fuchsia-400 to-purple-600"][i],
  t: ["Sky", "Ocean", "Desert", "Neon", "Forest", "Lagoon", "Sand", "Dusk"][i],
}));

/** InfiniteMarqueeGallery — 2-row marquee in opposite directions. */
export default function InfiniteMarqueeGallery({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08060f] flex flex-col justify-center gap-3", className)}>
      <div className="flex animate-[marquee_30s_linear_infinite] gap-3">
        {[...IMAGES, ...IMAGES].map((im, i) => (
          <div key={i} className={`flex-shrink-0 w-40 h-24 rounded-xl bg-gradient-to-br ${im.c} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-2 left-2 text-white text-xs font-medium">{im.t}</div>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
          </div>
        ))}
      </div>
      <div className="flex animate-[marquee-reverse_25s_linear_infinite] gap-3">
        {[...IMAGES.slice().reverse(), ...IMAGES.slice().reverse()].map((im, i) => (
          <div key={i} className={`flex-shrink-0 w-44 h-28 rounded-xl bg-gradient-to-br ${im.c} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-2 right-2 text-white/90 text-[10px] uppercase tracking-widest">#{(i + 10).toString().padStart(3, "0")}</div>
            <div className="absolute bottom-2 left-2 text-white text-xs font-medium">{im.t}</div>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} } @keyframes marquee-reverse { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }`}</style>
    </div>
  );
}
