---
description: 
---

Replace the eyewear-cyan demo entirely with a new theme — a football 
(soccer ball) manufacturing company website (a company that designs and 
manufactures footballs — craftsmanship, materials, precision stitching, 
performance engineering — think a serious sports-equipment maker, not a 
football club/team site).

Note: eyewear-cyan received a major bespoke redesign earlier (the "whole 
page as an optical instrument" concept) — that redesign work is being 
fully replaced here, which is fine since you're intentionally swapping the 
theme, but confirm nothing from that redesign lingers incorrectly.

Keep the same palette: #00E7FF (electric cyan) / #17181C (near-black 
charcoal).

STEP 1 — Remove the old Eyewear demo completely
- Remove the eyewear-cyan palette entry from src/data/palettes.ts
- Delete the EyewearRetailDemo.tsx component file
- Remove its routing logic from page.tsx
- Confirm the gallery at /color-combo no longer shows the Eyewear card, 
  only the new football brand one

STEP 2 — Build the new demo
Reference .agents/skills/emil-design-eng/SKILL.md and 
.agents/skills/find-animation-opportunities/SKILL.md to guide design and 
animation decisions.

Requirements:
- Only these two colors, no others
- Genuine football manufacturer structure: hero/performance brand 
  statement, product lineup (match balls, training balls, different 
  leagues/certifications), the construction/craft story (panel stitching, 
  materials, precision manufacturing, quality testing), performance specs 
  (flight accuracy, durability), where-to-buy or partner-with-us CTA
- Real animation, applied thoughtfully per the skills' own judgment — 
  footballs suggest natural motion concepts: rotation/spin, panel 
  geometry (the pentagon/hexagon pattern), trajectory/flight physics, 
  bounce; consider what fits as a genuine structural device
- CRITICAL — avoid the generic AI-template trap: find ONE core structural 
  concept tied to the theme itself — consider something like the page's 
  layout built around the actual geometric panel structure of a football 
  (pentagons/hexagons as a real structural grid system for content), or a 
  spinning/rotation-driven scroll narrative tied to the ball's actual 
  physics
- Real product photography (duotoned per our established technique) 
  should play a genuine role
- A distinctive content presentation — this must NOT resemble ANY of the 
  other previous demos (energy-lime's extreme sports energy is the 
  closest sports-adjacent territory — differentiate clearly: this should 
  feel like precision sports engineering/craft, not adrenaline/extreme 
  culture)
- Typography must be DIFFERENT from all previous demos, including 
  whatever fonts eyewear-cyan used (now being removed) — Unbounded and 
  Lexend are both now available again
- Animation style/philosophy and easing curves must also differ from all 
  previous demos
- A long, substantial footer with genuine design intention
- Reachable only through the /color-combo gallery (not directly linked), 
  fully isolated from MayaKit's own site chrome, same pattern as previous 
  demos

Register it in the palette gallery with appropriate tags from our existing 
tag list once built.