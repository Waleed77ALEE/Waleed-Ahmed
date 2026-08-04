import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Sparkles, MessageSquare, Copy, Check, QrCode, ArrowRight, Zap, Tag } from 'lucide-react';
import { AiSubscriptionPlan, SubscriptionDuration } from '../data/aiSubscriptionsData';
import { PlatformLogo } from './PlatformLogo';
import { productStore, AdminOrder } from '../services/productStore';

interface AiSubscriptionCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: AiSubscriptionPlan | null;
  initialDuration?: SubscriptionDuration;
  whatsappNumber: string;
}

export const AiSubscriptionCheckoutModal: React.FC<AiSubscriptionCheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  initialDuration = 'Monthly',
  whatsappNumber
}) => {
  if (!isOpen || !plan) return null;

  const [duration, setDuration] = useState<SubscriptionDuration>(initialDuration);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Binance Pay' | 'Payoneer' | 'JazzCash'>('Binance Pay');
  const [txId, setTxId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent?: number; amount?: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  
  const [orderConfirmed, setOrderConfirmed] = useState<AdminOrder | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const rawPrice = plan.prices[duration];
  
  let finalPrice = rawPrice;
  if (appliedDiscount) {
    if (appliedDiscount.percent) {
      finalPrice = rawPrice * (1 - appliedDiscount.percent / 100);
    } else if (appliedDiscount.amount) {
      finalPrice = Math.max(0, rawPrice - appliedDiscount.amount);
    }
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      setAppliedDiscount({ code, percent: 10 });
    } else if (code === 'AI2026') {
      setAppliedDiscount({ code, amount: 5 });
    } else if (code === 'AIWALEED') {
      setAppliedDiscount({ code, percent: 15 });
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or AI2026');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !whatsapp) {
      alert('Please fill in your Name, Email, and WhatsApp number.');
      return;
    }

    const orderId = `ORD-AI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: AdminOrder = {
      id: orderId,
      customerName: fullName,
      customerEmail: email,
      items: [
        {
          service_id: plan.id,
          title: `${plan.platformName} ${plan.planName} (${duration})`,
          price: Number(finalPrice.toFixed(2)),
          quantity: 1
        }
      ],
      totalAmount: Number(finalPrice.toFixed(2)),
      paymentMethod: `${paymentMethod} (${whatsapp})`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      txId: txId || `TX-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    // Save order in global store so Admin Panel sees it
    productStore.saveOrder(newOrder);
    setOrderConfirmed(newOrder);
  };

  const handleCopyPaymentInfo = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const waClean = (whatsappNumber || '+923416860077').replace(/[^0-9]/g, '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <PlatformLogo title={plan.platformName} category={plan.category} className="w-8 h-8" />
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Checkout: {plan.platformName}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {plan.planName}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Secure AI Subscription Order & Handover</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!orderConfirmed ? (
            <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {/* Plan Summary Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Selected Duration</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {(['Monthly', '3 Months', '6 Months', 'Yearly'] as SubscriptionDuration[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          duration === d
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-right sm:border-l border-slate-800 sm:pl-4">
                  <div className="text-xs text-slate-400">Total Price</div>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono">
                    ${finalPrice.toFixed(2)} USD
                    {appliedDiscount && (
                      <span className="block text-[10px] text-amber-400 line-through">
                        ${rawPrice.toFixed(2)} USD
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp Number (for instant account credentials handover) <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. +1234567890 or 03416860077"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      Promo / Coupon Code
                    </span>
                    <span className="text-[10px] text-slate-400">Use <strong>WELCOME10</strong> for 10% off</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter WELCOME10 or AI2026"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}
                  {appliedDiscount && (
                    <p className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Coupon applied! {appliedDiscount.code} ({appliedDiscount.percent ? `${appliedDiscount.percent}% OFF` : `$${appliedDiscount.amount} OFF`})
                    </p>
                  )}
                </div>

                {/* Payment Methods Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Select Payment Method <span className="text-emerald-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Binance Pay')}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === 'Binance Pay'
                          ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-bold">Binance Pay</span>
                      <span className="text-[9px] text-slate-400">USDT / Crypto</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Payoneer')}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === 'Payoneer'
                          ? 'bg-pink-500/10 border-pink-500/50 text-pink-300 shadow-md shadow-pink-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-pink-400" />
                      <span className="text-xs font-bold">Payoneer</span>
                      <span className="text-[9px] text-slate-400">USD / Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('JazzCash')}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === 'JazzCash'
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Zap className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-bold">JazzCash</span>
                      <span className="text-[9px] text-slate-400">Local PKR Account</span>
                    </button>
                  </div>
                </div>

                {/* Instructions Box for Selected Method */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300">
                  {paymentMethod === 'Binance Pay' && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400">Binance Pay ID / USDT:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPaymentInfo('787445946')}
                          className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                        >
                          {copiedAccount ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          Copy ID
                        </button>
                      </div>
                      <p className="font-mono text-white text-sm font-bold mt-0.5">787445946</p>
                      <p className="text-[11px] text-slate-400">Send <strong>${finalPrice.toFixed(2)} USDT</strong> via Binance Pay (No transfer fees).</p>
                    </div>
                  )}

                  {paymentMethod === 'Payoneer' && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-pink-400">Payoneer Email Transfer:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPaymentInfo('waleedkhanafridi7@gmail.com')}
                          className="text-[10px] text-pink-400 hover:underline flex items-center gap-1"
                        >
                          {copiedAccount ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          Copy Email
                        </button>
                      </div>
                      <p className="font-mono text-white text-sm font-bold mt-0.5">waleedkhanafridi7@gmail.com</p>
                      <p className="text-[11px] text-slate-400">Send <strong>${finalPrice.toFixed(2)} USD</strong> via Payoneer Make a Payment.</p>
                    </div>
                  )}

                  {paymentMethod === 'JazzCash' && (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F15A24]">JazzCash Merchant Account:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPaymentInfo('03141137917')}
                          className="text-[10px] text-[#F15A24] hover:underline flex items-center gap-1 font-bold"
                        >
                          {copiedAccount ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copy Merchant Number
                        </button>
                      </div>
                      <p className="font-mono text-[#F15A24] text-base font-black mt-0.5 tracking-wider">03141137917</p>
                      <p className="text-[11px] text-slate-300">Business Name: <strong className="text-white">Alee Customers</strong> (Rate ~278 PKR/USD)</p>
                    </div>
                  )}

                  <div className="pt-1">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Transaction ID / Reference (Optional - or submit via WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      placeholder="e.g. TX-984102948"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-sm hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Confirm Order (${finalPrice.toFixed(2)} USD)</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Order Confirmation View */
            <div className="p-6 sm:p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">Order Placed Successfully!</h3>
                <p className="text-xs text-slate-400 mt-1">Your AI Subscription order has been logged in our system.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-mono font-bold text-white">{orderConfirmed.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Subscription:</span>
                  <span className="font-bold text-emerald-400">{orderConfirmed.items[0]?.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Total Amount:</span>
                  <span className="font-mono font-bold text-white">${orderConfirmed.totalAmount.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Pending Handover
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300 space-y-3">
                <p>
                  To receive your account login credentials instantly, tap below to open WhatsApp with your prefilled order details.
                </p>

                <a
                  href={`https://wa.me/${waClean}?text=${encodeURIComponent(
                    `Hi Waleed! I just placed AI Subscription Order ${orderConfirmed.id}.\nPlan: ${orderConfirmed.items[0]?.title}\nAmount: $${orderConfirmed.totalAmount}\nCustomer: ${orderConfirmed.customerName} (${orderConfirmed.customerEmail})\nPayment: ${paymentMethod}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order Details to Waleed on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
