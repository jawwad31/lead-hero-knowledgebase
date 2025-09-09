import DOMPurify from 'dompurify';

// Allowed domains for iframe embeds
const ALLOWED_EMBED_DOMAINS = [
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'loom.com',
  'www.loom.com',
  'player.vimeo.com'
];

// Slugify function for creating clean IDs from heading text
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Validate if iframe src is from allowed domain
const isAllowedEmbedDomain = (src: string): boolean => {
  try {
    const url = new URL(src);
    return ALLOWED_EMBED_DOMAINS.some(domain => 
      url.hostname === domain || url.hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
};

// Custom hook for DOMPurify to filter iframes
DOMPurify.addHook('beforeSanitizeElements', (node) => {
  if (node.nodeName === 'IFRAME') {
    const element = node as Element;
    const src = element.getAttribute('src');
    if (!src || !isAllowedEmbedDomain(src)) {
      node.parentNode?.removeChild(node);
    }
  }
});

// Sanitize HTML content with strict allow-list
export const sanitizeHtml = (html: string): string => {
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'div', 'span',
      'strong', 'b', 'em', 'i', 'u', 's', 'mark',
      'ul', 'ol', 'li',
      'a', 'img', 'iframe',
      'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'hr'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id',
      'width', 'height', 'frameborder', 'allowfullscreen',
      'target', 'rel'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['frameborder', 'allowfullscreen'],
    FORCE_BODY: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false
  });

  return cleanHtml;
};

// Extract and process headings from HTML for TOC generation
export const extractHeadings = (html: string): Array<{id: string, text: string, level: number}> => {
  const sanitizedHtml = sanitizeHtml(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedHtml, 'text/html');
  const headings = doc.querySelectorAll('h2, h3');
  
  const tocItems: Array<{id: string, text: string, level: number}> = [];
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent?.trim() || '';
    const id = `heading-${slugify(text)}`;
    
    if (text) {
      tocItems.push({ id, text, level });
    }
  });
  
  return tocItems;
};

// Add IDs to headings in HTML content
export const addHeadingIds = (html: string): string => {
  const sanitizedHtml = sanitizeHtml(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedHtml, 'text/html');
  const headings = doc.querySelectorAll('h2, h3');
  
  headings.forEach((heading) => {
    const text = heading.textContent?.trim() || '';
    const id = `heading-${slugify(text)}`;
    heading.setAttribute('id', id);
  });
  
  return doc.body.innerHTML;
};

// Validate YouTube/Loom/Vimeo URL format
export const validateEmbedUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  
  const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/;
  const loomRegex = /^https?:\/\/(www\.)?loom\.com\/(share|embed)\/[a-zA-Z0-9]+/;
  const vimeoRegex = /^https?:\/\/player\.vimeo\.com\/video\/[0-9]+/;
  
  return youtubeRegex.test(url) || loomRegex.test(url) || vimeoRegex.test(url);
};