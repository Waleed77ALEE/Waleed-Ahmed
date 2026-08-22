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
  category: string;
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
  // 0a. Claude Max 3 Months (Featured Deal)
  {
    id: 'claude-max-3mo',
    platformName: 'Anthropic Claude',
    platformKey: 'claude',
    planName: 'Claude Max (3 Months)',
    category: 'AI Reasoning & Code',
    shortDescription: 'Featured 3-Month Subscription for Claude Max with 20x message limits & extended thinking.',
    detailedDescription: 'Anthropic Claude Max provides 20x higher usage limits on Claude 3.7 Sonnet & Opus models, extended context, Projects, Artifacts, and 3 months full replacement warranty.',
    prices: {
      Monthly: 65.00,
      '3 Months': 180.00,
      '6 Months': 340.00,
      Yearly: 620.00
    },
    features: [
      'Claude 3.7 Sonnet & Opus Maximum Context Capacity',
      '3 Months Guaranteed Subscription ($180 Special Offer)',
      '20x Higher Usage Limits & Priority Queue Access',
      'Advanced Code Execution & Project Workspace Support',
      'Artifacts & Extended Thinking / Hybrid Reasoning',
      '3 Months Complete Replacement Warranty & 24/7 Support'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Limited Offer',
    rating: 5.0,
    reviewsCount: 148,
    ordersCount: 420,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'What is included in the Claude Max 3-Month Offer ($180)?',
        answer: 'You receive 3 months full guaranteed access to Claude Max edition with 20x message rate limits, flagship Sonnet/Opus models, and instant checkout delivery.'
      }
    ],
    reviews: [
      {
        name: 'David K.',
        rating: 5,
        date: '2 days ago',
        comment: 'Claude Max is the best for large coding projects. $180 for 3 months was a smooth process!',
        plan: 'Claude Max (3 Months)'
      }
    ]
  },
  // 0. Grok SuperGrok Heavy (Featured Deal)
  {
    id: 'grok-supergrok-heavy',
    platformName: 'xAI Grok',
    platformKey: 'grok',
    planName: 'SuperGrok Heavy',
    category: 'AI Reasoning & Code',
    shortDescription: 'Featured 4-Month Subscription with heavy computing throughput, Grok 3 flagship reasoning & zero latency.',
    detailedDescription: 'SuperGrok Heavy offers raw computing power with maximum rate limits for xAI Grok 3 & Grok 2 models, deep code analysis, visual reasoning, realtime search grounding, and 4 months uninterrupted full warranty access.',
    prices: {
      Monthly: 35.00,
      '3 Months': 95.00,
      '6 Months': 180.00,
      Yearly: 320.00
    },
    features: [
      'SuperGrok Heavy High-Throughput Access',
      '4 Months Guaranteed Subscription ($120 Special Offer)',
      'Grok 3 & Grok 2 Vision & Reasoning Models',
      'Real-time Live Web Grounding & X Data Streams',
      'Unrestricted Code & File Analysis',
      'Instant Credential Delivery & Dedicated Account',
      '4 Months Replacement & Support Warranty'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Limited Offer',
    rating: 5.0,
    reviewsCount: 112,
    ordersCount: 340,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'What is included in the SuperGrok Heavy 4-Month Offer ($120)?',
        answer: 'You receive 4 months full guaranteed access to SuperGrok Heavy edition with maximum rate limits, flagship Grok reasoning models, and instant checkout delivery.'
      }
    ],
    reviews: [
      {
        name: 'Alex Vance',
        rating: 5,
        date: '1 day ago',
        comment: 'SuperGrok Heavy is insanely fast! The 4-month $120 deal saved me a lot compared to standard monthly costs.',
        plan: 'SuperGrok Heavy (4 Months)'
      }
    ]
  },
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
  },

  // 10. ChatGPT / OpenAI
  {
    id: 'chatgpt-plus',
    platformName: 'ChatGPT / OpenAI',
    platformKey: 'openai',
    planName: 'ChatGPT 20x (Private)',
    category: 'AI Assistant',
    shortDescription: 'Private ChatGPT account with 20x usage limits. Available for 1 Month, 3 Months, or 1 Year.',
    detailedDescription: 'Get a private ChatGPT account featuring unmetered 20x usage limits for GPT-4o and OpenAI o1 reasoning models. Enjoy uninterrupted access to DALL-E 3 image generation, advanced data analysis, real-time voice mode, and the custom GPT store without limits. 100% private and guaranteed.',
    prices: {
      Monthly: 42.00,
      '3 Months': 80.00,
      '6 Months': 120.00,
      Yearly: 160.00
    },
    features: [
      'Private Account (100% Yours)',
      'Unmetered 20x Usage Limits',
      'OpenAI o1 Reasoning Models',
      'DALL-E 3 High-Res Image Generator',
      'Real-Time Advanced Voice Mode',
      'Custom GPT Store & Builder Access'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Popular',
    rating: 4.98,
    reviewsCount: 420,
    ordersCount: 920,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Is this an official private ChatGPT Plus subscription?',
        answer: 'Yes, full private email access or direct subscription handover with 100% warranty.'
      }
    ],
    reviews: [
      {
        name: 'Tariq Mehmood',
        rating: 5,
        date: '1 day ago',
        comment: 'GPT-4o and o1 reasoning model works flawlessly! Handover in less than 5 minutes. The 20x limits are amazing.',
        plan: 'ChatGPT 20x (Private) - 3 Months'
      }
    ]
  },
  {
    id: 'chatgpt-pro',
    platformName: 'ChatGPT / OpenAI',
    platformKey: 'openai',
    planName: 'ChatGPT Pro',
    category: 'AI Assistant',
    shortDescription: 'Unlimited OpenAI o1 reasoning model, GPT-4o unlimited messages, and priority compute nodes.',
    detailedDescription: 'ChatGPT Pro provides power researchers, scientists, and software developers with unlimited o1 reasoning, ultra-fast priority compute, and full multi-modal capabilities.',
    prices: {
      Monthly: 200.00,
      '3 Months': 600.00,
      '6 Months': 1200.00,
      Yearly: 2400.00
    },
    features: [
      'Unlimited OpenAI o1 Reasoning Access',
      'Unlimited GPT-4o Message Allocation',
      'Highest Server Compute Priority',
      'Advanced Voice & Vision Multi-modal Suite',
      'Instant Code Interpreter & Deep Research',
      '24/7 Priority Support Guarantee'
    ],
    supportedDevices: ['Web Browser', 'macOS', 'Windows', 'iOS', 'Android'],
    badge: 'Enterprise',
    rating: 5.0,
    reviewsCount: 110,
    ordersCount: 290,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Who needs ChatGPT Pro?',
        answer: 'Ideal for AI researchers, quantitative analysts, senior software architects, and enterprise engineers.'
      }
    ],
    reviews: [
      {
        name: 'Dr. Sarah Jenkins',
        rating: 5,
        date: '2 days ago',
        comment: 'Unlimited o1 reasoning is essential for complex biomedical research. Fast delivery!',
        plan: 'ChatGPT Pro (3 Months)'
      }
    ]
  },

  // 11. Canva
  {
    id: 'canva-pro',
    platformName: 'Canva',
    platformKey: 'canva',
    planName: 'Canva Pro',
    category: 'Design & Media',
    shortDescription: '100M+ premium stock media, Magic Studio AI image editor, background remover, and brand kits.',
    detailedDescription: 'Canva Pro empowers creators and designers with 100+ million premium photos, videos, audio tracks, Magic Studio AI tools, instant background remover, and 1TB cloud storage.',
    prices: {
      Monthly: 12.00,
      '3 Months': 36.00,
      '6 Months': 72.00,
      Yearly: 119.00
    },
    features: [
      '100M+ Premium Stock Photos, Videos & Graphics',
      'Magic Studio AI Image & Video Generator',
      'One-Click AI Background Remover',
      'Magic Resize for Social Media',
      '1TB Cloud Asset Storage',
      'Brand Kit & Custom Fonts Upload'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Popular',
    rating: 4.95,
    reviewsCount: 420,
    ordersCount: 1150,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Will this upgrade my existing Canva account?',
        answer: 'Yes! We upgrade your personal email directly to Canva Pro with full warranty.'
      }
    ],
    reviews: [
      {
        name: 'Fatima Zohra',
        rating: 5,
        date: '3 days ago',
        comment: 'Upgraded my own email to Canva Pro in 2 minutes! Magic Eraser and premium elements work great.',
        plan: 'Canva Pro (Yearly)'
      }
    ]
  },
  {
    id: 'canva-teams',
    platformName: 'Canva',
    platformKey: 'canva',
    planName: 'Canva Teams',
    category: 'Design & Media',
    shortDescription: 'Multi-seat collaboration workspace for agencies with brand controls and shared designs.',
    detailedDescription: 'Canva Teams provides workspace controls, multi-user asset sharing, team approvals, unlimited brand kits, and shared cloud folders.',
    prices: {
      Monthly: 15.00,
      '3 Months': 45.00,
      '6 Months': 90.00,
      Yearly: 150.00
    },
    features: [
      'Includes Up to 5 Team Seats',
      'Team Workflow & Approval Controls',
      'Shared Brand Kits & Color Schemes',
      '1TB Shared Cloud Storage per member',
      'Centralized Template Library',
      'Full Commercial Distribution Rights'
    ],
    supportedDevices: ['Web Browser', 'macOS', 'Windows', 'iOS', 'Android'],
    badge: 'Trending',
    rating: 4.9,
    reviewsCount: 195,
    ordersCount: 480,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Can I add team members later?',
        answer: 'Yes, you can invite team members via email anytime from your Canva team admin panel.'
      }
    ],
    reviews: [
      {
        name: 'Bilal Ahmed',
        rating: 5,
        date: 'Yesterday',
        comment: 'Perfect solution for my design team. All 5 seats activated smoothly.',
        plan: 'Canva Teams (Yearly)'
      }
    ]
  },

  // 12. CapCut
  {
    id: 'capcut-pro',
    platformName: 'CapCut',
    platformKey: 'capcut',
    planName: 'CapCut Pro',
    category: 'Video Editing',
    shortDescription: 'AI auto-captions, 4K 60fps export, motion tracking, noise reduction, and VIP video FX.',
    detailedDescription: 'CapCut Pro gives TikTok, Instagram Reels, and Shorts video editors access to premium AI auto-subtitles, background removal, 4K 60fps high bitrate export, auto velocity curve, and VIP effects.',
    prices: {
      Monthly: 9.99,
      '3 Months': 29.97,
      '6 Months': 59.94,
      Yearly: 89.99
    },
    features: [
      'AI Auto-Captions & Subtitle Translator',
      '4K 60FPS High Bitrate Video Export',
      'Smart Background Cutout & Chroma Key',
      'Auto Velocity & Smooth Slow-Mo',
      '100GB Cloud Space Storage',
      'VIP Transitions, Effects & Filters'
    ],
    supportedDevices: ['Web Browser', 'iOS', 'Android', 'macOS', 'Windows'],
    badge: 'Best Seller',
    rating: 4.92,
    reviewsCount: 310,
    ordersCount: 880,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Does CapCut Pro work on both phone and PC?',
        answer: 'Yes, log in with the provided Pro account on your phone (iOS/Android) and PC/Mac simultaneously.'
      }
    ],
    reviews: [
      {
        name: 'Usman Ali',
        rating: 5,
        date: '2 days ago',
        comment: 'CapCut Pro auto captions and 4K export make video editing so fast for TikTok!',
        plan: 'CapCut Pro (Yearly)'
      }
    ]
  },

  // 13. Spotify
  {
    id: 'spotify-individual',
    platformName: 'Spotify',
    platformKey: 'spotify',
    planName: 'Premium Individual',
    category: 'Entertainment & Music',
    shortDescription: 'Ad-free music streaming, offline music downloads, high-fidelity audio, and unlimited skips.',
    detailedDescription: 'Spotify Premium Individual grants full ad-free access to 100+ million songs, high-fidelity 320kbps audio quality, offline music downloads, and unlimited track skips.',
    prices: {
      Monthly: 10.99,
      '3 Months': 32.97,
      '6 Months': 65.94,
      Yearly: 99.99
    },
    features: [
      'Ad-Free Music Streaming',
      'Offline Music & Podcast Downloads',
      '320kbps High Fidelity Audio',
      'Unlimited Track Skips',
      'Works on Mobile, Desktop & Smart TV',
      '100% Private Account Activation'
    ],
    supportedDevices: ['iOS', 'Android', 'macOS', 'Windows', 'Web', 'Smart TV'],
    badge: 'Popular',
    rating: 4.9,
    reviewsCount: 520,
    ordersCount: 1400,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Can I keep my existing playlists?',
        answer: 'Yes! We can upgrade your existing personal Spotify account directly so all your playlists remain intact.'
      }
    ],
    reviews: [
      {
        name: 'Zainab Malik',
        rating: 5,
        date: 'Yesterday',
        comment: 'Upgraded my own account to Spotify Premium. All my saved songs stayed untouched!',
        plan: 'Premium Individual (Yearly)'
      }
    ]
  },
  {
    id: 'spotify-family',
    platformName: 'Spotify',
    platformKey: 'spotify',
    planName: 'Premium Family',
    category: 'Entertainment & Music',
    shortDescription: '6 independent Premium accounts for family members under one address with Spotify Kids.',
    detailedDescription: 'Spotify Premium Family includes 6 separate individual Premium accounts, explicit music block settings, and shared family mix playlist.',
    prices: {
      Monthly: 16.99,
      '3 Months': 50.97,
      '6 Months': 101.94,
      Yearly: 149.99
    },
    features: [
      'Up to 6 Separate Premium Accounts',
      'Spotify Kids App Access',
      'Ad-Free & Unlimited Downloads',
      'Explicit Music Filter Controls',
      'Works Across All Devices',
      '100% Warranty Guaranteed'
    ],
    supportedDevices: ['iOS', 'Android', 'macOS', 'Windows', 'Smart TV'],
    badge: 'Trending',
    rating: 4.95,
    reviewsCount: 280,
    ordersCount: 620,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How do family members join?',
        answer: 'You will receive invite links to send to your 5 family members to activate their individual accounts.'
      }
    ],
    reviews: [
      {
        name: 'Imran Shah',
        rating: 5,
        date: '4 days ago',
        comment: 'Great value for the whole family. Delivered instantly by Waleed.',
        plan: 'Premium Family (Yearly)'
      }
    ]
  },

  // 14. Netflix
  {
    id: 'netflix-premium-4k',
    platformName: 'Netflix',
    platformKey: 'netflix',
    planName: 'Premium 4K Ultra HD',
    category: 'Entertainment & Music',
    shortDescription: '4K Ultra HD + HDR streaming, 4 screens simultaneously, Spatial Audio, and downloads on 6 devices.',
    detailedDescription: 'Netflix Premium 4K UHD gives you crystal-clear 4K resolution, Dolby Vision & Atmos support, 4 concurrent streams, Spatial Audio enhancement, and downloads on up to 6 devices.',
    prices: {
      Monthly: 19.99,
      '3 Months': 59.97,
      '6 Months': 119.94,
      Yearly: 199.99
    },
    features: [
      '4K Ultra HD + HDR10 / Dolby Vision',
      'Watch on 4 Supported Devices at Once',
      'Netflix Spatial Audio Enhancement',
      'Download Content on 6 Devices',
      'No Ads - 100% Unlimited Movies & TV',
      'Private PIN Protected Profile Available'
    ],
    supportedDevices: ['Smart TV', 'iOS', 'Android', 'macOS', 'Windows', 'PlayStation', 'Xbox'],
    badge: 'Best Seller',
    rating: 4.96,
    reviewsCount: 610,
    ordersCount: 1850,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'Is this account guaranteed against household restrictions?',
        answer: 'Yes! All our Netflix Premium accounts are fully verified and backed with instant 24/7 replacement warranty.'
      }
    ],
    reviews: [
      {
        name: 'Kamran Khan',
        rating: 5,
        date: '1 day ago',
        comment: '4K UHD quality on OLED TV is breathtaking. Zero buffering or household issues.',
        plan: 'Premium 4K Ultra HD (6 Months)'
      }
    ]
  },

  // 15. Adobe
  {
    id: 'adobe-cc-sub',
    platformName: 'Adobe',
    platformKey: 'adobe',
    planName: 'Creative Cloud All Apps',
    category: 'Design & Media',
    shortDescription: 'Photoshop, Illustrator, Premiere Pro, After Effects, Acrobat Pro + 100GB Cloud Storage.',
    detailedDescription: 'Upgrade your personal Adobe email directly to official Adobe Creative Cloud All Apps. Get access to 20+ desktop & mobile apps including Firefly AI generative fill, Adobe Fonts, and cloud sync.',
    prices: {
      Monthly: 54.99,
      '3 Months': 164.97,
      '6 Months': 329.94,
      Yearly: 499.00
    },
    features: [
      '20+ Apps (Photoshop, Illustrator, Premiere, etc.)',
      'Firefly AI Generative Fill & Expand',
      '100GB Official Adobe Cloud Storage',
      'Adobe Fonts & Stock Asset Access',
      'Direct Upgrade to Personal Adobe Email',
      'Full Commercial Distribution License'
    ],
    supportedDevices: ['macOS', 'Windows', 'iOS', 'Android'],
    badge: 'Enterprise',
    rating: 4.98,
    reviewsCount: 340,
    ordersCount: 790,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How is Adobe Creative Cloud delivered?',
        answer: 'We invite your personal Adobe email directly to our official business enterprise organization.'
      }
    ],
    reviews: [
      {
        name: 'Omer Farooq',
        rating: 5,
        date: '2 days ago',
        comment: 'Official Adobe account upgrade on my own email! Firefly AI works perfectly in Photoshop 2026.',
        plan: 'Creative Cloud All Apps (Yearly)'
      }
    ]
  },

  // 16. Microsoft
  {
    id: 'ms-365-sub',
    platformName: 'Microsoft',
    platformKey: 'microsoft',
    planName: 'Microsoft 365 + Copilot AI',
    category: 'Productivity',
    shortDescription: 'Word, Excel, PowerPoint, Outlook, 1TB OneDrive cloud storage & Copilot AI integration.',
    detailedDescription: 'Microsoft 365 subscription provides full desktop and mobile installation of Word, Excel, PowerPoint, Outlook, OneNote, 1TB OneDrive cloud storage, and built-in Copilot AI assistant.',
    prices: {
      Monthly: 9.99,
      '3 Months': 29.97,
      '6 Months': 59.94,
      Yearly: 69.99
    },
    features: [
      '1TB OneDrive Secure Cloud Storage',
      'Word, Excel, PowerPoint, Outlook Desktop Suite',
      'Copilot AI Writing & Formula Assistant',
      'Install on Up to 5 PCs / Macs + Phones',
      '100% Genuine Official Subscription',
      '24/7 Replacement Warranty'
    ],
    supportedDevices: ['Windows', 'macOS', 'iOS', 'Android', 'Web'],
    badge: 'Popular',
    rating: 4.9,
    reviewsCount: 390,
    ordersCount: 950,
    featured: true,
    status: 'Active',
    faqs: [
      {
        question: 'How do I download Microsoft 365?',
        answer: 'Log in to office.com using your assigned subscription email to download the official desktop installer.'
      }
    ],
    reviews: [
      {
        name: 'Saad Mahmood',
        rating: 5,
        date: '3 days ago',
        comment: '1TB OneDrive storage and Office apps activated right away. Excellent service!',
        plan: 'Microsoft 365 + Copilot AI (Yearly)'
      }
    ]
  }
];
