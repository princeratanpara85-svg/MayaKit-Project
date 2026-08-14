const fs = require('fs');
const path = require('path');

const componentsFile = path.join(__dirname, 'src/data/components.ts');
const pageFile = path.join(__dirname, 'src/app/components/[slug]/page.tsx');

const newComponentsData = `
  "elevator-floor-nav": {
    id: "elevator-floor-nav",
    title: "Elevator Floor Nav",
    category: "Navbars",
    description: "A vertical navigation resembling an elevator floor indicator.",
    installation: "",
    dependencies: [],
    props: [],
    filename: "navbars/ElevatorFloorNav.tsx"
  },
  "rolodex-flip-nav": {
    id: "rolodex-flip-nav",
    title: "Rolodex Flip Nav",
    category: "Navbars",
    description: "A 3D flip animation navigation mimicking a vintage rolodex.",
    installation: "",
    dependencies: [],
    props: [],
    filename: "navbars/RolodexFlipNav.tsx"
  },
  "subway-line-nav": {
    id: "subway-line-nav",
    title: "Subway Line Nav",
    category: "Navbars",
    description: "A horizontal navigation styled like a transit subway map line.",
    installation: "",
    dependencies: [],
    props: [],
    filename: "navbars/SubwayLineNav.tsx"
  },
  "accordion-spine-nav": {
    id: "accordion-spine-nav",
    title: "Accordion Spine Nav",
    category: "Navbars",
    description: "An expanding accordion style vertical navigation.",
    installation: "",
    dependencies: [],
    props: [],
    filename: "navbars/AccordionSpineNav.tsx"
  },
  "compass-dial-nav": {
    id: "compass-dial-nav",
    title: "Compass Dial Nav",
    category: "Navbars",
    description: "A circular rotating dial navigation.",
    installation: "",
    dependencies: [],
    props: [],
    filename: "navbars/CompassDialNav.tsx"
  }
};
`;

const newImports = `
import ElevatorFloorNav from "@/components/library/navbars/ElevatorFloorNav";
import RolodexFlipNav from "@/components/library/navbars/RolodexFlipNav";
import SubwayLineNav from "@/components/library/navbars/SubwayLineNav";
import AccordionSpineNav from "@/components/library/navbars/AccordionSpineNav";
import CompassDialNav from "@/components/library/navbars/CompassDialNav";

const RENDER_MAP: Record<string, React.ReactNode> = {
`;

const newRenderMap = `
  "modern-scanner-login": <div className="w-full h-full pointer-events-auto"><ModernScannerLogin /></div>,
  "elevator-floor-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><ElevatorFloorNav /></div>,
  "rolodex-flip-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><RolodexFlipNav /></div>,
  "subway-line-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><SubwayLineNav /></div>,
  "accordion-spine-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><AccordionSpineNav /></div>,
  "compass-dial-nav": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><CompassDialNav /></div>,
`;

let dataContent = fs.readFileSync(componentsFile, 'utf8');
dataContent = dataContent.replace('};\n\nexport const COMPONENTS_LIST = Object.values(COMPONENTS_DATA);', ',' + newComponentsData + '\nexport const COMPONENTS_LIST = Object.values(COMPONENTS_DATA);');
fs.writeFileSync(componentsFile, dataContent);

let pageContent = fs.readFileSync(pageFile, 'utf8');
pageContent = pageContent.replace('const RENDER_MAP: Record<string, React.ReactNode> = {', newImports);
pageContent = pageContent.replace('"modern-scanner-login": <div className="w-full h-full pointer-events-auto"><ModernScannerLogin /></div>,', newRenderMap);
fs.writeFileSync(pageFile, pageContent);

console.log("Files updated.");
