import React from 'react';
import { GamingHero } from '../components/gaming/GamingHero';
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
    <div className="bg-[#0b0e14] min-h-screen pt-16">
      {/* 1. SEO Optimized Hero & Search Catalog */}
      <GamingHero />

      {/* 2. AI Accounts Subscriptions Catalog */}
      <div id="ai-accounts" className="py-8">
        <AIPricingGrid />
      </div>

      {/* 3. Software Services Catalog */}
      <div id="softwares" className="py-8">
        <SoftwareServices user={user} profile={profile} onOpenAccount={onOpenAccount} />
      </div>
    </div>
  );
};

