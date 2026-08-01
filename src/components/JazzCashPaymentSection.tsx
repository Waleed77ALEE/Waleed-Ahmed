import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  HelpCircle, 
  Building2, 
  PhoneCall, 
  Smartphone, 
  QrCode, 
  FileText, 
  MessageSquare,
  Lock,
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';

export interface JazzCashPaymentSectionProps {
  orderId?: string;
  defaultAmountUsd?: number;
  defaultAmountPkr?: number;
  customerName?: string;
  customerEmail?: string;
  onPaymentSubmitted?: (details: {
    txId: string;
    screenshot: string | null;
    amountPkr: number;
    fullName: string;
    email: string;
    orderId: string;
  }) => void;
  standalone?: boolean;
}

export const JazzCashPaymentSection: React.FC<JazzCashPaymentSectionProps> = ({
  orderId = '',
  defaultAmountUsd = 0,
  defaultAmountPkr = 0,
  customerName = '',
  customerEmail = '',
  onPaymentSubmitted,
  standalone = false
}) => {
  const merchantName = "Alee Customers";
  const merchantNumber = "03141137917";
  const tillId = "981241835";
  const pkrExchangeRate = 278; // Approx 1 USD to PKR

  // Calculate PKR amount if USD provided
  const initialPkr = defaultAmountPkr > 0 
    ? defaultAmountPkr 
    : (defaultAmountUsd > 0 ? Math.round(defaultAmountUsd * pkrExchangeRate) : 0);

  // Form State
  const [fullName, setFullName] = useState(customerName);
  const [email, setEmail] = useState(customerEmail);
  const [formOrderId, setFormOrderId] = useState(orderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  const [txId, setTxId] = useState('');
  const [amountPaid, setAmountPaid] = useState<number | string>(initialPkr > 0 ? initialPkr : '');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState('');

  // UI States
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedTillId, setCopiedTillId] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyMerchantNumber = () => {
    navigator.clipboard.writeText(merchantNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2200);
  };

  const handleCopyTillId = () => {
    navigator.clipboard.writeText(tillId);
    setCopiedTillId(true);
    setTimeout(() => setCopiedTillId(false), 2200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit. Please upload a smaller screenshot.');
        return;
      }
      setErrorMessage('');
      setScreenshotName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!txId.trim() || txId.trim().length < 6) {
      setErrorMessage('Please enter a valid JazzCash Transaction ID (TID).');
      return;
    }
    if (!amountPaid || Number(amountPaid) <= 0) {
      setErrorMessage('Please enter the total amount paid in PKR.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);

    const submissionData = {
      txId: txId.trim(),
      screenshot,
      amountPkr: Number(amountPaid),
      fullName: fullName.trim(),
      email: email.trim(),
      orderId: formOrderId.trim()
    };

    // Save submission locally for store audit log
    try {
      const existing = JSON.parse(localStorage.getItem('alee_jazzcash_payments') || '[]');
      existing.unshift({
        ...submissionData,
        timestamp: new Date().toISOString(),
        merchantNumber
      });
      localStorage.setItem('alee_jazzcash_payments', JSON.stringify(existing.slice(0, 100)));
    } catch (err) {
      console.warn('Unable to log JazzCash payment in localStorage:', err);
    }

    if (onPaymentSubmitted) {
      onPaymentSubmitted(submissionData);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Alee Customers! I have completed my JazzCash payment.\n\n` +
    `👤 Name: ${fullName}\n` +
    `📧 Email: ${email}\n` +
    `📑 Order ID: ${formOrderId}\n` +
    `🔢 Transaction ID (TID): ${txId}\n` +
    `💰 Amount Paid: PKR ${amountPaid}\n` +
    `📲 JazzCash Merchant: ${merchantNumber}\n\n` +
    `Please verify and confirm my order.`
  );

  return (
    <div className={`w-full font-sans transition-all ${standalone ? 'max-w-4xl mx-auto p-4 sm:p-6' : ''}`}>
      {/* Outer Card Wrapper with #F8F9FA theme background and #F15A24 JazzCash Accent */}
      <div className="bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[16px] shadow-xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Header Banner - #F15A24 Brand Theme */}
        <div className="bg-gradient-to-r from-[#F15A24] to-[#d64817] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <Smartphone className="w-64 h-64" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* JazzCash Badge Icon */}
              <div className="w-12 h-12 rounded-2xl bg-white text-[#F15A24] shadow-lg flex items-center justify-center font-black text-xl tracking-tighter shrink-0 border border-white/20">
                JC
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/20 text-white/90 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Instant Merchant Checkout
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Pay Securely with JazzCash
                </h2>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5 font-medium">
                  Complete your payment quickly and securely using JazzCash.
                </p>
              </div>
            </div>

            {/* Quick Copy Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-right self-start sm:self-auto">
              <span className="text-[10px] text-white/80 uppercase tracking-wider font-bold block">Merchant Number</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-base font-black text-amber-300 tracking-wider">{merchantNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyMerchantNumber}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                  title="Copy Merchant Number"
                >
                  {copiedNumber ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Business Details Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[16px] p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#F15A24] flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Alee Customers Merchant Details</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Business Title</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-base">{merchantName}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F15A24]/10 text-[#F15A24]">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Merchant Mobile</span>
                  <span className="font-mono font-black text-[#F15A24] text-base tracking-wider">{merchantNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyMerchantNumber}
                  className="px-2.5 py-1.5 rounded-lg bg-[#F15A24] hover:bg-[#d64817] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  {copiedNumber ? <Check className="w-3.5 h-3.5 text-amber-200" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedNumber ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-600 dark:text-amber-400 block font-bold">JazzCash TILL ID</span>
                  <span className="font-mono font-black text-amber-700 dark:text-amber-300 text-lg tracking-widest">{tillId}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyTillId}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  {copiedTillId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTillId ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid Layout: How to Pay (Left) & Scan QR Code (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* How to Pay Steps - 7 Cols */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[16px] p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#F15A24] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>How to Pay via JazzCash / Raast</span>
              </h3>

              <ol className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                  <span className="w-7 h-7 rounded-full bg-[#F15A24] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    1
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Option A: Scan QR Code</span>
                    <span className="text-slate-500 dark:text-slate-400">Scan the official yellow <strong>Alee Customers</strong> QR Code with your JazzCash or Raast enabled app.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                  <span className="w-7 h-7 rounded-full bg-[#F15A24] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    2
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Option B: Pay via TILL ID</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Dial <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[#F15A24] font-mono font-bold">*786*10#</code> on your phone and enter TILL ID <strong className="text-[#F15A24] font-mono font-extrabold">{tillId}</strong>.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                  <span className="w-7 h-7 rounded-full bg-[#F15A24] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    3
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Option C: Direct Mobile Transfer</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Send payment to JazzCash account <strong className="text-[#F15A24] font-mono font-bold">{merchantNumber}</strong> (Business Title: <strong>Alee Customers</strong>).
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                  <span className="w-7 h-7 rounded-full bg-[#F15A24] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    4
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Save your payment receipt</span>
                    <span className="text-slate-500 dark:text-slate-400">Take a screenshot of the transaction confirmation screen or copy the Transaction ID (TID).</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80">
                  <span className="w-7 h-7 rounded-full bg-[#F15A24] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                    5
                  </span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">Submit payment confirmation</span>
                    <span className="text-slate-500 dark:text-slate-400">Enter your Transaction ID and upload your receipt screenshot in the form below.</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Scan & Pay Official QR Poster Card - 5 Cols */}
            <div className="md:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[16px] p-5 shadow-lg flex flex-col items-center justify-between text-center space-y-4">
              <div className="w-full">
                <span className="text-xs font-black uppercase tracking-wider text-[#F15A24] flex items-center justify-center gap-1.5 mb-1">
                  <QrCode className="w-4 h-4" />
                  <span>Official QR Code &amp; Barcode</span>
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">JazzCash &amp; Raast payments accepted here for <strong>Alee Customers</strong></p>
              </div>

              {/* Official QR Code Image Standee Container */}
              <div className="w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl group relative bg-amber-400/10 p-2 transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src="/jazzcash_alee_qr.jpg"
                  alt="Alee Customers Official JazzCash and Raast QR Code Barcode Standee"
                  className="w-full h-auto object-cover rounded-xl shadow-md"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay Badge for TILL ID */}
                <div className="mt-2.5 bg-slate-950 text-white rounded-xl p-2 border border-amber-400/40 text-center">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">TILL ID</span>
                  <div className="font-mono font-black text-amber-300 text-lg tracking-[0.2em]">
                    981241835
                  </div>
                  <span className="text-[9.5px] text-slate-300 block mt-0.5">Dial <strong className="text-amber-400">*786*10#</strong> to pay</span>
                </div>
              </div>

              <div className="w-full text-center space-y-1.5">
                <button
                  type="button"
                  onClick={handleCopyTillId}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  {copiedTillId ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedTillId ? 'Till ID Copied!' : 'Copy Till ID (981241835)'}</span>
                </button>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5" /> Instant Raast &amp; JazzCash Verification
                </span>
              </div>
            </div>

          </div>

          {/* Payment Confirmation Form Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[16px] p-6 shadow-md space-y-5">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#F15A24]" />
                  <span>Payment Confirmation</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Enter your transaction details below after sending PKR to JazzCash merchant <strong>03141137917</strong>.
                </p>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-[#F15A24]/10 text-[#F15A24] font-bold text-xs border border-[#F15A24]/20">
                Official Receipt Form
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-emerald-900 dark:text-emerald-200">Payment Details Submitted Successfully!</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 max-w-md mx-auto">
                    Thank you, <strong>{fullName}</strong>. Your JazzCash payment reference (TID: <strong className="font-mono">{txId}</strong>) has been logged for instant verification.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 text-left max-w-md mx-auto text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{formOrderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-bold text-[#F15A24]">{txId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">PKR {amountPaid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Merchant Account:</span>
                    <span className="font-bold text-slate-900 dark:text-white">03141137917 (Alee Customers)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://api.whatsapp.com/send?phone=923416860077&text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Proof via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setTxId('');
                      setScreenshot(null);
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer"
                  >
                    Submit Another Payment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Muhammad Ali"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#F15A24] focus:ring-1 focus:ring-[#F15A24]"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#F15A24] focus:ring-1 focus:ring-[#F15A24]"
                    />
                  </div>

                  {/* Order ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Order ID
                    </label>
                    <input
                      type="text"
                      value={formOrderId}
                      onChange={(e) => setFormOrderId(e.target.value)}
                      placeholder="ORD-100293"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Transaction ID (TID) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      placeholder="e.g. 01928374652"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-mono text-xs text-[#F15A24] font-bold focus:outline-none focus:border-[#F15A24]"
                    />
                  </div>
                </div>

                {/* Amount Paid (PKR) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Amount Paid (PKR) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-slate-500">PKR</span>
                    <input
                      type="number"
                      required
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full pl-14 pr-3.5 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-mono text-sm font-black text-slate-900 dark:text-white focus:outline-none focus:border-[#F15A24]"
                    />
                  </div>
                  {defaultAmountUsd > 0 && (
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Equivalent USD Order Value: <strong>${defaultAmountUsd.toFixed(2)} USD</strong> (Rate ~278 PKR/USD)
                    </span>
                  )}
                </div>

                {/* Upload Payment Screenshot */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Upload Payment Screenshot (Receipt)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-[#F15A24] dark:hover:border-[#F15A24] rounded-2xl p-4 text-center bg-[#F8F9FA] dark:bg-slate-950 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      id="jazzcash_screenshot_upload"
                      className="hidden"
                    />
                    <label htmlFor="jazzcash_screenshot_upload" className="cursor-pointer block space-y-2">
                      <div className="w-10 h-10 rounded-full bg-[#F15A24]/10 text-[#F15A24] mx-auto flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-[#F15A24] hover:underline">Click to upload screenshot</span>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">PNG, JPG, WEBP up to 10MB</span>
                      </div>
                      {screenshotName && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>{screenshotName}</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Submit Button - Large Orange "Pay with JazzCash" / "Confirm Payment" */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-[16px] bg-[#F15A24] hover:bg-[#d64817] active:scale-[0.99] text-white font-black text-base shadow-lg shadow-[#F15A24]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Verifying &amp; Submitting...</span>
                  ) : (
                    <>
                      <Smartphone className="w-5 h-5" />
                      <span>Confirm Payment</span>
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Secure Payments Highlights */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[16px] p-5 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 block">
              Secure Payments Guarantee
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#F15A24] shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Secure JazzCash Payments</span>
              </div>
              
              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Fast Payment Verification</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-cyan-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Trusted Business</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
                <PhoneCall className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Customer Support Available</span>
              </div>
            </div>
          </div>

          {/* Need Help Banner */}
          <div className="p-4 rounded-[16px] bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#F15A24] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sm block">Need Help?</span>
                <p className="text-slate-600 dark:text-amber-200/80 text-[11px] mt-0.5">
                  If you experience any issues with your payment, please contact our support team before making another payment.
                </p>
                <div className="flex items-center gap-4 mt-1.5 text-xs font-bold">
                  <span>Business: <strong>{merchantName}</strong></span>
                  <span>JazzCash: <strong className="font-mono text-[#F15A24]">{merchantNumber}</strong></span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/923416860077?text=Hello%20Alee%20Customers%20support!%20I%20need%20assistance%20with%20my%20JazzCash%20payment%20(03141137917)."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#F15A24] hover:bg-[#d64817] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Support</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
