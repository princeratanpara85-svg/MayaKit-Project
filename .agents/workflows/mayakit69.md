---
description: 
---

Replace the swarga-celestial demo entirely with a new theme — an 
artisanal pencil manufacturing/brand website (premium pencils — 
craftsmanship, wood sourcing, graphite quality, design — think a modern 
stationery/pencil maker that treats pencils as a considered design 
object, not a commodity). Keep the same palette: #2772A0 (celestial sky 
blue) / #CCDDEA (soft cloud-white blue).

STEP 1 — Remove the old Swarga demo completely
- Remove the swarga-celestial palette entry from src/data/palettes.ts
- Delete the SwargaDevotionalDemo.tsx component file
- Remove its routing logic from page.tsx
- Confirm the gallery at /color-combo no longer shows the Swarga card, 
  only the new pencil-brand one

STEP 2 — Build the new demo
Reference .agents/skills/emil-design-eng/SKILL.md and 
.agents/skills/find-animation-opportunities/SKILL.md to guide design and 
animation decisions.

Requirements:
- Only these two colors, no others
- Genuine premium pencil brand structure: hero/brand statement, product 
  lineup (different pencil types/hardness grades/wood finishes), the 
  craft/making process (wood sourcing, graphite core quality, precision 
  manufacturing), design philosophy, where-to-buy or shop CTA
- Real animation, applied thoughtfully per the skills' own judgment — 
  pencils suggest natural motion concepts: the act of writing/drawing 
  itself, sharpening, the graphite line/mark being drawn, wood grain 
  texture; consider what fits as a genuine structural device
- CRITICAL — avoid the generic AI-template trap: find ONE core structural 
  concept tied to the theme itself — consider something like content 
  being literally "drawn" or "written" into existence as the user scrolls 
  (an SVG line-draw effect tracing text/illustrations), or a sharpening/
  precision narrative
- Real product photography (duotoned per our established technique) 
  should play a genuine role
- A distinctive content presentation — this must NOT resemble ANY of the 
  other previous demos
- Typography must be DIFFERENT from all previous demos, including 
  whatever fonts swarga-celestial used (now being removed)
- Animation style/philosophy and easing curves must also differ from all 
  previous demos
- A long, substantial footer with genuine design intention
- Reachable only through the /color-combo gallery (not directly linked), 
  fully isolated from MayaKit's own site chrome, same pattern as previous 
  demos

Register it in the palette gallery with appropriate tags from our existing 
tag list once built.