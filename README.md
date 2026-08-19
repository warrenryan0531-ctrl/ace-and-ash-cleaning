# Ace & Ash Cleaning

Premium marketing site for **Ace & Ash Cleaning** (Erica Taylor, Nocatee FL).
Built by [904 Digital Media](https://weare904digitalmedia.com) via `build-new-site`.

## Design system
- **Taste Profile flavor:** warm-parchment editorial couture (Source 007)
- **Palette (world-derived — St. Augustine coquina, linen, terracotta tile):**
  parchment `#F4F0E9` · ink `#1A1714` · grey `#5F5A52` · hairline `#D6CFC2` ·
  single accent, coquina clay `#8A4E37` (5.73:1 on parchment)
  The UI is monochrome; **photography carries all the color.**
- **Type:** Instrument Serif (display, roman + true italic → mixed-register
  headlines) + Hanken Grotesk (body/UI). Both OFL, self-hosted via `next/font`.
- **Motion:** reveals 1s `ease` per element (904 motion-standards);
  interaction 0.6s `cubic-bezier(.25,1,.5,1)`; grand gestures 1s
  `cubic-bezier(.87,0,.13,1)`. Native scroll only — never hijacked.
- **Showstopper:** `components/TheTurn.tsx` — vertical → horizontal → vertical
  axis switch, scroll-driven, pinned, with a mobile swipe-rail fallback.

## 904 standard components
Accessibility widget (clay accent, bottom-right, scroll tuck) · lead forms via
Resend with server-side honeypot and BCC to ryan@ · cookie consent ·
service-area map · favicon set · LocalBusiness + Service schema · sitemap +
robots · site-branding footer.

## QA status
`axe-core` WCAG 2.0/2.1/2.2 A + AA: **0 violations** across 10 pages × desktop
and mobile.

## Environment
Copy `.env.example` and set the Resend variables. Without `RESEND_API_KEY` the
lead route accepts submissions and logs them instead of emailing.

## Local
```
npm install
npm run dev
```
