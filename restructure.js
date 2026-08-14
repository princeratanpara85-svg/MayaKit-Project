const fs = require('fs');
const path = require('path');

const libraryDir = path.join(__dirname, 'src/components/library');
const dataFile = path.join(__dirname, 'src/data/components.ts');
const pageFile = path.join(__dirname, 'src/app/components/[slug]/page.tsx');

const mappings = {
  logins: [
    'CartoonRocketLogin.tsx', 'CartoonToasterLogin.tsx', 'HarborFleetLogin.tsx',
    'LiquidGooeyLogin.tsx', 'ModernScannerLogin.tsx', 'MorphingLoginForm.tsx',
    'ShipVoyageLogin.tsx', 'TerminalLineLogin.tsx'
  ],
  navbars: [
    'CosmicStarNavbar.tsx', 'GlassCommandNavbar.tsx', 'LiquidBubbleNavbar.tsx',
    'MagneticDockNavbar.tsx', 'MegaDropdownNavbar.tsx', 'MorphingTabNavbar.tsx',
    'PillScrollSpyNavbar.tsx', 'ScrollProgressNavbar.tsx', 'SideRailNavbar.tsx',
    'SpotlightMenuNavbar.tsx'
  ],
  backgrounds: [
    'AuroraMeshPattern.tsx', 'BioluminescentWavePattern.tsx', 'BoidSwarmBackground.tsx',
    'ClothPokeBackground.tsx', 'Conveyor.tsx', 'DotWave.tsx', 'EtherFieldPattern.tsx',
    'GravityLensGridBackground.tsx', 'HexShimmerPattern.tsx', 'HyperbolicGridPattern.tsx',
    'HypnoRings.tsx', 'InkBloom.tsx', 'MagneticParticlesPattern.tsx', 'QuantumFoam.tsx',
    'QuantumLatticePattern.tsx', 'ReactiveInkPattern.tsx', 'Starfield.tsx', 'TopoFlowPattern.tsx'
  ],
  'text-animations': [
    'DepthPressWaveText.tsx', 'DotTextMorph.tsx', 'InkBleedText.tsx', 'LiquidText.tsx',
    'LiquidTrailUnderlineText.tsx', 'MagneticScatterText.tsx', 'PaperFoldTextTransition.tsx',
    'SlotWords.tsx', 'TimeFracture.tsx', 'TriangleShutterTransition.tsx',
    'WaveTextTransition.tsx', 'WindmillTextTransition.tsx', 'WiperTextTransition.tsx'
  ],
  buttons: [
    'ColorFloodCopyButton.tsx', 'DimensionalButton.tsx', 'HexCopyButton.tsx',
    'NeonGravityCopyButton.tsx', 'NeonSliceCopyButton.tsx', 'TraditionalGravityCopyButton.tsx',
    'TraditionalSliceCopyButton.tsx'
  ],
  cards: [
    'ConnectCard.tsx', 'DragToPayCard.tsx', 'HoloTilt.tsx'
  ],
  loaders: [
    'FractalPulseLoader.tsx', 'LiquidTextFillLoader.tsx', 'WeaveThreadLoader.tsx'
  ],
  transitions: [
    'CenterExpandPageTransition.tsx', 'DiagonalSlidePageTransition.tsx'
  ],
  cursors: [
    'SparkTrail.tsx'
  ],
  images: [
    'GlitchSplitImage.tsx', 'Image3DCarousel.tsx', 'KaleidoscopeImage.tsx',
    'LiquidBlobImage.tsx', 'MagneticTrailImage.tsx', 'ParallaxImage.tsx',
    'PixelateImage.tsx', 'RippleReflectionImage.tsx', 'ScrollRevealImage.tsx',
    'ShaderDistortionImage.tsx'
  ],
  interactive: [
    'BounceSticker.tsx', 'GravityWell.tsx', 'NeuralConstellationHero.tsx',
    'OrbitalPlayground.tsx', 'RecursiveWindowDemo.tsx', 'VinylDeckPlayer.tsx'
  ]
};

// 1. Move files
console.log('--- MOVING FILES ---');
for (const [folder, files] of Object.entries(mappings)) {
  const folderPath = path.join(libraryDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  for (const file of files) {
    const oldPath = path.join(libraryDir, file);
    const newPath = path.join(folderPath, file);
    
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Moved ${file} to ${folder}/`);
    } else if (fs.existsSync(newPath)) {
      console.log(`Already moved: ${folder}/${file}`);
    } else {
      console.log(`WARNING: File not found: ${file}`);
    }
  }
}

// Create a reverse mapping: filename -> folder
const fileToFolder = {};
for (const [folder, files] of Object.entries(mappings)) {
  for (const file of files) {
    fileToFolder[file] = folder;
  }
}

// 2. Update components.ts
console.log('--- UPDATING components.ts ---');
if (fs.existsSync(dataFile)) {
  let dataContent = fs.readFileSync(dataFile, 'utf8');
  let updatedData = false;
  
  // Need to replace filename: "FileName.tsx" with filename: "folder/FileName.tsx"
  const filenameRegex = /filename:\s*["']([^"']+)["']/g;
  dataContent = dataContent.replace(filenameRegex, (match, currentFile) => {
    // If it's already got a folder (like '../three/xxx.tsx'), leave it alone unless it matches our mapping
    const baseName = path.basename(currentFile);
    if (fileToFolder[baseName]) {
      const newFileStr = `${fileToFolder[baseName]}/${baseName}`;
      if (currentFile !== newFileStr) {
        updatedData = true;
        return `filename: "${newFileStr}"`;
      }
    }
    return match;
  });

  if (updatedData) {
    fs.writeFileSync(dataFile, dataContent, 'utf8');
    console.log('Updated src/data/components.ts');
  }
}

// 3. Update page.tsx imports
console.log('--- UPDATING [slug]/page.tsx ---');
if (fs.existsSync(pageFile)) {
  let pageContent = fs.readFileSync(pageFile, 'utf8');
  let updatedPage = false;
  
  const importRegex = /from\s+["']@\/components\/library\/([^"']+)["']/g;
  pageContent = pageContent.replace(importRegex, (match, currentPath) => {
    // currentPath is like "LiquidText" or "LiquidText.tsx" or "buttons/TraceButton"
    const baseName = path.basename(currentPath);
    // ensure we add .tsx for looking up in fileToFolder
    const lookupName = baseName.endsWith('.tsx') ? baseName : `${baseName}.tsx`;
    
    if (fileToFolder[lookupName]) {
      const newPath = `@/components/library/${fileToFolder[lookupName]}/${baseName.replace(/\.tsx$/, '')}`;
      if (`"@/components/library/${currentPath}"` !== `"${newPath}"` && `'@/components/library/${currentPath}'` !== `'${newPath}'`) {
        updatedPage = true;
        return `from "${newPath}"`;
      }
    }
    return match;
  });

  if (updatedPage) {
    fs.writeFileSync(pageFile, pageContent, 'utf8');
    console.log('Updated src/app/components/[slug]/page.tsx');
  }
}

console.log('--- DONE ---');
