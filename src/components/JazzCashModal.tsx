import React from 'react';
import { X } from 'lucide-react';
import { JazzCashPaymentSection } from './JazzCashPaymentSection';

export interface JazzCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  defaultAmountUsd?: number;
  defaultAmountPkr?: number;
  customerName?: string;
  customerEmail?: string;
  onPaymentSubmitted?: (details: any) => void;
}

export const JazzCashModal: React.FC<JazzCashModalProps> = ({
  isOpen,
  onClose,
  orderId,
  defaultAmountUsd,
  defaultAmountPkr,
  customerName,
  customerEmail,
  onPaymentSubmitted
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700 shadow-md"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto custom-scrollbar rounded-[16px]">
          <JazzCashPaymentSection
            orderId={orderId}
            defaultAmountUsd={defaultAmountUsd}
            defaultAmountPkr={defaultAmountPkr}
            customerName={customerName}
            customerEmail={customerEmail}
            onPaymentSubmitted={(details) => {
              if (onPaymentSubmitted) {
                onPaymentSubmitted(details);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
