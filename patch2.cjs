const fs = require('fs');
let data = fs.readFileSync('src/data/softwareData.ts', 'utf-8');

data = data.replace(
  /name: 'Adobe Creative Cloud All Apps 2026',([^]*?)originalPrice: 659,/m,
  "name: 'Adobe Creative Cloud All Apps 2026',$1image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 659,"
);

data = data.replace(
  /name: 'AutoCAD 2026',([^]*?)originalPrice: 1975,/m,
  "name: 'AutoCAD 2026',$1image: 'https://images.unsplash.com/photo-1635398246830-dbb60ccbe51d?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 1975,"
);

data = data.replace(
  /name: 'FL Studio Producer',([^]*?)originalPrice: 199,/m,
  "name: 'FL Studio Producer',$1image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 199,"
);

data = data.replace(
  /name: 'Windows 11 Pro',([^]*?)originalPrice: 199\.99,/m,
  "name: 'Windows 11 Pro',$1image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=500&auto=format&fit=crop',\n    originalPrice: 199.99,"
);

fs.writeFileSync('src/data/softwareData.ts', data);
