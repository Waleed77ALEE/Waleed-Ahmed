export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'purchase' | 'refund' | 'admin_credit';
  amount: number;
  description: string;
  paymentMethod?: string;
  referenceId?: string;
  status: 'Completed' | 'Pending' | 'Failed';
  createdAt: string;
}

export interface UserWallet {
  userId: string;
  userEmail?: string;
  userName?: string;
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
  lastUpdated: string;
}

const WALLET_STORAGE_KEY = 'wka_user_wallet_v2';
const ALL_WALLETS_INDEX_KEY = 'wka_all_wallets_index_v2';

type WalletListener = (wallet: UserWallet) => void;

let listeners: WalletListener[] = [];

export function getWalletKey(userId?: string): string {
  return `${WALLET_STORAGE_KEY}_${userId || 'guest'}`;
}

// Track index of registered user IDs who have wallets
function registerWalletIdInIndex(userId: string): void {
  if (!userId || userId === 'guest') return;
  try {
    const raw = localStorage.getItem(ALL_WALLETS_INDEX_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(userId)) {
      list.push(userId);
      localStorage.setItem(ALL_WALLETS_INDEX_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.error('Error registering wallet index:', err);
  }
}

export function getAllWalletIds(): string[] {
  try {
    const raw = localStorage.getItem(ALL_WALLETS_INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function loadUserWallet(userId?: string, userEmail?: string, userName?: string): UserWallet {
  if (!userId || userId === 'guest') {
    return {
      userId: 'guest',
      userEmail: userEmail || 'Guest User',
      userName: userName || 'Guest',
      balance: 0.00,
      currency: 'USD',
      transactions: [],
      lastUpdated: new Date().toISOString()
    };
  }

  registerWalletIdInIndex(userId);
  const key = getWalletKey(userId);

  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed: UserWallet = JSON.parse(raw);
      if (userEmail && !parsed.userEmail) parsed.userEmail = userEmail;
      if (userName && !parsed.userName) parsed.userName = userName;
      return parsed;
    }
  } catch (err) {
    console.error('Error loading wallet:', err);
  }

  // Initial balance is 0.00 for new account
  const newWallet: UserWallet = {
    userId,
    userEmail: userEmail || 'registered@user.com',
    userName: userName || 'Member',
    balance: 0.00,
    currency: 'USD',
    transactions: [],
    lastUpdated: new Date().toISOString()
  };

  localStorage.setItem(key, JSON.stringify(newWallet));
  return newWallet;
}

export function saveUserWallet(wallet: UserWallet): void {
  if (wallet.userId && wallet.userId !== 'guest') {
    registerWalletIdInIndex(wallet.userId);
  }
  const key = getWalletKey(wallet.userId);
  wallet.lastUpdated = new Date().toISOString();
  localStorage.setItem(key, JSON.stringify(wallet));
  notifyWalletListeners(wallet);
}

export function subscribeWallet(listener: WalletListener): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notifyWalletListeners(wallet: UserWallet): void {
  listeners.forEach((listener) => {
    try {
      listener(wallet);
    } catch (e) {
      console.error('Error in wallet listener:', e);
    }
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wka_wallet_updated', { detail: wallet }));
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith(WALLET_STORAGE_KEY)) {
      try {
        if (e.newValue) {
          const updated: UserWallet = JSON.parse(e.newValue);
          notifyWalletListeners(updated);
        }
      } catch (err) {
        console.error('Error handling wallet storage event:', err);
      }
    }
  });
}

/**
 * Submit a Pending Top-Up request from user after payment submission
 */
export function requestWalletTopup(
  userId: string | undefined,
  userEmail: string | undefined,
  userName: string | undefined,
  amount: number,
  paymentMethod: string,
  referenceTxId?: string
): WalletTransaction {
  const wallet = loadUserWallet(userId, userEmail, userName);
  
  const newTx: WalletTransaction = {
    id: `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    type: 'deposit',
    amount: amount,
    description: `Pending Top-Up via ${paymentMethod}`,
    paymentMethod,
    referenceId: referenceTxId || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  wallet.transactions.unshift(newTx);
  saveUserWallet(wallet);
  return newTx;
}

/**
 * Deduct balance for an order purchase
 */
export function deductWalletBalance(
  userId: string | undefined,
  amount: number,
  orderNumber: string
): boolean {
  if (!userId || userId === 'guest') return false;

  const wallet = loadUserWallet(userId);
  if (wallet.balance < amount) {
    return false;
  }

  const newTx: WalletTransaction = {
    id: `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    type: 'purchase',
    amount: -amount,
    description: `Payment for Order #${orderNumber}`,
    paymentMethod: 'Wallet Balance',
    referenceId: orderNumber,
    status: 'Completed',
    createdAt: new Date().toISOString()
  };

  wallet.balance = parseFloat((wallet.balance - amount).toFixed(2));
  wallet.transactions.unshift(newTx);

  saveUserWallet(wallet);
  return true;
}

// ADMIN FUNCTIONS

/**
 * Get all registered user wallets for Admin Panel
 */
export function getAllUserWallets(): UserWallet[] {
  const ids = getAllWalletIds();
  const wallets: UserWallet[] = [];

  ids.forEach((id) => {
    try {
      const raw = localStorage.getItem(getWalletKey(id));
      if (raw) {
        wallets.push(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Error reading wallet for id:', id);
    }
  });

  return wallets;
}

/**
 * Admin directly credits an amount to a user's wallet according to payment verified
 */
export function adminCreditUserWallet(
  targetUserId: string,
  amount: number,
  adminNote?: string
): UserWallet {
  const wallet = loadUserWallet(targetUserId);

  const newTx: WalletTransaction = {
    id: `tx_admin_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    type: 'admin_credit',
    amount: amount,
    description: adminNote ? `Admin Credit: ${adminNote}` : `Top-Up Approved & Credited by Admin`,
    paymentMethod: 'Admin Manual Credit',
    referenceId: `ADM-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Completed',
    createdAt: new Date().toISOString()
  };

  wallet.balance = parseFloat((wallet.balance + amount).toFixed(2));
  wallet.transactions.unshift(newTx);
  saveUserWallet(wallet);

  return wallet;
}

/**
 * Admin approves a pending user top-up request
 */
export function adminApproveTopupRequest(targetUserId: string, txId: string): boolean {
  const wallet = loadUserWallet(targetUserId);
  const txIndex = wallet.transactions.findIndex((t) => t.id === txId && t.status === 'Pending');

  if (txIndex === -1) return false;

  const tx = wallet.transactions[txIndex];
  tx.status = 'Completed';
  tx.description = tx.description.replace('Pending Top-Up', 'Verified Top-Up');

  wallet.balance = parseFloat((wallet.balance + tx.amount).toFixed(2));
  saveUserWallet(wallet);

  return true;
}

/**
 * Admin rejects a pending top-up request
 */
export function adminRejectTopupRequest(targetUserId: string, txId: string): boolean {
  const wallet = loadUserWallet(targetUserId);
  const txIndex = wallet.transactions.findIndex((t) => t.id === txId && t.status === 'Pending');

  if (txIndex === -1) return false;

  wallet.transactions[txIndex].status = 'Failed';
  saveUserWallet(wallet);

  return true;
}
