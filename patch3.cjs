const fs = require('fs');
let data = fs.readFileSync('src/data/softwareData.ts', 'utf-8');

data = data.replace(
  /name: 'Windows 11 Pro',([^]*?)originalPrice: 199,/m,
  "name: 'Windows 11 Pro',$1image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 199,"
);

fs.writeFileSync('src/data/softwareData.ts', data);
