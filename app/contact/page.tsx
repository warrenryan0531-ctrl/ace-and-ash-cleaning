import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Call, text or email Ace & Ash Cleaning in Nocatee, Florida. Erica replies within one business day.',
};

export default function Contact() {
  return (
    <section className="shell grid gap-14 pb-[clamp(4rem,11vh,7rem)] pt-[clamp(8rem,18vh,11rem)] lg:grid-cols-[1fr_0.65fr] lg:gap-20">
      <div>
        <p className="stationery">Contact</p>
        <h1 className="display display-md mt-4 max-w-[15ch]">
          <span className="whisper">tell us about</span> YOUR HOUSE.
        </h1>
        <div className="mt-12"><ContactForm /></div>
      </div>
      <aside className="border-t border-[#d6cfc2] pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
        <dl className="space-y-8">
          <div><dt className="stationery">Phone &amp; text</dt>
            <dd className="display mt-2 text-[1.5rem]"><a href={SITE.phoneHref} className="lnk">{SITE.phone}</a></dd>
            <dd className="mt-1 text-[0.9rem] text-[#68635b]">Texting is fastest.</dd></div>
          <div><dt className="stationery">Hours</dt>
            <dd className="mt-2 text-[1.02rem]">Monday to Friday<br />8:00am – 6:00pm</dd></div>
          <div><dt className="stationery">Based in</dt>
            <dd className="mt-2 text-[1.02rem]">Nocatee, Florida<br />
              <span className="text-[#68635b]">Serving St. Johns, Duval &amp; Clay</span></dd></div>
          <div><dt className="stationery">Elsewhere</dt>
            <dd className="mt-1 flex flex-col">
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="lnk inline-block py-1.5">Facebook</a>
              <a href={SITE.nextdoor} target="_blank" rel="noopener noreferrer" className="lnk inline-block py-1.5">Nextdoor</a>
            </dd></div>
        </dl>
        <div className="mt-12 border-t border-[#d6cfc2] pt-8">
          <p className="display text-[1.3rem] leading-snug">Know the day you want?</p>
          <Link href="/book" className="btn mt-5 w-full">Pick a date</Link>
        </div>
      </aside>
    </section>
  );
}
