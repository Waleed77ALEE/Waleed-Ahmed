import { useRemoteConfig } from "../../hooks/useRemoteConfig";
import { getButtonColorClasses } from "../../utils/themeHelper";
import React from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, Zap, Star, Sparkles, ChevronRight, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateImageAltText } from '../../lib/seo';

export const GamingHero: React.FC = () => {
  const ctaColor = useRemoteConfig("cta_button_color", "blue");
  const buttonClasses = getButtonColorClasses(ctaColor);
  const navigate = useNavigate();

  const featuredCards = [
    {
      id: 1,
      title: "EA SPORTS FC 27",
      badge: "PREORDER",
      badgeColor: "bg-blue-600 text-white",
      platform: "EA App · Key · GLOBAL",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
      price: "$59.99",
      originalPrice: "$69.99"
    },
    {
      id: 2,
      title: "HELL LET LOOSE: VIETNAM",
      badge: "PREORDER",
      badgeColor: "bg-amber-600 text-white",
      platform: "Steam · Key · GLOBAL",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
      price: "$39.99",
      originalPrice: "$49.99"
    },
    {
      id: 3,
      title: "MARVEL'S SPIDER-MAN",
      badge: "BESTSELLER",
      badgeColor: "bg-red-600 text-white",
      platform: "Steam · Key · GLOBAL",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop",
      price: "$29.99",
      originalPrice: "$49.99"
    },
    {
      id: 4,
      title: "RANDOM WEEKEND",
      badge: "PROMO",
      badgeColor: "bg-purple-600 text-white",
      platform: "Dare to try something new?",
      image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1000&auto=format&fit=crop",
      price: "$4.99",
      originalPrice: "$9.99"
    }
  ];

  return (
    <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#0a0a0a]">
      {/* Top Promotional Banner (G2A Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-4 sm:p-5 shadow-2xl flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-black/30 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">Exclusive Event</span>
                <span className="text-xs font-bold text-amber-200">Gemini Bestsellers Sale</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5">Up to 88% OFF on AAA Game Keys, Steam Accounts & Software Subscriptions!</h2>
            </div>
          </div>
          <button 
            onClick={() => navigate('/gaming-market')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shrink-0 cursor-pointer"
          >
            <span>Explore Deals</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Title & Subtext */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest mb-4"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>WALEEDKHANAFRIDI.ONLINE — Verified Digital Goods &amp; Payments</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            WALEEDKHANAFRIDI.ONLINE: Instant Gaming Keys, AI Licenses &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400">Digital Assets</span>
          </motion.h1>
          <p className="text-sm sm:text-base text-gray-300 font-medium max-w-2xl mx-auto">
            Welcome to <strong>WALEEDKHANAFRIDI.ONLINE</strong>. Your trusted marketplace for authentic software licenses, AI subscription access, gaming CD keys, and instant multi-rail digital payments.
          </p>
        </div>

        {/* 4 Immersive Featured Game Cards Carousel / Grid (Exact G2A Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {featuredCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              onClick={() => navigate('/gaming-market')}
              className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-red-500/20"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={card.image} 
                  alt={generateImageAltText(card.title, card.platform)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              {/* Content at Bottom */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex flex-col justify-end">
                <span className="text-[11px] font-bold text-gray-400 mb-1 tracking-wide">{card.platform}</span>
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-red-400 transition-colors tracking-tight mb-3">
                  {card.title}
                </h3>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                  <div className="flex flex-col gap-1">
                    {card.originalPrice && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-gray-500 uppercase font-bold">Original Price</span>
                        <span className="text-xs font-semibold text-gray-500 line-through decoration-red-500/50">
                          {card.originalPrice}
                        </span>
                      </div>
                    )}
                    <div className="flex items-end gap-1.5">
                      <span className="text-[10px] text-red-400 uppercase font-black">Discounted Price</span>
                      <span className="text-lg leading-none font-black text-white">{card.price}</span>
                    </div>
                  </div>
                  <span className={`px-4 py-2 ${buttonClasses} font-extrabold text-xs rounded-xl transition-all shadow-md group-hover:scale-105 cursor-pointer`}>
                    Buy Now
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-800/80 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <ShieldCheck className="w-8 h-8 text-red-500 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">Secure Transactions</h4>
              <p className="text-xs text-gray-400">Encrypted checkout & 24/7 fraud protection</p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <Zap className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">Instant Delivery</h4>
              <p className="text-xs text-gray-400">Keys & codes delivered to your inbox instantly</p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <Star className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">99.8% Positive Reviews</h4>
              <p className="text-xs text-gray-400">Over 2M+ satisfied gamers worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
