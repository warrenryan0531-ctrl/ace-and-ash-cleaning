import type { Metadata } from 'next';
import Link from 'next/link';
import { STANDARD } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The Ace & Ash Standard',
  description: 'The forty-nine things we check before we call a house done — the same list every visit.',
};

export default function Standard() {
  const total = STANDARD.reduce((a, s) => a + s.count, 0);
  return (
    <>
      <section className="shell pb-14 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">The Ace &amp; Ash Standard</p>
        <h1 className="display display-lg mt-4 max-w-[12ch]">
          <span className="whisper">forty-nine</span> POINTS.
        </h1>
        <p className="mt-8 max-w-[56ch] text-[1.05rem] leading-relaxed text-[#3a352e]">
          Most cleaning companies promise thoroughness. This is ours written down, so you can hold us to it —
          and so &ldquo;clean&rdquo; means the same thing in your house as it does in the one before yours.
          {' '}<strong className="font-medium">{total} checks</strong>, every visit.
        </p>
      </section>

      <section className="shell pb-[clamp(5rem,13vh,8rem)]">
        {STANDARD.map((s) => (
          <div key={s.room} className="grid gap-6 border-t border-[#d6cfc2] py-10 md:grid-cols-[0.6fr_1fr] md:gap-16 md:py-12">
            <div className="reveal-soft">
              <p className="display display-sm">{s.room}</p>
              <p className="stationery mt-2">{s.count} checks</p>
            </div>
            <ul>
              {s.items.map((it) => (
                <li key={it} className="flex gap-5 border-b border-[#d6cfc2] py-3.5 text-[0.98rem] last:border-0 reveal-soft">
                  <span className="mt-[0.6em] h-px w-5 flex-none bg-[#8a4e37]" aria-hidden="true" />{it}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="border-t border-[#d6cfc2] pt-12">
          <p className="display display-md max-w-[18ch]">
            <span className="whisper">and if we</span> MISS ONE<span className="whisper">, tell us. We come back.</span>
          </p>
          <div className="mt-8"><Link href="/book" className="btn">Request a clean</Link></div>
        </div>
      </section>
    </>
  );
}
