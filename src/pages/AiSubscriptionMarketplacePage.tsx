import React from 'react';
import { AiSubscriptionMarketplace } from '../components/AiSubscriptionMarketplace';
import AIPricingGrid from '../components/AIPricingGrid';

interface AiSubscriptionMarketplacePageProps {
  whatsappNumber: string;
}

export const AiSubscriptionMarketplacePage: React.FC<AiSubscriptionMarketplacePageProps> = ({ whatsappNumber }) => {
  return (
    <div className="pt-24 bg-[#0b0e14] min-h-screen">
      <AIPricingGrid />
      <AiSubscriptionMarketplace whatsappNumber={whatsappNumber} />
    </div>
  );
};
