import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { PRICING, FAQS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pricing & questions',
  description:
    'What house cleaning costs in Nocatee, Ponte Vedra and St. Augustine — honest starting ranges for recurring care, deep cleans and move-outs, plus straight answers to the questions people ask before they call.',
  alternates: { canonical: '/pricing' },
};

/* FAQPage schema. Every Q&A here is rendered visibly on the page, which is
   what Google requires — and it's what answer engines quote back. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="shell pb-14 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">Pricing</p>
        <h1 className="display display-lg mt-4 max-w-[13ch]">
          <span className="whisper">what it</span> COSTS.
        </h1>
        <p className="mt-8 max-w-[56ch] text-[1.05rem] leading-relaxed text-[#3a352e]">
          Most cleaning companies make you call to find out anything. Here are the ranges most homes
          land in, so you can decide whether we are worth a phone call before you spend one.
        </p>
        <p className="mt-6 max-w-[56ch] leading-relaxed text-[#68635b]">
          Every job is quoted on the house itself, not a square-foot table. Erica walks it, prices it,
          and tells you honestly if a different service would serve you better.
        </p>
      </section>

      {PRICING.map((b, i) => (
        <section key={b.slug} id={b.slug} className={`scroll-mt-24 ${i % 2 ? 'border-y border-[#d6cfc2] bg-[#ebe5db]/55' : ''}`}>
          <div className="shell grid gap-x-16 gap-y-8 py-[clamp(3rem,7vh,4.5rem)] md:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="stationery">{b.cadence}</p>
              <h2 className="display display-sm mt-3 reveal-soft">{b.title}</h2>
              <p className="display mt-4 text-[2rem] leading-none text-[#8a4e37] reveal-soft">{b.range}</p>
              <p className="mt-6 max-w-[48ch] leading-relaxed text-[#68635b] reveal-soft">{b.blurb}</p>
            </div>
            <ul className="reveal-soft">
              {b.includes.map((d) => (
                <li key={d} className="flex gap-5 border-t border-[#d6cfc2] py-3.5 text-[0.96rem] last:border-b">
                  <span className="mt-[0.55em] h-px w-5 flex-none bg-[#8a4e37]" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="shell py-[clamp(2.5rem,6vh,4rem)]">
        <p className="max-w-[62ch] text-[0.88rem] leading-relaxed text-[#68635b]">
          <strong className="font-semibold text-[#3a352e]">About these numbers.</strong> They are
          starting ranges, not a price list. Condition, pets, how many bathrooms you have and how often
          we come all move the figure, and the only number that counts is the one Erica gives you after
          seeing the house. Nothing changes on the day unless you ask for something different.
        </p>
      </section>

      <section aria-labelledby="faq-h" className="border-t border-[#d6cfc2] bg-[#ebe5db]/55 py-[clamp(4rem,10vh,6.5rem)]">
        <div className="shell">
          <p className="stationery reveal-soft">Before you call</p>
          <h2 id="faq-h" className="display display-md mt-4 max-w-[15ch] reveal-soft">
            <span className="whisper">the questions</span> EVERYONE ASKS.
          </h2>
          <dl className="mt-12 max-w-[68ch]">
            {FAQS.map((f) => (
              <div key={f.q} className="border-t border-[#d6cfc2] py-7 last:border-b reveal-soft">
                <dt className="display text-[1.3rem] leading-[1.35]">{f.q}</dt>
                <dd className="mt-3.5 leading-relaxed text-[#68635b]">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-wrap gap-4 reveal-soft">
            <Link href="/book" className="btn">Request a clean</Link>
            <a href={SITE.phoneHref} className="btn btn-ghost">Call {SITE.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
