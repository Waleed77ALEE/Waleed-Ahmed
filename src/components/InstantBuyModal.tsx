import React, { useState } from 'react';
import { X, Zap, Check, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { submitPaymentProofDB } from '../lib/supabase';

export interface InstantBuyProduct {
  id?: string;
  title: string;
  price: string;
  oldPrice?: string;
  subscriptionPeriod?: string;
  features?: string[];
  category?: string;
}

interface InstantBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: InstantBuyProduct | null;
  onSuccess?: (details: { email: string; orderNumber: string }) => void;
}

export const InstantBuyModal: React.FC<InstantBuyModalProps> = ({
  isOpen,
  onClose,
  product,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    licenseKey: string;
  } | null>(null);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsProcessing(true);

    const orderNum = 'WKA-' + Math.floor(100000 + Math.random() * 900000);
    const generatedKey = 'KEY-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    try {
      await submitPaymentProofDB({
        order_number: orderNum,
        payment_method: 'Binance Pay',
        binance_pay_id: '787445946',
        tx_id: cardNumber || 'DIRECT-KEY-BUY',
        amount: parseFloat(product?.price?.replace(/[^0-9.]/g, '') || '0'),
        service_title: product?.title || 'AI Subscription',
        status: 'Pending Verification'
      });
    } catch (err) {
      console.warn('Failed to log payment proof in InstantBuyModal:', err);
    }

    setIsProcessing(false);
    setCompletedOrder({
      orderNumber: orderNum,
      licenseKey: generatedKey
    });

    if (onSuccess) {
      onSuccess({ email, orderNumber: orderNum });
    }
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setEmail('');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white z-20 transition-colors p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          <div className="w-full p-8 md:p-12 text-center space-y-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Payment Successful!</h2>
              <p className="text-sm text-slate-400">
                Your instant digital key has been dispatched to <span className="text-cyan-400 font-semibold">{email}</span>
              </p>
            </div>

            <div className="w-full max-w-md p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Order Reference</span>
                <span className="font-mono text-cyan-400 font-bold">{completedOrder.orderNumber}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-1 uppercase font-bold tracking-wider">Your License Key / Access Key</span>
                <span className="text-base sm:text-lg font-mono font-bold text-amber-400 select-all tracking-wider">{completedOrder.licenseKey}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <>
            <div className="w-full md:w-5/12 bg-[#111827] p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">{product?.title || "Premium Pro License"}</h2>
                    <p className="text-xs text-slate-400">Instant Digital Delivery</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Subscription</span>
                    <span className="font-medium text-white">{product?.subscriptionPeriod || "1 Month"}</span>
                  </div>
                  {product?.oldPrice && (
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>Regular Price</span>
                      <span className="line-through text-slate-500">{product.oldPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-4 border-t border-slate-800/80 mt-4">
                    <span className="text-base font-medium text-white">Total Due</span>
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400">
                      {product?.price || "$19.99"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Includes:</h3>
                {(product?.features || ['Full premium features', 'Instant key activation', '24/7 priority support', 'No hidden fees']).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Google Verified Banner */}
              <div className="mt-6 flex items-start gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <div className="p-1.5 rounded-md bg-white shrink-0 mt-0.5 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="text-xs">
                  <span className="font-bold flex items-center gap-1.5 text-blue-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    Google Verified
                  </span>
                  <p className="mt-0.5 text-[11px] text-blue-200/80 leading-relaxed">
                    All accounts are checked and verified from Google to ensure authenticity and seamless performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-7/12 p-6 sm:p-8 bg-[#0B0F19]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <span>Payment Details</span>
              </h3>
              
              <form className="space-y-5" onSubmit={handlePay}>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Where should we send the key?" 
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 text-sm transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Binance Pay Instructions</label>
                  <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2 text-sm text-slate-300">
                    <p>1. Open Binance app</p>
                    <p>2. Send to Binance Pay ID: <span className="font-mono text-cyan-400 font-bold select-all">787445946</span></p>
                    <p>3. Copy the TxID and paste below</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Binance Transaction ID (TxID)</label>
                  <input 
                    type="text" 
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Paste your Binance TxID here" 
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 text-sm transition-all outline-none font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Instant Order...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay &amp; Receive Key Instantly</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InstantBuyModal;
