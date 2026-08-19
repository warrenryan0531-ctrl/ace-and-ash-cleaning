'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/* 904 Digital Media — STANDARD accessibility widget.
   Colors change per client. Nothing else does.
   Ace & Ash accent + launcher = coquina clay #8A4E37 (white on it = 6.51:1). */

const ACCENT = '#8A4E37';
const KEY = 'a11y:aceandash';

type Prefs = {
  font: number; lh: number; alignLeft: boolean; readable: boolean;
  contrast: boolean; grayscale: boolean; hideImages: boolean; reduceMotion: boolean;
  highlightLinks: boolean; readingMask: boolean;
};
const DEFAULTS: Prefs = {
  font: 0, lh: 0, alignLeft: false, readable: false, contrast: false,
  grayscale: false, hideImages: false, reduceMotion: false, highlightLinks: false, readingMask: false,
};

function sanitize(raw: unknown): Prefs {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const step = (v: unknown) => { const n = Number(v); return Number.isInteger(n) && n >= 0 && n <= 3 ? n : 0; };
  const bool = (v: unknown) => v === true;
  return {
    font: step(o.font), lh: step(o.lh), alignLeft: bool(o.alignLeft), readable: bool(o.readable),
    contrast: bool(o.contrast), grayscale: bool(o.grayscale), hideImages: bool(o.hideImages),
    reduceMotion: bool(o.reduceMotion), highlightLinks: bool(o.highlightLinks), readingMask: bool(o.readingMask),
  };
}

const I = (d: string, extra?: React.ReactNode) => (
  <svg className="a11y-icon" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />{extra}
  </svg>
);

/* the frozen 904 accessibility glyph — never swapped */
const A11yGlyph = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="a11y-icon">
    <circle cx="12" cy="12" r="10.4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="6.4" r="1.55" fill="currentColor" />
    <path d="M5.6 9.3c2 .75 4.13 1.13 6.4 1.13S16.4 10.05 18.4 9.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 10.4v4.05m0 0-2.35 4.5m2.35-4.5 2.35 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Tile({ label, icon, active, level, onClick }:
  { label: string; icon: React.ReactNode; active: boolean; level?: number; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className="a11y-keep relative min-h-[104px] rounded-2xl border p-3 text-left transition-colors duration-200"
      style={{
        borderColor: active ? ACCENT : 'rgba(0,0,0,0.10)',
        background: active ? 'rgba(138,78,55,0.10)' : 'rgba(0,0,0,0.03)',
        color: active ? ACCENT : '#1a1714',
      }}>
      {typeof level === 'number' && (
        <span className="absolute right-3 top-3 flex gap-[3px]" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <span key={i} className="block h-[2px] w-[7px] rounded-full"
              style={{ background: i <= level ? ACCENT : 'rgba(0,0,0,0.16)' }} />
          ))}
        </span>
      )}
      <span className="block">{icon}</span>
      <span className="absolute bottom-3 left-3 right-3 text-[0.78rem] font-medium leading-tight text-neutral-800"
        style={{ color: active ? ACCENT : undefined }}>{label}</span>
    </button>
  );
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 mt-4 text-[0.7rem] uppercase tracking-[0.16em] text-neutral-400 first:mt-0">{children}</p>
);

export default function A11yWidget() {
  const [open, setOpen] = useState(false);
  const [p, setP] = useState<Prefs>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    try { const r = localStorage.getItem(KEY); if (r) setP(sanitize(JSON.parse(r))); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const h = document.documentElement;
    const cls = [
      p.font ? `a11y-font-${p.font}` : '', p.lh ? `a11y-lh-${p.lh}` : '',
      p.alignLeft && 'a11y-align-left', p.readable && 'a11y-readable-font',
      p.contrast && 'a11y-high-contrast', p.grayscale && 'a11y-grayscale',
      p.hideImages && 'a11y-hide-images', p.reduceMotion && 'a11y-reduce-motion',
      p.highlightLinks && 'a11y-highlight-links', p.readingMask && 'a11y-reading-mask',
    ].filter(Boolean) as string[];
    h.className = h.className.split(/\s+/).filter((c) => c && !c.startsWith('a11y-')).concat(cls).join(' ');
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
  }, [p]);

  /* launcher offset: clamp the BASE only, never the cookie clearance */
  useEffect(() => {
    const set = () => {
      const base = Math.min(96, Math.max(20, Math.round(window.innerHeight * 0.22)));
      const bar = document.getElementById('cookie-bar');
      const clearance = bar && bar.offsetParent !== null ? bar.getBoundingClientRect().height + 20 : 0;
      document.documentElement.style.setProperty('--a11y-fab-bottom', `${Math.max(base, clearance)}px`);
    };
    const settle = () => requestAnimationFrame(() => requestAnimationFrame(set));
    settle();
    window.addEventListener('resize', settle);
    const ro = new ResizeObserver(set);
    let watched: Element | null = null;
    const mo = new MutationObserver(() => {
      settle();
      const bar = document.getElementById('cookie-bar');
      if (bar && bar !== watched) { if (watched) ro.unobserve(watched); ro.observe(bar); watched = bar; }
      if (!bar && watched) { ro.disconnect(); watched = null; }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    const bar0 = document.getElementById('cookie-bar');
    if (bar0) { ro.observe(bar0); watched = bar0; }
    return () => { window.removeEventListener('resize', settle); mo.disconnect(); ro.disconnect(); };
  }, []);

  /* the scroll tuck — scroll + wheel + touchmove, restored on hover/focus */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const move = () => {
      if (openRef.current) return;
      if (document.activeElement === fabRef.current) return;
      document.body.classList.add('a11y-fab-tucked');
      clearTimeout(t);
      t = setTimeout(() => document.body.classList.remove('a11y-fab-tucked'), 900);
    };
    ['scroll', 'wheel', 'touchmove'].forEach((e) => window.addEventListener(e, move, { passive: true }));
    return () => { clearTimeout(t); ['scroll', 'wheel', 'touchmove'].forEach((e) => window.removeEventListener(e, move)); };
  }, []);

  useEffect(() => { if (open) document.body.classList.remove('a11y-fab-tucked'); }, [open]);

  /* reading mask follows the pointer */
  useEffect(() => {
    if (!p.readingMask) return;
    const el = document.getElementById('a11y-mask');
    if (!el) return;
    const paint = (y: number) => {
      el.style.background =
        `linear-gradient(180deg, rgba(0,0,0,.62) 0, rgba(0,0,0,.62) ${y - 70}px, transparent ${y - 70}px, transparent ${y + 70}px, rgba(0,0,0,.62) ${y + 70}px, rgba(0,0,0,.62) 100%)`;
    };
    paint(window.innerHeight / 2);
    const onMove = (e: PointerEvent) => paint(e.clientY);
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [p.readingMask]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); fabRef.current?.focus(); } };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t) && !fabRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, [open]);

  const step = useCallback((k: 'font' | 'lh') => setP((v) => ({ ...v, [k]: (v[k] + 1) % 4 })), []);
  const tog = useCallback((k: keyof Prefs) => setP((v) => ({ ...v, [k]: !v[k] })), []);

  return (
    <>
      <div id="a11y-mask" aria-hidden="true" />

      <button ref={fabRef} id="a11y-fab" type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open} aria-controls="a11y-panel"
        aria-label="Accessibility options"
        className="a11y-keep fixed right-5 z-[90] grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_10px_30px_rgba(26,23,20,0.28)] transition-all duration-300 hover:-translate-y-0.5 no-print"
        style={{ bottom: 'var(--a11y-fab-bottom, 96px)', background: ACCENT }}>
        <A11yGlyph />
      </button>

      {open && (
        <div ref={panelRef} id="a11y-panel" role="dialog" aria-modal="false" aria-label="Accessibility options"
          className="a11y-keep fixed right-5 z-[95] w-[380px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-[20px] bg-white text-neutral-900 shadow-[0_28px_70px_rgba(26,23,20,0.32)] no-print"
          style={{ bottom: 'calc(var(--a11y-fab-bottom, 96px) + 76px)', maxHeight: 'min(640px, calc(100vh - var(--a11y-fab-bottom, 96px) - 96px))' }}>

          <div className="flex items-center justify-between px-5 py-4 text-white" style={{ background: ACCENT }}>
            <span className="flex items-center gap-2.5">
              <A11yGlyph size={20} />
              <span className="text-[0.78rem] font-semibold uppercase tracking-[0.16em]">Accessibility</span>
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close accessibility options"
              className="grid h-8 w-8 place-items-center rounded-md bg-white/20 transition hover:bg-white/30">
              {I('M18 6 6 18M6 6l12 12')}
            </button>
          </div>

          <div className="overflow-y-auto px-5 pb-5 pt-4" style={{ maxHeight: 'calc(min(640px, 100vh - var(--a11y-fab-bottom, 96px) - 96px) - 60px)' }}>
            <SectionLabel>Text</SectionLabel>
            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="Bigger text" level={p.font} active={p.font > 0} onClick={() => step('font')}
                icon={I('M4 20 10 4l6 16M6.5 14h7M16 20l4-9 4 9m-6.6-2.6h5.2')} />
              <Tile label="Line height" level={p.lh} active={p.lh > 0} onClick={() => step('lh')}
                icon={I('M3 5h18M3 12h18M3 19h18')} />
              <Tile label="Text align" active={p.alignLeft} onClick={() => tog('alignLeft')}
                icon={I('M3 5h18M3 10h11M3 15h18M3 20h11')} />
              <Tile label="Readable font" active={p.readable} onClick={() => tog('readable')}
                icon={I('M4 19V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13M4 19h14M8 8h6M8 12h6')} />
            </div>

            <SectionLabel>Visual</SectionLabel>
            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="High contrast" active={p.contrast} onClick={() => tog('contrast')}
                icon={I('M12 3a9 9 0 1 0 0 18Z', <circle cx="12" cy="12" r="9" />)} />
              <Tile label="Grayscale" active={p.grayscale} onClick={() => tog('grayscale')}
                icon={I('M4 6a8 8 0 0 0 0 12M20 6a8 8 0 0 1 0 12', <circle cx="12" cy="12" r="9" />)} />
              <Tile label="Hide images" active={p.hideImages} onClick={() => tog('hideImages')}
                icon={I('M3 3l18 18M21 15l-5-5-3.5 3.5M4 5h14a1 1 0 0 1 1 1v11M5 19h12', <rect x="3" y="5" width="18" height="14" rx="2" />)} />
              <Tile label="Pause animations" active={p.reduceMotion} onClick={() => tog('reduceMotion')}
                icon={I('M9 5v14M15 5v14')} />
            </div>

            <SectionLabel>Orientation</SectionLabel>
            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="Highlight links" active={p.highlightLinks} onClick={() => tog('highlightLinks')}
                icon={I('M10 13a5 5 0 0 0 7.5.5l2-2A5 5 0 0 0 12.5 4.5l-1 1M14 11a5 5 0 0 0-7.5-.5l-2 2A5 5 0 0 0 11.5 19.5l1-1')} />
              <Tile label="Reading mask" active={p.readingMask} onClick={() => tog('readingMask')}
                icon={I('M3 4h18M3 20h18', <rect x="3" y="9" width="18" height="6" rx="1" />)} />
            </div>

            <button type="button" onClick={() => setP(DEFAULTS)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-black/[0.03] py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-neutral-700 transition hover:bg-black/[0.06]">
              {I('M3 12a9 9 0 1 0 3-6.7M3 4v5h5')}
              Reset all
            </button>
          </div>
        </div>
      )}
    </>
  );
}
