import Link from 'next/link';
import { SITE, SERVICES, AREAS } from '@/lib/site';

/* Giant cropped wordmark footer (Src 007) — type as architecture */
export default function Footer() {
  return (
    <footer className="a11y-keep relative overflow-hidden bg-[#1a1714] text-[#f4f0e9] no-print">
      <div className="shell pt-24 md:pt-32">
        <div className="grid gap-14 md:grid-cols-[1.15fr_1fr] md:gap-20">
          <div>
            <p className="stationery stationery-light">Ready when you are</p>
            <p className="display display-md mt-6 max-w-[16ch]">
              <span className="whisper text-[#f4f0e9]/70">Leave the</span> mess <span className="whisper text-[#f4f0e9]/70">for</span> us.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/book" className="btn btn-light">Request a clean</Link>
              <a href={SITE.phoneHref} className="btn border-[#f4f0e9]/35 bg-transparent text-[#f4f0e9] hover:bg-[#f4f0e9] hover:text-[#1a1714]">
                {SITE.phone}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 text-[0.9rem]">
            <div>
              <p className="stationery stationery-light mb-5">Services</p>
              <ul className="-my-1.5">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className="lnk inline-block py-[7px] text-[#f4f0e9]/80 hover:text-[#f4f0e9]">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="stationery stationery-light mb-5">Where we clean</p>
              <ul className="-my-1.5">
                {AREAS.slice(0, 7).map((a) => (
                  <li key={a.slug}>
                    <Link href={`/service-areas/${a.slug}`} className="lnk inline-block py-[7px] text-[#f4f0e9]/80 hover:text-[#f4f0e9]">{a.name}</Link>
                  </li>
                ))}
                <li><Link href="/service-areas" className="lnk inline-block py-[7px] text-[#f4f0e9]/60">All areas</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-[#f4f0e9]/14 pt-7 text-[0.74rem] text-[#f4f0e9]/55 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.legalName}. Licensed &amp; insured &middot; {SITE.hours}
          </p>
          <p className="flex flex-wrap items-center gap-x-6">
            <a href={SITE.facebook} className="lnk inline-block py-[7px]" rel="noopener noreferrer" target="_blank">Facebook</a>
            <a href={SITE.nextdoor} className="lnk inline-block py-[7px]" rel="noopener noreferrer" target="_blank">Nextdoor</a>
            <Link href="/privacy" className="lnk inline-block py-[7px]">Privacy</Link>
            <Link href="/accessibility" className="lnk inline-block py-[7px]">Accessibility</Link>
          </p>
        </div>

        {/* 904 site-branding */}
        <p className="pb-6 pt-8 text-[0.68rem] tracking-[0.14em] text-[#f4f0e9]/60">
          Site by{' '}
          <a href="https://weare904digitalmedia.com" target="_blank" rel="noopener noreferrer" className="lnk">
            904 Digital Media
          </a>
        </p>
      </div>

      {/* monumental cropped wordmark — letterforms cropped by the viewport edges.
          Rendered as a CSS pseudo-element: pure ornament, never DOM text. */}
      <div aria-hidden="true" className="wm wm-foot pointer-events-none h-[clamp(3.4rem,15vw,14rem)] select-none overflow-hidden"
           data-wm="ACE & ASH" />
    </footer>
  );
}
