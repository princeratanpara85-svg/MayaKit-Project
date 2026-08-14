const fs = require('fs');
const path = require('path');

const imports = `import Galaxy3D from "@/components/library/3d/Galaxy3D";
import GlassOrb3D from "@/components/library/3d/GlassOrb3D";
import FloatingGeometry3D from "@/components/library/3d/FloatingGeometry3D";
import WobbleBlob3D from "@/components/library/3d/WobbleBlob3D";
import RefractionSphere3D from "@/components/library/3d/RefractionSphere3D";
import ParticleGalaxy3D from "@/components/library/3d/ParticleGalaxy3D";
import TunnelWarp3D from "@/components/library/3d/TunnelWarp3D";
import LiquidMetal3D from "@/components/library/3d/LiquidMetal3D";
import IridescentShell3D from "@/components/library/3d/IridescentShell3D";
import CardDeck3D from "@/components/library/3d/CardDeck3D";
`;

const renderMapEntries = `
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
`;

// Patch [slug]/page.tsx
const slugPagePath = path.join(__dirname, 'src/app/components/[slug]/page.tsx');
let slugPage = fs.readFileSync(slugPagePath, 'utf8');

// Insert imports after last import
const slugImportIndex = slugPage.lastIndexOf('import ');
const slugImportEndIndex = slugPage.indexOf('\\n', slugImportIndex) !== -1 ? slugPage.indexOf('\\n', slugImportIndex) : slugPage.indexOf(';', slugImportIndex) + 1;
slugPage = slugPage.substring(0, slugImportEndIndex) + "\\n" + imports + slugPage.substring(slugImportEndIndex);

// Insert to RENDER_MAP
const slugRenderMapIndex = slugPage.indexOf('const RENDER_MAP: Record<string, React.ReactNode> = {');
const slugRenderMapStart = slugPage.indexOf('{', slugRenderMapIndex) + 1;
slugPage = slugPage.substring(0, slugRenderMapStart) + "\\n" + renderMapEntries + slugPage.substring(slugRenderMapStart);

fs.writeFileSync(slugPagePath, slugPage);

// Patch page.tsx
const pagePath = path.join(__dirname, 'src/app/components/page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');

const pageImportIndex = page.lastIndexOf('import ');
const pageImportEndIndex = page.indexOf('\\n', pageImportIndex) !== -1 ? page.indexOf('\\n', pageImportIndex) : page.indexOf(';', pageImportIndex) + 1;
page = page.substring(0, pageImportEndIndex) + "\\n" + imports + page.substring(pageImportEndIndex);

const pageRenderMapIndex = page.indexOf('const RENDER_MAP: Record<string, React.ReactNode> = {');
const pageRenderMapStart = page.indexOf('{', pageRenderMapIndex) + 1;
page = page.substring(0, pageRenderMapStart) + "\\n" + renderMapEntries + page.substring(pageRenderMapStart);

// Implement Hover-to-Mount
page = page.replace('const [searchQuery, setSearchQuery] = useState("");', 'const [searchQuery, setSearchQuery] = useState("");\\n  const [hoveredId, setHoveredId] = useState<string | null>(null);');

page = page.replace(
  'className="grid-item group relative flex flex-col rounded-none border border-border bg-muted transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_#FFFE15] hover:border-primary"',
  'className="grid-item group relative flex flex-col rounded-none border border-border bg-muted transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_#FFFE15] hover:border-primary"\\n                    onMouseEnter={() => setHoveredId(comp.id)}\\n                    onMouseLeave={() => setHoveredId(null)}'
);

page = page.replace(
  '{RENDER_MAP[comp.id]}',
  `{comp.category === "3D & WebGL" && hoveredId !== comp.id ? (
                          <div className="flex flex-col items-center justify-center opacity-50 h-full">
                            <span className="font-mono text-xs uppercase tracking-widest">Hover to render 3D</span>
                          </div>
                        ) : (
                          RENDER_MAP[comp.id]
                        )}`
);

fs.writeFileSync(pagePath, page);

console.log("Patched page.tsx and [slug]/page.tsx successfully.");
