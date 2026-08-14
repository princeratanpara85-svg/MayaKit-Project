---
description: 
---

Replace the perfume-indigo demo entirely with a new theme — a purple 
berry-based food/dessert brand website (a company specializing in dishes, 
ice cream, desserts, and packaged foods made from purple berries — e.g. 
jamun, blueberry, blackberry, mulberry — a modern, indulgent food brand 
built around this specific ingredient family). Keep the same palette: 
#151130 (deep near-black indigo) / #C8BEFA (soft lavender-periwinkle).

STEP 1 — Remove the old Perfume demo completely
- Remove the perfume-indigo palette entry from src/data/palettes.ts
- Delete the PerfumeDemo.tsx component file
- Remove its routing logic from page.tsx
- Confirm the gallery at /color-combo no longer shows the Perfume card, 
  only the new berry-food brand one

STEP 2 — Build the new demo
Reference .agents/skills/emil-design-eng/SKILL.md and 
.agents/skills/find-animation-opportunities/SKILL.md to guide design and 
animation decisions.

Requirements:
- Only these two colors, no others
- Genuine berry-food brand structure: hero/brand statement celebrating 
  purple berries as the core ingredient, product lineup (ice cream, 
  desserts, packaged goods — all purple-berry-based), the sourcing/craft 
  story (where the berries come from, quality/freshness), a signature 
  product deep-dive, where-to-buy CTA
- Real animation, applied thoughtfully per the skills' own judgment — 
  berries suggest natural motion concepts: juiciness, bursting, staining/
  color-bleed, clustering (berries growing in bunches); consider what 
  fits as a genuine structural device
- CRITICAL — avoid the generic AI-template trap: find ONE core structural 
  concept tied to the theme itself — consider something like a "burst" or 
  "stain/bleed" motif where color/content spreads across the page like 
  berry juice, or a clustering/bunch-growth visual metaphor
- Real food photography (duotoned per our established technique) should 
  play a genuine role
- A distinctive content presentation — this must NOT resemble ANY of the 
  other previous demos. Note: icecream-cream (playful/bouncy ice cream 
  brand), chocolate-strawberry (refined/sensual confectionery), and 
  snack-yellow (crunchy/energetic banana chips) are all food-adjacent — 
  this needs its own genuinely different personality, likely rich/deep/
  jewel-toned given the dark purple palette, distinct from all three
- Typography must be DIFFERENT from all previous demos, including 
  whatever fonts perfume-indigo used (now being removed)
- Animation style/philosophy and easing curves must also differ from all 
  previous demos
- A long, substantial footer with genuine design intention
- Reachable only through the /color-combo gallery (not directly linked), 
  fully isolated from MayaKit's own site chrome, same pattern as previous 
  demos

Register it in the palette gallery with appropriate tags from our existing 
tag list once built.