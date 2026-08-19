import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Photo from '@/components/Photo';
import { AREAS, SERVICES, SITE } from '@/lib/site';

export function generateStaticParams() { return AREAS.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: `House cleaning in ${a.name}`,
    description: `Licensed, insured house cleaning, deep cleans, move-outs and home organizing in ${a.name}, ${a.county}. Owner-operated by Erica Taylor. Request a clean online.`,
    alternates: { canonical: `/service-areas/${a.slug}` },
  };
}

export default async function Area({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AREAS.find((x) => x.slug === slug);
  if (!a) notFound();
  const others = AREAS.filter((x) => x.slug !== a.slug).slice(0, 6);

  const schema = {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: 'House cleaning',
    provider: { '@type': 'HouseCleaningService', name: SITE.legalName, telephone: '+1-904-944-2218' },
    areaServed: { '@type': 'City', name: a.name, containedInPlace: { '@type': 'AdministrativeArea', name: a.county } },
    description: `Residential and commercial cleaning in ${a.name}, ${a.county}, Florida.`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="shell pb-14 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">{a.county} &middot; Florida</p>
        <h1 className="display display-lg mt-4 max-w-[14ch]">
          <span className="whisper">house cleaning in</span> {a.name.toUpperCase()}.
        </h1>
        <p className="mt-8 max-w-[54ch] text-[1.05rem] leading-relaxed text-[#3a352e]">{a.note}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/book" className="btn">Request a clean in {a.name}</Link>
          <a href={SITE.phoneHref} className="btn btn-ghost">{SITE.phone}</a>
        </div>
      </section>

      <section className="border-y border-[#d6cfc2]">
        <Photo src="/images/entry.jpg" ratio="21 / 9" sizes="100vw"
          alt={`A home in ${a.name}, Florida`} />
      </section>

      <section className="shell py-[clamp(4rem,11vh,7rem)]">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-20">
          <div>
            <p className="stationery">What we do here</p>
            <h2 className="display display-md mt-4 max-w-[14ch]">
              <span className="whisper">the same</span> FIVE SERVICES<span className="whisper">, same standard.</span>
            </h2>
            <p className="mt-7 max-w-[44ch] leading-relaxed text-[#68635b]">
              Erica quotes {a.name} homes personally. Recurring clients get first call on the calendar, which is
              worth knowing — the schedule usually runs a few weeks out.
            </p>
          </div>
          <div>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="idx-row reveal-soft">
                <div className="flex items-center gap-6 py-6">
                  <span className="stationery w-8 flex-none">{s.n}</span>
                  <div className="flex-1">
                    <h3 className="display text-[1.4rem] leading-tight">{s.title}</h3>
                    <p className="mt-1.5 text-[0.92rem] text-[#68635b]">{s.cadence}</p>
                  </div>
                  <span className="arrow-o" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-[#d6cfc2] pt-10">
          <p className="stationery">Nearby</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-1">
            {others.map((o) => (
              <li key={o.slug}><Link href={`/service-areas/${o.slug}`} className="lnk inline-block py-1.5 text-[1.05rem]">{o.name}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
