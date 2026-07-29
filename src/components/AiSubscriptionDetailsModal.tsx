import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Star,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Monitor,
  Laptop,
  HelpCircle,
  ChevronDown,
  ShoppingBag,
  Zap,
  ArrowRight,
  Heart,
  Tag
} from 'lucide-react';
import { AiSubscriptionPlan, SubscriptionDuration } from '../data/aiSubscriptionsData';
import { PlatformLogo } from './PlatformLogo';
import { aiSubscriptionStore } from '../services/aiSubscriptionStore';

interface AiSubscriptionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: AiSubscriptionPlan | null;
  onBuyNow: (plan: AiSubscriptionPlan, duration: SubscriptionDuration) => void;
  whatsappNumber: string;
  allPlans: AiSubscriptionPlan[];
}

export const AiSubscriptionDetailsModal: React.FC<AiSubscriptionDetailsModalProps> = ({
  isOpen,
  onClose,
  plan,
  onBuyNow,
  whatsappNumber,
  allPlans
}) => {
  if (!isOpen || !plan) return null;

  const [selectedDuration, setSelectedDuration] = useState<SubscriptionDuration>('Monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(() =>
    aiSubscriptionStore.getWishlist().includes(plan.id)
  );

  const price = plan.prices[selectedDuration];
  const monthlyEquivalent = (price / (selectedDuration === 'Monthly' ? 1 : selectedDuration === '3 Months' ? 3 : selectedDuration === '6 Months' ? 6 : 12)).toFixed(2);

  const toggleWishlist = () => {
    const newState = aiSubscriptionStore.toggleWishlist(plan.id);
    setIsWishlisted(newState);
  };

  const related = allPlans
    .filter((p) => p.id !== plan.id && (p.platformKey === plan.platformKey || p.category === plan.category))
    .slice(0, 3);

  const waClean = (whatsappNumber || '+923416860077').replace(/[^0-9]/g, '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl shrink-0">
                  <PlatformLogo title={plan.platformName} category={plan.category} className="w-12 h-12" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{plan.platformName}</span>
                    {plan.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mt-1">{plan.planName}</h2>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {plan.rating} ({plan.reviewsCount} reviews)
                    </span>
                    <span>•</span>
                    <span>{plan.ordersCount} Active Subscriptions</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleWishlist}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-400' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Overview</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{plan.detailedDescription}</p>
            </div>

            {/* Duration & Dynamic Price Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">Select Subscription Duration</h4>
                  <p className="text-xs text-slate-400">Prices update automatically with full duration discounts</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">${price.toFixed(2)} USD</div>
                  <div className="text-[11px] text-slate-400 font-mono">~${monthlyEquivalent}/mo</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Monthly', '3 Months', '6 Months', 'Yearly'] as SubscriptionDuration[]).map((d) => {
                  const p = plan.prices[d];
                  const isSelected = selectedDuration === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{d}</div>
                      <div className="text-sm font-extrabold text-emerald-400 font-mono mt-0.5">${p.toFixed(2)}</div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onBuyNow(plan, selectedDuration)}
                  className="py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-sm hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now (${price.toFixed(2)})</span>
                </button>

                <a
                  href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                    `Hi Waleed! I have a question regarding ${plan.platformName} ${plan.planName} (${selectedDuration} - $${price.toFixed(2)}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Contact Support (WhatsApp)</span>
                </a>
              </div>
            </div>

            {/* Included Features */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Features & Included Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Devices */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Supported Devices & Compatibility</h4>
              <div className="flex flex-wrap gap-2">
                {plan.supportedDevices.map((dev, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    {dev.includes('Browser') ? <Monitor className="w-3.5 h-3.5 text-cyan-400" /> : <Smartphone className="w-3.5 h-3.5 text-purple-400" />}
                    <span>{dev}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            {plan.faqs && plan.faqs.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>Frequently Asked Questions</span>
                </h4>
                <div className="space-y-2">
                  {plan.faqs.map((faq, index) => {
                    const isOpenFaq = openFaqIndex === index;
                    return (
                      <div key={index} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpenFaq ? null : index)}
                          className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:bg-slate-900/50 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpenFaq ? 'rotate-180 text-emerald-400' : ''}`} />
                        </button>
                        {isOpenFaq && (
                          <div className="p-3.5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Customer Reviews */}
            {plan.reviews && plan.reviews.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Verified Buyer Reviews</h4>
                <div className="space-y-2.5">
                  {plan.reviews.map((rev, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{rev.name}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">• Verified Purchase ({rev.plan})</span>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Subscriptions */}
            {related.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Related AI Subscriptions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {related.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        onClose();
                        setTimeout(() => onBuyNow(rel, 'Monthly'), 100);
                      }}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <PlatformLogo title={rel.platformName} category={rel.category} className="w-5 h-5" />
                        <span className="text-xs font-bold text-white truncate">{rel.platformName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{rel.planName}</div>
                      <div className="text-xs font-extrabold text-emerald-400 font-mono">${rel.prices.Monthly}/mo</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
