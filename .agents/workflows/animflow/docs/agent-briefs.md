# AGENT BRIEFS — AnimFlow Component Generation

## Project Context
You are generating components for **AnimFlow**, a free open-source library of animated React components. The project lives at `/workspace/animflow`. It is a Vite + React 18 + TypeScript + Tailwind CSS v3 + Framer Motion + Three.js project. Run `npm run dev` from `/workspace/animflow` to preview.

## The Stacking Rules
- Each component is a **self-contained** `.tsx` file. You may import from `framer-motion`, `lucide-react`, `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, or local utilities.
- Tailwind is available; the `tailwind.config.js` has keyframes for `aurora`, `shimmer`, `meteor`, `beam`, `gradient-x`, `pulse-slow`, `wave`, `orbit`, `blob`, `glitch`, `tilt`, `noise`, `shine-sweep`.
- Use the `cn` helper from `@/lib/utils` for class merging.
- The `noise-bg` utility class is available (in `src/index.css`) for noise overlay.
- Wrap the component in `relative overflow-hidden` so the previews work.

## Inspiration Sources (REAL — Mix 2-3 per component)
- **H5-Dooring** (h5.dooring.cn, by @MrXujiang 徐小夕) — famous Chinese H5 low-code editor. Their hero scenes, marquee, drag-stack UX, ripple click, and "dooring" effect are legendary.
- **React Bits** (reactbits.dev) — 130+ components. Best text animations, blob cursor, magnet, dock, ballpit, distortion effects.
- **Magic UI** (magicui.design) — marquee, terminal, hero video, bento, dock, globe, orbiting circles, lens, border-beam, magic card, meteors, particles, warp background.
- **Aceternity UI** (ui.aceternity.com) — 3D card effect, background beams, background gradient, card hover effect, card stack, container scroll, glowing stars, Google Gemini effect, sparkles, parallax hero, hero parallax, aurora background.
- **21st.dev** — community-driven, three.js scenes, motion choreography.
- **Hover.dev** — magnetic micro-interactions.

## Hard Rules
1. **NEVER copy a component verbatim.** Every component must be a fresh remix that combines techniques from at least 2 different sources above. Add a unique twist.
2. **Self-contained file** — no relative imports from sibling components, only from `@/lib/utils` and external libs.
3. **No placeholders / TODOs / "lorem ipsum"** — every animation must actually work.
4. **Production-quality Tailwind** — use `cn()` to compose classes, use semantic classnames, ensure dark background contrast.
5. **At least one of these per component** to be "mind-blowing": particle system, shader/canvas, WebGL, magnetic physics, 3D transform, audio-reactive, scroll-linked, gesture, fluid sim, generative noise.
6. Default export a single React component, props optional.
7. Each component should be **340–420px tall** in the preview, full width.

## Working Directory
Each component goes into a category folder:
- `/workspace/animflow/src/components/01-patterns/`
- `/workspace/animflow/src/components/02-cards/`
- `/workspace/animflow/src/components/03-backgrounds/`
- `/workspace/animflow/src/components/04-image-galleries/`
- `/workspace/animflow/src/components/05-hero-sections/`
- `/workspace/animflow/src/components/06-buttons/`
- `/workspace/animflow/src/components/07-navbars/`
- `/workspace/animflow/src/components/08-interactive/`
- `/workspace/animflow/src/components/09-3d/`

The `_index.ts` barrel file is already created — DO NOT modify it. Just create the 10 referenced `.tsx` files in your category.

## Quality Bar
If a user looked at it for 5 seconds and didn't think "whoa, how was that made?" — it's not good enough. Push it further.

---

# CATEGORY 01 — PATTERNS
10 unique animated background patterns. Mix CSS keyframes, SVG, Canvas, Framer Motion, and shader-like effects.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `AuroraMeshPattern.tsx` | Flowing aurora mesh (gradient + noise + slow warp) |
| 02 | `LiquidChromaticPattern.tsx` | RGB-split chromatic blobs flowing on a dark background |
| 03 | `MagneticParticlesPattern.tsx` | Particles that bend toward the cursor like a magnetic field |
| 04 | `HyperbolicGridPattern.tsx` | A grid that warps in hyperbolic space, mouse-driven |
| 05 | `BioluminescentWavePattern.tsx` | Wave interference (sine fields overlapping) with glowing dots |
| 06 | `QuantumLatticePattern.tsx` | Quantum-dot lattice with periodic pulse traveling across it |
| 07 | `TopoFlowPattern.tsx` | Animated topographic contour lines flowing in a flow field |
| 08 | `ReactiveInkPattern.tsx` | Ink in water — metaball-like blobs that react to mouse |
| 09 | `HexShimmerPattern.tsx` | Hex grid with shimmering gradient traveling through cells |
| 10 | `EtherFieldPattern.tsx` | Generative vector field with luminous threads |

# CATEGORY 02 — CARDS
10 unique animated cards. Mix magnetic tilt, holographic foil, glassmorphism, beam convergence, etc.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `HolographicFoilCard.tsx` | Holographic rainbow foil that shifts on mouse-move |
| 02 | `MagneticTiltCard.tsx` | 3D tilt with cursor-tracked shine |
| 03 | `LiquidChromeCard.tsx` | Liquid chrome / mercury distortion in the card background |
| 04 | `BeamConvergenceCard.tsx` | Multiple light beams converge on the card title |
| 05 | `FrostedGlassCard.tsx` | Glassmorphism with progressive blur and noise |
| 06 | `AuroraEdgeCard.tsx` | Animated aurora border that follows the cursor |
| 07 | `KineticMorphCard.tsx` | Card edges morph / breathe, content slides in |
| 08 | `IrisScanCard.tsx` | Scanning iris / cyberpunk reveal |
| 09 | `NeonRippleCard.tsx` | Neon ripple on click, glow trail |
| 10 | `ParallaxStackCard.tsx` | Stacked cards with parallax depth on hover |

# CATEGORY 03 — BACKGROUNDS
10 unique animated backgrounds (used in the homepage hero too). Heavy WebGL / Canvas / shader.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `WarpDriftBackground.tsx` | Starfield warp-drift (the homepage hero bg) |
| 02 | `AuroraVeilBackground.tsx` | Aurora veil / northern lights in vertical color bands |
| 03 | `ParticleMeteorBackground.tsx` | Meteor shower particles on a noise field |
| 04 | `GridDistortionBackground.tsx` | Grid distorted by mouse / scroll |
| 05 | `LiquidGradientBackground.tsx` | Liquid gradient blobs morphing |
| 06 | `NeonStormBackground.tsx` | Electric storm with lightning flashes |
| 07 | `TopoContourBackground.tsx` | Topographic contour map, animated |
| 08 | `VortexPlasmaBackground.tsx` | Vortex / plasma tunnel with chromatic shift |
| 09 | `OrbitGalaxyBackground.tsx` | Orbiting galaxy spiral with stars |
| 10 | `GlitchMeshBackground.tsx` | Glitch / mesh distortion |

# CATEGORY 04 — IMAGE GALLERIES
10 unique animated image galleries. Use placeholder gradients/SVG art (not external images).

| # | Filename | Concept |
|---|----------|---------|
| 01 | `MagneticDragGallery.tsx` | Drag with magnetic snap-to-row |
| 02 | `Dome3DGallery.tsx` | Photos arranged on a 3D dome, rotate with drag |
| 03 | `InfiniteMarqueeGallery.tsx` | 2-row marquee in opposite directions |
| 04 | `Carousel3DGallery.tsx` | 3D carousel with depth perspective |
| 05 | `MasonryRevealGallery.tsx` | Masonry grid that reveals with stagger |
| 06 | `ShuffleStackGallery.tsx` | Cards shuffle / re-stack on click |
| 07 | `SpotlightHoverGallery.tsx` | Cursor spotlight reveals image |
| 08 | `VerticalParallaxGallery.tsx` | Scroll-driven vertical parallax columns |
| 09 | `ExpandingPolaroidGallery.tsx` | Polaroids expand on hover |
| 10 | `LiquidHoverGallery.tsx` | Liquid distortion on hover |

# CATEGORY 05 — HERO SECTIONS
10 unique animated hero sections. Use the component canvas as the hero.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `Scroll3DTunnelHero.tsx` | Scroll-driven 3D tunnel with title |
| 02 | `BeamConvergenceHero.tsx` | Beams converge on the title |
| 03 | `TypeShimmerHero.tsx` | Shimmer text reveal with rotating badges |
| 04 | `ParallaxDepthHero.tsx` | Mouse parallax depth, multi-layer |
| 05 | `GlitchRevealHero.tsx` | Glitch-reveal text effect |
| 06 | `AuroraVeilHero.tsx` | Aurora background + giant gradient title |
| 07 | `MarqueeWordsHero.tsx` | Words slide on a marquee |
| 08 | `FloatingOrbitHero.tsx` | Orbiting shapes around the title |
| 09 | `KineticTypeHero.tsx` | Kinetic typography, every letter animated |
| 10 | `HyperspaceHero.tsx` | Hyperspace / warp-tunnel hero |

# CATEGORY 06 — BUTTONS
10 unique animated buttons. Centered in the component area.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `LiquidMetalButton.tsx` | Liquid metal / mercury surface |
| 02 | `StarBurstButton.tsx` | Star burst on hover |
| 03 | `MagneticMorphButton.tsx` | Magnetic morph (chamfer / shape shift on hover) |
| 04 | `GlitchNeonButton.tsx` | Glitch neon |
| 05 | `PortalRippleButton.tsx` | Portal ripple on click |
| 06 | `AuroraSweepButton.tsx` | Aurora gradient sweep |
| 07 | `InkSplashButton.tsx` | Ink splash on click |
| 08 | `ChromaticShiftButton.tsx` | RGB-shift / chromatic on hover |
| 09 | `3DPressButton.tsx` | 3D press with depth + glow |
| 10 | `QuantumToggleButton.tsx` | Quantum-style toggle |

# CATEGORY 07 — NAVBARS
10 unique animated navbars. Top-of-component, full width.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `MagneticDockNavbar.tsx` | macOS-style dock with magnification |
| 02 | `PillScrollSpyNavbar.tsx` | Pill indicator that follows active item |
| 03 | `GlassCommandNavbar.tsx` | Command-K style, glass + spotlight |
| 04 | `MegaDropdownNavbar.tsx` | Mega dropdown with smooth reveal |
| 05 | `LiquidBubbleNavbar.tsx` | Liquid bubble that morphs to active |
| 06 | `ScrollProgressNavbar.tsx` | Progress bar across the top, links |
| 07 | `SideRailNavbar.tsx` | Side rail vertical nav |
| 08 | `SpotlightMenuNavbar.tsx` | Spotlight-followed menu |
| 09 | `MorphingTabNavbar.tsx` | Tabs that morph / expand |
| 10 | `CosmicStarNavbar.tsx` | Cosmic / starry navbar |

# CATEGORY 08 — INTERACTIVE
10 unique interactive widgets. Must respond to user input.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `CursorTrailer.tsx` | Cursor trail of fading orbs |
| 02 | `MagneticDragField.tsx` | Drag items in a magnetic field |
| 03 | `AudioReactiveBlob.tsx` | Microphone-driven blob |
| 04 | `GravityOrbit.tsx` | Particles orbit / fall under gravity |
| 05 | `PixelDissolve.tsx` | Image/text dissolves to pixels on click |
| 06 | `GestureTrail.tsx` | Trail of gestures (mouse-paint) |
| 07 | `ColorMixer.tsx` | Color mixer with draggable sources |
| 08 | `RippleClick.tsx` | Ripple on click anywhere |
| 09 | `TypewriterCode.tsx` | Animated typing code block |
| 10 | `MorphingToggles.tsx` | Toggles that morph between states |

# CATEGORY 09 — 3D
10 unique Three.js / R3F scenes.

| # | Filename | Concept |
|---|----------|---------|
| 01 | `Galaxy3D.tsx` | Galaxy spiral of particles |
| 02 | `GlassOrb3D.tsx` | Glass orb with refraction |
| 03 | `FloatingGeometry3D.tsx` | Floating geometric shapes |
| 04 | `WobbleBlob3D.tsx` | Wobbling metaball-like blob |
| 05 | `RefractionSphere3D.tsx` | Refraction sphere with environment |
| 06 | `ParticleGalaxy3D.tsx` | Particle galaxy, slow rotation |
| 07 | `TunnelWarp3D.tsx` | Tunnel warp (shader) |
| 08 | `LiquidMetal3D.tsx` | Liquid metal sphere |
| 09 | `IridescentShell3D.tsx` | Iridescent / thin-film shell |
| 10 | `CardDeck3D.tsx` | Card deck that fans out in 3D |

## Final Notes
- If a Three.js component uses `useFrame`, wrap the parent in `<Canvas>` from `@react-three/fiber`.
- Use `Suspense` and `ErrorBoundary` patterns where needed.
- All components are exported via `_index.ts` — keep the filenames exact.
- After writing, double-check that `npm run build` passes for the file you wrote. If unsure, you can run `npx tsc --noEmit` from `/workspace/animflow`.
