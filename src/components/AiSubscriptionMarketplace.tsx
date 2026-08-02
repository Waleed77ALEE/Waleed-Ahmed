import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Award,
  X,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { AiSubscriptionPlan, SubscriptionDuration } from '../data/aiSubscriptionsData';
import { aiSubscriptionStore } from '../services/aiSubscriptionStore';
import { PlatformLogo } from './PlatformLogo';
import { SecurityFeature } from './SecurityFeature';
import { ProductGridSkeleton } from './SkeletonLoader';
import { AiSubscriptionDetailsModal } from './AiSubscriptionDetailsModal';
import { AiSubscriptionCheckoutModal } from './AiSubscriptionCheckoutModal';

interface AiSubscriptionMarketplaceProps {
  whatsappNumber: string;
}

export interface BrandCategory {
  id: string;
  name: string;
  emoji: string;
  platformKey: string;
}

const BRAND_CATEGORIES: BrandCategory[] = [
  { id: 'All', name: 'All Products', emoji: '🌟', platformKey: 'all' },
  { id: 'HeyGen', name: 'HeyGen', emoji: '🎥', platformKey: 'heygen' },
  { id: 'ChatGPT', name: 'ChatGPT', emoji: '🤖', platformKey: 'openai' },
  { id: 'Canva', name: 'Canva', emoji: '🎨', platformKey: 'canva' },
  { id: 'CapCut', name: 'CapCut', emoji: '🎬', platformKey: 'capcut' },
  { id: 'Spotify', name: 'Spotify', emoji: '🎵', platformKey: 'spotify' },
  { id: 'Netflix', name: 'Netflix', emoji: '🍿', platformKey: 'netflix' },
  { id: 'Adobe', name: 'Adobe', emoji: '🎨', platformKey: 'adobe' },
  { id: 'Microsoft', name: 'Microsoft', emoji: '💻', platformKey: 'microsoft' },
  { id: 'Runway', name: 'Runway', emoji: '⚡', platformKey: 'runway' },
  { id: 'Kling', name: 'Kling AI', emoji: '🎬', platformKey: 'kling' },
  { id: 'Synthesia', name: 'Synthesia', emoji: '📹', platformKey: 'synthesia' },
  { id: 'Luma', name: 'Luma AI', emoji: '🌊', platformKey: 'luma' },
  { id: 'VEED', name: 'VEED.IO', emoji: '✂️', platformKey: 'veed' },
  { id: 'InVideo', name: 'InVideo AI', emoji: '📹', platformKey: 'invideo' },
];

export const AiSubscriptionMarketplace: React.FC<AiSubscriptionMarketplaceProps> = ({ whatsappNumber }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read brand/category parameter from URL query string
  const urlCategory = searchParams.get('category') || searchParams.get('brand') || 'All';

  const [plans, setPlans] = useState<AiSubscriptionPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  // Synchronize component state if URL changes externally (e.g. back/forward navigation)
  useEffect(() => {
    const currentUrlCat = searchParams.get('category') || searchParams.get('brand') || 'All';
    if (currentUrlCat !== selectedCategory) {
      setSelectedCategory(currentUrlCat);
    }
  }, [searchParams]);

  // Initial load skeleton simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle Category Filter Selection & Synchronize URL State
  const handleCategoryChange = (catId: string) => {
    if (catId === selectedCategory) return;
    setIsLoading(true);
    setSelectedCategory(catId);

    // Update URL query parameters cleanly
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'All') {
      newParams.delete('category');
      newParams.delete('brand');
    } else {
      newParams.set('category', catId.toLowerCase());
      newParams.delete('brand'); // clear redundant param
    }
    setSearchParams(newParams, { replace: true });

    setTimeout(() => setIsLoading(false), 150);
  };

  // Load subscriptions & wishlist from store
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
      { name: 'Tariq K.', location: 'Pakistan', item: 'ChatGPT Plus', duration: 'Monthly', timeAgo: '3 mins ago' },
      { name: 'Sarah K.', location: 'UK', item: 'Canva Pro', duration: 'Yearly', timeAgo: '5 mins ago' },
      { name: 'Alex R.', location: 'Germany', item: 'CapCut Pro', duration: 'Yearly', timeAgo: '7 mins ago' },
      { name: 'Zaid A.', location: 'UAE', item: 'Spotify Premium Family', duration: '6 Months', timeAgo: '10 mins ago' },
      { name: 'Elena V.', location: 'Canada', item: 'Netflix 4K Ultra HD', duration: '6 Months', timeAgo: '12 mins ago' },
      { name: 'Omer F.', location: 'Saudi Arabia', item: 'Adobe Creative Cloud', duration: 'Yearly', timeAgo: '15 mins ago' }
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

  // Helper to match brands cleanly
  const isBrandMatch = (p: AiSubscriptionPlan, targetCat: string) => {
    const k = targetCat.toLowerCase().trim();
    if (!k || k === 'all') return true;

    if (k === 'heygen') return p.platformKey === 'heygen' || p.platformName.toLowerCase().includes('heygen') || p.id.includes('heygen');
    if (k === 'chatgpt' || k === 'openai') return p.platformKey === 'openai' || p.platformName.toLowerCase().includes('chatgpt') || p.platformName.toLowerCase().includes('openai') || p.id.includes('chatgpt');
    if (k === 'canva') return p.platformKey === 'canva' || p.platformName.toLowerCase().includes('canva') || p.id.includes('canva');
    if (k === 'capcut') return p.platformKey === 'capcut' || p.platformName.toLowerCase().includes('capcut') || p.id.includes('capcut');
    if (k === 'spotify') return p.platformKey === 'spotify' || p.platformName.toLowerCase().includes('spotify') || p.id.includes('spotify');
    if (k === 'netflix') return p.platformKey === 'netflix' || p.platformName.toLowerCase().includes('netflix') || p.id.includes('netflix');
    if (k === 'adobe') return p.platformKey === 'adobe' || p.platformName.toLowerCase().includes('adobe') || p.id.includes('adobe');
    if (k === 'microsoft' || k === 'ms') return p.platformKey === 'microsoft' || p.platformName.toLowerCase().includes('microsoft') || p.id.includes('ms-');
    if (k === 'runway') return p.platformKey === 'runway' || p.platformName.toLowerCase().includes('runway');
    if (k === 'kling') return p.platformKey === 'kling' || p.platformName.toLowerCase().includes('kling');
    if (k === 'synthesia') return p.platformKey === 'synthesia' || p.platformName.toLowerCase().includes('synthesia');
    if (k === 'luma') return p.platformKey === 'luma' || p.platformName.toLowerCase().includes('luma');
    if (k === 'veed') return p.platformKey === 'veed' || p.platformName.toLowerCase().includes('veed');
    if (k === 'invideo') return p.platformKey === 'invideo' || p.platformName.toLowerCase().includes('invideo');

    return p.category.toLowerCase().includes(k) || p.platformName.toLowerCase().includes(k) || p.planName.toLowerCase().includes(k);
  };

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

  // Filtered & Sorted plans
  const filteredPlans = useMemo(() => {
    return plans.filter((p) => {
      if (showWishlistOnly && !wishlistIds.includes(p.id)) return false;

      const matchesBrand = isBrandMatch(p, selectedCategory);
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.platformName.toLowerCase().includes(q) ||
        p.planName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q));

      return matchesBrand && matchesQuery;
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

  // Compute total product counts per brand
  const brandCounts = useMemo(() => {
    const map: Record<string, number> = { All: plans.length };
    BRAND_CATEGORIES.forEach((b) => {
      if (b.id !== 'All') {
        map[b.id] = plans.filter((p) => isBrandMatch(p, b.id)).length;
      }
    });
    return map;
  }, [plans]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const waClean = (whatsappNumber || '+923416860077').replace(/[^0-9]/g, '');

  return (
    <section id="ai-subscriptions" className="py-12 sm:py-20 bg-slate-950 relative overflow-hidden">
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
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Marketplace & Subscriptions Hub</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Explore Verified Digital Subscriptions
          </h2>

          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            Instant activation and direct email access for <strong className="text-white">HeyGen, ChatGPT, Canva Pro, CapCut, Spotify, Netflix 4K, Adobe Creative Cloud, Microsoft 365, Runway, Kling AI</strong> & more.
          </p>
        </div>

        {/* 🌟 HORIZONTAL BRAND FILTER BAR 🌟 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span className="flex items-center gap-2 text-cyan-400">
              <Filter className="w-4 h-4" />
              <span>Browse by Platform & Brand</span>
            </span>
            <span className="text-slate-500 text-[11px]">
              Showing {sortedPlans.length} {sortedPlans.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>

          {/* Horizontal Scrollable Chips Container */}
          <div className="relative group">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 px-1 custom-scrollbar scroll-smooth">
              {BRAND_CATEGORIES.map((brand) => {
                const isSelected = selectedCategory.toLowerCase() === brand.id.toLowerCase() || (selectedCategory.toLowerCase() === 'all' && brand.id === 'All');
                const count = brandCounts[brand.id] || 0;

                return (
                  <button
                    key={brand.id}
                    onClick={() => handleCategoryChange(brand.id)}
                    className={`group/btn relative px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black border-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.02]'
                        : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    {/* Brand Icon or Emoji */}
                    {brand.id === 'All' ? (
                      <span className="text-base leading-none">{brand.emoji}</span>
                    ) : (
                      <PlatformLogo title={brand.name} category={brand.name} className="w-4 h-4 shrink-0" />
                    )}

                    <span>{brand.name}</span>

                    {/* Count Pill */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                        isSelected
                          ? 'bg-slate-950/30 text-slate-950 font-extrabold'
                          : 'bg-slate-950 text-slate-400 group-hover/btn:text-slate-300'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search, Sort & Wishlist Bar */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, plans or features..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showWishlistOnly
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>Wishlist ({wishlistIds.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Notice if set */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="flex items-center justify-between px-2 py-1 text-xs text-slate-400">
            <div className="flex items-center gap-2 flex-wrap">
              <span>Active filter:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                  {selectedCategory}
                  <button onClick={() => handleCategoryChange('All')} className="hover:text-white ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-white ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => {
                handleCategoryChange('All');
                setSearchQuery('');
                setShowWishlistOnly(false);
              }}
              className="text-cyan-400 hover:underline font-medium text-xs cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Marketplace Grid or Skeleton */}
        {isLoading ? (
          <ProductGridSkeleton count={6} />
        ) : sortedPlans.length > 0 ? (
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
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Bar with Brand Logo & Badge */}
                  <div>
                    <div className="p-4 pb-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
                      <div className="flex items-center gap-3">
                        <PlatformLogo title={plan.platformName} category={plan.category} className="w-9 h-9 shrink-0" />
                        <div>
                          <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-400 transition-colors">
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

                    {/* Short Description */}
                    <div className="p-4 space-y-4">
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed min-h-[32px]">
                        {plan.shortDescription}
                      </p>

                      {/* Duration Selector Chips */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Select Duration:
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {(['Monthly', '3 Months', '6 Months', 'Yearly'] as SubscriptionDuration[]).map((dur) => (
                            <button
                              key={dur}
                              onClick={() => handleCardDurationChange(plan.id, dur)}
                              className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                activeDur === dur
                                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                              }`}
                            >
                              {dur === 'Monthly' ? '1 Mo' : dur === '3 Months' ? '3 Mo' : dur === '6 Months' ? '6 Mo' : '12 Mo'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Total Price ({activeDur}):</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black text-cyan-400 font-mono">
                              ${currentPrice.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-400">USD</span>
                          </div>
                        </div>

                        {plan.badge ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {plan.badge}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] text-emerald-400 bg-emerald-500/10 font-medium">
                            ✓ In Stock
                          </span>
                        )}
                      </div>

                      {/* Key Features List */}
                      <div className="space-y-1.5 pt-1">
                        {plan.features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenCheckout(plan, activeDur)}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy Now</span>
                      </button>

                      <button
                        onClick={() => handleOpenDetails(plan)}
                        className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Details</span>
                      </button>
                    </div>

                    <a
                      href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                        `Hi Waleed! I want to buy ${plan.platformName} ${plan.planName} (${activeDur} - $${currentPrice.toFixed(2)}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-[11px] font-semibold hover:text-cyan-300 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3 h-3 text-cyan-400" />
                      <span>Contact Waleed via WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No subscription products found</h3>
            <p className="text-xs text-slate-400 mt-1">Try resetting your search query or brand filters.</p>
            <button
              onClick={() => {
                handleCategoryChange('All');
                setSearchQuery('');
                setShowWishlistOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 hover:bg-cyan-500/30 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Customer Security Assurance Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span>100% Guaranteed Account Security</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All subscriptions come with official private credentials, dedicated workspace access, and a 30-day instant account replacement warranty provided directly by Waleed Khan Afridi.
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
                <span>Subscribe for Deals & Instant Price Drops</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Get notified whenever new platforms (e.g. Claude, Sora, Midjourney) are added!</p>
            </div>

            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20 shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold text-center">
                ✓ Thank you! You're subscribed to price drop notifications.
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
            className="fixed bottom-5 left-5 z-40 p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-md max-w-xs flex items-center gap-3 text-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{liveToast.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({liveToast.location})</span>
              </div>
              <div className="text-[11px] text-cyan-300 font-semibold">
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
