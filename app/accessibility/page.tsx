import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
export const metadata: Metadata = { title: 'Accessibility', robots: { index: false, follow: true } };

export default function A11y() {
  return (
    <section className="shell pb-[clamp(4rem,11vh,7rem)] pt-[clamp(8rem,18vh,11rem)]">
      <p className="stationery">Accessibility</p>
      <h1 className="display display-md mt-4 max-w-[18ch]">This site should work for everyone.</h1>
      <div className="mt-10 max-w-[62ch] space-y-6 leading-relaxed text-[#3a352e]">
        <p>We build to WCAG 2.2 AA. Every page is keyboard navigable, color contrast is measured rather than
          eyeballed, images carry text alternatives, and motion respects your system&rsquo;s reduced-motion setting.</p>
        <p>The button in the bottom-right corner opens an accessibility panel with ten controls: larger text,
          taller line height, left alignment, a readable font, high contrast, grayscale, hidden images, paused
          animations, highlighted links, and a reading mask. Your choices are remembered on this device.</p>
        <p>If something on this site is difficult to use, tell us and we will fix it. Call or text {SITE.phone}.</p>
      </div>
    </section>
  );
}
