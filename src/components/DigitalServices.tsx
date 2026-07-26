import React, { useState, useEffect, useMemo } from 'react';
import { ServiceItem } from '../types';
import { productStore, ExtendedProductItem } from '../services/productStore';
import {
  Search,
  ShoppingBag,
  Sparkles,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  Video,
  Users,
  Coins,
  Bot,
  Cpu,
  FileText,
  Heart,
  Eye,
  PlayCircle,
  Mail,
  CheckCircle2,
  Gamepad2,
  Gift,
  CreditCard,
  Building2,
  Check,
  MessageSquare,
  X,
  Flame,
  Tag,
  Zap,
  DollarSign,
  Filter
} from 'lucide-react';

interface DigitalServicesProps {
  onSelectService: (service: ServiceItem) => void;
  whatsappNumber: string;
  onAddToCart?: (service: ServiceItem) => void;
  onBuyNow?: (service: ServiceItem) => void;
}

export const DigitalServices: React.FC<DigitalServicesProps> = ({ onSelectService, whatsappNumber, onAddToCart, onBuyNow }) => {
  const [services, setServices] = useState<ExtendedProductItem[]>([]);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('All');

  // Sync services and categories from productStore
  useEffect(() => {
    const loadFromStore = () => {
      const items = productStore.getProducts(false); // get active products
      const cats = productStore.getCategories();
      setServices(items);
      setDynamicCategories(['All', ...cats]);
      setLoading(false);
    };

    loadFromStore();
    const unsubscribe = productStore.subscribe(loadFromStore);
    return () => unsubscribe();
  }, []);

  const categories = dynamicCategories;

  // Featured services
  const featuredServices = useMemo(() => {
    return services.filter((s) => s.featured);
  }, [services]);

  // Subcategories based on active main category
  const availableSubCategories = useMemo(() => {
    if (selectedCategory === 'All') return [];
    const subs = new Set<string>();
    services
      .filter((s) => s.category === selectedCategory)
      .forEach((s) => {
        if (s.subCategory) subs.add(s.subCategory);
      });
    return Array.from(subs);
  }, [services, selectedCategory]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;

      // Subcategory check
      const matchesSubCategory =
        subCategoryFilter === 'All' || service.subCategory === subCategoryFilter;

      // Search query check
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        service.title.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        (service.subCategory && service.subCategory.toLowerCase().includes(query)) ||
        service.description.toLowerCase().includes(query) ||
        service.features.some((f) => f.toLowerCase().includes(query));

      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [services, selectedCategory, subCategoryFilter, searchQuery]);

  // Render Lucide Icon helper
  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Video': return <Video className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Coins': return <Coins className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Instagram': return <Sparkles className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Facebook': return <Users className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Youtube': return <PlayCircle className={className} />;
      case 'PlayCircle': return <PlayCircle className={className} />;
      case 'Linkedin': return <Users className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Mail': return <Mail className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      case 'Gamepad2': return <Gamepad2 className={className} />;
      case 'Gift': return <Gift className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      case 'Building2': return <Building2 className={className} />;
      default: return <ShoppingBag className={className} />;
    }
  };

  const getWhatsAppBuyUrl = (_service: ServiceItem) => {
    return 'https://wa.link/6128mm';
  };

  return (
    <section id="digital-services" className="py-20 bg-slate-950 relative border-t border-slate-900">
      {/* Background Accent Glows */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-lg">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Digital Services Marketplace</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Social Media & Digital Services
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Verified AI Subscriptions, High-Retention Social Media Growth, Aged Accounts, and Gift Vouchers with instant WhatsApp handover & 100% replacement warranty.
          </p>
        </div>

        {/* Featured Digital Products Section */}
        {featuredServices.length > 0 && searchQuery === '' && selectedCategory === 'All' && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Featured Digital Products
                </h3>
              </div>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                Top Sellers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <div
                  key={`featured-${service.id}`}
                  className="group relative bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.02] shadow-2xl hover:shadow-cyan-500/20 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Badge Glow */}
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/80 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all shadow-md">
                        {renderIcon(service.icon, 'w-6 h-6')}
                      </div>
                      <div className="flex flex-col items-end">
                        {service.badge && (
                          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 uppercase tracking-wider shadow-sm mb-1">
                            {service.badge}
                          </span>
                        )}
                        <span className="text-2xl font-black text-white tracking-tight">
                          ${service.price}
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
                      {service.category} {service.subCategory && `• ${service.subCategory}`}
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features Checklist */}
                    <ul className="space-y-1.5 mb-6">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {service.delivery}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {service.rating || 4.9} ({service.ordersCount || 100}+)
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => onSelectService(service)}
                        className="w-full py-2.5 px-2 text-[11px] font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-all text-center truncate"
                      >
                        Details
                      </button>

                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart(service)}
                          className="w-full py-2.5 px-2 text-[11px] font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all flex items-center justify-center gap-1 truncate"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>+Cart</span>
                        </button>
                      )}

                      <button
                        onClick={() => onBuyNow ? onBuyNow(service) : onSelectService(service)}
                        className="w-full py-2.5 px-2 text-[11px] font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-md transition-all flex items-center justify-center gap-1 truncate"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                        <span>Buy Now</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Control Bar: Search & Category Filter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-10 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search services (e.g. HeyGen, Instagram, OpenAI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Main Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSubCategoryFilter('All');
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                        : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategory Pills if main category selected */}
          {availableSubCategories.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mr-2">
                <Filter className="w-3 h-3 text-cyan-400" /> Filter:
              </span>
              <button
                onClick={() => setSubCategoryFilter('All')}
                className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                  subCategoryFilter === 'All'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All {selectedCategory}
              </button>
              {availableSubCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubCategoryFilter(sub)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                    subCategoryFilter === sub
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredServices.length}</strong> available digital services
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSubCategoryFilter('All');
              }}
              className="text-cyan-400 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Main Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No services found</h4>
            <p className="text-xs text-slate-400 mb-4">
              Try adjusting your search query or switching category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSubCategoryFilter('All');
              }}
              className="px-4 py-2 text-xs font-semibold bg-cyan-500 text-slate-950 rounded-xl"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.03] shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all shadow-sm">
                      {renderIcon(service.icon, 'w-5 h-5')}
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-400 font-medium">Starting from</span>
                      <span className="text-2xl font-black text-white tracking-tight">
                        ${service.price}
                      </span>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-800 text-cyan-400 uppercase tracking-wider">
                      {service.category}
                    </span>
                    {service.subCategory && (
                      <span className="text-[10px] text-slate-400">
                        • {service.subCategory}
                      </span>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-1.5 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer & Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {service.delivery}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Warranty
                    </span>
                  </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => onSelectService(service)}
                        className="w-full py-2 px-2 text-[11px] font-semibold text-slate-200 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all text-center truncate"
                      >
                        Details
                      </button>

                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart(service)}
                          className="w-full py-2 px-2 text-[11px] font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all flex items-center justify-center gap-1 truncate"
                          title="Add to Supabase Cart"
                        >
                          <ShoppingBag className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>+Cart</span>
                        </button>
                      )}

                      <button
                        onClick={() => onBuyNow ? onBuyNow(service) : onSelectService(service)}
                        className="w-full py-2 px-2 text-[11px] font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-md transition-all flex items-center justify-center gap-1 truncate"
                      >
                        <ShoppingBag className="w-3 h-3 text-slate-950 shrink-0" />
                        <span>Buy</span>
                      </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
