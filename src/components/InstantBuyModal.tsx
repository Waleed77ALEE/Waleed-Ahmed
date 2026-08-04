import React, { useState } from 'react';
import { X, Zap, Check, Lock, ShieldCheck, CreditCard } from 'lucide-react';

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

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsProcessing(true);

    // Simulate instant key processing & payment
    setTimeout(() => {
      const orderNum = 'WKA-' + Math.floor(100000 + Math.random() * 900000);
      const generatedKey = 'KEY-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      
      setIsProcessing(false);
      setCompletedOrder({
        orderNumber: orderNum,
        licenseKey: generatedKey
      });

      if (onSuccess) {
        onSuccess({ email, orderNumber: orderNum });
      }
    }, 1500);
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
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white z-20 transition-colors p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Complete State */
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
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <>
            {/* Left Side: Order Summary */}
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
            </div>

            {/* Right Side: Checkout Form */}
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
                  <label className="block text-xs font-medium text-slate-400 mb-2">Card Information</label>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card number (e.g. 4242 •••• •••• 4242)" 
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 text-sm transition-all outline-none font-mono"
                    />
                    <div className="flex space-x-3">
                      <input 
                        type="text" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM / YY" 
                        className="w-1/2 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 text-sm transition-all outline-none font-mono"
                      />
                      <input 
                        type="text" 
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="CVC" 
                        className="w-1/2 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 text-sm transition-all outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
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
