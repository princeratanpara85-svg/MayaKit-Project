import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Box, Layers, Image as ImgIcon, Rocket, MousePointer2, Menu, Wand2, Cuboid, Github, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import * as Patterns from "./components/01-patterns/_index";
import * as Cards from "./components/02-cards/_index";
import * as Bg from "./components/03-backgrounds/_index";
import * as Gallery from "./components/04-image-galleries/_index";
import * as Hero from "./components/05-hero-sections/_index";
import * as Buttons from "./components/06-buttons/_index";
import * as Navbar from "./components/07-navbars/_index";
import * as Interactive from "./components/08-interactive/_index";
import * as ThreeD from "./components/09-3d/_index";

const CATEGORIES = [
  { id: "patterns",       name: "Patterns",        icon: Sparkles,    color: "from-fuchsia-500 to-pink-500",  count: 10 },
  { id: "cards",          name: "Cards",           icon: Layers,      color: "from-violet-500 to-purple-500", count: 10 },
  { id: "backgrounds",    name: "Backgrounds",     icon: Box,         color: "from-cyan-500 to-blue-500",     count: 10 },
  { id: "image-galleries",name: "Image Galleries", icon: ImgIcon,     color: "from-amber-500 to-orange-500",  count: 10 },
  { id: "hero-sections",  name: "Hero Sections",   icon: Rocket,      color: "from-emerald-500 to-teal-500",  count: 10 },
  { id: "buttons",        name: "Buttons",         icon: MousePointer2, color: "from-rose-500 to-red-500",    count: 10 },
  { id: "navbars",        name: "Navbars",         icon: Menu,        color: "from-indigo-500 to-blue-500",   count: 10 },
  { id: "interactive",    name: "Interactive",     icon: Wand2,       color: "from-yellow-500 to-amber-500",  count: 10 },
  { id: "3d",             name: "3D",              icon: Cuboid,      color: "from-sky-500 to-cyan-500",      count: 10 },
] as const;

const REGISTRY: Record<string, Record<string, React.ComponentType>> = {
  patterns: Patterns as any,
  cards: Cards as any,
  backgrounds: Bg as any,
  "image-galleries": Gallery as any,
  "hero-sections": Hero as any,
  buttons: Buttons as any,
  navbars: Navbar as any,
  interactive: Interactive as any,
  "3d": ThreeD as any,
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="absolute top-3 right-3 z-20 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur p-2 text-xs text-white/90 transition-all opacity-0 group-hover:opacity-100"
    >
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
}

function CategoryCard({ id, name, icon: Icon, color, count, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all",
        "hover:border-white/20 hover:bg-white/[0.07]"
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity", color)} />
      <div className={cn("mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", color)}>
        <Icon className="text-white" size={22} />
      </div>
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="mt-1 text-sm text-white/50">{count} unique components</p>
    </motion.button>
  );
}

function ComponentGrid({ categoryId, onBack }: { categoryId: string; onBack: () => void }) {
  const components = REGISTRY[categoryId];
  const cat = CATEGORIES.find(c => c.id === categoryId)!;
  const Icon = cat.icon;
  const entries = Object.entries(components);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-white/60 hover:text-white flex items-center gap-2">
            ← Back to categories
          </button>
          <div className="flex items-center gap-3">
            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br", cat.color)}>
              <Icon size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">{cat.name}</h2>
            <span className="text-sm text-white/40">· {entries.length} components</span>
          </div>
          <a href="https://github.com" className="text-sm text-white/60 hover:text-white flex items-center gap-2">
            <Github size={16} /> Star on GitHub
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map(([name, Comp]) => (
            <div key={name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01]">
              <CopyButton code={`<${name} />`} />
              <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-white/80">{name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-white/30">Live Preview</span>
              </div>
              <div className="relative h-[340px] overflow-hidden border-t border-white/5">
                <Comp />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {active ? (
          <ComponentGrid key="grid" categoryId={active} onBack={() => setActive(null)} />
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
              <Bg.WarpDriftBackground />
              <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur mb-8"
                >
                  <Sparkles size={12} className="text-fuchsia-400" />
                  90+ mind-blowing animated components · 100% free & open source
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-6xl md:text-8xl font-bold tracking-tight text-balance"
                >
                  Animations that
                  <br />
                  <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    break the internet.
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto text-balance"
                >
                  A hand-crafted, never-seen-before library of animated React components. Copy, paste, ship. Built with React, Tailwind, Framer Motion, Three.js &amp; GSAP.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                  <Buttons.LiquidMetalButton />
                  <Buttons.StarBurstButton />
                </motion.div>
              </div>
            </section>

            {/* CATEGORIES */}
            <section className="relative max-w-7xl mx-auto px-6 py-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-3">Pick your weapon.</h2>
                <p className="text-white/50 text-lg">9 categories · 90 components · 0 boring defaults.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CATEGORIES.map(cat => (
                  <CategoryCard key={cat.id} {...cat} onClick={() => setActive(cat.id)} />
                ))}
              </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/5 py-10 text-center text-sm text-white/40">
              Built with <span className="text-fuchsia-400">♥</span> by AnimFlow · MIT License · Inspired by the open-source Chinese frontend community.
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
