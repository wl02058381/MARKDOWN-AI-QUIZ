const fs = require('fs');
const path = require('path');

const filesToCopy = [
  'node_modules/vfile/lib/minpath.js',
  'node_modules/vfile/lib/minproc.js',
  'node_modules/vfile/lib/minurl.js'
];

filesToCopy.forEach(file => {
  const dest = path.join('dist', 'assets', path.basename(file));
  fs.copyFileSync(file, dest);
  console.log(`Copied ${file} to ${dest}`);
});