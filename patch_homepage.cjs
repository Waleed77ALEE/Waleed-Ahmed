const fs = require('fs');
let data = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');

if (!data.includes('import { OffersSlider } from')) {
  data = data.replace(
    "import { GamingHero } from '../components/gaming/GamingHero';",
    "import { GamingHero } from '../components/gaming/GamingHero';\nimport { OffersSlider } from '../components/OffersSlider';"
  );
}

if (!data.includes('<OffersSlider />')) {
  data = data.replace(
    "<GamingHero />",
    "<GamingHero />\n      <OffersSlider />"
  );
}

fs.writeFileSync('src/pages/HomePage.tsx', data);
