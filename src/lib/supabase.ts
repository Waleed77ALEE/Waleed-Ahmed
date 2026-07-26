import { createClient } from '@supabase/supabase-js';

// Supabase Environment Credentials
const env = (import.meta as any).env || {};
const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://bspuihgnwkpcfkfvffum.supabase.co';
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Y7tDSyXyvW0dNgtfq3AUoQ_z7i_odLs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Types
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  whatsapp?: string;
  phone?: string;
  created_at?: string;
}

export interface SupabaseCartItem {
  id: string;
  user_id: string;
  service_id: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  delivery: string;
  created_at?: string;
}

export interface SupabaseOrderItem {
  service_id: string;
  title: string;
  category?: string;
  price: number;
  quantity: number;
  delivery: string;
}

export interface SupabaseOrder {
  id: string;
  order_number: string;
  user_id: string;
  items: SupabaseOrderItem[];
  total_amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  payment_method: string;
  contact_whatsapp: string;
  notes?: string;
  binance_tx_id?: string;
  payment_proof?: string;
  created_at?: string;
}

export interface SupabaseContactMessage {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  whatsapp: string;
  service_requested: string;
  message: string;
  status?: 'New' | 'In Progress' | 'Resolved';
  created_at?: string;
}

// SQL Schema for manual or automated creation in Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. CART ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT DEFAULT '',
  price NUMERIC NOT NULL,
  quantity INTEGER DEFAULT 1,
  delivery TEXT DEFAULT 'Instant',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart items" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can modify own cart items" ON public.cart_items
  FOR ALL USING (auth.uid() = user_id);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending',
  payment_method TEXT DEFAULT 'WhatsApp Direct / Crypto / Bank',
  contact_whatsapp TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  binance_tx_id TEXT DEFAULT '',
  payment_proof TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT DEFAULT '',
  service_requested TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own contact messages" ON public.contact_messages
  FOR SELECT USING (auth.uid() = user_id);

-- 5. AUTOMATIC PROFILE CREATION TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, whatsapp)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'whatsapp', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
`;

// Supabase Helper Functions with Local Storage Fallback for Guest Users
export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn('Supabase getProfile error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('getProfile exception:', err);
    return null;
  }
}

export async function upsertProfile(profile: UserProfile): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert(profile, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase upsertProfile error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('upsertProfile exception:', err);
    return false;
  }
}

// Cart Management
export async function fetchCart(userId: string): Promise<SupabaseCartItem[]> {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchCart error:', error.message);
      return getLocalCart();
    }
    return data || [];
  } catch (err) {
    console.error('fetchCart error:', err);
    return getLocalCart();
  }
}

export async function addToCartDB(userId: string | null, item: Omit<SupabaseCartItem, 'id' | 'user_id' | 'created_at'>): Promise<SupabaseCartItem[]> {
  if (!userId) {
    // Local storage fallback for guest users
    const localCart = getLocalCart();
    const existingIndex = localCart.findIndex(i => i.service_id === item.service_id);
    if (existingIndex > -1) {
      localCart[existingIndex].quantity += item.quantity || 1;
    } else {
      localCart.push({
        id: 'local_' + Date.now(),
        user_id: 'guest',
        ...item
      });
    }
    saveLocalCart(localCart);
    return localCart;
  }

  try {
    // Check if item already exists in cart for this user
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('service_id', item.service_id)
      .maybeSingle();

    if (existing) {
      const updatedQty = existing.quantity + (item.quantity || 1);
      await supabase
        .from('cart_items')
        .update({ quantity: updatedQty })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          service_id: item.service_id,
          title: item.title,
          category: item.category,
          price: item.price,
          quantity: item.quantity || 1,
          delivery: item.delivery
        });
    }
    return await fetchCart(userId);
  } catch (err) {
    console.error('addToCartDB exception:', err);
    return getLocalCart();
  }
}

export async function updateCartQtyDB(userId: string | null, cartItemId: string, quantity: number): Promise<SupabaseCartItem[]> {
  if (quantity <= 0) {
    return removeFromCartDB(userId, cartItemId);
  }

  if (!userId || cartItemId.startsWith('local_')) {
    const localCart = getLocalCart();
    const updated = localCart.map(i => i.id === cartItemId ? { ...i, quantity } : i);
    saveLocalCart(updated);
    return updated;
  }

  try {
    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId);
    return await fetchCart(userId);
  } catch (err) {
    console.error('updateCartQtyDB exception:', err);
    return getLocalCart();
  }
}

export async function removeFromCartDB(userId: string | null, cartItemId: string): Promise<SupabaseCartItem[]> {
  if (!userId || cartItemId.startsWith('local_')) {
    const localCart = getLocalCart();
    const filtered = localCart.filter(i => i.id !== cartItemId);
    saveLocalCart(filtered);
    return filtered;
  }

  try {
    await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);
    return await fetchCart(userId);
  } catch (err) {
    console.error('removeFromCartDB exception:', err);
    return getLocalCart();
  }
}

export async function clearCartDB(userId: string | null): Promise<void> {
  if (!userId) {
    localStorage.removeItem('wka_local_cart');
    return;
  }

  try {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
  } catch (err) {
    console.error('clearCartDB exception:', err);
  }
}

// Local Storage Helper for Guest Session
function getLocalCart(): SupabaseCartItem[] {
  try {
    const stored = localStorage.getItem('wka_local_cart');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalCart(cart: SupabaseCartItem[]) {
  try {
    localStorage.setItem('wka_local_cart', JSON.stringify(cart));
  } catch (e) {}
}

// Orders Management
export async function createOrderDB(order: Omit<SupabaseOrder, 'id' | 'created_at'>): Promise<SupabaseOrder | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select('*')
      .single();

    if (error) {
      console.warn('Supabase createOrder error, utilizing offline order creation:', error.message);
      // Create local fallback order object
      const fallbackOrder: SupabaseOrder = {
        id: 'ord_' + Date.now(),
        ...order,
        created_at: new Date().toISOString()
      };
      saveLocalOrder(fallbackOrder);
      return fallbackOrder;
    }
    return data;
  } catch (err) {
    console.error('createOrderDB exception:', err);
    const fallbackOrder: SupabaseOrder = {
      id: 'ord_' + Date.now(),
      ...order,
      created_at: new Date().toISOString()
    };
    saveLocalOrder(fallbackOrder);
    return fallbackOrder;
  }
}

export async function fetchUserOrders(userId: string): Promise<SupabaseOrder[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchUserOrders error:', error.message);
      return getLocalOrders().filter(o => o.user_id === userId || o.user_id === 'guest');
    }
    return data || [];
  } catch (err) {
    console.error('fetchUserOrders exception:', err);
    return getLocalOrders().filter(o => o.user_id === userId || o.user_id === 'guest');
  }
}

function getLocalOrders(): SupabaseOrder[] {
  try {
    const stored = localStorage.getItem('wka_local_orders');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalOrder(order: SupabaseOrder) {
  try {
    const existing = getLocalOrders();
    existing.unshift(order);
    localStorage.setItem('wka_local_orders', JSON.stringify(existing));
  } catch (e) {}
}

// Contact Messages
export async function submitContactMessageDB(msg: SupabaseContactMessage): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert(msg);

    if (error) {
      console.warn('Supabase submitContactMessage error:', error.message);
      saveLocalMessage(msg);
      return true; // Graceful response
    }
    return true;
  } catch (err) {
    console.error('submitContactMessage exception:', err);
    saveLocalMessage(msg);
    return true;
  }
}

function saveLocalMessage(msg: SupabaseContactMessage) {
  try {
    const stored = localStorage.getItem('wka_local_messages');
    const existing = stored ? JSON.parse(stored) : [];
    existing.unshift({ ...msg, id: 'msg_' + Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('wka_local_messages', JSON.stringify(existing));
  } catch (e) {}
}
