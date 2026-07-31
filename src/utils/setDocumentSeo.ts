export interface SeoOptions {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterCreator?: string;
  keywords?: string;
}

export function setDocumentSeo(
  titleOrOptions: string | SeoOptions,
  descriptionParam?: string,
  extraOptions?: Partial<SeoOptions>
) {
  let opts: SeoOptions;

  if (typeof titleOrOptions === 'object') {
    opts = titleOrOptions;
  } else {
    opts = {
      title: titleOrOptions,
      description: descriptionParam || '',
      ...extraOptions
    };
  }

  const {
    title,
    description,
    url = window.location.href,
    image = 'https://waleedkhanafridi.online/brand-logo.jpg',
    imageAlt = `${title} - Waleed Khan Afridi Digital Services`,
    type = 'website',
    siteName = 'Waleed Khan Afridi Digital Services',
    twitterCard = 'summary_large_image',
    twitterCreator = '@waleedkhanafridi',
    keywords
  } = opts;

  // 1. Primary Title
  document.title = title;

  // Helper to query and update or create meta tags
  const setMeta = (attrName: 'name' | 'property', attrVal: string, contentVal: string) => {
    if (!contentVal) return;
    let elem = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!elem) {
      elem = document.createElement('meta');
      elem.setAttribute(attrName, attrVal);
      document.head.appendChild(elem);
    }
    elem.setAttribute('content', contentVal);
  };

  // Helper for canonical link
  const setLink = (relVal: string, hrefVal: string) => {
    if (!hrefVal) return;
    let link = document.querySelector(`link[rel="${relVal}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', relVal);
      document.head.appendChild(link);
    }
    link.setAttribute('href', hrefVal);
  };

  // Standard HTML Metadata
  setMeta('name', 'title', title);
  setMeta('name', 'description', description);
  if (keywords) {
    setMeta('name', 'keywords', keywords);
  }

  // Canonical Link
  setLink('canonical', url);

  // Open Graph / Facebook / LinkedIn / WhatsApp Metadata
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:image:secure_url', image);
  setMeta('property', 'og:image:alt', imageAlt);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', siteName);
  setMeta('property', 'og:locale', 'en_US');

  // Twitter Card Metadata
  setMeta('name', 'twitter:card', twitterCard);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);
  setMeta('name', 'twitter:image:alt', imageAlt);
  setMeta('name', 'twitter:url', url);
  setMeta('name', 'twitter:site', twitterCreator);
  setMeta('name', 'twitter:creator', twitterCreator);
}

