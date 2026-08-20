export const SITE = {
  name: "Ace & Ash",
  legalName: "Ace & Ash Cleaning",
  longName: "Ace & Ash Home Cleaning Service",
  owner: "Erica Taylor",
  phone: "904-944-2218",
  phoneHref: "tel:+19049442218",
  smsHref: "sms:+19049442218",
  email: "hello@aceandashcleaning.com",
  ownerEmail: "etaylorr713@gmail.com",
  facebook: "https://www.facebook.com/p/Ace-Ash-Cleaning-61571910280404/",
  nextdoor: "https://nextdoor.com/pages/ace-ash-cleaning-jacksonville-il/",
  baseCity: "Nocatee",
  region: "FL",
  url: "https://ace-and-ash.vercel.app",
  hours: "Monday to Friday, 8:00am to 6:00pm",
  tagline: "Leave the mess for us.",
  googleRating: 5.0,
  googleReviews: 33,
  googleUrl: "https://www.google.com/maps/search/Ace+%26+Ash+Cleaning+Nocatee+FL",
} as const;

/* Verified 2026-08-19 against the live Google Business Profile and Facebook page.
   Real quotes only — never invent a reviewer or a number (taste principle 7). */
export const REVIEWS = [
  { quote: "100% the only cleaning company I would ever allow in my home!", source: "Google review" },
  { quote: "Ace & Ash Cleaning completely saved the day.", source: "Google review" },
  { quote: "Erica and her team are so kind and caring. They genuinely care about their clients and want to help any\u2026", source: "Kye Dozier, on Facebook" },
];

export type Service = {
  n: string;
  slug: string;
  title: string;
  lede: string;
  body: string;
  detail: string[];
  cadence: string;
};

export const SERVICES: Service[] = [
  {
    n: "01",
    slug: "recurring-care",
    title: "Recurring care",
    lede: "The same home, the same hands, on a rhythm you stop thinking about.",
    body: "Weekly, every other week, or monthly. You get the same small team each visit, so your house stops needing an introduction.",
    detail: [
      "Weekly, biweekly, or monthly",
      "Same team every visit",
      "Your notes carried forward from the last clean",
      "Priority on the calendar before new one-time work",
    ],
    cadence: "Weekly · Biweekly · Monthly",
  },
  {
    n: "02",
    slug: "deep-clean",
    title: "Deep clean",
    lede: "For the places a normal week never reaches.",
    body: "Baseboards, door frames, inside the oven, behind the toilet, the top of the fridge, the tracks of the sliding door. It is the clean that resets a house, and most homes want one once or twice a year.",
    detail: [
      "Baseboards, trim, and door frames by hand",
      "Inside oven, inside fridge, inside cabinets on request",
      "Grout, tile, and shower glass worked, not wiped",
      "Fans, vents, and light fixtures",
    ],
    cadence: "One time · Twice a year",
  },
  {
    n: "03",
    slug: "move-in-move-out",
    title: "Move in & move out",
    lede: "An empty house, left the way you would want to find it.",
    body: "Timed to your closing or your lease end, documented when you need it for a deposit. Every drawer, every shelf, every corner an inspection is going to open.",
    detail: [
      "Empty-home deep clean, inside every cabinet and drawer",
      "Appliance interiors and behind where they sat",
      "Scheduled around closing dates and lease deadlines",
      "Photos on request for your landlord or agent",
    ],
    cadence: "One time",
  },
  {
    n: "04",
    slug: "home-organizing",
    title: "Home organizing",
    lede: "Clean is the easy half. Where things belong is the other half.",
    body: "Pantries, closets, garages, playrooms, and the drawer everybody has. We sort with you, not around you, and we leave a system you can actually keep.",
    detail: [
      "Pantry, closet, garage, and playroom systems",
      "Sorted with you, so nothing goes missing",
      "Donation runs taken off your hands",
      "Sensitive, unhurried help with heavier clear-outs",
    ],
    cadence: "By the session",
  },
  {
    n: "05",
    slug: "commercial",
    title: "Offices, retail & churches",
    lede: "The same standard, after hours.",
    body: "We have been taking on larger commercial contracts since summer 2026. Offices, storefronts, salons, and churches across Duval, Clay, and St. Johns, cleaned on a schedule that stays out of your business day.",
    detail: [
      "Offices, retail, salons, and churches",
      "Evening and weekend scheduling",
      "Licensed and insured, with a named crew",
      "Recurring contracts across Duval, Clay & St. Johns",
    ],
    cadence: "Nightly · Weekly · Monthly",
  },
];

export const AREAS = [
  { slug: "nocatee", name: "Nocatee", county: "St. Johns County", note: "Home base. Same-week openings are most common here." },
  { slug: "ponte-vedra", name: "Ponte Vedra", county: "St. Johns County", note: "Beach homes, second homes, and rentals between guests." },
  { slug: "st-augustine", name: "St. Augustine", county: "St. Johns County", note: "From the historic district out to the beaches." },
  { slug: "world-golf-village", name: "World Golf Village", county: "St. Johns County", note: "Recurring care across the village and its surrounding gates." },
  { slug: "palencia", name: "Palencia", county: "St. Johns County", note: "Recurring and deep-clean work throughout the community." },
  { slug: "julington-creek", name: "Julington Creek & Fruit Cove", county: "St. Johns County", note: "Family homes on a weekly and biweekly rhythm." },
  { slug: "durbin-crossing", name: "Durbin Crossing & RiverTown", county: "St. Johns County", note: "Newer construction, move-ins, and post-builder cleans." },
  { slug: "jacksonville-beach", name: "Jacksonville Beach", county: "Duval County", note: "Beach houses, sand, and salt air handled properly." },
  { slug: "jacksonville", name: "Jacksonville", county: "Duval County", note: "Southside, Mandarin, and the San Marco side of the river." },
  { slug: "orange-park", name: "Orange Park", county: "Clay County", note: "Recurring homes and commercial work across Clay." },
];

/* The checklist. `count` is DERIVED from items.length below — never hardcode
   it. The page and the homepage both advertise the total, and a number a
   visitor can sit and count has to be true or the whole "hold us to it"
   promise collapses. It was 49-claimed / 27-listed before this was fixed. */
const ROOMS = [
  {
    room: "Kitchen",
    items: [
      "Counters cleared, cleaned, and put back",
      "Sink and faucet descaled and dried",
      "Sink drain and disposal rinsed",
      "Cabinet fronts and handles",
      "Exterior of every appliance",
      "Inside the microwave",
      "Stovetop, grates, and drip pans",
      "Range hood face and filter screen",
      "Small appliances wiped and put back",
      "Backsplash and switch plates",
      "Table and chairs, legs included",
      "Inside the trash cabinet and lid",
      "Windowsill over the sink",
      "Floor edges and corners by hand",
    ],
  },
  {
    room: "Bathrooms",
    items: [
      "Shower walls, door, and track",
      "Shower head and taps descaled",
      "Grout lines worked, not just wiped",
      "Soap dish, shelves, and shower caddy",
      "Toilet, base, and behind the base",
      "Vanity, sink, and fixtures dried to no spots",
      "Cabinet fronts and drawer handles",
      "Mirror, frame, and light bar",
      "Exhaust fan cover dusted",
      "Towel bars and paper holder",
      "Towels folded and squared",
      "Bin emptied and wiped out",
      "Floor edges and behind the door",
    ],
  },
  {
    room: "Bedrooms & living",
    items: [
      "Beds made, linens changed when left out",
      "Headboard and bed frame",
      "All reachable surfaces dusted",
      "Lamp bases and shades",
      "Picture frames and wall art",
      "Baseboards and window sills",
      "Blinds and window ledges",
      "Under and behind reachable furniture",
      "Cushions straightened, throws folded",
      "Remotes and switches wiped",
      "Mirrors and glass",
      "Vacuum lines left straight",
    ],
  },
  {
    room: "Everywhere",
    items: [
      "Light switches, handles, and pulls",
      "Ceiling fan blades",
      "Air vent covers",
      "Cobwebs cleared from ceiling corners",
      "Interior door frames",
      "Stair rails and banisters",
      "Floors vacuumed and mopped throughout",
      "Trash out, liners replaced",
      "Entry mat shaken and squared",
      "A written note of anything we noticed",
    ],
  },
] as const;

export const STANDARD = ROOMS.map((r) => ({ ...r, count: r.items.length }));
export const STANDARD_TOTAL = STANDARD.reduce((a, r) => a + r.count, 0);

