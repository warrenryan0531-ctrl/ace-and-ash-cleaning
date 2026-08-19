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
  url: "https://aceandash.vercel.app",
  hours: "Monday to Friday, 8:00am to 6:00pm",
  tagline: "Leave the mess for us.",
} as const;

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
    body: "Weekly, every other week, or monthly. You get the same small team each visit, so nobody has to be told twice where the good glasses live or which dog hides under the bed.",
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
    body: "Booking larger commercial work since summer 2026. Offices, storefronts, salons, and churches across Duval, Clay, and St. Johns, cleaned on a schedule that stays out of your business day.",
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
  { slug: "durbin-crossing", name: "Durbin Crossing & Rivertown", county: "St. Johns County", note: "Newer construction, move-ins, and post-builder cleans." },
  { slug: "jacksonville-beach", name: "Jacksonville Beach", county: "Duval County", note: "Beach houses, sand, and salt air handled properly." },
  { slug: "jacksonville", name: "Jacksonville", county: "Duval County", note: "Southside, Mandarin, and the San Marco side of the river." },
  { slug: "orange-park", name: "Orange Park", county: "Clay County", note: "Recurring homes and commercial work across Clay." },
];

export const STANDARD = [
  {
    room: "Kitchen",
    count: 14,
    items: [
      "Counters cleared, cleaned, and put back",
      "Sink and faucet descaled and dried",
      "Cabinet fronts and handles",
      "Exterior of every appliance",
      "Inside the microwave",
      "Backsplash and switch plates",
      "Table and chairs, legs included",
      "Floor edges and corners by hand",
    ],
  },
  {
    room: "Bathrooms",
    count: 13,
    items: [
      "Shower walls, door, and track",
      "Grout lines worked, not just wiped",
      "Toilet, base, and behind the base",
      "Vanity, sink, and fixtures dried to no spots",
      "Mirror, frame, and light bar",
      "Towels folded and squared",
      "Floor edges and behind the door",
    ],
  },
  {
    room: "Bedrooms & living",
    count: 12,
    items: [
      "Beds made, linens changed when left out",
      "All reachable surfaces dusted",
      "Baseboards and window sills",
      "Under and behind reachable furniture",
      "Mirrors and glass",
      "Vacuum lines left straight",
    ],
  },
  {
    room: "Everywhere",
    count: 10,
    items: [
      "Light switches, handles, and pulls",
      "Ceiling fan blades",
      "Interior door frames",
      "Trash out, liners replaced",
      "Entry mat shaken and squared",
      "A written note of anything we noticed",
    ],
  },
];
