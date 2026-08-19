import type { Metadata } from 'next';
import Link from 'next/link';
import { AREAS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Where we clean',
  description: 'Ace & Ash Cleaning serves Nocatee, Ponte Vedra, St. Augustine, World Golf Village, Palencia, Julington Creek, Durbin, Rivertown, Jacksonville Beach, Jacksonville and Orange Park.',
};

export default function Areas() {
  return (
    <>
      <section className="shell pb-14 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">Where we clean</p>
        <h1 className="display display-lg mt-4 max-w-[12ch]">
          <span className="whisper">three counties,</span> ONE DRIVE.
        </h1>
        <p className="mt-8 max-w-[54ch] text-[1.05rem] leading-relaxed text-[#3a352e]">
          We are based in Nocatee and stay close on purpose. A tight radius is how the same small team keeps
          arriving at the same houses on time, week after week.
        </p>
      </section>

      <section aria-label="Service area map" className="border-y border-[#d6cfc2]">
        <div className="relative aspect-[16/9] w-full bg-[#ebe5db] md:aspect-[21/9]">
          <iframe
            title="Ace & Ash Cleaning service area — St. Johns, Duval and Clay counties, Florida"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-81.95%2C29.62%2C-81.20%2C30.42&layer=mapnik&marker=30.0846%2C-81.4084"
            className="absolute inset-0 h-full w-full grayscale-[0.85] contrast-[1.04]"
            loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <section className="shell py-[clamp(4rem,11vh,7rem)]">
        {AREAS.map((a, i) => (
          <Link key={a.slug} href={`/service-areas/${a.slug}`} className="idx-row group reveal-soft">
            <div className="flex items-start gap-6 py-7 md:items-center md:gap-12">
              <span className="stationery mt-1.5 w-8 flex-none md:mt-0">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1 md:grid md:grid-cols-[1fr_1.2fr] md:items-baseline md:gap-12">
                <h2 className="display display-sm">{a.name}</h2>
                <p className="mt-2 text-[0.96rem] leading-relaxed text-[#68635b] md:mt-0">
                  <span className="stationery mr-3">{a.county}</span>{a.note}
                </p>
              </div>
              <span className="arrow-o mt-1 md:mt-0" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
