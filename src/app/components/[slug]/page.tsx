import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import fs from "fs";
import path from "path";

import { COMPONENTS_DATA } from "@/data/components";
import DimensionalButton from "@/components/library/buttons/DimensionalButton";
import LiquidText from "@/components/library/text-animations/LiquidText";
import ConnectCard from "@/components/library/cards/ConnectCard";
import GravityWell from "@/components/library/interactive/GravityWell";
import TimeFracture from "@/components/library/text-animations/TimeFracture";
import { MagneticConstellation } from "@/components/three/MagneticConstellation";
import { ParticleOrganism } from "@/components/three/ParticleOrganism";
import { LazyCanvas } from "@/components/three/LazyCanvas";
import { ImpossibleGrid } from "@/components/ui/ImpossibleGrid";
import RecursiveWindowDemo from "@/components/library/interactive/RecursiveWindowDemo";
import { PortalCircles } from "@/components/ui/PortalCircles";
import { ComponentPreview } from "@/components/ui/ComponentPreview";
import QuantumFoam from "@/components/library/backgrounds/QuantumFoam";
import InkBloom from "@/components/library/backgrounds/InkBloom";
import OrbitalPlayground from "@/components/library/interactive/OrbitalPlayground";

import DotTextMorph from "@/components/library/text-animations/DotTextMorph";
import SlotWords from "@/components/library/text-animations/SlotWords";
import Conveyor from "@/components/library/backgrounds/Conveyor";
import SparkTrail from "@/components/library/cursors/SparkTrail";
import DotWave from "@/components/library/backgrounds/DotWave";
import BounceSticker from "@/components/library/interactive/BounceSticker";
import HoloTilt from "@/components/library/cards/HoloTilt";
import Starfield from "@/components/library/backgrounds/Starfield";
import HypnoRings from "@/components/library/backgrounds/HypnoRings";

import MagneticDockNavbar from "@/components/library/navbars/MagneticDockNavbar";
import { TraceButton } from "@/components/library/buttons/TraceButton";
import { WaveTextTransition } from "@/components/library/text-animations/WaveTextTransition";
import { WiperTextTransition } from "@/components/library/text-animations/WiperTextTransition";
import { WindmillTextTransition } from "@/components/library/text-animations/WindmillTextTransition";
import { TriangleShutterTransition } from "@/components/library/text-animations/TriangleShutterTransition";
import { PaperFoldTextTransition } from "@/components/library/text-animations/PaperFoldTextTransition";
import { CenterExpandPageTransition } from "@/components/library/transitions/CenterExpandPageTransition";
import { DiagonalSlidePageTransition } from "@/components/library/transitions/DiagonalSlidePageTransition";
import { TraditionalSliceCopyButton } from "@/components/library/buttons/TraditionalSliceCopyButton";
import { NeonGravityCopyButton } from "@/components/library/buttons/NeonGravityCopyButton";
import { WeaveThreadLoader } from "@/components/library/loaders/WeaveThreadLoader";
import { LiquidTextFillLoader } from "@/components/library/loaders/LiquidTextFillLoader";
import { DepthPressWaveText } from "@/components/library/text-animations/DepthPressWaveText";
import { NeuralConstellationHero } from "@/components/library/interactive/NeuralConstellationHero";
import { VinylDeckPlayer } from "@/components/library/interactive/VinylDeckPlayer";
import { InkBleedText } from "@/components/library/text-animations/InkBleedText";
import { LiquidTrailUnderlineText } from "@/components/library/text-animations/LiquidTrailUnderlineText";
import { MagneticScatterText } from "@/components/library/text-animations/MagneticScatterText";
import { FractalPulseLoader } from "@/components/library/loaders/FractalPulseLoader";



import BioluminescentWavePattern from "@/components/library/backgrounds/BioluminescentWavePattern";
import EtherFieldPattern from "@/components/library/backgrounds/EtherFieldPattern";
import MagneticParticlesPattern from "@/components/library/backgrounds/MagneticParticlesPattern";
import TopoFlowPattern from "@/components/library/backgrounds/TopoFlowPattern";
import GravityLensGridBackground from "@/components/library/backgrounds/GravityLensGridBackground";
import BoidSwarmBackground from "@/components/library/backgrounds/BoidSwarmBackground";
import ClothPokeBackground from "@/components/library/backgrounds/ClothPokeBackground";
import ColorFloodCopyButton from "@/components/library/buttons/ColorFloodCopyButton";
import MorphingLoginForm from "@/components/library/logins/MorphingLoginForm";
import LiquidGooeyLogin from "@/components/library/logins/LiquidGooeyLogin";
import TerminalLineLogin from "@/components/library/logins/TerminalLineLogin";
import DragToPayCard from "@/components/library/cards/DragToPayCard";
import ShipVoyageLogin from "@/components/library/logins/ShipVoyageLogin";
import HarborFleetLogin from "@/components/library/logins/HarborFleetLogin";
import CartoonRocketLogin from "@/components/library/logins/CartoonRocketLogin";
import CartoonToasterLogin from "@/components/library/logins/CartoonToasterLogin";
import ModernScannerLogin from "@/components/library/logins/ModernScannerLogin";


import AuroraEdgeCard from "@/components/library/cards/AuroraEdgeCard";
import BeamConvergenceCard from "@/components/library/cards/BeamConvergenceCard";
import FrostedGlassCard from "@/components/library/cards/FrostedGlassCard";
import HolographicFoilCard from "@/components/library/cards/HolographicFoilCard";
import IrisScanCard from "@/components/library/cards/IrisScanCard";
import KineticMorphCard from "@/components/library/cards/KineticMorphCard";
import LiquidChromeCard from "@/components/library/cards/LiquidChromeCard";
import MagneticTiltCard from "@/components/library/cards/MagneticTiltCard";
import NeonRippleCard from "@/components/library/cards/NeonRippleCard";
import ParallaxStackCard from "@/components/library/cards/ParallaxStackCard";
import Galaxy3D from "@/components/library/3d/Galaxy3D";
import GlassOrb3D from "@/components/library/3d/GlassOrb3D";
import FloatingGeometry3D from "@/components/library/3d/FloatingGeometry3D";
import WobbleBlob3D from "@/components/library/3d/WobbleBlob3D";
import RefractionSphere3D from "@/components/library/3d/RefractionSphere3D";
import ParticleGalaxy3D from "@/components/library/3d/ParticleGalaxy3D";
import TunnelWarp3D from "@/components/library/3d/TunnelWarp3D";
import LiquidMetal3D from "@/components/library/3d/LiquidMetal3D";
import IridescentShell3D from "@/components/library/3d/IridescentShell3D";
import CardDeck3D from "@/components/library/3d/CardDeck3D";

import ThreeDPressButton from "@/components/library/buttons/ThreeDPressButton";
import AuroraSweepButton from "@/components/library/buttons/AuroraSweepButton";
import ChromaticShiftButton from "@/components/library/buttons/ChromaticShiftButton";
import GlitchNeonButton from "@/components/library/buttons/GlitchNeonButton";
import InkSplashButton from "@/components/library/buttons/InkSplashButton";
import LiquidMetalButton from "@/components/library/buttons/LiquidMetalButton";
import MagneticMorphButton from "@/components/library/buttons/MagneticMorphButton";
import PortalRippleButton from "@/components/library/buttons/PortalRippleButton";
import QuantumToggleButton from "@/components/library/buttons/QuantumToggleButton";
import StarBurstButton from "@/components/library/buttons/StarBurstButton";

import DOMBoxFlipTransition from "@/components/library/transitions/DOMBoxFlipTransition";
import PixelWavePageTransition from "@/components/library/transitions/PixelWavePageTransition";


const RENDER_MAP: Record<string, React.ReactNode> = {

  "galaxy-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><Galaxy3D /></div>,
  "glass-orb-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><GlassOrb3D /></div>,
  "floating-geometry-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><FloatingGeometry3D /></div>,
  "wobble-blob-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><WobbleBlob3D /></div>,
  "refraction-sphere-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><RefractionSphere3D /></div>,
  "particle-galaxy-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><ParticleGalaxy3D /></div>,
  "tunnel-warp-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><TunnelWarp3D /></div>,
  "liquid-metal-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><LiquidMetal3D /></div>,
  "iridescent-shell-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><IridescentShell3D /></div>,
  "card-deck-3d": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><CardDeck3D /></div>,

  "aurora-edge-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><AuroraEdgeCard /></div>,
  "beam-convergence-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><BeamConvergenceCard /></div>,
  "frosted-glass-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><FrostedGlassCard /></div>,
  "holographic-foil-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><HolographicFoilCard /></div>,
  "iris-scan-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><IrisScanCard /></div>,
  "kinetic-morph-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><KineticMorphCard /></div>,
  "liquid-chrome-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><LiquidChromeCard /></div>,
  "magnetic-tilt-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><MagneticTiltCard /></div>,
  "neon-ripple-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><NeonRippleCard /></div>,
  "parallax-stack-card": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><ParallaxStackCard /></div>,


  "dimensional-button": <DimensionalButton />,
  "liquid-text": <LiquidText text="Fluid" />,
  "connect-card": <div className="w-full max-w-[280px] aspect-[4/3] relative scale-[0.6] origin-center"><ConnectCard /></div>,
  "gravity-well": <div className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center"><GravityWell /></div>,
  "time-fracture": <TimeFracture text="SPLIT" />,
  "magnetic-constellation": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><LazyCanvas><MagneticConstellation /></LazyCanvas></div>,
  "particle-organism": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><LazyCanvas><ParticleOrganism /></LazyCanvas></div>,
  "impossible-grid": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><ImpossibleGrid /></div>,
  "recursive-window": <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden scale-[0.8]"><RecursiveWindowDemo /></div>,
  "portal-circles": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><PortalCircles /></div>,
  "quantum-foam": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><QuantumFoam /></div>,
  "ink-bloom": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><InkBloom /></div>,
  "orbital-playground": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><OrbitalPlayground /></div>,
  "dot-morph": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29]"><DotTextMorph /></div>,
  "slot-words": <div className="absolute inset-0 pointer-events-none bg-[#0C1E29] flex items-center justify-center"><SlotWords className="text-4xl font-extrabold text-[#FFFE15]" /></div>,
  "conveyor": <div className="absolute inset-0 pointer-events-none"><Conveyor /></div>,
  "spark-trail": <div className="absolute inset-0 pointer-events-none"><SparkTrail /></div>,
  "dot-wave": <div className="absolute inset-0 pointer-events-none"><DotWave /></div>,
  "bounce-sticker": <div className="absolute inset-0 pointer-events-none"><BounceSticker /></div>,
  "holo-tilt": <div className="absolute inset-0 pointer-events-none"><HoloTilt /></div>,
  "starfield": <div className="absolute inset-0 pointer-events-none"><Starfield /></div>,
  "hypno-rings": <div className="absolute inset-0 pointer-events-none"><HypnoRings /></div>,
  "magnetic-dock-navbar": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center"><MagneticDockNavbar /></div>,
  "bioluminescent-wave-pattern": <div className="absolute inset-0 pointer-events-none"><BioluminescentWavePattern /></div>,
  "ether-field-pattern": <div className="absolute inset-0 pointer-events-none"><EtherFieldPattern /></div>,
  "magnetic-particles-pattern": <div className="absolute inset-0 pointer-events-auto"><MagneticParticlesPattern /></div>,
  "topo-flow-pattern": <div className="absolute inset-0 pointer-events-none"><TopoFlowPattern /></div>,
  "trace-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center"><TraceButton /></div>,
  "wave-text-transition": <div className="w-full pointer-events-auto flex items-center justify-center"><WaveTextTransition /></div>,
  "wiper-text-transition": <div className="w-full pointer-events-auto flex items-center justify-center"><WiperTextTransition /></div>,
  "windmill-text-transition": <div className="w-full pointer-events-auto flex items-center justify-center"><WindmillTextTransition /></div>,
  "triangle-shutter-transition": <div className="w-full pointer-events-auto flex items-center justify-center"><TriangleShutterTransition /></div>,
  "paper-fold-text-transition": <div className="w-full pointer-events-auto flex items-center justify-center"><PaperFoldTextTransition /></div>,
  "center-expand-page-transition": <div className="w-full pointer-events-auto flex items-center justify-center"><CenterExpandPageTransition /></div>,
  "diagonal-slide-page-transition": <div className="w-full pointer-events-auto flex items-center justify-center"><DiagonalSlidePageTransition /></div>,
  "traditional-slice-copy-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><TraditionalSliceCopyButton /></div>,
  "neon-gravity-copy-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><NeonGravityCopyButton /></div>,
  "weave-thread-loader": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><WeaveThreadLoader /></div>,
  "liquid-text-fill-loader": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><LiquidTextFillLoader /></div>,
  "depth-press-wave-text": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><DepthPressWaveText /></div>,
  "neural-constellation-hero": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><div className="w-full max-w-5xl"><NeuralConstellationHero /></div></div>,
  "vinyl-deck-player": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><VinylDeckPlayer /></div>,
  "ink-bleed-text": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><InkBleedText /></div>,
  "liquid-trail-underline-text": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><LiquidTrailUnderlineText /></div>,
  "magnetic-scatter-text": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><MagneticScatterText /></div>,
  "fractal-pulse-loader": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><FractalPulseLoader /></div>,
  "gravity-lens-grid": <div className="w-full h-full pointer-events-auto overflow-hidden"><GravityLensGridBackground /></div>,
  "boid-swarm": <div className="w-full h-full pointer-events-auto overflow-hidden"><BoidSwarmBackground /></div>,
  "cloth-poke": <div className="w-full h-full pointer-events-auto overflow-hidden"><ClothPokeBackground /></div>,
  "color-flood-copy-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><ColorFloodCopyButton /></div>,
  "morphing-login-form": <div className="w-full h-full pointer-events-auto"><MorphingLoginForm /></div>,
  "liquid-gooey-login": <div className="w-full h-full pointer-events-auto"><LiquidGooeyLogin /></div>,
  "terminal-line-login": <div className="w-full h-full pointer-events-auto"><TerminalLineLogin /></div>,
  "drag-to-pay-card": <div className="w-full h-full pointer-events-auto"><DragToPayCard /></div>,
  "ship-voyage-login": <div className="w-full h-full pointer-events-auto"><ShipVoyageLogin /></div>,
  "harbor-fleet-login": <div className="w-full h-full pointer-events-auto"><HarborFleetLogin /></div>,
  "cartoon-rocket-login": <div className="w-full h-full pointer-events-auto"><CartoonRocketLogin /></div>,
  "cartoon-toaster-login": <div className="w-full h-full pointer-events-auto"><CartoonToasterLogin /></div>,
  
  "modern-scanner-login": <div className="w-full h-full pointer-events-auto"><ModernScannerLogin /></div>,

  "three-d-press-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><ThreeDPressButton /></div>,
  "aurora-sweep-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><AuroraSweepButton /></div>,
  "chromatic-shift-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><ChromaticShiftButton /></div>,
  "glitch-neon-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><GlitchNeonButton /></div>,
  "ink-splash-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><InkSplashButton /></div>,
  "liquid-metal-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><LiquidMetalButton /></div>,
  "magnetic-morph-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><MagneticMorphButton /></div>,
  "portal-ripple-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><PortalRippleButton /></div>,
  "quantum-toggle-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><QuantumToggleButton /></div>,
  "star-burst-button": <div className="w-full h-full pointer-events-auto flex items-center justify-center"><StarBurstButton /></div>,

  "dom-box-flip-transition": <div className="w-full h-full pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden"><DOMBoxFlipTransition /></div>,
  "pixel-wave-page-transition": <div className="w-full h-full pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden"><PixelWavePageTransition /></div>,
  };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPONENTS_DATA[slug];
  
  if (!data) {
    return { title: "Component Not Found | MayaKit" };
  }

  return {
    title: `${data.title} | MayaKit`,
    description: data.description,
  };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = COMPONENTS_DATA[slug];

  if (!data) {
    notFound();
  }

  // Dynamically read the component source code from the file system
  const filePath = path.join(process.cwd(), "src", "components", "library", data.filename);
  let rawCode = "";
  try {
    rawCode = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Failed to read file: " + filePath, error);
    rawCode = "// Source code not found";
  }

  // Import custom theme dynamically to avoid client boundary issues
  const { mayakitTheme } = await import("@/lib/shiki-theme");

  // Render code using shiki
  const codeHtml = await codeToHtml(rawCode, {
    lang: "tsx",
    theme: mayakitTheme,
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-10 mt-6">
          <Link href="/components" className="font-mono text-sm font-bold text-foreground/60 transition-colors hover:text-primary">
            ← Back to Components
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center rounded-none border border-border bg-muted px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary">
            {data.category}
          </div>
          <h1 className="mb-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {data.title}
          </h1>
          <p className="max-w-2xl font-body text-lg text-foreground/80">
            {data.description}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Live Preview */}
          <div className="flex-1 lg:w-3/5">
            <ComponentPreview codeHtml={codeHtml} rawCode={rawCode}>
              {RENDER_MAP[slug]}
            </ComponentPreview>
          </div>

          {/* RIGHT: Metadata Sidebar */}
          <div className="lg:w-2/5 flex flex-col gap-10">
            {/* Category Tag */}
            <div>
              <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                Category
              </h3>
              <div className="inline-flex rounded-none border border-border bg-muted px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                {data.category}
              </div>
            </div>

            {/* Installation */}
            <div>
              <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                Installation
              </h3>
              <div className="rounded-none border border-border bg-muted p-4 font-mono text-sm text-foreground/80">
                {data.installation}
              </div>
            </div>

            {/* Dependencies */}
            <div>
              <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                Dependencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.dependencies.map(dep => (
                  <span key={dep} className="rounded-none border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-xs text-foreground/80">
                    {dep}
                  </span>
                ))}
              </div>
            </div>

            {/* Props */}
            {data.props.length > 0 && (
              <div className="relative">
                {/* Decorative Corner Motif */}
                <span className="absolute -right-[1px] -top-[1px] h-3 w-3 border-r-2 border-t-2 border-primary pointer-events-none" />
                
                <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Props / Usage
                </h3>
                <div className="flex flex-col gap-3">
                  {data.props.map((prop, idx) => (
                    <div key={idx} className="flex flex-col border border-border bg-muted p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-primary">{prop.name}</span>
                        <span className="font-mono text-xs text-foreground/50">{prop.type}</span>
                      </div>
                      <span className="font-mono text-xs text-foreground/70">
                        Default: {prop.default}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
