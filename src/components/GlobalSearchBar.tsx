import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Code, FolderGit2, X, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CORE_SERVICES, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { productStore } from '../services/productStore';
import { SOFTWARE_PRODUCTS } from '../data/softwareData';
import { MOCK_GAMING_PRODUCTS } from '../data/gamingMarketData';
import { ServiceItem } from '../types';

interface GlobalSearchBarProps {
  onNavigate: (sectionId: string) => void;
  onAddToCart?: (service: ServiceItem) => void;
  onBuyNow?: (service: ServiceItem) => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const products = productStore.getProducts();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const q = query.toLowerCase().trim();

  // Filter Services
  const filteredServices = CORE_SERVICES.filter((s) => {
    if (!q) return false;
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  }).slice(0, 3);

  // Filter Portfolio Projects
  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (!q) return false;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }).slice(0, 3);

  // Filter Marketplace Products
  const allMarketplaceItems = [
    ...products.map(p => ({ id: p.id, title: p.title, description: p.description, category: p.category, price: p.price, image: p.image, link: 'ai-accounts' })),
    ...SOFTWARE_PRODUCTS.map(p => ({ id: p.id, title: p.name, description: p.description, category: p.category, price: p.price, image: p.image, link: 'softwares' })),
    ...MOCK_GAMING_PRODUCTS.map(p => ({ id: p.id, title: p.title, description: p.description, category: p.category, price: p.price, image: '', link: 'gaming-market' }))
  ];
  
  const filteredProducts = allMarketplaceItems.filter((p) => {
    if (!q) return false;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }).slice(0, 4);

  const hasResults = filteredServices.length > 0 || filteredProjects.length > 0 || filteredProducts.length > 0;

  const handleNavigate = (id: string) => {
    setIsOpen(false);
    setQuery('');
    onNavigate(id);
  };

  return (
    <div ref={wrapperRef} className="relative hidden md:block z-50">
      <div className="relative group flex items-center">
        <Search className="absolute left-3 w-3.5 h-3.5 text-cyan-400 group-focus-within:text-cyan-300 transition-colors pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search services, products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-48 lg:w-64 xl:w-80 pl-9 pr-12 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 focus:border-cyan-500/50 focus:bg-slate-900 text-slate-200 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 placeholder:text-slate-500"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-0.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="absolute right-3 pointer-events-none">
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800 border border-slate-700 text-slate-400 rounded-md">
              Ctrl K
            </kbd>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-[400px] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="max-h-[400px] overflow-y-auto overscroll-contain pb-2">
              {!hasResults ? (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Search className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-sm font-bold text-slate-300">No results found for "{query}"</p>
                  <p className="text-xs">Try searching for "SEO", "Web", or "Account"</p>
                </div>
              ) : (
                <div className="p-2 space-y-4">
                  {/* Services */}
                  {filteredServices.length > 0 && (
                    <div>
                      <div className="px-3 py-2 flex items-center gap-1.5 text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                        <Code className="w-3.5 h-3.5" />
                        <span>Services</span>
                      </div>
                      <div className="space-y-1">
                        {filteredServices.map(s => (
                          <button
                            key={s.id}
                            onClick={() => handleNavigate('services')}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800/80 transition-colors group flex items-start gap-3"
                          >
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                              <Code className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">{s.title}</h4>
                              <p className="text-[10px] text-slate-400 truncate">{s.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0 self-center" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Marketplace */}
                  {filteredProducts.length > 0 && (
                    <div>
                      <div className="px-3 py-2 flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Marketplace & Products</span>
                      </div>
                      <div className="space-y-1">
                        {filteredProducts.map(p => (
                          <button
                            key={p.id}
                            onClick={() => handleNavigate(p.link)}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800/80 transition-colors group flex items-start gap-3"
                          >
                            {p.image ? (
                               <img src={p.image} alt={p.title} className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-700" />
                            ) : (
                               <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                 <ShoppingBag className="w-4 h-4" />
                               </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-0.5">
                                <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate">{p.title}</h4>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold ml-2">${p.price}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 truncate">{p.category} • {p.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Portfolio */}
                  {filteredProjects.length > 0 && (
                    <div>
                      <div className="px-3 py-2 flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-400 tracking-wider">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Portfolio</span>
                      </div>
                      <div className="space-y-1">
                        {filteredProjects.map(p => (
                          <button
                            key={p.id}
                            onClick={() => handleNavigate('portfolio')}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800/80 transition-colors group flex items-start gap-3"
                          >
                            <img src={p.image} alt={p.title} className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-700" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 truncate">{p.title}</h4>
                              <p className="text-[10px] text-slate-400 truncate">{p.category}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {hasResults && (
              <div className="px-4 py-2.5 bg-slate-800/50 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  Instant results
                </span>
                <span>Press Enter to go to full results</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
