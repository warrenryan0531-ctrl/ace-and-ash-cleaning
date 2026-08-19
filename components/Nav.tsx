'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/the-standard', label: 'The Standard' },
  { href: '/service-areas', label: 'Where we clean' },
  { href: '/about', label: 'About Erica' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const overHero = pathname === '/';

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const light = overHero && !solid && !open;

  return (
    <header className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,color] duration-700 no-print ${
        light ? 'bg-transparent text-[#f4f0e9]' : 'border-b border-[#d6cfc2] bg-[#f4f0e9]/94 text-[#1a1714] backdrop-blur-[6px]'
      }`} style={{ transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1)' }}>
      <div className="shell flex h-[74px] items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-3.5" aria-label="Ace & Ash Cleaning, home">
          <span className="display text-[1.45rem] leading-none tracking-[-0.01em]">Ace <span className="whisper">&amp;</span> Ash</span>
          <span className={`hidden text-[0.62rem] uppercase tracking-[0.22em] sm:inline ${light ? 'text-[#f4f0e9]/75' : 'text-[#5f5a52]'}`}>Nocatee, FL</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
              className={`lnk inline-flex items-center py-2 text-[0.68rem] font-medium uppercase tracking-[0.19em] ${
                pathname.startsWith(l.href) ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={SITE.phoneHref} className={`hidden items-center py-2 text-[0.68rem] font-medium uppercase tracking-[0.19em] lnk md:inline-flex ${light ? '' : 'text-[#1a1714]'}`}>
            {SITE.phone}
          </a>
          <Link href="/book" className={`hidden items-center border px-5 py-2.5 text-[0.64rem] font-semibold uppercase tracking-[0.19em] transition-colors duration-700 sm:inline-flex ${
              light ? 'border-[#f4f0e9]/45 text-[#f4f0e9] hover:bg-[#f4f0e9] hover:text-[#1a1714]'
                    : 'border-[#1a1714] bg-[#1a1714] text-[#f4f0e9] hover:bg-[#73422f] hover:border-[#73422f]'}`}>
            Request a clean
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
            <span className="relative block h-[11px] w-[22px]">
              <span className={`absolute left-0 block h-px w-full bg-current transition-transform duration-500 ${open ? 'top-[5px] rotate-45' : 'top-0'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1)' }} />
              <span className={`absolute left-0 block h-px w-full bg-current transition-transform duration-500 ${open ? 'top-[5px] -rotate-45' : 'top-[10px]'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1)' }} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open}
        className="fixed inset-x-0 top-[74px] bottom-0 z-[69] overflow-y-auto bg-[#f4f0e9] text-[#1a1714] lg:hidden">
        <div className="shell flex min-h-full flex-col justify-between py-10">
          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map((l, i) => (
              <Link key={l.href} href={l.href}
                className="display display-sm border-t border-[#d6cfc2] py-6 last:border-b"
                style={{ transitionDelay: `${i * 40}ms` }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-4">
            <Link href="/book" className="btn w-full">Request a clean</Link>
            <a href={SITE.phoneHref} className="btn btn-ghost w-full">Call {SITE.phone}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
