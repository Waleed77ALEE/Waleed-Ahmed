import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronRight, Home, Star, ShieldCheck, 
  Clock, CheckCircle, Zap, Shield, CreditCard, ChevronDown 
} from 'lucide-react';
import { MOCK_GAMING_PRODUCTS, ProductCategory, GamingProduct } from '../data/gamingMarketData';

export const GamingMarketplacePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Currency');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('All');
  const [sellerStatus, setSellerStatus] = useState<'All' | 'Online'>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const categories: ProductCategory[] = ['Currency', 'Items', 'Accounts', 'Boosting', 'Gift Cards'];
  const regions = ['All', 'US', 'EU', 'NA', 'Global'];
  const deliveryOptions = ['All', 'Instant', 'Under 1 Hour', '1-24 Hours', '1-3 Days'];

  const filteredProducts = useMemo(() => {
    return MOCK_GAMING_PRODUCTS.filter(p => {
      const matchCat = p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.gameName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion = selectedRegion === 'All' || p.region === selectedRegion;
      const matchDelivery = selectedDelivery === 'All' || p.deliveryTime === selectedDelivery;
      const matchSeller = sellerStatus === 'All' || (sellerStatus === 'Online' && p.seller.isOnline);
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchCat && matchSearch && matchRegion && matchDelivery && matchSeller && matchPrice;
    });
  }, [selectedCategory, searchQuery, selectedRegion, selectedDelivery, sellerStatus, priceRange]);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 pt-16 font-sans">
      
      {/* Breadcrumbs */}
      <div className="bg-[#11161d] border-b border-[#1c232e] py-3">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-cyan-400 flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/gaming-market" className="hover:text-cyan-400">World of Warcraft</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white">{selectedCategory}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Game Title & Horizontal Sub-Navigation */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-6">World of Warcraft Marketplace</h1>
          
          <div className="flex overflow-x-auto scrollbar-none gap-2 border-b border-[#1c232e]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-3 px-4 text-sm font-bold whitespace-nowrap transition-colors relative ${
                  selectedCategory === cat 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#11161d] rounded-xl border border-[#1c232e] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">Filters</h3>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search offers..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0b0e14] border border-[#1c232e] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Server / Region */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Region</label>
                <div className="relative">
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-[#0b0e14] border border-[#1c232e] rounded-lg pl-3 pr-8 py-2 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500"
                  >
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Delivery Speed */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Time</label>
                <div className="space-y-2">
                  {deliveryOptions.map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        selectedDelivery === opt ? 'bg-cyan-500 border-cyan-500' : 'border-[#2d3748] group-hover:border-slate-400'
                      }`}>
                        {selectedDelivery === opt && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <input 
                        type="radio" 
                        name="delivery" 
                        value={opt} 
                        checked={selectedDelivery === opt}
                        onChange={() => setSelectedDelivery(opt)}
                        className="hidden"
                      />
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller Status */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Seller Status</label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                    sellerStatus === 'Online' ? 'bg-emerald-500' : 'bg-[#1c232e]'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                      sellerStatus === 'Online' ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </div>
                  <input 
                    type="checkbox" 
                    checked={sellerStatus === 'Online'}
                    onChange={(e) => setSellerStatus(e.target.checked ? 'Online' : 'All')}
                    className="hidden"
                  />
                  <span className="text-sm text-slate-300">Online Now</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price Range ($)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={priceRange[0] === 0 ? '' : priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                    className="w-full bg-[#0b0e14] border border-[#1c232e] rounded-lg px-2 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <span className="text-slate-500">-</span>
                  <input 
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={priceRange[1] === 1000 ? '' : priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 1000])}
                    className="w-full bg-[#0b0e14] border border-[#1c232e] rounded-lg px-2 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

            </div>
            
            {/* Trust Banner Widget */}
            <div className="bg-gradient-to-br from-[#11161d] to-[#0b0e14] rounded-xl border border-[#1c232e] p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">GamerProtect™</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                100% Buyer Protection. Your payment is held securely until you confirm receipt of your digital goods.
              </p>
              <div className="flex gap-2">
                <CreditCard className="w-6 h-6 text-slate-500" />
                <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold">PP</div>
                <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold">CRYPTO</div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT: MARKETPLACE LISTINGS */}
          <main className="lg:col-span-3">
            
            {/* Results count & Sort */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400">Showing <span className="font-bold text-white">{filteredProducts.length}</span> listings</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Sort by:</span>
                <select className="bg-[#11161d] border border-[#1c232e] rounded-lg px-2 py-1 text-xs text-white focus:outline-none">
                  <option>Lowest Price</option>
                  <option>Highest Price</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* LISTINGS GRID/ROWS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#11161d] border border-[#1c232e] hover:border-cyan-500/40 rounded-2xl p-5 transition-all flex flex-col cursor-pointer group shadow-lg hover:shadow-cyan-500/10"
                  >
                    {/* Top Row: Game Badge & Status */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-[#1c232e] text-[9px] font-bold text-slate-300 uppercase tracking-wide">
                          {product.category}
                        </span>
                        {product.deliveryTime === 'Instant' ? (
                          <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold text-cyan-400 flex items-center gap-1 uppercase tracking-wide">
                            <Zap className="w-3 h-3" />
                            Instant
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-[#1c232e] text-[9px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wide">
                            <Clock className="w-3 h-3" />
                            {product.deliveryTime}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wide">Verified</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-100 text-sm leading-snug mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[40px]">
                      {product.title}
                    </h3>

                    {/* Seller Info & Price Row */}
                    <div className="mt-auto pt-4 border-t border-[#1c232e] flex items-end justify-between">
                      {/* Seller Info */}
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <img 
                            src={product.seller.avatarUrl} 
                            alt={product.seller.username} 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.seller.username)}&background=0D8ABC&color=fff`;
                            }}
                            className="w-9 h-9 rounded-full bg-[#0b0e14] border border-[#1c232e]" 
                          />
                          {product.seller.isOnline ? (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#11161d] rounded-full" />
                          ) : (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-slate-500 border-2 border-[#11161d] rounded-full" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400 transition-colors">{product.seller.username}</span>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                            <span className="font-mono text-amber-400">{product.seller.reputationScore}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Buy Button */}
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="text-xl font-black text-amber-400 font-mono tracking-tight">
                          ${product.price.toFixed(2)}
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-[10px] font-black uppercase tracking-wider transition-all group-hover:scale-105 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20">
                           Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12 border border-[#1c232e] border-dashed rounded-xl bg-[#11161d]">
                  <p className="text-slate-400">No listings found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion('All');
                      setSelectedDelivery('All');
                      setSellerStatus('All');
                    }}
                    className="mt-4 text-cyan-400 text-sm font-bold hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};
