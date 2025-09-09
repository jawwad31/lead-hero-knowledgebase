import { siteSettings } from "@/config/siteSettings";

export function getMetaForResource(r: { title: string; body_text?: string; slug?: string; ogImage?: string }) {
  const title = `${r.title} · ${siteSettings.siteName}`;
  const desc = (r.body_text || "").slice(0, 160).replace(/\s+\S*$/, "");
  const url = `${siteSettings.baseUrl}/resources/${r.slug || ""}`;
  const image = r.ogImage || siteSettings.defaultOgImage;
  return { title, desc, url, image };
}

export function getMetaForCategory(c: { name: string; slug: string; description?: string }) {
  const title = `${c.name} · ${siteSettings.siteName}`;
  const desc = c.description || `Resources in ${c.name}`;
  const url = `${siteSettings.baseUrl}/categories/${c.slug}`;
  return { title, desc, url, image: siteSettings.defaultOgImage };
}

export function getMetaForHome() {
  const title = `${siteSettings.siteName} · ${siteSettings.siteTagline}`;
  const desc = siteSettings.siteTagline;
  const url = siteSettings.baseUrl;
  return { title, desc, url, image: siteSettings.defaultOgImage };
}

export function extractTextFromHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
}