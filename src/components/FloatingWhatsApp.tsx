import React, { useState, useEffect } from 'react';
import { MessageSquare, Copy, Check, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<string>('Available');
  const [peshawarTime, setPeshawarTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        };
        const timeStr = new Intl.DateTimeFormat('en-US', options).format(new Date());
        setPeshawarTime(timeStr);
      } catch (e) {
        setPeshawarTime('');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('availability_status')
          .limit(1)
          .maybeSingle();

        if (data && data.availability_status) {
          setAvailabilityStatus(data.availability_status);
        }
      } catch (err) {
        console.warn('Failed to fetch profile availability status from Supabase:', err);
      }
    };

    fetchAvailability();

    // Supabase Real-time subscription for profiles table
    const channel = supabase
      .channel('public:profiles_floating_whatsapp')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        (payload: any) => {
          if (payload.new && payload.new.availability_status) {
            setAvailabilityStatus(payload.new.availability_status);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const isAvailable = availabilityStatus.toLowerCase() === 'available';

  const playSound = (type: 'hover' | 'click') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type === 'hover' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(type === 'hover' ? 587.33 : 880, audioCtx.currentTime); // D5 or A5

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + (type === 'hover' ? 0.08 : 0.15));

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + (type === 'hover' ? 0.08 : 0.15));
    } catch (e) {
      // AudioContext not allowed or supported without user gesture
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playSound('click');
    navigator.clipboard.writeText(whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const springTransition = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 28,
    mass: 0.8
  };

  return (
    <motion.div 
      layout
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 select-none"
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popover Bubble Card with Spring Transition */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="whatsapp-popover"
            initial={{ opacity: 0, y: 15, scale: 0.85, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, scale: 0.9, filter: 'blur(2px)' }}
            transition={springTransition}
            className="flex flex-col gap-2 mr-0.5"
          >
            {/* Header Badge */}
            <motion.div 
              layout
              className="bg-slate-900/95 backdrop-blur-xl text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>{isAvailable ? 'Available • Instant Reply' : 'Away • Back Soon'}</span>
              </div>
              {peshawarTime && (
                <span className="text-[11px] font-mono text-slate-400 border-l border-slate-800 pl-2">
                  {peshawarTime} PKT
                </span>
              )}
            </motion.div>

            {/* Quick Actions Panel */}
            <motion.div 
              layout
              className="bg-slate-900/95 backdrop-blur-xl p-2 rounded-2xl border border-slate-800 shadow-2xl flex flex-col gap-1.5 min-w-[190px]"
            >
              <button
                onClick={handleCopy}
                onMouseEnter={() => playSound('hover')}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied Number!' : 'Copy WhatsApp'}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400 font-normal">+{whatsappNumber.slice(0, 4)}...</span>
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Waleed,%20I'm%20interested%20in%20your%20services!`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs transition-all hover:brightness-110 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start Direct Chat</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button with Spring Physics */}
      <motion.a
        layout
        layoutId="whatsapp-main-button"
        href={`https://wa.me/${whatsappNumber}?text=Hi%20Waleed,%20I'm%20interested%20in%20your%20services!`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => playSound('click')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          boxShadow: isHovered 
            ? '0 20px 35px -5px rgba(16, 185, 129, 0.45), 0 0 0 4px rgba(16, 185, 129, 0.15)' 
            : '0 10px 25px -3px rgba(16, 185, 129, 0.35)'
        }}
        whileHover={{ 
          scale: 1.08,
          y: -2
        }}
        whileTap={{ scale: 0.92 }}
        transition={springTransition}
        className="p-4 rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-400 to-teal-400 text-white shadow-xl flex items-center justify-center relative cursor-pointer group"
        title={`WhatsApp — ${availabilityStatus}`}
      >
        {/* Glow Ring */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 pointer-events-none"
        />

        <motion.div
          animate={{ rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative z-10 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6 fill-white text-white drop-shadow" />
        </motion.div>

        {/* Pulse Indicator Badge (Green for Available, Amber for Away) */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          {isAvailable && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />}
          <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isAvailable ? 'bg-emerald-400' : 'bg-amber-400'} border-2 border-slate-900`} />
        </span>
      </motion.a>
    </motion.div>
  );
};

