'use client';
import { useState } from 'react';
import { SITE } from '@/lib/site';

const CONDITIONS = ['Pets in the home', 'Move-in or move-out', 'Post-construction dust', 'First deep clean', 'Organizing help too'];

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending'); setErr('');
    const fd = new FormData(e.currentTarget);
    const payload = {
      kind: 'Enquiry',
      name: fd.get('name'), phone: fd.get('phone'), email: fd.get('email'),
      address: fd.get('address'), notes: fd.get('notes'), service: fd.get('service'),
      conditions: fd.getAll('conditions'),
      company: fd.get('company'), source: 'Contact page',
    };
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
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
      <div>
        <p className="stationery">Message sent</p>
        <p className="display display-sm mt-4 max-w-[20ch]">
          <span className="whisper">got it. Erica replies within</span> ONE BUSINESS DAY.
        </p>
        <p className="mt-6 max-w-[46ch] leading-relaxed text-[#68635b]">
          If you already know the day you want, you can pick it now and save a round of emails.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <a href="/book" className="btn">Pick a date</a>
          <a href={SITE.smsHref} className="btn btn-ghost">Text instead</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid max-w-[640px] gap-x-10 gap-y-7 sm:grid-cols-2">
      <label className="block"><span className="stationery">Your name</span>
        <input name="name" required autoComplete="name" className="fld mt-2" /></label>
      <label className="block"><span className="stationery">Phone</span>
        <input name="phone" type="tel" required autoComplete="tel" className="fld mt-2" /></label>
      <label className="block"><span className="stationery">Email</span>
        <input name="email" type="email" required autoComplete="email" className="fld mt-2" /></label>
      <label className="block"><span className="stationery">Neighborhood</span>
        <input name="address" autoComplete="street-address" className="fld mt-2" placeholder="Nocatee, Ponte Vedra…" /></label>
      <label className="block sm:col-span-2"><span className="stationery">What do you need?</span>
        <select name="service" className="fld mt-2" defaultValue="">
          <option value="">Choose one</option>
          {['Recurring care', 'Deep clean', 'Move in & move out', 'Home organizing', 'Offices, retail & churches', 'Not sure yet'].map((s) => <option key={s}>{s}</option>)}
        </select></label>

      <fieldset className="sm:col-span-2">
        <legend className="stationery mb-3">Anything we should plan for?</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {CONDITIONS.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-3 text-[0.95rem]">
              <input type="checkbox" name="conditions" value={c}
                className="h-4 w-4 flex-none appearance-none border border-[#d6cfc2] checked:border-[#8a4e37] checked:bg-[#8a4e37]" />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block sm:col-span-2"><span className="stationery">Anything else</span>
        <textarea name="notes" rows={3} className="fld mt-2" placeholder="Gate codes, a nervous dog, the one room that matters most…" /></label>

      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: '-9999px' }}>
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {state === 'error' && <p role="alert" className="sm:col-span-2 text-[0.92rem] text-[#8a4e37]">{err} You can also text {SITE.phone}.</p>}

      <div className="sm:col-span-2">
        <button type="submit" disabled={state === 'sending'} className="btn">
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
