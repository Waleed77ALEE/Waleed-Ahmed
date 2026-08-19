import React, { useState } from 'react';
import { Layers, Database, Cpu, Mail, CheckCircle2, Shield, Zap, RefreshCw, X, Code, Terminal, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { syncOrderToKlaviyo } from '../services/klaviyoService';
import { web3Manager } from '../lib/web3';
import { SUPABASE_SQL_SCHEMA } from '../lib/supabase';

interface ArchitecturalPillarsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitecturalPillarsModal: React.FC<ArchitecturalPillarsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'web3' | 'klaviyo'>('frontend');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleTestKlaviyo = async () => {
    setIsLoading(true);
    setTestResult(null);
    const res = await syncOrderToKlaviyo({
      email: 'waleedkhanafridi7@gmail.com',
      fullName: 'Waleed Khan Afridi',
      productTitle: 'HeyGen Enterprise & GPT-5 API Bundle',
      category: 'Subscription Buyer',
      amount: 199.00,
      currency: 'USD',
      orderId: 'WKA-PILAR-9921',
      licenseKey: 'KEY-WKA-9921-VERIFIED'
    });
    setIsLoading(false);
    setTestResult(res.message);
  };

  const handleTestWeb3 = async () => {
    setIsLoading(true);
    setTestResult(null);
    try {
      const conn = await web3Manager.connectWallet('Reown');
      setTestResult(`Successfully connected via Reown AppKit! Address: ${conn.address} | USDT Balance: $${conn.balanceUsdt}`);
    } catch (e: any) {
      setTestResult(`Web3 Connection error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>WALEEDKHANAFRIDI.ONLINE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/35 uppercase">Master Architecture</span>
              </h2>
              <p className="text-xs text-slate-400">Production-grade full-stack architecture & engineering master blueprint</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('frontend')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'frontend' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <Code className="w-4 h-4" />
            <span>1. Frontend Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('backend')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'backend' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <Database className="w-4 h-4" />
            <span>2. Supabase & PostgreSQL</span>
          </button>
          <button
            onClick={() => setActiveTab('web3')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'web3' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <Cpu className="w-4 h-4" />
            <span>3. Reown Web3 & Real-Time</span>
          </button>
          <button
            onClick={() => setActiveTab('klaviyo')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'klaviyo' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <Mail className="w-4 h-4" />
            <span>4. Klaviyo CRM Automation</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 text-slate-300 text-sm">
          {activeTab === 'frontend' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>React 18 & Tailwind CSS High-Performance Storefront</span>
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active & Deployed</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mirrors top-tier gaming and digital asset marketplaces with deep-contrast blacks, deep purples, neon orange/cyan accents, frosted glass navigation (`backdrop-blur`), and sub-second lazy loading.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-2">
                  <div className="text-amber-400 font-bold text-xs">Global Search & Filters</div>
                  <div className="text-xs text-slate-400">Instant client-side indexing across 100+ digital subscriptions, AI tools, and web services.</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-2">
                  <div className="text-amber-400 font-bold text-xs">Smooth Micro-Interactions</div>
                  <div className="text-xs text-slate-400">Powered by Framer Motionspring physics and hover elevation glow effects.</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-2">
                  <div className="text-amber-400 font-bold text-xs">Core Web Vitals</div>
                  <div className="text-xs text-slate-400">Optimized chunking with Vite and skeleton loaders ensuring zero layout shift.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span>Supabase PostgreSQL Schema & RLS Security</span>
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Fully Provisioned</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Robust relational tables for users, products, transactions, and automated inventory delivery with Row Level Security (RLS) enabled.
              </p>
              <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800 max-h-60">
                <pre>{SUPABASE_SQL_SCHEMA.slice(0, 800)}...</pre>
              </div>
            </div>
          )}

          {activeTab === 'web3' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <span>Reown AppKit & USDT Stablecoin Checkout</span>
                </h3>
                <button
                  onClick={handleTestWeb3}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Connecting...' : 'Connect Reown Wallet'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Secure decentralized connections supporting MetaMask, Binance Pay, and Bitget with instant USDT stablecoin payment processing and live crypto price feeds.
              </p>
            </div>
          )}

          {activeTab === 'klaviyo' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                  <Mail className="w-5 h-5 text-rose-400" />
                  <span>Klaviyo CRM & Automated Product Delivery</span>
                </h3>
                <button
                  onClick={handleTestKlaviyo}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Syncing...' : 'Test Klaviyo Webhook Sync'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically synchronizes purchase events, triggers delivery emails, and segments users into categories like 'Shopify Client', 'Subscription Buyer', and 'Web3 User'.
              </p>
            </div>
          )}

          {/* Test Result Banner */}
          {testResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-3 shadow-xl"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-mono">{testResult}</span>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>waleedkhanafridi.online • Master Architecture v4.2</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </motion.div>
    </div>
  );
};
