import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Star,
  ShoppingBag,
  MessageSquare,
  Clock,
  Heart,
  Eye,
  Filter,
  ArrowRight,
  Zap,
  CheckCircle2,
  Tag,
  Gift,
  Send,
  Bell,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { AiSubscriptionPlan, SubscriptionDuration } from '../data/aiSubscriptionsData';
import { aiSubscriptionStore } from '../services/aiSubscriptionStore';
import { PlatformLogo } from './PlatformLogo';
import { SecurityFeature } from './SecurityFeature';
import { AiSubscriptionDetailsModal } from './AiSubscriptionDetailsModal';
import { AiSubscriptionCheckoutModal } from './AiSubscriptionCheckoutModal';

interface AiSubscriptionMarketplaceProps {
  whatsappNumber: string;
}

export const AiSubscriptionMarketplace: React.FC<AiSubscriptionMarketplaceProps> = ({ whatsappNumber }) => {
  const [plans, setPlans] = useState<AiSubscriptionPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Per-card selected duration state
  const [cardDurations, setCardDurations] = useState<Record<string, SubscriptionDuration>>({});

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Modals state
  const [detailModalPlan, setDetailModalPlan] = useState<AiSubscriptionPlan | null>(null);
  const [checkoutModalPlan, setCheckoutModalPlan] = useState<AiSubscriptionPlan | null>(null);
  const [checkoutDuration, setCheckoutDuration] = useState<SubscriptionDuration>('Monthly');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Live Sales Toast State
  const [liveToast, setLiveToast] = useState<{ name: string; location: string; item: string; duration: string; timeAgo: string } | null>(null);

  // Load subscriptions & wishlist
  useEffect(() => {
    const updateStore = () => {
      const all = aiSubscriptionStore.getSubscriptions(false);
      setPlans(all);
      setWishlistIds(aiSubscriptionStore.getWishlist());
    };

    updateStore();
    const unsub = aiSubscriptionStore.subscribe(updateStore);
    return unsub;
  }, []);

  // Live Sales Toast interval
  useEffect(() => {
    const salesEvents = [
      { name: 'David M.', location: 'USA', item: 'HeyGen Pro Plan', duration: 'Yearly', timeAgo: '2 mins ago' },
      { name: 'Sarah K.', location: 'UK', item: 'Synthesia Creator Plan', duration: '3 Months', timeAgo: '4 mins ago' },
      { name: 'Alex R.', location: 'Germany', item: 'Kling AI Pro Plan', duration: 'Yearly', timeAgo: '6 mins ago' },
      { name: 'Zaid A.', location: 'UAE', item: 'Runway ML Pro Plan', duration: '6 Months', timeAgo: '9 mins ago' },
      { name: 'Elena V.', location: 'Canada', item: 'VEED.IO Pro Plan', duration: 'Yearly', timeAgo: '12 mins ago' },
      { name: 'Muhammad S.', location: 'Pakistan', item: 'InVideo AI Max Plan', duration: 'Yearly', timeAgo: '15 mins ago' }
    ];

    let toastIndex = 0;
    const interval = setInterval(() => {
      setLiveToast(salesEvents[toastIndex % salesEvents.length]);
      toastIndex++;

      setTimeout(() => {
        setLiveToast(null);
      }, 5000);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  // Get current duration for a plan card
  const getCardDuration = (planId: string): SubscriptionDuration => {
    return cardDurations[planId] || 'Monthly';
  };

  const handleCardDurationChange = (planId: string, dur: SubscriptionDuration) => {
    setCardDurations((prev) => ({ ...prev, [planId]: dur }));
  };

  const handleToggleWishlist = (e: React.MouseEvent, planId: string) => {
    e.stopPropagation();
    aiSubscriptionStore.toggleWishlist(planId);
  };

  const handleOpenDetails = (plan: AiSubscriptionPlan) => {
    aiSubscriptionStore.addRecentlyViewed(plan.id);
    setDetailModalPlan(plan);
  };

  const handleOpenCheckout = (plan: AiSubscriptionPlan, duration?: SubscriptionDuration) => {
    aiSubscriptionStore.addRecentlyViewed(plan.id);
    const selectedDur = duration || getCardDuration(plan.id);
    setCheckoutDuration(selectedDur);
    setCheckoutModalPlan(plan);
  };

  const categories = ['All', 'AI Video', 'AI Avatar', 'AI Voice & Generation', 'AI Creation'];

  // Filtered & Sorted plans
  const filteredPlans = useMemo(() => {
    return plans.filter((p) => {
      if (showWishlistOnly && !wishlistIds.includes(p.id)) return false;

      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.platformName.toLowerCase().includes(q) ||
        p.planName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [plans, selectedCategory, searchQuery, showWishlistOnly, wishlistIds]);

  const sortedPlans = useMemo(() => {
    const list = [...filteredPlans];
    if (sortBy === 'popularity') {
      list.sort((a, b) => b.ordersCount - a.ordersCount);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.prices.Monthly - b.prices.Monthly);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.prices.Monthly - a.prices.Monthly);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredPlans, sortBy]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const waClean = (whatsappNumber || '+923416860077').replace(/[^0-9]/g, '');

  return (
    <section id="ai-subscriptions" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Schema.org Structured Data Injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: plans.map((p, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'Product',
                name: `${p.platformName} ${p.planName}`,
                description: p.shortDescription,
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'USD',
                  price: p.prices.Monthly,
                  availability: 'https://schema.org/InStock'
                }
              }
            }))
          })
        }}
      />

      {/* Background Accent Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official AI Subscription Marketplace</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight flex items-center justify-center gap-3 flex-wrap">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 shrink-0" />
            <span>Premium AI Tools & Video Generators</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Get instant private access to official AI subscriptions including <strong className="text-white">HeyGen, Synthesia, Kling AI, Runway ML, Luma AI, Pika, Hailuo AI, VEED, and InVideo</strong> with 24/7 warranty and local PKR / Crypto payments.
          </p>

          {/* Promo Code Alert Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/20 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Limited Offer: Use coupon code <strong className="text-white bg-amber-500/30 px-2 py-0.5 rounded font-mono">WELCOME10</strong> for 10% OFF at checkout!</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] text-slate-400 font-mono">Instant Handover</span>
          </div>
        </div>

        {/* Filters & Search Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-xl space-y-4 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI platforms, plans or features (e.g. HeyGen, Runway, 4K, Avatar)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Sort & Wishlist Toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  showWishlistOnly
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-rose-400' : ''}`} />
                <span>Wishlist ({wishlistIds.length})</span>
              </button>

              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Marketplace Grid */}
        {sortedPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPlans.map((plan) => {
              const activeDur = getCardDuration(plan.id);
              const currentPrice = plan.prices[activeDur];
              const isSaved = wishlistIds.includes(plan.id);

              return (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden flex flex-col"
                >
                  {/* Top Badge Overlay */}
                  <div className="p-4 pb-0 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PlatformLogo title={plan.platformName} category={plan.category} className="w-8 h-8" />
                      <div>
                        <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                          {plan.platformName}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium">{plan.planName}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleToggleWishlist(e, plan.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        isSaved
                          ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {plan.shortDescription}
                      </p>

                      {/* Duration Selector Buttons */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Select Duration:
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {(['Monthly', '3 Months', '6 Months', 'Yearly'] as SubscriptionDuration[]).map((dur) => (
                            <button
                              key={dur}
                              onClick={() => handleCardDurationChange(plan.id, dur)}
                              className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                activeDur === dur
                                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                              }`}
                            >
                              {dur === 'Monthly' ? '1 Mo' : dur === '3 Months' ? '3 Mo' : dur === '6 Months' ? '6 Mo' : '12 Mo'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dynamic Price Display */}
                      <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Total Price ({activeDur}):</span>
                          <span className="text-lg font-black text-emerald-400 font-mono">
                            ${currentPrice.toFixed(2)} <span className="text-xs text-slate-400 font-normal">USD</span>
                          </span>
                        </div>
                        {plan.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      {/* Features Bullet List */}
                      <div className="mt-3 space-y-1.5">
                        {plan.features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenCheckout(plan, activeDur)}
                          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs hover:from-emerald-400 hover:to-teal-500 transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                        </button>

                        <button
                          onClick={() => handleOpenDetails(plan)}
                          className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Details</span>
                        </button>
                      </div>

                      <a
                        href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                          `Hi Waleed! I would like to inquire about ${plan.platformName} ${plan.planName} (${activeDur} - $${currentPrice.toFixed(2)}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-[11px] font-semibold hover:text-emerald-300 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-400" />
                        <span>Contact Support via WhatsApp</span>
                      </a>

                      <SecurityFeature variant="compact" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No subscription plans found</h3>
            <p className="text-xs text-slate-400 mt-1">Try resetting your search query or category filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setShowWishlistOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter & Customer Assurance Footer */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span>100% Guaranteed Account Security</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All subscriptions come with full private credentials, dedicated profile workspace access, and a 30-day instant account replacement warranty provided directly by Waleed Khan Afridi.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">⚡ Instant Handover</span>
              <span className="flex items-center gap-1">🔒 Safe Payments</span>
              <span className="flex items-center gap-1">💬 24/7 WhatsApp Support</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Subscribe for AI Subscription Deals & Price Drops</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Get notified whenever new AI platforms (e.g. Claude 3.7, Sora, Midjourney v7) are added!</p>
            </div>

            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 shrink-0"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
                ✓ Thank you! You're subscribed to AI price drop notifications.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Sales Toast Popup */}
      <AnimatePresence>
        {liveToast && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: 0 }}
            className="fixed bottom-5 left-5 z-40 p-3.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md max-w-xs flex items-center gap-3 text-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{liveToast.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({liveToast.location})</span>
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold">
                Purchased {liveToast.item} ({liveToast.duration})
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">{liveToast.timeAgo}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AiSubscriptionDetailsModal
        isOpen={!!detailModalPlan}
        onClose={() => setDetailModalPlan(null)}
        plan={detailModalPlan}
        onBuyNow={(p, d) => {
          setDetailModalPlan(null);
          handleOpenCheckout(p, d);
        }}
        whatsappNumber={whatsappNumber}
        allPlans={plans}
      />

      <AiSubscriptionCheckoutModal
        isOpen={!!checkoutModalPlan}
        onClose={() => setCheckoutModalPlan(null)}
        plan={checkoutModalPlan}
        initialDuration={checkoutDuration}
        whatsappNumber={whatsappNumber}
      />
    </section>
  );
};
