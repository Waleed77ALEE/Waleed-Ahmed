import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Loader2, Sparkles, Copy, Check, Upload, Image as ImageIcon, QrCode, Wallet } from 'lucide-react';
import { SupabaseCartItem, createOrderDB, clearCartDB } from '../lib/supabase';
import { PlatformLogo } from './PlatformLogo';
import { loadUserWallet, deductWalletBalance, subscribeWallet, UserWallet } from '../services/walletStore';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: SupabaseCartItem[];
  user: any;
  onUpdateQty: (cartItemId: string, qty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  whatsappNumber: string;
  onOrderCompleted?: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  user,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  whatsappNumber,
  onOrderCompleted
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [contactWhatsapp, setContactWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [wallet, setWallet] = useState<UserWallet>(() => loadUserWallet(user?.id));
  const [paymentMethod, setPaymentMethod] = useState(`Wallet Balance ($${wallet.balance.toFixed(2)} Available)`);
  const [binanceTxId, setBinanceTxId] = useState('');
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState('');
  const [copiedPayId, setCopiedPayId] = useState(false);
  const [copiedPayoneerEmail, setCopiedPayoneerEmail] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');
  const [walletError, setWalletError] = useState('');

  useEffect(() => {
    if (user?.id) {
      setWallet(loadUserWallet(user.id));
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = subscribeWallet((updated) => {
      if (updated.userId === (user?.id || 'guest')) {
        setWallet(updated);
      }
    });
    return unsubscribe;
  }, [user]);

  const payoneerEmail = 'waleedkhanafridi7@gmail.com';
  const payoneerName = 'Waleed Khan Afridi';
  const binancePayId = '787445946';

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCopyPayId = () => {
    navigator.clipboard.writeText(binancePayId);
    setCopiedPayId(true);
    setTimeout(() => setCopiedPayId(false), 2000);
  };

  const handleCopyPayoneerEmail = () => {
    navigator.clipboard.writeText(payoneerEmail);
    setCopiedPayoneerEmail(true);
    setTimeout(() => setCopiedPayoneerEmail(false), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setWalletError('');

    const isWalletPay = paymentMethod.includes('Wallet Balance');
    if (isWalletPay) {
      if (wallet.balance < totalAmount) {
        setWalletError(`Insufficient Wallet Balance ($${wallet.balance.toFixed(2)}). Please top up your wallet or select another payment method.`);
        return;
      }
    }

    setIsPlacing(true);
    const orderNum = 'WKA-' + Math.floor(100000 + Math.random() * 900000);

    if (isWalletPay) {
      const deducted = deductWalletBalance(user?.id, totalAmount, orderNum);
      if (!deducted) {
        setIsPlacing(false);
        setWalletError('Failed to deduct wallet balance. Please top up funds.');
        return;
      }
    }

    const orderPayload = {
      order_number: orderNum,
      user_id: user?.id || 'guest',
      items: cart.map(i => ({
        service_id: i.service_id,
        title: i.title,
        category: i.category,
        price: i.price,
        quantity: i.quantity,
        delivery: i.delivery
      })),
      total_amount: totalAmount,
      status: isWalletPay ? ('Processing' as const) : ('Pending' as const),
      payment_method: paymentMethod,
      contact_whatsapp: contactWhatsapp,
      notes: notes,
      binance_tx_id: isWalletPay ? `WALLET-PAID-${orderNum}` : binanceTxId,
      payment_proof: proofImage || ''
    };

    const result = await createOrderDB(orderPayload);
    setIsPlacing(false);

    if (result) {
      setCreatedOrderNumber(orderNum);
      setCheckoutStep('success');
      await clearCartDB(user?.id || null);
      onClearCart();
      if (onOrderCompleted) onOrderCompleted();
    }
  };

  const getWhatsAppOrderMsg = () => {
    const itemsSummary = cart.map(i => `• ${i.title} (x${i.quantity}) - $${(i.price * i.quantity).toFixed(2)}`).join('\n');
    return `Hi Waleed! I placed Order #${createdOrderNumber || 'NEW'} on www.waleedkhanafridi.online:\n\n*Cart Items*:\n${itemsSummary}\n\n*Total*: $${totalAmount.toFixed(2)}\n*Payment Method*: ${paymentMethod}\n${binanceTxId ? `*Binance TxID*: ${binanceTxId}\n` : ''}*WhatsApp Contact*: ${contactWhatsapp}\n${notes ? `*Notes*: ${notes}` : ''}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">Your Marketplace Cart</h3>
            <p className="text-xs text-slate-400">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} stored securely in Supabase backend
            </p>
          </div>
        </div>

        {/* Step Views */}
        {checkoutStep === 'cart' && (
          <>
            <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar space-y-3 mb-6">
              {cart.length === 0 ? (
                <div className="py-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 p-8">
                  <ShoppingCart className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">Your Cart is Empty</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Explore our Digital Marketplace services (AI Subscriptions, Social Growth, Aged Accounts) to add items.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 mt-0.5">
                        <PlatformLogo title={item.title} category={item.category} id={item.service_id} className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white">{item.title}</h4>
                        <p className="text-[10px] text-cyan-400 font-medium">{item.category} • {item.delivery}</p>
                        <p className="text-sm font-black font-mono text-emerald-400 mt-0.5">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Cart Amount</span>
                  <span className="text-2xl font-black font-mono text-white">${totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-xs hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-xs hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-emerald-400" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>
            )}
          </>
        )}

        {checkoutStep === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Order Summary</span>
                <span className="text-xs font-bold text-white">{cart.length} items selected</span>
              </div>
              <span className="text-xl font-black font-mono text-emerald-400">${totalAmount.toFixed(2)}</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">WhatsApp Number for Handover</label>
              <input
                type="text"
                required
                value={contactWhatsapp}
                onChange={(e) => setContactWhatsapp(e.target.value)}
                placeholder="+92 341 6860077 or wa.me/923416860077"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Payment Method Preference</label>
              <select
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setWalletError('');
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-bold"
              >
                <option value={`Wallet Balance ($${wallet.balance.toFixed(2)} Available)`}>
                  💳 Store Wallet Balance (${wallet.balance.toFixed(2)} Available)
                </option>
                <option value="Payoneer Email Transfer (waleedkhanafridi7@gmail.com)">
                  Payoneer Email Transfer (waleedkhanafridi7@gmail.com)
                </option>
                <option value="USDT / Crypto (Binance Pay)">Binance Pay (Pay ID / User ID: 787445946)</option>
                <option value="WhatsApp Direct Contact (+923416860077)">WhatsApp Direct (+92 341 6860077)</option>
                <option value="Bank Transfer / Wise / Wire">Bank Transfer / Wise / Wire</option>
              </select>
            </div>

            {walletError && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold flex flex-col gap-2">
                <span>{walletError}</span>
              </div>
            )}

            {/* Payoneer Details Box */}
            {paymentMethod.includes('Payoneer') && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 border border-orange-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-xs font-black text-orange-300 uppercase tracking-wider">Payoneer Account Details</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Zero Fee</span>
                </div>

                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-2.5">
                  <div className="overflow-hidden pr-2">
                    <span className="text-[10px] text-slate-400 block font-bold">Payoneer Recipient Email</span>
                    <span className="text-xs font-mono font-black text-white truncate block">{payoneerEmail}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPayoneerEmail}
                    className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 text-[11px] font-bold transition-all flex items-center gap-1 shrink-0"
                  >
                    {copiedPayoneerEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPayoneerEmail ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Payoneer Ref ID / TxID</label>
                    <input
                      type="text"
                      value={binanceTxId}
                      onChange={(e) => setBinanceTxId(e.target.value)}
                      placeholder="e.g. 19820394812"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Payment Proof Screenshot</label>
                    <div className="relative border border-slate-800 hover:border-orange-500/50 rounded-xl p-1.5 bg-slate-950 text-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300">
                        <Upload className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="truncate text-[11px]">
                          {proofFileName ? proofFileName : 'Upload Screenshot'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod.includes('Binance') && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider">Binance Pay Account Details</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">Zero Fee</span>
                </div>

                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Binance Pay ID</span>
                    <span className="text-xs font-mono font-black text-white">{binancePayId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPayId}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[11px] font-bold transition-all flex items-center gap-1"
                  >
                    {copiedPayId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPayId ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Binance TxID / Ref ID</label>
                    <input
                      type="text"
                      value={binanceTxId}
                      onChange={(e) => setBinanceTxId(e.target.value)}
                      placeholder="e.g. 2894102938102"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Payment Proof Screenshot</label>
                    <div className="relative border border-slate-800 hover:border-amber-500/50 rounded-xl p-1.5 bg-slate-950 text-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300">
                        <Upload className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate text-[11px]">
                          {proofFileName ? proofFileName : 'Upload Screenshot'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Special Order Notes (Optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention target links, usernames, or specific delivery preferences..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isPlacing}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold text-xs hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                {isPlacing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Order to Supabase...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Save Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {checkoutStep === 'success' && (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">Order Placed Successfully!</h4>
              <p className="text-xs text-slate-400 mt-1">
                Saved in Supabase under Order ID: <strong className="text-cyan-400 font-mono">{createdOrderNumber}</strong>
              </p>
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              Your order is recorded in the backend. Click below to initiate instant order handover with Waleed Khan Afridi on WhatsApp.
            </p>

            <a
              href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-400 text-slate-950 font-black text-xs hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Complete Order Handover on WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
