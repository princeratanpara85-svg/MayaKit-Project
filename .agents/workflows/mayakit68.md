---
description: 
---

Replace the ml-espresso demo entirely with a new theme — an Indian 
storybook/publishing company website (a publisher/bookseller specializing 
in Indian folk tales, mythology, and regional stories — for readers of 
all ages, celebrating Indian storytelling heritage). Keep the same 
palette: #1F0E06 (near-black espresso) / #C6E385 (bright lime-chartreuse).

STEP 1 — Remove the old ML engineer demo completely
- Remove the ml-espresso palette entry from src/data/palettes.ts
- Delete the MlEngineerDemo.tsx component file (or wherever it lives)
- Remove its routing logic from page.tsx
- Confirm the gallery at /color-combo no longer shows the ML portfolio 
  card, only the new book-brand one

STEP 2 — Build the new demo
Reference .agents/skills/emil-design-eng/SKILL.md and 
.agents/skills/find-animation-opportunities/SKILL.md to guide design and 
animation decisions.

Requirements:
- Only these two colors, no others
- Genuine storybook publisher structure: hero/brand statement celebrating 
  Indian storytelling heritage, featured books/collections showcase 
  (folk tales, mythology, regional stories), the storytelling craft/
  illustration process, author or storyteller spotlights, where-to-buy 
  or shop CTA
- Content should reflect genuine Indian storytelling traditions with 
  respect and accuracy — reference real story traditions/formats where 
  natural (e.g. Panchatantra-style fables, regional folk tale traditions) 
  without being reductive or generic-"exotic" in framing
- Real animation, applied thoughtfully per the skills' own judgment — 
  books, pages, and storytelling suggest natural motion concepts (a page 
  literally turning, a story unfolding, illustration reveal); consider 
  what fits as a genuine structural device
- CRITICAL — avoid the generic AI-template trap: find ONE core structural 
  concept tied to the theme itself — consider building the page's actual 
  scroll narrative like turning through a storybook's pages, or a 
  chapter-based structure
- Real book/illustration photography (duotoned per our established 
  technique) should play a genuine role
- A distinctive content presentation — this must NOT resemble ANY of the 
  remaining previous demos (including archive-nalanda, which is also 
  India-related but academic/historical rather than narrative/storybook — 
  differentiate clearly: this should feel warm, illustrative, and 
  story-driven, not scholarly/manuscript)
- Typography must be DIFFERENT from all previous demos, including 
  whatever fonts ml-espresso used (now being removed) — don't reuse those 
  either
- Animation style/philosophy and easing curves must also differ from all 
  previous demos
- A long, substantial footer with genuine design intention
- Reachable only through the /color-combo gallery (not directly linked), 
  fully isolated from MayaKit's own site chrome, same pattern as previous 
  demos

Register it in the palette gallery with appropriate tags from our existing 
tag list once built.