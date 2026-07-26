import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Upload, ShieldCheck, CheckCircle2, Image as ImageIcon, Sparkles, Key, RefreshCw, MessageSquare } from 'lucide-react';
import paymentData from '../data/paymentMethods.json';

export interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
  totalAmount?: number;
  orderNumber?: string;
  serviceTitle?: string;
  onPaymentSubmitted?: (txId: string, proofUrl: string) => void;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose,
  totalAmount = 0,
  orderNumber = '',
  serviceTitle = '',
  onPaymentSubmitted
}) => {
  const { merchant, paymentMethods } = paymentData;
  const [activeTab, setActiveTab] = useState<string>('binance_pay');

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
    await new Promise((r) => setTimeout(r, 1200));
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
          {paymentMethods.map((method) => {
            const isActive = activeTab === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? method.id === 'payoneer'
                      ? 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white font-black shadow-lg shadow-orange-500/20'
                      : method.id === 'whatsapp_direct'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                      : 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
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
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                  {currentMethod.badge}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">{currentMethod.fee}</span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Binance Pay ID
                </label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-3">
                  <div className="flex-1 font-mono text-sm font-black text-white tracking-widest">
                    {merchant.binancePayId}
                  </div>
                  <button
                    onClick={() => handleCopy(merchant.binancePayId, 'payId')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {copiedPayId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPayId ? 'Copied Pay ID!' : 'Copy Pay ID'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-2">
                <span className="font-bold text-amber-300 block uppercase tracking-wider text-[11px]">
                  How to Pay via Binance Pay:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  {currentMethod.instructions?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
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
                    Connect directly with <strong className="text-white">Waleed Khan Afridi</strong> on WhatsApp to pay via Local Bank Transfer, EasyPaisa, JazzCash, Wise, or custom arrangements.
                  </p>
                  <a
                    href={`https://wa.me/923000000000?text=${encodeURIComponent(`Hi Waleed! I would like to buy ${serviceTitle ? serviceTitle : 'a digital service'} ($${totalAmount.toFixed(2)}) via WhatsApp Direct Payment.`)}`}
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
              <div className="inline-block p-4 bg-white rounded-2xl shadow-xl">
                <QrCode className="w-44 h-44 text-slate-950 mx-auto" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-300 font-bold block">Binance Pay ID: {merchant.binancePayId}</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Scan with Binance App for Instant Transfer</span>
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
                      placeholder="e.g. Payoneer Ref ID or Binance TxID"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:border-orange-500 transition-colors"
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
            <span>Direct WhatsApp Support: wa.link/6128mm</span>
          </a>
          <span>100% Secure Transaction</span>
        </div>
      </div>
    </div>
  );
};
