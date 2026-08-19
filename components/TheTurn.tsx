'use client';
import { useEffect, useRef, useState } from 'react';
import Photo from './Photo';

/* THE SHOWSTOPPER — "The Turn".
   Vertical scroll → horizontal slideshow → back to vertical (Ryan's stated
   favourite mechanic; Taste Profile principle 10, axis variation).
   Driven by NATIVE scroll only: the section is tall, the panel is sticky, and
   the track is translated by scroll progress. The scrollbar is never swallowed.
   Display type runs ACROSS the seams between frames (principle 12). */

const ROOMS = [
  { k: 'kitchen',  img: '/images/kitchen.jpg',  label: 'Kitchen',      lead: 'Counters',  tail: 'cleared, not shuffled.' },
  { k: 'bath',     img: '/images/bath.jpg',     label: 'Bathrooms',    lead: 'Grout',     tail: 'worked, not wiped.' },
  { k: 'bedroom',  img: '/images/bedroom.jpg',  label: 'Bedrooms',     lead: 'Linens',    tail: 'squared, corners crisp.' },
  { k: 'hall',     img: '/images/hall.jpg',     label: 'Floors',       lead: 'Edges',     tail: 'by hand, every time.' },
];

export default function TheTurn() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(mq.matches && !rm.matches);
    sync();
    mq.addEventListener('change', sync); rm.addEventListener('change', sync);
    return () => { mq.removeEventListener('change', sync); rm.removeEventListener('change', sync); };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(total <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / total)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [enabled]);

  const Frame = ({ r, i }: { r: (typeof ROOMS)[number]; i: number }) => (
    <div className="relative h-full w-[86vw] flex-none lg:w-[62vw]">
      <Photo src={r.img} alt={`${r.label} in a coastal Florida home, freshly cleaned by Ace & Ash`}
        ratio="auto" className="!aspect-auto h-full w-full" sizes="(min-width:1024px) 62vw, 86vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714]/62 via-transparent to-[#1a1714]/18" />
      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
        <p className="stationery stationery-light">{String(i + 1).padStart(2, '0')} &middot; {r.label}</p>
        <p className="display display-sm mt-3 text-[#f4f0e9]">
          {r.lead} <span className="whisper text-[#f4f0e9]/78">{r.tail}</span>
        </p>
      </div>
    </div>
  );

  const heading = (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#1a1714]/58 to-transparent pb-24 pt-[9.5rem] px-[var(--gut)]">
      <p className="display text-[#f4f0e9]" style={{ fontSize: 'clamp(2.2rem, 6.4vw, 6rem)' }}>
        <span className="whisper">room</span> BY <span className="whisper">room</span>
      </p>
    </div>
  );

  if (!enabled) {
    return (
      <section aria-labelledby="turn-h" className="a11y-keep bg-[#1a1714] py-16">
        <div className="shell">
          <p className="stationery stationery-light">The Ace &amp; Ash walk-through</p>
          <h2 id="turn-h" className="display display-md mt-4 text-[#f4f0e9] reveal-soft">
            <span className="whisper text-[#f4f0e9]/70">room</span> BY <span className="whisper text-[#f4f0e9]/70">room</span>
          </h2>
        </div>
        <div className="rail mt-10 gap-4 px-[var(--gut)] pb-4" tabIndex={0} role="region" aria-label="Room by room, scroll horizontally">
          {ROOMS.map((r, i) => (
            <div key={r.k} className="relative h-[68vh] w-[86vw] flex-none"><Frame r={r} i={i} /></div>
          ))}
        </div>
        <p className="shell stationery stationery-light mt-2">Swipe &rarr;</p>
      </section>
    );
  }

  const shift = p * (ROOMS.length - 1) * 62;

  return (
    <section ref={wrapRef} aria-labelledby="turn-h" className="a11y-keep relative bg-[#1a1714]"
      style={{ height: `${ROOMS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <h2 id="turn-h" className="sr-only">Room by room — what a clean actually covers</h2>
        {heading}
        <div className="flex h-full items-stretch gap-6 pl-[var(--gut)] will-change-transform"
          style={{ transform: `translate3d(${-shift}vw, 0, 0)`, transition: 'transform 120ms linear' }}>
          {ROOMS.map((r, i) => <Frame key={r.k} r={r} i={i} />)}
          <div className="flex h-full w-[46vw] flex-none items-center pr-[var(--gut)]">
            <div>
              <p className="stationery stationery-light">And then</p>
              <p className="display display-md mt-4 max-w-[14ch] text-[#f4f0e9]">
                <span className="whisper text-[#f4f0e9]/70">we</span> LEAVE <span className="whisper text-[#f4f0e9]/70">and you</span> forget <span className="whisper text-[#f4f0e9]/70">we were here.</span>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-[var(--gut)] right-[var(--gut)] flex items-center gap-4">
          <span className="stationery stationery-light">Keep scrolling</span>
          <span className="h-px flex-1 bg-[#f4f0e9]/18">
            <span className="block h-px bg-[#f4f0e9]/70" style={{ width: `${p * 100}%` }} />
          </span>
        </div>
      </div>
    </section>
  );
}
