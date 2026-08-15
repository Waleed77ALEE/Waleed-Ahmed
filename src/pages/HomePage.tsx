import React from 'react';
import { GamingHero } from '../components/gaming/GamingHero';
import { AleePayPurposeSection } from '../components/AleePayPurposeSection';
import { OffersSlider } from '../components/OffersSlider';
import { TrustBanner } from '../components/TrustBanner';
import { PopularGames } from '../components/gaming/PopularGames';
import { MarketplaceFeatures } from '../components/gaming/MarketplaceFeatures';
import { TestimonialSlider } from '../components/TestimonialSlider';
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
      {/* 1. Hero with Prominent AleePay Branding */}
      <GamingHero />

      {/* 2. Clear Application Purpose Section (Explains what AleePay is & why authentication is used) */}
      <AleePayPurposeSection />

      {/* 3. Promotional Offers Slider */}
      <OffersSlider />

      {/* 4. Trust & Security Banner */}
      <TrustBanner />

      {/* 5. Popular Games & Marketplace Keys */}
      <PopularGames />
            
      {/* 6. AI Accounts Subscriptions */}
      <div id="ai-accounts">
        <AIPricingGrid />
      </div>

      {/* 7. Software Services */}
      <div id="softwares">
        <SoftwareServices user={user} profile={profile} onOpenAccount={onOpenAccount} />
      </div>

      {/* 8. Marketplace Features & Guarantee */}
      <MarketplaceFeatures />

      {/* 9. Reviews & Testimonials */}
      <TestimonialSlider />
    </div>
  );
};
