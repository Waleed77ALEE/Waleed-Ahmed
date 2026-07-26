import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Star, ShieldCheck, Quote, ThumbsUp, Award } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Client Reviews & Marketplace Reputation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Creators, Agencies & Developers
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Verified feedback from G2G Marketplace buyers, freelance clients, and enterprise partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between shadow-xl backdrop-blur-md hover:border-slate-700 transition-colors"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-800/80 pointer-events-none" />

              <div>
                {/* Rating Stars & Platform Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-950 border border-slate-800 text-cyan-400 uppercase tracking-wider">
                    {review.platform}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-200 leading-relaxed mb-6 font-normal">
                  "{review.comment}"
                </p>
              </div>

              {/* Verified Item & Author */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{review.name}</h4>
                    <p className="text-xs text-slate-400">{review.role}</p>
                  </div>
                </div>

                {review.verifiedPurchase && (
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3" /> Verified Order
                    </span>
                    <span className="text-[11px] text-slate-400 truncate max-w-[140px] block">
                      {review.verifiedPurchase}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
