const fs = require('fs');
const path = require('path');

const workflowsDir = path.join(__dirname, '.agents/workflows');
const libraryDir = path.join(__dirname, 'src/components/library');

// Get all .tsx files in .agents/workflows
function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const workflowFiles = getFiles(workflowsDir);
console.log(`Found ${workflowFiles.length} component files in workflows directory.`);

// Get all .tsx files in library
const libraryFiles = getFiles(libraryDir);
const libraryFileNames = libraryFiles.map(f => path.basename(f));

// Analyze workflow files
const unimplemented = [];
const implemented = [];

for (const wFile of workflowFiles) {
  const content = fs.readFileSync(wFile, 'utf8');
  
  // Try to find the export default function name
  const match = content.match(/export default function ([A-Za-z0-9_]+)/);
  let componentName = match ? match[1] : path.basename(wFile, path.extname(wFile));
  
  // Clean deepseek prefix if exists
  if (componentName.startsWith('deepseek_tsx_')) {
     // fallback to just checking if the file content matches something we have, or maybe look for a function name inside
     const funcMatch = content.match(/function ([A-Za-z0-9_]+)/);
     if (funcMatch) componentName = funcMatch[1];
  }

  // Check if this component name exists in our library
  const exists = libraryFileNames.some(f => f.includes(componentName) || componentName.includes(f.replace('.tsx','')));
  
  if (exists) {
    implemented.push({ file: path.basename(wFile), component: componentName });
  } else {
    unimplemented.push({ file: path.basename(wFile), component: componentName });
  }
}

console.log("\n--- IMPLEMENTED ALREADY ---");
implemented.forEach(i => console.log(`- ${i.component} (from ${i.file})`));

console.log("\n--- NOT YET IMPLEMENTED ---");
unimplemented.forEach(i => console.log(`- ${i.component} (from ${i.file})`));
