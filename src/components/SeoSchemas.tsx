import React, { useEffect, useState } from 'react';
import { FAQS } from '../data/portfolioData';
import { productStore, ExtendedProductItem } from '../services/productStore';

export const SeoSchemas: React.FC = () => {
  const [products, setProducts] = useState<ExtendedProductItem[]>([]);

  useEffect(() => {
    const updateProducts = () => {
      setProducts(productStore.getProducts(false));
    };

    updateProducts();
    const unsubscribe = productStore.subscribe(updateProducts);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // 1. Developer / Person Schema
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://waleedkhanafridi.online/#person',
      name: 'Waleed Khan Afridi',
      url: 'https://waleedkhanafridi.online',
      jobTitle: 'Senior Full Stack Developer, UI/UX Designer & SEO Specialist',
      worksFor: {
        '@type': 'Organization',
        name: 'Waleed Khan Afridi Digital Services'
      },
      sameAs: [
        'https://wa.me/923416860077',
        'https://www.instagram.com/malikdeenkhail/',
        'https://github.com/waleedkhanafridi',
        'https://waleedkhanafridi.online'
      ],
      knowsAbout: [
        'Full Stack Web Development',
        'React & Next.js Frameworks',
        'TypeScript & Node.js',
        'WordPress & WooCommerce E-commerce',
        'Technical SEO & Core Web Vitals',
        'UI/UX Responsive Design',
        'AI Subscriptions & API Services'
      ]
    };

    // 2. Individual Service Schemas Graph
    const individualServicesSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': 'https://www.waleedkhanafridi.online/#service-fullstack',
          name: 'Custom Full Stack Web Application Development',
          description: 'Modern, scalable, and high-performance web applications built with React, Next.js, Node.js, and Supabase. Fully responsive, SEO-friendly, and production-ready solutions tailored to business needs.',
          provider: {
            '@type': 'Person',
            '@id': 'https://www.waleedkhanafridi.online/#person',
            name: 'Waleed Khan Afridi',
            url: 'https://www.waleedkhanafridi.online/',
            jobTitle: 'Senior Full Stack Developer & SEO Expert'
          },
          serviceType: 'Full Stack Web Development',
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide'
          },
          url: 'https://www.waleedkhanafridi.online/#services'
        },
        {
          '@type': 'Service',
          '@id': 'https://www.waleedkhanafridi.online/#service-wordpress',
          name: 'WordPress & WooCommerce Custom Development',
          description: 'High-converting e-commerce stores, custom WordPress themes, plugin development, performance optimization, and complete WooCommerce solutions built for speed and conversions.',
          provider: {
            '@type': 'Person',
            '@id': 'https://www.waleedkhanafridi.online/#person',
            name: 'Waleed Khan Afridi'
          },
          serviceType: 'WordPress & WooCommerce Development',
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide'
          },
          url: 'https://www.waleedkhanafridi.online/#services'
        },
        {
          '@type': 'Service',
          '@id': 'https://www.waleedkhanafridi.online/#service-seo',
          name: 'Enterprise Technical SEO & Speed Optimization',
          description: 'Complete technical SEO services including Schema markup, Core Web Vitals optimization, Google Search Console setup, crawlability improvements, and organic ranking strategies.',
          provider: {
            '@type': 'Person',
            '@id': 'https://www.waleedkhanafridi.online/#person',
            name: 'Waleed Khan Afridi'
          },
          serviceType: 'Technical SEO',
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide'
          },
          url: 'https://www.waleedkhanafridi.online/#services'
        },
        {
          '@type': 'Service',
          '@id': 'https://www.waleedkhanafridi.online/#service-ai-marketplace',
          name: 'Verified AI Subscriptions & Digital Growth Marketplace',
          description: 'Verified OpenAI API credits, HeyGen, Kling AI accounts, and organic social media growth services for Instagram and YouTube.',
          provider: {
            '@type': 'Person',
            '@id': 'https://www.waleedkhanafridi.online/#person',
            name: 'Waleed Khan Afridi'
          },
          serviceType: 'AI & Digital Growth Services',
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide'
          },
          url: 'https://www.waleedkhanafridi.online/#marketplace'
        }
      ]
    };

    // 3. ProfessionalService & Organization Schema
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': 'https://waleedkhanafridi.online/#service',
      name: 'Waleed Khan Afridi Digital Agency',
      url: 'https://waleedkhanafridi.online',
      logo: 'https://waleedkhanafridi.online/brand-logo.jpg',
      image: 'https://waleedkhanafridi.online/profile-avatar.jpg',
      description: 'International software engineering, custom web application development, UI/UX design, technical SEO, and verified digital marketplace.',
      email: 'waleedkhanafridi7@gmail.com',
      telephone: '+923416860077',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Office 4B, Sector F-11 Markaz',
        addressLocality: 'Islamabad',
        postalCode: '44000',
        addressCountry: 'PK'
      },
      priceRange: '$$',
      paymentAccepted: ['Credit Card', 'Stripe', 'Payoneer', 'Binance Pay', 'USDT TRC20', 'USDT BEP20', 'Crypto'],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'WW',
        returnPolicyCategory: 'https://schema.org/MerchantReturnMoneyBack',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Development & Digital Growth Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Web Application Development',
              description: 'React, Next.js, Node.js & Supabase responsive full stack web applications.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'WordPress & WooCommerce Development',
              description: 'E-commerce store design, speed optimization, and custom plugin integration.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Technical SEO Audit & Speed Optimization',
              description: 'Google Search Console indexing, JSON-LD Schema markup, and Core Web Vitals.'
            }
          }
        ]
      }
    };

    // 3. FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://waleedkhanafridi.online/#faq',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    // 4. Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': 'https://waleedkhanafridi.online/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://waleedkhanafridi.online'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://waleedkhanafridi.online/#services'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Digital Marketplace',
          item: 'https://waleedkhanafridi.online/#marketplace'
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Portfolio',
          item: 'https://waleedkhanafridi.online/#portfolio'
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'About',
          item: 'https://waleedkhanafridi.online/#about'
        }
      ]
    };

    // Helper to inject structured script tag
    const injectScript = (id: string, data: object) => {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(data);
    };

    // 5. Digital Marketplace Product Schemas
    if (Array.isArray(products) && products.length > 0) {
      const productListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': 'https://waleedkhanafridi.online/#product-catalog',
        name: 'Digital Services & Subscriptions Marketplace',
        numberOfItems: products.length,
        itemListElement: products.map((item: any, idx: number) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Product',
            '@id': `https://waleedkhanafridi.online/#product-${item.id}`,
            name: item.title,
            description: item.description,
            category: item.category,
            image: 'https://waleedkhanafridi.online/brand-logo.jpg',
            brand: {
              '@type': 'Brand',
              name: 'Waleed Khan Afridi Digital Services'
            },
            offers: {
              '@type': 'Offer',
              url: 'https://waleedkhanafridi.online/#marketplace',
              priceCurrency: 'USD',
              price: String(item.price),
              priceValidUntil: '2028-12-31',
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Waleed Khan Afridi Digital Services'
              }
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: String(20 + idx),
              bestRating: '5',
              worstRating: '1'
            }
          }
        }))
      };
      injectScript('product-catalog-schema', productListSchema);
    }

    injectScript('person-schema', personSchema);
    injectScript('individual-services-schema', individualServicesSchema);
    injectScript('service-schema', serviceSchema);
    injectScript('faq-schema', faqSchema);
    injectScript('breadcrumb-schema', breadcrumbSchema);

    return () => {
      ['person-schema', 'individual-services-schema', 'service-schema', 'faq-schema', 'breadcrumb-schema', 'product-catalog-schema'].forEach((id) => {
        const elem = document.getElementById(id);
        if (elem) elem.remove();
      });
    };
  }, [products]);

  return null;
};
