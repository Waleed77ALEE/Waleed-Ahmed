import React from 'react';
import { DetailedServicePageData } from '../../data/servicesData';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicePricingProps {
  service: DetailedServicePageData;
  onOpenContact: () => void;
}

export const ServicePricing: React.FC<ServicePricingProps> = ({ service, onOpenContact }) => {
  return (
    <section id="pricing" className="py-16 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            Transparent Investment
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pricing Packages & Custom Options
          </p>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            No hidden fees or unexpected extras. Choose a fixed package or request a tailored custom proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {service.pricingPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 scale-100 md:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-xs text-slate-400 min-h-[36px] mb-6">{pkg.description}</p>

                <div className="flex items-baseline mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400">{pkg.price}</span>
                  {pkg.period && <span className="text-slate-400 text-sm ml-1.5">{pkg.period}</span>}
                </div>

                <div className="space-y-3 mb-8 border-t border-slate-800 pt-6">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Included Deliverables:</p>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mr-2 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 ${
                  pkg.popular
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                }`}
              >
                <span>{pkg.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Quote Notice */}
        <div className="mt-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Need a specialized scope or enterprise plan?</h4>
            <p className="text-xs text-slate-400 mt-1">We offer custom milestones, NDA agreements, and flexible retainer contracts.</p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs whitespace-nowrap transition-colors"
          >
            Request Custom Proposal
          </button>
        </div>

      </div>
    </section>
  );
};
