import React, { useState } from 'react';
import { X, Copy, Check, Database, Terminal, Shield, Code2 } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabase';

interface SupabaseSqlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSqlModal: React.FC<SupabaseSqlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Supabase SQL Schema & Database Setup</h3>
            <p className="text-xs text-slate-400">
              Generated tables: <strong className="text-cyan-300 font-mono">profiles, orders, cart_items, contact_messages</strong> with RLS policies.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Project ID: <strong className="font-mono text-cyan-300">bspuihgnwkpcfkfvffum</strong></span>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied SQL!' : 'Copy SQL Script'}</span>
          </button>
        </div>

        {/* Code Snippet Box */}
        <div className="overflow-y-auto flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800/90 font-mono text-[11px] text-slate-300 custom-scrollbar whitespace-pre leading-relaxed">
          {SUPABASE_SQL_SCHEMA}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Run this script in Supabase Dashboard → SQL Editor to initialize tables.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
