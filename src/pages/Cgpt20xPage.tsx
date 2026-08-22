import React, { useState } from 'react';
import { Zap, CheckCircle2, ShieldCheck, Lock, Sparkles, ArrowRight, HelpCircle, Clock, Copy, Check, Cpu } from 'lucide-react';
import { InstantBuyModal, InstantBuyProduct } from '../components/InstantBuyModal';
import { PaymentMethodModal } from '../components/PaymentMethodModal';

export const Cgpt20xPage: React.FC = () => {
  const [isInstantModalOpen, setIsInstantModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [copiedPayId, setCopiedPayId] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'1mo' | '3mo' | '1yr'>('3mo');

  const plans = {
    '1mo': {
      id: 'cgpt20x-1mo-42',
      title: 'ChatGPT 20x Private (1 Month)',
      price: '$42.00',
      numericPrice: 42,
      oldPrice: '$60.00',
      subscriptionPeriod: '1 Month Full Access',
      label: '1 Month'
    },
    '3mo': {
      id: 'cgpt20x-3mo-80',
      title: 'ChatGPT 20x Private (3 Months)',
      price: '$80.00',
      numericPrice: 80,
      oldPrice: '$126.00',
      subscriptionPeriod: '3 Months Full Access',
      label: '3 Months (Trending)'
    },
    '1yr': {
      id: 'cgpt20x-1yr-160',
      title: 'ChatGPT 20x Private (1 Year)',
      price: '$160.00',
      numericPrice: 160,
      oldPrice: '$500.00',
      subscriptionPeriod: '1 Year Full Access',
      label: '1 Year (Best Value)'
    }
  };

  const activePlan = plans[selectedPlan];

  const productDetails: InstantBuyProduct = {
    id: activePlan.id,
    title: activePlan.title,
    price: activePlan.price,
    oldPrice: activePlan.oldPrice,
    subscriptionPeriod: activePlan.subscriptionPeriod,
    features: [
      'Private Account Guarantee (100% Yours)',
      'Unmetered 20x Usage Limits on GPT-4o & o1',
      'OpenAI o1 Reasoning Models (Preview & Mini)',
      'DALL-E 3 High-Res Image Generator Access',
      'Real-Time Advanced Voice Mode Unlocked',
      'Complete Replacement Warranty & 24/7 Support',
    ],
  };

  const handleCopyPayId = () => {
    navigator.clipboard.writeText('787445946');
    setCopiedPayId(true);
    setTimeout(() => setCopiedPayId(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-teal-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Premium AI Subscription</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            ChatGPT 20x Private
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl">
            Get an official, private ChatGPT account featuring unmetered <span className="text-teal-400 font-bold">20x usage limits</span> for GPT-4o and OpenAI o1 reasoning models. DALL-E 3, Voice Mode, and Custom GPTs included.
          </p>
        </div>

        {/* Pricing Card Section */}
        <div className="bg-slate-900/90 border-2 border-teal-500/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(20,184,166,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-500/20 to-transparent w-72 h-72 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Offer Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-max overflow-x-auto">
                {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                      selectedPlan === key
                        ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {plans[key].label}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                  OpenAI Flagship Access • Private Account
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activePlan.title}
                </h2>
                
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">{activePlan.price}</span>
                  <span className="text-slate-400 line-through text-lg font-semibold">{activePlan.oldPrice}</span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase border border-emerald-500/30">
                    Save {(parseInt(activePlan.oldPrice.replace(/[^0-9.-]+/g,"")) - activePlan.numericPrice).toFixed(0)}$
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Included Perks:</h3>
                <ul className="space-y-2.5">
                  {productDetails.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
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
                <div className="flex items-center justify-between bg-slate-900 border border-teal-500/30 rounded-xl p-3">
                  <span className="font-mono text-base font-black text-amber-300 select-all">787445946</span>
                  <button
                    type="button"
                    onClick={handleCopyPayId}
                    className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedPayId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPayId ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsInstantModalOpen(true)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-base rounded-xl shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-5 h-5" />
                  <span>Instant Buy Now ({activePlan.price})</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer border border-slate-700"
                >
                  Other Payment Options (Crypto / JazzCash)
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
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">20x Usage Limits</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experience the true power of GPT-4o and o1 reasoning models with virtually unlimited message capacity.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Private & Secure</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% private accounts. Only you have access to your chat history, memory, and custom GPTs.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Full Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete account replacement warranty for the entire duration of your subscription period.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-400" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-white">Is this a private or shared account?</h5>
              <p className="text-xs text-slate-400">This is a 100% private account. Your conversations, settings, and memory are strictly confidential and only accessible by you.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <h5 className="font-bold text-white">How do I receive my credentials?</h5>
              <p className="text-xs text-slate-400">Your account credentials are automatically generated and securely sent instantly upon pasting your payment TxID.</p>
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
        totalAmount={activePlan.numericPrice}
        serviceTitle={activePlan.title}
        initialTab="binance_pay"
      />
    </div>
  );
};

export default Cgpt20xPage;
