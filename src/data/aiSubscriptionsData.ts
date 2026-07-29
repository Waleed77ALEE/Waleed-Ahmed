export type SubscriptionDuration = 'Monthly' | '3 Months' | '6 Months' | 'Yearly';

export interface DurationPriceMap {
  Monthly: number;
  '3 Months': number;
  '6 Months': number;
  Yearly: number;
}

export interface AiSubscriptionPlan {
  id: string;
  platformName: string;
  platformKey: string;
  planName: string;
  category: 'AI Video' | 'AI Avatar' | 'AI Voice & Generation' | 'AI Creation';
  shortDescription: string;
  detailedDescription: string;
  prices: DurationPriceMap;
  features: string[];
  supportedDevices: string[];
  badge?: 'Best Seller' | 'Limited Offer' | 'Popular' | 'Trending' | 'Enterprise';
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  featured?: boolean;
  status?: 'Active' | 'Hidden';
  faqs: { question: string; answer: string }[];
  reviews: { name: string; avatar?: string; rating: number; date: string; comment: string; plan: string }[];
}

export const INITIAL_AI_SUBSCRIPTIONS: AiSubscriptionPlan[] = [
  // 1. HeyGen
  {
    id: 'heygen-creator',
    platformName: 'HeyGen AI',
    platformKey: 'heygen',
    planName: 'Creator Plan',
    category: 'AI Avatar',
    shortDescription: 'Ideal for individual creators building studio-quality AI avatar videos with multi-language voice clone.',
    detailedDescription: 'HeyGen Creator plan gives individual video creators 180 credits per year (15 credits/mo), access to 170+ photorealistic AI avatars, 300+ natural voices in 40+ languages, auto-captioning, and instant 1080p video exports.',
    prices: {
      Monthly: 40.60,
      '3 Months': 121.80,
      '6 Months': 243.60,
      Yearly: 487.20
    },
    features: [
      '180 Credits per year (15 credits/mo)',
      '5 min max video length per export',
      '170+ Photorealistic AI Avatars',
      '300+ Voices in 40+ languages',
      'Instant Auto-Captions & Subtitles',
      'No HeyGen Watermark',
      '30-Day Replacement Guarantee'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Popular',
    rating: 4.9,
    reviewsCount: 142,
    ordersCount: 389,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How do I access my HeyGen Creator subscription?',
        answer: 'Upon instant checkout, you will receive full login credentials or direct workspace access email instructions with 24/7 handover.'
      },
      {
        question: 'Can I upgrade to Pro duration later?',
        answer: 'Yes, you can upgrade your plan or renew for 3 Months, 6 Months, or 1 Year anytime via your account portal.'
      }
    ],
    reviews: [
      {
        name: 'David Miller',
        rating: 5,
        date: '2 days ago',
        comment: 'Super fast handover! The avatar quality on HeyGen Creator is mindblowing for TikTok & YouTube Shorts.',
        plan: 'Creator Plan (Yearly)'
      }
    ]
  },
  {
    id: 'heygen-pro',
    platformName: 'HeyGen AI',
    platformKey: 'heygen',
    planName: 'Pro Plan',
    category: 'AI Avatar',
    shortDescription: 'Professional tier for agencies & studios with 4K rendering, custom avatar cloning & priority queue.',
    detailedDescription: 'Unlock professional production speed with 360 credits per year (30 credits/mo), up to 15-minute video duration, 4K rendering quality, multi-seat workspace access, and API priority processing.',
    prices: {
      Monthly: 68.60,
      '3 Months': 205.80,
      '6 Months': 411.60,
      Yearly: 823.20
    },
    features: [
      '360 Credits per year (30 credits/mo)',
      '15 min max video length per export',
      '4K Export rendering resolution',
      '180+ Premium Studio Avatars',
      'Custom Instant Avatar Cloning',
      'API Access & Priority Render Queue',
      'Commercial Distribution Rights'
    ],
    supportedDevices: ['Web Browser', 'macOS', 'Windows', 'iOS', 'Android'],
    badge: 'Best Seller',
    rating: 5.0,
    reviewsCount: 215,
    ordersCount: 512,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Does Pro include 4K resolution exports?',
        answer: 'Yes, the HeyGen Pro plan includes full 4K ultra-high-definition rendering for all generated avatar videos.'
      }
    ],
    reviews: [
      {
        name: 'Elena Rostova',
        rating: 5,
        date: 'Yesterday',
        comment: 'Best AI video platform for marketing agencies. Waleed provided instant access with full warranty.',
        plan: 'Pro Plan (Yearly)'
      }
    ]
  },

  // 2. Synthesia
  {
    id: 'synthesia-starter',
    platformName: 'Synthesia AI',
    platformKey: 'synthesia',
    planName: 'Starter Plan',
    category: 'AI Avatar',
    shortDescription: 'Entry-level corporate avatar platform for employee training videos, presentations, and demos.',
    detailedDescription: 'Synthesia Starter provides 10 minutes of video generation per month, 70+ built-in diverse AI avatars, 120+ video templates, built-in screen recorder, and MP4 downloads.',
    prices: {
      Monthly: 40.60,
      '3 Months': 121.80,
      '6 Months': 243.60,
      Yearly: 487.20
    },
    features: [
      '10 Minutes of AI Video per month',
      '70+ Built-in AI Avatars',
      '120+ Languages & Accent Voices',
      'Integrated Screen Recorder & Editor',
      'Auto Captions & Subtitle Generator',
      '1080p Full HD Video Downloads'
    ],
    supportedDevices: ['Web Browser', 'Windows', 'macOS'],
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 98,
    ordersCount: 230,
    featured: false,
    status: 'Active',
    faqs: [
      {
        question: 'Are Synthesia videos approved for commercial use?',
        answer: 'Yes, all Synthesia Starter & Creator plans include full commercial usage rights for social media, ads, and training.'
      }
    ],
    reviews: [
      {
        name: 'Marcus Vance',
        rating: 5,
        date: '3 days ago',
        comment: 'Created 4 onboarding videos in under 30 minutes. Synthesia voice synthesis is ultra smooth.',
        plan: 'Starter Plan (3 Months)'
      }
    ]
  },
  {
    id: 'synthesia-creator',
    platformName: 'Synthesia AI',
    platformKey: 'synthesia',
    planName: 'Creator Plan',
    category: 'AI Avatar',
    shortDescription: 'Advanced studio creation with 30 min/mo video generation, custom webcam avatar, and brand kits.',
    detailedDescription: 'Synthesia Creator expands your workflow with 30 minutes of AI video generation per month, 90+ avatars, custom voice clone capabilities, branded video player embedding, and team collaboration.',
    prices: {
      Monthly: 124.60,
      '3 Months': 373.80,
      '6 Months': 747.60,
      Yearly: 1495.20
    },
    features: [
      '30 Minutes of AI Video per month',
      '90+ Premium Avatars + Custom Webcam Avatar',
      'Custom Voice Cloning Access',
      'Brand Kit (Fonts, Logos, Color Palette)',
      '1080p Video Downloads + Embed Player',
      'Priority Support & Replacement Guarantee'
    ],
    supportedDevices: ['Web Browser', 'Windows', 'macOS'],
    badge: 'Enterprise',
    rating: 4.95,
    reviewsCount: 164,
    ordersCount: 310,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How does custom voice cloning work on Synthesia?',
        answer: 'You can record a 5-minute sample audio script in Synthesia to generate your personal AI clone voice.'
      }
    ],
    reviews: [
      {
        name: 'Dr. Aris Thorne',
        rating: 5,
        date: '4 days ago',
        comment: 'The Creator plan paid for itself in one client project. Excellent service delivery from Waleed.',
        plan: 'Creator Plan (Yearly)'
      }
    ]
  },

  // 3. Kling AI
  {
    id: 'kling-standard',
    platformName: 'Kling AI',
    platformKey: 'kling',
    planName: 'Standard Plan',
    category: 'AI Video',
    shortDescription: 'Cinematic AI video generation with 660 credits/mo, motion brush, and 1080p rendering.',
    detailedDescription: 'Kling AI Standard plan includes 660 credits per month, high-fidelity physics-based motion synthesis, 5s and 10s video duration options, camera motion control, and motion brush brush tools.',
    prices: {
      Monthly: 14.00,
      '3 Months': 42.00,
      '6 Months': 84.00,
      Yearly: 168.00
    },
    features: [
      '660 Credits per month',
      '1080p Full HD Cinematic Video Export',
      '5-second & 10-second Video Duration',
      'Advanced Motion Brush & Path Tools',
      'Camera Controls (Pan, Zoom, Tilt, Roll)',
      'Standard Generation Speed Queue'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android'],
    badge: 'Limited Offer',
    rating: 4.85,
    reviewsCount: 178,
    ordersCount: 412,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Is Kling AI available globally?',
        answer: 'Yes, our Kling AI account plans work globally with full high-speed access without VPN restriction.'
      }
    ],
    reviews: [
      {
        name: 'Liam Chen',
        rating: 5,
        date: '1 day ago',
        comment: 'Kling AI video quality is unreal. 660 credits for $14/mo is an absolute steal!',
        plan: 'Standard Plan (6 Months)'
      }
    ]
  },
  {
    id: 'kling-pro',
    platformName: 'Kling AI',
    platformKey: 'kling',
    planName: 'Pro Plan',
    category: 'AI Video',
    shortDescription: 'Unlimited creative power with 3,000 credits/mo, fast priority queue, and lip sync audio matching.',
    detailedDescription: 'Kling AI Pro unlocks 3,000 monthly credits, premier fast queue priority, lip sync audio integration, professional keyframe controls, and multi-prompt video chaining.',
    prices: {
      Monthly: 51.80,
      '3 Months': 155.40,
      '6 Months': 310.80,
      Yearly: 621.60
    },
    features: [
      '3,000 Credits per month',
      'Premier Ultra-Fast Priority Queue',
      'AI Audio & Lip Sync Synchronization',
      'Professional Camera Movement Controls',
      'Multi-Prompt Keyframe Sequence Generator',
      'Full Commercial Distribution Rights'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android'],
    badge: 'Best Seller',
    rating: 5.0,
    reviewsCount: 289,
    ordersCount: 640,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How fast is the Pro queue?',
        answer: 'Kling AI Pro generations finish in 30 to 90 seconds under premier priority server nodes.'
      }
    ],
    reviews: [
      {
        name: 'Siddharth Patel',
        rating: 5,
        date: '5 hours ago',
        comment: 'Super reliable Pro plan. The lip sync feature is game changing for AI short films.',
        plan: 'Pro Plan (Yearly)'
      }
    ]
  },

  // 4. Runway
  {
    id: 'runway-standard',
    platformName: 'Runway ML',
    platformKey: 'runway',
    planName: 'Standard Plan',
    category: 'AI Video',
    shortDescription: 'Gen-2 & Gen-3 Alpha video generation with 625 credits/mo, upscaling, and background removal.',
    detailedDescription: 'Runway Standard provides 625 credits per month, Gen-3 Alpha and Gen-2 video models, 4K resolution upscaling, motion brush, camera control, and background video removal tools.',
    prices: {
      Monthly: 16.80,
      '3 Months': 50.40,
      '6 Months': 100.80,
      Yearly: 201.60
    },
    features: [
      '625 Credits per month',
      'Access to Gen-3 Alpha & Gen-2 Video Models',
      '4K Resolution Upscaler',
      'No Runway Watermark',
      'Motion Brush & Camera Panning',
      '100 GB Cloud Storage'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'macOS', 'Windows'],
    badge: 'Popular',
    rating: 4.9,
    reviewsCount: 156,
    ordersCount: 395,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Do unused credits roll over on Runway?',
        answer: 'Monthly credits reset every billing cycle, but yearly plan allocations are available up front.'
      }
    ],
    reviews: [
      {
        name: 'Carlos Gomez',
        rating: 5,
        date: '2 days ago',
        comment: 'Gen-3 Alpha quality is top tier. Order delivered within minutes by Waleed.',
        plan: 'Standard Plan (Yearly)'
      }
    ]
  },
  {
    id: 'runway-pro',
    platformName: 'Runway ML',
    platformKey: 'runway',
    planName: 'Pro Plan',
    category: 'AI Video',
    shortDescription: 'Maximum performance for VFX artists with 2,250 credits/mo, Gen-3 Alpha Turbo, and priority queue.',
    detailedDescription: 'Runway Pro gives power creators 2,250 credits per month, Gen-3 Alpha Turbo model speed, custom voiceover generator, lip sync, 500 GB cloud storage, and team sharing options.',
    prices: {
      Monthly: 39.20,
      '3 Months': 117.60,
      '6 Months': 235.20,
      Yearly: 470.40
    },
    features: [
      '2,250 Credits per month',
      'Gen-3 Alpha & Gen-3 Alpha Turbo',
      'Priority Fast Render Server Queue',
      'AI Lip Sync & Custom Voiceover Generator',
      '500 GB Secure Cloud Asset Storage',
      'Commercial License Rights Included'
    ],
    supportedDevices: ['Web Browser', 'macOS', 'Windows'],
    badge: 'Trending',
    rating: 4.95,
    reviewsCount: 240,
    ordersCount: 520,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'What is Gen-3 Alpha Turbo?',
        answer: 'Gen-3 Alpha Turbo renders 7x faster than standard Gen-3 with high visual coherence.'
      }
    ],
    reviews: [
      {
        name: 'Hassan Al-Maktoum',
        rating: 5,
        date: '3 days ago',
        comment: 'Essential tool for our commercial VFX pipeline. Great price and instant account delivery.',
        plan: 'Pro Plan (Yearly)'
      }
    ]
  },

  // 5. Luma AI
  {
    id: 'luma-standard',
    platformName: 'Luma AI',
    platformKey: 'luma',
    planName: 'Standard Plan',
    category: 'AI Video',
    shortDescription: 'Dream Machine 3D physics video generator with 120 generations/mo and high-speed queue.',
    detailedDescription: 'Luma AI Dream Machine Standard plan gives 120 video generations per month, photorealistic camera motions, keyframe control, and high-speed cloud generation nodes.',
    prices: {
      Monthly: 13.99,
      '3 Months': 41.97,
      '6 Months': 83.94,
      Yearly: 167.88
    },
    features: [
      '120 Video Generations per month',
      'Dream Machine High-Physics Engine',
      'High-Speed Render Queue Priority',
      'Commercial License Rights',
      'No Luma Watermarks',
      '30-Day Account Replacement Guarantee'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'macOS', 'Windows'],
    badge: 'Limited Offer',
    rating: 4.8,
    reviewsCount: 112,
    ordersCount: 280,
    featured: false,
    status: 'Active',
    faqs: [
      {
        question: 'Does Luma AI support camera keyframing?',
        answer: 'Yes, Luma Dream Machine supports keyframe start and end images for precise camera movement control.'
      }
    ],
    reviews: [
      {
        name: 'Zoe Bennett',
        rating: 5,
        date: 'Yesterday',
        comment: 'Dream Machine creates physics that look real! Seamless checkout with JazzCash.',
        plan: 'Standard Plan (3 Months)'
      }
    ]
  },
  {
    id: 'luma-pro',
    platformName: 'Luma AI',
    platformKey: 'luma',
    planName: 'Pro Plan',
    category: 'AI Video',
    shortDescription: 'Power video production with 400 generations/mo, maximum priority speed, and 4K controls.',
    detailedDescription: 'Luma AI Pro is engineered for professional studios requiring 400 generations per month, top-tier render speed, 4K camera controls, and priority customer care.',
    prices: {
      Monthly: 41.99,
      '3 Months': 125.97,
      '6 Months': 251.94,
      Yearly: 503.88
    },
    features: [
      '400 Video Generations per month',
      'Maximum Server Priority Acceleration',
      '4K Resolution Camera Control Suite',
      'Multi-Keyframe Interpolation Engine',
      'Full Commercial & Broadcast Usage',
      '24/7 Dedicated Support & Guarantee'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'macOS', 'Windows'],
    badge: 'Best Seller',
    rating: 4.95,
    reviewsCount: 190,
    ordersCount: 440,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How many generations are in Luma Pro?',
        answer: 'Luma Pro includes 400 full-fidelity video generations per month.'
      }
    ],
    reviews: [
      {
        name: 'Oliver Wright',
        rating: 5,
        date: '2 days ago',
        comment: 'High volume generation with zero lag. Binance Pay payment processed instantly.',
        plan: 'Pro Plan (Yearly)'
      }
    ]
  },

  // 6. Pika
  {
    id: 'pika-standard',
    platformName: 'Pika Labs',
    platformKey: 'pika',
    planName: 'Standard Plan',
    category: 'AI Video',
    shortDescription: 'Pika 1.5 video effects, 700 credits/mo, sound effects generator, and custom canvas expansion.',
    detailedDescription: 'Pika Standard features 700 credits per month, Pika 1.5 special effects (Inflate, Melt, Explode, Squish), AI audio generator, lip sync, and canvas expansion tools.',
    prices: {
      Monthly: 14.00,
      '3 Months': 42.00,
      '6 Months': 84.00,
      Yearly: 168.00
    },
    features: [
      '700 Credits per month',
      'Pika 1.5 Special FX (Inflate, Squish, Melt)',
      'AI Sound Effects & Music Generator',
      'AI Lip Sync & Audio Match',
      'Video Canvas Expand & Extend',
      'No Pika Watermark'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android'],
    badge: 'Popular',
    rating: 4.85,
    reviewsCount: 140,
    ordersCount: 315,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'What special effects are in Pika 1.5?',
        answer: 'Pika 1.5 introduces physics FX such as Melt, Inflate, Squish, Cakeify, and Explode.'
      }
    ],
    reviews: [
      {
        name: 'Amara Okafor',
        rating: 5,
        date: '3 days ago',
        comment: 'The Pika 1.5 effects are hilarious and viral-ready for Reels! Thanks Waleed!',
        plan: 'Standard Plan (Yearly)'
      }
    ]
  },
  {
    id: 'pika-pro',
    platformName: 'Pika Labs',
    platformKey: 'pika',
    planName: 'Pro Plan',
    category: 'AI Video',
    shortDescription: 'Unlimited creative video suite with 2,000 credits/mo, commercial license, and fast queue.',
    detailedDescription: 'Pika Pro is designed for viral content creators needing 2,000 monthly credits, high-speed priority rendering, commercial rights, and unlimited generations in relax queue.',
    prices: {
      Monthly: 39.20,
      '3 Months': 117.60,
      '6 Months': 235.20,
      Yearly: 470.40
    },
    features: [
      '2,000 Credits per month',
      'Unlimited Relaxed Queue Generations',
      'Pika 1.5 FX + Pro Sound Synthesis',
      'Commercial Rights License Included',
      'Priority Render Queue Processing',
      '30-Day Guaranteed Account Handover'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android'],
    badge: 'Trending',
    rating: 4.9,
    reviewsCount: 185,
    ordersCount: 410,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Does Pika Pro allow commercial use?',
        answer: 'Yes, Pika Pro includes full commercial usage rights for YouTube, client work, and advertising.'
      }
    ],
    reviews: [
      {
        name: 'Soren Lindqvist',
        rating: 5,
        date: '4 days ago',
        comment: 'Pika Pro relax queue is amazing. Great experience dealing with Waleed Khan Afridi.',
        plan: 'Pro Plan (Yearly)'
      }
    ]
  },

  // 7. Hailuo AI
  {
    id: 'hailuo-standard',
    platformName: 'Hailuo AI',
    platformKey: 'hailuo',
    planName: 'Standard Plan',
    category: 'AI Video',
    shortDescription: 'MiniMax Hailuo video engine with 1080p 60fps cinematic video rendering and prompt magic.',
    detailedDescription: 'Hailuo AI (MiniMax Video) Standard plan offers high-resolution cinematic video generation, realistic human motion dynamics, prompt optimizer, and 1080p 60fps exports.',
    prices: {
      Monthly: 20.99,
      '3 Months': 62.97,
      '6 Months': 125.94,
      Yearly: 251.88
    },
    features: [
      'Standard Generation Credits',
      '1080p 60fps Ultra Fluid Rendering',
      'MiniMax Video Cinematic Physics',
      'AI Prompt Optimizer Engine',
      'No Watermarks on Export',
      '30-Day Replacement Guarantee'
    ],
    supportedDevices: ['Web Browser', 'Windows', 'macOS'],
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 95,
    ordersCount: 220,
    featured: false,
    status: 'Active',
    faqs: [
      {
        question: 'What makes Hailuo AI unique?',
        answer: 'Hailuo AI (MiniMax) is renowned for incredibly natural human movement, hair physics, and facial expression consistency.'
      }
    ],
    reviews: [
      {
        name: 'Klaus Webber',
        rating: 5,
        date: 'Yesterday',
        comment: 'Hailuo human video motions are the best in the industry right now. Super smooth!',
        plan: 'Standard Plan (6 Months)'
      }
    ]
  },
  {
    id: 'hailuo-pro',
    platformName: 'Hailuo AI',
    platformKey: 'hailuo',
    planName: 'Pro Plan',
    category: 'AI Video',
    shortDescription: 'Unrestricted MiniMax video generation with 4K upscaler, priority queue, and commercial rights.',
    detailedDescription: 'Hailuo AI Pro delivers maximum rendering priority, 4K resolution upscaling, extended clip lengths, multi-shot coherence, and full commercial distribution rights.',
    prices: {
      Monthly: 48.99,
      '3 Months': 146.97,
      '6 Months': 293.94,
      Yearly: 587.88
    },
    features: [
      'Pro Tier Priority Render Queue',
      '4K Ultra HD Video Upscaling',
      'Multi-Shot Coherent Sequence Engine',
      'Commercial License Rights',
      'No Watermarks + High Bitrate MP4',
      '24/7 Dedicated Support & Warranty'
    ],
    supportedDevices: ['Web Browser', 'Windows', 'macOS'],
    badge: 'Best Seller',
    rating: 4.95,
    reviewsCount: 140,
    ordersCount: 340,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Is 4K upscaling included in Pro?',
        answer: 'Yes, Hailuo Pro includes 4K ultra-high-definition video upscaling out of the box.'
      }
    ],
    reviews: [
      {
        name: 'Maya Lin',
        rating: 5,
        date: '3 days ago',
        comment: 'Pro plan speed is ridiculous! Payoneer payment went through smoothly.',
        plan: 'Pro Plan (Yearly)'
      }
    ]
  },

  // 8. VEED AI
  {
    id: 'veed-lite',
    platformName: 'VEED.IO',
    platformKey: 'veed',
    planName: 'Lite Plan',
    category: 'AI Creation',
    shortDescription: 'All-in-one online video editor with 1080p exports, auto-subtitles (360 mins/yr), and AI removal.',
    detailedDescription: 'VEED Lite provides 12 hours of video export per year, 1080p resolution, 360 minutes of auto-subtitle generation, AI background noise remover, and stock media library.',
    prices: {
      Monthly: 26.60,
      '3 Months': 79.80,
      '6 Months': 159.60,
      Yearly: 319.20
    },
    features: [
      '12 Hours Video Export per year',
      '1080p Full HD Export Quality',
      '360 Mins/Yr Auto-Subtitles & Captions',
      'AI Background Noise Removal',
      'Stock Video & Music Library',
      '30-Day Replacement Guarantee'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Popular',
    rating: 4.85,
    reviewsCount: 120,
    ordersCount: 290,
    featured: false,
    status: 'Active',
    faqs: [
      {
        question: 'Can I generate subtitles in multiple languages on VEED?',
        answer: 'Yes, VEED Lite supports auto-subtitle translation in over 50 languages.'
      }
    ],
    reviews: [
      {
        name: 'Hannah Brooks',
        rating: 5,
        date: '2 days ago',
        comment: 'Auto subtitles saved me hours of editing on podcasts. Great value.',
        plan: 'Lite Plan (Yearly)'
      }
    ]
  },
  {
    id: 'veed-pro',
    platformName: 'VEED.IO',
    platformKey: 'veed',
    planName: 'Pro Plan',
    category: 'AI Creation',
    shortDescription: 'Full studio suite with 4K exports, 1,440 mins/yr auto-subtitles, AI text-to-speech, and Brand Kit.',
    detailedDescription: 'VEED Pro includes 24 hours of video export per year, 4K rendering quality, 1,440 minutes of auto-subtitles, AI text-to-speech voice generator, eye contact corrector, and brand kit.',
    prices: {
      Monthly: 68.60,
      '3 Months': 205.80,
      '6 Months': 411.60,
      Yearly: 823.20
    },
    features: [
      '24 Hours Video Export per year',
      '4K Ultra HD Export Quality',
      '1,440 Mins/Yr Auto-Subtitles',
      'AI Text-to-Speech Voice Generator',
      'AI Eye Contact Corrector Tool',
      'Custom Brand Kit & Fonts Upload',
      'Priority Video Rendering'
    ],
    supportedDevices: ['Web Browser', 'macOS', 'Windows'],
    badge: 'Best Seller',
    rating: 4.95,
    reviewsCount: 210,
    ordersCount: 480,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'What is the AI Eye Contact tool in VEED Pro?',
        answer: 'AI Eye Contact redirects your gaze so you look directly into the camera lens even if reading notes.'
      }
    ],
    reviews: [
      {
        name: 'James C. Taylor',
        rating: 5,
        date: 'Yesterday',
        comment: 'VEED Pro AI tools are unmatched. Account received instantly from Waleed.',
        plan: 'Pro Plan (Yearly)'
      }
    ]
  },

  // 9. InVideo AI
  {
    id: 'invideo-plus',
    platformName: 'InVideo AI',
    platformKey: 'invideo',
    planName: 'Plus Plan',
    category: 'AI Video',
    shortDescription: 'Turn text scripts into full AI YouTube videos with 50 mins/mo AI video creation & 80 iStock clips.',
    detailedDescription: 'InVideo AI Plus includes 50 minutes of AI video creation per month, 80 iStock premium media clips per month, 100GB cloud storage, voice clone, and 4K video exports.',
    prices: {
      Monthly: 39.20,
      '3 Months': 117.60,
      '6 Months': 235.20,
      Yearly: 470.40
    },
    features: [
      '50 Mins/mo AI Video Creation',
      '80 iStock Premium Clips per month',
      '100 GB Cloud Asset Storage',
      'AI Voice Cloning Access',
      'Unlimited Export Resolutions',
      'No InVideo Watermark'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Popular',
    rating: 4.9,
    reviewsCount: 165,
    ordersCount: 380,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How does InVideo AI script to video work?',
        answer: 'You enter a topic or prompt (e.g., "Create a 5-minute documentary about AI"), and InVideo writes the script, selects footage, generates voiceover, and edits the video.'
      }
    ],
    reviews: [
      {
        name: 'Rohan Sharma',
        rating: 5,
        date: '2 days ago',
        comment: 'Generated a full YouTube video in 3 minutes! Best investment for content creators.',
        plan: 'Plus Plan (Yearly)'
      }
    ]
  },
  {
    id: 'invideo-max',
    platformName: 'InVideo AI',
    platformKey: 'invideo',
    planName: 'Max Plan',
    category: 'AI Video',
    shortDescription: 'Ultimate YouTube faceless channel generator with 200 mins/mo AI video & 320 iStock clips.',
    detailedDescription: 'InVideo AI Max gives high-volume YouTubers 200 minutes of AI video creation per month, 320 iStock premium footage clips per month, 400GB cloud storage, and priority rendering.',
    prices: {
      Monthly: 70.00,
      '3 Months': 210.00,
      '6 Months': 420.00,
      Yearly: 840.00
    },
    features: [
      '200 Mins/mo AI Video Creation',
      '320 iStock Premium Clips per month',
      '400 GB Cloud Asset Storage',
      'Multi-Voice Clone Studio',
      'Priority Video Render Servers',
      'Full Commercial & Resell Rights'
    ],
    supportedDevices: ['Web Browser', 'macOS', 'Windows', 'iOS', 'Android'],
    badge: 'Enterprise',
    rating: 4.98,
    reviewsCount: 240,
    ordersCount: 560,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Can I manage multiple YouTube channels on Max?',
        answer: 'Yes, InVideo AI Max is designed for faceless YouTube automation channels across multiple niches.'
      }
    ],
    reviews: [
      {
        name: 'Alexander Ross',
        rating: 5,
        date: 'Yesterday',
        comment: 'Running 3 faceless YouTube channels on InVideo Max. Delivery was instant and smooth.',
        plan: 'Max Plan (Yearly)'
      }
    ]
  }
];
