import Link from 'next/link';
import Photo from '@/components/Photo';
import TheTurn from '@/components/TheTurn';
import { SITE, SERVICES, AREAS, STANDARD } from '@/lib/site';

export default function Home() {
  return (
    <>
      {/* 01 — HERO. Photography leads (principle 11); type bridges the seam (12). */}
      <section className="relative">
        <div className="relative h-[92svh] min-h-[560px] w-full overflow-hidden">
          <Photo src="/images/hero.jpg" priority ratio="auto" sizes="100vw"
            className="!aspect-auto absolute inset-0 h-full w-full"
            alt="A sunlit, freshly cleaned living room in a coastal Florida home" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1714]/52 via-[#1a1714]/12 to-[#1a1714]/48" />
          <div className="shell absolute inset-x-0 bottom-0 pb-[clamp(3rem,9vh,7rem)]">
            <p className="stationery stationery-light reveal-soft">
              Nocatee &middot; Ponte Vedra &middot; St. Augustine
              <span className="hidden sm:inline"> &middot; Jacksonville</span>
            </p>
            <h1 className="display display-lg mt-5 max-w-[13ch] text-[#f4f0e9] reveal-soft">
              <span className="whisper text-[#f4f0e9]/78">leave the</span> MESS{' '}
              <span className="whisper text-[#f4f0e9]/78">for</span> US.
            </h1>
          </div>
        </div>

        {/* the seam: the sentence starts on the photograph and finishes on parchment */}
        <div className="shell -mt-px grid gap-8 border-t border-[#d6cfc2] py-10 md:grid-cols-[1.2fr_1fr] md:items-end md:py-12">
          <p className="display display-sm measure-tight reveal-soft">
            A home in St. Johns County, <span className="whisper">put back the way</span> you meant to keep it.
          </p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Link href="/book" className="btn">Request a clean</Link>
            <a href={SITE.phoneHref} className="btn btn-ghost">{SITE.phone}</a>
          </div>
        </div>
      </section>

      {/* 02 — STATIONERY STRIP. Hairline row, never an icon-tile grid (A01 hard ban). */}
      <section aria-label="Credentials" className="border-y border-[#d6cfc2] bg-[#ebe5db]/55">
        <div className="shell grid divide-y divide-[#d6cfc2] md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            ['Licensed & insured', 'Registered, insured, and accountable for what we touch.'],
            ['AHA accredited', 'Accredited by the American Housecleaning Association.'],
            ['Pet & baby safe', 'Environmental products chosen around the people who live there.'],
            ['Owner-operated', 'Erica still cleans. She is not a call center.'],
          ].map(([t, d]) => (
            <div key={t} className="py-7 md:px-7 md:first:pl-0 md:last:pr-0 reveal-soft">
              <p className="stationery">{t}</p>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-[#68635b]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — POEM STATEMENT. Full-section serif at poem scale (Src 007). */}
      <section className="shell py-[clamp(5rem,14vh,9rem)]">
        <p className="display display-md max-w-[26ch] reveal">
          You are not behind. <span className="whisper">You are just</span> outnumbered
          <span className="whisper"> by a job, two kids, a dog, and a house that keeps score.</span>
        </p>
        <p className="mt-9 max-w-[54ch] text-[1.05rem] leading-relaxed text-[#3a352e] reveal-soft">
          Erica Taylor started Ace &amp; Ash helping one struggling mother of four. Eight years on it is a
          licensed, insured company with a waiting list, and the work has not changed. We come in, we do it
          properly, and you get your Saturday back.
        </p>
        <div className="mt-8 reveal-soft">
          <Link href="/about" className="stationery lnk">Read Erica&rsquo;s story &rarr;</Link>
        </div>
      </section>

      {/* 04 — THE SHOWSTOPPER: vertical → horizontal → vertical */}
      <TheTurn />

      {/* 05 — SERVICES as editorial index rows (principle 5) */}
      <section aria-labelledby="svc-h" className="shell py-[clamp(5rem,13vh,8rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="stationery reveal-soft">What we do</p>
            <h2 id="svc-h" className="display display-md mt-4 reveal-soft">
              Five <span className="whisper">ways we</span> help.
            </h2>
          </div>
          <Link href="/services" className="stationery lnk reveal-soft">All services &rarr;</Link>
        </div>

        <div className="mt-12">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services#${s.slug}`} className="idx-row group reveal-soft">
              <div className="flex items-start gap-6 py-8 md:items-center md:gap-12">
                <span className="stationery mt-1.5 w-8 flex-none md:mt-0">{s.n}</span>
                <div className="min-w-0 flex-1 md:grid md:grid-cols-[1fr_1.15fr] md:items-baseline md:gap-12">
                  <h3 className="display display-sm">{s.title}</h3>
                  <p className="mt-2.5 text-[0.98rem] leading-relaxed text-[#68635b] md:mt-0">{s.lede}</p>
                </div>
                <span className="arrow-o mt-1 md:mt-0" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h13M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 06 — THE STANDARD. Inset framed photo with display type running behind it. */}
      <section aria-labelledby="std-h" className="a11y-keep relative overflow-hidden bg-[#1a1714] py-[clamp(5rem,13vh,8rem)] text-[#f4f0e9]">
        <div aria-hidden="true" data-wm="49 POINTS"
             className="wm wm-top pointer-events-none absolute inset-x-0 top-0 h-1 select-none px-[var(--gut)]" />
        <div className="shell relative grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-20">
          <div className="relative">
            <Photo src="/images/bath.jpg" ratio="4 / 5" sizes="(min-width:1024px) 38vw, 92vw" grade="grey"
              alt="A spotless bathroom with folded towels, cleaned by Ace & Ash" className="reveal-soft" />
          </div>
          <div>
            <p className="stationery stationery-light reveal-soft">The Ace &amp; Ash Standard</p>
            <h2 id="std-h" className="display display-md mt-4 max-w-[15ch] reveal-soft">
              <span className="whisper text-[#f4f0e9]/72">forty-nine things</span> WE CHECK
              <span className="whisper text-[#f4f0e9]/72"> before we call it done.</span>
            </h2>
            <p className="mt-7 max-w-[52ch] leading-relaxed text-[#f4f0e9]/72 reveal-soft">
              Not a promise — a list. The same list every visit, so &ldquo;clean&rdquo; means the same thing in
              your house that it does in ours.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-4">
              {STANDARD.map((s) => (
                <div key={s.room} className="reveal-soft">
                  <dt className="display text-[2.4rem] leading-none">{s.count}</dt>
                  <dd className="stationery stationery-light mt-2">{s.room}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 reveal-soft">
              <Link href="/the-standard" className="btn btn-light">See the full list</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — ERICA. Object woven into type (Src 007). */}
      <section aria-labelledby="er-h" className="shell py-[clamp(5rem,13vh,8rem)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-20">
          <div>
            <p className="stationery reveal-soft">The owner</p>
            <h2 id="er-h" className="display display-md mt-4 max-w-[16ch] reveal-soft">
              <span className="whisper">the person</span> WHO ANSWERS
              <span className="whisper"> is the person who</span> CLEANS.
            </h2>
            <blockquote className="mt-9 max-w-[54ch] reveal-soft">
              <p className="display text-[1.55rem] leading-[1.35] md:text-[1.85rem]">
                &ldquo;I started my business because I truly enjoy helping elderly and disabled individuals, as
                well as overwhelmed parents and families who could use an extra hand around the house.&rdquo;
              </p>
              <footer className="stationery mt-5">Erica Taylor <em>&mdash;</em> owner, Ace &amp; Ash</footer>
            </blockquote>
            <p className="mt-8 max-w-[54ch] leading-relaxed text-[#68635b] reveal-soft">
              It began as a side job for one family and became a full-time, insured company with a team.
              Erica still runs every estimate herself, which is also why the calendar fills weeks ahead.
            </p>
          </div>
          <Photo src="/images/hands.jpg" ratio="4 / 5" sizes="(min-width:1024px) 32vw, 92vw"
            alt="Hands folding a linen towel into precise thirds" className="reveal-soft" />
        </div>
      </section>

      {/* 08 — PROOF. Real content only (principle 7). No invented metrics. */}
      <section aria-labelledby="proof-h" className="border-y border-[#d6cfc2] bg-[#ebe5db]/55 py-[clamp(4rem,11vh,7rem)]">
        <div className="shell">
          <p className="stationery reveal-soft">What people say</p>
          <h2 id="proof-h" className="display display-md mt-4 max-w-[18ch] reveal-soft">
            <span className="whisper">every</span> RECOMMENDATION <span className="whisper">so far.</span>
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
            <blockquote className="reveal-soft">
              <p className="display text-[1.5rem] leading-[1.4] md:text-[1.75rem]">
                &ldquo;Erica and her team are so kind and caring. They genuinely care about their clients and
                want to help any&hellip;&rdquo;
              </p>
              <footer className="stationery mt-5">Kye Dozier <em>on</em> Facebook</footer>
            </blockquote>
            <div className="flex flex-col justify-center gap-6 border-t border-[#d6cfc2] pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
              <div className="reveal-soft">
                <p className="display text-[3.4rem] leading-none">100%</p>
                <p className="stationery mt-2">Recommended on Facebook</p>
              </div>
              <p className="text-[0.92rem] leading-relaxed text-[#68635b] reveal-soft">
                Across every review left on the page to date. We would rather show you the real number than a
                borrowed one.
              </p>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="stationery lnk reveal-soft">
                Read them on Facebook &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — SERVICE AREA */}
      <section aria-labelledby="area-h" className="shell py-[clamp(5rem,13vh,8rem)]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
          <div>
            <p className="stationery reveal-soft">Where we clean</p>
            <h2 id="area-h" className="display display-md mt-4 max-w-[13ch] reveal-soft">
              <span className="whisper">three counties,</span> ONE DRIVE <span className="whisper">from home.</span>
            </h2>
            <p className="mt-7 max-w-[46ch] leading-relaxed text-[#68635b] reveal-soft">
              We are based in Nocatee and we stay close on purpose. A tight radius is how the same team keeps
              showing up at the same houses on time.
            </p>
            <div className="mt-8 reveal-soft">
              <Link href="/service-areas" className="btn btn-ghost">All service areas</Link>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-8">
            {AREAS.map((a) => (
              <li key={a.slug} className="border-t border-[#d6cfc2] last:border-b-0 reveal-soft">
                <Link href={`/service-areas/${a.slug}`} className="block py-4 lnk">
                  <span className="text-[1.02rem]">{a.name}</span>
                  <span className="stationery mt-1 block">{a.county}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
