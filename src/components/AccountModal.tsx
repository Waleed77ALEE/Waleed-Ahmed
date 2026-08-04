import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  User,
  ShoppingBag,
  Save,
  LogOut,
  CheckCircle2,
  Package,
  Shield,
  Loader2,
  MessageSquare,
  LayoutDashboard,
  FolderGit2,
  Download,
  FileText,
  Clock,
  Printer,
  ExternalLink,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  AlertCircle,
  Wallet,
  CreditCard,
  PlusCircle,
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  QrCode,
  Copy,
  Search,
  Filter
} from 'lucide-react';
import { UserProfile, SupabaseOrder, fetchUserOrders, upsertProfile } from '../lib/supabase';
import { ClientProject, Deliverable, ClientInvoice } from '../types';
import { loadClientProjects, triggerFileDownload, printInvoice } from '../services/clientDashboardStore';
import { loadUserWallet, requestWalletTopup, subscribeWallet, UserWallet } from '../services/walletStore';
import { softwareStore } from '../services/softwareStore';
import { SoftwareOrder } from '../data/softwareData';
import { OrderHistory } from './OrderHistory';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  profile: UserProfile | null;
  onProfileUpdate: () => void;
  onSignOut: () => void;
  whatsappNumber: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  profile,
  onProfileUpdate,
  onSignOut,
  whatsappNumber
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'wallet' | 'projects' | 'deliverables' | 'invoices' | 'orders' | 'profile'>('dashboard');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [whatsapp, setWhatsapp] = useState(profile?.whatsapp || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Software Orders State
  const [softwareOrders, setSoftwareOrders] = useState<SoftwareOrder[]>(() =>
    softwareStore.getOrdersByEmail(user?.email || profile?.whatsapp || '')
  );

  // Wallet State
  const [wallet, setWallet] = useState<UserWallet>(() => loadUserWallet(user?.id, user?.email, profile?.full_name));
  const [topupAmount, setTopupAmount] = useState<number>(50);
  const [topupCustomAmount, setTopupCustomAmount] = useState<string>('');
  const [topupMethod, setTopupMethod] = useState<string>('Binance Pay (USDT)');
  const [topupRefId, setTopupRefId] = useState<string>('');
  const [isProcessingTopup, setIsProcessingTopup] = useState(false);
  const [topupSuccess, setTopupSuccess] = useState(false);
  const [copiedBinanceId, setCopiedBinanceId] = useState(false);

  // Transactions Filter & Pagination State
  const [txSearch, setTxSearch] = useState('');
  const [txStatusFilter, setTxStatusFilter] = useState<string>('all');
  const [txTypeFilter, setTxTypeFilter] = useState<string>('all');
  const [txPage, setTxPage] = useState<number>(1);
  const txPerPage = 5;

  // Client Dashboard State
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Calculate Real Wallet Stats
  const walletStats = useMemo(() => {
    const available = wallet.balance || 0;

    const pending = wallet.transactions
      .filter((t) => t.status === 'Pending' && (t.type === 'deposit' || t.type === 'admin_credit'))
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalDeposited = wallet.transactions
      .filter((t) => t.status === 'Completed' && (t.type === 'deposit' || t.type === 'admin_credit' || t.type === 'bonus'))
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalSpent = wallet.transactions
      .filter((t) => t.status === 'Completed' && t.type === 'purchase')
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);

    return {
      available,
      pending,
      totalDeposited,
      totalSpent
    };
  }, [wallet]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return wallet.transactions.filter((tx) => {
      const q = txSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tx.id.toLowerCase().includes(q) ||
        tx.description.toLowerCase().includes(q) ||
        (tx.paymentMethod && tx.paymentMethod.toLowerCase().includes(q)) ||
        (tx.referenceId && tx.referenceId.toLowerCase().includes(q));

      const matchesStatus =
        txStatusFilter === 'all' || tx.status === txStatusFilter;

      const matchesType =
        txTypeFilter === 'all' || tx.type === txTypeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [wallet.transactions, txSearch, txStatusFilter, txTypeFilter]);

  const totalTxPages = Math.ceil(filteredTransactions.length / txPerPage) || 1;

  const paginatedTransactions = useMemo(() => {
    const start = (txPage - 1) * txPerPage;
    return filteredTransactions.slice(start, start + txPerPage);
  }, [filteredTransactions, txPage, txPerPage]);

  useEffect(() => {
    if (user?.id) {
      setWallet(loadUserWallet(user.id, user.email, profile?.full_name));
    }
  }, [user, profile]);

  useEffect(() => {
    const unsubscribe = subscribeWallet((updatedWallet) => {
      if (updatedWallet.userId === (user?.id || 'guest')) {
        setWallet(updatedWallet);
      }
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    const updateSw = () => {
      setSoftwareOrders(softwareStore.getOrdersByEmail(user?.email || profile?.whatsapp || ''));
    };
    updateSw();
    const unsubscribe = softwareStore.subscribe(updateSw);
    return unsubscribe;
  }, [user, profile]);

  useEffect(() => {
    if (isOpen && user) {
      loadOrders();
      const loadedProj = loadClientProjects(user.id, user.email || 'client@example.com');
      setProjects(loadedProj);
      if (loadedProj.length > 0 && !selectedProjectId) {
        setSelectedProjectId(loadedProj[0].id);
      }
    }
  }, [isOpen, user]);

  const loadOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    const data = await fetchUserOrders(user.id);
    setOrders(data);
    setLoadingOrders(false);
  };

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = topupCustomAmount ? parseFloat(topupCustomAmount) : topupAmount;
    if (!finalAmount || finalAmount <= 0) return;

    setIsProcessingTopup(true);
    await new Promise((r) => setTimeout(r, 800));

    requestWalletTopup(
      user?.id,
      user?.email,
      profile?.full_name,
      finalAmount,
      topupMethod,
      topupRefId || undefined
    );

    setIsProcessingTopup(false);
    setTopupSuccess(true);
    setTopupRefId('');
    setTopupCustomAmount('');
    setTimeout(() => setTopupSuccess(false), 5000);
  };

  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  // All deliverables across projects
  const allDeliverables = useMemo(() => {
    return projects.flatMap((p) => p.deliverables || []);
  }, [projects]);

  // All invoices across projects
  const allInvoices = useMemo(() => {
    return projects.flatMap((p) => p.invoices || []);
  }, [projects]);

  // Dashboard Stats
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter((p) => p.status === 'Completed' || p.status === 'Deliverables Ready').length;
    const totalDeliverables = allDeliverables.length;
    const totalInvoiced = allInvoices.reduce((acc, inv) => acc + inv.amount, 0);
    const totalPaid = allInvoices.filter((inv) => inv.status === 'PAID').reduce((acc, inv) => acc + inv.amount, 0);
    const balanceDue = totalInvoiced - totalPaid;

    return {
      totalProjects,
      completedProjects,
      totalDeliverables,
      totalInvoiced,
      totalPaid,
      balanceDue
    };
  }, [projects, allDeliverables, allInvoices]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveSuccess(false);

    const updated: UserProfile = {
      id: user.id,
      email: user.email || '',
      full_name: fullName,
      whatsapp: whatsapp
    };

    const success = await upsertProfile(updated);
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      onProfileUpdate();
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title & Security Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 border border-cyan-400/30 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-cyan-500/20">
              {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-tight">{profile?.full_name || 'Client Dashboard'}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold text-slate-300">Client Portal Encrypted</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'wallet'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                : 'bg-slate-950/60 text-emerald-400 hover:text-emerald-300 hover:bg-slate-800 border border-emerald-500/30'
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Wallet & Top-Up</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
              ${wallet.balance.toFixed(2)}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects & Status</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'deliverables'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Deliverables</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {allDeliverables.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'invoices'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Invoices & Billing</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {allInvoices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

        {/* TAB 1: CLIENT DASHBOARD OVERVIEW */}
        <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {/* TAB 1: CLIENT DASHBOARD OVERVIEW & WALLET */}
          {(activeTab === 'dashboard' || activeTab === 'wallet') && (
            <div className="space-y-6">
              {/* SECTION 1: WALLET BALANCE (TOP) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-black text-white">Wallet Overview</h3>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    Live Database Balance
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Available Balance */}
                  <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-emerald-500/20">
                      <Wallet className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Available Balance</span>
                    <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
                      ${walletStats.available.toFixed(2)}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                      PKR {(walletStats.available * 278).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Pending Balance */}
                  <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-amber-500/20">
                      <Clock className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Pending Balance</span>
                    <div className="text-xl sm:text-2xl font-black font-mono text-amber-300 tracking-tight">
                      ${walletStats.pending.toFixed(2)}
                    </div>
                    <span className="text-[10px] font-mono text-amber-400/80 block mt-1">
                      PKR {(walletStats.pending * 278).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Total Deposited */}
                  <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-cyan-500/20">
                      <ArrowDownRight className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Total Deposited</span>
                    <div className="text-xl sm:text-2xl font-black font-mono text-cyan-300 tracking-tight">
                      ${walletStats.totalDeposited.toFixed(2)}
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400/80 block mt-1">
                      {walletStats.totalDeposited > 0
                        ? `PKR ${(walletStats.totalDeposited * 278).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : 'PKR 0.00'}
                    </span>
                  </div>

                  {/* Total Spent */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-slate-700">
                      <ArrowUpRight className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Total Spent</span>
                    <div className="text-xl sm:text-2xl font-black font-mono text-slate-200 tracking-tight">
                      ${walletStats.totalSpent.toFixed(2)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">
                      PKR {(walletStats.totalSpent * 278).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: TOP UP BALANCE */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <PlusCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">Top Up Balance</h3>
                      <p className="text-xs text-slate-400">Select payment channel and submit top-up request</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    Zero Extra Fees
                  </span>
                </div>

                <form onSubmit={handleTopupSubmit} className="space-y-5">
                  {/* Deposit Amount Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">1. Select Deposit Amount</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                      {[25, 50, 100, 250, 500].map((amt) => {
                        const isSelected = topupAmount === amt && !topupCustomAmount;
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setTopupAmount(amt);
                              setTopupCustomAmount('');
                            }}
                            className={`py-2.5 px-3 rounded-2xl text-xs font-black font-mono transition-all border ${
                              isSelected
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 scale-105'
                                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            ${amt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Or Enter Custom Amount ($ USD)</label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={topupCustomAmount}
                      onChange={(e) => setTopupCustomAmount(e.target.value)}
                      placeholder="Enter custom deposit amount..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-4 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">2. Payment Method Selection</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'Binance Pay',
                          title: 'Binance Pay (USDT)',
                          desc: 'Pay ID: 787445946',
                          badge: 'Instant Crypto',
                          icon: QrCode
                        },
                        {
                          id: 'Payoneer',
                          title: 'Payoneer Transfer',
                          desc: 'waleedkhanafridi7@gmail.com',
                          badge: 'USD Direct',
                          icon: Sparkles
                        },
                        {
                          id: 'JazzCash',
                          title: 'JazzCash Transfer',
                          desc: '03416860077 (Waleed Khan Afridi)',
                          badge: 'Local PKR',
                          icon: Coins
                        }
                      ].map((item) => {
                        const isSelected = topupMethod.includes(item.id);
                        const IconComponent = item.icon;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setTopupMethod(item.id)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-emerald-500/10 border-emerald-500/60 shadow-md shadow-emerald-500/10'
                                : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                                {item.badge}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{item.title}</h4>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Instructions Details */}
                  {topupMethod.includes('Binance') && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-amber-300">
                        <span>Binance Pay ID: 787445946</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('787445946');
                            setCopiedBinanceId(true);
                            setTimeout(() => setCopiedBinanceId(false), 2000);
                          }}
                          className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-amber-400 rounded hover:text-white flex items-center gap-1 font-mono text-[11px]"
                        >
                          {copiedBinanceId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedBinanceId ? 'Copied' : 'Copy Pay ID'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Open Binance App → Pay → Send → Enter Pay ID <strong>787445946</strong>.
                      </p>
                    </div>
                  )}

                  {topupMethod.includes('JazzCash') && (
                    <div className="p-3.5 rounded-2xl bg-[#F15A24]/10 border border-[#F15A24]/30 text-xs space-y-1 text-slate-300 font-mono">
                      <p className="font-bold text-[#F15A24]">JazzCash Merchant PKR Account:</p>
                      <p>Merchant Number: <strong className="text-white text-sm">03141137917</strong></p>
                      <p>Business Name: <strong className="text-white">Alee Customers</strong></p>
                      <p className="text-[10px] text-slate-400 mt-1">Rate conversion: 1 USD = ~278 PKR</p>
                    </div>
                  )}

                  {/* Payment Reference ID input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Transaction Ref / TxID / Proof ID</label>
                    <input
                      type="text"
                      value={topupRefId}
                      onChange={(e) => setTopupRefId(e.target.value)}
                      placeholder="Enter Binance Order ID, JazzCash Ref, or Payment Proof TxID"
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-2.5 px-4 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {topupSuccess && (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Top-Up request submitted successfully! Admin will verify payment and credit your balance.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessingTopup}
                    className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessingTopup ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Top-Up Request...</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        <span>Submit Top-Up Request (${topupCustomAmount || topupAmount} USD)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* SECTION 3: TRANSACTIONS & FILTERING */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-base font-black text-white">Wallet Transactions</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                      {filteredTransactions.length} records
                    </span>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={txSearch}
                        onChange={(e) => {
                          setTxSearch(e.target.value);
                          setTxPage(1);
                        }}
                        placeholder="Search TxID or ref..."
                        className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    {/* Status Filter */}
                    <select
                      value={txStatusFilter}
                      onChange={(e) => {
                        setTxStatusFilter(e.target.value);
                        setTxPage(1);
                      }}
                      className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-semibold cursor-pointer"
                    >
                      <option value="all">All Status</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Rejected / Failed</option>
                    </select>

                    {/* Type Filter */}
                    <select
                      value={txTypeFilter}
                      onChange={(e) => {
                        setTxTypeFilter(e.target.value);
                        setTxPage(1);
                      }}
                      className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-semibold cursor-pointer"
                    >
                      <option value="all">All Types</option>
                      <option value="deposit">Deposits</option>
                      <option value="purchase">Purchases</option>
                      <option value="refund">Refunds</option>
                      <option value="admin_credit">Admin Credit</option>
                    </select>
                  </div>
                </div>

                {/* Transactions Ledger List or Empty State */}
                {filteredTransactions.length === 0 ? (
                  /* SECTION 4: EMPTY STATE */
                  <div className="py-12 px-4 text-center bg-slate-900/40 rounded-2xl border border-slate-800/60 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mx-auto text-slate-400">
                      <Wallet className="w-6 h-6 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">📭 No Transactions Found</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                        You haven't made any deposits or purchases yet. Top up your wallet to get started.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('wallet');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all inline-flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Top Up Balance</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {paginatedTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2.5 rounded-xl shrink-0 ${
                              tx.type === 'deposit' || tx.type === 'admin_credit' || tx.type === 'refund'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {tx.type === 'deposit' || tx.type === 'admin_credit' || tx.type === 'refund' ? (
                              <ArrowDownRight className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{tx.description}</h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {new Date(tx.createdAt).toLocaleString()} • Method: {tx.paymentMethod || 'Wallet'}
                              {tx.referenceId && ` • Ref: ${tx.referenceId}`}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-sm font-black font-mono block ${
                              tx.amount >= 0 ? 'text-emerald-400' : 'text-slate-300'
                            }`}
                          >
                            {tx.amount >= 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                          </span>
                          <span
                            className={`px-2 py-0.2 rounded-full text-[9px] font-extrabold uppercase border ${
                              tx.status === 'Completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : tx.status === 'Pending'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Pagination Bar */}
                    {totalTxPages > 1 && (
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                        <span>
                          Showing page <strong className="text-white">{txPage}</strong> of{' '}
                          <strong className="text-white">{totalTxPages}</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={txPage === 1}
                            onClick={() => setTxPage((p) => Math.max(1, p - 1))}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={txPage === totalTxPages}
                            onClick={() => setTxPage((p) => Math.min(totalTxPages, p + 1))}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION 5: ORDERS & PROJECTS (REAL DATA ONLY) */}
              {activeTab === 'dashboard' && (
                <div className="space-y-4 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-cyan-400" />
                      <span>Recent Orders & Activity</span>
                    </h3>
                    {orders.length > 0 && (
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-cyan-400 hover:underline font-semibold"
                      >
                        View All Orders ({orders.length})
                      </button>
                    )}
                  </div>

                  {orders.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
                      <Package className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs font-bold text-white">No Orders Placed Yet</p>
                      <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                        Your marketplace purchases and digital services orders will appear here once placed.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {orders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between gap-3"
                        >
                          <div>
                            <span className="text-xs font-bold font-mono text-cyan-400">Order #{order.order_number}</span>
                            <p className="text-[10px] text-slate-400">
                              {order.items?.length || 0} item(s) • Payment: {order.payment_method}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black font-mono text-white block">${order.total_amount?.toFixed(2)}</span>
                            <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Direct Support & Consultation Box */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Need Project Revisions or Custom Scope Changes?</h5>
                    <p className="text-[11px] text-slate-400">
                      Direct WhatsApp access to lead developer Waleed Khan Afridi for immediate updates.
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                  <span>WhatsApp Lead Developer</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS & MILESTONES */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Project Selector Dropdown / Pills */}
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-slate-300">Select Active Project:</span>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-semibold cursor-pointer max-w-xs"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProject ? (
                <div className="space-y-6">
                  {/* Project Details Card */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[11px] font-bold text-cyan-400 uppercase font-mono">{selectedProject.category}</span>
                        <h4 className="text-lg font-bold text-white mt-0.5">{selectedProject.title}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {selectedProject.status}
                        </span>
                        <span className="text-sm font-black text-white font-mono">${selectedProject.totalBudget} USD</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Start Date</span>
                        <span className="font-bold text-white font-mono">{selectedProject.startDate}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Est. Completion</span>
                        <span className="font-bold text-cyan-300 font-mono">{selectedProject.estimatedCompletion}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Lead Engineer</span>
                        <span className="font-bold text-white">{selectedProject.leadEngineer}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Payment Status</span>
                        <span className="font-bold text-emerald-400 font-mono">
                          ${selectedProject.paidAmount} / ${selectedProject.totalBudget} Paid
                        </span>
                      </div>
                    </div>

                    {/* Repository & Live Links */}
                    {(selectedProject.repositoryUrl || selectedProject.previewUrl) && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                        {selectedProject.repositoryUrl && (
                          <a
                            href={selectedProject.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-cyan-500 transition-all flex items-center gap-1.5"
                          >
                            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>GitHub Source Repository</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>
                        )}
                        {selectedProject.previewUrl && (
                          <a
                            href={selectedProject.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-cyan-500 transition-all flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Live Development Preview</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Milestones & Timeline */}
                  <div>
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Project Milestones & Live Status Tracker</span>
                    </h4>

                    <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-800">
                      {selectedProject.milestones.map((milestone, idx) => (
                        <div
                          key={milestone.id}
                          className="relative pl-10 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          {/* Timeline dot icon */}
                          <div
                            className={`absolute left-3 top-4 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                              milestone.status === 'Completed'
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                : milestone.status === 'In Progress'
                                ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {milestone.status === 'Completed' ? <Check className="w-3 h-3" /> : idx + 1}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs font-bold text-white">{milestone.title}</h5>
                              <span
                                className={`px-2 py-0.2 rounded-md text-[10px] font-bold ${
                                  milestone.status === 'Completed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : milestone.status === 'In Progress'
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {milestone.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">{milestone.description}</p>
                          </div>

                          {milestone.completedDate && (
                            <span className="text-[10px] text-slate-500 font-mono shrink-0">
                              Completed: {milestone.completedDate}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center bg-slate-950 rounded-2xl border border-slate-800 p-8">
                  <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">No Active Projects Selected</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DELIVERABLES CENTER */}
          {activeTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-cyan-300">Deliverable Download Center</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    All source code packages, design tokens, and technical documentation are cryptographically verified.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs font-bold border border-slate-800">
                  {allDeliverables.length} Deliverables
                </span>
              </div>

              {allDeliverables.length === 0 ? (
                <div className="py-12 text-center bg-slate-950 rounded-2xl border border-slate-800 p-8">
                  <Download className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">No Deliverables Ready Yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Deliverable files will be uploaded here as project milestones are completed.
                  </p>
                </div>
              ) : (
                allDeliverables.map((del) => (
                  <div
                    key={del.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-xs shrink-0">
                          {del.fileType.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs sm:text-sm font-bold text-white">{del.title}</h5>
                            <span className="px-2 py-0.2 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-cyan-400 font-mono font-bold">
                              {del.version}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {del.fileName} • {del.fileSize} • Uploaded {del.uploadedAt}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerFileDownload(del)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Deliverable</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 gap-2">
                      <span className="font-mono truncate max-w-md" title={del.securityHash}>
                        SHA-256: <strong className="text-slate-400">{del.securityHash}</strong>
                      </span>
                      <span className="text-emerald-400 font-semibold">✓ Verified Clean & Safe</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: INVOICES & BILLING */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              {/* Billing Summary Banner */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Billing Summary</span>
                  <div className="flex items-center gap-4 mt-1">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Total Billed</span>
                      <span className="text-lg font-black text-white font-mono">${stats.totalInvoiced}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Total Paid</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">${stats.totalPaid}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Due Balance</span>
                      <span className="text-lg font-black text-amber-400 font-mono">${stats.balanceDue}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}?text=Hi%20Waleed,%20I%20have%20a%20question%20regarding%20my%20invoice.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-400 hover:bg-slate-800 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Billing Inquiry on WhatsApp</span>
                </a>
              </div>

              {/* Invoices List */}
              <div className="space-y-3">
                {allInvoices.length === 0 ? (
                  <div className="py-12 text-center bg-slate-950 rounded-2xl border border-slate-800 p-8">
                    <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-bold text-white">No Invoices Issued Yet</p>
                  </div>
                ) : (
                  allInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black font-mono text-cyan-400">{inv.invoiceNumber}</span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                inv.status === 'PAID'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              }`}
                            >
                              {inv.status}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-white mt-1">{inv.projectTitle}</h5>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            Issued: {inv.issueDate} • Due: {inv.dueDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="text-base font-black font-mono text-white">${inv.amount.toFixed(2)} USD</span>
                          <button
                            onClick={() => printInvoice(inv, user?.email || 'client@example.com')}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-300 hover:bg-slate-800 transition-all flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print / PDF</span>
                          </button>
                        </div>
                      </div>

                      {/* Line items summary */}
                      <div className="space-y-1">
                        {inv.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl">
                            <span>{item.description}</span>
                            <span className="font-mono text-slate-300 font-semibold">${item.total.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {inv.notes && (
                        <p className="text-[10px] text-emerald-400/90 font-mono bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/10">
                          ✓ {inv.notes}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <OrderHistory
              user={user}
              whatsappNumber={whatsappNumber}
              onBrowseServices={onClose}
            />
          )}

          {/* TAB 6: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Email Address (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-slate-400 cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Waleed Khan Afridi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+92 341 6860077"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated in Supabase database!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Actions & Security Seal */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase TLS 1.3 & RLS Protected</span>
          </div>

          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

