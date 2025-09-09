import { useEffect } from 'react';
import { siteSettings } from '@/config/siteSettings';

interface ArticleStructuredDataProps {
  headline: string;
  dateModified: string;
  image: string;
  url: string;
}

interface CollectionPageStructuredDataProps {
  name: string;
  url: string;
}

export function ArticleStructuredData({ headline, dateModified, image, url }: ArticleStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "dateModified": dateModified,
      "author": {
        "@type": "Organization",
        "name": siteSettings.siteName
      },
      "publisher": {
        "@type": "Organization",
        "name": siteSettings.siteName
      },
      "image": image,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };

    // Remove existing structured data script if it exists
    const existingScript = document.querySelector('script[type="application/ld+json"][data-seo="article"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'article');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-seo="article"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [headline, dateModified, image, url]);

  return null;
}

export function CollectionPageStructuredData({ name, url }: CollectionPageStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": name,
      "url": url
    };

    // Remove existing structured data script if it exists
    const existingScript = document.querySelector('script[type="application/ld+json"][data-seo="collection"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'collection');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-seo="collection"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, url]);

  return null;
}