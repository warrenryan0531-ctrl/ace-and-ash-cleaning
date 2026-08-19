'use client';
import { useEffect, useState } from 'react';
import { SITE, AREAS } from '@/lib/site';

/* 904 standard: service-area map (service-area-map skill).
   Ace & Ash is a SERVICE-AREA business — the GBP has no public street address
   (verified on Google Maps 2026-08-19), so this centers on the service area
   rather than inventing a storefront pin. Her home address is intentionally
   not published and must never be.

   Loaded behind a FACADE: the Google iframe sets third-party cookies, and this
   site ships a consent bar. No iframe until the visitor has accepted cookies or
   explicitly asks for the map. Keeps every page's footer free of Google's
   payload too. */

const CONSENT_KEY = 'cookie:aceandash';
const EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  'Ace & Ash Cleaning, Nocatee, FL'
)}&z=10&output=embed`;

export default function ServiceAreaMap() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === 'all') setLive(true);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section aria-labelledby="map-h" className="border-t border-[#d6cfc2] bg-[#f4f0e9] py-[clamp(3.5rem,9vh,6rem)] no-print">
      <div className="shell grid items-start gap-x-16 gap-y-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="stationery reveal-soft">Where we clean</p>
          <h2 id="map-h" className="display display-sm mt-4 max-w-[14ch] reveal-soft">
            St. Johns <span className="whisper">and the</span> south side.
          </h2>
          <p className="mt-6 max-w-[38ch] text-[0.95rem] leading-relaxed text-[#4a443b] reveal-soft">
            Based in {SITE.baseCity}, {SITE.region}. We come to you — there&rsquo;s no shop to visit,
            just a van in your driveway at the time we agreed on.
          </p>
          <a
            href={SITE.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="stationery lnk mt-8 inline-block reveal-soft"
          >
            Open in Google Maps &rarr;
          </a>
        </div>

        <div className="reveal-soft">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#d6cfc2] bg-[#ebe5db]">
            {live ? (
              <iframe
                title="Map of the Ace &amp; Ash Cleaning service area around Nocatee, Florida"
                src={EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              /* Facade for anyone who hasn't accepted cookies. Not a fake map —
                 no invented geography — just the real area list set as type, so
                 the panel carries weight instead of sitting empty. */
              <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
                {/* Real content, so it must be readable — #6b6459 on #ebe5db is 4.67:1,
                    clears AA. Ghosting it to a decorative tint failed the axe gate. */}
                <p className="display text-[clamp(1.05rem,2vw,1.5rem)] leading-[1.5] text-[#6b6459]">
                  {AREAS.map((a) => a.name).join(' · ')}
                </p>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <p className="max-w-[26ch] text-[0.8rem] leading-relaxed text-[#6b6459]">
                    Google&rsquo;s map sets its own cookies, so we load it only on request.
                  </p>
                  <button type="button" onClick={() => setLive(true)} className="btn flex-none">
                    Show the map
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="stationery mt-3.5 text-[#6b6459]">
            Service area &middot; we travel to you
          </p>
        </div>
      </div>
    </section>
  );
}
