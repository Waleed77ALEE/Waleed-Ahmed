const fs = require('fs');
let data = fs.readFileSync('src/components/GlobalSearchBar.tsx', 'utf-8');

data = data.replace(
  "import { CORE_SERVICES, PORTFOLIO_PROJECTS } from '../data/portfolioData';",
  "import { CORE_SERVICES, PORTFOLIO_PROJECTS } from '../data/portfolioData';\nimport { SOFTWARE_PRODUCTS } from '../data/softwareData';\nimport { MOCK_GAMING_PRODUCTS } from '../data/gamingMarketData';"
);

data = data.replace(
  "const filteredProducts = products.filter((p) => {",
  `const allMarketplaceItems = [
    ...products.map(p => ({ id: p.id, title: p.title, description: p.description, category: p.category, price: p.price, image: p.image, link: 'ai-accounts' })),
    ...SOFTWARE_PRODUCTS.map(p => ({ id: p.id, title: p.name, description: p.description, category: 'Software', price: p.price, image: p.image, link: 'softwares' })),
    ...MOCK_GAMING_PRODUCTS.map(p => ({ id: p.id, title: p.title, description: p.description, category: 'Gaming', price: p.price, image: '', link: 'gaming-market' }))
  ];
  
  const filteredProducts = allMarketplaceItems.filter((p) => {`
);

// We need to change `products` to `allMarketplaceItems` inside `filteredProducts`. Wait, if we redefine `filteredProducts`, it will map over `allMarketplaceItems`.
// But the rendering of `filteredProducts` expects `p.category` etc.
// Let's replace the whole `filteredProducts` definition.
