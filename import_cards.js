const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '.agents/workflows/animflow/src/components/02-cards');
const destDir = path.join(__dirname, 'src/components/library/cards');
const componentsFile = path.join(__dirname, 'src/data/components.ts');
const pageFile = path.join(__dirname, 'src/app/components/[slug]/page.tsx');

// 1. Create dest directory if not exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 2. Copy files and add "use client"
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx') && !f.startsWith('_'));
const componentMetaList = [];

for (const file of files) {
  const compName = path.basename(file, '.tsx');
  // convert CamelCase to kebab-case
  const id = compName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  // convert CamelCase to Title Case
  const title = compName.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  if (!content.includes('"use client"')) {
    content = '"use client";\n\n' + content;
  }
  
  // parse dependencies
  const deps = [];
  if (content.includes('framer-motion')) deps.push('framer-motion');
  if (content.includes('lucide-react')) deps.push('lucide-react');
  if (content.includes('three')) deps.push('three');

  // remove explicit framer-motion/lucide-react installs if we already have them, but let's just populate the field
  
  fs.writeFileSync(path.join(destDir, file), content);
  
  componentMetaList.push({
    id,
    title,
    compName,
    filename: `cards/${file}`,
    deps
  });
}

// 3. Update components.ts
let dataContent = fs.readFileSync(componentsFile, 'utf8');

let newComponentsData = '';
for (const meta of componentMetaList) {
  newComponentsData += `
  "${meta.id}": {
    id: "${meta.id}",
    title: "${meta.title}",
    category: "Cards",
    description: "A beautiful interactive ${meta.title} component.",
    installation: "${meta.deps.length > 0 ? 'npm install ' + meta.deps.join(' ') : ''}",
    dependencies: ${JSON.stringify(meta.deps)},
    props: [],
    filename: "${meta.filename}"
  },`;
}

dataContent = dataContent.replace('};\n\nexport const COMPONENTS_LIST = Object.values(COMPONENTS_DATA);', newComponentsData + '\n};\n\nexport const COMPONENTS_LIST = Object.values(COMPONENTS_DATA);');
fs.writeFileSync(componentsFile, dataContent);

// 4. Update page.tsx
let pageContent = fs.readFileSync(pageFile, 'utf8');

let newImports = '';
let newRenderMap = '';

for (const meta of componentMetaList) {
  newImports += `import ${meta.compName} from "@/components/library/cards/${meta.compName}";\n`;
  newRenderMap += `  "${meta.id}": <div className="w-full h-full pointer-events-auto flex items-center justify-center p-8"><${meta.compName} /></div>,\n`;
}

pageContent = pageContent.replace('const RENDER_MAP: Record<string, React.ReactNode> = {', newImports + '\nconst RENDER_MAP: Record<string, React.ReactNode> = {\n' + newRenderMap);
fs.writeFileSync(pageFile, pageContent);

console.log("Cards implementation complete.");
