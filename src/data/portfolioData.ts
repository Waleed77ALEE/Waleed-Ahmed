import { Project, CoreService, Testimonial, FAQItem } from '../types';

export const CORE_SERVICES: CoreService[] = [
  {
    id: 'web-dev',
    title: 'Full Stack Web Development',
    icon: 'Code',
    description: 'Custom React, Next.js, Node.js, and Express web applications built for extreme speed, scalability, and modern UI performance.',
    deliverables: ['Custom React/Next.js App', 'REST & GraphQL API Integration', 'Database Schema & Cloud Setup', '100% Mobile Responsive Layout'],
    startingPrice: '$299',
    turnaround: '3 - 5 Days'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Interface Design',
    icon: 'Palette',
    description: 'High-converting, aesthetic Figma designs with micro-interactions, dark/light luxury visual style, and modern user flow optimization.',
    deliverables: ['Figma Design System', 'Interactive Prototypes', 'Mobile & Desktop Mockups', 'Component Architecture'],
    startingPrice: '$199',
    turnaround: '2 - 3 Days'
  },
  {
    id: 'seo-audit',
    title: 'Technical & Organic SEO',
    icon: 'Search',
    description: 'Comprehensive technical SEO audits, schema markup implementation, Core Web Vitals optimization, and keyword ranking strategy.',
    deliverables: ['Full Technical Audit Report', 'JSON-LD Schema Implementation', 'Speed & Performance Optimization', 'Keyword & Backlink Strategy'],
    startingPrice: '$149',
    turnaround: '1 - 2 Days'
  },
  {
    id: 'api-automation',
    title: 'API Integration & Automation',
    icon: 'Cpu',
    description: 'Seamless integration with OpenAI, Claude, Telegram bots, Payment gateways, social media APIs, and webhook automations.',
    deliverables: ['Custom Server Proxy APIs', 'AI Model Fine-tuning & Prompts', 'Webhook Pipeline Configuration', 'API Key Security Architecture'],
    startingPrice: '$179',
    turnaround: '1 - 3 Days'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Marketplace Builds',
    icon: 'ShoppingBag',
    description: 'Custom digital store platforms with instant order processing, inventory controls, automated WhatsApp checkout, and payment gateways.',
    deliverables: ['Custom Product Marketplace', 'WhatsApp & Stripe Checkout', 'Admin Inventory Panel', 'SEO Product Schema'],
    startingPrice: '$349',
    turnaround: '4 - 7 Days'
  },
  {
    id: 'app-speed',
    title: 'Core Web Vitals & Speed Boost',
    icon: 'Zap',
    description: 'Optimizing existing slow websites to achieve 95+ PageSpeed scores, zero cumulative layout shift (CLS), and sub-second loading.',
    deliverables: ['Sub-second Page Load Speed', 'Asset Compression & CDN Setup', 'Script Deferral & Bundling', 'Lighthouse 95+ Score Guarantee'],
    startingPrice: '$120',
    turnaround: '24 Hours'
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'digital-services-hub',
    title: 'Digital Services & Subscriptions Marketplace',
    description: 'High-performance ecommerce platform for digital tools, AI API keys, and social growth packages with automated WhatsApp checkout.',
    category: 'Full Stack & Web',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'Tailwind CSS', 'WhatsApp API', 'Marketplace'],
    liveUrl: 'https://waleedkhanafridi.online',
    githubUrl: 'https://github.com/waleedkhanafridi',
    featured: true,
    metrics: '500+ Digital Orders Processed',
    overview: 'An end-to-end modern web platform engineered to sell digital accounts, verified AI API subscriptions, software licenses, and social media growth packages seamlessly across global markets.',
    clientGoals: 'Create an instant-load, mobile-first marketplace that eliminates payment gateway friction and routes customer orders directly via WhatsApp API with full transaction tracking.',
    challenges: 'Integrating multi-currency pricing (USD, PKR, USDT crypto) while maintaining real-time inventory updates, high security for digital keys, and sub-second rendering.',
    developmentProcess: [
      '1. Design System & Wireframing: Created a dark luxury component system with high-contrast typography and micro-interactions.',
      '2. Full Stack Architecture: Integrated React 18 frontend with Supabase backend and automated WhatsApp order link generators.',
      '3. Security & Wallet Integration: Built an in-app user wallet system supporting top-ups via Payoneer and Binance Pay ID.',
      '4. SEO & Schema Optimization: Implemented JSON-LD Product and ProfessionalService schemas for top Google indexing.'
    ],
    keyFeatures: [
      'Automated WhatsApp Direct Order Routing with pre-filled service metadata',
      'In-App Digital Wallet with Instant Balance Deduction & Top-Up',
      'Real-Time Live Search across 50+ digital growth and software services',
      'Binance Pay ID & USDT TRC20/BEP20 Payment Verification Modal',
      'Responsive Glassmorphism Navigation Bar with 60fps Scroll Spy'
    ],
    performanceResults: {
      lighthouse: 98,
      loadTime: '0.6s',
      trafficGain: '+220%',
      conversionBoost: '+45%'
    },
    seoImprovements: [
      '100% Mobile Responsive Layout with Zero Cumulative Layout Shift (CLS: 0.00)',
      'Schema.org ProfessionalService & WebSite JSON-LD integration',
      'Optimized WebP images with lazy loading and asset compression',
      'Dynamic OpenGraph & Twitter Card social meta sharing tags'
    ],
    mobileOptimization: 'Engineered with fluid tailwind breakpoints (sm, md, lg, xl), 48px touch targets, mobile search overlay, and slide-out bottom drawer navigation.',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    testimonial: {
      quote: 'Waleed built our digital marketplace with incredible precision. The sub-second load times and WhatsApp direct checkout increased our checkout conversions by over 45% in the first month!',
      clientName: 'Marcus Vance',
      role: 'Founder, Digital Growth Agency',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'ai-content-suite',
    title: 'AI Studio SaaS - Multi-Model Generator',
    description: 'Full stack AI SaaS web app integrating OpenAI GPT-4o, Claude 3.5 Sonnet, and Gemini models with real-time streaming output.',
    category: 'AI Apps',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'TypeScript', 'OpenAI API', 'Gemini SDK', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    metrics: '99.9% Uptime & Sub-200ms Latency',
    overview: 'A multi-provider AI text, code, and image generation workbench designed for content creators, agency writers, and developers requiring high-throughput access to top AI models.',
    clientGoals: 'Deliver a unified interface for OpenAI GPT-4o, Claude, and Gemini with streaming Server-Sent Events (SSE) token output and credit balance management.',
    challenges: 'Managing API key proxies securely on the backend without exposing secret keys while keeping stream latency under 200ms.',
    developmentProcess: [
      '1. API Proxy Architecture: Created Express / Vercel Edge proxy routes enforcing rate-limiting and token usage tracking.',
      '2. Real-time Streaming Frontend: Implemented custom React hooks for consuming Server-Sent Events token streams.',
      '3. Model Fallback Logic: Engineered automatic provider fallback if a primary AI API endpoint encounters rate limits.'
    ],
    keyFeatures: [
      'Multi-model provider dropdown (OpenAI, Claude, Gemini)',
      'Real-time streaming text output with code syntax highlighting',
      'Export prompt history to Markdown, JSON, and PDF formats',
      'Usage metrics dashboard tracking token consumption'
    ],
    performanceResults: {
      lighthouse: 99,
      loadTime: '0.4s',
      trafficGain: '+180%',
      conversionBoost: '+60%'
    },
    seoImprovements: [
      'Server-Side Rendered Next.js page structure with static generation',
      'Comprehensive SoftwareApplication schema markup',
      'Fast First Contentful Paint (FCP) under 300ms'
    ],
    mobileOptimization: 'Fully responsive side drawer for chat history, touch-optimized model selectors, and smooth collapsible options.',
    galleryImages: [
      'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    ],
    testimonial: {
      quote: 'The streaming AI suite is fast, reliable, and secure. Waleed handled the backend security and token optimization flawlessly.',
      clientName: 'Alexandre Dubois',
      role: 'Lead AI Product Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'seo-analytics-dashboard',
    title: 'Real-time SEO & Keyword Rank Tracker',
    description: 'Comprehensive analytics dashboard tracking SERP rankings, organic traffic trends, backlinks, and automated competitor reports.',
    category: 'SEO & Tools',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Recharts', 'Google Search Console API', 'Express'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    metrics: '#1 Rank Optimization Strategy',
    overview: 'An enterprise technical SEO monitoring tool that syncs with Google Search Console API to audit Core Web Vitals, track keyword positions, and alert developers to crawl errors.',
    clientGoals: 'Automate weekly technical SEO reporting and provide real-time chart visualizers for client organic traffic performance.',
    challenges: 'Processing thousands of search query data rows efficiently without freezing the browser main thread during rendering.',
    developmentProcess: [
      '1. Search Console API Integration: Connected OAuth 2.0 authentication flow with backend data aggregation.',
      '2. Recharts Data Visualization: Engineered responsive area, bar, and pie charts for organic click trends.',
      '3. Automated Crawl Alerts: Created background cron tasks to flag sudden ranking drops or broken links.'
    ],
    keyFeatures: [
      'Real-time SERP keyword position tracking across desktop and mobile',
      'Google Core Web Vitals automated audit scanner',
      'Backlink authority profile analyzer',
      'One-click PDF SEO audit report exporter'
    ],
    performanceResults: {
      lighthouse: 96,
      loadTime: '0.8s',
      trafficGain: '+310%',
      conversionBoost: '+50%'
    },
    seoImprovements: [
      'Integrated BreadcrumbList and WebPage schema markup',
      'Targeted low-competition long-tail keywords resulting in #1 SERP placements',
      'Automated sitemap validation and index status monitoring'
    ],
    mobileOptimization: 'Fluid charts that adjust to smartphone screens with touch tooltips and responsive data cards.',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ],
    testimonial: {
      quote: 'Our client sites saw a massive boost in organic traffic after implementing Waleed’s technical SEO architecture and monitoring platform.',
      clientName: 'Sophia Chen',
      role: 'E-Commerce Marketing Director',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'crypto-escrow-bot',
    title: 'Instant Automated Delivery Bot',
    description: 'Automated order delivery and verification system for digital goods with instant account credential delivery and SMS notifications.',
    category: 'Automation & APIs',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Node.js', 'Telegram Bot API', 'Express', 'JWT Auth'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    metrics: 'Instant 2-sec Average Delivery',
    overview: 'An automated dispatch bot designed to verify blockchain transaction hashes (USDT TRC20/BEP20) and issue software licenses or account credentials instantly.',
    clientGoals: 'Automate 24/7 digital product fulfillment to eliminate manual customer wait times.',
    challenges: 'Polling blockchain nodes accurately to prevent double-spending attacks or fake payment confirmations.',
    developmentProcess: [
      '1. Blockchain Tx Verifier: Integrated TronWeb and Web3.js listeners for instant transaction confirmation.',
      '2. Secure Credential Vault: Encrypted digital accounts using AES-256 before automated release.',
      '3. Telegram & Email Dispatcher: Sent instant credentials with PDF invoice receipts.'
    ],
    keyFeatures: [
      'Zero-human interaction automated delivery under 2 seconds',
      'USDT TRC20 and BEP20 blockchain payment listener',
      'Automated stock inventory replenishment alerts',
      'Encrypted digital account credential delivery'
    ],
    performanceResults: {
      lighthouse: 100,
      loadTime: '0.3s',
      trafficGain: '+150%',
      conversionBoost: '+70%'
    },
    seoImprovements: [
      'Clean documentation portal for API developers',
      'Structured technical FAQs for instant resolution'
    ],
    mobileOptimization: 'Designed specifically for seamless operation inside Telegram and mobile web viewports.',
    galleryImages: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
    ],
    testimonial: {
      quote: 'The automated delivery system works flawlessly 24 hours a day. Customers get their digital keys in 2 seconds flat!',
      clientName: 'David Reynolds',
      role: 'Digital Product Reseller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'Digital Agency Director',
    platform: 'Instant Services',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'Waleed delivered my HeyGen Creator subscription and OpenAI API credits instantly! 100% legitimate and super fast communication on WhatsApp. Best digital service provider!',
    rating: 5,
    verifiedPurchase: 'HeyGen Creator + $100 OpenAI API',
    date: 'July 2026'
  },
  {
    id: 'test-2',
    name: 'Sophia Chen',
    role: 'E-Commerce Founder',
    platform: 'Upwork',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    comment: 'Waleed overhauled our entire web application frontend and fixed our Core Web Vitals score from 42 to 98. Our organic traffic increased by 140% in just 3 weeks!',
    rating: 5,
    verifiedPurchase: 'Full Stack Web Dev & SEO Audit',
    date: 'June 2026'
  },
  {
    id: 'test-3',
    name: 'David Reynolds',
    role: 'Content Creator (350K Subs)',
    platform: 'Direct Client',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'Ordered 1,000 YouTube Subscribers and watch time minutes to get my channel monetized. Everything was delivered smoothly without any drops. Highly recommended!',
    rating: 5,
    verifiedPurchase: 'YouTube Monetization Pack',
    date: 'July 2026'
  },
  {
    id: 'test-4',
    name: 'Alexandre Dubois',
    role: 'SaaS Lead Engineer',
    platform: 'Instant Services',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'Bought Aged Instagram Accounts and Microsoft 365 keys for my sales team. Flawless accounts with full email access handed over in less than 10 minutes.',
    rating: 5,
    verifiedPurchase: 'Aged Instagram PVA & MS 365',
    date: 'May 2026'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How do I place an order for Digital Services or Subscriptions?',
    answer: 'Click the "View Details" or "Buy Now" button on any service card. It opens a direct connection to my official WhatsApp or contact form with pre-filled service details. Payment and instant account delivery are handled directly with instant confirmation.'
  },
  {
    question: 'Are the AI subscriptions and accounts fully safe and warranted?',
    answer: 'Yes! All AI subscriptions (HeyGen, Kling AI, Claude Pro, OpenAI API) and aged accounts come with full private access and a 30-day replacement guarantee/warranty.'
  },
  {
    question: 'How fast is the delivery time for digital products?',
    answer: 'Most items like OpenAI API accounts, Hotmail PVA, and instant growth packages are delivered instantly or within 15-60 minutes upon order confirmation.'
  },
  {
    question: 'Can you build custom web applications or implement SEO for my business?',
    answer: 'Absolutely! I am a Senior Full Stack Developer and SEO Specialist. I build custom React/Next.js platforms, API integrations, and perform technical SEO optimizations tailored to your goals.'
  },
  {
    question: 'Where can I edit or modify the service prices?',
    answer: 'All digital service prices, descriptions, and features are cleanly managed inside the single JSON database file at /public/services.json for effortless price updates.'
  }
];
