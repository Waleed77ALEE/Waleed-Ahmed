import { supabase, UserProfile, upsertProfile } from '../lib/supabase';
import { loadUserWallet, getAllUserWallets, UserWallet } from './walletStore';
import { productStore, AdminOrder } from './productStore';

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
}): Promise<RegisteredUserRecord> {
  const email = user.email || 'user@example.com';
  const fullName = user.fullName || email.split('@')[0] || 'Member';
  const whatsapp = user.whatsapp || '';
  const provider = user.provider || (user.id.includes('google') ? 'Google' : 'Email');
  const createdAt = user.createdAt || new Date().toISOString();

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
    ordersCount: 0,
    totalSpent: 0,
    walletBalance: wallet.balance
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
 * Comprehensive fetch of all registered users combining Supabase profiles, Local Index & Wallets
 */
export async function fetchAllRegisteredUsers(): Promise<RegisteredUserRecord[]> {
  const localUsers = getLocalRegisteredUsers();
  const userMap = new Map<string, RegisteredUserRecord>();

  // 1. Load from local users
  localUsers.forEach((u) => {
    if (u.email) userMap.set(u.email.toLowerCase(), u);
  });

  // 2. Load from wallets index
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
          walletBalance: w.balance
        });
      }
    }
  });

  // 3. Calculate order totals per user
  try {
    const orders: AdminOrder[] = productStore.getOrders();
    orders.forEach((ord) => {
      if (ord.customerEmail) {
        const key = ord.customerEmail.toLowerCase();
        const existing = userMap.get(key);
        if (existing) {
          existing.ordersCount += 1;
          existing.totalSpent += ord.totalAmount || 0;
        }
      }
    });
  } catch (e) {}

  // 4. Query live Supabase `profiles` table to merge any cloud signups
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
            existing.walletBalance = wallet.balance;
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
              walletBalance: wallet.balance
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
