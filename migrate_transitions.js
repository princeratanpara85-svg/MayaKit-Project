const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '.agents/workflows');
const destDir = path.join(__dirname, 'src/components/library/transitions');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = ['DOMBoxFlipTransition.jsx', 'PixelWavePageTransition.jsx'];

for (const file of files) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file.replace('.jsx', '.tsx'));
  
  let content = fs.readFileSync(srcPath, 'utf8');
  if (!content.includes('"use client"')) {
    content = '"use client";\n\n' + content;
  }
  
  fs.writeFileSync(destPath, content);
  console.log(`Migrated ${file}`);
}
