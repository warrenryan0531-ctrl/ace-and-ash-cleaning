import { SITE, AREAS } from '@/lib/site';
import MapArt from '@/components/MapArt';

/* 904 standard: the service-area map (service-area-map skill), adapted for a
   business with no storefront.

   Verified on Google Maps 2026-08-19: Ace & Ash has no public street address
   and Google draws no map pin for the listing — competitors in the same result
   set are pinned, she isn't. There is nothing to pin, and her home address must
   never be published. The map marks Nocatee, where she's based, and the link
   sends people to the real Google listing, which is where the local-SEO value
   sits for a business with no address to rank.

   The map itself is drawn, not embedded — see MapArt for why. */

export default function ServiceAreaMap() {
  return (
    <section
      aria-labelledby="map-h"
      className="border-t border-[#d6cfc2] bg-[#f4f0e9] py-[clamp(3.5rem,9vh,6rem)] no-print"
    >
      <div className="shell grid items-center gap-x-16 gap-y-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="stationery reveal-soft">Where we clean</p>
          <h2 id="map-h" className="display display-sm mt-4 max-w-[14ch] reveal-soft">
            St. Johns <span className="whisper">and the</span> south side.
          </h2>
          <p className="mt-6 max-w-[38ch] text-[0.95rem] leading-relaxed text-[#4a443b] reveal-soft">
            Based in {SITE.baseCity}, {SITE.region}. We come to you &mdash; there&rsquo;s no shop to
            visit, just a van in your driveway at the time we agreed on.
          </p>
          <ul className="stationery mt-8 grid gap-x-8 gap-y-2.5 text-[#6b6459] sm:grid-cols-2 reveal-soft">
            {AREAS.map((a) => (
              <li key={a.slug}>{a.name}</li>
            ))}
          </ul>
          <a
            href={SITE.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="stationery lnk mt-9 inline-block reveal-soft"
          >
            Find us on Google &rarr;
          </a>
        </div>

        <figure className="m-0 reveal-soft">
          <MapArt />
          <figcaption className="stationery mt-4 text-[#6b6459]">
            Based in {SITE.baseCity} &middot; we travel to you
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
