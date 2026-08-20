import type { Metadata } from 'next';
import Link from 'next/link';
import Photo from '@/components/Photo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Your first clean',
  description:
    'What actually happens when you book Ace & Ash for the first time — the walkthrough, the quote, the day itself, and what happens after. No surprises, no pressure.',
  alternates: { canonical: '/first-clean' },
};

const STEPS = [
  {
    n: '01',
    title: 'You call, and Erica picks up',
    body: 'Not a call center and not a form that disappears. Tell her roughly how big the house is, how many bathrooms, whether there are pets, and what is bothering you most. If we are booked out too far to help you, she will say so on that call rather than three days later.',
  },
  {
    n: '02',
    title: 'A walkthrough, about fifteen minutes',
    body: 'Erica comes and looks at the actual house. This is where the price comes from, and it is the reason the number does not move afterwards. Show her the things that bother you — the grout, the oven, the room you have stopped opening. That is the useful part of the visit, not a sales pitch.',
  },
  {
    n: '03',
    title: 'A number, before anything starts',
    body: 'A flat figure for the first visit, and a figure for the recurring rhythm afterwards if that is what you want. If your house needs a deep clean first, you will hear that and why. If it does not, you will hear that too, and the smaller job is the one you get quoted.',
  },
  {
    n: '04',
    title: 'The first visit',
    body: 'Usually the longest one, because it is setting the baseline. You do not need to be home — most recurring clients are not, and a door code or a key is normal. You also do not need to tidy first. Clearing counters and floors means more of your money goes into cleaning rather than moving things, but nobody is going to judge the state of anything.',
  },
  {
    n: '05',
    title: 'A walkthrough at the end',
    body: 'If you are home, Erica will walk it with you before leaving. If you are not, you get a message when the team is done. Anything you are not happy with, say so the same day or the next morning and it gets put right — no negotiation, no invoice for the return trip.',
  },
  {
    n: '06',
    title: 'Then it gets easier',
    body: 'The same small team comes back on your rhythm, and your notes carry forward. Nobody has to be told twice which dog hides under the bed or where the good glasses live. Recurring clients also get first call on the calendar before new one-time work.',
  },
];

const BRING = [
  'Our own supplies and equipment, unless you would rather we used yours',
  'A named, insured team — not a different stranger each visit',
  'Low-chemical and water-only methods for homes that want them',
];

const YOU = [
  'A door code, a key, or be home — whichever you prefer',
  'Anything you would rather we did not touch, said once',
  'Somewhere to put the pets if they would rather not meet a vacuum',
];

export default function FirstClean() {
  return (
    <>
      <section className="shell pb-14 pt-[clamp(8rem,18vh,11rem)]">
        <p className="stationery">Your first clean</p>
        <h1 className="display display-lg mt-4 max-w-[14ch]">
          <span className="whisper">nothing about this</span> IS AWKWARD.
        </h1>
        <p className="mt-8 max-w-[56ch] text-[1.05rem] leading-relaxed text-[#3a352e]">
          Letting somebody into your house for the first time is a strange thing to do, and most people
          put it off longer than they need to. Here is exactly how it goes, start to finish, so there is
          nothing left to wonder about.
        </p>
      </section>

      <section className="border-y border-[#d6cfc2] bg-[#ebe5db]/55">
        <div className="shell py-[clamp(3.5rem,9vh,6rem)]">
          <ol className="grid gap-x-16 gap-y-10 md:grid-cols-2">
            {STEPS.map((s) => (
              <li key={s.n} className="border-t border-[#d6cfc2] pt-7 reveal-soft">
                <p className="stationery">{s.n}</p>
                <h2 className="display mt-3 text-[1.45rem] leading-[1.3]">{s.title}</h2>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-[#68635b]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell grid gap-x-16 gap-y-12 py-[clamp(3.5rem,9vh,6rem)] lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2">
          <div>
            <p className="stationery reveal-soft">We bring</p>
            <ul className="mt-5 reveal-soft">
              {BRING.map((d) => (
                <li key={d} className="flex gap-4 border-t border-[#d6cfc2] py-3.5 text-[0.95rem] last:border-b">
                  <span className="mt-[0.55em] h-px w-4 flex-none bg-[#8a4e37]" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="stationery reveal-soft">What you handle</p>
            <ul className="mt-5 reveal-soft">
              {YOU.map((d) => (
                <li key={d} className="flex gap-4 border-t border-[#d6cfc2] py-3.5 text-[0.95rem] last:border-b">
                  <span className="mt-[0.55em] h-px w-4 flex-none bg-[#8a4e37]" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Photo src="/images/entry.jpg" ratio="4 / 5" sizes="(min-width:1024px) 36vw, 92vw"
          alt="An entryway cleaned by Ace &amp; Ash Cleaning" className="reveal-soft" />
      </section>

      <section className="border-t border-[#d6cfc2] bg-[#1a1714] text-[#f4f0e9]">
        <div className="shell py-[clamp(3.5rem,9vh,5.5rem)]">
          <p className="stationery stationery-light reveal-soft">One more thing</p>
          <p className="display display-sm mt-5 max-w-[24ch] reveal-soft">
            <span className="whisper text-[#f4f0e9]/70">if your house has</span> gotten away from you,
            <span className="whisper text-[#f4f0e9]/70"> that is who we started for.</span>
          </p>
          <p className="mt-7 max-w-[52ch] leading-relaxed text-[#f4f0e9]/75 reveal-soft">
            Erica began Ace &amp; Ash helping elderly and disabled clients and overwhelmed parents. Nobody
            here is surprised by a difficult house, and nobody talks about your home afterwards.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 reveal-soft">
            <Link href="/book" className="btn btn-light">Request a clean</Link>
            <a href={SITE.phoneHref} className="btn border-[#f4f0e9]/35 bg-transparent text-[#f4f0e9] hover:bg-[#f4f0e9] hover:text-[#1a1714]">
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
