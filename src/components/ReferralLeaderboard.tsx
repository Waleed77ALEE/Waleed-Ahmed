import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Sparkles,
  TrendingUp,
  UserCheck,
  Search,
  RefreshCw,
  Zap,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import {
  getTopAffiliatesLeaderboard,
  getUserLeaderboardRank,
  LeaderboardAffiliateItem,
  AffiliatePartnerProfile
} from '../services/referralStore';

interface ReferralLeaderboardProps {
  currentUser?: any;
  currentAffiliate?: AffiliatePartnerProfile | null;
  onOpenAuth?: () => void;
  onOpenContact?: () => void;
}

export const ReferralLeaderboard: React.FC<ReferralLeaderboardProps> = ({
  currentUser,
  currentAffiliate,
  onOpenAuth,
  onOpenContact
}) => {
  const [topAffiliates, setTopAffiliates] = useState<LeaderboardAffiliateItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'sales' | 'revenue' | 'conversion'>('sales');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userRankInfo, setUserRankInfo] = useState<{
    rank: number;
    affiliate: LeaderboardAffiliateItem | null;
    totalAffiliates: number;
    isTop10: boolean;
    salesToNextRank?: number;
  }>({ rank: 0, affiliate: null, totalAffiliates: 0, isTop10: false });

  // Fetch leaderboard data
  const fetchLeaderboardData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const { topAffiliates: fetchedTop, totalAffiliatesCount, allRanked } = getTopAffiliatesLeaderboard(100);
      
      // Sort based on user selected metric if changed from default
      let sortedList = [...allRanked];
      if (sortBy === 'revenue') {
        sortedList.sort((a, b) => (b.lifetimeSalesAmount || 0) - (a.lifetimeSalesAmount || 0));
      } else if (sortBy === 'conversion') {
        sortedList.sort((a, b) => (b.conversionRate || 0) - (a.conversionRate || 0));
      } else {
        // Default sales count
        sortedList.sort((a, b) => (b.totalSalesCount || 0) - (a.totalSalesCount || 0));
      }

      // Re-assign ranks based on current active sort
      const rankedWithSort = sortedList.map((item, index) => ({
        ...item,
        rank: index + 1
      }));

      setTopAffiliates(rankedWithSort.slice(0, 10));
      setTotalCount(totalAffiliatesCount);

      // Check current user rank
      const currentIdentifier = currentAffiliate?.username || currentAffiliate?.id || currentUser?.email;
      if (currentIdentifier) {
        const userMatch = rankedWithSort.find(
          a =>
            a.username.toUpperCase() === currentIdentifier.toUpperCase() ||
            a.id === currentIdentifier ||
            (currentUser?.email && a.email.toLowerCase() === currentUser.email.toLowerCase())
        );

        if (userMatch) {
          const isTop10 = userMatch.rank <= 10;
          let salesToNextRank = 0;
          if (userMatch.rank > 1) {
            const prevAff = rankedWithSort[userMatch.rank - 2];
            salesToNextRank = Math.max(1, (prevAff.totalSalesCount || 0) - (userMatch.totalSalesCount || 0));
          }
          setUserRankInfo({
            rank: userMatch.rank,
            affiliate: userMatch,
            totalAffiliates: totalAffiliatesCount,
            isTop10,
            salesToNextRank
          });
        } else {
          setUserRankInfo({ rank: 0, affiliate: null, totalAffiliates: totalAffiliatesCount, isTop10: false });
        }
      } else {
        setUserRankInfo({ rank: 0, affiliate: null, totalAffiliates: totalAffiliatesCount, isTop10: false });
      }

      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [currentAffiliate, currentUser, sortBy]);

  // Filter top 10 list by search query if user types in search box
  const filteredAffiliates = topAffiliates.filter(aff => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      aff.fullName.toLowerCase().includes(q) ||
      aff.username.toLowerCase().includes(q) ||
      aff.tier.toLowerCase().includes(q)
    );
  });

  // Current user identification helper
  const isCurrentUser = (aff: LeaderboardAffiliateItem) => {
    if (!currentAffiliate && !currentUser) return false;
    if (currentAffiliate && (currentAffiliate.id === aff.id || currentAffiliate.username.toUpperCase() === aff.username.toUpperCase())) {
      return true;
    }
    if (currentUser?.email && aff.email.toLowerCase() === currentUser.email.toLowerCase()) {
      return true;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>ReferralPro Official Wall of Fame</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Top 10 Affiliates Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time rankings based on total sales and revenue generated. Climb the tiers to unlock higher commission rates up to <strong className="text-amber-400">25% lifetime</strong>!
            </p>
          </div>

          {/* Action & Metric Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/90 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setSortBy('sales')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sortBy === 'sales'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Total Sales
              </button>
              <button
                onClick={() => setSortBy('revenue')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sortBy === 'revenue'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue ($)
              </button>
              <button
                onClick={() => setSortBy('conversion')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  sortBy === 'conversion'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Conversion %
              </button>
            </div>

            <button
              onClick={fetchLeaderboardData}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all cursor-pointer disabled:opacity-50"
              title="Refresh Leaderboard"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* CURRENT USER RANK HIGHLIGHT BANNER */}
      {userRankInfo.affiliate ? (
        <div
          className={`p-5 rounded-2xl border transition-all relative overflow-hidden shadow-lg ${
            userRankInfo.isTop10
              ? 'bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border-amber-500/50 shadow-amber-500/10'
              : 'bg-gradient-to-r from-cyan-500/15 via-slate-900 to-indigo-500/15 border-cyan-500/40'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 border ${
                  userRankInfo.rank === 1
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30'
                    : userRankInfo.rank === 2
                    ? 'bg-slate-300 text-slate-950 border-white shadow-md'
                    : userRankInfo.rank === 3
                    ? 'bg-amber-700 text-white border-amber-500'
                    : 'bg-slate-800 text-cyan-400 border-slate-700'
                }`}
              >
                #{userRankInfo.rank}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-black tracking-wider uppercase border border-cyan-500/30">
                    YOUR CURRENT RANK
                  </span>
                  {userRankInfo.isTop10 && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black tracking-wider uppercase border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      TOP 10 ELITE
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-white mt-0.5 flex items-center gap-2">
                  <span>{userRankInfo.affiliate.fullName}</span>
                  <span className="text-xs font-mono text-slate-400 font-normal">(@{userRankInfo.affiliate.username})</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Total Sales: <strong className="text-amber-400 font-mono">{userRankInfo.affiliate.totalSalesCount} orders</strong> | Earnings:{' '}
                  <strong className="text-emerald-400 font-mono">${userRankInfo.affiliate.totalEarnings.toFixed(2)}</strong> | Tier:{' '}
                  <strong className="text-cyan-400">{userRankInfo.affiliate.tier}</strong>
                </p>
              </div>
            </div>

            {/* Motivational Banner / CTA */}
            <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0 w-full sm:w-auto">
              {userRankInfo.isTop10 ? (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-300 flex items-center sm:justify-end gap-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>In Top 10 Leaderboard!</span>
                  </p>
                  <p className="text-[11px] text-slate-400">Keep promoting to reach Rank #1 &amp; unlock Platinum perks!</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-cyan-300 flex items-center sm:justify-end gap-1">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span>Rank #{userRankInfo.rank} of {userRankInfo.totalAffiliates}</span>
                  </p>
                  {userRankInfo.salesToNextRank ? (
                    <p className="text-[11px] text-amber-400 font-semibold">
                      Just {userRankInfo.salesToNextRank} more sale{userRankInfo.salesToNextRank > 1 ? 's' : ''} to climb to Rank #{userRankInfo.rank - 1}!
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : currentUser || currentAffiliate ? (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>You are currently registered as an affiliate. Make your first sale to enter the official Leaderboard!</span>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Join the Partner Program &amp; Rank on the Leaderboard</h4>
              <p className="text-xs text-slate-400">Earn up to 25% commissions on all web app, AI, and software sales.</p>
            </div>
          </div>
          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shrink-0 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Become a Partner Now
          </button>
        </div>
      )}

      {/* TOP 3 PODIUM SHOWCASE */}
      {!isLoading && topAffiliates.length >= 3 && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rank #2 - Silver Podium */}
          {topAffiliates[1] && (
            <div
              className={`p-5 rounded-2xl bg-slate-900/90 border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 md:order-1 ${
                isCurrentUser(topAffiliates[1])
                  ? 'border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 bg-cyan-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-black flex items-center gap-1.5">
                  <Medal className="w-4 h-4 text-slate-300" />
                  RANK #2
                </span>
                {isCurrentUser(topAffiliates[1]) && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-black text-[10px]">YOU</span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {topAffiliates[1].tier}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{topAffiliates[1].fullName}</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">@{topAffiliates[1].username}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Sales</span>
                  <span className="font-mono font-black text-white text-base">{topAffiliates[1].totalSalesCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Earnings</span>
                  <span className="font-mono font-black text-emerald-400 text-base">${topAffiliates[1].totalEarnings.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Rank #1 - Gold Podium (Center & Prominent) */}
          {topAffiliates[0] && (
            <div
              className={`p-6 rounded-2xl bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-900 border-2 transition-all relative overflow-hidden flex flex-col justify-between space-y-4 md:order-2 md:-translate-y-2 shadow-2xl ${
                isCurrentUser(topAffiliates[0])
                  ? 'border-amber-400 shadow-amber-500/30 bg-amber-950/30 ring-2 ring-cyan-400'
                  : 'border-amber-500/60 shadow-amber-500/15'
              }`}
            >
              <div className="absolute top-0 right-0 px-4 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase rounded-bl-xl tracking-wider">
                👑 LEADERBOARD CHAMPION
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/30">
                  <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
                  RANK #1
                </span>
                {isCurrentUser(topAffiliates[0]) && (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-xs animate-pulse">
                    YOU ARE #1!
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/30 text-amber-300 border border-amber-400/40">
                  {topAffiliates[0].tier}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>{topAffiliates[0].fullName}</span>
                </h3>
                <p className="text-xs text-amber-300 font-mono">@{topAffiliates[0].username}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-amber-500/30 text-xs bg-slate-950/60 p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-amber-300/80 block uppercase font-bold">Total Sales</span>
                  <span className="font-mono font-black text-amber-400 text-lg">{topAffiliates[0].totalSalesCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300/80 block uppercase font-bold">Total Earnings</span>
                  <span className="font-mono font-black text-emerald-400 text-lg">${topAffiliates[0].totalEarnings.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Rank #3 - Bronze Podium */}
          {topAffiliates[2] && (
            <div
              className={`p-5 rounded-2xl bg-slate-900/90 border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 md:order-3 ${
                isCurrentUser(topAffiliates[2])
                  ? 'border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 bg-cyan-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-800/30 text-amber-400 border border-amber-700/50 text-xs font-black flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  RANK #3
                </span>
                {isCurrentUser(topAffiliates[2]) && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-black text-[10px]">YOU</span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {topAffiliates[2].tier}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{topAffiliates[2].fullName}</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">@{topAffiliates[2].username}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Sales</span>
                  <span className="font-mono font-black text-white text-base">{topAffiliates[2].totalSalesCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Earnings</span>
                  <span className="font-mono font-black text-emerald-400 text-base">${topAffiliates[2].totalEarnings.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEARCH AND MAIN TOP 10 TABLE */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Full Top 10 Leaderboard Standings</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Updated live from verified affiliate orders and sales commissions.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search partner name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-xl border border-slate-800/80">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Rank</th>
                <th className="px-4 py-3.5">Affiliate Partner</th>
                <th className="px-4 py-3.5">Tier</th>
                <th className="px-4 py-3.5">Total Sales</th>
                <th className="px-4 py-3.5">Sales Revenue</th>
                <th className="px-4 py-3.5">Total Earnings</th>
                <th className="px-4 py-3.5">Conv. Rate</th>
                <th className="px-4 py-3.5 text-right">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Loading top affiliate rankings...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredAffiliates.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    No affiliates found matching "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredAffiliates.map((aff) => {
                  const userIsThisRow = isCurrentUser(aff);
                  return (
                    <tr
                      key={aff.id}
                      className={`transition-colors ${
                        userIsThisRow
                          ? 'bg-cyan-500/20 border-2 border-cyan-400 hover:bg-cyan-500/30'
                          : aff.rank === 1
                          ? 'bg-amber-500/10 hover:bg-amber-500/15'
                          : aff.rank === 2
                          ? 'bg-slate-300/10 hover:bg-slate-300/15'
                          : aff.rank === 3
                          ? 'bg-amber-700/10 hover:bg-amber-700/15'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Rank */}
                      <td className="px-4 py-3.5 font-mono font-black">
                        <div className="flex items-center gap-1.5">
                          {aff.rank === 1 ? (
                            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-amber-500/30">
                              🥇 #1
                            </span>
                          ) : aff.rank === 2 ? (
                            <span className="w-7 h-7 rounded-lg bg-slate-300 text-slate-950 flex items-center justify-center font-bold text-xs">
                              🥈 #2
                            </span>
                          ) : aff.rank === 3 ? (
                            <span className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-xs">
                              🥉 #3
                            </span>
                          ) : (
                            <span className="text-slate-400 pl-2">#{aff.rank}</span>
                          )}
                        </div>
                      </td>

                      {/* Partner Name & Handle */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{aff.fullName}</span>
                              {userIsThisRow && (
                                <span className="px-2 py-0.2 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-black uppercase tracking-wide">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">@{aff.username}</div>
                          </div>
                        </div>
                      </td>

                      {/* Tier */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            aff.tier === 'Platinum'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : aff.tier === 'Gold'
                              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                              : aff.tier === 'Silver'
                              ? 'bg-slate-400/20 text-slate-200 border-slate-400/40'
                              : 'bg-amber-800/20 text-amber-400 border-amber-800/40'
                          }`}
                        >
                          {aff.tier}
                        </span>
                      </td>

                      {/* Total Sales */}
                      <td className="px-4 py-3.5 font-mono font-bold text-white">
                        {aff.totalSalesCount} sales
                      </td>

                      {/* Lifetime Sales Volume */}
                      <td className="px-4 py-3.5 font-mono text-slate-300">
                        ${(aff.lifetimeSalesAmount || 0).toFixed(2)}
                      </td>

                      {/* Total Earnings */}
                      <td className="px-4 py-3.5 font-mono font-bold text-emerald-400">
                        ${(aff.totalEarnings || 0).toFixed(2)}
                      </td>

                      {/* Conversion Rate */}
                      <td className="px-4 py-3.5 font-mono text-cyan-300">
                        {aff.conversionRate || 0}%
                      </td>

                      {/* Badges */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 flex-wrap">
                          {aff.badges?.slice(0, 2).map((b, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[9px] font-semibold"
                            >
                              {b}
                            </span>
                          ))}
                          {(aff.badges?.length || 0) > 2 && (
                            <span className="text-[9px] text-slate-400 font-mono">+{(aff.badges?.length || 0) - 2}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Leaderboard updates automatically whenever a customer completes an order through an affiliate link.</span>
          </div>
          <span>Showing Top {topAffiliates.length} of {totalCount} total affiliates</span>
        </div>
      </div>
    </div>
  );
};
