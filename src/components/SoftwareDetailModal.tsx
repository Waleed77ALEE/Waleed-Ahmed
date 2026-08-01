import React from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Download,
  Code,
  Layers,
  Sparkles,
  Cpu,
  Laptop,
  Check,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SoftwareProduct } from '../data/softwareData';
import { SoftwareBrandLogo } from './SoftwareBrandLogo';

interface SoftwareDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: SoftwareProduct | null;
  onOrderNow: (product: SoftwareProduct) => void;
}

export const SoftwareDetailModal: React.FC<SoftwareDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onOrderNow
}) => {
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-8"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SoftwareBrandLogo slug={product.slug} category={product.category} size="md" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Software Details &amp; Specifications
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {product.name}
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

          {/* Content Body */}
          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
            {/* Top Overview Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                    {product.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] font-bold">
                    {product.platform}
                  </span>
                  {product.downloadSize && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                      Size: {product.downloadSize}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-black text-white mt-2">
                  {product.name} ({product.version})
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  License Type: <strong className="text-emerald-400 font-mono">{product.licenseType}</strong>
                </p>
              </div>

              <div className="text-right self-end sm:self-center shrink-0">
                <div className="text-2xl font-black font-mono text-emerald-400">
                  ${product.price} USD
                </div>
                {product.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    ${product.originalPrice} USD
                  </span>
                )}
              </div>
            </div>

            {/* Overview Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Software Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-2xl border border-slate-800/60">
                {product.description}
              </p>
            </div>

            {/* Key Included Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Key License Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees & Support */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-2 space-y-1">
                <ShieldCheck className="w-5 h-5 text-cyan-400 mx-auto" />
                <h5 className="text-xs font-bold text-white">Genuine Activation</h5>
                <p className="text-[10px] text-slate-400">100% official digital serial activation guarantee</p>
              </div>

              <div className="p-2 space-y-1">
                <Zap className="w-5 h-5 text-emerald-400 mx-auto" />
                <h5 className="text-xs font-bold text-white">Fast Delivery</h5>
                <p className="text-[10px] text-slate-400">Keys dispatched within 10-30 minutes</p>
              </div>

              <div className="p-2 space-y-1">
                <Laptop className="w-5 h-5 text-amber-400 mx-auto" />
                <h5 className="text-xs font-bold text-white">24/7 Setup Support</h5>
                <p className="text-[10px] text-slate-400">Remote assistance via WhatsApp &amp; Email</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOrderNow(product);
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Order Now (${product.price} USD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
