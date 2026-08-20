import type { Metadata } from 'next';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Erica',
  description: 'Ace & Ash Cleaning is owner-operated by Erica Taylor in Nocatee, Florida — licensed, insured, AHA accredited, and built out of helping one family at a time.',
};

export default function About() {
  return (
    <>
      <section className="shell pb-16 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">The owner</p>
        <h1 className="display display-lg mt-4 max-w-[13ch]">
          <span className="whisper">it started with</span> ONE FAMILY.
        </h1>
      </section>

      <section className="shell grid gap-14 pb-[clamp(4rem,11vh,7rem)] lg:grid-cols-[1fr_0.72fr] lg:gap-20">
        <div>
          <blockquote className="reveal-soft">
            <p className="display text-[1.55rem] leading-[1.35] md:text-[2rem]">
              &ldquo;It started out as a side job to help a struggling mother of four and turned into a full
              time job and insured company.&rdquo;
            </p>
            <footer className="stationery mt-5">Erica Taylor <em>&mdash;</em> owner</footer>
          </blockquote>

          <div className="mt-12 space-y-6 text-[1.05rem] leading-relaxed text-[#3a352e]">
            <p className="reveal-soft">
              Erica did not set out to build a cleaning company. She set out to help someone who was drowning,
              and then someone else, and then enough people that it stopped being a favor and became a
              business. Eight years later Ace &amp; Ash is licensed, insured, accredited by the American
              Housecleaning Association, and has a team — and Erica is still the one who walks your house and
              writes your quote.
            </p>
            <p className="reveal-soft">
              The clients who stay longest tend to be the ones who need it most: parents in the middle of the
              hardest years, older neighbors who cannot manage a full house anymore, families in the middle of
              a move. That is who she started for, and it is still who the calendar is built around.
            </p>
            <p className="reveal-soft">
              We use environmental, kid- and pet-safe products by default — not as a selling point, but because
              somebody crawls on those floors after we leave.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-[#d6cfc2] pt-10 sm:grid-cols-3">
            {[['Nocatee, FL', 'Based in'], ['St. Johns · Duval · Clay', 'Counties served'],
              ['Licensed & insured', 'Registered'], ['AHA accredited', 'American Housecleaning Association'],
              ['Mon – Fri, 8–6', 'Office hours'], ['100% recommended', 'On Facebook, to date']].map(([v, k]) => (
              <div key={k} className="reveal-soft">
                <dt className="stationery">{k}</dt>
                <dd className="display mt-1.5 text-[1.25rem] leading-tight">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/book" className="btn">Request a clean</Link>
            <a href={SITE.phoneHref} className="btn btn-ghost">{SITE.phone}</a>
          </div>
        </div>

        <div className="space-y-6">
          <Photo src="/images/hands.jpg" ratio="4 / 5" sizes="(min-width:1024px) 32vw, 92vw"
            alt="Hands folding a linen towel into precise thirds" className="reveal-soft" />
          <Photo src="/images/entry.jpg" ratio="3 / 2" sizes="(min-width:1024px) 32vw, 92vw" grade="grey"
            alt="The swept front entry of a coastal Florida home" className="reveal-soft" />
        </div>
      </section>
    </>
  );
}
