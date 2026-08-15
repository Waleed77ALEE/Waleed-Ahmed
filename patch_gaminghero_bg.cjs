const fs = require('fs');
let data = fs.readFileSync('src/components/gaming/GamingHero.tsx', 'utf-8');

data = data.replace(
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2070&auto=format&fit=crop"
);

fs.writeFileSync('src/components/gaming/GamingHero.tsx', data);
