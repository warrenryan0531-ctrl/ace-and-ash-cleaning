import type { MetadataRoute } from 'next';
import { AREAS, SITE } from '@/lib/site';
import { POSTS } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/services', '/pricing', '/first-clean', '/the-standard', '/service-areas', '/journal', '/about', '/book', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 })),
    ...AREAS.map((a) => ({ url: `${SITE.url}/service-areas/${a.slug}`, lastModified: now, priority: 0.7 })),
    ...POSTS.map((b) => ({ url: `${SITE.url}/journal/${b.slug}`, lastModified: new Date(b.date), priority: 0.6 })),
  ];
}
