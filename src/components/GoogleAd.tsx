import React, { useEffect, useRef } from 'react';

interface GoogleAdProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

export const GoogleAd: React.FC<GoogleAdProps> = ({
  client = 'ca-pub-4721034449965472',
  slot = '5355102710',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement'
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef<boolean>(false);

  useEffect(() => {
    // Load script once if not already present
    const scriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    let scriptTag = document.querySelector<HTMLScriptElement>(`script[src*="${client}"]`);

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.src = scriptSrc;
      scriptTag.async = true;
      scriptTag.crossOrigin = 'anonymous';
      document.head.appendChild(scriptTag);
    }

    // Safely execute adsbygoogle push
    const timer = setTimeout(() => {
      if (adRef.current && !pushedRef.current) {
        try {
          const status = adRef.current.getAttribute('data-adsbygoogle-status');
          if (!status) {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            pushedRef.current = true;
          }
        } catch (err) {
          // Catch and ignore duplicate push errors
        }
      }
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [client, slot]);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 ${className}`}>
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-3 sm:p-4 text-center overflow-hidden backdrop-blur-md shadow-xl relative min-h-[100px] flex flex-col items-center justify-center">
        {label && (
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60"></span>
            <span>{label}</span>
          </div>
        )}
        <div className="w-full flex justify-center items-center min-h-[90px]">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>
      </div>
    </div>
  );
};
