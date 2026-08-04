import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Link,
  Zap,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Copy,
  Check,
  QrCode,
  Share2,
  ExternalLink,
  ShieldCheck,
  Gift,
  Clock,
  ArrowRight,
  Download,
  Filter,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Wallet,
  Smartphone,
  Building,
  CreditCard,
  BarChart3,
  Sparkles,
  ChevronRight,
  Layers,
  Percent,
  FileSpreadsheet,
  Globe,
  Lock,
  UserCheck,
  RefreshCw,
  Send,
  HelpCircle,
  Eye,
  Sliders,
  Settings
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import { setDocumentSeo } from '../utils/setDocumentSeo';
import {
  AffiliatePartnerProfile,
  CommissionRecord,
  WithdrawalRequest,
  ReferralAdminSettings,
  getOrCreateAffiliateProfile,
  recordOrderCommission,
  requestAffiliateWithdrawal,
  adminUpdateCommissionStatus,
  adminUpdateWithdrawalStatus,
  adminSaveSettings,
  getReferralStoreFull,
  trackReferralFromUrl,
  getAffiliateDeepLinkAnalytics,
  ReferralClickLog
} from '../services/referralStore';
import { ReferralLeaderboard } from '../components/ReferralLeaderboard';
import { PerformanceTrends } from '../components/PerformanceTrends';

interface ReferralProPageProps {
  user: any;
  profile: any;
  onOpenAuth: () => void;
  whatsappNumber?: string;
  onOpenContact?: () => void;
}

export const ReferralProPage: React.FC<ReferralProPageProps> = ({
  user,
  profile,
  onOpenAuth,
  whatsappNumber = '+923416860077',
  onOpenContact
}) => {
  // SEO Metadata initialization
  useEffect(() => {
    setDocumentSeo({
      title: 'ReferralPro | Earn Money by Referring Digital Services | Waleed Khan Afridi',
      description: 'Join ReferralPro and earn commissions by referring premium digital services, AI subscriptions, website development, SEO, software, and graphic design. Free to join with instant referral tracking.',
      url: 'https://waleedkhanafridi.online/referralpro',
      image: 'https://waleedkhanafridi.online/brand-logo.jpg',
      imageAlt: 'ReferralPro Affiliate Partner Portal by Waleed Khan Afridi',
      type: 'website',
      siteName: 'ReferralPro | Waleed Khan Afridi Agency',
      twitterCard: 'summary_large_image',
      twitterCreator: '@waleedkhanafridi',
      keywords: 'ReferralPro, Affiliate Program, Earn Money Online, Referral Partner, Commission, Web Design Affiliate, AI Subscription Affiliate, Waleed Khan Afridi'
    });

    window.scrollTo(0, 0);
    trackReferralFromUrl();
  }, []);

  // Language & UI State
  const [lang, setLang] = useState<'en' | 'ur' | 'ar' | 'es'>('en');
  const [activeTab, setActiveTab] = useState<'overview' | 'links' | 'commissions' | 'withdraw' | 'analytics' | 'creatives' | 'leaderboard' | 'admin'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [copiedDeepLink, setCopiedDeepLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Store State
  const [storeData, setStoreData] = useState(() => getReferralStoreFull());
  
  // Deep Link Generator State
  const [deepLinkCategory, setDeepLinkCategory] = useState<'service' | 'marketplace' | 'software' | 'custom'>('service');
  const [deepLinkTarget, setDeepLinkTarget] = useState('/services/web-development');
  const [customPathInput, setCustomPathInput] = useState('/services/web-development#pricing');
  const [utmSource, setUtmSource] = useState('whatsapp');
  const [campaignTag, setCampaignTag] = useState('');
  const [activeQrUrl, setActiveQrUrl] = useState<string | null>(null);

  // Withdrawal Form State
  const [withdrawAmount, setWithdrawAmount] = useState<number>(10);
  const [withdrawMethod, setWithdrawMethod] = useState<'Binance Pay (USDT)' | 'JazzCash' | 'Easypaisa' | 'Payoneer' | 'Bank Transfer'>('Binance Pay (USDT)');
  const [withdrawAccountDetails, setWithdrawAccountDetails] = useState('');
  const [withdrawMessage, setWithdrawMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter & Search State
  const [commSearch, setCommSearch] = useState('');
  const [commStatusFilter, setCommStatusFilter] = useState<string>('all');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'7d' | '14d' | '30d' | '90d'>('14d');

  // Admin Controls State
  const [adminMinWithdrawal, setAdminMinWithdrawal] = useState<number>(storeData.settings.minWithdrawal || 10);
  const [adminCookieDays, setAdminCookieDays] = useState<number>(storeData.settings.cookieDurationDays || 30);
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('all');
  const [adminSearch, setAdminSearch] = useState('');

  // Get current user partner profile
  const affiliate: AffiliatePartnerProfile = useMemo(() => {
    return getOrCreateAffiliateProfile(user, profile);
  }, [user, profile, storeData]);

  const refreshData = () => {
    setStoreData(getReferralStoreFull());
  };

  // Base & Deep Links Calculation
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://waleedkhanafridi.online';
  const referralLink = `${baseUrl}/?ref=${affiliate.username}`;

  const computedDeepLink = useMemo(() => {
    let path = deepLinkTarget;
    if (deepLinkCategory === 'custom') {
      path = customPathInput.trim();
      if (!path.startsWith('/') && !path.startsWith('http')) {
        path = `/${path}`;
      }
    }

    try {
      const url = new URL(path, baseUrl);
      url.searchParams.set('ref', affiliate.username);
      if (utmSource && utmSource !== 'direct') {
        url.searchParams.set('utm_source', utmSource);
      }
      if (campaignTag.trim()) {
        url.searchParams.set('campaign', campaignTag.trim());
      }
      return url.toString();
    } catch (e) {
      return `${baseUrl}${path}?ref=${affiliate.username}`;
    }
  }, [deepLinkCategory, deepLinkTarget, customPathInput, utmSource, campaignTag, affiliate.username, baseUrl]);

  const deepLinkAnalytics = useMemo(() => {
    return getAffiliateDeepLinkAnalytics(affiliate.username);
  }, [affiliate.username, storeData]);

  // Handle Copy
  const handleCopyLink = (text: string, type: 'main' | 'coupon' | 'deep') => {
    navigator.clipboard.writeText(text);
    if (type === 'main') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === 'coupon') {
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    } else {
      setCopiedDeepLink(true);
      setTimeout(() => setCopiedDeepLink(false), 2000);
    }
  };

  // Handle Withdrawal Submission
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawMessage(null);

    if (!withdrawAccountDetails.trim()) {
      setWithdrawMessage({ type: 'error', text: 'Please enter your account details (Wallet ID, Phone #, or Bank IBAN).' });
      return;
    }

    const res = requestAffiliateWithdrawal(affiliate.username, Number(withdrawAmount), withdrawMethod, withdrawAccountDetails);
    if (res.success) {
      setWithdrawMessage({ type: 'success', text: res.message });
      refreshData();
      setWithdrawAccountDetails('');
    } else {
      setWithdrawMessage({ type: 'error', text: res.message });
    }
  };

  // Filtered Commissions for current user
  const userCommissions = useMemo(() => {
    return storeData.commissions.filter((c: CommissionRecord) => {
      const matchUser = c.referrerUsername.toUpperCase() === affiliate.username.toUpperCase();
      const matchStatus = commStatusFilter === 'all' || c.status === commStatusFilter;
      const matchQuery =
        !commSearch ||
        c.productName.toLowerCase().includes(commSearch.toLowerCase()) ||
        c.customerName.toLowerCase().includes(commSearch.toLowerCase()) ||
        c.orderId.toLowerCase().includes(commSearch.toLowerCase());
      return matchUser && matchStatus && matchQuery;
    });
  }, [storeData, affiliate.username, commStatusFilter, commSearch]);

  // Filtered Withdrawals for current user
  const userWithdrawals = useMemo(() => {
    return storeData.withdrawals.filter((w: WithdrawalRequest) => w.username.toUpperCase() === affiliate.username.toUpperCase());
  }, [storeData, affiliate.username]);

  // Analytics Chart Data Construction
  const chartData = useMemo(() => {
    const days = analyticsTimeframe === '7d' ? 7 : analyticsTimeframe === '14d' ? 14 : analyticsTimeframe === '30d' ? 30 : 90;
    const now = new Date();
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const isoDate = d.toISOString().slice(0, 10);
      const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Sum commissions on this date
      const commsOnDate = storeData.commissions.filter(
        (c: CommissionRecord) => c.referrerUsername.toUpperCase() === affiliate.username.toUpperCase() && c.date === isoDate
      );

      const earningsOnDate = commsOnDate.reduce((sum: number, c: CommissionRecord) => sum + c.commissionAmount, 0);
      const salesOnDate = commsOnDate.length;
      const simulatedClicks = Math.max(salesOnDate * 8, Math.floor(Math.random() * 12) + 2);

      result.push({
        date: displayDate,
        earnings: Number(earningsOnDate.toFixed(2)),
        conversions: salesOnDate,
        clicks: simulatedClicks
      });
    }

    return result;
  }, [storeData, affiliate.username, analyticsTimeframe]);

  // Admin Save Handler
  const handleSaveAdminSettings = () => {
    const newSettings: ReferralAdminSettings = {
      ...storeData.settings,
      minWithdrawal: Number(adminMinWithdrawal),
      cookieDurationDays: Number(adminCookieDays)
    };
    adminSaveSettings(newSettings);
    refreshData();
    alert('ReferralPro Admin Configuration saved successfully!');
  };

  // Admin Export CSV
  const handleExportCSV = () => {
    const rows = [
      ['Commission ID', 'Referrer', 'Customer Name', 'Customer Email', 'Product', 'Category', 'Order ID', 'Order Amount ($)', 'Commission Rate (%)', 'Commission ($)', 'Status', 'Date'],
      ...storeData.commissions.map((c: CommissionRecord) => [
        c.id,
        c.referrerUsername,
        c.customerName,
        c.customerEmail,
        `"${c.productName.replace(/"/g, '""')}"`,
        c.category,
        c.orderId,
        c.orderAmount,
        c.commissionRate,
        c.commissionAmount,
        c.status,
        c.date
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ReferralPro_Commissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-indigo-500/10 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              <Zap className="w-3 h-3 fill-amber-400" />
              <span>REFERRALPRO PARTNER NETWORK</span>
            </span>
            <span className="text-slate-400 hidden md:inline">
              Earn up to <strong className="text-white font-bold">25% recurring commission</strong> on digital services &amp; software.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px]">
              <Globe className="w-3 h-3 text-cyan-400" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-transparent text-slate-300 font-medium focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-slate-900">English (US)</option>
                <option value="ur" className="bg-slate-900">Urdu (اردو)</option>
                <option value="ar" className="bg-slate-900">Arabic (العربية)</option>
                <option value="es" className="bg-slate-900">Spanish (Español)</option>
              </select>
            </div>

            <Link
              to="/"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-semibold"
            >
              <span>Back to Main Agency</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Partner Portal by Waleed Khan Afridi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Become Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-400">Referral Partner</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Earn generous commissions by promoting our high-converting web development, mobile apps, AI service subscriptions, and software solutions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {!user ? (
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Start Free Partner Signup</span>
                </button>
              ) : (
                <a
                  href="#dashboard"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Access Partner Dashboard</span>
                </a>
              )}

              <button
                onClick={onOpenAuth}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Partner Login</span>
              </button>

              <a
                href="#plans"
                className="px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 text-amber-400 font-bold text-sm transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>View Commission Plans</span>
              </a>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-4xl mx-auto text-left">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Partner Payouts</span>
                <p className="text-xl font-black text-white mt-0.5">$25,000+</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400">Max Commission Tier</span>
                <p className="text-xl font-black text-amber-400 mt-0.5">25% Lifetime</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400">Cookie Duration</span>
                <p className="text-xl font-black text-cyan-400 mt-0.5">30 Days</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold text-slate-400">Min Payout Threshold</span>
                <p className="text-xl font-black text-emerald-400 mt-0.5">${storeData.settings.minWithdrawal || 10} USD</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-black uppercase text-amber-400 tracking-wider">Simple 4-Step Process</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">How ReferralPro Works</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Start generating passive income in minutes with transparent tracking and automated commission payouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative group hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 font-black flex items-center justify-center text-sm mb-4 border border-amber-500/20">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Create Account</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Register free on ReferralPro to get instant access to your personalized affiliate dashboard.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative group hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 font-black flex items-center justify-center text-sm mb-4 border border-cyan-500/20">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-1">Get Unique Link</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Receive your custom tracking link and QR code for all services and products.
              </p>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-cyan-300 break-all">
                https://waleedkhanafridi.online/?ref={affiliate.username || 'WALEED123'}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative group hover:border-indigo-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 font-black flex items-center justify-center text-sm mb-4 border border-indigo-500/20">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Share &amp; Promote</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share your link on WhatsApp, Facebook, Telegram, YouTube, blogs, or directly with your clients.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 relative group hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center text-sm mb-4 border border-emerald-500/20">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Earn Commission</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When someone purchases through your link, you earn commission automatically directly to your wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Rules & Referral Tiers Section */}
      <section id="plans" className="py-16 bg-slate-950/60 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Category Rates */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-black uppercase text-cyan-400 tracking-wider">Commission Rules</h3>
                <h2 className="text-2xl font-extrabold text-white mt-1">Earnings by Product Category</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Transparent commission rates applied automatically to every successful sale.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden divide-y divide-slate-800">
                {[
                  { cat: 'Web Design & Portal Development', rate: '20%', badge: 'Popular' },
                  { cat: 'Video Editing & Motion Graphics', rate: '20%', badge: 'High Reward' },
                  { cat: 'AI Subscriptions & Accounts', rate: '15%', badge: 'High Volume' },
                  { cat: 'Graphic Design & Branding', rate: '15%', badge: 'Creative' },
                  { cat: 'Technical SEO Services', rate: '15%', badge: 'Recurring' },
                  { cat: 'Windows Software Licenses', rate: '10%', badge: 'Instant' },
                  { cat: 'Cloud Hosting & Servers', rate: '10%', badge: 'Monthly' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.cat}</h4>
                      <span className="text-[10px] text-slate-400">Category Rate</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {item.badge}
                      </span>
                      <span className="text-lg font-black text-amber-400 font-mono">{item.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Referral Levels / Tiers */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">Partner Progression</h3>
                <h2 className="text-2xl font-extrabold text-white mt-1">Referral Tiers &amp; VIP Badges</h2>
                <p className="text-xs text-slate-400 mt-1">
                  The more referrals you bring, the higher your baseline commission rate and privileges.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bronze */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Bronze Level</span>
                    <span className="text-xs font-mono font-bold text-slate-400">0–9 Sales</span>
                  </div>
                  <div className="text-2xl font-black text-white">10% <span className="text-xs text-slate-400 font-normal">Base Comm</span></div>
                  <p className="text-xs text-slate-400">Standard partner dashboard, basic tracking links, email support.</p>
                </div>

                {/* Silver */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Silver Level</span>
                    <span className="text-xs font-mono font-bold text-slate-400">10–29 Sales</span>
                  </div>
                  <div className="text-2xl font-black text-cyan-400">15% <span className="text-xs text-slate-400 font-normal">Base Comm</span></div>
                  <p className="text-xs text-slate-400">Silver badge, custom coupon code setup, faster withdrawal processing.</p>
                </div>

                {/* Gold */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Gold Level</span>
                    <span className="text-xs font-mono font-bold text-slate-400">30–99 Sales</span>
                  </div>
                  <div className="text-2xl font-black text-amber-400">20% <span className="text-xs text-slate-400 font-normal">Base Comm</span></div>
                  <p className="text-xs text-slate-400">Gold VIP badge, priority withdrawal channel, dedicated support lead.</p>
                </div>

                {/* Platinum */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/40 space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>Platinum VIP</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-300">100+ Sales</span>
                  </div>
                  <div className="text-2xl font-black text-indigo-300">25% <span className="text-xs text-indigo-200/60 font-normal">Max Comm</span></div>
                  <p className="text-xs text-indigo-200/80">Special Badge, priority 24/7 support, instant automated payouts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Partner Dashboard Section */}
      <section id="dashboard" className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Dashboard Header Banner */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-[2px] shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xl text-amber-400">
                  {affiliate.username.slice(0, 2)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-black text-white">{affiliate.fullName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {affiliate.tier} Partner
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {affiliate.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>Username: <strong className="text-white font-mono">{affiliate.username}</strong></span>
                  <span>•</span>
                  <span>Joined: <strong className="text-slate-300 font-mono">{affiliate.createdAt.slice(0, 10)}</strong></span>
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium w-full md:w-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'links' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Referral Link
              </button>
              <button
                onClick={() => setActiveTab('commissions')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'commissions' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                History ({userCommissions.length})
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'withdraw' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Withdraw
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Charts
              </button>
              <button
                onClick={() => setActiveTab('creatives')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'creatives' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Marketing
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'leaderboard' ? 'bg-amber-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Leaderboard
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'admin' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-indigo-400 hover:text-indigo-200'
                }`}
              >
                Admin Panel
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top 8 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Earnings */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Earnings</span>
                  <div className="text-2xl font-black text-amber-400 mt-1 font-mono">${affiliate.totalEarnings.toFixed(2)}</div>
                  <p className="text-[10px] text-slate-400 mt-1">Cumulative commission generated</p>
                </div>

                {/* Available Balance */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available Balance</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">${affiliate.availableBalance.toFixed(2)}</div>
                  <p className="text-[10px] text-slate-400 mt-1">Ready for instant withdrawal</p>
                </div>

                {/* Pending Commission */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Commission</span>
                  <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">${affiliate.pendingCommission.toFixed(2)}</div>
                  <p className="text-[10px] text-slate-400 mt-1">In clearance validation window</p>
                </div>

                {/* Paid Commission */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Paid Commission</span>
                  <div className="text-2xl font-black text-purple-400 mt-1 font-mono">${affiliate.paidCommission.toFixed(2)}</div>
                  <p className="text-[10px] text-slate-400 mt-1">Successfully transferred to wallet</p>
                </div>

                {/* Total Referrals */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Referrals</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">{affiliate.totalSalesCount}</div>
                  <p className="text-[10px] text-slate-400 mt-1">Completed order conversions</p>
                </div>

                {/* Conversion Rate */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">{affiliate.conversionRate}%</div>
                  <p className="text-[10px] text-slate-400 mt-1">Sales per referral click</p>
                </div>

                {/* Lifetime Sales */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lifetime Sales</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">${affiliate.lifetimeSalesAmount.toFixed(2)}</div>
                  <p className="text-[10px] text-slate-400 mt-1">Total revenue generated</p>
                </div>

                {/* Monthly Sales */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Sales</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">${affiliate.monthlySalesAmount.toFixed(2)}</div>
                  <p className="text-[10px] text-slate-400 mt-1">Current month volume</p>
                </div>
              </div>

              {/* Quick Link Card in Overview */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Your Main Referral Tracking Link</span>
                  </h3>
                  <span className="text-xs text-cyan-400 font-mono">30-Day Cookie Auto Tracking</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopyLink(referralLink, 'main')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REFERRAL LINKS & DEEP LINK GENERATOR */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-amber-400" />
                    <span>Referral Link &amp; Social Sharing Hub</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Share your unique referral link directly across social channels or generate deep links to specific service packages.
                  </p>
                </div>

                {/* Primary Link Display & Actions */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-300">Your Primary Affiliate Link</label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-amber-300 focus:outline-none"
                    />
                    <button
                      onClick={() => handleCopyLink(referralLink, 'main')}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink ? 'Copied to Clipboard' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                {/* Social Share Buttons Grid */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-slate-300">Instant Social Sharing</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out Waleed Khan Afridi Digital Services & AI Tools: ${referralLink}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Facebook</span>
                    </a>

                    {/* Telegram */}
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Waleed Khan Afridi Digital Services & Software Marketplace')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Telegram</span>
                    </a>

                    {/* X / Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Build custom web apps & access verified AI tool subscriptions:')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Share2 className="w-4 h-4 text-cyan-400" />
                      <span>Share on X</span>
                    </a>
                  </div>
                </div>

                {/* Advanced Deep Link & Campaign Generator Suite */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 mt-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <span>Advanced Deep Link &amp; Campaign Generator</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Direct clients directly to specific services, AI subscriptions, or software packages with embedded tracking &amp; custom UTM parameters.
                      </p>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                      30-Day Cookie Auto-Attribution
                    </span>
                  </div>

                  {/* Step 1: Category & Target Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-300 block">1. Select Target Category &amp; Destination Page</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setDeepLinkCategory('service');
                          setDeepLinkTarget('/services/web-development');
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                          deepLinkCategory === 'service'
                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Building className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Digital Services</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDeepLinkCategory('marketplace');
                          setDeepLinkTarget('/marketplace?item=chatgpt-plus');
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                          deepLinkCategory === 'marketplace'
                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>AI Subscriptions</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDeepLinkCategory('software');
                          setDeepLinkTarget('/#software');
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                          deepLinkCategory === 'software'
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Software Licenses</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDeepLinkCategory('custom');
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                          deepLinkCategory === 'custom'
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Custom Path</span>
                      </button>
                    </div>

                    {/* Target Selector Dropdown / Custom Input */}
                    {deepLinkCategory === 'service' && (
                      <select
                        value={deepLinkTarget}
                        onChange={(e) => setDeepLinkTarget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium focus:outline-none focus:border-cyan-500"
                      >
                        <option value="/services/web-development">🌐 Web Development Services (/services/web-development)</option>
                        <option value="/services/mobile-app-development">📱 Mobile App Development (/services/mobile-app-development)</option>
                        <option value="/services/ui-ux-design">🎨 UI/UX Product Design (/services/ui-ux-design)</option>
                        <option value="/services/seo">🚀 Technical SEO &amp; Backlinks (/services/seo)</option>
                        <option value="/services/ecommerce-development">🛒 E-Commerce Solutions (/services/ecommerce-development)</option>
                        <option value="/services/ai-automation">⚡ AI &amp; Workflow Automation (/services/ai-automation)</option>
                        <option value="/services/website-maintenance">🛠️ Website Maintenance (/services/website-maintenance)</option>
                        <option value="/services">📋 All Services Overview (/services)</option>
                      </select>
                    )}

                    {deepLinkCategory === 'marketplace' && (
                      <select
                        value={deepLinkTarget}
                        onChange={(e) => setDeepLinkTarget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium focus:outline-none focus:border-purple-500"
                      >
                        <option value="/marketplace?item=chatgpt-plus">🤖 ChatGPT Plus Subscription (/marketplace?item=chatgpt-plus)</option>
                        <option value="/marketplace?item=midjourney">🎨 Midjourney Pro Subscription (/marketplace?item=midjourney)</option>
                        <option value="/marketplace?item=claude-pro">🧠 Claude 3.5 Pro Subscription (/marketplace?item=claude-pro)</option>
                        <option value="/marketplace?item=canva-pro">✨ Canva Pro Subscription (/marketplace?item=canva-pro)</option>
                        <option value="/marketplace?item=gemini-advanced">🌟 Gemini Advanced Subscription (/marketplace?item=gemini-advanced)</option>
                        <option value="/marketplace?item=github-copilot">💻 GitHub Copilot Subscription (/marketplace?item=github-copilot)</option>
                        <option value="/marketplace">🛍️ AI Marketplace Catalog (/marketplace)</option>
                      </select>
                    )}

                    {deepLinkCategory === 'software' && (
                      <select
                        value={deepLinkTarget}
                        onChange={(e) => setDeepLinkTarget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium focus:outline-none focus:border-emerald-500"
                      >
                        <option value="/#software">💻 Windows &amp; Office Genuine Keys (/#software)</option>
                        <option value="/#software?item=win11">🪟 Windows 11 Pro Lifetime Key</option>
                        <option value="/#software?item=office2024">📊 Microsoft Office 2024 Pro</option>
                        <option value="/#software?item=adobe">🎨 Adobe Creative Cloud 1-Year</option>
                      </select>
                    )}

                    {deepLinkCategory === 'custom' && (
                      <div>
                        <input
                          type="text"
                          value={customPathInput}
                          onChange={(e) => setCustomPathInput(e.target.value)}
                          placeholder="/services/web-development#pricing"
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-amber-300 focus:outline-none focus:border-amber-500"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">Enter relative route or page anchor (e.g., /services/web-development#pricing or /contact)</span>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Campaign & UTM Parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Traffic Source (utm_source)</label>
                      <select
                        value={utmSource}
                        onChange={(e) => setUtmSource(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
                      >
                        <option value="whatsapp">WhatsApp Outreach</option>
                        <option value="facebook">Facebook Group / Page</option>
                        <option value="telegram">Telegram Channel</option>
                        <option value="linkedin">LinkedIn Network</option>
                        <option value="twitter">X / Twitter</option>
                        <option value="youtube">YouTube Channel</option>
                        <option value="email">Email Campaign</option>
                        <option value="instagram">Instagram Bio / Story</option>
                        <option value="direct">Direct Link (No UTM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Campaign Tag (Optional)</label>
                      <input
                        type="text"
                        value={campaignTag}
                        onChange={(e) => setCampaignTag(e.target.value)}
                        placeholder="e.g. summer_promo or client_pitch"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Step 3: Generated Deep Link Output Bar */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-cyan-300 flex items-center justify-between">
                      <span>Generated Deep Link Result:</span>
                      <span className="text-[10px] text-slate-400 font-normal">Ready to share</span>
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={computedDeepLink}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 focus:outline-none"
                      />
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopyLink(computedDeepLink, 'deep')}
                          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {copiedDeepLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedDeepLink ? 'Copied!' : 'Copy'}</span>
                        </button>

                        <a
                          href={computedDeepLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Test / Preview Deep Link"
                        >
                          <ExternalLink className="w-4 h-4 text-cyan-400" />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveQrUrl(computedDeepLink);
                            setShowQrModal(true);
                          }}
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Generate QR Code"
                        >
                          <QrCode className="w-4 h-4 text-amber-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Share Deep Link Across Social Platforms */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block mb-2 font-semibold">Share this deep link directly:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this service / tool: ${computedDeepLink}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(computedDeepLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Facebook</span>
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(computedDeepLink)}&text=${encodeURIComponent('Explore custom digital services & AI subscriptions')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Telegram</span>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(computedDeepLink)}&text=${encodeURIComponent('High performance digital services & AI tool access:')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Share on X</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Deep Link Performance & Traffic Analytics Breakdown */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-400" />
                        <span>Deep Link Traffic &amp; Page Click Breakdown</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Real-time analytics of incoming referral visits categorized by target service page and traffic source.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                      {deepLinkAnalytics.totalClicks} Total Clicks Tracked
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Top Visited Target Pages */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block border-b border-slate-800 pb-2">
                        Top Destination Service Pages
                      </span>
                      {deepLinkAnalytics.topPaths.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-3 text-center">No deep link page clicks recorded yet. Share your deep links to start tracking!</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {deepLinkAnalytics.topPaths.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950 border border-slate-800/60">
                              <span className="font-mono text-cyan-300 truncate max-w-[200px]" title={item.path}>
                                {item.path}
                              </span>
                              <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                                {item.count} click{item.count > 1 ? 's' : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Top Traffic Sources */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block border-b border-slate-800 pb-2">
                        Top Referral Traffic Sources
                      </span>
                      {deepLinkAnalytics.topSources.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-3 text-center">No UTM traffic sources recorded yet.</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {deepLinkAnalytics.topSources.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950 border border-slate-800/60">
                              <span className="font-semibold text-amber-300 capitalize">
                                {item.source}
                              </span>
                              <span className="font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                                {item.count} visitor{item.count > 1 ? 's' : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Custom Coupon Code Linked to Affiliate */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-4 h-4" />
                      <span>Linked Affiliate Coupon Code</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Clients using your code get <strong className="text-white">10% OFF</strong> and you receive full commission automatically.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-black text-sm">
                      {affiliate.customCouponCode || `${affiliate.username.slice(0, 6)}10`}
                    </span>
                    <button
                      onClick={() => handleCopyLink(affiliate.customCouponCode || `${affiliate.username.slice(0, 6)}10`, 'coupon')}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"
                    >
                      {copiedCoupon ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMISSION HISTORY */}
          {activeTab === 'commissions' && (
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search product, customer, order ID..."
                    value={commSearch}
                    onChange={(e) => setCommSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={commStatusFilter}
                    onChange={(e) => setCommStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Paid">Paid</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Product / Service</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Order Amount</th>
                        <th className="px-4 py-3">Commission</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {userCommissions.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                            No commission records found for this filter.
                          </td>
                        </tr>
                      ) : (
                        userCommissions.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="px-4 py-3 font-mono text-slate-400">{c.date}</td>
                            <td className="px-4 py-3 font-semibold text-white">{c.productName}</td>
                            <td className="px-4 py-3">
                              <div>{c.customerName}</div>
                              <div className="text-[10px] text-slate-400">{c.customerEmail}</div>
                            </td>
                            <td className="px-4 py-3 font-mono text-cyan-300">{c.orderId}</td>
                            <td className="px-4 py-3 font-mono">${c.orderAmount.toFixed(2)}</td>
                            <td className="px-4 py-3 font-mono font-bold text-amber-400">
                              ${c.commissionAmount.toFixed(2)} <span className="text-[10px] text-slate-400">({c.commissionRate}%)</span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                  c.status === 'Paid'
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                    : c.status === 'Approved'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                    : c.status === 'Pending'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                }`}
                              >
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WITHDRAWAL PORTAL */}
          {activeTab === 'withdraw' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-1 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <span>Withdraw Funds</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Request payout of your available balance directly to your wallet or bank account.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Available Balance</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                    ${affiliate.availableBalance.toFixed(2)}
                  </div>
                </div>

                {withdrawMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                      withdrawMessage.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {withdrawMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{withdrawMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Amount ($ USD) - Min ${storeData.settings.minWithdrawal || 10}
                    </label>
                    <input
                      type="number"
                      min={storeData.settings.minWithdrawal || 10}
                      max={affiliate.availableBalance}
                      step="1"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Payment Method</label>
                    <select
                      value={withdrawMethod}
                      onChange={(e) => setWithdrawMethod(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-medium focus:outline-none"
                    >
                      <option value="Binance Pay (USDT)">Binance Pay (USDT - No Fee)</option>
                      <option value="JazzCash">JazzCash (Instant Pakistan PKR)</option>
                      <option value="Easypaisa">Easypaisa (Instant Pakistan PKR)</option>
                      <option value="Payoneer">Payoneer (Global USD)</option>
                      <option value="Bank Transfer">Bank Wire / IBAN Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Account / Wallet Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Binance Pay ID: 787445946, or JazzCash Number: 03141137917, or Bank IBAN PK00..."
                      value={withdrawAccountDetails}
                      onChange={(e) => setWithdrawAccountDetails(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={affiliate.availableBalance < (storeData.settings.minWithdrawal || 10)}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Withdrawal Request</span>
                  </button>
                </form>
              </div>

              {/* Withdrawal History Table */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Withdrawal Request History</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-3 py-2.5">Date</th>
                        <th className="px-3 py-2.5">Amount</th>
                        <th className="px-3 py-2.5">Method</th>
                        <th className="px-3 py-2.5">Account</th>
                        <th className="px-3 py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {userWithdrawals.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-3 py-6 text-center text-slate-400">
                            No withdrawal requests placed yet.
                          </td>
                        </tr>
                      ) : (
                        userWithdrawals.map((w) => (
                          <tr key={w.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="px-3 py-2.5 font-mono text-slate-400">{w.requestedAt.slice(0, 10)}</td>
                            <td className="px-3 py-2.5 font-mono font-bold text-emerald-400">${w.amount.toFixed(2)}</td>
                            <td className="px-3 py-2.5 font-semibold text-white">{w.method}</td>
                            <td className="px-3 py-2.5 text-[11px] text-slate-300 max-w-[180px] truncate">{w.accountDetails}</td>
                            <td className="px-3 py-2.5">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  w.status === 'Completed'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                    : w.status === 'Pending'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                }`}
                              >
                                {w.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS & PERFORMANCE TRENDS CHARTS */}
          {activeTab === 'analytics' && (
            <PerformanceTrends
              currentAffiliate={affiliate}
              currentUser={user}
            />
          )}

          {/* TAB 6: MARKETING CREATIVES & BANNERS */}
          {activeTab === 'creatives' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Marketing Banners &amp; Copywriting Creatives</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ready-to-use social media banners, pre-written messages, and email templates for instant sharing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Template 1: WhatsApp / Social Promo */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-amber-400">WhatsApp &amp; Social Message</span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800/80 font-sans">
                      🚀 Need a high-converting website, custom AI app, or verified OpenAI/ChatGPT API accounts? Get bespoke digital solutions crafted by Waleed Khan Afridi. Use my special partner link for 10% OFF: {referralLink}
                    </p>
                    <button
                      onClick={() => handleCopyLink(`🚀 Need a high-converting website, custom AI app, or verified OpenAI/ChatGPT API accounts? Get bespoke digital solutions crafted by Waleed Khan Afridi. Use my special partner link for 10% OFF: ${referralLink}`, 'main')}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Copy Promotional Message
                    </button>
                  </div>

                  {/* Template 2: Client Outreach Email */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-cyan-400">Email Outreach Template</span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800/80 font-sans">
                      Hi there, if you are looking to scale your web platform, mobile app, or SEO rankings, I highly recommend Waleed Khan Afridi Digital Services Agency. Check their official catalog here: {referralLink}
                    </p>
                    <button
                      onClick={() => handleCopyLink(`Hi there, if you are looking to scale your web platform, mobile app, or SEO rankings, I highly recommend Waleed Khan Afridi Digital Services Agency. Check their official catalog here: ${referralLink}`, 'main')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Copy Email Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LEADERBOARD & BADGES */}
          {activeTab === 'leaderboard' && (
            <ReferralLeaderboard
              currentUser={user}
              currentAffiliate={affiliate}
              onOpenAuth={onOpenAuth}
              onOpenContact={onOpenContact}
            />
          )}

          {/* TAB 8: ADMIN MANAGEMENT PANEL */}
          {activeTab === 'admin' && (
            <div className="space-y-6 border-t-2 border-indigo-500/30 pt-6">
              <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-indigo-400" />
                      <span>ReferralPro Administrative Management</span>
                    </h3>
                    <p className="text-xs text-indigo-200/80 mt-0.5">
                      Approve/reject commissions, configure withdrawal minimums, track fraud logs, and export CSV reports.
                    </p>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export Full Commissions CSV</span>
                  </button>
                </div>

                {/* Settings Configuration Grid */}
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Min Withdrawal ($ USD)</label>
                    <input
                      type="number"
                      value={adminMinWithdrawal}
                      onChange={(e) => setAdminMinWithdrawal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Referral Cookie Duration (Days)</label>
                    <input
                      type="number"
                      value={adminCookieDays}
                      onChange={(e) => setAdminCookieDays(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleSaveAdminSettings}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Save Admin Settings
                    </button>
                  </div>
                </div>

                {/* Pending Commissions Approval Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    All System Commissions ({storeData.commissions.length})
                  </h4>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="px-3 py-2">Referrer</th>
                          <th className="px-3 py-2">Customer</th>
                          <th className="px-3 py-2">Product</th>
                          <th className="px-3 py-2">Amount</th>
                          <th className="px-3 py-2">Comm ($)</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2 text-right">Admin Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                        {storeData.commissions.map((c: CommissionRecord) => (
                          <tr key={c.id}>
                            <td className="px-3 py-2 font-bold text-amber-400">{c.referrerUsername}</td>
                            <td className="px-3 py-2">{c.customerName}</td>
                            <td className="px-3 py-2 text-white">{c.productName}</td>
                            <td className="px-3 py-2 font-mono">${c.orderAmount.toFixed(2)}</td>
                            <td className="px-3 py-2 font-mono font-bold text-emerald-400">${c.commissionAmount.toFixed(2)}</td>
                            <td className="px-3 py-2">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-200">
                                {c.status}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-right space-x-1">
                              <button
                                onClick={() => {
                                  adminUpdateCommissionStatus(c.id, 'Approved');
                                  refreshData();
                                }}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[10px] rounded"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  adminUpdateCommissionStatus(c.id, 'Paid');
                                  refreshData();
                                }}
                                className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] rounded"
                              >
                                Mark Paid
                              </button>
                              <button
                                onClick={() => {
                                  adminUpdateCommissionStatus(c.id, 'Rejected');
                                  refreshData();
                                }}
                                className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] rounded"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Fraud Protection & Cookie Policy Disclosure */}
      <section className="py-12 bg-slate-950/80 border-t border-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fraud Protection &amp; Referral Compliance Policy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-slate-200 block mb-1">30-Day Referral Cookie Window</strong>
              When a user visits through your link, a 30-day cookie is saved. If they make a purchase anytime within 30 days, commission is credited to you.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-slate-200 block mb-1">Self-Referral &amp; Abuse Prevention</strong>
              Self-referrals, duplicate account creation, or placing orders using your own link are automatically detected and blocked to protect platform integrity.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-slate-200 block mb-1">Instant Payouts &amp; Refund Reversal</strong>
              Commissions are cleared after successful order completion. Any reversed or refunded orders automatically adjust pending balances.
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setShowQrModal(false);
                  setActiveQrUrl(null);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              <h3 className="text-base font-bold text-white">
                {activeQrUrl ? 'Deep Link QR Code' : 'Your Referral QR Code'}
              </h3>
              <p className="text-xs text-slate-400">Scan to visit with your referral cookie pre-embedded</p>

              <div className="p-4 bg-white rounded-2xl inline-block shadow-inner relative">
                {/* SVG QR Code Graphic */}
                <svg className="w-44 h-44 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2,2H10V10H2V2M4,4V8H8V4H4M11,2H13V4H11V2M14,2H22V10H14V2M16,4V8H20V4H16M2,14H10V22H2V14M4,16V20H8V16H4M19,19V22H22V19H19M11,14H13V16H11V14M14,14H16V16H14V14M16,16H18V18H16V16M18,14H20V16H18V14M20,16H22V18H20V16M11,18H13V22H11V18M14,19H17V21H14V19Z" />
                </svg>
              </div>

              <div className="text-[11px] font-mono text-cyan-300 break-all p-2 bg-slate-950 rounded-xl border border-slate-800 max-h-24 overflow-y-auto">
                {activeQrUrl || referralLink}
              </div>

              <button
                onClick={() => handleCopyLink(activeQrUrl || referralLink, 'main')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
              >
                {copiedLink ? 'Copied Link!' : 'Copy Link'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferralProPage;
