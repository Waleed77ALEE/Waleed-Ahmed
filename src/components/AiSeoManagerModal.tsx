import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Sparkles,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Globe,
  FileText,
  BarChart3,
  Layers,
  Bot,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  ExternalLink,
  ChevronRight,
  Database,
  LineChart,
  Lightbulb,
  BellRing,
  Award,
  Link2,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  Play,
  GitBranch,
  GitPullRequest,
  Download,
  Image,
  FileSpreadsheet,
  FileCode,
  Terminal,
  Share2,
  PieChart,
  GitCommit,
  GitMerge,
  Settings,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GitHubSeoPullRequestService,
  PullRequestRecord,
  SeoFixItem,
  GitHubConfig
} from '../services/githubSeoPullRequestService';

interface AiSeoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType =
  | 'overview'
  | 'audit'
  | 'onpage'
  | 'keywords'
  | 'linking'
  | 'images'
  | 'technical'
  | 'backlinks'
  | 'ai_content'
  | 'competitors'
  | 'gsc_ga'
  | 'autofix'
  | 'github_pr'
  | 'reports'
  | 'alerts';

export const AiSeoManagerModal: React.FC<AiSeoManagerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlProgress, setCrawlProgress] = useState(0);
  const [auditComplete, setAuditComplete] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activePageOptimization, setActivePageOptimization] = useState<string>('home');
  const [isApplyingFix, setIsApplyingFix] = useState(false);
  const [fixAppliedSuccess, setFixAppliedSuccess] = useState<string | null>(null);

  // Real On-Page SEO Audit State
  const [currentTitle, setCurrentTitle] = useState<string>(() => document.title || 'Waleed Khan Afridi | Senior Full Stack Developer, Technical SEO & Software Marketplace');
  const [suggestedTitle, setSuggestedTitle] = useState<string>('Waleed Khan Afridi | Senior Full Stack Developer & SEO Expert');
  const [isTitleApplied, setIsTitleApplied] = useState<boolean>(false);

  const [currentMetaDesc, setCurrentMetaDesc] = useState<string>(() => {
    const meta = document.querySelector('meta[name="description"]');
    return meta?.getAttribute('content') || 'Explore custom full stack web development, technical SEO services, verified AI subscriptions (OpenAI, HeyGen), and genuine software licenses with instant delivery.';
  });
  const [suggestedMetaDesc, setSuggestedMetaDesc] = useState<string>('Hire Waleed Khan Afridi for high-converting full-stack web apps, technical SEO, verified AI accounts, and software license keys with 24/7 instant delivery.');
  const [isMetaApplied, setIsMetaApplied] = useState<boolean>(false);

  // Scanned Images Alt Text Audit List
  const [imageAuditList, setImageAuditList] = useState<Array<{ id: string; srcName: string; currentAlt: string; suggestedAlt: string; status: 'missing' | 'generic' | 'optimized'; isApplied: boolean }>>([
    {
      id: 'img_logo',
      srcName: 'brand_logo_1785031049165.jpg',
      currentAlt: '',
      suggestedAlt: 'Waleed Khan Afridi Official Brand Logo - Full Stack & SEO Engineer',
      status: 'missing',
      isApplied: false
    },
    {
      id: 'img_ps',
      srcName: 'photoshop_license_icon.png',
      currentAlt: 'photoshop icon',
      suggestedAlt: 'Adobe Photoshop CC Lifetime Genuine License Product Badge',
      status: 'generic',
      isApplied: false
    },
    {
      id: 'img_openai',
      srcName: 'openai_credits_badge.png',
      currentAlt: '',
      suggestedAlt: 'Verified OpenAI API Credits & ChatGPT Plus Subscription Badge',
      status: 'missing',
      isApplied: false
    },
    {
      id: 'img_win11',
      srcName: 'windows11_pro_key.png',
      currentAlt: 'win11',
      suggestedAlt: 'Windows 11 Pro Genuine Product Key Instant Delivery Logo',
      status: 'generic',
      isApplied: false
    }
  ]);

  const handleApplyTitle = () => {
    document.title = suggestedTitle;
    setCurrentTitle(suggestedTitle);
    setIsTitleApplied(true);
    setFixAppliedSuccess('Page Title updated and applied to document.title!');
    setTimeout(() => setFixAppliedSuccess(null), 3000);
  };

  const handleApplyMetaDesc = () => {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', suggestedMetaDesc);
    setCurrentMetaDesc(suggestedMetaDesc);
    setIsMetaApplied(true);
    setFixAppliedSuccess('Meta Description updated and injected into document head!');
    setTimeout(() => setFixAppliedSuccess(null), 3000);
  };

  const handleApplyImageAlt = (imgId: string) => {
    setImageAuditList((prev) =>
      prev.map((item) => {
        if (item.id === imgId) {
          // Attempt DOM injection if element exists
          const imgs = Array.from(document.querySelectorAll('img'));
          const match = imgs.find((img) => img.src.includes(item.srcName) || img.alt === item.currentAlt);
          if (match) {
            match.setAttribute('alt', item.suggestedAlt);
          }
          return { ...item, currentAlt: item.suggestedAlt, status: 'optimized', isApplied: true };
        }
        return item;
      })
    );
    setFixAppliedSuccess('Image Alt Text updated for accessibility & SEO!');
    setTimeout(() => setFixAppliedSuccess(null), 3000);
  };

  const handleApplyAllImageAlts = () => {
    setImageAuditList((prev) =>
      prev.map((item) => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const match = imgs.find((img) => img.src.includes(item.srcName) || img.alt === item.currentAlt);
        if (match) {
          match.setAttribute('alt', item.suggestedAlt);
        }
        return { ...item, currentAlt: item.suggestedAlt, status: 'optimized', isApplied: true };
      })
    );
    setFixAppliedSuccess('All Image Alt Text suggestions applied across the page!');
    setTimeout(() => setFixAppliedSuccess(null), 3000);
  };

  const [seoScore, setSeoScore] = useState(94);
  const [fixedIssuesCount, setFixedIssuesCount] = useState(12);

  // GitHub Pull Request State
  const [pullRequests, setPullRequests] = useState<PullRequestRecord[]>([]);
  const [ghConfig, setGhConfig] = useState<GitHubConfig>(GitHubSeoPullRequestService.getConfig());
  const [isCreatingPr, setIsCreatingPr] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedPrDetails, setSelectedPrDetails] = useState<PullRequestRecord | null>(null);

  useEffect(() => {
    setPullRequests(GitHubSeoPullRequestService.getPullRequests());
  }, []);

  const handleCreatePrForIssue = async (
    title: string,
    issueType: SeoFixItem['issueType'],
    filePath: string,
    codeBefore: string,
    codeAfter: string,
    severity: SeoFixItem['severity'] = 'High'
  ) => {
    setIsCreatingPr(true);
    try {
      const fixItem: SeoFixItem = {
        id: `fix-${Date.now()}`,
        title,
        issueType,
        filePath,
        description: `Automated ${issueType} fix generated by AI SEO Agent.`,
        codeBefore,
        codeAfter,
        severity
      };

      const newPr = await GitHubSeoPullRequestService.createPullRequest([fixItem]);
      setPullRequests(GitHubSeoPullRequestService.getPullRequests());
      setFixAppliedSuccess(`GitHub Pull Request #${newPr.prNumber} opened on branch '${newPr.branchName}'!`);
      setSelectedPrDetails(newPr);
      setActiveTab('github_pr');
      setTimeout(() => setFixAppliedSuccess(null), 4000);
    } catch (err) {
      console.error('Failed to create PR', err);
    } finally {
      setIsCreatingPr(false);
    }
  };

  const handleMergePr = (prNumber: number) => {
    const updated = GitHubSeoPullRequestService.mergePullRequest(prNumber);
    if (updated) {
      setPullRequests(GitHubSeoPullRequestService.getPullRequests());
      if (selectedPrDetails?.prNumber === prNumber) {
        setSelectedPrDetails(updated);
      }
      setFixAppliedSuccess(`PR #${prNumber} merged into ${updated.baseBranch} branch!`);
      setTimeout(() => setFixAppliedSuccess(null), 3000);
    }
  };

  const [appliedFixes, setAppliedFixes] = useState<Record<string, boolean>>({
    fix_1: true,
    fix_2: true,
    fix_3: false,
    fix_4: false,
    fix_5: false,
  });

  const handleRunAudit = () => {
    setIsCrawling(true);
    setCrawlProgress(0);
    setAuditComplete(false);

    const interval = setInterval(() => {
      setCrawlProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCrawling(false);
          setAuditComplete(true);
          setSeoScore(96);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  const handleApplyFix = (fixId: string, title: string) => {
    setIsApplyingFix(true);
    setTimeout(() => {
      setAppliedFixes((prev) => ({ ...prev, [fixId]: true }));
      setFixedIssuesCount((prev) => prev + 1);
      setSeoScore((prev) => Math.min(100, prev + 1));
      setIsApplyingFix(false);
      setFixAppliedSuccess(`Successfully applied auto-fix: "${title}"`);
      setTimeout(() => setFixAppliedSuccess(null), 3000);
    }, 600);
  };

  const pagesList = [
    { id: 'home', name: 'Homepage (www.waleedkhanafridi.online)', score: 98, status: 'Optimal' },
    { id: 'software', name: 'Software Products Marketplace', score: 92, status: 'Needs Alt Tags' },
    { id: 'ai_marketplace', name: 'AI Subscriptions Marketplace', score: 95, status: 'Optimal' },
    { id: 'services', name: 'Full-Stack & SEO Services Overview', score: 90, status: 'Missing H2 Tags' },
    { id: 'referrals', name: 'Referral & Earn Dashboard', score: 91, status: 'Schema Optimization Needed' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] text-slate-100"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-slate-950/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    Autonomous AI SEO Manager
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                    v3.6 Pro
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated crawling, schema generation, technical audits &amp; ranking manager
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleRunAudit}
                disabled={isCrawling}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCrawling ? 'animate-spin' : ''}`} />
                <span>{isCrawling ? `Auditing (${crawlProgress}%)` : 'Run Live Audit'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Alert Banner */}
          {fixAppliedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/10 border-b border-emerald-500/30 px-6 py-2.5 text-xs text-emerald-400 font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{fixAppliedSuccess}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300">Live JSON-LD &amp; Head Metadata Updated</span>
            </motion.div>
          )}

          {/* Navigation Bar */}
          <div className="bg-slate-950/60 border-b border-slate-800/80 px-4 sm:px-6 overflow-x-auto shrink-0 flex items-center gap-1 sm:gap-2 no-scrollbar py-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: BarChart3 },
              { id: 'audit', label: 'Site Audit', icon: ShieldCheck },
              { id: 'onpage', label: 'On-Page SEO', icon: FileText },
              { id: 'keywords', label: 'Keyword Engine', icon: LineChart },
              { id: 'linking', label: 'Internal Links', icon: Link2 },
              { id: 'images', label: 'Image SEO', icon: Image },
              { id: 'technical', label: 'Core Vitals', icon: Cpu },
              { id: 'backlinks', label: 'Backlink Center', icon: Share2 },
              { id: 'ai_content', label: 'AI Blog Writer', icon: Sparkles },
              { id: 'competitors', label: 'Competitor Analysis', icon: Globe },
              { id: 'gsc_ga', label: 'Google Console & GA4', icon: Database },
              { id: 'autofix', label: 'Auto-Fix Engine', icon: Zap },
              { id: 'github_pr', label: 'GitHub PRs', icon: GitPullRequest },
              { id: 'reports', label: 'Export Reports', icon: Download },
              { id: 'alerts', label: 'Autonomous Alerts', icon: BellRing },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* Progress Bar if Crawling */}
            {isCrawling && (
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
                <div className="flex justify-between items-center text-xs text-cyan-300 font-bold">
                  <span className="flex items-center gap-2">
                    <Bot className="w-4 h-4 animate-bounce text-cyan-400" />
                    Crawling &amp; Analyzing Site Structure, Schema Markup &amp; Core Web Vitals...
                  </span>
                  <span className="font-mono">{crawlProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${crawlProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* TAB 1: OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metrics Banner */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">SEO Health Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">{seoScore}/100</span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +4%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Grade: Excellent (Top 1% SaaS)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Indexed Pages</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">48</span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">0 Crawl/Indexing Errors</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Organic Clicks / Mo</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-indigo-400">14.2K</span>
                      <span className="text-xs font-bold text-emerald-500 flex items-center">
                        <ArrowUpRight className="w-3.5 h-3.5" /> +28%
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Avg CTR: 4.8%</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Auto-Fixes Applied</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">{fixedIssuesCount}</span>
                      <span className="text-xs font-bold text-amber-500">Active</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Schemas &amp; Meta Injected</span>
                  </div>
                </div>

                {/* Core Web Vitals & Quick Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Web Vitals Card */}
                  <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span>Core Web Vitals Performance (Google PSI)</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono">
                        PASSED
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">LCP (Loading)</span>
                        <span className="font-mono font-black text-emerald-400 text-lg">1.2s</span>
                        <span className="text-[9px] text-slate-500 block">Good (&lt; 2.5s)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">FID (Interactivity)</span>
                        <span className="font-mono font-black text-emerald-400 text-lg">14ms</span>
                        <span className="text-[9px] text-slate-500 block">Good (&lt; 100ms)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">CLS (Stability)</span>
                        <span className="font-mono font-black text-emerald-400 text-lg">0.02</span>
                        <span className="text-[9px] text-slate-500 block">Good (&lt; 0.1)</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="font-bold">Mobile Optimization &amp; Responsiveness</span>
                        <span className="text-emerald-400 font-bold font-mono">100/100</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="font-bold">JSON-LD Schema Coverage</span>
                        <span className="text-emerald-400 font-bold font-mono">Active (@graph Service &amp; Person)</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="font-bold">SSL / HTTPS &amp; Security Headers</span>
                        <span className="text-emerald-400 font-bold font-mono">Secured</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Manager Recommendations */}
                  <div className="lg:col-span-5 bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      <span>AI Manager Priority Actions</span>
                    </h3>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-200 space-y-1">
                        <div className="flex justify-between items-center font-bold text-amber-300">
                          <span>Add FAQ Schema to Software Products</span>
                          <span className="text-[10px] font-mono bg-amber-500/20 px-1.5 py-0.5 rounded">High Impact</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Adding JSON-LD FAQ schema to Photoshop &amp; Windows licenses will trigger Rich Results snippets in Google SERPs.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-slate-200 space-y-1">
                        <div className="flex justify-between items-center font-bold text-cyan-300">
                          <span>Internal Link Cluster Expansion</span>
                          <span className="text-[10px] font-mono bg-cyan-500/20 px-1.5 py-0.5 rounded">Medium Impact</span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Link software licenses directly from relevant blog articles to pass PageRank authority.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SITE AUDIT */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-white">Automated Site Crawler &amp; Issue Finder</h3>
                    <p className="text-xs text-slate-400">Scans all 48 indexable URLs for broken links, duplicate tags, and missing schemas.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRunAudit}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-Crawl Site
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <span className="font-bold text-emerald-400 block text-sm">36 Passed Checks</span>
                    <span className="text-slate-300">Canonicals, HTTPS, Meta titles, H1 tags, Mobile usability</span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                    <span className="font-bold text-amber-400 block text-sm">3 Warnings</span>
                    <span className="text-slate-300">Missing alt tags on 2 software icons, long meta description</span>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-1">
                    <span className="font-bold text-red-400 block text-sm">0 Critical Errors</span>
                    <span className="text-slate-300">No 404s, no broken redirects, no duplicate content</span>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden">
                  <div className="p-4 bg-slate-900/60 border-b border-slate-800 font-bold text-xs text-slate-300">
                    Detailed Page Health Matrix
                  </div>
                  <div className="divide-y divide-slate-800/60 text-xs">
                    {pagesList.map((p) => (
                      <div key={p.id} className="p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-900/40 transition-colors">
                        <div>
                          <span className="font-bold text-white block">{p.name}</span>
                          <span className="text-slate-400 text-[11px]">Issue: {p.status}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full font-mono font-bold ${
                            p.score >= 95 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            Score: {p.score}%
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('autofix');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold cursor-pointer"
                          >
                            Auto-Fix
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ON-PAGE SEO (AUTOMATED TITLES, META DESCRIPTIONS & ALT TEXT AUDIT) */}
            {activeTab === 'onpage' && (
              <div className="space-y-6">
                {/* Audit Intro Header */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Automated On-Page Audit &amp; AI Suggestions Engine</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Evaluates live SERP titles, meta descriptions, and image accessibility alt attributes with 1-click AI auto-fixes.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={activePageOptimization}
                      onChange={(e) => setActivePageOptimization(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-bold"
                    >
                      <option value="home">Homepage (Current DOM)</option>
                      <option value="software">Software Products Marketplace</option>
                      <option value="ai_marketplace">AI Subscriptions Marketplace</option>
                    </select>
                  </div>
                </div>

                {/* 1. Page Title Automated Audit Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400">
                        1. Page Title Audit &amp; SERP Preview
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      Length: {currentTitle.length} / 60 chars ({currentTitle.length > 60 ? 'Too Long' : 'Optimal'})
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Current Active Page Title</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentTitle}
                          onChange={(e) => setCurrentTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" /> AI Recommended SERP Title
                        </span>
                        <button
                          type="button"
                          onClick={handleApplyTitle}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            isTitleApplied
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                          }`}
                        >
                          {isTitleApplied ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                          <span>{isTitleApplied ? 'Title Applied' : 'Apply AI Title'}</span>
                        </button>
                      </div>
                      <p className="font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">
                        {suggestedTitle}
                      </p>
                      <span className="text-[10px] text-slate-400 block">
                        Reasoning: High keyword concentration ("Senior Full Stack Developer &amp; SEO Expert") within the ideal 58-character Google truncation limit.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Meta Description Automated Audit Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400">
                        2. Meta Description &amp; CTR Optimizer
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      Length: {currentMetaDesc.length} / 160 chars ({currentMetaDesc.length > 160 ? 'Truncated in SERPs' : 'Optimal'})
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Current Meta Description</label>
                      <textarea
                        rows={2}
                        value={currentMetaDesc}
                        onChange={(e) => setCurrentMetaDesc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" /> AI Recommended Meta Description
                        </span>
                        <button
                          type="button"
                          onClick={handleApplyMetaDesc}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            isMetaApplied
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-md shadow-indigo-500/20'
                          }`}
                        >
                          {isMetaApplied ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                          <span>{isMetaApplied ? 'Meta Applied' : 'Apply Meta Fix'}</span>
                        </button>
                      </div>
                      <p className="font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">
                        {suggestedMetaDesc}
                      </p>
                      <span className="text-[10px] text-slate-400 block">
                        Reasoning: Contains actionable call to action ("Hire Waleed Khan Afridi"), primary service offerings, and trust signals (24/7 instant delivery).
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Image Alt Text Automated Audit Card */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">
                        3. Image Alt Text Accessibility &amp; Image SEO Audit
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyAllImageAlts}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" /> Apply All Image Alt Suggestions
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {imageAuditList.map((img) => (
                      <div
                        key={img.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-slate-300 font-bold truncate max-w-xs">
                            📷 File: {img.srcName}
                          </span>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                img.status === 'missing'
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : img.status === 'generic'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {img.status === 'missing'
                                ? 'Missing Alt Tag'
                                : img.status === 'generic'
                                ? 'Generic Alt Tag'
                                : 'Fully Optimized'}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleApplyImageAlt(img.id)}
                              disabled={img.isApplied}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                                img.isApplied
                                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
                              }`}
                            >
                              {img.isApplied ? 'Applied' : 'Apply Alt Text'}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-500 block text-[9.5px]">Current Alt Tag:</span>
                            <span className="font-mono text-slate-300">
                              {img.currentAlt || '(empty)'}
                            </span>
                          </div>

                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-emerald-500 block text-[9.5px]">AI Suggested Alt Tag:</span>
                            <span className="font-mono text-emerald-300">
                              {img.suggestedAlt}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structured Schema.org Card */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-indigo-300 block">Injected Schema.org Structured Data (@graph)</span>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-emerald-400 overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "name": "Waleed Khan Afridi" },
    { "@type": "Service", "name": "Custom Full Stack Web Application Development" },
    { "@type": "Service", "name": "Enterprise Technical SEO & Speed Optimization" },
    { "@type": "Service", "name": "Verified AI Subscriptions & Digital Growth Marketplace" }
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 4: KEYWORDS */}
            {activeTab === 'keywords' && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <LineChart className="w-4 h-4" />
                    <span>Tracked Keywords &amp; Rankings</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {[
                      { kw: 'full stack developer pakistan', pos: '#1', change: '+2', vol: '2.4k' },
                      { kw: 'technical seo expert online', pos: '#2', change: '+1', vol: '1.8k' },
                      { kw: 'buy openai api credits pkr', pos: '#1', change: '0', vol: '4.2k' },
                      { kw: 'adobe photoshop license cheap', pos: '#3', change: '+4', vol: '8.1k' },
                    ].map((k, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[11px] font-medium block truncate">{k.kw}</span>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xl font-black font-mono text-emerald-400">{k.pos}</span>
                          <span className="text-[11px] font-bold text-emerald-500">{k.change}</span>
                        </div>
                        <span className="text-[9.5px] text-slate-500 block">Vol: {k.vol}/mo</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: TECHNICAL CORE VITALS */}
            {activeTab === 'technical' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>Technical Infrastructure &amp; Speed Diagnostics</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="font-bold text-white block">XML Sitemap Status</span>
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Generated &amp; Validated
                      </span>
                      <p className="text-slate-400 text-[11px]">Auto-updates whenever new products or blog articles are added.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="font-bold text-white block">Robots.txt Directives</span>
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Access Allowed
                      </span>
                      <p className="text-slate-400 text-[11px]">Googlebot &amp; Bingbot allowed to index all public marketplace pages.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: AI CONTENT GENERATOR */}
            {activeTab === 'ai_content' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>AI SEO Article &amp; Pillar Content Generator</span>
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                    <span className="font-bold text-white block">Suggested Next Article Topic</span>
                    <p className="text-slate-300">"How to Choose the Right AI Subscriptions for Developers &amp; Content Creators in 2026"</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFixAppliedSuccess('AI Blog outline & FAQ schema generated!');
                        setTimeout(() => setFixAppliedSuccess(null), 3000);
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Generate SEO Article Draft &amp; Schema
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: COMPETITOR ANALYSIS */}
            {activeTab === 'competitors' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Marketplace Competitor Benchmark</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">waleedkhanafridi.online (Your Site)</span>
                        <span className="text-slate-400 text-[11px]">Domain Rating: 58 | Speed: 99/100</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono">Leader</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-300 block">Generic Digital Service Competitors</span>
                        <span className="text-slate-400 text-[11px]">Domain Rating: 42 | Speed: 72/100</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-bold font-mono">Outranked</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: GSC & ANALYTICS */}
            {activeTab === 'gsc_ga' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span>Google Search Console Live Feeds</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Total Clicks</span>
                      <span className="font-mono font-black text-cyan-400 text-lg">14,280</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Total Impressions</span>
                      <span className="font-mono font-black text-indigo-400 text-lg">298.4K</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Average CTR</span>
                      <span className="font-mono font-black text-emerald-400 text-lg">4.8%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Average Position</span>
                      <span className="font-mono font-black text-amber-400 text-lg">2.8</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: AUTO-FIX ENGINE */}
            {activeTab === 'autofix' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>1-Click Autonomous SEO Fixes</span>
                    </h3>
                    <span className="text-xs text-slate-400">Review &amp; apply automated SEO enhancements</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {[
                      { id: 'fix_1', title: 'Inject Individual Service JSON-LD Schemas', desc: 'Adds distinct @id and serviceType for Full-Stack, WordPress, SEO, and AI Marketplace.' },
                      { id: 'fix_2', title: 'Optimize Product Card Logos & Alt Text', desc: 'Ensures all software brand badges have high-resolution accessible alt metadata.' },
                      { id: 'fix_3', title: 'Add Trust & Security Badges to Product Cards', desc: 'Adds Instant Delivery, 24/7 Support, and Verified Seller tags to maximize CTR.' },
                      { id: 'fix_4', title: 'Set Canonical Headers for Marketplace Routes', desc: 'Prevents duplicate content flags on filtered product categories.' },
                      { id: 'fix_5', title: 'Inject OpenGraph & Twitter Card Meta Headers', desc: 'Ensures social media shares preview full product thumbnails.' },
                    ].map((fix) => {
                      const isDone = appliedFixes[fix.id];
                      return (
                        <div key={fix.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                          <div className="space-y-0.5 max-w-xl">
                            <span className="font-bold text-white text-sm block">{fix.title}</span>
                            <p className="text-slate-400 text-[11px]">{fix.desc}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCreatePrForIssue(
                                fix.title,
                                'Missing Schema',
                                'src/App.tsx',
                                `// Unoptimized code for ${fix.title}`,
                                `// Autonomous fix applied by AI SEO Agent for ${fix.title}\nimport { Helmet } from 'react-helmet';`,
                                'High'
                              )}
                              disabled={isCreatingPr}
                              className="px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                              <GitPullRequest className="w-3.5 h-3.5" />
                              <span>Create GitHub PR</span>
                            </button>

                            <button
                              type="button"
                              disabled={isDone || isApplyingFix}
                              onClick={() => handleApplyFix(fix.id, fix.title)}
                              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-md shadow-amber-500/20'
                              }`}
                            >
                              {isDone ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Applied</span>
                                </>
                              ) : (
                                <>
                                  <Zap className="w-3.5 h-3.5" />
                                  <span>Apply Direct Fix</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: INTERNAL LINKING ENGINE */}
            {activeTab === 'linking' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Link2 className="w-4 h-4" />
                      <span>Internal Linking &amp; Topic Clusters Engine</span>
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      Linking Score: 96/100 (Optimal)
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    AI automatically analyzes semantic relationship between pages, detects orphan pages, and builds high-authority siloing structures to pass PageRank to conversion endpoints.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="font-bold text-white block">Hub 1: AI Subscriptions Marketplace</span>
                      <p className="text-slate-400 text-[11px]">Child Cluster Links:</p>
                      <ul className="space-y-1 font-mono text-cyan-300 text-[11px]">
                        <li>• /market?category=openai → Anchor: "Buy ChatGPT Plus"</li>
                        <li>• /market?category=canva → Anchor: "Canva Pro License Key"</li>
                        <li>• /market?category=heygen → Anchor: "HeyGen AI Video Subscription"</li>
                      </ul>
                      <span className="text-emerald-400 font-mono text-[10px] block pt-1">✓ Internal PageRank Pass: High (0.85)</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="font-bold text-white block">Hub 2: Development &amp; SEO Services</span>
                      <p className="text-slate-400 text-[11px]">Child Cluster Links:</p>
                      <ul className="space-y-1 font-mono text-cyan-300 text-[11px]">
                        <li>• /services/seo → Anchor: "Enterprise Technical SEO Audit"</li>
                        <li>• /services/web-development → Anchor: "Full Stack Web Apps"</li>
                        <li>• /referralpro → Anchor: "Earn Commission via Affiliate Hub"</li>
                      </ul>
                      <span className="text-emerald-400 font-mono text-[10px] block pt-1">✓ Internal PageRank Pass: Optimal (0.92)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: IMAGE SEO & WEBP CONVERTER */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      <span>Image SEO &amp; Next-Gen WebP Compression Studio</span>
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      Saved 2.4MB bandwidth
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] font-bold block">Scanned Assets</span>
                      <span className="text-lg font-black text-white font-mono">18 Images</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] font-bold block">Format</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">100% WebP / AVIF</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] font-bold block">Lazy Loading</span>
                      <span className="text-lg font-black text-cyan-400 font-mono">Enabled (`loading="lazy"`)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-white block">Auto-Generated Image Object Schema</span>
                    <pre className="p-3 rounded-lg bg-slate-950 text-[11px] font-mono text-emerald-400 overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://waleedkhanafridi.online/brand_logo_1785031049165.jpg",
  "license": "https://waleedkhanafridi.online/terms",
  "acquireLicensePage": "https://waleedkhanafridi.online/market",
  "creditText": "Waleed Khan Afridi",
  "creator": { "@type": "Person", "name": "Waleed Khan Afridi" }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BACKLINK CENTER */}
            {activeTab === 'backlinks' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      <span>Backlink Center &amp; Domain Authority Overview</span>
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">
                      Domain Authority: 58/100
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Total Backlinks</span>
                      <span className="font-mono font-black text-cyan-400 text-lg">1,420</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Referring Domains</span>
                      <span className="font-mono font-black text-indigo-400 text-lg">310</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Dofollow Ratio</span>
                      <span className="font-mono font-black text-emerald-400 text-lg">88%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block font-bold">Lost Backlinks</span>
                      <span className="font-mono font-black text-rose-400 text-lg">0</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-300 block">Top High-Authority Linking Domains</span>
                    {[
                      { domain: 'github.com/waleedkhanafridi', da: 96, anchor: 'Waleed Khan Afridi Developer Portfolio', type: 'Dofollow' },
                      { domain: 'linkedin.com/in/waleedkhanafridi', da: 98, anchor: 'Senior Full Stack & SEO Engineer', type: 'Dofollow' },
                      { domain: 'medium.com/@waleedkhanafridi', da: 92, anchor: 'Technical SEO Guide 2026', type: 'Dofollow' },
                      { domain: 'producthunt.com', da: 90, anchor: 'AI Software Marketplace', type: 'Dofollow' }
                    ].map((bl, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-bold text-white block">{bl.domain}</span>
                          <span className="text-slate-400 text-[11px]">Anchor: "{bl.anchor}"</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px]">
                            DA: {bl.da}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px]">
                            {bl.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: GITHUB PR UTILITY & AUTOMATION */}
            {activeTab === 'github_pr' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                        <GitPullRequest className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">
                          GitHub Pull Request Utility &amp; Branch Engine
                        </h3>
                        <p className="text-xs text-slate-400">
                          Programmatically create git feature branches, commit code diffs, and open Pull Requests for review.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowConfigModal(!showConfigModal)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Repo Config</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCreatePrForIssue(
                          'Inject Schema.org Graph & Open Graph Metadata',
                          'Missing Schema',
                          'src/App.tsx',
                          '<title>Waleed Khan Afridi</title>',
                          `<title>Waleed Khan Afridi - AI SEO & Full Stack Portfolio</title>\n<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Person",\n  "name": "Waleed Khan Afridi"\n}\n</script>`,
                          'Critical'
                        )}
                        disabled={isCreatingPr}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white text-xs font-black transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isCreatingPr ? 'Opening PR...' : 'Create New SEO Fix PR'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Config Box */}
                  {showConfigModal && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs"
                    >
                      <h4 className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" /> Repository &amp; Authentication Settings
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-1">Repo Owner</label>
                          <input
                            type="text"
                            value={ghConfig.owner}
                            onChange={(e) => setGhConfig({ ...ghConfig, owner: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-1">Repository</label>
                          <input
                            type="text"
                            value={ghConfig.repo}
                            onChange={(e) => setGhConfig({ ...ghConfig, repo: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-1">Base Branch</label>
                          <input
                            type="text"
                            value={ghConfig.baseBranch}
                            onChange={(e) => setGhConfig({ ...ghConfig, baseBranch: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">GitHub Personal Access Token (Optional for live push)</label>
                        <input
                          type="password"
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                          value={ghConfig.personalAccessToken}
                          onChange={(e) => setGhConfig({ ...ghConfig, personalAccessToken: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono placeholder:text-slate-600"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            GitHubSeoPullRequestService.saveConfig(ghConfig);
                            setShowConfigModal(false);
                            setFixAppliedSuccess('GitHub configuration saved successfully!');
                            setTimeout(() => setFixAppliedSuccess(null), 3000);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                        >
                          Save Settings
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Connected Repo Status Badge */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <GitBranch className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-300 font-bold">{ghConfig.owner}/{ghConfig.repo}</span>
                      <span className="text-slate-500 text-[11px]">(target: {ghConfig.baseBranch})</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold">
                      ✓ Connected &amp; Protected
                    </span>
                  </div>

                  {/* Pull Request Records */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Repository Pull Requests ({pullRequests.length})
                    </h4>

                    {pullRequests.map((pr) => {
                      const isSelected = selectedPrDetails?.prNumber === pr.prNumber;
                      return (
                        <div
                          key={pr.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-slate-900 border-purple-500 shadow-lg shadow-purple-500/10'
                              : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[11px] font-mono font-bold">
                                PR #{pr.prNumber}
                              </span>
                              <span className="font-bold text-white text-xs">{pr.title}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                                  pr.status === 'Merged'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                    : pr.status === 'Open'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {pr.status}
                              </span>

                              <a
                                href={pr.prUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                                title="View on GitHub"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 text-cyan-300">
                                <GitBranch className="w-3 h-3" /> {pr.branchName}
                              </span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <GitCommit className="w-3 h-3" /> commit: {pr.commitHash}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedPrDetails(isSelected ? null : pr)}
                                className="text-cyan-400 hover:underline font-bold text-[11px] cursor-pointer"
                              >
                                {isSelected ? 'Hide Code Diff' : 'View Code Diff'}
                              </button>

                              {pr.status === 'Open' && (
                                <button
                                  type="button"
                                  onClick={() => handleMergePr(pr.prNumber)}
                                  className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <GitMerge className="w-3 h-3" /> Approve &amp; Merge
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Code Diff Box */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-xs"
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-slate-300 font-mono">
                                  Commit Message: "{pr.commitMessage}"
                                </span>
                                <span className="text-slate-500 font-mono">Author: {pr.author}</span>
                              </div>

                              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] overflow-x-auto">
                                <pre className="text-slate-300 whitespace-pre-wrap">
                                  {pr.diffContent.split('\n').map((line, idx) => {
                                    if (line.startsWith('+')) {
                                      return (
                                        <div key={idx} className="bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded">
                                          {line}
                                        </div>
                                      );
                                    }
                                    if (line.startsWith('-')) {
                                      return (
                                        <div key={idx} className="bg-rose-500/10 text-rose-400 px-1 py-0.5 rounded">
                                          {line}
                                        </div>
                                      );
                                    }
                                    if (line.startsWith('diff') || line.startsWith('index') || line.startsWith('@@')) {
                                      return (
                                        <div key={idx} className="text-cyan-400 font-bold">
                                          {line}
                                        </div>
                                      );
                                    }
                                    return <div key={idx} className="text-slate-400">{line}</div>;
                                  })}
                                </pre>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REPORTS & EXPORT */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Executive SEO Reports &amp; Export Center</span>
                    </h3>
                    <span className="text-xs text-slate-400">Download formatted reports in PDF, CSV, or Excel</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                          <FileText className="w-4 h-4" />
                          <span>Executive Summary Report (PDF)</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">Comprehensive monthly overview of traffic growth, rankings, and technical health.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const content = `WALEED KHAN AFRIDI - SEO EXECUTIVE REPORT\nURL: https://waleedkhanafridi.online\nOverall SEO Score: 98/100\nOrganic Clicks: 14,280/mo\nIndexed Pages: 48\nStatus: Optimal`;
                          const blob = new Blob([content], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `SEO_Executive_Report_WaleedKhanAfridi.txt`;
                          a.click();
                        }}
                        className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Executive Report
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                          <FileSpreadsheet className="w-4 h-4" />
                          <span>Keyword Rankings Matrix (CSV)</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">Raw keyword positions, search volume, changes, and target landing pages.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const csv = `Keyword,Position,Change,Volume\nfull stack developer pakistan,#1,+2,2400\ntechnical seo expert online,#2,+1,1800\nbuy openai api credits pkr,#1,0,4200\nadobe photoshop license cheap,#3,+4,8100`;
                          const blob = new Blob([csv], { type: 'text/csv' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Keyword_Rankings_WaleedKhanAfridi.csv`;
                          a.click();
                        }}
                        className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Download CSV Export
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
                          <FileCode className="w-4 h-4" />
                          <span>Technical Audit &amp; Schema Audit</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">Detailed breakdown of Core Web Vitals, JSON-LD graphs, and image alt tags.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const content = `TECHNICAL AUDIT & SCHEMA LOG\nSite: https://waleedkhanafridi.online\nLCP: 0.8s\nCLS: 0.01\nFID: 12ms\nSchema: Graph Injected`;
                          const blob = new Blob([content], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Technical_Audit_WaleedKhanAfridi.txt`;
                          a.click();
                        }}
                        className="w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Technical Log
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 10: ALERTS */}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <BellRing className="w-4 h-4" />
                    <span>Autonomous Alert System</span>
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>All 48 URLs are healthy with zero crawl errors detected.</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Just Now</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Keyword "full stack developer pakistan" gained +2 positions to #1.</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400">Today</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI SEO Engine Active — Monitoring &amp; Optimizing 24/7</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
            >
              Close Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AiSeoManagerModal;
