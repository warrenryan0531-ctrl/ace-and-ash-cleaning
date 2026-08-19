'use client';
import { useEffect, useState } from 'react';

const KEY = 'cookie:aceandash';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem(KEY)) setShow(true); } catch { /* ignore */ } }, []);
  const decide = (v: 'all' | 'essential') => { try { localStorage.setItem(KEY, v); } catch { /* ignore */ } setShow(false); };
  if (!show) return null;
  return (
    <div id="cookie-bar" role="region" aria-label="Cookie notice"
      className="a11y-keep fixed inset-x-0 bottom-0 z-[85] border-t border-[#3a352e] bg-[#1a1714] py-3.5 text-[#f4f0e9] no-print md:py-4">
      <div className="shell flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="max-w-[62ch] pr-16 text-[0.82rem] leading-relaxed text-[#f4f0e9]/80 md:pr-0">
          We use a few cookies to see which pages help. Nothing is sold.{' '}
          <a href="/privacy" className="lnk">Privacy notice</a>.
        </p>
        <div className="flex flex-none gap-3">
          <button type="button" onClick={() => decide('essential')}
            className="border border-[#f4f0e9]/35 px-5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.19em] transition hover:border-[#f4f0e9]">
            Essential only
          </button>
          <button type="button" onClick={() => decide('all')}
            className="bg-[#f4f0e9] px-5 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-[#1a1714] transition hover:bg-white">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
