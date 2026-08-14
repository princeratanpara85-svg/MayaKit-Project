import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const LINES = [
  { t: "$ npx create-animflow-app", c: "text-cyan-300" },
  { t: "✓ Scaffolding project...", c: "text-white/60" },
  { t: "✓ Installing 215 packages", c: "text-white/60" },
  { t: "✓ Building hero scene", c: "text-white/60" },
  { t: "★ Ready in 4.2s", c: "text-emerald-300" },
  { t: "$ npm run dev", c: "text-cyan-300" },
  { t: "  ▲ Next.js 15.4", c: "text-white/70" },
  { t: "  - Local: http://localhost:3000", c: "text-white/60" },
];

/** TypewriterCode — Animated typing code block with syntax highlighting. */
export default function TypewriterCode({ className }: { className?: string }) {
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  useEffect(() => {
    if (lineIdx >= LINES.length) {
      const t = setTimeout(() => { setText(""); setLineIdx(0); setCharIdx(0); }, 2500);
      return () => clearTimeout(t);
    }
    const line = LINES[lineIdx].t;
    if (charIdx <= line.length) {
      const t = setTimeout(() => {
        setText(LINES.slice(0, lineIdx).map(l => l.t).join("\n") + (lineIdx > 0 ? "\n" : "") + line.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, 30);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIdx(i => i + 1); setCharIdx(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);
  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#04060a] p-4 font-mono text-xs", className)}>
      <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur h-full overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
          <Terminal size={12} className="text-white/60" />
          <span className="text-white/40">~/animflow</span>
        </div>
        <pre className="p-3 leading-5 whitespace-pre-wrap">
          {LINES.slice(0, lineIdx).map((l, i) => <div key={i} className={l.c}>{l.t}</div>)}
          {lineIdx < LINES.length && (
            <div className={LINES[lineIdx].c}>
              {text.split("\n").pop()}
              <motion.span className="inline-block w-2 h-3 bg-white ml-0.5 align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}
