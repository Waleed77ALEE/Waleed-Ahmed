import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Star, ShieldCheck, Quote, ThumbsUp, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const Testimonials: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden bg-dots-pattern">
      {/* Background Accent Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
            <Award className="w-3.5 h-3.5" />
            <span>Client Reviews & Marketplace Reputation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Trusted by Creators, Agencies & Global Clients
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Verified feedback from Instant Services buyers, freelance engineering clients, and digital asset customers worldwide.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {TESTIMONIALS.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-7 relative flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-amber-500/30 transition-all duration-300 group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-800/50 group-hover:text-amber-500/20 transition-colors pointer-events-none" />

              <div>
                {/* Rating Stars & Platform Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-3 py-1 text-[10px] font-extrabold rounded-full bg-slate-950 border border-slate-800 text-cyan-300 uppercase tracking-widest shadow-sm">
                    {review.platform}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-200 leading-relaxed mb-6 font-medium italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Verified Item & Author */}
              <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-slate-700/80 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-white leading-tight">{review.name}</h4>
                    <p className="text-xs text-slate-400">{review.role}</p>
                  </div>
                </div>

                {review.verifiedPurchase && (
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 justify-end uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified Order
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium truncate max-w-[150px] block">
                      {review.verifiedPurchase}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
