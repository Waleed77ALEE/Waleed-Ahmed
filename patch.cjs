const fs = require('fs');
let data = fs.readFileSync('src/data/softwareData.ts', 'utf-8');

data = data.replace(
  /name: 'Adobe Photoshop 2026',([^]*?)originalPrice: 239,/m,
  "name: 'Adobe Photoshop 2026',$1image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 239,"
);

data = data.replace(
  /name: 'Adobe Premiere Pro 2026',([^]*?)originalPrice: 239,/m,
  "name: 'Adobe Premiere Pro 2026',$1image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 239,"
);

data = data.replace(
  /name: 'Adobe Creative Cloud All Apps 2026',([^]*?)originalPrice: 599,/m,
  "name: 'Adobe Creative Cloud All Apps 2026',$1image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 599,"
);

data = data.replace(
  /name: 'Microsoft 365 Personal',([^]*?)originalPrice: 69,/m,
  "name: 'Microsoft 365 Personal',$1image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 69,"
);

data = data.replace(
  /name: 'FL Studio 21 Signature Bundle',([^]*?)originalPrice: 299,/m,
  "name: 'FL Studio 21 Signature Bundle',$1image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 299,"
);

fs.writeFileSync('src/data/softwareData.ts', data);
