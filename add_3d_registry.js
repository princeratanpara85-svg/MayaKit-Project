const fs = require('fs');
const path = require('path');

const componentsFile = path.join(__dirname, 'src/data/components.ts');
let content = fs.readFileSync(componentsFile, 'utf8');

const newComponents = [
  { id: "galaxy-3d", title: "Galaxy 3D", filename: "3d/Galaxy3D.tsx" },
  { id: "glass-orb-3d", title: "Glass Orb 3D", filename: "3d/GlassOrb3D.tsx" },
  { id: "floating-geometry-3d", title: "Floating Geometry 3D", filename: "3d/FloatingGeometry3D.tsx" },
  { id: "wobble-blob-3d", title: "Wobble Blob 3D", filename: "3d/WobbleBlob3D.tsx" },
  { id: "refraction-sphere-3d", title: "Refraction Sphere 3D", filename: "3d/RefractionSphere3D.tsx" },
  { id: "particle-galaxy-3d", title: "Particle Galaxy 3D", filename: "3d/ParticleGalaxy3D.tsx" },
  { id: "tunnel-warp-3d", title: "Tunnel Warp 3D", filename: "3d/TunnelWarp3D.tsx" },
  { id: "liquid-metal-3d", title: "Liquid Metal 3D", filename: "3d/LiquidMetal3D.tsx" },
  { id: "iridescent-shell-3d", title: "Iridescent Shell 3D", filename: "3d/IridescentShell3D.tsx" },
  { id: "card-deck-3d", title: "Card Deck 3D", filename: "3d/CardDeck3D.tsx" }
];

let additions = '';
for (const comp of newComponents) {
  additions += `
  "${comp.id}": {
    id: "${comp.id}",
    title: "${comp.title}",
    category: "3D & WebGL",
    description: "A stunning 3D WebGL interactive experience built with React Three Fiber.",
    installation: "",
    dependencies: [],
    props: [],
    filename: "${comp.filename}"
  },`;
}

// Find the last closing brace of COMPONENTS_DATA
const lastBraceIndex = content.lastIndexOf('};');
if (lastBraceIndex !== -1) {
    const before = content.substring(0, lastBraceIndex);
    const after = content.substring(lastBraceIndex);
    // Remove trailing comma from last existing element if necessary, but actually JSON-like JS allows trailing commas.
    // Ensure we don't break syntax
    
    // Just append before the closing brace
    const finalContent = before + additions + '\n' + after;
    fs.writeFileSync(componentsFile, finalContent);
    console.log("Appended 10 components to registry.");
} else {
    console.log("Could not find end of COMPONENTS_DATA");
}
