import type { MetadataRoute } from 'next';
import { AREAS, SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/services', '/the-standard', '/service-areas', '/about', '/book', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 })),
    ...AREAS.map((a) => ({ url: `${SITE.url}/service-areas/${a.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
