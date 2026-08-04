import React, { useState } from 'react';
import { Zap, CheckCircle2, ShieldCheck, Lock, Sparkles, ArrowRight, HelpCircle, Clock, Copy, Check, Cpu } from 'lucide-react';
import { InstantBuyModal, InstantBuyProduct } from '../components/InstantBuyModal';
import { PaymentMethodModal } from '../components/PaymentMethodModal';

export const ClaudeMaxPage: React.FC = () => {
  const [isInstantModalOpen, setIsInstantModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [copiedPayId, setCopiedPayId] = useState(false);

  const productDetails: InstantBuyProduct = {
    id: 'claude-max-3mo-180',
    title: 'Anthropic Claude Max (3 Months)',
    price: '$180.00',
    oldPrice: '$240.00',
    subscriptionPeriod: '3 Months Full Access',
    features: [
      'Claude 3.7 Sonnet & Opus Maximum Context Capacity',
      '3 Months Guaranteed Subscription ($180 Special Offer)',
      '5x Higher Usage Limits & Priority Queue Access',
      'Advanced Code Execution & Project Workspace Support',
      'Artifacts & Extended Thinking / Hybrid Reasoning',
      '3 Months Complete Replacement Warranty & 24/7 Support',
    ],
  };

  const handleCopyPayId = () => {
    navigator.clipboard.writeText('787445946');
    setCopiedPayId(true);
    setTimeout(() => setCopiedPayId(false), 2000);
  };

  return (
    <div className="bg-[#0b0e14] text-slate-100 min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Banner Badge */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide uppercase shadow-[0_0_20px_rgba(249,115,22,0.15)]">
            <Zap className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>Exclusive Featured Deal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Anthropic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Claude Max</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Get 3 Months of Claude Max 5x limit access for just <span className="text-orange-400 font-bold">$180 USD</span> ($60/mo equivalent). Extended context, Artifacts & instant delivery.
          </p>
        </div>

        {/* Pricing Card Section */}
        <div className="bg-slate-900/90 border-2 border-orange-500/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(249,115,22,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500/20 to-transparent w-72 h-72 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Offer Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                  Anthropic Flagship Access • 3 Months Special Deal
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Claude Max 3-Month Plan
                </h2>
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">$180.00</span>
                  <span className="text-slate-400 line-through text-lg font-semibold">$240.00</span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase border border-emerald-500/30">
                    Save $60
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Duration: 3 Months • $60/month equivalent
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Included Perks:</h3>
                <ul className="space-y-2.5">
                  {productDetails.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Box */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-5 text-center">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Binance Pay ID</span>
                <div className="flex items-center justify-between bg-slate-900 border border-orange-500/30 rounded-xl p-3">
                  <span className="font-mono text-base font-black text-amber-300 select-all">787445946</span>
                  <button
                    type="button"
                    onClick={handleCopyPayId}
                    className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedPayId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPayId ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsInstantModalOpen(true)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-base rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-5 h-5" />
                  <span>Instant Buy Now ($180)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer border border-slate-700"
                >
                  Other Payment Options (JazzCash / Payoneer)
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Auto-Delivery & 24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">5x Usage Rate Limits</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Claude Max tier provides 5 times standard message capacity, allowing extensive codebases and lengthy documents processing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">3 Months Full Warranty</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete 90-day account replacement guarantee & technical assistance from Waleed Khan Afridi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Instant Binance Pay</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero transfer fee payment via Binance Pay ID <span className="font-mono text-amber-300 font-bold">787445946</span> or JazzCash.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-white">What is Claude Max?</h5>
              <p className="text-xs text-slate-400">Claude Max provides highest usage capacity on Claude 3.7 Sonnet & Opus, Projects, Artifacts, and extended thinking models.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-white">How do I receive my credentials?</h5>
              <p className="text-xs text-slate-400">Your key and credentials are automatically generated and sent instantly upon pasting your payment TxID.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <InstantBuyModal
        isOpen={isInstantModalOpen}
        onClose={() => setIsInstantModalOpen(false)}
        product={productDetails}
      />

      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={180}
        serviceTitle="Anthropic Claude Max (3 Months)"
        initialTab="binance_pay"
      />
    </div>
  );
};

export default ClaudeMaxPage;
