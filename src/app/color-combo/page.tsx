import { Metadata } from "next";
import { palettes } from "@/data/palettes";
import ColorComboClient from "./ColorComboClient";

export const metadata: Metadata = {
  title: "Color Combos | MayaKit",
  description: "A collection of beautiful color palettes applied to full-page demo environments.",
};

export default function ColorComboGallery() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <h1 className="mb-6 font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Color Combos
          </h1>
          <p className="font-body text-xl text-foreground/80 leading-relaxed">
            Beautifully paired color palettes applied to full-page demo environments. 
            Each palette gets a custom layout that best suits its unique personality.
          </p>
        </div>

        {/* Client Gallery Grid */}
        <ColorComboClient palettes={palettes} />

      </div>
    </div>
  );
}
