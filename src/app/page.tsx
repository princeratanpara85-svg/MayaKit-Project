import { Hero } from "@/components/ui/Hero";
import { FeaturedComponentsGrid } from "@/components/ui/FeaturedComponentsGrid";
import { RecursiveWindow } from "@/components/ui/RecursiveWindow";
import { MotionPhilosophy } from "@/components/ui/MotionPhilosophy";
import { OrganismSection } from "@/components/ui/OrganismSection";
import { ColorComboTeaser } from "@/components/ui/ColorComboTeaser";
import { StatsStrip } from "@/components/ui/StatsStrip";
import { ClosingCTA } from "@/components/ui/ClosingCTA";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedComponentsGrid />
      <RecursiveWindow />
      <MotionPhilosophy />
      <OrganismSection />
      <ColorComboTeaser />
      <StatsStrip />
      <ClosingCTA />
    </div>
  );
}
