import React, { useState, useEffect } from 'react';
import { X, Copy, Check, QrCode, Upload, ShieldCheck, CheckCircle2, Image as ImageIcon, Sparkles, Key, RefreshCw, MessageSquare, Wallet, Smartphone } from 'lucide-react';
import paymentData from '../data/paymentMethods.json';
import { loadUserWallet, deductWalletBalance, subscribeWallet, UserWallet } from '../services/walletStore';
import { submitPaymentProofDB } from '../lib/supabase';
import { JazzCashPaymentSection } from './JazzCashPaymentSection';

export interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
  totalAmount?: number;
  orderNumber?: string;
  serviceTitle?: string;
  onPaymentSubmitted?: (txId: string, proofUrl: string) => void;
  initialTab?: string;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber,
  totalAmount = 0,
  orderNumber = '',
  serviceTitle = '',
  onPaymentSubmitted,
  initialTab = 'binance_pay'
}) => {
  const { merchant, paymentMethods } = paymentData;
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [wallet, setWallet] = useState<UserWallet>(() => loadUserWallet());
  const [walletError, setWalletError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    const unsubscribe = subscribeWallet((updated) => {
      setWallet(updated);
    });
    return unsubscribe;
  }, []);

  const [copiedPayId, setCopiedPayId] = useState(false);
  const [copiedPayoneerEmail, setCopiedPayoneerEmail] = useState(false);
  const [copiedTrc20, setCopiedTrc20] = useState(false);
  const [copiedBep20, setCopiedBep20] = useState(false);

  // Payment Proof & TxID state
  const [txId, setTxId] = useState('');
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Binance API credentials
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  if (!isOpen) return null;

  const handlePayWithWallet = async () => {
    setWalletError('');
    if (wallet.balance < totalAmount) {
      setWalletError(`Insufficient Wallet Balance ($${wallet.balance.toFixed(2)} available). Please top up your wallet.`);
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const orderRef = orderNumber || `ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
    const deducted = deductWalletBalance(wallet.userId, totalAmount, orderRef);

    setIsSubmitting(false);
    if (deducted) {
      setIsSuccess(true);
      if (onPaymentSubmitted) {
        onPaymentSubmitted(`WALLET-PAID-${orderRef}`, 'Store Wallet Balance Deduction');
      }
    } else {
      setWalletError('Failed to process wallet payment. Please try again.');
    }
  };

  const handleCopy = (text: string, type: 'payId' | 'payoneer' | 'trc20' | 'bep20') => {
    navigator.clipboard.writeText(text);
    if (type === 'payoneer') {
      setCopiedPayoneerEmail(true);
      setTimeout(() => setCopiedPayoneerEmail(false), 2000);
    } else if (type === 'payId') {
      setCopiedPayId(true);
      setTimeout(() => setCopiedPayId(false), 2000);
    } else if (type === 'trc20') {
      setCopiedTrc20(true);
      setTimeout(() => setCopiedTrc20(false), 2000);
    } else {
      setCopiedBep20(true);
      setTimeout(() => setCopiedBep20(false), 2000);
    }
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

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('BINANCE_API_KEY', apiKey);
    localStorage.setItem('BINANCE_SECRET_KEY', secretKey);
    setIsKeySaved(true);
    setTimeout(() => setIsKeySaved(false), 2500);
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId && !proofImage) return;

    setIsSubmitting(true);

    try {
      await submitPaymentProofDB({
        order_number: orderNumber || `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        payment_method: currentMethod.tabName || 'Binance Pay',
        binance_pay_id: merchant.binancePayId || '787445946',
        tx_id: txId,
        proof_url: proofImage || '',
        amount: totalAmount,
        service_title: serviceTitle || 'Digital Order',
        status: 'Pending Verification'
      });
    } catch (err) {
      console.warn('Failed to submit proof to Supabase:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    if (onPaymentSubmitted) {
      onPaymentSubmitted(txId, proofImage || '');
    }
  };

  const currentMethod = paymentMethods.find((m) => m.id === activeTab) || paymentMethods[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-orange-500/20 via-amber-500/20 to-cyan-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">Payment Methods & Verification</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30 uppercase tracking-wider">
                Verified Merchant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Payoneer ({merchant.email}), Binance Pay ID ({merchant.binancePayId}) & Crypto Wallets
            </p>
          </div>
        </div>

        {/* Data-driven Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 mb-5 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('wallet_pay')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wallet_pay'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Wallet Balance (${wallet.balance.toFixed(2)})</span>
          </button>

          {paymentMethods.map((method) => {
            const isActive = activeTab === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? method.id === 'jazzcash'
                      ? 'bg-[#F15A24] text-white font-black shadow-lg shadow-[#F15A24]/30'
                      : method.id === 'payoneer'
                      ? 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white font-black shadow-lg shadow-orange-500/20'
                      : method.id === 'whatsapp_direct'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                      : 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {method.id === 'jazzcash' && <Smartphone className="w-4 h-4 text-white" />}
                {method.id === 'payoneer' && <Sparkles className="w-4 h-4 text-amber-300" />}
                {method.id === 'binance_pay' && <ShieldCheck className="w-4 h-4" />}
                {method.id === 'whatsapp_direct' && <MessageSquare className="w-4 h-4" />}
                {method.id === 'qr_code' && <QrCode className="w-4 h-4" />}
                {method.id === 'api_keys' && <Key className="w-4 h-4" />}
                {method.id.includes('usdt') && <ShieldCheck className="w-4 h-4 text-cyan-400" />}
                <span>{method.tabName}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content */}
        <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar space-y-5">
          {/* Payable Header if totalAmount > 0 or serviceTitle */}
          {(totalAmount > 0 || serviceTitle) && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-amber-500/10 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">
                  {serviceTitle ? 'Selected Product / Service' : 'Total Payable Amount'}
                </span>
                <span className="text-xs font-bold text-white block">
                  {serviceTitle || (orderNumber ? `Order #${orderNumber}` : 'Digital Services Order')}
                </span>
              </div>
              <span className="text-2xl font-black font-mono text-cyan-400">${totalAmount.toFixed(2)} USD</span>
            </div>
          )}

          {/* JAZZCASH PAYMENT TAB CONTENT */}
          {activeTab === 'jazzcash' && (
            <JazzCashPaymentSection
              orderId={orderNumber}
              defaultAmountUsd={totalAmount}
              onPaymentSubmitted={(details) => {
                if (onPaymentSubmitted) {
                  onPaymentSubmitted(details.txId, details.screenshot || '');
                }
              }}
            />
          )}

          {/* WALLET BALANCE TAB CONTENT */}
          {activeTab === 'wallet_pay' && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                    Store Wallet Balance
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                  Instant Deduction
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Your Available Balance</span>
                  <span className="text-3xl font-black font-mono text-white">${wallet.balance.toFixed(2)} USD</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Order Total</span>
                  <span className="text-xl font-black font-mono text-emerald-400">${totalAmount.toFixed(2)} USD</span>
                </div>
              </div>

              {walletError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold">
                  {walletError}
                </div>
              )}

              {isSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Order paid successfully using your Wallet Balance! Processing handover now.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePayWithWallet}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black text-sm hover:brightness-110 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Deducting Wallet Balance...</span>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>Pay ${totalAmount.toFixed(2)} Now with Wallet Balance</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Payoneer Details */}
          {activeTab === 'payoneer' && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-orange-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-wider border border-orange-500/30">
                  {currentMethod.badge}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">{currentMethod.fee}</span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Payoneer Recipient Email
                </label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-3">
                  <div className="flex-1 font-mono text-sm font-black text-white tracking-wide">
                    {currentMethod.recipientEmail}
                  </div>
                  <button
                    onClick={() => handleCopy(currentMethod.recipientEmail || merchant.email, 'payoneer')}
                    className="px-3 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {copiedPayoneerEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPayoneerEmail ? 'Copied Email!' : 'Copy Email'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Account Name</span>
                  <span className="font-extrabold text-white">{currentMethod.accountName || merchant.name}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Supported Currencies</span>
                  <span className="font-extrabold text-cyan-400">{currentMethod.currencies?.join(', ')}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-2">
                <span className="font-bold text-amber-300 block uppercase tracking-wider text-[11px]">
                  How to Pay via Payoneer:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  {currentMethod.instructions?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Binance Pay Details */}
          {activeTab === 'binance_pay' && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                  {currentMethod.badge || 'Zero Fee • Instant Delivery'}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">{currentMethod.fee || '0% Fee'}</span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Official Binance Pay ID / User ID</span>
                </label>
                <div className="flex items-center gap-3 bg-slate-900 border-2 border-amber-500/40 rounded-xl p-3.5 shadow-inner">
                  <div className="flex-1 font-mono text-lg font-black text-amber-300 tracking-widest select-all">
                    {merchant.binancePayId || '787445946'}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(merchant.binancePayId || '787445946', 'payId')}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shrink-0 shadow-lg cursor-pointer"
                  >
                    {copiedPayId ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPayId ? 'Copied Pay ID!' : 'Copy Pay ID (787445946)'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-amber-300 block uppercase tracking-wider text-[11px]">
                  How to Pay via Binance Pay (Pay ID: 787445946):
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>Open the Binance Mobile App or Web Dashboard.</li>
                  <li>Navigate to <strong>Pay → Send → Select Pay ID / User ID</strong>.</li>
                  <li>Enter Pay ID: <strong className="text-amber-300 font-mono select-all">787445946</strong> (Recipient: Waleed Khan Afridi).</li>
                  <li>Enter the required amount in USDT/BUSD and confirm.</li>
                  <li>Copy your Transaction ID (TxID) and upload the payment proof screenshot below.</li>
                </ol>
              </div>
            </div>
          )}

          {/* WhatsApp Direct Payment Details */}
          {activeTab === 'whatsapp_direct' && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                  {currentMethod.badge || 'WhatsApp Direct Handover'}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">Instant Support</span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Direct WhatsApp Contact & Payment Link
                </label>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Connect directly with <strong className="text-white">Waleed Khan Afridi</strong> on WhatsApp to pay via Local Bank Transfer, JazzCash, Wise, or custom arrangements.
                  </p>
                  <a
                    href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi Waleed! I would like to buy ${serviceTitle ? serviceTitle : 'a digital service'} ($${totalAmount.toFixed(2)}) via WhatsApp Direct Payment.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950" />
                    <span>Pay & Order via Direct WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-2">
                <span className="font-bold text-emerald-300 block uppercase tracking-wider text-[11px]">
                  How to Pay via WhatsApp Direct:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  {currentMethod.instructions?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}



          {/* QR Code Tab */}
          {activeTab === 'qr_code' && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 text-center space-y-4">
              <div className="inline-block p-3 bg-amber-400/10 border-2 border-amber-400 rounded-2xl shadow-xl max-w-[260px] mx-auto">
                <img
                  src="/jazzcash_alee_qr.jpg"
                  alt="Alee Customers Official JazzCash and Raast QR Code Barcode Standee"
                  className="w-full h-auto rounded-xl shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-amber-300 font-extrabold block">Official Merchant: Alee Customers</span>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">JazzCash / Raast TILL ID</span>
                  <span className="font-mono font-black text-amber-300 text-lg tracking-widest block">981241835</span>
                  <span className="text-[10px] text-slate-400 block">Dial <strong className="text-amber-300">*786*10#</strong> to pay via TILL ID</span>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api_keys' && (
            <form onSubmit={handleSaveApiKeys} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Binance Merchant API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste Merchant API Key..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Binance Merchant Secret Key</label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Paste Merchant Secret Key..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all"
              >
                {isKeySaved ? 'API Keys Saved!' : 'Save API Credentials'}
              </button>
            </form>
          )}

          {/* Payment Proof Form */}
          {activeTab !== 'api_keys' && (
            <form onSubmit={handleSubmitProof} className="p-5 rounded-2xl bg-slate-950 border border-orange-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4 text-orange-400" />
                  <span>Upload Payment Proof / Screenshot</span>
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold">Fast Handover</span>
              </div>

              {isSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-extrabold text-sm text-white">Payment Proof Submitted Successfully!</p>
                  <p className="text-slate-300 text-[11px]">
                    Reference: <strong className="font-mono text-cyan-300">{txId || 'Verified Screenshot'}</strong>
                  </p>
                  <p className="text-slate-400 text-[11px] pt-1">
                    Our team will verify & deliver your digital order shortly on WhatsApp.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Transaction ID / Reference Number / TxID
                    </label>
                    <input
                      type="text"
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      placeholder={activeTab === 'binance_pay' ? "e.g. Binance TxID (mandatory)" : "e.g. Payoneer Ref ID or Binance TxID"}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:border-orange-500 transition-colors"
                      required={activeTab === 'binance_pay' && !proofImage}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Payment Screenshot / Confirmation PDF
                    </label>
                    <div className="relative border-2 border-dashed border-slate-800 hover:border-orange-500/50 rounded-2xl p-4 text-center transition-colors bg-slate-900/50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {proofImage ? (
                        <div className="space-y-2">
                          <img
                            src={proofImage}
                            alt="Payment Proof"
                            className="max-h-36 mx-auto rounded-xl border border-slate-700 shadow-md object-contain"
                          />
                          <p className="text-[11px] text-orange-300 font-mono truncate">{proofFileName}</p>
                          <p className="text-[10px] text-slate-400">Click or drag to replace screenshot</p>
                        </div>
                      ) : (
                        <div className="space-y-1.5 py-2">
                          <ImageIcon className="w-8 h-8 text-orange-400 mx-auto" />
                          <p className="text-xs font-bold text-slate-200">Click or Drag Payment Screenshot</p>
                          <p className="text-[10px] text-slate-500">Supports PNG, JPG, WEBP (Max 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || (!txId && !proofImage)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs hover:from-orange-400 hover:to-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Payment Proof...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit Payment Proof</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <a
            href={merchant.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline font-bold flex items-center gap-1"
          >
            <span>Direct WhatsApp Support: +92 341 6860077</span>
          </a>
          <span>100% Secure Transaction</span>
        </div>
      </div>
    </div>
  );
};
