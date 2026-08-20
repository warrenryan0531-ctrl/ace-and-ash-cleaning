/* Content for /pricing, /first-clean and /journal.

   PRICING NOTE (Ryan, 2026-08-19): these ranges are MARKET ESTIMATES, not
   Erica's confirmed prices. They're anchored to 2026 national and Jacksonville
   figures for a licensed, insured, single-crew service, positioned for the
   St. Johns County market — deliberately at the upper-middle, not the
   $20/hr gig-app floor. Every figure is presented on the page as a starting
   estimate subject to a walkthrough. CONFIRM WITH ERICA BEFORE PROMOTING. */

export type PriceBand = {
  slug: string;
  title: string;
  from: string;
  range: string;
  cadence: string;
  blurb: string;
  includes: string[];
};

export const PRICING: PriceBand[] = [
  {
    slug: 'recurring-care',
    title: 'Recurring care',
    from: 'from $140',
    range: '$140 – $220 a visit',
    cadence: 'Weekly · Biweekly · Monthly',
    blurb:
      'Most homes on our books are three- or four-bedroom houses cleaned every other week, and they land in the middle of that range. Weekly homes cost less per visit because there is less to catch up on.',
    includes: [
      'Kitchen and bathrooms cleaned properly, not wiped',
      'Floors vacuumed and mopped throughout',
      'Dusting, surfaces, mirrors, and glass',
      'Beds made, or linens changed if you leave them out',
      'The same small team every visit',
    ],
  },
  {
    slug: 'deep-clean',
    title: 'Deep clean',
    from: 'from $300',
    range: '$300 – $500 one time',
    cadence: 'Once or twice a year',
    blurb:
      'A deep clean is priced on condition, not just square footage. A house that has been kept up costs less than one that has been waiting a while — and we will tell you honestly which one yours is.',
    includes: [
      'Everything in a standard clean, then further',
      'Baseboards, trim, and door frames by hand',
      'Inside the oven and fridge on request',
      'Grout, tile, and shower glass worked',
      'Fans, vents, and light fixtures',
    ],
  },
  {
    slug: 'move-in-move-out',
    title: 'Move in & move out',
    from: 'from $350',
    range: '$350 – $600 one time',
    cadence: 'One time',
    blurb:
      'Empty houses take longer than people expect, because every cabinet and drawer is now in scope. Priced on bedroom and bathroom count, scheduled around your closing or lease date.',
    includes: [
      'Inside every cabinet, drawer, and closet',
      'Appliance interiors and behind where they sat',
      'Scheduled around closings and lease deadlines',
      'Photos on request for your landlord or agent',
    ],
  },
  {
    slug: 'home-organizing',
    title: 'Home organizing',
    from: 'by the session',
    range: 'Quoted by the session',
    cadence: 'By the session',
    blurb:
      'Organizing is hard to price sight unseen, because a pantry and a garage are not the same afternoon. Erica will look at the space and give you a flat number for the session before anything starts.',
    includes: [
      'Pantries, closets, garages, and playrooms',
      'Sorted with you, so nothing goes missing',
      'Donation runs taken off your hands',
      'Unhurried help with heavier clear-outs',
    ],
  },
  {
    slug: 'commercial',
    title: 'Offices, retail & churches',
    from: 'quoted',
    range: 'Quoted per contract',
    cadence: 'Nightly · Weekly · Monthly',
    blurb:
      'Commercial work is quoted on square footage, frequency and how late you need us. Evening and weekend schedules are normal here, and the crew is named on the contract.',
    includes: [
      'Offices, retail, salons, and churches',
      'Evening and weekend scheduling',
      'Licensed and insured, with a named crew',
      'Recurring contracts across Duval, Clay & St. Johns',
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'How do you decide what my house costs?',
    a: 'Erica prices the house in front of her, not a square-foot table. Size matters, but so does condition, how many bathrooms you have, whether there are pets, and how often you want us back. You get a number before anyone starts, and it does not move unless you ask for something different on the day.',
  },
  {
    q: 'Why is the first clean more than the ones after it?',
    a: 'Because the first one is usually a deep clean. The first visit sets the baseline — the places a normal week never reaches get caught up, and after that the recurring price holds. If your house is already well kept, say so, and Erica will quote the first visit accordingly.',
  },
  {
    q: 'Do I need to be home?',
    a: 'No, and most of our recurring clients are not. Plenty of people leave a door code or a key. Whatever you are comfortable with is fine, and the same small team comes each time, so you are not handing your house to a stranger every visit.',
  },
  {
    q: 'What do you clean with?',
    a: 'Tell us what you want used in your home and that is what gets used. Homes with crawling babies, pets, or anyone sensitive to fumes are common on our books, and low-chemical and water-only methods are available for those houses. If you have products you prefer, leave them out and we will use them.',
  },
  {
    q: 'Do I need to tidy before you come?',
    a: 'Not for our sake. Clearing clutter off the counters and floors means more of your money goes into cleaning, but nobody is going to judge your house. Erica started this company helping people whose houses had gotten away from them.',
  },
  {
    q: 'What if something gets damaged?',
    a: 'Ace & Ash is licensed and insured. If something gets broken, you will hear about it from us before you find it yourself, and it gets made right.',
  },
  {
    q: 'How far ahead do I need to book?',
    a: 'Recurring spots are the ones that go first, and they are usually spoken for a few weeks out. One-time and deep cleans are easier to fit in. The honest answer changes month to month, so call and ask.',
  },
  {
    q: 'What if I am not happy with the clean?',
    a: 'Call the same day or the next morning and Erica will come back and put it right. That is the whole policy. It does not happen often, which is a large part of why there are thirty-three five-star reviews and nothing below them.',
  },
  {
    q: 'Do you charge for cancellations?',
    a: 'Life happens and we would rather keep you than fine you. Give as much notice as you can so the slot can go to somebody else. Repeated same-day cancellations are the only thing that becomes a problem, and we would talk to you about it first.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'Based in Nocatee, working across St. Johns, Duval, and Clay counties — Ponte Vedra, St. Augustine, World Golf Village, Palencia, Julington Creek, Fruit Cove, Durbin Crossing, RiverTown, Jacksonville Beach, Jacksonville and Orange Park.',
  },
];
