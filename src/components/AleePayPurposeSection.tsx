import React from 'react';
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
  Database
} from 'lucide-react';
import { motion } from 'motion/react';

export const AleePayPurposeSection: React.FC = () => {
  const corePillars = [
    {
      icon: <Gamepad2 className="w-6 h-6 text-red-500" />,
      badge: "Marketplace",
      title: "Digital Gaming & Software Keys",
      description: "Instant delivery of authentic gaming CD keys, Steam passes, in-game assets, and productivity software licenses with 30-day replacement warranty."
    },
    {
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      badge: "AI Pro",
      title: "AI Subscriptions & Tool Licenses",
      description: "Verified access to cutting-edge AI subscriptions including Super Grok, Claude 3.5 Sonnet / Max, and API credit tokens for developers."
    },
    {
      icon: <Wallet className="w-6 h-6 text-emerald-400" />,
      badge: "Payments",
      title: "Multi-Rail AleePay Wallet",
      description: "Seamless multi-currency digital checkout supporting Binance Pay (USDT/crypto), JazzCash, EasyPaisa, and direct bank transfers."
    },
    {
      icon: <Code2 className="w-6 h-6 text-amber-400" />,
      badge: "Engineering",
      title: "Custom Full-Stack Web Services",
      description: "Bespoke web application development, custom React/Next.js platforms, WordPress e-commerce stores, and technical SEO optimization."
    }
  ];

  const authFeatures = [
    {
      title: "Order & License Synchronization",
      desc: "Instantly link your purchased gaming keys, AI subscription logins, and software serial numbers to your verified Google account."
    },
    {
      title: "Secure Digital Asset Vault",
      desc: "Access and re-download your activated software licenses, invoice receipts, and project milestones anytime from your personal dashboard."
    },
    {
      title: "AleePay Wallet & Balance Protection",
      desc: "Safely maintain wallet deposits, earn cashback credits, and manage referral earnings linked to your unique user identity."
    },
    {
      title: "Strict Data Minimization Policy",
      desc: "AleePay only requests standard basic profile information (email, display name, and avatar). We never request or access your private Google Drive, Gmail, or contacts."
    }
  ];

  return (
    <section id="about-aleepay" className="relative py-16 lg:py-24 bg-gradient-to-b from-[#0b0e14] via-slate-950 to-[#0b0e14] border-y border-slate-800/80 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Purpose Statement */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Overview &amp; Mission</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400">AleePay</span>?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            <strong>AleePay</strong> is a unified digital services marketplace, software license exchange, and instant payment platform developed and operated by <strong>Waleed Khan Afridi Digital Agency</strong>. Our mission is to provide global consumers and developers with fast, transparent, and secure access to digital goods, AI subscriptions, gaming assets, and custom software engineering.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {corePillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800/90 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                    {pillar.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Authentication & User Data Transparency Box (For Google OAuth Verification Compliance) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 shadow-2xl mb-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Lock className="w-4 h-4" />
                <span>Account Authentication &amp; OAuth Transparency</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Why AleePay Uses Google Sign-In
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verified App: AleePay</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {authFeatures.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
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

          {/* Scope Transparency Footnote */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Privacy Promise:</strong> We only request minimal identity info (<code className="text-cyan-300 font-mono">email, profile</code>) required for license delivery.
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

        {/* Operator & Merchant Transparency Bar */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
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
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Terms of Service (/tos)</span>
            </Link>
            <Link
              to="/privacypolicy"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold transition-colors flex items-center gap-1.5"
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
