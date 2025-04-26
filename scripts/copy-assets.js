const fs = require('fs');
const path = require('path');

// 转换 node: 协议引用
function convertNodeProtocol(content) {
  return content
    .replace(/require\('node:url'\)/g, "require('url')")
    .replace(/require\('node:path'\)/g, "require('path-browserify')");
}

const files = ['minpath.js', 'minproc.js', 'minurl.js'];

files.forEach(file => {
  const src = path.join('node_modules', 'vfile', 'lib', file);
  const dest = path.join('dist', 'assets', file);
  
  let content = fs.readFileSync(src, 'utf8');
  content = convertNodeProtocol(content);
  
  fs.writeFileSync(dest, content);
  console.log(`Converted ${file}`);
});