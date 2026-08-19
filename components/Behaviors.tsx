'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* 904 motion-standards: scroll reveal — 1s ease, per element, IO 0.12, fire once */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in), .reveal-soft:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

/* 904 motion-standards: accordions — 400ms linear, height only, single-open, no auto-scroll */
export function AccordionBehavior() {
  const pathname = usePathname();
  useEffect(() => {
    const DUR = 400, EASE = 'linear';
    const stop = (b: HTMLElement) => b.getAnimations().forEach((a) => a.cancel());

    function animateOpen(el: HTMLDetailsElement, body: HTMLElement) {
      el.open = true; stop(body);
      const h = body.scrollHeight;
      body.style.overflow = 'hidden';
      const a = body.animate({ height: ['0px', `${h}px`] }, { duration: DUR, easing: EASE });
      a.onfinish = () => { body.style.overflow = ''; body.style.height = ''; };
    }
    function animateClose(el: HTMLDetailsElement, body: HTMLElement) {
      stop(body);
      const h = body.offsetHeight || body.scrollHeight;
      body.style.overflow = 'hidden';
      const a = body.animate({ height: [`${h}px`, '0px'] }, { duration: DUR, easing: EASE });
      a.onfinish = () => { el.open = false; body.style.overflow = ''; body.style.height = ''; };
    }
    function onClick(e: MouseEvent) {
      const summary = (e.target as HTMLElement)?.closest?.('summary');
      if (!summary) return;
      const el = summary.closest('details.acc') as HTMLDetailsElement | null;
      if (!el || summary.parentElement !== el) return;
      const body = el.querySelector(':scope > .acc-body') as HTMLElement | null;
      if (!body) return;
      e.preventDefault();
      if (el.open) { animateClose(el, body); return; }
      [...(el.parentElement?.children ?? [])].forEach((c) => {
        const s = c as HTMLDetailsElement;
        if (s !== el && s.tagName === 'DETAILS' && s.classList.contains('acc') && s.open) {
          const sb = s.querySelector(':scope > .acc-body') as HTMLElement | null;
          if (sb) animateClose(s, sb); else s.open = false;
        }
      });
      animateOpen(el, body);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname]);
  return null;
}
