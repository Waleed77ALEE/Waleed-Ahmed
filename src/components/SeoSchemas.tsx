import React, { useEffect } from 'react';
import { FAQS } from '../data/portfolioData';

export const SeoSchemas: React.FC = () => {
  useEffect(() => {
    // 1. Developer / Person Schema
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Waleed Khan Afridi',
      url: 'https://waleedkhanafridi.online',
      jobTitle: 'Senior Full Stack Developer, UI/UX Designer & SEO Specialist',
      worksFor: {
        '@type': 'Organization',
        name: 'Waleed Khan Afridi Digital Services'
      },
      sameAs: [
        'https://github.com/waleedkhanafridi',
        'https://waleedkhanafridi.online'
      ]
    };

    // 2. Organization / Digital Marketplace Schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Waleed Khan Afridi Digital Services Marketplace',
      url: 'https://waleedkhanafridi.online',
      logo: 'https://waleedkhanafridi.online/favicon.ico',
      description: 'Official Digital Services Marketplace offering AI Subscriptions (HeyGen, Kling AI, OpenAI API, Claude Pro), Social Media Growth, Aged Accounts, and Gift Cards.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: ['English', 'Urdu']
      }
    };

    // 3. FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
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
          name: 'Digital Services',
          item: 'https://waleedkhanafridi.online/#digital-services'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Portfolio Projects',
          item: 'https://waleedkhanafridi.online/#projects'
        }
      ]
    };

    // Function to append script
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

    injectScript('person-schema', personSchema);
    injectScript('org-schema', orgSchema);
    injectScript('faq-schema', faqSchema);
    injectScript('breadcrumb-schema', breadcrumbSchema);

    return () => {
      ['person-schema', 'org-schema', 'faq-schema', 'breadcrumb-schema'].forEach((id) => {
        const elem = document.getElementById(id);
        if (elem) elem.remove();
      });
    };
  }, []);

  return null;
};
