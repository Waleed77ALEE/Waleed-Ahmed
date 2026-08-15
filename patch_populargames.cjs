const fs = require('fs');
let data = fs.readFileSync('src/components/gaming/PopularGames.tsx', 'utf-8');

data = data.replace(
  "const GAMES = [",
  "const CATEGORIES = ["
);

data = data.replace(
  /{ id: 'wow', name: 'World of Warcraft', image: '.*' },/,
  "{ id: 'ai', name: 'AI Subscriptions', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=500&auto=format&fit=crop' },"
);
data = data.replace(
  /{ id: 'osrs', name: 'Old School RuneScape', image: '.*' },/,
  "{ id: 'web', name: 'Web Development', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop' },"
);
data = data.replace(
  /{ id: 'valorant', name: 'Valorant', image: '.*' },/,
  "{ id: 'seo', name: 'SEO Optimization', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop' },"
);
data = data.replace(
  /{ id: 'lol', name: 'League of Legends', image: '.*' },/,
  "{ id: 'design', name: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop' },"
);
data = data.replace(
  /{ id: 'apex', name: 'Apex Legends', image: '.*' },/,
  "{ id: 'software', name: 'Custom Software', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop' },"
);
data = data.replace(
  /{ id: 'diablo', name: 'Diablo IV', image: '.*' },/,
  "{ id: 'mobile', name: 'Mobile Apps', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=500&auto=format&fit=crop' },"
);

data = data.replace(
  "Trending Games",
  "Trending Categories"
);

data = data.replace(
  "View All Games &rarr;",
  "View All Categories &rarr;"
);

data = data.replace(
  "GAMES.map((game",
  "CATEGORIES.map((game"
);

fs.writeFileSync('src/components/gaming/PopularGames.tsx', data);
