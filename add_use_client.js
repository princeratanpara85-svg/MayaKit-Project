const fs = require('fs');
const path = require('path');

const filesToFix = [
  'ElevatorFloorNav.tsx',
  'RolodexFlipNav.tsx',
  'SubwayLineNav.tsx',
  'AccordionSpineNav.tsx',
  'CompassDialNav.tsx'
];

for (const file of filesToFix) {
  const filePath = path.join(__dirname, 'src', 'components', 'library', 'navbars', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('"use client"')) {
      content = '"use client";\n\n' + content;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added "use client" to ${file}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
}
