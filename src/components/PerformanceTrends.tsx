import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  MousePointerClick,
  BarChart3,
  Calendar,
  Sparkles,
  Award,
  Zap,
  ArrowUpRight,
  User,
  CheckCircle2,
  Filter
} from 'lucide-react';
import {
  getReferralStoreFull,
  AffiliatePartnerProfile,
  LeaderboardAffiliateItem
} from '../services/referralStore';

interface PerformanceTrendsProps {
  currentAffiliate?: AffiliatePartnerProfile | null;
  currentUser?: any;
}

export const PerformanceTrends: React.FC<PerformanceTrendsProps> = ({
  currentAffiliate,
  currentUser
}) => {
  const storeData = getReferralStoreFull();
  const allAffiliates: AffiliatePartnerProfile[] = storeData.affiliates || [];

  // Currently selected affiliate for detailed trend analysis
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string>(
    currentAffiliate?.id || allAffiliates[0]?.id || 'aff_1'
  );

  const [timeframe, setTimeframe] = useState<'6m' | '12m'>('6m');

  // Active selected affiliate object
  const activeAffiliate = useMemo(() => {
    return (
      allAffiliates.find(a => a.id === selectedAffiliateId) ||
      currentAffiliate ||
      allAffiliates[0]
    );
  }, [selectedAffiliateId, allAffiliates, currentAffiliate]);

  // Generate historical monthly trend data for the selected affiliate
  const monthlyTrendData = useMemo(() => {
    if (!activeAffiliate) return [];

    const totalEarnings = activeAffiliate.totalEarnings || 100;
    const totalSales = activeAffiliate.totalSalesCount || 10;
    const totalClicks = activeAffiliate.totalReferralClicks || 150;
    const baseConv = activeAffiliate.conversionRate || 6.5;
    const lifetimeVolume = activeAffiliate.lifetimeSalesAmount || totalSales * 100;

    const months6 = ['Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'];
    const months12 = [
      'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026',
      'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026'
    ];

    const monthList = timeframe === '6m' ? months6 : months12;
    const count = monthList.length;

    let cumulativeSales = 0;
    let cumulativeEarnings = 0;

    return monthList.map((m, idx) => {
      // Create realistic progressive curve leading up to current totals
      const progressFactor = Math.pow((idx + 1) / count, 1.3);
      const monthlyEarn = Math.round((totalEarnings / count) * (0.6 + progressFactor * 0.8) * 100) / 100;
      const monthlySales = Math.max(1, Math.round((totalSales / count) * (0.5 + progressFactor * 0.9)));
      const monthlyClicks = Math.round((totalClicks / count) * (0.7 + progressFactor * 0.7));
      const convRate = Math.min(18, Math.round((baseConv * (0.85 + (idx / count) * 0.3)) * 10) / 10);
      const epc = monthlyClicks > 0 ? Math.round((monthlyEarn / monthlyClicks) * 100) / 100 : 0;

      cumulativeSales += monthlySales * (lifetimeVolume / Math.max(1, totalSales));
      cumulativeEarnings += monthlyEarn;

      return {
        month: m,
        earnings: monthlyEarn,
        salesCount: monthlySales,
        clicks: monthlyClicks,
        conversionRate: convRate,
        epc: epc,
        cumulativeRevenue: Math.round(cumulativeSales),
        cumulativeEarnings: Math.round(cumulativeEarnings)
      };
    });
  }, [activeAffiliate, timeframe]);

  // Aggregate stats
  const performanceMetrics = useMemo(() => {
    if (!monthlyTrendData.length) return null;

    const totalClicks = monthlyTrendData.reduce((acc, curr) => acc + curr.clicks, 0);
    const totalEarnings = monthlyTrendData.reduce((acc, curr) => acc + curr.earnings, 0);
    const totalSales = monthlyTrendData.reduce((acc, curr) => acc + curr.salesCount, 0);
    const avgConv = (monthlyTrendData.reduce((acc, curr) => acc + curr.conversionRate, 0) / monthlyTrendData.length).toFixed(1);
    const avgEpc = totalClicks > 0 ? (totalEarnings / totalClicks).toFixed(2) : '0.00';
    const maxEarningsMonth = [...monthlyTrendData].sort((a, b) => b.earnings - a.earnings)[0];

    return {
      totalClicks,
      totalEarnings,
      totalSales,
      avgConv,
      avgEpc,
      maxEarningsMonth
    };
  }, [monthlyTrendData]);

  if (!activeAffiliate) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
        No affiliate selected for performance trends analysis.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SECTION HEADER & SELECTOR BAR */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Affiliate Performance Trends &amp; Analytics</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Recharts Analytics &amp; Historical Growth
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Analyze monthly commission trends, referral click conversion rates, and lifetime revenue growth metrics across affiliate partners.
            </p>
          </div>

          {/* Controls: Affiliate Selector & Timeframe */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Select Partner Dropdown */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400">Select Partner</label>
              <div className="relative">
                <select
                  value={selectedAffiliateId}
                  onChange={(e) => setSelectedAffiliateId(e.target.value)}
                  className="px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-amber-500 cursor-pointer shadow-md pr-8"
                >
                  {allAffiliates.map((aff) => (
                    <option key={aff.id} value={aff.id}>
                      {aff.fullName} (@{aff.username}) - {aff.tier}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-bold text-slate-400">Timeframe</label>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setTimeframe('6m')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    timeframe === '6m' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  6 Months
                </button>
                <button
                  onClick={() => setTimeframe('12m')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    timeframe === '12m' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1 Year
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC SUMMARY CARDS FOR SELECTED AFFILIATE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black font-mono text-emerald-400">
            ${activeAffiliate.totalEarnings.toFixed(2)}
          </p>
          <span className="text-[10px] text-slate-500">Tier: {activeAffiliate.tier} Partner</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Click Conv. Rate</span>
            <MousePointerClick className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xl font-black font-mono text-cyan-300">
            {activeAffiliate.conversionRate}%
          </p>
          <span className="text-[10px] text-slate-500">
            {activeAffiliate.totalReferralClicks} total clicks
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Earnings / Click (EPC)</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black font-mono text-amber-400">
            ${performanceMetrics?.avgEpc}
          </p>
          <span className="text-[10px] text-slate-500">Per referral visitor</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Peak Month</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xl font-black font-mono text-indigo-300">
            ${performanceMetrics?.maxEarningsMonth?.earnings || 0}
          </p>
          <span className="text-[10px] text-slate-500">
            {performanceMetrics?.maxEarningsMonth?.month || 'N/A'}
          </span>
        </div>
      </div>

      {/* CHART 1: MONTHLY EARNINGS & ORDER SALES (BAR / AREA RECHARTS) */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Monthly Earnings &amp; Sales Breakdown ({activeAffiliate.fullName})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Visualizing commission payout trajectory ($) vs order conversions per month.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Earnings ($)
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <span className="w-3 h-3 rounded bg-cyan-400 inline-block" /> Order Sales
            </span>
          </div>
        </div>

        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-3 bg-slate-950 border border-slate-700 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-white border-b border-slate-800 pb-1">{label}</p>
                        {payload.map((p: any, idx: number) => (
                          <p key={idx} style={{ color: p.color }} className="font-mono">
                            {p.name}: <strong>{p.value}</strong>
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', color: '#94a3b8' }} />
              <Bar yAxisId="left" dataKey="earnings" name="Monthly Earnings ($)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="salesCount" name="Sales Count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: CLICK CONVERSION RATES & EPC TRENDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Rate Line Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-cyan-400" />
              <span>Conversion Rate Progress (%)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Monthly conversion percentage from referral clicks to completed client sales.
            </p>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-cyan-400 font-mono">
                            Conv Rate: <strong>{payload[0]?.value}%</strong>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="conversionRate"
                  name="Conversion Rate %"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#06b6d4' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: HISTORICAL CUMULATIVE GROWTH */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Historical Revenue Growth Curve ($)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cumulative referral sales volume driven over time.
            </p>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cumulGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                          <p className="font-bold text-white">{label}</p>
                          <p className="text-emerald-400 font-mono">
                            Cumulative Revenue: <strong>${payload[0]?.value}</strong>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cumulativeRevenue"
                  name="Cumulative Sales ($)"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#cumulGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
