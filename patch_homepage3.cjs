const fs = require('fs');
let data = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');

data = data.replace(
  "import { FeaturedListings } from '../components/gaming/FeaturedListings';\n",
  ""
);

data = data.replace(
  "<FeaturedListings />",
  ""
);

fs.writeFileSync('src/pages/HomePage.tsx', data);
