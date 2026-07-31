import React, { useState, useMemo } from 'react';
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
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Users,
  UserCheck,
  Percent,
  Calendar,
  Sparkles,
  Zap,
  ShoppingBag,
  Wallet,
  ArrowUpRight,
  Filter,
  BarChart3,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import { RegisteredUserRecord } from '../services/userStore';
import { AdminOrder } from '../services/productStore';
import { SoftwareOrder } from '../data/softwareData';

interface UserAnalyticsChartsProps {
  users: RegisteredUserRecord[];
  orders: AdminOrder[];
  softwareOrders: SoftwareOrder[];
}

export const UserAnalyticsCharts: React.FC<UserAnalyticsChartsProps> = ({
  users,
  orders,
  softwareOrders
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d' | 'all'>('14d');
  const [chartMode, setChartMode] = useState<'signup' | 'conversion' | 'provider'>('signup');

  // Compute Time Series & Conversion Metrics
  const {
    timelineData,
    providerDistribution,
    conversionFunnel,
    conversionRate,
    repeatRate,
    avgUserValue,
    totalConverted,
    totalUsersCount,
    walletActiveUsers
  } = useMemo(() => {
    const now = new Date();
    const daysToLookBack = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : timeRange === '30d' ? 30 : 60;

    // Generate date map for timeline
    const dateMap: { [key: string]: { date: string; displayDate: string; newUsers: number; googleUsers: number; emailUsers: number; ordersCount: number } } = {};

    for (let i = daysToLookBack - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const isoKey = d.toISOString().slice(0, 10);
      const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dateMap[isoKey] = {
        date: isoKey,
        displayDate,
        newUsers: 0,
        googleUsers: 0,
        emailUsers: 0,
        ordersCount: 0
      };
    }

    // Populate user registration trends
    users.forEach((u) => {
      const dateKey = u.createdAt ? u.createdAt.slice(0, 10) : '';
      if (dateMap[dateKey]) {
        dateMap[dateKey].newUsers += 1;
        if (u.provider === 'Google') {
          dateMap[dateKey].googleUsers += 1;
        } else {
          dateMap[dateKey].emailUsers += 1;
        }
      }
    });

    // Populate order trends
    [...orders, ...softwareOrders].forEach((o) => {
      const dateKey = o.createdAt ? o.createdAt.slice(0, 10) : '';
      if (dateMap[dateKey]) {
        dateMap[dateKey].ordersCount += 1;
      }
    });

    // Calculate cumulative users
    let cumulative = Math.max(0, users.length - Object.values(dateMap).reduce((acc, curr) => acc + curr.newUsers, 0));
    const timeline = Object.values(dateMap).map((item) => {
      cumulative += item.newUsers;
      return {
        ...item,
        cumulativeUsers: cumulative
      };
    });

    // Provider Breakdown
    const providerCounts: { [key: string]: number } = {
      Google: 0,
      Email: 0,
      Supabase: 0,
      Guest: 0
    };

    users.forEach((u) => {
      const p = u.provider || 'Email';
      providerCounts[p] = (providerCounts[p] || 0) + 1;
    });

    const providerDistributionData = [
      { name: 'Google OAuth', value: providerCounts.Google || 0, color: '#3b82f6' },
      { name: 'Email / Password', value: providerCounts.Email || 0, color: '#06b6d4' },
      { name: 'Supabase Auth', value: providerCounts.Supabase || 0, color: '#6366f1' },
      { name: 'Guest Buyers', value: providerCounts.Guest || 0, color: '#64748b' }
    ].filter((item) => item.value > 0);

    // If no provider data exists, default display
    if (providerDistributionData.length === 0) {
      providerDistributionData.push(
        { name: 'Google OAuth', value: Math.max(1, Math.floor(users.length * 0.6)), color: '#3b82f6' },
        { name: 'Email / Password', value: Math.max(1, Math.floor(users.length * 0.4)), color: '#06b6d4' }
      );
    }

    // Conversion Metrics
    const totalUsers = users.length;
    const converted = users.filter((u) => u.ordersCount > 0 || u.totalSpent > 0);
    const repeat = users.filter((u) => u.ordersCount > 1);
    const walletActive = users.filter((u) => u.walletBalance > 0);

    const convRate = totalUsers > 0 ? ((converted.length / totalUsers) * 100).toFixed(1) : '0.0';
    const repRate = converted.length > 0 ? ((repeat.length / converted.length) * 100).toFixed(1) : '0.0';
    
    const totalRev = orders.reduce((s, o) => s + (o.totalAmount || 0), 0) + softwareOrders.reduce((s, o) => s + (o.totalAmount || 0), 0);
    const avgVal = totalUsers > 0 ? (totalRev / totalUsers).toFixed(2) : '0.00';

    // Conversion Funnel Data
    const funnel = [
      { stage: 'Total Users', count: totalUsers || 1, color: '#38bdf8' },
      { stage: 'Funded Wallets', count: walletActive.length, color: '#10b981' },
      { stage: 'Placed 1+ Order', count: converted.length, color: '#f59e0b' },
      { stage: 'Repeat Buyers (2+)', count: repeat.length, color: '#a855f7' }
    ];

    return {
      timelineData: timeline,
      providerDistribution: providerDistributionData,
      conversionFunnel: funnel,
      conversionRate: convRate,
      repeatRate: repRate,
      avgUserValue: avgVal,
      totalConverted: converted.length,
      totalUsersCount: totalUsers,
      walletActiveUsers: walletActive.length
    };
  }, [users, orders, softwareOrders, timeRange]);

  // Custom Chart Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-bold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
            <span>{label}</span>
            <span className="text-[10px] text-cyan-400 font-mono">Date</span>
          </p>
          {payload.map((p: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span>{p.name}:</span>
              </span>
              <span className="font-mono font-bold text-white">{p.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Conversion Rate Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-colors" />
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span>Conversion Rate</span>
            </span>
            <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-1.5">
              <span>{conversionRate}%</span>
              <span className="text-xs font-semibold text-emerald-400 font-mono">
                {totalConverted} converted
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Registered users who placed orders
            </p>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        {/* Avg Value / ARPU Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span>Avg Value / User</span>
            </span>
            <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-1.5">
              <span>${avgUserValue}</span>
              <span className="text-xs font-semibold text-cyan-400 font-mono">ARPU</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Average revenue generated per user
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Wallet Activation Rate Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors" />
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span>Active Wallets</span>
            </span>
            <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-1.5">
              <span>{walletActiveUsers}</span>
              <span className="text-xs font-semibold text-amber-400 font-mono">
                {totalUsersCount > 0 ? ((walletActiveUsers / totalUsersCount) * 100).toFixed(0) : 0}% users
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Users with active funded wallet balance
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        {/* Repeat Customer Rate */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-colors" />
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span>Repeat Buyers</span>
            </span>
            <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-1.5">
              <span>{repeatRate}%</span>
              <span className="text-xs font-semibold text-purple-400 font-mono">Retention</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Buyers with 2 or more placed orders
            </p>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>User Signups &amp; Conversion Analytics</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time trend analysis from Supabase registered users and transaction records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium">
              <button
                onClick={() => setChartMode('signup')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartMode === 'signup'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Signup Trends
              </button>
              <button
                onClick={() => setChartMode('conversion')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartMode === 'conversion'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Funnel
              </button>
              <button
                onClick={() => setChartMode('provider')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartMode === 'provider'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Auth Split
              </button>
            </div>

            {/* Timeframe selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="14d">Last 14 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Dynamic Chart Display */}
        <div className="w-full h-72 sm:h-80 pt-2">
          {chartMode === 'signup' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="googleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="displayDate"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '10px', fontSize: '11px', color: '#94a3b8' }}
                />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  name="New Registered Users"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#userGrad)"
                  activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2, fill: '#0f172a' }}
                />
                <Area
                  type="monotone"
                  dataKey="googleUsers"
                  name="Google OAuth Signups"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#googleGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="ordersCount"
                  name="Orders Placed"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#orderGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {chartMode === 'conversion' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionFunnel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="stage"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#334155' }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(51, 65, 85, 0.3)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-bold text-white">{data.stage}</p>
                          <p className="text-cyan-400 font-mono text-sm font-black">
                            {data.count} Users
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {((data.count / (totalUsersCount || 1)) * 100).toFixed(1)}% of total user base
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" name="Users Count" radius={[8, 8, 0, 0]}>
                  {conversionFunnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartMode === 'provider' && (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="w-full md:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={providerDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {providerDistribution.map((entry, index) => (
                        <Cell key={`cell-pie-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          return (
                            <div className="p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl text-xs">
                              <p className="font-bold text-white">{data.name}</p>
                              <p className="text-cyan-400 font-mono font-bold">
                                {data.value} users ({((Number(data.value) / (totalUsersCount || 1)) * 100).toFixed(1)}%)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend & Breakdown list */}
              <div className="w-full md:w-1/2 space-y-2.5 pr-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Authentication Share
                </h4>
                {providerDistribution.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-white">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-300 font-bold">{item.value}</span>
                      <span className="text-[10px] text-slate-400 font-mono w-10 text-right">
                        {((item.value / (totalUsersCount || 1)) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
