const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '.agents/workflows/animflow/src/components/06-buttons');
const destDir = path.join(__dirname, 'src/components/library/buttons');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
let imports = [];
let renders = [];

for (const file of files) {
  if (file.endsWith('.tsx')) {
    let destFile = file;
    if (file === '3DPressButton.tsx') {
      destFile = 'ThreeDPressButton.tsx';
    }
    
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, destFile);
    
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Fix literal newlines if any
    content = content.replace(/\\n/g, '\n');
    
    // Add use client
    if (!content.includes('"use client"')) {
      content = '"use client";\n\n' + content;
    }
    
    fs.writeFileSync(destPath, content);
    
    const compName = destFile.replace('.tsx', '');
    imports.push(`import ${compName} from "@/components/library/buttons/${compName}";`);
    renders.push(`      <div className="flex items-center justify-center p-8 bg-zinc-950/50 rounded-xl border border-white/5 relative min-h-[300px]">
        <div className="absolute top-2 left-3 text-xs font-medium text-white/20">${compName}</div>
        <${compName} />
      </div>`);
      
    console.log(`Migrated ${destFile}`);
  }
}

console.log("\nIMPORTS:");
console.log(imports.join('\n'));
console.log("\nRENDERS:");
console.log(renders.join('\n'));
