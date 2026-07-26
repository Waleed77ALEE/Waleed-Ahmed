import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Loader2, Sparkles } from 'lucide-react';
import { SupabaseCartItem, createOrderDB, clearCartDB, supabase } from '../lib/supabase';

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
  const [paymentMethod, setPaymentMethod] = useState('WhatsApp Direct / Crypto / Bank');
  const [isPlacing, setIsPlacing] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsPlacing(true);
    const orderNum = 'WKA-' + Math.floor(100000 + Math.random() * 900000);

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
      status: 'Pending' as const,
      payment_method: paymentMethod,
      contact_whatsapp: contactWhatsapp,
      notes: notes
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
    return `Hi Waleed! I would like to place an order on www.waleedkhanafridi.online:\n\n*Cart Items*:\n${itemsSummary}\n\n*Total*: $${totalAmount.toFixed(2)}\n*Payment Preference*: ${paymentMethod}\n*WhatsApp Contact*: ${contactWhatsapp}\n${notes ? `*Notes*: ${notes}` : ''}`;
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
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[10px] text-cyan-400 font-medium">{item.category} • {item.delivery}</p>
                      <p className="text-sm font-black font-mono text-emerald-400 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
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
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsAppOrderMsg())}`}
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
                placeholder="+92 300 0000000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">Payment Method Preference</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="WhatsApp Direct / Crypto / Bank">WhatsApp Direct / Crypto / Bank</option>
                <option value="USDT / Crypto (Binance Pay)">USDT / Crypto (Binance Pay)</option>
                <option value="Bank Transfer / Wise / GCash">Bank Transfer / Wise / GCash</option>
                <option value="Custom Order Terms">Custom Order Terms</option>
              </select>
            </div>

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
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Waleed! I just placed Order #${createdOrderNumber} on waleedkhanafridi.online ($${totalAmount.toFixed(2)}). Please confirm handover details.`)}`}
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
