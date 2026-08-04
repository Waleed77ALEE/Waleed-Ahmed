import React from 'react';
import { GamingHero } from '../components/gaming/GamingHero';
import { PopularGames } from '../components/gaming/PopularGames';
import { FeaturedListings } from '../components/gaming/FeaturedListings';
import { MarketplaceFeatures } from '../components/gaming/MarketplaceFeatures';
import AIPricingGrid from '../components/AIPricingGrid';
import { SoftwareServices } from '../components/SoftwareServices';
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

export const HomePage: React.FC<HomePageProps> = ({ user, profile, onOpenAccount, whatsappNumber }) => {
  return (
    <div className="bg-[#0b0e14] min-h-screen">
      <GamingHero />
      <PopularGames />
      <FeaturedListings />
      
      {/* AI Accounts Subscriptions */}
      <div id="ai-accounts">
        <AIPricingGrid />
      </div>

      {/* Software Services */}
      <div id="softwares">
        <SoftwareServices user={user} profile={profile} onOpenAccount={onOpenAccount} />
      </div>

      <MarketplaceFeatures />
    </div>
  );
};
