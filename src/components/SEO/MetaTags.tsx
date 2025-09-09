import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
}

export function MetaTags({
  title,
  description,
  url,
  image,
  type = 'website',
  twitterCard = 'summary_large_image',
  twitterSite
}: MetaTagsProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set or update meta tags
    const setOrUpdateMeta = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      const selector = `meta[${attribute}="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Set or update link tags
    const setOrUpdateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Basic meta tags
    setOrUpdateMeta('description', description);
    
    // Canonical URL
    setOrUpdateLink('canonical', url);
    
    // OpenGraph tags
    setOrUpdateMeta('og:title', title, true);
    setOrUpdateMeta('og:description', description, true);
    setOrUpdateMeta('og:url', url, true);
    setOrUpdateMeta('og:image', image, true);
    setOrUpdateMeta('og:type', type, true);
    
    // Twitter Card tags
    setOrUpdateMeta('twitter:card', twitterCard);
    setOrUpdateMeta('twitter:title', title);
    setOrUpdateMeta('twitter:description', description);
    setOrUpdateMeta('twitter:image', image);
    if (twitterSite) {
      setOrUpdateMeta('twitter:site', twitterSite);
    }
  }, [title, description, url, image, type, twitterCard, twitterSite]);

  return null;
}