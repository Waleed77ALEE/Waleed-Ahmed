import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ExternalLink, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Loader2,
  Copy,
  Check,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { SupabaseOrder, fetchUserOrders } from '../lib/supabase';
import { softwareStore } from '../services/softwareStore';
import { SoftwareOrder } from '../data/softwareData';

interface OrderHistoryProps {
  user?: any;
  whatsappNumber?: string;
  className?: string;
  onBrowseServices?: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  user,
  whatsappNumber = '+923416860077',
  className = '',
  onBrowseServices
}) => {
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [softwareOrders, setSoftwareOrders] = useState<SoftwareOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Processing' | 'Completed' | 'Cancelled'>('All');
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const userId = user?.id || user?.email || 'guest';

  const loadData = async (showRefreshSpinner = false) => {
    if (showRefreshSpinner) setRefreshing(true);
    else setLoading(true);

    try {
      // 1. Fetch Supabase/Firestore/Local Orders
      const userOrders = await fetchUserOrders(userId);
      setOrders(userOrders);

      // 2. Fetch Software Orders
      const swOrders = softwareStore.getOrdersByEmail(user?.email || '');
      setSoftwareOrders(swOrders);
    } catch (err) {
      console.error('Failed to load order history:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const toggleExpand = (id: string) => {
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  // Filtered Orders
  const filteredOrders = orders.filter(ord => {
    const matchesSearch = 
      ord.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.payment_method?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.items?.some(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalOrdersCount = orders.length + softwareOrders.length;
  const processingCount = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length +
                          softwareOrders.filter(s => s.orderStatus === 'Pending' || s.orderStatus === 'Processing').length;
  const completedCount = orders.filter(o => o.status === 'Completed').length +
                         softwareOrders.filter(s => s.orderStatus === 'Fulfilled').length;
  const totalSpent = orders.reduce((acc, o) => acc + (o.total_amount || 0), 0) +
                     softwareOrders.reduce((acc, s) => acc + (s.price || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Fulfilled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm shadow-emerald-500/10">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Processing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1.5 shadow-sm shadow-sky-500/10 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> In Production
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Awaiting Payment
          </span>
        );
    }
  };

  const getStepProgress = (status: string) => {
    let activeStep = 1;
    if (status === 'Processing') activeStep = 3;
    if (status === 'Completed' || status === 'Fulfilled') activeStep = 4;
    if (status === 'Cancelled') activeStep = 0;

    const steps = [
      { id: 1, label: 'Order Placed' },
      { id: 2, label: 'Payment Verified' },
      { id: 3, label: 'In Production' },
      { id: 4, label: 'Delivered' }
    ];

    if (activeStep === 0) {
      return (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>This order request was cancelled. Contact support on WhatsApp if you believe this is an error.</span>
        </div>
      );
    }

    return (
      <div className="py-2 space-y-2">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 font-mono">
          {steps.map((step) => (
            <span
              key={step.id}
              className={step.id <= activeStep ? 'text-cyan-400' : 'text-slate-600'}
            >
              {step.label}
            </span>
          ))}
        </div>
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 flex">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-700 rounded-full"
            style={{ width: `${(activeStep / 4) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 font-sans ${className}`}>
      {/* Header & Metrics Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Service Requests & Order History</h3>
              <p className="text-xs text-slate-400">Track real-time status and access past service purchases.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Refresh Order List"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {onBrowseServices && (
            <button
              onClick={onBrowseServices}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>New Request</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Orders</span>
          <span className="text-2xl font-black text-white font-mono">{totalOrdersCount}</span>
        </div>
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">In Production</span>
          <span className="text-2xl font-black text-sky-400 font-mono">{processingCount}</span>
        </div>
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Completed</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">{completedCount}</span>
        </div>
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Total Investment</span>
          <span className="text-2xl font-black text-amber-400 font-mono">${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order #, item or payment..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {(['All', 'Pending', 'Processing', 'Completed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Software Licenses Section if present */}
      {softwareOrders.length > 0 && (statusFilter === 'All' || statusFilter === 'Completed') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Software & Digital Licenses ({softwareOrders.length})</span>
            </h4>
          </div>

          <div className="space-y-3">
            {softwareOrders.map((swOrder) => (
              <div
                key={swOrder.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold font-mono text-cyan-400">#{swOrder.id}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300 border border-slate-800">
                        {swOrder.paymentMethod}
                      </span>
                    </div>
                    <h5 className="text-sm sm:text-base font-extrabold text-white mt-1">
                      {swOrder.productName}
                    </h5>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Version: {swOrder.version} • Ordered: {new Date(swOrder.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(swOrder.orderStatus)}
                    <span className="text-base font-black font-mono text-white">${swOrder.price.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* License Serial Key Fulfill Output */}
                {swOrder.deliveryKey ? (
                  <div className="p-3 sm:p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase font-mono text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> License Activation Serial Key
                      </span>
                      {swOrder.downloadLink && (
                        <a
                          href={swOrder.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>Official Download</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs font-bold text-emerald-300">
                      <span className="select-all break-all">{swOrder.deliveryKey}</span>
                      <button
                        onClick={() => copyToClipboard(swOrder.deliveryKey!, swOrder.id)}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono shrink-0 ml-2 cursor-pointer flex items-center gap-1"
                      >
                        {copiedKeyId === swOrder.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>Key generation in progress. Your license key will display here upon approval.</span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">Pending Approval</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Primary Service Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs flex items-center justify-center gap-2 bg-slate-950/40 rounded-2xl border border-slate-800">
            <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
            <span>Fetching order records from cloud server...</span>
          </div>
        ) : filteredOrders.length === 0 && softwareOrders.length === 0 ? (
          <div className="py-16 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 p-8 space-y-3">
            <Package className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">No Order Records Found</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchTerm || statusFilter !== 'All'
                  ? 'No orders matched your current search filters. Try clearing search keywords.'
                  : 'You have not submitted any service orders yet. Select a service to get started!'}
              </p>
            </div>
            {onBrowseServices && (
              <button
                onClick={onBrowseServices}
                className="mt-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Services</span>
              </button>
            )}
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isExpanded = expandedOrders[ord.id] !== false; // expanded by default
            const whatsappMsg = encodeURIComponent(
              `Hi Waleed! I would like to check the status of my Order #${ord.order_number} ($${ord.total_amount?.toFixed(2)} USD).`
            );

            return (
              <div
                key={ord.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 hover:border-slate-700/80 transition-all shadow-xl relative overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-extrabold font-mono text-cyan-400">
                        #{ord.order_number || ord.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                        {ord.payment_method || 'Online Payment'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                      Submitted: {ord.created_at ? new Date(ord.created_at).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(ord.status)}
                    <span className="text-lg font-black font-mono text-white">
                      ${ord.total_amount?.toFixed(2)} USD
                    </span>
                    <button
                      onClick={() => toggleExpand(ord.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse Details' : 'Expand Details'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
                  {getStepProgress(ord.status)}
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                    {/* Items Table */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Requested Items</span>
                      <div className="space-y-2">
                        {ord.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 gap-2"
                          >
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{item.title}</span>
                                {item.category && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                                    {item.category}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                                Delivery ETA: <strong className="text-slate-300">{item.delivery}</strong>
                              </span>
                            </div>

                            <div className="text-left sm:text-right font-mono text-xs">
                              <span className="text-slate-400">Qty: {item.quantity}</span>
                              <span className="mx-2 text-slate-600">•</span>
                              <span className="text-cyan-300 font-black">${(item.price * item.quantity).toFixed(2)} USD</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata Badges & WhatsApp Direct Contact */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
                      <div className="space-y-1">
                        {ord.binance_tx_id && (
                          <div className="text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Binance TxID: <strong className="select-all font-bold">{ord.binance_tx_id}</strong></span>
                          </div>
                        )}
                        {ord.payment_proof && (
                          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Payment proof uploaded & verified</span>
                          </div>
                        )}
                        {ord.notes && (
                          <div className="text-[11px] text-slate-400 italic">
                            Notes: "{ord.notes}"
                          </div>
                        )}
                      </div>

                      <a
                        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                        <span>Track via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
