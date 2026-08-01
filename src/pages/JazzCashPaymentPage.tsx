import React from 'react';
import { JazzCashPaymentSection } from '../components/JazzCashPaymentSection';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JazzCashPaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F15A24]/10 text-[#F15A24] border border-[#F15A24]/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Official JazzCash Merchant Page
          </span>
        </div>
      </div>

      <JazzCashPaymentSection standalone={true} />
    </div>
  );
};

export default JazzCashPaymentPage;
