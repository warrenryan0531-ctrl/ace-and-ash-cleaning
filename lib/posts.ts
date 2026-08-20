/* The journal. Written for people who are about to hire a cleaner and are
   trying to work out what they actually need — not keyword filler.

   Local detail is real Northeast Florida: summer humidity in grout and
   exhaust fans, spring oak pollen, salt air at the beaches, and builder dust
   in the newer Nocatee / Durbin / RiverTown houses. */

export type Block =
  | { h2: string }
  | { p: string }
  | { ul: string[] };

export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string;      // ISO, for <time> and schema
  dateLabel: string;
  read: string;
  image: string;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: 'what-a-deep-clean-includes',
    title: 'What a deep clean actually includes',
    dek: 'And an honest way to tell whether your house needs one, or just needs somebody to come every other week.',
    date: '2026-07-14',
    dateLabel: 'July 2026',
    read: '5 min',
    image: '/images/bath.jpg',
    body: [
      { p: 'Nearly every quote starts with the same question, asked slightly nervously: is this a regular clean or a deep clean? People ask because the price is different and they do not want to be sold the bigger one. Fair enough. Here is the difference in plain terms.' },
      { h2: 'A standard clean is about surfaces you touch' },
      { p: 'Counters, sinks, toilets, showers, mirrors, floors, the outside of the appliances. It is the clean that keeps a house feeling right week to week. On a house that is already in rhythm it is quick, thorough work, and it is the reason recurring visits cost less than one-off ones.' },
      { h2: 'A deep clean is about everything else' },
      { p: 'The parts of a house that a normal week genuinely never reaches. Not because anyone is cutting corners, but because there is no time for them when you are also doing the floors.' },
      { ul: [
        'Baseboards, trim, and door frames, done by hand rather than with a mop edge',
        'Inside the oven and inside the fridge',
        'Grout and shower glass worked with a brush, not wiped with a cloth',
        'Ceiling fans, air vents, and light fixtures',
        'Window and sliding-door tracks',
        'Behind and underneath the furniture that does not normally move',
      ]},
      { p: 'It takes two to three times as long as a standard visit. That is the whole reason for the price difference.' },
      { h2: 'How to tell which one you need' },
      { p: 'Run your finger along the top edge of a door frame and look at it. Open the bathroom exhaust fan cover. Look at the grout line where the shower wall meets the floor. If those three spots are fine, you probably need a regular clean and a schedule. If they are not, a deep clean will reset the house and everything after it gets easier.' },
      { h2: 'The Florida part' },
      { p: 'Two local things push houses here toward a deep clean sooner than they would elsewhere. The first is humidity. Bathroom grout and exhaust fans in Northeast Florida hold moisture in a way they simply do not up north, and mildew starts in the grout line long before you can see it on the tile. The second is pollen. Oak pollen in the spring gets into window tracks, lanai screens, and ceiling fan blades, and it does not vacuum out of soft surfaces on its own.' },
      { p: 'There is a third if your house is newer. A lot of the homes in Nocatee, Durbin Crossing, and RiverTown are recent construction, and builder dust keeps working its way out of vents and trim for months after closing. If you moved in within the last year and have never had the vents and baseboards done, that is worth a single deep clean.' },
      { h2: 'What we would actually tell you' },
      { p: 'Most houses want a deep clean once or twice a year and a regular rhythm in between. If you are on a schedule with us and the house is holding, we are not going to talk you into an annual deep clean you do not need. And if you call for a regular clean and the house needs more than that, you will hear it before we start rather than after.' },
    ],
  },
  {
    slug: 'move-out-clean-deposit',
    title: 'The move-out clean that gets your deposit back',
    dek: 'What a landlord or property manager in St. Johns County is actually looking at when they walk the house.',
    date: '2026-06-09',
    dateLabel: 'June 2026',
    read: '6 min',
    image: '/images/kitchen.jpg',
    body: [
      { p: 'A move-out clean is a different job from a normal clean, and the difference is not effort. It is scope. An empty house has no furniture hiding anything, and every cabinet and drawer that was full last week is now something an inspector is going to open.' },
      { h2: 'Where deposits actually get withheld' },
      { p: 'It is rarely the floors. In practice the deductions cluster in a short list of places, and almost all of them are places people forget because they were full of belongings until the day before.' },
      { ul: [
        'Inside kitchen cabinets and drawers — crumbs, liner residue, sticky rings',
        'Inside the oven, and the drip pans under the burners',
        'The fridge, including the seals and the drawer runners',
        'The dryer lint trap and the cabinet it sits in',
        'Bathroom exhaust fan covers',
        'Window tracks and the sliding-door channel',
        'Baseboards, and the marks furniture left on the walls above them',
        'The garage floor, which almost nobody thinks of as part of the house',
      ]},
      { h2: 'Take photographs, and take them after' },
      { p: 'This is the single most useful thing a tenant can do, and it costs nothing. Photograph every room after the clean, with the date on the file. If there is ever a dispute, you are not arguing about memory. When we do a move-out clean we will take those photos for you on request and send them across, which is worth asking for whether you use us or somebody else.' },
      { h2: 'Timing it around a closing' },
      { p: 'The mistake is booking the clean for the same day as the walkthrough. If anything needs a second pass — a stubborn oven, a garage that turned out worse than expected — you have no room. Book the clean for the day before the inspection wherever you can. Around here, closings cluster at the end of the month, and so do move-out cleans. A week of notice matters more in the last week of the month than in the first.' },
      { h2: 'Read your lease before you book anything' },
      { p: 'Some leases in this area specify carpet cleaning by a professional with a receipt, and a house cleaner is not that. Some specify the condition the lawn has to be in. Those are separate line items and no cleaning company can cover them for you. Check what your lease actually asks for, then book to that list rather than to a generic idea of clean.' },
      { h2: 'If you are the one moving in' },
      { p: 'The other half of this job is worth saying out loud. A house that has been sitting empty between owners collects dust in every vent, and whatever the previous occupants left behind is now in your cabinets. Getting the inside of the cabinets, the appliance interiors, and the vents done before your furniture arrives is much cheaper than doing it around your furniture a month later.' },
    ],
  },
  {
    slug: 'cleaning-with-babies-and-pets',
    title: 'Cleaning a house with a crawling baby and a shedding dog',
    dek: 'What changes when the people using the floor are closest to it — and what you can reasonably ask a cleaner to do differently.',
    date: '2026-05-19',
    dateLabel: 'May 2026',
    read: '5 min',
    image: '/images/bedroom.jpg',
    body: [
      { p: 'A lot of the houses on our books have somebody in them who spends their day on the floor. Sometimes that is a baby who has just worked out how to move. Sometimes it is a dog, or an elderly parent who has moved in, or somebody going through treatment whose sense of smell has turned against them. It changes what a good clean looks like.' },
      { h2: 'The floor stops being decoration' },
      { p: 'When somebody is crawling, the floor is the surface they touch most and the one closest to their face. That moves the priority from “looks clean” to “is clean and does not smell like anything.” A floor that has been mopped with something strongly scented is not a neutral surface for a baby who is about to put their hands in their mouth.' },
      { h2: 'You can ask for water only' },
      { p: 'Most household cleaning is mechanical, not chemical. Hot water, a good microfiber cloth, and actual pressure will handle most of a house. Chemicals earn their place in specific spots — a toilet, a kitchen after raw meat, mildew in grout — and are largely optional everywhere else.' },
      { p: 'If you want your floors and surfaces done with water only, say so. If you would rather we used products you have already chosen and left out, that works too. It is your house and your family, and no cleaner should make you feel awkward for having a preference.' },
      { h2: 'Pet hair is a vacuum problem, not a mopping problem' },
      { p: 'The most common complaint we hear from new clients about their last cleaner is hair reappearing a day later. That is usually because it was mopped over rather than lifted out. Hair works into the edges of rooms, the seam where carpet meets baseboard, and upholstery. It has to come out of those places with suction and an edge tool before anything wet happens. If you have a shedding dog, that is the step worth checking.' },
      { h2: 'The things worth doing yourself between visits' },
      { p: 'None of this requires a cleaner, and all of it makes the professional visits work better.' },
      { ul: [
        'Wash pet bedding on a schedule you actually keep, not an aspirational one',
        'Run the bathroom exhaust fan for a while after showers — humidity here rewards this',
        'Wipe the bottom two feet of the walls occasionally; that is the zone everybody misses and crawlers touch most',
        'Keep one low cabinet genuinely child-safe rather than trying to lock every one of them',
      ]},
      { h2: 'Why we care about this one' },
      { p: 'Erica started Ace & Ash helping elderly and disabled clients and overwhelmed parents — people for whom the house had become one more thing that was not going well. That is still most of who calls. If your house is in a state you feel embarrassed about, you are describing the exact situation this company was started for. Yours will not be the worst house anybody has seen this month.' },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
