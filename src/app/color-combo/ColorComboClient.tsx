"use client";

import React, { useState } from "react";
import Link from "next/link";
import HexCopyButton from "@/components/ui/HexCopyButton";
import { Palette } from "@/data/palettes";
import { Underdog } from "next/font/google";

const underdog = Underdog({ weight: '400', subsets: ['latin'], variable: '--font-underdog' });

const colorNames: Record<string, string> = {
  "#C1DFEA": "Mint Ice", "#024223": "Deep Pine",
  "#CEFF8A": "Volt Green", "#143732": "Dark Teal",
  "#EFD359": "Cyber Yellow", "#245BFD": "Neon Blue",
  "#EBEEDF": "Oat Milk", "#333C30": "Matcha",
  "#FCFCC0": "Pale Lemon", "#8263EC": "Electric Violet",
  "#FFE089": "Soft Amber", "#94422A": "Rust",
  "#59058E": "Deep Purple", "#DDCDE8": "Lavender",
  "#FFEA00": "Safety Yellow", "#FC3E03": "Kinetic Red",
  "#F3EEE6": "Parchment", "#581000": "Terracotta",
  "#FF6A5C": "Ind. Flame", "#081120": "Midnight Iron",
  "#2AF5C8": "Mint Laser", "#141414": "Vantablack",
  "#FF8135": "Tangerine", "#015B63": "Deep Cyan",
  "#B14EFF": "Ultraviolet", "#0A1633": "Abyss Blue",
  "#E5E5E5": "Cloud White", "#553621": "Leather Brown",
  "#F1E8DB": "Dough", "#636B2F": "Olive Oil",
  "#00E7FF": "Cyan Optic", "#17181C": "Charcoal",
  "#CBDC3E": "Lime Energy", "#164717": "Dark Moss",
  "#FAF8C0": "Vanilla Cream", "#224E6F": "Blueberry",
  "#5C0E14": "Mahogany", "#F0E193": "Gold Leaf",
  "#E84F5E": "Strawberry", "#FCDFC5": "White Choc",
  "#D7EAE2": "Sage Breeze", "#4B421B": "Earth Brown",
  "#F3E5C3": "Vanilla Bean", "#174E4F": "Deep Teal",
  "#2772A0": "Graphite Blue", "#CCDDEA": "Sky Tint",
  "#D4AF37": "Gold Leaf", "#0B1F3A": "Obsidian",
  "#8ED968": "Terminal Green", "#103C1F": "Void Green",
  "#ABCBA2": "Forest Sage", "#1A2417": "Bark",
  "#0F4C3A": "Luggage Green", "#C67C4E": "Tan Leather",
  "#021F94": "Aero Blue", "#F5F2F3": "Cloud",
  "#1F0E06": "Storybook Ink", "#C6E385": "Katha Green",
  "#151130": "Indigo Night", "#C8BEFA": "Berry Violet",
  "#5A2132": "Carpet Wine", "#EFE9E9": "Silk White",
  "#0F4B70": "Ocean Depth", "#C4F8FF": "Aqua Glass",
  "#202B22": "Seaweed", "#FFD85F": "Crisp Yellow",
  "#035352": "Dairy Teal", "#F3E8BC": "Cream",
  "#1E223D": "Pipe Iron", "#F54F1B": "Industrial Orange"
};

const AVAILABLE_TAGS = [
  "Soft", "Classic", "Nostalgic", "Vivid", "Luxury", "Bright", "Deep", "Cozy", "Crisp", "Tropical", "Autumn", "Frost", "Bloom", "Joyful", "Organic", "Terrestrial", "Midnight", "Cosmic"
];

function getContrastYIQ(hexcolor: string) {
  const hex = hexcolor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 2), 16);
  const b = parseInt(hex.substring(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}

export default function ColorComboClient({ palettes }: { palettes: Palette[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTag = (tag: string) => {
    setActiveTag(prev => prev === tag ? null : tag);
  };

  const filteredPalettes = palettes.filter(p => {
    const matchesTag = activeTag === null || (p.tags && p.tags.includes(activeTag));
    const normalizedId = p.id.replace(/-/g, " ").toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === "" || normalizedId.includes(query) || p.id.toLowerCase().includes(query);
    return matchesTag && matchesSearch;
  });

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="mb-12 flex flex-col gap-6">
        {/* Search Input */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search palettes (e.g. school mint, hero streetwear)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map(tag => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`
                  px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider
                  transition-all duration-[160ms] ease-out active:scale-[0.97]
                  ${isActive 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-transparent text-foreground/60 border-border hover:border-foreground/30 hover:text-foreground"
                  }
                  border
                `}
                style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredPalettes.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPalettes.map((palette) => (
            <div 
              key={palette.id}
              className="group relative flex flex-col border border-border bg-card overflow-hidden"
            >
              {/* Color Swatches */}
              <div className="flex flex-col h-48 w-full">
                {palette.colors.map((color, index) => {
                  const textColor = palette.colors[1 - index];
                  const colorName = colorNames[color] || "Unknown Color";
                  return (
                    <div 
                      key={color} 
                      className="h-full flex-1 flex flex-col items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      style={{ backgroundColor: color }}
                    >
                      <span 
                        className={`text-xl uppercase tracking-widest pointer-events-none select-none ${underdog.className}`}
                        style={{ color: textColor }}
                      >
                        {colorName}
                      </span>
                      <HexCopyButton hex={color} textColor={textColor} />
                    </div>
                  );
                })}
              </div>

              {/* Card Footer */}
              <div className="relative flex flex-col justify-between p-6 bg-card z-10 border-t border-border">
                <div className="mb-6">
                  <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-foreground">
                    {palette.id.replace("-", " ")}
                  </h3>
                  {palette.topicOverride && (
                    <p className="mt-2 font-mono text-xs text-foreground/50 uppercase tracking-widest">
                      Theme: {palette.topicOverride}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Link 
                    href={`/color-combo/${palette.id}`}
                    className="inline-flex items-center justify-between border border-border bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-background transition-all hover:bg-primary hover:text-primary-foreground focus:outline-none active:scale-[0.97]"
                    style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                  >
                    <span>Preview Demo</span>
                    <span>→</span>
                  </Link>
                  <Link 
                    href={`/color-combo/${palette.id}?swapped=true`}
                    className="inline-flex items-center justify-between border border-border bg-transparent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:bg-foreground hover:text-background focus:outline-none active:scale-[0.97]"
                    style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                  >
                    <span>Preview Swapped</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="font-mono text-lg text-foreground/50">No palettes match the selected filters.</p>
          <button 
            onClick={() => { setActiveTag(null); setSearchQuery(""); }}
            className="mt-4 font-mono text-sm font-bold text-primary hover:underline underline-offset-4"
          >
            Clear filters and search
          </button>
        </div>
      )}
    </>
  );
}
