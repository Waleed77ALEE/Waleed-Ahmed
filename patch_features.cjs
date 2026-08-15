const fs = require('fs');
let data = fs.readFileSync('src/components/gaming/MarketplaceFeatures.tsx', 'utf-8');

data = data.replace(
  "GamerProtect™",
  "SecureProtect™"
);
data = data.replace(
  "Your payment is held securely in escrow until you confirm full receipt of your digital items.",
  "Your payment is held securely in escrow until you confirm full receipt of your digital assets and services."
);

data = data.replace(
  "Thousands of automated offers. Get your game keys, accounts, and currency in seconds.",
  "Thousands of automated offers. Get your software keys, AI subscriptions, and assets in seconds."
);

data = data.replace(
  "Over 1 million verified gamers trading securely across 150+ countries.",
  "Over 10,000 verified professionals and businesses trading securely across 150+ countries."
);

fs.writeFileSync('src/components/gaming/MarketplaceFeatures.tsx', data);
