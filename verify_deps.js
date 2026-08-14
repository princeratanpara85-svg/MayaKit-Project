const fs = require('fs');
const path = require('path');

const componentsFile = path.join(__dirname, 'src/data/components.ts');
let content = fs.readFileSync(componentsFile, 'utf8');

const componentRegex = /"([^"]+)":\s*\{([\s\S]*?)filename:\s*"([^"]+)"\s*\}/g;
let match;
const replacements = [];

const IGNORED = ['react', 'react-dom', 'next', 'next/navigation', 'next/link', 'next/image'];

while ((match = componentRegex.exec(content)) !== null) {
  const id = match[1];
  const block = match[2];
  const filename = match[3];
  
  const fullBlock = match[0];
  
  const sourcePath = path.join(__dirname, 'src/components/library', filename);
  if (!fs.existsSync(sourcePath)) {
    console.log('Not found:', sourcePath);
    continue;
  }
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');
  
  const deps = new Set();
  const importRegex = /from\s+["']([^"']+)["']/g;
  let importMatch;
  while ((importMatch = importRegex.exec(sourceContent)) !== null) {
    const pkg = importMatch[1];
    if (!pkg.startsWith('.') && !pkg.startsWith('@/') && !IGNORED.includes(pkg)) {
      deps.add(pkg);
    }
  }

  // Also check dynamic imports like await import('shiki')
  const dynamicImportRegex = /import\s*\(\s*["']([^"']+)["']\s*\)/g;
  while ((importMatch = dynamicImportRegex.exec(sourceContent)) !== null) {
    const pkg = importMatch[1];
    if (!pkg.startsWith('.') && !pkg.startsWith('@/') && !IGNORED.includes(pkg)) {
      deps.add(pkg);
    }
  }
  
  const depsArray = Array.from(deps).sort();
  
  let installation = '';
  if (depsArray.length > 0) {
    installation = `npm install ${depsArray.join(' ')}`;
  }
  
  let newBlock = block.replace(/installation:\s*"[^"]*"/, `installation: "${installation}"`);
  newBlock = newBlock.replace(/dependencies:\s*\[.*?\]/, `dependencies: ${JSON.stringify(depsArray)}`);
  
  const newFullBlock = `"${id}": {${newBlock}filename: "${filename}"}`;
  
  replacements.push({ old: fullBlock, new: newFullBlock });
}

for (const rep of replacements) {
  content = content.replace(rep.old, rep.new);
}

fs.writeFileSync(componentsFile, content);
console.log("Updated components.ts with correct dependencies");
