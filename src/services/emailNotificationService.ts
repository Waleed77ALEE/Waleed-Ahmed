import { supabase } from '../lib/supabase';
import { AdminOrder } from './productStore';

export interface OrderEmailPayload {
  order_number: string;
  customerName: string;
  customerEmail: string;
  contact_whatsapp: string;
  items: Array<{
    service_id?: string;
    title: string;
    price: number;
    quantity: number;
    delivery?: string;
  }>;
  totalAmount: number;
  paymentMethod: string;
  txId?: string;
  createdAt?: string;
}

/**
 * Invokes the Supabase Edge Function 'send-order-email' to alert admin whenever a new order is placed.
 */
export async function sendOrderEmailNotification(order: AdminOrder | any): Promise<{ success: boolean; message: string }> {
  try {
    const payload: OrderEmailPayload = {
      order_number: order.id || order.order_number || `ORD-${Date.now()}`,
      customerName: order.customerName || order.user_id || 'Valued Customer',
      customerEmail: order.customerEmail || order.email || 'customer@example.com',
      contact_whatsapp: order.contact_whatsapp || order.paymentMethod || 'WhatsApp Direct',
      items: order.items || [],
      totalAmount: order.totalAmount || order.total_amount || 0,
      paymentMethod: order.paymentMethod || order.payment_method || 'Online / Crypto',
      txId: order.txId || order.binance_tx_id || '',
      createdAt: order.createdAt || order.created_at || new Date().toISOString()
    };

    console.log('Sending order email notification via Supabase Edge Function...', payload);

    // Call Supabase Edge Function 'send-order-email'
    const { data, error } = await supabase.functions.invoke('send-order-email', {
      body: payload
    });

    if (error) {
      console.warn('Supabase Edge Function invoke returned error, falling back to direct HTTP trigger:', error.message);
      
      // Fallback direct HTTP POST call to Edge Function endpoint if available
      const env = (import.meta as any).env || {};
      const supabaseUrl = env.VITE_SUPABASE_URL || 'https://bspuihgnwkpcfkfvffum.supabase.co';
      const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Y7tDSyXyvW0dNgtfq3AUoQ_z7i_odLs';

      const res = await fetch(`${supabaseUrl}/functions/v1/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const resData = await res.json();
        return { success: true, message: resData.message || 'Notification sent successfully' };
      }
      return { success: false, message: 'Fallback HTTP notification failed' };
    }

    return { success: true, message: data?.message || 'Order email alert dispatched' };
  } catch (err: any) {
    console.error('sendOrderEmailNotification exception:', err);
    return { success: false, message: err.message || 'Error triggering notification' };
  }
}
