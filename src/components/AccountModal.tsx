import React, { useState, useEffect } from 'react';
import { X, User, ShoppingBag, Phone, Save, LogOut, ExternalLink, Clock, CheckCircle2, Package, Shield, Loader2, MessageSquare } from 'lucide-react';
import { UserProfile, SupabaseOrder, fetchUserOrders, upsertProfile, supabase } from '../lib/supabase';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  profile: UserProfile | null;
  onProfileUpdate: () => void;
  onSignOut: () => void;
  whatsappNumber: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  profile,
  onProfileUpdate,
  onSignOut,
  whatsappNumber
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('orders');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [whatsapp, setWhatsapp] = useState(profile?.whatsapp || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setWhatsapp(profile.whatsapp || '');
    }
  }, [profile]);

  useEffect(() => {
    if (isOpen && user) {
      loadOrders();
    }
  }, [isOpen, user]);

  const loadOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    const data = await fetchUserOrders(user.id);
    setOrders(data);
    setLoadingOrders(false);
  };

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveSuccess(false);

    const updated: UserProfile = {
      id: user.id,
      email: user.email || '',
      full_name: fullName,
      whatsapp: whatsapp
    };

    const success = await upsertProfile(updated);
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      onProfileUpdate();
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg">
            {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{profile?.full_name || 'My Account'}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {activeTab === 'orders' ? (
            <div className="space-y-4">
              {loadingOrders ? (
                <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Fetching orders from Supabase...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 p-8">
                  <Package className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">No Orders Found Yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    When you order AI subscriptions, social growth services, or custom web development from our marketplace, your order details will appear here.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-bold font-mono text-cyan-400">Order #{order.order_number}</span>
                        <p className="text-[10px] text-slate-500">
                          {order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          order.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-sm font-black font-mono text-white">${order.total_amount?.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="space-y-1.5">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/60 p-2 rounded-xl">
                          <div>
                            <span className="font-semibold text-white">{item.title}</span>
                            <span className="text-[10px] text-slate-500 block">{item.delivery}</span>
                          </div>
                          <div className="text-right font-mono">
                            <span>x{item.quantity}</span> — <span className="text-cyan-300 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* WhatsApp Direct Assistance & Binance TxID */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Payment: {order.payment_method}</span>
                        {order.binance_tx_id && (
                          <span className="text-[10px] text-amber-300 font-mono block">
                            Binance TxID: <strong>{order.binance_tx_id}</strong>
                          </span>
                        )}
                        {order.payment_proof && (
                          <span className="text-[10px] text-emerald-400 font-bold block">
                            ✓ Payment Proof Uploaded
                          </span>
                        )}
                      </div>

                      <a
                        href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 transition-all shrink-0"
                      >
                        <MessageSquare className="w-3 h-3 fill-emerald-400" />
                        <span>Order Support</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Email (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Waleed Khan Afridi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+92 300 0000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated in Supabase database!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Changes</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase TLS & RLS Secured</span>
          </div>

          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
