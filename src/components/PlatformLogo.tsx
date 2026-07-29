import React from 'react';

export interface PlatformInfo {
  name: string;
  brandColor: string;
  bgGradient: string;
  badgeBg: string;
  textColor: string;
  borderStyle: string;
}

export function detectPlatform(
  title: string = '',
  category: string = '',
  subCategory: string = '',
  id: string = ''
): { key: string; info: PlatformInfo } {
  const combined = `${title} ${category} ${subCategory} ${id}`.toLowerCase();

  if (combined.includes('synthesia')) {
    return {
      key: 'synthesia',
      info: {
        name: 'Synthesia AI',
        brandColor: '#2563EB',
        bgGradient: 'from-blue-950/60 via-slate-950 to-indigo-950/40',
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        textColor: 'text-blue-400',
        borderStyle: 'border-blue-500/30'
      }
    };
  }

  if (combined.includes('runway')) {
    return {
      key: 'runway',
      info: {
        name: 'Runway ML',
        brandColor: '#EC4899',
        bgGradient: 'from-pink-950/60 via-slate-950 to-rose-950/40',
        badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
        textColor: 'text-pink-400',
        borderStyle: 'border-pink-500/30'
      }
    };
  }

  if (combined.includes('luma')) {
    return {
      key: 'luma',
      info: {
        name: 'Luma AI',
        brandColor: '#06B6D4',
        bgGradient: 'from-cyan-950/60 via-slate-950 to-teal-950/40',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        textColor: 'text-cyan-400',
        borderStyle: 'border-cyan-500/30'
      }
    };
  }

  if (combined.includes('pika')) {
    return {
      key: 'pika',
      info: {
        name: 'Pika Labs',
        brandColor: '#F59E0B',
        bgGradient: 'from-amber-950/60 via-slate-950 to-orange-950/40',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        textColor: 'text-amber-400',
        borderStyle: 'border-amber-500/30'
      }
    };
  }

  if (combined.includes('hailuo') || combined.includes('minimax')) {
    return {
      key: 'hailuo',
      info: {
        name: 'Hailuo AI',
        brandColor: '#8B5CF6',
        bgGradient: 'from-violet-950/60 via-slate-950 to-purple-950/40',
        badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
        textColor: 'text-violet-400',
        borderStyle: 'border-violet-500/30'
      }
    };
  }

  if (combined.includes('veed')) {
    return {
      key: 'veed',
      info: {
        name: 'VEED.IO',
        brandColor: '#10B981',
        bgGradient: 'from-emerald-950/60 via-slate-950 to-teal-950/40',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        textColor: 'text-emerald-400',
        borderStyle: 'border-emerald-500/30'
      }
    };
  }

  if (combined.includes('invideo')) {
    return {
      key: 'invideo',
      info: {
        name: 'InVideo AI',
        brandColor: '#6366F1',
        bgGradient: 'from-indigo-950/60 via-slate-950 to-blue-950/40',
        badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        textColor: 'text-indigo-400',
        borderStyle: 'border-indigo-500/30'
      }
    };
  }

  if (combined.includes('heygen')) {
    return {
      key: 'heygen',
      info: {
        name: 'HeyGen AI',
        brandColor: '#7C3AED',
        bgGradient: 'from-purple-900/40 via-purple-950/80 to-slate-950',
        badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        textColor: 'text-purple-400',
        borderStyle: 'border-purple-500/30'
      }
    };
  }

  if (combined.includes('kling')) {
    return {
      key: 'kling',
      info: {
        name: 'Kling AI',
        brandColor: '#F59E0B',
        bgGradient: 'from-amber-900/40 via-slate-950 to-amber-950/60',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        textColor: 'text-amber-400',
        borderStyle: 'border-amber-500/30'
      }
    };
  }

  if (combined.includes('openai') || combined.includes('chatgpt') || combined.includes('gpt-4') || combined.includes('dall-e') || combined.includes('whisper')) {
    return {
      key: 'openai',
      info: {
        name: 'OpenAI',
        brandColor: '#10A37F',
        bgGradient: 'from-emerald-950/60 via-slate-950 to-teal-950/40',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        textColor: 'text-emerald-400',
        borderStyle: 'border-emerald-500/30'
      }
    };
  }

  if (combined.includes('claude') || combined.includes('anthropic')) {
    return {
      key: 'claude',
      info: {
        name: 'Claude AI',
        brandColor: '#D97706',
        bgGradient: 'from-orange-950/50 via-slate-950 to-amber-950/40',
        badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        textColor: 'text-orange-400',
        borderStyle: 'border-orange-500/30'
      }
    };
  }

  if (combined.includes('microsoft') || combined.includes('ms 365') || combined.includes('ms365') || combined.includes('office') || combined.includes('hotmail') || combined.includes('outlook')) {
    return {
      key: 'microsoft',
      info: {
        name: combined.includes('hotmail') ? 'Hotmail' : combined.includes('outlook') ? 'Outlook' : 'Microsoft 365',
        brandColor: '#00A4EF',
        bgGradient: 'from-sky-950/60 via-slate-950 to-blue-950/40',
        badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        textColor: 'text-sky-400',
        borderStyle: 'border-sky-500/30'
      }
    };
  }

  if (combined.includes('instagram') || combined.includes('ig-')) {
    return {
      key: 'instagram',
      info: {
        name: 'Instagram',
        brandColor: '#E1306C',
        bgGradient: 'from-pink-950/50 via-purple-950/40 to-slate-950',
        badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
        textColor: 'text-pink-400',
        borderStyle: 'border-pink-500/30'
      }
    };
  }

  if (combined.includes('facebook') || combined.includes('fb-')) {
    return {
      key: 'facebook',
      info: {
        name: 'Facebook',
        brandColor: '#1877F2',
        bgGradient: 'from-blue-950/60 via-slate-950 to-indigo-950/40',
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        textColor: 'text-blue-400',
        borderStyle: 'border-blue-500/30'
      }
    };
  }

  if (combined.includes('youtube') || combined.includes('yt-')) {
    return {
      key: 'youtube',
      info: {
        name: 'YouTube',
        brandColor: '#FF0000',
        bgGradient: 'from-red-950/60 via-slate-950 to-rose-950/40',
        badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
        textColor: 'text-red-400',
        borderStyle: 'border-red-500/30'
      }
    };
  }

  if (combined.includes('linkedin')) {
    return {
      key: 'linkedin',
      info: {
        name: 'LinkedIn',
        brandColor: '#0A66C2',
        bgGradient: 'from-sky-950/60 via-slate-950 to-blue-950/40',
        badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        textColor: 'text-sky-400',
        borderStyle: 'border-sky-500/30'
      }
    };
  }

  if (combined.includes('gmail') || combined.includes('google')) {
    return {
      key: 'google',
      info: {
        name: 'Google / Gmail',
        brandColor: '#EA4335',
        bgGradient: 'from-rose-950/50 via-slate-950 to-red-950/40',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        textColor: 'text-rose-400',
        borderStyle: 'border-rose-500/30'
      }
    };
  }

  if (combined.includes('pubg') || combined.includes('gaming')) {
    return {
      key: 'pubg',
      info: {
        name: 'PUBG Mobile',
        brandColor: '#F59E0B',
        bgGradient: 'from-amber-950/70 via-slate-950 to-orange-950/50',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        textColor: 'text-amber-400',
        borderStyle: 'border-amber-500/30'
      }
    };
  }

  if (combined.includes('amazon')) {
    return {
      key: 'amazon',
      info: {
        name: 'Amazon',
        brandColor: '#FF9900',
        bgGradient: 'from-amber-950/60 via-slate-950 to-orange-950/40',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        textColor: 'text-amber-400',
        borderStyle: 'border-amber-500/30'
      }
    };
  }

  if (combined.includes('gcash')) {
    return {
      key: 'gcash',
      info: {
        name: 'GCash',
        brandColor: '#005CE6',
        bgGradient: 'from-blue-950/60 via-slate-950 to-cyan-950/40',
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        textColor: 'text-blue-400',
        borderStyle: 'border-blue-500/30'
      }
    };
  }

  if (combined.includes('bank') || combined.includes('wire') || combined.includes('payoneer') || combined.includes('wise')) {
    return {
      key: 'bank',
      info: {
        name: 'Bank Transfer',
        brandColor: '#10B981',
        bgGradient: 'from-emerald-950/50 via-slate-950 to-teal-950/40',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        textColor: 'text-emerald-400',
        borderStyle: 'border-emerald-500/30'
      }
    };
  }

  if (combined.includes('tiktok')) {
    return {
      key: 'tiktok',
      info: {
        name: 'TikTok',
        brandColor: '#EE1D52',
        bgGradient: 'from-pink-950/50 via-slate-950 to-cyan-950/40',
        badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
        textColor: 'text-pink-400',
        borderStyle: 'border-pink-500/30'
      }
    };
  }

  if (combined.includes('telegram')) {
    return {
      key: 'telegram',
      info: {
        name: 'Telegram',
        brandColor: '#229ED9',
        bgGradient: 'from-sky-950/60 via-slate-950 to-blue-950/40',
        badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        textColor: 'text-sky-400',
        borderStyle: 'border-sky-500/30'
      }
    };
  }

  if (combined.includes('twitter') || combined.includes('x-')) {
    return {
      key: 'x',
      info: {
        name: 'Twitter / X',
        brandColor: '#FFFFFF',
        bgGradient: 'from-slate-900 via-slate-950 to-slate-900',
        badgeBg: 'bg-slate-800 text-slate-200 border-slate-700',
        textColor: 'text-slate-200',
        borderStyle: 'border-slate-700'
      }
    };
  }

  if (combined.includes('spotify')) {
    return {
      key: 'spotify',
      info: {
        name: 'Spotify',
        brandColor: '#1DB954',
        bgGradient: 'from-emerald-950/60 via-slate-950 to-green-950/40',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        textColor: 'text-emerald-400',
        borderStyle: 'border-emerald-500/30'
      }
    };
  }

  return {
    key: 'digital',
    info: {
      name: 'Digital Service',
      brandColor: '#06B6D4',
      bgGradient: 'from-cyan-950/40 via-slate-950 to-slate-900',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      textColor: 'text-cyan-400',
      borderStyle: 'border-cyan-500/30'
    }
  };
}

interface PlatformLogoProps {
  title?: string;
  category?: string;
  subCategory?: string;
  id?: string;
  className?: string;
  showBadgeName?: boolean;
}

export const PlatformLogo: React.FC<PlatformLogoProps> = ({
  title = '',
  category = '',
  subCategory = '',
  id = '',
  className = 'w-6 h-6',
  showBadgeName = false
}) => {
  const { key, info } = detectPlatform(title, category, subCategory, id);

  const renderSvg = () => {
    switch (key) {
      case 'synthesia':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#1E40AF" />
            <path d="M6 8L12 4L18 8V16L12 20L6 16V8Z" fill="#3B82F6" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
        );

      case 'runway':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#831843" />
            <path d="M4 18C8 18 10 6 14 6C18 6 20 18 20 18" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="14" cy="6" r="2" fill="#F472B6" />
          </svg>
        );

      case 'luma':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#083344" />
            <path d="M12 3L20 19H4L12 3Z" fill="url(#luma_grad)" />
            <circle cx="12" cy="13" r="2.5" fill="white" />
            <defs>
              <linearGradient id="luma_grad" x1="4" y1="19" x2="20" y2="3" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06B6D4" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'pika':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#78350F" />
            <path d="M7 17V7L17 12L7 17Z" fill="#F59E0B" />
            <circle cx="17" cy="7" r="2" fill="#FBBF24" />
          </svg>
        );

      case 'hailuo':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#4C1D95" />
            <path d="M5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3" fill="#C4B5FD" />
          </svg>
        );

      case 'veed':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#064E3B" />
            <path d="M6 7L12 17L18 7" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'invideo':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#312E81" />
            <rect x="5" y="6" width="14" height="12" rx="2" stroke="#818CF8" strokeWidth="2" />
            <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="#818CF8" />
          </svg>
        );

      case 'openai':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.04 6.04 0 0 0-6.51-2.9 6.06 6.06 0 0 0-4.83-2.3 6.03 6.03 0 0 0-5.75 4.14 6.03 6.03 0 0 0-4.22 3.06 6 6 0 0 0 .76 7.1 5.98 5.98 0 0 0 .52 4.91 6.04 6.04 0 0 0 6.51 2.9 6.06 6.06 0 0 0 4.83 2.3 6.03 6.03 0 0 0 5.75-4.14 6.03 6.03 0 0 0 4.22-3.06 6 6 0 0 0-.76-7.101zM12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"
              fill="#10A37F"
            />
            <circle cx="12" cy="12" r="3" fill="#10A37F" />
          </svg>
        );

      case 'heygen':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="url(#heygen_grad)" />
            <path d="M7 8.5L12 5.5L17 8.5V15.5L12 18.5L7 15.5V8.5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.5" fill="#38BDF8" />
            <defs>
              <linearGradient id="heygen_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7C3AED" />
                <stop offset="1" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'kling':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#020617" stroke="#F59E0B" strokeWidth="1.2" />
            <path d="M8 6L18 12L8 18V6Z" fill="url(#kling_grad)" />
            <circle cx="17" cy="7" r="2" fill="#38BDF8" />
            <defs>
              <linearGradient id="kling_grad" x1="8" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'claude':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#D97706" />
            <path d="M12 4L14.2 9.8L20 12L14.2 14.2L12 20L9.8 14.2L4 12L9.8 9.8L12 4Z" fill="white" />
          </svg>
        );

      case 'microsoft':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
            <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
            <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
            <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
          </svg>
        );

      case 'instagram':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6.5" fill="url(#ig_grad)" />
            <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="white" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.8" />
            <circle cx="15.8" cy="8.2" r="0.9" fill="white" />
            <defs>
              <linearGradient id="ig_grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFDC80" />
                <stop offset="0.3" stopColor="#F77737" />
                <stop offset="0.6" stopColor="#F1356D" />
                <stop offset="1" stopColor="#833AB4" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'facebook':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#1877F2" />
            <path
              d="M14 8.5h2V5.8a22.3 22.3 0 0 0-2.8-.2c-2.8 0-4.7 1.7-4.7 4.8V13H6v3.5h2.5V23a11.2 11.2 0 0 0 3.5 0v-6.5h2.8l.5-3.5h-3.3v-2.2c0-1 .3-1.8 1.8-1.8z"
              fill="white"
            />
          </svg>
        );

      case 'youtube':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#FF0000" />
            <path d="M10 8L16 12L10 16V8Z" fill="white" />
          </svg>
        );

      case 'linkedin':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#0A66C2" />
            <path
              d="M6.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5 10h3v9H5v-9zm6 0h2.8v1.3h.1c.4-.7 1.4-1.5 2.8-1.5 3 0 3.5 2 3.5 4.6V19h-3v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3v-9z"
              fill="white"
            />
          </svg>
        );

      case 'google':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
        );

      case 'pubg':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#F59E0B" />
            <path d="M6 16L12 4L18 16H14L12 12L10 16H6Z" fill="#020617" />
            <path d="M12 14L15 20H9L12 14Z" fill="#020617" />
          </svg>
        );

      case 'amazon':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#020617" stroke="#FF9900" strokeWidth="1" />
            <path d="M18 15C18 15 13 18.5 6 15" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 14.5L19 16.5L18 13.5" fill="#FF9900" />
            <text x="6" y="12" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">a</text>
          </svg>
        );

      case 'gcash':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#005CE6" />
            <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" />
            <path d="M12 6V18M15 9H10.5C9.5 9 9 9.5 9 10.5C9 11.5 9.5 12 10.5 12H13.5C14.5 12 15 12.5 15 13.5C15 14.5 14.5 15 13.5 15H9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'bank':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#10B981" />
            <path d="M4 10L12 4L20 10V11H4V10ZM6 13H8V18H6V13ZM11 13H13V18H11V13ZM16 13H18V18H16V13ZM3 19H21V21H3V19Z" fill="white" />
          </svg>
        );

      case 'tiktok':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#020617" />
            <path
              d="M16.6 8.2c-1.2-.8-2-2.1-2.2-3.6h-2.9v11.8c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.1.9.2V11c-.3 0-.6-.1-.9-.1-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6 5.6-2.5 5.6-5.6V9.8c1.4 1 3.1 1.6 5 1.6V8.5c-.7 0-1.5-.1-2.2-.3z"
              fill="#00F2FE"
            />
            <path
              d="M16 7.6c-1.2-.8-2-2.1-2.2-3.6h-2.9v11.8c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.1.9.2V10.4c-.3 0-.6-.1-.9-.1-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6 5.6-2.5 5.6-5.6V9.2c1.4 1 3.1 1.6 5 1.6V7.9c-.7 0-1.5-.1-2.2-.3z"
              fill="#FF004F"
            />
          </svg>
        );

      case 'telegram':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#229ED9" />
            <path d="M18 7L15 18L11.5 14.5L9.5 16.5V13.5L15.5 8.5L8 13L4.5 11.5L18 7Z" fill="white" />
          </svg>
        );

      case 'x':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#000000" />
            <path d="M18.2 4H21L14.7 11.2L22 20H16.2L11.7 14.1L6.5 20H3.7L10.4 12.3L3.5 4H9.5L13.5 9.3L18.2 4ZM17.2 18.3H18.7L8.3 5.6H6.7L17.2 18.3Z" fill="white" />
          </svg>
        );

      case 'spotify':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#1DB954" />
            <path d="M17.5 15.5C15.2 14.1 11.2 13.9 7.8 15C7.3 15.1 6.8 14.8 6.7 14.3C6.6 13.8 6.9 13.3 7.4 13.2C11.3 12 15.8 12.2 18.5 13.9C18.9 14.1 19.1 14.7 18.8 15.1C18.6 15.5 18 15.7 17.5 15.5ZM18.2 12.6C15.8 11.1 10.8 10.5 7.2 11.6C6.7 11.8 6.1 11.5 5.9 10.9C5.7 10.4 6 9.8 6.6 9.6C10.7 8.4 16.2 9.1 19.1 10.8C19.6 11.1 19.8 11.7 19.5 12.2C19.2 12.6 18.6 12.8 18.2 12.6Z" fill="white" />
          </svg>
        );

      default:
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#06B6D4" />
            <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
            <path d="M12 9V15M9 12H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  if (showBadgeName) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${info.badgeBg}`}>
        {renderSvg()}
        <span>{info.name}</span>
      </div>
    );
  }

  return renderSvg();
};
