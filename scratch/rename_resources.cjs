const fs = require('fs');
const path = require('path');

function renameRecursive(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            renameRecursive(fullPath);
        } else if (file.endsWith('.md')) {
            const newPath = fullPath.replace(/\.md$/, '.pdf');
            fs.renameSync(fullPath, newPath);
            console.log(`Renamed: ${fullPath} -> ${newPath}`);
        }
    });
}

const targetDir = 'c:\\Users\\Lenovo\\Documents\\HackBro\\public\\resources';
renameRecursive(targetDir);
