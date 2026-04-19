const fs = require('fs');
const path = require('path');

function renameFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            renameFiles(fullPath);
        } else if (file.endsWith('.pdf')) {
            const newPath = fullPath.replace(/\.pdf$/, '.md');
            fs.renameSync(fullPath, newPath);
            console.log(`Renamed: ${fullPath} -> ${newPath}`);
        }
    });
}

renameFiles('public/resources');
console.log('Done!');
