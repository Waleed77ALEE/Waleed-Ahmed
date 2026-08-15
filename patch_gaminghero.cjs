const fs = require('fs');
let data = fs.readFileSync('src/components/gaming/GamingHero.tsx', 'utf-8');

data = data.replace(
  "<span>The Ultimate Gaming Exchange</span>",
  "<span>The Ultimate Digital Marketplace</span>"
);

data = data.replace(
  /Premium Marketplace for <br className="hidden md:block" \/>[\s\S]*?<\/span>[\s\S]*?<\/motion.h1>/m,
  `Premium Marketplace for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            Software, AI & Digital Assets
          </span>
        </motion.h1>`
);

data = data.replace(
  /Buy, sell, and trade game accounts[\s\S]*?Guaranteed safety and instant delivery./m,
  "Unlock premium software, AI subscriptions, engineering services, and top-tier digital assets. Guaranteed safety, instant delivery, and 24/7 support."
);

fs.writeFileSync('src/components/gaming/GamingHero.tsx', data);
