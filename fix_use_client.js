const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/library/3d');
const files = fs.readdirSync(dir);

for (const file of files) {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        if (!content.startsWith('"use client"')) {
            content = '"use client";\n\n' + content;
            fs.writeFileSync(filePath, content);
            console.log(`Added "use client" to ${file}`);
        }
    }
}
