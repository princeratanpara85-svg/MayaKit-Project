const fs = require('fs');
const path = require('path');

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

const fileToFolder = {};
for (const [folder, files] of Object.entries(mappings)) {
  for (const file of files) {
    fileToFolder[file] = folder;
  }
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

console.log('--- FIXING IMPORTS ACROSS src/ ---');
walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Fix absolute imports
    const importRegex = /from\s+["']@\/components\/library\/([^"']+)["']/g;
    content = content.replace(importRegex, (match, currentPath) => {
      // Avoid already prefixed paths like "buttons/TraceButton"
      if (currentPath.includes('/')) return match; 
      
      const baseName = path.basename(currentPath);
      const lookupName = baseName.endsWith('.tsx') ? baseName : `${baseName}.tsx`;
      
      if (fileToFolder[lookupName]) {
        const newPath = `@/components/library/${fileToFolder[lookupName]}/${baseName.replace(/\.tsx$/, '')}`;
        updated = true;
        return `from "${newPath}"`;
      }
      return match;
    });

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    }
  }
});
console.log('--- DONE ---');
