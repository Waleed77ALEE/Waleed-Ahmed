import React, { useEffect } from 'react';
import { ServiceItem } from '../types';
import { PlatformLogo } from './PlatformLogo';
import { ServiceReviews } from './ServiceReviews';
import { X, Check, Clock, ShieldCheck, ShoppingBag, Info, Award } from 'lucide-react';

interface ServiceDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  whatsappNumber: string;
  onContactClick: () => void;
  onBuyNow?: (service: ServiceItem) => void;
  user?: any;
  onOpenAuthModal?: () => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  service,
  onClose,
  whatsappNumber,
  onContactClick,
  onBuyNow,
  user,
  onOpenAuthModal
}) => {
  useEffect(() => {
    if (!service) return;

    const schemaId = `product-modal-schema-${service.id}`;
    let script = document.getElementById(schemaId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `https://waleedkhanafridi.online/#product-${service.id}`,
      name: service.title,
      description: service.description,
      category: service.category,
      image: 'https://waleedkhanafridi.online/brand-logo.jpg',
      brand: {
        '@type': 'Brand',
        name: 'Waleed Khan Afridi Digital Services'
      },
      offers: {
        '@type': 'Offer',
        url: 'https://waleedkhanafridi.online/#marketplace',
        priceCurrency: 'USD',
        price: String(service.price),
        priceValidUntil: '2028-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Waleed Khan Afridi Digital Services'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '28',
        bestRating: '5',
        worstRating: '1'
      }
    };

    script.text = JSON.stringify(productSchema);

    return () => {
      const elem = document.getElementById(schemaId);
      if (elem) {
        elem.remove();
      }
    };
  }, [service]);

  if (!service) return null;

  const waClean = (whatsappNumber || '+923416860077').replace(/[^0-9]/g, '');
  const buyUrl = `https://wa.me/${waClean}?text=${encodeURIComponent(`Hi Waleed! I would like to buy: ${service.title} ($${service.price})`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-950/60 border border-slate-800 transition-colors z-20"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 text-cyan-400 shrink-0 shadow-lg flex items-center justify-center">
            <PlatformLogo title={service.title} category={service.category} subCategory={service.subCategory} id={service.id} className="w-8 h-8" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <PlatformLogo title={service.title} category={service.category} subCategory={service.subCategory} id={service.id} showBadgeName={true} />
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
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <button
            onClick={() => {
              if (onBuyNow) {
                onBuyNow(service);
              }
              onClose();
            }}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span>Buy Now (Select Payment Method)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
          >
            Inquire / Contact
          </button>
        </div>

        {/* Service Reviews Section */}
        <div className="pt-6 border-t border-slate-800">
          <ServiceReviews
            serviceId={service.id}
            serviceTitle={service.title}
            user={user}
            onOpenAuthModal={onOpenAuthModal}
          />
        </div>
      </div>
    </div>
  );
};
