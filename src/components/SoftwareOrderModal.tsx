import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Upload,
  CreditCard,
  QrCode,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Lock,
  Download,
  ArrowRight,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SoftwareProduct, SoftwareOrder } from '../data/softwareData';
import { softwareStore } from '../services/softwareStore';
import { loadUserWallet, deductWalletBalance, UserWallet } from '../services/walletStore';

interface SoftwareOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: SoftwareProduct | null;
  user: any;
  profile: any;
  onOpenAccount?: () => void;
}

export const SoftwareOrderModal: React.FC<SoftwareOrderModalProps> = ({
  isOpen,
  onClose,
  product,
  user,
  profile,
  onOpenAccount
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'Binance Pay' | 'Payoneer' | 'JazzCash' | 'Wallet Balance'>('Binance Pay');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [txRef, setTxRef] = useState('');
  const [notes, setNotes] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<SoftwareOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const wallet: UserWallet = loadUserWallet(user?.id, user?.email, profile?.full_name);

  useEffect(() => {
    if (user || profile) {
      setCustomerName(profile?.full_name || user?.user_metadata?.full_name || '');
      setCustomerEmail(user?.email || profile?.whatsapp || '');
    }
    setPlacedOrder(null);
    setErrorMsg('');
    setProofFile(null);
    setProofPreview('');
  }, [isOpen, user, profile, product]);

  if (!isOpen || !product) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerEmail.trim() || !customerName.trim()) {
      setErrorMsg('Please provide your name and email address to receive your license key.');
      return;
    }

    if (paymentMethod === 'Wallet Balance') {
      if (wallet.balance < product.price) {
        setErrorMsg(`Insufficient wallet balance ($${wallet.balance.toFixed(2)} USD). Please top up your wallet or select Binance Pay / Payoneer / JazzCash.`);
        return;
      }
    } else {
      if (!txRef.trim() && !proofPreview) {
        setErrorMsg('Please enter your Transaction Reference / ID or upload payment proof screenshot.');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let finalTxRef = txRef;
      if (paymentMethod === 'Wallet Balance') {
        const success = deductWalletBalance(
          wallet.userId,
          product.price,
          `SW-${product.id}-${Date.now().toString().slice(-4)}`
        );
        if (!success) {
          setErrorMsg('Failed to deduct wallet balance. Please check your balance.');
          setIsSubmitting(false);
          return;
        }
        finalTxRef = `WAL-${Date.now()}`;
      }

      const order = softwareStore.placeSoftwareOrder({
        customerName,
        customerEmail,
        product,
        paymentMethod,
        paymentProofUrl: proofPreview,
        txRef: finalTxRef,
        notes
      });

      setPlacedOrder(order);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-8"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-black">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Instant License Fulfillment
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {placedOrder ? 'Order Confirmed!' : `Order ${product.name}`}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
            {placedOrder ? (
              /* SUCCESS ORDER SCREEN */
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    ORDER ID: {placedOrder.id}
                  </span>
                  <h4 className="text-xl font-black text-white mt-2">
                    Thank You for Your Order!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1">
                    Your request for <strong className="text-white">{placedOrder.productName}</strong> ({placedOrder.version}) has been received successfully.
                  </p>
                </div>

                {/* Delivery details if instantly fulfilled via wallet */}
                {placedOrder.orderStatus === 'Fulfilled' && placedOrder.deliveryKey ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-4 h-4" />
                        <span>Instant Key Delivered</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Status: Active</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                      <code className="text-xs sm:text-sm font-mono font-bold text-emerald-300 break-all">
                        {placedOrder.deliveryKey}
                      </code>
                      <button
                        onClick={() => handleCopy(placedOrder.deliveryKey!, 'key')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedText === 'key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === 'key' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {placedOrder.downloadLink && (
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Download Link:</span>
                        <a
                          href={placedOrder.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>Official Download Server</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-cyan-400">
                      <span>Verification &amp; Delivery Status</span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Pending Verification
                      </span>
                    </div>
                    <p className="text-slate-400">
                      Our dispatch team will verify your transaction ref <strong className="text-white">({placedOrder.txRef || 'Submitted'})</strong> and send your software key &amp; download instructions directly to <strong className="text-white">{placedOrder.customerEmail}</strong> within 10-30 minutes.
                    </p>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      if (onOpenAccount) onOpenAccount();
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>View in Client Dashboard</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* ORDER FORM */
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                {/* Product Summary Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                      {product.category} • {product.licenseType}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Version: {product.version} ({product.platform})
                    </p>
                  </div>

                  <div className="text-right self-end sm:self-center shrink-0">
                    <div className="text-lg font-black font-mono text-emerald-400">
                      ${product.price} USD
                    </div>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        ${product.originalPrice} USD
                      </span>
                    )}
                  </div>
                </div>

                {/* Customer Details Inputs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>1. Customer Details</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Waleed Khan"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Email Address (for License Key delivery) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. name@company.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Tabs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                      <span>2. Select Payment Method</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Secure 256-Bit SSL</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Binance Pay')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 text-center ${
                        paymentMethod === 'Binance Pay'
                          ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-amber-400" />
                      <span>Binance Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Payoneer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 text-center ${
                        paymentMethod === 'Payoneer'
                          ? 'bg-red-500/10 border-red-500/50 text-red-300 shadow-md shadow-red-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-red-400" />
                      <span>Payoneer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('JazzCash')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 text-center ${
                        paymentMethod === 'JazzCash'
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>JazzCash</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Wallet Balance')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 text-center ${
                        paymentMethod === 'Wallet Balance'
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Wallet className="w-4 h-4 text-cyan-400" />
                      <span>Wallet (${wallet.balance.toFixed(2)})</span>
                    </button>
                  </div>
                </div>

                {/* Payment Instructions & Details Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  {paymentMethod === 'Binance Pay' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400">Binance Pay ID / USDT TRC20</span>
                        <span className="text-[10px] text-slate-400">Zero Fee Transfer</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <code className="font-mono text-white font-bold">289018449</code>
                        <button
                          type="button"
                          onClick={() => handleCopy('289018449', 'binance')}
                          className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px] font-bold flex items-center gap-1"
                        >
                          {copiedText === 'binance' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'binance' ? 'Copied' : 'Copy ID'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Send exactly <strong className="text-amber-300">${product.price} USDT</strong> using Binance Pay or TRC20 and paste your Transaction ID below.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'Payoneer' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-red-400">Payoneer Email Transfer</span>
                        <span className="text-[10px] text-slate-400">Global Wire / Card</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <code className="font-mono text-white font-bold">waleedkhanafridi7@gmail.com</code>
                        <button
                          type="button"
                          onClick={() => handleCopy('waleedkhanafridi7@gmail.com', 'payoneer')}
                          className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px] font-bold flex items-center gap-1"
                        >
                          {copiedText === 'payoneer' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'payoneer' ? 'Copied' : 'Copy Email'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Transfer <strong className="text-red-300">${product.price} USD</strong> via Payoneer Make a Payment or card link.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'JazzCash' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F15A24]">JazzCash Merchant Account</span>
                        <span className="text-[10px] text-slate-400">PKR Equivalent</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <code className="font-mono text-[#F15A24] font-black text-sm block tracking-wider">03141137917</code>
                          <span className="text-[10px] text-slate-300 block">Business: <strong>Alee Customers</strong></span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('03141137917', 'jazz')}
                          className="px-2.5 py-1 rounded-lg bg-[#F15A24]/20 border border-[#F15A24]/30 text-[#F15A24] hover:bg-[#F15A24]/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedText === 'jazz' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedText === 'jazz' ? 'Copied' : 'Copy Number'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Wallet Balance' && (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400">Instant Wallet Checkout</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Balance: ${wallet.balance.toFixed(2)} USD
                        </span>
                      </div>
                      {wallet.balance >= product.price ? (
                        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 flex items-center gap-2">
                          <Zap className="w-4 h-4 shrink-0 text-cyan-400" />
                          <span>
                            Instant Key Generation! Your license key will be delivered instantly upon clicking Submit.
                          </span>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                          <span>
                            Your current wallet balance (${wallet.balance.toFixed(2)}) is lower than product price (${product.price}). Please select another payment method or top up.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Proof of Payment / Transaction Reference */}
                {paymentMethod !== 'Wallet Balance' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>3. Payment Proof Verification</span>
                    </h4>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Transaction ID / Reference Number *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TX-99021884 or Binance Ref"
                        value={txRef}
                        onChange={(e) => setTxRef(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Upload Payment Screenshot (Optional)
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-2">
                          <Upload className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Choose Screenshot</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {proofFile && (
                          <span className="text-xs text-emerald-400 font-mono font-bold truncate">
                            {proofFile.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit Action Button */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {paymentMethod === 'Wallet Balance' ? 'Pay & Instant Download' : 'Submit Software Order'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
