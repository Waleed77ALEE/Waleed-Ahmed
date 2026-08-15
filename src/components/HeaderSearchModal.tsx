import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Code,
  FolderGit2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Plus,
  Zap,
  CheckCircle2,
  ExternalLink,
  Bot,
  Video,
  Palette,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CORE_SERVICES, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { productStore } from '../services/productStore';
import { ServiceItem } from '../types';
import { generateImageAltText } from '../lib/seo';

interface HeaderSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onBuyNow?: (service: ServiceItem) => void;
  initialQuery?: string;
}

export const HeaderSearchModal: React.FC<HeaderSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onAddToCart,
  onBuyNow,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'portfolio' | 'marketplace'>('all');
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const products = productStore.getProducts();
  const q = query.trim().toLowerCase();

  // Filter Services
  const filteredServices = CORE_SERVICES.filter((s) => {
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.deliverables.some((d) => d.toLowerCase().includes(q))
    );
  });

  // Filter Portfolio Projects
  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  // Filter Marketplace Products
  const filteredProducts = products.filter((p) => {
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
      (p.features && p.features.some((f) => f.toLowerCase().includes(q)))
    );
  });

  const totalResults =
    (activeTab === 'all' || activeTab === 'services' ? filteredServices.length : 0) +
    (activeTab === 'all' || activeTab === 'portfolio' ? filteredProjects.length : 0) +
    (activeTab === 'all' || activeTab === 'marketplace' ? filteredProducts.length : 0);

  const handleServiceClick = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  const handleAddToCartClick = (e: React.MouseEvent, item: ServiceItem) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
      setAddedItemIds((prev) => [...prev, item.id]);
      setTimeout(() => {
        setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
      }, 2000);
    } else {
      onNavigate('ai-subscriptions');
      onClose();
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent, item: ServiceItem) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(item);
      onClose();
    } else {
      onNavigate('ai-subscriptions');
      onClose();
    }
  };

  const popularSearches = [
    'Adobe Photoshop 2026',
    'Windows 11 Pro',
    'AutoCAD 2026',
    'ChatGPT Plus',
    'Claude 3.5 Sonnet',
    'Full Stack Web',
    'SEO Audit',
    'HeyGen Video',
    'Midjourney Pro',
    'DaVinci Resolve'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Search Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-slate-950 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[82vh]"
        >
          {/* Top Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl flex items-center gap-3">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search services, portfolio projects, AI subscriptions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white text-sm sm:text-base font-medium focus:outline-none placeholder:text-slate-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                title="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs font-mono font-bold shrink-0 cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-900 flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              All Results ({q ? totalResults : CORE_SERVICES.length + PORTFOLIO_PROJECTS.length + products.length})
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'services'
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Services ({filteredServices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'portfolio'
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Portfolio ({filteredProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Marketplace ({filteredProducts.length})</span>
            </button>
          </div>

          {/* Search Results Area */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Empty Suggestion Pills when query is short */}
            {!q && (
              <div className="mb-4">
                <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider block mb-2">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 1: CORE SERVICES */}
            {(activeTab === 'all' || activeTab === 'services') && filteredServices.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" />
                    <span>Engineering &amp; Web Services ({filteredServices.length})</span>
                  </span>
                  <button
                    onClick={() => handleServiceClick('services')}
                    className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                  >
                    <span>View all services</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceClick('services')}
                      className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {service.title}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                              {service.turnaround}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <span className="text-xs font-black text-cyan-400 font-mono">
                          From {service.startingPrice}
                        </span>
                        <span className="p-1.5 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 2: PORTFOLIO PROJECTS */}
            {(activeTab === 'all' || activeTab === 'portfolio') && filteredProjects.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Portfolio Projects ({filteredProjects.length})</span>
                  </span>
                  <button
                    onClick={() => handleServiceClick('projects')}
                    className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                  >
                    <span>View portfolio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleServiceClick('projects')}
                      className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all cursor-pointer group flex items-center gap-3"
                    >
                      <img
                        src={project.image}
                        alt={generateImageAltText(project.title, project.category)}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
                        }}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-800 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-bold uppercase text-cyan-400 block tracking-wider">
                          {project.category}
                        </span>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                          {project.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: MARKETPLACE PRODUCTS & AI SUBSCRIPTIONS */}
            {(activeTab === 'all' || activeTab === 'marketplace') && filteredProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Marketplace &amp; AI Subscriptions ({filteredProducts.length})</span>
                  </span>
                  <button
                    onClick={() => handleServiceClick('ai-subscriptions')}
                    className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                  >
                    <span>Browse store</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {filteredProducts.map((prod) => {
                    const isAdded = addedItemIds.includes(prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => handleServiceClick('ai-subscriptions')}
                        className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            {prod.icon === 'Bot' ? (
                              <Bot className="w-4 h-4 text-cyan-400" />
                            ) : prod.icon === 'Video' ? (
                              <Video className="w-4 h-4 text-emerald-400" />
                            ) : prod.icon === 'Sparkles' ? (
                              <Sparkles className="w-4 h-4 text-amber-400" />
                            ) : (
                              <ShoppingBag className="w-4 h-4 text-indigo-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                                {prod.title}
                              </h4>
                              {prod.badge && (
                                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[9px] font-bold">
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {prod.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <span className="text-sm font-black text-emerald-400 font-mono mr-1">
                            ${prod.price} USD
                          </span>

                          <button
                            onClick={(e) => handleAddToCartClick(e, prod)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 cursor-pointer shadow-md ${
                              isAdded
                                ? 'bg-emerald-500 text-slate-950 font-black'
                                : 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => handleBuyNowClick(e, prod)}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1 cursor-pointer shadow-md"
                          >
                            <span>Buy Now</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NO RESULTS FOUND STATE */}
            {q && totalResults === 0 && (
              <div className="p-10 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
                <Search className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-white">
                  No matching services or products found for &ldquo;{query}&rdquo;
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try adjusting your search keyword or explore our full catalog using the navigation categories below.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleServiceClick('ai-subscriptions')}
                    className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/20 transition-all cursor-pointer"
                  >
                    Browse AI Subscriptions
                  </button>
                  <button
                    onClick={() => handleServiceClick('services')}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    View Engineering Services
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 px-5 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-time instant indexing active</span>
            </span>
            <span className="font-mono">Showing {totalResults} result(s)</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
