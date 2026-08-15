const fs = require('fs');
let data = fs.readFileSync('src/components/AIPricingGrid.tsx', 'utf-8');

data = data.replace(
  "Premium AI Accounts &amp; Tools",
  "Enterprise-Grade AI Subscriptions"
);
data = data.replace(
  "Instant delivery. Verified access. Unbeatable pricing.",
  "Unlock exclusive access to industry-leading AI models. Instant deployment, verified credentials, and unmetered potential."
);

fs.writeFileSync('src/components/AIPricingGrid.tsx', data);
