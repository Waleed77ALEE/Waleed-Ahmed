import { ServiceItem } from '../types';
import servicesInitialData from '../../public/services.json';

export interface ExtendedProductItem extends ServiceItem {
  discountPrice?: number;
  currency?: string;
  stockStatus?: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  status?: 'Active' | 'Hidden';
  displayOrder?: number;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
  image?: string;
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  items: {
    service_id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: 'Pending' | 'Completed' | 'Verified' | 'Cancelled';
  createdAt: string;
  txId?: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

const PRODUCTS_STORAGE_KEY = 'wka_products_v1';
const CATEGORIES_STORAGE_KEY = 'wka_categories_v1';
const ORDERS_STORAGE_KEY = 'wka_orders_v1';

type Listener = () => void;

class ProductStore {
  private listeners: Listener[] = [];

  constructor() {
    this.initDefaultData();
  }

  private initDefaultData() {
    if (typeof window === 'undefined') return;

    // Seed products if not existing
    if (!localStorage.getItem(PRODUCTS_STORAGE_KEY)) {
      const initialProducts: ExtendedProductItem[] = (servicesInitialData as any[]).map((item, index) => ({
        ...item,
        status: 'Active',
        displayOrder: index + 1,
        currency: 'USD',
        stockStatus: 'In Stock',
        tags: [item.category, item.subCategory || ''].filter(Boolean),
        slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        seoTitle: `${item.title} - Order Instant Delivery | Waleed Khan Afridi`,
        seoDescription: item.description,
        createdAt: new Date().toISOString()
      }));
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
    }

    // Seed categories if not existing
    if (!localStorage.getItem(CATEGORIES_STORAGE_KEY)) {
      const initialCategories = ['AI Subscriptions', 'Social Media Growth', 'Accounts', 'Gift Cards'];
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(initialCategories));
    }

    // Seed initial sample orders if not existing
    if (!localStorage.getItem(ORDERS_STORAGE_KEY)) {
      const sampleOrders: AdminOrder[] = [
        {
          id: 'ORD-1092',
          customerName: 'Sarah Jenkins',
          customerEmail: 'sarah.j@example.com',
          items: [
            { service_id: 'ai-01', title: 'OpenAI ChatGPT Plus (1 Month)', price: 15, quantity: 1 },
            { service_id: 'ai-04', title: 'HeyGen Video Creator Pro', price: 29, quantity: 1 }
          ],
          totalAmount: 44,
          paymentMethod: 'Binance Pay USDT',
          status: 'Completed',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          txId: 'TX-9821803289'
        },
        {
          id: 'ORD-1093',
          customerName: 'Alex Rivera',
          customerEmail: 'arivera@devstudio.io',
          items: [
            { service_id: 'ai-03', title: 'OpenAI API $120 Key Balance', price: 45, quantity: 2 }
          ],
          totalAmount: 90,
          paymentMethod: 'Payoneer Transfer',
          status: 'Verified',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          txId: 'PAY-883011'
        }
      ];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(sampleOrders));
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

  // --- PRODUCTS CRUD ---
  public getProducts(includeHidden = false): ExtendedProductItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (!raw) return [];
      const list: ExtendedProductItem[] = JSON.parse(raw);
      const filtered = includeHidden ? list : list.filter((p) => p.status !== 'Hidden');
      return filtered.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    } catch {
      return [];
    }
  }

  public getProductById(id: string): ExtendedProductItem | undefined {
    return this.getProducts(true).find((p) => p.id === id);
  }

  public getProductBySlug(slug: string): ExtendedProductItem | undefined {
    return this.getProducts(true).find((p) => p.slug === slug);
  }

  public addProduct(product: Partial<ExtendedProductItem>): ExtendedProductItem {
    const products = this.getProducts(true);
    const id = product.id || `prod_${Date.now()}`;
    const slug = product.slug || (product.title || 'service').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const newProduct: ExtendedProductItem = {
      id,
      title: product.title || 'New Product',
      category: product.category || 'AI Subscriptions',
      subCategory: product.subCategory || 'General',
      price: Number(product.price) || 10,
      discountPrice: product.discountPrice ? Number(product.discountPrice) : undefined,
      currency: product.currency || 'USD',
      delivery: product.delivery || 'Instant Delivery (10-30 Mins)',
      description: product.description || '',
      features: product.features && product.features.length ? product.features : ['Verified Quality', 'Full Guarantee', '24/7 Support'],
      icon: product.icon || 'Sparkles',
      featured: Boolean(product.featured),
      rating: product.rating || 5.0,
      ordersCount: product.ordersCount || 1,
      badge: product.badge || '',
      stockStatus: product.stockStatus || 'In Stock',
      status: product.status || 'Active',
      displayOrder: product.displayOrder || products.length + 1,
      tags: product.tags || [product.category || 'Digital'],
      seoTitle: product.seoTitle || `${product.title} - Best Price | Waleed Khan Afridi`,
      seoDescription: product.seoDescription || product.description || '',
      slug,
      image: product.image || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    this.notify();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<ExtendedProductItem>): boolean {
    const products = this.getProducts(true);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    products[index] = {
      ...products[index],
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : products[index].price,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    this.notify();
    return true;
  }

  public deleteProduct(id: string): boolean {
    const products = this.getProducts(true).filter((p) => p.id !== id);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    this.notify();
    return true;
  }

  public toggleProductStatus(id: string): boolean {
    const product = this.getProductById(id);
    if (!product) return false;
    const newStatus = product.status === 'Hidden' ? 'Active' : 'Hidden';
    return this.updateProduct(id, { status: newStatus });
  }

  // --- CATEGORIES MANAGEMENT ---
  public getCategories(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (!raw) return ['AI Subscriptions', 'Social Media Growth', 'Accounts', 'Gift Cards'];
      return JSON.parse(raw);
    } catch {
      return ['AI Subscriptions', 'Social Media Growth', 'Accounts', 'Gift Cards'];
    }
  }

  public addCategory(name: string): boolean {
    const categories = this.getCategories();
    if (!name.trim() || categories.includes(name.trim())) return false;
    categories.push(name.trim());
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    this.notify();
    return true;
  }

  public deleteCategory(name: string): boolean {
    const categories = this.getCategories().filter((c) => c !== name);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    this.notify();
    return true;
  }

  // --- ORDERS MANAGEMENT ---
  public getOrders(): AdminOrder[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public addOrder(orderData: Partial<AdminOrder>): AdminOrder {
    const orders = this.getOrders();
    const newOrder: AdminOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName || 'Guest Customer',
      customerEmail: orderData.customerEmail || 'customer@example.com',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      paymentMethod: orderData.paymentMethod || 'WhatsApp Direct Order',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      txId: orderData.txId || ''
    };
    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    this.notify();
    return newOrder;
  }

  public updateOrderStatus(id: string, status: AdminOrder['status']): boolean {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return false;
    orders[index].status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    this.notify();
    return true;
  }

  // --- MIGRATION & BACKUP UTILITIES ---
  public exportDataJSON(): string {
    const exportObject = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      products: this.getProducts(true),
      categories: this.getCategories(),
      orders: this.getOrders()
    };
    return JSON.stringify(exportObject, null, 2);
  }

  public importDataJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products && Array.isArray(parsed.products)) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(parsed.products));
      }
      if (parsed.categories && Array.isArray(parsed.categories)) {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(parsed.categories));
      }
      if (parsed.orders && Array.isArray(parsed.orders)) {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(parsed.orders));
      }
      this.notify();
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  public resetToDefaults() {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    localStorage.removeItem(CATEGORIES_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    this.initDefaultData();
    this.notify();
  }
}

export const productStore = new ProductStore();
