const fs = require('fs');
let data = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');

if (!data.includes('import { TrustBanner }')) {
  data = data.replace(
    "import { OffersSlider } from '../components/OffersSlider';",
    "import { OffersSlider } from '../components/OffersSlider';\nimport { TrustBanner } from '../components/TrustBanner';"
  );
}

if (!data.includes('<TrustBanner />')) {
  data = data.replace(
    "<OffersSlider />",
    "<OffersSlider />\n      <TrustBanner />"
  );
}

fs.writeFileSync('src/pages/HomePage.tsx', data);
