const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/components/page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');
page = page.split('\\n').join('\n');
fs.writeFileSync(pagePath, page);

const slugPath = path.join(__dirname, 'src/app/components/[slug]/page.tsx');
let slugPage = fs.readFileSync(slugPath, 'utf8');
slugPage = slugPage.split('\\n').join('\n');
fs.writeFileSync(slugPath, slugPage);

console.log("Fixed ALL literal newlines");
