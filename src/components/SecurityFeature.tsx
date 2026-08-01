import React from 'react';
import { Zap, Headphones, BadgeCheck, ShieldCheck } from 'lucide-react';

interface SecurityFeatureProps {
  className?: string;
  variant?: 'compact' | 'full' | 'pills';
}

export const SecurityFeature: React.FC<SecurityFeatureProps> = ({
  className = '',
  variant = 'compact'
}) => {
  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono">
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>Instant Delivery</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold font-mono">
          <Headphones className="w-3 h-3 text-cyan-400" />
          <span>24/7 Support</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono">
          <BadgeCheck className="w-3 h-3 text-indigo-400" />
          <span>Verified Seller</span>
        </span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center ${className}`}>
        <div className="flex flex-col items-center justify-center p-1.5">
          <Zap className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-[10px] font-bold text-slate-200 block">Instant Delivery</span>
          <span className="text-[8.5px] text-slate-400 block">Automated key dispatch</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1.5 border-x border-slate-800/80">
          <Headphones className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[10px] font-bold text-slate-200 block">24/7 Support</span>
          <span className="text-[8.5px] text-slate-400 block">Live chat assistance</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1.5">
          <BadgeCheck className="w-4 h-4 text-indigo-400 mb-1" />
          <span className="text-[10px] font-bold text-slate-200 block">Verified Seller</span>
          <span className="text-[8.5px] text-slate-400 block">100% Genuine software</span>
        </div>
      </div>
    );
  }

  // Default 'compact' layout suitable for product card footer
  return (
    <div className={`flex items-center justify-between gap-1 text-[10px] font-medium text-slate-400 pt-2 border-t border-slate-800/60 ${className}`}>
      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold" title="Automated Instant Key Delivery">
        <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
        <span>Instant Delivery</span>
      </span>

      <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold" title="24/7 Technical Support">
        <Headphones className="w-3 h-3 text-cyan-400 shrink-0" />
        <span>24/7 Support</span>
      </span>

      <span className="inline-flex items-center gap-1 text-indigo-400 font-semibold" title="Official Verified License Merchant">
        <ShieldCheck className="w-3 h-3 text-indigo-400 shrink-0" />
        <span>Verified Seller</span>
      </span>
    </div>
  );
};

export default SecurityFeature;
