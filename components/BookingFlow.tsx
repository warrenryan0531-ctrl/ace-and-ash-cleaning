'use client';
import { useMemo, useState } from 'react';
import { SERVICES, SITE } from '@/lib/site';

const SIZES = ['1–2 bed', '3 bed', '4 bed', '5+ bed', 'Commercial space'];
const CONDITIONS = ['Pets in the home', 'Move-in or move-out', 'Post-construction dust', 'First deep clean', 'Organizing help too', 'Someone home during the visit'];
const WINDOWS = [
  { k: 'am', label: 'Morning', note: '8:00 – 12:00' },
  { k: 'pm', label: 'Afternoon', note: '12:00 – 6:00' },
  { k: 'either', label: 'Either is fine', note: 'Best chance of a soon date' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function iso(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

/* 904 Booking Hub — v1 appointment, APPROVE-EACH.
   Erica quotes per home and runs a waiting list, so nothing self-confirms:
   the customer requests a window, Erica approves it. ≤3 taps to the calendar. */
export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [size, setSize] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState('');
  const [win, setWin] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [err, setErr] = useState('');

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const lead = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + 2); return d; }, [today]);

  const grid = useMemo(() => {
    const base = new Date(today.getFullYear(), today.getMonth() + month, 1);
    const first = base.getDay();
    const days = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = Array(first).fill(null);
    for (let i = 1; i <= days; i++) cells.push(new Date(base.getFullYear(), base.getMonth(), i));
    return { base, cells };
  }, [today, month]);

  const usable = (d: Date) => { const w = d.getDay(); return w !== 0 && w !== 6 && d >= lead; };
  const pretty = (v: string) => {
    if (!v) return '';
    const [y, m, dd] = v.split('-').map(Number);
    const d = new Date(y, m - 1, dd);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending'); setErr('');
    const f = new FormData(e.currentTarget);
    const payload = {
      kind: 'Booking request',
      name: f.get('name'), phone: f.get('phone'), email: f.get('email'), address: f.get('address'),
      notes: f.get('notes'), company: f.get('company'),
      service, size, conditions, date: pretty(date), window: WINDOWS.find((w) => w.k === win)?.label ?? '',
      source: 'Booking flow',
    };
    try {
      const r = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || 'Could not send right now.');
      setState('done');
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="py-6">
        <p className="stationery">Request received</p>
        <p className="display display-md mt-5 max-w-[16ch]">
          <span className="whisper">thank you.</span> ERICA <span className="whisper">will reply within</span> 24 HOURS.
        </p>
        <p className="mt-7 max-w-[52ch] leading-relaxed text-[#68635b]">
          Nothing is on the calendar yet — she reviews every request herself so the quote fits your actual home.
          If you need her sooner, texting is fastest.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href={SITE.smsHref} className="btn">Text {SITE.phone}</a>
          <a href={SITE.phoneHref} className="btn btn-ghost">Call instead</a>
        </div>
      </div>
    );
  }

  const steps = ['What you need', 'Your home', 'A day that works', 'How to reach you'];
  const canNext = [!!service, !!size, !!date && !!win, true][step];

  const Chip = ({ on, children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { on: boolean }) => (
    <button type="button" aria-pressed={on} {...p}
      className={`border px-5 py-3 text-left text-[0.95rem] transition-colors duration-500 ${
        on ? 'border-[#1a1714] bg-[#1a1714] text-[#f4f0e9]' : 'border-[#d6cfc2] text-[#1a1714] hover:border-[#8a4e37]'}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1)' }}>
      {children}
    </button>
  );

  return (
    <div>
      <ol className="mb-10 flex flex-wrap gap-x-7 gap-y-2" aria-label="Booking steps">
        {steps.map((s, i) => (
          <li key={s} className={`stationery ${i === step ? 'text-[#8a4e37]' : i < step ? 'text-[#1a1714]' : 'text-[#8c877f]'}`}
              aria-current={i === step ? 'step' : undefined}>
            {String(i + 1).padStart(2, '0')} {s}
          </li>
        ))}
      </ol>

      <form onSubmit={submit}>
        {/* 1 — service */}
        <fieldset hidden={step !== 0}>
          <legend className="display display-sm mb-7">What do you need <span className="whisper">done?</span></legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <Chip key={s.slug} on={service === s.title} onClick={() => setService(s.title)}>
                <span className="block">{s.title}</span>
                <span className="mt-1 block text-[0.76rem] opacity-65">{s.cadence}</span>
              </Chip>
            ))}
            <Chip on={service === 'Not sure yet'} onClick={() => setService('Not sure yet')}>
              <span className="block">Not sure yet</span>
              <span className="mt-1 block text-[0.76rem] opacity-65">Erica will help you work it out</span>
            </Chip>
          </div>
        </fieldset>

        {/* 2 — home */}
        <fieldset hidden={step !== 1}>
          <legend className="display display-sm mb-7">Tell us about <span className="whisper">the place.</span></legend>
          <p className="stationery mb-3">How big is it?</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {SIZES.map((s) => <Chip key={s} on={size === s} onClick={() => setSize(s)}>{s}</Chip>)}
          </div>
          <p className="stationery mb-3 mt-9">Anything we should plan for? <span className="normal-case tracking-normal text-[#8c877f]">Check all that apply</span></p>
          <div className="grid gap-3 sm:grid-cols-2">
            {CONDITIONS.map((c) => (
              <Chip key={c} on={conditions.includes(c)}
                onClick={() => setConditions((v) => v.includes(c) ? v.filter((x) => x !== c) : [...v, c])}>
                {c}
              </Chip>
            ))}
          </div>
        </fieldset>

        {/* 3 — calendar */}
        <fieldset hidden={step !== 2}>
          <legend className="display display-sm mb-7">Pick a day <span className="whisper">that suits you.</span></legend>

          <div className="max-w-[430px]">
            <div className="flex items-center justify-between border-b border-[#d6cfc2] pb-4">
              <button type="button" onClick={() => setMonth((m) => Math.max(0, m - 1))} disabled={month === 0}
                className="stationery disabled:opacity-30" aria-label="Previous month">&larr; Prev</button>
              <p className="display text-[1.35rem]">
                {MONTHS[grid.base.getMonth()]} <span className="whisper">{grid.base.getFullYear()}</span>
              </p>
              <button type="button" onClick={() => setMonth((m) => Math.min(3, m + 1))} disabled={month === 3}
                className="stationery disabled:opacity-30" aria-label="Next month">Next &rarr;</button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">
              {DOW.map((d) => <div key={d} className="stationery pb-2 text-center" role="columnheader">{d}</div>)}
              {grid.cells.map((d, i) => {
                if (!d) return <div key={`x${i}`} />;
                const v = iso(d), ok = usable(d), on = date === v;
                return (
                  <button key={v} type="button" disabled={!ok} onClick={() => setDate(v)} aria-pressed={on}
                    aria-label={d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    className={`aspect-square text-[0.92rem] transition-colors duration-300 ${
                      on ? 'bg-[#1a1714] text-[#f4f0e9]'
                         : ok ? 'text-[#1a1714] hover:bg-[#1a1714]/[0.07]'
                              : 'cursor-not-allowed text-[#c9c2b5]'}`}>
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
            <p className="stationery mt-4">Weekdays only &middot; two days&rsquo; notice minimum</p>
          </div>

          <div hidden={!date}>
            <p className="stationery mb-3 mt-9">Which part of the day?</p>
            <div className="grid max-w-[560px] gap-3 sm:grid-cols-3">
              {WINDOWS.map((w) => (
                <Chip key={w.k} on={win === w.k} onClick={() => setWin(w.k)}>
                  <span className="block">{w.label}</span>
                  <span className="mt-1 block text-[0.76rem] opacity-65">{w.note}</span>
                </Chip>
              ))}
            </div>
          </div>

          <p className="mt-8 max-w-[52ch] border-l-2 border-[#8a4e37] pl-5 text-[0.92rem] leading-relaxed text-[#68635b]">
            Ace &amp; Ash books weeks ahead, so this sends Erica a <strong className="font-medium text-[#1a1714]">request</strong>,
            not a confirmed slot. She replies within one business day with a quote and the nearest date she can hold.
          </p>
        </fieldset>

        {/* 4 — contact */}
        <fieldset hidden={step !== 3}>
          <legend className="display display-sm mb-7">Where should <span className="whisper">Erica reply?</span></legend>
          <div className="grid max-w-[640px] gap-x-10 gap-y-7 sm:grid-cols-2">
            <label className="block"><span className="stationery">Your name</span>
              <input name="name" required autoComplete="name" className="fld mt-2" /></label>
            <label className="block"><span className="stationery">Phone</span>
              <input name="phone" type="tel" required autoComplete="tel" className="fld mt-2" /></label>
            <label className="block"><span className="stationery">Email</span>
              <input name="email" type="email" required autoComplete="email" className="fld mt-2" /></label>
            <label className="block"><span className="stationery">Neighborhood or address</span>
              <input name="address" autoComplete="street-address" className="fld mt-2" placeholder="Nocatee, Ponte Vedra…" /></label>
            <label className="block sm:col-span-2"><span className="stationery">Anything else</span>
              <textarea name="notes" rows={3} className="fld mt-2" placeholder="Gate codes, a nervous dog, the one room that matters most…" /></label>
          </div>
          <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: '-9999px' }}>
            <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <dl className="mt-10 max-w-[640px] border-t border-[#d6cfc2] pt-6 text-[0.9rem]">
            {[['Service', service], ['Home', size], ['Date', pretty(date)], ['Window', WINDOWS.find((w) => w.k === win)?.label ?? ''],
              ['Notes for us', conditions.join(', ')]].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex gap-6 border-b border-[#d6cfc2] py-2.5 last:border-0">
                <dt className="stationery w-32 flex-none pt-0.5">{k}</dt><dd className="text-[#3a352e]">{v}</dd>
              </div>
            ))}
          </dl>
          {state === 'error' && <p role="alert" className="mt-6 text-[0.92rem] text-[#8a4e37]">{err} You can also text {SITE.phone}.</p>}
        </fieldset>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[#d6cfc2] pt-8">
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-ghost">Back</button>
          )}
          {step < 3 ? (
            <button type="button" disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="btn">Continue</button>
          ) : (
            <button type="submit" disabled={state === 'sending'} className="btn">
              {state === 'sending' ? 'Sending…' : 'Send my request'}
            </button>
          )}
          <a href={SITE.smsHref} className="stationery lnk ml-auto">Rather text? {SITE.phone}</a>
        </div>
      </form>
    </div>
  );
}
