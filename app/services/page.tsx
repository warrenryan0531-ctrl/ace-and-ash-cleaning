import type { Metadata } from 'next';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { SERVICES } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Recurring care, deep cleaning, move-in and move-out, home organizing and commercial cleaning across St. Johns, Duval and Clay counties.',
};

const ART = ['/images/hall.jpg', '/images/kitchen.jpg', '/images/entry.jpg', '/images/bedroom.jpg', '/images/bath.jpg'];

export default function Services() {
  return (
    <>
      <section className="shell pb-16 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">What we do</p>
        <h1 className="display display-lg mt-4 max-w-[11ch]">
          <span className="whisper">five ways</span> WE HELP.
        </h1>
        <p className="mt-8 max-w-[54ch] text-[1.05rem] leading-relaxed text-[#3a352e]">
          Every job is quoted on the house itself, not a square-foot table. Erica walks it, prices it, and
          tells you honestly if a different service would serve you better.
        </p>
      </section>

      {SERVICES.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`scroll-mt-24 ${i % 2 ? 'bg-[#ebe5db]/55 border-y border-[#d6cfc2]' : ''}`}>
          <div className="shell grid gap-12 py-[clamp(3.5rem,9vh,6rem)] lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-20">
            <div className={i % 2 ? 'lg:order-2' : ''}>
              <p className="stationery">{s.n} &middot; {s.cadence}</p>
              <h2 className="display display-md mt-4 reveal-soft">{s.title}</h2>
              <p className="display mt-6 max-w-[24ch] text-[1.5rem] leading-[1.35] reveal-soft">{s.lede}</p>
              <p className="mt-6 max-w-[54ch] leading-relaxed text-[#68635b] reveal-soft">{s.body}</p>
              <ul className="mt-8 max-w-[52ch]">
                {s.detail.map((d) => (
                  <li key={d} className="flex gap-5 border-t border-[#d6cfc2] py-3.5 text-[0.96rem] last:border-b reveal-soft">
                    <span className="mt-[0.55em] h-px w-5 flex-none bg-[#8a4e37]" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-9 reveal-soft">
                <Link href="/book" className="btn">Request this</Link>
              </div>
            </div>
            <Photo src={ART[i]} ratio="4 / 5" sizes="(min-width:1024px) 34vw, 92vw"
              alt={`${s.title} — Ace & Ash Cleaning`} className={`reveal-soft ${i % 2 ? 'lg:order-1' : ''}`} />
          </div>
        </section>
      ))}
    </>
  );
}
