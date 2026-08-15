import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  Lock, 
  Wallet, 
  Gamepad2, 
  Bot, 
  Code2, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  HelpCircle, 
  Building2, 
  Mail, 
  Phone,
  Layers,
  ArrowRight,
  Database,
  CreditCard,
  Zap,
  Cpu,
  UserCheck,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

export const AleePayPurposeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'oauth' | 'security'>('overview');

  const corePillars = [
    {
      id: "gaming",
      icon: <Gamepad2 className="w-6 h-6 text-red-500" />,
      badge: "Gaming Marketplace",
      title: "AAA Games & Digital Keys",
      description: "Instant delivery of authentic digital gaming CD keys, Steam passes, PlayStation/Xbox gift cards, and game assets with 100% authenticity guarantee."
    },
    {
      id: "ai",
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      badge: "AI Pro Licenses",
      title: "AI Subscriptions & API Credits",
      description: "Direct, verified access to next-gen AI subscriptions including Super Grok, Claude 3.5 Sonnet / Max, and OpenAI API developer balance top-ups."
    },
    {
      id: "wallet",
      icon: <Wallet className="w-6 h-6 text-emerald-400" />,
      badge: "Payment Rail",
      title: "Multi-Rail AleePay Wallet",
      description: "Fast multi-currency checkout supporting Binance Pay (USDT/crypto), JazzCash, EasyPaisa, and bank transfers with zero hidden transaction surcharges."
    },
    {
      id: "dev",
      icon: <Code2 className="w-6 h-6 text-amber-400" />,
      badge: "Software Engineering",
      title: "Custom Web Application Agency",
      description: "Enterprise full-stack engineering, bespoke React/Next.js web apps, WordPress WooCommerce stores, and Google Search technical SEO audits."
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      icon: <Layers className="w-5 h-5 text-red-400" />,
      title: "Browse Verified Services",
      desc: "Explore curated software licenses, AI subscription packages, gaming keys, or custom development tiers with transparent pricing."
    },
    {
      step: "02",
      icon: <CreditCard className="w-5 h-5 text-amber-400" />,
      title: "Secure Checkout & Wallet",
      desc: "Pay instantly via Binance Pay (USDT/crypto), JazzCash, EasyPaisa, or direct deposit with automatic real-time transaction verification."
    },
    {
      step: "03",
      icon: <KeyRound className="w-5 h-5 text-cyan-400" />,
      title: "Instant Digital Key Vault",
      desc: "Your product serial keys, login credentials, and tax invoices are synced directly to your secure user account dashboard for lifetime access."
    }
  ];

  const authFeatures = [
    {
      title: "Instant Digital Key & License Binding",
      desc: "Linking your purchases to your verified Google account ensures that only you can view and redeem your digital activation keys, serial codes, and download links."
    },
    {
      title: "AleePay Wallet & Fund Protection",
      desc: "Your account credentials protect your deposited wallet balance, cashback reward credits, and referral earnings from unauthorized third-party access."
    },
    {
      title: "Real-Time Order Synchronization",
      desc: "Track pending software deployments, view live delivery statuses, and download invoice receipts securely across all your desktop and mobile devices."
    },
    {
      title: "Strict Data Minimization Guarantee",
      desc: "We strictly request only basic profile identity (email address, display name, and profile picture). AleePay NEVER requests access to your Gmail messages, Google Drive files, or Google Contacts."
    }
  ];

  return (
    <section id="about-aleepay" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#0a0d14] via-slate-950 to-[#0a0d14] border-y border-slate-800/80 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Application Overview &amp; Purpose</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400">AleePay</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            <strong>AleePay</strong> is an all-in-one digital goods marketplace, software license exchange, and multi-rail payment ecosystem developed and operated by <strong>Waleed Khan Afridi Digital Agency</strong>. Built to provide gamers, creators, and business clients with verified digital licenses, AI tools, and bespoke web engineering solutions with instant delivery and escrow security.
          </p>
        </div>

        {/* Navigation Tabs for Easy Deep-Dive */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Core Services</span>
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'workflow'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>How AleePay Works</span>
            </button>
            <button
              onClick={() => setActiveTab('oauth')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'oauth'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Why Google Sign-In</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security &amp; Compliance</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Core Services Overview */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in space-y-8 mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {corePillars.map((pillar) => (
                <div 
                  key={pillar.id}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                        {pillar.icon}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="text-white block">Instant Digital Delivery</strong>
                  <span className="text-slate-400">Keys and licenses available within seconds of payment.</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="text-white block">100% Escrow Protection</strong>
                  <span className="text-slate-400">30-day replacement warranty on all software licenses.</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Wallet className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="text-white block">Multi-Currency Wallet</strong>
                  <span className="text-slate-400">Fund your balance with USDT crypto or local bank rails.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Workflow & How AleePay Works */}
        {activeTab === 'workflow' && (
          <div className="animate-fade-in mb-14">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl mb-8">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h3 className="text-xl font-extrabold text-white mb-2">How Does AleePay Work?</h3>
                <p className="text-xs text-slate-400">Simple, 3-step streamlined process for purchasing digital goods and managing licenses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {workflowSteps.map((step, idx) => (
                  <div key={idx} className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          {step.icon}
                        </div>
                        <span className="font-mono text-2xl font-black text-slate-800 select-none">
                          {step.step}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Google Sign-In & Authentication Purpose */}
        {activeTab === 'oauth' && (
          <div className="animate-fade-in mb-14">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/40 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Lock className="w-4 h-4" />
                    <span>OAuth Verification &amp; Account Integrity</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Why AleePay Requires User Authentication
                  </h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Google Verified Application: AleePay</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {authFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Scope Disclosures */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Privacy Commitment:</strong> We only access standard <code className="text-cyan-300 font-mono">email</code> and <code className="text-cyan-300 font-mono">profile</code> identity data for software key delivery.
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link to="/privacypolicy" className="text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                    <span>Privacy Policy</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <span>•</span>
                  <Link to="/tos" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">
                    <span>Terms of Service</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Escrow Protection */}
        {activeTab === 'security' && (
          <div className="animate-fade-in mb-14">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 shadow-2xl">
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">AleePay Security &amp; Guarantee</h3>
                <p className="text-xs text-slate-400">Complete buyer protection and certified digital license authenticity.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400 font-mono mb-1">100%</div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Genuine Key Guarantee</h4>
                  <p className="text-[11px] text-slate-400">All digital keys sourced directly from authorized publishers &amp; distributors.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-2xl font-black text-cyan-400 font-mono mb-1">30 Days</div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Replacement Warranty</h4>
                  <p className="text-[11px] text-slate-400">Instant key exchange or balance refund if any license activation error occurs.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-2xl font-black text-amber-400 font-mono mb-1">24/7</div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Human WhatsApp Support</h4>
                  <p className="text-[11px] text-slate-400">Dedicated support engineering team ready to assist via WhatsApp &amp; live ticket.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operator & Merchant Transparency Bar */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-cyan-500 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-white text-base">
                AP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-extrabold text-white">AleePay</h4>
                <span className="text-xs text-slate-400">by Waleed Khan Afridi Digital Agency</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Official Commercial Web App: <a href="https://waleedkhanafridi.online" className="text-cyan-400 underline">waleedkhanafridi.online</a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <Link
              to="/tos"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Terms of Service (/tos)</span>
            </Link>
            <Link
              to="/privacypolicy"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Privacy Policy</span>
            </Link>
            <a
              href="https://wa.me/923416860077"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
