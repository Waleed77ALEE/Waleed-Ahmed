import { AiSubscriptionPlan, INITIAL_AI_SUBSCRIPTIONS, SubscriptionDuration } from '../data/aiSubscriptionsData';

const AI_SUBS_STORAGE_KEY = 'wka_ai_subscriptions_v1';
const AI_WISHLIST_STORAGE_KEY = 'wka_ai_wishlist_v1';
const AI_RECENT_STORAGE_KEY = 'wka_ai_recent_v1';

type Listener = () => void;

class AiSubscriptionStore {
  private listeners: Listener[] = [];

  constructor() {
    this.initDefaultData();
  }

  private initDefaultData() {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(AI_SUBS_STORAGE_KEY)) {
      localStorage.setItem(AI_SUBS_STORAGE_KEY, JSON.stringify(INITIAL_AI_SUBSCRIPTIONS));
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getSubscriptions(includeHidden = false): AiSubscriptionPlan[] {
    if (typeof window === 'undefined') return INITIAL_AI_SUBSCRIPTIONS;
    try {
      const raw = localStorage.getItem(AI_SUBS_STORAGE_KEY);
      if (!raw) return INITIAL_AI_SUBSCRIPTIONS;
      const list: AiSubscriptionPlan[] = JSON.parse(raw);
      return includeHidden ? list : list.filter((item) => item.status !== 'Hidden');
    } catch {
      return INITIAL_AI_SUBSCRIPTIONS;
    }
  }

  public getSubscriptionById(id: string): AiSubscriptionPlan | undefined {
    return this.getSubscriptions(true).find((s) => s.id === id);
  }

  public saveSubscription(plan: AiSubscriptionPlan): void {
    const list = this.getSubscriptions(true);
    const existingIdx = list.findIndex((s) => s.id === plan.id);
    if (existingIdx >= 0) {
      list[existingIdx] = plan;
    } else {
      list.unshift(plan);
    }
    localStorage.setItem(AI_SUBS_STORAGE_KEY, JSON.stringify(list));
    this.notify();
  }

  public deleteSubscription(id: string): void {
    const list = this.getSubscriptions(true).filter((s) => s.id !== id);
    localStorage.setItem(AI_SUBS_STORAGE_KEY, JSON.stringify(list));
    this.notify();
  }

  public toggleStatus(id: string): void {
    const list = this.getSubscriptions(true);
    const item = list.find((s) => s.id === id);
    if (item) {
      item.status = item.status === 'Hidden' ? 'Active' : 'Hidden';
      localStorage.setItem(AI_SUBS_STORAGE_KEY, JSON.stringify(list));
      this.notify();
    }
  }

  // --- WISHLIST MANAGEMENT ---
  public getWishlist(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(AI_WISHLIST_STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  public toggleWishlist(id: string): boolean {
    const wishlist = this.getWishlist();
    const exists = wishlist.includes(id);
    let updated: string[];
    if (exists) {
      updated = wishlist.filter((item) => item !== id);
    } else {
      updated = [...wishlist, id];
    }
    localStorage.setItem(AI_WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    this.notify();
    return !exists;
  }

  // --- RECENTLY VIEWED MANAGEMENT ---
  public getRecentlyViewed(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(AI_RECENT_STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  public addRecentlyViewed(id: string): void {
    const recent = this.getRecentlyViewed().filter((item) => item !== id);
    recent.unshift(id);
    localStorage.setItem(AI_RECENT_STORAGE_KEY, JSON.stringify(recent.slice(0, 8)));
    this.notify();
  }
}

export const aiSubscriptionStore = new AiSubscriptionStore();
