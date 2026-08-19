import type { Metadata } from 'next';
import BookingFlow from '@/components/BookingFlow';

export const metadata: Metadata = {
  title: 'Request a clean',
  description: 'Request a cleaning date with Ace & Ash — Nocatee, Ponte Vedra, St. Augustine and Jacksonville. Erica reviews every request personally and replies within one business day.',
};

export default function Book() {
  return (
    <section className="shell pb-[clamp(4rem,11vh,7rem)] pt-[clamp(8rem,18vh,11rem)]">
      <p className="stationery">Booking</p>
      <h1 className="display display-md mt-4 max-w-[16ch]">
        <span className="whisper">tell us</span> WHAT YOU NEED <span className="whisper">and when.</span>
      </h1>
      <div className="mt-14 border-t border-[#d6cfc2] pt-12">
        <BookingFlow />
      </div>
    </section>
  );
}
