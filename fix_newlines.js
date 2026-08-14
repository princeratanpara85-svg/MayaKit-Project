const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/components/page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');
page = page.split('\\nimport').join('\nimport');
page = page.split('\\n  "galaxy-3d"').join('\n  "galaxy-3d"');
fs.writeFileSync(pagePath, page);

const slugPath = path.join(__dirname, 'src/app/components/[slug]/page.tsx');
let slugPage = fs.readFileSync(slugPath, 'utf8');
slugPage = slugPage.split('\\nimport').join('\nimport');
slugPage = slugPage.split('\\n  "galaxy-3d"').join('\n  "galaxy-3d"');
fs.writeFileSync(slugPath, slugPage);

console.log("Fixed literal newlines in page.tsx and [slug]/page.tsx");
