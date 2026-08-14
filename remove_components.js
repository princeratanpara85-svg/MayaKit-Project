const fs = require('fs');
const path = require('path');

const componentsFile = path.join(__dirname, 'src/data/components.ts');
const pageFile = path.join(__dirname, 'src/app/components/[slug]/page.tsx');

// 1. Remove from components.ts
let dataContent = fs.readFileSync(componentsFile, 'utf8');

const idsToRemove = [
  "elevator-floor-nav",
  "rolodex-flip-nav",
  "subway-line-nav",
  "accordion-spine-nav",
  "compass-dial-nav"
];

// We can just use a regex to remove each block:
for (const id of idsToRemove) {
  // Matches from `"id": {` to `},`
  const regex = new RegExp(`\\s*"${id}":\\s*\\{[\\s\\S]*?filename:\\s*"[^"]*"\\s*\\},`, 'g');
  dataContent = dataContent.replace(regex, '');
}
fs.writeFileSync(componentsFile, dataContent);

// 2. Remove from page.tsx
let pageContent = fs.readFileSync(pageFile, 'utf8');

const linesToRemove = [
  'import ElevatorFloorNav from "@/components/library/navbars/ElevatorFloorNav";',
  'import RolodexFlipNav from "@/components/library/navbars/RolodexFlipNav";',
  'import SubwayLineNav from "@/components/library/navbars/SubwayLineNav";',
  'import AccordionSpineNav from "@/components/library/navbars/AccordionSpineNav";',
  'import CompassDialNav from "@/components/library/navbars/CompassDialNav";',
  '"elevator-floor-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><ElevatorFloorNav /></div>,',
  '"rolodex-flip-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><RolodexFlipNav /></div>,',
  '"subway-line-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><SubwayLineNav /></div>,',
  '"accordion-spine-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><AccordionSpineNav /></div>,',
  '"compass-dial-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><CompassDialNav /></div>,'
];

for (const line of linesToRemove) {
  pageContent = pageContent.replace(new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\n?', 'g'), '');
}
fs.writeFileSync(pageFile, pageContent);

// 3. Delete the .tsx files
const tsxFiles = [
  'ElevatorFloorNav.tsx',
  'RolodexFlipNav.tsx',
  'SubwayLineNav.tsx',
  'AccordionSpineNav.tsx',
  'CompassDialNav.tsx'
];
for (const file of tsxFiles) {
  const p = path.join(__dirname, 'src/components/library/navbars', file);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// 4. Delete the original .jsx files from .agents/workflows
const jsxFiles = [
  'ElevatorFloorNav.jsx',
  'RolodexFlipNav.jsx',
  'SubwayLineNav.jsx',
  'AccordionSpineNav.jsx',
  'CompassDialNav.jsx'
];
for (const file of jsxFiles) {
  const p = path.join(__dirname, '.agents/workflows', file);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log("Removal complete.");
