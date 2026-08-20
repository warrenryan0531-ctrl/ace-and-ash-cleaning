import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
export const metadata: Metadata = { title: 'Privacy notice', robots: { index: false, follow: true } };

export default function Privacy() {
  return (
    <section className="shell pb-[clamp(4rem,11vh,7rem)] pt-[clamp(8rem,18vh,11rem)]">
      <p className="stationery">Legal</p>
      <h1 className="display display-md mt-4">Privacy notice</h1>
      <div className="mt-10 max-w-[62ch] space-y-6 leading-relaxed text-[#3a352e]">
        <p>{SITE.legalName} collects only what you send us through this website: your name, phone number, email
          address, the area you live in, and whatever you tell us about your home.</p>
        <p>We use it to reply to you and to schedule work. We do not sell it, rent it, or pass it to advertisers.
          Form submissions are delivered by email to Erica and to our website partner, 904 Digital Media, which
          maintains this site.</p>
        <p>We use a small amount of analytics to understand which pages people find useful. You can decline
          non-essential cookies from the notice at the bottom of the page.</p>
        <p>To see what we hold about you, or to have it deleted, call or text us at {SITE.phone}. We will act on
          it within 30 days.</p>
      </div>
    </section>
  );
}
