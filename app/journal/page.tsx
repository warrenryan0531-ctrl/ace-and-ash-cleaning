import type { Metadata } from 'next';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { POSTS } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Practical notes on keeping a house in Northeast Florida — deep cleans, move-out deposits, humidity, pollen and cleaning around babies and pets. Written by Ace & Ash Cleaning in Nocatee.',
  alternates: { canonical: '/journal' },
};

export default function Journal() {
  return (
    <>
      <section className="shell pb-12 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">Journal</p>
        <h1 className="display display-lg mt-4 max-w-[13ch]">
          <span className="whisper">what we</span> KNOW.
        </h1>
        <p className="mt-8 max-w-[54ch] text-[1.05rem] leading-relaxed text-[#3a352e]">
          Notes from inside other people&rsquo;s houses, written for the people about to hire somebody.
          No sales pitch — if a post talks you out of booking something you did not need, it did its job.
        </p>
      </section>

      <section className="shell pb-[clamp(4rem,10vh,7rem)]">
        <ul>
          {POSTS.map((p) => (
            <li key={p.slug} className="border-t border-[#d6cfc2] last:border-b">
              <Link href={`/journal/${p.slug}`}
                className="group grid items-center gap-x-12 gap-y-6 py-9 md:grid-cols-[0.55fr_1fr] reveal-soft">
                <Photo src={p.image} ratio="4 / 3" sizes="(min-width:768px) 28vw, 92vw" alt="" className="order-2 md:order-1" />
                <div className="order-1 md:order-2">
                  <p className="stationery">{p.dateLabel} &middot; {p.read}</p>
                  <h2 className="display display-sm mt-3 max-w-[20ch] transition-colors duration-500 group-hover:text-[#8a4e37]">
                    {p.title}
                  </h2>
                  <p className="mt-4 max-w-[52ch] leading-relaxed text-[#68635b]">{p.dek}</p>
                  <span className="stationery lnk mt-6 inline-block">Read it &rarr;</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
