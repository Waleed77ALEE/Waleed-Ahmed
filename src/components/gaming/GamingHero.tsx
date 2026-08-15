import React from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GamingHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#0b0e14]">
      {/* Background image / overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/80 via-[#0b0e14]/90 to-[#0b0e14] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2070&auto=format&fit=crop" 
          alt="Gaming Background" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop';
          }}
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>The Ultimate Digital Marketplace</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6"
        >
          Premium Marketplace for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            Software, AI & Digital Assets
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-medium"
        >
          Unlock premium software, AI subscriptions, engineering services, and top-tier digital assets. Guaranteed safety, instant delivery, and 24/7 support.
        </motion.p>

        {/* Global Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto relative mb-12"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-6 h-6 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search for games, accounts, currency..." 
              className="w-full bg-[#11161d] border-2 border-[#1c232e] rounded-full py-4 pl-14 pr-32 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-lg transition-colors shadow-2xl"
            />
            <button 
              onClick={() => navigate('/gaming-market')}
              className="absolute right-2 top-2 bottom-2 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full transition-colors uppercase tracking-wide text-sm flex items-center shadow-lg shadow-cyan-500/20"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-bold text-slate-300"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>100% Secure Escrow</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 text-amber-400" />
            <span>Verified Sellers</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
