import { supabase, UserProfile, upsertProfile } from '../lib/supabase';
import { loadUserWallet, getAllUserWallets, UserWallet } from './walletStore';
import { productStore, AdminOrder } from './productStore';
import { softwareStore } from './softwareStore';

export interface RegisteredUserRecord {
  id: string;
  email: string;
  fullName: string;
  whatsapp?: string;
  provider: 'Google' | 'Email' | 'Supabase' | 'Guest';
  createdAt: string;
  lastLoginAt?: string;
  ordersCount: number;
  totalSpent: number;
  walletBalance: number;
  plan: string; // e.g., 'SuperGrok Heavy 6-Mo', 'HeyGen Team Plan', 'ChatGPT Pro', 'Free Account'
  status: 'Active' | 'Verified' | 'Suspended';
  role: 'Admin' | 'Member' | 'VIP Client';
}

const REGISTERED_USERS_KEY = 'wka_registered_users_v2';

type UserStoreListener = () => void;
let listeners: UserStoreListener[] = [];

export function subscribeUserStore(listener: UserStoreListener): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notifyListeners() {
  listeners.forEach((l) => {
    try {
      l();
    } catch (e) {
      console.error('UserStore listener error:', e);
    }
  });
}

/**
 * Reads locally stored registered user records
 */
export function getLocalRegisteredUsers(): RegisteredUserRecord[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading local registered users:', err);
    return [];
  }
}

/**
 * Saves a user signup/login detail to both Supabase and Local Admin Index
 */
export async function recordUserSignup(user: {
  id: string;
  email: string;
  fullName?: string;
  whatsapp?: string;
  provider?: 'Google' | 'Email' | 'Supabase' | 'Guest';
  createdAt?: string;
  plan?: string;
}): Promise<RegisteredUserRecord> {
  const email = user.email || 'user@example.com';
  const fullName = user.fullName || email.split('@')[0] || 'Member';
  const whatsapp = user.whatsapp || '';
  const provider = user.provider || (user.id.includes('google') ? 'Google' : 'Email');
  const createdAt = user.createdAt || new Date().toISOString();
  const isAdmin = email.toLowerCase() === 'waleedkhanafridi7@gmail.com';

  // 1. Ensure user wallet is initialized
  const wallet = loadUserWallet(user.id, email, fullName);

  // 2. Prepare profile for Supabase database
  const profileData: UserProfile = {
    id: user.id,
    email,
    full_name: fullName,
    whatsapp,
    created_at: createdAt
  };

  // Upsert to Supabase profiles table in background
  upsertProfile(profileData).catch((err) => {
    console.warn('Background Supabase profile sync warning:', err);
  });

  // 3. Update local admin storage index
  const localUsers = getLocalRegisteredUsers();
  const existingIndex = localUsers.findIndex(
    (u) => u.id === user.id || (u.email && u.email.toLowerCase() === email.toLowerCase())
  );

  const updatedRecord: RegisteredUserRecord = {
    id: user.id,
    email,
    fullName,
    whatsapp: whatsapp || (existingIndex >= 0 ? localUsers[existingIndex].whatsapp : ''),
    provider,
    createdAt: existingIndex >= 0 ? localUsers[existingIndex].createdAt : createdAt,
    lastLoginAt: new Date().toISOString(),
    ordersCount: existingIndex >= 0 ? localUsers[existingIndex].ordersCount : 0,
    totalSpent: existingIndex >= 0 ? localUsers[existingIndex].totalSpent : 0,
    walletBalance: wallet.balance,
    plan: user.plan || (existingIndex >= 0 ? localUsers[existingIndex].plan : (isAdmin ? 'VIP Enterprise / Admin' : 'Free Account')),
    status: existingIndex >= 0 ? localUsers[existingIndex].status : 'Active',
    role: isAdmin ? 'Admin' : (existingIndex >= 0 ? localUsers[existingIndex].role : 'Member')
  };

  if (existingIndex >= 0) {
    localUsers[existingIndex] = {
      ...localUsers[existingIndex],
      ...updatedRecord
    };
  } else {
    localUsers.unshift(updatedRecord);
  }

  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(localUsers));
  } catch (e) {}

  notifyListeners();
  return updatedRecord;
}

/**
 * Updates a user's account status
 */
export function updateUserStatus(userId: string, newStatus: 'Active' | 'Verified' | 'Suspended'): boolean {
  const users = getLocalRegisteredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx >= 0) {
    users[idx].status = newStatus;
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    notifyListeners();
    return true;
  }
  return false;
}

/**
 * Updates a user's plan/subscription
 */
export function updateUserPlan(userId: string, newPlan: string): boolean {
  const users = getLocalRegisteredUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx >= 0) {
    users[idx].plan = newPlan;
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    notifyListeners();
    return true;
  }
  return false;
}

/**
 * Deletes a user record
 */
export function deleteUserRecord(userId: string): boolean {
  const users = getLocalRegisteredUsers().filter((u) => u.id !== userId);
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  notifyListeners();
  return true;
}

/**
 * Default Seed Users to guarantee populated data if local cache is empty
 */
const DEFAULT_SEED_USERS: RegisteredUserRecord[] = [
  {
    id: 'usr_admin_001',
    email: 'waleedkhanafridi7@gmail.com',
    fullName: 'Waleed Khan Afridi',
    whatsapp: '+92 341 6860077',
    provider: 'Google',
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
    lastLoginAt: new Date().toISOString(),
    ordersCount: 12,
    totalSpent: 850.00,
    walletBalance: 250.00,
    plan: 'VIP Enterprise / Admin',
    status: 'Active',
    role: 'Admin'
  },
  {
    id: 'usr_sw_9021',
    email: 'marcus.v@designhub.co',
    fullName: 'Marcus Vance',
    whatsapp: '+1 415 892 0192',
    provider: 'Google',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    lastLoginAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    ordersCount: 3,
    totalSpent: 135.00,
    walletBalance: 50.00,
    plan: 'SuperGrok Heavy (6 Month)',
    status: 'Verified',
    role: 'VIP Client'
  },
  {
    id: 'usr_sw_9022',
    email: 'elena@archstudio.de',
    fullName: 'Elena Rostova',
    whatsapp: '+49 176 992018',
    provider: 'Email',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    lastLoginAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    ordersCount: 2,
    totalSpent: 110.00,
    walletBalance: 0.00,
    plan: 'HeyGen Team Plan',
    status: 'Active',
    role: 'Member'
  },
  {
    id: 'usr_sw_9023',
    email: 'tariq.dev@cloudtek.io',
    fullName: 'Tariq Mahmood',
    whatsapp: '+92 300 8820192',
    provider: 'Email',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastLoginAt: new Date().toISOString(),
    ordersCount: 1,
    totalSpent: 65.00,
    walletBalance: 120.00,
    plan: 'ChatGPT Pro',
    status: 'Active',
    role: 'Member'
  }
];

/**
 * Comprehensive fetch of all registered users combining Supabase profiles, Local Index & Wallets
 */
export async function fetchAllRegisteredUsers(): Promise<RegisteredUserRecord[]> {
  const localUsers = getLocalRegisteredUsers();
  const userMap = new Map<string, RegisteredUserRecord>();

  // 1. Seed defaults first if local is completely empty
  if (localUsers.length === 0) {
    DEFAULT_SEED_USERS.forEach((u) => {
      userMap.set(u.email.toLowerCase(), { ...u });
    });
  } else {
    localUsers.forEach((u) => {
      if (u.email) {
        userMap.set(u.email.toLowerCase(), {
          ...u,
          // Reset calculations so we recompute accurately from orders
          ordersCount: 0,
          totalSpent: 0
        });
      }
    });
  }

  // Ensure Admin user always exists
  const adminEmail = 'waleedkhanafridi7@gmail.com';
  if (!userMap.has(adminEmail)) {
    userMap.set(adminEmail, {
      id: 'usr_admin_001',
      email: adminEmail,
      fullName: 'Waleed Khan Afridi',
      whatsapp: '+92 341 6860077',
      provider: 'Google',
      createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
      lastLoginAt: new Date().toISOString(),
      ordersCount: 0,
      totalSpent: 0,
      walletBalance: 250.00,
      plan: 'VIP Enterprise / Admin',
      status: 'Active',
      role: 'Admin'
    });
  }

  // 2. Load and merge from user wallets index
  const wallets = getAllUserWallets();
  wallets.forEach((w) => {
    if (w.userId && w.userId !== 'guest' && w.userEmail) {
      const emailKey = w.userEmail.toLowerCase();
      const existing = userMap.get(emailKey);
      if (existing) {
        existing.walletBalance = w.balance;
      } else {
        userMap.set(emailKey, {
          id: w.userId,
          email: w.userEmail,
          fullName: w.userName || w.userEmail.split('@')[0],
          whatsapp: '',
          provider: 'Email',
          createdAt: new Date().toISOString(),
          lastLoginAt: w.lastUpdated,
          ordersCount: 0,
          totalSpent: 0,
          walletBalance: w.balance,
          plan: 'Free Account',
          status: 'Active',
          role: 'Member'
        });
      }
    }
  });

  // 3. Process orders from productStore
  try {
    const orders: AdminOrder[] = productStore.getOrders();
    orders.forEach((ord) => {
      if (ord.customerEmail) {
        const key = ord.customerEmail.toLowerCase().trim();
        let existing = userMap.get(key);

        if (!existing) {
          existing = {
            id: `usr_${ord.id}`,
            email: ord.customerEmail,
            fullName: ord.customerName || ord.customerEmail.split('@')[0],
            whatsapp: '',
            provider: 'Email',
            createdAt: ord.createdAt || new Date().toISOString(),
            ordersCount: 0,
            totalSpent: 0,
            walletBalance: 0,
            plan: ord.items?.[0]?.title || 'Store Member',
            status: 'Active',
            role: 'Member'
          };
          userMap.set(key, existing);
        }

        existing.ordersCount += 1;
        existing.totalSpent += ord.totalAmount || 0;

        // Upgrade plan badge if order is for a major plan
        if (ord.items?.[0]?.title) {
          const title = ord.items[0].title;
          if (title.toLowerCase().includes('supergrok') || title.toLowerCase().includes('heygen') || title.toLowerCase().includes('chatgpt') || title.toLowerCase().includes('canva')) {
            existing.plan = title;
          }
        }
      }
    });
  } catch (e) {
    console.warn('Error aggregating productStore orders for users:', e);
  }

  // 4. Process orders from softwareStore
  try {
    const swOrders = softwareStore.getOrders();
    swOrders.forEach((sw) => {
      if (sw.customerEmail) {
        const key = sw.customerEmail.toLowerCase().trim();
        let existing = userMap.get(key);

        if (!existing) {
          existing = {
            id: `usr_${sw.id}`,
            email: sw.customerEmail,
            fullName: sw.customerName || sw.customerEmail.split('@')[0],
            whatsapp: '',
            provider: 'Email',
            createdAt: sw.createdAt || new Date().toISOString(),
            ordersCount: 0,
            totalSpent: 0,
            walletBalance: 0,
            plan: sw.productName || 'Software License',
            status: 'Verified',
            role: 'Member'
          };
          userMap.set(key, existing);
        }

        existing.ordersCount += 1;
        existing.totalSpent += sw.price || 0;
        if (sw.productName) {
          existing.plan = sw.productName;
        }
      }
    });
  } catch (e) {
    console.warn('Error aggregating softwareStore orders for users:', e);
  }

  // 5. Query live Supabase `profiles` table to merge any cloud signups
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && profiles && profiles.length > 0) {
      profiles.forEach((p) => {
        if (p.email) {
          const key = p.email.toLowerCase();
          const existing = userMap.get(key);
          const wallet = loadUserWallet(p.id, p.email, p.full_name);

          if (existing) {
            existing.fullName = p.full_name || existing.fullName;
            existing.whatsapp = p.whatsapp || existing.whatsapp;
            existing.createdAt = p.created_at || existing.createdAt;
            existing.walletBalance = wallet.balance || existing.walletBalance;
          } else {
            userMap.set(key, {
              id: p.id,
              email: p.email,
              fullName: p.full_name || p.email.split('@')[0],
              whatsapp: p.whatsapp || '',
              provider: p.email.includes('gmail') ? 'Google' : 'Email',
              createdAt: p.created_at || new Date().toISOString(),
              ordersCount: 0,
              totalSpent: 0,
              walletBalance: wallet.balance,
              plan: 'Free Account',
              status: 'Active',
              role: p.email.toLowerCase() === adminEmail ? 'Admin' : 'Member'
            });
          }
        }
      });
    }
  } catch (err) {
    console.warn('Supabase profiles fetch warning:', err);
  }

  const resultList = Array.from(userMap.values());
  // Save merged state back to local cache
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(resultList));
  } catch (e) {}

  return resultList;
}

