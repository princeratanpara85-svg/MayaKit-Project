"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { cn } from "@/lib/utils";
import { LazyComponent } from "@/components/ui/LazyComponent";

import { COMPONENTS_LIST } from "@/data/components";
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
import DOMBoxFlipTransition from "@/components/library/transitions/DOMBoxFlipTransition";
import PixelWavePageTransition from "@/components/library/transitions/PixelWavePageTransition";
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

  "aurora-edge-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><AuroraEdgeCard /></div>,
  "beam-convergence-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><BeamConvergenceCard /></div>,
  "frosted-glass-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><FrostedGlassCard /></div>,
  "holographic-foil-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><HolographicFoilCard /></div>,
  "iris-scan-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><IrisScanCard /></div>,
  "kinetic-morph-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><KineticMorphCard /></div>,
  "liquid-chrome-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><LiquidChromeCard /></div>,
  "magnetic-tilt-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><MagneticTiltCard /></div>,
  "neon-ripple-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><NeonRippleCard /></div>,
  "parallax-stack-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><ParallaxStackCard /></div>,
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
  "wave-text-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><WaveTextTransition /></div>,
  "wiper-text-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><WiperTextTransition /></div>,
  "windmill-text-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><WindmillTextTransition /></div>,
  "triangle-shutter-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><TriangleShutterTransition /></div>,
  "paper-fold-text-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><PaperFoldTextTransition /></div>,
  "center-expand-page-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><CenterExpandPageTransition /></div>,
  "diagonal-slide-page-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><DiagonalSlidePageTransition /></div>,
  "traditional-slice-copy-button": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><TraditionalSliceCopyButton /></div>,
  "neon-gravity-copy-button": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><NeonGravityCopyButton /></div>,
  "weave-thread-loader": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.8] origin-center"><WeaveThreadLoader /></div>,
  "liquid-text-fill-loader": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><LiquidTextFillLoader /></div>,
  "depth-press-wave-text": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><DepthPressWaveText /></div>,
  "neural-constellation-hero": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.5] origin-center"><div className="w-full min-w-[800px]"><NeuralConstellationHero /></div></div>,
  "vinyl-deck-player": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><VinylDeckPlayer /></div>,
  "ink-bleed-text": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><InkBleedText /></div>,
  "liquid-trail-underline-text": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><LiquidTrailUnderlineText /></div>,
  "magnetic-scatter-text": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.6] origin-center"><MagneticScatterText /></div>,
  "fractal-pulse-loader": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.8] origin-center"><FractalPulseLoader /></div>,
  "gravity-lens-grid": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><div className="scale-[0.5] origin-top h-[200%] w-[200%] -ml-[50%]"><GravityLensGridBackground /></div></div>,
  "boid-swarm": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><div className="scale-[0.5] origin-top h-[200%] w-[200%] -ml-[50%]"><BoidSwarmBackground /></div></div>,
  "cloth-poke": <div className="absolute inset-0 pointer-events-auto overflow-hidden"><div className="scale-[0.5] origin-top h-[200%] w-[200%] -ml-[50%]"><ClothPokeBackground /></div></div>,
  "color-flood-copy-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><ColorFloodCopyButton /></div>,
  "morphing-login-form": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><MorphingLoginForm /></div>,
  "liquid-gooey-login": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><LiquidGooeyLogin /></div>,
  "terminal-line-login": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><TerminalLineLogin /></div>,
  "drag-to-pay-card": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><DragToPayCard /></div>,
  "ship-voyage-login": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><ShipVoyageLogin /></div>,
  "harbor-fleet-login": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><HarborFleetLogin /></div>,
  "cartoon-rocket-login": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><CartoonRocketLogin /></div>,
  "cartoon-toaster-login": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><CartoonToasterLogin /></div>,
  "modern-scanner-login": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><ModernScannerLogin /></div>,
  "three-d-press-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><ThreeDPressButton /></div>,
  "aurora-sweep-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><AuroraSweepButton /></div>,
  "chromatic-shift-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><ChromaticShiftButton /></div>,
  "glitch-neon-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><GlitchNeonButton /></div>,
  "ink-splash-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><InkSplashButton /></div>,
  "liquid-metal-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><LiquidMetalButton /></div>,
  "magnetic-morph-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><MagneticMorphButton /></div>,
  "portal-ripple-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><PortalRippleButton /></div>,
  "quantum-toggle-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><QuantumToggleButton /></div>,
  "star-burst-button": <div className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-hidden scale-[0.7] origin-center"><StarBurstButton /></div>,
  "dom-box-flip-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><DOMBoxFlipTransition /></div>,
  "pixel-wave-page-transition": <div className="absolute inset-0 pointer-events-auto bg-[#0C1E29] flex items-center justify-center overflow-hidden scale-[0.45] origin-center"><PixelWavePageTransition /></div>,
};

const CATEGORIES = [
  "All",
  "Image",
  "Buttons",
  "Loaders",
  "Backgrounds",
  "Cards",
  "Text Animations",
  "Cursors",
  "Navbars",
  "Interactive",
  "3D",
];

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredComponents = useMemo(() => {
    return COMPONENTS_LIST.filter((comp) => {
      const matchesCategory =
        activeCategory === "All" || comp.category === activeCategory;
      const matchesSearch = comp.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Page load animation
    gsap.from(".header-reveal", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

  }, { scope: containerRef });

  useGSAP(() => {
    // Grid item enter animation using ScrollTrigger batch
    if (gridRef.current && filteredComponents.length > 0) {
      // Clear previous animations if any
      gsap.killTweensOf(".grid-item");
      
      // Use batch to only animate items when they enter the viewport.
      // This prevents the massive global stagger lag when navigating backward.
      ScrollTrigger.batch(".grid-item", {
        interval: 0.1,
        batchMax: 15,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, scale: 0.95, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", overwrite: true }
          );
        },
        once: true
      });
      
      // Force a refresh so ScrollTrigger calculates positions correctly
      ScrollTrigger.refresh();
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [filteredComponents]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <div className="header-reveal mb-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-primary">
            The Library
          </div>
          <h1 className="header-reveal mb-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Browse the collection.
          </h1>
          <p className="header-reveal max-w-2xl font-body text-lg text-foreground/60">
            High-performance, copy-paste React components powered by GSAP and Tailwind CSS.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="header-reveal mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  rounded-none border px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200
                  ${
                    activeCategory === category
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-transparent text-foreground/80 hover:border-primary hover:text-primary"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-none border border-border bg-muted py-2 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="min-h-[400px]">
          {filteredComponents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredComponents.map((comp) => {
                return (
                  <div
                    key={comp.id}
                    className="grid-item group relative flex flex-col rounded-none border border-border bg-muted transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_#FFFE15] hover:border-primary"
                    onMouseEnter={() => setHoveredId(comp.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative flex h-56 w-full items-center justify-center overflow-hidden border-b border-border bg-background p-4">
                      <LazyComponent rootMargin="200px">
                        {comp.category === "3D & WebGL" && hoveredId !== comp.id ? (
                          <div className="flex flex-col items-center justify-center opacity-50 h-full">
                            <span className="font-mono text-xs uppercase tracking-widest">Hover to render 3D</span>
                          </div>
                        ) : (
                          RENDER_MAP[comp.id]
                        )}
                      </LazyComponent>
                    </div>
                    <div className="flex flex-col p-5">
                      <span className="mb-1 font-mono text-xs uppercase tracking-wider text-primary">
                        {comp.category}
                      </span>
                      <h3 className="font-body text-lg font-bold text-foreground">
                        {comp.title}
                      </h3>
                    </div>
                    {/* Absolute overlay link to make the whole card clickable without nesting <a> tags */}
                    <Link href={`/components/${comp.id}`} className="absolute inset-0 z-20">
                      <span className="sr-only">View {comp.title}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-64 w-full items-center justify-center border border-dashed border-border">
              <span className="font-mono text-sm text-foreground/50">
                No components found.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
