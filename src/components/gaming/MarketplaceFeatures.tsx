import React from 'react';
import { Shield, Zap, HeadphonesIcon, Globe } from 'lucide-react';

export const MarketplaceFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-[#0b0e14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-[#11161d] border border-[#1c232e] rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/10">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-white mb-2 text-lg">GamerProtect™</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Your payment is held securely in escrow until you confirm full receipt of your digital items.
            </p>
          </div>

          <div className="bg-[#11161d] border border-[#1c232e] rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors">
            <div className="w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/10">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-white mb-2 text-lg">Instant Delivery</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Thousands of automated offers. Get your game keys, accounts, and currency in seconds.
            </p>
          </div>

          <div className="bg-[#11161d] border border-[#1c232e] rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-500/10">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-white mb-2 text-lg">Global Community</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Over 1 million verified gamers trading securely across 150+ countries.
            </p>
          </div>

          <div className="bg-[#11161d] border border-[#1c232e] rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors">
            <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/10">
              <HeadphonesIcon className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-white mb-2 text-lg">24/7 Support</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Our expert support team is always online to help resolve any trade disputes immediately.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
