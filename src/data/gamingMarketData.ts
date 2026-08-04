export type ProductCategory = 'Currency' | 'Items' | 'Accounts' | 'Boosting' | 'Gift Cards';

export interface GamingProduct {
  id: string;
  gameId: string;
  gameName: string;
  category: ProductCategory;
  title: string;
  description: string;
  price: number;
  stock: number;
  
  // G2G specific metadata
  server?: string;
  faction?: string;
  region?: string;
  platform?: 'PC' | 'PS5' | 'Xbox' | 'Mobile' | 'Cross-Platform';
  deliveryTime: 'Instant' | 'Under 1 Hour' | '1-24 Hours' | '1-3 Days';
  
  // Seller info
  seller: {
    id: string;
    username: string;
    avatarUrl: string;
    reputationScore: number; // e.g. 99.5
    totalOrders: number;
    isOnline: boolean;
  };
}

export const MOCK_GAMING_PRODUCTS: GamingProduct[] = [
  {
    id: 'g-001',
    gameId: 'wow',
    gameName: 'World of Warcraft',
    category: 'Currency',
    title: '1,000,000 WoW Gold - Hand Farmed, Safe Trade',
    description: 'Safe and fast delivery. Hand farmed gold.',
    price: 45.99,
    stock: 50,
    server: 'Illidan',
    faction: 'Horde',
    region: 'US',
    platform: 'PC',
    deliveryTime: 'Instant',
    seller: {
      id: 's-1',
      username: 'GoldKing',
      avatarUrl: 'https://ui-avatars.com/api/?name=GoldKing&background=0D8ABC&color=fff',
      reputationScore: 99.8,
      totalOrders: 15420,
      isOnline: true,
    }
  },
  {
    id: 'g-002',
    gameId: 'wow',
    gameName: 'World of Warcraft',
    category: 'Currency',
    title: '500,000 WoW Gold - Cheap & Fast',
    description: 'Face to face trade in Orgrimmar.',
    price: 24.50,
    stock: 120,
    server: 'Area 52',
    faction: 'Horde',
    region: 'US',
    platform: 'PC',
    deliveryTime: 'Under 1 Hour',
    seller: {
      id: 's-2',
      username: 'AzerothBank',
      avatarUrl: 'https://ui-avatars.com/api/?name=AzerothBank&background=F59E0B&color=fff',
      reputationScore: 97.2,
      totalOrders: 3200,
      isOnline: false,
    }
  },
  {
    id: 'g-003',
    gameId: 'osrs',
    gameName: 'Old School RuneScape',
    category: 'Currency',
    title: '100M OSRS Gold',
    description: 'Fast delivery, secure trade methods.',
    price: 22.00,
    stock: 500,
    server: 'Global',
    region: 'Global',
    platform: 'PC',
    deliveryTime: 'Instant',
    seller: {
      id: 's-3',
      username: 'RuneRich',
      avatarUrl: 'https://ui-avatars.com/api/?name=RuneRich&background=10B981&color=fff',
      reputationScore: 100,
      totalOrders: 45000,
      isOnline: true,
    }
  },
  {
    id: 'g-004',
    gameId: 'apex',
    gameName: 'Apex Legends',
    category: 'Boosting',
    title: 'Diamond to Master Rank Boost',
    description: 'Offline boost, VPN used for your location. No cheats.',
    price: 120.00,
    stock: 5,
    region: 'EU',
    platform: 'Cross-Platform',
    deliveryTime: '1-3 Days',
    seller: {
      id: 's-4',
      username: 'PredatorBoost',
      avatarUrl: 'https://ui-avatars.com/api/?name=PredatorBoost&background=EF4444&color=fff',
      reputationScore: 98.5,
      totalOrders: 890,
      isOnline: true,
    }
  },
  {
    id: 'g-005',
    gameId: 'val',
    gameName: 'Valorant',
    category: 'Accounts',
    title: 'Ascendant 1 Account | Premium Skins | Full Access',
    description: 'Comes with original email. Contains Prime Vandal, Ion Phantom.',
    price: 85.00,
    stock: 1,
    region: 'NA',
    platform: 'PC',
    deliveryTime: 'Instant',
    seller: {
      id: 's-5',
      username: 'SmurfStore',
      avatarUrl: 'https://ui-avatars.com/api/?name=SmurfStore&background=8B5CF6&color=fff',
      reputationScore: 95.0,
      totalOrders: 150,
      isOnline: true,
    }
  }
];
