const fs = require('fs');
let data = fs.readFileSync('src/components/gaming/GamingHero.tsx', 'utf-8');

data = data.replace(
  "Buy, sell, and trade virtual goods, cheap in-game currency, premium accounts, and boosting services with 100% secure escrow protection.",
  "Unlock premium software, AI subscriptions, engineering services, and top-tier digital assets. Guaranteed safety, instant delivery, and 24/7 support."
);

fs.writeFileSync('src/components/gaming/GamingHero.tsx', data);
