export interface DetailedServicePageData {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  detailedDescription: string;
  heroStats: { label: string; value: string }[];
  keyFeatures: { title: string; description: string; icon: string }[];
  benefits: { title: string; description: string }[];
  developmentProcess: { step: string; title: string; description: string }[];
  pricingPackages: {
    name: string;
    price: string;
    period?: string;
    popular?: boolean;
    description: string;
    features: string[];
    ctaText: string;
  }[];
  techStack: { name: string; category: string }[];
  faqs: { question: string; answer: string }[];
  relatedServicesSlugs: string[];
}

export const SERVICES_LIST: DetailedServicePageData[] = [
  {
    slug: 'web-development',
    title: 'Web Development Services',
    subtitle: 'Custom High-Performance Web Applications & Enterprise Software',
    icon: 'Code2',
    badge: 'Core Service',
    metaTitle: 'Expert Web Development Services | Custom React, Next.js & Full-Stack Apps',
    metaDescription: 'Hire Waleed Khan Afridi for custom web development. Fast, secure, SEO-optimized web applications built with React, Next.js, Node.js, and modern APIs.',
    shortDescription: 'Custom, high-performance web applications built with React, Next.js, Node.js, and modern cloud architecture for maximum speed and scale.',
    detailedDescription: 'Transform your business with modern, high-speed web engineering. I build custom web applications, SaaS platforms, and enterprise web solutions using cutting-edge technologies like React 19, Next.js, Node.js, TypeScript, and Supabase. Every build is engineered for lightning-fast performance, rock-solid security, WCAG accessibility, and seamless responsive behavior on all devices.',
    heroStats: [
      { label: 'Lighthouse Score', value: '98+' },
      { label: 'Avg. Load Speed', value: '< 1.2s' },
      { label: 'Projects Delivered', value: '140+' },
      { label: 'Client Satisfaction', value: '100%' }
    ],
    keyFeatures: [
      {
        title: 'Custom SPA & SSR Applications',
        description: 'Single-page and server-side rendered web apps crafted with React, Next.js, and Vite for near-instant page transitions.',
        icon: 'Layout'
      },
      {
        title: 'API & Microservices Architecture',
        description: 'RESTful and GraphQL backend APIs built with Node.js, Express, and Supabase for real-time data sync.',
        icon: 'Server'
      },
      {
        title: 'High-Converting Responsive Design',
        description: 'Tailwind CSS layouts optimized for desktop, tablet, and mobile with pixel-perfect visual fidelity.',
        icon: 'Smartphone'
      },
      {
        title: 'Built-in Technical SEO & Analytics',
        description: 'Schema structured data, semantic HTML5, XML sitemaps, and automated speed optimizations built into the codebase.',
        icon: 'Search'
      }
    ],
    benefits: [
      {
        title: 'Unmatched Page Load Speeds',
        description: 'Sub-second rendering keeps visitors engaged and significantly reduces bounce rates on Google Search.'
      },
      {
        title: 'Scalable Future-Proof Codebase',
        description: 'Clean, modular TypeScript code with strict linting ensures effortless future expansion and team collaboration.'
      },
      {
        title: 'Enterprise Security Standards',
        description: 'Protected against XSS, CSRF, and SQL injections with SSL encryption, row-level security, and rate limiting.'
      },
      {
        title: 'Full Source Code Ownership',
        description: 'Complete handover of GitHub repositories, deployment documentation, and zero vendor lock-in.'
      }
    ],
    developmentProcess: [
      { step: '01', title: 'Discovery & Scope Alignment', description: 'Detailed consultation to map technical requirements, user stories, architecture diagrams, and milestones.' },
      { step: '02', title: 'Architecture & UI/UX Design', description: 'Wireframing, database schema design, and interactive Figma UI mockups tailored to your brand identity.' },
      { step: '03', title: 'Agile Frontend & Backend Build', description: 'Clean TypeScript component engineering, API route integrations, and test-driven development iterations.' },
      { step: '04', title: 'Quality Assurance & Speed Audit', description: 'Cross-browser testing, mobile responsiveness checks, security audits, and Lighthouse 95+ score optimization.' },
      { step: '05', title: 'Live Deployment & Support', description: 'Zero-downtime deployment to Vercel/Cloud Run, domain DNS configuration, and 30-day post-launch warranty.' }
    ],
    pricingPackages: [
      {
        name: 'Starter Web App',
        price: '$499',
        description: 'Ideal for startups, landing pages, or small business web presence.',
        features: [
          'Up to 5 Custom Pages / Views',
          'React 19 + Vite + Tailwind CSS',
          'Responsive Mobile Layouts',
          'Basic Contact Form & Email Integration',
          'Basic On-Page SEO Setup',
          '14 Days Free Technical Support'
        ],
        ctaText: 'Start Web Project'
      },
      {
        name: 'Full-Stack SaaS / Portal',
        price: '$1,299',
        popular: true,
        description: 'Complete custom web application with database and auth capabilities.',
        features: [
          'Unlimited Custom Dynamic Views',
          'Next.js / React + Node.js Backend',
          'Database Integration (Supabase / Postgres)',
          'User Auth (OAuth, Email Magic Link)',
          'Payment Gateway Integration (Stripe / Paypal)',
          'Advanced Technical SEO & Schema Markup',
          '30 Days Warranty & Technical Support'
        ],
        ctaText: 'Get Custom Quote'
      },
      {
        name: 'Enterprise Web Application',
        price: '$2,499+',
        description: 'Complex multi-tenant platforms, custom API integrations, and scalable cloud setups.',
        features: [
          'Full Custom Architecture & Microservices',
          'Real-Time WebSockets & Dashboard Analytics',
          'Custom Admin Control Panel',
          'Third-Party API & CRM Pipeline Sync',
          'Dedicated CI/CD Deployment Pipeline',
          '60 Days Dedicated Development Support'
        ],
        ctaText: 'Book Architecture Call'
      }
    ],
    techStack: [
      { name: 'React 19', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Node.js / Express', category: 'Backend' },
      { name: 'Supabase / PostgreSQL', category: 'Database' },
      { name: 'Vite', category: 'Tooling' },
      { name: 'Vercel / Cloud Run', category: 'DevOps' }
    ],
    faqs: [
      {
        question: 'How long does a custom web development project take?',
        answer: 'Standard landing pages and company websites take 3 to 7 business days. Complex full-stack applications with databases and user authentication typically take 2 to 4 weeks depending on the project scope.'
      },
      {
        question: 'Will my web application be mobile-friendly and fast?',
        answer: 'Yes! All web builds are mobile-first responsive and audited for high Lighthouse scores (95+), ensuring sub-second load speeds on mobile networks.'
      },
      {
        question: 'Do I get the full source code after completion?',
        answer: 'Absolutely. Upon project sign-off and final payment, you receive complete intellectual property rights and full source code access via GitHub.'
      }
    ],
    relatedServicesSlugs: ['ui-ux-design', 'ecommerce-development', 'seo', 'website-maintenance']
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    subtitle: 'Cross-Platform iOS & Android Applications Built for Speed & Engagement',
    icon: 'Smartphone',
    badge: 'High Demand',
    metaTitle: 'Professional Mobile App Development | iOS & Android React Native Solutions',
    metaDescription: 'Custom cross-platform mobile application development for iOS and Android by Waleed Khan Afridi. Built with React Native, PWA technology, and cloud backends.',
    shortDescription: 'Native and cross-platform mobile applications for iOS & Android built with React Native, WebAPKs, and cloud backends.',
    detailedDescription: 'Reach your users on any device with custom mobile applications engineered for fluid 60fps animations, native platform feel, offline support, and push notifications. I specialize in cross-platform React Native development and Progressive Web Apps (PWAs/WebAPKs) that cut development costs by 50% while delivering true native performance on both Apple App Store and Google Play Store.',
    heroStats: [
      { label: 'Platform Coverage', value: 'iOS & Android' },
      { label: 'App Performance', value: '60 FPS' },
      { label: 'Codebase Share', value: '95%' },
      { label: 'App Store Rate', value: '100% Approval' }
    ],
    keyFeatures: [
      {
        title: 'Cross-Platform React Native',
        description: 'Single codebase powering both iOS and Android apps with native UI components and camera/location integrations.',
        icon: 'Smartphone'
      },
      {
        title: 'PWA & WebAPK Conversion',
        description: 'Convert web apps into installable mobile applications with offline caching, home screen icons, and push notifications.',
        icon: 'Zap'
      },
      {
        title: 'Real-Time Sync & Offline Storage',
        description: 'Local sqlite/IndexedDB persistence allowing continuous functionality even without an active internet connection.',
        icon: 'Database'
      },
      {
        title: 'App Store & Play Store Publishing',
        description: 'End-to-end management of app submission, signing credentials, screenshots, and store optimization guidelines.',
        icon: 'Award'
      }
    ],
    benefits: [
      {
        title: '50% Faster Time to Market',
        description: 'Writing shared cross-platform logic means launching on both iOS and Android simultaneously without double development fees.'
      },
      {
        title: 'Native Device Capabilities',
        description: 'Full access to camera, GPS, biometric auth (FaceID/Fingerprint), push notifications, and bluetooth.'
      },
      {
        title: 'Seamless Cloud Backend Integration',
        description: 'Connected directly to Supabase, Firebase, or custom GraphQL/REST APIs for user authentication and live chat.'
      },
      {
        title: 'Smooth 60 FPS User Experience',
        description: 'Optimized touch gestures and hardware-accelerated animations for intuitive mobile interaction.'
      }
    ],
    developmentProcess: [
      { step: '01', title: 'App Discovery & Wireframing', description: 'Defining target platform specs, app navigation flows, and user journey wireframes.' },
      { step: '02', title: 'Mobile UI/UX Prototyping', description: 'Figma interactive mobile prototypes adhering to Apple Human Interface and Google Material Guidelines.' },
      { step: '03', title: 'React Native & API Engineering', description: 'Building modular native bridges, state management engines, and offline data sync layers.' },
      { step: '04', title: 'Device Testing & Performance Tuning', description: 'Testing across multiple physical iOS & Android devices, screen ratios, and network conditions.' },
      { step: '05', title: 'Store Deployment & Launch', description: 'Publishing app bundles to Apple App Store & Google Play Store with promotional graphics.' }
    ],
    pricingPackages: [
      {
        name: 'PWA / WebAPK Starter',
        price: '$599',
        description: 'Convert existing website into an installable mobile app with push notifications.',
        features: [
          'Installable Progressive Web App (PWA)',
          'Android WebAPK Package (.apk / .aab)',
          'Custom App Icon & Splash Screen',
          'Offline Content Caching',
          'Push Notifications Setup',
          'Play Store Submission Guidance'
        ],
        ctaText: 'Convert Web to App'
      },
      {
        name: 'React Native Cross-Platform App',
        price: '$1,699',
        popular: true,
        description: 'Complete custom mobile app for both iOS & Android with backend integration.',
        features: [
          'Custom Native iOS & Android Build',
          'Up to 8 Key App Screens',
          'Supabase / Firebase Backend & Auth',
          'Push Notifications & In-App Alerts',
          'Payment Gateway Integration (Stripe / In-App)',
          'Full App Store & Play Store Publishing Support',
          '30 Days Free Maintenance'
        ],
        ctaText: 'Build Mobile App'
      },
      {
        name: 'Enterprise Mobile Solution',
        price: '$3,299+',
        description: 'Complex multi-feature mobile ecosystems, real-time tracking, or chat platforms.',
        features: [
          'Full Custom Native Features & Sensors',
          'Real-time GPS / Messaging Infrastructure',
          'Custom Web Admin Panel for App Owners',
          'Biometric Security & Offline Data Encryption',
          'Dedicated CI/CD Build Pipelines',
          '60 Days Dedicated Technical Support'
        ],
        ctaText: 'Discuss Mobile Scope'
      }
    ],
    techStack: [
      { name: 'React Native', category: 'Framework' },
      { name: 'Expo', category: 'Tooling' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Supabase / Firebase', category: 'Backend' },
      { name: 'Redux / Zustand', category: 'State' },
      { name: 'Apple TestFlight', category: 'Testing' },
      { name: 'Google Play Console', category: 'Deployment' }
    ],
    faqs: [
      {
        question: 'Do you develop for both iPhone (iOS) and Android?',
        answer: 'Yes! Using React Native or PWA technology, we build applications that run smoothly on both iOS devices and Android phones/tablets.'
      },
      {
        question: 'Will you help publish my app to the Apple App Store and Google Play Store?',
        answer: 'Yes, full store submission services are included in our mobile development packages, ensuring your app meets all guidelines and passes review.'
      },
      {
        question: 'Can I send push notifications to my mobile app users?',
        answer: 'Absolutely. We integrate Firebase Cloud Messaging (FCM) or OneSignal so you can trigger real-time push notifications to your user base.'
      }
    ],
    relatedServicesSlugs: ['web-development', 'ui-ux-design', 'ai-automation', 'website-maintenance']
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    subtitle: 'Human-Centered Digital Product Design That Boosts Conversion & Retention',
    icon: 'Palette',
    badge: 'Design Excellence',
    metaTitle: 'UI/UX Design Services | Figma Prototypes, Wireframing & Design Systems',
    metaDescription: 'User interface and user experience design services by Waleed Khan Afridi. High-converting Figma designs, visual branding, wireframes, and design systems.',
    shortDescription: 'Conversion-focused user interface design, interactive Figma wireframing, design systems, and user experience research.',
    detailedDescription: 'Great software starts with exceptional design. I create intuitive, visually striking UI/UX designs that simplify complex workflows and convert visitors into active customers. From user journey mapping and low-fidelity wireframes to high-fidelity Figma prototypes and design tokens, every screen is thoughtfully crafted to elevate your brand presence.',
    heroStats: [
      { label: 'Conversion Boost', value: '35%+' },
      { label: 'User Rating', value: '4.9/5' },
      { label: 'Figma Assets', value: '1,000+' },
      { label: 'Design Precision', value: 'Pixel Perfect' }
    ],
    keyFeatures: [
      {
        title: 'Conversion-Driven Interface Design',
        description: 'Clean layouts tailored with mathematical typographic hierarchies, precise contrast ratios, and psychological CTA placements.',
        icon: 'Sparkles'
      },
      {
        title: 'Interactive Figma Prototypes',
        description: 'Clickable prototypes that mirror real software interaction so stakeholders can test user flows before writing code.',
        icon: 'Layout'
      },
      {
        title: 'Scalable UI Design Systems',
        description: 'Design component libraries with reusable typography styles, color palettes, spacing tokens, and dark mode variants.',
        icon: 'CheckCircle2'
      },
      {
        title: 'Mobile & Desktop Responsive Mapping',
        description: 'Ensuring seamless usability across widescreen monitors, laptops, tablets, and mobile smartphones.',
        icon: 'Smartphone'
      }
    ],
    benefits: [
      {
        title: 'Higher User Retention & Engagement',
        description: 'Intuitive navigation eliminates user friction and keeps visitors exploring your application longer.'
      },
      {
        title: 'Reduced Frontend Engineering Costs',
        description: 'Detailed Figma design specs and handovers allow developers to build 40% faster without design guesswork.'
      },
      {
        title: 'Stronger Brand Credibility',
        description: 'Modern visual design instills immediate trust and positions your business as an industry authority.'
      },
      {
        title: 'WCAG Accessibility Compliance',
        description: 'Accessible color choices and touch target sizing ensure inclusive experiences for all users.'
      }
    ],
    developmentProcess: [
      { step: '01', title: 'User Research & Competitor Audit', description: 'Analyzing audience behavior, industry design benchmarks, and conversion opportunities.' },
      { step: '02', title: 'Information Architecture & Wireframes', description: 'Mapping page structures and user flow diagrams to validate layout logic.' },
      { step: '03', title: 'High-Fidelity Visual Design', description: 'Crafting pixel-perfect screens in Figma with bespoke visual assets, typography, and icons.' },
      { step: '04', title: 'Interactive Prototype & Usability Testing', description: 'Building clickable prototypes and collecting feedback to refine micro-interactions.' },
      { step: '05', title: 'Developer Handover & Design System', description: 'Delivering organized Figma files with CSS inspect tokens, asset exports, and developer specs.' }
    ],
    pricingPackages: [
      {
        name: 'Landing Page UI Design',
        price: '$299',
        description: 'High-converting single-page UI design for startups or product launches.',
        features: [
          'Full High-Fidelity Figma Landing Page Design',
          'Desktop & Mobile Responsive Layouts',
          'Interactive Prototype Link',
          'Custom Visual Assets & Iconography',
          '2 Rounds of Revisions',
          'Full Figma Source File Ownership'
        ],
        ctaText: 'Design Landing Page'
      },
      {
        name: 'Complete Web / App UI UX',
        price: '$799',
        popular: true,
        description: 'Full product interface design for web apps, SaaS, or mobile platforms.',
        features: [
          'Up to 10 Custom Unique Screen Layouts',
          'Complete User Flow & Wireframing',
          'Interactive Clickable Figma Prototype',
          'Reusable Design System (Components, Colors, Fonts)',
          'Dark & Light Mode Variants',
          'Developer Export Specs & Asset Package',
          'Unlimited Minor Revisions'
        ],
        ctaText: 'Start Product Design'
      },
      {
        name: 'Enterprise Design System',
        price: '$1,499+',
        description: 'Full-scale design system, multi-platform UI kit, and design token library.',
        features: [
          '30+ Custom Screen Layouts & Modals',
          'Complete Figma Design Token System',
          'UX Research Report & Competitor Benchmarking',
          'Tailwind CSS Config & Token Export',
          'Design System Documentation Site',
          'Dedicated UX Consultation Sessions'
        ],
        ctaText: 'Request Design System'
      }
    ],
    techStack: [
      { name: 'Figma', category: 'Design Engine' },
      { name: 'FigJam', category: 'Wireframing' },
      { name: 'Adobe Illustrator', category: 'Vector Assets' },
      { name: 'Tailwind CSS Tokens', category: 'Design System' },
      { name: 'Lottie Animations', category: 'Micro-Interactions' }
    ],
    faqs: [
      {
        question: 'What file formats will I receive upon completion?',
        answer: 'You will receive full edit permissions for your Figma master project files, along with exported vector assets (SVG, PNG, WebP) and CSS color/typography tokens.'
      },
      {
        question: 'Can you code the design into React or Tailwind CSS after designing?',
        answer: 'Yes! As a full-stack engineer and designer, I can seamlessly transition your approved Figma design straight into clean React / Next.js code.'
      },
      {
        question: 'How many revisions are included in UI/UX projects?',
        answer: 'All projects include iterative review checkpoints during wireframing and high-fidelity stages to ensure the final design matches your exact vision.'
      }
    ],
    relatedServicesSlugs: ['web-development', 'mobile-app-development', 'ecommerce-development']
  },
  {
    slug: 'seo',
    title: 'Technical SEO & Organic Growth',
    subtitle: 'Programmatic Technical Audits, Core Web Vitals & Search Engine Dominance',
    icon: 'Search',
    badge: 'Growth Driven',
    metaTitle: 'Technical SEO Services | Speed Optimization, Core Web Vitals & Schema Markup',
    metaDescription: 'Boost search rankings with technical SEO audits, Core Web Vitals speed optimization, programmatic schema data, and organic traffic growth by Waleed Khan Afridi.',
    shortDescription: 'Core Web Vitals optimization, programmatic SEO, schema structured data, speed audits, and search ranking growth strategies.',
    detailedDescription: 'Dominating search engine results requires more than basic keywords. I deliver engineering-level Technical SEO audits and code optimizations that guarantee 90+ Google Lighthouse scores, fast Core Web Vitals (LCP, CLS, INP), Schema.org JSON-LD structured data, and clean XML sitemaps. Get discovered by thousands of high-intent organic visitors every month.',
    heroStats: [
      { label: 'Organic Traffic Boost', value: '+240%' },
      { label: 'Lighthouse Speed', value: '95 - 100' },
      { label: 'Google Index Rate', value: '100%' },
      { label: 'Schema Coverage', value: 'Full Coverage' }
    ],
    keyFeatures: [
      {
        title: 'Core Web Vitals & Page Speed Tuning',
        description: 'Eliminating render-blocking JS, compressing media assets, and implementing browser caching for sub-second speeds.',
        icon: 'Zap'
      },
      {
        title: 'JSON-LD Schema Structured Data',
        description: 'Injecting custom rich snippets (Organization, Product, FAQ, Article, Service) for rich search engine card displays.',
        icon: 'Code2'
      },
      {
        title: 'Comprehensive Technical SEO Audit',
        description: 'Identifying and resolving crawl errors, broken links, canonical tag mismatches, and indexability bottlenecks.',
        icon: 'CheckCircle2'
      },
      {
        title: 'Semantic HTML5 & Accessibility Audit',
        description: 'Optimizing heading hierarchies (H1-H6), ARIA roles, image alt attributes, and mobile viewport accessibility.',
        icon: 'Layout'
      }
    ],
    benefits: [
      {
        title: 'Higher Google Search Rankings',
        description: 'Meeting Google page experience guidelines boosts keyword positioning for competitive industry terms.'
      },
      {
        title: 'Instant Indexing & Crawl Budget Efficiency',
        description: 'Clean XML sitemaps and proper canonical configuration ensure search bots crawl your most valuable pages first.'
      },
      {
        title: 'Rich Search Result Snippets',
        description: 'Structured data triggers star ratings, price tags, and FAQ toggles right inside Google Search results.'
      },
      {
        title: 'Sustainable Long-Term Organic Leads',
        description: 'Organic search traffic provides a continuous stream of zero-ad-spend lead generation.'
      }
    ],
    developmentProcess: [
      { step: '01', title: 'Technical Site Audit & Benchmarking', description: 'In-depth analysis using Google Search Console, Ahrefs, and Lighthouse performance profiling.' },
      { step: '02', title: 'On-Page & Codebase Optimization', description: 'Refactoring HTML structure, meta tags, heading tags, canonical URLs, and image lazy loading.' },
      { step: '03', title: 'Schema Structured Data Implementation', description: 'Creating and validating JSON-LD schemas tailored to your business model and service offerings.' },
      { step: '04', title: 'Core Web Vitals & Speed Overhaul', description: 'Minifying assets, optimizing server response times (TTFB), and eliminating layout shifts (CLS).' },
      { step: '05', title: 'Re-indexing & Ranking Tracking', description: 'Submitting updated sitemaps to Google Search Console and monitoring keyword ranking growth.' }
    ],
    pricingPackages: [
      {
        name: 'Technical SEO & Speed Audit',
        price: '$199',
        description: 'One-time complete technical SEO inspection and code optimization report.',
        features: [
          'Full Site Technical Audit & Crawl Error Fixes',
          'Google Lighthouse Speed Optimization Pass',
          'Core Web Vitals Diagnostic & Guidance',
          'Basic Schema.org JSON-LD Markup',
          'Robots.txt & XML Sitemap Optimization',
          'Actionable SEO Checklist PDF'
        ],
        ctaText: 'Run SEO Audit'
      },
      {
        name: 'Full Technical SEO Overhaul',
        price: '$499',
        popular: true,
        description: 'Complete hands-on code refactoring for top speed and search engine dominance.',
        features: [
          'Hands-on Codebase Refactoring for Speed (90+ Score)',
          'Complete Schema.org Structured Data Suite',
          'OpenGraph & Twitter Card Social Optimization',
          'Internal Linking Strategy & Canonical Audit',
          'Google Search Console Setup & Penalty Clearance',
          '30-Day Ranking & Crawl Monitoring Report'
        ],
        ctaText: 'Boost SEO Rankings'
      },
      {
        name: 'Growth & Programmatic SEO',
        price: '$999+',
        description: 'Programmatic SEO architecture for multi-location or large data sites.',
        features: [
          'Automated Programmatic Page Generation Setup',
          'Advanced Keyword & Search Intent Mapping',
          'Competitor Backlink & Content Gap Strategy',
          'Custom Analytics & Conversion Tracking Funnels',
          'Monthly Ranking Audits & Optimization Tweaks'
        ],
        ctaText: 'Scale Organic Growth'
      }
    ],
    techStack: [
      { name: 'Google Search Console', category: 'Search Engine' },
      { name: 'Google Analytics 4', category: 'Analytics' },
      { name: 'Lighthouse / PageSpeed', category: 'Audit' },
      { name: 'Schema.org JSON-LD', category: 'Structured Data' },
      { name: 'Ahrefs / SEMrush', category: 'Keyword Intelligence' }
    ],
    faqs: [
      {
        question: 'How fast will I see SEO results after optimizations?',
        answer: 'Page speed and technical crawl improvements are visible immediately. Google ranking adjustments typically show measurable growth within 2 to 6 weeks as search bots re-index the updated code.'
      },
      {
        question: 'Do you fix Google Search Console errors and indexation issues?',
        answer: 'Yes! We resolve coverage errors, soft 404s, mobile usability warnings, and sitemap indexing issues directly in your Search Console.'
      },
      {
        question: 'Can you guarantee 90+ Lighthouse speed scores?',
        answer: 'Yes, for modern web stacks (React, Next.js, static/SSR sites), we optimize images, scripts, and fonts to consistently reach 90+ to 100 performance scores.'
      }
    ],
    relatedServicesSlugs: ['web-development', 'ecommerce-development', 'website-maintenance']
  },
  {
    slug: 'ecommerce-development',
    title: 'E-Commerce Development',
    subtitle: 'High-Converting Digital Stores, Instant Checkout & Custom Cart Engines',
    icon: 'ShoppingBag',
    badge: 'Sales Focused',
    metaTitle: 'Custom E-Commerce Development | WooCommerce, Shopify & React Online Stores',
    metaDescription: 'Scale online sales with custom e-commerce web applications, WooCommerce, Shopify builds, and multi-currency payment gateway integrations by Waleed Khan Afridi.',
    shortDescription: 'Scalable online stores, custom cart engines, payment gateway integrations (Stripe, Crypto, Binance Pay), and instant checkout flows.',
    detailedDescription: 'Turn store visitors into loyal buying customers. I engineer custom e-commerce web applications, WooCommerce powerhouses, and headless Shopify storefronts. Featuring lightning-fast product filtering, multi-currency wallet support, automated inventory management, and frictionless single-step checkout flows tailored for maximum conversion rates.',
    heroStats: [
      { label: 'Checkout Conversion', value: '+45%' },
      { label: 'Cart Speed', value: '< 0.8s' },
      { label: 'Payment Methods', value: 'Card, Crypto, Wallets' },
      { label: 'Store Security', value: 'PCI-DSS Compliant' }
    ],
    keyFeatures: [
      {
        title: 'Frictionless One-Page Checkout',
        description: 'Optimized checkout flows with auto-address lookup, instant coupon codes, and zero unnecessary input fields.',
        icon: 'ShoppingBag'
      },
      {
        title: 'Multi-Gateway Payment Integration',
        description: 'Seamless checkout via Credit Cards (Stripe), Payoneer, Crypto (Binance Pay, USDT), and local wallets.',
        icon: 'CreditCard'
      },
      {
        title: 'Instant Product Filtering & Search',
        description: 'Instant client-side catalog filtering by category, price, rating, and tags without page reloads.',
        icon: 'Search'
      },
      {
        title: 'Automated Digital Fulfillment & Email',
        description: 'Automated order delivery via email notifications, digital license vaults, and instant receipt generation.',
        icon: 'Zap'
      }
    ],
    benefits: [
      {
        title: 'Significantly Higher Sales Conversions',
        description: 'Eliminating checkout friction converts higher percentages of mobile and desktop traffic into paid orders.'
      },
      {
        title: 'Global Payment Flexibility',
        description: 'Accepting traditional card payments alongside crypto and regional payment methods unlocks international buyers.'
      },
      {
        title: 'Automated Order & Inventory Sync',
        description: 'Reduce manual admin work with self-updating stock counts, automated invoices, and tracking links.'
      },
      {
        title: 'Mobile-Optimized Shopping Experience',
        description: 'Over 70% of online shopping happens on phones; our stores provide thumb-friendly mobile cart navigation.'
      }
    ],
    developmentProcess: [
      { step: '01', title: 'Catalog & Business Model Planning', description: 'Mapping product structure, variation types, shipping zones, and tax rules.' },
      { step: '02', title: 'Store UX & Checkout Design', description: 'Designing high-converting product detail pages, cart drawers, and payment modals.' },
      { step: '03', title: 'Frontend Storefront & Payment Build', description: 'Engineering fast product catalogs, shopping cart state management, and gateway integrations.' },
      { step: '04', title: 'Security & Payment Gateway Testing', description: 'Testing sandbox transactions, SSL encryption, webhooks, and automated email dispatches.' },
      { step: '05', title: 'Store Launch & Training', description: 'Transferring store ownership, configuring live payment keys, and providing order management walkthroughs.' }
    ],
    pricingPackages: [
      {
        name: 'Starter E-Commerce Store',
        price: '$699',
        description: 'Perfect for small product catalogs or single-product digital launches.',
        features: [
          'Up to 25 Product Listings Uploaded',
          'WooCommerce or Custom React Storefront',
          'Stripe / PayPal Payment Integration',
          'Mobile Responsive Shopping Cart',
          'Automated Email Receipts & Order Notifications',
          '14 Days Support & Guidance'
        ],
        ctaText: 'Build Online Store'
      },
      {
        name: 'Custom High-Converting Store',
        price: '$1,499',
        popular: true,
        description: 'Scalable custom e-commerce solution with multi-payment & instant checkout.',
        features: [
          'Unlimited Products & Category Management',
          'Custom Headless React / Next.js Storefront',
          'Multi-Payment Gateways (Card, Crypto, Binance Pay)',
          'Slide-Out Cart Drawer & Coupon Engine',
          'Digital Download Vault / Account Management',
          'Advanced Product Filter & Live Search',
          '30 Days Free Technical Support'
        ],
        ctaText: 'Launch Custom Store'
      },
      {
        name: 'Enterprise Multi-Vendor Platform',
        price: '$2,999+',
        description: 'Multi-vendor marketplace, subscription box engine, or custom ERP integration.',
        features: [
          'Multi-Vendor Seller Portals & Commission Splitting',
          'Recurring Subscription Billing Integration',
          'Custom Inventory API & ERP Synchronization',
          'Multi-Currency & Automatic Tax Engine',
          '60 Days Dedicated Development Support'
        ],
        ctaText: 'Book E-Commerce Call'
      }
    ],
    techStack: [
      { name: 'React / Next.js', category: 'Frontend' },
      { name: 'WooCommerce', category: 'E-Commerce Backend' },
      { name: 'Shopify API', category: 'Headless Platform' },
      { name: 'Stripe API', category: 'Payment Gateway' },
      { name: 'Binance Pay / Crypto', category: 'Web3 Payments' },
      { name: 'Supabase / PostgreSQL', category: 'Database' }
    ],
    faqs: [
      {
        question: 'Can I sell digital downloadable products as well as physical goods?',
        answer: 'Yes! Our e-commerce stores support digital products (software keys, PDFs, licenses) with instant automated delivery, as well as physical goods with shipping calculators.'
      },
      {
        question: 'Which payment gateways can be integrated?',
        answer: 'We integrate Stripe, PayPal, Payoneer, Credit/Debit Cards, Binance Pay, USDT Crypto payments, and custom manual payment instructions.'
      },
      {
        question: 'Will I be able to easily add new products myself?',
        answer: 'Yes! You will receive an intuitive admin dashboard where you can easily add products, adjust prices, edit descriptions, and manage order statuses with zero coding.'
      }
    ],
    relatedServicesSlugs: ['web-development', 'ui-ux-design', 'seo', 'ai-automation']
  },
  {
    slug: 'ai-automation',
    title: 'AI & Workflow Automation',
    subtitle: 'Custom LLM Integrations, AI Agents & Intelligent Business Pipelines',
    icon: 'Cpu',
    badge: 'Cutting Edge',
    metaTitle: 'Custom AI & Workflow Automation Services | Gemini API, OpenAI & Agents',
    metaDescription: 'Supercharge productivity with custom AI agents, LLM integrations (Gemini, ChatGPT), automated customer support bots, and workflow pipelines by Waleed Khan Afridi.',
    shortDescription: 'Integration of LLMs (Gemini API, OpenAI), custom AI agents, automated backend pipelines, and intelligent CRM bots.',
    detailedDescription: 'Automate repetitive tasks and unlock intelligent AI features inside your web applications. I build custom AI integrations using Gemini 1.5/2.0 API, OpenAI, Claude, and LangChain. From real-time customer support chatbots and automated content generators to intelligent document parsers and automated leads workflows, bring cutting-edge AI capabilities directly to your business.',
    heroStats: [
      { label: 'Time Saved', value: '70%+' },
      { label: 'AI Response Speed', value: '< 1s' },
      { label: 'LLM Engines', value: 'Gemini, OpenAI' },
      { label: 'Automation Uptime', value: '99.9%' }
    ],
    keyFeatures: [
      {
        title: 'Custom AI Chatbots & Support Assistants',
        description: 'Trained on your business knowledge base for 24/7 intelligent customer response and instant lead capture.',
        icon: 'MessageSquare'
      },
      {
        title: 'Automated Content & Document Processing',
        description: 'Extracting data from PDFs, summarizing articles, and auto-generating personalized email responses.',
        icon: 'Code2'
      },
      {
        title: 'AI-Powered Search & Recommendations',
        description: 'Semantic vector search and personalized AI recommendation engines for e-commerce and SaaS platforms.',
        icon: 'Search'
      },
      {
        title: 'API Pipeline & Webhook Automation',
        description: 'Connecting web forms, CRMs, WhatsApp notifications, and payment alerts into hands-free automated flows.',
        icon: 'Zap'
      }
    ],
    benefits: [
      {
        title: 'Slash Operational Overhead',
        description: 'Automating customer support and data entry saves dozens of manual working hours every week.'
      },
      {
        title: 'Instant 24/7 Customer Engagement',
        description: 'AI bots answer client queries in milliseconds, leading to higher lead conversion rates.'
      },
      {
        title: 'Competitive AI Feature Edge',
        description: 'Adding smart AI capabilities to your web app positions your product ahead of traditional competitors.'
      },
      {
        title: 'Secure & Private API Setup',
        description: 'Server-side API proxy routing guarantees your proprietary data and API keys remain completely safe.'
      }
    ],
    developmentProcess: [
      { step: '01', title: 'Workflow Audit & AI Opportunity Mapping', description: 'Analyzing business bottlenecks and identifying high-impact AI automation touchpoints.' },
      { step: '02', title: 'Prompt Engineering & Agent Design', description: 'Crafting system prompts, temperature controls, and vector retrieval pipelines.' },
      { step: '03', title: 'Backend Integration & Webhook Wiring', description: 'Building secure server-side API proxies connecting LLM services with your existing app.' },
      { step: '04', title: 'Accuracy Tuning & Guardrail Testing', description: 'Fine-tuning response accuracy, hallucination prevention, and fallback mechanisms.' },
      { step: '05', title: 'Deployment & Live Monitoring', description: 'Deploying automated pipelines with real-time log monitoring and usage analytics.' }
    ],
    pricingPackages: [
      {
        name: 'AI Chatbot Integration',
        price: '$399',
        description: 'Integrate a custom AI assistant trained on your website data or FAQs.',
        features: [
          'Custom Gemini / OpenAI AI Chatbot Modal',
          'Trained on Your Website Knowledge Base',
          'Server-Side API Key Encryption Proxy',
          'Lead Capture & WhatsApp Notification Sync',
          '14 Days Tuning & Support'
        ],
        ctaText: 'Add AI Chatbot'
      },
      {
        name: 'Full AI App Feature Build',
        price: '$999',
        popular: true,
        description: 'Embed smart generative text, image, or search AI features directly into your app.',
        features: [
          'Custom Generative AI Tools (Text, Image, Data Analysis)',
          'Streaming AI Responses with Modern UI',
          'User Token / Quota Usage Tracking System',
          'Multi-Model Fallback Logic (Gemini 2.0 / OpenAI)',
          'Full Webhook & CRM Workflow Automation',
          '30 Days Free Technical Support'
        ],
        ctaText: 'Build AI Solution'
      },
      {
        name: 'Enterprise AI Agent Pipeline',
        price: '$2,199+',
        description: 'Complex multi-agent AI ecosystems, document indexing, and enterprise workflow engines.',
        features: [
          'Multi-Agent Collaborative AI Workflows',
          'Vector Database (Pinecone / Supabase Vector) Setup',
          'Automated Document & PDF Parsing Pipelines',
          'Custom fine-tuning & RAG Architecture',
          '60 Days Dedicated Development Support'
        ],
        ctaText: 'Consult AI Architect'
      }
    ],
    techStack: [
      { name: 'Google Gemini API', category: 'AI Model' },
      { name: 'OpenAI GPT-4o', category: 'AI Model' },
      { name: 'Node.js Express', category: 'Server Proxy' },
      { name: 'Supabase Vector', category: 'Vector Store' },
      { name: 'LangChain', category: 'Agent Framework' },
      { name: 'Make / Zapier', category: 'Webhook Automation' }
    ],
    faqs: [
      {
        question: 'Will my secret API keys be safe?',
        answer: 'Yes! All AI API calls are proxied through secure server-side endpoints, ensuring your secret keys are never exposed to browser client code.'
      },
      {
        question: 'Can the AI chatbot learn about my specific services and pricing?',
        answer: 'Yes! We feed your exact service details, pricing tiers, and company guidelines into system context prompts or RAG databases so responses are 100% accurate.'
      },
      {
        question: 'Which AI models do you recommend?',
        answer: 'We recommend Google Gemini 2.0 Flash / Pro for high-speed, cost-effective multimodal tasks, and OpenAI GPT-4o for specialized reasoning.'
      }
    ],
    relatedServicesSlugs: ['web-development', 'mobile-app-development', 'ecommerce-development']
  },
  {
    slug: 'website-maintenance',
    title: 'Website Maintenance & Support',
    subtitle: 'Proactive 24/7 Monitoring, Security Patching & Dedicated Developer Hours',
    icon: 'Shield',
    badge: 'Peace of Mind',
    metaTitle: 'Website Maintenance & Technical Support Services | 24/7 Security & Backups',
    metaDescription: 'Keep your website fast, secure, and updated with monthly maintenance plans, 24/7 uptime monitoring, security updates, and dedicated developer hours by Waleed Khan Afridi.',
    shortDescription: '24/7 uptime monitoring, security patching, core updates, speed audits, and dedicated monthly developer hours for worry-free operation.',
    detailedDescription: 'Keep your web application running flawlessly without lifting a finger. My Website Maintenance & Technical Support plans provide 24/7 uptime monitoring, daily automated cloud backups, security vulnerability patching, third-party plugin/package updates, and dedicated developer hours for quick content updates and bug fixes.',
    heroStats: [
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Avg. Response Time', value: '< 15 Mins' },
      { label: 'Backup Frequency', value: 'Daily Cloud' },
      { label: 'Security Status', value: 'Zero Breach' }
    ],
    keyFeatures: [
      {
        title: '24/7 Automated Uptime Monitoring',
        description: 'Instant SMS & WhatsApp alerts triggered if your website experiences any server downtime or outage.',
        icon: 'Shield'
      },
      {
        title: 'Daily Automated Cloud Backups',
        description: 'Secure off-site backups of your website code and database, enabling instant 1-click disaster recovery.',
        icon: 'Database'
      },
      {
        title: 'Security Audits & Malware Cleanup',
        description: 'Continuous firewall monitoring, SSL certification management, and vulnerability patching.',
        icon: 'Lock'
      },
      {
        title: 'Dedicated Monthly Developer Hours',
        description: 'Use your monthly hours for custom code tweaks, new banner designs, text updates, or feature additions.',
        icon: 'Clock'
      }
    ],
    benefits: [
      {
        title: 'Zero Unexpected Downtime',
        description: 'Proactive server and dependency checks catch technical glitches before they impact your visitors.'
      },
      {
        title: 'Protection Against Cyber Threats',
        description: 'Timely security updates safeguard customer data and maintain PCI/GDPR compliance.'
      },
      {
        title: 'Instant Priority Technical Support',
        description: 'Direct access to your dedicated lead developer via WhatsApp and email for urgent requests.'
      },
      {
        title: 'Consistent High Speed & SEO Health',
        description: 'Monthly speed checks and database cleanup keep your site running as fast as day one.'
      }
    ],
    developmentProcess: [
      { step: '01', title: 'Onboarding & Backup Vault Setup', description: 'Auditing your site health, configuring automated daily backups, and installing monitoring bots.' },
      { step: '02', title: 'Security & Dependency Updates', description: 'Testing and applying critical framework, plugin, and server security updates safely in staging.' },
      { step: '03', title: 'Speed & Database Optimization', description: 'Clearing transient caches, optimizing database tables, and verifying Core Web Vitals.' },
      { step: '04', title: 'Dedicated Updates & Feature Tweaks', description: 'Executing your requested content additions, banner changes, or new page sections.' },
      { step: '05', title: 'Monthly Health & Performance Report', description: 'Delivering a detailed monthly summary of uptime statistics, security scans, and completed tasks.' }
    ],
    pricingPackages: [
      {
        name: 'Essential Care Plan',
        price: '$99',
        period: '/ month',
        description: 'Core security, automated backups, and essential uptime monitoring for small sites.',
        features: [
          '24/7 Uptime Monitoring & Instant Alerts',
          'Daily Automated Off-Site Backups',
          'Monthly Security Scans & SSL Check',
          'Framework & Dependency Updates',
          '1 Hour Dedicated Developer Time / Month',
          'WhatsApp Priority Support'
        ],
        ctaText: 'Subscribe Essential'
      },
      {
        name: 'Pro Growth Care Plan',
        price: '$249',
        period: '/ month',
        popular: true,
        description: 'Comprehensive maintenance & active development for busy businesses.',
        features: [
          'Everything in Essential Care',
          '3 Hours Dedicated Developer Time / Month',
          'Monthly Speed & SEO Health Audit',
          'Priority Bug Fixes (< 2 Hour Response)',
          'Database Cleanup & Image Compression Pass',
          'Monthly Executive Health Report'
        ],
        ctaText: 'Subscribe Pro Care'
      },
      {
        name: 'VIP Developer retainer',
        price: '$599',
        period: '/ month',
        description: 'Dedicated technical team on call for high-traffic platforms.',
        features: [
          'Everything in Pro Care Plan',
          '8 Hours Dedicated Developer Time / Month',
          '15-Minute Response Time SLA for Critical Emergencies',
          'Staging Environment Management',
          'Custom Feature Engineering & Design Updates',
          'Direct WhatsApp Group with Lead Engineer'
        ],
        ctaText: 'Book VIP Retainer'
      }
    ],
    techStack: [
      { name: 'UptimeRobot', category: 'Monitoring' },
      { name: 'Cloudflare', category: 'DNS & Firewall' },
      { name: 'GitHub Actions', category: 'CI/CD' },
      { name: 'Supabase Backups', category: 'Database Vault' },
      { name: 'Lighthouse CI', category: 'Speed Check' }
    ],
    faqs: [
      {
        question: 'What happens if my website goes down?',
        answer: 'Our 24/7 uptime monitoring system alerts us immediately. We investigate and resolve the issue on priority to restore your site as fast as possible.'
      },
      {
        question: 'Can I rollover unused developer hours to the next month?',
        answer: 'Unused hours can roll over for up to 1 month so you can save development time for larger feature updates.'
      },
      {
        question: 'Can I cancel or switch my maintenance plan anytime?',
        answer: 'Yes! Maintenance plans are month-to-month with no lock-in contracts. You can upgrade, downgrade, or cancel whenever you need.'
      }
    ],
    relatedServicesSlugs: ['web-development', 'seo', 'ecommerce-development']
  }
];

export function getServiceBySlug(slug: string): DetailedServicePageData | undefined {
  return SERVICES_LIST.find((s) => s.slug === slug);
}
