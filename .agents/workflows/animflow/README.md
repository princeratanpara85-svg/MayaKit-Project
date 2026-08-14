# AnimFlow — 90+ Mind-Blowing Animated React Components

> Free, open-source, copy-paste animated components for React. Patterns, cards, backgrounds, image galleries, hero sections, buttons, navbars, interactive widgets, and 3D scenes — all 100% unique, hand-crafted, and production-ready.

## Inspiration & Acknowledgements

AnimFlow is born from a remix of the best open-source animation libraries on the Chinese-internet frontend scene, then re-imagined with never-seen-before twists:

- **[H5-Dooring](http://h5.dooring.cn)** (徐小夕 / @MrXujiang) — the legendary Chinese H5 low-code editor. Our card-stack interactions, drag/snap UX, and long-form scrolling scenes are inspired by Dooring's component philosophy.
- **[React Bits](https://reactbits.dev)** (DavidHDev) — text animations, magnet effects, blob cursors, dock components. We re-mixed the magnet with WebGL particles and the dock with WebGL refraction.
- **[Magic UI](https://magicui.design)** (Dillion Verma) — marquees, orbiting circles, beam effects, animated gradients. We pushed the gradient into noise-warped aurora flow.
- **[Aceternity UI](https://ui.aceternity.com)** — 3D card effect, background beams, spotlight, parallax heroes. We re-mixed the spotlight with cursor-traced aurora threads.
- **[21st.dev](https://21st.dev)** — community components, three.js primitives, motion choreography. We re-interpreted 3D pin perspectives and circular galleries.
- **[Hover.dev](https://hover.dev)** — magnetic micro-interactions, copy-paste feel.

Each AnimFlow component is a **new mix** of 2–3 references — never a copy. Every file is **self-contained** so you can drop it into any project.

## Categories (10 components each)

| # | Category | Tech | Description |
|---|---|---|---|
| 01 | **Patterns** | CSS + Framer | Animated background patterns — never seen before. |
| 02 | **Cards** | React + Framer | Cards with magnetic, glow, holographic, 3D-tilt effects. |
| 03 | **Backgrounds** | Canvas + WebGL | WebGL noise warps, particle storms, light rays, flow fields. |
| 04 | **Image Galleries** | Framer + Three | Marquee, dome, magnetic, infinite scroll, drag-to-explore. |
| 05 | **Hero Sections** | Multi-tech | Scroll-driven 3D, parallax, beam convergence, type-shimmer. |
| 06 | **Buttons** | CSS + Framer | Liquid metal, magnetic, particle burst, morphing, glitch. |
| 07 | **Navbars** | React | Pill, dock, magnetic, scroll-spy, blur, command-palette. |
| 08 | **Interactive** | Canvas + JS | Cursor trails, audio-reactive blobs, magnetic drag, physics. |
| 09 | **3D** | Three.js | WebGL scenes — galaxy, glass orbs, shaders, refraction. |

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 — the homepage showcases every component. Click any category to see the full set.

## How to copy a single component

Each component lives in its own `.tsx` file under `src/components/<NN-category>/<ComponentName>.tsx`. Just copy the file and its imports into your project. Required deps per category:

```bash
# Universal
npm install framer-motion lucide-react clsx tailwind-merge

# For backgrounds / 3D / image galleries
npm install three @react-three/fiber @react-three/drei

# Optional (for GSAP variants)
npm install gsap
```

Tailwind is assumed. Add the keyframes in `tailwind.config.js` (already shipped in this repo).

## License

MIT — do whatever you want, just don't claim you made it.
