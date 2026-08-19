import { SITE, AREAS } from '@/lib/site';

/* 904 standard: service-area map (service-area-map skill), adapted for a
   SERVICE-AREA business.

   Two facts drove the implementation, both verified on Google Maps 2026-08-19:
   1. Ace & Ash has NO public street address. Google renders no map marker for
      the listing at all — competitors in the same result set are pinned, she
      isn't. There is no storefront to pin, and her home address must never be
      published. So the pin marks Nocatee, where she's based, not a fake shop.
   2. Google's keyless `output=embed` iframe rendered a broken, never-loading
      white place-card over the map in every variant tried (business query,
      city query, classic `maps.google.com` form). Not shippable.

   So the rendered map is OpenStreetMap: keyless, deterministic, draws a real
   marker, and sets no third-party cookies — which also means it needs no
   cookie-consent gate and adds nothing to the critical path. Google is still
   one click away via the link, which is where the local-SEO value actually
   sits for a business with no address to rank. */

const NOCATEE = { lat: 30.0844, lon: -81.409 };
// Bbox spans Jacksonville down to St. Augustine — the real service footprint.
const BBOX = [-81.86, 29.83, -81.19, 30.42].join('%2C');
const OSM = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${NOCATEE.lat}%2C${NOCATEE.lon}`;

export default function ServiceAreaMap() {
  return (
    <section
      aria-labelledby="map-h"
      className="border-t border-[#d6cfc2] bg-[#f4f0e9] py-[clamp(3.5rem,9vh,6rem)] no-print"
    >
      <div className="shell grid items-start gap-x-16 gap-y-10 md:grid-cols-[0.85fr_1.15fr]">
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
            className="stationery lnk mt-8 inline-block reveal-soft"
          >
            Find us on Google &rarr;
          </a>
        </div>

        {/* No reveal-soft on this column: the fade/transform leaves the box
            effectively sized at zero while Leaflet initialises inside the
            iframe, so the map paints blank until something forces a reload.
            The map arrives without the fade — correct beats choreographed. */}
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#d6cfc2] bg-[#ebe5db]">
            <iframe
              title="Map of the Ace &amp; Ash Cleaning service area, centred on Nocatee, Florida"
              src={OSM}
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <p className="stationery mt-3.5 text-[#6b6459]">
            Based in {SITE.baseCity} &middot; we travel to you
          </p>
        </div>
      </div>
    </section>
  );
}
