import React from 'react';
import { GamingHero } from '../components/gaming/GamingHero';
import { PopularGames } from '../components/gaming/PopularGames';
import { FeaturedListings } from '../components/gaming/FeaturedListings';
import { MarketplaceFeatures } from '../components/gaming/MarketplaceFeatures';
import { UserProfile } from '../lib/supabase';
import { ServiceItem } from '../types';

interface HomePageProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  user: any;
  profile: UserProfile | null;
  onOpenAccount: () => void;
  onSelectService: (service: ServiceItem) => void;
  onAddToCart: (service: ServiceItem) => void;
  onBuyNow: (service: ServiceItem) => void;
  whatsappNumber: string;
  onOpenAndroidApp: () => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="bg-[#0b0e14] min-h-screen">
      <GamingHero />
      <PopularGames />
      <FeaturedListings />
      <MarketplaceFeatures />
    </div>
  );
};
