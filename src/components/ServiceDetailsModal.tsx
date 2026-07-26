import React from 'react';
import { ServiceItem } from '../types';
import { X, Check, Clock, ShieldCheck, MessageSquare, Star, ArrowRight, ShoppingBag, Info, Award } from 'lucide-react';

interface ServiceDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  whatsappNumber: string;
  onContactClick: () => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  service,
  onClose,
  whatsappNumber,
  onContactClick
}) => {
  if (!service) return null;

  const buyUrl = 'https://wa.link/6128mm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-950/60 border border-slate-800 transition-colors"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400 shrink-0">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-wider">
                {service.category}
              </span>
              {service.badge && (
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 uppercase tracking-wider">
                  {service.badge}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Price & Delivery Bar */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/80 mb-6">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Price</span>
            <span className="text-2xl font-black text-white">${service.price}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Estimated Delivery</span>
            <span className="text-sm font-bold text-cyan-400 flex items-center gap-1 mt-1">
              <Clock className="w-4 h-4" />
              {service.delivery}
            </span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-cyan-400" /> Service Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
            {service.description}
          </p>
        </div>

        {/* Feature List */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" /> What's Included & Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60"
              >
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Backed by 30-Day Replacement Guarantee & Verified Handover Support.</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950" />
            <span>Buy Now via WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Inquire / Contact
          </button>
        </div>
      </div>
    </div>
  );
};
