import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NotificationToast {
  id: string;
  orderNumber: string;
  status: string;
  timestamp: number;
}

export const OrderNotification: React.FC<{ userId: string | undefined }> = ({ userId }) => {
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);

  useEffect(() => {
    if (!userId) return;

    // Listen to updates on the 'orders' table for this specific user
    const channel = supabase
      .channel('public:orders_status')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          const oldRecord = payload.old;
          const newRecord = payload.new;

          // Check if status changed
          if (oldRecord && newRecord && oldRecord.status !== newRecord.status) {
            const newNotification: NotificationToast = {
              id: Math.random().toString(36).substring(7),
              orderNumber: newRecord.order_number || newRecord.id.substring(0, 8),
              status: newRecord.status,
              timestamp: Date.now()
            };
            
            setNotifications(prev => [...prev, newNotification]);

            // Auto-remove after 5 seconds
            setTimeout(() => {
              removeNotification(newNotification.id);
            }, 5000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'cancelled':
      case 'refunded':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="bg-slate-900 border border-slate-700/50 shadow-xl shadow-black/50 rounded-xl p-4 w-80 pointer-events-auto flex items-start gap-3 backdrop-blur-sm"
          >
            <div className="p-2 rounded-full bg-slate-800/50 shrink-0">
              {getStatusIcon(notif.status)}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Order Updated
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Your order <span className="text-cyan-400 font-mono">#{notif.orderNumber}</span> status changed to <span className="font-bold text-white">{notif.status}</span>
              </p>
            </div>

            <button
              onClick={() => removeNotification(notif.id)}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
