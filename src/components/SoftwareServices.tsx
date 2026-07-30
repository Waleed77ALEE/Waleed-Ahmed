import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  Code,
  Video,
  Palette,
  Layers,
  Cpu,
  Download,
  Database,
  FileText,
  Users,
  Check,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SOFTWARE_PRODUCTS, SOFTWARE_CATEGORIES, SoftwareProduct } from '../data/softwareData';
import { SoftwareOrderModal } from './SoftwareOrderModal';
import { SoftwareDetailModal } from './SoftwareDetailModal';

interface SoftwareServicesProps {
  user?: any;
  profile?: any;
  onOpenAccount?: () => void;
}

export const SoftwareServices: React.FC<SoftwareServicesProps> = ({
  user,
  profile,
  onOpenAccount
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Software');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderingProduct, setOrderingProduct] = useState<SoftwareProduct | null>(null);
  const [detailProduct, setDetailProduct] = useState<SoftwareProduct | null>(null);

  const filteredProducts = useMemo(() => {
    return SOFTWARE_PRODUCTS.filter((prod) => {
      const matchesCategory =
        selectedCategory === 'All Software' || prod.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.version.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q) ||
        prod.features.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderIcon = (iconName: string, category: string) => {
    switch (category) {
      case 'Adobe Products':
        return <Palette className="w-5 h-5 text-amber-400" />;
      case 'Microsoft Products':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Autodesk':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Video Editing':
        return <Video className="w-5 h-5 text-emerald-400" />;
      case 'Music Production':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Utilities':
        return <Download className="w-5 h-5 text-rose-400" />;
      case 'Security':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Code className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleScrollToGrid = () => {
    const el = document.getElementById('software-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate JSON-LD Structured Data for Software Products SEO
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Waleed Khan Afridi - Premium Software Licenses',
    operatingSystem: 'Windows, macOS, Linux, iOS, Android',
    applicationCategory: 'BusinessApplication, MultimediaApplication, DeveloperApplication',
    offers: SOFTWARE_PRODUCTS.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      price: p.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://waleedkhanafridi.com/#software-services`
    }))
  };

  return (
    <section id="software-services" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Structured Data Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative Glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-amber-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HERO SECTION */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Official Reseller &amp; Genuine License Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Premium <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">Software Licenses</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Get access to industry-leading software for professionals, businesses, students, designers, developers, video editors, architects, and creators.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleScrollToGrid}
              className="px-7 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <span>Browse Software</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Stats / Trust Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">100% Genuine</span>
                <span className="text-[10px] text-slate-400 block">Lifetime &amp; Official Keys</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Fast Dispatch</span>
                <span className="text-[10px] text-slate-400 block">10-30 Mins Delivery</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
              <Laptop className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Multi-Platform</span>
                <span className="text-[10px] text-slate-400 block">Win, Mac &amp; Cloud</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Full Guarantee</span>
                <span className="text-[10px] text-slate-400 block">24/7 Remote Tech Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS: CATEGORIES & SEARCH BAR */}
        <div id="software-grid" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
              {SOFTWARE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search software (e.g. Photoshop, Windows, AutoCAD)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* SOFTWARE PRODUCT CARDS GRID */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group relative p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  {/* Card Top Info */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all">
                        {renderIcon(prod.icon, prod.category)}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-lg font-black font-mono text-emerald-400">
                          ${prod.price} USD
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            ${prod.originalPrice} USD
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[9px] font-bold">
                          {prod.category}
                        </span>
                        {prod.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[9px] font-bold">
                            {prod.badge}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono text-[9px]">
                          {prod.platform}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                        {prod.name}
                      </h3>

                      <div className="text-[11px] text-cyan-400 font-mono font-bold mt-0.5">
                        Version: {prod.version}
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                      {prod.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => setDetailProduct(prod)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer flex-1"
                    >
                      Learn More
                    </button>

                    <button
                      onClick={() => setOrderingProduct(prod)}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer flex-1"
                    >
                      <span>Order Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Search className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">
                No software matching &ldquo;{searchQuery}&rdquo; found
              </h4>
              <p className="text-xs text-slate-400">
                Try clearing your search query or selecting &ldquo;All Software&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Software');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30 hover:bg-cyan-500/20 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Software Order Popup Modal */}
      <SoftwareOrderModal
        isOpen={Boolean(orderingProduct)}
        onClose={() => setOrderingProduct(null)}
        product={orderingProduct}
        user={user}
        profile={profile}
        onOpenAccount={onOpenAccount}
      />

      {/* Software Detail Modal */}
      <SoftwareDetailModal
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
        onOrderNow={(p) => setOrderingProduct(p)}
      />
    </section>
  );
};
