import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, ShoppingBag } from 'lucide-react';
import { SoftwareServices } from '../components/SoftwareServices';
import { AiSubscriptionMarketplace } from '../components/AiSubscriptionMarketplace';
import { setDocumentSeo } from '../utils/setDocumentSeo';
import { MarketplaceSkeleton } from '../components/SkeletonLoader';
import { motion } from 'motion/react';

interface MarketplacePageProps {
  user: any;
  profile: any;
  onOpenAccount: () => void;
  whatsappNumber: string;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  user,
  profile,
  onOpenAccount,
  whatsappNumber,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDocumentSeo(
      'Official Products & Software Licenses Marketplace | Waleed Khan Afridi',
      'Browse and buy genuine, high-quality software licenses, custom tools, premium resources, and official AI tool subscriptions.'
    );
    window.scrollTo(0, 0);

    // Simulate Supabase data load with graceful minimum threshold to prevent layout flicker
    const timer = setTimeout(() => {
      // If user is authenticated, we should ideally wait for the profile to load
      if (user && !profile) {
        // Still wait
      } else {
        setIsLoading(false);
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [user, profile]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-16">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center space-x-2 text-sm text-slate-400 py-4 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800/60 mb-4" aria-label="Breadcrumb">
        <Link to="/" className="flex items-center hover:text-cyan-400 transition-colors">
          <Home className="w-4 h-4 mr-1" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
        <span className="text-cyan-400 font-medium">Marketplace</span>
      </nav>

      {isLoading ? (
        <MarketplaceSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4"
        >
          {/* Software Services Reseller Hub */}
          <SoftwareServices
            user={user}
            profile={profile}
            onOpenAccount={onOpenAccount}
          />

          {/* Separator / Divider with elegant glow */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-slate-950 text-slate-500 text-sm font-mono flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                <span>ALSO FEATURING AI SUBSCRIPTIONS</span>
              </span>
            </div>
          </div>

          {/* AI Subscriptions Marketplace */}
          <AiSubscriptionMarketplace whatsappNumber={whatsappNumber} />
        </motion.div>
      )}
    </div>
  );
};
