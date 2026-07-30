import { SoftwareProduct, SoftwareOrder, SOFTWARE_PRODUCTS } from '../data/softwareData';
import { productStore, AdminOrder } from './productStore';
import { sendOrderEmailNotification } from './emailNotificationService';

const SOFTWARE_ORDERS_STORAGE_KEY = 'wka_software_orders_v1';

type Listener = () => void;

class SoftwareStore {
  private listeners: Listener[] = [];

  constructor() {
    this.initSampleOrders();
  }

  private initSampleOrders() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(SOFTWARE_ORDERS_STORAGE_KEY)) {
      const sampleSoftwareOrders: SoftwareOrder[] = [
        {
          id: 'SW-9021',
          customerName: 'Marcus Vance',
          customerEmail: 'marcus.v@designhub.co',
          productId: 'sw-adobe-cc-all-apps-2026',
          productName: 'Adobe Creative Cloud All Apps 2026',
          version: '2026 Complete Suite',
          price: 45,
          paymentMethod: 'Binance Pay',
          paymentStatus: 'Paid',
          orderStatus: 'Fulfilled',
          deliveryKey: 'CC2026-ADM-9982-XKL9-PRO',
          downloadLink: 'https://creativecloud.adobe.com',
          createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
          txRef: 'BINANCE-99021882'
        },
        {
          id: 'SW-9022',
          customerName: 'Elena Rostova',
          customerEmail: 'elena@archstudio.de',
          productId: 'sw-autocad-2026',
          productName: 'AutoCAD 2026',
          version: '2026 Commercial',
          price: 55,
          paymentMethod: 'Payoneer',
          paymentStatus: 'Paid',
          orderStatus: 'Processing',
          createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
          txRef: 'PAY-7710294'
        }
      ];
      localStorage.setItem(SOFTWARE_ORDERS_STORAGE_KEY, JSON.stringify(sampleSoftwareOrders));
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

  public getSoftwareProducts(): SoftwareProduct[] {
    return SOFTWARE_PRODUCTS;
  }

  public getProductById(id: string): SoftwareProduct | undefined {
    return SOFTWARE_PRODUCTS.find((p) => p.id === id);
  }

  public getOrders(): SoftwareOrder[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(SOFTWARE_ORDERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public getOrdersByEmail(email: string): SoftwareOrder[] {
    if (!email) return [];
    const cleanEmail = email.toLowerCase().trim();
    return this.getOrders().filter((o) => o.customerEmail.toLowerCase().trim() === cleanEmail);
  }

  public placeSoftwareOrder(orderInput: {
    customerName: string;
    customerEmail: string;
    product: SoftwareProduct;
    paymentMethod: 'Binance Pay' | 'Payoneer' | 'JazzCash' | 'Wallet Balance';
    paymentProofUrl?: string;
    txRef?: string;
    notes?: string;
  }): SoftwareOrder {
    const orders = this.getOrders();
    const id = `SW-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSoftwareOrder: SoftwareOrder = {
      id,
      customerName: orderInput.customerName.trim() || 'Guest Customer',
      customerEmail: orderInput.customerEmail.trim() || 'customer@example.com',
      productId: orderInput.product.id,
      productName: orderInput.product.name,
      version: orderInput.product.version,
      price: orderInput.product.price,
      paymentMethod: orderInput.paymentMethod,
      paymentProofUrl: orderInput.paymentProofUrl || '',
      paymentStatus: orderInput.paymentMethod === 'Wallet Balance' ? 'Paid' : 'Pending Verification',
      orderStatus: orderInput.paymentMethod === 'Wallet Balance' ? 'Fulfilled' : 'Processing',
      deliveryKey: orderInput.paymentMethod === 'Wallet Balance' ? `KEY-${Math.random().toString(36).substring(2, 10).toUpperCase()}-2026` : '',
      downloadLink: orderInput.paymentMethod === 'Wallet Balance' ? (orderInput.product.downloadUrl || 'https://creativecloud.adobe.com') : '',
      createdAt: new Date().toISOString(),
      txRef: orderInput.txRef || '',
      notes: orderInput.notes || ''
    };

    orders.unshift(newSoftwareOrder);
    localStorage.setItem(SOFTWARE_ORDERS_STORAGE_KEY, JSON.stringify(orders));

    // Also sync to core productStore so main admin orders list sees it seamlessly!
    const adminOrderSync: AdminOrder = {
      id: newSoftwareOrder.id,
      customerName: newSoftwareOrder.customerName,
      customerEmail: newSoftwareOrder.customerEmail,
      items: [
        {
          service_id: newSoftwareOrder.productId,
          title: `${newSoftwareOrder.productName} (${newSoftwareOrder.version})`,
          price: newSoftwareOrder.price,
          quantity: 1
        }
      ],
      totalAmount: newSoftwareOrder.price,
      paymentMethod: `Software Order - ${newSoftwareOrder.paymentMethod}`,
      status: newSoftwareOrder.orderStatus === 'Fulfilled' ? 'Completed' : 'Pending',
      createdAt: newSoftwareOrder.createdAt,
      txId: newSoftwareOrder.txRef || newSoftwareOrder.id
    };

    productStore.saveOrder(adminOrderSync);

    this.notify();

    // Trigger email alert
    sendOrderEmailNotification(adminOrderSync).catch((err) =>
      console.warn('Software order email alert error:', err)
    );

    return newSoftwareOrder;
  }

  public updateSoftwareOrderStatus(
    id: string,
    updates: {
      paymentStatus?: SoftwareOrder['paymentStatus'];
      orderStatus?: SoftwareOrder['orderStatus'];
      deliveryKey?: string;
      downloadLink?: string;
    }
  ): boolean {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return false;

    const target = orders[index];
    if (updates.paymentStatus) target.paymentStatus = updates.paymentStatus;
    if (updates.orderStatus) target.orderStatus = updates.orderStatus;
    if (updates.deliveryKey !== undefined) target.deliveryKey = updates.deliveryKey;
    if (updates.downloadLink !== undefined) target.downloadLink = updates.downloadLink;

    orders[index] = target;
    localStorage.setItem(SOFTWARE_ORDERS_STORAGE_KEY, JSON.stringify(orders));

    // Sync status back to productStore
    const syncStatus = target.orderStatus === 'Fulfilled' ? 'Completed' : target.orderStatus === 'Cancelled' ? 'Cancelled' : 'Verified';
    productStore.updateOrderStatus(id, syncStatus);

    this.notify();
    return true;
  }
}

export const softwareStore = new SoftwareStore();
