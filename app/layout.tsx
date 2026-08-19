import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import A11yWidget from '@/components/A11yWidget';
import CookieConsent from '@/components/CookieConsent';
import { ScrollReveal, AccordionBehavior } from '@/components/Behaviors';
import { SITE, AREAS } from '@/lib/site';

/* type-system: deliberate pairing, never Inter.
   Display = Instrument Serif (roman + true italic → the mixed-register
   mechanism from Src 007). Body/UI = Hanken Grotesk (Src 007's named
   free stand-in for Beausite Classic). Both OFL, self-hosted by next/font. */
const instrument = Instrument_Serif({
  variable: '--font-instrument', subsets: ['latin'], weight: '400', style: ['normal', 'italic'], display: 'swap',
});
const hanken = Hanken_Grotesk({
  variable: '--font-hanken', subsets: ['latin'], display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Ace & Ash Cleaning — House Cleaning in Nocatee, Ponte Vedra & St. Augustine',
    template: '%s · Ace & Ash Cleaning',
  },
  description:
    'Licensed, insured, owner-operated house cleaning across St. Johns, Duval and Clay counties. Recurring care, deep cleans, move-outs and home organizing — with pet and baby safe products. Request a clean online.',
  keywords: ['house cleaning Nocatee', 'Ponte Vedra cleaning service', 'St Augustine house cleaning', 'maid service St Johns County', 'move out cleaning Jacksonville', 'home organizing Nocatee'],
  openGraph: {
    type: 'website', locale: 'en_US', url: SITE.url, siteName: SITE.legalName,
    title: 'Ace & Ash Cleaning — Leave the mess for us.',
    description: 'Licensed, insured, owner-operated house cleaning across Nocatee, Ponte Vedra, St. Augustine and Jacksonville.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#f4f0e9' };

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HouseCleaningService',
  '@id': `${SITE.url}/#business`,
  name: SITE.legalName,
  alternateName: SITE.longName,
  url: SITE.url,
  telephone: `+1-904-944-2218`,
  description:
    'Licensed and insured residential and commercial cleaning, deep cleaning, move-in and move-out cleaning, and home organizing serving St. Johns, Duval and Clay counties, Florida.',
  founder: { '@type': 'Person', name: SITE.owner },
  priceRange: '$$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.googleRating,
    reviewCount: SITE.googleReviews,
    bestRating: 5,
    '@id': `${SITE.url}/#rating`,
  },
  address: { '@type': 'PostalAddress', addressLocality: 'Nocatee', addressRegion: 'FL', addressCountry: 'US' },
  areaServed: AREAS.map((a) => ({ '@type': 'City', name: a.name, containedInPlace: { '@type': 'AdministrativeArea', name: a.county } })),
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00', closes: '18:00',
  }],
  sameAs: [SITE.facebook, SITE.nextdoor],
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Cleaning services',
    itemListElement: [
      'Recurring house cleaning', 'Deep cleaning', 'Move-in and move-out cleaning',
      'Home organizing and decluttering', 'Commercial cleaning',
    ].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${hanken.variable}`}>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#1a1714] focus:px-5 focus:py-3 focus:text-[#f4f0e9]">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <ServiceAreaMap />
        <Footer />
        <A11yWidget />
        <CookieConsent />
        <ScrollReveal />
        <AccordionBehavior />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
