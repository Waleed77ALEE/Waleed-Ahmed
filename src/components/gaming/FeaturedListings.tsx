import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Zap, Clock } from 'lucide-react';
import { MOCK_GAMING_PRODUCTS } from '../../data/gamingMarketData';

export const FeaturedListings: React.FC = () => {
  const products = MOCK_GAMING_PRODUCTS.slice(0, 4); // Take first 4

  return (
    <section className="py-20 bg-[#11161d] border-y border-[#1c232e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white tracking-tight">Featured Offers</h2>
          <Link to="/gaming-market" className="text-cyan-400 hover:text-cyan-300 font-bold text-sm flex items-center gap-1 transition-colors uppercase tracking-wider">
            Browse Market &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <Link key={product.id} to="/gaming-market">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0b0e14] border border-[#1c232e] hover:border-cyan-500/50 rounded-2xl p-5 h-full flex flex-col group transition-all hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Top Row: Game Badge & Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#1c232e] text-[9px] font-bold text-slate-300 uppercase tracking-wide">
                      {product.gameName}
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
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wide hidden sm:block">Verified</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-100 text-sm leading-snug mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[40px]">
                  {product.title}
                </h3>

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
                        className="w-9 h-9 rounded-full bg-[#11161d] border border-[#1c232e]" 
                      />
                      {product.seller.isOnline ? (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0b0e14] rounded-full" />
                      ) : (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-slate-500 border-2 border-[#0b0e14] rounded-full" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-400 transition-colors truncate max-w-[80px]">{product.seller.username}</span>
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
                    <div className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider transition-all group-hover:scale-105 shadow-lg shadow-cyan-500/20 group-hover:bg-cyan-400">
                       Buy Now
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
