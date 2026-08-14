import { cn } from "@/lib/utils";

/** MarqueeWordsHero — Words slide on a marquee. */
const WORDS_A = ["ANIMATE", "BUILD", "SHIP", "CREATE", "INSPIRE"];
const WORDS_B = ["MOTION", "MAGIC", "WONDER", "FORMS", "FLOW"];
export default function MarqueeWordsHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#08020e] flex flex-col items-center justify-center", className)}>
      <p className="text-xs uppercase tracking-[0.5em] text-white/50 mb-2">A library of</p>
      <div className="w-full overflow-hidden">
        <div className="flex animate-[marquee_22s_linear_infinite] gap-6 whitespace-nowrap">
          {[...WORDS_A, ...WORDS_A, ...WORDS_A].map((w, i) => (
            <span key={i} className="text-7xl md:text-8xl font-black text-white tracking-tighter">{w}</span>
          ))}
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex animate-[marquee-reverse_18s_linear_infinite] gap-6 whitespace-nowrap">
          {[...WORDS_B, ...WORDS_B, ...WORDS_B].map((w, i) => (
            <span key={i} className="text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">{w}</span>
          ))}
        </div>
      </div>
      <p className="text-xs text-white/50 mt-3">— 90 components. 9 categories. Zero boilerplate.</p>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} } @keyframes marquee-reverse { 0%{transform:translateX(-33.33%)} 100%{transform:translateX(0)} }`}</style>
    </div>
  );
}
