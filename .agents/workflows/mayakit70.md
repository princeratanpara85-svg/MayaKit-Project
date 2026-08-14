---
description: 
---

Replace the automation-emerald demo entirely with a new theme — a 
premium travel bag/luggage brand website (well-crafted travel bags, 
backpacks, suitcases — built for durability and design, a modern travel-
goods company). Keep the same palette: #0F4C3A (deep emerald) / #C67C4E 
(warm copper/terracotta).

STEP 1 — Remove the old AI Automation demo completely
- Remove the automation-emerald palette entry from src/data/palettes.ts
- Delete the AiAutomationDemo.tsx component file
- Remove its routing logic from page.tsx
- Confirm the gallery at /color-combo no longer shows the AI Automation 
  card, only the new travel bag brand one

STEP 2 — Build the new demo
Reference .agents/skills/emil-design-eng/SKILL.md and 
.agents/skills/find-animation-opportunities/SKILL.md to guide design and 
animation decisions.

Requirements:
- Only these two colors, no others
- Genuine travel bag brand structure: hero/brand statement, product 
  lineup (backpacks, carry-ons, duffels, checked luggage), the craft/
  materials story (durability, water resistance, construction quality), 
  functionality/features breakdown (compartments, wheels, capacity), 
  where-to-buy or shop CTA
- Real animation, applied thoughtfully per the skills' own judgment — 
  travel bags suggest natural motion concepts: journey/movement, 
  packing/unpacking, expansion/compartments opening, wheels rolling; 
  consider what fits as a genuine structural device
- CRITICAL — avoid the generic AI-template trap: find ONE core structural 
  concept tied to the theme itself — consider something like the page's 
  scroll narrative following an actual journey (departure → transit → 
  arrival), or bags/compartments literally unpacking/unfolding their 
  contents as sections reveal
- Real product photography (duotoned per our established technique) 
  should play a genuine role
- A distinctive content presentation — this must NOT resemble ANY of the 
  other previous demos. Note: mobility-purple and travel-brown both 
  touch "journey/movement" territory (mobility-purple was ride-hailing 
  app UI, travel-brown was a trip-planning agency) — differentiate 
  clearly since this is a physical PRODUCT brand, not a service/app; 
  focus should be on the object itself (craft, materials, function) more 
  than an abstract journey narrative
- Typography must be DIFFERENT from all previous demos, including 
  whatever fonts automation-emerald used (now being removed)
- Animation style/philosophy and easing curves must also differ from all 
  previous demos
- A long, substantial footer with genuine design intention
- Reachable only through the /color-combo gallery (not directly linked), 
  fully isolated from MayaKit's own site chrome, same pattern as previous 
  demos

Register it in the palette gallery with appropriate tags from our existing 
tag list once built.