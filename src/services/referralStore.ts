import { RegisteredUserRecord } from './userStore';

export interface CommissionRecord {
  id: string;
  referrerUsername: string;
  referrerId?: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  category: 'AI Subscriptions' | 'Web Design' | 'Graphic Design' | 'SEO Services' | 'Windows Software' | 'Video Editing' | 'Hosting' | 'General';
  orderId: string;
  orderAmount: number;
  commissionRate: number; // percentage, e.g. 15
  commissionAmount: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
  date: string;
  ipAddress?: string;
  notes?: string;
}

export interface WithdrawalRequest {
  id: string;
  username: string;
  amount: number;
  method: 'Binance Pay (USDT)' | 'JazzCash' | 'Easypaisa' | 'Payoneer' | 'Bank Transfer';
  accountDetails: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Rejected';
  requestedAt: string;
  processedAt?: string;
  transactionRef?: string;
}

export interface ReferralClickLog {
  id: string;
  referrerUsername: string;
  targetUrl: string;
  pathName: string;
  utmSource?: string;
  timestamp: string;
}

export interface AffiliatePartnerProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalSalesCount: number;
  totalEarnings: number;
  pendingCommission: number;
  paidCommission: number;
  availableBalance: number;
  totalReferralClicks: number;
  conversionRate: number; // percentage
  lifetimeSalesAmount: number;
  monthlySalesAmount: number;
  referralCode: string;
  customCouponCode?: string;
  paymentMethod?: string;
  paymentAccountDetails?: string;
  status: 'Active' | 'Suspended';
  createdAt: string;
  badges: string[];
}

export interface ReferralAdminSettings {
  minWithdrawal: number; // default 10 USD
  cookieDurationDays: number; // default 30
  categoryRates: {
    'AI Subscriptions': number;
    'Web Design': number;
    'Graphic Design': number;
    'SEO Services': number;
    'Windows Software': number;
    'Video Editing': number;
    'Hosting': number;
  };
  tierRates: {
    Bronze: number;
    Silver: number;
    Gold: number;
    Platinum: number;
  };
  autoApproveAfterDays: number;
}

const REFERRAL_COOKIE_KEY = 'referralpro_partner_ref';
const REFERRAL_COOKIE_EXPIRY = 'referralpro_ref_expiry';
const REFERRAL_STORE_KEY = 'referralpro_app_state_v1';

const DEFAULT_ADMIN_SETTINGS: ReferralAdminSettings = {
  minWithdrawal: 10,
  cookieDurationDays: 30,
  categoryRates: {
    'AI Subscriptions': 15,
    'Web Design': 20,
    'Graphic Design': 15,
    'SEO Services': 15,
    'Windows Software': 10,
    'Video Editing': 20,
    'Hosting': 10
  },
  tierRates: {
    Bronze: 10,
    Silver: 15,
    Gold: 20,
    Platinum: 25
  },
  autoApproveAfterDays: 7
};

// Initial Sample Data for demonstration and instant testing
const INITIAL_AFFILIATES: AffiliatePartnerProfile[] = [
  {
    id: 'aff_1',
    username: 'WALEED123',
    fullName: 'Waleed Khan (Partner)',
    email: 'partner.waleed@gmail.com',
    tier: 'Platinum',
    totalSalesCount: 124,
    totalEarnings: 2480.50,
    pendingCommission: 340.00,
    paidCommission: 2140.50,
    availableBalance: 340.00,
    totalReferralClicks: 1850,
    conversionRate: 6.7,
    lifetimeSalesAmount: 12400.00,
    monthlySalesAmount: 1850.00,
    referralCode: 'WALEED123',
    customCouponCode: 'WALEED10',
    paymentMethod: 'Binance Pay (USDT)',
    paymentAccountDetails: 'Binance Pay ID: 284910381 (USDT TRC20)',
    status: 'Active',
    createdAt: '2026-01-15T10:00:00Z',
    badges: ['First Referral', 'Fast Starter', 'Super Affiliate', 'Century Club', 'Conversion Master']
  },
  {
    id: 'aff_2',
    username: 'ALIMARKETING',
    fullName: 'Ali Hassan Digital',
    email: 'ali.hassan@digitalpakistan.com',
    tier: 'Gold',
    totalSalesCount: 42,
    totalEarnings: 780.00,
    pendingCommission: 120.00,
    paidCommission: 660.00,
    availableBalance: 120.00,
    totalReferralClicks: 620,
    conversionRate: 6.8,
    lifetimeSalesAmount: 3900.00,
    monthlySalesAmount: 650.00,
    referralCode: 'ALIMARKETING',
    customCouponCode: 'ALI15',
    paymentMethod: 'JazzCash',
    paymentAccountDetails: 'JazzCash 03001234567 (Ali Hassan)',
    status: 'Active',
    createdAt: '2026-03-01T14:20:00Z',
    badges: ['First Referral', 'Fast Starter', 'Gold Member']
  },
  {
    id: 'aff_3',
    username: 'SARA_SEO',
    fullName: 'Sara Ahmed SEO Agency',
    email: 'sara@seobooster.io',
    tier: 'Silver',
    totalSalesCount: 18,
    totalEarnings: 310.00,
    pendingCommission: 45.00,
    paidCommission: 265.00,
    availableBalance: 45.00,
    totalReferralClicks: 310,
    conversionRate: 5.8,
    lifetimeSalesAmount: 1550.00,
    monthlySalesAmount: 310.00,
    referralCode: 'SARA_SEO',
    customCouponCode: 'SARA10',
    paymentMethod: 'Easypaisa',
    paymentAccountDetails: 'Easypaisa 03459876543',
    status: 'Active',
    createdAt: '2026-04-10T11:00:00Z',
    badges: ['First Referral', 'Silver Partner']
  },
  {
    id: 'aff_4',
    username: 'HAMZA_TECH',
    fullName: 'Hamza Tech Solutions',
    email: 'hamza.tech@gmail.com',
    tier: 'Gold',
    totalSalesCount: 88,
    totalEarnings: 1760.00,
    pendingCommission: 220.00,
    paidCommission: 1540.00,
    availableBalance: 220.00,
    totalReferralClicks: 1120,
    conversionRate: 7.8,
    lifetimeSalesAmount: 8800.00,
    monthlySalesAmount: 1200.00,
    referralCode: 'HAMZA_TECH',
    customCouponCode: 'HAMZA10',
    paymentMethod: 'Binance Pay (USDT)',
    paymentAccountDetails: 'Binance Pay ID: 778192031',
    status: 'Active',
    createdAt: '2026-02-01T09:15:00Z',
    badges: ['First Referral', 'Gold Member', 'Top Tech Referrer']
  },
  {
    id: 'aff_5',
    username: 'ZAIN_DESIGN',
    fullName: 'Zain Visuals Studio',
    email: 'zain@visuals.pk',
    tier: 'Gold',
    totalSalesCount: 65,
    totalEarnings: 1300.00,
    pendingCommission: 180.00,
    paidCommission: 1120.00,
    availableBalance: 180.00,
    totalReferralClicks: 890,
    conversionRate: 7.3,
    lifetimeSalesAmount: 6500.00,
    monthlySalesAmount: 950.00,
    referralCode: 'ZAIN_DESIGN',
    customCouponCode: 'ZAIN15',
    paymentMethod: 'JazzCash',
    paymentAccountDetails: 'JazzCash 03129876543',
    status: 'Active',
    createdAt: '2026-02-14T15:30:00Z',
    badges: ['First Referral', 'Design Pioneer', 'Gold Member']
  },
  {
    id: 'aff_6',
    username: 'FATIMA_AI',
    fullName: 'Fatima Noor AI Hub',
    email: 'fatima@aihub.co',
    tier: 'Silver',
    totalSalesCount: 29,
    totalEarnings: 580.00,
    pendingCommission: 90.00,
    paidCommission: 490.00,
    availableBalance: 90.00,
    totalReferralClicks: 430,
    conversionRate: 6.7,
    lifetimeSalesAmount: 2900.00,
    monthlySalesAmount: 480.00,
    referralCode: 'FATIMA_AI',
    customCouponCode: 'FATIMA10',
    paymentMethod: 'Payoneer',
    paymentAccountDetails: 'fatima.noor@payoneer.com',
    status: 'Active',
    createdAt: '2026-03-12T10:00:00Z',
    badges: ['First Referral', 'AI Advocate']
  },
  {
    id: 'aff_7',
    username: 'USMAN_DEV',
    fullName: 'Usman Software House',
    email: 'usman@usmandev.net',
    tier: 'Silver',
    totalSalesCount: 24,
    totalEarnings: 480.00,
    pendingCommission: 70.00,
    paidCommission: 410.00,
    availableBalance: 70.00,
    totalReferralClicks: 380,
    conversionRate: 6.3,
    lifetimeSalesAmount: 2400.00,
    monthlySalesAmount: 360.00,
    referralCode: 'USMAN_DEV',
    customCouponCode: 'USMAN10',
    paymentMethod: 'Bank Transfer',
    paymentAccountDetails: 'HBL IBAN PK44HABB00012345678901',
    status: 'Active',
    createdAt: '2026-03-20T11:45:00Z',
    badges: ['First Referral', 'Code Craftsman']
  },
  {
    id: 'aff_8',
    username: 'AYESHA_MEDIA',
    fullName: 'Ayesha Marketing Suite',
    email: 'ayesha@marketingsuite.com',
    tier: 'Silver',
    totalSalesCount: 15,
    totalEarnings: 300.00,
    pendingCommission: 40.00,
    paidCommission: 260.00,
    availableBalance: 40.00,
    totalReferralClicks: 260,
    conversionRate: 5.7,
    lifetimeSalesAmount: 1500.00,
    monthlySalesAmount: 280.00,
    referralCode: 'AYESHA_MEDIA',
    customCouponCode: 'AYESHA10',
    paymentMethod: 'Easypaisa',
    paymentAccountDetails: 'Easypaisa 03331122334',
    status: 'Active',
    createdAt: '2026-04-01T08:00:00Z',
    badges: ['First Referral', 'Social Master']
  },
  {
    id: 'aff_9',
    username: 'BILAL_GROWTH',
    fullName: 'Bilal Growth Hackers',
    email: 'bilal@growthhackers.io',
    tier: 'Bronze',
    totalSalesCount: 9,
    totalEarnings: 180.00,
    pendingCommission: 30.00,
    paidCommission: 150.00,
    availableBalance: 30.00,
    totalReferralClicks: 190,
    conversionRate: 4.7,
    lifetimeSalesAmount: 900.00,
    monthlySalesAmount: 180.00,
    referralCode: 'BILAL_GROWTH',
    customCouponCode: 'BILAL10',
    paymentMethod: 'Binance Pay (USDT)',
    paymentAccountDetails: 'Binance Pay ID: 994821034',
    status: 'Active',
    createdAt: '2026-04-18T16:20:00Z',
    badges: ['First Referral', 'Rising Star']
  },
  {
    id: 'aff_10',
    username: 'OMAR_APPS',
    fullName: 'Omar Mobile Studio',
    email: 'omar@omaraffiliates.com',
    tier: 'Bronze',
    totalSalesCount: 7,
    totalEarnings: 140.00,
    pendingCommission: 25.00,
    paidCommission: 115.00,
    availableBalance: 25.00,
    totalReferralClicks: 140,
    conversionRate: 5.0,
    lifetimeSalesAmount: 700.00,
    monthlySalesAmount: 140.00,
    referralCode: 'OMAR_APPS',
    customCouponCode: 'OMAR10',
    paymentMethod: 'JazzCash',
    paymentAccountDetails: 'JazzCash 03019988776',
    status: 'Active',
    createdAt: '2026-05-02T13:10:00Z',
    badges: ['First Referral']
  },
  {
    id: 'aff_11',
    username: 'NIDA_WRITER',
    fullName: 'Nida Content Studio',
    email: 'nida@contentstudio.org',
    tier: 'Bronze',
    totalSalesCount: 4,
    totalEarnings: 80.00,
    pendingCommission: 15.00,
    paidCommission: 65.00,
    availableBalance: 15.00,
    totalReferralClicks: 95,
    conversionRate: 4.2,
    lifetimeSalesAmount: 400.00,
    monthlySalesAmount: 80.00,
    referralCode: 'NIDA_WRITER',
    customCouponCode: 'NIDA10',
    paymentMethod: 'Easypaisa',
    paymentAccountDetails: 'Easypaisa 03215544332',
    status: 'Active',
    createdAt: '2026-05-15T09:40:00Z',
    badges: ['First Referral']
  },
  {
    id: 'aff_12',
    username: 'RASHID_HOSTING',
    fullName: 'Rashid Cloud Services',
    email: 'rashid@cloudservices.pk',
    tier: 'Bronze',
    totalSalesCount: 2,
    totalEarnings: 40.00,
    pendingCommission: 10.00,
    paidCommission: 30.00,
    availableBalance: 10.00,
    totalReferralClicks: 50,
    conversionRate: 4.0,
    lifetimeSalesAmount: 200.00,
    monthlySalesAmount: 40.00,
    referralCode: 'RASHID_HOSTING',
    customCouponCode: 'RASHID10',
    paymentMethod: 'Bank Transfer',
    paymentAccountDetails: 'Meezan Bank 01020304050607',
    status: 'Active',
    createdAt: '2026-06-01T14:00:00Z',
    badges: ['First Referral']
  }
];

const INITIAL_COMMISSIONS: CommissionRecord[] = [
  {
    id: 'comm_101',
    referrerUsername: 'WALEED123',
    customerName: 'Hamza Malik',
    customerEmail: 'hamza.m@gmail.com',
    productName: 'OpenAI Dev API Tier 4 ($500 Credits)',
    category: 'AI Subscriptions',
    orderId: 'ORD-98214',
    orderAmount: 350.00,
    commissionRate: 15,
    commissionAmount: 52.50,
    status: 'Paid',
    date: '2026-07-28'
  },
  {
    id: 'comm_102',
    referrerUsername: 'WALEED123',
    customerName: 'TechVibe Agency',
    customerEmail: 'info@techvibe.co',
    productName: 'Full-Stack Custom Web Portal Development',
    category: 'Web Design',
    orderId: 'ORD-98230',
    orderAmount: 1200.00,
    commissionRate: 20,
    commissionAmount: 240.00,
    status: 'Approved',
    date: '2026-07-29'
  },
  {
    id: 'comm_103',
    referrerUsername: 'ALIMARKETING',
    customerName: 'Usman Chaudhry',
    customerEmail: 'usman.c@yahoo.com',
    productName: 'ChatGPT Plus Dedicated Account (1 Year)',
    category: 'AI Subscriptions',
    orderId: 'ORD-98245',
    orderAmount: 120.00,
    commissionRate: 15,
    commissionAmount: 18.00,
    status: 'Pending',
    date: '2026-07-30'
  },
  {
    id: 'comm_104',
    referrerUsername: 'SARA_SEO',
    customerName: 'Digital Edge UK',
    customerEmail: 'contact@digitaledge.uk',
    productName: 'Technical Audit & SEO Backlink Campaign',
    category: 'SEO Services',
    orderId: 'ORD-98251',
    orderAmount: 300.00,
    commissionRate: 15,
    commissionAmount: 45.00,
    status: 'Pending',
    date: '2026-07-30'
  }
];

const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wdr_101',
    username: 'WALEED123',
    amount: 500.00,
    method: 'Binance Pay (USDT)',
    accountDetails: 'Binance Pay ID: 284910381',
    status: 'Completed',
    requestedAt: '2026-07-20T12:00:00Z',
    processedAt: '2026-07-20T14:30:00Z',
    transactionRef: 'TXN-BNP-99214812'
  },
  {
    id: 'wdr_102',
    username: 'ALIMARKETING',
    amount: 150.00,
    method: 'JazzCash',
    accountDetails: '03001234567 (Ali Hassan)',
    status: 'Completed',
    requestedAt: '2026-07-25T10:00:00Z',
    processedAt: '2026-07-25T11:15:00Z',
    transactionRef: 'JC-883192031'
  }
];

// Helper to calculate tier from sales count
export function calculateTier(salesCount: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' {
  if (salesCount >= 100) return 'Platinum';
  if (salesCount >= 30) return 'Gold';
  if (salesCount >= 10) return 'Silver';
  return 'Bronze';
}

// Local Storage Helper
function getStoredData() {
  try {
    const raw = localStorage.getItem(REFERRAL_STORE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse referral store data', e);
  }

  return {
    settings: DEFAULT_ADMIN_SETTINGS,
    affiliates: INITIAL_AFFILIATES,
    commissions: INITIAL_COMMISSIONS,
    withdrawals: INITIAL_WITHDRAWALS,
    clicksLog: []
  };
}

function saveStoredData(data: any) {
  try {
    localStorage.setItem(REFERRAL_STORE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save referral store data', e);
  }
}

// Track URL referral parameter
export function trackReferralFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref') || urlParams.get('referrer') || urlParams.get('affiliate');

  if (!refCode) return getActiveReferralCode();

  const codeUpper = refCode.trim().toUpperCase();

  // Save in localStorage & Cookie with 30-day expiry
  const now = new Date();
  const days = DEFAULT_ADMIN_SETTINGS.cookieDurationDays;
  const expiryDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  try {
    localStorage.setItem(REFERRAL_COOKIE_KEY, codeUpper);
    localStorage.setItem(REFERRAL_COOKIE_EXPIRY, expiryDate.toISOString());
    document.cookie = `${REFERRAL_COOKIE_KEY}=${codeUpper}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  } catch (e) {
    console.error('Could not store referral cookie', e);
  }

  // Increment clicks in store
  recordReferralClick(codeUpper, window.location.href);

  return codeUpper;
}

export function getActiveReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const expiryStr = localStorage.getItem(REFERRAL_COOKIE_EXPIRY);
    if (expiryStr) {
      const expiry = new Date(expiryStr);
      if (new Date() > expiry) {
        localStorage.removeItem(REFERRAL_COOKIE_KEY);
        localStorage.removeItem(REFERRAL_COOKIE_EXPIRY);
        return null;
      }
    }
    return localStorage.getItem(REFERRAL_COOKIE_KEY);
  } catch (e) {
    return null;
  }
}

export function recordReferralClick(refCode: string, targetUrl: string) {
  const store = getStoredData();
  const aff = store.affiliates.find((a: AffiliatePartnerProfile) => a.referralCode.toUpperCase() === refCode.toUpperCase() || a.username.toUpperCase() === refCode.toUpperCase());

  if (!store.clickLogs) {
    store.clickLogs = [];
  }

  let pathName = '/';
  let utmSource = 'Direct / Organic';

  try {
    const parsed = new URL(targetUrl);
    pathName = parsed.pathname + (parsed.hash || '');
    const params = new URLSearchParams(parsed.search);
    if (params.get('utm_source')) {
      utmSource = params.get('utm_source')!;
    } else if (params.get('source')) {
      utmSource = params.get('source')!;
    }
  } catch (e) {
    pathName = targetUrl;
  }

  const newLog: ReferralClickLog = {
    id: `click_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    referrerUsername: aff ? aff.username : refCode,
    targetUrl,
    pathName,
    utmSource,
    timestamp: new Date().toISOString()
  };

  store.clickLogs.unshift(newLog);
  if (store.clickLogs.length > 500) {
    store.clickLogs = store.clickLogs.slice(0, 500);
  }

  if (aff) {
    aff.totalReferralClicks = (aff.totalReferralClicks || 0) + 1;
    if (aff.totalSalesCount > 0 && aff.totalReferralClicks > 0) {
      aff.conversionRate = Number(((aff.totalSalesCount / aff.totalReferralClicks) * 100).toFixed(1));
    }
  }

  saveStoredData(store);
}

export function getAffiliateDeepLinkAnalytics(username: string) {
  const store = getStoredData();
  const userUpper = (username || '').toUpperCase();
  const logs: ReferralClickLog[] = (store.clickLogs || []).filter(
    (l: ReferralClickLog) => l.referrerUsername.toUpperCase() === userUpper
  );

  const pathCounts: Record<string, number> = {};
  const sourceCounts: Record<string, number> = {};

  logs.forEach((log) => {
    const path = log.pathName || '/';
    pathCounts[path] = (pathCounts[path] || 0) + 1;

    const src = log.utmSource || 'Direct';
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;
  });

  const topPaths = Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);

  const topSources = Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalClicks: logs.length,
    recentLogs: logs.slice(0, 20),
    topPaths,
    topSources
  };
}

// Get or Register Affiliate Partner
export function getOrCreateAffiliateProfile(user: any, profile: any): AffiliatePartnerProfile {
  const store = getStoredData();
  const username = (user?.user_metadata?.username || user?.email?.split('@')[0] || profile?.full_name?.replace(/\s+/g, '').toUpperCase() || 'PARTNER').toUpperCase();
  
  let existing = store.affiliates.find((a: AffiliatePartnerProfile) => a.id === user?.id || a.email.toLowerCase() === (user?.email || '').toLowerCase() || a.username.toUpperCase() === username);

  if (!existing) {
    const newPartner: AffiliatePartnerProfile = {
      id: user?.id || `aff_${Date.now()}`,
      username: username,
      fullName: profile?.full_name || user?.user_metadata?.full_name || 'Referral Partner',
      email: user?.email || 'partner@example.com',
      tier: 'Bronze',
      totalSalesCount: 0,
      totalEarnings: 0,
      pendingCommission: 0,
      paidCommission: 0,
      availableBalance: 0,
      totalReferralClicks: 12,
      conversionRate: 0,
      lifetimeSalesAmount: 0,
      monthlySalesAmount: 0,
      referralCode: username,
      customCouponCode: `${username.slice(0, 6)}10`,
      status: 'Active',
      createdAt: new Date().toISOString(),
      badges: ['First Referral Partner']
    };

    store.affiliates.push(newPartner);
    saveStoredData(store);
    return newPartner;
  }

  return existing;
}

// Record Commission upon completed order
export function recordOrderCommission(params: {
  customerName: string;
  customerEmail: string;
  productName: string;
  category: 'AI Subscriptions' | 'Web Design' | 'Graphic Design' | 'SEO Services' | 'Windows Software' | 'Video Editing' | 'Hosting' | 'General';
  orderId: string;
  orderAmount: number;
}): CommissionRecord | null {
  const activeRef = getActiveReferralCode();
  if (!activeRef) return null;

  const store = getStoredData();
  const aff = store.affiliates.find((a: AffiliatePartnerProfile) => a.referralCode.toUpperCase() === activeRef.toUpperCase() || a.username.toUpperCase() === activeRef.toUpperCase());

  if (!aff) return null;

  // Fraud Prevention Check 1: Self Referral
  if (aff.email.toLowerCase() === params.customerEmail.toLowerCase()) {
    console.warn('Fraud Prevention: Self-referral blocked.');
    return null;
  }

  // Calculate commission rate based on category or tier
  const catRate = store.settings.categoryRates[params.category as keyof typeof store.settings.categoryRates] || store.settings.tierRates[aff.tier as keyof typeof store.settings.tierRates] || 15;
  const commissionAmt = (params.orderAmount * catRate) / 100;

  const newComm: CommissionRecord = {
    id: `comm_${Date.now()}`,
    referrerUsername: aff.username,
    referrerId: aff.id,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    productName: params.productName,
    category: params.category,
    orderId: params.orderId,
    orderAmount: params.orderAmount,
    commissionRate: catRate,
    commissionAmount: Number(commissionAmt.toFixed(2)),
    status: 'Pending',
    date: new Date().toISOString().slice(0, 10)
  };

  store.commissions.unshift(newComm);

  // Update Affiliate stats
  aff.totalSalesCount += 1;
  aff.pendingCommission = Number((aff.pendingCommission + commissionAmt).toFixed(2));
  aff.totalEarnings = Number((aff.totalEarnings + commissionAmt).toFixed(2));
  aff.lifetimeSalesAmount = Number((aff.lifetimeSalesAmount + params.orderAmount).toFixed(2));
  aff.monthlySalesAmount = Number((aff.monthlySalesAmount + params.orderAmount).toFixed(2));
  
  // Re-calculate tier
  aff.tier = calculateTier(aff.totalSalesCount);
  aff.conversionRate = aff.totalReferralClicks > 0 ? Number(((aff.totalSalesCount / aff.totalReferralClicks) * 100).toFixed(1)) : 10;

  saveStoredData(store);
  return newComm;
}

// Request Withdrawal
export function requestAffiliateWithdrawal(username: string, amount: number, method: any, accountDetails: string): { success: boolean; message: string } {
  const store = getStoredData();
  const aff = store.affiliates.find((a: AffiliatePartnerProfile) => a.username.toUpperCase() === username.toUpperCase());

  if (!aff) return { success: false, message: 'Affiliate account not found.' };

  const minAmt = store.settings.minWithdrawal || 10;
  if (amount < minAmt) {
    return { success: false, message: `Minimum withdrawal amount is $${minAmt}.` };
  }

  if (amount > aff.availableBalance) {
    return { success: false, message: `Insufficient available balance. You have $${aff.availableBalance.toFixed(2)} available.` };
  }

  const req: WithdrawalRequest = {
    id: `wdr_${Date.now()}`,
    username: aff.username,
    amount: amount,
    method: method,
    accountDetails: accountDetails,
    status: 'Pending',
    requestedAt: new Date().toISOString()
  };

  aff.availableBalance = Number((aff.availableBalance - amount).toFixed(2));
  store.withdrawals.unshift(req);
  saveStoredData(store);

  return { success: true, message: 'Withdrawal request submitted successfully! Pending admin approval.' };
}

// Admin Actions
export function adminUpdateCommissionStatus(commId: string, newStatus: 'Pending' | 'Approved' | 'Paid' | 'Rejected'): boolean {
  const store = getStoredData();
  const comm = store.commissions.find((c: CommissionRecord) => c.id === commId);
  if (!comm) return false;

  const oldStatus = comm.status;
  comm.status = newStatus;

  const aff = store.affiliates.find((a: AffiliatePartnerProfile) => a.username.toUpperCase() === comm.referrerUsername.toUpperCase());

  if (aff) {
    if (newStatus === 'Approved' && oldStatus === 'Pending') {
      aff.pendingCommission = Math.max(0, Number((aff.pendingCommission - comm.commissionAmount).toFixed(2)));
      aff.availableBalance = Number((aff.availableBalance + comm.commissionAmount).toFixed(2));
    } else if (newStatus === 'Paid') {
      if (oldStatus === 'Pending') {
        aff.pendingCommission = Math.max(0, Number((aff.pendingCommission - comm.commissionAmount).toFixed(2)));
      } else if (oldStatus === 'Approved') {
        aff.availableBalance = Math.max(0, Number((aff.availableBalance - comm.commissionAmount).toFixed(2)));
      }
      aff.paidCommission = Number((aff.paidCommission + comm.commissionAmount).toFixed(2));
    } else if (newStatus === 'Rejected') {
      if (oldStatus === 'Pending') {
        aff.pendingCommission = Math.max(0, Number((aff.pendingCommission - comm.commissionAmount).toFixed(2)));
        aff.totalEarnings = Math.max(0, Number((aff.totalEarnings - comm.commissionAmount).toFixed(2)));
      } else if (oldStatus === 'Approved') {
        aff.availableBalance = Math.max(0, Number((aff.availableBalance - comm.commissionAmount).toFixed(2)));
        aff.totalEarnings = Math.max(0, Number((aff.totalEarnings - comm.commissionAmount).toFixed(2)));
      }
    }
  }

  saveStoredData(store);
  return true;
}

export function adminUpdateWithdrawalStatus(wdrId: string, newStatus: 'Pending' | 'Approved' | 'Completed' | 'Rejected', txnRef?: string): boolean {
  const store = getStoredData();
  const wdr = store.withdrawals.find((w: WithdrawalRequest) => w.id === wdrId);
  if (!wdr) return false;

  wdr.status = newStatus;
  wdr.processedAt = new Date().toISOString();
  if (txnRef) wdr.transactionRef = txnRef;

  const aff = store.affiliates.find((a: AffiliatePartnerProfile) => a.username.toUpperCase() === wdr.username.toUpperCase());

  if (aff && newStatus === 'Rejected') {
    // Refund amount back to available balance
    aff.availableBalance = Number((aff.availableBalance + wdr.amount).toFixed(2));
  }

  saveStoredData(store);
  return true;
}

export function adminSaveSettings(newSettings: ReferralAdminSettings) {
  const store = getStoredData();
  store.settings = newSettings;
  saveStoredData(store);
}

export function getReferralStoreFull() {
  return getStoredData();
}

export interface LeaderboardAffiliateItem extends AffiliatePartnerProfile {
  rank: number;
}

export function getTopAffiliatesLeaderboard(limit: number = 10): {
  topAffiliates: LeaderboardAffiliateItem[];
  totalAffiliatesCount: number;
  allRanked: LeaderboardAffiliateItem[];
} {
  const store = getStoredData();
  const sorted = [...(store.affiliates || [])].sort((a: AffiliatePartnerProfile, b: AffiliatePartnerProfile) => {
    // Primary sort: totalSalesCount desc
    if ((b.totalSalesCount || 0) !== (a.totalSalesCount || 0)) {
      return (b.totalSalesCount || 0) - (a.totalSalesCount || 0);
    }
    // Secondary sort: lifetimeSalesAmount desc
    if ((b.lifetimeSalesAmount || 0) !== (a.lifetimeSalesAmount || 0)) {
      return (b.lifetimeSalesAmount || 0) - (a.lifetimeSalesAmount || 0);
    }
    // Tertiary sort: totalEarnings desc
    return (b.totalEarnings || 0) - (a.totalEarnings || 0);
  });

  const allRanked: LeaderboardAffiliateItem[] = sorted.map((aff, index) => ({
    ...aff,
    rank: index + 1
  }));

  return {
    topAffiliates: allRanked.slice(0, limit),
    totalAffiliatesCount: allRanked.length,
    allRanked
  };
}

export function getUserLeaderboardRank(usernameOrId?: string): {
  rank: number;
  affiliate: LeaderboardAffiliateItem | null;
  totalAffiliates: number;
  isTop10: boolean;
  salesToNextRank?: number;
} {
  if (!usernameOrId) {
    return { rank: 0, affiliate: null, totalAffiliates: 0, isTop10: false };
  }

  const { allRanked, totalAffiliatesCount } = getTopAffiliatesLeaderboard(100);
  const targetUpper = usernameOrId.trim().toUpperCase();

  const userAff = allRanked.find(
    a => a.username.toUpperCase() === targetUpper || a.id.toUpperCase() === targetUpper || a.email.toLowerCase() === usernameOrId.toLowerCase()
  );

  if (!userAff) {
    return { rank: 0, affiliate: null, totalAffiliates: totalAffiliatesCount, isTop10: false };
  }

  const isTop10 = userAff.rank <= 10;
  let salesToNextRank = 0;

  if (userAff.rank > 1) {
    const prevRankAff = allRanked[userAff.rank - 2];
    salesToNextRank = Math.max(1, (prevRankAff.totalSalesCount || 0) - (userAff.totalSalesCount || 0));
  }

  return {
    rank: userAff.rank,
    affiliate: userAff,
    totalAffiliates: totalAffiliatesCount,
    isTop10,
    salesToNextRank
  };
}
